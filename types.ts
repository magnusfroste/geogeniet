
export type ShapeType = 
  | 'circle' 
  | 'square' 
  | 'triangle' 
  | 'rectangle' 
  | 'star' 
  | 'pentagon' 
  | 'hexagon' 
  | 'heptagon'
  | 'octagon' 
  | 'nonagon'
  | 'decagon'
  | 'dodecagon'
  | 'rhombus' 
  | 'trapezoid' 
  | 'parallelogram' 
  | 'semi-circle'
  | 'circular-segment'
  | 'star-6'
  | 'star-8'
  | 'ellipse'
  | 'oval'
  | 'arch';

export type AudioTheme = 'menu' | 'space' | 'nature' | 'fun';

export interface Position {
  x: number; // Percentage 0-100
  y: number; // Percentage 0-100
}

export interface GameShape {
  id: string;
  type: ShapeType;
  color: string;
  targetPosition: Position; // Where it needs to go
  startPosition: Position;  // Where it spawns
  rotation?: number;
  scale?: number;
}

export interface LevelData {
  id: number;
  title: string;
  description: string;
  shapes: GameShape[];
  unlocksAtStars: number;
  challengeTime?: number; // Optional manual override for time limit
}

export interface Sticker {
    id: string;
    title: string;
    emoji: string; // Using emojis for colorful, lightweight graphics
    description: string;
    requiredStars: number;
    bgColor: string;
}

export interface GameState {
  currentLevelId: number | null;
  completedLevels: number[];
  totalStars: number;
  unlockedLevels: number[];
  viewingStickers: boolean;
  viewingInfo: boolean;
  challengeMode: boolean; // New feature
}

export interface Particle {
  id: number;
  x: number;
  y: number;
  color: string;
  angle: number;
  speed: number;
  size: number;
}