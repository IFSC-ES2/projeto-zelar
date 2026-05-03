import { CreationOptional, DataTypes, InferAttributes, InferCreationAttributes, Model } from 'sequelize';
import { sequelize } from '../database/connection';

export class Patrimonio extends Model<
  InferAttributes<Patrimonio>,
  InferCreationAttributes<Patrimonio>
> {
  declare id: CreationOptional<number>;
  declare numero_patrimonio: string;
  declare descricao: string;
  declare valor: number;
  declare observacoes: string | null;
  declare tipo_material_id: number;
  declare estado_item_id: number;
  declare ambiente_id: number;
  declare responsavel_id: number;
  declare fornecedor_id: number | null;
}

Patrimonio.init(
  {
    id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    numero_patrimonio: { type: DataTypes.STRING(50), allowNull: false, unique: true },
    descricao: { type: DataTypes.TEXT, allowNull: false },
    valor: { type: DataTypes.FLOAT, allowNull: false },
    observacoes: { type: DataTypes.TEXT, allowNull: true },
    tipo_material_id: { type: DataTypes.INTEGER, allowNull: false },
    estado_item_id: { type: DataTypes.INTEGER, allowNull: false },
    ambiente_id: { type: DataTypes.INTEGER, allowNull: false },
    responsavel_id: { type: DataTypes.INTEGER, allowNull: false },
    fornecedor_id: { type: DataTypes.INTEGER, allowNull: true },
  },
  { sequelize, tableName: 'patrimonio', timestamps: false }
);
