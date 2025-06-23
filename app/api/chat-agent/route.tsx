import { inngest } from '@/inngest/client';
import axios from 'axios';
import { NextResponse } from 'next/server';

export async function POST(req: Request) {
  try {
    const { userInput } = await req.json();

    // Send event to Inngest
    const result = await inngest.send({
      name: 'ai/career.chat',
      data: {
        userInput: userInput,
      },
    });

    // Access the runId properly from returned object
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

      // wait 500ms before next check
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

// Get run status from Inngest
export async function getRuns(runId: string) {
  const url = `${process.env.INNGEST_SERVER_HOST}/v1/events/${runId}/runs`;

  const response = await axios.get(url, {
    headers: {
      Authorization: `Bearer ${process.env.INNGEST_SIGNING_KEY}`,
    },
  });

  return response.data;
}
