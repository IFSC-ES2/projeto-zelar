import { CreationAttributes } from 'sequelize';
import { EstadoItemRepository } from '../repositories/EstadoItemRepository';
import { EstadoItem } from '../models/EstadoItem';
import { Patrimonio } from '../models/Patrimonio';

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

  async findPatrimoniosVinculados(id: number) {
    return Patrimonio.findAll({
      where: { estado_item_id: id },
      attributes: ['id', 'numero_patrimonio', 'descricao'],
    });
  }

  delete(id: number) {
    return this.repo.delete(id);
  }
}
