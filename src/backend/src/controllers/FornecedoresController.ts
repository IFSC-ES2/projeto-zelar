import { NextFunction, Request, Response } from "express";
import { UniqueConstraintError } from "sequelize";
import { FornecedorService } from "../services/FornecedoresService";

const service = new FornecedorService();

export const FornecedorController = {
  async findAll(_req: Request, res: Response) {
    const items = await service.findAll();
    res.json(items);
  },

  async findById(req: Request, res: Response) {
    const item = await service.findById(Number(req.params.id));
    if (!item) return res.status(404).json({ error: "Fornecedor nao encontrado" });
    res.json(item);
  },

  async create(req: Request, res: Response, next: NextFunction) {
    const { nome, cnpj } = req.body;

    if (!nome || nome.trim() === "") {
      return res.status(400).json({ error: "Nome e obrigatorio" });
    }
    if (!cnpj || cnpj.trim() === "") {
      return res.status(400).json({ error: "CNPJ e obrigatorio" });
    }

    try {
      const item = await service.create(req.body);
      res.status(201).json(item);
    } catch (err) {
      if (err instanceof UniqueConstraintError) {
        return res.status(409).json({ error: "Ja existe um fornecedor cadastrado com este CNPJ ou nome" });
      }
      next(err);
    }
  },

  async update(req: Request, res: Response, next: NextFunction) {
    try {
      const item = await service.update(Number(req.params.id), req.body);
      if (!item) return res.status(404).json({ error: "Fornecedor nao encontrado" });
      res.json(item);
    } catch (err) {
      if (err instanceof UniqueConstraintError) {
        return res.status(409).json({ error: "Os dados informados entram em conflito com um fornecedor ja existente" });
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
      if (!item) return res.status(404).json({ error: "Fornecedor nao encontrado" });
      res.json(item);
    } catch (err) {
      next(err);
    }
  },

  async delete(req: Request, res: Response, next: NextFunction) {
    try {
      const id = Number(req.params.id);

      const vinculados = await service.findPatrimoniosVinculados(id);

      if (vinculados && vinculados.length > 0) {
        return res.status(409).json({
          error: "Fornecedor possui patrimonios vinculados e nao pode ser excluido.",
          patrimonios: vinculados.map(p => ({
            id: p.id,
            numero_patrimonio: p.numero_patrimonio,
            descricao: p.descricao,
          })),
        });
      }

      const deleted = await service.delete(id);
      if (!deleted) return res.status(404).json({ error: "Fornecedor nao encontrado" });

      res.status(204).send();
    } catch (err) {
      next(err);
    }
  },
};
