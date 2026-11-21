"use client";

import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { portfolioData } from "@/data/portfolio";
import { MessageSquare, X, Send, Bot, User, Sparkles } from "lucide-react";

interface ChatMessage {
  id: string;
  sender: "user" | "ai";
  text: string;
}

export default function AiChatWidget() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      id: "welcome",
      sender: "ai",
      text: `Hi! I'm Waleed's portfolio assistant. Ask me anything about his UET Lahore background, projects (Assignment Management, Thesis Management, Solitaire, Inventory), or tech stack!`,
    },
  ]);
  const [inputText, setInputText] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const starterChips = [
    "Who is Waleed & what are his core skills?",
    "Tell me about his Thesis & Assignment Management systems",
    "How can I contact Waleed?",
  ];

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    if (isOpen) scrollToBottom();
  }, [messages, isOpen]);

  const handleSendMessage = async (textToSend: string) => {
    const trimmed = textToSend.trim();
    if (!trimmed || isTyping) return;

    const userMsg: ChatMessage = {
      id: Date.now().toString(),
      sender: "user",
      text: trimmed,
    };

    setMessages((prev) => [...prev, userMsg]);
    setInputText("");
    setIsTyping(true);

    try {
      const res = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ message: trimmed }),
      });

      const data = await res.json();
      const aiReply = data.reply || data.error || "I could not retrieve an answer at this time.";

      setMessages((prev) => [
        ...prev,
        {
          id: (Date.now() + 1).toString(),
          sender: "ai",
          text: aiReply,
        },
      ]);
    } catch {
      setMessages((prev) => [
        ...prev,
        {
          id: (Date.now() + 1).toString(),
          sender: "ai",
          text: "Waleed is a Computer Science undergraduate at UET Lahore specializing in responsive web systems, conversational AI, and relational database architectures.",
        },
      ]);
    } finally {
      setIsTyping(false);
    }
  };

  return (
    <>
      {/* Floating Bottom-Right Pill Button */}
      <div className="fixed bottom-6 right-6 z-50">
        <motion.button
          type="button"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={() => setIsOpen(!isOpen)}
          className="inline-flex items-center space-x-2 bg-white text-neutral-950 font-semibold text-xs sm:text-sm px-5 py-3 rounded-full shadow-2xl hover:bg-neutral-200 transition"
          aria-label="Chat with Waleed's AI"
        >
          <Bot size={17} />
          <span>Chat with AI</span>
          <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
        </motion.button>
      </div>

      {/* 380px x 500px Dark Monochrome Chat Drawer */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, scale: 0.92, y: 24 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.92, y: 24 }}
            transition={{ type: "spring", stiffness: 320, damping: 26 }}
            className="fixed bottom-20 right-4 sm:right-6 z-50 w-[calc(100vw-2rem)] sm:w-[380px] h-[500px] max-h-[75vh] bg-[#141414] border border-[#262626] rounded-2xl shadow-2xl flex flex-col overflow-hidden text-neutral-100"
          >
            {/* Header */}
            <div className="px-5 py-4 border-b border-[#262626] bg-neutral-950/80 flex items-center justify-between">
              <div className="flex items-center space-x-2.5">
                <div className="p-1.5 rounded-lg bg-neutral-900 border border-neutral-800 text-white">
                  <Bot size={16} />
                </div>
                <div>
                  <h4 className="text-sm font-bold text-white">Waleed&apos;s Assistant</h4>
                  <p className="text-[10px] text-neutral-400 font-mono">Grounded in verified portfolio data</p>
                </div>
              </div>
              <button
                type="button"
                onClick={() => setIsOpen(false)}
                className="p-1 text-neutral-400 hover:text-white rounded-full hover:bg-neutral-800 transition"
                aria-label="Close Chat"
              >
                <X size={18} />
              </button>
            </div>

            {/* Messages Area */}
            <div className="flex-1 overflow-y-auto p-4 space-y-3.5 text-xs">
              {messages.map((msg) => (
                <div
                  key={msg.id}
                  className={`flex ${msg.sender === "user" ? "justify-end" : "justify-start"}`}
                >
                  <div
                    className={`max-w-[85%] rounded-2xl px-4 py-2.5 leading-relaxed ${
                      msg.sender === "user"
                        ? "bg-white text-neutral-950 rounded-br-none font-medium"
                        : "bg-[#1C1C1C] text-neutral-200 border border-neutral-800/80 rounded-bl-none"
                    }`}
                  >
                    {msg.text.split("\\n").map((line, idx) => (
                      <p key={idx} className={idx > 0 ? "mt-1.5" : ""}>
                        {line}
                      </p>
                    ))}
                  </div>
                </div>
              ))}

              {isTyping && (
                <div className="flex justify-start">
                  <div className="bg-[#1C1C1C] border border-neutral-800/80 rounded-2xl px-4 py-2.5 rounded-bl-none text-neutral-400 text-xs flex items-center space-x-1.5">
                    <span className="w-1.5 h-1.5 rounded-full bg-neutral-400 animate-bounce" />
                    <span className="w-1.5 h-1.5 rounded-full bg-neutral-400 animate-bounce [animation-delay:0.2s]" />
                    <span className="w-1.5 h-1.5 rounded-full bg-neutral-400 animate-bounce [animation-delay:0.4s]" />
                  </div>
                </div>
              )}
              <div ref={messagesEndRef} />
            </div>

            {/* Quick Starter Chips */}
            <div className="px-4 py-2 border-t border-neutral-800/60 bg-neutral-950/40 flex flex-nowrap overflow-x-auto gap-1.5 no-scrollbar">
              {starterChips.map((chip) => (
                <button
                  key={chip}
                  type="button"
                  onClick={() => handleSendMessage(chip)}
                  className="whitespace-nowrap shrink-0 text-[10px] font-mono px-2.5 py-1 rounded-full bg-neutral-900 border border-neutral-800 text-neutral-400 hover:text-white hover:border-neutral-600 transition"
                >
                  {chip}
                </button>
              ))}
            </div>

            {/* Input Form */}
            <form
              onSubmit={(e) => {
                e.preventDefault();
                handleSendMessage(inputText);
              }}
              className="p-3 border-t border-[#262626] bg-[#141414] flex items-center space-x-2"
            >
              <input
                type="text"
                value={inputText}
                onChange={(e) => setInputText(e.target.value)}
                placeholder="Ask about Waleed's work..."
                className="flex-1 bg-neutral-900 border border-neutral-800 rounded-xl px-3.5 py-2 text-xs text-white placeholder:text-neutral-500 focus:outline-none focus:border-neutral-500 transition"
              />
              <button
                type="submit"
                disabled={!inputText.trim() || isTyping}
                className="p-2 bg-white text-neutral-950 rounded-xl hover:bg-neutral-200 transition disabled:opacity-40 disabled:cursor-not-allowed"
                aria-label="Send Message"
              >
                <Send size={14} />
              </button>
            </form>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
