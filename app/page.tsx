'use client';
import { SignInButton, UserButton, useUser } from '@clerk/nextjs';
import {
  ArrowRight,
  Brain,
  Target,
  Users,
  Zap,
  MessageCircle,
  FileText,
  Route,
  Mail,
} from 'lucide-react';

export default function Home() {
  const { user } = useUser();

  return (
    <div>
      {/* Header */}
      <header className="flex flex-wrap sm:justify-start sm:flex-nowrap z-50 w-full bg-amber-50 backdrop-blur-sm border-b border-gray-100 text-sm py-3 sm:py-0 shadow-sm">
        <nav
          className="relative p-4 max-w-[85rem] w-full mx-auto px-4 sm:flex sm:items-center sm:justify-between sm:px-6 lg:px-8"
          aria-label="Global"
        >
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold bg-gradient-to-r from-[#39194f] to-[#23003c] bg-clip-text text-transparent">
                Nexoria
              </h1>
            </div>
          </div>
          <div className="hs-collapse hidden overflow-hidden transition-all duration-300 basis-full grow sm:block">
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-end sm:ps-7 cursor-pointer">
              {!user ? (
                <SignInButton
                  mode="modal"
                  signUpForceRedirectUrl={'/dashboard'}
                >
                  <div className="flex items-center gap-x-2 font-medium text-gray-600 hover:text-[#39194f] sm:border-s sm:border-gray-200 py-2 sm:py-0 sm:ms-4 sm:my-6 sm:ps-6 transition-colors">
                    <svg
                      className="flex-shrink-0 size-4"
                      xmlns="http://www.w3.org/2000/svg"
                      width="16"
                      height="16"
                      fill="currentColor"
                      viewBox="0 0 16 16"
                    >
                      <path d="M8 8a3 3 0 1 0 0-6 3 3 0 0 0 0 6zm2-3a2 2 0 1 1-4 0 2 2 0 0 1 4 0zm4 8c0 1-1 1-1 1H3s-1 0-1-1 1-4 6-4 6 3 6 4zm-1-.004c-.001-.246-.154-.986-.832-1.664C11.516 10.68 10.289 10 8 10c-2.29 0-3.516.68-4.168 1.332-.678.678-.83 1.418-.832 1.664h10z" />
                    </svg>
                    Get Started
                  </div>
                </SignInButton>
              ) : (
                <UserButton />
              )}
            </div>
          </div>
        </nav>
      </header>

      {/* Hero Section */}
      <div className="relative overflow-hidden bg-gradient-to-br from-[#e9d5ff] via-white to-amber-50">
        <div className="max-w-[85rem] mx-auto px-4 sm:px-6 lg:px-8 pt-24 pb-10">
          {/* Badge */}
          <div className="flex justify-center">
            <div className="inline-flex items-center gap-x-2 bg-white border border-[#e9d5ff] text-sm text-[#39194f] p-1 ps-3 rounded-full transition hover:border-[#39194f]">
              <Brain className="w-4 h-4" />
              AI-Powered Career Guidance - Launch Your Future
              <span className="py-1.5 px-2.5 inline-flex justify-center items-center gap-x-2 rounded-full bg-[#e9d5ff] font-semibold text-sm text-[#39194f]">
                <ArrowRight className="w-4 h-4" />
              </span>
            </div>
          </div>

          {/* Main Title */}
          <div className="mt-8 max-w-4xl text-center mx-auto">
            <h1 className="block font-bold text-gray-800 text-4xl md:text-5xl lg:text-6xl">
              Navigate Your Career Path with
              <span className="bg-gradient-to-r from-[#39194f] to-[#23003c] bg-clip-text text-transparent">
                {' '}
                AI Intelligence
              </span>
            </h1>
          </div>

          {/* Subtitle */}
          <div className="mt-6 max-w-3xl text-center mx-auto">
            <p className="text-lg text-gray-600">
              Unlock your potential with personalized career roadmaps,
              AI-powered resume analysis, and intelligent guidance tailored to
              your goals and skills.
            </p>
          </div>

          {/* CTA Buttons */}
          <div className="mt-10 gap-4 flex flex-col sm:flex-row justify-center">
            <a
              className="inline-flex justify-center items-center gap-x-3 text-center bg-gradient-to-r from-[#39194f] to-[#23003c] hover:from-[#23003c] hover:to-[#1a002e] border border-transparent text-white text-sm font-semibold rounded-xl py-4 px-8 transition-all transform hover:-translate-y-1 shadow-lg hover:shadow-xl"
              href="/dashboard"
            >
              Start Your Journey
              <ArrowRight className="w-4 h-4" />
            </a>
            <a
              className="inline-flex justify-center items-center gap-x-3 text-center bg-white border border-[#e9d5ff] text-[#39194f] text-sm font-semibold rounded-xl py-4 px-8 hover:bg-[#e9d5ff] transition-all"
              href="#features"
            >
              Explore Features
            </a>
          </div>
        </div>
      </div>

      {/* Features Section */}
      <div
        id="features"
        className="max-w-[85rem] px-4 py-16 sm:px-6 lg:px-8 lg:py-20 mx-auto"
      >
        <div className="text-center mb-16">
          <h2 className="text-3xl lg:text-4xl font-bold text-gray-800">
            Powerful AI Tools for Your Career Success
          </h2>
          <p className="mt-4 text-lg text-gray-600">
            Everything you need to accelerate your career growth in one
            intelligent platform
          </p>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 items-stretch gap-6">
          {/* Career Chat */}
          <div className="group flex flex-col justify-between hover:bg-gradient-to-br hover:from-[#e9d5ff] hover:to-white rounded-2xl p-6 md:p-8 transition-all duration-300 border border-gray-100 hover:border-[#e9d5ff] hover:shadow-lg">
            <div>
              <div className="flex justify-center items-center size-16 bg-gradient-to-br from-[#e9d5ff] to-[#d8b4fe] group-hover:from-[#39194f] group-hover:to-[#23003c] rounded-2xl transition-all duration-300">
                <MessageCircle className="size-8 text-[#39194f] group-hover:text-white transition-colors duration-300" />
              </div>
              <div className="mt-6">
                <h3 className="group-hover:text-[#39194f] text-xl font-semibold text-gray-800 transition-colors">
                  AI Career Chat
                </h3>
                <p className="mt-2 text-gray-600">
                  Get instant answers to your career questions with our
                  intelligent AI assistant
                </p>
              </div>
            </div>
            <div className="mt-6">
              <span className="inline-flex items-center gap-x-1.5 text-sm text-[#39194f] decoration-2 group-hover:underline font-medium">
                Try Now
                <ArrowRight className="w-4 h-4" />
              </span>
            </div>
          </div>

          {/* Resume Analyzer */}
          <div className="group flex flex-col justify-between hover:bg-gradient-to-br hover:from-[#e9d5ff] hover:to-white rounded-2xl p-6 md:p-8 transition-all duration-300 border border-gray-100 hover:border-[#e9d5ff] hover:shadow-lg">
            <div>
              <div className="flex justify-center items-center size-16 bg-gradient-to-br from-[#e9d5ff] to-[#d8b4fe] group-hover:from-[#39194f] group-hover:to-[#23003c] rounded-2xl transition-all duration-300">
                <FileText className="size-8 text-[#39194f] group-hover:text-white transition-colors duration-300" />
              </div>
              <div className="mt-6">
                <h3 className="group-hover:text-[#39194f] text-xl font-semibold text-gray-800 transition-colors">
                  Resume Analyzer
                </h3>
                <p className="mt-2 text-gray-600">
                  Optimize your resume with AI-powered insights and
                  recommendations
                </p>
              </div>
            </div>
            <div className="mt-6">
              <span className="inline-flex items-center gap-x-1.5 text-sm text-[#39194f] decoration-2 group-hover:underline font-medium">
                Analyze Resume
                <ArrowRight className="w-4 h-4" />
              </span>
            </div>
          </div>

          {/* Career Roadmap */}
          <div className="group flex flex-col justify-between hover:bg-gradient-to-br hover:from-[#e9d5ff] hover:to-white rounded-2xl p-6 md:p-8 transition-all duration-300 border border-gray-100 hover:border-[#e9d5ff] hover:shadow-lg">
            <div>
              <div className="flex justify-center items-center size-16 bg-gradient-to-br from-[#e9d5ff] to-[#d8b4fe] group-hover:from-[#39194f] group-hover:to-[#23003c] rounded-2xl transition-all duration-300">
                <Route className="size-8 text-[#39194f] group-hover:text-white transition-colors duration-300" />
              </div>
              <div className="mt-6">
                <h3 className="group-hover:text-[#39194f] text-xl font-semibold text-gray-800 transition-colors">
                  Career Roadmap
                </h3>
                <p className="mt-2 text-gray-600">
                  Create personalized career paths tailored to your goals and
                  skills
                </p>
              </div>
            </div>
            <div className="mt-6">
              <span className="inline-flex items-center gap-x-1.5 text-sm text-[#39194f] decoration-2 group-hover:underline font-medium">
                Build Roadmap
                <ArrowRight className="w-4 h-4" />
              </span>
            </div>
          </div>

          {/* Cover Letter Generator */}
          <div className="group flex flex-col justify-between hover:bg-gradient-to-br hover:from-[#e9d5ff] hover:to-white rounded-2xl p-6 md:p-8 transition-all duration-300 border border-gray-100 hover:border-[#e9d5ff] hover:shadow-lg">
            <div>
              <div className="flex justify-center items-center size-16 bg-gradient-to-br from-[#e9d5ff] to-[#d8b4fe] group-hover:from-[#39194f] group-hover:to-[#23003c] rounded-2xl transition-all duration-300">
                <Mail className="size-8 text-[#39194f] group-hover:text-white transition-colors duration-300" />
              </div>
              <div className="mt-6">
                <h3 className="group-hover:text-[#39194f] text-xl font-semibold text-gray-800 transition-colors">
                  Cover Letter Generator
                </h3>
                <p className="mt-2 text-gray-600">
                  Craft compelling cover letters that make you stand out to
                  employers
                </p>
              </div>
            </div>
            <div className="mt-6">
              <span className="inline-flex items-center gap-x-1.5 text-sm text-[#39194f] decoration-2 group-hover:underline font-medium">
                Generate Letter
                <ArrowRight className="w-4 h-4" />
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Why Choose Section */}
      <div className="bg-gradient-to-br from-[#e9d5ff] to-white py-16">
        <div className="max-w-[85rem] px-4 sm:px-6 lg:px-8 mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl lg:text-4xl font-bold text-gray-800">
              Why Choose Nexoria AI?
            </h2>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="flex justify-center items-center size-16 bg-gradient-to-br from-[#39194f] to-[#23003c] rounded-2xl mx-auto mb-4">
                <Brain className="size-8 text-white" />
              </div>
              <h3 className="text-xl font-semibold text-gray-800 mb-2">
                AI-Powered Intelligence
              </h3>
              <p className="text-gray-600">
                Advanced AI algorithms provide personalized insights and
                recommendations
              </p>
            </div>

            <div className="text-center">
              <div className="flex justify-center items-center size-16 bg-gradient-to-br from-[#39194f] to-[#23003c] rounded-2xl mx-auto mb-4">
                <Target className="size-8 text-white" />
              </div>
              <h3 className="text-xl font-semibold text-gray-800 mb-2">
                Goal-Oriented Approach
              </h3>
              <p className="text-gray-600">
                Every recommendation is tailored to help you achieve your
                specific career goals
              </p>
            </div>

            <div className="text-center">
              <div className="flex justify-center items-center size-16 bg-gradient-to-br from-[#39194f] to-[#23003c] rounded-2xl mx-auto mb-4">
                <Zap className="size-8 text-white" />
              </div>
              <h3 className="text-xl font-semibold text-gray-800 mb-2">
                Instant Results
              </h3>
              <p className="text-gray-600">
                Get immediate insights and actionable recommendations in seconds
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* CTA Section */}
      <div className="py-16">
        <div className="max-w-[85rem] px-4 sm:px-6 lg:px-8 mx-auto text-center">
          <h2 className="text-3xl lg:text-4xl font-bold text-gray-800 mb-4">
            Ready to Accelerate Your Career?
          </h2>
          <p className="text-lg text-gray-600 mb-8 max-w-2xl mx-auto">
            Join thousands of professionals who have transformed their careers
            with Nexoria AI
          </p>
          <a
            className="inline-flex justify-center items-center gap-x-3 text-center bg-gradient-to-r from-[#39194f] to-[#23003c] hover:from-[#23003c] hover:to-[#1a002e] text-white text-lg font-semibold rounded-xl py-4 px-10 transition-all transform hover:-translate-y-1 shadow-lg hover:shadow-xl"
            href="/dashboard"
          >
            Start Your Free Journey
            <ArrowRight className="w-5 h-5" />
          </a>
        </div>
      </div>
    </div>
  );
}
