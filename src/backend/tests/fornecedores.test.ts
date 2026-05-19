import request from 'supertest';
import app from '../src/app';
import { FornecedorService } from '../src/services/FornecedoresService';

jest.mock('../src/services/FornecedoresService');
const MockedService = FornecedorService as jest.Mocked<typeof FornecedorService>;

describe('Testes Essenciais Fornecedor', () => {
  beforeEach(() => jest.clearAllMocks());

  describe('POST /api/fornecedores', () => {
    it('Deve criar um fornecedor com dados validos', async () => {
      const mockResult = { id: 1, nome: 'Empresa XPTO', cnpj: '123' };
      (MockedService.prototype.create as jest.Mock).mockResolvedValue(mockResult);

      const res = await request(app)
        .post('/api/fornecedores')
        .send({ nome: 'Empresa XPTO', cnpj: '123' });

      expect(res.status).toBe(201);
      expect(res.body.id).toBe(1);
    });

    it('Deve retornar 400 se faltar campos obrigatorios', async () => {
      const res = await request(app)
        .post('/api/fornecedores')
        .send({ email: 'contato@empresa.com' });

      expect(res.status).toBe(400);
    });
  });

  describe('DELETE /api/fornecedores/:id', () => {
    it('Deve retornar 409 se houver patrimonios vinculados', async () => {
      (MockedService.prototype.findPatrimoniosVinculados as jest.Mock).mockResolvedValue([{ id: 1 }]);

      const res = await request(app).delete('/api/fornecedores/1');

      expect(res.status).toBe(409);
      expect(res.body.error).toContain('vinculados');
    });

    it('Deve retornar 204 ao excluir com sucesso', async () => {
      (MockedService.prototype.findPatrimoniosVinculados as jest.Mock).mockResolvedValue([]);
      (MockedService.prototype.delete as jest.Mock).mockResolvedValue(true);

      const res = await request(app).delete('/api/fornecedores/1');

      expect(res.status).toBe(204);
    });
  });
});
