import AmbienteRepository from '../repositories/AmbienteRepository';
import { AmbienteCreationAttributes, AmbienteAttributes } from '../models/Ambiente';
import Ambiente from '../models/Ambiente';

class AmbienteService {
  async createAmbiente(data: AmbienteCreationAttributes): Promise<Ambiente> {
    return await AmbienteRepository.create(data);
  }

  async getAllAmbientes(): Promise<Ambiente[]> {
    return await AmbienteRepository.findAll();
  }

  async getAmbienteById(id: number): Promise<Ambiente> {
    const ambiente = await AmbienteRepository.findById(id);
    if (!ambiente) {
      throw new Error('Ambiente não encontrado');
    }
    return ambiente;
  }

  async updateAmbiente(id: number, data: Partial<AmbienteAttributes>): Promise<Ambiente> {
    const updatedAmbiente = await AmbienteRepository.update(id, data);
    if (!updatedAmbiente) {
      throw new Error('Ambiente não encontrado para atualização');
    }
    return updatedAmbiente;
  }

  async deleteAmbiente(id: number): Promise<boolean> {
    const deleted = await AmbienteRepository.delete(id);
    if (!deleted) {
      throw new Error('Ambiente não encontrado para exclusão');
    }
    return deleted;
  }
}

export default new AmbienteService();