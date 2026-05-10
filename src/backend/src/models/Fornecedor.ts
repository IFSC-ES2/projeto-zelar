import { DataTypes, Model, Optional } from 'sequelize';
import { sequelize } from '../database/connection';

// 1. Definição de todos os atributos do modelo
export interface FornecedorAttributes {
  id: number;
  nome: string;
  cnpj?: string;
  telefone?: string;
  email?: string;
}

// 2. Definição dos atributos para criação (ID é opcional)
export interface FornecedorCreationAttributes extends Optional<FornecedorAttributes, 'id'> {}

// 3. Classe do Modelo
class Fornecedor extends Model<FornecedorAttributes, FornecedorCreationAttributes> implements FornecedorAttributes {
  public id!: number;
  public nome!: string;
  public cnpj!: string;
  public telefone!: string;
  public email!: string;
}

// 4. Inicialização do Schema
Fornecedor.init(
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
    cnpj: {
      type: DataTypes.STRING(18),
      allowNull: true,
    },
    telefone: {
      type: DataTypes.STRING(20),
      allowNull: true,
    },
    email: {
      type: DataTypes.STRING(100),
      allowNull: true,
    },
  },
  {
    sequelize,
    tableName: 'fornecedor',
    timestamps: false,
  }
);

export default Fornecedor;