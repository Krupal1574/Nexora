import { createOpenAI } from '@ai-sdk/openai';
import { createGroq } from '@ai-sdk/groq';
import { streamText, convertToModelMessages } from 'ai';
import { NextRequest, NextResponse } from 'next/server';
import { checkBotId } from 'botid/server';

// ─── Providers ────────────────────────────────────────────────────────────────
// Primary: Vercel AI Gateway (OpenAI-compatible)
const aiGateway = createOpenAI({
  apiKey: process.env.AI_GATEWAY_API_KEY,
  baseURL: process.env.AI_GATEWAY_BASE_URL || 'https://ai-gateway.vercel.sh/v1',
});

// Secondary: AgentRouter (OpenAI-compatible)
const agentRouter = createOpenAI({
  apiKey: process.env.AGENTROUTER_API_KEY,
  baseURL: process.env.AGENTROUTER_BASE_URL || 'https://agentrouter.org/v1',
});

// Tertiary: Groq
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
  
  const verification = await checkBotId();
  if (verification.isBot) {
    return NextResponse.json(
      { error: 'Bot detected. Access denied.' },
      { status: 403 }
    );
  }

  if (!checkRateLimit(ip)) {
    return NextResponse.json(
      { error: 'Too many requests. Please wait a moment.' },
      { status: 429 }
    );
  }

  const hasGateway = !!process.env.AI_GATEWAY_API_KEY;
  const hasAgentRouter = !!process.env.AGENTROUTER_API_KEY;
  const hasGroq = !!process.env.GROQ_API_KEY;

  if (!hasGateway && !hasAgentRouter && !hasGroq) {
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

    // Build priority provider sequence: Vercel AI Gateway -> AgentRouter -> Groq
    const providers = [];
    if (hasGateway) {
      providers.push({
        name: 'Vercel AI Gateway',
        model: aiGateway('openai/gpt-4o-mini'),
      });
    }
    if (hasAgentRouter) {
      providers.push({
        name: 'AgentRouter',
        model: agentRouter('gpt-4o-mini'),
      });
    }
    if (hasGroq) {
      providers.push({
        name: 'Groq',
        model: groq('groq/compound-mini'),
      });
    }

    let lastError: any = null;

    for (const provider of providers) {
      try {
        const result = streamText({
          model: provider.model,
          maxOutputTokens: 4096,
          system: SYSTEM_PROMPT,
          messages: modelMessages,
          onError({ error }) {
            console.error(`Stream error on ${provider.name}:`, error);
          },
          experimental_telemetry: {
            isEnabled: true,
            functionId: 'nexora-chat',
            recordInputs: false,
            recordOutputs: false,
          },
        });

        return result.toUIMessageStreamResponse();
      } catch (err: any) {
        console.warn(`Provider ${provider.name} failed, falling back to next...`, err);
        lastError = err;
      }
    }

    return NextResponse.json(
      { error: lastError?.message || 'AI service temporarily unavailable. Please try again.' },
      { status: 500 }
    );
  } catch (error: any) {
    console.error('Chat API error:', error);
    return NextResponse.json(
      { error: error.message || 'Something went wrong. Please try again.' },
      { status: 500 }
    );
  }
}

