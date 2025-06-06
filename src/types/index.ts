export type Traits = {
  openness: number;
  conscientiousness: number;
  extraversion: number;
  agreeableness: number;
  neuroticism: number;
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