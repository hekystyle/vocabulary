import { useUser } from 'auth';
import { FC, PropsWithChildren, useMemo } from 'react';
import { ServicesContext } from './Context';
import { useFirestore } from './firebase';
import { FirestoreTermsRepository } from './terms';
import type { Services } from 'services';

export const ServicesProvider: FC<PropsWithChildren<{ services: Services }>> = ({ children, services }) => {
  const user = useUser();
  const db = useFirestore();

  const extendedServices = useMemo(
    () => ({
      ...services,
      // Add here your custom services
      termsRepository: user !== 'loading' && user ? new FirestoreTermsRepository(db) : services.termsRepository,
    }),
    [services, db, user],
  );

  return <ServicesContext.Provider value={extendedServices}>{children}</ServicesContext.Provider>;
};

ServicesProvider.displayName = 'ServicesProvider';
