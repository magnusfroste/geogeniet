import React from 'react';
import { ShapeType } from '../types';

interface ShapeRenderProps {
  type: ShapeType;
  className?: string;
  style?: React.CSSProperties;
}

// Helper to generate path data for regular polygons
const getPolyPath = (sides: number, r: number = 40, cx: number = 50, cy: number = 50, startAngleOffset: number = -Math.PI / 2) => {
  let d = "";
  for (let i = 0; i < sides; i++) {
    const angle = startAngleOffset + (2 * Math.PI * i) / sides;
    const x = cx + r * Math.cos(angle);
    const y = cy + r * Math.sin(angle);
    d += `${i === 0 ? 'M' : 'L'}${x.toFixed(2)} ${y.toFixed(2)}`;
  }
  return d + " Z";
};

// Helper to generate path data for stars
const getStarPath = (points: number, rOuter: number, rInner: number, cx: number = 50, cy: number = 50) => {
  let d = "";
  const step = Math.PI / points;
  let angle = -Math.PI / 2;
  for (let i = 0; i < points * 2; i++) {
    const r = i % 2 === 0 ? rOuter : rInner;
    const x = cx + r * Math.cos(angle);
    const y = cy + r * Math.sin(angle);
    d += `${i === 0 ? 'M' : 'L'}${x.toFixed(2)} ${y.toFixed(2)}`;
    angle += step;
  }
  return d + " Z";
};

export const ShapeRender: React.FC<ShapeRenderProps> = ({ type, className = '', style = {} }) => {
  const commonProps = {
    className: `w-full h-full ${className}`,
    style,
    fill: "currentColor"
  };

  switch (type) {
    case 'circle':
      return (
        <svg viewBox="0 0 100 100" {...commonProps}>
          <circle cx="50" cy="50" r="45" />
        </svg>
      );
    case 'ellipse':
      return (
        <svg viewBox="0 0 100 100" {...commonProps}>
          <ellipse cx="50" cy="50" rx="45" ry="30" />
        </svg>
      );
    case 'oval':
      return (
        <svg viewBox="0 0 100 100" {...commonProps}>
           {/* Egg shape path */}
           <path d="M50 10 C 85 10 90 55 90 65 C 90 90 75 95 50 95 C 25 95 10 90 10 65 C 10 55 15 10 50 10 Z" strokeLinejoin="round" strokeWidth="8" stroke="currentColor"/>
        </svg>
      );
    case 'arch':
      return (
        <svg viewBox="0 0 100 100" {...commonProps}>
            {/* Arch/Rainbow shape: Outer radius 40, Inner radius 20, centered at 50,70 */}
            <path d="M 10 70 A 40 40 0 0 1 90 70 L 70 70 A 20 20 0 0 0 30 70 Z" strokeLinejoin="round" strokeWidth="8" stroke="currentColor" />
        </svg>
      );
    case 'square':
      return (
        <svg viewBox="0 0 100 100" {...commonProps}>
          <rect x="10" y="10" width="80" height="80" rx="10" />
        </svg>
      );
    case 'rectangle':
      return (
        <svg viewBox="0 0 100 100" {...commonProps}>
          <rect x="10" y="25" width="80" height="50" rx="8" />
        </svg>
      );
    case 'triangle':
      return (
        <svg viewBox="0 0 100 100" {...commonProps}>
          <path d="M50 15 L85 80 L15 80 Z" strokeLinejoin="round" strokeWidth="10" stroke="currentColor" />
        </svg>
      );
    case 'pentagon':
        return (
            <svg viewBox="0 0 100 100" {...commonProps}>
               <path d="M50 10 L90 38 L75 85 L25 85 L10 38 Z" strokeLinejoin="round" strokeWidth="8" stroke="currentColor"/>
            </svg>
        );
    case 'hexagon':
        return (
            <svg viewBox="0 0 100 100" {...commonProps}>
                <path d="M25 10 L75 10 L95 50 L75 90 L25 90 L5 50 Z" strokeLinejoin="round" strokeWidth="8" stroke="currentColor"/>
            </svg>
        );
    case 'heptagon':
      return (
        <svg viewBox="0 0 100 100" {...commonProps}>
          <path d={getPolyPath(7, 40)} strokeLinejoin="round" strokeWidth="8" stroke="currentColor" />
        </svg>
      );
    case 'octagon':
        return (
            <svg viewBox="0 0 100 100" {...commonProps}>
                <path d="M29 15 L71 15 L92 36 L92 64 L71 85 L29 85 L8 64 L8 36 Z" strokeLinejoin="round" strokeWidth="8" stroke="currentColor"/>
            </svg>
        );
    case 'nonagon':
      return (
        <svg viewBox="0 0 100 100" {...commonProps}>
          <path d={getPolyPath(9, 41)} strokeLinejoin="round" strokeWidth="8" stroke="currentColor" />
        </svg>
      );
    case 'decagon':
      return (
        <svg viewBox="0 0 100 100" {...commonProps}>
          <path d={getPolyPath(10, 42)} strokeLinejoin="round" strokeWidth="8" stroke="currentColor" />
        </svg>
      );
    case 'dodecagon':
      return (
        <svg viewBox="0 0 100 100" {...commonProps}>
          <path d={getPolyPath(12, 42)} strokeLinejoin="round" strokeWidth="8" stroke="currentColor" />
        </svg>
      );
    case 'rhombus':
        return (
            <svg viewBox="0 0 100 100" {...commonProps}>
                <path d="M50 10 L85 50 L50 90 L15 50 Z" strokeLinejoin="round" strokeWidth="8" stroke="currentColor"/>
            </svg>
        );
    case 'trapezoid':
        return (
            <svg viewBox="0 0 100 100" {...commonProps}>
                <path d="M25 80 L75 80 L65 20 L35 20 Z" strokeLinejoin="round" strokeWidth="8" stroke="currentColor"/>
            </svg>
        );
    case 'parallelogram':
        return (
            <svg viewBox="0 0 100 100" {...commonProps}>
                <path d="M20 80 L80 80 L90 20 L30 20 Z" strokeLinejoin="round" strokeWidth="8" stroke="currentColor"/>
            </svg>
        );
    case 'semi-circle':
        return (
            <svg viewBox="0 0 100 100" {...commonProps}>
                <path d="M 10 70 A 40 40 0 0 1 90 70 Z" strokeLinejoin="round" strokeWidth="8" stroke="currentColor" />
            </svg>
        );
    case 'circular-segment':
      return (
        <svg viewBox="0 0 100 100" {...commonProps}>
          {/* Minor segment, centered in viewbox. Width ~85, Height 30. Flat side at y=65. */}
          <path d="M 7.6 65 A 45 45 0 0 1 92.4 65 Z" strokeLinejoin="round" strokeWidth="8" stroke="currentColor" />
        </svg>
      );
    case 'star':
      return (
        <svg viewBox="0 0 100 100" {...commonProps}>
          <path d="M50 10 L61 35 L88 39 L68 57 L73 84 L50 72 L27 84 L32 57 L12 39 L39 35 Z" strokeLinejoin="round" strokeWidth="5" stroke="currentColor" />
        </svg>
      );
    case 'star-6':
      return (
        <svg viewBox="0 0 100 100" {...commonProps}>
           {/* Hexagram made of a single continuous path for filling */}
           <path d={getStarPath(6, 42, 22)} strokeLinejoin="round" strokeWidth="8" stroke="currentColor" />
        </svg>
      );
    case 'star-8':
      return (
        <svg viewBox="0 0 100 100" {...commonProps}>
           <path d={getStarPath(8, 42, 18)} strokeLinejoin="round" strokeWidth="8" stroke="currentColor" />
        </svg>
      );
    default:
      return null;
  }
};