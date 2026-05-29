import {
  CreationOptional,
  DataTypes,
  InferAttributes,
  InferCreationAttributes,
  Model,
} from "sequelize";
import { sequelize } from "../database/connection";

export class AuditLog extends Model<
  InferAttributes<AuditLog>,
  InferCreationAttributes<AuditLog>
> {
  declare id: CreationOptional<number>;
  declare tabela: string;
  declare registro_id: number;
  declare acao: string;
  declare dados_anteriores: Record<string, any> | null;
  declare dados_novos: Record<string, any> | null;
  declare campos_alterados: string[] | null;
  declare usuario: CreationOptional<string>;
  declare created_at: CreationOptional<Date>;
}

AuditLog.init(
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    tabela: {
      type: DataTypes.STRING(100),
      allowNull: false,
    },
    registro_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    acao: {
      type: DataTypes.STRING(20),
      allowNull: false,
    },
    dados_anteriores: {
      type: DataTypes.JSONB,
      allowNull: true,
    },
    dados_novos: {
      type: DataTypes.JSONB,
      allowNull: true,
    },
    campos_alterados: {
      type: DataTypes.JSONB,
      allowNull: true,
    },
    usuario: {
      type: DataTypes.STRING(100),
      allowNull: false,
      defaultValue: "sistema",
    },
    created_at: {
      type: DataTypes.DATE,
      allowNull: false,
      defaultValue: DataTypes.NOW,
    },
  },
  {
    sequelize,
    tableName: "audit_log",
    timestamps: true,
    updatedAt: false,
    createdAt: "created_at",
    underscored: true,
  },
);
