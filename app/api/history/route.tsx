import { NextRequest, NextResponse } from 'next/server';
import { db } from '../../../configs/db';
import { HistoryTable } from '../../../configs/schema';
import { currentUser } from '@clerk/nextjs/server';
import { eq, desc } from 'drizzle-orm';

export async function POST(req: NextRequest) {
  const { content, recordId, aiAgentType } = await req.json();
  const user = await currentUser();
  const email = user?.primaryEmailAddress?.emailAddress;

  if (!recordId || !email) {
    return NextResponse.json(
      { error: 'Missing recordId or user' },
      { status: 400 }
    );
  }

  try {
    const result = await db.insert(HistoryTable).values({
      recordId,
      content,
      userEmail: email,
      createdAt: new Date().toISOString(),
      aiAgentType,
    });
    return NextResponse.json(result);
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error }, { status: 500 });
  }
}

export async function PUT(req: NextRequest) {
  const { content, recordId } = await req.json();

  if (!recordId) {
    return NextResponse.json({ error: 'Missing recordId' }, { status: 400 });
  }

  try {
    const result = await db
      .update(HistoryTable)
      .set({ content })
      .where(eq(HistoryTable.recordId, recordId));
    return NextResponse.json(result);
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error }, { status: 500 });
  }
}

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const recordId = searchParams.get('recordId');
  const user = await currentUser();

  try {
    if (recordId) {
      const result = await db
        .select()
        .from(HistoryTable)
        .where(eq(HistoryTable.recordId, recordId));
      return NextResponse.json(result[0] || { content: [] });
    } else if (user?.primaryEmailAddress?.emailAddress) {
      const email = user.primaryEmailAddress.emailAddress;

      const result = await db
        .select()
        .from(HistoryTable)
        .where(eq(HistoryTable.userEmail, email))
        .orderBy(desc(HistoryTable.id));

      return NextResponse.json(result || []);
    } else {
      return NextResponse.json(
        { error: 'User not authenticated or missing email' },
        { status: 401 }
      );
    }
  } catch (error) {
    console.error('GET history error:', error);
    return NextResponse.json({ error }, { status: 500 });
  }
}
