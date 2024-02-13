import 'reflect-metadata';
import 'tsconfig-paths/register.js';
import { Logger } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module.js';

const PORT = process.env['PORT'] ?? 3001;

async function bootstrap() {
  const app = await NestFactory.create(AppModule, {
    cors: {
      origin: true,
      credentials: true,
    },
  });
  app.setGlobalPrefix('api');
  await app.listen(PORT);
  Logger.log(`HTTP server listening on port ${PORT}`, bootstrap.name);
}
bootstrap().catch(console.error);
