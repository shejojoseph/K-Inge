'use client'

import { useState, FormEvent } from "react";
import PersonForm from "@/components/persons/PersonForm";
import SubmitButton from "@/components/form/SubmitButton";
import type { PersonData, Traits, Lifestyle } from "@/types";


const defaultTraits: Traits = {
  openness: 3,
  conscientiousness: 3,
  extraversion: 3,
  agreeableness: 3,
  neuroticism: 3,
};

const defaultLifestyle: Lifestyle = {
  relocate: 3,
  finance: 3,
  children: 3,
  travel: 3,
  chores: 3,
  workLifeBalance: 3,
  personalSpace: 3,
  fitness: 3,
};

export default function EnterPage() {
  const [personA, setPersonA] = useState<PersonData>({
    name: '',
    gender: '',
    pronouns: '',
    nationality: '',
    traits: { ...defaultTraits },
    lifestyle: { ...defaultLifestyle },
  });
  const [personB, setPersonB] = useState<PersonData>({
    name: '',
    gender: '',
    pronouns: '',
    nationality: '',
    traits: { ...defaultTraits },
    lifestyle: { ...defaultLifestyle },
  });

  // Text field entries for name, gender, pronouns, country
  const handleTextChangeA = (field: keyof Omit<PersonData, 'traits' | 'lifestyle'>, val: string) => {
    setPersonA((prev) => ({ ...prev, [field]: val }));
  };

  const handleTextChangeB = (field: keyof Omit<PersonData, 'trait' | 'lifestyle'>, val: string) => {
    setPersonB((prev) => ({ ...prev, [field]: val }));
  };

  // slider for traits
  const handleTraitChangeA = (traitKey: keyof Traits, val: number) => {
    setPersonA((prev) => ({
      ...prev, traits: { ...prev.traits, [traitKey]: val },
    }));
  };

  const handleTraitChangeB = (traitKey: keyof Traits, val: number) => {
    setPersonB((prev) => ({
      ...prev, traits: { ...prev.traits, [traitKey]: val },
    }));
  };

  // slider for Lifestyles
  const handleLifestyeChangeA = (lifeKey: keyof Lifestyle, val: number) => {
    setPersonA((prev) => ({
      ...prev, lifestyle: { ...prev.lifestyle, [lifeKey]: val },
    }));
  };

  const handleLifestyeChangeB = (lifeKey: keyof Lifestyle, val: number) => {
    setPersonB((prev) => ({
      ...prev, lifestyle: { ...prev.lifestyle, [lifeKey]: val },
    }));
  };

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    console.log('Person A: ', personA);
    console.log('Person B: ', personB);
    alert('Data logged to console. Next: call API to compute compatibility.');
  };

  return (
    <div className='min-h-screen bg-gray-50 px-4 py-12'>
      <div className='max-w-4xl mx-auto bg-white rounded-lg shadow-md p-8'>
        <h1 className='text-3xl font-bold text-gray-900 mb-6 text-center'>
          Enter Couple Details
        </h1>
        <form onSubmit={handleSubmit} className="space-y-12">
          {/* Person A */}
          <PersonForm
            label="A"
            data={personA}
            onTextChange={handleTextChangeA}
            onTraitChange={handleTraitChangeA}
            onLifestyleChange={handleLifestyeChangeA}
          />
          <hr className="my-8 border-gray-300" />

          {/* Person B */}
          <PersonForm
            label="B"
            data={personB}
            onTextChange={handleTextChangeB}
            onTraitChange={handleTraitChangeB}
            onLifestyleChange={handleLifestyeChangeB}
          />

          {/* Submit Button */}
          <div className="text-center">
            <SubmitButton />
          </div>
        </form>
      </div>
    </div>
  );
}