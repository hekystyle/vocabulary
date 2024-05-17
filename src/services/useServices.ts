import { atom, selector, useRecoilValue } from 'recoil';
import { userState } from '@/auth/userState';
import { Env, Services } from '@/services';
import { AuthApiClient } from './auth-api-client';
import { APP_DB } from './db';
import { HttpTermsApi } from './http-terms-api';
import { DelayedTermsRepository, IndexedDbTermsRepository, TermsRepository } from './terms';

export const DEFAULT_DELAY = 250 as const;

const envState = atom<Env>({
  key: 'env',
  default: import.meta.env,
});

export const servicesState = selector<Services>({
  key: 'services',
  get: ({ get }) => {
    const env = get(envState);
    const user = get(userState);
    const indexedDbTermsRepository = new DelayedTermsRepository(
      new IndexedDbTermsRepository(APP_DB),
      // eslint-disable-next-line no-nested-ternary
      env.DEV ? (env.VITE_DELAY ? parseInt(env.VITE_DELAY, 10) : DEFAULT_DELAY) : 0,
    );
    const httpTermsApi = new HttpTermsApi();
    const termsRepository: TermsRepository = user ? httpTermsApi : indexedDbTermsRepository;

    return {
      env,
      db: APP_DB,
      termsRepository,
      authApiClient: new AuthApiClient(),
      httpTermsApi,
    } satisfies Services;
  },
});

export const useServices = (): Services => useRecoilValue(servicesState);

useServices.displayName = 'useServices' as const;
