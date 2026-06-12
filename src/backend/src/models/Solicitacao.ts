import { CreationOptional, DataTypes, InferAttributes, InferCreationAttributes, Model } from 'sequelize';
import { sequelize } from '../database/connection';

export type SolicitacaoTipo = 'manutencao' | 'substituicao';
export type SolicitacaoStatus = 'aberta' | 'em_andamento' | 'concluida' | 'cancelada';

export class Solicitacao extends Model<
  InferAttributes<Solicitacao>,
  InferCreationAttributes<Solicitacao>
> {
  declare id: CreationOptional<number>;
  declare patrimonio_id: number;
  declare tipo: SolicitacaoTipo;
  declare status: CreationOptional<SolicitacaoStatus>;
  declare descricao: string | null;
  declare conferente_id: number | null;
  declare versao: CreationOptional<number>;
}

Solicitacao.init(
  {
    id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    patrimonio_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: { model: 'patrimonio', key: 'id' },
    },
    tipo: {
      type: DataTypes.ENUM('manutencao', 'substituicao'),
      allowNull: false,
      validate: { isIn: [['manutencao', 'substituicao']] },
    },
    status: {
      type: DataTypes.ENUM('aberta', 'em_andamento', 'concluida', 'cancelada'),
      allowNull: false,
      defaultValue: 'aberta',
      validate: { isIn: [['aberta', 'em_andamento', 'concluida', 'cancelada']] },
    },
    descricao: { type: DataTypes.TEXT, allowNull: true },
    conferente_id: {
      type: DataTypes.INTEGER,
      allowNull: true,
      references: { model: 'conferente', key: 'id' },
    },
    versao: { type: DataTypes.INTEGER, allowNull: false, defaultValue: 1 },
  },
  {
    sequelize,
    tableName: 'solicitacao',
    timestamps: true,
    paranoid: true,
    underscored: true,
    version: 'versao',
  }
);
