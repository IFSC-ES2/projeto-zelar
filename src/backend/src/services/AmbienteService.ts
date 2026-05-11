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
    return this.repo.create(data);
  }

  update(id: number, data: Partial<CreationAttributes<Ambiente>>) {
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
}
