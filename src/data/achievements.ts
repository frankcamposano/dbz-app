import { Achievement, UserRank } from '../types/Gamification';

export const achievements: Achievement[] = [
  // EXPLORACIÓN
  {
    id: 'saga-explorer-saiyan',
    title: 'Explorador Saiyajin',
    description: 'Ve todos los personajes de la Saga Saiyajin',
    icon: '🐒',
    requirement: 11,
    currentProgress: 0,
    unlocked: false,
    category: 'exploration',
    reward: { xp: 100, title: 'Explorador Saiyajin' }
  },
  {
    id: 'saga-explorer-namek',
    title: 'Explorador de Namek',
    description: 'Ve todos los personajes de la Saga de Namek',
    icon: '🌍',
    requirement: 6,
    currentProgress: 0,
    unlocked: false,
    category: 'exploration',
    reward: { xp: 150, title: 'Explorador de Namek' }
  },
  {
    id: 'saga-explorer-cell',
    title: 'Cazador de Androides',
    description: 'Ve todos los personajes de la Saga de Cell',
    icon: '🤖',
    requirement: 5,
    currentProgress: 0,
    unlocked: false,
    category: 'exploration',
    reward: { xp: 200, title: 'Cazador de Androides' }
  },
  {
    id: 'saga-explorer-buu',
    title: 'Destructor de Majin',
    description: 'Ve todos los personajes de la Saga de Majin Buu',
    icon: '👹',
    requirement: 4,
    currentProgress: 0,
    unlocked: false,
    category: 'exploration',
    reward: { xp: 250, title: 'Destructor de Majin' }
  },
  {
    id: 'complete-explorer',
    title: 'Explorador Legendario',
    description: 'Ve todos los personajes de todas las sagas',
    icon: '🏆',
    requirement: 26,
    currentProgress: 0,
    unlocked: false,
    category: 'exploration',
    reward: { xp: 500, title: 'Explorador Legendario' }
  },

  // ENTRENAMIENTO
  {
    id: 'power-trainer-10',
    title: 'Entrenador Novato',
    description: 'Entrena 10 personajes al poder máximo',
    icon: '💪',
    requirement: 10,
    currentProgress: 0,
    unlocked: false,
    category: 'training',
    reward: { xp: 200, title: 'Entrenador Novato' }
  },
  {
    id: 'power-trainer-20',
    title: 'Maestro del Entrenamiento',
    description: 'Entrena 20 personajes al poder máximo',
    icon: '🥋',
    requirement: 20,
    currentProgress: 0,
    unlocked: false,
    category: 'training',
    reward: { xp: 400, title: 'Maestro del Entrenamiento' }
  },
  {
    id: 'power-master',
    title: 'Maestro del Poder',
    description: 'Entrena todos los personajes al poder máximo',
    icon: '⚡',
    requirement: 26,
    currentProgress: 0,
    unlocked: false,
    category: 'training',
    reward: { xp: 1000, title: 'Maestro del Poder' }
  },

  // COLECCIÓN
  {
    id: 'technique-collector',
    title: 'Coleccionista de Técnicas',
    description: 'Descubre 50 técnicas diferentes',
    icon: '🎯',
    requirement: 50,
    currentProgress: 0,
    unlocked: false,
    category: 'collection',
    reward: { xp: 300, title: 'Coleccionista de Técnicas' }
  },
  {
    id: 'transformation-master',
    title: 'Maestro de Transformaciones',
    description: 'Descubre 25 transformaciones diferentes',
    icon: '🔥',
    requirement: 25,
    currentProgress: 0,
    unlocked: false,
    category: 'collection',
    reward: { xp: 400, title: 'Maestro de Transformaciones' }
  },
  {
    id: 'complete-collector',
    title: 'Coleccionista Supremo',
    description: 'Desbloquea todo el contenido disponible',
    icon: '💎',
    requirement: 100,
    currentProgress: 0,
    unlocked: false,
    category: 'collection',
    reward: { xp: 1500, title: 'Coleccionista Supremo' }
  },

  // QUIZ
  {
    id: 'quiz-beginner',
    title: 'Estudiante de Dragon Ball',
    description: 'Responde correctamente 25 preguntas',
    icon: '📚',
    requirement: 25,
    currentProgress: 0,
    unlocked: false,
    category: 'quiz',
    reward: { xp: 150, title: 'Estudiante de Dragon Ball' }
  },
  {
    id: 'quiz-expert',
    title: 'Experto en Dragon Ball',
    description: 'Responde correctamente 100 preguntas',
    icon: '🧠',
    requirement: 100,
    currentProgress: 0,
    unlocked: false,
    category: 'quiz',
    reward: { xp: 500, title: 'Experto en Dragon Ball' }
  },
  {
    id: 'quiz-master',
    title: 'Maestro del Quiz',
    description: 'Obtén una puntuación perfecta en el quiz',
    icon: '🎓',
    requirement: 1,
    currentProgress: 0,
    unlocked: false,
    category: 'quiz',
    reward: { xp: 1000, title: 'Maestro del Quiz' }
  },
  {
    id: 'survival-champion',
    title: 'Campeón de Supervivencia',
    description: 'Consigue una racha de 20 respuestas correctas',
    icon: '🏅',
    requirement: 20,
    currentProgress: 0,
    unlocked: false,
    category: 'quiz',
    reward: { xp: 800, title: 'Campeón de Supervivencia' }
  },
  {
    id: 'power-seeker',
    title: 'Buscador de Poder',
    description: 'Alcanza el máximo poder con 5 personajes diferentes',
    icon: '⚡',
    requirement: 5,
    currentProgress: 0,
    unlocked: false,
    category: 'training',
    reward: { xp: 500, title: 'Buscador de Poder' }
  },
  {
    id: 'voice-collector',
    title: 'Coleccionista de Voces',
    description: 'Escucha todas las frases icónicas',
    icon: '🎵',
    requirement: 10,
    currentProgress: 0,
    unlocked: false,
    category: 'collection',
    reward: { xp: 200, title: 'Coleccionista de Voces' }
  },
  {
    id: 'saga-explorer',
    title: 'Explorador de Sagas',
    description: 'Visita todas las sagas disponibles',
    icon: '📚',
    requirement: 5,
    currentProgress: 0,
    unlocked: false,
    category: 'exploration',
    reward: { xp: 300, title: 'Explorador de Sagas' }
  },
  {
    id: 'transformation-master',
    title: 'Maestro de las Transformaciones',
    description: 'Descubre todas las transformaciones de los personajes',
    icon: '✨',
    requirement: 15,
    currentProgress: 0,
    unlocked: false,
    category: 'collection',
    reward: { xp: 400, title: 'Maestro de Transformaciones' }
  },
  {
    id: 'technique-collector',
    title: 'Coleccionista de Técnicas',
    description: 'Descubre 20 técnicas diferentes',
    icon: '🥋',
    requirement: 20,
    currentProgress: 0,
    unlocked: false,
    category: 'collection',
    reward: { xp: 250, title: 'Coleccionista de Técnicas' }
  },
  {
    id: 'daily-warrior',
    title: 'Guerrero Diario',
    description: 'Visita la aplicación durante 7 días consecutivos',
    icon: '📅',
    requirement: 7,
    currentProgress: 0,
    unlocked: false,
    category: 'training',
    reward: { xp: 350, title: 'Guerrero Diario' }
  },
  {
    id: 'social-saiyan',
    title: 'Saiyan Social',
    description: 'Comparte 5 personajes con tus amigos',
    icon: '🤝',
    requirement: 5,
    currentProgress: 0,
    unlocked: false,
    category: 'collection',
    reward: { xp: 150, title: 'Saiyan Social' }
  },

  // Logros por Saga
  {
    id: 'saiyan-saga-master',
    title: 'Maestro de la Saga Saiyajin',
    description: 'Completa todas las misiones y colecciona todos los personajes de la Saga Saiyajin',
    icon: '🌟',
    requirement: 100,
    currentProgress: 0,
    unlocked: false,
    category: 'exploration',
    reward: { xp: 500, title: 'Veterano Saiyajin' }
  },
  {
    id: 'namek-saga-master',
    title: 'Héroe de Namek',
    description: 'Domina todos los aspectos de la Saga de Namek',
    icon: '🌍',
    requirement: 100,
    currentProgress: 0,
    unlocked: false,
    category: 'exploration',
    reward: { xp: 500, title: 'Protector de Namek' }
  },

  // Logros de Combinación
  {
    id: 'family-bonds',
    title: 'Lazos Familiares',
    description: 'Colecciona a Goku, Gohan y Goten en su máximo poder',
    icon: '👨‍👦',
    requirement: 3,
    currentProgress: 0,
    unlocked: false,
    category: 'collection',
    reward: { xp: 300, title: 'Familia Son' }
  },
  {
    id: 'rival-alliance',
    title: 'Alianza de Rivales',
    description: 'Obtén a Goku y Vegeta en su máximo poder',
    icon: '🤝',
    requirement: 2,
    currentProgress: 0,
    unlocked: false,
    category: 'collection',
    reward: { xp: 250, title: 'Rivales Eternos' }
  },

  // Logros Diarios
  {
    id: 'daily-training',
    title: 'Entrenamiento Diario',
    description: 'Completa 5 sesiones de entrenamiento en un día',
    icon: '📅',
    requirement: 5,
    currentProgress: 0,
    unlocked: false,
    category: 'training',
    reward: { xp: 100, title: 'Guerrero Dedicado' }
  },
  {
    id: 'weekly-champion',
    title: 'Campeón Semanal',
    description: 'Mantén una racha de entrenamiento de 7 días',
    icon: '🏆',
    requirement: 7,
    currentProgress: 0,
    unlocked: false,
    category: 'training',
    reward: { xp: 300, title: 'Guerrero Constante' }
  }
];

export const userRanks: UserRank[] = [
  {
    id: 'novato',
    title: 'Novato',
    minXP: 0,
    maxXP: 499,
    color: 'from-gray-500 to-gray-700',
    icon: '🥉',
    benefits: ['Acceso básico a la app']
  },
  {
    id: 'guerrero-z',
    title: 'Guerrero Z',
    minXP: 500,
    maxXP: 1499,
    color: 'from-blue-500 to-blue-700',
    icon: '⚔️',
    benefits: ['Estadísticas detalladas', 'Modo quiz avanzado']
  },
  {
    id: 'super-guerrero',
    title: 'Super Guerrero',
    minXP: 1500,
    maxXP: 2999,
    color: 'from-yellow-500 to-orange-600',
    icon: '🔥',
    benefits: ['Contenido exclusivo', 'Logros especiales', 'Temas premium']
  },
  {
    id: 'guerrero-legendario',
    title: 'Guerrero Legendario',
    minXP: 3000,
    maxXP: 4999,
    color: 'from-green-500 to-emerald-700',
    icon: '💚',
    benefits: ['Funciones avanzadas', 'Estadísticas globales', 'Insignias especiales']
  },
  {
    id: 'dios-destruccion',
    title: 'Dios de la Destrucción',
    minXP: 5000,
    maxXP: Infinity,
    color: 'from-purple-600 to-pink-700',
    icon: '👑',
    benefits: ['Acceso completo', 'Funciones exclusivas', 'Reconocimiento especial', 'Contenido beta']
  }
];