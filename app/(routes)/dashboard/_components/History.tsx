'use client';
import React, { useEffect, useState } from 'react';
import { History as HistoryIcon, Loader2 } from 'lucide-react';
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
      
      setUserHistory(result.data || []);
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

  return (
    <div className="mt-5 p-5 border border-gray-800 rounded-xl bg-gray-950 text-gray-100">
      <h2 className="font-bold text-lg text-white">Previous Actions</h2>
      <p className="text-gray-300 mb-4">Here is your previous history</p>

      {loading ? (
        <div className="flex flex-col items-center justify-center py-12">
          <Loader2 className="w-8 h-8 text-amber-500 animate-spin mb-3" />
          <p className="text-gray-400">Loading your history...</p>
        </div>
      ) : (
        <>
          {userHistory?.length === 0 ? (
            <div className="flex flex-col items-center justify-center py-8">
              <HistoryIcon className="w-16 h-16 text-gray-700 mb-4" />
              <p className="text-gray-500 text-center">
                No history available yet
              </p>
              <p className="text-sm text-gray-600 text-center mt-2">
                Start using our AI tools to see your activity here
              </p>
            </div>
          ) : (
            <div className="space-y-3">
              {userHistory.map((history: HistoryItem, index: number) => {
                const agent = getAgentName(history?.aiAgentType);
                const IconComponent = agent?.icon;

                return (
                  <div
                    key={history.recordId || index}
                    className="p-4 border border-gray-800 rounded-lg bg-gray-900 hover:shadow-md hover:border-amber-500 transition-all duration-200"
                  >
                    <div className="flex items-center justify-between">
                      <div className="flex items-start space-x-3 flex-1">
                        {/* Icon Section */}
                        <div className="flex-shrink-0">
                          {IconComponent ? (
                            <div className="w-10 h-10 bg-amber-300 rounded-lg flex items-center justify-center">
                              <IconComponent className="w-5 h-5 text-gray-950" />
                            </div>
                          ) : (
                            <div className="w-10 h-10 bg-gray-700 rounded-lg flex items-center justify-center">
                              <HistoryIcon className="w-5 h-5 text-gray-400" />
                            </div>
                          )}
                        </div>

                        {/* Content Section */}
                        <div className="flex-1 min-w-0">
                          <div className="flex items-center space-x-2 mb-2">
                            <h3 className="font-semibold text-white truncate">
                              {agent?.name || 'Unknown Tool'}
                            </h3>
                            <span className="px-2 py-1 bg-amber-700 text-amber-100 text-xs rounded-full whitespace-nowrap">
                              {agent?.name?.split(' ')[0] || 'Tool'}
                            </span>
                          </div>
                          <p className="text-sm text-gray-300 mb-1 line-clamp-2">
                            {agent?.des || 'No description available'}
                          </p>
                          <p className="text-xs text-gray-400">
                            Created:{' '}
                            {new Date(history?.createdAt).toLocaleDateString()}
                          </p>
                        </div>
                      </div>

                      {/* Action Section */}
                      {history?.recordId && agent?.path && (
                        <div className="flex-shrink-0 ml-4">
                          <Link
                            href={`${agent.path}/${history.recordId}`}
                            className="flex items-center space-x-1 px-3 py-2 bg-amber-500 hover:bg-orange-500 text-gray-950 text-sm rounded-lg transition-colors duration-200"
                          >
                            <span>View</span>
                            <svg
                              className="w-3 h-3"
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
            </div>
          )}
        </>
      )}
    </div>
  );
}

export default History;
