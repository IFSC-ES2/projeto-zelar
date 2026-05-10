import TipoMaterialRepository from '../repositories/TipoMaterialRepository';
import { TipoMaterialCreationAttributes, TipoMaterialAttributes } from '../models/TipoMaterial';
import TipoMaterial from '../models/TipoMaterial';

class TipoMaterialService {
  async createTipoMaterial(data: TipoMaterialCreationAttributes): Promise<TipoMaterial> {
    return await TipoMaterialRepository.create(data);
  }

  async getAllTiposMaterial(): Promise<TipoMaterial[]> {
    return await TipoMaterialRepository.findAll();
  }

  async getTipoMaterialById(id: number): Promise<TipoMaterial> {
    const tipoMaterial = await TipoMaterialRepository.findById(id);
    if (!tipoMaterial) {
      throw new Error('Tipo de Material não encontrado');
    }
    return tipoMaterial;
  }

  async updateTipoMaterial(id: number, data: Partial<TipoMaterialAttributes>): Promise<TipoMaterial> {
    const updatedTipoMaterial = await TipoMaterialRepository.update(id, data);
    if (!updatedTipoMaterial) {
      throw new Error('Tipo de Material não encontrado para atualização');
    }
    return updatedTipoMaterial;
  }

  async deleteTipoMaterial(id: number): Promise<boolean> {
    const deleted = await TipoMaterialRepository.delete(id);
    if (!deleted) {
      throw new Error('Tipo de Material não encontrado para exclusão');
    }
    return deleted;
  }
}

export default new TipoMaterialService();