import ConferenteRepository from '../repositories/ConferenteRepository';
import { ConferenteCreationAttributes, ConferenteAttributes } from '../models/Conferente';
import Conferente from '../models/Conferente';

class ConferenteService {
  async createConferente(data: ConferenteCreationAttributes): Promise<Conferente> {
    return await ConferenteRepository.create(data);
  }

  async getAllConferentes(): Promise<Conferente[]> {
    return await ConferenteRepository.findAll();
  }

  async getConferenteById(id: number): Promise<Conferente> {
    const conferente = await ConferenteRepository.findById(id);
    if (!conferente) {
      throw new Error('Conferente não encontrado');
    }
    return conferente;
  }

  async updateConferente(id: number, data: Partial<ConferenteAttributes>): Promise<Conferente> {
    const updatedConferente = await ConferenteRepository.update(id, data);
    if (!updatedConferente) {
      throw new Error('Conferente não encontrado para atualização');
    }
    return updatedConferente;
  }

  async deleteConferente(id: number): Promise<boolean> {
    const deleted = await ConferenteRepository.delete(id);
    if (!deleted) {
      throw new Error('Conferente não encontrado para exclusão');
    }
    return deleted;
  }
}

export default new ConferenteService();