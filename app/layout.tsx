import type { Metadata } from 'next';
import { Geist, Geist_Mono } from 'next/font/google';
import './globals.css';
import { ClerkProvider } from '@clerk/nextjs';
import Provider from './provider';

const geistSans = Geist({
  variable: '--font-geist-sans',
  subsets: ['latin'],
});

const geistMono = Geist_Mono({
  variable: '--font-geist-mono',
  subsets: ['latin'],
});

export const metadata: Metadata = {
  title: 'Nexoria – Your AI-Powered Career Mentor',
  description:
    'Nexoria is an AI-powered career guide helping you discover the best learning paths, skills, and opportunities tailored to your goals. Build a smarter future with personalized guidance.',
  keywords: [
    'AI career mentor',
    'career guidance',
    'learning path',
    'job skills',
    'Nexoria',
    'AI education',
    'career growth',
  ],
  authors: [{ name: 'Nexoria Team', url: 'https://nexoriapp.vercel.app' }],
  creator: 'Nexoria',
  themeColor: '#ffffff',
  openGraph: {
    title: 'Nexoria – Your AI-Powered Career Mentor',
    description:
      'Discover personalized learning paths and job guidance with Nexoria – the AI-driven platform built to empower your future.',
    url: 'https://nexoriapp.vercel.app',
    siteName: 'Nexoria',
    images: [
      {
        url: '/favicon.png',
        width: 1200,
        height: 630,
        alt: 'Nexoria AI Career Mentor',
      },
    ],
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Nexoria – Your AI-Powered Career Mentor',
    description:
      'Explore career guidance powered by AI. Nexoria helps you plan and grow with clarity and confidence.',
    images: ['/favicon.png'],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <ClerkProvider>
      <html lang="en">
        <body
          className={`${geistSans.variable} ${geistMono.variable} antialiased`}
        >
          <Provider>{children}</Provider>
        </body>
      </html>
    </ClerkProvider>
  );
}
