
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
  const NODE_SPACING = 112; // Vertical pixels between levels
  const TOP_PAD = 150;

  // Measured width so the trail can use the whole map on iPad and stay tidy on phones
  const mapRef = useRef<HTMLDivElement>(null);
  const [mapWidth, setMapWidth] = useState(448);
  useEffect(() => {
      const el = mapRef.current;
      if (!el) return;
      const measure = () => {
          const w = Math.round(el.getBoundingClientRect().width);
          if (w > 0) setMapWidth(prev => (Math.abs(prev - Math.max(280, w)) < 1 ? prev : Math.max(280, w)));
      };
      measure();
      const ro = new ResizeObserver(measure);
      ro.observe(el);
      return () => ro.disconnect();
  }, []);

  // Worlds: colour band + landscape props, five levels each
  const WORLDS = [
      { name: 'Ängen',     sky: '#f2fbf0', hill: '#cdeccb', deep: '#a9dda6', prop: 'tree'  },
      { name: 'Bergen',    sky: '#f0f7ff', hill: '#cfe2f7', deep: '#aecbe8', prop: 'rock'  },
      { name: 'Stranden',  sky: '#fff8ec', hill: '#f6e2bd', deep: '#eccf9b', prop: 'shell' },
      { name: 'Rymden',    sky: '#f4f1ff', hill: '#ded4f7', deep: '#c3b3ea', prop: 'star'  },
      { name: 'Godisland', sky: '#fff2f8', hill: '#fbd6e7', deep: '#f5b8d3', prop: 'candy' },
      { name: 'Havet',     sky: '#eefcff', hill: '#c9eef5', deep: '#a5dfea', prop: 'wave'  },
      { name: 'Slottet',   sky: '#fffceb', hill: '#f7eab0', deep: '#efd97e', prop: 'flag'  },
  ];
  const worldIndex = (i: number) => Math.min(WORLDS.length - 1, Math.floor(i / 5));

  // The trail winds like a snake: two gentle waves added together, so no two
  // bends look the same and the child always sees the next stone before it.
  const levelNodes = useMemo(() => {
      const amp = Math.min(mapWidth * 0.30, 132);
      return levels.map((level, i) => {
          const y = i * NODE_SPACING + TOP_PAD;
          const wave = Math.sin(i * 0.82) * 0.78 + Math.sin(i * 0.41 + 1.3) * 0.22;
          return {
              ...level,
              x: mapWidth / 2 + wave * amp,
              y,
              world: worldIndex(i),
          };
      });
  }, [levels, mapWidth]);

  const totalHeight = levelNodes.length * NODE_SPACING + 360;

  // Smooth trail through the stones (Catmull-Rom -> cubic Bézier)
  const pathData = useMemo(() => {
      if (levelNodes.length === 0) return '';
      const pts = levelNodes.map(n => ({ x: n.x, y: n.y }));
      // Lead-in from above so the trail starts off-screen like a path coming from the forest
      const first = pts[0];
      const lead = { x: first.x, y: first.y - NODE_SPACING * 0.9 };
      const all = [lead, ...pts];
      let d = `M ${all[0].x.toFixed(1)} ${all[0].y.toFixed(1)}`;
      for (let i = 0; i < all.length - 1; i++) {
          const p0 = all[i - 1] || all[i];
          const p1 = all[i];
          const p2 = all[i + 1];
          const p3 = all[i + 2] || p2;
          const c1 = { x: p1.x + (p2.x - p0.x) / 6, y: p1.y + (p2.y - p0.y) / 6 };
          const c2 = { x: p2.x - (p3.x - p1.x) / 6, y: p2.y - (p3.y - p1.y) / 6 };
          d += ` C ${c1.x.toFixed(1)} ${c1.y.toFixed(1)}, ${c2.x.toFixed(1)} ${c2.y.toFixed(1)}, ${p2.x.toFixed(1)} ${p2.y.toFixed(1)}`;
      }
      return d;
  }, [levelNodes]);

  // Landscape: soft hills at every world change + small props beside the trail
  const scenery = useMemo(() => {
      const items: { key: string; left: number; top: number; size: number; kind: string; world: number; flip: boolean }[] = [];
      for (let i = 0; i < levelNodes.length; i++) {
          const w = levelNodes[i].world;
          // Two props per level, one on each side of the trail, deterministic "random"
          for (let k = 0; k < 2; k++) {
              const seed = i * 7 + k * 13;
              const r1 = ((seed * 9301 + 49297) % 233280) / 233280;
              const r2 = ((seed * 4801 + 12345) % 233280) / 233280;
              const side = k === 0 ? -1 : 1;
              const node = levelNodes[i];
              const left = node.x + side * (54 + r1 * Math.max(30, mapWidth * 0.16));
              if (left < 18 || left > mapWidth - 18) continue;
              items.push({
                  key: `${i}-${k}`,
                  left,
                  top: node.y - 30 + r2 * 60,
                  size: 22 + r1 * 18,
                  kind: WORLDS[w].prop,
                  world: w,
                  flip: r2 > 0.5,
              });
          }
      }
      return items;
  }, [levelNodes, mapWidth]);

  const worldBands = useMemo(() => {
      const bands: { world: number; top: number; height: number }[] = [];
      for (let i = 0; i < levelNodes.length; i++) {
          const w = levelNodes[i].world;
          const last = bands[bands.length - 1];
          if (last && last.world === w) last.height = levelNodes[i].y - last.top + NODE_SPACING;
          else bands.push({ world: w, top: levelNodes[i].y - NODE_SPACING * 0.75, height: NODE_SPACING * 1.75 });
      }
      return bands;
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
                ref={mapRef}
                className="relative w-full max-w-md sm:max-w-xl mx-auto overflow-hidden"
                style={{ height: totalHeight }}
            >
                {/* World bands: soft sky + rolling hills */}
                <div className="absolute inset-0 z-0 overflow-hidden">
                    {worldBands.map((band, idx) => {
                        const w = WORLDS[band.world];
                        return (
                            <div key={idx} className="absolute left-0 right-0" style={{ top: band.top, height: band.height }}>
                                <div className="absolute inset-0" style={{ background: w.sky }} />
                                <svg viewBox="0 0 400 120" preserveAspectRatio="none" className="absolute bottom-0 left-0 w-full" style={{ height: '55%' }}>
                                    <path d="M0 120 L0 70 Q 60 30 130 62 Q 190 88 250 54 Q 320 20 400 66 L400 120 Z" fill={w.hill} opacity="0.85" />
                                    <path d="M0 120 L0 96 Q 90 70 170 92 Q 250 112 330 88 Q 370 78 400 92 L400 120 Z" fill={w.deep} opacity="0.7" />
                                </svg>
                            </div>
                        );
                    })}
                </div>

                {/* The trail */}
                <div className="absolute inset-0 z-0 pointer-events-none">
                    <svg
                        width="100%"
                        height={totalHeight}
                        viewBox={`0 0 ${mapWidth} ${totalHeight}`}
                        preserveAspectRatio="none"
                        className="overflow-visible"
                    >
                        {/* sandy shoulder */}
                        <path d={pathData} fill="none" stroke="#e7dcc6" strokeWidth="26" strokeLinecap="round" strokeLinejoin="round" opacity="0.55" />
                        {/* the path itself */}
                        <path d={pathData} fill="none" stroke="#f6efe1" strokeWidth="18" strokeLinecap="round" strokeLinejoin="round" />
                        {/* stepping dashes */}
                        <path d={pathData} fill="none" stroke="#d9c9a8" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" strokeDasharray="10 14" opacity="0.9" />
                    </svg>
                </div>

                {/* Small props beside the trail */}
                {scenery.map(item => (
                    <div
                        key={item.key}
                        className="absolute z-0 pointer-events-none"
                        style={{
                            left: item.left,
                            top: item.top,
                            width: item.size,
                            height: item.size,
                            transform: `translate(-50%, -50%) scaleX(${item.flip ? -1 : 1})`,
                            opacity: 0.75,
                        }}
                    >
                        {item.kind === 'tree' && (
                            <svg viewBox="0 0 40 40" className="w-full h-full">
                                <rect x="17" y="24" width="6" height="14" rx="2" fill="#a1714a" />
                                <path d="M20 4 L33 24 H7 Z" fill="#7cbf73" />
                                <path d="M20 12 L30 28 H10 Z" fill="#63ad59" />
                            </svg>
                        )}
                        {item.kind === 'rock' && (
                            <svg viewBox="0 0 40 40" className="w-full h-full">
                                <path d="M6 30 Q 8 16 18 13 Q 30 10 34 24 Q 35 30 30 30 Z" fill="#b9c4cf" />
                                <path d="M6 30 Q 8 22 14 20 Q 20 26 22 30 Z" fill="#9aa8b6" />
                            </svg>
                        )}
                        {item.kind === 'shell' && (
                            <svg viewBox="0 0 40 40" className="w-full h-full">
                                <path d="M8 28 A 12 12 0 0 1 32 28 Z" fill="#f0b6a6" />
                                <path d="M14 28 L20 18 L26 28 Z" fill="#e79b88" opacity="0.8" />
                            </svg>
                        )}
                        {item.kind === 'star' && (
                            <svg viewBox="0 0 40 40" className="w-full h-full">
                                <path d="M20 5 L24 15 L35 16 L27 23 L29 34 L20 28 L11 34 L13 23 L5 16 L16 15 Z" fill="#c9bcf0" />
                            </svg>
                        )}
                        {item.kind === 'candy' && (
                            <svg viewBox="0 0 40 40" className="w-full h-full">
                                <circle cx="20" cy="20" r="11" fill="#f7a8c8" />
                                <path d="M9 20 A 11 11 0 0 1 20 9" stroke="#fff" strokeWidth="3" fill="none" />
                                <path d="M31 20 A 11 11 0 0 1 20 31" stroke="#fff" strokeWidth="3" fill="none" />
                            </svg>
                        )}
                        {item.kind === 'wave' && (
                            <svg viewBox="0 0 40 40" className="w-full h-full">
                                <path d="M4 24 Q 12 14 20 24 T 36 24" stroke="#7ccfdd" strokeWidth="5" fill="none" strokeLinecap="round" />
                            </svg>
                        )}
                        {item.kind === 'flag' && (
                            <svg viewBox="0 0 40 40" className="w-full h-full">
                                <rect x="18" y="8" width="3" height="26" rx="1.5" fill="#b9a45e" />
                                <path d="M21 9 L34 14 L21 19 Z" fill="#e8c65a" />
                            </svg>
                        )}
                    </div>
                ))}

                {/* Level Nodes */}
                {levelNodes.map((node, index) => {
                    const isUnlocked = gameState.totalStars >= node.unlocksAtStars;
                    const isCompleted = gameState.completedLevels.includes(node.id);
                    const isNext = isUnlocked && !isCompleted && (!gameState.completedLevels.includes(node.id + 1));

                    return (
                        <div
                            key={node.id}
                            id={`level-node-${node.id}`}
                            className="absolute z-10 flex flex-col items-center"
                            style={{ left: node.x, top: node.y, transform: 'translate(-50%, -50%)' }}
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