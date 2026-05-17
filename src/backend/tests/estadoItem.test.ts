import request from 'supertest';
import app from '../src/app';
import { Patrimonio } from '../src/models/Patrimonio';
import { EstadoItemService } from '../src/services/EstadoItemService';

jest.mock('../src/services/EstadoItemService');
jest.mock('../src/models/Patrimonio', () => ({
  Patrimonio: {
    findAll: jest.fn(),
  },
}));

const MockedService = EstadoItemService as jest.MockedClass<typeof EstadoItemService>;

beforeEach(() => {
  jest.clearAllMocks();
});

describe('GET /api/estados-item', () => {
  it('200 com lista de estados de item', async () => {
    const list = [{ id: 1, nome: 'Bom', descricao: 'Em boas condicoes' }];
    (MockedService.prototype.findAll as jest.Mock).mockResolvedValue(list);

    const res = await request(app).get('/api/estados-item');

    expect(res.status).toBe(200);
    expect(res.body).toEqual(list);
  });
});

describe('GET /api/estados-item/:id', () => {
  it('200 quando encontrado', async () => {
    const item = { id: 1, nome: 'Bom', descricao: 'Em boas condicoes' };
    (MockedService.prototype.findById as jest.Mock).mockResolvedValue(item);

    const res = await request(app).get('/api/estados-item/1');

    expect(res.status).toBe(200);
    expect(res.body).toEqual(item);
  });

  it('404 quando nao encontrado', async () => {
    (MockedService.prototype.findById as jest.Mock).mockResolvedValue(null);

    const res = await request(app).get('/api/estados-item/999');

    expect(res.status).toBe(404);
    expect(res.body).toEqual({ error: 'N\u00e3o encontrado' });
  });
});

describe('POST /api/estados-item', () => {
  it('201 com body valido', async () => {
    const created = { id: 1, nome: 'Bom', descricao: 'Em boas condicoes' };
    (MockedService.prototype.create as jest.Mock).mockResolvedValue(created);

    const res = await request(app)
      .post('/api/estados-item')
      .send({ nome: 'Bom', descricao: 'Em boas condicoes' });

    expect(res.status).toBe(201);
    expect(res.body).toEqual(created);
  });

  it('400 sem nome', async () => {
    const res = await request(app)
      .post('/api/estados-item')
      .send({ descricao: 'Sem nome' });

    expect(res.status).toBe(400);
    expect(res.body).toEqual({ error: 'nome \u00e9 obrigat\u00f3rio' });
  });

  it('400 nome vazio', async () => {
    const res = await request(app)
      .post('/api/estados-item')
      .send({ nome: '' });

    expect(res.status).toBe(400);
    expect(res.body).toEqual({ error: 'nome \u00e9 obrigat\u00f3rio' });
  });

  it('500 quando service lanca erro', async () => {
    (MockedService.prototype.create as jest.Mock).mockRejectedValue(new Error('DB error'));

    const res = await request(app)
      .post('/api/estados-item')
      .send({ nome: 'Bom' });

    expect(res.status).toBe(500);
    expect(res.body).toEqual({ error: 'Erro interno do servidor' });
  });
});

describe('EstadoItemService.findPatrimoniosVinculados', () => {
  it('busca patrimonios pelo campo estado_item_id', async () => {
    const patrimonios = [{ id: 1, numero_patrimonio: '2024/001', descricao: 'Notebook' }];
    (Patrimonio.findAll as jest.Mock).mockResolvedValue(patrimonios);
    const { EstadoItemService: ActualEstadoItemService } = jest.requireActual('../src/services/EstadoItemService');

    const service = new ActualEstadoItemService();
    const result = await service.findPatrimoniosVinculados(7);

    expect(result).toEqual(patrimonios);
    expect(Patrimonio.findAll).toHaveBeenCalledWith({
      where: { estado_item_id: 7 },
      attributes: ['id', 'numero_patrimonio', 'descricao'],
    });
  });
});

describe('PUT /api/estados-item/:id', () => {
  const updated = { id: 1, nome: 'Regular', descricao: 'Uso com restricoes' };

  it('200 com dados validos', async () => {
    (MockedService.prototype.update as jest.Mock).mockResolvedValue(updated);

    const res = await request(app)
      .put('/api/estados-item/1')
      .send({ nome: 'Regular' });

    expect(res.status).toBe(200);
    expect(res.body).toEqual(updated);
  });

  it('404 quando id nao existe', async () => {
    (MockedService.prototype.update as jest.Mock).mockResolvedValue(null);

    const res = await request(app)
      .put('/api/estados-item/999')
      .send({ nome: 'Regular' });

    expect(res.status).toBe(404);
    expect(res.body).toEqual({ error: 'N\u00e3o encontrado' });
  });

  it('500 quando service lanca erro', async () => {
    (MockedService.prototype.update as jest.Mock).mockRejectedValue(new Error('DB error'));

    const res = await request(app)
      .put('/api/estados-item/1')
      .send({ nome: 'Regular' });

    expect(res.status).toBe(500);
    expect(res.body).toEqual({ error: 'Erro interno do servidor' });
  });
});

describe('DELETE /api/estados-item/:id', () => {
  it('204 quando removido sem vinculos', async () => {
    (MockedService.prototype.findPatrimoniosVinculados as jest.Mock).mockResolvedValue([]);
    (MockedService.prototype.delete as jest.Mock).mockResolvedValue(true);

    const res = await request(app).delete('/api/estados-item/1');

    expect(res.status).toBe(204);
    expect(res.body).toEqual({});
  });

  it('404 quando id nao existe', async () => {
    (MockedService.prototype.findPatrimoniosVinculados as jest.Mock).mockResolvedValue([]);
    (MockedService.prototype.delete as jest.Mock).mockResolvedValue(false);

    const res = await request(app).delete('/api/estados-item/999');

    expect(res.status).toBe(404);
    expect(res.body).toEqual({ error: 'N\u00e3o encontrado' });
  });

  it('409 quando possui patrimonios vinculados', async () => {
    const patrimonios = [
      { id: 1, numero_patrimonio: '2024/001', descricao: 'Computador Dell' },
      { id: 2, numero_patrimonio: '2024/002', descricao: 'Monitor LG' },
    ];
    (MockedService.prototype.findPatrimoniosVinculados as jest.Mock).mockResolvedValue(patrimonios);

    const res = await request(app).delete('/api/estados-item/1');

    expect(res.status).toBe(409);
    expect(res.body.error).toMatch(/patrim\u00f4nios vinculados/);
    expect(res.body.patrimonios).toHaveLength(2);
    expect(res.body.patrimonios[0]).toMatchObject({ numero_patrimonio: '2024/001', descricao: 'Computador Dell' });
  });

  it('500 quando service lanca erro', async () => {
    (MockedService.prototype.findPatrimoniosVinculados as jest.Mock).mockRejectedValue(new Error('DB error'));

    const res = await request(app).delete('/api/estados-item/1');

    expect(res.status).toBe(500);
    expect(res.body).toEqual({ error: 'Erro interno do servidor' });
  });
});
