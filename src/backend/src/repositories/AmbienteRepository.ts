import Ambiente, { AmbienteCreationAttributes, AmbienteAttributes } from '../models/Ambiente';

class AmbienteRepository {
  async create(data: AmbienteCreationAttributes): Promise<Ambiente> {
    return await Ambiente.create(data);
  }

  async findAll(): Promise<Ambiente[]> {
    return await Ambiente.findAll();
  }

  async findById(id: number): Promise<Ambiente | null> {
    return await Ambiente.findByPk(id);
  }

  async update(id: number, data: Partial<AmbienteAttributes>): Promise<Ambiente | null> {
    const ambiente = await Ambiente.findByPk(id);
    if (ambiente) {
      return await ambiente.update(data);
    }
    return null;
  }

  async delete(id: number): Promise<boolean> {
    const ambiente = await Ambiente.findByPk(id);
    if (ambiente) {
      await ambiente.destroy();
      return true;
    }
    return false;
  }
}

export default new AmbienteRepository();