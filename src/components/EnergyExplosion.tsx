import React, { useEffect, useState } from 'react';

interface EnergyExplosionProps {
  x: number;
  y: number;
  color: string;
  onComplete: () => void;
}

export const EnergyExplosion: React.FC<EnergyExplosionProps> = ({
  x,
  y,
  color,
  onComplete
}) => {
  const [scale, setScale] = useState(0);
  const [opacity, setOpacity] = useState(1);

  useEffect(() => {
    let startTime = Date.now();
    const duration = 1000; // 1 segundo de duración

    const animate = () => {
      const elapsed = Date.now() - startTime;
      const progress = Math.min(elapsed / duration, 1);

      // Escala crece rápido al principio y luego más lento
      setScale(Math.pow(progress, 0.5) * 100);
      
      // Opacidad disminuye gradualmente
      setOpacity(1 - Math.pow(progress, 2));

      if (progress < 1) {
        requestAnimationFrame(animate);
      } else {
        onComplete();
      }
    };

    animate();
  }, [onComplete]);

  return (
    <div
      className="fixed pointer-events-none z-50"
      style={{
        left: x,
        top: y,
        transform: `translate(-50%, -50%) scale(${scale})`,
        opacity
      }}
    >
      {/* Anillos de energía */}
      <div
        className="absolute rounded-full animate-ping"
        style={{
          width: '20px',
          height: '20px',
          background: `radial-gradient(circle, ${color}80 0%, transparent 70%)`,
          animation: 'ping 1s cubic-bezier(0, 0, 0.2, 1) infinite'
        }}
      />

      {/* Destellos centrales */}
      <div
        className="absolute rounded-full"
        style={{
          width: '10px',
          height: '10px',
          background: color,
          boxShadow: `0 0 20px ${color}, 0 0 40px ${color}, 0 0 60px ${color}`
        }}
      />

      {/* Rayos de energía */}
      {Array.from({ length: 12 }).map((_, i) => (
        <div
          key={i}
          className="absolute w-1 h-20 origin-bottom"
          style={{
            left: '50%',
            bottom: '50%',
            transform: `translateX(-50%) rotate(${i * 30}deg)`,
            background: `linear-gradient(to top, ${color}00, ${color})`
          }}
        />
      ))}
    </div>
  );
}; 