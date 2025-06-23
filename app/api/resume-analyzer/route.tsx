import { NextRequest, NextResponse } from 'next/server';
import { WebPDFLoader } from '@langchain/community/document_loaders/web/pdf';
import { inngest } from '@/inngest/client';
import { currentUser } from '@clerk/nextjs/server';
import { getRuns } from '@/lib/inngest/getRuns'; // ✅ IMPORT instead of defining

export async function POST(req: NextRequest) {
  const FormData = await req.formData();
  const resumeFile: any = FormData.get('resumeFile');
  const recordId = FormData.get('recordId');
  const user = await currentUser();

  const loader = new WebPDFLoader(resumeFile);
  const docs = await loader.load();

  const arrayBuffer = await resumeFile.arrayBuffer();
  const base64 = Buffer.from(arrayBuffer).toString('base64');

  try {
    const result = await inngest.send({
      name: 'AiResumeAnalyzer',
      data: {
        recordId,
        base64ResumeFile: base64,
        pdfText: docs[0]?.pageContent,
        aiAgentType: '/tools/resume-analyzer',
        // @ts-ignore
        userEmail: user.primaryEmailAddress?.emailAddress,
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
