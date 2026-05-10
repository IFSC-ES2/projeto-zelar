import Conferente, { ConferenteCreationAttributes, ConferenteAttributes } from '../models/Conferente';

class ConferenteRepository {
  async create(data: ConferenteCreationAttributes): Promise<Conferente> {
    return await Conferente.create(data);
  }

  async findAll(): Promise<Conferente[]> {
    return await Conferente.findAll();
  }

  async findById(id: number): Promise<Conferente | null> {
    return await Conferente.findByPk(id);
  }

  async update(id: number, data: Partial<ConferenteAttributes>): Promise<Conferente | null> {
    const conferente = await Conferente.findByPk(id);
    if (conferente) {
      return await conferente.update(data);
    }
    return null;
  }

  async delete(id: number): Promise<boolean> {
    const conferente = await Conferente.findByPk(id);
    if (conferente) {
      await conferente.destroy();
      return true;
    }
    return false;
  }
}

export default new ConferenteRepository();