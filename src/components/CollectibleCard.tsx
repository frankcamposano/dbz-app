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
    'común': 'from-gray-400 to-gray-600',
    'rara': 'from-blue-400 to-blue-600',
    'épica': 'from-purple-400 to-purple-600',
    'legendaria': 'from-yellow-400 to-orange-600'
  };

  const rarityBorders = {
    'común': 'border-gray-400',
    'rara': 'border-blue-400',
    'épica': 'border-purple-400',
    'legendaria': 'border-yellow-400'
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
          <div className={`w-full h-full rounded-2xl overflow-hidden border-4 ${rarityBorders[card.rarity]} shadow-xl`}>
            {/* Fondo con efecto de brillo */}
            <div className={`absolute inset-0 bg-gradient-to-br ${rarityColors[card.rarity]} opacity-75`}>
              {card.holographic && (
                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent animate-shine" />
              )}
            </div>

            {/* Imagen del personaje */}
            <div className="relative h-2/3">
              <img
                src={card.image}
                alt={card.name}
                className="w-full h-full object-cover"
              />
              {/* Overlay con brillo */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />
            </div>

            {/* Información de la carta */}
            <div className="relative p-4 bg-gradient-to-b from-black/80 to-black">
              <h3 className="text-white font-bold text-xl mb-2">{card.name}</h3>
              
              {/* Estadísticas */}
              <div className="grid grid-cols-3 gap-2 text-sm">
                <div className="flex items-center space-x-1">
                  <Zap className="w-4 h-4 text-yellow-400" />
                  <span className="text-yellow-300">{card.power}</span>
                </div>
                <div className="flex items-center space-x-1">
                  <Shield className="w-4 h-4 text-blue-400" />
                  <span className="text-blue-300">{card.defense}</span>
                </div>
                <div className="flex items-center space-x-1">
                  <Flame className="w-4 h-4 text-red-400" />
                  <span className="text-red-300">{card.ki}</span>
                </div>
              </div>
            </div>

            {/* Rareza */}
            <div className="absolute top-2 right-2 px-2 py-1 rounded-full bg-black/50 backdrop-blur-sm">
              <span className={`text-xs font-bold ${
                card.rarity === 'legendaria' ? 'text-yellow-400' :
                card.rarity === 'épica' ? 'text-purple-400' :
                card.rarity === 'rara' ? 'text-blue-400' :
                'text-gray-400'
              }`}>
                {card.rarity.toUpperCase()}
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