import React from 'react';
import { CoverArt } from '../types/Character';

interface HeaderProps {
  coverArts: CoverArt[];
  selectedCover: string;
  onCoverSelect: (coverId: string) => void;
}

export const Header: React.FC<HeaderProps> = ({ coverArts, selectedCover, onCoverSelect }) => {
  return (
    <div className="relative overflow-hidden min-h-[60vh]">
      {/* Imagen de Fondo de la Saga Seleccionada */}
      <div className="absolute inset-0">
        <div 
          className="w-full h-full bg-cover bg-center bg-fixed transform scale-110"
          style={{ 
            backgroundImage: `url(${coverArts.find(c => c.id === selectedCover)?.image})`,
            filter: 'brightness(0.4) contrast(1.2)'
          }}
        />
        <div className={`absolute inset-0 bg-gradient-to-br ${coverArts.find(c => c.id === selectedCover)?.gradient || 'from-orange-600 via-red-600 to-purple-900'} opacity-80`} />
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-black/40" />
      </div>
      
      <div className="relative z-10 p-8 flex flex-col justify-center min-h-[60vh]">
        <div className="text-center mb-12">
          <h1 className="text-8xl font-bold text-white mb-6 tracking-wider drop-shadow-2xl">
            DRAGON BALL Z
          </h1>
          <p className="text-2xl text-white/90 font-medium drop-shadow-lg">
            Base de Datos de Guerreros Legendarios
          </p>
          <div className="mt-4 w-32 h-1 bg-gradient-to-r from-orange-500 to-red-500 mx-auto rounded-full" />
        </div>

        {/* Selección de Portadas Mejorada */}
        <div className="flex justify-center space-x-8 mb-8">
          {coverArts.map((cover) => (
            <button
              key={cover.id}
              onClick={() => onCoverSelect(cover.id)}
              className={`group relative overflow-hidden rounded-2xl transition-all duration-700 transform hover:scale-110 ${
                selectedCover === cover.id 
                  ? 'ring-4 ring-white/70 scale-110 shadow-2xl' 
                  : 'hover:ring-2 hover:ring-white/50 shadow-xl'
              }`}
            >
              <div className="w-48 h-32 bg-cover bg-center relative" 
                   style={{ backgroundImage: `url(${cover.image})` }}>
                <div className={`absolute inset-0 bg-gradient-to-br ${cover.gradient} opacity-60 group-hover:opacity-40 transition-opacity duration-500`} />
                <div className="absolute inset-0 bg-black/20 group-hover:bg-black/10 transition-colors duration-500" />
                <div className="absolute inset-0 flex items-center justify-center">
                  <span className="text-white font-bold text-lg text-center px-4 drop-shadow-lg">
                    {cover.title}
                  </span>
                </div>
                
                {/* Efecto de Brillo */}
                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000" />
              </div>
              
              {selectedCover === cover.id && (
                <div className="absolute -bottom-2 left-1/2 transform -translate-x-1/2">
                  <div className="w-4 h-4 bg-white rounded-full animate-pulse shadow-lg" />
                </div>
              )}
            </button>
          ))}
        </div>

        {/* Información de la Saga Actual */}
        <div className="text-center">
          <div className="inline-block bg-black/30 backdrop-blur-sm rounded-2xl px-8 py-4 border border-white/20">
            <h3 className="text-2xl font-bold text-white mb-2">
              {coverArts.find(c => c.id === selectedCover)?.title}
            </h3>
            <p className="text-white/80">
              Explora los guerreros más poderosos de esta saga épica
            </p>
          </div>
        </div>
      </div>

      {/* Partículas Flotantes */}
      <div className="absolute inset-0 pointer-events-none">
        {[...Array(6)].map((_, i) => (
          <div
            key={i}
            className="absolute w-2 h-2 bg-white/30 rounded-full animate-pulse"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              animationDelay: `${i * 0.5}s`,
              animationDuration: `${2 + Math.random() * 2}s`
            }}
          />
        ))}
      </div>
    </div>
  );
};