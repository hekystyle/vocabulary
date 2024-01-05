import 'reflect-metadata';
import 'tsconfig-paths/register.js';
import { Logger } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module.js';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.setGlobalPrefix('api');
  await app.listen(3000);
  Logger.log(`HTTP server listening on port 3000`, bootstrap.name);
}
bootstrap().catch(console.error);
