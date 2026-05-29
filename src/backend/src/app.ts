import express, { NextFunction, Request, Response } from "express";
import routes from "./routes";

const app = express();

const CORS_ORIGIN = process.env.CORS_ORIGIN ?? '*';

app.use((req, res, next) => {
  const origin = req.headers.origin;
  if (CORS_ORIGIN === '*' || origin === CORS_ORIGIN) {
    res.header('Access-Control-Allow-Origin', origin ?? '*');
  }
  res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, PATCH, OPTIONS');
  res.header('Access-Control-Allow-Headers', 'Content-Type, Authorization');
  res.header('Access-Control-Allow-Credentials', 'true');
  if (req.method === 'OPTIONS') return res.sendStatus(200);
  next();
});

app.use(express.json());

app.get("/health", (_req, res) => {
  res.json({ status: "ok" });
});

app.use("/api", routes);

app.use((err: Error, _req: Request, res: Response, _next: NextFunction) => {
  console.error(err);
  res.status(500).json({ error: "Erro interno do servidor" });
});

export default app;
