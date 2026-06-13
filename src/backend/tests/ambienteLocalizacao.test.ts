import request from 'supertest';
import app from '../src/app';
import { AmbienteService } from '../src/services/AmbienteService';

jest.mock('../src/services/AmbienteService');

const MockedService = AmbienteService as jest.MockedClass<typeof AmbienteService>;

const ambienteComLocalizacao = {
  id: 1,
  nome: 'Lab 1',
  responsavel_id: 1,
  latitude: -27.5969,
  longitude: -48.5495,
  precisao_metros: 12.5,
  localizacao_observacao: 'Entrada principal',
  localizacao_atualizada_em: '2026-06-12T12:00:00.000Z',
};

beforeEach(() => jest.clearAllMocks());

describe('PATCH /api/ambientes/:id/localizacao', () => {
  it('200 com coordenadas validas', async () => {
    (MockedService.prototype.updateLocalizacao as jest.Mock).mockResolvedValue(ambienteComLocalizacao);

    const res = await request(app)
      .patch('/api/ambientes/1/localizacao')
      .send({ latitude: -27.5969, longitude: -48.5495, precisao_metros: 12.5 });

    expect(res.status).toBe(200);
    expect(res.body.latitude).toBe(-27.5969);
    expect(MockedService.prototype.updateLocalizacao).toHaveBeenCalled();
  });

  it('400 sem latitude', async () => {
    const res = await request(app)
      .patch('/api/ambientes/1/localizacao')
      .send({ longitude: -48.5495 });

    expect(res.status).toBe(400);
    expect(MockedService.prototype.updateLocalizacao).not.toHaveBeenCalled();
  });

  it('400 latitude fora do intervalo', async () => {
    const res = await request(app)
      .patch('/api/ambientes/1/localizacao')
      .send({ latitude: 120, longitude: -48.5495 });

    expect(res.status).toBe(400);
    expect(res.body.error).toMatch(/latitude/);
  });

  it('400 longitude fora do intervalo', async () => {
    const res = await request(app)
      .patch('/api/ambientes/1/localizacao')
      .send({ latitude: -27.5969, longitude: 200 });

    expect(res.status).toBe(400);
    expect(res.body.error).toMatch(/longitude/);
  });

  it('400 precisao_metros negativa', async () => {
    const res = await request(app)
      .patch('/api/ambientes/1/localizacao')
      .send({ latitude: -27.5969, longitude: -48.5495, precisao_metros: -5 });

    expect(res.status).toBe(400);
  });

  it('404 quando ambiente nao existe', async () => {
    (MockedService.prototype.updateLocalizacao as jest.Mock).mockResolvedValue(null);

    const res = await request(app)
      .patch('/api/ambientes/999/localizacao')
      .send({ latitude: -27.5969, longitude: -48.5495 });

    expect(res.status).toBe(404);
  });
});

describe('DELETE /api/ambientes/:id/localizacao', () => {
  it('200 ao limpar localizacao', async () => {
    (MockedService.prototype.clearLocalizacao as jest.Mock).mockResolvedValue({
      ...ambienteComLocalizacao,
      latitude: null,
      longitude: null,
      precisao_metros: null,
      localizacao_observacao: null,
      localizacao_atualizada_em: null,
    });

    const res = await request(app).delete('/api/ambientes/1/localizacao');

    expect(res.status).toBe(200);
    expect(res.body.latitude).toBeNull();
  });

  it('404 quando ambiente nao existe', async () => {
    (MockedService.prototype.clearLocalizacao as jest.Mock).mockResolvedValue(null);

    const res = await request(app).delete('/api/ambientes/999/localizacao');

    expect(res.status).toBe(404);
  });
});
