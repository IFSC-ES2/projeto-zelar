import { Op, Transaction } from 'sequelize';
import { sequelize } from '../database/connection';
import { Patrimonio } from '../models/Patrimonio';
import { PatrimonioFoto } from '../models/PatrimonioFoto';
import { PatrimonioFotoRepository } from '../repositories/PatrimonioFotoRepository';

export interface CreateFotoInput {
  url: string;
  nome_arquivo: string;
  nome_original?: string | null;
  mime_type: string;
  tamanho_bytes: number;
  largura?: number | null;
  altura?: number | null;
  descricao?: string | null;
  ordem?: number;
  principal?: boolean;
}

export interface UpdateFotoInput {
  descricao?: string | null;
  ordem?: number;
  principal?: boolean;
}

export class PatrimonioFotoService {
  private repo = new PatrimonioFotoRepository();

  async patrimonioExists(patrimonioId: number): Promise<boolean> {
    const patrimonio = await Patrimonio.findByPk(patrimonioId);
    return patrimonio !== null;
  }

  listByPatrimonio(patrimonioId: number): Promise<PatrimonioFoto[]> {
    return this.repo.findByPatrimonio(patrimonioId);
  }

  findByIdForPatrimonio(patrimonioId: number, fotoId: number): Promise<PatrimonioFoto | null> {
    return PatrimonioFoto.findOne({ where: { id: fotoId, patrimonio_id: patrimonioId } });
  }

  async create(patrimonioId: number, input: CreateFotoInput): Promise<PatrimonioFoto> {
    return sequelize.transaction(async (t) => {
      const total = await PatrimonioFoto.count({
        where: { patrimonio_id: patrimonioId },
        transaction: t,
      });

      const principal = total === 0 ? true : input.principal === true;

      if (principal) {
        await this.unsetPrincipal(patrimonioId, t);
      }

      return PatrimonioFoto.create(
        {
          patrimonio_id: patrimonioId,
          url: input.url,
          nome_arquivo: input.nome_arquivo,
          nome_original: input.nome_original ?? null,
          mime_type: input.mime_type,
          tamanho_bytes: input.tamanho_bytes,
          largura: input.largura ?? null,
          altura: input.altura ?? null,
          descricao: input.descricao ?? null,
          ordem: input.ordem ?? 0,
          principal,
        },
        { transaction: t }
      );
    });
  }

  async update(
    patrimonioId: number,
    fotoId: number,
    dto: UpdateFotoInput
  ): Promise<PatrimonioFoto | null> {
    return sequelize.transaction(async (t) => {
      const foto = await PatrimonioFoto.findOne({
        where: { id: fotoId, patrimonio_id: patrimonioId },
        transaction: t,
      });
      if (!foto) return null;

      if (dto.principal === true) {
        await this.unsetPrincipal(patrimonioId, t, fotoId);
      }

      const data: Partial<CreateFotoInput> = {};
      if (dto.descricao !== undefined) data.descricao = dto.descricao;
      if (dto.ordem !== undefined) data.ordem = dto.ordem;
      if (dto.principal !== undefined) data.principal = dto.principal;

      return foto.update(data, { transaction: t });
    });
  }

  async setPrincipal(patrimonioId: number, fotoId: number): Promise<PatrimonioFoto | null> {
    return this.update(patrimonioId, fotoId, { principal: true });
  }

  /**
   * Remove a foto. Retorna a instancia removida (para o controller apagar o
   * arquivo fisico) ou null se nao pertencer ao patrimonio. Se a foto removida
   * era principal, promove a foto mais antiga restante a principal.
   */
  async delete(patrimonioId: number, fotoId: number): Promise<PatrimonioFoto | null> {
    return sequelize.transaction(async (t) => {
      const foto = await PatrimonioFoto.findOne({
        where: { id: fotoId, patrimonio_id: patrimonioId },
        transaction: t,
      });
      if (!foto) return null;

      const eraPrincipal = foto.principal;
      await foto.destroy({ transaction: t });

      if (eraPrincipal) {
        const proxima = await PatrimonioFoto.findOne({
          where: { patrimonio_id: patrimonioId },
          order: [['created_at', 'ASC']],
          transaction: t,
        });
        if (proxima) {
          await proxima.update({ principal: true }, { transaction: t });
        }
      }

      return foto;
    });
  }

  private async unsetPrincipal(
    patrimonioId: number,
    transaction: Transaction,
    exceptId?: number
  ): Promise<void> {
    const where: Record<string, unknown> = { patrimonio_id: patrimonioId, principal: true };
    if (exceptId !== undefined) {
      where.id = { [Op.ne]: exceptId };
    }
    await PatrimonioFoto.update({ principal: false }, { where, transaction });
  }
}
