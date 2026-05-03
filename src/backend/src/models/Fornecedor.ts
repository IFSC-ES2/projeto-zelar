import { CreationOptional, DataTypes, InferAttributes, InferCreationAttributes, Model } from 'sequelize';
import { sequelize } from '../database/connection';

export class Fornecedor extends Model<
  InferAttributes<Fornecedor>,
  InferCreationAttributes<Fornecedor>
> {
  declare id: CreationOptional<number>;
  declare nome: string;
  declare cnpj: string | null;
  declare telefone: string | null;
  declare email: string | null;
}

Fornecedor.init(
  {
    id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    nome: { type: DataTypes.STRING(100), allowNull: false },
    cnpj: { type: DataTypes.STRING(18), allowNull: true },
    telefone: { type: DataTypes.STRING(20), allowNull: true },
    email: { type: DataTypes.STRING(100), allowNull: true },
  },
  { sequelize, tableName: 'fornecedor', timestamps: false }
);
