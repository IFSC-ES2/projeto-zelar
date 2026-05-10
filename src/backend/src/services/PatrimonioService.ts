import PatrimonioRepository from '../repositories/PatrimonioRepository';
import { PatrimonioCreationAttributes, PatrimonioAttributes } from '../models/Patrimonio';
import Patrimonio from '../models/Patrimonio';

class PatrimonioService {
  async createPatrimonio(data: PatrimonioCreationAttributes): Promise<Patrimonio> {
    return await PatrimonioRepository.create(data);
  }

  async getAllPatrimonios(): Promise<Patrimonio[]> {
    return await PatrimonioRepository.findAll();
  }

  async getPatrimonioById(id: number): Promise<Patrimonio> {
    const patrimonio = await PatrimonioRepository.findById(id);
    if (!patrimonio) {
      throw new Error('Patrimônio não encontrado');
    }
    return patrimonio;
  }

  async updatePatrimonio(id: number, data: Partial<PatrimonioAttributes>): Promise<Patrimonio> {
    const updatedPatrimonio = await PatrimonioRepository.update(id, data);
    if (!updatedPatrimonio) {
      throw new Error('Patrimônio não encontrado para atualização');
    }
    return updatedPatrimonio;
  }

  async deletePatrimonio(id: number): Promise<boolean> {
    const deleted = await PatrimonioRepository.delete(id);
    if (!deleted) {
      throw new Error('Patrimônio não encontrado para exclusão');
    }
    return deleted;
  }
}

export default new PatrimonioService();