export interface Achievement {
  id: string;
  title: string;
  description: string;
  icon: string;
  requirement: number;
  currentProgress: number;
  unlocked: boolean;
  category: 'exploration' | 'training' | 'collection' | 'quiz';
  reward: {
    xp: number;
    title?: string;
  };
}

export interface UserRank {
  id: string;
  title: string;
  minXP: number;
  maxXP: number;
  color: string;
  icon: string;
  benefits: string[];
}

export interface QuizQuestion {
  id: string;
  question: string;
  options: string[];
  correctAnswer: number;
  explanation: string;
  difficulty: 'easy' | 'medium' | 'hard' | 'expert';
  points: number;
  saga?: string;
  type: 'text' | 'image' | 'audio';
  image?: string;
  audioClip?: string;
}

export interface QuizSession {
  id: string;
  mode: 'normal' | 'survival' | 'saga-specific';
  questions: QuizQuestion[];
  currentQuestionIndex: number;
  score: number;
  correctAnswers: number;
  totalQuestions: number;
  timeStarted: number;
  isActive: boolean;
  lives?: number; // Para modo supervivencia
}

export interface UserStats {
  totalXP: number;
  currentRank: string;
  achievementsUnlocked: number;
  totalAchievements: number;
  charactersViewed: string[];
  charactersMaxPower: string[];
  quizStats: {
    totalQuestions: number;
    correctAnswers: number;
    bestStreak: number;
    totalPoints: number;
    averageScore: number;
  };
}

export interface QuizState {
  currentScore: number;
  highestScore: number;
  questionsAnswered: number;
  correctAnswers: number;
  achievements: Achievement[];
}

export interface GamificationContext {
  quizState: QuizState;
  achievements: Achievement[];
  updateScore: (points: number) => void;
  unlockAchievement: (achievementId: string) => void;
  updateProgress: (achievementId: string, progress: number) => void;
}