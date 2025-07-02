export type CardRarity = 'común' | 'rara' | 'épica' | 'legendaria';

export interface Card {
  id: string;
  characterId: string;
  name: string;
  image: string;
  rarity: 'common' | 'rare' | 'epic' | 'legendary' | 'maxpower';
  power: number;
  defense: number;
  ki: number;
  specialMove: string;
  description: string;
  saga: string;
  holographic: boolean;
  obtained: Date;
  powerLevel: number;
  isUnlocked: boolean;
  specialEffects?: {
    auraColor?: string;
    animation?: 'golden-shine' | 'electric-aura' | 'ki-explosion' | 'rainbow-flash';
    soundEffect?: string;
    particleEffect?: 'sparkles' | 'lightning' | 'ki-orbs' | 'dragon-aura';
  };
}

export interface CardCollection {
  cards: Card[];
  totalCards: number;
  uniqueCards: number;
  rarityCount: Record<CardRarity, number>;
}

export interface CardPack {
  id: string;
  name: string;
  description: string;
  price: number;
  cardCount: number;
  guaranteedRarity?: CardRarity;
  image: string;
  saga?: string;
}

export interface CardTrade {
  id: string;
  offeredCard: Card;
  requestedCard: Card;
  offerDate: Date;
  status: 'pendiente' | 'aceptado' | 'rechazado';
  offererId: string;
  receiverId: string;
} 