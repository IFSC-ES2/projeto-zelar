import { CreationAttributes } from "sequelize";
import { Conferente } from "../models/Conferente";
import { ConferenteRepository } from "../repositories/ConferenteRepository";

export class ConferenteService {
  private repo = new ConferenteRepository();

  findAll() {
    return this.repo.findAll();
  }

  findById(id: number) {
    return this.repo.findById(id);
  }

  create(data: CreationAttributes<Conferente>) {
    return this.repo.create(data);
  }

  update(id: number, data: Partial<CreationAttributes<Conferente>>) {
    return this.repo.update(id, data);
  }

  delete(id: number) {
    return this.repo.delete(id);
  }
}
