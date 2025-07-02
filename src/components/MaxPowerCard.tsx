import React, { useEffect, useState, useRef } from 'react';
import { Card } from '../types/Cards';
import html2canvas from 'html2canvas';

interface MaxPowerCardProps {
  card: Card;
  onClose: () => void;
}

export const MaxPowerCard: React.FC<MaxPowerCardProps> = ({ card, onClose }) => {
  const [isVisible, setIsVisible] = useState(false);
  const cardRef = React.useRef<HTMLDivElement>(null);
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const [rotation, setRotation] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsVisible(true);
      // Reproducir sonido de aparición
      if (card.specialEffects?.soundEffect) {
        audioRef.current = new Audio(card.specialEffects.soundEffect);
        audioRef.current.volume = 0.5; // Volumen al 50%
        audioRef.current.play().catch(error => console.error('Error playing audio:', error));
      }
    }, 100);

    // Prevenir el scroll mientras la carta está visible
    document.body.style.overflow = 'hidden';
    
    return () => {
      clearTimeout(timer);
      document.body.style.overflow = 'auto';
      // Detener el sonido al cerrar
      if (audioRef.current) {
        audioRef.current.pause();
        audioRef.current.currentTime = 0;
      }
    };
  }, [card.specialEffects?.soundEffect]);

  const handleDownload = async (e: React.MouseEvent) => {
    e.stopPropagation();
    // Reproducir sonido de captura
    const captureSound = new Audio('/audios/ki.mp3');
    captureSound.volume = 0.3;
    captureSound.play();

    if (cardRef.current) {
      const canvas = await html2canvas(cardRef.current, {
        backgroundColor: null,
        useCORS: true
      });
      const link = document.createElement('a');
      link.download = `${card.name.replace(/\s+/g, '_')}_card.png`;
      link.href = canvas.toDataURL();
      link.click();
    }
  };

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!cardRef.current) return;

    const rect = cardRef.current.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;
    
    const rotateY = ((e.clientX - centerX) / (rect.width / 2)) * 10;
    const rotateX = -((e.clientY - centerY) / (rect.height / 2)) * 10;

    setRotation({ x: rotateX, y: rotateY });
  };

  const handleMouseLeave = () => {
    setRotation({ x: 0, y: 0 });
  };

  return (
    <div 
      className="fixed inset-0 flex items-center justify-center"
      style={{ 
        position: 'fixed',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        zIndex: 999999,
        pointerEvents: 'auto'
      }}
      onClick={(e) => {
        if (e.target === e.currentTarget) {
          onClose();
        }
      }}
    >
      {/* Fondo oscuro con efecto de desenfoque */}
      <div 
        className="absolute inset-0 bg-black/80 backdrop-blur-sm"
        style={{ zIndex: 1000000 }}
      />

      {/* Contenedor de la carta */}
      <div
        className={`relative transform transition-all duration-1000 ${
          isVisible ? 'scale-100 opacity-100' : 'scale-0 opacity-0'
        }`}
        style={{ zIndex: 1000001 }}
      >
        {/* Efectos de fondo */}
        <div 
          className="absolute -inset-10 bg-gradient-to-r from-yellow-500 via-orange-500 to-red-500 opacity-30 blur-xl animate-pulse"
        />
        
        {/* Carta */}
        <div
          ref={cardRef}
          onMouseMove={handleMouseMove}
          onMouseLeave={handleMouseLeave}
          className={`relative rounded-xl overflow-hidden ${
            card.specialEffects?.animation
          } hover:scale-105 transition-all duration-300 flex flex-col justify-between`}
          style={{
            width: '300px',
            height: '420px',
            minHeight: '420px',
            position: 'relative',
            boxShadow: `0 0 30px ${card.specialEffects?.auraColor || '#fff'},
                       0 0 60px ${card.specialEffects?.auraColor || '#fff'}`,
            transform: `perspective(1000px) rotateX(${rotation.x}deg) rotateY(${rotation.y}deg)`,
            transition: 'transform 0.1s ease-out'
          }}
        >
          {/* Imagen del personaje */}
          <div className="absolute inset-0 z-0">
            <div className="relative w-full h-full overflow-hidden">
              <img
                src={card.image}
                alt={card.name}
                className="w-full h-full object-contain object-center transform hover:scale-110 transition-transform duration-700"
                style={{
                  position: 'absolute',
                  top: '50%',
                  left: '50%',
                  transform: 'translate(-50%, -50%)',
                  maxHeight: '100%',
                  maxWidth: '100%'
                }}
              />
            </div>
          </div>

          {/* Overlay con gradiente ajustado */}
          <div 
            className="absolute inset-0 bg-gradient-to-b from-black/40 via-transparent to-black opacity-80 z-0" 
            style={{
              background: 'linear-gradient(to bottom, rgba(0,0,0,0.6) 0%, rgba(0,0,0,0.1) 30%, rgba(0,0,0,0.1) 70%, rgba(0,0,0,0.8) 100%)'
            }}
          />

          {/* Nombre y descripción (arriba) */}
          <div className="relative p-4 text-white z-10">
            <h3 className="text-2xl font-bold mb-2 text-center text-yellow-400 drop-shadow-glow">
              {card.name}
            </h3>
          </div>

          {/* Espaciador flexible para empujar el bloque inferior */}
          <div className="flex-1" />

          {/* Estadísticas simplificadas (solo poder y ki) */}
          <div className="relative p-4 text-white bg-gradient-to-t from-black/90 to-transparent z-30">
            <div className="grid grid-cols-2 gap-4">
              <div className="text-center bg-red-600/50 backdrop-blur-sm px-2 py-2 rounded-lg transform hover:scale-105 transition-all duration-300">
                <div className="text-sm text-red-200 font-semibold mb-1">Poder</div>
                <div className="font-bold text-xl text-white">{card.power.toLocaleString()}</div>
              </div>
              <div className="text-center bg-yellow-600/50 backdrop-blur-sm px-2 py-2 rounded-lg transform hover:scale-105 transition-all duration-300">
                <div className="text-sm text-yellow-200 font-semibold mb-1">Ki</div>
                <div className="font-bold text-xl text-white">{card.ki.toLocaleString()}</div>
              </div>
            </div>
          </div>

          {/* Efectos de partículas */}
          <div className="absolute inset-0 overflow-hidden">
            {card.specialEffects?.particleEffect === 'ki-orbs' && (
              <div className="ki-particles-container">
                {[...Array(10)].map((_, i) => (
                  <div 
                    key={i} 
                    className="ki-particle"
                    style={{
                      left: `${Math.random() * 100}%`,
                      animationDelay: `${Math.random() * 2}s`,
                      backgroundColor: card.specialEffects?.auraColor || '#fff'
                    }}
                  />
                ))}
              </div>
            )}
            {card.specialEffects?.particleEffect === 'dragon-aura' && (
              <div className="dragon-aura-effect" />
            )}
            {card.specialEffects?.particleEffect === 'lightning' && (
              <div className="lightning-container">
                {[...Array(5)].map((_, i) => (
                  <div 
                    key={i} 
                    className="lightning-bolt"
                    style={{
                      left: `${Math.random() * 100}%`,
                      animationDelay: `${Math.random() * 1.5}s`
                    }}
                  />
                ))}
              </div>
            )}
          </div>

          {/* Efectos de animación */}
          <div className={`absolute inset-0 ${card.specialEffects?.animation}`} />

          {/* Botón de cerrar en la esquina superior derecha */}
          <button
            onClick={(e) => {
              e.stopPropagation();
              onClose();
            }}
            className="absolute top-2 right-2 w-8 h-8 bg-red-500 hover:bg-red-600 text-white rounded-full flex items-center justify-center shadow-lg transform hover:scale-110 transition-all duration-300 z-50"
            style={{ zIndex: 1000002 }}
          >
            ✕
          </button>
        </div>

        {/* Botón de guardar */}
        <button
          onClick={handleDownload}
          className="absolute -bottom-12 left-1/2 transform -translate-x-1/2 px-6 py-2 bg-gradient-to-r from-yellow-500 to-orange-500 text-white rounded-full shadow-lg hover:from-yellow-400 hover:to-orange-400 transition-all duration-300"
          style={{ zIndex: 1000002 }}
        >
          ¡Guardar Carta!
        </button>
      </div>
    </div>
  );
};

// Estilos CSS necesarios (agregar al theme.css)
