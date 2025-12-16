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
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const [isStrengthsOpen, setIsStrengthsOpen] = useState(true);
  const [isImprovementsOpen, setIsImprovementsOpen] = useState(false);
  const [isTipsOpen, setIsTipsOpen] = useState(false);

useEffect(() => {
  if (!recordId) return;

  let pollCount = 0;
  const maxPolls = 60;
  let intervalId: NodeJS.Timeout | null = null;

  const fetchData = async () => {
    try {
      pollCount++;
      const result = await axios.get(`/api/history?recordId=${recordId}&t=${Date.now()}`);
      
      if (result.data?.content && typeof result.data.content === 'object') {
        if (Object.keys(result.data.content).length === 0) {
          setIsLoading(true);
          return false;
        }
        
        if (result.data.content.overall_score !== undefined) {
          setPdfUrl(result.data.metaData);
          setReport(result.data.content);
          setIsLoading(false);
          setError(null);
          if (intervalId) clearInterval(intervalId);
          return true;
        }
      }
      
      if (pollCount >= maxPolls) {
        setIsLoading(false);
        setError('Analysis is taking longer than expected. Please refresh the page or try again.');
        if (intervalId) clearInterval(intervalId);
        return true;
      }
      
      return false;
    } catch (err) {
      console.error('Polling error:', err);
      if (pollCount >= maxPolls) {
        setIsLoading(false);
        setError('Failed to fetch analysis results. Please refresh the page.');
        if (intervalId) clearInterval(intervalId);
        return true;
      }
      return false;
    }
  };

  fetchData();

  intervalId = setInterval(async () => {
    const isDone = await fetchData();
    if (isDone && intervalId) {
      clearInterval(intervalId);
    }
  }, 3000);

  return () => {
    if (intervalId) clearInterval(intervalId);
  };
}, [recordId]);


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
    if (score >= 80) return 'text-green-400';
    if (score >= 60) return 'text-amber-400';
    return 'text-red-400';
  };

  const getScoreBgColor = (score: number) => {
    if (score >= 80) return 'bg-green-900';
    if (score >= 60) return 'bg-amber-900';
    return 'bg-red-900';
  };

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
              <span className="text-gray-300">{item}</span>
            </div>
          ))}
        </div>
      )}
    </div>
  );

  return (
    <div className="min-h-screen bg-gray-950 p-4">
      <div className="max-w-7xl mx-auto">
        <div className="grid lg:grid-cols-5 grid-cols-1 gap-6">
          <div className="col-span-2 space-y-4">
            <div className="bg-gray-900 rounded-lg shadow-sm border border-gray-800 p-6">
              <div className="flex items-center justify-between mb-6">
                <h2 className="font-semibold text-xl text-white flex items-center gap-2">
                  <FileText className="w-5 h-5 text-amber-400" />
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
              
              {isLoading && !report && (
                <div className="text-center py-12">
                  <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-amber-500 mx-auto mb-4"></div>
                  <p className="text-gray-400">Analyzing your resume...</p>
                  <p className="text-gray-500 text-sm mt-2">This may take a few moments</p>
                </div>
              )}
              
              {error && !report && (
                <div className="text-center py-12">
                  <AlertCircle className="w-12 h-12 text-red-400 mx-auto mb-4" />
                  <p className="text-red-400 mb-2">{error}</p>
                  <button
                    onClick={() => window.location.reload()}
                    className="px-4 py-2 bg-amber-500 text-gray-950 rounded-lg hover:bg-amber-600 transition-colors"
                  >
                    Refresh Page
                  </button>
                </div>
              )}
              {report && (
                <div className="space-y-6">
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
                      Overall Score
                    </p>

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
                                  {section.replace('_', ' ')}
                                </p>
                              </div>
                            )
                        )}
                      </div>
                    )}
                  </div>

                  <div className="bg-gray-800 rounded-lg p-4 border border-gray-700">
                    <h3 className="font-medium text-white mb-2">
                      Summary
                    </h3>
                    <p className="text-gray-300 text-sm leading-relaxed">
                      {report.summary_comment}
                    </p>
                  </div>

                  <div className="space-y-4">
                    <CollapsibleSection
                      title="Strengths"
                      icon={CheckCircle}
                      items={report.whats_good}
                      isOpen={isStrengthsOpen}
                      onToggle={() => setIsStrengthsOpen(!isStrengthsOpen)}
                      dotColor="#4ade80"
                    />

                    <CollapsibleSection
                      title="Areas to Improve"
                      icon={AlertCircle}
                      items={report.needs_improvement}
                      isOpen={isImprovementsOpen}
                      onToggle={() =>
                        setIsImprovementsOpen(!isImprovementsOpen)
                      }
                      dotColor="#fbbf24"
                    />

                    <CollapsibleSection
                      title="Improvement Tips"
                      icon={Lightbulb}
                      items={report.tips_for_improvement}
                      isOpen={isTipsOpen}
                      onToggle={() => setIsTipsOpen(!isTipsOpen)}
                      dotColor="#f97316"
                    />
                  </div>
                </div>
              )}
             
            </div>
          </div>

          <div className="col-span-3">
            <div className="bg-gray-900 rounded-lg shadow-sm border border-gray-800 p-6">
              <div className="flex items-center justify-between mb-4">
                <h2 className="font-semibold text-xl text-white">
                  Resume Preview
                </h2>
                {report && <DownloadReport report={report} />}
              </div>
              {pdfUrl ? (
                <div className="bg-gray-800 rounded-lg overflow-hidden">
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
                  <div className="text-center">
                    <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-amber-500 mx-auto mb-4"></div>
                    <p className="text-gray-400">Loading resume...</p>
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
