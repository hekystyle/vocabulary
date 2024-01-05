import { z } from 'zod';

const configSchema = z.object({
  database: z.object({
    url: z.string().url(),
  }),
  jwt: z.object({
    secret: z.string(),
  }),
  session: z.object({
    secret: z.string(),
  }),
  github: z.object({
    clientId: z.string(),
    clientSecret: z.string(),
  }),
});

export type AppConfig = z.infer<typeof configSchema>;

export const loadConfiguration = () =>
  configSchema.parse({
    database: {
      url: process.env['DATABASE_URL'] ?? 'mongodb://localhost:27017/vocabulary',
    },
    jwt: {
      secret: process.env['JWT_SECRET'],
    },
    session: {
      secret: process.env['SESSION_SECRET'],
    },
    github: {
      clientId: process.env['GITHUB_CLIENT_ID'],
      clientSecret: process.env['GITHUB_CLIENT_SECRET'],
    },
  });
