import { NextFunction, Request, Response } from "express";
import { ForeignKeyConstraintError, UniqueConstraintError } from "sequelize";
import { FornecedorService } from "../services/FornecedoresService";

const service = new FornecedorService();

export const FornecedorController = {
  async findAll(_req: Request, res: Response) {
    const items = await service.findAll();
    res.json(items);
  },

  async findById(req: Request, res: Response) {
    const item = await service.findById(Number(req.params.id));
    if (!item) return res.status(404).json({ error: "Fornecedor não encontrado" });
    res.json(item);
  },

  async create(req: Request, res: Response, next: NextFunction) {
    const { nome_fantasia, razao_social, cnpj_cpf } = req.body;

    // Validação de campos obrigatórios
    if (!razao_social || razao_social.trim() === '') {
      return res.status(400).json({ error: 'Razão Social é obrigatória' });
    }
    if (!cnpj_cpf || cnpj_cpf.trim() === '') {
      return res.status(400).json({ error: 'CNPJ/CPF é obrigatório' });
    }

    try {
      const item = await service.create(req.body);
      res.status(201).json(item);
    } catch (err) {
      if (err instanceof UniqueConstraintError) {
        return res.status(409).json({ error: 'Já existe um fornecedor cadastrado com este CNPJ/CPF ou Razão Social' });
      }
      next(err);
    }
  },

  async update(req: Request, res: Response, next: NextFunction) {
    try {
      const item = await service.update(Number(req.params.id), req.body);
      if (!item) return res.status(404).json({ error: 'Fornecedor não encontrado' });
      res.json(item);
    } catch (err) {
      if (err instanceof UniqueConstraintError) {
        return res.status(409).json({ error: 'Os dados informados entram em conflito com um fornecedor já existente' });
      }
      next(err);
    }
  },

  async delete(req: Request, res: Response, next: NextFunction) {
    try {
      const id = Number(req.params.id);
      
      const vinculados = await service.findPatrimoniosVinculados(id);
      
      if (vinculados && vinculados.length > 0) {
        return res.status(409).json({
          error: 'Fornecedor possui patrimônios vinculados e não pode ser excluído.',
          patrimonios: vinculados.map(p => ({ 
            id: p.id, 
            numero_patrimonio: p.numero_patrimonio, 
            descricao: p.descricao 
          })),
        });
      }

      const deleted = await service.delete(id);
      if (!deleted) return res.status(404).json({ error: 'Fornecedor não encontrado' });
      
      res.status(204).send();
    } catch (err) {
      next(err);
    }
  },
};