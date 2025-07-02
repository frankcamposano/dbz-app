import { Character, CoverArt } from '../types/Character';

export const coverArts: CoverArt[] = [
  {
    id: 'saiyan-saga',
    title: 'Saga Saiyajin',
    image: '/images/sagas/saga-saiyan.webp',
    gradient: 'from-orange-600 via-red-600 to-purple-900'
  },
  {
    id: 'namek-saga',
    title: 'Saga de Namek',
    image: '/images/sagas/saga-namek.webp',
    gradient: 'from-green-600 via-blue-600 to-purple-900'
  },
  {
    id: 'androids-saga',
    title: 'Saga de los Androides',
    image: '/images/sagas/saga-androides.webp',
    gradient: 'from-blue-500 via-indigo-600 to-purple-900'
  },
  {
    id: 'cell-saga',
    title: 'Saga de Cell',
    image: '/images/sagas/saga-cell.webp',
    gradient: 'from-yellow-500 via-orange-600 to-red-900'
  },
  {
    id: 'buu-saga',
    title: 'Saga de Majin Buu',
    image: '/images/sagas/saga-mayimbu.jpg',
    gradient: 'from-pink-500 via-purple-600 to-indigo-900'
  }
];

// === SAGA SAIYAJIN ===
export const saiyajinSagaCharacters: Character[] = [
  // HÉROES DE LA TIERRA
  {
    id: 'goku-saiyan',
    name: 'Son Goku (Kakarotto)',
    race: 'Saiyajin',
    powerLevel: 8000,
    maxPowerLevel: 32000,
    transformations: ['Kaio-ken x2', 'Kaio-ken x3', 'Kaio-ken x4', 'Ozaru'],
    techniques: ['Kamehameha', 'Kaio-ken', 'Genkidama', 'Teletransportación'],
    description: 'El guerrero Saiyajin criado en la Tierra. Durante la Saga Saiyajin descubre sus verdaderos orígenes como Kakarotto. Su entrenamiento con el Rey Kai le otorga nuevas técnicas poderosas.',
    image: '/images/characters/goku copy.webp',
    battleVideo: '/videos/goku-batalla.mp4',
    iconicPhrase: "¡Soy Kakarotto, un guerrero Saiyajin criado en la Tierra!",
    planet: 'Vegeta/Tierra',
    status: 'alive',
    audioPhrase: '/audios/goku.mp3'
  },
  {
    id: 'gohan-saiyan',
    name: 'Son Gohan',
    race: 'Medio Saiyajin',
    powerLevel: 1500,
    maxPowerLevel: 14000,
    transformations: ['Ozaru', 'Poder Oculto'],
    techniques: ['Masenko', 'Kamehameha', 'Ráfaga de Energía'],
    description: 'El hijo de Goku de solo 4 años. Posee un poder oculto increíble que se desata cuando está en peligro extremo. Su inocencia contrasta con su potencial destructivo.',
    image: '/images/characters/gohan.webp',
    battleVideo: '/videos/gohan-batalla.mp4',
    iconicPhrase: "¡No quiero pelear, pero protegeré a mis amigos!",
    planet: 'Tierra',
    status: 'alive',
    audioPhrase: '/audios/gohan.mp3'
  },
  {
    id: 'piccolo-saiyan',
    name: 'Piccolo',
    race: 'Namekiano',
    powerLevel: 3500,
    maxPowerLevel: 18000,
    transformations: ['Forma Gigante'],
    techniques: ['Cañón Especial', 'Granada del Infierno', 'Regeneración', 'Rayo Ocular'],
    description: 'El antiguo Rey Demonio convertido en protector. Se sacrifica para salvar a Gohan, demostrando que incluso los demonios pueden tener corazón.',
    image: '/images/characters/Piccolo.webp',
    battleVideo: '/videos/piccolo-batalla.mp4',
    iconicPhrase: "¡Gohan... eres el único amigo que he tenido!",
    planet: 'Namek',
    status: 'deceased',
    audioPhrase: '/audios/picollo.mp3'
  },
  {
    id: 'krillin-saiyan',
    name: 'Krilin',
    race: 'Humano',
    powerLevel: 1770,
    maxPowerLevel: 13000,
    transformations: [],
    techniques: ['Disco Destructor', 'Destello Solar', 'Kamehameha', 'Bala Dispersa'],
    description: 'El mejor amigo de Goku y el humano más fuerte de la Tierra. Su valentía supera su poder cuando se enfrenta a enemigos mucho más poderosos.',
    image: '/images/characters/Krillin.webp',
    battleVideo: '/videos/krilin-batalla.mp4',
    iconicPhrase: "¡Puede que no sea el más fuerte, pero nunca me rendiré!",
    planet: 'Tierra',
    status: 'alive',
    audioPhrase: '/audios/krillin.mp3'
  },
  {
    id: 'yamcha-saiyan',
    name: 'Yamcha',
    race: 'Humano',
    powerLevel: 1480,
    maxPowerLevel: 9000,
    transformations: [],
    techniques: ['Puño del Lobo', 'Kamehameha', 'Bola de Energía', 'Técnica del Lobo'],
    description: 'Ex-bandido del desierto convertido en luchador. Su determinación y espíritu de equipo lo convierten en un aliado valioso contra los Saiyajin.',
    image: '/images/characters/yamcha.webp',
    battleVideo: '/videos/yamcha-batalla.mp4',
    iconicPhrase: "¡No subestimes a este lobo del desierto!",
    planet: 'Tierra',
    status: 'alive',
    audioPhrase: '/audios/yamcha.mp3'
  },
  {
    id: 'tenshinhan-saiyan',
    name: 'Tenshinhan',
    race: 'Humano',
    powerLevel: 1830,
    maxPowerLevel: 15000,
    transformations: [],
    techniques: ['Kikoho', 'Taiyoken', 'Dodonpa', 'Técnica de los Cuatro Cuerpos'],
    description: 'Maestro de artes marciales con un tercer ojo. Su técnica Kikoho es capaz de dañar incluso a enemigos mucho más poderosos.',
    image: '/images/characters/Ten.webp',
    battleVideo: '/videos/tenshinhan-batalla.mp4',
    iconicPhrase: "¡Mi Kikoho puede detener incluso a un Saiyajin!",
    planet: 'Tierra',
    status: 'alive',
    audioPhrase: '/audios/ten1.mp3'
  },
  {
    id: 'chaoz-saiyan',
    name: 'Chaoz',
    race: 'Humano',
    powerLevel: 610,
    maxPowerLevel: 2000,
    transformations: [],
    techniques: ['Dodonpa', 'Telekinesis', 'Parálisis Psíquica', 'Autodestrucción'],
    description: 'El pequeño compañero de Tenshinhan con poderes psíquicos. Su sacrificio heroico contra Nappa demuestra que el tamaño no determina el valor.',
    image: '/images/characters/Chaoz.webp',
    battleVideo: '/videos/chaoz-batalla.mp4',
    iconicPhrase: "¡Ten-san, haré lo que sea para ayudarte!",
    planet: 'Tierra',
    status: 'deceased',
    audioPhrase: '/audios/chaos.mp3'
  },
  {
    id: 'yajirobe-saiyan',
    name: 'Yajirobe',
    race: 'Humano',
    powerLevel: 970,
    maxPowerLevel: 2100,
    transformations: [],
    techniques: ['Corte de Espada', 'Técnica de Ocultación'],
    description: 'Un samurái ermitaño que vive en la Torre de Karin. Su intervención oportuna cortando la cola de Vegeta salva el día.',
    image: '/images/characters/Yajirobe.webp',
    battleVideo: '/videos/yajirobe-batalla.mp4',
    iconicPhrase: "¡Solo quiero comer en paz!",
    planet: 'Tierra',
    status: 'alive',
    audioPhrase: '/audios/Yajirobe.mp3'
  },
  // INVASORES SAIYAJIN
  {
    id: 'raditz',
    name: 'Raditz',
    race: 'Saiyajin',
    powerLevel: 1500,
    maxPowerLevel: 1500,
    transformations: ['Ozaru'],
    techniques: ['Doble Domingo', 'Ráfaga de Energía', 'Vuelo'],
    description: 'El hermano mayor de Goku y el primer Saiyajin en llegar a la Tierra. Su llegada revela la verdadera identidad de Goku como Kakarotto.',
    image: '/images/characters/Raditz.webp',
    battleVideo: '/videos/raditz-batalla.mp4',
    iconicPhrase: "¡Kakarotto, eres mi hermano menor!",
    planet: 'Vegeta',
    status: 'deceased',
    audioPhrase: '/audios/raditz.mp3'
  },
  {
    id: 'nappa',
    name: 'Nappa',
    race: 'Saiyajin',
    powerLevel: 4000,
    maxPowerLevel: 7000,
    transformations: ['Ozaru'],
    techniques: ['Cañón Volcánico', 'Explosión Gigante', 'Onda Explosiva'],
    description: 'El compañero de Vegeta y general del ejército Saiyajin. Su brutalidad y poder destructivo aterrorizan a los Guerreros Z.',
    image: '/images/characters/Nappa.webp',
    battleVideo: '/videos/nappa-batalla.mp4',
    iconicPhrase: "¡Vegeta, ¿puedo jugar con ellos?!",
    planet: 'Vegeta',
    status: 'deceased',
    audioPhrase: '/audios/napa.mp3'
  },
  {
    id: 'vegeta-saiyan',
    name: 'Vegeta',
    race: 'Saiyajin',
    powerLevel: 18000,
    maxPowerLevel: 180000,
    transformations: ['Ozaru'],
    techniques: ['Galick Ho', 'Ráfaga de Energía', 'Explosión de Energía'],
    description: 'El Príncipe de todos los Saiyajin. Orgulloso, despiadado y obsesionado con ser el guerrero más fuerte del universo.',
    image: '/images/characters/Vegeta.webp',
    battleVideo: '/videos/vegeta-batalla.mp4',
    iconicPhrase: "¡Soy Vegeta, el Príncipe de todos los Saiyajin!",
    planet: 'Vegeta',
    status: 'alive',
    audioPhrase: '/audios/vegeta.mp3'
  }
];

// === SAGA DE NAMEK ===
export const namekSagaCharacters: Character[] = [
  {
    id: 'goku-namek',
    name: 'Son Goku',
    race: 'Saiyajin',
    powerLevel: 90000,
    maxPowerLevel: 150000000,
    transformations: ['Kaio-ken x20', 'Super Saiyajin'],
    techniques: ['Kamehameha', 'Kaio-ken', 'Genkidama', 'Teletransportación'],
    description: 'Goku llega a Namek tras su entrenamiento en gravedad 100x. Se convierte en el legendario Super Saiyajin durante su batalla contra Freezer.',
    image: '/images/characters/goku copy.webp',
    battleVideo: '/videos/goku-namek-batalla.mp4',
    iconicPhrase: "¡Soy el guerrero que viene de la Tierra, Goku!",
    planet: 'Tierra',
    status: 'alive'
  },
  {
    id: 'gohan-namek',
    name: 'Son Gohan',
    race: 'Medio Saiyajin',
    powerLevel: 14000,
    maxPowerLevel: 200000,
    transformations: ['Poder Oculto'],
    techniques: ['Masenko', 'Kamehameha', 'Ráfaga de Energía'],
    description: 'Gohan viaja a Namek para ayudar a buscar las Esferas del Dragón. Su poder oculto se despierta varias veces durante las batallas.',
    image: '/images/characters/gohan.webp',
    battleVideo: '/videos/gohan-namek-batalla.mp4',
    iconicPhrase: "¡Tengo que ser valiente como mi papá!",
    planet: 'Tierra',
    status: 'alive'
  },
  {
    id: 'krillin-namek',
    name: 'Krilin',
    race: 'Humano',
    powerLevel: 13000,
    maxPowerLevel: 75000,
    transformations: [],
    techniques: ['Disco Destructor', 'Destello Solar', 'Kamehameha'],
    description: 'Krilin viaja a Namek y recibe un gran aumento de poder del Gran Patriarca. Su muerte a manos de Freezer despierta la ira de Goku.',
    image: '/images/characters/Krillin.webp',
    battleVideo: '/videos/krillin-namek-batalla.mp4',
    iconicPhrase: "¡No dejaré que lastimes a mis amigos!",
    planet: 'Tierra',
    status: 'deceased'
  },
  {
    id: 'piccolo-namek',
    name: 'Piccolo',
    race: 'Namekiano',
    powerLevel: 42000,
    maxPowerLevel: 800000,
    transformations: ['Fusión con Nail'],
    techniques: ['Cañón Especial', 'Granada del Infierno', 'Regeneración'],
    description: 'Piccolo es revivido y viaja a Namek donde se fusiona con Nail, aumentando dramáticamente su poder.',
    image: '/images/characters/picollo2.webp',
    battleVideo: '/videos/piccolo-namek-batalla.mp4',
    iconicPhrase: "¡Ahora soy mucho más fuerte que antes!",
    planet: 'Namek',
    status: 'alive'
  },
  {
    id: 'vegeta-namek',
    name: 'Vegeta',
    race: 'Saiyajin',
    powerLevel: 24000,
    maxPowerLevel: 3000000,
    transformations: [],
    techniques: ['Galick Ho', 'Ataque Big Bang', 'Flash Final'],
    description: 'Vegeta llega a Namek buscando la inmortalidad. Su orgullo lo lleva a enfrentarse a Freezer en sus múltiples formas.',
    image: '/images/characters/vegeta-namek.jpg',
    battleVideo: '/videos/vegeta-namek-batalla.mp4',
    iconicPhrase: "¡Soy el Príncipe de los Saiyajin!",
    planet: 'Vegeta',
    status: 'alive'
  },
  {
    id: 'frieza',
    name: 'Freezer',
    race: 'Mutante Alienígena',
    powerLevel: 530000,
    maxPowerLevel: 120000000,
    transformations: ['Segunda Forma', 'Tercera Forma', 'Forma Final', '100% Poder'],
    techniques: ['Rayo de la Muerte', 'Supernova', 'Disco Cortante', 'Telekinesis'],
    description: 'El emperador del mal que gobierna el universo. Su llegada a Namek desata una batalla épica por las Esferas del Dragón.',
    image: '/images/characters/Freezer.webp',
    battleVideo: '/videos/frieza-batalla.mp4',
    iconicPhrase: "¡Soy el emperador del universo!",
    planet: 'Desconocido',
    status: 'alive'
  }
];

// === SAGA DE CELL ===
export const cellSagaCharacters: Character[] = [
  {
    id: 'goku-cell',
    name: 'Son Goku',
    race: 'Saiyajin',
    powerLevel: 150000000,
    maxPowerLevel: 300000000,
    transformations: ['Super Saiyajin', 'Super Saiyajin Grado 2'],
    techniques: ['Kamehameha', 'Teletransportación', 'Genkidama'],
    description: 'Goku regresa tras su entrenamiento en la Habitación del Tiempo. Se sacrifica para salvar la Tierra del Cell autodestructivo.',
    image: '/images/characters/goku copy.webp',
    battleVideo: '/videos/goku-cell-batalla.mp4',
    iconicPhrase: "¡Gohan, ahora te toca a ti!",
    planet: 'Tierra',
    status: 'deceased'
  },
  {
    id: 'gohan-cell',
    name: 'Son Gohan',
    race: 'Medio Saiyajin',
    powerLevel: 200000000,
    maxPowerLevel: 400000000,
    transformations: ['Super Saiyajin', 'Super Saiyajin 2'],
    techniques: ['Masenko', 'Kamehameha', 'Kamehameha Definitivo'],
    description: 'Gohan alcanza el legendario Super Saiyajin 2 y derrota a Cell Perfecto. Se convierte en el guerrero más fuerte de la Tierra.',
    image: '/images/characters/gohan.webp',
    battleVideo: '/videos/gohan-cell-batalla.mp4',
    iconicPhrase: "¡Deja en paz a mis amigos!",
    planet: 'Tierra',
    status: 'alive'
  },
  {
    id: 'vegeta-cell',
    name: 'Vegeta',
    race: 'Saiyajin',
    powerLevel: 120000000,
    maxPowerLevel: 250000000,
    transformations: ['Super Saiyajin', 'Super Saiyajin Grado 2'],
    techniques: ['Galick Ho', 'Ataque Big Bang', 'Flash Final'],
    description: 'Vegeta alcanza el Super Saiyajin y permite que Cell se vuelva perfecto por su orgullo de enfrentar al oponente más fuerte.',
    image: '/images/characters/vegeta-cell.jpg',
    battleVideo: '/videos/vegeta-cell-batalla.mp4',
    iconicPhrase: "¡Mi orgullo Saiyajin no me permite huir!",
    planet: 'Vegeta',
    status: 'alive'
  },
  {
    id: 'trunks-cell',
    name: 'Trunks',
    race: 'Medio Saiyajin',
    powerLevel: 100000000,
    maxPowerLevel: 300000000,
    transformations: ['Super Saiyajin', 'Super Saiyajin Grado 3'],
    techniques: ['Ataque Ardiente', 'Buster Final', 'Golpe de Espada'],
    description: 'El viajero del tiempo que viene del futuro para advertir sobre los Androides. Su misión es cambiar la historia.',
    image: '/images/characters/trunks.jpg',
    battleVideo: '/videos/trunks-batalla.mp4',
    iconicPhrase: "¡Vengo del futuro para cambiar la historia!",
    planet: 'Tierra',
    status: 'alive'
  },
  {
    id: 'cell',
    name: 'Cell',
    race: 'Bio-Androide',
    powerLevel: 200000000,
    maxPowerLevel: 350000000,
    transformations: ['Cell Imperfecto', 'Cell Semi-Perfecto', 'Cell Perfecto', 'Super Cell Perfecto'],
    techniques: ['Kamehameha', 'Cañón Especial', 'Regeneración', 'Absorción'],
    description: 'El bio-androide perfecto creado por el Dr. Gero. Posee las células de los luchadores más poderosos.',
    image: '/images/characters/cell.jpg',
    battleVideo: '/videos/cell-batalla.mp4',
    iconicPhrase: "¡Soy la perfección absoluta!",
    planet: 'Tierra',
    status: 'deceased'
  }
];

// === SAGA DE MAJIN BUU ===
export const buuSagaCharacters: Character[] = [
  {
    id: 'goku-buu',
    name: 'Son Goku',
    race: 'Saiyajin',
    powerLevel: 300000000,
    maxPowerLevel: 500000000,
    transformations: ['Super Saiyajin', 'Super Saiyajin 2', 'Super Saiyajin 3'],
    techniques: ['Kamehameha', 'Genkidama', 'Teletransportación', 'Fusión'],
    description: 'Goku regresa del Otro Mundo con el poder del Super Saiyajin 3. Se fusiona con Vegeta para crear a Vegetto.',
    image: '/images/characters/goku copy.webp',
    battleVideo: '/videos/goku-buu-batalla.mp4',
    iconicPhrase: "¡Este es el poder del Super Saiyajin 3!",
    planet: 'Tierra',
    status: 'deceased'
  },
  {
    id: 'vegeta-buu',
    name: 'Vegeta',
    race: 'Saiyajin',
    powerLevel: 250000000,
    maxPowerLevel: 400000000,
    transformations: ['Super Saiyajin', 'Super Saiyajin 2', 'Majin Vegeta'],
    techniques: ['Galick Ho', 'Ataque Big Bang', 'Flash Final', 'Explosión Final'],
    description: 'Vegeta se convierte en Majin Vegeta bajo el control de Babidi para obtener más poder y pelear contra Goku.',
    image: '/images/characters/vegeta-buu.jpg',
    battleVideo: '/videos/vegeta-buu-batalla.mp4',
    iconicPhrase: "¡Soy Majin Vegeta!",
    planet: 'Vegeta',
    status: 'alive'
  },
  {
    id: 'gohan-buu',
    name: 'Son Gohan',
    race: 'Medio Saiyajin',
    powerLevel: 200000000,
    maxPowerLevel: 450000000,
    transformations: ['Super Saiyajin', 'Super Saiyajin 2', 'Gohan Místico'],
    techniques: ['Masenko', 'Kamehameha', 'Kamehameha Definitivo'],
    description: 'Gohan despierta su poder oculto con el Kaio Shin Anciano, convirtiéndose en el guerrero más fuerte sin transformarse.',
    image: '/images/characters/gohan.webp',
    battleVideo: '/videos/gohan-buu-batalla.mp4',
    iconicPhrase: "¡No necesito transformarme para derrotarte!",
    planet: 'Tierra',
    status: 'alive'
  },
  {
    id: 'majin-buu',
    name: 'Majin Buu',
    race: 'Majin',
    powerLevel: 300000000,
    maxPowerLevel: 500000000,
    transformations: ['Buu Gordo', 'Buu Malvado', 'Super Buu', 'Kid Buu'],
    techniques: ['Rayo Convertidor', 'Grito Vicioso', 'Regeneración', 'Absorción'],
    description: 'Una antigua fuerza de destrucción pura creada por el mago Bibidi hace millones de años.',
    image: '/images/characters/majin-buu.jpg',
    battleVideo: '/videos/buu-batalla.mp4',
    iconicPhrase: "¡Buu destruirá todo!",
    planet: 'Desconocido',
    status: 'alive'
  }
];

// Función para obtener personajes por saga
export const getCharactersBySaga = (sagaId: string): Character[] => {
  switch (sagaId) {
    case 'saiyan-saga':
      return saiyajinSagaCharacters;
    case 'namek-saga':
      return namekSagaCharacters;
    case 'cell-saga':
      return cellSagaCharacters;
    case 'buu-saga':
      return buuSagaCharacters;
    default:
      return saiyajinSagaCharacters;
  }
};

// Exportar todos los personajes (para compatibilidad)
export const characters = saiyajinSagaCharacters;