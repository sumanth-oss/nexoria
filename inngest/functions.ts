// inngest/functions.ts
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

/* ---------------- CHAT ---------------- */



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

    // 🔹 1. Get existing chat
    const existing = await db
      .select()
      .from(HistoryTable)
      .where(eq(HistoryTable.recordId, chatId))
      .limit(1);

    const previousMessages = Array.isArray(existing[0]?.content)
      ? existing[0].content
      : [];

    // 🔹 2. Append assistant message
    const updatedMessages = [
  ...previousMessages,
  { content: userInput, role: 'user', type: 'text' },
  { content, role: 'assistant', type: 'text' },
];


    // 🔹 3. Update row (NOT insert)
    await step.run('save-chat-message', () =>
      db
        .update(HistoryTable)
        .set({ content: updatedMessages })
        .where(eq(HistoryTable.recordId, chatId))
    );

    return { ok: true };
  }
);



/* ---------------- RESUME ANALYZER ---------------- */

export const AiResumeAnalyzer = inngest.createFunction(
  { id: 'AiResumeAnalyzer' },
  { event: 'AiResumeAnalyzer' },
  async ({ event, step }) => {
    const { recordId, base64ResumeFile, pdfText, aiAgentType, userEmail } =
      event.data;

    const uploadUrl = await step.run('upload-resume', async () => {
      const file = await imagekit.upload({
        file: base64ResumeFile,
        fileName: `${recordId}.pdf`,
      });
      return file.url;
    });

        const agentResult = await AiResumeAgent.run(pdfText);


    const textMsg = agentResult.output?.find(m => m.type === 'text');
    if (!textMsg) throw new Error('Invalid AI output');

    // ✅ SAFE CONTENT NORMALIZATION
    const rawText =
      typeof textMsg.content === 'string'
        ? textMsg.content
        : textMsg.content.map(c => c.text).join('');

    const json = JSON.parse(
      rawText.replace(/```json|```/g, '').trim()
    );

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
  }
);

/* ---------------- ROADMAP ---------------- */

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
