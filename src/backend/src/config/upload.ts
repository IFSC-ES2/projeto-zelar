import { randomUUID } from 'crypto';
import { mkdirSync } from 'fs';
import path from 'path';
import multer from 'multer';

export const UPLOAD_ROOT = path.resolve(process.cwd(), 'uploads');
export const PATRIMONIO_FOTOS_DIR = path.join(UPLOAD_ROOT, 'patrimonios');
export const PATRIMONIO_FOTOS_PUBLIC_PATH = '/uploads/patrimonios';

export const ALLOWED_MIME_TYPES = ['image/jpeg', 'image/png', 'image/webp'];
export const MAX_FILE_SIZE_BYTES = 5 * 1024 * 1024;

const MIME_EXTENSION: Record<string, string> = {
  'image/jpeg': '.jpg',
  'image/png': '.png',
  'image/webp': '.webp',
};

export class InvalidMimeTypeError extends Error {
  constructor() {
    super('TIPO_INVALIDO');
    this.name = 'InvalidMimeTypeError';
  }
}

const storage = multer.diskStorage({
  destination: (_req, _file, cb) => {
    mkdirSync(PATRIMONIO_FOTOS_DIR, { recursive: true });
    cb(null, PATRIMONIO_FOTOS_DIR);
  },
  filename: (_req, file, cb) => {
    const ext = MIME_EXTENSION[file.mimetype] ?? '';
    cb(null, `${randomUUID()}${ext}`);
  },
});

export const uploadFoto = multer({
  storage,
  limits: { fileSize: MAX_FILE_SIZE_BYTES },
  fileFilter: (_req, file, cb) => {
    if (!ALLOWED_MIME_TYPES.includes(file.mimetype)) {
      return cb(new InvalidMimeTypeError());
    }
    cb(null, true);
  },
});
