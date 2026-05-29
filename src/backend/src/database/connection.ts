import { Sequelize } from "sequelize";
import { dbConfig } from "../config/database";

export const sequelize = new Sequelize({
  dialect: "postgres",
  ...dbConfig,
  logging: process.env.NODE_ENV === "development" ? console.log : false,
});

const logAction = async (
  action: "CREATE" | "UPDATE" | "DELETE",
  instance: any,
  options: any,
) => {
  const tableName =
    instance.constructor.tableName || (instance.constructor as any).tableName;
  if (tableName === "audit_log") {
    return;
  }

  const AuditLogModel = instance.sequelize.models.AuditLog;
  if (!AuditLogModel) {
    return;
  }

  const registroId = instance.getDataValue("id");
  let dadosAnteriores: any = null;
  let dadosNovos: any = null;
  let camposAlterados: any = null;

  if (action === "CREATE") {
    dadosNovos = instance.get({ plain: true });
  } else if (action === "UPDATE") {
    const current = instance.get({ plain: true });
    const changed = instance.previous() || {};
    dadosAnteriores = { ...current };
    for (const key of Object.keys(changed)) {
      dadosAnteriores[key] = changed[key];
    }
    dadosNovos = current;
    const changedList = instance.changed();
    camposAlterados = Array.isArray(changedList) ? changedList : [];
  } else if (action === "DELETE") {
    dadosAnteriores = instance.get({ plain: true });
  }

  try {
    await AuditLogModel.create(
      {
        tabela: tableName,
        registro_id: registroId,
        acao: action,
        dados_anteriores: dadosAnteriores,
        dados_novos: dadosNovos,
        campos_alterados: camposAlterados,
        usuario: "sistema",
      },
      { transaction: options.transaction },
    );
  } catch (err) {
    console.error("Failed to save audit log:", err);
  }
};

sequelize.addHook("afterCreate", (instance: any, options: any) =>
  logAction("CREATE", instance, options),
);
sequelize.addHook("afterUpdate", (instance: any, options: any) =>
  logAction("UPDATE", instance, options),
);
sequelize.addHook("afterDestroy", (instance: any, options: any) =>
  logAction("DELETE", instance, options),
);
