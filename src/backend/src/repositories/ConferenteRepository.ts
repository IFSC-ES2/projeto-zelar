import { Conferente } from "../models/Conferente";
import { BaseRepository } from "./BaseRepository";

export class ConferenteRepository extends BaseRepository<Conferente> {
  constructor() {
    super(Conferente);
  }
}
