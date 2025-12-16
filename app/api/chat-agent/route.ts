import { inngest } from '@/inngest/client';
import { NextResponse } from 'next/server';
import { chatRequestSchema } from '@/lib/validations';

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const validated = chatRequestSchema.parse(body);

    await inngest.send({
      name: 'ai/career.chat',
      data: { userInput: validated.userInput, chatId: validated.chatId },
    });

    return NextResponse.json({ ok: true });
  } catch (error: any) {
    if (error.name === 'ZodError') {
      return NextResponse.json(
        { error: 'Invalid request data', details: error.errors },
        { status: 400 }
      );
    }
    console.error('Chat agent error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}
