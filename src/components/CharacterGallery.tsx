import React, { useState } from 'react';
import { Character } from '../types/Character';
import { CharacterCard } from './CharacterCard';
import { CharacterSearch } from './CharacterSearch';

interface CharacterGalleryProps {
  characters: Character[];
  onCharacterSelect: (character: Character) => void;
}

export const CharacterGallery: React.FC<CharacterGalleryProps> = ({
  characters,
  onCharacterSelect,
}) => {
  const [searchTerm, setSearchTerm] = useState('');

  const filteredCharacters = characters.filter(character =>
    character.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    character.description?.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="p-4">
      {/* Buscador */}
      <CharacterSearch onSearch={setSearchTerm} />

      {/* Contenedor de la galería con efecto de energía */}
      <div className="relative">
        {/* Efecto de energía de fondo */}
        <div className="absolute inset-0 bg-gradient-to-br from-blue-500/20 to-purple-500/20 rounded-xl blur-xl"></div>

        {/* Grid de personajes */}
        <div className="relative grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {filteredCharacters.map((character) => (
            <div
              key={character.id}
              className="transform hover:scale-105 transition-transform duration-300"
            >
              <CharacterCard 
                character={character} 
                onClick={() => onCharacterSelect(character)}
              />
            </div>
          ))}
        </div>

        {/* Mensaje cuando no hay resultados */}
        {filteredCharacters.length === 0 && (
          <div className="text-center py-20">
            <div className="text-2xl text-white mb-4 font-bold">
              ¡No se encontraron guerreros!
            </div>
            <div className="text-orange-400">
              Intenta buscar con otro término
            </div>
          </div>
        )}
      </div>
    </div>
  );
};