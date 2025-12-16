// app/dashboard/_components/AiToolCard.tsx
'use client';
import { Button } from '@/components/ui/button';
import { MessageCircle, FileText, Map, Mail } from 'lucide-react'; // Corrected Map import for consistency
import React, { useState } from 'react';
import axios from 'axios';
import { useUser } from '@clerk/nextjs';
import { useRouter } from 'next/navigation';
import { v4 as uuidv4 } from 'uuid';
import ResumeUploadDialog from './ResumeUploadDialog';
import RoadMapGeneratorDialog from './RoadMapGeneratorDialog';
import CoverLetterDialog from './CoverLetterDialog';
import { AiTool } from './AiTools';

type AIToolProps = {
  tool: AiTool;
};

function AiToolCard({ tool }: AIToolProps) {
  const IconComponent = tool.icon;
  const { user } = useUser();
  const router = useRouter();
  const [openResumeDialog, setOpenResumeDialog] = useState(false);
  const [openRoadMapDialog, setOpenRoadMapDialog] = useState(false);
  const [openCoverLetterDialog, setOpenCoverLetterDialog] = useState(false);
  const [loading, setLoading] = useState(false);

  async function onClickButton(e: React.MouseEvent) {
    e.preventDefault();

    if (tool.name === 'AI Resume Analyzer') {
      setOpenResumeDialog(true);
      return;
    }

    if (tool.name === 'Career Roadmap Generator') {
      setOpenRoadMapDialog(true);
      return;
    }

    if (tool.name === 'Cover Letter Generator') {
      setOpenCoverLetterDialog(true);
      return;
    }

    if (tool.path === '/tools/chat') {
      const id = uuidv4();
      setLoading(true);
      router.push(`${tool.path}/${id}`);
      axios
        .post('/api/history', {
          recordId: id,
          content: [],
          aiAgentType: tool.path,
        })
        .catch((error) => console.error('Error creating chat history:', error))
        .finally(() => setLoading(false));
      return;
    }

    try {
      setLoading(true);
      const id = uuidv4();
      await axios.post('/api/history', {
        recordId: id,
        content: [],
        aiAgentType: tool.path,
      });
      router.push(tool.path + '/' + id);
    } catch (error) {
      console.error('Error:', error);
    } finally {
      setLoading(false);
    }
  }

  return (
    // Adjusted padding for smaller screens
    <div className="bg-gray-900 border-2 border-gray-800 rounded-2xl p-4 sm:p-6 shadow-lg hover:shadow-xl hover:border-amber-500 transition-all duration-300 h-full flex flex-col group">
      <div className="flex-1 flex flex-col">
        {/* Icon and Title Section */}
        <div className="flex items-start gap-3 sm:gap-4 mb-3 sm:mb-4">
          {' '}
          {/* Adjusted gap and margin-bottom */}
          <div className="bg-gradient-to-br from-amber-300 to-orange-400 p-2 sm:p-3 rounded-xl group-hover:from-gray-700 group-hover:to-gray-900 transition-all duration-300 flex-shrink-0">
            {' '}
            {/* Adjusted padding */}
            <IconComponent className="w-6 h-6 sm:w-8 sm:h-8 text-gray-950 group-hover:text-amber-300 transition-colors duration-300" />{' '}
            {/* Adjusted icon size */}
          </div>
          <div className="flex-1 min-w-0">
            {/* Heading adjustments */}
            <h3 className="text-lg sm:text-xl font-bold text-white group-hover:text-amber-200 transition-colors duration-300 leading-tight">
              {tool.name}
            </h3>
          </div>
        </div>

        {/* Description Section */}
        <div className="flex-1">
          {/* Paragraph adjustments */}
          <p className="text-gray-300 text-xs sm:text-sm leading-relaxed line-clamp-3">
            {tool.des}
          </p>
        </div>

        {/* Features Badge adjustments */}
        <div className="mt-3 sm:mt-4 flex flex-wrap gap-1">
          <span className="inline-block px-1.5 py-0.5 text-xs bg-amber-700 text-amber-100 rounded-full">
            AI-Powered
          </span>
          <span className="inline-block px-1.5 py-0.5 text-xs bg-gray-700 text-gray-100 rounded-full">
            Instant
          </span>
        </div>
      </div>

      {/* Button Section */}
      <div className="mt-4 sm:mt-6">
        {' '}
        {/* Adjusted margin-top */}
        <Button
          onClick={onClickButton}
          disabled={loading}
          className="w-full bg-gradient-to-r from-amber-500 to-orange-500 hover:from-amber-600 hover:to-orange-600 text-gray-950 font-semibold
                     py-2 px-4 text-sm rounded-xl sm:py-3 sm:px-6 sm:text-base transition-all duration-300 shadow-lg hover:shadow-xl transform hover:-translate-y-0.5 disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none" // Adjusted padding and text size for button itself
        >
          {loading ? (
            <div className="flex items-center gap-1.5 sm:gap-2">
              <div className="w-3 h-3 sm:w-4 sm:h-4 border-2 border-gray-950 border-t-transparent rounded-full animate-spin"></div>{' '}
              <span>Opening...</span>
            </div>
          ) : (
            <div className="flex items-center justify-center gap-1.5 sm:gap-2">
              {' '}
              {/* Adjusted gap */}
              <span>{tool.button}</span>
              <svg
                className="w-3 h-3 sm:w-4 sm:h-4" // Adjusted icon size
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M13 7l5 5m0 0l-5 5m5-5H6"
                />
              </svg>
            </div>
          )}
        </Button>
      </div>

      {/* Dialogs */}
      <ResumeUploadDialog
        openResumeDialog={openResumeDialog}
        setOpenResumeDialog={setOpenResumeDialog}
      />
      <RoadMapGeneratorDialog
        openRoadMapDialog={openRoadMapDialog}
        setOpenRoadMapDialog={setOpenRoadMapDialog}
      />
      <CoverLetterDialog
        openCoverLetterDialog={openCoverLetterDialog}
        setOpenCoverLetterDialog={setOpenCoverLetterDialog}
      />
    </div>
  );
}

export default AiToolCard;
