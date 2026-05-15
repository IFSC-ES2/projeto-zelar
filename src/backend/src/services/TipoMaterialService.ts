import { CreationAttributes } from "sequelize";
import { Patrimonio } from "../models/Patrimonio";
import { TipoMaterial } from "../models/TipoMaterial";
import { TipoMaterialRepository } from "../repositories/TipoMaterialRepository";

export class TipoMaterialService {
  private repo = new TipoMaterialRepository();

  findAll() {
    return this.repo.findAll();
  }

  findById(id: number) {
    return this.repo.findById(id);
  }

  create(data: CreationAttributes<TipoMaterial>) {
    return this.repo.create(data);
  }

  update(id: number, data: Partial<CreationAttributes<TipoMaterial>>) {
    return this.repo.update(id, data);
  }

  async findPatrimoniosVinculados(id: number) {
    return Patrimonio.findAll({
      where: { tipo_material_id: id },
      attributes: ["id", "numero_patrimonio", "descricao"],
    });
  }

  delete(id: number) {
    return this.repo.delete(id);
  }
}
