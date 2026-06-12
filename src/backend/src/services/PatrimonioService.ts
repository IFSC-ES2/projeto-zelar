import { CreationAttributes } from 'sequelize';
import { Op } from 'sequelize';
import { AuditLog } from '../models/AuditLog';
import { Patrimonio } from '../models/Patrimonio';
import { PatrimonioRepository } from '../repositories/PatrimonioRepository';

export class PatrimonioService {
  private repo = new PatrimonioRepository();

  findAll() {
    return this.repo.findAll();
  }

  findById(id: number) {
    return this.repo.findById(id);
  }

  create(data: CreationAttributes<Patrimonio>) {
    return this.repo.create(data);
  }

  update(id: number, data: Partial<CreationAttributes<Patrimonio>>) {
    return this.repo.update(id, data);
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

  async findHistoricoEstado(id: number) {
    const logs = await AuditLog.findAll({
      where: {
        tabela: 'patrimonio',
        registro_id: id,
        acao: 'UPDATE',
        campos_alterados: { [Op.contains]: ['estado_item_id'] },
      },
      order: [['created_at', 'ASC']],
    });

    return logs.map((log) => ({
      estado_anterior_id: log.dados_anteriores?.estado_item_id ?? null,
      estado_novo_id: log.dados_novos?.estado_item_id ?? null,
      data: log.created_at,
    }));
  }
}
