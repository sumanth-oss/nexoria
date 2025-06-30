'use client';
import { SignInButton, UserButton, useUser } from '@clerk/nextjs';
import { ArrowRight, Brain, Sparkles, Bot } from 'lucide-react';
import { useState, useEffect } from 'react';

export default function Home() {
  const { isSignedIn } = useUser();
  const [animatedText, setAnimatedText] = useState('');
  const [currentIndex, setCurrentIndex] = useState(0);

  const aiMessages = [
    'Analyzing your career potential...',
    'Generating personalized roadmaps...',
    'Optimizing your resume...',
    'Crafting your success story...',
    'Discovering new opportunities...',
  ];

  // Effect for typing animation of current AI message
  useEffect(() => {
    const currentMessage = aiMessages[currentIndex];
    setAnimatedText(''); // Reset text for the new message
    let i = 0;

    const typeInterval = setInterval(() => {
      if (i <= currentMessage.length) {
        setAnimatedText(currentMessage.slice(0, i));
        i++;
      } else {
        clearInterval(typeInterval); // Stop typing when message is complete
      }
    }, 80); // Typing speed (milliseconds per character)

    return () => clearInterval(typeInterval);
  }, [currentIndex]);

  // Effect to advance to the next message after a delay
  useEffect(() => {
    const currentMessage = aiMessages[currentIndex];
    const messageDisplayDuration = 2500; // Time to display fully typed message
    const typingDuration = currentMessage.length * 80; // Total time for typing current message

    const advanceMessageTimeout = setTimeout(() => {
      setCurrentIndex((prev) => (prev + 1) % aiMessages.length);
    }, typingDuration + messageDisplayDuration);

    return () => clearTimeout(advanceMessageTimeout);
  }, [currentIndex]);

  // Handle CTA click logic
  const handleCTAClick = () => {
    if (isSignedIn) {
      window.location.href = '/dashboard';
    }
    // For non-signed in users, the SignInButton will handle the modal opening
  };

  return (
    <div className="min-h-screen bg-gray-950 text-gray-800">
      {/* Header */}
      <header className="relative z-20 bg-gradient-to-r from-gray-950 via-black to-[#23003c] shadow-lg">
        <nav
          className="max-w-7xl mx-auto px-6 lg:px-8 py-4 flex justify-between items-center"
          aria-label="Global"
        >
          <a href="/" className="flex items-center space-x-3">
            <div className="relative">
              <div className="w-10 h-10 bg-purple-600 rounded-full flex items-center justify-center animate-pulse">
                <Brain className="w-6 h-6 text-white" />
              </div>
              <div className="absolute top-0 left-0 w-10 h-10 bg-amber-400 rounded-full mix-blend-screen opacity-75 animate-ping-slow"></div>
            </div>
            <div className="flex flex-col">
              <span className="text-3xl font-extrabold text-white leading-none tracking-tight">
                Nexoria
              </span>
              <span className="text-xs text-gray-400 uppercase tracking-widest mt-1">
                AI Career Intelligence
              </span>
            </div>
          </a>
          <div className="flex items-center space-x-4">
            {!isSignedIn ? (
              <SignInButton mode="modal" fallbackRedirectUrl="/dashboard">
                <button className="group relative px-6 py-3 bg-gradient-to-r from-purple-600 to-violet-700 hover:from-purple-700 hover:to-violet-800 text-white font-semibold rounded-lg transition-all duration-300 transform hover:scale-105 shadow-lg">
                  <div className="flex items-center space-x-2">
                    <span>Sign In</span>
                    <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                  </div>
                </button>
              </SignInButton>
            ) : (
              <div className="flex items-center space-x-4">
                <a
                  href="/dashboard"
                  className="group relative px-6 py-3 bg-gradient-to-r from-amber-500 to-orange-500 hover:from-amber-600 hover:to-orange-600 text-white font-semibold rounded-lg transition-all duration-300 transform hover:scale-105 shadow-lg"
                >
                  Dashboard
                </a>
                <UserButton
                  afterSignOutUrl="/"
                  signInUrl="/sign-in"
                  userProfileUrl="/profile"
                />
              </div>
            )}
          </div>
        </nav>
      </header>

      {/* Hero Section */}
      <div className="relative overflow-hidden bg-gradient-to-br from-gray-950 via-black to-[#23003c] min-h-[calc(100vh-80px)] flex items-center justify-center">
        {/* Animated Background Elements */}
        <div className="absolute inset-0">
          <div className="absolute top-20 left-20 w-72 h-72 bg-purple-500/20 rounded-full blur-3xl animate-pulse"></div>
          <div className="absolute bottom-20 right-20 w-96 h-96 bg-amber-500/20 rounded-full blur-3xl animate-pulse delay-1000"></div>
          <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-gradient-to-r from-purple-500/10 to-amber-500/10 rounded-full blur-3xl animate-spin-slow"></div>
        </div>

        <div className="relative max-w-7xl mx-auto px-6 lg:px-8 py-20 text-center">
          {/* AI Status Badge */}
          <div className="flex justify-center mb-8">
            <div className="inline-flex items-center space-x-3 bg-white/10 backdrop-blur-md border border-white/20 rounded-full px-6 py-3 shadow-xl">
              <div className="flex items-center space-x-2">
                <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
                <Bot className="w-5 h-5 text-amber-400" />
                <span className="text-white font-medium">
                  AI Status: Active
                </span>
              </div>
              <div className="w-px h-4 bg-white/20"></div>
              <div className="flex items-center space-x-2">
                <Sparkles className="w-4 h-4 text-purple-400" />
                <span className="text-gray-300 text-sm">GPT-4 Powered</span>
              </div>
            </div>
          </div>

          {/* Main Hero Content */}
          <div className="max-w-5xl mx-auto">
            <h1 className="text-5xl md:text-7xl font-bold mb-8 leading-tight">
              <span className="bg-gradient-to-r from-white via-gray-100 to-white bg-clip-text text-transparent">
                Navigate Your Career with
              </span>
              <br />
              <span className="bg-gradient-to-r from-amber-400 via-orange-400 to-amber-300 bg-clip-text text-transparent">
                AI Intelligence
              </span>
            </h1>

            <p className="text-xl text-gray-300 mb-12 max-w-3xl mx-auto leading-relaxed">
              Unlock your potential with personalized career roadmaps,
              AI-powered resume analysis, and intelligent guidance tailored to
              your goals and skills.
            </p>

            {/* Interactive AI Demo */}
            <div className="bg-white/10 backdrop-blur-md border border-white/20 rounded-2xl p-8 mb-12 max-w-2xl mx-auto shadow-2xl">
              <div className="flex items-center space-x-3 mb-4">
                <div className="w-8 h-8 bg-gradient-to-r from-purple-500 to-purple-600 rounded-full flex items-center justify-center">
                  <Bot className="w-5 h-5 text-white" />
                </div>
                <div className="text-left">
                  <p className="text-white font-medium">Nexoria AI</p>
                  <p className="text-gray-400 text-sm">
                    Career Intelligence Assistant
                  </p>
                </div>
              </div>
              <div className="text-left bg-white/5 rounded-xl p-4 border border-white/10">
                <p className="text-amber-400 font-mono text-lg min-h-[28px]">
                  {animatedText}
                  <span className="animate-pulse">|</span>
                </p>
              </div>
            </div>

            {/* Enhanced CTA Buttons */}
            <div className="flex flex-col sm:flex-row gap-6 justify-center items-center">
              {!isSignedIn ? (
                <SignInButton mode="modal" fallbackRedirectUrl="/dashboard">
                  <button className="group relative px-8 py-4 bg-gradient-to-r from-amber-500 to-orange-500 hover:from-amber-600 hover:to-orange-600 text-white font-bold rounded-xl transition-all duration-300 transform hover:scale-105 shadow-xl hover:shadow-amber-500/25">
                    <div className="flex items-center space-x-3">
                      <span className="text-lg">Start Your AI Journey</span>
                      <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                    </div>
                    <div className="absolute inset-0 rounded-xl bg-gradient-to-r from-white/20 to-white/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                  </button>
                </SignInButton>
              ) : (
                <button
                  onClick={handleCTAClick}
                  className="group relative px-8 py-4 bg-gradient-to-r from-amber-500 to-orange-500 hover:from-amber-600 hover:to-orange-600 text-white font-bold rounded-xl transition-all duration-300 transform hover:scale-105 shadow-xl hover:shadow-amber-500/25"
                >
                  <div className="flex items-center space-x-3">
                    <span className="text-lg">Go to Dashboard</span>
                    <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                  </div>
                  <div className="absolute inset-0 rounded-xl bg-gradient-to-r from-white/20 to-white/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                </button>
              )}

              <a className="group inline-flex justify-center items-center gap-x-3 px-8 py-4 bg-white/10 hover:bg-white/20 backdrop-blur-md border border-white/20 hover:border-white/30 text-white font-semibold rounded-xl transition-all duration-300">
                <span>Explore AI Features</span>
                <Sparkles className="w-5 h-5 group-hover:rotate-12 transition-transform" />
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
