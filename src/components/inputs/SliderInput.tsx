'use client';

import React from "react";

interface SliderInputProps {
  id: string;
  label: string;
  value: number;
  min?: number;
  max?: number;
  step?: number;
  onChange: (newValue: number) => void;
}

export default function SliderInput({
  id,
  label,
  value,
  min = -5,
  max = 5,
  step = 1,
  onChange,
}: SliderInputProps) {
  return (
    <div className="flex items-center space-x-3">
      <label htmlFor={id} className="w-40 text-gray-800 capitalize">
        {label}
      </label>
      <input
        id={id}
        type="range"
        min={min}
        max={max}
        step={step}
        value={value}
        onChange={(e) => onChange(Number(e.target.value))}
        className="flex-1"
      />
      <span className="w-6 text-center text-gray-800">{value}</span>
    </div>
  );
}