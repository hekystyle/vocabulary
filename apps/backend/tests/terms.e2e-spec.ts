import { faker } from '@faker-js/faker';
import { INestApplication } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { getConnectionToken, getModelToken } from '@nestjs/mongoose';
import { Test } from '@nestjs/testing';
import { Connection, Model, Types } from 'mongoose';
import request from 'supertest';
import { describe, beforeAll, afterAll, it, expect, beforeEach } from 'vitest';
import { AppModule } from '@/app.module.js';
import { AuthService } from '@/auth/auth.service.js';
import { TimeService } from '@/common/time.service.js';
import { SerializedTerm, Term } from '@/terms/term.entity.js';
import { TermDto } from '@/terms/terms.dto.js';
import { User } from '@/users/user.entity.js';
import { UsersService } from '@/users/users.service.js';
import testConfiguration from './testConfiguration.js';

let app: INestApplication;
let user: User;
let jwt: string;
let termsRepository: Model<Term>;

beforeAll(async () => {
  const testingModule = await Test.createTestingModule({
    imports: [AppModule],
  })
    .overrideProvider(ConfigService)
    .useValue(new ConfigService(testConfiguration()))
    .overrideProvider(TimeService)
    .useClass(
      class implements TimeService {
        // eslint-disable-next-line class-methods-use-this
        now = () => new Date('2021-01-01T00:00:00.000Z');
      },
    )
    .compile();

  app = testingModule.createNestApplication();
  await app.init();

  termsRepository = app.get(getModelToken(Term.name));
});

beforeEach(async () => {
  await app.get<Connection>(getConnectionToken()).dropDatabase();

  user = await app.get(UsersService).create({
    email: faker.internet.email(),
    password: faker.internet.password(),
  });

  jwt = await app.get(AuthService).signJwtForUser(user);
});

afterAll(async () => {
  await app.get<Connection>(getConnectionToken()).dropDatabase();
  await app.close();
});

describe('POST /terms', () => {
  it('should allow user to create term', async () => {
    const dto = {
      word: faker.lorem.word(),
      definition: faker.lorem.sentence(),
      partOfSpeech: faker.lorem.word(),
      tags: [faker.lorem.word()],
      translation: faker.lorem.word(),
    } satisfies TermDto;

    const response = await request(app.getHttpServer()).post('/terms').set('authorization', `Bearer ${jwt}`).send(dto);

    expect(response.body).toStrictEqual<SerializedTerm>({
      ...dto,
      // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
      _id: expect.any(String),
      owner: user._id.toString(),
      // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
      createdAt: expect.any(String),
      // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
      updatedAt: expect.any(String),
      deletedAt: null,
    });
    expect(response.statusCode).toStrictEqual(201);

    const createdTerm = await termsRepository.findById((response.body as Term)._id);

    const updatedUser = await app.get<Model<User>>(getModelToken(User.name)).findById(user._id);
    expect(updatedUser?.lastDataMutationAt).toStrictEqual(createdTerm?.updatedAt);
  });
});

describe('GET /terms', () => {
  it('should allow user to find only own terms', async () => {
    const terms = await termsRepository.create([
      {
        word: faker.lorem.word(),
        definition: faker.lorem.sentence(),
        partOfSpeech: faker.lorem.word(),
        tags: [faker.lorem.word()],
        translation: faker.lorem.word(),
        owner: user._id,
      },
      {
        word: faker.lorem.word(),
        definition: faker.lorem.sentence(),
        partOfSpeech: faker.lorem.word(),
        tags: [faker.lorem.word()],
        translation: faker.lorem.word(),
        owner: new Types.ObjectId(),
      },
    ]);

    const response = await request(app.getHttpServer()).get('/terms').set('authorization', `Bearer ${jwt}`).send();

    const [ownTerm] = terms;

    expect(response.body).toStrictEqual({
      data: [
        {
          ...ownTerm?.toObject(),
          _id: ownTerm?._id.toString(),
          owner: ownTerm?.owner.toString(),
          createdAt: ownTerm?.createdAt?.toISOString(),
          updatedAt: ownTerm?.updatedAt?.toISOString(),
          deletedAt: null,
        },
      ],
      meta: {
        pagination: {
          page: 1,
          pageCount: 1,
          pageSize: 10,
          skip: 0,
          total: 1,
        },
      },
    });
    expect(response.statusCode).toStrictEqual(200);
  });
});

describe('PATCH /terms/:id', () => {
  it('should allow user to update own term', async () => {
    const repository = app.get<Model<Term>>(getModelToken(Term.name));

    const term = await repository.create({
      word: faker.lorem.word(),
      definition: faker.lorem.sentence(),
      partOfSpeech: faker.lorem.word(),
      tags: [faker.lorem.word()],
      translation: faker.lorem.word(),
      owner: user._id,
    });

    const dto = {
      word: faker.lorem.word(),
      definition: faker.lorem.sentence(),
      partOfSpeech: faker.lorem.word(),
      tags: [faker.lorem.word()],
      translation: faker.lorem.word(),
    } satisfies TermDto;

    const response = await request(app.getHttpServer())
      .patch(`/terms/${term._id.toString()}`)
      .set('authorization', `Bearer ${jwt}`)
      .send(dto);

    expect(response.body).toStrictEqual<SerializedTerm>({
      ...dto,
      _id: term._id.toString(),
      owner: user._id.toString(),
      createdAt: term.createdAt?.toISOString() ?? '',
      // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
      updatedAt: expect.any(String),
      deletedAt: null,
    });
    expect(response.statusCode).toStrictEqual(200);

    const updatedTerm = await repository.findById(term._id);

    const updatedUser = await app.get<Model<User>>(getModelToken(User.name)).findById(user._id);
    expect(updatedUser?.lastDataMutationAt).toStrictEqual(updatedTerm?.updatedAt);
  });

  it('should not allow user to update term of other user', async () => {
    const term = await termsRepository.create({
      word: faker.lorem.word(),
      definition: faker.lorem.sentence(),
      partOfSpeech: faker.lorem.word(),
      tags: [faker.lorem.word()],
      translation: faker.lorem.word(),
      owner: new Types.ObjectId(),
    });

    const dto = {
      word: faker.lorem.word(),
      definition: faker.lorem.sentence(),
      partOfSpeech: faker.lorem.word(),
      tags: [faker.lorem.word()],
      translation: faker.lorem.word(),
    } satisfies TermDto;

    const response = await request(app.getHttpServer())
      .patch(`/terms/${term._id.toString()}`)
      .set('authorization', `Bearer ${jwt}`)
      .send(dto);

    expect(response.body).toStrictEqual({
      statusCode: 403,
      message: 'You are not the owner of this term',
      error: 'Forbidden',
    });
    expect(response.statusCode).toStrictEqual(403);

    const updatedTerm = await termsRepository.findById(term._id).lean();
    expect(updatedTerm).toStrictEqual(term.toObject());
  });
});

describe('DELETE /terms/:id', () => {
  it('should allow user to soft delete own term', async () => {
    const termToUpdate = await termsRepository.create({
      word: faker.lorem.word(),
      definition: faker.lorem.sentence(),
      partOfSpeech: faker.lorem.word(),
      tags: [faker.lorem.word()],
      translation: faker.lorem.word(),
      owner: user._id,
    });

    const response = await request(app.getHttpServer())
      .delete(`/terms/${termToUpdate._id.toString()}`)
      .set('authorization', `Bearer ${jwt}`)
      .send();

    expect(response.body).toStrictEqual({});
    expect(response.statusCode).toStrictEqual(200);

    const updatedTerm = await termsRepository.findById(termToUpdate._id);
    expect(updatedTerm).not.toStrictEqual(null);
    expect(updatedTerm?.deletedAt).toStrictEqual(new Date('2021-01-01T00:00:00.000Z'));

    const updatedUser = await app.get<Model<User>>(getModelToken(User.name)).findById(user._id);
    expect(updatedUser?.lastDataMutationAt).toStrictEqual(updatedTerm?.deletedAt);
  });

  it('should not allow user to delete term of other user', async () => {
    const termToUpdate = await termsRepository.create({
      word: faker.lorem.word(),
      definition: faker.lorem.sentence(),
      partOfSpeech: faker.lorem.word(),
      tags: [faker.lorem.word()],
      translation: faker.lorem.word(),
      owner: new Types.ObjectId(),
    });

    const response = await request(app.getHttpServer())
      .delete(`/terms/${termToUpdate._id.toString()}`)
      .set('authorization', `Bearer ${jwt}`)
      .send();

    expect(response.body).toStrictEqual({
      statusCode: 403,
      message: 'You are not the owner of this term',
      error: 'Forbidden',
    });
    expect(response.statusCode).toStrictEqual(403);

    const updatedTerm = await termsRepository.findById(termToUpdate._id);
    expect(updatedTerm?.deletedAt).toStrictEqual(null);
  });
});
