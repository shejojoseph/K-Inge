import type { Metadata } from "next";
import { Geist, Geist_Mono, Dancing_Script } from "next/font/google";
import "./globals.css";

import Navbar from "@/components/Navbar";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const dancing = Dancing_Script({
  weight: ['400', '500', '700'],
  subsets: ['latin'],
  variable: '--font-dancing',
})

export const metadata: Metadata = {
  title: "Kummerkastentante Inge",
  description: "Relationship Advisor",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} ${dancing.variable} antialiased bg-gray-50 min-h-screen`}
      >
        <Navbar />
        <main className="flex-1">

          {children}
        </main>
      </body>
    </html>
  );
}
