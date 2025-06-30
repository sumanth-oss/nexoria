'use client';
import { Button } from '@/components/ui/button';
import { LoaderCircle, Send } from 'lucide-react';
import React, { useEffect, useState, useRef } from 'react';
import EmptyState from '../_component/EmptyState';
import axios from 'axios';
import { v4 as uuidv4 } from 'uuid';
import { useRouter, useParams } from 'next/navigation'; // Combined imports
import Markdown from 'react-markdown';

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
  const messagesEndRef = useRef<HTMLDivElement>(null); // Ref for scrolling to bottom
  const textareaRef = useRef<HTMLTextAreaElement>(null); // Ref for textarea

  async function onSend() {
    if (loading || !userInput.trim()) return;
    setLoading(true);

    const userMsg = {
      content: userInput,
      role: 'user',
      type: 'text',
    };

    const updatedList = [...messageList, userMsg];
    setMessageList(updatedList);
    setUserInput(''); // Clear input immediately after adding to list

    // Reset textarea height after clearing input
    if (textareaRef.current) {
      textareaRef.current.style.height = 'auto'; // Reset to auto to shrink if content lessens
      textareaRef.current.rows = 1; // Reset to initial rows
    }

    try {
      const res = await axios.post('/api/chat-agent', {
        userInput: userInput, // Use the userInput value before it's cleared
      });

      const agentResponse = res.data;
      const finalList = [...updatedList, agentResponse];
      setMessageList(finalList);

      await axios.put('/api/history', {
        content: finalList,
        recordId: chatId,
      });
    } catch (err) {
      console.error(err);
      setMessageList((prev) => [
        ...prev,
        {
          content:
            'Error: Could not get a response from the AI. Please try again.',
          role: 'assistant',
          type: 'text',
        },
      ]);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    if (chatId) {
      getMessageList();
    }
  }, [chatId]);

  // Scroll to the bottom of the chat whenever messageList changes
  useEffect(() => {
    if (messagesEndRef.current) {
      messagesEndRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  }, [messageList]);

  // Adjust textarea height dynamically
  useEffect(() => {
    if (textareaRef.current) {
      textareaRef.current.style.height = 'auto'; // Reset height to recalculate
      textareaRef.current.style.height =
        textareaRef.current.scrollHeight + 'px';
    }
  }, [userInput]); // Re-run when userInput changes

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
      });
      router.replace('/tools/chat/' + id);
      setMessageList([]); // Clear messages for new chat
      setUserInput(''); // Clear input for new chat
      if (textareaRef.current) {
        textareaRef.current.style.height = 'auto'; // Reset height on new chat
        textareaRef.current.rows = 1;
      }
    } catch (error) {
      console.error('Error creating new chat:', error);
    }
  }

  const handleSelectedQuestion = async (question: string) => {
    setUserInput(question);
    if (!loading) {
      setTimeout(() => {
        onSend();
      }, 50);
    }
  };

  return (
    <div className="px-10 md:px-24 lg:px-36 xl:px-42 bg-gray-950 min-h-screen text-gray-100 flex flex-col">
      {' '}
      {/* Added flex-col here */}
      <div className="flex items-center justify-between gap-8 py-6 border-b border-gray-800 flex-shrink-0">
        {' '}
        {/* Added flex-shrink-0 */}
        <div>
          <h2 className="font-bold text-lg text-white">AI Career Q/A Chat</h2>
          <p className="text-gray-400">
            Smarter career decisions start here - get tailored solutions for
            your career
          </p>
        </div>
        <Button
          onClick={onNewChat}
          className="bg-gradient-to-r from-amber-500 to-orange-500 text-gray-950 font-semibold
                      hover:from-amber-600 hover:to-orange-600 border-2 border-amber-500
                      hover:border-orange-600 transition-all duration-200 shadow-md hover:shadow-lg flex-shrink-0"
        >
          + New Chat
        </Button>
      </div>
      <div className="flex-grow flex flex-col h-[calc(100vh-160px)]">
        {' '}
        {/* Adjusted h */}
        {!messageList.length && (
          <div className="mt-5 flex-grow">
            <EmptyState selctedQuestion={handleSelectedQuestion} />
          </div>
        )}
        <div className="flex-1 overflow-y-auto py-4 hide-scrollbar">
          {messageList.map((message, index) => (
            <div key={index}>
              <div
                className={`flex mb-4 ${
                  message.role === 'user' ? 'justify-end' : 'justify-start'
                }`}
              >
                <div
                  className={`p-3 rounded-lg max-w-[70%] ${
                    message.role === 'user'
                      ? 'bg-amber-700 text-gray-950 rounded-br-none'
                      : 'bg-gray-800 text-gray-100 rounded-bl-none'
                  }`}
                >
                  <div className="prose prose-invert max-w-none">
                    <Markdown>{message.content}</Markdown>
                  </div>
                </div>
              </div>
              {loading &&
                messageList.length - 1 === index &&
                message.role !== 'assistant' && (
                  <div className="flex justify-start mb-4">
                    <div className="bg-gray-800 p-3 rounded-lg rounded-bl-none flex items-center gap-2 text-gray-100">
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
          <div ref={messagesEndRef} />
        </div>
        {/* Input area with dynamic height textarea */}
        <div className="flex items-end gap-3 p-4 bg-gray-900 border-t border-gray-800 rounded-b-xl flex-shrink-0">
          {' '}
          {/* Added items-end and flex-shrink-0 */}
          <textarea
            ref={textareaRef}
            placeholder="Type your message here..."
            value={userInput}
            onChange={(e) => setUserInput(e.target.value)}
            onKeyDown={(e) => {
              // Submit on Enter, but allow Shift+Enter for new line
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
            rows={1} // Start with 1 row height
            className="flex-1 border-gray-700 focus:border-amber-500 focus:ring-amber-500
                       bg-gray-800 text-gray-100 placeholder-gray-500 resize-none overflow-hidden
                       rounded-lg p-3 hide-scrollbar min-h-[48px] max-h-[200px]" // Adjusted padding and min/max heights
            style={{
              // These inline styles are set by the useEffect, but we keep them here for clarity
              // and for initial rendering if JS hasn't run yet.
              // `height: 'auto'` allows it to shrink.
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
                         hover:border-orange-600 disabled:opacity-50 transition-all duration-200 h-12 w-12 flex-shrink-0" // Adjusted button size
          >
            <Send size={20} /> {/* Increased icon size */}
          </Button>
        </div>
      </div>
    </div>
  );
}

export default AiChat;
