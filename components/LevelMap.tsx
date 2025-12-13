
import React, { useState, useEffect, useRef, useMemo } from 'react';
import { GameState, LevelData, ShapeType } from '../types';
import { Lock, Star, Play, Volume2, VolumeX, BookOpen, Info, X, Timer } from 'lucide-react';
import { toggleMute, playClick, playBackgroundMusic } from '../audio';
import { ShapeRender } from './ShapeRender';

interface LevelMapProps {
  levels: LevelData[];
  gameState: GameState;
  onSelectLevel: (levelId: number) => void;
  isMuted: boolean;
  onToggleMute: () => void;
  onOpenStickers: () => void;
  onOpenInfo: () => void;
  onToggleChallengeMode: () => void;
}

// --- Preview Modal Component (Local) ---
const LevelPreviewModal: React.FC<{
    level: LevelData;
    onClose: () => void;
    onPlay: () => void;
    stars: number;
    difficulty: number;
    challengeMode: boolean;
}> = ({ level, onClose, onPlay, stars, difficulty, challengeMode }) => {
    // Determine preview shapes
    const uniqueShapeTypes = Array.from(new Set(level.shapes.map(s => s.type))) as ShapeType[];

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/40 backdrop-blur-sm animate-pop">
            <div className="bg-white rounded-[2rem] w-full max-w-xs shadow-2xl overflow-hidden relative">
                <button 
                    onClick={onClose}
                    className="absolute top-4 right-4 w-8 h-8 bg-slate-100 rounded-full flex items-center justify-center text-slate-500 z-10 hover:bg-slate-200"
                >
                    <X size={20} />
                </button>

                <div className={`p-6 pb-8 text-center relative overflow-hidden ${challengeMode ? 'bg-orange-50' : 'bg-blue-50'}`}>
                    <div className={`absolute top-[-20%] left-[-10%] w-32 h-32 rounded-full mix-blend-multiply filter blur-xl opacity-70 ${challengeMode ? 'bg-red-200' : 'bg-blue-100'}`} />
                    <div className={`absolute bottom-[-20%] right-[-10%] w-32 h-32 rounded-full mix-blend-multiply filter blur-xl opacity-70 ${challengeMode ? 'bg-orange-200' : 'bg-purple-100'}`} />
                    
                    {challengeMode && (
                        <div className="absolute top-0 left-0 w-full h-1 bg-red-400" />
                    )}

                    <h2 className="text-2xl font-bold text-slate-800 relative z-10">{level.title}</h2>
                    <div className="flex justify-center mt-2 relative z-10">
                        {[...Array(3)].map((_, i) => (
                            <Star key={i} size={20} className={i < difficulty ? "fill-orange-400 text-orange-400" : "text-slate-300"} />
                        ))}
                    </div>
                    {challengeMode && (
                        <div className="relative z-10 mt-2 bg-red-100 text-red-600 px-3 py-1 rounded-full text-xs font-bold inline-flex items-center gap-1">
                            <Timer size={12} /> Utmaning!
                        </div>
                    )}
                </div>

                <div className="p-6">
                    <p className="text-center text-slate-500 mb-6 font-medium">{level.description}</p>
                    
                    <div className="bg-slate-50 rounded-xl p-4 mb-6 border border-slate-100">
                        <p className="text-xs text-slate-400 font-bold uppercase tracking-wider text-center mb-3">Former</p>
                        <div className="flex justify-center gap-3 flex-wrap">
                            {uniqueShapeTypes.slice(0, 5).map(type => (
                                <div key={type} className="w-8 h-8 text-slate-600">
                                    <ShapeRender type={type} />
                                </div>
                            ))}
                        </div>
                    </div>

                    <button 
                        onClick={onPlay}
                        className={`w-full text-white font-bold py-4 rounded-xl shadow-lg active:scale-95 transition-all flex items-center justify-center gap-2 ${challengeMode ? 'bg-red-500 hover:bg-red-600 shadow-red-200' : 'bg-apple-blue hover:bg-blue-600 shadow-blue-200'}`}
                    >
                        <span>{challengeMode ? 'STARTA UTMANING' : 'SPELA'}</span>
                        <Play size={20} className="fill-white" />
                    </button>
                </div>
            </div>
        </div>
    );
};


export const LevelMap: React.FC<LevelMapProps> = ({ levels, gameState, onSelectLevel, isMuted, onToggleMute, onOpenStickers, onOpenInfo, onToggleChallengeMode }) => {
  const [previewLevel, setPreviewLevel] = useState<LevelData | null>(null);
  const scrollRef = useRef<HTMLDivElement>(null);

  // Play menu music on mount
  useEffect(() => {
    playBackgroundMusic('menu');
  }, []);

  // Scroll to unlocked level on mount
  useEffect(() => {
      if (scrollRef.current) {
          // Find the last unlocked level
          const lastUnlocked = levels.filter(l => gameState.totalStars >= l.unlocksAtStars).pop();
          if (lastUnlocked) {
             const el = document.getElementById(`level-node-${lastUnlocked.id}`);
             if (el) {
                 el.scrollIntoView({ behavior: 'smooth', block: 'center' });
             }
          }
      }
  }, []); // Run once on mount

  const handleLevelClick = (level: LevelData, isUnlocked: boolean) => {
      if (!isUnlocked) return;
      playClick();
      setPreviewLevel(level);
  };

  const handleStartLevel = () => {
      if (previewLevel) {
          playClick();
          onSelectLevel(previewLevel.id);
          setPreviewLevel(null);
      }
  };

  const getDifficulty = (level: LevelData): number => {
    const count = level.shapes.length;
    if (count <= 3) return 1;
    if (count <= 5) return 2;
    return 3;
};

  // --- Math for the Path ---
  const NODE_SPACING = 100; // Vertical pixels between levels
  const AMPLITUDE = 120; // Max horizontal distance from center (pixels)
  const FREQUENCY = 0.8; // How tight the curves are

  // Define "Worlds" for visual variety background
  const getWorldColor = (levelIndex: number) => {
      if (levelIndex < 5) return 'from-green-50 via-green-100 to-green-50'; // Grass
      if (levelIndex < 10) return 'from-blue-50 via-blue-100 to-blue-50'; // Ice/Sky
      if (levelIndex < 15) return 'from-orange-50 via-amber-100 to-orange-50'; // Construction/Sand
      if (levelIndex < 20) return 'from-indigo-50 via-purple-100 to-indigo-50'; // Space/Night
      if (levelIndex < 25) return 'from-pink-50 via-rose-100 to-pink-50'; // Candy
      if (levelIndex < 30) return 'from-teal-50 via-cyan-100 to-teal-50'; // Ocean
      return 'from-yellow-50 via-yellow-100 to-yellow-50'; // Gold/Royal
  };

  // Pre-calculate positions
  const levelNodes = useMemo(() => {
      return levels.map((level, i) => {
          const y = i * NODE_SPACING + 150; // Start with some padding
          const xOffset = Math.sin(i * FREQUENCY) * AMPLITUDE;
          return {
              ...level,
              x: xOffset,
              y: y,
              worldColor: getWorldColor(i)
          };
      });
  }, [levels]);

  const totalHeight = levelNodes.length * NODE_SPACING + 300;

  // Generate SVG Path String
  const pathData = useMemo(() => {
      let d = `M 0 ${levelNodes[0].y}`;
      for (let i = 0; i < levelNodes.length - 1; i++) {
          const curr = levelNodes[i];
          const next = levelNodes[i+1];
          d += ` L ${next.x} ${next.y}`;
      }
      return d;
  }, [levelNodes]);


  return (
    <div className="h-screen bg-slate-50 flex flex-col items-center overflow-hidden relative">
        
        {/* Header HUD - Fixed */}
        <header className="absolute top-0 z-30 w-full p-4 pointer-events-none">
            <div className="max-w-md mx-auto flex justify-between items-start pointer-events-auto">
                <button 
                    onClick={() => { playClick(); onOpenInfo(); }}
                    className="w-12 h-12 bg-white rounded-full shadow-lg border-2 border-slate-100 text-slate-400 hover:text-blue-500 active:scale-95 transition-transform flex items-center justify-center"
                >
                    <Info size={24} />
                </button>

                <div className="flex flex-col items-center gap-2">
                    <div className="bg-white px-4 py-2 rounded-full shadow-lg border-2 border-yellow-100 flex items-center gap-2">
                         <Star className="fill-yellow-400 text-yellow-400 animate-pulse" size={24} />
                         <span className="text-xl font-black text-slate-800">{gameState.totalStars}</span>
                    </div>
                </div>

                <div className="flex flex-col gap-2">
                     {/* Challenge Mode Toggle */}
                     <button 
                        onClick={(e) => { e.stopPropagation(); playClick(); onToggleChallengeMode(); }}
                        className={`w-12 h-12 rounded-full shadow-lg border-2 active:scale-95 transition-transform flex items-center justify-center ${gameState.challengeMode ? 'bg-red-500 border-red-600 text-white' : 'bg-white border-slate-100 text-slate-400 hover:text-red-500'}`}
                        title="Challenge Mode"
                    >
                        <Timer size={24} />
                    </button>

                    <button 
                        onClick={() => { playClick(); onOpenStickers(); }}
                        className="w-12 h-12 bg-white rounded-full shadow-lg border-2 border-slate-100 text-blue-500 hover:bg-blue-50 active:scale-95 transition-transform flex items-center justify-center"
                    >
                        <BookOpen size={24} />
                    </button>
                    <button 
                        onClick={(e) => { e.stopPropagation(); playClick(); onToggleMute(); toggleMute(!isMuted); }}
                        className="w-12 h-12 bg-white rounded-full shadow-lg border-2 border-slate-100 text-slate-500 hover:bg-slate-50 active:scale-95 transition-transform flex items-center justify-center"
                    >
                        {isMuted ? <VolumeX size={24} /> : <Volume2 size={24} />}
                    </button>
                </div>
            </div>
        </header>

        {/* Scrollable Map Area */}
        <div ref={scrollRef} className="flex-1 w-full overflow-y-auto overflow-x-hidden hide-scrollbar scroll-smooth">
            <div 
                className="relative w-full max-w-md mx-auto"
                style={{ height: totalHeight }}
            >
                {/* Dynamic World Backgrounds using gradients blocks */}
                <div className="absolute inset-0 z-0">
                     <div className="w-full h-full bg-slate-50 opacity-50" 
                          style={{ background: 'linear-gradient(to bottom, #f0fdf4 0%, #e0f2fe 30%, #fff7ed 60%, #f3e8ff 90%)' }} />
                </div>

                {/* The Path Line */}
                <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-full z-0 pointer-events-none">
                    <svg className="overflow-visible w-full h-full" style={{ left: '50%' }}>
                        <path 
                            d={pathData} 
                            fill="none" 
                            stroke="#cbd5e1" 
                            strokeWidth="12" 
                            strokeLinecap="round" 
                            strokeLinejoin="round" 
                            className="drop-shadow-sm"
                            style={{ transform: 'translateX(50%)' }} 
                        />
                        <path 
                            d={pathData} 
                            fill="none" 
                            stroke="#fff" 
                            strokeWidth="4" 
                            strokeLinecap="round" 
                            strokeDasharray="12 12"
                            style={{ transform: 'translateX(50%)' }}
                        />
                    </svg>
                </div>

                {/* Level Nodes */}
                {levelNodes.map((node, index) => {
                    const isUnlocked = gameState.totalStars >= node.unlocksAtStars;
                    const isCompleted = gameState.completedLevels.includes(node.id);
                    const isNext = isUnlocked && !isCompleted && (!gameState.completedLevels.includes(node.id + 1));
                    
                    return (
                        <div 
                            key={node.id}
                            id={`level-node-${node.id}`}
                            className="absolute left-1/2 -translate-x-1/2 z-10 flex flex-col items-center"
                            style={{ top: node.y, transform: `translate(calc(-50% + ${node.x}px), -50%)` }}
                        >
                            <button
                                onClick={() => handleLevelClick(node, isUnlocked)}
                                className={`
                                    relative w-20 h-20 rounded-full flex items-center justify-center text-2xl font-black shadow-xl transition-all duration-300
                                    ${isCompleted 
                                        ? 'bg-green-500 text-white ring-4 ring-green-200 scale-90' 
                                        : isUnlocked 
                                            ? 'bg-apple-blue text-white ring-8 ring-blue-100 scale-100 hover:scale-110 animate-bounce-small' 
                                            : 'bg-slate-200 text-slate-400 ring-4 ring-slate-100 scale-90 grayscale'}
                                `}
                            >
                                {isCompleted ? <Star className="fill-white w-10 h-10" /> : 
                                 !isUnlocked ? <Lock className="w-8 h-8 opacity-50" /> : 
                                 node.id}
                                
                                {isNext && (
                                    <span className="absolute inset-0 rounded-full bg-blue-400 animate-ping opacity-20" />
                                )}
                            </button>

                            {/* Label for unlocked levels */}
                            {isUnlocked && (
                                <div className="absolute -bottom-8 bg-white/90 backdrop-blur-sm px-3 py-1 rounded-full shadow-sm text-xs font-bold text-slate-600 whitespace-nowrap">
                                    {node.title}
                                </div>
                            )}

                            {/* Unlock Requirement Label for locked */}
                            {!isUnlocked && (
                                <div className="absolute -bottom-8 bg-slate-800/80 backdrop-blur-sm px-2 py-1 rounded-full text-[10px] font-bold text-white whitespace-nowrap flex items-center gap-1">
                                    {node.unlocksAtStars} <Star size={8} className="fill-white"/>
                                </div>
                            )}
                        </div>
                    );
                })}

                {/* Decoration: Start Flag */}
                <div className="absolute left-1/2 top-[80px] -translate-x-1/2 z-0 opacity-50">
                    <div className="flex flex-col items-center">
                        <div className="text-slate-400 text-sm font-bold uppercase tracking-widest mb-2">Start</div>
                        <div className="w-1 h-8 bg-slate-300" />
                    </div>
                </div>

                 <div className="absolute top-[300px] left-[10%] opacity-20 pointer-events-none"><ShapeRender type="circle" className="w-12 h-12 text-white" /></div>
                 <div className="absolute top-[600px] right-[10%] opacity-20 pointer-events-none"><ShapeRender type="star" className="w-16 h-16 text-yellow-400" /></div>
                 <div className="absolute top-[900px] left-[20%] opacity-20 pointer-events-none"><ShapeRender type="triangle" className="w-14 h-14 text-blue-400" /></div>
            </div>
            
            <div className="h-32" />
        </div>

        {/* Level Preview Popup */}
        {previewLevel && (
            <LevelPreviewModal 
                level={previewLevel} 
                onClose={() => setPreviewLevel(null)} 
                onPlay={handleStartLevel}
                stars={gameState.totalStars}
                difficulty={getDifficulty(previewLevel)}
                challengeMode={gameState.challengeMode}
            />
        )}
    </div>
  );
};