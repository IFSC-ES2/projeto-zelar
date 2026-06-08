import { readFileSync } from 'fs';
import path from 'path';
import { QueryTypes } from 'sequelize';
import { sequelize } from './connection';

async function ensureSolicitacaoTable(): Promise<void> {
  await sequelize.query(`
    CREATE TABLE IF NOT EXISTS solicitacao (
      id SERIAL PRIMARY KEY,
      patrimonio_id INT NOT NULL REFERENCES patrimonio(id),
      tipo VARCHAR(20) NOT NULL CHECK (tipo IN ('manutencao', 'substituicao')),
      status VARCHAR(20) NOT NULL DEFAULT 'aberta' CHECK (status IN ('aberta', 'em_andamento', 'concluida', 'cancelada')),
      descricao TEXT,
      conferente_id INT REFERENCES conferente(id),
      versao INTEGER DEFAULT 1 NOT NULL,
      created_at TIMESTAMP NOT NULL DEFAULT NOW(),
      updated_at TIMESTAMP NOT NULL DEFAULT NOW(),
      deleted_at TIMESTAMP NULL
    )
  `);
}

export async function migrate(): Promise<void> {
  const [{ exists }] = await sequelize.query<{ exists: boolean }>(
    `SELECT EXISTS (
      SELECT FROM information_schema.tables
      WHERE table_schema = 'public' AND table_name = 'conferente'
    )`,
    { type: QueryTypes.SELECT }
  );

  if (exists) {
    await ensureSolicitacaoTable();
    return;
  }

  const schema = readFileSync(path.join(process.cwd(), 'db/schema.sql'), 'utf8');
  const seed = readFileSync(path.join(process.cwd(), 'db/seed.sql'), 'utf8');

  await sequelize.query(schema);
  await sequelize.query(seed);
  await ensureSolicitacaoTable();
  console.log('Database migrated and seeded.');
}
