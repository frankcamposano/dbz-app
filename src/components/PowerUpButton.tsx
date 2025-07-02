import React, { useState, useRef, useCallback, useEffect } from 'react';
import { Zap, Play } from 'lucide-react';

interface PowerUpButtonProps {
  maxPowerLevel: number;
  onMaxPowerReached: () => void;
  battleVideoUrl?: string;
}

export const PowerUpButton: React.FC<PowerUpButtonProps> = ({ 
  maxPowerLevel, 
  onMaxPowerReached,
  battleVideoUrl 
}) => {
  const [currentPower, setCurrentPower] = useState(0);
  const [isCharging, setIsCharging] = useState(false);
  const [maxReached, setMaxReached] = useState(false);
  const [showAura, setShowAura] = useState(false);
  const intervalRef = useRef<number | null>(null);
  const timeoutRef = useRef<number | null>(null);
  const audioRef = useRef<HTMLAudioElement | null>(null);

  const startCharging = useCallback(() => {
    if (maxReached) return;
    
    setIsCharging(true);
    setShowAura(true);

    // Crear y reproducir el audio en loop
    const audio = new Audio('/audios/ki.mp3');
    audio.loop = true;
    audioRef.current = audio;
    audio.play().catch(error => console.error('Error playing audio:', error));
    
    intervalRef.current = window.setInterval(() => {
      setCurrentPower(prev => {
        const increment = maxPowerLevel / 100; // Alcanzar máximo en ~2 segundos
        const newPower = Math.min(prev + increment, maxPowerLevel);
        
        if (newPower >= maxPowerLevel && !maxReached) {
          setMaxReached(true);
          setIsCharging(false);
          // Pequeña pausa antes de mostrar la carta especial
          setTimeout(() => {
            // Efecto de flash en la pantalla
            const flash = document.createElement('div');
            flash.className = 'fixed inset-0 bg-white z-50';
            flash.style.animation = 'flash 1s forwards';
            document.body.appendChild(flash);
            
            // Reproducir sonido de transformación
            const transformSound = new Audio('/audios/ki.mp3');
            transformSound.play();
            
            // Llamar al callback después del flash
            setTimeout(() => {
          onMaxPowerReached();
              document.body.removeChild(flash);
            }, 1000);
          }, 500);

          if (intervalRef.current) {
            clearInterval(intervalRef.current);
          }
          // Detener el audio cuando se alcanza el máximo
          if (audioRef.current) {
            audioRef.current.pause();
            audioRef.current.currentTime = 0;
          }
        }
        
        return newPower;
      });
    }, 20);
  }, [maxPowerLevel, maxReached, onMaxPowerReached]);

  const stopCharging = useCallback(() => {
    setIsCharging(false);
    setShowAura(false);
    if (intervalRef.current) {
      clearInterval(intervalRef.current);
    }

    // Detener el audio cuando se suelta el botón
    if (audioRef.current) {
      audioRef.current.pause();
      audioRef.current.currentTime = 0;
    }
    
    // Disminuir poder lentamente si no está al máximo
    if (!maxReached) {
      timeoutRef.current = window.setTimeout(() => {
        const decreaseInterval = window.setInterval(() => {
          setCurrentPower(prev => {
            const newPower = Math.max(prev - maxPowerLevel / 50, 0);
            if (newPower <= 0) {
              clearInterval(decreaseInterval);
            }
            return newPower;
          });
        }, 50);
      }, 500);
    }
  }, [maxPowerLevel, maxReached]);

  useEffect(() => {
    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current);
      if (timeoutRef.current) clearTimeout(timeoutRef.current);
      if (audioRef.current) {
        audioRef.current.pause();
        audioRef.current.currentTime = 0;
      }
    };
  }, []);

  const powerPercentage = (currentPower / maxPowerLevel) * 100;

  return (
    <div className="relative flex flex-col items-center space-y-4">
      {/* Aura Effect */}
      {showAura && (
        <div className="absolute inset-0 z-0">
          <div className="absolute inset-0 bg-blue-500/20 rounded-full animate-pulse" />
          <div className="absolute inset-0 bg-yellow-500/10 rounded-full animate-ping" />
          <div className="absolute inset-0 border-4 border-blue-400/50 rounded-full animate-spin" style={{ animationDuration: '3s' }} />
          <div className="absolute inset-0 border-4 border-yellow-400/30 rounded-full animate-spin" style={{ animationDuration: '4s', animationDirection: 'reverse' }} />
        </div>
      )}

      {/* Visualización del Nivel de Poder */}
      <div className="text-center z-10">
        <div className={`text-2xl font-bold mb-2 transition-all duration-300 ${
          maxReached ? 'text-yellow-400 scale-110' : 'text-white'
        }`}>
          Nivel de Poder: {Math.floor(currentPower).toLocaleString()}
        </div>
        <div className="w-64 h-4 bg-gray-800 rounded-full overflow-hidden border-2 border-orange-500 relative">
          <div 
            className={`h-full transition-all duration-100 ${
              maxReached 
                ? 'bg-gradient-to-r from-yellow-400 via-orange-500 to-red-500 animate-pulse' 
                : 'bg-gradient-to-r from-blue-500 to-purple-600'
            }`}
            style={{ width: `${powerPercentage}%` }}
          />
          {isCharging && (
            <div className="absolute inset-0 bg-white/30 animate-pulse" />
          )}
        </div>
        <div className={`text-sm mt-1 transition-all duration-300 ${
          maxReached ? 'text-yellow-400' : 'text-white/70'
        }`}>
          {powerPercentage.toFixed(1)}% del poder máximo
        </div>
      </div>

      {/* Botón de Carga */}
      <button
        onMouseDown={startCharging}
        onMouseUp={stopCharging}
        onMouseLeave={stopCharging}
        onTouchStart={startCharging}
        onTouchEnd={stopCharging}
        disabled={maxReached}
        className={`relative z-10 group px-8 py-4 rounded-xl font-bold text-lg transition-all duration-300 transform select-none ${
          maxReached
            ? 'bg-gradient-to-r from-yellow-500 to-orange-500 text-black cursor-default scale-110'
            : isCharging
            ? 'bg-gradient-to-r from-blue-600 to-purple-700 text-white scale-110 animate-pulse'
            : 'bg-gradient-to-r from-gray-700 to-gray-800 text-white hover:from-blue-500 hover:to-purple-600 hover:scale-105'
        }`}
      >
        <div className="flex items-center space-x-2">
          <Zap className={`w-6 h-6 ${isCharging ? 'animate-spin' : ''}`} />
          <span>
            {maxReached ? '¡PODER MÁXIMO!' : isCharging ? 'CARGANDO...' : 'MANTÉN PARA CARGAR'}
          </span>
        </div>
        
        {isCharging && (
          <>
          <div className="absolute inset-0 bg-white/20 rounded-xl animate-pulse" />
            <div className="absolute -inset-1 bg-blue-500/20 rounded-xl animate-ping" />
          </>
        )}
      </button>

      {/* Botón de Video de Batalla */}
      {maxReached && battleVideoUrl && (
        <button
          onClick={() => window.open(battleVideoUrl, '_blank')}
          className="group z-10 px-6 py-3 bg-gradient-to-r from-red-600 to-orange-600 text-white rounded-lg font-bold transition-all duration-300 transform hover:scale-105 hover:from-red-500 hover:to-orange-500 animate-bounce"
        >
          <div className="flex items-center space-x-2">
            <Play className="w-5 h-5" />
            <span>¡VER BATALLA ÉPICA!</span>
          </div>
        </button>
      )}

      {/* Lightning Effects cuando está cargando */}
      {isCharging && (
        <div className="absolute inset-0 pointer-events-none z-20">
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
            {[...Array(4)].map((_, i) => (
              <div
                key={i}
                className="absolute w-0.5 h-16 bg-blue-400"
                style={{
                  transform: `rotate(${i * 90}deg)`,
                  animation: `lightning ${1 + i * 0.2}s infinite`,
                  opacity: 0.6,
                }}
              />
            ))}
          </div>
        </div>
      )}

      <style>
        {`
          @keyframes lightning {
            0%, 100% { transform: scale(1) rotate(0deg); opacity: 0.6; }
            50% { transform: scale(1.5) rotate(45deg); opacity: 0.8; }
          }
        `}
      </style>
    </div>
  );
};