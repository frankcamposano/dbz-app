import React, { useState } from 'react';
import { Trophy, Brain, Target, Star } from 'lucide-react';
import { AchievementsPanel } from './AchievementsPanel';
import { QuizGame } from './QuizGame';
import { useGamification } from '../hooks/useGamification';

export const GamificationButton: React.FC = () => {
  const [showAchievements, setShowAchievements] = useState(false);
  const [showQuiz, setShowQuiz] = useState(false);
  const [quizMode, setQuizMode] = useState<'normal' | 'survival' | 'saga-specific'>('normal');
  const [showMenu, setShowMenu] = useState(false);
  
  const { userStats, userAchievements, currentRank, updateQuizStats } = useGamification();

  const handleQuizComplete = (correct: boolean, points: number, streak: number) => {
    updateQuizStats(correct, points, streak);
  };

  const startQuiz = (mode: 'normal' | 'survival' | 'saga-specific') => {
    setQuizMode(mode);
    setShowQuiz(true);
    setShowMenu(false);
  };

  return (
    <>
      {/* Botón Principal */}
      <div className="fixed bottom-4 right-4 z-40">
        <div className="relative">
          {/* Menú Desplegable */}
          {showMenu && (
            <div className="absolute bottom-16 right-0 bg-gray-900/95 backdrop-blur-sm rounded-2xl p-4 border border-white/20 shadow-2xl min-w-64">
              <div className="space-y-3">
                {/* Header del menú */}
                <div className="text-center pb-3 border-b border-gray-700">
                  <div className="flex items-center space-x-2 justify-center mb-2">
                    <div className={`w-8 h-8 bg-gradient-to-r ${currentRank.color} rounded-lg flex items-center justify-center text-sm`}>
                      {currentRank.icon}
                    </div>
                    <div>
                      <div className="text-white font-bold text-sm">{currentRank.title}</div>
                      <div className="flex items-center space-x-1">
                        <Star className="w-3 h-3 text-yellow-400" />
                        <span className="text-yellow-400 text-xs">{userStats.totalXP} XP</span>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Logros */}
                <button
                  onClick={() => {
                    setShowAchievements(true);
                    setShowMenu(false);
                  }}
                  className="w-full flex items-center space-x-3 p-3 bg-yellow-500/20 hover:bg-yellow-500/30 rounded-xl border border-yellow-500/30 transition-all duration-300 group"
                >
                  <Trophy className="w-5 h-5 text-yellow-400" />
                  <div className="text-left">
                    <div className="text-white font-semibold text-sm">Logros</div>
                    <div className="text-yellow-400 text-xs">
                      {userStats.achievementsUnlocked}/{userStats.totalAchievements}
                    </div>
                  </div>
                </button>

                {/* Quiz Normal */}
                <button
                  onClick={() => startQuiz('normal')}
                  className="w-full flex items-center space-x-3 p-3 bg-blue-500/20 hover:bg-blue-500/30 rounded-xl border border-blue-500/30 transition-all duration-300"
                >
                  <Brain className="w-5 h-5 text-blue-400" />
                  <div className="text-left">
                    <div className="text-white font-semibold text-sm">Quiz Normal</div>
                    <div className="text-blue-400 text-xs">10 preguntas</div>
                  </div>
                </button>

                {/* Quiz Supervivencia */}
                <button
                  onClick={() => startQuiz('survival')}
                  className="w-full flex items-center space-x-3 p-3 bg-red-500/20 hover:bg-red-500/30 rounded-xl border border-red-500/30 transition-all duration-300"
                >
                  <Target className="w-5 h-5 text-red-400" />
                  <div className="text-left">
                    <div className="text-white font-semibold text-sm">Supervivencia</div>
                    <div className="text-red-400 text-xs">¿Cuántas seguidas?</div>
                  </div>
                </button>

                {/* Estadísticas Rápidas */}
                <div className="pt-3 border-t border-gray-700">
                  <div className="grid grid-cols-2 gap-2 text-xs">
                    <div className="text-center">
                      <div className="text-gray-400">Precisión</div>
                      <div className="text-white font-bold">
                        {userStats.quizStats.totalQuestions > 0 
                          ? Math.round((userStats.quizStats.correctAnswers / userStats.quizStats.totalQuestions) * 100)
                          : 0}%
                      </div>
                    </div>
                    <div className="text-center">
                      <div className="text-gray-400">Mejor Racha</div>
                      <div className="text-white font-bold">{userStats.quizStats.bestStreak}</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Botón Principal */}
          <button
            onClick={() => setShowMenu(!showMenu)}
            className={`w-16 h-16 bg-gradient-to-r ${currentRank.color} rounded-full flex items-center justify-center shadow-2xl transition-all duration-300 transform hover:scale-110 border-2 border-white/20`}
          >
            <Trophy className="w-8 h-8 text-white" />
          </button>

          {/* Indicador de logros nuevos */}
          {userStats.achievementsUnlocked > 0 && (
            <div className="absolute -top-2 -right-2 w-6 h-6 bg-red-500 rounded-full flex items-center justify-center">
              <span className="text-white text-xs font-bold">{userStats.achievementsUnlocked}</span>
            </div>
          )}
        </div>
      </div>

      {/* Paneles */}
      {showAchievements && (
        <AchievementsPanel
          achievements={userAchievements}
          userStats={userStats}
          currentRank={currentRank}
          onClose={() => setShowAchievements(false)}
        />
      )}

      {showQuiz && (
        <QuizGame
          mode={quizMode}
          onQuizComplete={handleQuizComplete}
          onClose={() => setShowQuiz(false)}
        />
      )}
    </>
  );
};