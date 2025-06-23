// AiTools.tsx
'use client';
import React from 'react';
import { MessageCircle, FileText, Map, Mail } from 'lucide-react';
import AiToolCard from './AiToolCard';

export interface AiTool {
  name: string;
  des: string;
  icon: React.ComponentType<any>; // Changed to React component
  button: string;
  path: string;
}

export const aiToolsList: AiTool[] = [
  {
    name: 'AI Career Q&A Chat',
    des: 'Get instant answers to your career questions with our intelligent AI assistant',
    icon: MessageCircle, // Chat icon
    button: "Let's Chat",
    path: '/tools/chat',
  },
  {
    name: 'AI Resume Analyzer',
    des: 'Optimize your resume with AI-powered insights and recommendations',
    icon: FileText, // Document icon
    button: 'Analyze Now',
    path: '/tools/resume-analyzer',
  },
  {
    name: 'Career Roadmap Generator',
    des: 'Create a personalized career path tailored to your goals and skills',
    icon: Map, // Roadmap icon
    button: 'Generate Now',
    path: '/tools/roadmap-generator',
  },
  {
    name: 'Cover Letter Generator',
    des: 'Craft compelling cover letters that make you stand out to employers',
    icon: Mail, // Cover letter icon
    button: 'Create Now',
    path: '/tools/cover-letter',
  },
];

function AiTools() {
  return (
    <div className="mt-8 p-8 bg-white border border-gray-100 rounded-xl">
      <div className="mb-8">
        <h2 className="text-2xl font-bold text-gray-900 mb-3">
          Our AI-Powered Tools
        </h2>
        <p className="text-gray-600 text-lg leading-relaxed max-w-2xl">
          Accelerate your career growth with our comprehensive suite of AI tools
          designed to help you succeed in today's competitive job market.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {aiToolsList.map((tool, index) => (
          <AiToolCard tool={tool} key={index} />
        ))}
      </div>
    </div>
  );
}

export default AiTools;
