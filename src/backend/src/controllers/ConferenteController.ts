import { NextFunction, Request, Response } from "express";
import { ConferenteService } from "../services/ConferenteService";

const service = new ConferenteService();

export const ConferenteController = {
  async findAll(_req: Request, res: Response) {
    const items = await service.findAll();
    res.json(items);
  },

  async findById(req: Request, res: Response) {
    const item = await service.findById(Number(req.params.id));
    if (!item) return res.status(404).json({ error: "N\u00e3o encontrado" });
    res.json(item);
  },

  async create(req: Request, res: Response, next: NextFunction) {
    const { nome, email } = req.body;

    if (!nome || nome.trim() === "") {
      return res.status(400).json({ error: "nome \u00e9 obrigat\u00f3rio" });
    }
    if (!email || email.trim() === "") {
      return res.status(400).json({ error: "email \u00e9 obrigat\u00f3rio" });
    }

    try {
      const item = await service.create(req.body);
      res.status(201).json(item);
    } catch (err) {
      next(err);
    }
  },

  async update(req: Request, res: Response, next: NextFunction) {
    try {
      const item = await service.update(Number(req.params.id), req.body);
      if (!item) return res.status(404).json({ error: "N\u00e3o encontrado" });
      res.json(item);
    } catch (err) {
      next(err);
    }
  },

  async delete(req: Request, res: Response, next: NextFunction) {
    try {
      const deleted = await service.delete(Number(req.params.id));
      if (!deleted) return res.status(404).json({ error: "N\u00e3o encontrado" });
      res.status(204).send();
    } catch (err) {
      next(err);
    }
  },
};
