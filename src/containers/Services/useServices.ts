import { useContext } from 'react';
import { Services } from 'services/di';
import { ServicesContext } from './Context';
import { ServicesProvider } from './Provider';

export const useServices = (): Services => {
  const services = useContext(ServicesContext);
  if (!services) throw new Error(`useServices must be used within a ${ServicesProvider.name}`);
  return services;
};
