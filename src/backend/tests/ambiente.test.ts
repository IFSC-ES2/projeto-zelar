import request from 'supertest';
import app from '../src/app';
import { AmbienteService } from '../src/services/AmbienteService';

jest.mock('../src/services/AmbienteService');

const MockedService = AmbienteService as jest.MockedClass<typeof AmbienteService>;

beforeEach(() => {
  jest.clearAllMocks();
});

describe('GET /api/ambientes', () => {
  it('200 com lista de ambientes', async () => {
    const list = [{ id: 1, nome: 'Lab 1', bloco: 'A', andar: '1', responsavel_id: null }];
    (MockedService.prototype.findAll as jest.Mock).mockResolvedValue(list);

    const res = await request(app).get('/api/ambientes');

    expect(res.status).toBe(200);
    expect(res.body).toEqual(list);
  });
});

describe('GET /api/ambientes/:id', () => {
  it('200 quando encontrado', async () => {
    const item = { id: 1, nome: 'Lab 1', bloco: 'A', andar: '1', responsavel_id: null };
    (MockedService.prototype.findById as jest.Mock).mockResolvedValue(item);

    const res = await request(app).get('/api/ambientes/1');

    expect(res.status).toBe(200);
    expect(res.body).toEqual(item);
  });

  it('404 quando não encontrado', async () => {
    (MockedService.prototype.findById as jest.Mock).mockResolvedValue(null);

    const res = await request(app).get('/api/ambientes/999');

    expect(res.status).toBe(404);
    expect(res.body).toEqual({ error: 'Não encontrado' });
  });
});

describe('POST /api/ambientes', () => {
  it('201 com body válido', async () => {
    const created = { id: 1, nome: 'Lab 1', bloco: 'A', andar: '1', responsavel_id: null };
    (MockedService.prototype.create as jest.Mock).mockResolvedValue(created);

    const res = await request(app)
      .post('/api/ambientes')
      .send({ nome: 'Lab 1', bloco: 'A', andar: '1' });

    expect(res.status).toBe(201);
    expect(res.body).toEqual(created);
  });

  it('400 sem nome', async () => {
    const res = await request(app)
      .post('/api/ambientes')
      .send({ bloco: 'A' });

    expect(res.status).toBe(400);
    expect(res.body).toEqual({ error: 'nome é obrigatório' });
  });

  it('400 nome vazio', async () => {
    const res = await request(app)
      .post('/api/ambientes')
      .send({ nome: '' });

    expect(res.status).toBe(400);
    expect(res.body).toEqual({ error: 'nome é obrigatório' });
  });

  it('500 quando service lança erro', async () => {
    (MockedService.prototype.create as jest.Mock).mockRejectedValue(new Error('DB error'));

    const res = await request(app)
      .post('/api/ambientes')
      .send({ nome: 'Lab 1' });

    expect(res.status).toBe(500);
    expect(res.body).toEqual({ error: 'Erro interno do servidor' });
  });
});

describe('PUT /api/ambientes/:id', () => {
  const updated = { id: 1, nome: 'Lab Atualizado', bloco: 'B', andar: '2', responsavel_id: null };

  it('200 com dados válidos', async () => {
    (MockedService.prototype.update as jest.Mock).mockResolvedValue(updated);

    const res = await request(app)
      .put('/api/ambientes/1')
      .send({ nome: 'Lab Atualizado' });

    expect(res.status).toBe(200);
    expect(res.body).toEqual(updated);
  });

  it('404 quando id não existe', async () => {
    (MockedService.prototype.update as jest.Mock).mockResolvedValue(null);

    const res = await request(app)
      .put('/api/ambientes/999')
      .send({ nome: 'Lab' });

    expect(res.status).toBe(404);
    expect(res.body).toEqual({ error: 'Não encontrado' });
  });

  it('500 quando service lança erro', async () => {
    (MockedService.prototype.update as jest.Mock).mockRejectedValue(new Error('DB error'));

    const res = await request(app)
      .put('/api/ambientes/1')
      .send({ nome: 'Lab' });

    expect(res.status).toBe(500);
    expect(res.body).toEqual({ error: 'Erro interno do servidor' });
  });
});

describe('DELETE /api/ambientes/:id', () => {
  it('204 quando removido sem vínculos', async () => {
    (MockedService.prototype.findPatrimoniosVinculados as jest.Mock).mockResolvedValue([]);
    (MockedService.prototype.delete as jest.Mock).mockResolvedValue(true);

    const res = await request(app).delete('/api/ambientes/1');

    expect(res.status).toBe(204);
    expect(res.body).toEqual({});
  });

  it('404 quando id não existe', async () => {
    (MockedService.prototype.findPatrimoniosVinculados as jest.Mock).mockResolvedValue([]);
    (MockedService.prototype.delete as jest.Mock).mockResolvedValue(false);

    const res = await request(app).delete('/api/ambientes/999');

    expect(res.status).toBe(404);
    expect(res.body).toEqual({ error: 'Não encontrado' });
  });

  it('409 quando possui patrimônios vinculados', async () => {
    const patrimonios = [
      { id: 1, numero_patrimonio: '2024/001', descricao: 'Computador Dell' },
      { id: 2, numero_patrimonio: '2024/002', descricao: 'Monitor LG' },
    ];
    (MockedService.prototype.findPatrimoniosVinculados as jest.Mock).mockResolvedValue(patrimonios);

    const res = await request(app).delete('/api/ambientes/1');

    expect(res.status).toBe(409);
    expect(res.body.error).toMatch(/patrimônios vinculados/);
    expect(res.body.patrimonios).toHaveLength(2);
    expect(res.body.patrimonios[0]).toMatchObject({ numero_patrimonio: '2024/001', descricao: 'Computador Dell' });
  });

  it('500 quando service lança erro', async () => {
    (MockedService.prototype.findPatrimoniosVinculados as jest.Mock).mockRejectedValue(new Error('DB error'));

    const res = await request(app).delete('/api/ambientes/1');

    expect(res.status).toBe(500);
    expect(res.body).toEqual({ error: 'Erro interno do servidor' });
  });
});
