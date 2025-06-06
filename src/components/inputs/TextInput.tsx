'use client';

import React from 'react';

interface TextInputProps {
  label: string;
  id: string;
  value: string;
  placeholder?: string;
  required?: boolean;
  onChange: (newValue: string) => void;
}

export default function TextInput({
  label,
  id,
  value,
  placeholder,
  required = false,
  onChange,
}: TextInputProps) {
  return (
    <div className='flex flex-col space-y-1'>
      <label htmlFor={id} className='text-gray-800 font-medium'>
        {label}
      </label>
      <input
        id={id}
        type='text'
        value={value}
        placeholder={placeholder}
        required={required}
        onChange={(e) => onChange(e.target.value)}
        className='border border-gray-300 rounded-md px-3 py-2 focus:ring-blue-500 focus:border-blue-500'
      />
    </div>
  )
}