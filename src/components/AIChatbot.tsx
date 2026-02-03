/**
 * AIChatbot.tsx
 * 
 * AI Tutor Assistant - A floating chat widget that provides an interactive
 * AI-powered learning companion for the platform.
 * 
 * Features:
 * - Floating toggle button (bottom-right corner)
 * - Streaming responses from the AI backend
 * - Markdown rendering with syntax-highlighted code blocks
 * - Copy code functionality
 * - Conversation history (last 10 messages for context)
 * - Quick-start suggestion badges
 * - Client-side rate limiting and abuse prevention
 * 
 * Backend: Uses Supabase Edge Function (ai-assistant) for AI responses
 * 
 * @see supabase/functions/ai-assistant/index.ts - Backend handler
 */

import { useState, useRef, useEffect, useCallback } from "react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import { 
  MessageCircle, 
  X, 
  Send, 
  Bot, 
  User, 
  Loader2, 
  Sparkles,
  Copy,
  Check,
  Trash2
} from "lucide-react";
import ReactMarkdown from "react-markdown";
import { toast } from "sonner";

// ============================================================================
// CLIENT-SIDE RATE LIMITING
// ============================================================================

const CLIENT_RATE_LIMIT = 10; // Max requests per window (matches server)
const CLIENT_RATE_WINDOW_MS = 60000; // 1 minute window
const COOLDOWN_AFTER_ERROR_MS = 5000; // Wait 5 seconds after errors

interface RateLimitState {
  requestCount: number;
  windowStart: number;
  lastError: number;
}

/**
 * Check if a request is allowed based on client-side rate limiting
 */
function checkClientRateLimit(state: RateLimitState): {
  allowed: boolean;
  remaining: number;
  waitTime?: number;
} {
  const now = Date.now();
  
  // Check if we're in cooldown after an error
  if (state.lastError && now - state.lastError < COOLDOWN_AFTER_ERROR_MS) {
    return { 
      allowed: false, 
      remaining: 0, 
      waitTime: COOLDOWN_AFTER_ERROR_MS - (now - state.lastError) 
    };
  }
  
  // Check if window has expired
  if (now - state.windowStart > CLIENT_RATE_WINDOW_MS) {
    return { allowed: true, remaining: CLIENT_RATE_LIMIT - 1 };
  }
  
  // Check if limit exceeded
  if (state.requestCount >= CLIENT_RATE_LIMIT) {
    const waitTime = CLIENT_RATE_WINDOW_MS - (now - state.windowStart);
    return { allowed: false, remaining: 0, waitTime };
  }
  
  return { allowed: true, remaining: CLIENT_RATE_LIMIT - state.requestCount - 1 };
}

// ============================================================================
// MESSAGE TYPES
// ============================================================================

interface Message {
  role: "user" | "assistant";
  content: string;
}

// ============================================================================
// MAIN COMPONENT
// ============================================================================

export const AIChatbot = () => {
  // UI state
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [copiedIndex, setCopiedIndex] = useState<number | null>(null);
  
  // Rate limiting state
  const [rateLimit, setRateLimit] = useState<RateLimitState>({
    requestCount: 0,
    windowStart: Date.now(),
    lastError: 0,
  });
  
  // Refs for auto-scroll and focus management
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLTextAreaElement>(null);

  /**
   * Auto-scroll to bottom when new messages arrive
   */
  const scrollToBottom = useCallback(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, []);

  useEffect(() => {
    scrollToBottom();
  }, [messages, scrollToBottom]);

  /**
   * Focus input when chat opens
   */
  useEffect(() => {
    if (isOpen && inputRef.current) {
      inputRef.current.focus();
    }
  }, [isOpen]);

  /**
   * Copy code block to clipboard with visual feedback
   */
  const handleCopyCode = async (code: string, index: number) => {
    await navigator.clipboard.writeText(code);
    setCopiedIndex(index);
    setTimeout(() => setCopiedIndex(null), 2000);
  };

  /**
   * Clear all chat messages
   */
  const handleClearChat = () => {
    setMessages([]);
    toast.success("Chat cleared");
  };

  /**
   * Update rate limit state after a request
   */
  const updateRateLimitState = useCallback((error?: boolean) => {
    setRateLimit(prev => {
      const now = Date.now();
      
      // Reset window if expired
      if (now - prev.windowStart > CLIENT_RATE_WINDOW_MS) {
        return {
          requestCount: 1,
          windowStart: now,
          lastError: error ? now : 0,
        };
      }
      
      // Update count within window
      return {
        ...prev,
        requestCount: prev.requestCount + 1,
        lastError: error ? now : prev.lastError,
      };
    });
  }, []);

  /**
   * Send message to AI backend and stream response
   * 
   * Flow:
   * 1. Check client-side rate limit
   * 2. Add user message to state
   * 3. Call Edge Function with message + conversation history
   * 4. Stream response chunks and update assistant message in real-time
   */
  const handleSend = async () => {
    const trimmedInput = input.trim();
    
    // Basic validation
    if (!trimmedInput || isLoading) return;
    
    // Input length validation (matches server limit of 2000)
    if (trimmedInput.length > 2000) {
      toast.error("Message too long. Please keep it under 2000 characters.");
      return;
    }

    // Client-side rate limit check
    const rateLimitCheck = checkClientRateLimit(rateLimit);
    if (!rateLimitCheck.allowed) {
      const waitSeconds = Math.ceil((rateLimitCheck.waitTime || 0) / 1000);
      toast.error(`Please wait ${waitSeconds} seconds before sending another message.`);
      return;
    }

    const userMessage: Message = { role: "user", content: trimmedInput };
    setMessages(prev => [...prev, userMessage]);
    setInput("");
    setIsLoading(true);

    let assistantContent = "";

    try {
      updateRateLimitState(false);
      
      // Call Supabase Edge Function
      const response = await fetch(
        `${import.meta.env.VITE_SUPABASE_URL}/functions/v1/ai-assistant`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${import.meta.env.VITE_SUPABASE_PUBLISHABLE_KEY}`,
            // Include standard browser headers for bot detection
            "Accept": "application/json, text/event-stream",
            "Accept-Language": navigator.language || "en-US",
          },
          body: JSON.stringify({
            messages: [userMessage],
            conversationHistory: messages.slice(-10), // Keep last 10 messages for context
          }),
        }
      );

      // Handle rate limiting response from server
      if (response.status === 429) {
        const retryAfter = response.headers.get("Retry-After");
        const waitSeconds = retryAfter ? parseInt(retryAfter, 10) : 60;
        
        // Update local rate limit state to match server
        setRateLimit(prev => ({
          ...prev,
          requestCount: CLIENT_RATE_LIMIT,
          lastError: Date.now(),
        }));
        
        throw new Error(`Rate limited. Please wait ${waitSeconds} seconds.`);
      }

      if (response.status === 403) {
        throw new Error("Request blocked. Please try again from a regular browser.");
      }

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || "Failed to get response");
      }

      // Set up streaming response reader
      const reader = response.body?.getReader();
      const decoder = new TextDecoder();

      if (!reader) {
        throw new Error("No response body");
      }

      // Add empty assistant message to update as stream comes in
      setMessages(prev => [...prev, { role: "assistant", content: "" }]);

      let buffer = "";

      // Process streaming chunks
      while (true) {
        const { done, value } = await reader.read();
        if (done) break;

        buffer += decoder.decode(value, { stream: true });

        // Process complete lines (SSE format)
        let newlineIndex: number;
        while ((newlineIndex = buffer.indexOf("\n")) !== -1) {
          let line = buffer.slice(0, newlineIndex);
          buffer = buffer.slice(newlineIndex + 1);

          if (line.endsWith("\r")) line = line.slice(0, -1);
          if (line.startsWith(":") || line.trim() === "") continue;
          if (!line.startsWith("data: ")) continue;

          const jsonStr = line.slice(6).trim();
          if (jsonStr === "[DONE]") break;

          try {
            const parsed = JSON.parse(jsonStr);
            const content = parsed.choices?.[0]?.delta?.content;
            if (content) {
              assistantContent += content;
              // Update the last message (assistant's response) with new content
              setMessages(prev => {
                const updated = [...prev];
                if (updated[updated.length - 1]?.role === "assistant") {
                  updated[updated.length - 1].content = assistantContent;
                }
                return updated;
              });
            }
          } catch {
            // Incomplete JSON, put back in buffer for next iteration
            buffer = line + "\n" + buffer;
            break;
          }
        }
      }
    } catch (error) {
      console.error("Chat error:", error);
      
      // Update rate limit state on error
      updateRateLimitState(true);
      
      toast.error(error instanceof Error ? error.message : "Failed to get AI response");
      
      // Remove the empty assistant message if there was an error
      setMessages(prev => {
        if (prev[prev.length - 1]?.role === "assistant" && prev[prev.length - 1]?.content === "") {
          return prev.slice(0, -1);
        }
        return prev;
      });
    } finally {
      setIsLoading(false);
    }
  };

  /**
   * Handle keyboard shortcuts (Enter to send, Shift+Enter for newline)
   */
  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  // Calculate remaining requests for UI feedback
  const rateLimitCheck = checkClientRateLimit(rateLimit);

  return (
    <>
      {/* Floating Chat Toggle Button */}
      <Button
        onClick={() => setIsOpen(true)}
        className={`fixed bottom-6 right-6 z-50 w-14 h-14 rounded-full shadow-lg bg-primary hover:bg-primary/90 ${isOpen ? 'hidden' : ''}`}
        size="icon"
      >
        <MessageCircle className="w-6 h-6" />
      </Button>

      {/* Chat Window Panel */}
      {isOpen && (
        <div className="fixed bottom-6 right-6 z-50 w-[400px] h-[600px] max-h-[80vh] bg-background border border-border rounded-2xl shadow-2xl flex flex-col overflow-hidden">
          {/* Header */}
          <div className="flex items-center justify-between px-4 py-3 bg-secondary/50 border-b border-border">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-full bg-primary/20 flex items-center justify-center">
                <Sparkles className="w-4 h-4 text-primary" />
              </div>
              <div>
                <h3 className="font-semibold text-sm text-foreground">AI Academy Assistant</h3>
                <p className="text-xs text-muted-foreground">Your AI learning companion</p>
              </div>
            </div>
            <div className="flex items-center gap-1">
              <Button
                variant="ghost"
                size="icon"
                className="h-8 w-8"
                onClick={handleClearChat}
                title="Clear chat"
              >
                <Trash2 className="w-4 h-4" />
              </Button>
              <Button
                variant="ghost"
                size="icon"
                className="h-8 w-8"
                onClick={() => setIsOpen(false)}
              >
                <X className="w-4 h-4" />
              </Button>
            </div>
          </div>

          {/* Messages Area */}
          <div className="flex-1 overflow-y-auto p-4 space-y-4">
            {/* Empty state with suggestions */}
            {messages.length === 0 && (
              <div className="text-center py-8">
                <Bot className="w-12 h-12 mx-auto text-muted-foreground/50 mb-3" />
                <h4 className="font-medium text-foreground mb-1">Welcome to AI Academy!</h4>
                <p className="text-sm text-muted-foreground mb-4">
                  I'm here to help you learn AI concepts. Ask me anything!
                </p>
                <div className="space-y-2">
                  <Badge 
                    variant="secondary" 
                    className="cursor-pointer hover:bg-secondary"
                    onClick={() => setInput("What module should I start with?")}
                  >
                    What module should I start with?
                  </Badge>
                  <Badge 
                    variant="secondary" 
                    className="cursor-pointer hover:bg-secondary ml-2"
                    onClick={() => setInput("Explain neural networks simply")}
                  >
                    Explain neural networks simply
                  </Badge>
                  <Badge 
                    variant="secondary" 
                    className="cursor-pointer hover:bg-secondary"
                    onClick={() => setInput("Show me Python ML code example")}
                  >
                    Show me Python ML code
                  </Badge>
                </div>
              </div>
            )}

            {/* Message list */}
            {messages.map((message, index) => (
              <div
                key={index}
                className={`flex gap-3 ${message.role === "user" ? "flex-row-reverse" : ""}`}
              >
                {/* Avatar */}
                <div className={`w-7 h-7 rounded-full flex items-center justify-center shrink-0 ${
                  message.role === "user" 
                    ? "bg-primary/20" 
                    : "bg-accent/20"
                }`}>
                  {message.role === "user" ? (
                    <User className="w-4 h-4 text-primary" />
                  ) : (
                    <Bot className="w-4 h-4 text-accent" />
                  )}
                </div>
                
                {/* Message bubble */}
                <div className={`max-w-[80%] ${message.role === "user" ? "text-right" : ""}`}>
                  <div className={`rounded-2xl px-4 py-2 ${
                    message.role === "user"
                      ? "bg-primary text-primary-foreground"
                      : "bg-secondary/50"
                  }`}>
                    {message.role === "assistant" ? (
                      // Render assistant messages as Markdown
                      <div className="prose prose-sm dark:prose-invert max-w-none">
                        {/* Show typing indicator when streaming and content is empty or very short */}
                        {isLoading && index === messages.length - 1 && message.content.length < 3 ? (
                          <div className="flex items-center gap-2 py-1">
                            <div className="flex gap-1">
                              <span className="w-2 h-2 bg-muted-foreground/60 rounded-full animate-bounce" style={{ animationDelay: "0ms" }} />
                              <span className="w-2 h-2 bg-muted-foreground/60 rounded-full animate-bounce" style={{ animationDelay: "150ms" }} />
                              <span className="w-2 h-2 bg-muted-foreground/60 rounded-full animate-bounce" style={{ animationDelay: "300ms" }} />
                            </div>
                            <span className="text-xs text-muted-foreground">Thinking...</span>
                          </div>
                        ) : (
                          <ReactMarkdown
                            components={{
                              // Custom code block renderer with copy button
                              code({ className, children, ...props }) {
                                const isInline = !className;
                                const code = String(children).replace(/\n$/, "");
                                
                                if (isInline) {
                                  return (
                                    <code className="bg-background/50 px-1 py-0.5 rounded text-xs" {...props}>
                                      {children}
                                    </code>
                                  );
                                }
                                
                                return (
                                  <div className="relative my-2">
                                    <pre className="bg-background/80 rounded-lg p-3 overflow-x-auto text-xs">
                                      <code {...props}>{children}</code>
                                    </pre>
                                    <Button
                                      variant="ghost"
                                      size="icon"
                                      className="absolute top-1 right-1 h-6 w-6"
                                      onClick={() => handleCopyCode(code, index)}
                                    >
                                      {copiedIndex === index ? (
                                        <Check className="w-3 h-3 text-success" />
                                      ) : (
                                        <Copy className="w-3 h-3" />
                                      )}
                                    </Button>
                                  </div>
                                );
                              },
                            }}
                          >
                            {message.content}
                          </ReactMarkdown>
                        )}
                        {/* Show rotating spinner at the end while still loading */}
                        {isLoading && index === messages.length - 1 && message.content.length >= 3 && (
                          <span className="inline-flex items-center ml-1 align-middle">
                            <Loader2 className="w-3 h-3 animate-spin text-primary" />
                          </span>
                        )}
                      </div>
                    ) : (
                      <p className="text-sm">{message.content}</p>
                    )}
                  </div>
                </div>
              </div>
            ))}

            {/* Loading indicator */}
            {isLoading && messages[messages.length - 1]?.role !== "assistant" && (
              <div className="flex gap-3">
                <div className="w-7 h-7 rounded-full bg-accent/20 flex items-center justify-center">
                  <Bot className="w-4 h-4 text-accent" />
                </div>
                <div className="bg-secondary/50 rounded-2xl px-4 py-2">
                  <Loader2 className="w-4 h-4 animate-spin text-muted-foreground" />
                </div>
              </div>
            )}

            {/* Auto-scroll anchor */}
            <div ref={messagesEndRef} />
          </div>

          {/* Input Area */}
          <div className="p-3 border-t border-border bg-background">
            <div className="flex gap-2">
              <Textarea
                ref={inputRef}
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={handleKeyDown}
                placeholder="Ask about AI concepts, modules, or code..."
                className="min-h-[44px] max-h-[120px] resize-none text-sm"
                rows={1}
                maxLength={2000}
              />
              <Button
                onClick={handleSend}
                disabled={!input.trim() || isLoading || !rateLimitCheck.allowed}
                size="icon"
                className="shrink-0"
                title={!rateLimitCheck.allowed ? "Rate limited - please wait" : "Send message"}
              >
                <Send className="w-4 h-4" />
              </Button>
            </div>
            <div className="flex justify-between items-center mt-2">
              <p className="text-xs text-muted-foreground">
                Press Enter to send, Shift+Enter for new line
              </p>
              {/* Character count indicator */}
              {input.length > 1500 && (
                <p className={`text-xs ${input.length > 1900 ? 'text-destructive' : 'text-muted-foreground'}`}>
                  {input.length}/2000
                </p>
              )}
            </div>
          </div>
        </div>
      )}
    </>
  );
};
