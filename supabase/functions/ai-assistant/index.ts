import { serve } from "https://deno.land/std@0.168.0/http/server.ts";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
};

// Input validation schemas using Zod-like manual validation
// Maximum lengths to prevent token exhaustion attacks
const MAX_MESSAGE_LENGTH = 4000;
const MAX_MESSAGES_PER_REQUEST = 1;
const MAX_CONVERSATION_HISTORY = 20;

interface ChatMessage {
  role: "user" | "assistant" | "system";
  content: string;
}

interface RequestBody {
  messages: ChatMessage[];
  conversationHistory?: ChatMessage[];
}

/**
 * Validates a single message object
 */
function validateMessage(msg: unknown, fieldName: string): { valid: boolean; error?: string; message?: ChatMessage } {
  if (!msg || typeof msg !== "object") {
    return { valid: false, error: `${fieldName}: must be an object` };
  }
  
  const msgObj = msg as Record<string, unknown>;
  
  if (!msgObj.role || !["user", "assistant", "system"].includes(msgObj.role as string)) {
    return { valid: false, error: `${fieldName}: role must be 'user', 'assistant', or 'system'` };
  }
  
  if (typeof msgObj.content !== "string") {
    return { valid: false, error: `${fieldName}: content must be a string` };
  }
  
  if (msgObj.content.length === 0) {
    return { valid: false, error: `${fieldName}: content cannot be empty` };
  }
  
  if (msgObj.content.length > MAX_MESSAGE_LENGTH) {
    return { valid: false, error: `${fieldName}: content exceeds maximum length of ${MAX_MESSAGE_LENGTH} characters` };
  }
  
  return { 
    valid: true, 
    message: { 
      role: msgObj.role as "user" | "assistant" | "system", 
      content: msgObj.content as string 
    } 
  };
}

/**
 * Validates the entire request body
 */
function validateRequest(body: unknown): { valid: boolean; error?: string; data?: RequestBody } {
  if (!body || typeof body !== "object") {
    return { valid: false, error: "Request body must be a valid JSON object" };
  }
  
  const bodyObj = body as Record<string, unknown>;
  
  // Validate messages array
  if (!Array.isArray(bodyObj.messages)) {
    return { valid: false, error: "messages must be an array" };
  }
  
  if (bodyObj.messages.length === 0) {
    return { valid: false, error: "messages array cannot be empty" };
  }
  
  if (bodyObj.messages.length > MAX_MESSAGES_PER_REQUEST) {
    return { valid: false, error: `messages array cannot exceed ${MAX_MESSAGES_PER_REQUEST} items` };
  }
  
  const validatedMessages: ChatMessage[] = [];
  for (let i = 0; i < bodyObj.messages.length; i++) {
    const result = validateMessage(bodyObj.messages[i], `messages[${i}]`);
    if (!result.valid) {
      return { valid: false, error: result.error };
    }
    validatedMessages.push(result.message!);
  }
  
  // Validate conversationHistory if present
  let validatedHistory: ChatMessage[] = [];
  if (bodyObj.conversationHistory !== undefined) {
    if (!Array.isArray(bodyObj.conversationHistory)) {
      return { valid: false, error: "conversationHistory must be an array" };
    }
    
    if (bodyObj.conversationHistory.length > MAX_CONVERSATION_HISTORY) {
      return { valid: false, error: `conversationHistory cannot exceed ${MAX_CONVERSATION_HISTORY} items` };
    }
    
    for (let i = 0; i < bodyObj.conversationHistory.length; i++) {
      const result = validateMessage(bodyObj.conversationHistory[i], `conversationHistory[${i}]`);
      if (!result.valid) {
        return { valid: false, error: result.error };
      }
      validatedHistory.push(result.message!);
    }
  }
  
  return {
    valid: true,
    data: {
      messages: validatedMessages,
      conversationHistory: validatedHistory.length > 0 ? validatedHistory : undefined
    }
  };
}

// AI Academy curriculum context for the assistant
const CURRICULUM_CONTEXT = `
You are the AI Academy Assistant, an expert AI tutor helping users learn about artificial intelligence and machine learning.

## Platform Modules:
1. **AI Fundamentals** (Module 1, ~8 min): What is AI, Types of AI, Machine Learning Basics, Neural Networks Intro
2. **Building ML Models** (Module 2, ~12 min): Data Collection, Data Preprocessing, Model Training, Model Evaluation
3. **Understanding LLMs** (Module 3, ~10 min): Tokenization, Transformers, Prompting, API Integration
4. **AI Infrastructure** (Module 4, ~10 min): Compute Requirements, GPU vs CPU, Cloud Services, Scaling Strategies
5. **AI Security & Testing** (Module 5, ~12 min): Security Threats, Stress Testing, Input Validation, Monitoring
6. **Real-World Integration** (Module 6, ~15 min): API Design, Wrappers & SDKs, Best Practices, Case Studies

## Your Capabilities:
- Explain AI/ML concepts in simple, beginner-friendly terms
- Recommend which module to study based on user's goals
- Provide code examples in Python, TypeScript, or other languages
- Suggest external learning resources (documentation, courses, tutorials)
- Answer questions about the platform's content
- Help debug and understand code snippets
- Guide users through hands-on exercises

## Guidelines:
- Be encouraging and patient with beginners
- Use analogies and real-world examples
- When providing code, make it runnable and well-commented
- If asked about something outside AI/ML, gently redirect to the topic
- Recommend specific modules when relevant to the user's question
- Format responses with markdown for readability
`;

serve(async (req) => {
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    // Parse and validate request body
    let rawBody: unknown;
    try {
      rawBody = await req.json();
    } catch {
      return new Response(JSON.stringify({ error: "Invalid JSON in request body" }), {
        status: 400,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }

    const validation = validateRequest(rawBody);
    if (!validation.valid) {
      console.log("Request validation failed:", validation.error);
      return new Response(JSON.stringify({ error: "Invalid request format" }), {
        status: 400,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }

    const { messages, conversationHistory } = validation.data!;
    const LOVABLE_API_KEY = Deno.env.get("LOVABLE_API_KEY");

    if (!LOVABLE_API_KEY) {
      console.error("LOVABLE_API_KEY is not configured");
      return new Response(JSON.stringify({ error: "Service configuration error" }), {
        status: 500,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }

    console.log("AI Assistant request received:", { messageCount: messages?.length });

    // Build conversation with context
    const systemMessage = {
      role: "system",
      content: CURRICULUM_CONTEXT
    };

    const allMessages = [
      systemMessage,
      ...(conversationHistory || []),
      ...messages
    ];

    const response = await fetch("https://ai.gateway.lovable.dev/v1/chat/completions", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${LOVABLE_API_KEY}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        model: "google/gemini-3-flash-preview",
        messages: allMessages,
        stream: true,
      }),
    });

    if (!response.ok) {
      const errorText = await response.text();
      console.error("AI gateway error:", response.status, errorText);
      
      if (response.status === 429) {
        return new Response(JSON.stringify({ error: "Rate limit exceeded. Please wait a moment and try again." }), {
          status: 429,
          headers: { ...corsHeaders, "Content-Type": "application/json" },
        });
      }
      if (response.status === 402) {
        return new Response(JSON.stringify({ error: "AI credits depleted. Please check your account." }), {
          status: 402,
          headers: { ...corsHeaders, "Content-Type": "application/json" },
        });
      }
      
      // Generic error message - don't expose internal details
      return new Response(JSON.stringify({ error: "AI service temporarily unavailable" }), {
        status: 500,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }

    console.log("AI gateway response received, streaming to client");

    return new Response(response.body, {
      headers: { ...corsHeaders, "Content-Type": "text/event-stream" },
    });
  } catch (e) {
    // Log detailed error server-side for debugging
    console.error("AI Assistant error:", e);
    
    // Return generic error message to client - don't expose internals
    return new Response(JSON.stringify({ 
      error: "Service temporarily unavailable" 
    }), {
      status: 500,
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  }
});
