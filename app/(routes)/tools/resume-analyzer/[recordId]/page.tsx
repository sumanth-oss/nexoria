'use client';

import axios from 'axios';
import { useParams } from 'next/navigation';
import React, { useEffect, useState } from 'react';
import {
  CheckCircle,
  AlertCircle,
  TrendingUp,
  FileText,
  Star,
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

  useEffect(() => {
    if (recordId) {
      GetResumeAnalyzer();
    }
  }, [recordId]);

  const GetResumeAnalyzer = async () => {
    try {
      const result = await axios.get('/api/history?recordId=' + recordId);
      if (result.data) {
        setPdfUrl(result.data.metaData);
        setReport(result.data.content);
        console.log('Report Data in JSON', result.data.content);
      }
    } catch (error) {
      console.error('Error fetching resume analysis:', error);
    }
  };

  const getScoreColor = (score: number) => {
    if (score >= 80) return 'text-[#84cc16]';
    if (score >= 60) return 'text-[#f59e0b]';
    return 'text-[#ef4444]';
  };

  const getScoreBgColor = (score: number) => {
    if (score >= 80) return 'bg-[#f7fee7]';
    if (score >= 60) return 'bg-[#fef3c7]';
    return 'bg-[#fee2e2]';
  };

  // Component for collapsible sections
  const CollapsibleSection = ({
    title,
    icon: Icon,
    items,
    isOpen,
    onToggle,
    dotColor,
    bgColor = 'bg-[#f8f4ff]',
  }: {
    title: string;
    icon: any;
    items: string[];
    isOpen: boolean;
    onToggle: () => void;
    dotColor: string;
    bgColor?: string;
  }) => (
    <div className={`${bgColor} rounded-lg border border-[#39194f]/10`}>
      <button
        onClick={onToggle}
        className="w-full flex items-center justify-between p-4 text-left hover:bg-black/5 transition-colors rounded-lg"
      >
        <h3 className="font-medium text-[#23003c] flex items-center gap-2">
          <Icon className="w-4 h-4" style={{ color: dotColor }} />
          {title}
        </h3>
        {isOpen ? (
          <ChevronUp className="w-4 h-4 text-[#23003c]/60" />
        ) : (
          <ChevronDown className="w-4 h-4 text-[#23003c]/60" />
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
              <span className="text-[#23003c]/80">{item}</span>
            </div>
          ))}
        </div>
      )}
    </div>
  );

  return (
    <div className="min-h-screen bg-[#f3e8ff] p-4">
      <div className="max-w-7xl mx-auto">
        <div className="grid lg:grid-cols-5 grid-cols-1 gap-6">
          {/* Report Section */}
          <div className="col-span-2 space-y-4">
            <div className="bg-white rounded-lg shadow-sm border border-[#39194f]/10 p-6">
              <div className="flex items-center justify-between mb-6">
                <h2 className="font-semibold text-xl text-[#23003c] flex items-center gap-2">
                  <FileText className="w-5 h-5" />
                  Resume Analysis Report
                </h2>
                <button
                  onClick={() => setOpenResumeDialog(true)}
                  className="flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-[#39194f] to-[#5b2a7a] text-white text-sm font-medium rounded-lg hover:from-[#2d1340] hover:to-[#4a2366] transition-all duration-200 shadow-sm hover:shadow-md whitespace-nowrap"
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
                    <p className="text-sm text-[#23003c]/70 mb-4">
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
                                <p className="text-xs text-[#23003c]/60 capitalize">
                                  {section.replace('_', ' ')}
                                </p>
                              </div>
                            )
                        )}
                      </div>
                    )}
                  </div>

                  {/* Summary */}
                  <div className="bg-[#f8f4ff] rounded-lg p-4 border border-[#39194f]/10">
                    <h3 className="font-medium text-[#23003c] mb-2">Summary</h3>
                    <p className="text-sm text-[#23003c]/80 leading-relaxed">
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
                      dotColor="#16a34a"
                      bgColor="bg-[#f8f4ff]"
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
                      dotColor="#d97706"
                      bgColor="bg-[#fdf2f8]"
                    />

                    {/* Improvement Tips */}
                    <CollapsibleSection
                      title="Improvement Tips"
                      icon={Lightbulb}
                      items={report.tips_for_improvement}
                      isOpen={isTipsOpen}
                      onToggle={() => setIsTipsOpen(!isTipsOpen)}
                      dotColor="#39194f"
                      bgColor="bg-[#f0f9ff]"
                    />
                  </div>
                </div>
              )}

              {!report && (
                <div className="text-center py-8">
                  <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-[#39194f] mx-auto mb-4"></div>
                  <p className="text-[#23003c]/60">Loading analysis...</p>
                </div>
              )}
            </div>
          </div>

          {/* PDF Preview Section */}
          <div className="col-span-3">
            <div className="bg-white rounded-lg shadow-sm border border-[#39194f]/10 p-6">
              <div className="flex items-center justify-between mb-4">
                <h2 className="font-semibold text-xl text-[#23003c]">
                  Resume Preview
                </h2>
                {report && <DownloadReport report={report} />}
              </div>
              {pdfUrl ? (
                <div className="bg-gray-50 rounded-lg overflow-hidden">
                  <iframe
                    src={pdfUrl + '#toolbar=0&navpanes=0&scrollbar=0'}
                    width="100%"
                    height={800}
                    className="w-full"
                    style={{ border: 'none' }}
                  />
                </div>
              ) : (
                <div className="bg-gray-50 rounded-lg h-[800px] flex items-center justify-center">
                  <div className="text-center">
                    <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-[#39194f] mx-auto mb-4"></div>
                    <p className="text-[#23003c]/60">Loading resume...</p>
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
