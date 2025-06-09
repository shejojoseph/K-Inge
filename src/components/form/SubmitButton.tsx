'use client';

import React from "react";

interface SubmitButtonProps {
  label?: string,
}

export default function SubmitButton({ label = "Open chat" }: SubmitButtonProps) {
  return (
    <button
      type="submit"
      className="
        mt-8 inline-flex
        items-center justify-center
        bg-gray-600 hover:bg-gray-700 text-white
        text-lg font-semibold
        px-8 py-3 rounded-full shadow-md
        transition-colors"
    >
      {label}
    </button>
  );
}