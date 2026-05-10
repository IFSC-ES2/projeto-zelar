import FornecedorRepository from '../repositories/FornecedorRepository';
import { FornecedorCreationAttributes, FornecedorAttributes } from '../models/Fornecedor';
import Fornecedor from '../models/Fornecedor';

class FornecedorService {
  async createFornecedor(data: FornecedorCreationAttributes): Promise<Fornecedor> {
    return await FornecedorRepository.create(data);
  }

  async getAllFornecedores(): Promise<Fornecedor[]> {
    return await FornecedorRepository.findAll();
  }

  async getFornecedorById(id: number): Promise<Fornecedor> {
    const fornecedor = await FornecedorRepository.findById(id);
    if (!fornecedor) {
      throw new Error('Fornecedor não encontrado');
    }
    return fornecedor;
  }

  async updateFornecedor(id: number, data: Partial<FornecedorAttributes>): Promise<Fornecedor> {
    const updatedFornecedor = await FornecedorRepository.update(id, data);
    if (!updatedFornecedor) {
      throw new Error('Fornecedor não encontrado para atualização');
    }
    return updatedFornecedor;
  }

  async deleteFornecedor(id: number): Promise<boolean> {
    const deleted = await FornecedorRepository.delete(id);
    if (!deleted) {
      throw new Error('Fornecedor não encontrado para exclusão');
    }
    return deleted;
  }
}

export default new FornecedorService();