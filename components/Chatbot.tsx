"use client";

import { useChat } from "@ai-sdk/react";
import { useState, useRef, useEffect, useCallback } from "react";
import Image from "next/image";
import { X, Send, Sparkles, RotateCcw, Minus } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

/* ─── Suggestion chips shown on welcome ─────────────────────────────────── */
const SUGGESTIONS = [
  "Tell me about Nexora",
  "What services do you offer?",
  "How can I get started?",
  "I have a question",
];

/* ─── Helper: extract text from UIMessage parts ─────────────────────────── */
function getMessageText(msg: { parts: Array<{ type: string; text?: string }> }): string {
  return msg.parts
    .filter((p): p is { type: "text"; text: string } => p.type === "text" && typeof p.text === "string")
    .map((p) => p.text)
    .join("");
}

/* ─── Helper: fallback responses ────────────────────────────────────────── */
function getFallbackResponse(input: string): string {
  const lower = input.toLowerCase();
  if (lower.match(/\b(hi|hello|hey|greetings)\b/)) {
    return "Hello! I'm Nexora AI. I'm currently operating in offline mode, but I'd be happy to help you find your way around! Are you looking for our services or jobs?";
  }
  if (lower.match(/\b(about|who are you|nexora)\b/)) {
    return "Nexora is a premier IT staffing and talent solutions firm. We specialize in connecting top technical talent with innovative companies. How can we assist you today?";
  }
  if (lower.match(/\b(services|offer|what do you do)\b/)) {
    return "We offer a range of services including career counseling, resume optimization, interview preparation, technical training, and comprehensive IT staffing solutions.";
  }
  if (lower.match(/\b(jobs|careers|hiring|recruitment|work)\b/)) {
    return "Looking for a new role or top talent? Our recruitment team specializes in IT staffing and would love to help. You can check our open roles on our careers page or contact us directly!";
  }
  if (lower.match(/\b(contact|recruiter|reach|talk)\b/)) {
    return "You can reach our recruitment team through the 'Contact Us' page on our website, or email us at info@nexorastaffingllp.com.";
  }
  if (lower.match(/\b(start|getting started|how to get started)\b/)) {
    return "Getting started is easy! If you're a candidate, you can submit your resume. If you're a company looking to hire, please reach out via our contact form and our staffing experts will get back to you.";
  }
  if (lower.match(/\b(thank you|thanks|thx)\b/)) {
    return "You're very welcome! If you need anything else, just ask.";
  }
  if (lower.match(/\b(bye|goodbye|see ya)\b/)) {
    return "Goodbye! Have a great day, and feel free to return if you need more help from Nexora.";
  }
  
  return "I'm having a little trouble connecting to my main server right now, but I can still point you in the right direction! Are you interested in our IT staffing services, finding a job, or contacting our team?";
}

/* ─── Main Chatbot Component ────────────────────────────────────────────── */
export function Chatbot() {
  const lastInputRef = useRef("");
  
  const { messages, sendMessage, status, setMessages } = useChat({
    onError: (err) => {
      console.warn("AI API Error, falling back to local response:", err);
      // Ensure the error state is cleared so it doesn't block the UI
      setError(null);
      
      // Provide a realistic typing delay for the fallback
      setTimeout(() => {
        const fallbackText = getFallbackResponse(lastInputRef.current);
        setMessages((msgs) => [
          ...msgs,
          {
            id: `fallback-${Date.now()}`,
            role: "assistant",
            content: fallbackText,
            parts: [{ type: "text", text: fallbackText }],
          },
        ]);
      }, 600);
    },
  });

  const [isOpen, setIsOpen] = useState(false);
  const [input, setInput] = useState("");
  const [error, setError] = useState<string | null>(null);

  const messagesEndRef = useRef<HTMLDivElement>(null);
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  const isStreaming = status === "streaming" || status === "submitted";

  /* ── Auto-scroll ────────────────────────────────────────────────────── */
  const scrollToBottom = useCallback(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, []);

  useEffect(() => {
    scrollToBottom();
  }, [messages, isStreaming, scrollToBottom]);

  /* ── Auto-focus input when opened ───────────────────────────────────── */
  useEffect(() => {
    if (isOpen) {
      setTimeout(() => textareaRef.current?.focus(), 150);
    }
  }, [isOpen]);

  /* ── Auto-resize textarea ───────────────────────────────────────────── */
  useEffect(() => {
    const ta = textareaRef.current;
    if (ta) {
      ta.style.height = "auto";
      ta.style.height = Math.min(ta.scrollHeight, 120) + "px";
    }
  }, [input]);

  /* ── Send a message ─────────────────────────────────────────────────── */
  const handleSend = useCallback(async () => {
    const trimmed = input.trim();
    if (!trimmed || isStreaming) return;

    setError(null);
    setInput("");
    lastInputRef.current = trimmed;

    // Reset textarea height
    if (textareaRef.current) {
      textareaRef.current.style.height = "auto";
    }

    try {
      await sendMessage({ text: trimmed });
    } catch {
      // Fallback is handled in onError
    }
  }, [input, isStreaming, sendMessage]);

  /* ── Send suggestion ────────────────────────────────────────────────── */
  const handleSuggestion = useCallback(async (text: string) => {
    if (isStreaming) return;
    setError(null);
    lastInputRef.current = text;
    try {
      await sendMessage({ text });
    } catch {
      // Fallback is handled in onError
    }
  }, [isStreaming, sendMessage]);

  /* ── Keyboard handler ───────────────────────────────────────────────── */
  const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  /* ── New chat ───────────────────────────────────────────────────────── */
  const handleNewChat = () => {
    setMessages([]);
    setError(null);
    setInput("");
  };

  const hasMessages = messages.length > 0;

  return (
    <>
      {/* ── Floating action button ──────────────────────────────────────── */}
      <AnimatePresence>
        {!isOpen && (
          <motion.button
            initial={{ scale: 0, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0, opacity: 0 }}
            transition={{ type: "spring", stiffness: 260, damping: 20 }}
            onClick={() => setIsOpen(true)}
            className="fixed bottom-6 right-6 z-50 flex h-14 w-14 items-center justify-center rounded-full shadow-lg shadow-cyan-500/30 transition-all duration-300 hover:shadow-cyan-500/50 hover:scale-105 active:scale-95 bg-transparent"
            aria-label="Open Nexora AI Chat"
          >
            <div className="relative h-14 w-14 drop-shadow-[0_0_8px_rgba(0,242,254,0.6)]">
              <Image 
                src="/images/nexora-robot.png" 
                alt="Nexora AI Mascot" 
                fill 
                className="object-contain drop-shadow-md"
              />
            </div>
            {/* Online dot */}
            <span className="absolute -top-0.5 -right-0.5 h-3.5 w-3.5 rounded-full border-2 border-[#0B0F19] bg-emerald-400" />
          </motion.button>
        )}
      </AnimatePresence>

      {/* ── Chat window ─────────────────────────────────────────────────── */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 24, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 24, scale: 0.95 }}
            transition={{ type: "spring", stiffness: 300, damping: 28 }}
            className="fixed bottom-6 right-6 z-50 flex flex-col overflow-hidden rounded-2xl border border-[#2d3748]/60 shadow-2xl shadow-black/40 backdrop-blur-sm
                       w-[calc(100vw-2rem)] max-w-[400px] h-[min(75vh,580px)]
                       sm:w-[400px]"
            style={{ background: "#121623" }}
          >
            {/* ── Header ──────────────────────────────────────────────────── */}
            <div
              className="flex items-center gap-3 px-4 py-3 border-b border-[#2d3748]/60"
              style={{
                background: "linear-gradient(135deg, rgba(0,210,196,.12) 0%, rgba(0,242,254,.06) 100%)",
              }}
            >
              {/* Avatar */}
              <div className="relative flex h-9 w-9 flex-shrink-0 items-center justify-center rounded-full drop-shadow-[0_0_5px_rgba(0,242,254,0.4)]">
                <Image 
                  src="/images/nexora-robot.png" 
                  alt="Nexora AI Avatar" 
                  fill 
                  className="object-contain"
                />
              </div>

              <div className="flex-1 min-w-0">
                <h3 className="text-sm font-semibold text-white leading-tight" style={{ fontFamily: "'Space Grotesk', system-ui, sans-serif" }}>
                  Nexora AI
                </h3>
                <div className="flex items-center gap-1.5">
                  <span className="h-1.5 w-1.5 rounded-full bg-emerald-400" />
                  <span className="text-[11px] text-[#94a3b8]">
                    {isStreaming ? "Typing…" : "Online"}
                  </span>
                </div>
              </div>

              <div className="flex items-center gap-1">
                {hasMessages && (
                  <button
                    onClick={handleNewChat}
                    className="rounded-lg p-1.5 text-[#94a3b8] transition-colors hover:bg-white/5 hover:text-white"
                    aria-label="New chat"
                    title="New chat"
                  >
                    <RotateCcw className="h-4 w-4" />
                  </button>
                )}
                <button
                  onClick={() => setIsOpen(false)}
                  className="rounded-lg p-1.5 text-[#94a3b8] transition-colors hover:bg-white/5 hover:text-white"
                  aria-label="Minimize chat"
                >
                  <Minus className="h-4 w-4" />
                </button>
                <button
                  onClick={() => setIsOpen(false)}
                  className="rounded-lg p-1.5 text-[#94a3b8] transition-colors hover:bg-white/5 hover:text-white"
                  aria-label="Close chat"
                >
                  <X className="h-4 w-4" />
                </button>
              </div>
            </div>

            {/* ── Messages area ───────────────────────────────────────────── */}
            <div
              className="flex-1 overflow-y-auto px-4 py-4 space-y-4"
              style={{
                scrollbarWidth: "thin",
                scrollbarColor: "#2d3748 transparent",
              }}
            >
              {/* Welcome state */}
              {!hasMessages && !isStreaming && (
                <motion.div
                  initial={{ opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.1 }}
                  className="flex flex-col items-center pt-4"
                >
                  {/* Large avatar */}
                  <div className="relative flex h-16 w-16 items-center justify-center rounded-full mb-4 drop-shadow-[0_0_12px_rgba(0,242,254,0.5)]">
                    <Image 
                      src="/images/nexora-robot.png" 
                      alt="Nexora AI Avatar Large" 
                      fill 
                      className="object-contain"
                    />
                  </div>

                  <h4
                    className="text-lg font-bold text-white mb-1"
                    style={{ fontFamily: "'Space Grotesk', system-ui, sans-serif" }}
                  >
                    Nexora AI
                  </h4>
                  <p className="text-sm text-[#94a3b8] text-center mb-6 px-4">
                    Hi! 👋 I&apos;m Nexora AI. How can I help you today?
                  </p>

                  {/* Suggestion chips */}
                  <div className="flex flex-wrap gap-2 justify-center px-2">
                    {SUGGESTIONS.map((s) => (
                      <button
                        key={s}
                        onClick={() => handleSuggestion(s)}
                        className="rounded-full border border-[#2d3748] bg-[#1a202c] px-3.5 py-2 text-xs text-[#94a3b8] transition-all hover:border-[#00d2c4]/50 hover:text-[#00f2fe] hover:bg-[#00d2c4]/5 active:scale-95"
                      >
                        {s}
                      </button>
                    ))}
                  </div>
                </motion.div>
              )}

              {/* Message bubbles */}
              {messages.map((msg, i) => {
                const isUser = msg.role === "user";
                const text = getMessageText(msg);
                if (!text) return null;

                return (
                  <motion.div
                    key={msg.id}
                    initial={{ opacity: 0, y: 6 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.2, delay: i === messages.length - 1 ? 0.05 : 0 }}
                    className={`flex gap-2.5 ${isUser ? "flex-row-reverse" : "flex-row"}`}
                  >
                    {/* Avatar (AI only) */}
                    {!isUser && (
                      <div className="relative flex h-7 w-7 flex-shrink-0 items-center justify-center rounded-full mt-0.5 drop-shadow-[0_0_4px_rgba(0,242,254,0.3)]">
                        <Image 
                          src="/images/nexora-robot.png" 
                          alt="Nexora AI Avatar" 
                          fill 
                          className="object-contain"
                        />
                      </div>
                    )}

                    {/* Bubble */}
                    <div
                      className={`max-w-[80%] rounded-2xl px-3.5 py-2.5 text-[13px] leading-relaxed whitespace-pre-wrap break-words ${
                        isUser
                          ? "rounded-br-md text-[#0B0F19]"
                          : "rounded-bl-md bg-[#1a202c] text-[#e2e8f0] border border-[#2d3748]/40"
                      }`}
                      style={
                        isUser
                          ? { background: "linear-gradient(135deg, #00d2c4 0%, #00f2fe 100%)" }
                          : undefined
                      }
                    >
                      {text}
                    </div>
                  </motion.div>
                );
              })}

              {/* Typing indicator */}
              {isStreaming && messages.length > 0 && messages[messages.length - 1]?.role === "user" && (
                <motion.div
                  initial={{ opacity: 0, y: 6 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="flex gap-2.5"
                >
                  <div
                    className="flex h-7 w-7 flex-shrink-0 items-center justify-center rounded-full mt-0.5"
                    style={{
                      background: "linear-gradient(135deg, #00d2c4 0%, #00f2fe 100%)",
                    }}
                  >
                    <Sparkles className="h-3.5 w-3.5 text-[#0B0F19]" />
                  </div>
                  <div className="rounded-2xl rounded-bl-md bg-[#1a202c] border border-[#2d3748]/40 px-4 py-3">
                    <div className="flex gap-1.5 items-center">
                      <span className="h-2 w-2 rounded-full bg-[#00d2c4] animate-bounce [animation-delay:0ms]" />
                      <span className="h-2 w-2 rounded-full bg-[#00d2c4] animate-bounce [animation-delay:150ms]" />
                      <span className="h-2 w-2 rounded-full bg-[#00d2c4] animate-bounce [animation-delay:300ms]" />
                    </div>
                  </div>
                </motion.div>
              )}

              {/* Error display */}
              {error && (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="mx-auto max-w-[90%] rounded-xl bg-red-500/10 border border-red-500/20 px-3.5 py-2.5 text-xs text-red-300 text-center"
                >
                  {error}
                </motion.div>
              )}

              <div ref={messagesEndRef} />
            </div>

            {/* ── Input area ──────────────────────────────────────────────── */}
            <div className="border-t border-[#2d3748]/60 px-3 py-3 bg-[#0f1320]">
              <div className="flex items-end gap-2 rounded-xl border border-[#2d3748]/60 bg-[#1a202c] px-3 py-2 transition-colors focus-within:border-[#00d2c4]/40">
                <textarea
                  ref={textareaRef}
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  onKeyDown={handleKeyDown}
                  placeholder="Ask Nexora AI anything..."
                  disabled={isStreaming}
                  rows={1}
                  className="flex-1 resize-none bg-transparent text-sm text-white placeholder-[#64748b] outline-none disabled:opacity-50"
                  style={{
                    maxHeight: "120px",
                    lineHeight: "1.5",
                    fontFamily: "'Inter', system-ui, sans-serif",
                  }}
                />
                <button
                  onClick={handleSend}
                  disabled={isStreaming || !input.trim()}
                  className="flex h-8 w-8 flex-shrink-0 items-center justify-center rounded-lg transition-all disabled:opacity-30 disabled:cursor-not-allowed hover:opacity-90 active:scale-90"
                  style={{
                    background:
                      !isStreaming && input.trim()
                        ? "linear-gradient(135deg, #00d2c4 0%, #00f2fe 100%)"
                        : "#2d3748",
                  }}
                  aria-label="Send message"
                >
                  <Send className="h-4 w-4 text-[#0B0F19]" />
                </button>
              </div>
              <p className="mt-1.5 text-center text-[10px] text-[#475569]">
                Powered by Gemini · Nexora AI may make mistakes
              </p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
