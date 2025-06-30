// app/dashboard/_components/History.tsx
'use client';
import React, { useEffect, useState } from 'react';
import { History as HistoryIcon, Loader2, ArrowRight } from 'lucide-react'; // Import ArrowRight icon
import axios from 'axios';
import { aiToolsList, type AiTool } from './AiTools';
import Link from 'next/link';

// Define proper types
interface HistoryItem {
  id: number;
  recordId: string;
  content: any;
  userEmail: string;
  createdAt: string;
  aiAgentType: string;
}

function History() {
  const [userHistory, setUserHistory] = useState<HistoryItem[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    getHistory();
  }, []);

  const getHistory = async (): Promise<void> => {
    try {
      setLoading(true);
      const result = await axios.get('/api/history');
      // Sort history by creation date (newest first) and then take the latest 6 for dashboard display
      const sortedHistory = result.data
        ? result.data.sort(
            (a: HistoryItem, b: HistoryItem) =>
              new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
          )
        : [];
      setUserHistory(sortedHistory);
    } catch (error) {
      console.error('Error fetching history:', error);
      setUserHistory([]);
    } finally {
      setLoading(false);
    }
  };

  const getAgentName = (path: string): AiTool | undefined => {
    const agent = aiToolsList.find((item: AiTool) => item.path === path);
    return agent;
  };

  // Limit to the last 6 history items for the dashboard view
  const displayedHistory = userHistory.slice(0, 6);
  const showViewMoreButton = userHistory.length > 6;

  return (
    <div className="mt-4 sm:mt-5 p-4 sm:p-5 border border-gray-800 rounded-xl bg-gray-950 text-gray-100">
      <h2 className="font-bold text-lg sm:text-xl text-white">
        Previous Actions
      </h2>
      <p className="text-gray-300 text-sm sm:text-base mb-3 sm:mb-4">
        Here is your previous history
      </p>

      {loading ? (
        <div className="flex flex-col items-center justify-center py-8 sm:py-12">
          <Loader2 className="w-7 h-7 sm:w-8 sm:h-8 text-amber-500 animate-spin mb-2 sm:mb-3" />
          <p className="text-gray-400 text-sm sm:text-base">
            Loading your history...
          </p>
        </div>
      ) : (
        <>
          {userHistory?.length === 0 ? ( // Check original userHistory length for "no history" message
            <div className="flex flex-col items-center justify-center py-6 sm:py-8">
              <HistoryIcon className="w-12 h-12 sm:w-16 sm:h-16 text-gray-700 mb-3 sm:mb-4" />
              <p className="text-gray-500 text-sm sm:text-base text-center">
                No history available yet
              </p>
              <p className="text-xs sm:text-sm text-gray-600 text-center mt-1 sm:mt-2">
                Start using our AI tools to see your activity here
              </p>
            </div>
          ) : (
            <div className="space-y-3 sm:space-y-4">
              {displayedHistory.map((history: HistoryItem, index: number) => {
                // Map over displayedHistory
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
                              <IconComponent className="w-4 h-4 sm:w-5 sm:h-5 text-gray-950" />
                            </div>
                          ) : (
                            <div className="w-8 h-8 sm:w-10 sm:h-10 bg-gray-700 rounded-lg flex items-center justify-center">
                              <HistoryIcon className="w-4 h-4 sm:w-5 sm:h-5 text-gray-400" />
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
                            {new Date(history?.createdAt).toLocaleDateString()}
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
                              className="w-3 h-3 sm:w-3.5 sm:h-3.5"
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
              {/* "View More" button */}
              {showViewMoreButton && (
                <div className="text-center mt-4">
                  <Link href="/history" passHref>
                    <button className="inline-flex items-center justify-center space-x-2 px-4 py-2 text-sm sm:px-6 sm:py-3 sm:text-base bg-gray-800 text-amber-300 rounded-lg hover:bg-gray-700 hover:text-amber-200 transition-all duration-200 shadow-md">
                      <span>View More History</span>
                      <ArrowRight className="w-4  sm:w-5 h-5" />
                    </button>
                  </Link>
                </div>
              )}
            </div>
          )}
        </>
      )}
    </div>
  );
}

export default History;
