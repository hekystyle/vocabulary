import { z } from 'zod';

export const termDtoSchema = z.object({
  word: z.string(),
  partOfSpeech: z.string(),
  translation: z.string(),
  definition: z.string(),
  answersCount: z.number(),
  correctAnswersCount: z.number(),
  tags: z.array(z.string()),
});

export type TermDto = z.infer<typeof termDtoSchema>;
