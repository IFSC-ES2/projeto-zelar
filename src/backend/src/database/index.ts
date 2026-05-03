import { Ambiente } from "../models/Ambiente";
import { EstadoItem } from "../models/EstadoItem";
import { Fornecedor } from "../models/Fornecedor";
import { Patrimonio } from "../models/Patrimonio";
import { Responsavel } from "../models/Responsavel";
import { TipoMaterial } from "../models/TipoMaterial";

Ambiente.belongsTo(Responsavel, { foreignKey: "responsavel_id" });
Responsavel.hasMany(Ambiente, { foreignKey: "responsavel_id" });

Patrimonio.belongsTo(TipoMaterial, { foreignKey: "tipo_material_id" });
Patrimonio.belongsTo(EstadoItem, { foreignKey: "estado_item_id" });
Patrimonio.belongsTo(Ambiente, { foreignKey: "ambiente_id" });
Patrimonio.belongsTo(Responsavel, { foreignKey: "responsavel_id" });
Patrimonio.belongsTo(Fornecedor, { foreignKey: "fornecedor_id" });

TipoMaterial.hasMany(Patrimonio, { foreignKey: "tipo_material_id" });
EstadoItem.hasMany(Patrimonio, { foreignKey: "estado_item_id" });
Ambiente.hasMany(Patrimonio, { foreignKey: "ambiente_id" });
Responsavel.hasMany(Patrimonio, { foreignKey: "responsavel_id" });
Fornecedor.hasMany(Patrimonio, { foreignKey: "fornecedor_id" });

export { sequelize } from "./connection";
