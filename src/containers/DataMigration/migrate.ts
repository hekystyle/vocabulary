import { AppDb } from 'services/db';
import * as v20220319144900 from './migrations/20220319144900';

export type Migration = (db: AppDb) => Promise<void>;
type MigrationsMap = Record<'20220319144900', Migration>;

const MIGRATIONS: Readonly<MigrationsMap> = {
  '20220319144900': v20220319144900.up,
};

export async function migrate(db: AppDb) {
  for (const migration of Object.values(MIGRATIONS)) {
    await migration(db);
  }
}

migrate.queryKey = ['migrate-data'] as const;
