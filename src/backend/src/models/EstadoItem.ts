import { DataTypes, Model, Optional } from 'sequelize';
import { sequelize } from '../database/connection';

// 1. Definição de todos os atributos do modelo
export interface EstadoItemAttributes {
  id: number;
  nome: string;
  descricao?: string;
}

// 2. Definição dos atributos para criação (ID é opcional)
export interface EstadoItemCreationAttributes extends Optional<EstadoItemAttributes, 'id'> {}

// 3. Classe do Modelo
class EstadoItem extends Model<EstadoItemAttributes, EstadoItemCreationAttributes> implements EstadoItemAttributes {
  public id!: number;
  public nome!: string;
  public descricao!: string;
}

// 4. Inicialização do Schema
EstadoItem.init(
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    nome: {
      type: DataTypes.STRING(50),
      allowNull: false,
    },
    descricao: {
      type: DataTypes.TEXT,
      allowNull: true,
    },
  },
  {
    sequelize,
    tableName: 'estado_item',
    timestamps: false,
  }
);

export default EstadoItem;