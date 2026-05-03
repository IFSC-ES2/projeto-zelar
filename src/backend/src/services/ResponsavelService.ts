import { CreationAttributes } from 'sequelize';
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

  delete(id: number) {
    return this.repo.delete(id);
  }
}