import { inngest } from '@/inngest/client';
import { currentUser } from '@clerk/nextjs/server';
import { getRuns } from '@/lib/inngest/getRuns'; // ✅ Import here
import { NextRequest, NextResponse } from 'next/server';

export async function POST(req: NextRequest) {
  const { roadMapId, userInput } = await req.json();
  const user = await currentUser();

  try {
    const result = await inngest.send({
      name: 'AiRoadMapAgent',
      data: {
        userInput,
        roadMapId,
        userEmail: user?.primaryEmailAddress?.emailAddress,
      },
    });

    const runId = result.ids?.[0];
    if (!runId) {
      return NextResponse.json(
        { error: 'Event ID not found' },
        { status: 500 }
      );
    }

    let runStatus;
    while (true) {
      runStatus = await getRuns(runId);
      const status = runStatus?.data?.[0]?.status;

      if (status === 'Completed') break;
      if (status === 'Failed') {
        return NextResponse.json(
          { error: 'Function failed to complete' },
          { status: 500 }
        );
      }

      await new Promise((resolve) => setTimeout(resolve, 500));
    }

    return NextResponse.json(
      runStatus.data?.[0]?.output?.result?.output?.[0] || 'No response'
    );
  } catch (err: any) {
    console.error('Error in POST handler:', err.message || err);
    return NextResponse.json(
      { error: 'Internal Server Error' },
      { status: 500 }
    );
  }
}
