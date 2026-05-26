import { EstadoItem } from '../models/EstadoItem';
import { BaseRepository } from './BaseRepository';

export class EstadoItemRepository extends BaseRepository<EstadoItem> {
  constructor() {
    super(EstadoItem);
  }
}