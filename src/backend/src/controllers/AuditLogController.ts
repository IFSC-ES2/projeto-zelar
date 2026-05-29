import { Request, Response, NextFunction } from "express";
import { AuditLog } from "../models/AuditLog";

export const AuditLogController = {
  async findAll(req: Request, res: Response, next: NextFunction) {
    try {
      const page = parseInt(req.query.page as string) || 1;
      const limit = parseInt(req.query.limit as string) || 10;
      const offset = (page - 1) * limit;

      const { count, rows } = await AuditLog.findAndCountAll({
        limit,
        offset,
        order: [["created_at", "DESC"]],
      });

      res.json({
        total: count,
        pages: Math.ceil(count / limit),
        currentPage: page,
        limit,
        data: rows,
      });
    } catch (err) {
      next(err);
    }
  },

  async findByTableAndRecord(req: Request, res: Response, next: NextFunction) {
    try {
      const { tabela, registroId } = req.params;
      const id = Number(registroId);

      if (isNaN(id)) {
        return res.status(400).json({ error: "registroId deve ser um número" });
      }

      const items = await AuditLog.findAll({
        where: {
          tabela: tabela.toLowerCase(),
          registro_id: id,
        },
        order: [["created_at", "DESC"]],
      });

      res.json(items);
    } catch (err) {
      next(err);
    }
  },
};
