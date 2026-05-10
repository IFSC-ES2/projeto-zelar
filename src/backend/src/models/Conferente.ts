import { DataTypes, Model, Optional } from 'sequelize';
import { sequelize } from '../database/connection';

// 1. Definição de todos os atributos do modelo
export interface ConferenteAttributes {
  id: number;
  nome: string;
  email: string;
  cargo?: string;
  telefone?: string;
}

// 2. Definição dos atributos para criação (ID é opcional)
export interface ConferenteCreationAttributes extends Optional<ConferenteAttributes, 'id'> {}

// 3. Classe do Modelo
class Conferente extends Model<ConferenteAttributes, ConferenteCreationAttributes> implements ConferenteAttributes {
  public id!: number;
  public nome!: string;
  public email!: string;
  public cargo!: string;
  public telefone!: string;
}

// 4. Inicialização do Schema
Conferente.init(
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    nome: {
      type: DataTypes.STRING(100),
      allowNull: false,
    },
    email: {
      type: DataTypes.STRING(100),
      allowNull: false,
    },
    cargo: {
      type: DataTypes.STRING(50),
      allowNull: true,
    },
    telefone: {
      type: DataTypes.STRING(20),
      allowNull: true,
    },
  },
  {
    sequelize,
    tableName: 'conferente',
    timestamps: false,
  }
);

export default Conferente;