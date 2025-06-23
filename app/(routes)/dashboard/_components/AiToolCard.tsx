'use client';
import { Button } from '@/components/ui/button';
import { MessageCircle, FileText, Route, Mail } from 'lucide-react';
import React, { useState } from 'react';
import axios from 'axios';
import { useUser } from '@clerk/nextjs';
import { useRouter } from 'next/navigation';
import { v4 as uuidv4 } from 'uuid';
import ResumeUploadDialog from './ResumeUploadDialog';
import RoadMapGeneratorDialog from './RoadMapGeneratorDialog';
import CoverLetterDialog from './CoverLetterDialog';
import { AiTool } from './AiTools'; // Import the correct type

type AIToolProps = {
  tool: AiTool; // Use AiTool instead of TOOL
};

function AiToolCard({ tool }: AIToolProps) {
  const IconComponent = tool.icon; // Now it's already a React component
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
    <div className="bg-white border-2 border-[#e9d5ff] rounded-2xl p-6 shadow-lg hover:shadow-xl hover:border-[#39194f] transition-all duration-300 h-full flex flex-col group">
      <div className="flex-1 flex flex-col">
        {/* Icon and Title Section */}
        <div className="flex items-start gap-4 mb-4">
          <div className="bg-gradient-to-br from-[#e9d5ff] to-[#d8b4fe] p-3 rounded-xl group-hover:from-[#39194f] group-hover:to-[#23003c] transition-all duration-300 flex-shrink-0">
            <IconComponent className="w-8 h-8 text-[#39194f] group-hover:text-white transition-colors duration-300" />
          </div>
          <div className="flex-1 min-w-0">
            <h3 className="text-xl font-bold text-[#23003c] group-hover:text-[#39194f] transition-colors duration-300 leading-tight">
              {tool.name}
            </h3>
          </div>
        </div>

        {/* Description Section */}
        <div className="flex-1">
          <p className="text-gray-600 text-sm leading-relaxed line-clamp-3">
            {tool.des}
          </p>
        </div>

        {/* Features Badge */}
        <div className="mt-4 flex flex-wrap gap-1">
          <span className="inline-block px-2 py-1 bg-amber-100 text-amber-800 text-xs rounded-full">
            AI-Powered
          </span>
          <span className="inline-block px-2 py-1 bg-[#e9d5ff] text-[#39194f] text-xs rounded-full">
            Instant
          </span>
        </div>
      </div>

      {/* Button Section */}
      <div className="mt-6">
        <Button
          onClick={onClickButton}
          disabled={loading}
          className="w-full bg-gradient-to-r from-[#39194f] to-[#23003c] hover:from-[#23003c] hover:to-[#1a002e] text-white font-semibold py-3 px-6 rounded-xl transition-all duration-300 shadow-lg hover:shadow-xl transform hover:-translate-y-0.5 disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none"
        >
          {loading ? (
            <div className="flex items-center gap-2">
              <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
              <span>Processing...</span>
            </div>
          ) : (
            <div className="flex items-center justify-center gap-2">
              <span>{tool.button}</span>
              <svg
                className="w-4 h-4"
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
