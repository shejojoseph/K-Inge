'use client';

import React, { useEffect, useState } from "react";
import Lottie from 'lottie-react';

interface AvatarProps {
  gender: 'male' | 'female' | '';
  size?: number;
}

export default function Avatar({ gender, size = 128 }: AvatarProps) {
  const [animationData, setAnimationData] = useState<Record<string, unknown> | null>(null);

  const url = (
    gender === "male" ? '/male.json'
      : gender === 'female' ? '/female.json'
        : '/neutral.json');

  useEffect(() => {
    (async () => {
      try {
        const res = await fetch(url);
        const json = await res.json();
        setAnimationData(json);
      } catch (err) {
        console.error('Lottie JSON load failed: ', err);
      }
    })()
  }, [url]);

  return (
    <div
      className="rounded-full bg-gray-200 overflow-hidden"
      style={{ width: size, height: size }}
    >
      {animationData ? (
        <Lottie
          animationData={animationData}
          loop={false}
          autoplay={true}
          className="w-full h-full"
        />
      ) : (
        <div className="flex items-center justify-center w-full h-full bg-gray-100">
          <span className="text-gray-400">Loading...</span>
        </div>
      )}
    </div>
  )
}