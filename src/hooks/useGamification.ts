import { useState, useEffect, useCallback } from 'react';
import { Achievement, UserStats, UserRank } from '../types/Gamification';
import { achievements, userRanks } from '../data/achievements';

const STORAGE_KEY = 'dbz-gamification';

export const useGamification = () => {
  const [userStats, setUserStats] = useState<UserStats>({
    totalXP: 0,
    currentRank: 'novato',
    achievementsUnlocked: 0,
    totalAchievements: achievements.length,
    charactersViewed: [],
    charactersMaxPower: [],
    quizStats: {
      totalQuestions: 0,
      correctAnswers: 0,
      bestStreak: 0,
      totalPoints: 0,
      averageScore: 0
    }
  });

  const [userAchievements, setUserAchievements] = useState<Achievement[]>(achievements);

  // Cargar datos del localStorage
  useEffect(() => {
    const savedData = localStorage.getItem(STORAGE_KEY);
    if (savedData) {
      try {
        const data = JSON.parse(savedData);
        setUserStats(data.userStats || userStats);
        setUserAchievements(data.userAchievements || achievements);
      } catch (error) {
        console.error('Error loading gamification data:', error);
      }
    }
  }, []);

  // Guardar datos en localStorage
  const saveData = useCallback((stats: UserStats, achievs: Achievement[]) => {
    const dataToSave = {
      userStats: stats,
      userAchievements: achievs
    };
    localStorage.setItem(STORAGE_KEY, JSON.stringify(dataToSave));
  }, []);

  // Obtener rango actual
  const getCurrentRank = useCallback((xp: number): UserRank => {
    return userRanks.find(rank => xp >= rank.minXP && xp <= rank.maxXP) || userRanks[0];
  }, []);

  // Verificar y desbloquear logros
  const checkAchievements = useCallback((stats: UserStats, achievs: Achievement[]) => {
    const updatedAchievements = [...achievs];
    let newXP = 0;
    const unlockedAchievements: Achievement[] = [];

    updatedAchievements.forEach(achievement => {
      if (!achievement.unlocked) {
        let progress = 0;

        switch (achievement.id) {
          // Exploración por saga
          case 'saga-explorer-saiyan':
            progress = stats.charactersViewed.filter(id => id.includes('saiyan')).length;
            break;
          case 'saga-explorer-namek':
            progress = stats.charactersViewed.filter(id => id.includes('namek')).length;
            break;
          case 'saga-explorer-cell':
            progress = stats.charactersViewed.filter(id => id.includes('cell')).length;
            break;
          case 'saga-explorer-buu':
            progress = stats.charactersViewed.filter(id => id.includes('buu')).length;
            break;
          case 'complete-explorer':
            progress = stats.charactersViewed.length;
            break;

          // Entrenamiento
          case 'power-trainer-10':
          case 'power-trainer-20':
          case 'power-master':
            progress = stats.charactersMaxPower.length;
            break;

          // Quiz
          case 'quiz-beginner':
          case 'quiz-expert':
          case 'quiz-master':
            progress = stats.quizStats.correctAnswers;
            break;
          case 'survival-champion':
            progress = stats.quizStats.bestStreak;
            break;

          // Colección (simulado por ahora)
          case 'technique-collector':
            progress = Math.floor(stats.charactersViewed.length * 2.5); // Aproximación
            break;
          case 'transformation-master':
            progress = Math.floor(stats.charactersViewed.length * 1.2); // Aproximación
            break;
          case 'complete-collector':
            progress = stats.charactersViewed.length + stats.charactersMaxPower.length + stats.quizStats.correctAnswers;
            break;
        }

        achievement.currentProgress = Math.min(progress, achievement.requirement);

        if (progress >= achievement.requirement) {
          achievement.unlocked = true;
          newXP += achievement.reward.xp;
          unlockedAchievements.push(achievement);
        }
      }
    });

    return { updatedAchievements, newXP, unlockedAchievements };
  }, []);

  // Registrar que un personaje fue visto
  const viewCharacter = useCallback((characterId: string) => {
    setUserStats(prevStats => {
      if (prevStats.charactersViewed.includes(characterId)) {
        return prevStats;
      }

      const newStats = {
        ...prevStats,
        charactersViewed: [...prevStats.charactersViewed, characterId]
      };

      setUserAchievements(prevAchievements => {
        const { updatedAchievements, newXP } = checkAchievements(newStats, prevAchievements);
        
        const finalStats = {
          ...newStats,
          totalXP: newStats.totalXP + newXP,
          currentRank: getCurrentRank(newStats.totalXP + newXP).id,
          achievementsUnlocked: updatedAchievements.filter(a => a.unlocked).length
        };

        saveData(finalStats, updatedAchievements);
        setUserStats(finalStats);
        
        return updatedAchievements;
      });

      return newStats;
    });
  }, [checkAchievements, getCurrentRank, saveData]);

  // Registrar que un personaje alcanzó poder máximo
  const maxPowerReached = useCallback((characterId: string) => {
    setUserStats(prevStats => {
      if (prevStats.charactersMaxPower.includes(characterId)) {
        return prevStats;
      }

      const newStats = {
        ...prevStats,
        charactersMaxPower: [...prevStats.charactersMaxPower, characterId]
      };

      setUserAchievements(prevAchievements => {
        const { updatedAchievements, newXP } = checkAchievements(newStats, prevAchievements);
        
        const finalStats = {
          ...newStats,
          totalXP: newStats.totalXP + newXP,
          currentRank: getCurrentRank(newStats.totalXP + newXP).id,
          achievementsUnlocked: updatedAchievements.filter(a => a.unlocked).length
        };

        saveData(finalStats, updatedAchievements);
        setUserStats(finalStats);
        
        return updatedAchievements;
      });

      return newStats;
    });
  }, [checkAchievements, getCurrentRank, saveData]);

  // Actualizar estadísticas de quiz
  const updateQuizStats = useCallback((correct: boolean, points: number, streak: number) => {
    setUserStats(prevStats => {
      const newQuizStats = {
        totalQuestions: prevStats.quizStats.totalQuestions + 1,
        correctAnswers: prevStats.quizStats.correctAnswers + (correct ? 1 : 0),
        bestStreak: Math.max(prevStats.quizStats.bestStreak, streak),
        totalPoints: prevStats.quizStats.totalPoints + (correct ? points : 0),
        averageScore: 0 // Se calculará después
      };

      newQuizStats.averageScore = newQuizStats.totalQuestions > 0 
        ? (newQuizStats.correctAnswers / newQuizStats.totalQuestions) * 100 
        : 0;

      const newStats = {
        ...prevStats,
        quizStats: newQuizStats
      };

      setUserAchievements(prevAchievements => {
        const { updatedAchievements, newXP } = checkAchievements(newStats, prevAchievements);
        
        const finalStats = {
          ...newStats,
          totalXP: newStats.totalXP + newXP + (correct ? Math.floor(points / 10) : 0), // XP bonus por respuesta correcta
          currentRank: getCurrentRank(newStats.totalXP + newXP).id,
          achievementsUnlocked: updatedAchievements.filter(a => a.unlocked).length
        };

        saveData(finalStats, updatedAchievements);
        setUserStats(finalStats);
        
        return updatedAchievements;
      });

      return newStats;
    });
  }, [checkAchievements, getCurrentRank, saveData]);

  // Resetear progreso (para testing)
  const resetProgress = useCallback(() => {
    const resetStats: UserStats = {
      totalXP: 0,
      currentRank: 'novato',
      achievementsUnlocked: 0,
      totalAchievements: achievements.length,
      charactersViewed: [],
      charactersMaxPower: [],
      quizStats: {
        totalQuestions: 0,
        correctAnswers: 0,
        bestStreak: 0,
        totalPoints: 0,
        averageScore: 0
      }
    };

    const resetAchievements = achievements.map(a => ({
      ...a,
      currentProgress: 0,
      unlocked: false
    }));

    setUserStats(resetStats);
    setUserAchievements(resetAchievements);
    saveData(resetStats, resetAchievements);
  }, [saveData]);

  return {
    userStats,
    userAchievements,
    currentRank: getCurrentRank(userStats.totalXP),
    viewCharacter,
    maxPowerReached,
    updateQuizStats,
    resetProgress
  };
};