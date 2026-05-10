import { DataTypes, Model, Optional } from 'sequelize';
import { sequelize } from '../database/connection';

// 1. Definição de todos os atributos do modelo
export interface TipoMaterialAttributes {
  id: number;
  nome: string;
}

// 2. Definição dos atributos para criação (ID é opcional)
export interface TipoMaterialCreationAttributes extends Optional<TipoMaterialAttributes, 'id'> {}

// 3. Classe do Modelo tipada
class TipoMaterial extends Model<TipoMaterialAttributes, TipoMaterialCreationAttributes> implements TipoMaterialAttributes {
  public id!: number;
  public nome!: string;
}

// 4. Inicialização do Schema
TipoMaterial.init(
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
  },
  {
    sequelize,
    tableName: 'tipo_material',
    timestamps: false,
  }
);

export default TipoMaterial;