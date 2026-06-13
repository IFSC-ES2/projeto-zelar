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
    const { nome, responsavel_id } = req.body;

    if (!nome || nome.trim() === '') {
      return res.status(400).json({ error: 'nome é obrigatório' });
    }

    if (!responsavel_id) {
      return res.status(400).json({ error: 'responsavel_id é obrigatório' });
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

  async updateLocalizacao(req: Request, res: Response, next: NextFunction) {
    const id = Number(req.params.id);
    if (!Number.isInteger(id) || id <= 0) {
      return res.status(400).json({ error: 'id invalido' });
    }

    const { latitude, longitude, precisao_metros } = req.body;

    if (latitude === undefined || latitude === null || isNaN(Number(latitude))) {
      return res.status(400).json({ error: 'latitude e obrigatoria e deve ser numerica' });
    }
    if (longitude === undefined || longitude === null || isNaN(Number(longitude))) {
      return res.status(400).json({ error: 'longitude e obrigatoria e deve ser numerica' });
    }
    if (Number(latitude) < -90 || Number(latitude) > 90) {
      return res.status(400).json({ error: 'latitude deve estar entre -90 e 90' });
    }
    if (Number(longitude) < -180 || Number(longitude) > 180) {
      return res.status(400).json({ error: 'longitude deve estar entre -180 e 180' });
    }
    if (
      precisao_metros !== undefined &&
      precisao_metros !== null &&
      (isNaN(Number(precisao_metros)) || Number(precisao_metros) < 0)
    ) {
      return res.status(400).json({ error: 'precisao_metros deve ser numerica e nao negativa' });
    }

    try {
      const item = await service.updateLocalizacao(id, {
        latitude: Number(latitude),
        longitude: Number(longitude),
        precisao_metros:
          precisao_metros === undefined || precisao_metros === null ? null : Number(precisao_metros),
        localizacao_observacao: req.body.localizacao_observacao ?? null,
      });
      if (!item) return res.status(404).json({ error: 'Não encontrado' });
      res.json(item);
    } catch (err) {
      next(err);
    }
  },

  async clearLocalizacao(req: Request, res: Response, next: NextFunction) {
    const id = Number(req.params.id);
    if (!Number.isInteger(id) || id <= 0) {
      return res.status(400).json({ error: 'id invalido' });
    }
    try {
      const item = await service.clearLocalizacao(id);
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
      const vinculados = await service.findPatrimoniosVinculados(id);
      if (vinculados.length > 0) {
        return res.status(409).json({
          error: 'Ambiente possui patrimônios vinculados e não pode ser excluído. Reatribua os patrimônios antes de excluir.',
          patrimonios: vinculados.map(p => ({ id: p.id, numero_patrimonio: p.numero_patrimonio, descricao: p.descricao })),
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
