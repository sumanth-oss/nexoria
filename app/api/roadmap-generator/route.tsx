import { inngest } from '@/inngest/client';
import { currentUser } from '@clerk/nextjs/server';
import { NextRequest, NextResponse } from 'next/server';
import { db } from '@/configs/db';
import { HistoryTable } from '@/configs/schema';
import { roadmapRequestSchema } from '@/lib/validations';

export async function POST(req: NextRequest) {
  try {
    const user = await currentUser();
    const userEmail = user?.primaryEmailAddress?.emailAddress;

    if (!userEmail) {
      return NextResponse.json({ error: 'User email required' }, { status: 401 });
    }

    const body = await req.json();
    const validated = roadmapRequestSchema.parse(body);

    await db.insert(HistoryTable).values({
      recordId: validated.roadMapId,
      content: {},
      aiAgentType: '/tools/roadmap-generator',
      userEmail,
      createdAt: new Date().toISOString(),
    });

    await inngest.send({
      name: 'AiRoadMapAgent',
      data: {
        userInput: validated.userInput,
        roadMapId: validated.roadMapId,
        userEmail,
      },
    });

    return NextResponse.json({ success: true });
  } catch (error: any) {
    if (error.name === 'ZodError') {
      return NextResponse.json(
        { error: 'Invalid request data', details: error.errors },
        { status: 400 }
      );
    }
    console.error('Error in POST handler:', error.message || error);
    return NextResponse.json(
      { error: 'Internal Server Error' },
      { status: 500 }
    );
  }
}
