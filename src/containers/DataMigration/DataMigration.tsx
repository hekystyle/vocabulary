import { FC, useEffect, useState } from 'react';
import { SpinnerBox } from 'components/SpinnerBox';
import styled from 'styled-components';
import * as v20220319144900 from './migrations/20220319144900';

export type Migration = () => Promise<void>;
type MigrationsMap = Record<'20220319144900', Migration>;

const MIGRATIONS: Readonly<MigrationsMap> = {
  '20220319144900': v20220319144900.up,
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
    migrate().finally(() => setLoading(false));
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

export const DataMigration: FC<{ children: React.ReactNode }> = ({ children }) => {
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
