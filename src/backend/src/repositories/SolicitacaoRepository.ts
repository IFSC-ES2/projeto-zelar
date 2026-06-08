import { FindOptions, WhereOptions } from 'sequelize';
import { Conferente } from '../models/Conferente';
import { Patrimonio } from '../models/Patrimonio';
import { Solicitacao } from '../models/Solicitacao';
import { BaseRepository } from './BaseRepository';

export type SolicitacaoFilters = {
  status?: string;
  patrimonio_id?: number;
};

export class SolicitacaoRepository extends BaseRepository<Solicitacao> {
  constructor() {
    super(Solicitacao);
  }

  findAll(filters: SolicitacaoFilters = {}): Promise<Solicitacao[]> {
    const where: WhereOptions = {};

    if (filters.status) where.status = filters.status;
    if (filters.patrimonio_id) where.patrimonio_id = filters.patrimonio_id;

    const options: FindOptions = {
      where,
      include: [
        { model: Patrimonio, attributes: ['id', 'numero_patrimonio', 'descricao'] },
        { model: Conferente, attributes: ['id', 'nome'] },
      ],
      order: [['created_at', 'DESC']],
    };

    return this.model.findAll(options);
  }
}
