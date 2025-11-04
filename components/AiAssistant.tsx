import React, { useState, useRef, useEffect } from 'react';
import { getAiAssistantResponse } from '../services/geminiService';
import { ChatMessage } from '../types';

const AiAssistant: React.FC = () => {
  const [messages, setMessages] = useState<ChatMessage[]>([
    { role: 'model', text: 'Halo! Saya adalah asisten AI perakit PC Anda. Tanyakan apa saja tentang komponen atau kompatibilitas.' }
  ]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(scrollToBottom, [messages]);

  const handleSend = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim() || isLoading) return;

    const userMessage: ChatMessage = { role: 'user', text: input };
    setMessages(prev => [...prev, userMessage]);
    setInput('');
    setIsLoading(true);

    try {
      const responseText = await getAiAssistantResponse(messages, input);
      const modelMessage: ChatMessage = { role: 'model', text: responseText };
      setMessages(prev => [...prev, modelMessage]);
    } catch (error) {
      const errorMessage: ChatMessage = { role: 'model', text: 'Maaf, saya mengalami galat. Silakan coba lagi.' };
      setMessages(prev => [...prev, errorMessage]);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex-grow flex flex-col p-4 justify-center items-center">
      <div className="w-full max-w-3xl h-[80vh] flex flex-col bg-gray-800/50 backdrop-blur-sm border border-gray-700 rounded-lg shadow-lg">
        <div className="flex-grow p-4 overflow-y-auto space-y-4">
          {messages.map((msg, index) => (
            <div key={index} className={`flex items-start gap-3 ${msg.role === 'user' ? 'justify-end' : ''}`}>
              {msg.role === 'model' && <div className="w-8 h-8 rounded-full bg-cyan-500 flex-shrink-0"></div>}
              <div className={`max-w-md p-3 rounded-lg ${msg.role === 'user' ? 'bg-cyan-600' : 'bg-gray-700'}`}>
                <p className="text-sm" style={{ whiteSpace: 'pre-wrap' }}>{msg.text}</p>
              </div>
            </div>
          ))}
          {isLoading && (
             <div className="flex items-start gap-3">
                <div className="w-8 h-8 rounded-full bg-cyan-500 flex-shrink-0"></div>
                <div className="max-w-md p-3 rounded-lg bg-gray-700">
                    <div className="flex space-x-1">
                        <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{animationDelay: '0.1s'}}></div>
                        <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{animationDelay: '0.2s'}}></div>
                        <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{animationDelay: '0.3s'}}></div>
                    </div>
                </div>
            </div>
          )}
          <div ref={messagesEndRef} />
        </div>
        <form onSubmit={handleSend} className="p-4 border-t border-gray-700">
          <div className="flex items-center space-x-2 bg-gray-900/50 rounded-lg border border-gray-600 focus-within:ring-2 focus-within:ring-cyan-500">
            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Tanya tentang komponen..."
              className="flex-grow bg-transparent p-3 focus:outline-none"
              disabled={isLoading}
            />
            <button type="submit" disabled={isLoading || !input.trim()} className="p-3 text-cyan-400 hover:text-cyan-300 disabled:text-gray-500">
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8"></path></svg>
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AiAssistant;