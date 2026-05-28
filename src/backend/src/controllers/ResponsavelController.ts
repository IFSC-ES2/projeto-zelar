import { NextFunction, Request, Response } from "express";
import { ResponsavelService } from "../services/ResponsavelService";

const service = new ResponsavelService();

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

  async create(req: Request, res: Response, next: NextFunction) {
    const { nome, email } = req.body;

    if (!nome || nome.trim() === '') {
      return res.status(400).json({ error: 'nome é obrigatório' });
    }
    if (!email || email.trim() === '') {
      return res.status(400).json({ error: 'email é obrigatório' });
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
      if (!item) return res.status(404).json({ error: 'Não encontrado' });
      res.json(item);
    } catch (err) {
      next(err);
    }
  },

  async listDeletados(_req: Request, res: Response, next: NextFunction) {
    try {
      const items = await service.findDeleted();
      res.json(items);
    } catch (err) {
      next(err);
    }
  },

  async restaurar(req: Request, res: Response, next: NextFunction) {
    try {
      const item = await service.restore(Number(req.params.id));
      if (!item) return res.status(404).json({ error: 'Não encontrado' });
      res.json(item);
    } catch (err) {
      next(err);
    }
  },

  async delete(req: Request, res: Response, next: NextFunction) {
    try {
      const id = Number(req.params.id);

      const patrimonios = await service.findPatrimoniosVinculados(id);
      if (patrimonios.length > 0) {
        return res.status(409).json({
          error: 'Responsável possui patrimônios vinculados e não pode ser excluído. Reatribua os patrimônios antes de excluir.',
          patrimonios: patrimonios.map(p => ({ id: p.id, numero_patrimonio: p.numero_patrimonio, descricao: p.descricao })),
        });
      }

      const ambientes = await service.findAmbientesVinculados(id);
      if (ambientes.length > 0) {
        return res.status(409).json({
          error: 'Responsável possui ambientes vinculados e não pode ser excluído. Desvincule os ambientes antes de excluir.',
          ambientes: ambientes.map(a => ({ id: a.id, nome: a.nome, bloco: a.bloco, andar: a.andar })),
        });
      }

      const deleted = await service.delete(id);
      if (!deleted) return res.status(404).json({ error: 'Não encontrado' });
      res.status(204).send();
    } catch (err) {
      next(err);
    }
  },
};
