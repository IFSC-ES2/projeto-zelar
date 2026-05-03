import { Responsavel } from '../models/Responsavel';
import { BaseRepository } from './BaseRepository';

export class ResponsavelRepository extends BaseRepository<Responsavel> {
  constructor() {
    super(Responsavel);
  }
}