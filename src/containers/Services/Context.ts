import { createContext } from 'react';
import { Services } from 'services/di';

/**
 * @private
 */
export const ServicesContext = createContext<Services | undefined>(undefined);
