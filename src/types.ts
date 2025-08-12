export interface Question {
  id: number;
  text: string;
  talentId: number;
  color?: string;
}

export interface Talent {
  id: number;
  title: string;
  description: string;
  color?: string;
  image?: string;
}

export interface Card {
  id: number;
  title: string;
  description: string;
  color?: string;
  image?: string;
}
