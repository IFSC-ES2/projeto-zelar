import Patrimonio, { PatrimonioCreationAttributes, PatrimonioAttributes } from '../models/Patrimonio';

class PatrimonioRepository {
  async create(data: PatrimonioCreationAttributes): Promise<Patrimonio> {
    return await Patrimonio.create(data);
  }

  async findAll(): Promise<Patrimonio[]> {
    return await Patrimonio.findAll();
  }

  async findById(id: number): Promise<Patrimonio | null> {
    return await Patrimonio.findByPk(id);
  }

  async update(id: number, data: Partial<PatrimonioAttributes>): Promise<Patrimonio | null> {
    const patrimonio = await Patrimonio.findByPk(id);
    if (patrimonio) {
      return await patrimonio.update(data);
    }
    return null;
  }

  async delete(id: number): Promise<boolean> {
    const patrimonio = await Patrimonio.findByPk(id);
    if (patrimonio) {
      await patrimonio.destroy();
      return true;
    }
    return false;
  }
}

export default new PatrimonioRepository();