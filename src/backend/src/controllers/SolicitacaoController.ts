import { NextFunction, Request, Response } from 'express';
import { ForeignKeyConstraintError } from 'sequelize';
import { SolicitacaoStatus, SolicitacaoTipo } from '../models/Solicitacao';
import { SolicitacaoService } from '../services/SolicitacaoService';

const service = new SolicitacaoService();
const tiposPermitidos: SolicitacaoTipo[] = ['manutencao', 'substituicao'];
const statusPermitidos: SolicitacaoStatus[] = ['aberta', 'em_andamento', 'concluida', 'cancelada'];

function isTipoValido(tipo: unknown): tipo is SolicitacaoTipo {
  return typeof tipo === 'string' && tiposPermitidos.includes(tipo as SolicitacaoTipo);
}

function isStatusValido(status: unknown): status is SolicitacaoStatus {
  return typeof status === 'string' && statusPermitidos.includes(status as SolicitacaoStatus);
}

function parseId(value: unknown) {
  const id = Number(value);
  return Number.isInteger(id) && id > 0 ? id : null;
}

export const SolicitacaoController = {
  async findAll(req: Request, res: Response, next: NextFunction) {
    try {
      const { status, patrimonio_id } = req.query;

      if (status !== undefined && !isStatusValido(status)) {
        return res.status(400).json({ error: 'status invalido' });
      }

      const patrimonioId = patrimonio_id ? parseId(patrimonio_id) : undefined;
      if (patrimonio_id !== undefined && !patrimonioId) {
        return res.status(400).json({ error: 'patrimonio_id invalido' });
      }

      const filters = {
        status: typeof status === 'string' ? status : undefined,
        patrimonio_id: patrimonioId ?? undefined,
      };

      const items = await service.findAll(filters);
      res.json(items);
    } catch (err) {
      next(err);
    }
  },

  async findById(req: Request, res: Response, next: NextFunction) {
    try {
      const item = await service.findById(Number(req.params.id));
      if (!item) return res.status(404).json({ error: 'Solicitacao nao encontrada' });
      res.json(item);
    } catch (err) {
      next(err);
    }
  },

  async create(req: Request, res: Response, next: NextFunction) {
    const { patrimonio_id, tipo, status } = req.body;

    const patrimonioId = parseId(patrimonio_id);
    if (!patrimonioId) {
      return res.status(400).json({ error: 'patrimonio_id e obrigatorio' });
    }
    if (!isTipoValido(tipo)) {
      return res.status(400).json({ error: 'tipo invalido' });
    }
    if (status !== undefined && !isStatusValido(status)) {
      return res.status(400).json({ error: 'status invalido' });
    }

    try {
      const item = await service.create({ ...req.body, patrimonio_id: patrimonioId });
      res.status(201).json(item);
    } catch (err) {
      if (err instanceof ForeignKeyConstraintError) {
        return res.status(400).json({ error: 'Referencia invalida: verifique patrimonio ou conferente' });
      }
      next(err);
    }
  },

  async update(req: Request, res: Response, next: NextFunction) {
    const { tipo, status } = req.body;

    if (tipo !== undefined && !isTipoValido(tipo)) {
      return res.status(400).json({ error: 'tipo invalido' });
    }
    if (status !== undefined && !isStatusValido(status)) {
      return res.status(400).json({ error: 'status invalido' });
    }

    try {
      const item = await service.update(Number(req.params.id), req.body);
      if (!item) return res.status(404).json({ error: 'Solicitacao nao encontrada' });
      res.json(item);
    } catch (err) {
      if (err instanceof ForeignKeyConstraintError) {
        return res.status(400).json({ error: 'Referencia invalida: verifique patrimonio ou conferente' });
      }
      next(err);
    }
  },

  async updateStatus(req: Request, res: Response, next: NextFunction) {
    const { status } = req.body;

    if (!isStatusValido(status)) {
      return res.status(400).json({ error: 'status invalido' });
    }

    try {
      const item = await service.updateStatus(Number(req.params.id), status);
      if (!item) return res.status(404).json({ error: 'Solicitacao nao encontrada' });
      res.json(item);
    } catch (err) {
      next(err);
    }
  },

  async delete(req: Request, res: Response, next: NextFunction) {
    try {
      const deleted = await service.delete(Number(req.params.id));
      if (!deleted) return res.status(404).json({ error: 'Solicitacao nao encontrada' });
      res.status(204).send();
    } catch (err) {
      next(err);
    }
  },
};
