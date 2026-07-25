'use client';

import React, { useState, useRef, useEffect } from 'react';
import { Bot, X, Send, Sparkles, User, RefreshCw, ChevronDown, MessageSquare } from 'lucide-react';
import { generateChatResponse, ChatMessage } from '@/lib/ai-service';

export function IEEEBranchChatbot() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      role: 'assistant',
      content:
        "Kumusta! I'm your IEEE-MUSB AI Branch Assistant. Ask me about membership registration, Mapúa Intramuros venues, KiCAD workshops, or executive officers!",
    },
  ]);
  const [input, setInput] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, isTyping]);

  const handleSend = (textToSend?: string) => {
    const query = textToSend || input;
    if (!query.trim()) return;

    const userMsg: ChatMessage = { role: 'user', content: query };
    setMessages((prev) => [...prev, userMsg]);
    if (!textToSend) setInput('');
    setIsTyping(true);

    setTimeout(() => {
      const replyText = generateChatResponse(query);
      setMessages((prev) => [...prev, { role: 'assistant', content: replyText }]);
      setIsTyping(false);
    }, 600);
  };

  const quickPrompts = [
    'How do I register?',
    'Where is ECE Lab?',
    'Who are the officers?',
    'Upcoming events',
  ];

  return (
    <div className="fixed bottom-5 right-5 z-50">
      {/* Floating Trigger Button */}
      {!isOpen && (
        <button
          onClick={() => setIsOpen(true)}
          className="px-4 py-3 rounded-full btn-ieee-primary flex items-center gap-2.5 shadow-2xl hover:scale-105 transition-all group border border-blue-400/40"
          aria-label="Open IEEE AI Assistant"
        >
          <div className="relative">
            <Bot className="w-5 h-5 text-white" />
            <span className="absolute -top-1 -right-1 w-2.5 h-2.5 bg-emerald-400 rounded-full animate-ping" />
            <span className="absolute -top-1 -right-1 w-2.5 h-2.5 bg-emerald-400 rounded-full" />
          </div>
          <span className="text-xs font-extrabold tracking-wide text-white">IEEE AI Assistant</span>
        </button>
      )}

      {/* Floating Chat Modal */}
      {isOpen && (
        <div className="w-[92vw] sm:w-[380px] h-[520px] bg-slate-900/95 dark:bg-slate-900/95 border border-slate-700/80 rounded-3xl shadow-2xl flex flex-col overflow-hidden backdrop-blur-xl animate-in zoom-in-95 duration-200">
          {/* Header */}
          <div className="p-4 bg-slate-800/90 border-b border-slate-700 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="p-2 rounded-xl bg-[#00629B] text-white shadow-md">
                <Bot className="w-4 h-4" />
              </div>
              <div>
                <div className="font-extrabold text-xs text-white flex items-center gap-1.5">
                  <span>IEEE-MUSB Branch Assistant</span>
                  <span className="px-1.5 py-0.2 text-[9px] font-mono bg-emerald-500/20 text-emerald-400 rounded font-bold">
                    ONLINE
                  </span>
                </div>
                <div className="text-[10px] text-slate-400">Mapúa University Intramuros AI</div>
              </div>
            </div>

            <button
              onClick={() => setIsOpen(false)}
              className="text-slate-400 hover:text-white p-1 rounded-lg hover:bg-slate-700 transition-colors"
            >
              <X className="w-4 h-4" />
            </button>
          </div>

          {/* Messages Body */}
          <div className="flex-1 p-4 overflow-y-auto space-y-3.5 text-xs">
            {messages.map((msg, i) => (
              <div
                key={i}
                className={`flex gap-2.5 ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}
              >
                {msg.role === 'assistant' && (
                  <div className="w-6 h-6 rounded-lg bg-[#00629B] text-white flex items-center justify-center shrink-0 mt-0.5">
                    <Bot className="w-3.5 h-3.5" />
                  </div>
                )}

                <div
                  className={`p-3 rounded-2xl max-w-[82%] leading-relaxed whitespace-pre-line ${
                    msg.role === 'user'
                      ? 'bg-[#00629B] text-white font-medium rounded-tr-none'
                      : 'bg-slate-800 text-slate-200 border border-slate-700/70 rounded-tl-none'
                  }`}
                >
                  {msg.content}
                </div>
              </div>
            ))}

            {isTyping && (
              <div className="flex items-center gap-2 text-slate-400 font-mono text-[10px] p-2">
                <RefreshCw className="w-3 h-3 animate-spin text-blue-400" />
                <span>IEEE Assistant is typing...</span>
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>

          {/* Quick Prompts Bar */}
          <div className="px-3 py-2 bg-slate-950/60 border-t border-slate-800/80 flex items-center gap-1.5 overflow-x-auto no-scrollbar">
            {quickPrompts.map((prompt, idx) => (
              <button
                key={idx}
                onClick={() => handleSend(prompt)}
                className="px-2.5 py-1 rounded-full text-[10px] font-mono bg-slate-800 text-slate-300 hover:text-white hover:bg-slate-700 border border-slate-700 whitespace-nowrap shrink-0 transition-colors"
              >
                {prompt}
              </button>
            ))}
          </div>

          {/* Input Box */}
          <form
            onSubmit={(e) => {
              e.preventDefault();
              handleSend();
            }}
            className="p-3 bg-slate-900 border-t border-slate-800 flex items-center gap-2"
          >
            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Ask IEEE AI assistant..."
              className="flex-1 px-3 py-2 rounded-xl bg-slate-800 border border-slate-700 text-white text-xs focus:outline-none focus:ring-1 focus:ring-[#00629B]"
            />
            <button
              type="submit"
              className="p-2 rounded-xl btn-ieee-primary text-white shrink-0"
              aria-label="Send message"
            >
              <Send className="w-3.5 h-3.5" />
            </button>
          </form>
        </div>
      )}
    </div>
  );
}
