import React, { useRef, useState, useEffect } from 'react';
import { Character } from '../types/Character';
import { Zap, Shield, Swords, Volume2, VolumeX, User, MapPin } from 'lucide-react';
import { useAudio } from '../hooks/useAudio';

interface CharacterCardProps {
  character: Character;
  onClick: () => void;
}

export const CharacterCard: React.FC<CharacterCardProps> = React.memo(({ character, onClick }) => {
  const { playPhrase, stopAudio, isPlaying: isSynthPlaying } = useAudio();
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const [isAudioPlaying, setIsAudioPlaying] = useState(false);
  const [isImageLoaded, setIsImageLoaded] = useState(false);
  const imageRef = useRef<HTMLImageElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting && imageRef.current) {
            imageRef.current.src = character.image;
          }
        });
      },
      {
        rootMargin: '50px',
        threshold: 0.1
      }
    );

    if (imageRef.current) {
      observer.observe(imageRef.current);
    }

    return () => {
      if (imageRef.current) {
        observer.unobserve(imageRef.current);
      }
    };
  }, [character.image]);

  const handleImageLoad = () => {
    setIsImageLoaded(true);
  };

  const handleCardClick = () => {
    onClick();
  };

  const handlePhraseClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (isAudioPlaying || isSynthPlaying) {
      stopAudio();
      if (audioRef.current) {
        audioRef.current.pause();
        audioRef.current.currentTime = 0;
      }
      setIsAudioPlaying(false);
    } else {
      if (character.audioPhrase) {
        if (audioRef.current) {
          audioRef.current.pause();
          audioRef.current.currentTime = 0;
        }
        const audio = new Audio(character.audioPhrase);
        audioRef.current = audio;
        audio.onplay = () => setIsAudioPlaying(true);
        audio.onended = () => setIsAudioPlaying(false);
        audio.onerror = () => setIsAudioPlaying(false);
        audio.play().catch(error => {
          console.error('Error playing audio:', error);
          setIsAudioPlaying(false);
        });
      } else {
        playPhrase(character.iconicPhrase);
      }
    }
  };

  return (
    <div 
      onClick={handleCardClick}
      className="group relative bg-gradient-to-br from-gray-900/95 to-gray-800/95 backdrop-blur-sm rounded-3xl overflow-hidden cursor-pointer transition-all duration-700 transform hover:scale-105 hover:rotate-1 border border-white/10 hover:border-orange-500/50 shadow-2xl hover:shadow-orange-500/20"
    >
      {/* Imagen Principal del Personaje */}
      <div className="relative h-80 overflow-hidden">
        <div className={`absolute inset-0 bg-gray-800 transition-opacity duration-300 ${isImageLoaded ? 'opacity-0' : 'opacity-100'}`} />
        <img 
          ref={imageRef}
          alt={character.name}
          className={`w-full h-full object-cover object-center transition-all duration-700 group-hover:scale-110 ${
            isImageLoaded ? 'opacity-100' : 'opacity-0'
          }`}
          style={{ 
            filter: 'brightness(0.9) contrast(1.1)',
            objectPosition: 'center top'
          }}
          loading="lazy"
          decoding="async"
          onLoad={handleImageLoad}
          data-src={character.image}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-gray-900 via-gray-900/30 to-transparent" />
        
        {/* Estado del Personaje */}
        <div className="absolute top-4 right-4">
          <div className={`px-4 py-2 rounded-full text-sm font-bold backdrop-blur-sm ${
            character.status === 'alive' 
              ? 'bg-green-500/30 text-green-300 border border-green-500/50' 
              : 'bg-red-500/30 text-red-300 border border-red-500/50'
          }`}>
            {character.status === 'alive' ? 'VIVO' : 'MUERTO'}
          </div>
        </div>

        {/* Indicador de Audio */}
        {(isAudioPlaying || isSynthPlaying) && (
          <div className="absolute top-4 left-4">
            <div className="flex items-center space-x-2 bg-green-500/30 backdrop-blur-sm rounded-full px-3 py-2 border border-green-500/50">
              <div className="w-3 h-3 bg-green-400 rounded-full animate-pulse" />
              <span className="text-green-300 text-sm font-semibold">Reproduciendo</span>
            </div>
          </div>
        )}
      </div>

      <div className="relative z-10 p-6 space-y-6">
        {/* Información Básica */}
        <div>
          <h3 className="text-3xl font-bold text-white group-hover:text-orange-400 transition-colors duration-300 mb-4">
            {character.name}
          </h3>
          <div className="grid grid-cols-2 gap-3">
            <div className="flex items-center space-x-3 bg-blue-500/20 backdrop-blur-sm rounded-xl px-4 py-3 border border-blue-500/30">
              <User className="w-5 h-5 text-blue-400" />
              <div>
                <div className="text-blue-300 text-sm">Raza</div>
                <div className="text-white font-semibold">{character.race}</div>
              </div>
            </div>
            <div className="flex items-center space-x-3 bg-green-500/20 backdrop-blur-sm rounded-xl px-4 py-3 border border-green-500/30">
              <MapPin className="w-5 h-5 text-green-400" />
              <div>
                <div className="text-green-300 text-sm">Planeta</div>
                <div className="text-white font-semibold">{character.planet}</div>
              </div>
            </div>
          </div>
        </div>

        {/* Frase Icónica con Audio */}
        <div 
          onClick={handlePhraseClick}
          className="relative bg-gradient-to-r from-orange-500/10 to-red-500/10 rounded-lg p-4 border-l-4 border-orange-500 group/phrase hover:from-orange-500/20 hover:to-red-500/20 transition-all duration-300 cursor-pointer flex items-center gap-3"
        >
          <button
            onClick={(e) => e.stopPropagation()}
            className="flex-shrink-0 p-2 rounded-full bg-orange-500/20 group-hover/phrase:bg-orange-500/40 transition-colors duration-300"
          >
            {isAudioPlaying || isSynthPlaying ? (
              <VolumeX className="w-5 h-5 text-orange-300" />
            ) : (
              <Volume2 className="w-5 h-5 text-orange-300 animate-pulse" />
            )}
          </button>
          <div className="text-sm text-orange-300 italic font-medium flex-grow">
            "{character.iconicPhrase}"
          </div>
          {(isAudioPlaying || isSynthPlaying) && (
            <div className="absolute inset-0 bg-orange-500/5 rounded-lg animate-pulse pointer-events-none" />
          )}
        </div>

        {/* Nivel de Poder */}
        <div>
          <div className="flex items-center space-x-3 mb-3">
            <Zap className="w-5 h-5 text-yellow-400" />
            <span className="text-yellow-400 font-bold text-lg">Nivel de Poder</span>
          </div>
          <div className="text-3xl font-bold text-white mb-3">
            {character.powerLevel.toLocaleString()}
          </div>
          <div className="relative">
            <div className="w-full bg-gray-700 rounded-full h-3 overflow-hidden">
              <div 
                className="bg-gradient-to-r from-yellow-400 via-orange-500 to-red-500 h-3 rounded-full transition-all duration-1000 group-hover:from-orange-500 group-hover:to-red-600 relative"
                style={{ width: `${Math.min((character.powerLevel / 500000000) * 100, 100)}%` }}
              >
                <div className="absolute inset-0 bg-white/20 animate-pulse" />
              </div>
            </div>
            <div className="text-xs text-gray-400 mt-1 text-right">
              Máximo: {character.maxPowerLevel.toLocaleString()}
            </div>
          </div>
        </div>

        {/* Habilidades */}
        <div className="grid grid-cols-2 gap-4">
          {/* Transformaciones */}
            <div className="bg-purple-500/10 rounded-xl p-4 border border-purple-500/20">
              <div className="flex items-center space-x-2 mb-2">
                <Shield className="w-4 h-4 text-purple-400" />
                <span className="text-purple-400 font-bold text-sm">Transformaciones</span>
                <span className="bg-purple-500/30 text-purple-300 px-2 py-1 rounded-full text-xs font-bold">
                  {character.transformations.length}
                </span>
              </div>
              <div className="text-xs text-gray-300">
                {character.transformations.slice(0, 2).join(', ')}
                {character.transformations.length > 2 && ` +${character.transformations.length - 2} más`}
              </div>
            </div>

          {/* Técnicas */}
          <div className="bg-red-500/10 rounded-xl p-4 border border-red-500/20">
            <div className="flex items-center space-x-2 mb-2">
              <Swords className="w-4 h-4 text-red-400" />
              <span className="text-red-400 font-bold text-sm">Técnicas</span>
              <span className="bg-red-500/30 text-red-300 px-2 py-1 rounded-full text-xs font-bold">
                {character.techniques.length}
              </span>
            </div>
            <div className="text-xs text-gray-300">
              {character.techniques.slice(0, 2).join(', ')}
              {character.techniques.length > 2 && ` +${character.techniques.length - 2} más`}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
});

CharacterCard.displayName = 'CharacterCard';