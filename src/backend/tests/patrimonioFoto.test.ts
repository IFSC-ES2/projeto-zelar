import { rmSync } from 'fs';
import request from 'supertest';
import app from '../src/app';
import { UPLOAD_ROOT } from '../src/config/upload';
import { PatrimonioFotoService } from '../src/services/PatrimonioFotoService';

jest.mock('../src/services/PatrimonioFotoService');

const MockedService = PatrimonioFotoService as jest.MockedClass<typeof PatrimonioFotoService>;

const fotoExemplo = {
  id: 1,
  patrimonio_id: 12,
  url: '/uploads/patrimonios/uuid.jpg',
  nome_arquivo: 'uuid.jpg',
  nome_original: 'notebook.jpg',
  mime_type: 'image/jpeg',
  tamanho_bytes: 245000,
  descricao: null,
  ordem: 0,
  principal: true,
};

beforeEach(() => jest.clearAllMocks());

afterAll(() => {
  rmSync(UPLOAD_ROOT, { recursive: true, force: true });
});

describe('GET /api/patrimonios/:patrimonioId/fotos', () => {
  it('200 com lista de fotos', async () => {
    (MockedService.prototype.patrimonioExists as jest.Mock).mockResolvedValue(true);
    (MockedService.prototype.listByPatrimonio as jest.Mock).mockResolvedValue([fotoExemplo]);

    const res = await request(app).get('/api/patrimonios/12/fotos');

    expect(res.status).toBe(200);
    expect(res.body).toHaveLength(1);
  });

  it('404 quando patrimonio nao existe', async () => {
    (MockedService.prototype.patrimonioExists as jest.Mock).mockResolvedValue(false);

    const res = await request(app).get('/api/patrimonios/999/fotos');

    expect(res.status).toBe(404);
    expect(MockedService.prototype.listByPatrimonio).not.toHaveBeenCalled();
  });
});

describe('POST /api/patrimonios/:patrimonioId/fotos', () => {
  it('201 com upload valido', async () => {
    (MockedService.prototype.patrimonioExists as jest.Mock).mockResolvedValue(true);
    (MockedService.prototype.create as jest.Mock).mockResolvedValue(fotoExemplo);

    const res = await request(app)
      .post('/api/patrimonios/12/fotos')
      .attach('foto', Buffer.from([0xff, 0xd8, 0xff]), {
        filename: 'notebook.jpg',
        contentType: 'image/jpeg',
      });

    expect(res.status).toBe(201);
    expect(res.body.id).toBe(1);
    expect(MockedService.prototype.create).toHaveBeenCalled();
  });

  it('400 sem arquivo', async () => {
    const res = await request(app)
      .post('/api/patrimonios/12/fotos')
      .field('descricao', 'sem arquivo');

    expect(res.status).toBe(400);
    expect(res.body).toEqual({ error: 'foto e obrigatoria' });
    expect(MockedService.prototype.create).not.toHaveBeenCalled();
  });

  it('400 com MIME invalido', async () => {
    const res = await request(app)
      .post('/api/patrimonios/12/fotos')
      .attach('foto', Buffer.from('texto'), {
        filename: 'doc.pdf',
        contentType: 'application/pdf',
      });

    expect(res.status).toBe(400);
    expect(MockedService.prototype.create).not.toHaveBeenCalled();
  });

  it('404 quando patrimonio nao existe (remove arquivo orfao)', async () => {
    (MockedService.prototype.patrimonioExists as jest.Mock).mockResolvedValue(false);

    const res = await request(app)
      .post('/api/patrimonios/999/fotos')
      .attach('foto', Buffer.from([0xff, 0xd8, 0xff]), {
        filename: 'notebook.jpg',
        contentType: 'image/jpeg',
      });

    expect(res.status).toBe(404);
    expect(MockedService.prototype.create).not.toHaveBeenCalled();
  });
});

describe('PATCH /api/patrimonios/:patrimonioId/fotos/:fotoId', () => {
  it('200 ao atualizar metadados', async () => {
    (MockedService.prototype.update as jest.Mock).mockResolvedValue({ ...fotoExemplo, descricao: 'Frontal' });

    const res = await request(app)
      .patch('/api/patrimonios/12/fotos/1')
      .send({ descricao: 'Frontal' });

    expect(res.status).toBe(200);
    expect(res.body.descricao).toBe('Frontal');
  });

  it('404 quando foto nao pertence ao patrimonio', async () => {
    (MockedService.prototype.update as jest.Mock).mockResolvedValue(null);

    const res = await request(app).patch('/api/patrimonios/12/fotos/999').send({ ordem: 2 });

    expect(res.status).toBe(404);
  });
});

describe('PATCH /api/patrimonios/:patrimonioId/fotos/:fotoId/principal', () => {
  it('200 ao marcar como principal', async () => {
    (MockedService.prototype.setPrincipal as jest.Mock).mockResolvedValue(fotoExemplo);

    const res = await request(app).patch('/api/patrimonios/12/fotos/1/principal');

    expect(res.status).toBe(200);
    expect(res.body.principal).toBe(true);
  });
});

describe('DELETE /api/patrimonios/:patrimonioId/fotos/:fotoId', () => {
  it('204 ao remover', async () => {
    (MockedService.prototype.delete as jest.Mock).mockResolvedValue(fotoExemplo);

    const res = await request(app).delete('/api/patrimonios/12/fotos/1');

    expect(res.status).toBe(204);
  });

  it('404 quando foto inexistente', async () => {
    (MockedService.prototype.delete as jest.Mock).mockResolvedValue(null);

    const res = await request(app).delete('/api/patrimonios/12/fotos/999');

    expect(res.status).toBe(404);
  });
});
