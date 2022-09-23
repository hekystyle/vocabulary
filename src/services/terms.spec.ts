import { randomUUID } from 'crypto';
import { AppDb } from 'db';
import fakeIndexedDB from 'fake-indexeddb';
import FDBKeyRange from 'fake-indexeddb/lib/FDBKeyRange';
import { Term } from 'types/Term';
import { IndexedDbTermsRepository, ITermsRepository } from './terms';

AppDb.dependencies.indexedDB = fakeIndexedDB;
AppDb.dependencies.IDBKeyRange = FDBKeyRange;

let db: AppDb;
let repository: ITermsRepository;

beforeEach(() => {
  db = new AppDb(randomUUID());
  repository = new IndexedDbTermsRepository(db);
});

afterEach(async () => {
  await db.delete();
  db.close();
});

it('should create instance', async () => {
  expect(new IndexedDbTermsRepository(db)).toBeInstanceOf(IndexedDbTermsRepository);
  await db.delete();
});

it('should get terms', async () => {
  await db.terms.bulkAdd([{} as Term, {} as Term]);

  const result = await repository.get({ page: 1, pageSize: 1 });

  expect(result.terms).toEqual([
    {
      // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
      id: expect.any(Number),
      // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
      createdAt: expect.any(Date),
    },
  ]);
  expect(result.total).toBe(2);
});

it('should get term by id', async () => {
  const id = await db.terms.add({} as Term);

  const result = await repository.getById(id);

  expect(result).toBeDefined();
});

it('should create term', async () => {
  const result = await repository.create({} as Term);

  expect(result).toEqual({
    // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
    id: expect.any(Number),
    // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
    createdAt: expect.any(Date),
  });
});

it('should update term', async () => {
  const id = await db.terms.add({ word: 'word1' } as Term);

  const result = await repository.update({ id, word: 'word2' } as Term);

  expect(result).toEqual({ id, word: 'word2' });
});

it('should delete term', async () => {
  const id = await db.terms.add({} as Term);

  await repository.delete(id);

  const result = await db.terms.get(id);
  expect(result).toBeUndefined();
});

it('should get terms words', async () => {
  await db.terms.bulkAdd([{ word: 'foo1' } as Term, { word: 'foo2' } as Term, { word: 'bar' } as Term]);

  const result = await repository.getWords('foo');

  expect(result).toEqual(['foo1', 'foo2']);
});

it('should get unique parts of speech', async () => {
  await db.terms.bulkAdd([
    { partOfSpeech: 'foo' } as Term,
    { partOfSpeech: 'foo' } as Term,
    { partOfSpeech: 'bar' } as Term,
    { partOfSpeech: 'bar' } as Term,
  ]);

  const result = await repository.getUniquePartsOfSpeech();
  expect(result).toEqual(['foo', 'bar']);
});
