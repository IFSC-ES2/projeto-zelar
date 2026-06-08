import { CreationAttributes } from 'sequelize';
import { Solicitacao, SolicitacaoStatus } from '../models/Solicitacao';
import { SolicitacaoFilters, SolicitacaoRepository } from '../repositories/SolicitacaoRepository';

export class SolicitacaoService {
  private repo = new SolicitacaoRepository();

  findAll(filters: SolicitacaoFilters = {}) {
    return this.repo.findAll(filters);
  }

  findById(id: number) {
    return this.repo.findById(id);
  }

  create(data: CreationAttributes<Solicitacao>) {
    return this.repo.create(data);
  }

  update(id: number, data: Partial<CreationAttributes<Solicitacao>>) {
    return this.repo.update(id, data);
  }

  updateStatus(id: number, status: SolicitacaoStatus) {
    return this.repo.update(id, { status });
  }

  delete(id: number) {
    return this.repo.delete(id);
  }
}
