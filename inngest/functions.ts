import { inngest } from './client';
import ImageKit from 'imagekit';
import { db } from '@/configs/db';
import { HistoryTable } from '@/configs/schema';
import { eq } from 'drizzle-orm';
import {
  aiCareerChatAgent,
  AiResumeAgent,
  AiRoadMapAgent,
} from './agents';

const imagekit = new ImageKit({
  publicKey: process.env.IMAGEKIT_PUBLIC_KEY || '',
  privateKey: process.env.IMAGEKIT_PRIVATE_KEY || '',
  urlEndpoint: process.env.IMAGEKIT_ENDPOINT_URL || '',
});

export const aiCareerChat = inngest.createFunction(
  { id: 'ai-career-chat', name: 'AI Career Chat' },
  { event: 'ai/career.chat' },
  async ({ event, step }) => {
    const { userInput, chatId } = event.data;

    const agentResult = await aiCareerChatAgent.run(userInput);

    const textMsg = agentResult.output?.find(m => m.type === 'text');

    const content =
      typeof textMsg?.content === 'string'
        ? textMsg.content
        : textMsg?.content?.map(c => c.text).join(' ') ?? '';

    const existing = await db
      .select()
      .from(HistoryTable)
      .where(eq(HistoryTable.recordId, chatId))
      .limit(1);

    const previousMessages = Array.isArray(existing[0]?.content)
      ? existing[0].content
      : [];

    const updatedMessages = [
  ...previousMessages,
  { content: userInput, role: 'user', type: 'text' },
  { content, role: 'assistant', type: 'text' },
];

    await step.run('save-chat-message', () =>
      db
        .update(HistoryTable)
        .set({ content: updatedMessages })
        .where(eq(HistoryTable.recordId, chatId))
    );

    return { ok: true };
  }
);

export const AiResumeAnalyzer = inngest.createFunction(
  { id: 'AiResumeAnalyzer', retries: 3 },
  { event: 'AiResumeAnalyzer' },
  async ({ event, step }) => {
    const { recordId, base64ResumeFile, pdfText, aiAgentType, userEmail } =
      event.data;

    const uploadUrl = await step.run('upload-resume', async () => {
      try {
        if (!process.env.IMAGEKIT_PUBLIC_KEY || !process.env.IMAGEKIT_PRIVATE_KEY) {
          console.warn('ImageKit credentials missing, skipping upload');
          return null;
        }
        const file = await imagekit.upload({
          file: base64ResumeFile,
          fileName: `${recordId}.pdf`,
          isPublished: true,
        });
        return file.url;
      } catch (error) {
        console.error('ImageKit upload failed:', error);
        return null;
      }
    });

    if (!pdfText?.trim()) {
      throw new Error('PDF text is empty or invalid');
    }
    const agentResult = await AiResumeAgent.run(pdfText);

    const textMsg = agentResult.output?.find(m => m.type === 'text');
    if (!textMsg) {
      throw new Error('No text message found in AI output');
    }

    let rawText = '';
    if (typeof textMsg.content === 'string') {
      rawText = textMsg.content;
    } else if (Array.isArray(textMsg.content)) {
      rawText = textMsg.content
        .map((c: any) => (typeof c === 'string' ? c : c?.text || ''))
        .join('');
    } else {
      throw new Error('Invalid content format in AI response');
    }

    const cleaned = rawText.replace(/```json|```/g, '').trim();
    if (!cleaned) {
      throw new Error('Empty response after cleaning');
    }

    let json: any;
    try {
      json = JSON.parse(cleaned);
    } catch (parseError) {
      console.error('JSON parse error. Raw text:', cleaned.substring(0, 500));
      throw new Error(
        `Failed to parse JSON: ${
          parseError instanceof Error ? parseError.message : 'Unknown error'
        }`
      );
    }

    if (!json.overall_score && typeof json.overall_score !== 'number') {
      throw new Error('Invalid JSON structure: missing overall_score');
    }

    await step.run('save-result', async () => {
      await db
        .update(HistoryTable)
        .set({
          content: json,
          metaData: uploadUrl,
          aiAgentType,
          userEmail,
          createdAt: new Date().toISOString(),
        })
        .where(eq(HistoryTable.recordId, recordId));
    });

    return { success: true, recordId };
  }
);

export const AiRoadMapInngestFunction = inngest.createFunction(
  { id: 'AiRoadMapAgent' },
  { event: 'AiRoadMapAgent' },
  async ({ event, step }) => {
    const { roadMapId, userInput, userEmail } = event.data;

   const agentResult = await AiRoadMapAgent.run(userInput);

    const textMsg = agentResult.output?.find(m => m.type === 'text');
    if (!textMsg || typeof textMsg.content !== 'string') {
      throw new Error('Invalid roadmap agent output');
    }

    const json = JSON.parse(
      textMsg.content.replace(/```json|```/g, '').trim()
    );

    await step.run('save-roadmap', () =>
      db.insert(HistoryTable).values({
        recordId: roadMapId,
        content: json,
        aiAgentType: '/tools/roadmap-generator',
        createdAt: new Date().toISOString(),
        userEmail,
        metaData: userInput,
      })
    );
  }
);
