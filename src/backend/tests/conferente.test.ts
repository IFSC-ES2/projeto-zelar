import request from "supertest";
import app from "../src/app";
import { ConferenteService } from "../src/services/ConferenteService";

jest.mock("../src/services/ConferenteService");

const MockedService = ConferenteService as jest.MockedClass<typeof ConferenteService>;

beforeEach(() => {
  jest.clearAllMocks();
});

describe("GET /api/conferentes", () => {
  it("200 com lista de conferentes", async () => {
    const list = [
      { id: 1, nome: "Ana Silva", email: "ana@test.com", cargo: "Tecnica", telefone: null },
    ];
    (MockedService.prototype.findAll as jest.Mock).mockResolvedValue(list);

    const res = await request(app).get("/api/conferentes");

    expect(res.status).toBe(200);
    expect(res.body).toEqual(list);
  });
});

describe("GET /api/conferentes/:id", () => {
  it("200 quando encontrado", async () => {
    const item = { id: 1, nome: "Ana Silva", email: "ana@test.com", cargo: "Tecnica", telefone: null };
    (MockedService.prototype.findById as jest.Mock).mockResolvedValue(item);

    const res = await request(app).get("/api/conferentes/1");

    expect(res.status).toBe(200);
    expect(res.body).toEqual(item);
  });

  it("404 quando nao encontrado", async () => {
    (MockedService.prototype.findById as jest.Mock).mockResolvedValue(null);

    const res = await request(app).get("/api/conferentes/999");

    expect(res.status).toBe(404);
    expect(res.body).toEqual({ error: "N\u00e3o encontrado" });
  });
});

describe("POST /api/conferentes", () => {
  it("201 com body valido", async () => {
    const created = { id: 1, nome: "Ana Silva", email: "ana@test.com", cargo: "Tecnica", telefone: null };
    (MockedService.prototype.create as jest.Mock).mockResolvedValue(created);

    const res = await request(app)
      .post("/api/conferentes")
      .send({ nome: "Ana Silva", email: "ana@test.com", cargo: "Tecnica" });

    expect(res.status).toBe(201);
    expect(res.body).toEqual(created);
  });

  it("400 sem nome", async () => {
    const res = await request(app)
      .post("/api/conferentes")
      .send({ email: "ana@test.com" });

    expect(res.status).toBe(400);
    expect(res.body).toEqual({ error: "nome \u00e9 obrigat\u00f3rio" });
  });

  it("400 nome vazio", async () => {
    const res = await request(app)
      .post("/api/conferentes")
      .send({ nome: "", email: "ana@test.com" });

    expect(res.status).toBe(400);
    expect(res.body).toEqual({ error: "nome \u00e9 obrigat\u00f3rio" });
  });

  it("400 sem email", async () => {
    const res = await request(app)
      .post("/api/conferentes")
      .send({ nome: "Ana Silva" });

    expect(res.status).toBe(400);
    expect(res.body).toEqual({ error: "email \u00e9 obrigat\u00f3rio" });
  });

  it("400 email vazio", async () => {
    const res = await request(app)
      .post("/api/conferentes")
      .send({ nome: "Ana Silva", email: "" });

    expect(res.status).toBe(400);
    expect(res.body).toEqual({ error: "email \u00e9 obrigat\u00f3rio" });
  });

  it("400 sem nome e sem email", async () => {
    const res = await request(app).post("/api/conferentes").send({});

    expect(res.status).toBe(400);
    expect(res.body).toEqual({ error: "nome \u00e9 obrigat\u00f3rio" });
  });

  it("500 quando service lanca erro", async () => {
    (MockedService.prototype.create as jest.Mock).mockRejectedValue(new Error("DB error"));

    const res = await request(app)
      .post("/api/conferentes")
      .send({ nome: "Ana Silva", email: "ana@test.com" });

    expect(res.status).toBe(500);
    expect(res.body).toEqual({ error: "Erro interno do servidor" });
  });
});

describe("PUT /api/conferentes/:id", () => {
  const updated = { id: 1, nome: "Ana Atualizada", email: "ana@test.com", cargo: "Tecnica", telefone: null };

  it("200 com dados validos", async () => {
    (MockedService.prototype.update as jest.Mock).mockResolvedValue(updated);

    const res = await request(app)
      .put("/api/conferentes/1")
      .send({ nome: "Ana Atualizada" });

    expect(res.status).toBe(200);
    expect(res.body).toEqual(updated);
  });

  it("404 quando id nao existe", async () => {
    (MockedService.prototype.update as jest.Mock).mockResolvedValue(null);

    const res = await request(app)
      .put("/api/conferentes/999")
      .send({ nome: "Ana Silva" });

    expect(res.status).toBe(404);
    expect(res.body).toEqual({ error: "N\u00e3o encontrado" });
  });

  it("500 quando service lanca erro", async () => {
    (MockedService.prototype.update as jest.Mock).mockRejectedValue(new Error("DB error"));

    const res = await request(app)
      .put("/api/conferentes/1")
      .send({ nome: "Ana Silva" });

    expect(res.status).toBe(500);
    expect(res.body).toEqual({ error: "Erro interno do servidor" });
  });
});

describe("DELETE /api/conferentes/:id", () => {
  it("204 quando removido", async () => {
    (MockedService.prototype.delete as jest.Mock).mockResolvedValue(true);

    const res = await request(app).delete("/api/conferentes/1");

    expect(res.status).toBe(204);
    expect(res.body).toEqual({});
  });

  it("404 quando id nao existe", async () => {
    (MockedService.prototype.delete as jest.Mock).mockResolvedValue(false);

    const res = await request(app).delete("/api/conferentes/999");

    expect(res.status).toBe(404);
    expect(res.body).toEqual({ error: "N\u00e3o encontrado" });
  });

  it("500 quando service lanca erro", async () => {
    (MockedService.prototype.delete as jest.Mock).mockRejectedValue(new Error("DB error"));

    const res = await request(app).delete("/api/conferentes/1");

    expect(res.status).toBe(500);
    expect(res.body).toEqual({ error: "Erro interno do servidor" });
  });
});
