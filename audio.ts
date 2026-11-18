
import { AudioTheme } from './types';

// Simple synth for game sounds using Web Audio API
// This avoids the need for external assets for SFX
let audioCtx: AudioContext | null = null;
let musicAudio: HTMLAudioElement | null = null;
let currentTheme: AudioTheme | null = null;
let isMuted = false;

// Map themes to filenames. 
// Note: In a real deployment, ensure these files exist in the public folder.
// If a file is missing, the browser will just fail to load it silently or show a console error, 
// but the game will continue.
const MUSIC_TRACKS: Record<AudioTheme, string> = {
  menu: '/music-menu.mp3',   // Calm, welcoming
  space: '/music-space.mp3', // Ambient, sci-fi
  nature: '/music-nature.mp3', // Birds, wind, soft acoustic
  fun: '/music-fun.mp3'      // Upbeat, energetic
};

const getCtx = () => {
  if (!audioCtx) {
    audioCtx = new (window.AudioContext || (window as any).webkitAudioContext)();
  }
  return audioCtx;
};

export const initAudio = () => {
  const ctx = getCtx();
  if (ctx.state === 'suspended') {
    ctx.resume();
  }
  
  // Initialize music element if not exists
  if (!musicAudio) {
    musicAudio = new Audio();
    musicAudio.loop = true;
    musicAudio.volume = 0.3;
  }
};

export const playBackgroundMusic = (theme: AudioTheme) => {
  if (!musicAudio) initAudio();
  if (!musicAudio) return;

  // If the requested theme is already playing, do nothing
  if (currentTheme === theme && !musicAudio.paused) return;

  currentTheme = theme;
  const src = MUSIC_TRACKS[theme] || MUSIC_TRACKS['menu'];
  
  // Update source
  // Note: changing src pauses the audio automatically
  const wasPlaying = !musicAudio.paused;
  musicAudio.src = src;

  if (!isMuted) {
      musicAudio.play().catch(e => {
          // Auto-play policies might block this if no user interaction yet
          console.log("Music play blocked or file missing:", e);
      });
  }
};

export const toggleMute = (mute: boolean) => {
    isMuted = mute;
    if (musicAudio) {
        if (mute) {
            musicAudio.pause();
        } else {
            // If unmuting, resume current track
            if (currentTheme && musicAudio.src) {
                musicAudio.play().catch(() => {});
            }
        }
    }
}

export const playSnap = () => {
  if (isMuted) return;
  const ctx = getCtx();
  const t = ctx.currentTime;
  
  const osc = ctx.createOscillator();
  const gain = ctx.createGain();
  
  osc.connect(gain);
  gain.connect(ctx.destination);
  
  // "Wood block" / "Pop" sound
  osc.type = 'sine';
  osc.frequency.setValueAtTime(400, t);
  osc.frequency.exponentialRampToValueAtTime(600, t + 0.05);
  
  gain.gain.setValueAtTime(0.5, t);
  gain.gain.exponentialRampToValueAtTime(0.01, t + 0.1);
  
  osc.start(t);
  osc.stop(t + 0.1);
};

export const playVictory = () => {
    if (isMuted) return;
    const ctx = getCtx();
    const t = ctx.currentTime;
    
    const playNote = (freq: number, startTime: number, duration: number, type: OscillatorType = 'triangle') => {
        const osc = ctx.createOscillator();
        const gain = ctx.createGain();
        osc.connect(gain);
        gain.connect(ctx.destination);
        
        osc.type = type;
        osc.frequency.setValueAtTime(freq, startTime);
        
        gain.gain.setValueAtTime(0, startTime);
        gain.gain.linearRampToValueAtTime(0.2, startTime + 0.05);
        gain.gain.exponentialRampToValueAtTime(0.01, startTime + duration);
        
        osc.start(startTime);
        osc.stop(startTime + duration);
    };

    // Nice major chord flourish
    playNote(523.25, t, 0.5);       // C5
    playNote(659.25, t + 0.1, 0.5); // E5
    playNote(783.99, t + 0.2, 0.5); // G5
    playNote(1046.50, t + 0.4, 0.8, 'sine'); // C6
};

export const playClick = () => {
    if (isMuted) return;
    const ctx = getCtx();
    const t = ctx.currentTime;
    
    const osc = ctx.createOscillator();
    const gain = ctx.createGain();
    
    osc.connect(gain);
    gain.connect(ctx.destination);
    
    osc.type = 'triangle';
    osc.frequency.setValueAtTime(800, t);
    
    gain.gain.setValueAtTime(0.05, t);
    gain.gain.exponentialRampToValueAtTime(0.001, t + 0.05);
    
    osc.start(t);
    osc.stop(t + 0.05);
}

// Gentle sound when picking up a piece
export const playPickUp = () => {
    if (isMuted) return;
    const ctx = getCtx();
    const t = ctx.currentTime;

    const osc = ctx.createOscillator();
    const gain = ctx.createGain();

    osc.connect(gain);
    gain.connect(ctx.destination);

    // Soft sine rise
    osc.type = 'sine';
    osc.frequency.setValueAtTime(200, t);
    osc.frequency.linearRampToValueAtTime(300, t + 0.1);

    gain.gain.setValueAtTime(0.1, t);
    gain.gain.exponentialRampToValueAtTime(0.001, t + 0.1);

    osc.start(t);
    osc.stop(t + 0.1);
}

// Very subtle tick/scratch sound while dragging
export const playDragMove = () => {
    if (isMuted) return;
    const ctx = getCtx();
    const t = ctx.currentTime;

    const osc = ctx.createOscillator();
    const gain = ctx.createGain();

    osc.connect(gain);
    gain.connect(ctx.destination);

    // Low frequency rumble/tick
    osc.type = 'triangle';
    osc.frequency.setValueAtTime(100, t);
    
    // Very quiet and short
    gain.gain.setValueAtTime(0.02, t);
    gain.gain.exponentialRampToValueAtTime(0.001, t + 0.04);

    osc.start(t);
    osc.stop(t + 0.04);
}
