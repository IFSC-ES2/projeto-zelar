import { unlink } from 'fs/promises';
import path from 'path';
import { NextFunction, Request, Response } from 'express';
import { MulterError } from 'multer';
import {
  InvalidMimeTypeError,
  PATRIMONIO_FOTOS_DIR,
  PATRIMONIO_FOTOS_PUBLIC_PATH,
  uploadFoto,
} from '../config/upload';
import { PatrimonioFotoService } from '../services/PatrimonioFotoService';

const service = new PatrimonioFotoService();

async function removeArquivo(absolutePath: string): Promise<void> {
  try {
    await unlink(absolutePath);
  } catch {
    // arquivo ja inexistente: ignorar
  }
}

function parsePositiveInt(value: string): number | null {
  const n = Number(value);
  if (!Number.isInteger(n) || n <= 0) return null;
  return n;
}

function parseBoolean(value: unknown): boolean | undefined {
  if (value === undefined || value === null || value === '') return undefined;
  if (value === true || value === 'true') return true;
  if (value === false || value === 'false') return false;
  return undefined;
}

/**
 * Wrapper do multer que traduz erros de upload (tipo/tamanho) em respostas 400.
 */
export function uploadFotoMiddleware(req: Request, res: Response, next: NextFunction) {
  uploadFoto.single('foto')(req, res, (err: unknown) => {
    if (err instanceof InvalidMimeTypeError) {
      return res
        .status(400)
        .json({ error: 'Tipo de arquivo invalido. Aceitos: image/jpeg, image/png, image/webp' });
    }
    if (err instanceof MulterError) {
      if (err.code === 'LIMIT_FILE_SIZE') {
        return res.status(400).json({ error: 'Arquivo excede o tamanho maximo de 5MB' });
      }
      return res.status(400).json({ error: `Erro no upload: ${err.message}` });
    }
    if (err) return next(err as Error);
    next();
  });
}

export const PatrimonioFotoController = {
  async list(req: Request, res: Response, next: NextFunction) {
    const patrimonioId = parsePositiveInt(req.params.patrimonioId);
    if (patrimonioId === null) {
      return res.status(400).json({ error: 'patrimonioId invalido' });
    }
    try {
      if (!(await service.patrimonioExists(patrimonioId))) {
        return res.status(404).json({ error: 'Patrimonio nao encontrado' });
      }
      const fotos = await service.listByPatrimonio(patrimonioId);
      res.json(fotos);
    } catch (err) {
      next(err);
    }
  },

  async create(req: Request, res: Response, next: NextFunction) {
    const patrimonioId = parsePositiveInt(req.params.patrimonioId);
    if (patrimonioId === null) {
      if (req.file) await removeArquivo(req.file.path);
      return res.status(400).json({ error: 'patrimonioId invalido' });
    }
    if (!req.file) {
      return res.status(400).json({ error: 'foto e obrigatoria' });
    }

    try {
      if (!(await service.patrimonioExists(patrimonioId))) {
        await removeArquivo(req.file.path);
        return res.status(404).json({ error: 'Patrimonio nao encontrado' });
      }

      const foto = await service.create(patrimonioId, {
        url: `${PATRIMONIO_FOTOS_PUBLIC_PATH}/${req.file.filename}`,
        nome_arquivo: req.file.filename,
        nome_original: req.file.originalname,
        mime_type: req.file.mimetype,
        tamanho_bytes: req.file.size,
        descricao: req.body?.descricao,
        ordem: req.body?.ordem !== undefined ? Number(req.body.ordem) : undefined,
        principal: parseBoolean(req.body?.principal),
      });

      res.status(201).json(foto);
    } catch (err) {
      if (req.file) await removeArquivo(req.file.path);
      next(err);
    }
  },

  async update(req: Request, res: Response, next: NextFunction) {
    const patrimonioId = parsePositiveInt(req.params.patrimonioId);
    const fotoId = parsePositiveInt(req.params.fotoId);
    if (patrimonioId === null || fotoId === null) {
      return res.status(400).json({ error: 'Parametros invalidos' });
    }
    try {
      const foto = await service.update(patrimonioId, fotoId, {
        descricao: req.body?.descricao,
        ordem: req.body?.ordem,
        principal: parseBoolean(req.body?.principal),
      });
      if (!foto) return res.status(404).json({ error: 'Foto nao encontrada' });
      res.json(foto);
    } catch (err) {
      next(err);
    }
  },

  async setPrincipal(req: Request, res: Response, next: NextFunction) {
    const patrimonioId = parsePositiveInt(req.params.patrimonioId);
    const fotoId = parsePositiveInt(req.params.fotoId);
    if (patrimonioId === null || fotoId === null) {
      return res.status(400).json({ error: 'Parametros invalidos' });
    }
    try {
      const foto = await service.setPrincipal(patrimonioId, fotoId);
      if (!foto) return res.status(404).json({ error: 'Foto nao encontrada' });
      res.json(foto);
    } catch (err) {
      next(err);
    }
  },

  async remove(req: Request, res: Response, next: NextFunction) {
    const patrimonioId = parsePositiveInt(req.params.patrimonioId);
    const fotoId = parsePositiveInt(req.params.fotoId);
    if (patrimonioId === null || fotoId === null) {
      return res.status(400).json({ error: 'Parametros invalidos' });
    }
    try {
      const foto = await service.delete(patrimonioId, fotoId);
      if (!foto) return res.status(404).json({ error: 'Foto nao encontrada' });
      await removeArquivo(path.join(PATRIMONIO_FOTOS_DIR, foto.nome_arquivo));
      res.status(204).send();
    } catch (err) {
      next(err);
    }
  },
};
