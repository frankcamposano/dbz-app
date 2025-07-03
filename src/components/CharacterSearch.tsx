import React, { useState } from 'react';
import { Search } from 'lucide-react';

interface CharacterSearchProps {
  onSearch: (searchTerm: string) => void;
}

export const CharacterSearch: React.FC<CharacterSearchProps> = ({ onSearch }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [isFocused, setIsFocused] = useState(false);

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setSearchTerm(value);
    onSearch(value);
  };

  return (
    <div className="w-full max-w-3xl mx-auto mt-4 mb-16 relative z-10">
      <div className={`relative group ${isFocused ? 'scale-105' : ''} transition-transform duration-300`}>
        {/* Efecto de energía base */}
        <div className="absolute -inset-1 bg-gradient-to-r from-orange-500 via-yellow-500 to-orange-500 rounded-lg blur-sm opacity-75 group-hover:opacity-100 transition duration-1000 group-hover:duration-200 animate-pulse"></div>
        
        {/* Shen Long Effect */}
        <div className="absolute -inset-x-10 -top-24 pointer-events-none overflow-visible">
          <div className="absolute inset-0 bg-gradient-to-r from-emerald-500/20 via-transparent to-emerald-500/20 animate-pulse"></div>
          <div 
            className="absolute top-16 left-1/2 transform -translate-x-1/2 w-[500px] h-40"
            style={{
              backgroundImage: "url('/images/shenlong.webp')",
              backgroundSize: 'contain',
              backgroundPosition: 'center',
              backgroundRepeat: 'no-repeat',
              filter: 'drop-shadow(0 0 15px rgba(0, 255, 0, 0.7))',
              opacity: isFocused ? '1' : '0.6',
              transform: `translate(-50%, ${isFocused ? '-30%' : '-20%'}) scale(${isFocused ? '1.2' : '1'})`,
              transition: 'all 0.3s ease-in-out'
            }}
          />
        </div>
        
        {/* Campo de búsqueda */}
        <div className={`relative bg-black/50 backdrop-blur-sm rounded-lg p-3 border-2 ${isFocused ? 'border-emerald-400' : 'border-orange-500'} transition-colors duration-300`}>
          <div className="flex items-center">
            <Search className={`w-6 h-6 ${isFocused ? 'text-emerald-400' : 'text-orange-500'} transition-colors duration-300`} />
            <input
              type="text"
              value={searchTerm}
              onChange={handleSearch}
              onFocus={() => setIsFocused(true)}
              onBlur={() => setIsFocused(false)}
              placeholder="¡Invoca tu guerrero Z!"
              className="w-full bg-transparent text-white placeholder-gray-400 focus:outline-none text-lg ml-2 dbz-search-input"
              style={{
                fontFamily: "'Press Start 2P', cursive",
                fontSize: '0.875rem'
              }}
            />
          </div>
        </div>

        {/* Esferas del dragón decorativas */}
        <div className="absolute -right-4 -top-4 w-8 h-8 dragon-ball-effect rounded-full energy-pulse">
          <div className="absolute inset-1 bg-yellow-400/80 rounded-full">
            <div className="absolute inset-2 bg-orange-600/90 rounded-full"></div>
          </div>
        </div>

        {/* Efectos de energía adicionales */}
        {isFocused && (
          <>
            <div className="absolute -left-2 -bottom-2 w-4 h-4 bg-emerald-400/30 rounded-full animate-ping"></div>
            <div className="absolute -right-2 -bottom-2 w-4 h-4 bg-emerald-400/30 rounded-full animate-ping delay-100"></div>
            <div className="absolute left-1/4 -bottom-1 w-3 h-3 bg-yellow-400/30 rounded-full animate-ping delay-200"></div>
            <div className="absolute right-1/4 -bottom-1 w-3 h-3 bg-yellow-400/30 rounded-full animate-ping delay-300"></div>
          </>
        )}

        {/* Rayos de energía */}
        <div className="absolute inset-0 pointer-events-none">
          {isFocused && (
            <>
              <div className="absolute inset-0 bg-gradient-to-r from-emerald-500/0 via-emerald-500/10 to-emerald-500/0 animate-pulse"></div>
              <div className="absolute inset-0 bg-gradient-to-b from-emerald-500/0 via-emerald-500/10 to-emerald-500/0 animate-pulse delay-100"></div>
            </>
          )}
        </div>
      </div>
    </div>
  );
}; 