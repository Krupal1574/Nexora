import { createOpenAI } from '@ai-sdk/openai';
import { createGroq } from '@ai-sdk/groq';
import { streamText, convertToModelMessages } from 'ai';
import { NextRequest, NextResponse } from 'next/server';

// ─── Providers ────────────────────────────────────────────────────────────────
// Primary: AgentRouter (OpenAI-compatible)
const agentRouter = createOpenAI({
  apiKey: process.env.AGENTROUTER_API_KEY,
  baseURL: process.env.AGENTROUTER_BASE_URL || 'https://agentrouter.org/v1',
});

// Fallback: Groq
const groq = createGroq({
  apiKey: process.env.GROQ_API_KEY,
});

// ─── Rate Limiting ────────────────────────────────────────────────────────────
const rateLimitMap = new Map<string, { count: number; resetTime: number }>();

function checkRateLimit(ip: string): boolean {
  const WINDOW_MS = 60 * 1000; // 1 minute
  const MAX_REQUESTS = 10;

  const now = Date.now();
  const entry = rateLimitMap.get(ip);

  if (!entry || entry.resetTime < now) {
    rateLimitMap.set(ip, { count: 1, resetTime: now + WINDOW_MS });
    return true;
  }

  if (entry.count >= MAX_REQUESTS) return false;

  entry.count++;
  return true;
}

// ─── Message Normalizer ───────────────────────────────────────────────────────
function normalizeToUIMessages(raw: any[]): any[] {
  return raw
    .filter((m) => m && (m.role === 'user' || m.role === 'assistant'))
    .map((m) => {
      if (Array.isArray(m.parts) && m.parts.length > 0) {
        return {
          id: m.id ?? `msg-${Date.now()}-${Math.random()}`,
          role: m.role,
          parts: m.parts,
        };
      }

      if (typeof m.content === 'string' && m.content.trim()) {
        return {
          id: m.id ?? `msg-${Date.now()}-${Math.random()}`,
          role: m.role,
          parts: [{ type: 'text', text: m.content }],
        };
      }

      return null;
    })
    .filter(Boolean);
}

// ─── System Prompt ────────────────────────────────────────────────────────────
const SYSTEM_PROMPT = `You are Nexora AI, a helpful and knowledgeable assistant for Nexora — a premier IT staffing and talent solutions firm. You help visitors learn about Nexora's services including career counseling, resume optimization, interview preparation, technical training, and IT staffing solutions. Be friendly, professional, and concise. When you don't know something specific about Nexora, be honest but helpful.`;

export const maxDuration = 30;

export async function POST(req: NextRequest) {
  const ip = req.headers.get('x-forwarded-for') || 'unknown';
  if (!checkRateLimit(ip)) {
    return NextResponse.json(
      { error: 'Too many requests. Please wait a moment.' },
      { status: 429 }
    );
  }

  const hasAgentRouter = !!process.env.AGENTROUTER_API_KEY;
  const hasGroq = !!process.env.GROQ_API_KEY;

  if (!hasAgentRouter && !hasGroq) {
    return NextResponse.json(
      { error: 'AI service is not configured.' },
      { status: 500 }
    );
  }

  try {
    const body = await req.json();
    const rawMessages: any[] = Array.isArray(body.messages) ? body.messages : [];

    const uiMessages = normalizeToUIMessages(rawMessages);

    if (uiMessages.length === 0) {
      return NextResponse.json(
        { error: 'No valid messages provided.' },
        { status: 400 }
      );
    }

    const modelMessages = await convertToModelMessages(uiMessages);

    // Use AgentRouter as primary, Groq as fallback
    const model = hasAgentRouter
      ? agentRouter('gpt-4o-mini')
      : groq('groq/compound-mini');

    const result = streamText({
      model,
      maxOutputTokens: 4096,
      system: SYSTEM_PROMPT,
      messages: modelMessages,
      experimental_telemetry: {
        isEnabled: true,
        functionId: 'nexora-chat',
        recordInputs: false,
        recordOutputs: false,
      },
    });

    return result.toUIMessageStreamResponse();
  } catch (error: any) {
    console.error('Chat API error:', error);

    // If AgentRouter fails, try Groq as fallback
    if (process.env.GROQ_API_KEY) {
      try {
        const body = await req.clone().json().catch(() => ({}));
        const rawMessages: any[] = Array.isArray(body.messages) ? body.messages : [];
        const uiMessages = normalizeToUIMessages(rawMessages);
        const modelMessages = await convertToModelMessages(uiMessages);

        const result = streamText({
          model: groq('groq/compound-mini'),
          maxOutputTokens: 4096,
          system: SYSTEM_PROMPT,
          messages: modelMessages,
        });

        return result.toUIMessageStreamResponse();
      } catch (fallbackError: any) {
        console.error('Fallback chat error:', fallbackError);
      }
    }

    return NextResponse.json(
      { error: error.message || 'Something went wrong. Please try again.' },
      { status: 500 }
    );
  }
}

