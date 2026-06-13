import { CreationAttributes } from 'sequelize';
import { Ambiente } from '../models/Ambiente';
import { Patrimonio } from '../models/Patrimonio';
import { AmbienteRepository } from '../repositories/AmbienteRepository';

export class AmbienteService {
  private repo = new AmbienteRepository();

  findAll() {
    return this.repo.findAll();
  }

  findById(id: number) {
    return this.repo.findById(id);
  }

  create(data: CreationAttributes<Ambiente>) {
    if (!data.responsavel_id) {
      throw new Error('responsavel_id é obrigatório');
    }
    return this.repo.create(data);
  }

  update(id: number, data: Partial<CreationAttributes<Ambiente>>) {
    if (data.responsavel_id === null || data.responsavel_id === undefined) {
      throw new Error('responsavel_id é obrigatório');
    }
    return this.repo.update(id, data);
  }

  updateLocalizacao(
    id: number,
    dto: {
      latitude: number;
      longitude: number;
      precisao_metros?: number | null;
      localizacao_observacao?: string | null;
    }
  ) {
    return this.repo.update(id, {
      latitude: dto.latitude,
      longitude: dto.longitude,
      precisao_metros: dto.precisao_metros ?? null,
      localizacao_observacao: dto.localizacao_observacao ?? null,
      localizacao_atualizada_em: new Date(),
    });
  }

  clearLocalizacao(id: number) {
    return this.repo.update(id, {
      latitude: null,
      longitude: null,
      precisao_metros: null,
      localizacao_observacao: null,
      localizacao_atualizada_em: null,
    });
  }

  async findPatrimoniosVinculados(id: number) {
    return Patrimonio.findAll({
      where: { ambiente_id: id },
      attributes: ['id', 'numero_patrimonio', 'descricao'],
    });
  }

  delete(id: number) {
    return this.repo.delete(id);
  }

  findDeleted() {
    return this.repo.findDeleted();
  }

  restore(id: number) {
    return this.repo.restore(id);
  }
}
