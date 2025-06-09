'use client';

import Link from 'next/link';
import Image from 'next/image';
import { usePathname } from 'next/navigation';

export default function Navbar() {
  const pathname = usePathname();

  return (
    <nav className='w-full bg-gray-200 shadow-sm'>
      <div className='max-w-6xl mx-auto px-8 py-4 flex items-center justify-between'>
        <Link href='/'>
          <div className='flex items-center cursor-pointer'>
            <Image
              src='/logo.svg'
              alt='Kummerkastentante Inge Logo'
              width={203}
              height={75}
              className='h-10 w-auto'
            />
          </div>
        </Link>
        <div>
          <Link href='/enter'
            className={`
          text-lg font-medium
          ${pathname === "/enter" ? 'text-blue-600' : 'text-gray-700'}
          hover:text-blue-600 transition-colors
          `}
          > Get Started
          </Link>
        </div>
      </div>
    </nav>
  )
}