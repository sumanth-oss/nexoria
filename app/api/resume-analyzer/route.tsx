import { NextRequest, NextResponse } from 'next/server';
import { inngest } from '@/inngest/client';
import { currentUser } from '@clerk/nextjs/server';
import pdf from 'pdf-parse';
import { db } from '@/configs/db';
import { HistoryTable, usersTable } from '@/configs/schema';
import { eq } from 'drizzle-orm';

export async function POST(req: NextRequest) {
  try {
    const formData = await req.formData();
    const resumeFile = formData.get('resumeFile') as File;
    const recordId = formData.get('recordId') as string;
    const user = await currentUser();

    if (!resumeFile || !recordId) {
      return NextResponse.json({ error: 'Invalid request' }, { status: 400 });
    }

    const userEmail = user?.primaryEmailAddress?.emailAddress;
    if (!userEmail) {
      return NextResponse.json({ error: 'User email required' }, { status: 401 });
    }

    const existingUser = await db
      .select()
      .from(usersTable)
      .where(eq(usersTable.email, userEmail));

    if (!existingUser.length) {
      await db.insert(usersTable).values({
        email: userEmail,
        name: user.fullName || 'User',
      });
    }

    const buffer = Buffer.from(await resumeFile.arrayBuffer());
    const parsed = await pdf(buffer);

    if (!parsed.text?.trim()) {
      return NextResponse.json(
        { error: 'Unable to read PDF text' },
        { status: 400 }
      );
    }

    await db.insert(HistoryTable).values({
      recordId,
      content: {},
      aiAgentType: '/tools/resume-analyzer',
      userEmail,
      createdAt: new Date().toISOString(),
    });

    await inngest.send({
      name: 'AiResumeAnalyzer',
      data: {
        recordId,
        pdfText: parsed.text,
        base64ResumeFile: buffer.toString('base64'),
        aiAgentType: '/tools/resume-analyzer',
        userEmail,
      },
    });

    return NextResponse.json({ success: true });
  } catch (err) {
    console.error(err);
    return NextResponse.json({ error: 'Server error' }, { status: 500 });
  }
}
