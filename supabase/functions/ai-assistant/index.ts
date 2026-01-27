import { serve } from "https://deno.land/std@0.168.0/http/server.ts";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
};

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
    const { messages, conversationHistory } = await req.json();
    const LOVABLE_API_KEY = Deno.env.get("LOVABLE_API_KEY");

    if (!LOVABLE_API_KEY) {
      throw new Error("LOVABLE_API_KEY is not configured");
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
    console.error("AI Assistant error:", e);
    return new Response(JSON.stringify({ 
      error: e instanceof Error ? e.message : "Unknown error occurred" 
    }), {
      status: 500,
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  }
});
