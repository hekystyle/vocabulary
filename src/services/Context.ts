import { createContext } from 'react';
import { Services } from '@/services';

/**
 * @private
 */
export const ServicesContext = createContext<Services | undefined>(undefined);
