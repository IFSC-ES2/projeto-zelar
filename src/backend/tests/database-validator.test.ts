import { PostgreSqlContainer, StartedPostgreSqlContainer } from "@testcontainers/postgresql";
import { Model, ModelStatic, Sequelize } from "sequelize";
import fs from "fs";
import path from "path";

import { Ambiente } from "../src/models/Ambiente";
import { EstadoItem } from "../src/models/EstadoItem";
import { Fornecedor } from "../src/models/Fornecedor";
import { Patrimonio } from "../src/models/Patrimonio";
import { Responsavel } from "../src/models/Responsavel";
import { TipoMaterial } from "../src/models/TipoMaterial";
import "../src/database/index";

const SCHEMA_PATH = path.resolve(__dirname, "../../db/schema.sql");

let container: StartedPostgreSqlContainer;
let db: Sequelize;

beforeAll(async () => {
  container = await new PostgreSqlContainer("postgres:17").withDatabase("zelar").withUsername("zelar").withPassword("zelar").start();

  db = new Sequelize({
    dialect: "postgres",
    host: container.getHost(),
    port: container.getMappedPort(5432),
    database: container.getDatabase(),
    username: container.getUsername(),
    password: container.getPassword(),
    logging: false,
  });

  const schema = fs.readFileSync(SCHEMA_PATH, "utf8");
  await db.query(schema);
}, 60_000);

afterAll(async () => {
  await db.close();
  await container.stop();
});

async function validateSchema(model: ModelStatic<Model>) {
  const tableName = model.getTableName() as string;
  const dbColumns = await db.getQueryInterface().describeTable(tableName);
  const modelAttributes = model.getAttributes();

  for (const [columnName, attrDef] of Object.entries(modelAttributes)) {
    expect(dbColumns).toHaveProperty(columnName);

    const isPrimaryKey = attrDef.primaryKey === true;
    const expectedAllowNull = !isPrimaryKey && attrDef.allowNull !== false;
    expect(dbColumns[columnName].allowNull).toBe(expectedAllowNull);
  }
}

describe("Conexão", () => {
  it("autentica no banco sem erros", async () => {
    await expect(db.authenticate()).resolves.not.toThrow();
  });
});

describe("Schema: Responsavel", () => {
  it("tabela e colunas existem com nullability correta", () => validateSchema(Responsavel));
});

describe("Schema: Ambiente", () => {
  it("tabela e colunas existem com nullability correta", () => validateSchema(Ambiente));
});

describe("Schema: Fornecedor", () => {
  it("tabela e colunas existem com nullability correta", () => validateSchema(Fornecedor));
});

describe("Schema: TipoMaterial", () => {
  it("tabela e colunas existem com nullability correta", () => validateSchema(TipoMaterial));
});

describe("Schema: EstadoItem", () => {
  it("tabela e colunas existem com nullability correta", () => validateSchema(EstadoItem));
});

describe("Schema: Patrimonio", () => {
  it("tabela e colunas existem com nullability correta", () => validateSchema(Patrimonio));
});

describe("Associations", () => {
  it("Patrimonio pertence a Ambiente", () => {
    expect(Patrimonio.associations).toHaveProperty("Ambiente");
  });
  it("Patrimonio pertence a Responsavel", () => {
    expect(Patrimonio.associations).toHaveProperty("Responsavel");
  });
  it("Patrimonio pertence a TipoMaterial", () => {
    expect(Patrimonio.associations).toHaveProperty("TipoMaterial");
  });
  it("Patrimonio pertence a EstadoItem", () => {
    expect(Patrimonio.associations).toHaveProperty("EstadoItem");
  });
  it("Patrimonio pertence a Fornecedor", () => {
    expect(Patrimonio.associations).toHaveProperty("Fornecedor");
  });
  it("Ambiente pertence a Responsavel", () => {
    expect(Ambiente.associations).toHaveProperty("Responsavel");
  });
});
