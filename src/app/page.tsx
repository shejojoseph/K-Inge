"use client";

import { useEffect, useState } from 'react';
import Lottie from 'lottie-react';
import animationData from '../../public/inge-intro.json'

export default function HomePage() {

  const [showPrompt, setShowPrompt] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => setShowPrompt(true), 5000);
    return () => clearTimeout(timer);
  }, []);

  return (
    <div className='min-h-screen bg-gray-400 px-8 py-16 font-sans box-border flex flex-col items-center'>
      <div className='w-full max-w-md bg-gray-200 rounded-lg shadow-md p-8 mb-8 text-center'>
        {/*---LottieFiles Animation (Inge Intro) */}
        <div className='w-full mb-6'>
          <Lottie
            animationData={animationData}
            loop={true}
            autoplay={true}
            className='w-full h-auto'
          />
        </div>

        <h1 className='font-dancing text-5xl font-bold text-gray-900 mb-2 leading-tight'>Hi, I&rsquo;m <span className='text-red-900'>Inge</span>👋</h1>
        <p className='text-xl text-gray-600 leading-relaxed'>I&apos;m your Kummerkastentante.<br /> I can help you as a couple navigate differences of personalities and provide tips for your relationship.</p>
      </div>
      <div className={`flex flex-col items-center space-y-1 transition-opacity duration-500 ${showPrompt ? 'opacity-100' : 'opacity-0'}`}>
        <p className='text-base text-gray-500'>👇 Scroll down to tell me more about you guys 👇</p>
        <div className='text-3xl text-gray-300 animate-bounce'>↓</div>
      </div>
    </div>
  );
}