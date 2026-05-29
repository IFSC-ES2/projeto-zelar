import { Patrimonio } from '../models/Patrimonio';
import { BaseRepository } from './BaseRepository';

export class PatrimonioRepository extends BaseRepository<Patrimonio> {
  constructor() {
    super(Patrimonio);
  }
}
