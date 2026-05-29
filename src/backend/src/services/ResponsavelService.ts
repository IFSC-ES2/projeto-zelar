import { CreationAttributes } from 'sequelize';
import { Ambiente } from '../models/Ambiente';
import { Patrimonio } from '../models/Patrimonio';
import { Responsavel } from '../models/Responsavel';
import { ResponsavelRepository } from '../repositories/ResponsavelRepository';

export class ResponsavelService {
  private repo = new ResponsavelRepository();

  findAll() {
    return this.repo.findAll();
  }

  findById(id: number) {
    return this.repo.findById(id);
  }

  create(data: CreationAttributes<Responsavel>) {
    return this.repo.create(data);
  }

  update(id: number, data: Partial<CreationAttributes<Responsavel>>) {
    return this.repo.update(id, data);
  }

  async findPatrimoniosVinculados(id: number) {
    return Patrimonio.findAll({
      where: { responsavel_id: id },
      attributes: ['id', 'numero_patrimonio', 'descricao'],
    });
  }

  async findAmbientesVinculados(id: number) {
    return Ambiente.findAll({
      where: { responsavel_id: id },
      attributes: ['id', 'nome', 'bloco', 'andar'],
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