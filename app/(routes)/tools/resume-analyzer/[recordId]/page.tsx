'use client';

import axios from 'axios';
import { useParams } from 'next/navigation';
import React, { useEffect, useState } from 'react';
import {
  CheckCircle,
  AlertCircle,

  FileText,
 
  Lightbulb,
  SparklesIcon,
  ChevronDown,
  ChevronUp,
} from 'lucide-react';
import ResumeUploadDialog from '@/app/(routes)/dashboard/_components/ResumeUploadDialog';
import DownloadReport from '@/app/(routes)/dashboard/_components/DownloadReport';

function ResumeAnalyzer() {
  const { recordId } = useParams();
  const [pdfUrl, setPdfUrl] = useState<string>();
  const [report, setReport] = useState<any>();
  const [openResumeDialog, setOpenResumeDialog] = useState(false);

  // State for dropdown sections
  const [isStrengthsOpen, setIsStrengthsOpen] = useState(true);
  const [isImprovementsOpen, setIsImprovementsOpen] = useState(false);
  const [isTipsOpen, setIsTipsOpen] = useState(false);

// Inside your ResumeAnalyzer function
useEffect(() => {
  if (!recordId) return;

  const fetchData = async () => {
    try {
      // Use a timestamp to bust cache
      const result = await axios.get(`/api/history?recordId=${recordId}&t=${Date.now()}`);
      
      // Look specifically for the content structure the AI provides
      if (result.data?.content && result.data.content.overall_score) {
        setPdfUrl(result.data.metaData);
        setReport(result.data.content);
        return true; // Success
      }
    } catch (err) {
      console.error('Polling error:', err);
    }
    return false; // Keep polling
  };

  // Initial fetch
  fetchData();

  // Poll every 3 seconds until report is found
  const interval = setInterval(async () => {
    const isDone = await fetchData();
    if (isDone) clearInterval(interval);
  }, 3000);

  return () => clearInterval(interval);
}, [recordId]); // Remove 'report' from dependencies to keep polling active until found


  const GetResumeAnalyzer = async () => {
    try {
      const result = await axios.get('/api/history?recordId=' + recordId);
      if (result.data) {
        setPdfUrl(result.data.metaData);
        setReport(result.data.content);
      }
    } catch (error) {
      console.error('Error fetching resume analysis:', error);
    }
  };

  const getScoreColor = (score: number) => {
    if (score >= 80) return 'text-green-400'; // Adjusted for dark background
    if (score >= 60) return 'text-amber-400'; // Adjusted for dark background
    return 'text-red-400'; // Adjusted for dark background
  };

  const getScoreBgColor = (score: number) => {
    if (score >= 80) return 'bg-green-900'; // Darker background for good score
    if (score >= 60) return 'bg-amber-900'; // Darker background for medium score
    return 'bg-red-900'; // Darker background for low score
  };

  // Component for collapsible sections
  const CollapsibleSection = ({
    title,
    icon: Icon,
    items,
    isOpen,
    onToggle,
    dotColor,
  }: {
    title: string;
    icon: any;
    items: string[];
    isOpen: boolean;
    onToggle: () => void;
    dotColor: string;
  }) => (
    <div className="bg-gray-900 rounded-lg border border-gray-800">
      <button
        onClick={onToggle}
        className="w-full flex items-center justify-between p-4 text-left hover:bg-gray-800 transition-colors rounded-lg"
      >
        <h3 className="font-medium text-white flex items-center gap-2">
          <Icon className="w-4 h-4" style={{ color: dotColor }} />
          {title}
        </h3>
        {isOpen ? (
          <ChevronUp className="w-4 h-4 text-gray-400" />
        ) : (
          <ChevronDown className="w-4 h-4 text-gray-400" />
        )}
      </button>
      {isOpen && (
        <div className="px-4 pb-4 space-y-2">
          {items?.map((item: string, index: number) => (
            <div key={index} className="flex items-start gap-2 text-sm">
              <div
                className="w-1.5 h-1.5 rounded-full mt-2 flex-shrink-0"
                style={{ backgroundColor: dotColor }}
              />
              <span className="text-gray-300">{item}</span> {/* Lighter text */}
            </div>
          ))}
        </div>
      )}
    </div>
  );

  return (
    <div className="min-h-screen bg-gray-950 p-4">
      {' '}
      {/* Dark main background */}
      <div className="max-w-7xl mx-auto">
        <div className="grid lg:grid-cols-5 grid-cols-1 gap-6">
          {/* Report Section */}
          <div className="col-span-2 space-y-4">
            <div className="bg-gray-900 rounded-lg shadow-sm border border-gray-800 p-6">
              {' '}
              {/* Dark background, gray border */}
              <div className="flex items-center justify-between mb-6">
                <h2 className="font-semibold text-xl text-white flex items-center gap-2">
                  {' '}
                  {/* White text */}
                  <FileText className="w-5 h-5 text-amber-400" />{' '}
                  {/* Amber icon */}
                  Resume Analysis Report
                </h2>
                <button
                  onClick={() => setOpenResumeDialog(true)}
                  className="flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-amber-500 to-orange-500 text-gray-950 text-sm font-medium rounded-lg hover:from-amber-600 hover:to-orange-600 transition-all duration-200 shadow-sm hover:shadow-md whitespace-nowrap"
                >
                  <SparklesIcon className="w-4 h-4" />
                  Re Analyze
                </button>
              </div>
              {report && (
                <div className="space-y-6">
                  {/* Overall Score */}
                  <div className="text-center">
                    <div
                      className={`inline-flex items-center justify-center w-20 h-20 rounded-full ${getScoreBgColor(
                        report.overall_score
                      )} mb-3`}
                    >
                      <span
                        className={`text-2xl font-bold ${getScoreColor(
                          report.overall_score
                        )}`}
                      >
                        {report.overall_score}
                      </span>
                    </div>
                    <p className="text-gray-400 text-sm mb-4">
                      {' '}
                      {/* Lighter gray text */}
                      Overall Score
                    </p>

                    {/* Section Scores in smaller circles */}
                    {report.sections && (
                      <div className="flex justify-center gap-3 flex-wrap">
                        {Object.entries(report.sections).map(
                          ([section, data]: [string, any]) =>
                            data.score && (
                              <div key={section} className="text-center">
                                <div
                                  className={`inline-flex items-center justify-center w-12 h-12 rounded-full ${getScoreBgColor(
                                    data.score
                                  )} mb-1`}
                                >
                                  <span
                                    className={`text-sm font-bold ${getScoreColor(
                                      data.score
                                    )}`}
                                  >
                                    {data.score}
                                  </span>
                                </div>
                                <p className="text-xs text-gray-400 capitalize">
                                  {' '}
                                  {/* Lighter gray text */}
                                  {section.replace('_', ' ')}
                                </p>
                              </div>
                            )
                        )}
                      </div>
                    )}
                  </div>

                  {/* Summary */}
                  <div className="bg-gray-800 rounded-lg p-4 border border-gray-700">
                    {' '}
                    {/* Dark background, gray border */}
                    <h3 className="font-medium text-white mb-2">
                      Summary
                    </h3>{' '}
                    {/* White text */}
                    <p className="text-gray-300 text-sm leading-relaxed">
                      {' '}
                      {/* Lighter text */}
                      {report.summary_comment}
                    </p>
                  </div>

                  {/* Collapsible Sections */}
                  <div className="space-y-4">
                    {/* Strengths */}
                    <CollapsibleSection
                      title="Strengths"
                      icon={CheckCircle}
                      items={report.whats_good}
                      isOpen={isStrengthsOpen}
                      onToggle={() => setIsStrengthsOpen(!isStrengthsOpen)}
                      dotColor="#4ade80" // Green for strengths, adjusted for dark background
                    />

                    {/* Areas to Improve */}
                    <CollapsibleSection
                      title="Areas to Improve"
                      icon={AlertCircle}
                      items={report.needs_improvement}
                      isOpen={isImprovementsOpen}
                      onToggle={() =>
                        setIsImprovementsOpen(!isImprovementsOpen)
                      }
                      dotColor="#fbbf24" // Amber for improvements, adjusted for dark background
                    />

                    {/* Improvement Tips */}
                    <CollapsibleSection
                      title="Improvement Tips"
                      icon={Lightbulb}
                      items={report.tips_for_improvement}
                      isOpen={isTipsOpen}
                      onToggle={() => setIsTipsOpen(!isTipsOpen)}
                      dotColor="#f97316" // Orange for tips, adjusted for dark background
                    />
                  </div>
                </div>
              )}
              {!report && (
                <div className="text-center py-8">
                  <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-amber-500 mx-auto mb-4"></div>{' '}
                  {/* Amber spinner */}
                  <p className="text-gray-400">Loading analysis...</p>{' '}
                  {/* Lighter gray text */}
                </div>
              )}
            </div>
          </div>

          {/* PDF Preview Section */}
          <div className="col-span-3">
            <div className="bg-gray-900 rounded-lg shadow-sm border border-gray-800 p-6">
              {' '}
              {/* Dark background, gray border */}
              <div className="flex items-center justify-between mb-4">
                <h2 className="font-semibold text-xl text-white">
                  {' '}
                  {/* White text */}
                  Resume Preview
                </h2>
                {report && <DownloadReport report={report} />}
              </div>
              {pdfUrl ? (
                <div className="bg-gray-800 rounded-lg overflow-hidden">
                  {' '}
                  {/* Darker background for iframe container */}
                  <iframe
                    src={pdfUrl + '#toolbar=0&navpanes=0&scrollbar=0'}
                    width="100%"
                    height={800}
                    className="w-full"
                    style={{ border: 'none' }}
                  />
                </div>
              ) : (
                <div className="bg-gray-800 rounded-lg h-[800px] flex items-center justify-center">
                  {' '}
                  {/* Darker background for loader */}
                  <div className="text-center">
                    <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-amber-500 mx-auto mb-4"></div>{' '}
                    {/* Amber spinner */}
                    <p className="text-gray-400">Loading resume...</p>{' '}
                    {/* Lighter gray text */}
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
      <ResumeUploadDialog
        openResumeDialog={openResumeDialog}
        setOpenResumeDialog={() => setOpenResumeDialog(false)}
      />
    </div>
  );
}

export default ResumeAnalyzer;
