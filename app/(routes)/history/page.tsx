// app/history/page.tsx
'use client';
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import {
  Loader2,
  ArrowLeft,
  ChevronLeft,
  ChevronRight,
  History as HistoryIcon,
} from 'lucide-react'; // Added Chevron icons
import Link from 'next/link';
import { aiToolsList, type AiTool } from '../dashboard/_components/AiTools'; // Adjust path as needed for AiTools interface

// Define proper types
interface HistoryItem {
  id: number;
  recordId: string;
  content: any;
  userEmail: string;
  createdAt: string;
  aiAgentType: string;
}

const ITEMS_PER_PAGE = 10; // Define how many items per page

function HistoryPage() {
  const [fullHistory, setFullHistory] = useState<HistoryItem[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [currentPage, setCurrentPage] = useState<number>(1);

  useEffect(() => {
    getAllHistory();
  }, []);

  const getAllHistory = async (): Promise<void> => {
    try {
      setLoading(true);
      const result = await axios.get('/api/history');
      // Sort history by creation date (newest first)
      const sortedHistory = result.data
        ? result.data.sort(
            (a: HistoryItem, b: HistoryItem) =>
              new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
          )
        : [];
      setFullHistory(sortedHistory);
    } catch (error) {
      console.error('Error fetching full history:', error);
      setFullHistory([]);
    } finally {
      setLoading(false);
    }
  };

  const getAgentName = (path: string): AiTool | undefined => {
    const agent = aiToolsList.find((item: AiTool) => item.path === path);
    return agent;
  };

  // Calculate total pages
  const totalPages = Math.ceil(fullHistory.length / ITEMS_PER_PAGE);

  // Get current items for the page
  const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
  const endIndex = startIndex + ITEMS_PER_PAGE;
  const currentItems = fullHistory.slice(startIndex, endIndex);

  // Pagination handlers
  const goToPreviousPage = () => {
    setCurrentPage((prev) => Math.max(prev - 1, 1));
  };

  const goToNextPage = () => {
    setCurrentPage((prev) => Math.min(prev + 1, totalPages));
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-950 to-black text-gray-100 p-4 sm:p-6 md:p-8">
      <div className="max-w-4xl mx-auto">
        <Link
          href="/dashboard"
          className="inline-flex items-center space-x-2 text-amber-400 hover:text-amber-300 mb-6 transition-colors text-sm sm:text-base"
        >
          <ArrowLeft className="w-4  sm:w-5 h-5" />
          <span>Back to Dashboard</span>
        </Link>
        <h1 className="font-bold text-2xl sm:text-3xl text-white mb-6">
          Your Complete History
        </h1>

        {loading ? (
          <div className="flex flex-col items-center justify-center py-12">
            <Loader2 className="w-8 h-8 text-amber-500 animate-spin mb-3" />
            <p className="text-gray-400">Loading your complete history...</p>
          </div>
        ) : (
          <>
            {fullHistory.length === 0 ? (
              <div className="flex flex-col items-center justify-center py-8">
                <HistoryIcon className="w-16 h-16 sm:w-20 sm:h-20 text-gray-700 mb-4" />
                <p className="text-gray-500 text-center text-base sm:text-lg">
                  No history available yet.
                </p>
                <p className="text-gray-600 text-center text-sm mt-2">
                  Start using our AI tools to see your activity here!
                </p>
              </div>
            ) : (
              <div className="space-y-4">
                {currentItems.map((history: HistoryItem, index: number) => {
                  const agent = getAgentName(history?.aiAgentType);
                  const IconComponent = agent?.icon;

                  return (
                    <div
                      key={history.recordId || index}
                      className="p-3 sm:p-4 border border-gray-800 rounded-lg bg-gray-900 hover:shadow-md hover:border-amber-500 transition-all duration-200"
                    >
                      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
                        <div className="flex items-start space-x-2 sm:space-x-3 flex-grow basis-0 min-w-0">
                          <div className="flex-shrink-0">
                            {IconComponent ? (
                              <div className="w-8 h-8 sm:w-10 sm:h-10 bg-amber-300 rounded-lg flex items-center justify-center">
                                <IconComponent className="w-4 sm:w-5 h-5 text-gray-950" />
                              </div>
                            ) : (
                              <div className="w-8 h-8 sm:w-10 sm:h-10 bg-gray-700 rounded-lg flex items-center justify-center">
                                <HistoryIcon className="w-4  sm:w-5 h-5 text-gray-400" />
                              </div>
                            )}
                          </div>

                          <div className="flex-grow basis-0 min-w-0">
                            <div className="flex flex-wrap items-center space-x-1.5 sm:space-x-2 mb-1 sm:mb-2">
                              <h3 className="font-semibold text-base sm:text-lg text-white break-words">
                                {agent?.name || 'Unknown Tool'}
                              </h3>
                              <span className="px-1.5 py-0.5 sm:px-2 sm:py-1 bg-amber-700 text-amber-100 text-xs rounded-full whitespace-nowrap">
                                {agent?.name?.split(' ')[0] || 'Tool'}
                              </span>
                            </div>
                            <p className="text-xs sm:text-sm text-gray-300 mb-0.5 sm:mb-1 line-clamp-2">
                              {agent?.des || 'No description available'}
                            </p>
                            <p className="text-xs text-gray-400">
                              Created:{' '}
                              {new Date(
                                history?.createdAt
                              ).toLocaleDateString()}
                            </p>
                          </div>
                        </div>

                        {history?.recordId && agent?.path && (
                          <div className="flex-shrink-0 mt-2 sm:mt-0 ml-0 sm:ml-4 self-end sm:self-auto">
                            <Link
                              href={`${agent.path}/${history.recordId}`}
                              className="flex items-center space-x-1 px-2 py-1 text-xs sm:px-2.5 sm:py-1.5 sm:text-sm
                                         bg-amber-500 hover:bg-orange-500 text-gray-950 rounded-lg transition-colors duration-200"
                            >
                              <span>View</span>
                              <svg
                                className="w-3  sm:w-3.5 h-3.5"
                                fill="none"
                                stroke="currentColor"
                                viewBox="0 0 24 24"
                              >
                                <path
                                  strokeLinecap="round"
                                  strokeLinejoin="round"
                                  strokeWidth={2}
                                  d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"
                                />
                              </svg>
                            </Link>
                          </div>
                        )}
                      </div>
                    </div>
                  );
                })}

                {/* Pagination Controls */}
                {totalPages > 1 && (
                  <div className="flex justify-center items-center space-x-3 mt-8">
                    <button
                      onClick={goToPreviousPage}
                      disabled={currentPage === 1}
                      className="flex items-center space-x-1 px-3 py-1.5 sm:px-4 sm:py-2 bg-gray-800 text-amber-300 rounded-lg hover:bg-gray-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors text-sm sm:text-base"
                    >
                      <ChevronLeft className="w-4 h-4" />
                      <span>Previous</span>
                    </button>
                    <span className="text-gray-400 text-sm sm:text-base">
                      Page {currentPage} of {totalPages}
                    </span>
                    <button
                      onClick={goToNextPage}
                      disabled={currentPage === totalPages}
                      className="flex items-center space-x-1 px-3 py-1.5 sm:px-4 sm:py-2 bg-gray-800 text-amber-300 rounded-lg hover:bg-gray-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors text-sm sm:text-base"
                    >
                      <span>Next</span>
                      <ChevronRight className="w-4 h-4" />
                    </button>
                  </div>
                )}
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
}

export default HistoryPage;
