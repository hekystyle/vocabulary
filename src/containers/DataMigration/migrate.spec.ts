import { randomUUID } from 'crypto';
import { expect, it } from '@jest/globals';
import { AppDb } from 'services/db';
import { migrate } from './migrate';

it('should run without throwing an error', () => expect(migrate(new AppDb(randomUUID()))).resolves.not.toThrow());
