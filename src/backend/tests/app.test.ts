import request from "supertest";
import app from "../src/app";

describe("GET /health", () => {
  it("returns status ok", async () => {
    const res = await request(app).get("/health");
    expect(res.status).toBe(200);
    expect(res.body).toEqual({ status: "ok" });
  });
});

describe("Swagger docs", () => {
  it("serves an OpenAPI spec generated from docs files", async () => {
    const res = await request(app).get("/swagger.json");

    expect(res.status).toBe(200);
    expect(res.body.openapi).toBe("3.0.0");
    expect(res.body.info.title).toBe("Zelar API");
    expect(res.body.paths).toHaveProperty("/api/ambientes");
  });

  it("serves Swagger UI", async () => {
    const res = await request(app).get("/api-docs/");

    expect(res.status).toBe(200);
    expect(res.text).toContain("Swagger UI");
  });
});
