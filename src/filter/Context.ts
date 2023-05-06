import { createContext } from 'react';
import type { FilterShape } from './types';

/**
 * @private
 */
export const FilterContext = createContext<undefined | FilterShape>(undefined);
