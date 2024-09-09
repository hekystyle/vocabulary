import { createContext } from 'react';
import { FilterShape } from './types';

/**
 * @private
 */
export const FilterContext = createContext<undefined | FilterShape>(undefined);
