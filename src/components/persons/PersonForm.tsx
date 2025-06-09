'use client'

import React from "react";
import TextInput from "../inputs/TextInput";
import SelectInput from "../inputs/SelectInput";
import SliderInput from "../inputs/SliderInput";
import Avatar from "./Avatar";
import type { PersonData, Traits, Lifestyle } from "@/types";

interface PersonFormProps {
  label: 'A' | 'B';
  data: PersonData;
  onTextChange: (field: keyof Omit<PersonData, 'traits' | 'lifestyle'>, value: string) => void;
  onTraitChange: (traitKey: keyof Traits, value: number) => void;
  onLifestyleChange: (lifeKey: keyof Lifestyle, value: number) => void;
}

export default function PersonForm({
  label,
  data,
  onTextChange,
  onTraitChange,
  onLifestyleChange,
}: PersonFormProps) {
  //options for gender
  const genderOptions = [
    { value: '', label: 'Select Gender' },
    { value: 'male', label: 'Male' },
    { value: 'female', label: 'Female' },
  ];

  const lifestyleLabels: Record<keyof Lifestyle, string> = {
    relocate: 'Relocate',
    finance: 'Finance',
    children: 'Children',
    travel: 'Travel',
    chores: 'Household chores',
    workLifeBalance: 'Work-life balance',
    personalSpace: 'Personal space',
    fitness: 'Fitness routines',
  };

  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-semibold text-gray-800">Person {label}</h2>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* ── COLUMN 1: Avatar + Basic Info ─────────────────────────── */}
        <div className="flex flex-col items-center space-y-4">
          <Avatar gender={data.gender} size={128} />

          <TextInput
            id={`${label}-name`}
            label="Name"
            value={data.name}
            placeholder="Name"
            required
            onChange={(val) => onTextChange('name', val)}
          />

          <SelectInput
            id={`${label}-gender`}
            label='Gender'
            value={data.gender}
            options={genderOptions}
            required
            onChange={(val) => onTextChange('gender', val)}
          />

          <TextInput
            id={`${label}-pronouns`}
            label="Pronouns"
            value={data.pronouns}
            placeholder="e.g. they/them"
            required
            onChange={(val) => onTextChange('pronouns', val)}
          />

          <TextInput
            id={`${label}-nationality`}
            label='Nationality'
            value={data.nationality}
            placeholder="Nationality"
            required
            onChange={(val) => onTextChange('nationality', val)}
          />
        </div>
        {/* ── COLUMN 2: Big Five Traits ─────────────────────────────── */}
        <div className="space-y-4">
          <p className="text-lg font-medium text-gray-700">How ... are you? </p>
          {(
            Object.keys(data.traits) as Array<keyof Traits>
          ).map((traitKey) => (
            <SliderInput
              key={traitKey}
              id={`${label}-${traitKey}`}
              label={traitKey}
              value={data.traits[traitKey]}
              onChange={(val) => onTraitChange(traitKey, val)}
            />
          ))}
        </div>
        {/* ── COLUMN 3: Lifestyle Preferences ───────────────────────── */}
        <div className="space-y-4">
          <p className="text-lg font-medium text-gray-700">How willing are you to...</p>
          {(
            Object.keys(data.lifestyle) as Array<keyof Lifestyle>
          ).map((lifeKey) => (
            <SliderInput
              key={lifeKey}
              id={`${label}-${lifeKey}`}
              label={lifestyleLabels[lifeKey]}
              value={data.lifestyle[lifeKey]}
              onChange={(val) => onLifestyleChange(lifeKey, val)}
            />
          ))}
        </div>
      </div>
    </div>
  )
}