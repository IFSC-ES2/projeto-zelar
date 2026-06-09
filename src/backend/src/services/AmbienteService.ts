import { CreationAttributes } from 'sequelize';
import { Ambiente } from '../models/Ambiente';
import { Patrimonio } from '../models/Patrimonio';
import { AmbienteRepository } from '../repositories/AmbienteRepository';

export class AmbienteService {
  private repo = new AmbienteRepository();

  findAll() {
    return this.repo.findAll();
  }

  findById(id: number) {
    return this.repo.findById(id);
  }

  create(data: CreationAttributes<Ambiente>) {
    if (!data.responsavel_id) {
      throw new Error('responsavel_id é obrigatório');
    }
    return this.repo.create(data);
  }

  update(id: number, data: Partial<CreationAttributes<Ambiente>>) {
    if (data.responsavel_id === null || data.responsavel_id === undefined) {
      throw new Error('responsavel_id é obrigatório');
    }
    return this.repo.update(id, data);
  }

  async findPatrimoniosVinculados(id: number) {
    return Patrimonio.findAll({
      where: { ambiente_id: id },
      attributes: ['id', 'numero_patrimonio', 'descricao'],
    });
  }

  delete(id: number) {
    return this.repo.delete(id);
  }

  findDeleted() {
    return this.repo.findDeleted();
  }

  restore(id: number) {
    return this.repo.restore(id);
  }
}
