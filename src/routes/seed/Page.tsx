import { Button } from 'antd';
import { useServices } from 'containers/Services';
import { FC } from 'react';
import { useMutation } from 'react-query';

const SeedPage: FC = () => {
  const { db } = useServices();
  const { error, mutate, status } = useMutation(
    async () => {
      await db.delete();
      await db.open();
      return await db.terms.bulkAdd([
        {
          word: 'car',
          definition: 'a road vehicle with four wheels; usually propelled by an internal combustion engine',
          answersCount: 4,
          correctAnswersCount: 3,
          partOfSpeech: 'noun',
          translation: 'auto',
        },
        {
          word: 'computer',
          definition:
            'an electronic device for storing and processing data, typically in binary form, according to instructions given to it in a variable program',
          answersCount: 2,
          correctAnswersCount: 1,
          partOfSpeech: 'noun',
          translation: 'počítač',
        },
      ]);
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
