import fs from 'fs';
import path from 'path';
import { afterAll, expect, it, vi } from 'vitest';
import * as DictionaryApi from 'services/dictionaryApi';

afterAll(() => {
  vi.restoreAllMocks();
});

it('should parse real data', async () => {
  vi.spyOn(window, 'fetch').mockResolvedValue({
    json: () =>
      Promise.resolve(JSON.parse(fs.readFileSync(path.resolve(__dirname, '__fixtures__', 'car.json'), 'utf8'))),
  } as Response);

  const promise = DictionaryApi.fetchWord('hello');

  await expect(promise).resolves.toMatchSnapshot();
});

it('should throw error when response is invalid', async () => {
  vi.spyOn(window, 'fetch').mockResolvedValue({
    json: () => Promise.resolve({ message: 'Word not found' }),
  } as Response);

  await expect(DictionaryApi.fetchWord('hasaki')).rejects.toThrow('Invalid response, expected array, got object');
});
