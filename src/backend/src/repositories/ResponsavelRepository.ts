import Responsavel, { ResponsavelCreationAttributes, ResponsavelAttributes } from '../models/Responsavel';

class ResponsavelRepository {
  async create(data: ResponsavelCreationAttributes): Promise<Responsavel> {
    return await Responsavel.create(data);
  }

  async findAll(): Promise<Responsavel[]> {
    return await Responsavel.findAll();
  }

  async findById(id: number): Promise<Responsavel | null> {
    return await Responsavel.findByPk(id);
  }

  async update(id: number, data: Partial<ResponsavelAttributes>): Promise<Responsavel | null> {
    const responsavel = await Responsavel.findByPk(id);
    if (responsavel) {
      return await responsavel.update(data);
    }
    return null;
  }

  async delete(id: number): Promise<boolean> {
    const responsavel = await Responsavel.findByPk(id);
    if (responsavel) {
      await responsavel.destroy();
      return true;
    }
    return false;
  }
}

export default new ResponsavelRepository();