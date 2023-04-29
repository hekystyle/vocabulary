import { FC, PropsWithChildren } from 'react';
import { SpinnerBox } from 'components/SpinnerBox';
import styled from 'styled-components';
import { useIsMutating } from '@tanstack/react-query';
import { migrate } from './migrate';

const StyledLayout = styled.div`
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
`;

export const DataMigration: FC<PropsWithChildren> = ({ children }) => {
  const loading = useIsMutating(migrate.queryKey);

  return loading ? (
    <StyledLayout>
      <SpinnerBox label="Upgrading ..." />
    </StyledLayout>
  ) : (
    <>{children}</>
  );
};
