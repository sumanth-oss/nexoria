import { z } from 'zod';

export const chatRequestSchema = z.object({
  userInput: z.string().min(1).max(5000),
  chatId: z.string().uuid(),
});

export const resumeAnalyzerRequestSchema = z.object({
  recordId: z.string().uuid(),
  resumeFile: z.instanceof(File).refine(
    (file) => file.size <= 10 * 1024 * 1024,
    'File size must be less than 10MB'
  ).refine(
    (file) => file.type === 'application/pdf',
    'Only PDF files are allowed'
  ),
});

export const roadmapRequestSchema = z.object({
  roadMapId: z.string().uuid(),
  userInput: z.string().min(1).max(500),
});

export const historyRequestSchema = z.object({
  recordId: z.string().uuid().optional(),
  content: z.any().optional(),
  aiAgentType: z.string().optional(),
});

