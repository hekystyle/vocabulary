import { faker } from '@faker-js/faker';
import { INestApplication } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { getConnectionToken } from '@nestjs/mongoose';
import { Test } from '@nestjs/testing';
import { Connection } from 'mongoose';
import request from 'supertest';
import { beforeAll, afterAll, it, expect, beforeEach } from 'vitest';
import { AppModule } from '@/app.module.js';
import { AuthService } from '@/auth/auth.service.js';
import { UsersService } from '@/users/users.service.js';
import testConfiguration from './testConfiguration.js';

let app: INestApplication;

beforeAll(async () => {
  const testingModule = await Test.createTestingModule({
    imports: [AppModule],
  })
    .overrideProvider(ConfigService)
    .useValue(new ConfigService(testConfiguration()))
    .compile();

  app = testingModule.createNestApplication();
  await app.init();
});

beforeEach(async () => {
  await app.get<Connection>(getConnectionToken()).dropDatabase();
});

afterAll(async () => {
  await app.get<Connection>(getConnectionToken()).dropDatabase();
  await app.close();
});

it('should allow user to authenticate with password', async () => {
  const password = faker.internet.password();

  const user = await app.get(UsersService).create({
    email: faker.internet.email(),
    password,
  });

  const response = await request(app.getHttpServer()).post('/auth/password').send({
    username: user.email,
    password,
  });

  expect(response.body).toStrictEqual({
    jwt: expect.any(String) as unknown,
  });
  expect(response.statusCode).toStrictEqual(201);
});

it('should allow user to authenticate with JWT', async () => {
  const password = faker.internet.password();

  const user = await app.get(UsersService).create({
    email: faker.internet.email(),
    password,
  });

  const jwt = await app.get(AuthService).signJwtForUser(user);

  const response = await request(app.getHttpServer()).get('/auth/profile').set('authorization', `Bearer ${jwt}`).send();

  expect(response.body).toStrictEqual({
    ...user.toObject(),
    _id: user._id.toString(),
    createdAt: user.createdAt?.toISOString(),
    updatedAt: user.updatedAt?.toISOString(),
  });
  expect(response.statusCode).toStrictEqual(200);
});
