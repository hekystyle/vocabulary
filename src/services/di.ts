import { AppDb } from 'services/db';
import { createContext, createElement, FC, PropsWithChildren, useContext } from 'react';

export type Services = Readonly<{
  db: AppDb;
}>;

export const SERVICES: Services = {
  db: new AppDb(),
};

const ServicesContext = createContext<Services | undefined>(undefined);

export const ServicesProvider: FC<PropsWithChildren<{ services: Services }>> = ({ children, services }) =>
  createElement(ServicesContext.Provider, { value: services }, children);

export const useServices = (): Services => {
  const services = useContext(ServicesContext);
  if (!services) throw new Error('useServices must be used within a ServicesProvider');
  return services;
};
