import { DictionaryApi } from 'services/dictionaryApi';

afterAll(() => {
  jest.restoreAllMocks();
});

it('should return words collection', async () => {
  jest.spyOn(window, 'fetch').mockResolvedValue({
    json: () =>
      Promise.resolve([
        {
          meanings: [
            {
              partOfSpeech: 'noun',
              definitions: [
                {
                  definition: 'definition',
                },
              ],
            },
          ],
        },
      ]),
  } as Response);

  const words = await DictionaryApi.word('hello');

  expect(words).toEqual([
    {
      meanings: [
        {
          partOfSpeech: 'noun',
          definitions: [
            {
              definition: 'definition',
            },
          ],
        },
      ],
    },
  ]);
});

it('should throw error when response is invalid', async () => {
  jest.spyOn(window, 'fetch').mockResolvedValue({
    json: () => Promise.resolve({ message: 'Word not found' }),
  } as Response);

  await expect(DictionaryApi.word('hasaki')).rejects.toThrow('Invalid response, expected array, got object');
});
