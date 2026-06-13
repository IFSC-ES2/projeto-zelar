import { PatrimonioFoto } from '../models/PatrimonioFoto';
import { BaseRepository } from './BaseRepository';

export class PatrimonioFotoRepository extends BaseRepository<PatrimonioFoto> {
  constructor() {
    super(PatrimonioFoto);
  }

  findByPatrimonio(patrimonioId: number): Promise<PatrimonioFoto[]> {
    return this.model.findAll({
      where: { patrimonio_id: patrimonioId },
      order: [
        ['ordem', 'ASC'],
        ['created_at', 'ASC'],
      ],
    });
  }
}
