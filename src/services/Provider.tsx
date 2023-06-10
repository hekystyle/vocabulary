import { FC, PropsWithChildren } from 'react';
import { ServicesContext } from './Context';
import type { Services } from 'services';

export const ServicesProvider: FC<PropsWithChildren<{ services: Services }>> = ({ children, services }) => (
  <ServicesContext.Provider value={services}>{children}</ServicesContext.Provider>
);

ServicesProvider.displayName = 'ServicesProvider';
