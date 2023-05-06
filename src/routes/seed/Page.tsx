import { faker } from '@faker-js/faker';
import { Button } from 'antd';
import { useServices } from 'services';
import type { FC } from 'react';
import { useMutation } from '@tanstack/react-query';
import type { StrictOmit } from 'types/StrictOmit';
import type { Term } from 'types/Term';

function getFakeTerms() {
  return (
    [
      {
        word: 'car',
        definition: 'a road vehicle with four wheels; usually propelled by an internal combustion engine',
        partOfSpeech: 'noun',
        translation: 'auto',
      },
      {
        word: 'computer',
        definition:
          'an electronic device for storing and processing data, typically in binary form, according to instructions given to it in a variable program',
        partOfSpeech: 'noun',
        translation: 'počítač',
      },
    ] satisfies Array<StrictOmit<Term, 'answersCount' | 'correctAnswersCount' | 'tags'>>
  ).map<Term>(term => {
    const total = faker.datatype.number({ min: 1, max: 10 });
    const correct = faker.datatype.number({ min: 0, max: total });
    return {
      ...term,
      answersCount: total,
      correctAnswersCount: correct,
      tags: Array.from({ length: faker.datatype.number({ min: 0, max: 5 }) }, () => faker.random.word()),
    };
  });
}

const SeedPage: FC = () => {
  const { db } = useServices();
  const { error, mutate, status } = useMutation(
    async () => {
      await db.delete();
      await db.open();
      for (const term of getFakeTerms()) {
        await db.terms.add(term);
      }
    },
    {
      onError: e => console.error(e),
    },
  );

  switch (status) {
    case 'idle':
      return (
        <Button block danger type="primary" onClick={() => mutate()}>
          Seed
        </Button>
      );
    case 'loading':
      return <p>seeding...</p>;
    case 'error':
      return <p>{JSON.stringify(error)}</p>;
    default:
      return <p>{status}</p>;
  }
};

// NOTE: default export is required for lazy loading
export default SeedPage;
