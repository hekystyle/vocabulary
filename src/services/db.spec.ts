import { randomUUID } from 'crypto';
import { expect, it } from '@jest/globals';
import fakeIndexedDB from 'fake-indexeddb';
import FDBKeyRange from 'fake-indexeddb/lib/FDBKeyRange';
import { AppDb } from 'services/db';
import { Term } from 'types/Term';

AppDb.dependencies.indexedDB = fakeIndexedDB;
AppDb.dependencies.IDBKeyRange = FDBKeyRange;

it('should create instance', () => {
  expect(new AppDb(randomUUID())).toBeInstanceOf(AppDb);
});

it('should set createdAt on creating', async () => {
  const db = new AppDb(randomUUID());

  const termId = await db.terms.add({} as Term);

  const term = await db.terms.get(termId);

  expect(term?.createdAt).toBeInstanceOf(Date);

  await db.delete();
});
