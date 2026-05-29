import { CreationOptional, DataTypes, InferAttributes, InferCreationAttributes, Model } from 'sequelize';
import { sequelize } from '../database/connection';

export class TipoMaterial extends Model<
  InferAttributes<TipoMaterial>,
  InferCreationAttributes<TipoMaterial>
> {
  declare id: CreationOptional<number>;
  declare nome: string;
  declare versao: CreationOptional<number>;
}

TipoMaterial.init(
  {
    id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    nome: { type: DataTypes.STRING(50), allowNull: false },
    versao: { type: DataTypes.INTEGER, allowNull: false, defaultValue: 1 },
  },
  { sequelize, tableName: 'tipo_material', timestamps: false, version: true }
);
