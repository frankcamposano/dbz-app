import React, { useState } from 'react';
import { Card } from '../types/Cards';
import { Zap, Shield, Flame } from 'lucide-react';

interface CollectibleCardProps {
  card: Card;
  onClick?: () => void;
  className?: string;
}

export const CollectibleCard: React.FC<CollectibleCardProps> = ({
  card,
  onClick,
  className = ''
}) => {
  const [isHovered, setIsHovered] = useState(false);

  const rarityColors = {
    'common': 'from-gray-400 to-gray-600',
    'rare': 'from-blue-400 to-blue-600',
    'epic': 'from-purple-400 to-purple-600',
    'legendary': 'from-yellow-400 to-orange-600',
    'maxpower': 'from-red-400 to-red-600'
  };

  const rarityBorders = {
    'common': 'border-gray-400',
    'rare': 'border-blue-400',
    'epic': 'border-purple-400',
    'legendary': 'border-yellow-400',
    'maxpower': 'border-red-400'
  };

  const getRarityDisplayText = (rarity: string) => {
    switch(rarity) {
      case 'common': return 'COMÚN';
      case 'rare': return 'RARA';
      case 'epic': return 'ÉPICA';
      case 'legendary': return 'LEGENDARIA';
      case 'maxpower': return 'MAX POWER';
      default: return rarity.toUpperCase();
    }
  };

  const getRarityTextColor = (rarity: string) => {
    switch(rarity) {
      case 'legendary': return 'text-yellow-400';
      case 'epic': return 'text-purple-400';
      case 'rare': return 'text-blue-400';
      case 'maxpower': return 'text-red-400';
      default: return 'text-gray-400';
    }
  };

  return (
    <div
      className={`relative group cursor-pointer perspective ${className}`}
      onClick={onClick}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div
        className={`relative w-full aspect-[3/4] rounded-2xl transition-all duration-700 transform preserve-3d ${
          isHovered ? 'rotate-y-180' : ''
        }`}
      >
        {/* Frente de la carta */}
        <div className="absolute inset-0 backface-hidden">
          <div className={`relative w-full h-full rounded-2xl overflow-hidden`}>
            {/* Imagen base */}
            <img
              src={card.image}
              alt={card.name}
              className="absolute inset-0 w-full h-full object-cover"
            />

            {/* Borde de color según rareza */}
            <div className={`absolute inset-0 ring-4 ${rarityBorders[card.rarity]}`} />

            {/* Overlay con efectos */}
            <div className={`absolute inset-0 bg-gradient-to-br ${rarityColors[card.rarity]} opacity-40 mix-blend-overlay`}>
              {card.holographic && (
                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent animate-shine" />
              )}
            </div>

            {/* Gradiente para legibilidad */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/20 to-transparent" />

            {/* Información de la carta */}
            <div className="absolute bottom-0 left-0 right-0 p-3 z-10">
              <h3 className="text-white font-bold text-xl mb-2 drop-shadow-lg">{card.name}</h3>
              
              {/* Estadísticas */}
              <div className="grid grid-cols-3 gap-2 text-sm">
                <div className="flex items-center space-x-1">
                  <Zap className="w-4 h-4 text-yellow-400 drop-shadow-lg" />
                  <span className="text-yellow-300 drop-shadow-lg">{card.power}</span>
                </div>
                <div className="flex items-center space-x-1">
                  <Shield className="w-4 h-4 text-blue-400 drop-shadow-lg" />
                  <span className="text-blue-300 drop-shadow-lg">{card.defense}</span>
                </div>
                <div className="flex items-center space-x-1">
                  <Flame className="w-4 h-4 text-red-400 drop-shadow-lg" />
                  <span className="text-red-300 drop-shadow-lg">{card.ki}</span>
                </div>
              </div>
            </div>

            {/* Rareza */}
            <div className="absolute top-2 right-2 px-2 py-1 rounded-full bg-black/50 backdrop-blur-sm z-10">
              <span className={`text-xs font-bold ${getRarityTextColor(card.rarity)}`}>
                {getRarityDisplayText(card.rarity)}
              </span>
            </div>
          </div>
        </div>

        {/* Reverso de la carta */}
        <div className="absolute inset-0 backface-hidden rotate-y-180">
          <div className={`w-full h-full rounded-2xl p-4 border-4 ${rarityBorders[card.rarity]} bg-gradient-to-br from-gray-900 to-black shadow-xl`}>
            <div className="h-full flex flex-col">
              <h4 className="text-white font-bold mb-2">{card.specialMove}</h4>
              <p className="text-gray-300 text-sm mb-4">{card.description}</p>
              <div className="mt-auto">
                <span className="text-gray-400 text-xs">Saga: {card.saga}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}; 