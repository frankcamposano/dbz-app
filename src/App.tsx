import React, { useState } from 'react';
import { Header } from './components/Header';
import { CharacterGallery } from './components/CharacterGallery';
import { CharacterDetail } from './components/CharacterDetail';
import { InstallPrompt } from './components/InstallPrompt';
import { GamificationButton } from './components/GamificationButton';
import { AchievementNotification } from './components/AchievementNotification';
import { SagaCovers } from './components/SagaCovers';
import { KiParticles } from './components/KiParticles';
import AnimatedBackground from './components/AnimatedBackground';
import { coverArts, getCharactersBySaga } from './data/characters';
import { Character } from './types/Character';
import { Achievement } from './types/Gamification';
import { useGamification } from './hooks/useGamification';

function App() {
  const [selectedCover, setSelectedCover] = useState(coverArts[0].id);
  const [selectedCharacter, setSelectedCharacter] = useState<Character | null>(null);
  const [achievementNotification, setAchievementNotification] = useState<Achievement | null>(null);
  const [showCharacters, setShowCharacters] = useState(false);
  const [theme, setTheme] = useState<'light' | 'dark'>('dark');

  const { viewCharacter, maxPowerReached } = useGamification();

  // Obtener personajes de la saga seleccionada
  const currentCharacters = getCharactersBySaga(selectedCover);
  const currentGradient = coverArts.find(cover => cover.id === selectedCover)?.gradient || 'from-orange-600 via-red-600 to-purple-900';

  const handleCharacterSelect = (character: Character) => {
    viewCharacter(character.id);
    setSelectedCharacter(character);
  };

  const handleMaxPowerReached = (characterId: string) => {
    maxPowerReached(characterId);
  };

  const handleSagaSelect = (sagaId: string) => {
    setSelectedCover(sagaId);
    setShowCharacters(true);
    // Scroll suave a la galería de personajes
    setTimeout(() => {
      document.getElementById('character-gallery')?.scrollIntoView({ behavior: 'smooth' });
    }, 100);
  };

  const handleThemeChange = (newTheme: 'light' | 'dark') => {
    setTheme(newTheme);
    // Aplicar clase al body para cambios globales
    document.body.className = newTheme === 'light' ? 'light-theme' : 'dark-theme';
  };

  if (selectedCharacter) {
    return (
      <>
        <CharacterDetail
          character={selectedCharacter}
          onBack={() => setSelectedCharacter(null)}
          onMaxPowerReached={() => handleMaxPowerReached(selectedCharacter.id)}
        />
        <GamificationButton />
        <AchievementNotification
          achievement={achievementNotification}
          onClose={() => setAchievementNotification(null)}
        />
      </>
    );
  }

  return (
    <div className={`min-h-screen transition-colors duration-500 ${
      theme === 'light' ? 'bg-gray-100' : 'bg-gray-900'
    }`}>
      {/* Fondo Animado */}
      <AnimatedBackground />
      
      {/* Gradiente */}
      <div className={`fixed inset-0 bg-gradient-to-br ${currentGradient} transition-all duration-1000 opacity-${
        theme === 'light' ? '30' : '60'
      } mix-blend-overlay`} />
      
      {/* Partículas de Ki */}
      <KiParticles theme={theme} intensity={40} />

      {/* Contenido */}
      <div className="relative z-10">
        <SagaCovers
          covers={coverArts}
          onSagaSelect={handleSagaSelect}
          selectedSagaId={selectedCover}
          onThemeChange={handleThemeChange}
          currentTheme={theme}
        />
        
        {showCharacters && (
          <div id="character-gallery" className="scroll-mt-16">
        <CharacterGallery
          characters={currentCharacters}
          onCharacterSelect={handleCharacterSelect}
          sagaTitle={coverArts.find(c => c.id === selectedCover)?.title || 'Saga Saiyajin'}
        />
      </div>
        )}
      </div>

      {/* Componentes de Gamificación */}
      <GamificationButton />
      <AchievementNotification
        achievement={achievementNotification}
        onClose={() => setAchievementNotification(null)}
      />

      {/* Prompt de Instalación PWA */}
      <InstallPrompt />
    </div>
  );
}

export default App;