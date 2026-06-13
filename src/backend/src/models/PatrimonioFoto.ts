import { CreationOptional, DataTypes, InferAttributes, InferCreationAttributes, Model } from 'sequelize';
import { sequelize } from '../database/connection';

export class PatrimonioFoto extends Model<
  InferAttributes<PatrimonioFoto>,
  InferCreationAttributes<PatrimonioFoto>
> {
  declare id: CreationOptional<number>;
  declare patrimonio_id: number;
  declare url: string;
  declare nome_arquivo: string;
  declare nome_original: string | null;
  declare mime_type: string;
  declare tamanho_bytes: number;
  declare largura: number | null;
  declare altura: number | null;
  declare descricao: string | null;
  declare ordem: CreationOptional<number>;
  declare principal: CreationOptional<boolean>;
}

PatrimonioFoto.init(
  {
    id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    patrimonio_id: { type: DataTypes.INTEGER, allowNull: false },
    url: { type: DataTypes.STRING(255), allowNull: false },
    nome_arquivo: { type: DataTypes.STRING(255), allowNull: false },
    nome_original: { type: DataTypes.STRING(255), allowNull: true },
    mime_type: { type: DataTypes.STRING(50), allowNull: false },
    tamanho_bytes: { type: DataTypes.INTEGER, allowNull: false },
    largura: { type: DataTypes.INTEGER, allowNull: true },
    altura: { type: DataTypes.INTEGER, allowNull: true },
    descricao: { type: DataTypes.TEXT, allowNull: true },
    ordem: { type: DataTypes.INTEGER, allowNull: false, defaultValue: 0 },
    principal: { type: DataTypes.BOOLEAN, allowNull: false, defaultValue: false },
  },
  {
    sequelize,
    tableName: 'patrimonio_fotos',
    timestamps: true,
    paranoid: true,
    underscored: true,
  }
);
