import { DataTypes, Model, Optional } from 'sequelize';
import { sequelize } from '../database/connection';

// 1. Definição de todos os atributos do modelo
export interface AmbienteAttributes {
  id: number;
  nome: string;
  bloco?: string;
  andar?: string;
  responsavel_id?: number;
}

// 2. Definição dos atributos necessários para CRIAR um registro (o ID é opcional pois é auto-increment)
export interface AmbienteCreationAttributes extends Optional<AmbienteAttributes, 'id'> {}

// 3. Classe do Modelo
class Ambiente extends Model<AmbienteAttributes, AmbienteCreationAttributes> implements AmbienteAttributes {
  public id!: number;
  public nome!: string;
  public bloco!: string;
  public andar!: string;
  public responsavel_id!: number;
}

// 4. Inicialização do Schema
Ambiente.init(
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
    bloco: {
      type: DataTypes.STRING(50),
      allowNull: true,
    },
    andar: {
      type: DataTypes.STRING(20),
      allowNull: true,
    },
    responsavel_id: {
      type: DataTypes.INTEGER,
      allowNull: true,
    },
  },
  {
    sequelize,
    tableName: 'ambiente',
    timestamps: false, // Define como false se a tabela não tiver createdAt/updatedAt
  }
);

export default Ambiente;