import EstadoItemRepository from '../repositories/EstadoItemRepository';
import { EstadoItemCreationAttributes, EstadoItemAttributes } from '../models/EstadoItem';
import EstadoItem from '../models/EstadoItem';

class EstadoItemService {
  async createEstadoItem(data: EstadoItemCreationAttributes): Promise<EstadoItem> {
    return await EstadoItemRepository.create(data);
  }

  async getAllEstadosItem(): Promise<EstadoItem[]> {
    return await EstadoItemRepository.findAll();
  }

  async getEstadoItemById(id: number): Promise<EstadoItem> {
    const estadoItem = await EstadoItemRepository.findById(id);
    if (!estadoItem) {
      throw new Error('Estado do Item não encontrado');
    }
    return estadoItem;
  }

  async updateEstadoItem(id: number, data: Partial<EstadoItemAttributes>): Promise<EstadoItem> {
    const updatedEstadoItem = await EstadoItemRepository.update(id, data);
    if (!updatedEstadoItem) {
      throw new Error('Estado do Item não encontrado para atualização');
    }
    return updatedEstadoItem;
  }

  async deleteEstadoItem(id: number): Promise<boolean> {
    const deleted = await EstadoItemRepository.delete(id);
    if (!deleted) {
      throw new Error('Estado do Item não encontrado para exclusão');
    }
    return deleted;
  }
}

export default new EstadoItemService();