import React, { useState } from 'react';
import { Character } from '../types/Character';
import { PowerUpButton } from './PowerUpButton';
import { MaxPowerCard } from './MaxPowerCard';
import { maxPowerCards } from '../data/cards';
import { 
  ArrowLeft, 
  User,
  MapPin
} from 'lucide-react';

interface CharacterDetailProps {
  character: Character;
  onBack: () => void;
  onMaxPowerReached?: () => void;
}

export const CharacterDetail: React.FC<CharacterDetailProps> = ({ 
  character, 
  onBack, 
  onMaxPowerReached 
}) => {
  const [showMaxPowerCard, setShowMaxPowerCard] = useState(false);
  const [isCardUnlocked, setIsCardUnlocked] = useState(false);

  const handleMaxPowerReached = () => {
    console.log('handleMaxPowerReached llamado');
    console.log('ID completo del personaje:', character.id);
    
    // Extraer el ID base del personaje (sin el sufijo de la saga)
    const baseCharacterId = character.id.split('-')[0];
    console.log('ID base del personaje:', baseCharacterId);
    
    // Mostrar todas las cartas disponibles para depuración
    console.log('Todas las cartas maxpower:', maxPowerCards);
    
    // Buscar la carta especial correspondiente al personaje
    const maxPowerCard = maxPowerCards.find(card => {
      console.log('Revisando carta:', card.id, 'con characterId:', card.characterId);
      // Extraer el ID base de la carta
      const cardBaseId = card.characterId.split('-')[0];
      console.log('Comparando IDs base:', cardBaseId, baseCharacterId);
      return cardBaseId === baseCharacterId;
    });
    
    console.log('Carta encontrada:', maxPowerCard);
    
    if (maxPowerCard) {
      console.log('Mostrando carta en 1 segundo...');
      // Mostrar la carta después del flash blanco
      setTimeout(() => {
        console.log('Activando showMaxPowerCard');
        setShowMaxPowerCard(true);
        setIsCardUnlocked(true);
      }, 1000);
    } else {
      console.log('No se encontró carta para el personaje');
    }

    if (onMaxPowerReached) {
      onMaxPowerReached();
    }
  };

  const handleShowCard = () => {
    setShowMaxPowerCard(true);
  };

  const playAudio = () => {
    if (character.audioFile) {
      const audio = new Audio(character.audioFile);
      audio.play();
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-purple-900 to-indigo-900 relative overflow-hidden">
      {/* Imagen de Fondo del Personaje */}
      <div className="absolute inset-0">
        <img 
          src={character.image}
          alt={character.name}
          className="w-full h-full object-cover object-center bg-fixed transform scale-110"
          style={{ 
            filter: 'brightness(0.3) contrast(1.2)',
            objectPosition: 'center top'
          }}
        />
        <div className="absolute inset-0 bg-gradient-to-br from-gray-900/95 via-purple-900/90 to-indigo-900/95" />
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-black/60" />
      </div>

      {/* Partículas de Energía */}
      <div className="absolute inset-0 pointer-events-none">
        {[...Array(12)].map((_, i) => (
          <div
            key={i}
            className="absolute w-1 h-1 bg-orange-400/60 rounded-full animate-pulse"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              animationDelay: `${i * 0.3}s`,
              animationDuration: `${2 + Math.random() * 3}s`
            }}
          />
        ))}
      </div>

      {/* Mostrar la carta especial cuando se alcanza el poder máximo */}
      {showMaxPowerCard && (
        <div 
          className="fixed inset-0" 
          style={{ 
            position: 'fixed',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            zIndex: 999999,
            pointerEvents: 'auto'
          }}
        >
          {(() => {
            const baseCharacterId = character.id.split('-')[0];
            console.log('Buscando carta para mostrar, ID base:', baseCharacterId);
            
            const matchingCard = maxPowerCards.find(card => {
              const cardBaseId = card.characterId.split('-')[0];
              console.log('Comparando con carta:', card.id, 'baseId:', cardBaseId);
              return cardBaseId === baseCharacterId;
            });
            
            console.log('Carta encontrada para mostrar:', matchingCard);
            
            return matchingCard ? (
              <MaxPowerCard
                card={matchingCard}
                onClose={() => setShowMaxPowerCard(false)}
              />
            ) : null;
          })()}
        </div>
      )}

      <div className="relative z-10 container mx-auto px-4 sm:px-6 py-8">
        {/* Botón de Volver */}
          <button
            onClick={onBack}
          className="flex items-center space-x-3 text-white hover:text-orange-400 transition-all duration-300 group bg-black/30 backdrop-blur-sm rounded-xl px-6 py-3 border border-white/20 hover:border-orange-500/50 mb-8"
          >
            <ArrowLeft className="w-6 h-6 group-hover:-translate-x-1 transition-transform duration-300" />
            <span className="font-semibold text-lg">Volver a la Galería</span>
          </button>
          
        {/* Sección Principal - Nombre e Imagen */}
        <div className="mb-12">
          <div className="bg-white/10 backdrop-blur-sm rounded-3xl p-6 sm:p-8 border border-white/20 shadow-2xl transform hover:scale-[1.02] transition-transform duration-300 mb-8">
            <h1 className="text-4xl sm:text-5xl md:text-7xl font-bold text-white mb-6 sm:mb-8 tracking-wider drop-shadow-2xl">
                {character.name}
              </h1>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-8">
              <div className="flex items-center space-x-3 bg-blue-500/20 backdrop-blur-sm rounded-xl px-4 py-3 border border-blue-500/30">
                <User className="w-6 h-6 text-blue-400" />
                <div>
                  <div className="text-blue-300 text-sm">Raza</div>
                  <div className="text-white font-semibold">{character.race}</div>
                </div>
              </div>
              <div className="flex items-center space-x-3 bg-green-500/20 backdrop-blur-sm rounded-xl px-4 py-3 border border-green-500/30">
                <MapPin className="w-6 h-6 text-green-400" />
                <div>
                  <div className="text-green-300 text-sm">Planeta</div>
                  <div className="text-white font-semibold">{character.planet}</div>
                </div>
              </div>
            </div>

            {/* Frase Icónica con Audio */}
            <div 
              className="cursor-pointer transform hover:scale-[1.01] transition-all duration-300" 
              onClick={playAudio}
            >
              <div className="p-6 bg-gradient-to-r from-orange-500/20 to-red-500/20 rounded-2xl border-l-4 border-orange-500">
                <p className="text-orange-300 italic text-xl font-medium">
                  "{character.iconicPhrase}"
                </p>
              </div>
            </div>
          </div>

          {/* Imagen del Personaje */}
          <div className="relative">
            <div className="w-full min-h-[600px] rounded-3xl overflow-hidden border-4 border-white/20 shadow-2xl bg-black/30">
              <img 
                src={character.image}
                alt={character.name}
                className="w-full h-full object-contain absolute inset-0 transition-transform duration-700 hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent pointer-events-none" />
            </div>
              </div>
            </div>

        {/* Sección de Estadísticas y Habilidades */}
        <div className="grid lg:grid-cols-2 gap-8 lg:gap-16">
              {/* Niveles de Poder */}
          <div className="space-y-6 sm:space-y-8">
            <div className="bg-gradient-to-br from-yellow-500/20 to-orange-500/20 backdrop-blur-sm rounded-3xl p-6 sm:p-8 border border-yellow-500/30 shadow-2xl transform hover:scale-[1.02] transition-transform duration-300">
              <h3 className="text-2xl font-bold text-yellow-400 mb-6">Nivel de Poder</h3>
                <div className="space-y-6">
                  <div>
                    <div className="flex justify-between text-lg text-gray-300 mb-2">
                      <span>Poder Actual</span>
                    <span className="font-bold text-yellow-300">{character.powerLevel.toLocaleString()}</span>
                    </div>
                  <div className="w-full bg-gray-700/50 rounded-full h-4 overflow-hidden backdrop-blur-sm">
                      <div 
                        className="bg-gradient-to-r from-yellow-400 to-orange-500 h-4 rounded-full relative"
                        style={{ width: `${(character.powerLevel / character.maxPowerLevel) * 100}%` }}
                      >
                        <div className="absolute inset-0 bg-white/20 animate-pulse" />
                      </div>
                    </div>
                  </div>
                <div className="flex flex-col gap-4">
                  <PowerUpButton 
                    onMaxPowerReached={handleMaxPowerReached}
                    maxPowerLevel={character.maxPowerLevel}
                    battleVideoUrl={character.battleVideo}
                  />
                  {isCardUnlocked && (
                    <button
                      onClick={handleShowCard}
                      className="w-full px-6 py-3 bg-gradient-to-r from-purple-500 to-indigo-500 text-white rounded-xl shadow-lg hover:from-purple-600 hover:to-indigo-600 transition-all duration-300 flex items-center justify-center space-x-2 group"
                    >
                      <span className="text-lg font-semibold">Ver Carta Especial</span>
                      <span className="transform group-hover:scale-110 transition-transform">🎴</span>
                    </button>
                  )}
                </div>
              </div>
            </div>
          </div>

          {/* Transformaciones y Técnicas */}
          <div className="space-y-6 sm:space-y-8">
            {/* Transformaciones o Aumento de Ki */}
            <div className="bg-gradient-to-br from-purple-500/20 to-blue-500/20 backdrop-blur-sm rounded-3xl p-6 sm:p-8 border border-purple-500/30 shadow-2xl transform hover:scale-[1.02] transition-transform duration-300">
              <h3 className="text-2xl font-bold text-purple-400 mb-6">
                {character.transformations && character.transformations.length > 0 ? 'Transformaciones' : 'Aumento de Ki'}
              </h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {character.transformations && character.transformations.length > 0 ? (
                  character.transformations.map((transformation, index) => (
                    <div 
                      key={index}
                      className="bg-white/10 rounded-xl p-4 border border-white/20 hover:bg-white/20 transition-colors duration-300"
                    >
                      <span className="text-white">{transformation}</span>
                    </div>
                  ))
                ) : (
                  <div className="bg-white/10 rounded-xl p-4 border border-white/20 hover:bg-white/20 transition-colors duration-300 col-span-2">
                    <span className="text-white">Control y dominio del Ki para aumentar su poder de pelea</span>
              </div>
            )}
              </div>
            </div>

            {/* Técnicas */}
            <div className="bg-gradient-to-br from-red-500/20 to-pink-500/20 backdrop-blur-sm rounded-3xl p-6 sm:p-8 border border-red-500/30 shadow-2xl transform hover:scale-[1.02] transition-transform duration-300">
              <h3 className="text-2xl font-bold text-red-400 mb-6">Técnicas</h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {character.techniques.map((technique, index) => (
                  <div 
                    key={index}
                    className="bg-white/10 rounded-xl p-4 border border-white/20 hover:bg-white/20 transition-colors duration-300"
                  >
                    <span className="text-white">{technique}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};