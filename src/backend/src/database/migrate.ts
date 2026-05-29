import { readFileSync } from 'fs';
import path from 'path';
import { QueryTypes } from 'sequelize';
import { sequelize } from './connection';

export async function migrate(): Promise<void> {
  const [{ exists }] = await sequelize.query<{ exists: boolean }>(
    `SELECT EXISTS (
      SELECT FROM information_schema.tables
      WHERE table_schema = 'public' AND table_name = 'conferente'
    )`,
    { type: QueryTypes.SELECT }
  );

  if (exists) return;

  const schema = readFileSync(path.join(process.cwd(), 'db/schema.sql'), 'utf8');
  const seed = readFileSync(path.join(process.cwd(), 'db/seed.sql'), 'utf8');

  await sequelize.query(schema);
  await sequelize.query(seed);
  console.log('Database migrated and seeded.');
}
