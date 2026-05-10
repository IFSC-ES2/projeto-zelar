import TipoMaterial, { TipoMaterialCreationAttributes, TipoMaterialAttributes } from '../models/TipoMaterial';

class TipoMaterialRepository {
  async create(data: TipoMaterialCreationAttributes): Promise<TipoMaterial> {
    return await TipoMaterial.create(data);
  }

  async findAll(): Promise<TipoMaterial[]> {
    return await TipoMaterial.findAll();
  }

  async findById(id: number): Promise<TipoMaterial | null> {
    return await TipoMaterial.findByPk(id);
  }

  async update(id: number, data: Partial<TipoMaterialAttributes>): Promise<TipoMaterial | null> {
    const tipoMaterial = await TipoMaterial.findByPk(id);
    if (tipoMaterial) {
      return await tipoMaterial.update(data);
    }
    return null;
  }

  async delete(id: number): Promise<boolean> {
    const tipoMaterial = await TipoMaterial.findByPk(id);
    if (tipoMaterial) {
      await tipoMaterial.destroy();
      return true;
    }
    return false;
  }
}

export default new TipoMaterialRepository();