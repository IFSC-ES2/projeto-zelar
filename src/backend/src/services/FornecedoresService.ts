import { CreationAttributes } from 'sequelize';
import { Fornecedor } from '../models/Fornecedor';
import { Patrimonio } from '../models/Patrimonio';
import { FornecedorRepository } from '../repositories/FornecedoresRepository';

export class FornecedorService {
  private repo = new FornecedorRepository();

  findAll() {
    return this.repo.findAll();
  }

  findById(id: number) {
    return this.repo.findById(id);
  }

  create(data: CreationAttributes<Fornecedor>) {
    return this.repo.create(data);
  }

  update(id: number, data: Partial<CreationAttributes<Fornecedor>>) {
    return this.repo.update(id, data);
  }


  async findPatrimoniosVinculados(id: number) {
    return Patrimonio.findAll({
      where: { fornecedor_id: id },
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