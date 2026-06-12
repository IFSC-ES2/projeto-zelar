import request from 'supertest';
import { ForeignKeyConstraintError } from 'sequelize';
import app from '../src/app';
import { SolicitacaoService } from '../src/services/SolicitacaoService';

jest.mock('../src/services/SolicitacaoService');
const MockedService = SolicitacaoService as jest.Mocked<typeof SolicitacaoService>;

const validBody = {
  patrimonio_id: 1,
  tipo: 'manutencao',
  descricao: 'Tela quebrada',
  conferente_id: 1,
};

describe('Solicitacoes', () => {
  beforeEach(() => jest.clearAllMocks());

  describe('POST /api/solicitacoes', () => {
    it('cria solicitacao com dados validos', async () => {
      const created = { id: 1, status: 'aberta', ...validBody };
      (MockedService.prototype.create as jest.Mock).mockResolvedValue(created);

      const res = await request(app).post('/api/solicitacoes').send(validBody);

      expect(res.status).toBe(201);
      expect(res.body).toEqual(created);
      expect(MockedService.prototype.create).toHaveBeenCalledWith(validBody);
    });

    it('retorna 400 sem patrimonio_id', async () => {
      const { patrimonio_id, ...body } = validBody;

      const res = await request(app).post('/api/solicitacoes').send(body);

      expect(res.status).toBe(400);
      expect(MockedService.prototype.create).not.toHaveBeenCalled();
    });

    it('retorna 400 com tipo invalido', async () => {
      const res = await request(app)
        .post('/api/solicitacoes')
        .send({ ...validBody, tipo: 'reparo' });

      expect(res.status).toBe(400);
      expect(MockedService.prototype.create).not.toHaveBeenCalled();
    });

    it('retorna 400 quando patrimonio ou conferente nao existe', async () => {
      (MockedService.prototype.create as jest.Mock).mockRejectedValue(
        new ForeignKeyConstraintError({}),
      );

      const res = await request(app).post('/api/solicitacoes').send(validBody);

      expect(res.status).toBe(400);
    });
  });

  describe('GET /api/solicitacoes', () => {
    it('lista solicitacoes com filtros de status e patrimonio', async () => {
      const list = [{ id: 1, status: 'aberta', ...validBody }];
      (MockedService.prototype.findAll as jest.Mock).mockResolvedValue(list);

      const res = await request(app)
        .get('/api/solicitacoes')
        .query({ status: 'aberta', patrimonio_id: 1 });

      expect(res.status).toBe(200);
      expect(res.body).toEqual(list);
      expect(MockedService.prototype.findAll).toHaveBeenCalledWith({
        status: 'aberta',
        patrimonio_id: 1,
      });
    });

    it('retorna 400 para filtro de status invalido', async () => {
      const res = await request(app).get('/api/solicitacoes').query({ status: 'pendente' });

      expect(res.status).toBe(400);
      expect(MockedService.prototype.findAll).not.toHaveBeenCalled();
    });
  });

  describe('PATCH /api/solicitacoes/:id/status', () => {
    it('atualiza status da solicitacao', async () => {
      const updated = { id: 1, ...validBody, status: 'concluida' };
      (MockedService.prototype.updateStatus as jest.Mock).mockResolvedValue(updated);

      const res = await request(app)
        .patch('/api/solicitacoes/1/status')
        .send({ status: 'concluida' });

      expect(res.status).toBe(200);
      expect(res.body.status).toBe('concluida');
      expect(MockedService.prototype.updateStatus).toHaveBeenCalledWith(1, 'concluida');
    });

    it('retorna 400 para status invalido', async () => {
      const res = await request(app)
        .patch('/api/solicitacoes/1/status')
        .send({ status: 'pendente' });

      expect(res.status).toBe(400);
      expect(MockedService.prototype.updateStatus).not.toHaveBeenCalled();
    });

    it('retorna 404 para solicitacao inexistente', async () => {
      (MockedService.prototype.updateStatus as jest.Mock).mockResolvedValue(null);

      const res = await request(app)
        .patch('/api/solicitacoes/99/status')
        .send({ status: 'cancelada' });

      expect(res.status).toBe(404);
    });
  });

  describe('DELETE /api/solicitacoes/:id', () => {
    it('exclui solicitacao', async () => {
      (MockedService.prototype.delete as jest.Mock).mockResolvedValue(true);

      const res = await request(app).delete('/api/solicitacoes/1');

      expect(res.status).toBe(204);
    });
  });
});
