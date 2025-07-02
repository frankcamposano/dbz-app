import React, { useState } from 'react';
import { CoverArt } from '../types/Character';
import { ChevronRight, Star, Users, Swords, Sun, Moon } from 'lucide-react';
import { EnergyExplosion } from './EnergyExplosion';

interface SagaCoversProps {
  covers: CoverArt[];
  onSagaSelect: (sagaId: string) => void;
  selectedSagaId?: string;
  onThemeChange: (theme: 'light' | 'dark') => void;
  currentTheme: 'light' | 'dark';
}

export const SagaCovers: React.FC<SagaCoversProps> = ({
  covers,
  onSagaSelect,
  selectedSagaId,
  onThemeChange,
  currentTheme
}) => {
  const [explosion, setExplosion] = useState<{ x: number; y: number; color: string } | null>(null);

  const handleSagaClick = (sagaId: string, event: React.MouseEvent) => {
    // Crear explosión en el punto de clic
    setExplosion({
      x: event.clientX,
      y: event.clientY,
      color: currentTheme === 'light' ? '#FFA500' : '#4169E1'
    });

    // Llamar al callback después de un pequeño retraso para la animación
    setTimeout(() => {
      onSagaSelect(sagaId);
    }, 300);
  };

  const toggleTheme = () => {
    onThemeChange(currentTheme === 'light' ? 'dark' : 'light');
  };

  return (
    <div className={`py-8 md:py-16 px-4 md:px-6 transition-colors duration-500 ${
      currentTheme === 'light' ? 'bg-gray-100' : 'bg-gray-900'
    }`}>
      <div className="max-w-8xl mx-auto">
        {/* Botón de tema */}
        <button
          onClick={toggleTheme}
          className={`fixed top-4 right-4 p-3 rounded-full transition-colors duration-300 ${
            currentTheme === 'light'
              ? 'bg-white text-gray-800 shadow-lg hover:bg-gray-100'
              : 'bg-gray-800 text-white shadow-lg hover:bg-gray-700'
          }`}
        >
          {currentTheme === 'light' ? <Moon size={24} /> : <Sun size={24} />}
        </button>

        <h2 className={`text-4xl md:text-6xl font-bold text-center mb-8 md:mb-12 transition-colors duration-500 ${
          currentTheme === 'light' ? 'text-gray-900' : 'text-white'
        } drop-shadow-2xl`}>
          Sagas de Dragon Ball Z
        </h2>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-8">
          {covers.map((cover) => (
            <div
              key={cover.id}
              onClick={(e) => handleSagaClick(cover.id, e)}
              className={`relative group cursor-pointer transition-all duration-500 transform hover:scale-[1.02] ${
                selectedSagaId === cover.id ? 'ring-4 ring-orange-500 scale-[1.02]' : ''
              }`}
            >
              {/* Contenedor principal con sombra y bordes */}
              <div className="relative overflow-hidden rounded-2xl md:rounded-3xl shadow-2xl border border-white/10 aspect-[16/9]">
                {/* Imagen de fondo */}
                <img
                  src={cover.image}
                  alt={cover.title}
                  className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                />
                
                {/* Gradiente superior */}
                <div className={`absolute inset-0 bg-gradient-to-b ${cover.gradient} opacity-60`} />
                
                {/* Contenido */}
                <div className="relative h-full p-4 md:p-8 flex flex-col justify-between">
                  {/* Título y descripción */}
                  <div>
                    <h3 className="text-2xl md:text-4xl font-bold text-white mb-2 md:mb-4 drop-shadow-lg">
                      {cover.title}
                    </h3>
                    <p className="text-sm md:text-lg text-white/90 max-w-xl drop-shadow line-clamp-3 md:line-clamp-none">
                      {getSagaDescription(cover.title)}
                    </p>
                  </div>
                  
                  {/* Estadísticas */}
                  <div className="flex flex-wrap items-center gap-2 md:gap-6">
                    <div className="flex items-center gap-2 bg-black/30 backdrop-blur px-3 py-1 md:px-4 md:py-2 rounded-full">
                      <Star className="w-4 h-4 md:w-5 md:h-5 text-yellow-400" />
                      <span className="text-sm md:text-base text-white font-semibold">Saga Épica</span>
                    </div>
                    <div className="flex items-center gap-2 bg-black/30 backdrop-blur px-3 py-1 md:px-4 md:py-2 rounded-full">
                      <Users className="w-4 h-4 md:w-5 md:h-5 text-blue-400" />
                      <span className="text-sm md:text-base text-white font-semibold">Nuevos Guerreros</span>
                    </div>
                    <div className="hidden md:flex items-center gap-2 bg-black/30 backdrop-blur px-4 py-2 rounded-full">
                      <Swords className="w-5 h-5 text-red-400" />
                      <span className="text-white font-semibold">Batallas Legendarias</span>
                    </div>
                  </div>
                </div>

                {/* Botón de selección */}
                <div className="absolute right-4 md:right-8 top-1/2 -translate-y-1/2">
                  <div className={`
                    w-10 h-10 md:w-16 md:h-16 rounded-full flex items-center justify-center
                    transition-all duration-500 transform
                    ${selectedSagaId === cover.id
                      ? 'bg-orange-500 rotate-90'
                      : 'bg-white/10 group-hover:bg-white/20'
                    }
                  `}>
                    <ChevronRight className={`w-6 h-6 md:w-8 md:h-8 ${
                      selectedSagaId === cover.id ? 'text-white' : 'text-white/70'
                    }`} />
                  </div>
                </div>

                {/* Efecto de hover */}
                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000" />
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Efecto de explosión */}
      {explosion && (
        <EnergyExplosion
          x={explosion.x}
          y={explosion.y}
          color={explosion.color}
          onComplete={() => setExplosion(null)}
        />
      )}
    </div>
  );
};

function getSagaDescription(title: string): string {
  switch (title) {
    case 'Saga Saiyajin':
      return 'La llegada de los guerreros Saiyajin cambia el destino de la Tierra. Goku descubre sus orígenes y debe enfrentarse a Vegeta, el príncipe de su raza.';
    case 'Saga de Namek':
      return 'El viaje al planeta Namek revela nuevos poderes y enemigos. La batalla contra Freezer lleva a Goku a alcanzar el legendario Super Saiyajin.';
    case 'Saga de los Androides':
      return 'Una amenaza del futuro advierte sobre los androides del Dr. Gero. Los guerreros Z deben prepararse para enfrentar esta nueva amenaza tecnológica.';
    case 'Saga de Cell':
      return 'El bio-androide perfecto Cell amenaza con destruir la Tierra. Gohan debe despertar su verdadero poder para salvar al mundo en los Juegos de Cell.';
    default:
      return 'Una saga épica llena de batallas legendarias y transformaciones increíbles.';
  }
} 