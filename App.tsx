
import React, { useState, useEffect } from 'react';
import { LEVELS } from './constants';
import { GameState } from './types';
import { LevelMap } from './components/LevelMap';
import { GameBoard } from './components/GameBoard';
import { ParticleSystem } from './components/ParticleSystem';
import { IntroScreen } from './components/IntroScreen';
import { StickerBook } from './components/StickerBook';
import { InfoModal } from './components/InfoModal';
import { Star, ArrowRight, Menu, Plus } from 'lucide-react';
import { playVictory, initAudio, playClick } from './audio';

const STORAGE_KEY = 'geogeniet-save-v1';
const INTRO_SEEN_KEY = 'geogeniet-intro-seen-v1';

export default function App() {
  const [gameState, setGameState] = useState<GameState>(() => {
    const saved = localStorage.getItem(STORAGE_KEY);
    if (saved) {
      const parsed = JSON.parse(saved);
      // Ensure challengeMode exists in legacy saves
      return { ...parsed, challengeMode: parsed.challengeMode || false };
    }
    return {
      currentLevelId: null,
      completedLevels: [],
      totalStars: 0,
      unlockedLevels: [1],
      viewingStickers: false,
      viewingInfo: false,
      challengeMode: false
    };
  });

  const [showVictory, setShowVictory] = useState(false);
  const [lastBonus, setLastBonus] = useState(0); // Track bonus for victory screen
  const [isMuted, setIsMuted] = useState(false);
  const [showIntro, setShowIntro] = useState(false);

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(gameState));
  }, [gameState]);

  // Check if intro has been seen
  useEffect(() => {
    const seen = localStorage.getItem(INTRO_SEEN_KEY);
    if (!seen) {
        setShowIntro(true);
    }
  }, []);

  // Unlock AudioContext on first interaction
  useEffect(() => {
      const unlockAudio = () => {
          initAudio();
          window.removeEventListener('click', unlockAudio);
          window.removeEventListener('touchstart', unlockAudio);
      };
      window.addEventListener('click', unlockAudio);
      window.addEventListener('touchstart', unlockAudio);
      return () => {
          window.removeEventListener('click', unlockAudio);
          window.removeEventListener('touchstart', unlockAudio);
      }
  }, []);

  const handleDismissIntro = () => {
      setShowIntro(false);
      localStorage.setItem(INTRO_SEEN_KEY, 'true');
  };

  const handleLevelSelect = (levelId: number) => {
    setGameState(prev => ({ ...prev, currentLevelId: levelId }));
    setShowVictory(false);
  };

  const handleLevelExit = () => {
    setGameState(prev => ({ ...prev, currentLevelId: null }));
    setShowVictory(false);
  };

  const handleLevelComplete = (bonusStars: number = 0) => {
    const currentId = gameState.currentLevelId;
    if (!currentId) return;

    // Trigger Victory Sound
    playVictory();

    const isFirstTime = !gameState.completedLevels.includes(currentId);
    
    // Calculate rewards
    let earnedStars = 0;
    
    if (isFirstTime) {
      earnedStars += 3; 
    }
    
    // Always award bonus if challenge met? Or only first time?
    // Let's say bonus is always awarded if met, but to prevent infinite farming, maybe just visual praise if not first time?
    // Actually, "Award bonus stars" implies increasing the total. Let's add it. 
    // To prevent abuse, maybe only 1 bonus star ever per level? Tracking that is complex.
    // Let's just award it for now. It's a kids game.
    earnedStars += bonusStars;
    setLastBonus(bonusStars);

    setGameState(prev => ({
      ...prev,
      completedLevels: isFirstTime ? [...prev.completedLevels, currentId] : prev.completedLevels,
      totalStars: prev.totalStars + earnedStars,
    }));

    setShowVictory(true);
  };

  const handleNextLevel = () => {
    playClick();
    const nextId = (gameState.currentLevelId || 0) + 1;
    const nextLevelExists = LEVELS.find(l => l.id === nextId);
    
    if (nextLevelExists) {
        setGameState(prev => ({ ...prev, currentLevelId: nextId }));
        setShowVictory(false);
    } else {
        handleLevelExit();
    }
  };

  const toggleChallengeMode = () => {
      setGameState(prev => ({ ...prev, challengeMode: !prev.challengeMode }));
  };

  const currentLevelData = LEVELS.find(l => l.id === gameState.currentLevelId);
  const nextLevelAvailable = gameState.currentLevelId ? LEVELS.find(l => l.id === gameState.currentLevelId! + 1) : false;

  // Victory Screen Component
  const VictoryScreen = () => (
    <div className="absolute inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm animate-fade-in">
      <div className="bg-white rounded-3xl p-8 max-w-sm w-full mx-4 shadow-2xl flex flex-col items-center animate-bounce-small">
        <h2 className="text-3xl font-bold text-slate-800 mb-2">Bra jobbat!</h2>
        <div className="flex space-x-2 mb-6 items-end">
            {[1, 2, 3].map((s, i) => (
                <Star 
                    key={s} 
                    size={48} 
                    className="text-yellow-400 fill-yellow-400 animate-pop" 
                    style={{ animationDelay: `${i * 150}ms` }} 
                />
            ))}
            {lastBonus > 0 && (
                <div className="relative animate-pop" style={{ animationDelay: '600ms' }}>
                    <Star size={56} className="text-red-400 fill-red-400" />
                    <div className="absolute inset-0 flex items-center justify-center text-white font-black text-sm">
                        <Plus size={16} strokeWidth={4} />
                    </div>
                </div>
            )}
        </div>
        <p className="text-slate-500 mb-8 text-center">
            Du klarade pusslet!
            {lastBonus > 0 && <span className="block text-red-500 font-bold mt-1">Challenge Bonus!</span>}
        </p>
        
        {nextLevelAvailable ? (
            <button 
                onClick={handleNextLevel}
                className="w-full bg-apple-blue text-white font-bold py-4 rounded-xl shadow-lg hover:shadow-xl active:scale-95 transition-all flex items-center justify-center text-lg"
            >
                Nästa nivå <ArrowRight className="ml-2" />
            </button>
        ) : (
            <button 
                onClick={() => { playClick(); handleLevelExit(); }}
                className="w-full bg-apple-blue text-white font-bold py-4 rounded-xl shadow-lg hover:shadow-xl active:scale-95 transition-all flex items-center justify-center text-lg"
            >
                Till kartan <Menu className="ml-2" />
            </button>
        )}
      </div>
    </div>
  );

  return (
    <div className="w-full h-screen overflow-hidden bg-slate-50 font-sans text-slate-900">
      <ParticleSystem active={showVictory} />
      
      {showIntro && <IntroScreen onDismiss={handleDismissIntro} />}
      
      {gameState.viewingStickers && (
          <StickerBook 
            totalStars={gameState.totalStars} 
            onClose={() => setGameState(prev => ({ ...prev, viewingStickers: false }))} 
          />
      )}

      {gameState.viewingInfo && (
          <InfoModal 
            totalLevels={LEVELS.length}
            onClose={() => setGameState(prev => ({ ...prev, viewingInfo: false }))}
          />
      )}

      {gameState.currentLevelId && currentLevelData ? (
        <>
            <GameBoard 
                level={currentLevelData} 
                onComplete={handleLevelComplete} 
                onExit={handleLevelExit}
                challengeMode={gameState.challengeMode}
            />
            {showVictory && <VictoryScreen />}
        </>
      ) : (
        <LevelMap 
          levels={LEVELS} 
          gameState={gameState} 
          onSelectLevel={handleLevelSelect} 
          isMuted={isMuted}
          onToggleMute={() => setIsMuted(prev => !prev)}
          onOpenStickers={() => setGameState(prev => ({ ...prev, viewingStickers: true }))}
          onOpenInfo={() => setGameState(prev => ({ ...prev, viewingInfo: true }))}
          onToggleChallengeMode={toggleChallengeMode}
        />
      )}
    </div>
  );
}