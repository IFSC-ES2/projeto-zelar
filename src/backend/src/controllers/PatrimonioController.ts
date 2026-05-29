import { NextFunction, Request, Response } from "express";
import { ForeignKeyConstraintError, UniqueConstraintError } from "sequelize";
import { PatrimonioService } from "../services/PatrimonioService";

const service = new PatrimonioService();

export const PatrimonioController = {
  async findAll(_req: Request, res: Response) {
    const items = await service.findAll();
    res.json(items);
  },

  async findById(req: Request, res: Response) {
    const item = await service.findById(Number(req.params.id));
    if (!item) return res.status(404).json({ error: "Patrimonio nao encontrado" });
    res.json(item);
  },

  async create(req: Request, res: Response, next: NextFunction) {
    const {
      numero_patrimonio,
      descricao,
      valor,
      tipo_material_id,
      estado_item_id,
      ambiente_id,
      responsavel_id,
    } = req.body;

    if (!numero_patrimonio || String(numero_patrimonio).trim() === "") {
      return res.status(400).json({ error: "numero_patrimonio e obrigatorio" });
    }
    if (!descricao || String(descricao).trim() === "") {
      return res.status(400).json({ error: "descricao e obrigatoria" });
    }
    if (valor === undefined || valor === null || isNaN(Number(valor)) || Number(valor) < 0) {
      return res.status(400).json({ error: "valor e obrigatorio e deve ser um numero nao negativo" });
    }
    if (!tipo_material_id) {
      return res.status(400).json({ error: "tipo_material_id e obrigatorio" });
    }
    if (!estado_item_id) {
      return res.status(400).json({ error: "estado_item_id e obrigatorio" });
    }
    if (!ambiente_id) {
      return res.status(400).json({ error: "ambiente_id e obrigatorio" });
    }
    if (!responsavel_id) {
      return res.status(400).json({ error: "responsavel_id e obrigatorio" });
    }

    try {
      const item = await service.create(req.body);
      res.status(201).json(item);
    } catch (err) {
      if (err instanceof UniqueConstraintError) {
        return res.status(409).json({ error: "Ja existe um patrimonio cadastrado com este numero" });
      }
      if (err instanceof ForeignKeyConstraintError) {
        return res.status(400).json({ error: "Referencia invalida: verifique tipo_material, estado_item, ambiente, responsavel ou fornecedor" });
      }
      next(err);
    }
  },

  async update(req: Request, res: Response, next: NextFunction) {
    try {
      const item = await service.update(Number(req.params.id), req.body);
      if (!item) return res.status(404).json({ error: "Patrimonio nao encontrado" });
      res.json(item);
    } catch (err) {
      if (err instanceof UniqueConstraintError) {
        return res.status(409).json({ error: "Ja existe um patrimonio cadastrado com este numero" });
      }
      if (err instanceof ForeignKeyConstraintError) {
        return res.status(400).json({ error: "Referencia invalida: verifique tipo_material, estado_item, ambiente, responsavel ou fornecedor" });
      }
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
      if (!item) return res.status(404).json({ error: "Patrimonio nao encontrado" });
      res.json(item);
    } catch (err) {
      next(err);
    }
  },

  async delete(req: Request, res: Response, next: NextFunction) {
    try {
      const deleted = await service.delete(Number(req.params.id));
      if (!deleted) return res.status(404).json({ error: "Patrimonio nao encontrado" });
      res.status(204).send();
    } catch (err) {
      next(err);
    }
  },
};
