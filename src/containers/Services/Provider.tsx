import { FC, PropsWithChildren } from 'react';
import { Services } from 'services/di';
import { ServicesContext } from './Context';

export const ServicesProvider: FC<PropsWithChildren<{ services: Services }>> = ({ children, services }) => (
  <ServicesContext.Provider value={services}>{children}</ServicesContext.Provider>
);

ServicesProvider.displayName = 'ServicesProvider';
