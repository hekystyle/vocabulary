import { FC, PropsWithChildren } from 'react';
import type { Services } from 'services';
import { ServicesContext } from './Context';

export const ServicesProvider: FC<PropsWithChildren<{ services: Services }>> = ({ children, services }) => (
  <ServicesContext.Provider value={services}>{children}</ServicesContext.Provider>
);

ServicesProvider.displayName = 'ServicesProvider';
