import { CreationOptional, DataTypes, InferAttributes, InferCreationAttributes, Model } from 'sequelize';
import { sequelize } from '../database/connection';

export class Responsavel extends Model<
  InferAttributes<Responsavel>,
  InferCreationAttributes<Responsavel>
> {
  declare id: CreationOptional<number>;
  declare nome: string;
  declare email: string;
  declare cargo: string | null;
  declare departamento: string | null;
  declare telefone: string | null;
}

Responsavel.init(
  {
    id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    nome: { type: DataTypes.STRING(100), allowNull: false },
    email: { type: DataTypes.STRING(100), allowNull: false },
    cargo: { type: DataTypes.STRING(50), allowNull: true },
    departamento: { type: DataTypes.STRING(50), allowNull: true },
    telefone: { type: DataTypes.STRING(20), allowNull: true },
  },
  { sequelize, tableName: 'responsavel', timestamps: false }
);
