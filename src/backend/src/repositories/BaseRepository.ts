import { CreationAttributes, Model, ModelStatic } from "sequelize";

export class BaseRepository<T extends Model> {
  constructor(protected readonly model: ModelStatic<T>) {}

  findAll(): Promise<T[]> {
    return this.model.findAll();
  }

  findById(id: number): Promise<T | null> {
    return this.model.findByPk(id);
  }

  create(data: CreationAttributes<T>): Promise<T> {
    return this.model.create(data);
  }

  async update(id: number, data: Partial<CreationAttributes<T>>): Promise<T | null> {
    const instance = await this.findById(id);
    if (!instance) return null;
    return instance.update(data);
  }

  async delete(id: number): Promise<boolean> {
    const instance = await this.findById(id);
    if (!instance) return false;
    await instance.destroy();
    return true;
  }
}
