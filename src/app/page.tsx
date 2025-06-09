"use client";

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import Lottie from 'lottie-react';

export default function HomePage() {
  const router = useRouter();
  const [animationData, setAnimationData] = useState<Record<string, unknown> | null>(null);
  const [showButton, setShowButton] = useState(false);

  useEffect(() => {
    (async () => {
      try {
        const res = await fetch('/inge-intro.json');
        const json = await res.json();
        setAnimationData(json);
      } catch (err) {
        console.error('Lottie JSON load failed: ', err);
      }
    })()
  }, []);

  useEffect(() => {
    const timer = setTimeout(() => setShowButton(true), 5000);
    return () => clearTimeout(timer);
  }, []);

  return (
    <div className='flex flex-col items-center justify-center min-h-screen bg-gray-400 px-8 py-16 font-sans box-border '>
      <div className='w-full max-w-md bg-gray-200 rounded-lg shadow-md p-8 text-center'>
        {/*---LottieFiles Animation (Inge Intro) */}
        {animationData ? (

          <div className='w-full mb-6 rounded-md overflow-hidden'>
            <Lottie
              animationData={animationData}
              loop={true}
              autoplay={true}
              className='w-full h-auto'
            />
          </div>
        ) : (
          <div className="w-full mb-6 h-48 bg-gray-100 rounded-md flex items-center justify-center">
            <span className="text-gray-400">Loading animation…</span>
          </div>
        )}

        <h1 className='text-5xl font-bold text-gray-900 mb-2 leading-tight [font-family:Dancing_Script]'>
          Hi, I&rsquo;m <span className='text-red-900'>Inge</span>👋</h1>
        <p className='text-xl text-gray-600 leading-relaxed'>
          I&apos;m your Kummerkastentante.<br />
          I can help you as a couple navigate differences of personalities and provide tips for your relationship.
        </p>
        {showButton && (
          <button
            onClick={() => router.push('/enter')}
            className='mt-8 w-full bg-gray-600 hover:bg-gray-700 text-white text-lg font-semibold py-3 rounded-md transition-colors cursor-pointer'
          > Tell me more
          </button>
        )}
      </div>
    </div>
  );
}