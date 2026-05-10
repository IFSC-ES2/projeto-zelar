import { DataTypes, Model, Optional } from 'sequelize';
import { sequelize } from '../database/connection';

// 1. Definição de todos os atributos do modelo
export interface PatrimonioAttributes {
  id: number;
  numero_patrimonio: string;
  descricao: string;
  valor: number;
  observacoes?: string;
  tipo_material_id: number;
  estado_item_id: number;
  ambiente_id: number;
  responsavel_id: number;
  fornecedor_id?: number;
}

// 2. Definição dos atributos para criação (ID é opcional)
export interface PatrimonioCreationAttributes extends Optional<PatrimonioAttributes, 'id'> {}

// 3. Classe do Modelo
class Patrimonio extends Model<PatrimonioAttributes, PatrimonioCreationAttributes> implements PatrimonioAttributes {
  public id!: number;
  public numero_patrimonio!: string;
  public descricao!: string;
  public valor!: number;
  public observacoes!: string;
  public tipo_material_id!: number;
  public estado_item_id!: number;
  public ambiente_id!: number;
  public responsavel_id!: number;
  public fornecedor_id!: number;
}

// 4. Inicialização do Schema
Patrimonio.init(
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    numero_patrimonio: {
      type: DataTypes.STRING(50),
      allowNull: false,
      unique: true,
    },
    descricao: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
    valor: {
      type: DataTypes.FLOAT,
      allowNull: false,
    },
    observacoes: {
      type: DataTypes.TEXT,
      allowNull: true,
    },
    tipo_material_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    estado_item_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    ambiente_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    responsavel_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    fornecedor_id: {
      type: DataTypes.INTEGER,
      allowNull: true,
    },
  },
  {
    sequelize,
    tableName: 'patrimonio',
    timestamps: false,
  }
);

export default Patrimonio;