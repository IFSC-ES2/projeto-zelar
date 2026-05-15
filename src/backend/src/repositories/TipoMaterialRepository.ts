import { TipoMaterial } from "../models/TipoMaterial";
import { BaseRepository } from "./BaseRepository";

export class TipoMaterialRepository extends BaseRepository<TipoMaterial> {
  constructor() {
    super(TipoMaterial);
  }
}
