import { useContext } from 'react';
import { FilterContext } from './Context';
import { FilterProvider } from './Provider';
import type { FilterShape } from './types';

export const useFilter = (): FilterShape => {
  const context = useContext(FilterContext);
  if (!context) throw new Error(`${useFilter.displayName} must be used within a ${FilterProvider.displayName}`);
  return context;
};

useFilter.displayName = 'useFilter' as const;
