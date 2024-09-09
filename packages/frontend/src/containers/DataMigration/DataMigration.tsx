import { useIsMutating } from '@tanstack/react-query';
import { FC, PropsWithChildren } from 'react';
import styled from 'styled-components';
import { SpinnerBox } from '@/components/SpinnerBox';
import { migrate } from './migrate';

const StyledLayout = styled.div`
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
`;

export const DataMigration: FC<PropsWithChildren> = ({ children }) => {
  const loading = useIsMutating({ mutationKey: migrate.queryKey });

  return loading ? (
    <StyledLayout>
      <SpinnerBox label="Upgrading ..." />
    </StyledLayout>
  ) : (
    <>{children}</>
  );
};
