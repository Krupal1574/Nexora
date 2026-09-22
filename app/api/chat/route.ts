import { createGroq } from '@ai-sdk/groq';
import { streamText, convertToModelMessages } from 'ai';
import { NextRequest, NextResponse } from 'next/server';

const groq = createGroq({
  apiKey: process.env.GROQ_API_KEY,
});

// Basic rate limiting map (IP -> timestamp)
const rateLimitMap = new Map<string, { count: number; resetTime: number }>();

function checkRateLimit(ip: string): boolean {
  const WINDOW_MS = 60 * 1000; // 1 minute
  const MAX_REQUESTS = 10; // 10 requests per minute

  const now = Date.now();
  const entry = rateLimitMap.get(ip);

  if (!entry || entry.resetTime < now) {
    rateLimitMap.set(ip, { count: 1, resetTime: now + WINDOW_MS });
    return true;
  }

  if (entry.count >= MAX_REQUESTS) {
    return false;
  }

  entry.count++;
  return true;
}

/**
 * Normalize raw messages coming from the client into valid UIMessage objects
 * that convertToModelMessages() can process. Handles:
 *  - Proper UIMessage format (with parts array) — passed through as-is
 *  - Legacy/fallback messages that only have a content string — converted
 *  - Anything else — dropped to prevent schema validation errors
 */
function normalizeToUIMessages(raw: any[]): any[] {
  return raw
    .filter((m) => m && (m.role === 'user' || m.role === 'assistant'))
    .map((m) => {
      // Already has a well-formed parts array — use directly
      if (Array.isArray(m.parts) && m.parts.length > 0) {
        return {
          id: m.id ?? `msg-${Date.now()}-${Math.random()}`,
          role: m.role,
          parts: m.parts,
        };
      }

      // Has a content string (e.g. legacy or fallback messages) — wrap in a text part
      if (typeof m.content === 'string' && m.content.trim()) {
        return {
          id: m.id ?? `msg-${Date.now()}-${Math.random()}`,
          role: m.role,
          parts: [{ type: 'text', text: m.content }],
        };
      }

      // Skip malformed messages
      return null;
    })
    .filter(Boolean);
}

export const maxDuration = 30;

export async function POST(req: NextRequest) {
  const ip = req.headers.get('x-forwarded-for') || 'unknown';
  if (!checkRateLimit(ip)) {
    return NextResponse.json(
      { error: 'Too many requests. Please wait a moment.' },
      { status: 429 }
    );
  }

  if (!process.env.GROQ_API_KEY) {
    return NextResponse.json(
      { error: 'AI service is not configured.' },
      { status: 500 }
    );
  }

  try {
    const body = await req.json();
    const rawMessages: any[] = Array.isArray(body.messages) ? body.messages : [];

    // Normalize UIMessage[] → clean UIMessage[] → ModelMessage[]
    const uiMessages = normalizeToUIMessages(rawMessages);

    if (uiMessages.length === 0) {
      return NextResponse.json(
        { error: 'No valid messages provided.' },
        { status: 400 }
      );
    }

    const modelMessages = await convertToModelMessages(uiMessages);

    const result = streamText({
      model: groq('groq/compound-mini'),
      maxOutputTokens: 4096,
      system: `You are Nexora AI, a helpful and knowledgeable assistant for Nexora — a premier IT staffing and talent solutions firm. You help visitors learn about Nexora's services including career counseling, resume optimization, interview preparation, technical training, and IT staffing solutions. Be friendly, professional, and concise. When you don't know something specific about Nexora, be honest but helpful.`,
      messages: modelMessages,
      experimental_telemetry: {
        isEnabled: true,
        functionId: "nexora-chat",
        recordInputs: false,
        recordOutputs: false,
      },
    });

    return result.toUIMessageStreamResponse();
  } catch (error: any) {
    console.error('Chat API error:', error);
    return NextResponse.json(
      { error: error.message || 'Something went wrong. Please try again.' },
      { status: 500 }
    );
  }
}
