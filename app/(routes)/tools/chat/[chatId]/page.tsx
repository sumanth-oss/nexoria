// app\(routes)\tools\chat\[chatId]\page.tsx
'use client';

import { Button } from '@/components/ui/button';
import { LoaderCircle, Send } from 'lucide-react';
import React, { useEffect, useState, useRef } from 'react';
import EmptyState from '../_component/EmptyState'; // Ensure this path is correct
import axios from 'axios';
import { v4 as uuidv4 } from 'uuid';
import { useRouter, useParams } from 'next/navigation';
import Markdown from 'react-markdown'; // Assuming you have 'react-markdown' installed

type messages = {
  content: string;
  role: string;
  type: string;
};

function AiChat() {
  const [userInput, setUserInput] = useState<string>('');
  const [loading, setLoading] = useState(false);
  const [messageList, setMessageList] = useState<messages[]>([]);
  const { chatId } = useParams();
  const router = useRouter();
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const textareaRef = useRef<HTMLTextAreaElement>(null);
  const inputContainerRef = useRef<HTMLDivElement>(null);

async function onSend() {
  if (loading || !userInput.trim()) return;
  setLoading(true);

  const userMsg = { content: userInput, role: 'user', type: 'text' };
  
  // Show user message in UI immediately
  setMessageList(prev => [...prev, userMsg]);
  const currentInput = userInput;
  setUserInput('');

  try {
    // 1. Trigger the background AI process
    await axios.post('/api/chat-agent', {
      userInput: currentInput,
      chatId,
    });

    // 2. Poll the database until the AI reply shows up
    let attempts = 0;
    const maxAttempts = 15; // Poll for 30 seconds total (15 * 2s)
    
    const pollInterval = setInterval(async () => {
      attempts++;
      const result = await axios.get('/api/history?recordId=' + chatId);
      const messages = result.data?.content || [];
      
      // Check if the latest message is from the assistant
      if (messages.length > 0 && messages[messages.length - 1].role === 'assistant') {
        setMessageList(messages);
        setLoading(false);
        clearInterval(pollInterval);
      }

      if (attempts >= maxAttempts) {
        setLoading(false);
        clearInterval(pollInterval);
      }
    }, 2000); // Check every 2 seconds

  } catch (err) {
    console.error(err);
    setLoading(false);
    setMessageList(prev => [...prev, {
      content: 'Error: Connection lost.',
      role: 'assistant',
      type: 'text',
    }]);
  }
}


  useEffect(() => {
    if (chatId) {
      getMessageList();
    }
  }, [chatId]);

  useEffect(() => {
    // Scroll to the bottom of the chat whenever messageList changes
    if (messagesEndRef.current) {
      messagesEndRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  }, [messageList]);

  useEffect(() => {
   
    if (textareaRef.current) {
      textareaRef.current.style.height = 'auto'; // Reset height to recalculate
      textareaRef.current.style.height =
        textareaRef.current.scrollHeight + 'px';
    }
  }, [userInput]);

  useEffect(() => {
    const timer = setTimeout(() => {
      if (inputContainerRef.current) {
        inputContainerRef.current.scrollIntoView({ 
          behavior: 'smooth', 
          block: 'end' 
        });
      }
    }, 100);

    return () => clearTimeout(timer);
  }, []);

  const getMessageList = async () => {
    try {
      const result = await axios.get('/api/history?recordId=' + chatId);
      if (result.data && result.data.content) {
        setMessageList(result.data.content);
      } else {
        setMessageList([]);
      }
    } catch (error) {
      console.error('Error fetching message list:', error);
      setMessageList([]);
    }
  };

  async function onNewChat(e: React.MouseEvent) {
    e.preventDefault();
    const id = uuidv4();
    try {
      await axios.post('/api/history', {
        recordId: id,
        content: [],
        aiAgentType: '/tools/chat', // Assuming this is the agent type for chat
      });
      router.replace('/tools/chat/' + id);
      setMessageList([]);
      setUserInput('');
      if (textareaRef.current) {
        textareaRef.current.style.height = 'auto';
        textareaRef.current.rows = 1;
      }
    } catch (error) {
      console.error('Error creating new chat:', error);
    }
  }

  const handleSelectedQuestion = async (question: string) => {
    setUserInput(question);
    // Use a small delay to ensure userInput state updates before calling onSend
    if (!loading) {
      setTimeout(() => {
        onSend();
      }, 50);
    }
  };

  return (
    // Changed from h-screen to min-h-screen with pb-safe for better mobile support
    <div className="px-4 sm:px-6 md:px-10 lg:px-16 xl:px-24 bg-gray-950 min-h-screen pb-safe text-gray-100 flex flex-col">
      {/* Header section: flex-shrink-0 to prevent it from shrinking */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 sm:gap-8 py-4 sm:py-6 border-b border-gray-800 flex-shrink-0">
        <div>
          <h2 className="font-bold text-xl sm:text-2xl text-white mb-1">
            AI Career Q/A Chat
          </h2>
          <p className="text-gray-400 text-sm sm:text-base max-w-lg">
            Smarter career decisions start here - get tailored solutions for
            your career
          </p>
        </div>
        <Button
          onClick={onNewChat}
          className="bg-gradient-to-r from-amber-500 to-orange-500 text-gray-950 font-semibold
                      hover:from-amber-600 hover:to-orange-600 border-2 border-amber-500
                      hover:border-orange-600 transition-all duration-200 shadow-md hover:shadow-lg flex-shrink-0
                      px-4 py-2 text-sm sm:px-5 sm:py-2.5 sm:text-base rounded-lg" // Responsive button size
        >
          + New Chat
        </Button>
      </div>

      {/* Chat messages area: flex-1 to take available space, with bottom margin for input */}
      <div className="flex-1 overflow-y-auto py-4 sm:py-6 mb-2">
        {/* Conditional rendering for EmptyState or messages */}
        {!messageList.length ? (
          <div className="flex-grow">
            <EmptyState selctedQuestion={handleSelectedQuestion} />
          </div>
        ) : (
          <div>
            {messageList.map((message, index) => (
              <div key={index}>
                <div
                  className={`flex mb-4 ${
                    message.role === 'user' ? 'justify-end' : 'justify-start'
                  }`}
                >
                  <div
                    // max-w for message bubbles, responsive padding, rounded corners
                    className={`p-3 sm:p-4 rounded-xl max-w-[85%] sm:max-w-[70%] ${
                      message.role === 'user'
                        ? 'bg-amber-700 text-gray-950 rounded-br-none'
                        : 'bg-gray-800 text-gray-100 rounded-bl-none'
                    }`}
                  >
                    {/* `prose` classes for styling Markdown content (headings, lists, etc.) */}
                    <div className="prose prose-invert max-w-none text-sm sm:text-base">
                      <Markdown>{message.content}</Markdown>
                    </div>
                  </div>
                </div>
                {/* Loading indicator for AI response */}
                {loading &&
                  messageList.length - 1 === index &&
                  message.role === 'user' && ( // Only show thinking indicator after user sends message
                    <div className="flex justify-start mb-4">
                      <div className="bg-gray-800 p-3 rounded-lg rounded-bl-none flex items-center gap-2 text-gray-100 text-sm">
                        <LoaderCircle
                          className="animate-spin text-amber-500"
                          size={16}
                        />
                        <span>Thinking...</span>
                      </div>
                    </div>
                  )}
              </div>
            ))}
            <div ref={messagesEndRef} /> {/* Ref for auto-scrolling */}
          </div>
        )}
      </div>

      {/* Input area: Added ref and better positioning */}
      <div 
        ref={inputContainerRef}
        className="flex items-end gap-2 sm:gap-3 p-3 sm:p-4 bg-gray-900 border-t border-gray-800 rounded-b-xl flex-shrink-0 sticky bottom-0"
      >
        <textarea
          ref={textareaRef}
          placeholder="Type your message here..."
          value={userInput}
          onChange={(e) => setUserInput(e.target.value)}
          onKeyDown={(e) => {
            if (
              e.key === 'Enter' &&
              !e.shiftKey &&
              !loading &&
              userInput.trim()
            ) {
              e.preventDefault();
              onSend();
            }
          }}
          rows={1}
          className="flex-1 border border-gray-700 focus:border-amber-500 focus:ring-amber-500 focus:ring-1
                      bg-gray-800 text-gray-100 placeholder-gray-500 resize-none overflow-hidden
                      rounded-lg p-2.5 sm:p-3 text-sm sm:text-base
                      min-h-[44px] sm:min-h-[48px] max-h-[150px] sm:max-h-[200px]" // Responsive padding, min/max heights
          style={{
            height: textareaRef.current
              ? textareaRef.current.scrollHeight + 'px'
              : 'auto',
          }}
        />
        <Button
          onClick={onSend}
          disabled={loading || !userInput.trim()}
          className="bg-gradient-to-r from-amber-500 to-orange-500 text-gray-950 font-semibold
                      hover:from-amber-600 hover:to-orange-600 border-2 border-amber-500
                      hover:border-orange-600 disabled:opacity-50 transition-all duration-200
                      h-11 w-11 sm:h-12 sm:w-12 flex-shrink-0 rounded-lg" // Responsive button size
        >
          {loading ? (
            <LoaderCircle size={20} className="animate-spin" />
          ) : (
            <Send size={20} />
          )}
        </Button>
      </div>
    </div>
  );
}

export default AiChat;