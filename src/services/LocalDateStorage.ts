import { Storage } from './Storage';

export class LocalDateStorage implements Storage<Date | undefined> {
  constructor(private readonly key: string) {}

  async get() {
    const value = localStorage.getItem(this.key);
    return value ? new Date(value) : undefined;
  }

  async set(value: Date | undefined) {
    localStorage.setItem(this.key, value?.toISOString() ?? '');
  }
}
