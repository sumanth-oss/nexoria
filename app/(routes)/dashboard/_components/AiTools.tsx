// app/dashboard/_components/AiTools.tsx
'use client';
import React from 'react';
import { MessageCircle, FileText, Map, Mail } from 'lucide-react';
import AiToolCard from './AiToolCard';

export interface AiTool {
  name: string;
  des: string;
  icon: React.ComponentType<any>;
  button: string;
  path: string;
}

export const aiToolsList: AiTool[] = [
  {
    name: 'AI Career Q&A Chat',
    des: 'Get instant answers to your career questions with our intelligent AI assistant',
    icon: MessageCircle,
    button: "Let's Chat",
    path: '/tools/chat',
  },
  {
    name: 'AI Resume Analyzer',
    des: 'Optimize your resume with AI-powered insights and recommendations',
    icon: FileText,
    button: 'Analyze Now',
    path: '/tools/resume-analyzer',
  },
  {
    name: 'Career Roadmap Generator',
    des: 'Create a personalized career path tailored to your goals and skills',
    icon: Map,
    button: 'Generate Now',
    path: '/tools/roadmap-generator',
  },
  {
    name: 'Cover Letter Generator',
    des: 'Craft compelling cover letters that make you stand out to employers',
    icon: Mail,
    button: 'Create Now',
    path: '/tools/cover-letter',
  },
];

function AiTools() {
  return (
    // Adjusted padding for smaller screens
    <div className="mt-6 sm:mt-8 p-4 sm:p-6 md:p-8 bg-gray-950 border border-gray-800 rounded-xl text-gray-100">
      <div className="mb-6 sm:mb-8">
        {' '}
        {/* Adjusted margin-bottom */}
        {/* Heading adjustments */}
        <h2 className="text-xl sm:text-2xl font-bold text-white mb-2 sm:mb-3">
          Our AI-Powered Tools
        </h2>
        {/* Paragraph adjustments */}
        <p className="text-sm sm:text-base lg:text-lg text-gray-300 leading-relaxed max-w-2xl">
          Accelerate your career growth with our comprehensive suite of AI tools
          designed to help you succeed in today's competitive job market.
        </p>
      </div>

      {/* Grid adjustments: 1 column on mobile, 2 on md, 3 on lg, 4 on xl */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 sm:gap-6">
        {aiToolsList.map((tool, index) => (
          <AiToolCard tool={tool} key={index} />
        ))}
      </div>
    </div>
  );
}

export default AiTools;
