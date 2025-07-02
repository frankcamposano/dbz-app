import React, { useState, useEffect, useCallback } from 'react';
import { QuizQuestion, QuizSession } from '../types/Gamification';
import { quizQuestions } from '../data/quizQuestions';
import { Brain, Clock, Target, Zap, Heart, Trophy, X, CheckCircle, XCircle } from 'lucide-react';

interface QuizGameProps {
  mode: 'normal' | 'survival' | 'saga-specific';
  sagaFilter?: string;
  onQuizComplete: (correct: boolean, points: number, streak: number) => void;
  onClose: () => void;
}

export const QuizGame: React.FC<QuizGameProps> = ({ 
  mode, 
  sagaFilter, 
  onQuizComplete, 
  onClose 
}) => {
  const [session, setSession] = useState<QuizSession | null>(null);
  const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null);
  const [showResult, setShowResult] = useState(false);
  const [timeLeft, setTimeLeft] = useState(30);
  const [currentStreak, setCurrentStreak] = useState(0);
  const [lives, setLives] = useState(mode === 'survival' ? 3 : 0);
  const [difficultyLevel, setDifficultyLevel] = useState(1);
  const [streakMultiplier, setStreakMultiplier] = useState(1);

  // Filtrar preguntas según el modo y dificultad
  const getFilteredQuestions = useCallback(() => {
    let filtered = [...quizQuestions];
    
    if (mode === 'survival') {
      // En modo supervivencia, aumentar la dificultad gradualmente
      const difficulties: ('easy' | 'medium' | 'hard' | 'expert')[] = ['easy', 'medium', 'hard', 'expert'];
      const currentDifficulty = difficulties[Math.min(Math.floor(difficultyLevel / 5), 3)];
      filtered = filtered.filter(q => q.difficulty === currentDifficulty);
    } else if (mode === 'saga-specific' && sagaFilter) {
      filtered = filtered.filter(q => q.saga === sagaFilter);
    }
    
    return filtered.sort(() => Math.random() - 0.5);
  }, [mode, sagaFilter, difficultyLevel]);

  // Inicializar sesión
  useEffect(() => {
    const questions = getFilteredQuestions();
    const newSession: QuizSession = {
      id: Date.now().toString(),
      mode,
      questions: questions.slice(0, mode === 'survival' ? 50 : 10),
      currentQuestionIndex: 0,
      score: 0,
      correctAnswers: 0,
      totalQuestions: mode === 'survival' ? 50 : 10,
      timeStarted: Date.now(),
      isActive: true,
      lives: mode === 'survival' ? 3 : undefined
    };
    setSession(newSession);
  }, [mode, getFilteredQuestions]);

  // Timer
  useEffect(() => {
    if (!session?.isActive || showResult) return;

    const timer = setInterval(() => {
      setTimeLeft(prev => {
        if (prev <= 1) {
          handleTimeUp();
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, [session?.isActive, showResult]);

  const handleTimeUp = () => {
    if (mode === 'survival') {
      setLives(prev => prev - 1);
      if (lives <= 1) {
        endQuiz();
        return;
      }
    }
    handleAnswer(-1); // Respuesta incorrecta por tiempo
  };

  // Manejar respuesta correcta en modo supervivencia
  const handleSurvivalSuccess = () => {
    // Aumentar dificultad cada 5 preguntas correctas
    setDifficultyLevel(prev => prev + 1);
    
    // Actualizar multiplicador de racha
    const newMultiplier = Math.min(currentStreak / 5 + 1, 5);
    setStreakMultiplier(newMultiplier);

    // Bonus de vida cada 10 preguntas correctas
    if (difficultyLevel % 10 === 0) {
      setLives(prev => Math.min(prev + 1, 5));
    }
  };

  const handleAnswer = (answerIndex: number) => {
    if (!session || showResult) return;

    setSelectedAnswer(answerIndex);
    setShowResult(true);

    const currentQuestion = session.questions[session.currentQuestionIndex];
    const isCorrect = answerIndex === currentQuestion.correctAnswer;
    const basePoints = currentQuestion.points;

    if (isCorrect) {
      const bonusPoints = mode === 'survival' ? Math.floor(basePoints * streakMultiplier) : basePoints;
      setCurrentStreak(prev => prev + 1);
      
      if (mode === 'survival') {
        handleSurvivalSuccess();
      }

      setSession(prev => prev ? {
        ...prev,
        score: prev.score + bonusPoints,
        correctAnswers: prev.correctAnswers + 1
      } : null);
    } else {
      setCurrentStreak(0);
      setStreakMultiplier(1);
      if (mode === 'survival') {
        setLives(prev => prev - 1);
      }
    }

    onQuizComplete(isCorrect, basePoints, currentStreak + (isCorrect ? 1 : 0));

    setTimeout(() => {
      if (mode === 'survival' && !isCorrect && lives <= 1) {
        endQuiz();
      } else {
        nextQuestion();
      }
    }, 2000);
  };

  const nextQuestion = () => {
    if (!session) return;

    setShowResult(false);
    setSelectedAnswer(null);
    setTimeLeft(30);

    if (session.currentQuestionIndex + 1 >= session.questions.length) {
      endQuiz();
    } else {
      setSession(prev => prev ? {
        ...prev,
        currentQuestionIndex: prev.currentQuestionIndex + 1
      } : null);
    }
  };

  const endQuiz = () => {
    setSession(prev => prev ? { ...prev, isActive: false } : null);
  };

  if (!session) {
    return (
      <div className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center">
        <div className="text-white text-xl">Cargando quiz...</div>
      </div>
    );
  }

  const currentQuestion = session.questions[session.currentQuestionIndex];
  const progress = ((session.currentQuestionIndex + 1) / session.totalQuestions) * 100;

  if (!session.isActive) {
    return (
      <div className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center p-4">
        <div className="bg-gradient-to-br from-gray-900 to-gray-800 rounded-3xl p-8 max-w-md w-full border border-white/20 text-center">
          <div className="w-20 h-20 bg-gradient-to-r from-yellow-500 to-orange-600 rounded-full flex items-center justify-center mx-auto mb-6">
            <Trophy className="w-10 h-10 text-white" />
          </div>
          
          <h2 className="text-3xl font-bold text-white mb-4">¡Quiz Completado!</h2>
          
          <div className="space-y-4 mb-6">
            <div className="bg-blue-500/20 rounded-xl p-4 border border-blue-500/30">
              <div className="text-blue-400 text-sm">Puntuación Final</div>
              <div className="text-white text-2xl font-bold">{session.score.toLocaleString()}</div>
            </div>
            
            <div className="grid grid-cols-2 gap-4">
              <div className="bg-green-500/20 rounded-xl p-3 border border-green-500/30">
                <div className="text-green-400 text-sm">Correctas</div>
                <div className="text-white text-xl font-bold">{session.correctAnswers}</div>
              </div>
              <div className="bg-red-500/20 rounded-xl p-3 border border-red-500/30">
                <div className="text-red-400 text-sm">Incorrectas</div>
                <div className="text-white text-xl font-bold">
                  {session.currentQuestionIndex + 1 - session.correctAnswers}
                </div>
              </div>
            </div>
            
            <div className="bg-purple-500/20 rounded-xl p-4 border border-purple-500/30">
              <div className="text-purple-400 text-sm">Mejor Racha</div>
              <div className="text-white text-2xl font-bold">{currentStreak}</div>
            </div>
          </div>
          
          <button
            onClick={onClose}
            className="w-full bg-gradient-to-r from-orange-600 to-red-600 text-white font-bold py-3 px-6 rounded-xl hover:from-orange-500 hover:to-red-500 transition-all duration-300"
          >
            Continuar
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center p-4">
      <div className="bg-gradient-to-br from-gray-900 to-gray-800 rounded-3xl max-w-4xl w-full border border-white/20 overflow-hidden">
        {/* Header */}
        <div className="bg-gradient-to-r from-blue-600 to-purple-600 p-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <div className="w-12 h-12 bg-white/20 rounded-xl flex items-center justify-center">
                <Brain className="w-6 h-6 text-white" />
              </div>
              <div>
                <h2 className="text-2xl font-bold text-white">
                  {mode === 'survival' ? 'Modo Supervivencia' : 
                   mode === 'saga-specific' ? 'Quiz por Saga' : 'Quiz Normal'}
                </h2>
                <p className="text-blue-100">
                  Pregunta {session.currentQuestionIndex + 1} de {session.totalQuestions}
                </p>
              </div>
            </div>
            <button
              onClick={onClose}
              className="text-white/70 hover:text-white transition-colors"
            >
              <X className="w-6 h-6" />
            </button>
          </div>
          
          {/* Barra de Progreso */}
          <div className="mt-4">
            <div className="w-full h-2 bg-white/20 rounded-full overflow-hidden">
              <div 
                className="h-full bg-gradient-to-r from-yellow-400 to-orange-500 transition-all duration-300"
                style={{ width: `${progress}%` }}
              />
            </div>
          </div>
        </div>

        {/* Stats Bar */}
        <div className="bg-gray-800/50 p-4 border-b border-gray-700">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-6">
              <div className="flex items-center space-x-2">
                <Target className="w-5 h-5 text-blue-400" />
                <span className="text-white font-semibold">{session?.score.toLocaleString()}</span>
                <span className="text-gray-400 text-sm">puntos</span>
              </div>
              
              <div className="flex items-center space-x-2">
                <Zap className="w-5 h-5 text-yellow-400" />
                <span className="text-white font-semibold">{currentStreak}</span>
                <span className="text-gray-400 text-sm">racha</span>
                {mode === 'survival' && streakMultiplier > 1 && (
                  <span className="text-yellow-400 text-sm">x{streakMultiplier.toFixed(1)}</span>
                )}
              </div>
              
              {mode === 'survival' && (
                <>
                  <div className="flex items-center space-x-2">
                    <Heart className="w-5 h-5 text-red-400" />
                    <span className="text-white font-semibold">{lives}</span>
                    <span className="text-gray-400 text-sm">vidas</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Trophy className="w-5 h-5 text-purple-400" />
                    <span className="text-white font-semibold">Nivel {difficultyLevel}</span>
                  </div>
                </>
              )}
            </div>
            
            <div className="flex items-center space-x-2">
              <Clock className="w-5 h-5 text-orange-400" />
              <span className={`font-bold text-lg ${timeLeft <= 10 ? 'text-red-400 animate-pulse' : 'text-white'}`}>
                {timeLeft}s
              </span>
            </div>
          </div>
        </div>

        {/* Pregunta */}
        <div className="p-8">
          <div className="mb-8">
            <div className="flex items-center space-x-3 mb-4">
              <div className={`px-3 py-1 rounded-full text-sm font-bold ${
                currentQuestion.difficulty === 'easy' ? 'bg-green-500/20 text-green-400 border border-green-500/30' :
                currentQuestion.difficulty === 'medium' ? 'bg-yellow-500/20 text-yellow-400 border border-yellow-500/30' :
                currentQuestion.difficulty === 'hard' ? 'bg-orange-500/20 text-orange-400 border border-orange-500/30' :
                'bg-red-500/20 text-red-400 border border-red-500/30'
              }`}>
                {currentQuestion.difficulty === 'easy' ? 'Fácil' :
                 currentQuestion.difficulty === 'medium' ? 'Medio' :
                 currentQuestion.difficulty === 'hard' ? 'Difícil' : 'Experto'}
              </div>
              <div className="px-3 py-1 bg-purple-500/20 text-purple-400 border border-purple-500/30 rounded-full text-sm font-bold">
                +{currentQuestion.points} puntos
              </div>
              {currentQuestion.saga && (
                <div className="px-3 py-1 bg-blue-500/20 text-blue-400 border border-blue-500/30 rounded-full text-sm font-bold">
                  {currentQuestion.saga}
                </div>
              )}
            </div>
            
            <h3 className="text-2xl font-bold text-white mb-4">
              {currentQuestion.question}
            </h3>

            {/* Imagen de la pregunta si existe */}
            {currentQuestion.type === 'image' && currentQuestion.image && (
              <div className="mb-6">
                <img 
                  src={currentQuestion.image}
                  alt="Pregunta"
                  className="w-full max-w-2xl mx-auto rounded-xl shadow-lg border-2 border-white/10"
                />
              </div>
            )}

            {/* Audio clip si existe */}
            {currentQuestion.type === 'audio' && currentQuestion.audioClip && (
              <div className="mb-6 flex justify-center">
                <audio 
                  controls 
                  className="w-full max-w-md"
                  src={currentQuestion.audioClip}
                >
                  Tu navegador no soporta el elemento de audio.
                </audio>
              </div>
            )}
          </div>

          {/* Opciones */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {currentQuestion.options.map((option, index) => (
              <button
                key={index}
                onClick={() => handleAnswer(index)}
                disabled={showResult}
                className={`p-4 rounded-xl border-2 transition-all duration-300 text-left ${
                  showResult
                    ? index === currentQuestion.correctAnswer
                      ? 'bg-green-500/20 border-green-500 text-green-400'
                      : selectedAnswer === index
                      ? 'bg-red-500/20 border-red-500 text-red-400'
                      : 'bg-gray-800/50 border-gray-600 text-gray-400'
                    : 'bg-gray-800/50 border-gray-600 text-white hover:border-blue-500 hover:bg-blue-500/10'
                }`}
              >
                <div className="flex items-center space-x-3">
                  <div className={`w-8 h-8 rounded-full flex items-center justify-center font-bold ${
                    showResult
                      ? index === currentQuestion.correctAnswer
                        ? 'bg-green-500 text-white'
                        : selectedAnswer === index
                        ? 'bg-red-500 text-white'
                        : 'bg-gray-600 text-gray-400'
                      : 'bg-blue-500 text-white'
                  }`}>
                    {String.fromCharCode(65 + index)}
                  </div>
                  <span className="font-semibold">{option}</span>
                  {showResult && index === currentQuestion.correctAnswer && (
                    <CheckCircle className="w-5 h-5 text-green-400 ml-auto" />
                  )}
                  {showResult && selectedAnswer === index && index !== currentQuestion.correctAnswer && (
                    <XCircle className="w-5 h-5 text-red-400 ml-auto" />
                  )}
                </div>
              </button>
            ))}
          </div>

          {/* Explicación */}
          {showResult && (
            <div className="mt-6 p-4 bg-blue-500/10 rounded-xl border border-blue-500/30">
              <h4 className="text-blue-400 font-bold mb-2">Explicación:</h4>
              <p className="text-gray-300">{currentQuestion.explanation}</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};