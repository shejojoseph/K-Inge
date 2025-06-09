'use client'

import React from "react";

interface Option {
  value: string;
  label: string;
}

interface SelectInputProps {
  label: string;
  id: string;
  value: string;
  options: Option[];
  required?: boolean;
  onChange: (newValue: string) => void;
}

export default function SelectInput({
  label,
  id,
  value,
  options,
  required = false,
  onChange,
}: SelectInputProps) {
  return (
    <div className='flex flex-col space-y-1'>
      <label htmlFor={id} className='text-gray-800 font-medium'>
        {label}
      </label>
      <select
        id={id}
        value={value}
        required={required}
        onChange={(e) => onChange(e.target.value)}
        className="w-full border border-gray-300 rounded-md px-3 py-2 focus:ring-blue-500 focus:border-blue-500"
      >
        {options.map((opt) => (
          <option key={opt.value} value={opt.value}>
            {opt.label}
          </option>
        ))}
      </select>
    </div>
  );
}