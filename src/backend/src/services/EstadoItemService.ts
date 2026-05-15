import { CreationAttributes } from 'sequelize';
import { EstadoItemRepository } from '../repositories/EstadoItemRepository';
import { EstadoItem } from '../models/EstadoItem';

export class EstadoItemService {
  private repo = new EstadoItemRepository();

  findAll() {
    return this.repo.findAll();
  }

  findById(id: number) {
    return this.repo.findById(id);
  }

  create(data: CreationAttributes<EstadoItem>) {
    return this.repo.create(data);
  }

  update(id: number, data: Partial<CreationAttributes<EstadoItem>>) {
    return this.repo.update(id, data);
  }

  delete(id: number) {
    return this.repo.delete(id);
  }
}
