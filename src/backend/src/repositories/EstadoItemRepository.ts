import EstadoItem, { EstadoItemCreationAttributes, EstadoItemAttributes } from '../models/EstadoItem';

class EstadoItemRepository {
  async create(data: EstadoItemCreationAttributes): Promise<EstadoItem> {
    return await EstadoItem.create(data);
  }

  async findAll(): Promise<EstadoItem[]> {
    return await EstadoItem.findAll();
  }

  async findById(id: number): Promise<EstadoItem | null> {
    return await EstadoItem.findByPk(id);
  }

  async update(id: number, data: Partial<EstadoItemAttributes>): Promise<EstadoItem | null> {
    const estadoItem = await EstadoItem.findByPk(id);
    if (estadoItem) {
      return await estadoItem.update(data);
    }
    return null;
  }

  async delete(id: number): Promise<boolean> {
    const estadoItem = await EstadoItem.findByPk(id);
    if (estadoItem) {
      await estadoItem.destroy();
      return true;
    }
    return false;
  }
}

export default new EstadoItemRepository();