import { Request, Response } from "express";
import { ResponsavelService } from "../services/ResponsavelService";

const service = new ResponsavelService();

// TODO: este controller é apenas um exemplo com GET.
// Ainda falta os demais métodos (create, update, delete).
export const ResponsavelController = {
  async findAll(_req: Request, res: Response) {
    const items = await service.findAll();
    res.json(items);
  },

  async findById(req: Request, res: Response) {
    const item = await service.findById(Number(req.params.id));
    if (!item) return res.status(404).json({ error: "Não encontrado" });
    res.json(item);
  },
};
