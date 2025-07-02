export interface Character {
  id: string;
  name: string;
  race: string;
  powerLevel: number;
  maxPowerLevel: number;
  transformations: string[];
  techniques: string[];
  description: string;
  image: string;
  battleVideo?: string;
  iconicPhrase: string;
  audioFile?: string;
  planet: string;
  status: 'alive' | 'deceased' | 'unknown';
  audioPhrase?: string;
}

export interface CoverArt {
  id: string;
  title: string;
  image: string;
  gradient: string;
  description?: string;
  stats?: {
    totalCharacters: number;
    transformations: number;
    techniques: number;
    aliveCharacters: number;
  };
  tags?: string[];
}