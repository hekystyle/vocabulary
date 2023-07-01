// eslint-disable-next-line max-classes-per-file
import { Sorting } from 'filter';
import {
  addDoc,
  collection,
  CollectionReference,
  deleteDoc,
  doc,
  Firestore,
  FirestoreDataConverter,
  getDoc,
  serverTimestamp,
  updateDoc,
} from 'firebase/firestore';
import { AppDb } from 'services/db';
import { StrictOmit } from 'types/StrictOmit';
import { Term } from 'types/Term';
import { computeSkip, Pagination } from 'utils/computeSkip';

export interface TermsRepository {
  get(filter: Pagination & Sorting, signal: AbortSignal | undefined): Promise<{ terms: Term[]; total: number }>;
  getUnsynced(): Promise<Term[]>;
  getById(id: Exclude<Term['id'], undefined>, signal: AbortSignal | undefined): Promise<Term | undefined>;
  create(term: StrictOmit<Term, 'id' | 'createdAt'>): Promise<Term | undefined>;
  update(term: Term): Promise<Term | undefined>;
  delete(id: NonNullable<Term['id']>): Promise<void>;

  getWords(search: string, signal: AbortSignal | undefined): Promise<string[]>;
  getUniquePartsOfSpeech(signal: AbortSignal | undefined): Promise<string[]>;
  getUniqueTags(search: string, signal: AbortSignal | undefined): Promise<string[]>;
}

export class IndexedDbTermsRepository implements TermsRepository {
  constructor(private db: AppDb) {}

  public async get(filter: Pagination & Sorting): Promise<{ terms: Term[]; total: number }> {
    const skip = computeSkip(filter);

    const query = this.db.terms.orderBy(filter.sortField);

    if (filter.sortOrder === 'descend') {
      query.reverse();
    }

    const [terms, total] = await Promise.all([
      query.offset(skip).limit(filter.pageSize).toArray(),
      this.db.terms.count(),
    ]);

    return { terms, total };
  }

  public async getUnsynced() {
    return await this.db.terms.where({ firebaseId: undefined }).each();
  }

  public async getById(id: Exclude<Term['id'], undefined>): Promise<Term | undefined> {
    return await this.db.terms.get(id);
  }

  public async create(term: Omit<Term, 'id'>): Promise<Term | undefined> {
    const key = await this.db.terms.add(term);
    return await this.db.terms.get(key);
  }

  public async update(term: Term): Promise<Term | undefined> {
    const key = await this.db.terms.put(term);
    return await this.db.terms.get(key);
  }

  public async delete(id: Exclude<Term['id'], undefined>): Promise<void> {
    await this.db.terms.delete(id);
  }

  public async getWords(search: string): Promise<string[]> {
    const set = new Set<string>();
    await this.db.terms
      .where('word')
      .startsWithIgnoreCase(search)
      .each(term => {
        set.add(term.word);
      });
    return Array.from(set);
  }

  public async getUniquePartsOfSpeech(): Promise<string[]> {
    const set = new Set<string>();
    await this.db.terms.each(term => set.add(term.partOfSpeech));
    return Array.from(set);
  }

  public async getUniqueTags(search: string): Promise<string[]> {
    const lowercasedSearch = search.toLowerCase();
    const set = new Set<string>();
    await this.db.terms.each(term =>
      term.tags.forEach(tag => {
        if (tag.toLowerCase().includes(lowercasedSearch)) {
          set.add(tag);
        }
      }),
    );
    return Array.from(set);
  }
}

export class DelayedTermsRepository implements TermsRepository {
  constructor(private repo: TermsRepository, public readonly delayMs: number) {}

  private async wait() {
    return await new Promise(resolve => {
      setTimeout(resolve, this.delayMs);
    });
  }

  async get(filter: Pagination & Sorting, signal: AbortSignal | undefined): Promise<{ terms: Term[]; total: number }> {
    await this.wait();
    return await this.repo.get(filter, signal);
  }

  async getById(id: Exclude<Term['id'], undefined>, signal: AbortSignal | undefined): Promise<Term | undefined> {
    await this.wait();
    return await this.repo.getById(id, signal);
  }

  async create(term: Omit<Term, 'id'>): Promise<Term | undefined> {
    await this.wait();
    return await this.repo.create(term);
  }

  async update(term: Term): Promise<Term | undefined> {
    await this.wait();
    return await this.repo.update(term);
  }

  async delete(id: Exclude<Term['id'], undefined>): Promise<void> {
    await this.wait();
    return await this.repo.delete(id);
  }

  async getWords(search: string, signal: AbortSignal | undefined): Promise<string[]> {
    await this.wait();
    return await this.repo.getWords(search, signal);
  }

  async getUniquePartsOfSpeech(signal: AbortSignal | undefined): Promise<string[]> {
    await this.wait();
    return await this.repo.getUniquePartsOfSpeech(signal);
  }

  async getUniqueTags(search: string, signal: AbortSignal | undefined): Promise<string[]> {
    await this.wait();
    return await this.repo.getUniqueTags(search, signal);
  }
}

const termConverter: FirestoreDataConverter<Term> = {
  toFirestore: (term: Term) => term,
  fromFirestore: snapshot => {
    const data = snapshot.data();
    return {
      id: snapshot.id,
      ...(data as Term),
      createdAt: new Date(data.createdAt.seconds * 1000),
    } as Term;
  },
};

export class FirestoreTermsRepository {
  private termsRef: CollectionReference<Term>;

  constructor(db: Firestore) {
    this.termsRef = collection(db, 'terms').withConverter<Term>(termConverter);
  }

  async create(term: StrictOmit<Term, 'id' | 'createdAt'>): Promise<Term | undefined> {
    const docRef = await addDoc(this.termsRef, {
      ...term,
      createdAt: serverTimestamp(),
    });

    const docSnapshot = await getDoc(docRef);

    return docSnapshot.data();
  }

  async update(term: Term): Promise<Term | undefined> {
    const docRef = doc(this.termsRef, term.firebaseId);

    await updateDoc(docRef, term);

    const snap = await getDoc(docRef);

    return snap.data();
  }

  async delete(id: string): Promise<void> {
    await deleteDoc(doc(this.termsRef, id));
  }
}
