import { Ambiente } from '../models/Ambiente';
import { BaseRepository } from './BaseRepository';

export class AmbienteRepository extends BaseRepository<Ambiente> {
  constructor() {
    super(Ambiente);
  }
}
