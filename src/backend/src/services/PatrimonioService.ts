import { CreationAttributes } from 'sequelize';
import { Op } from 'sequelize';
import { AuditLog } from '../models/AuditLog';
import { Patrimonio } from '../models/Patrimonio';
import { PatrimonioFoto } from '../models/PatrimonioFoto';
import { PatrimonioRepository } from '../repositories/PatrimonioRepository';

const fotoPrincipalInclude = {
  model: PatrimonioFoto,
  as: 'fotos',
  where: { principal: true },
  required: false,
  attributes: ['url'],
};

function withFotoPrincipal(patrimonio: Patrimonio): Record<string, unknown> {
  const json = patrimonio.get({ plain: true }) as Record<string, unknown>;
  const fotos = json.fotos as Array<{ url: string }> | undefined;
  json.foto_principal_url = fotos && fotos.length > 0 ? fotos[0].url : null;
  delete json.fotos;
  return json;
}

export class PatrimonioService {
  private repo = new PatrimonioRepository();

  async findAll() {
    const items = await Patrimonio.findAll({
      include: [fotoPrincipalInclude],
      order: [['id', 'ASC']],
    });
    return items.map(withFotoPrincipal);
  }

  async findById(id: number) {
    const item = await Patrimonio.findByPk(id, { include: [fotoPrincipalInclude] });
    return item ? withFotoPrincipal(item) : null;
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
