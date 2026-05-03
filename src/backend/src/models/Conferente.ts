import { CreationOptional, DataTypes, InferAttributes, InferCreationAttributes, Model } from 'sequelize';
import { sequelize } from '../database/connection';

export class Conferente extends Model<
  InferAttributes<Conferente>,
  InferCreationAttributes<Conferente>
> {
  declare id: CreationOptional<number>;
  declare nome: string;
  declare email: string;
  declare cargo: string | null;
  declare telefone: string | null;
}

Conferente.init(
  {
    id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    nome: { type: DataTypes.STRING(100), allowNull: false },
    email: { type: DataTypes.STRING(100), allowNull: false },
    cargo: { type: DataTypes.STRING(50), allowNull: true },
    telefone: { type: DataTypes.STRING(20), allowNull: true },
  },
  { sequelize, tableName: 'conferente', timestamps: false }
);
