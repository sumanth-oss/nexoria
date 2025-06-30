import { Button } from '@/components/ui/button';
import { Sparkles, ArrowRight } from 'lucide-react';
import Link from 'next/link';
import React from 'react';

function WelcomeBanner() {
  return (
    <div className="p-8 bg-gradient-to-br from-gray-900 to-black rounded-xl shadow-2xl border border-gray-800/50 relative overflow-hidden group text-gray-100">
      {/* Background decorative elements - using amber/orange for pop */}
      <div className="absolute -top-4 -right-4 w-24 h-24 bg-amber-300/10 rounded-full blur-xl"></div>
      <div className="absolute -bottom-6 -left-6 w-32 h-32 bg-orange-400/20 rounded-full blur-2xl"></div>
      <div className="absolute top-1/2 right-8 w-2 h-2 bg-amber-100/60 rounded-full animate-pulse"></div>
      <div className="absolute top-1/4 right-12 w-1 h-1 bg-amber-100/80 rounded-full animate-pulse delay-300"></div>

      {/* Content */}
      <div className="relative z-10">
        <div className="flex items-center gap-2 mb-4">
          <Sparkles className="w-6 h-6 text-amber-300 animate-pulse" />
          <span className="text-amber-100 text-sm font-medium tracking-wide uppercase">
            AI-Powered
          </span>
        </div>

        <h2 className="font-bold text-3xl text-white mb-4 leading-tight bg-gradient-to-r from-white to-amber-100 bg-clip-text">
          Your Career Navigator
        </h2>

        <p className="text-gray-300 mt-2 text-lg leading-relaxed max-w-2xl mb-6">
          Transform your career journey with intelligent insights, personalized
          guidance, and data-driven recommendations tailored to your
          professional goals.
        </p>

        <Button
          variant="outline"
          className="mt-2 bg-gray-800 text-amber-200 hover:bg-amber-300 hover:text-gray-950 border-2 border-gray-700 hover:border-amber-300 transition-all duration-300 transform hover:scale-105 hover:shadow-lg group/btn px-6 py-3 font-semibold"
        >
          <span className="flex items-center gap-2">
            <Link href={'/tools'}>Let's Get Started</Link>
            <ArrowRight className="w-4 h-4 group-hover/btn:translate-x-1 transition-transform duration-200" />
          </span>
        </Button>
      </div>

      {/* Subtle animation overlay */}
      <div className="absolute inset-0 bg-gradient-to-r from-transparent via-amber-100/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"></div>
    </div>
  );
}

export default WelcomeBanner;
