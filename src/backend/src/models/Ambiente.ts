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
  declare responsavel_id: number | null;
}

Ambiente.init(
  {
    id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    nome: { type: DataTypes.STRING(100), allowNull: false },
    bloco: { type: DataTypes.STRING(50), allowNull: true },
    andar: { type: DataTypes.STRING(20), allowNull: true },
    responsavel_id: { type: DataTypes.INTEGER, allowNull: true },
  },
  { sequelize, tableName: 'ambiente', timestamps: false }
);
