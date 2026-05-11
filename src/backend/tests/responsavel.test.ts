import request from 'supertest';
import app from '../src/app';
import { ResponsavelService } from '../src/services/ResponsavelService';

jest.mock('../src/services/ResponsavelService');

const MockedService = ResponsavelService as jest.MockedClass<typeof ResponsavelService>;

beforeEach(() => {
  jest.clearAllMocks();
});

describe('POST /api/responsaveis', () => {
  it('201 com body válido', async () => {
    const created = { id: 1, nome: 'João', email: 'joao@test.com', cargo: null, departamento: null, telefone: null };
    (MockedService.prototype.create as jest.Mock).mockResolvedValue(created);

    const res = await request(app)
      .post('/api/responsaveis')
      .send({ nome: 'João', email: 'joao@test.com' });

    expect(res.status).toBe(201);
    expect(res.body).toEqual(created);
  });

  it('400 sem nome', async () => {
    const res = await request(app)
      .post('/api/responsaveis')
      .send({ email: 'joao@test.com' });

    expect(res.status).toBe(400);
    expect(res.body).toEqual({ error: 'nome é obrigatório' });
  });

  it('400 nome vazio', async () => {
    const res = await request(app)
      .post('/api/responsaveis')
      .send({ nome: '', email: 'joao@test.com' });

    expect(res.status).toBe(400);
    expect(res.body).toEqual({ error: 'nome é obrigatório' });
  });

  it('400 sem email', async () => {
    const res = await request(app)
      .post('/api/responsaveis')
      .send({ nome: 'João' });

    expect(res.status).toBe(400);
    expect(res.body).toEqual({ error: 'email é obrigatório' });
  });

  it('400 email vazio', async () => {
    const res = await request(app)
      .post('/api/responsaveis')
      .send({ nome: 'João', email: '' });

    expect(res.status).toBe(400);
    expect(res.body).toEqual({ error: 'email é obrigatório' });
  });

  it('400 sem nome e sem email', async () => {
    const res = await request(app)
      .post('/api/responsaveis')
      .send({});

    expect(res.status).toBe(400);
    expect(res.body).toEqual({ error: 'nome é obrigatório' });
  });

  it('500 quando service lança erro', async () => {
    (MockedService.prototype.create as jest.Mock).mockRejectedValue(new Error('DB error'));

    const res = await request(app)
      .post('/api/responsaveis')
      .send({ nome: 'João', email: 'joao@test.com' });

    expect(res.status).toBe(500);
    expect(res.body).toEqual({ error: 'Erro interno do servidor' });
  });
});

describe('PUT /api/responsaveis/:id', () => {
  const updated = { id: 1, nome: 'João Atualizado', email: 'joao@test.com', cargo: null, departamento: null, telefone: null };

  it('200 com dados válidos', async () => {
    (MockedService.prototype.update as jest.Mock).mockResolvedValue(updated);

    const res = await request(app)
      .put('/api/responsaveis/1')
      .send({ nome: 'João Atualizado' });

    expect(res.status).toBe(200);
    expect(res.body).toEqual(updated);
  });

  it('404 quando id não existe', async () => {
    (MockedService.prototype.update as jest.Mock).mockResolvedValue(null);

    const res = await request(app)
      .put('/api/responsaveis/999')
      .send({ nome: 'João' });

    expect(res.status).toBe(404);
    expect(res.body).toEqual({ error: 'Não encontrado' });
  });

  it('500 quando service lança erro', async () => {
    (MockedService.prototype.update as jest.Mock).mockRejectedValue(new Error('DB error'));

    const res = await request(app)
      .put('/api/responsaveis/1')
      .send({ nome: 'João' });

    expect(res.status).toBe(500);
    expect(res.body).toEqual({ error: 'Erro interno do servidor' });
  });
});

describe('DELETE /api/responsaveis/:id', () => {
  it('204 quando removido com sucesso', async () => {
    (MockedService.prototype.delete as jest.Mock).mockResolvedValue(true);

    const res = await request(app).delete('/api/responsaveis/1');

    expect(res.status).toBe(204);
    expect(res.body).toEqual({});
  });

  it('404 quando id não existe', async () => {
    (MockedService.prototype.delete as jest.Mock).mockResolvedValue(false);

    const res = await request(app).delete('/api/responsaveis/999');

    expect(res.status).toBe(404);
    expect(res.body).toEqual({ error: 'Não encontrado' });
  });

  it('500 quando service lança erro', async () => {
    (MockedService.prototype.delete as jest.Mock).mockRejectedValue(new Error('DB error'));

    const res = await request(app).delete('/api/responsaveis/1');

    expect(res.status).toBe(500);
    expect(res.body).toEqual({ error: 'Erro interno do servidor' });
  });
});
