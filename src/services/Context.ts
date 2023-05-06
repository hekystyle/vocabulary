import { createContext } from 'react';
import type { Services } from 'services';

/**
 * @private
 */
export const ServicesContext = createContext<Services | undefined>(undefined);
