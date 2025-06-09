'use client'

import { useState, FormEvent } from "react";
import PersonForm from "@/components/persons/PersonForm";
import SubmitButton from "@/components/form/SubmitButton";
import type { PersonData, Traits, Lifestyle } from "@/types";
import { useRouter } from "next/navigation"


const defaultTraits: Traits = {
  curious: 0,
  organized: 0,
  outgoing: 0,
  friendly: 0,
  anxious: 0,
};

const defaultLifestyle: Lifestyle = {
  relocate: 0,
  finance: 0,
  children: 0,
  travel: 0,
  chores: 0,
  workLifeBalance: 0,
  personalSpace: 0,
  fitness: 0,
};

const samplePersonA: PersonData = {
  name: "Bob",
  gender: "male",
  pronouns: "he/him",
  nationality: "Australian",
  traits: {
    curious: 2,
    organized: -1,
    outgoing: 4,
    friendly: 0,
    anxious: -3
  },
  lifestyle: {
    relocate: 1,
    finance: -2,
    children: 0,
    travel: 3,
    chores: 5,
    workLifeBalance: 4,
    personalSpace: -1,
    fitness: 2,
  },
}
const samplePersonB: PersonData = {
  name: "Alice",
  gender: 'female',
  pronouns: 'she/her',
  nationality: 'Russian',
  traits: {
    curious: 5,
    organized: 3,
    outgoing: -2,
    friendly: 4,
    anxious: 1,
  },
  lifestyle: {
    relocate: -4,
    finance: 2,
    children: 5,
    travel: -1,
    chores: 0,
    workLifeBalance: 5,
    personalSpace: 3,
    fitness: -2,
  }
}
export default function EnterPage() {
  const router = useRouter();
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

  const fillSample = () => {
    setPersonA(samplePersonA);
    setPersonB(samplePersonB);
  }

  // Text field entries for name, gender, pronouns, country
  const handleTextChangeA = (field: keyof Omit<PersonData, 'trait' | 'lifestyle'>, val: string) => {
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
    const payload = encodeURIComponent(
      JSON.stringify({ personA, personB })
    );
    router.push(`/chat?data=${payload}`);
  };

  return (
    <div className="min-h-screen bg-gray-50 px-4 py-12">
      <div className="max-w-4xl mx-auto bg-white rounded-lg shadow-md p-8 space-y-6">
        {/* Header with title and sample button */}
        <div className="flex items-center justify-between">
          <h1 className="text-3xl font-bold text-gray-900">
            Enter Couple Details
          </h1>
          <button
            type="button"
            onClick={fillSample}
            className="inline-flex items-center bg-green-600 hover:bg-green-700 text-white font-semibold px-6 py-2 rounded-md transition-colors"
          >
            Sample
          </button>
        </div>
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
      </div >
    </div >
  );
}