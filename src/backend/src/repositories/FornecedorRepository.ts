import Fornecedor, { FornecedorCreationAttributes, FornecedorAttributes } from '../models/Fornecedor';

class FornecedorRepository {
  async create(data: FornecedorCreationAttributes): Promise<Fornecedor> {
    return await Fornecedor.create(data);
  }

  async findAll(): Promise<Fornecedor[]> {
    return await Fornecedor.findAll();
  }

  async findById(id: number): Promise<Fornecedor | null> {
    return await Fornecedor.findByPk(id);
  }

  async update(id: number, data: Partial<FornecedorAttributes>): Promise<Fornecedor | null> {
    const fornecedor = await Fornecedor.findByPk(id);
    if (fornecedor) {
      return await fornecedor.update(data);
    }
    return null;
  }

  async delete(id: number): Promise<boolean> {
    const fornecedor = await Fornecedor.findByPk(id);
    if (fornecedor) {
      await fornecedor.destroy();
      return true;
    }
    return false;
  }
}

export default new FornecedorRepository();