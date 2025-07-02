import { QuizQuestion } from '../types/Gamification';

export const quizQuestions: QuizQuestion[] = [
  // SAGA SAIYAJIN - FÁCIL
  {
    id: 'saiyan-1',
    question: '¿Cómo se llama el hermano de Goku?',
    options: ['Raditz', 'Nappa', 'Vegeta', 'Turles'],
    correctAnswer: 0,
    explanation: 'Raditz es el hermano mayor de Goku (Kakarotto) y el primer Saiyajin en llegar a la Tierra.',
    difficulty: 'easy',
    category: 'characters',
    saga: 'saiyan-saga',
    points: 10
  },
  {
    id: 'saiyan-2',
    question: '¿Cuál es el verdadero nombre de Goku?',
    options: ['Bardock', 'Kakarotto', 'Turles', 'Broly'],
    correctAnswer: 1,
    explanation: 'Kakarotto es el nombre Saiyajin de Goku, revelado por Raditz.',
    difficulty: 'easy',
    category: 'characters',
    saga: 'saiyan-saga',
    points: 10
  },
  {
    id: 'saiyan-3',
    question: '¿Quién se sacrifica para salvar a Gohan de Nappa?',
    options: ['Goku', 'Piccolo', 'Krilin', 'Yamcha'],
    correctAnswer: 1,
    explanation: 'Piccolo se sacrifica para proteger a Gohan del ataque de Nappa.',
    difficulty: 'medium',
    category: 'history',
    saga: 'saiyan-saga',
    points: 20
  },
  {
    id: 'saiyan-4',
    question: '¿Qué técnica aprende Goku con el Rey Kai?',
    options: ['Kamehameha', 'Kaio-ken', 'Genkidama', 'Ambas B y C'],
    correctAnswer: 3,
    explanation: 'Goku aprende tanto el Kaio-ken como la Genkidama durante su entrenamiento con el Rey Kai.',
    difficulty: 'medium',
    category: 'techniques',
    saga: 'saiyan-saga',
    points: 20
  },

  // SAGA NAMEK - FÁCIL/MEDIO
  {
    id: 'namek-1',
    question: '¿Quién es el emperador del mal en la Saga de Namek?',
    options: ['Cell', 'Majin Buu', 'Freezer', 'Cooler'],
    correctAnswer: 2,
    explanation: 'Freezer es el emperador del universo y el villano principal de la Saga de Namek.',
    difficulty: 'easy',
    category: 'characters',
    saga: 'namek-saga',
    points: 10
  },
  {
    id: 'namek-2',
    question: '¿Cuántas formas tiene Freezer?',
    options: ['2', '3', '4', '5'],
    correctAnswer: 2,
    explanation: 'Freezer tiene 4 formas: Primera, Segunda, Tercera y Forma Final.',
    difficulty: 'medium',
    category: 'characters',
    saga: 'namek-saga',
    points: 20
  },
  {
    id: 'namek-3',
    question: '¿Con quién se fusiona Piccolo en Namek?',
    options: ['Dende', 'Nail', 'Guru', 'Kami'],
    correctAnswer: 1,
    explanation: 'Piccolo se fusiona con Nail, aumentando dramáticamente su poder.',
    difficulty: 'medium',
    category: 'history',
    saga: 'namek-saga',
    points: 20
  },
  {
    id: 'namek-4',
    question: '¿Qué desencadena la primera transformación de Goku en Super Saiyajin?',
    options: ['La muerte de Vegeta', 'La muerte de Krilin', 'Ver a Gohan herido', 'La destrucción de Namek'],
    correctAnswer: 1,
    explanation: 'La muerte de Krilin a manos de Freezer desencadena la ira de Goku y su transformación en Super Saiyajin.',
    difficulty: 'easy',
    category: 'history',
    saga: 'namek-saga',
    points: 10
  },

  // SAGA CELL - MEDIO/DIFÍCIL
  {
    id: 'cell-1',
    question: '¿Quién viene del futuro para advertir sobre los Androides?',
    options: ['Gohan del futuro', 'Trunks', 'Goku del futuro', 'Vegeta del futuro'],
    correctAnswer: 1,
    explanation: 'Trunks viaja del futuro para advertir sobre la amenaza de los Androides.',
    difficulty: 'easy',
    category: 'characters',
    saga: 'cell-saga',
    points: 10
  },
  {
    id: 'cell-2',
    question: '¿Qué transformación alcanza Gohan para derrotar a Cell?',
    options: ['Super Saiyajin', 'Super Saiyajin 2', 'Super Saiyajin 3', 'Super Saiyajin 4'],
    correctAnswer: 1,
    explanation: 'Gohan es el primero en alcanzar el Super Saiyajin 2 durante su batalla contra Cell.',
    difficulty: 'medium',
    category: 'characters',
    saga: 'cell-saga',
    points: 20
  },
  {
    id: 'cell-3',
    question: '¿Cómo se llama el torneo organizado por Cell?',
    options: ['Torneo de Artes Marciales', 'Cell Games', 'Torneo del Poder', 'Torneo de Cell'],
    correctAnswer: 1,
    explanation: 'Cell organiza los "Cell Games" para demostrar su poder supremo.',
    difficulty: 'medium',
    category: 'history',
    saga: 'cell-saga',
    points: 20
  },

  // SAGA BUU - DIFÍCIL
  {
    id: 'buu-1',
    question: '¿Quién despierta a Majin Buu?',
    options: ['Dabura', 'Babidi', 'Majin Vegeta', 'Gohan'],
    correctAnswer: 1,
    explanation: 'Babidi es el mago que despierta a Majin Buu usando la energía de las peleas.',
    difficulty: 'medium',
    category: 'characters',
    saga: 'buu-saga',
    points: 20
  },
  {
    id: 'buu-2',
    question: '¿Qué transformación revela Goku por primera vez en esta saga?',
    options: ['Super Saiyajin 2', 'Super Saiyajin 3', 'Super Saiyajin 4', 'Super Saiyajin God'],
    correctAnswer: 1,
    explanation: 'Goku revela el Super Saiyajin 3 durante su pelea contra Majin Buu.',
    difficulty: 'medium',
    category: 'characters',
    saga: 'buu-saga',
    points: 20
  },

  // PREGUNTAS GENERALES - DIFÍCIL/EXPERTO
  {
    id: 'general-1',
    question: '¿Cuál es el planeta natal de los Saiyajin?',
    options: ['Namek', 'Vegeta', 'Freezer', 'Sadala'],
    correctAnswer: 1,
    explanation: 'El Planeta Vegeta es el hogar de la raza Saiyajin, nombrado así por el Rey Vegeta.',
    difficulty: 'easy',
    category: 'curiosities',
    saga: 'general',
    points: 10
  },
  {
    id: 'general-2',
    question: '¿Cuántas Esferas del Dragón se necesitan para invocar a Shenron?',
    options: ['5', '6', '7', '8'],
    correctAnswer: 2,
    explanation: 'Se necesitan las 7 Esferas del Dragón para invocar a Shenron y pedir un deseo.',
    difficulty: 'easy',
    category: 'curiosities',
    saga: 'general',
    points: 10
  },
  {
    id: 'general-3',
    question: '¿Cuál es el multiplicador de poder del Kaio-ken x20?',
    options: ['10 veces', '15 veces', '20 veces', '25 veces'],
    correctAnswer: 2,
    explanation: 'El Kaio-ken x20 multiplica el poder base por 20, pero es extremadamente peligroso.',
    difficulty: 'hard',
    category: 'techniques',
    saga: 'general',
    points: 30
  },
  {
    id: 'general-4',
    question: '¿Qué significa "Saiyajin" en japonés?',
    options: ['Guerrero del espacio', 'Mono guerrero', 'Verdura', 'Poder supremo'],
    correctAnswer: 2,
    explanation: 'Saiyajin es un juego de palabras con "yasai" (verdura) en japonés, por eso todos tienen nombres de vegetales.',
    difficulty: 'expert',
    category: 'curiosities',
    saga: 'general',
    points: 50
  },
  {
    id: 'general-5',
    question: '¿Cuál es el nivel de poder de Goku base al final de la Saga Saiyajin?',
    options: ['8,000', '9,000', '10,000', '12,000'],
    correctAnswer: 0,
    explanation: 'El nivel de poder base de Goku al final de la Saga Saiyajin es de 8,000.',
    difficulty: 'expert',
    category: 'curiosities',
    saga: 'saiyan-saga',
    points: 50
  },
  {
    id: 1,
    question: "¿Cuál es la técnica característica de Goku?",
    options: ["Kamehameha", "Makankosappo", "Final Flash", "Kienzan"],
    correctAnswer: "Kamehameha",
    difficulty: "fácil",
    category: "técnicas",
    explanation: "El Kamehameha es la técnica insignia de Goku, aprendida del Maestro Roshi.",
    imageUrl: "/images/characters/goku.webp"
  },
  {
    id: 2,
    question: "¿Quién entrenó a Gohan para enfrentarse a los Saiyajin?",
    options: ["Goku", "Piccolo", "Krillin", "Maestro Roshi"],
    correctAnswer: "Piccolo",
    difficulty: "medio",
    category: "historia",
    explanation: "Piccolo entrenó a Gohan durante el año previo a la llegada de los Saiyajin.",
    imageUrl: "/images/characters/picollo2.webp"
  },
  {
    id: 3,
    question: "¿Cuál fue la primera transformación de Vegeta que vimos en la serie?",
    options: ["Super Saiyajin", "Ozaru (Mono Gigante)", "Super Saiyajin Blue", "Ultra Ego"],
    correctAnswer: "Ozaru (Mono Gigante)",
    difficulty: "medio",
    category: "personajes",
    explanation: "Vegeta se transformó en Ozaru durante su primera batalla contra Goku en la Tierra.",
    imageUrl: "/images/characters/Vegeta.webp"
  },
  {
    id: 4,
    question: "¿En qué saga Krillin obtiene el poder de destruir a los Saibaman?",
    options: ["Saga de los Saiyajin", "Saga de Namek", "Saga de Cell", "Saga de Majin Buu"],
    correctAnswer: "Saga de los Saiyajin",
    difficulty: "difícil",
    category: "sagas",
    explanation: "Durante la saga de los Saiyajin, Krillin demostró su poder destruyendo a varios Saibaman con su técnica Kienzan.",
    imageUrl: "/images/characters/Krillin.webp"
  },
  {
    id: 5,
    question: "¿Cuál es la técnica especial de Piccolo?",
    options: ["Makankosappo", "Kienzan", "Kamehameha", "Final Flash"],
    correctAnswer: "Makankosappo",
    difficulty: "fácil",
    category: "técnicas",
    explanation: "El Makankosappo (Haz Especial) es la técnica más poderosa de Piccolo, que requiere concentración y dos dedos para ejecutarla.",
    imageUrl: "/images/characters/Piccolo.webp"
  }
];