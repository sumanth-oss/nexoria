'use client';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { LoaderCircle, Send } from 'lucide-react';
import React, { useEffect, useState } from 'react';
import EmptyState from '../_component/EmptyState';
import axios from 'axios';
import { v4 as uuidv4 } from 'uuid';
import { useRouter } from 'next/navigation';
import Markdown from 'react-markdown';
import { useParams } from 'next/navigation';

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

  async function onSend() {
    if (loading || !userInput.trim()) return;
    setLoading(true);
    console.log('chatId before PUT:', chatId);

    const userMsg = {
      content: userInput,
      role: 'user',
      type: 'text',
    };

    const updatedList = [...messageList, userMsg];
    setMessageList(updatedList);

    try {
      const res = await axios.post('/api/chat-agent', {
        userInput,
      });

      const finalList = [...updatedList, res.data];
      setMessageList(finalList);
      setUserInput('');

      // Save to database with the complete message list
      await axios.put('/api/history', {
        content: finalList,
        recordId: chatId,
      });
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  }

  // Remove the problematic useEffect that was causing race conditions
  // useEffect(() => {
  //   if (messageList.length > 0) {
  //     updateMessagesList();
  //   }
  // }, [messageList]);

  useEffect(() => {
    if (chatId) {
      getMessageList();
    }
  }, [chatId]);

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
      router.replace('/tools/chat/' + id); // Fixed the router path
    } catch (error) {
      console.error('Error creating new chat:', error);
    }
  }

  return (
    <div className="px-10 md:px-24 lg:px-36 xl:px-42">
      <div className="flex items-center justify-between gap-8">
        <div>
          <h2 className="font-bold text-lg text-[#23003c]">
            AI Career Q/A Chat
          </h2>
          <p className="text-gray-600">
            Smarter career decisions starts here - get tailored solution for
            your career
          </p>
        </div>
        <Button
          onClick={onNewChat}
          className="bg-[#23003c] text-[#f3e8ff] hover:bg-[#f3e8ff] hover:text-[#23003c] border-2 border-[#23003c] hover:border-[#23003c]"
        >
          + New Chat
        </Button>
      </div>
      <div className="flex flex-col h-[75vh]">
        {!messageList.length && (
          <div className="mt-5">
            <EmptyState
              selctedQuestion={(question: string) => setUserInput(question)}
            />
          </div>
        )}
        <div className="flex-1 overflow-y-auto py-4">
          {messageList.map((message, index) => (
            <div key={index}>
              <div
                className={`flex mb-4 ${
                  message.role == 'user' ? 'justify-end' : 'justify-start'
                }`}
              >
                <div
                  className={`p-3 rounded-lg max-w-[70%] ${
                    message.role == 'user'
                      ? 'bg-[#23003c] text-[#f3e8ff] rounded-br-sm'
                      : 'bg-gray-100 text-gray-800 rounded-bl-sm'
                  }`}
                >
                  <Markdown>{message.content}</Markdown>
                </div>
              </div>
              {loading && messageList?.length - 1 == index && (
                <div className="flex justify-start mb-4">
                  <div className="bg-gray-100 p-3 rounded-lg rounded-bl-sm flex items-center gap-2">
                    <LoaderCircle
                      className="animate-spin text-[#23003c]"
                      size={16}
                    />
                    <span>Thinking...</span>
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>
        <div className="flex justify-between gap-3 p-4 bg-white border-t border-gray-200">
          <Input
            placeholder="Type your message here..."
            value={userInput}
            onChange={(e) => setUserInput(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === 'Enter' && !loading && userInput.trim()) {
                e.preventDefault();
                onSend();
              }
            }}
            className="flex-1 border-gray-300 focus:border-[#23003c] focus:ring-[#23003c]"
          />
          <Button
            onClick={onSend}
            disabled={loading || !userInput.trim()}
            className="bg-[#23003c] text-[#f3e8ff] hover:bg-[#f3e8ff] hover:text-[#23003c] border-2 border-[#23003c] hover:border-[#23003c] disabled:opacity-50"
          >
            <Send size={16} />
          </Button>
        </div>
      </div>
    </div>
  );
}

export default AiChat;
