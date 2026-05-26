import { Fornecedor } from '../models/Fornecedor';
import { BaseRepository } from './BaseRepository';

export class FornecedorRepository extends BaseRepository<Fornecedor> {
  constructor() {
    super(Fornecedor);
  }
}