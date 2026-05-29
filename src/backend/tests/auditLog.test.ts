import request from "supertest";
import app from "../src/app";
import { sequelize } from "../src/database/connection";
import { TipoMaterial } from "../src/models/TipoMaterial";
import { AuditLog } from "../src/models/AuditLog";

describe("Testes de integração do log de auditoria", () => {
  beforeAll(async () => {
    await sequelize.sync({ force: true });
  });

  afterAll(async () => {
    await sequelize.close();
  });

  beforeEach(async () => {
    await AuditLog.destroy({ where: {}, truncate: true, cascade: true });
    await TipoMaterial.destroy({ where: {}, force: true });
  });

  it("deve registrar automaticamente quando um TipoMaterial é criado", async () => {
    const res = await request(app)
      .post("/api/tipo-material")
      .send({ nome: "Audit-Create-Test" });

    expect(res.status).toBe(201);
    const createdId = res.body.id;

    const logs = await AuditLog.findAll({
      where: { tabela: "tipo_material", registro_id: createdId },
    });

    expect(logs.length).toBe(1);
    const log = logs[0];
    expect(log.acao).toBe("CREATE");
    expect(log.dados_anteriores).toBeNull();
    expect(log.dados_novos).toBeDefined();
    expect(log.dados_novos?.nome).toBe("Audit-Create-Test");
    expect(log.usuario).toBe("sistema");
  });

  it("deve registrar automaticamente quando um TipoMaterial é atualizado", async () => {
    const item = await TipoMaterial.create({ nome: "Original Name" });

    await request(app)
      .put(`/api/tipo-material/${item.id}`)
      .send({ nome: "Updated Name" });

    const logs = await AuditLog.findAll({
      where: { tabela: "tipo_material", registro_id: item.id },
      order: [["created_at", "ASC"]],
    });

    expect(logs.length).toBe(2);
    expect(logs[0].acao).toBe("CREATE");

    const updateLog = logs[1];
    expect(updateLog.acao).toBe("UPDATE");
    expect(updateLog.dados_anteriores?.nome).toBe("Original Name");
    expect(updateLog.dados_novos?.nome).toBe("Updated Name");
    expect(updateLog.campos_alterados).toContain("nome");
  });

  it("deve registrar automaticamente quando um TipoMaterial é excluído", async () => {
    const item = await TipoMaterial.create({ nome: "To Be Deleted" });

    await request(app).delete(`/api/tipo-material/${item.id}`);

    const logs = await AuditLog.findAll({
      where: { tabela: "tipo_material", registro_id: item.id },
      order: [["created_at", "ASC"]],
    });

    expect(logs.length).toBe(2);
    expect(logs[0].acao).toBe("CREATE");

    const deleteLog = logs[1];
    expect(deleteLog.acao).toBe("DELETE");
    expect(deleteLog.dados_anteriores?.nome).toBe("To Be Deleted");
    expect(deleteLog.dados_novos).toBeNull();
  });

  it("deve listar todos os logs paginados via GET /api/audit-log", async () => {
    await TipoMaterial.create({ nome: "Item 1" });
    await TipoMaterial.create({ nome: "Item 2" });
    await TipoMaterial.create({ nome: "Item 3" });

    const res = await request(app)
      .get("/api/audit-log")
      .query({ page: 1, limit: 2 });

    expect(res.status).toBe(200);
    expect(res.body).toHaveProperty("total", 3);
    expect(res.body).toHaveProperty("pages", 2);
    expect(res.body).toHaveProperty("currentPage", 1);
    expect(res.body).toHaveProperty("limit", 2);
    expect(res.body.data.length).toBe(2);
  });

  it("deve retornar o histórico de um item específico via GET /api/audit-log/:tabela/:registroId", async () => {
    const item = await TipoMaterial.create({ nome: "Item History" });
    await item.update({ nome: "Item History v2" });

    const res = await request(app).get(
      `/api/audit-log/tipo_material/${item.id}`,
    );

    expect(res.status).toBe(200);
    expect(res.body.length).toBe(2);
    expect(res.body[0].acao).toBe("UPDATE");
    expect(res.body[1].acao).toBe("CREATE");
  });
});
