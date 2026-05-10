import ResponsavelRepository from '../repositories/ResponsavelRepository';
import { ResponsavelCreationAttributes, ResponsavelAttributes } from '../models/Responsavel';
import Responsavel from '../models/Responsavel';

class ResponsavelService {
  async createResponsavel(data: ResponsavelCreationAttributes): Promise<Responsavel> {
    return await ResponsavelRepository.create(data);
  }

  async getAllResponsaveis(): Promise<Responsavel[]> {
    return await ResponsavelRepository.findAll();
  }

  async getResponsavelById(id: number): Promise<Responsavel> {
    const responsavel = await ResponsavelRepository.findById(id);
    if (!responsavel) {
      throw new Error('Responsável não encontrado');
    }
    return responsavel;
  }

  async updateResponsavel(id: number, data: Partial<ResponsavelAttributes>): Promise<Responsavel> {
    const updatedResponsavel = await ResponsavelRepository.update(id, data);
    if (!updatedResponsavel) {
      throw new Error('Responsável não encontrado para atualização');
    }
    return updatedResponsavel;
  }

  async deleteResponsavel(id: number): Promise<boolean> {
    const deleted = await ResponsavelRepository.delete(id);
    if (!deleted) {
      throw new Error('Responsável não encontrado para exclusão');
    }
    return deleted;
  }
}

export default new ResponsavelService();