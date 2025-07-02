import React from 'react';
import { Achievement, UserStats, UserRank } from '../types/Gamification';
import { Trophy, Star, Lock, CheckCircle, Award, Target } from 'lucide-react';

interface AchievementsPanelProps {
  achievements: Achievement[];
  userStats: UserStats;
  currentRank: UserRank;
  onClose: () => void;
}

export const AchievementsPanel: React.FC<AchievementsPanelProps> = ({
  achievements,
  userStats,
  currentRank,
  onClose
}) => {
  const categories = {
    exploration: { title: 'Exploración', icon: '🗺️', color: 'from-blue-500 to-cyan-600' },
    training: { title: 'Entrenamiento', icon: '💪', color: 'from-red-500 to-orange-600' },
    collection: { title: 'Colección', icon: '💎', color: 'from-purple-500 to-pink-600' },
    quiz: { title: 'Conocimiento', icon: '🧠', color: 'from-green-500 to-emerald-600' }
  };

  const groupedAchievements = achievements.reduce((acc, achievement) => {
    if (!acc[achievement.category]) {
      acc[achievement.category] = [];
    }
    acc[achievement.category].push(achievement);
    return acc;
  }, {} as Record<string, Achievement[]>);

  return (
    <div className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center p-4">
      <div className="bg-gradient-to-br from-gray-900 to-gray-800 rounded-3xl max-w-6xl w-full max-h-[90vh] overflow-hidden border border-white/20 shadow-2xl">
        {/* Header */}
        <div className="bg-gradient-to-r from-yellow-600 to-orange-600 p-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <div className="w-16 h-16 bg-white/20 rounded-2xl flex items-center justify-center">
                <Trophy className="w-8 h-8 text-white" />
              </div>
              <div>
                <h2 className="text-3xl font-bold text-white">Logros y Progreso</h2>
                <p className="text-orange-100">
                  {userStats.achievementsUnlocked} de {userStats.totalAchievements} logros desbloqueados
                </p>
              </div>
            </div>
            <button
              onClick={onClose}
              className="text-white/70 hover:text-white transition-colors text-2xl"
            >
              ✕
            </button>
          </div>
        </div>

        {/* Rango Actual */}
        <div className="p-6 border-b border-gray-700">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <div className={`w-20 h-20 bg-gradient-to-r ${currentRank.color} rounded-2xl flex items-center justify-center text-2xl`}>
                {currentRank.icon}
              </div>
              <div>
                <h3 className="text-2xl font-bold text-white">{currentRank.title}</h3>
                <p className="text-gray-400">Nivel actual</p>
                <div className="flex items-center space-x-2 mt-2">
                  <Star className="w-4 h-4 text-yellow-400" />
                  <span className="text-yellow-400 font-semibold">{userStats.totalXP.toLocaleString()} XP</span>
                </div>
              </div>
            </div>
            <div className="text-right">
              <div className="text-sm text-gray-400 mb-2">Progreso al siguiente rango</div>
              <div className="w-48 h-3 bg-gray-700 rounded-full overflow-hidden">
                <div 
                  className={`h-full bg-gradient-to-r ${currentRank.color} transition-all duration-500`}
                  style={{ 
                    width: currentRank.maxXP === Infinity 
                      ? '100%' 
                      : `${Math.min(((userStats.totalXP - currentRank.minXP) / (currentRank.maxXP - currentRank.minXP)) * 100, 100)}%` 
                  }}
                />
              </div>
              <div className="text-xs text-gray-400 mt-1">
                {currentRank.maxXP === Infinity 
                  ? 'Rango Máximo' 
                  : `${currentRank.maxXP - userStats.totalXP} XP restantes`
                }
              </div>
            </div>
          </div>
        </div>

        {/* Logros por Categoría */}
        <div className="p-6 overflow-y-auto max-h-96">
          {Object.entries(categories).map(([categoryKey, categoryInfo]) => {
            const categoryAchievements = groupedAchievements[categoryKey] || [];
            const unlockedCount = categoryAchievements.filter(a => a.unlocked).length;

            return (
              <div key={categoryKey} className="mb-8">
                <div className="flex items-center space-x-3 mb-4">
                  <div className={`w-10 h-10 bg-gradient-to-r ${categoryInfo.color} rounded-xl flex items-center justify-center text-lg`}>
                    {categoryInfo.icon}
                  </div>
                  <div>
                    <h3 className="text-xl font-bold text-white">{categoryInfo.title}</h3>
                    <p className="text-gray-400 text-sm">
                      {unlockedCount} de {categoryAchievements.length} completados
                    </p>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                  {categoryAchievements.map((achievement) => (
                    <div
                      key={achievement.id}
                      className={`relative p-4 rounded-xl border transition-all duration-300 ${
                        achievement.unlocked
                          ? 'bg-gradient-to-br from-green-500/20 to-emerald-600/20 border-green-500/30 shadow-lg'
                          : 'bg-gray-800/50 border-gray-700 hover:border-gray-600'
                      }`}
                    >
                      <div className="flex items-start space-x-3">
                        <div className={`w-12 h-12 rounded-xl flex items-center justify-center text-xl ${
                          achievement.unlocked 
                            ? 'bg-green-500/30 border border-green-500/50' 
                            : 'bg-gray-700 border border-gray-600'
                        }`}>
                          {achievement.unlocked ? (
                            <CheckCircle className="w-6 h-6 text-green-400" />
                          ) : (
                            <Lock className="w-6 h-6 text-gray-400" />
                          )}
                        </div>
                        <div className="flex-1">
                          <div className="flex items-center space-x-2 mb-1">
                            <span className="text-lg">{achievement.icon}</span>
                            <h4 className={`font-bold ${achievement.unlocked ? 'text-white' : 'text-gray-300'}`}>
                              {achievement.title}
                            </h4>
                          </div>
                          <p className={`text-sm mb-3 ${achievement.unlocked ? 'text-gray-200' : 'text-gray-400'}`}>
                            {achievement.description}
                          </p>
                          
                          {/* Barra de Progreso */}
                          <div className="mb-2">
                            <div className="flex justify-between text-xs mb-1">
                              <span className="text-gray-400">Progreso</span>
                              <span className="text-gray-400">
                                {achievement.currentProgress}/{achievement.requirement}
                              </span>
                            </div>
                            <div className="w-full h-2 bg-gray-700 rounded-full overflow-hidden">
                              <div 
                                className={`h-full transition-all duration-500 ${
                                  achievement.unlocked 
                                    ? 'bg-gradient-to-r from-green-400 to-emerald-500' 
                                    : 'bg-gradient-to-r from-blue-400 to-purple-500'
                                }`}
                                style={{ width: `${(achievement.currentProgress / achievement.requirement) * 100}%` }}
                              />
                            </div>
                          </div>

                          {/* Recompensa */}
                          <div className="flex items-center justify-between">
                            <div className="flex items-center space-x-1">
                              <Star className="w-4 h-4 text-yellow-400" />
                              <span className="text-yellow-400 text-sm font-semibold">
                                +{achievement.reward.xp} XP
                              </span>
                            </div>
                            {achievement.reward.title && (
                              <div className="flex items-center space-x-1">
                                <Award className="w-4 h-4 text-purple-400" />
                                <span className="text-purple-400 text-xs">Título</span>
                              </div>
                            )}
                          </div>
                        </div>
                      </div>

                      {achievement.unlocked && (
                        <div className="absolute top-2 right-2">
                          <div className="w-6 h-6 bg-green-500 rounded-full flex items-center justify-center">
                            <CheckCircle className="w-4 h-4 text-white" />
                          </div>
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};