import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import SolicitacoesList from '../SolicitacoesList';

const mockToast = jest.fn();
jest.mock('../Toast', () => ({
  useToast: () => ({ toast: mockToast }),
}));

const solicitacoes = [
  {
    id: 1,
    patrimonio_id: 1,
    tipo: 'manutencao',
    status: 'aberta',
    descricao: 'Tela quebrada',
    conferente_id: 1,
    createdAt: '2026-06-01T10:00:00.000Z',
  },
  {
    id: 2,
    patrimonio_id: 2,
    tipo: 'substituicao',
    status: 'cancelada',
    descricao: 'Troca de cadeira',
    conferente_id: null,
    createdAt: '2026-06-02T10:00:00.000Z',
  },
];

const patrimonios = [
  { id: 1, numero_patrimonio: 'PAT-001', descricao: 'Notebook Dell' },
  { id: 2, numero_patrimonio: 'PAT-002', descricao: 'Cadeira' },
];

const conferentes = [{ id: 1, nome: 'Ana Silva' }];

beforeEach(() => {
  jest.clearAllMocks();
  process.env.NEXT_PUBLIC_API_URL = 'http://localhost:8000/api';
});

function routeBody(url: string) {
  if (url.includes('/solicitacoes')) return solicitacoes;
  if (url.includes('/patrimonios')) return patrimonios;
  if (url.includes('/conferentes')) return conferentes;
  return [];
}

function mockFetch(
  handler: (url: string, opts?: RequestInit) => { status: number; body: unknown },
) {
  global.fetch = jest.fn(async (url: RequestInfo | URL, opts?: RequestInit) => {
    const { status, body } = handler(url.toString(), opts);
    return {
      ok: status >= 200 && status < 300,
      status,
      json: async () => body,
    } as Response;
  }) as typeof fetch;
}

describe('SolicitacoesList', () => {
  it('renderiza lista carregada da API com patrimonio e conferente', async () => {
    mockFetch(url => ({ status: 200, body: routeBody(url) }));

    render(<SolicitacoesList />);

    await waitFor(() => {
      expect(screen.getByRole('cell', { name: /PAT-001 - Notebook Dell/ })).toBeInTheDocument();
      expect(screen.getAllByText('Manutencao').length).toBeGreaterThan(0);
    });
    expect(screen.getAllByText('Aberta').length).toBeGreaterThan(0);
    expect(screen.getByRole('cell', { name: 'Ana Silva' })).toBeInTheDocument();
  });

  it('filtra por status e tipo', async () => {
    mockFetch(url => ({ status: 200, body: routeBody(url) }));
    render(<SolicitacoesList />);
    await waitFor(() => screen.getByRole('cell', { name: /PAT-001 - Notebook Dell/ }));

    await userEvent.selectOptions(screen.getByLabelText(/filtrar por status/i), 'cancelada');
    await userEvent.selectOptions(screen.getByLabelText(/filtrar por tipo/i), 'substituicao');

    expect(screen.queryByRole('cell', { name: /PAT-001 - Notebook Dell/ })).not.toBeInTheDocument();
    expect(screen.getByRole('cell', { name: /PAT-002 - Cadeira/ })).toBeInTheDocument();
  });

  it('cria solicitacao via API e exibe toast', async () => {
    mockFetch((url, opts) => {
      if (opts?.method === 'POST') {
        expect(url).toContain('/solicitacoes');
        expect(opts.body).toBe(JSON.stringify({
          patrimonio_id: 2,
          tipo: 'substituicao',
          descricao: 'Trocar cadeira',
          conferente_id: 1,
        }));
        return {
          status: 201,
          body: {
            id: 3,
            patrimonio_id: 2,
            tipo: 'substituicao',
            status: 'aberta',
            descricao: 'Trocar cadeira',
            conferente_id: 1,
            createdAt: '2026-06-03T10:00:00.000Z',
          },
        };
      }
      return { status: 200, body: routeBody(url) };
    });
    render(<SolicitacoesList />);
    await waitFor(() => screen.getByRole('cell', { name: /PAT-001 - Notebook Dell/ }));

    await userEvent.selectOptions(screen.getByLabelText(/patrimônio da solicitação/i), '2');
    await userEvent.selectOptions(screen.getByLabelText(/tipo da solicitação/i), 'substituicao');
    await userEvent.selectOptions(screen.getByLabelText(/conferente da solicitação/i), '1');
    await userEvent.type(screen.getByLabelText(/descrição da solicitação/i), 'Trocar cadeira');
    await userEvent.click(screen.getByRole('button', { name: /abrir solicitação/i }));

    await waitFor(() => {
      expect(mockToast).toHaveBeenCalledWith(expect.stringMatching(/criada com sucesso/i), 'success');
      expect(global.fetch).toHaveBeenCalledWith(
        expect.stringContaining('/solicitacoes'),
        expect.objectContaining({ method: 'POST' }),
      );
    });
  });

  it('altera status via API e atualiza lista', async () => {
    mockFetch((url, opts) => {
      if (opts?.method === 'PATCH') {
        expect(url).toContain('/solicitacoes/1/status');
        expect(opts.body).toBe(JSON.stringify({ status: 'concluida' }));
        return { status: 200, body: { ...solicitacoes[0], status: 'concluida' } };
      }
      return { status: 200, body: routeBody(url) };
    });
    render(<SolicitacoesList />);
    await waitFor(() => screen.getByRole('cell', { name: /PAT-001 - Notebook Dell/ }));

    await userEvent.click(screen.getByRole('button', { name: /concluir solicitacao 1/i }));

    await waitFor(() => {
      expect(screen.getAllByText('Concluida').length).toBeGreaterThan(0);
      expect(mockToast).toHaveBeenCalledWith(expect.stringMatching(/atualizado/i), 'success');
    });
  });

  it('exibe erro ao falhar carregamento', async () => {
    global.fetch = jest.fn().mockRejectedValue(new Error('Network'));

    render(<SolicitacoesList />);

    await waitFor(() =>
      expect(screen.getByText(/erro ao carregar solicitacoes/i)).toBeInTheDocument(),
    );
  });
});
