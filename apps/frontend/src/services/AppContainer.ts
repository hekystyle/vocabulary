import { baseContainer } from './baseContainer';

export const appContainer = () =>
  baseContainer().overrideFactory(
    'env',
    // eslint-disable-next-line arrow-body-style -- Rollup doesn't like this
    () => {
      return import.meta.env;
    },
  );
