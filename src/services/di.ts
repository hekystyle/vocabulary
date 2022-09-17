import { AppDb } from 'db';
import { createContext, createElement, FC, PropsWithChildren, useContext } from 'react';
import { IndexedDbTermsRepository, ITermsRepository } from './terms';

export type Services = Readonly<{
  db: AppDb;
  termsRepository: ITermsRepository;
}>;

const db = new AppDb();
export const SERVICES: Services = {
  db,
  termsRepository: new IndexedDbTermsRepository(db),
};

const ServicesContext = createContext<Services | undefined>(undefined);

export const ServicesProvider: FC<PropsWithChildren<{ services: Services }>> = ({ children, services }) =>
  createElement(ServicesContext.Provider, { value: services }, children);

export const useServices = (): Services => {
  const services = useContext(ServicesContext);
  if (!services) throw new Error('useServices must be used within a ServicesProvider');
  return services;
};
