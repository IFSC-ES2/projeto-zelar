import { CreationAttributes } from 'sequelize';
import { Patrimonio } from '../models/Patrimonio';
import { PatrimonioRepository } from '../repositories/PatrimonioRepository';

export class PatrimonioService {
  private repo = new PatrimonioRepository();

  findAll() {
    return this.repo.findAll();
  }

  findById(id: number) {
    return this.repo.findById(id);
  }

  create(data: CreationAttributes<Patrimonio>) {
    return this.repo.create(data);
  }

  update(id: number, data: Partial<CreationAttributes<Patrimonio>>) {
    return this.repo.update(id, data);
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
