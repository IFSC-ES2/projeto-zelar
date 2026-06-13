import { CreationOptional, DataTypes, InferAttributes, InferCreationAttributes, Model } from 'sequelize';
import { sequelize } from '../database/connection';

export class Ambiente extends Model<
  InferAttributes<Ambiente>,
  InferCreationAttributes<Ambiente>
> {
  declare id: CreationOptional<number>;
  declare nome: string;
  declare bloco: string | null;
  declare andar: string | null;
  declare responsavel_id: number;
  declare latitude: number | null;
  declare longitude: number | null;
  declare precisao_metros: number | null;
  declare localizacao_observacao: string | null;
  declare localizacao_atualizada_em: Date | null;
  declare versao: CreationOptional<number>;
}

Ambiente.init(
  {
    id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    nome: { type: DataTypes.STRING(100), allowNull: false },
    bloco: { type: DataTypes.STRING(50), allowNull: true },
    andar: { type: DataTypes.STRING(20), allowNull: true },
    responsavel_id: { type: DataTypes.INTEGER, allowNull: false },
    latitude: { type: DataTypes.DOUBLE, allowNull: true },
    longitude: { type: DataTypes.DOUBLE, allowNull: true },
    precisao_metros: { type: DataTypes.DOUBLE, allowNull: true },
    localizacao_observacao: { type: DataTypes.STRING(255), allowNull: true },
    localizacao_atualizada_em: { type: DataTypes.DATE, allowNull: true },
    versao: { type: DataTypes.INTEGER, allowNull: false, defaultValue: 1 },
  },
  {
    sequelize,
    tableName: 'ambiente',
    timestamps: true,
    paranoid: true,
    underscored: true,
    version: 'versao',
  }
);
