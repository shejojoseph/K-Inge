export type Traits = {
  curious: number;
  organized: number;
  outgoing: number;
  friendly: number;
  anxious: number;
};

export type Lifestyle = {
  relocate: number;
  finance: number;
  children: number;
  travel: number;
  chores: number;
  workLifeBalance: number;
  personalSpace: number;
  fitness: number;
};

export interface PersonData {
  name: string;
  gender: "male" | "female" | "";
  pronouns: string;
  nationality: string;
  traits: Traits;
  lifestyle: Lifestyle;
}

export type Msg = { role: 'user' | 'assistant'; content: string };