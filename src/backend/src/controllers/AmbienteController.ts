import { NextFunction, Request, Response } from "express";
import { ForeignKeyConstraintError, UniqueConstraintError } from "sequelize";
import { AmbienteService } from "../services/AmbienteService";

const service = new AmbienteService();

export const AmbienteController = {
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
    const { nome } = req.body;

    if (!nome || nome.trim() === '') {
      return res.status(400).json({ error: 'nome é obrigatório' });
    }

    try {
      const item = await service.create(req.body);
      res.status(201).json(item);
    } catch (err) {
      if (err instanceof ForeignKeyConstraintError) {
        return res.status(400).json({ error: 'Responsável informado não existe' });
      }
      if (err instanceof UniqueConstraintError) {
        return res.status(409).json({ error: 'Já existe um ambiente com esses dados' });
      }
      next(err);
    }
  },

  async update(req: Request, res: Response, next: NextFunction) {
    try {
      const item = await service.update(Number(req.params.id), req.body);
      if (!item) return res.status(404).json({ error: 'Não encontrado' });
      res.json(item);
    } catch (err) {
      if (err instanceof ForeignKeyConstraintError) {
        return res.status(400).json({ error: 'Responsável informado não existe' });
      }
      next(err);
    }
  },

  async delete(req: Request, res: Response, next: NextFunction) {
    try {
      const deleted = await service.delete(Number(req.params.id));
      if (!deleted) return res.status(404).json({ error: 'Não encontrado' });
      res.status(204).send();
    } catch (err) {
      if (err instanceof ForeignKeyConstraintError) {
        return res.status(409).json({ error: 'Ambiente possui patrimônios vinculados e não pode ser excluído' });
      }
      next(err);
    }
  },
};
