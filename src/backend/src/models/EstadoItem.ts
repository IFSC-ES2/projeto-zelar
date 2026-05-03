import { CreationOptional, DataTypes, InferAttributes, InferCreationAttributes, Model } from 'sequelize';
import { sequelize } from '../database/connection';

export class EstadoItem extends Model<
  InferAttributes<EstadoItem>,
  InferCreationAttributes<EstadoItem>
> {
  declare id: CreationOptional<number>;
  declare nome: string;
  declare descricao: string | null;
}

EstadoItem.init(
  {
    id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    nome: { type: DataTypes.STRING(50), allowNull: false },
    descricao: { type: DataTypes.TEXT, allowNull: true },
  },
  { sequelize, tableName: 'estado_item', timestamps: false }
);
