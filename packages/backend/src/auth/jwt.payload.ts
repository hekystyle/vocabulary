import z from 'zod';

export const jwtPayloadSchema = z.object({
  username: z.string(),
  sub: z.string(),
});

export type JwtPayload = z.infer<typeof jwtPayloadSchema>;
