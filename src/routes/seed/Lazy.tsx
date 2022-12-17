import { SpinnerBox } from 'components/SpinnerBox';
import { FC, lazy, Suspense } from 'react';

export const LazySeedPage = lazy(() => import('./Page'));

export const SeedPage: FC = () => (
  <Suspense fallback={<SpinnerBox label="Loading..." />}>
    <LazySeedPage />
  </Suspense>
);
