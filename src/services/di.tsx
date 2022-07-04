import { AppDb, db } from 'db';
import { createContext, FC, PropsWithChildren, useContext } from 'react';
import { LocalTermsApiClient, TermsApiClient } from './terms';

export type Services = Readonly<{
  db: AppDb;
  termsApiClient: TermsApiClient;
}>;

export const SERVICES: Services = {
  db,
  termsApiClient: new LocalTermsApiClient(db),
};

const ServicesContext = createContext<Services | undefined>(undefined);

export const ServicesProvider: FC<PropsWithChildren<{ services: Services }>> = ({ children, services }) => (
  <ServicesContext.Provider value={services}>{children}</ServicesContext.Provider>
);

export const useServices = (): Services => {
  const services = useContext(ServicesContext);
  if (!services) throw new Error('useServices must be used within a ServicesProvider');
  return services;
};
