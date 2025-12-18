import React, { memo } from 'react';
import { motion } from 'framer-motion';
import { Message, Lawyer } from '@/types';

interface ChatMessageProps {
  message: Message;
  lawyer?: Lawyer | null;
}

const ChatMessage = memo(({ message, lawyer }: ChatMessageProps) => {
  const timestamp = message.timestamp instanceof Date
    ? message.timestamp
    : new Date(message.timestamp);

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      className={`flex ${message.sender === 'user' ? 'justify-end' : 'justify-start'}`}
    >
      <div className={`max-w-[85%] sm:max-w-[70%] ${message.sender === 'user' ? 'order-2' : 'order-1'}`}>
        {message.sender !== 'user' && (
          <div className="flex items-center gap-2 mb-1">
            {message.sender === 'ai' ? (
              <img src="/axsyntech_fav.png" alt="AI Assistant" className="w-5 h-5 rounded-full" />
            ) : (
              <img src={lawyer?.avatar} alt="" className="w-5 h-5 rounded-full" />
            )}
            <span className="text-xs text-gray-500">
              {message.sender === 'ai' ? 'AI Assistant' : lawyer?.name}
            </span>
          </div>
        )}
        <div
          className={`rounded-2xl px-3 sm:px-4 py-2 sm:py-3 ${
            message.sender === 'user'
              ? 'bg-primary text-white rounded-br-md'
              : message.sender === 'ai'
              ? 'bg-purple-100 text-purple-900 rounded-bl-md'
              : 'bg-gray-100 text-gray-900 rounded-bl-md'
          }`}
        >
          <p className="text-sm whitespace-pre-wrap">{message.content}</p>
        </div>
        <p className={`text-xs text-gray-400 mt-1 ${message.sender === 'user' ? 'text-right' : ''}`}>
          {timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
        </p>
      </div>
    </motion.div>
  );
});

ChatMessage.displayName = 'ChatMessage';

export default ChatMessage;
