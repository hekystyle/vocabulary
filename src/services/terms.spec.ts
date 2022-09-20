import { randomUUID } from 'crypto';
import { AppDb } from 'db';
import fakeIndexedDB from 'fake-indexeddb';
import FDBKeyRange from 'fake-indexeddb/lib/FDBKeyRange';
import { Term } from 'types/Term';
import { IndexedDbTermsRepository } from './terms';

AppDb.dependencies.indexedDB = fakeIndexedDB;
AppDb.dependencies.IDBKeyRange = FDBKeyRange;

it('should create instance', async () => {
  const db = new AppDb(randomUUID());
  expect(new IndexedDbTermsRepository(db)).toBeInstanceOf(IndexedDbTermsRepository);
  await db.delete();
});

it('should get terms', async () => {
  const db = new AppDb(randomUUID());
  const repository = new IndexedDbTermsRepository(db);

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

  await db.delete();
});

it('should get term by id', async () => {
  const db = new AppDb(randomUUID());
  const repository = new IndexedDbTermsRepository(db);

  const id = await db.terms.add({} as Term);

  const result = await repository.getById(id);

  expect(result).toBeDefined();

  await db.delete();
});

it('should create term', async () => {
  const db = new AppDb(randomUUID());
  const repository = new IndexedDbTermsRepository(db);

  const result = await repository.create({} as Term);

  expect(result).toEqual({
    // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
    id: expect.any(Number),
    // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
    createdAt: expect.any(Date),
  });

  await db.delete();
});

it('should update term', async () => {
  const db = new AppDb(randomUUID());
  const repository = new IndexedDbTermsRepository(db);

  const id = await db.terms.add({ word: 'word1' } as Term);

  const result = await repository.update({ id, word: 'word2' } as Term);

  expect(result).toEqual({ id, word: 'word2' });

  await db.delete();
});

it('should delete term', async () => {
  const db = new AppDb(randomUUID());
  const repository = new IndexedDbTermsRepository(db);

  const id = await db.terms.add({} as Term);

  await repository.delete(id);

  const result = await db.terms.get(id);
  expect(result).toBeUndefined();

  await db.delete();
});

it('should get terms words', async () => {
  const db = new AppDb(randomUUID());
  const repository = new IndexedDbTermsRepository(db);

  await db.terms.bulkAdd([{ word: 'foo1' } as Term, { word: 'foo2' } as Term, { word: 'bar' } as Term]);

  const result = await repository.getWords('foo');

  expect(result).toEqual(['foo1', 'foo2']);

  await db.delete();
});

it('should get unique parts of speech', async () => {
  const db = new AppDb(randomUUID());
  const repository = new IndexedDbTermsRepository(db);

  await db.terms.bulkAdd([
    { partOfSpeech: 'foo' } as Term,
    { partOfSpeech: 'foo' } as Term,
    { partOfSpeech: 'bar' } as Term,
    { partOfSpeech: 'bar' } as Term,
  ]);

  const result = await repository.getUniquePartsOfSpeech();
  expect(result).toEqual(['foo', 'bar']);

  await db.delete();
});
