import { useContext } from 'react';
import { FilterContext } from './Context';
import { FilterProvider } from './Provider';
import { FilterShape } from './types';

export const useFilter = (): FilterShape => {
  const context = useContext(FilterContext);
  if (!context)
    throw new Error(`${FilterProvider.displayName ?? FilterProvider.name} must be used as a parent component`);
  return context;
};
