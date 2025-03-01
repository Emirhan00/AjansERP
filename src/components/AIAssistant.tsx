import React, { useState, useEffect, useRef } from 'react';
import { MessageSquare, X, Minimize, Maximize, Send, Loader2 } from 'lucide-react';
import { chatWithGPT, getSystemMessage } from '../services/openaiService';

interface Message {
  id: string;
  content: string;
  sender: 'user' | 'assistant';
  timestamp: Date;
  role?: 'user' | 'assistant' | 'system';
}

const AIAssistant: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isMinimized, setIsMinimized] = useState(false);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [messages, setMessages] = useState<Message[]>([
    {
      id: '1',
      content: 'Merhaba! Ben AjansAI. Size nasıl yardımcı olabilirim?',
      sender: 'assistant',
      timestamp: new Date(),
      role: 'assistant'
    }
  ]);
  
  const messagesEndRef = useRef<HTMLDivElement>(null);
  
  useEffect(() => {
    scrollToBottom();
  }, [messages, isOpen]);
  
  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };
  
  const toggleChat = () => {
    setIsOpen(!isOpen);
    if (isMinimized) setIsMinimized(false);
  };
  
  const toggleMinimize = () => {
    setIsMinimized(!isMinimized);
  };
  
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInput(e.target.value);
  };
  
  const handleSendMessage = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!input.trim() || isLoading) return;
    
    // Add user message
    const userMessage: Message = {
      id: Date.now().toString(),
      content: input,
      sender: 'user',
      timestamp: new Date(),
      role: 'user'
    };
    
    setMessages(prev => [...prev, userMessage]);
    setInput('');
    setIsLoading(true);
    
    try {
      // Prepare messages for OpenAI API
      const systemMessage = getSystemMessage();
      const chatMessages = [
        systemMessage,
        ...messages
          .filter(msg => msg.role) // Filter out messages without role
          .map(msg => ({
            role: msg.role!,
            content: msg.content
          })),
        { role: 'user' as const, content: input }
      ];
      
      // Call OpenAI API
      const response = await chatWithGPT(chatMessages);
      
      // Add assistant response
      const assistantMessage: Message = {
        id: (Date.now() + 1).toString(),
        content: response || 'Üzgünüm, şu anda yanıt veremiyorum. Lütfen daha sonra tekrar deneyin.',
        sender: 'assistant',
        timestamp: new Date(),
        role: 'assistant'
      };
      
      setMessages(prev => [...prev, assistantMessage]);
    } catch (error) {
      console.error('AI yanıtı alınamadı:', error);
      
      // Add error message
      const errorMessage: Message = {
        id: (Date.now() + 1).toString(),
        content: 'Üzgünüm, bir hata oluştu. Lütfen daha sonra tekrar deneyin.',
        sender: 'assistant',
        timestamp: new Date(),
        role: 'assistant'
      };
      
      setMessages(prev => [...prev, errorMessage]);
    } finally {
      setIsLoading(false);
    }
  };
  
  return (
    <>
      {/* Chat button */}
      <button
        onClick={toggleChat}
        className="fixed bottom-6 right-6 bg-blue-600 text-white p-3 rounded-full shadow-lg hover:bg-blue-700 transition-colors z-50"
        aria-label="Chat with AI Assistant"
      >
        <MessageSquare className="w-6 h-6" />
      </button>
      
      {/* Chat window */}
      {isOpen && (
        <div 
          className={`fixed bottom-20 right-6 w-80 sm:w-96 bg-white dark:bg-gray-800 rounded-lg shadow-xl z-50 flex flex-col transition-all duration-300 ease-in-out ${
            isMinimized ? 'h-14' : 'h-96'
          }`}
        >
          {/* Chat header */}
          <div className="flex items-center justify-between p-3 border-b dark:border-gray-700">
            <div className="flex items-center space-x-2">
              <div className="bg-blue-100 dark:bg-blue-900 p-2 rounded-full">
                <MessageSquare className="w-5 h-5 text-blue-600 dark:text-blue-400" />
              </div>
              <h3 className="font-medium text-gray-800 dark:text-white">AjansAI</h3>
            </div>
            <div className="flex items-center space-x-1">
              <button 
                onClick={toggleMinimize}
                className="p-1 text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-300 rounded"
              >
                {isMinimized ? <Maximize className="w-4 h-4" /> : <Minimize className="w-4 h-4" />}
              </button>
              <button 
                onClick={toggleChat}
                className="p-1 text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-300 rounded"
              >
                <X className="w-4 h-4" />
              </button>
            </div>
          </div>
          
          {/* Chat messages */}
          {!isMinimized && (
            <>
              <div className="flex-1 p-3 overflow-y-auto">
                <div className="space-y-3">
                  {messages.map((message) => (
                    <div 
                      key={message.id} 
                      className={`flex ${message.sender === 'user' ? 'justify-end' : 'justify-start'}`}
                    >
                      <div 
                        className={`max-w-[80%] rounded-lg p-3 ${
                          message.sender === 'user' 
                            ? 'bg-blue-600 text-white' 
                            : 'bg-gray-100 dark:bg-gray-700 text-gray-800 dark:text-white'
                        }`}
                      >
                        <p className="text-sm">{message.content}</p>
                        <p className="text-xs mt-1 opacity-70">
                          {message.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                        </p>
                      </div>
                    </div>
                  ))}
                  <div ref={messagesEndRef} />
                </div>
              </div>
              
              {/* Chat input */}
              <div className="p-3 border-t dark:border-gray-700">
                <form onSubmit={handleSendMessage} className="flex items-center space-x-2">
                  <input
                    type="text"
                    value={input}
                    onChange={handleInputChange}
                    placeholder="Mesajınızı yazın..."
                    disabled={isLoading}
                    className="flex-1 py-2 px-3 bg-gray-100 dark:bg-gray-700 border-0 rounded-md text-gray-800 dark:text-white placeholder-gray-500 dark:placeholder-gray-400 focus:ring-2 focus:ring-blue-500 focus:outline-none disabled:opacity-70"
                  />
                  <button 
                    type="submit"
                    disabled={isLoading}
                    className="p-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors disabled:opacity-70"
                  >
                    {isLoading ? (
                      <Loader2 className="w-4 h-4 animate-spin" />
                    ) : (
                      <Send className="w-4 h-4" />
                    )}
                  </button>
                </form>
              </div>
            </>
          )}
        </div>
      )}
    </>
  );
};

export default AIAssistant; 