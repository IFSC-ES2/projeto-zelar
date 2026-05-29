import request from 'supertest';
import { UniqueConstraintError } from 'sequelize';
import app from '../src/app';
import { PatrimonioService } from '../src/services/PatrimonioService';

jest.mock('../src/services/PatrimonioService');
const MockedService = PatrimonioService as jest.Mocked<typeof PatrimonioService>;

const validBody = {
  numero_patrimonio: 'PAT-001',
  descricao: 'Notebook Dell',
  valor: 3500,
  tipo_material_id: 1,
  estado_item_id: 1,
  ambiente_id: 1,
  responsavel_id: 1,
};

describe('Testes Essenciais Patrimonio', () => {
  beforeEach(() => jest.clearAllMocks());

  describe('POST /api/patrimonios', () => {
    it('Deve criar um patrimonio com dados validos', async () => {
      const mockResult = { id: 1, ...validBody };
      (MockedService.prototype.create as jest.Mock).mockResolvedValue(mockResult);

      const res = await request(app).post('/api/patrimonios').send(validBody);

      expect(res.status).toBe(201);
      expect(res.body.id).toBe(1);
      expect(MockedService.prototype.create).toHaveBeenCalled();
    });

    it('Deve retornar 400 se faltar numero_patrimonio', async () => {
      const { numero_patrimonio, ...semNumero } = validBody;
      const res = await request(app).post('/api/patrimonios').send(semNumero);

      expect(res.status).toBe(400);
      expect(MockedService.prototype.create).not.toHaveBeenCalled();
    });

    it('Deve retornar 400 se valor for negativo', async () => {
      const res = await request(app)
        .post('/api/patrimonios')
        .send({ ...validBody, valor: -10 });

      expect(res.status).toBe(400);
    });

    it('Deve retornar 400 se faltar foreign keys obrigatorias', async () => {
      const res = await request(app)
        .post('/api/patrimonios')
        .send({ numero_patrimonio: 'PAT-002', descricao: 'Item', valor: 100 });

      expect(res.status).toBe(400);
    });

    it('Deve retornar 409 se numero_patrimonio ja existir', async () => {
      (MockedService.prototype.create as jest.Mock).mockRejectedValue(
        new UniqueConstraintError({})
      );

      const res = await request(app).post('/api/patrimonios').send(validBody);

      expect(res.status).toBe(409);
    });
  });

  describe('GET /api/patrimonios', () => {
    it('Deve listar patrimonios', async () => {
      (MockedService.prototype.findAll as jest.Mock).mockResolvedValue([{ id: 1, ...validBody }]);

      const res = await request(app).get('/api/patrimonios');

      expect(res.status).toBe(200);
      expect(res.body).toHaveLength(1);
    });
  });

  describe('GET /api/patrimonios/:id', () => {
    it('Deve retornar 404 se nao encontrado', async () => {
      (MockedService.prototype.findById as jest.Mock).mockResolvedValue(null);

      const res = await request(app).get('/api/patrimonios/99');

      expect(res.status).toBe(404);
    });
  });

  describe('PUT /api/patrimonios/:id', () => {
    it('Deve atualizar um patrimonio existente', async () => {
      (MockedService.prototype.update as jest.Mock).mockResolvedValue({ id: 1, ...validBody, valor: 4000 });

      const res = await request(app).put('/api/patrimonios/1').send({ valor: 4000 });

      expect(res.status).toBe(200);
      expect(res.body.valor).toBe(4000);
    });

    it('Deve retornar 404 ao atualizar inexistente', async () => {
      (MockedService.prototype.update as jest.Mock).mockResolvedValue(null);

      const res = await request(app).put('/api/patrimonios/99').send({ valor: 4000 });

      expect(res.status).toBe(404);
    });
  });

  describe('DELETE /api/patrimonios/:id', () => {
    it('Deve retornar 204 ao excluir com sucesso', async () => {
      (MockedService.prototype.delete as jest.Mock).mockResolvedValue(true);

      const res = await request(app).delete('/api/patrimonios/1');

      expect(res.status).toBe(204);
    });

    it('Deve retornar 404 ao excluir inexistente', async () => {
      (MockedService.prototype.delete as jest.Mock).mockResolvedValue(false);

      const res = await request(app).delete('/api/patrimonios/99');

      expect(res.status).toBe(404);
    });
  });
});
