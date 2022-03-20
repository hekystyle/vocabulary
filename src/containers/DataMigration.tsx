import { db } from 'db';
import { loadState, VOCABULARY_KEY } from 'persistence';
import { FC, useEffect, useState } from 'react';
import { SpinnerBox } from 'components/SpinnerBox';
import styled from 'styled-components';

type Migration = () => Promise<void>;
type MigrationsMap = Record<'20220319144900', Migration>;

const MIGRATIONS: Readonly<MigrationsMap> = {
  '20220319144900': async () => {
    const terms = loadState();
    if (terms === undefined) return;
    for (const term of terms) {
      await db.terms.add({
        ...term,
        id: undefined,
        createdAt: new Date(term.id),
      });
    }
    localStorage.removeItem(VOCABULARY_KEY);
  },
};

async function migrate() {
  for (const key of Object.keys(MIGRATIONS)) {
    const migration = MIGRATIONS[key as keyof typeof MIGRATIONS];
    await migration();
  }
}

const useMigration = () => {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    migrate().then(() => setLoading(false));
  });

  return {
    loading,
  };
};

const StyledLayout = styled.div`
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
`;

export const DataMigration: FC = ({ children }) => {
  const { loading } = useMigration();

  return loading ? (
    <StyledLayout>
      <SpinnerBox>Upgrading ...</SpinnerBox>
    </StyledLayout>
  ) : (
    // eslint-disable-next-line react/jsx-no-useless-fragment
    <>{children}</>
  );
};
