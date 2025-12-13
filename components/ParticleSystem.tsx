import React, { useEffect, useState } from 'react';
import { Particle } from '../types';

export const ParticleSystem: React.FC<{ active: boolean }> = ({ active }) => {
  const [particles, setParticles] = useState<Particle[]>([]);

  useEffect(() => {
    if (active) {
      const colors = ['#ff6b6b', '#4ecdc4', '#ffe66d', '#9d4edd', '#0071e3'];
      const newParticles: Particle[] = [];
      
      // Explosion center
      const cx = window.innerWidth / 2;
      const cy = window.innerHeight / 2;

      for (let i = 0; i < 60; i++) {
        const angle = Math.random() * Math.PI * 2;
        const speed = 2 + Math.random() * 6;
        newParticles.push({
          id: i,
          x: cx,
          y: cy,
          color: colors[Math.floor(Math.random() * colors.length)],
          angle,
          speed,
          size: 8 + Math.random() * 8
        });
      }
      setParticles(newParticles);
    } else {
      setParticles([]);
    }
  }, [active]);

  useEffect(() => {
    if (particles.length === 0) return;

    const interval = setInterval(() => {
      setParticles(prev => 
        prev.map(p => ({
          ...p,
          x: p.x + Math.cos(p.angle) * p.speed,
          y: p.y + Math.sin(p.angle) * p.speed + 2, // Add gravity
          speed: p.speed * 0.96 // Friction
        })).filter(p => p.y < window.innerHeight + 20) // Remove off screen
      );
    }, 16);

    return () => clearInterval(interval);
  }, [particles]);

  if (!active && particles.length === 0) return null;

  return (
    <div className="fixed inset-0 pointer-events-none z-50 overflow-hidden">
      {particles.map(p => (
        <div
          key={p.id}
          className="absolute rounded-full"
          style={{
            left: p.x,
            top: p.y,
            width: p.size,
            height: p.size,
            backgroundColor: p.color,
          }}
        />
      ))}
    </div>
  );
};