
import React, { useState, useRef, useEffect, useMemo } from 'react';
import { LevelData, GameShape, Position, AudioTheme } from '../types';
import { ShapeRender } from './ShapeRender';
import { RotateCcw, Home, Lightbulb, Clock, AlertTriangle, Sparkles, Star } from 'lucide-react';
import { playSnap, playClick, playPickUp, playDragMove, playBackgroundMusic } from '../audio';

interface GameBoardProps {
  level: LevelData;
  onComplete: (bonusStars: number) => void;
  onExit: () => void;
  challengeMode: boolean;
}

export const GameBoard: React.FC<GameBoardProps> = ({ level, onComplete, onExit, challengeMode }) => {
  // State for draggable pieces
  const [pieces, setPieces] = useState<GameShape[]>([]);
  
  // Which pieces have been successfully placed
  const [lockedPieceIds, setLockedPieceIds] = useState<string[]>([]);
  
  // Dragging state
  const [activeDragId, setActiveDragId] = useState<string | null>(null);
  const [dragOffset, setDragOffset] = useState({ x: 0, y: 0 });
  const containerRef = useRef<HTMLDivElement>(null);

  // Audio throttling ref
  const lastDragSoundTime = useRef(0);

  // Hint State
  const [hintId, setHintId] = useState<string | null>(null);
  const [hintCooldown, setHintCooldown] = useState(false);

  // Timer State (Challenge Mode)
  const [timeLeft, setTimeLeft] = useState<number>(0);
  const [isGameOver, setIsGameOver] = useState(false);
  const timerRef = useRef<number | null>(null);

  // Initialize level
  useEffect(() => {
    // Deep copy to reset positions
    const initialPieces = level.shapes.map(s => ({
      ...s,
      currentPos: { ...s.startPosition }
    }));
    setPieces(initialPieces);
    setLockedPieceIds([]);
    setHintId(null);
    setHintCooldown(false);
    setIsGameOver(false);

    // Initialize Timer
    if (challengeMode) {
        // Calculate time: 5s per shape + 15s base buffer, unless specific time set
        const calculatedTime = level.challengeTime || (level.shapes.length * 5 + 15);
        setTimeLeft(calculatedTime);
    }
  }, [level, challengeMode]);

  // Timer Logic
  useEffect(() => {
      if (challengeMode && !isGameOver && pieces.length > 0 && lockedPieceIds.length < pieces.length) {
          timerRef.current = window.setInterval(() => {
              setTimeLeft((prev) => {
                  if (prev <= 1) {
                      if (timerRef.current) clearInterval(timerRef.current);
                      setIsGameOver(true);
                      return 0;
                  }
                  return prev - 1;
              });
          }, 1000);
      }
      return () => {
          if (timerRef.current) clearInterval(timerRef.current);
      };
  }, [challengeMode, isGameOver, pieces.length, lockedPieceIds.length]);

  // Check victory condition
  useEffect(() => {
    if (pieces.length > 0 && lockedPieceIds.length === pieces.length) {
      if (timerRef.current) clearInterval(timerRef.current);
      // Slight delay for satisfaction
      setTimeout(() => {
          // Bonus star if challenge mode active and not game over
          const bonus = challengeMode ? 1 : 0;
          onComplete(bonus);
      }, 500); 
    }
  }, [lockedPieceIds, pieces, onComplete, challengeMode]);

  // --- Theme Logic ---
  const theme = useMemo(() => {
      const id = level.id;
      let audioTheme: AudioTheme = 'fun';
      let visualTheme = { bg: '', accent: '', isDark: false };

      // Determine Visuals and Audio
      if ([4, 12, 18, 26].includes(id)) {
          // Space
          visualTheme = {
              bg: 'bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-slate-900 via-purple-950 to-slate-900',
              accent: 'text-purple-200',
              isDark: true
          };
          audioTheme = 'space';
      } else if ([10].includes(id)) {
          // Ocean
          visualTheme = {
              bg: 'bg-gradient-to-b from-sky-200 to-blue-300',
              accent: 'text-blue-800',
              isDark: false
          };
          audioTheme = 'nature'; // Reuse nature for ocean for now
      } else if ([8, 11, 13, 2, 17, 20].includes(id)) {
          // Nature
          visualTheme = {
              bg: 'bg-gradient-to-br from-green-50 to-emerald-200',
              accent: 'text-emerald-800',
              isDark: false
          };
          audioTheme = 'nature';
      } else if ([6, 5, 16, 23].includes(id)) {
          // Candy/Food
          visualTheme = {
              bg: 'bg-gradient-to-bl from-pink-100 to-rose-200',
              accent: 'text-rose-800',
              isDark: false
          };
          audioTheme = 'fun';
      } else if ([3, 7, 14, 15, 21, 22].includes(id)) {
          // Warm/Construction
          visualTheme = {
              bg: 'bg-gradient-to-tr from-orange-100 to-amber-200',
              accent: 'text-orange-800',
              isDark: false
          };
          audioTheme = 'fun';
      } else if ([9].includes(id)) {
          // Ice
          visualTheme = {
              bg: 'bg-gradient-to-b from-slate-100 to-blue-100',
              accent: 'text-slate-600',
              isDark: false
          };
          audioTheme = 'nature'; // Wind sounds fit ice
      } else {
          // Default
          visualTheme = {
              bg: 'bg-gradient-to-br from-slate-50 to-slate-200',
              accent: 'text-slate-700',
              isDark: false
          };
          audioTheme = 'fun';
      }

      return { visual: visualTheme, audio: audioTheme };
  }, [level.id]);

  // Trigger Background Music
  useEffect(() => {
    playBackgroundMusic(theme.audio);
  }, [theme.audio]);

  // Progress calculation for dynamic visuals
  const progress = useMemo(() => {
      if (pieces.length === 0) return 0;
      return lockedPieceIds.length / pieces.length;
  }, [lockedPieceIds.length, pieces.length]);

  // --- Hint Logic ---
  const handleHint = () => {
    if (hintCooldown || lockedPieceIds.length === pieces.length || isGameOver) return;

    // Find unplaced pieces
    const unplaced = pieces.filter(p => !lockedPieceIds.includes(p.id));
    if (unplaced.length === 0) return;

    // Pick a random one or just the first one
    const target = unplaced[Math.floor(Math.random() * unplaced.length)];
    
    playClick();
    setHintId(target.id);
    setHintCooldown(true);

    // Remove highlight after 2.5 seconds
    setTimeout(() => {
        setHintId(null);
    }, 2500);

    // Allow new hint after 5 seconds
    setTimeout(() => {
        setHintCooldown(false);
    }, 5000);
  };

  const handleReset = () => {
      playClick();
      const initialPieces = level.shapes.map(s => ({
          ...s,
          currentPos: { ...s.startPosition }
      }));
      setPieces(initialPieces);
      setLockedPieceIds([]);
      setHintId(null);
      setIsGameOver(false);
      
      if (challengeMode) {
          const calculatedTime = level.challengeTime || (level.shapes.length * 5 + 15);
          setTimeLeft(calculatedTime);
      }
  };

  // --- Drag Logic ---

  const handlePointerDown = (e: React.PointerEvent, id: string) => {
    if (lockedPieceIds.includes(id) || isGameOver) return;
    
    // Prevent default touch actions like scrolling
    e.preventDefault();
    
    const piece = pieces.find(p => p.id === id);
    if (!piece || !containerRef.current) return;
    
    playPickUp(); // Subtle audio feedback for picking up

    const rect = containerRef.current.getBoundingClientRect();
    
    // Calculate mouse position relative to container (0-100 range)
    const clientX = e.clientX;
    const clientY = e.clientY;

    // We store the offset so the piece doesn't "snap" to center of finger
    // Convert current percentage position to pixels to calculate offset
    const currentPxX = (piece.currentPos?.x || piece.startPosition.x) / 100 * rect.width;
    const currentPxY = (piece.currentPos?.y || piece.startPosition.y) / 100 * rect.height;

    const offsetX = clientX - rect.left - currentPxX;
    const offsetY = clientY - rect.top - currentPxY;

    setDragOffset({ x: offsetX, y: offsetY });
    setActiveDragId(id);
    
    // Capture pointer to handle fast movements outside element bounds
    (e.target as Element).setPointerCapture(e.pointerId);
  };

  const handlePointerMove = (e: React.PointerEvent) => {
    if (!activeDragId || !containerRef.current) return;
    e.preventDefault();

    const rect = containerRef.current.getBoundingClientRect();
    
    // Calculate new position in pixels
    const rawX = e.clientX - rect.left - dragOffset.x;
    const rawY = e.clientY - rect.top - dragOffset.y;

    // Convert back to percentage (0-100)
    let percentX = (rawX / rect.width) * 100;
    let percentY = (rawY / rect.height) * 100;

    // Clamp to screen bounds (roughly)
    percentX = Math.max(0, Math.min(100, percentX));
    percentY = Math.max(0, Math.min(100, percentY));

    // Audio feedback for drag movement
    const now = Date.now();
    // Throttle sound to approx 12-13 times a second (80ms)
    if (now - lastDragSoundTime.current > 80) {
        playDragMove();
        lastDragSoundTime.current = now;
    }

    setPieces(prev => prev.map(p => {
      if (p.id !== activeDragId) return p;
      return { ...p, currentPos: { x: percentX, y: percentY } };
    }));
  };

  const handlePointerUp = (e: React.PointerEvent) => {
    if (!activeDragId) return;
    
    const piece = pieces.find(p => p.id === activeDragId);
    if (piece) {
      const currentPos = (piece as any).currentPos;
      
      // FIX: Find ALL valid targets for this piece, not just its own ID
      // Identical shapes should be interchangeable.
      const validTargets = level.shapes.filter(targetShape => {
          // 1. Must match visual properties
          const isVisualMatch = 
              targetShape.type === piece.type && 
              targetShape.color === piece.color &&
              (targetShape.scale || 1) === (piece.scale || 1) &&
              (targetShape.rotation || 0) === (piece.rotation || 0);
          
          if (!isVisualMatch) return false;

          // 2. Target must not be occupied by another locked piece
          // Check if any locked piece is currently sitting at this target's position
          const isOccupied = pieces.some(p => 
              lockedPieceIds.includes(p.id) && 
              p.id !== piece.id && // Don't count self
              // Check if p is snapped to this target
              Math.abs((p.currentPos?.x || 0) - targetShape.targetPosition.x) < 0.1 && 
              Math.abs((p.currentPos?.y || 0) - targetShape.targetPosition.y) < 0.1
          );

          return !isOccupied;
      });

      // Find the closest valid target
      let closestTarget = null;
      let minDist = 10; // Threshold percentage

      for (const target of validTargets) {
          const dist = Math.sqrt(
            Math.pow(target.targetPosition.x - currentPos.x, 2) + 
            Math.pow(target.targetPosition.y - currentPos.y, 2)
          );
          if (dist < minDist) {
              minDist = dist;
              closestTarget = target;
          }
      }
      
      if (closestTarget) {
        // Snap!
        playSnap(); // AUDIO FEEDBACK
        setLockedPieceIds(prev => [...prev, piece.id]);
        setPieces(prev => prev.map(p => {
          if (p.id !== activeDragId) return p;
          return { ...p, currentPos: { ...closestTarget.targetPosition } }; // Snap exact
        }));
        
        // Remove hint if we just placed the hinted piece
        if (piece.id === hintId) {
            setHintId(null);
        }

        // Haptic feedback (if supported)
        if (navigator.vibrate) navigator.vibrate(50);
      }
    }

    setActiveDragId(null);
    try {
        (e.target as Element).releasePointerCapture(e.pointerId);
    } catch (err) {
        // ignore
    }
  };

  const vTheme = theme.visual;

  return (
    <div className={`flex flex-col h-full w-full relative overflow-hidden transition-colors duration-1000 ${vTheme.bg}`}>
      
      {/* Dynamic Background Overlay based on progress */}
      <div 
        className="absolute inset-0 pointer-events-none transition-all duration-1000 ease-out"
        style={{
            backdropFilter: `saturate(${1 + progress * 0.5}) brightness(${1 + progress * 0.05})`
        }}
      />

      {/* Background Decor */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none opacity-30">
          <div className="absolute top-[10%] left-[10%] w-64 h-64 bg-white/20 rounded-full blur-3xl animate-float" style={{ animationDuration: '8s' }} />
          <div className="absolute bottom-[20%] right-[10%] w-96 h-96 bg-white/10 rounded-full blur-3xl animate-float" style={{ animationDuration: '12s', animationDelay: '1s' }} />
      </div>

      {/* Top Bar */}
      <div className="absolute top-0 left-0 right-0 p-4 z-20 flex justify-between items-center pointer-events-none">
        <button 
          onClick={() => { playClick(); onExit(); }}
          className="pointer-events-auto bg-white/80 backdrop-blur-sm p-3 rounded-full shadow-lg text-slate-700 hover:bg-white transition-transform active:scale-95"
        >
          <Home size={24} />
        </button>
        
        {/* Title or Timer */}
        <div className={`bg-white/80 backdrop-blur-sm px-6 py-2 rounded-full shadow-lg font-bold text-xl hidden md:flex items-center gap-2 ${vTheme.accent}`}>
            {challengeMode ? (
                <div className={`flex items-center gap-2 ${timeLeft < 10 ? 'text-red-500 animate-pulse' : ''}`}>
                    <Clock size={20} />
                    <span>{Math.floor(timeLeft / 60)}:{String(timeLeft % 60).padStart(2, '0')}</span>
                </div>
            ) : (
                <span>{level.title}</span>
            )}
        </div>

        {/* Mobile Timer Display (replaces title) */}
        {challengeMode && (
             <div className={`md:hidden bg-white/80 backdrop-blur-sm px-4 py-2 rounded-full shadow-lg font-bold ${vTheme.accent} ${timeLeft < 10 ? 'text-red-500 animate-pulse' : ''}`}>
                {Math.floor(timeLeft / 60)}:{String(timeLeft % 60).padStart(2, '0')}
            </div>
        )}

        <div className="flex space-x-3 pointer-events-auto">
            {/* Hint Button */}
            <button 
                onClick={handleHint}
                disabled={hintCooldown || lockedPieceIds.length === pieces.length || isGameOver}
                className={`bg-white/80 backdrop-blur-sm p-3 rounded-full shadow-lg transition-transform active:scale-95 border-2 ${
                    hintCooldown || lockedPieceIds.length === pieces.length || isGameOver
                    ? 'border-transparent opacity-50 cursor-not-allowed text-slate-400' 
                    : 'border-yellow-200 text-yellow-500 hover:bg-white hover:border-yellow-400'
                }`}
                aria-label="Hint"
            >
                <Lightbulb size={24} className={!hintCooldown ? "fill-yellow-100" : ""} />
            </button>

            {/* Reset Button */}
            <button 
            onClick={handleReset}
            className="bg-white/80 backdrop-blur-sm p-3 rounded-full shadow-lg text-slate-700 hover:bg-white transition-transform active:scale-95"
            >
            <RotateCcw size={24} />
            </button>
        </div>
      </div>

      {/* Game Area */}
      <div 
        ref={containerRef}
        className="flex-1 w-full relative touch-none select-none z-10"
        onPointerMove={handlePointerMove}
        onPointerUp={handlePointerUp}
        onPointerLeave={handlePointerUp}
      >
        {/* Render Targets (Holes) */}
        {level.shapes.map(shape => {
            const isHinting = hintId === shape.id;
            return (
            <div
                key={`target-${shape.id}`}
                className={`absolute transition-all duration-300 ${isHinting ? 'z-10' : ''}`}
                style={{
                left: `${shape.targetPosition.x}%`,
                top: `${shape.targetPosition.y}%`,
                width: '18vh', 
                height: '18vh',
                transform: `translate(-50%, -50%) rotate(${shape.rotation || 0}deg) scale(${shape.scale || 1})`,
                }}
            >
                <div className={`w-full h-full opacity-20 bg-black/10 rounded-xl transition-all duration-500 ${vTheme.isDark ? 'text-white' : 'text-slate-900'} ${isHinting ? 'ring-4 ring-yellow-400 ring-offset-4 ring-offset-slate-50 bg-yellow-400/30' : ''}`} style={{
                    boxShadow: 'inset 2px 2px 6px rgba(0,0,0,0.2)'
                }}>
                    <ShapeRender type={shape.type} className={vTheme.isDark ? "text-white/40" : "text-slate-800/40"} />
                </div>
            </div>
            );
        })}

        {/* Render Draggable Pieces */}
        {pieces.map(shape => {
            const isLocked = lockedPieceIds.includes(shape.id);
            const isDragging = activeDragId === shape.id;
            const isHinting = hintId === shape.id;
            const pos = (shape as any).currentPos || shape.startPosition;

            let isNearTarget = false;
            if (isDragging) {
                isNearTarget = level.shapes.some(targetShape => {
                     const isMatch = targetShape.type === shape.type && 
                                     targetShape.color === shape.color &&
                                     (targetShape.scale || 1) === (shape.scale || 1) &&
                                     (targetShape.rotation || 0) === (shape.rotation || 0);
                     if (!isMatch) return false;
                     const isOccupied = pieces.some(p => 
                        lockedPieceIds.includes(p.id) && 
                        p.id !== shape.id && 
                        Math.abs((p.currentPos?.x || 0) - targetShape.targetPosition.x) < 0.1 && 
                        Math.abs((p.currentPos?.y || 0) - targetShape.targetPosition.y) < 0.1
                    );
                    if (isOccupied) return false;
                    const dist = Math.sqrt(
                        Math.pow(pos.x - targetShape.targetPosition.x, 2) + 
                        Math.pow(pos.y - targetShape.targetPosition.y, 2)
                    );
                    return dist < 10;
                });
            }

            return (
                <div
                    key={`piece-${shape.id}`}
                    onPointerDown={(e) => handlePointerDown(e, shape.id)}
                    className={`absolute cursor-grab active:cursor-grabbing transition-transform duration-100 ${isLocked ? 'z-10 duration-300 ease-out' : 'z-50'} ${isHinting ? 'z-[60]' : ''}`}
                    style={{
                        left: `${pos.x}%`,
                        top: `${pos.y}%`,
                        width: '18vh',
                        height: '18vh',
                        transform: `translate(-50%, -50%) rotate(${shape.rotation || 0}deg) scale(${isDragging ? ((shape.scale || 1) * (isNearTarget ? 1.2 : 1.1)) : (shape.scale || 1)})`,
                        opacity: isDragging ? 0.9 : 1,
                        filter: isDragging ? 'drop-shadow(0px 15px 25px rgba(0,0,0,0.3))' : 'drop-shadow(0px 4px 6px rgba(0,0,0,0.1))',
                        touchAction: 'none',
                        pointerEvents: isGameOver ? 'none' : 'auto'
                    }}
                >
                    <div className={`w-full h-full rounded-xl transition-all duration-200 ${shape.color} ${isLocked ? 'animate-lock-in' : ''} ${isNearTarget ? 'brightness-110 ring-4 ring-white/60' : ''} ${isHinting ? 'ring-4 ring-yellow-400 ring-offset-2 animate-bounce' : ''}`}>
                         {isLocked && (
                             <div className="absolute inset-0 flex items-center justify-center text-white/50">
                                 <svg className="w-1/2 h-1/2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                     <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                                 </svg>
                             </div>
                         )}

                        {/* Celebration Sparkles on Lock */}
                        {isLocked && (
                            <div className="absolute inset-0 pointer-events-none overflow-visible">
                                {/* Center burst */}
                                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-white animate-sparkle-fade z-20">
                                    <Sparkles size={48} className="drop-shadow-[0_0_10px_rgba(255,255,255,0.8)]" />
                                </div>
                                {/* Corner stars - slightly delayed */}
                                <div className="absolute -top-4 -right-4 text-yellow-300 animate-sparkle-fade z-20" style={{ animationDelay: '0.2s' }}>
                                    <Star size={24} fill="currentColor" />
                                </div>
                                <div className="absolute -bottom-4 -left-4 text-yellow-300 animate-sparkle-fade z-20" style={{ animationDelay: '0.4s' }}>
                                    <Star size={24} fill="currentColor" />
                                </div>
                            </div>
                        )}

                         <ShapeRender type={shape.type} className="text-white/90 drop-shadow-sm" />
                    </div>
                </div>
            );
        })}
      </div>
      
      {/* Game Over Modal */}
      {isGameOver && (
          <div className="absolute inset-0 z-[100] flex items-center justify-center bg-black/60 backdrop-blur-sm animate-pop">
              <div className="bg-white rounded-3xl p-8 max-w-sm w-full mx-4 shadow-2xl flex flex-col items-center">
                  <div className="w-20 h-20 bg-red-100 rounded-full flex items-center justify-center mb-4">
                      <AlertTriangle className="text-red-500 w-10 h-10" />
                  </div>
                  <h2 className="text-2xl font-bold text-slate-800 mb-2">Tiden är ute!</h2>
                  <p className="text-slate-500 mb-6 text-center">Tiden rann iväg. Försök vara lite snabbare nästa gång!</p>
                  
                  <button 
                      onClick={handleReset}
                      className="w-full bg-apple-blue text-white font-bold py-4 rounded-xl shadow-lg hover:shadow-xl active:scale-95 transition-all flex items-center justify-center gap-2"
                  >
                      <RotateCcw size={20} />
                      <span>Försök igen</span>
                  </button>
                  <button 
                      onClick={onExit}
                      className="mt-3 w-full text-slate-400 font-bold py-2 rounded-xl hover:text-slate-600 transition-colors"
                  >
                      Avsluta
                  </button>
              </div>
          </div>
      )}

      {/* Bottom info area */}
      <div className={`h-12 w-full bg-white/50 backdrop-blur text-center flex items-center justify-center text-sm z-20 ${vTheme.accent}`}>
        {hintCooldown && lockedPieceIds.length !== pieces.length ? "Laddar ledtråd..." : "Dra formen till rätt plats!"}
      </div>
    </div>
  );
};
