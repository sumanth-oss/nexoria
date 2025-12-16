import { inngest } from '@/inngest/client';
import { NextResponse } from 'next/server';

export async function POST(req: Request) {
  const { userInput, chatId } = await req.json();

  await inngest.send({
    name: 'ai/career.chat',
    data: { userInput, chatId },
  });

 
  return NextResponse.json({ ok: true });
}
