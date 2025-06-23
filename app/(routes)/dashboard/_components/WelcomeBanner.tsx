import { Button } from '@/components/ui/button';
import { Sparkles, ArrowRight } from 'lucide-react';
import Link from 'next/link';
import React from 'react';

function WelcomeBanner() {
  return (
    <div className="p-8 bg-[#39194f] rounded-xl shadow-2xl border border-[#23003c]/20 relative overflow-hidden group">
      {/* Background decorative elements */}
      <div className="absolute -top-4 -right-4 w-24 h-24 bg-[#f3e8ff]/10 rounded-full blur-xl"></div>
      <div className="absolute -bottom-6 -left-6 w-32 h-32 bg-[#23003c]/30 rounded-full blur-2xl"></div>
      <div className="absolute top-1/2 right-8 w-2 h-2 bg-[#f3e8ff]/40 rounded-full animate-pulse"></div>
      <div className="absolute top-1/4 right-12 w-1 h-1 bg-[#f3e8ff]/60 rounded-full animate-pulse delay-300"></div>

      {/* Content */}
      <div className="relative z-10">
        <div className="flex items-center gap-2 mb-4">
          <Sparkles className="w-6 h-6 text-[#f3e8ff] animate-pulse" />
          <span className="text-[#f3e8ff]/80 text-sm font-medium tracking-wide uppercase">
            AI-Powered
          </span>
        </div>

        <h2 className="font-bold text-3xl text-[#f3e8ff] mb-4 leading-tight bg-gradient-to-r from-[#f3e8ff] to-[#f3e8ff]/80 bg-clip-text">
          Your Career Navigator
        </h2>

        <p className="text-[#f3e8ff]/90 mt-2 text-lg leading-relaxed max-w-2xl mb-6">
          Transform your career journey with intelligent insights, personalized
          guidance, and data-driven recommendations tailored to your
          professional goals.
        </p>

        <Button
          variant="outline"
          className="mt-2 bg-[#23003c] text-[#f3e8ff] hover:bg-[#f3e8ff] hover:text-[#23003c] border-2 border-[#23003c] hover:border-[#f3e8ff] transition-all duration-300 transform hover:scale-105 hover:shadow-lg group/btn px-6 py-3 font-semibold"
        >
          <span className="flex items-center gap-2">
            <Link href={'/tools'}>Let's Get Started</Link>
            <ArrowRight className="w-4 h-4 group-hover/btn:translate-x-1 transition-transform duration-200" />
          </span>
        </Button>
      </div>

      {/* Subtle animation overlay */}
      <div className="absolute inset-0 bg-gradient-to-r from-transparent via-[#f3e8ff]/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"></div>
    </div>
  );
}

export default WelcomeBanner;
