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
  it('204 quando removido sem vínculos', async () => {
    (MockedService.prototype.findPatrimoniosVinculados as jest.Mock).mockResolvedValue([]);
    (MockedService.prototype.findAmbientesVinculados as jest.Mock).mockResolvedValue([]);
    (MockedService.prototype.delete as jest.Mock).mockResolvedValue(true);

    const res = await request(app).delete('/api/responsaveis/1');

    expect(res.status).toBe(204);
    expect(res.body).toEqual({});
  });

  it('404 quando id não existe', async () => {
    (MockedService.prototype.findPatrimoniosVinculados as jest.Mock).mockResolvedValue([]);
    (MockedService.prototype.findAmbientesVinculados as jest.Mock).mockResolvedValue([]);
    (MockedService.prototype.delete as jest.Mock).mockResolvedValue(false);

    const res = await request(app).delete('/api/responsaveis/999');

    expect(res.status).toBe(404);
    expect(res.body).toEqual({ error: 'Não encontrado' });
  });

  it('409 quando possui patrimônios vinculados', async () => {
    const patrimonios = [
      { id: 1, numero_patrimonio: '2024/001', descricao: 'Computador Dell' },
      { id: 2, numero_patrimonio: '2024/002', descricao: 'Monitor LG' },
    ];
    (MockedService.prototype.findPatrimoniosVinculados as jest.Mock).mockResolvedValue(patrimonios);

    const res = await request(app).delete('/api/responsaveis/1');

    expect(res.status).toBe(409);
    expect(res.body.error).toMatch(/patrimônios vinculados/);
    expect(res.body.patrimonios).toHaveLength(2);
    expect(res.body.patrimonios[0]).toMatchObject({ numero_patrimonio: '2024/001', descricao: 'Computador Dell' });
  });

  it('409 quando possui ambientes vinculados sem patrimônios', async () => {
    const ambientes = [
      { id: 1, nome: 'Lab 1', bloco: 'A', andar: '1' },
    ];
    (MockedService.prototype.findPatrimoniosVinculados as jest.Mock).mockResolvedValue([]);
    (MockedService.prototype.findAmbientesVinculados as jest.Mock).mockResolvedValue(ambientes);

    const res = await request(app).delete('/api/responsaveis/1');

    expect(res.status).toBe(409);
    expect(res.body.error).toMatch(/ambientes vinculados/);
    expect(res.body.ambientes).toHaveLength(1);
    expect(res.body.ambientes[0]).toMatchObject({ nome: 'Lab 1', bloco: 'A' });
  });

  it('patrimônios têm prioridade sobre ambientes no bloqueio', async () => {
    const patrimonios = [{ id: 1, numero_patrimonio: '2024/001', descricao: 'PC' }];
    const ambientes = [{ id: 1, nome: 'Lab 1', bloco: null, andar: null }];
    (MockedService.prototype.findPatrimoniosVinculados as jest.Mock).mockResolvedValue(patrimonios);
    (MockedService.prototype.findAmbientesVinculados as jest.Mock).mockResolvedValue(ambientes);

    const res = await request(app).delete('/api/responsaveis/1');

    expect(res.status).toBe(409);
    expect(res.body.patrimonios).toBeDefined();
    expect(res.body.ambientes).toBeUndefined();
  });

  it('500 quando service lança erro', async () => {
    (MockedService.prototype.findPatrimoniosVinculados as jest.Mock).mockRejectedValue(new Error('DB error'));

    const res = await request(app).delete('/api/responsaveis/1');

    expect(res.status).toBe(500);
    expect(res.body).toEqual({ error: 'Erro interno do servidor' });
  });
});
