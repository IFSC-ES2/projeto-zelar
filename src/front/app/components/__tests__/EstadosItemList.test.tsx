import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import EstadosItemList from '../EstadosItemList';

jest.mock('next/link', () => ({
  __esModule: true,
  default: ({ href, children }: { href: string; children: React.ReactNode }) => <a href={href}>{children}</a>,
}));

const mockToast = jest.fn();
jest.mock('../Toast', () => ({
  useToast: () => ({ toast: mockToast }),
}));

const estados = [
  { id: 1, nome: 'Ativo', descricao: 'Item em uso' },
  { id: 2, nome: 'Manutencao', descricao: null },
];

beforeEach(() => {
  jest.clearAllMocks();
  process.env.NEXT_PUBLIC_API_URL = 'http://localhost:8000/api';
});

function mockFetch(handler: (url: string, opts?: RequestInit) => { status: number; body: unknown }) {
  global.fetch = jest.fn(async (url: RequestInfo | URL, opts?: RequestInit) => {
    const { status, body } = handler(url.toString(), opts);
    return {
      ok: status >= 200 && status < 300,
      status,
      json: async () => body,
    } as Response;
  }) as typeof fetch;
}

describe('EstadosItemList', () => {
  it('renderiza lista carregada da API', async () => {
    mockFetch(() => ({ status: 200, body: estados }));

    render(<EstadosItemList />);

    await waitFor(() => {
      expect(screen.getByText('Ativo')).toBeInTheDocument();
      expect(screen.getByText('Manutencao')).toBeInTheDocument();
    });
    expect(screen.getByText('Item em uso')).toBeInTheDocument();
  });

  it('filtra por nome', async () => {
    mockFetch(() => ({ status: 200, body: estados }));
    render(<EstadosItemList />);
    await waitFor(() => screen.getByText('Ativo'));

    await userEvent.type(screen.getByPlaceholderText(/buscar/i), 'manutencao');

    expect(screen.queryByText('Ativo')).not.toBeInTheDocument();
    expect(screen.getByText('Manutencao')).toBeInTheDocument();
  });

  it('filtra por descricao', async () => {
    mockFetch(() => ({ status: 200, body: estados }));
    render(<EstadosItemList />);
    await waitFor(() => screen.getByText('Ativo'));

    await userEvent.type(screen.getByPlaceholderText(/buscar/i), 'uso');

    expect(screen.getByText('Ativo')).toBeInTheDocument();
    expect(screen.queryByText('Manutencao')).not.toBeInTheDocument();
  });

  it('exibe estado vazio quando filtro nao encontra registros', async () => {
    mockFetch(() => ({ status: 200, body: estados }));
    render(<EstadosItemList />);
    await waitFor(() => screen.getByText('Ativo'));

    await userEvent.type(screen.getByPlaceholderText(/buscar/i), 'baixado');

    expect(screen.getByText(/nenhum estado do item encontrado/i)).toBeInTheDocument();
  });

  it('exibe erro ao falhar carregamento', async () => {
    global.fetch = jest.fn().mockRejectedValue(new Error('Network'));

    render(<EstadosItemList />);

    await waitFor(() => expect(screen.getByText(/erro ao carregar estados do item/i)).toBeInTheDocument());
  });

  it('delete com sucesso remove da lista e exibe toast', async () => {
    mockFetch((_url, opts) => {
      if (opts?.method === 'DELETE') return { status: 204, body: null };
      return { status: 200, body: estados };
    });
    window.confirm = jest.fn(() => true);
    render(<EstadosItemList />);
    await waitFor(() => screen.getByText('Ativo'));

    await userEvent.click(screen.getAllByRole('button')[0]);

    await waitFor(() => {
      expect(screen.queryByText('Ativo')).not.toBeInTheDocument();
      expect(mockToast).toHaveBeenCalledWith(expect.stringMatching(/sucesso/i), 'success');
    });
  });

  it('delete cancelado nao chama a API de exclusao', async () => {
    mockFetch(() => ({ status: 200, body: estados }));
    window.confirm = jest.fn(() => false);
    render(<EstadosItemList />);
    await waitFor(() => screen.getByText('Ativo'));

    await userEvent.click(screen.getAllByRole('button')[0]);

    expect(global.fetch).toHaveBeenCalledTimes(1);
  });

  it('409 com patrimonios vinculados exibe toast com lista', async () => {
    const patrimonios = [
      { numero_patrimonio: '2024/001', descricao: 'Notebook Dell' },
      { numero_patrimonio: '2024/002', descricao: 'Monitor LG' },
    ];
    mockFetch((_url, opts) => {
      if (opts?.method === 'DELETE') {
        return {
          status: 409,
          body: { error: 'Estado possui patrimonios vinculados.', patrimonios },
        };
      }
      return { status: 200, body: estados };
    });
    window.confirm = jest.fn(() => true);
    render(<EstadosItemList />);
    await waitFor(() => screen.getByText('Ativo'));

    await userEvent.click(screen.getAllByRole('button')[0]);

    await waitFor(() => {
      expect(mockToast).toHaveBeenCalledWith(expect.stringContaining('2024/001'), 'error');
      expect(mockToast).toHaveBeenCalledWith(expect.stringContaining('Notebook Dell'), 'error');
    });
    expect(screen.getByText('Ativo')).toBeInTheDocument();
  });

  it('erro generico ao excluir exibe toast de erro', async () => {
    mockFetch((_url, opts) => {
      if (opts?.method === 'DELETE') return { status: 500, body: { error: 'Erro interno do servidor' } };
      return { status: 200, body: estados };
    });
    window.confirm = jest.fn(() => true);
    render(<EstadosItemList />);
    await waitFor(() => screen.getByText('Ativo'));

    await userEvent.click(screen.getAllByRole('button')[0]);

    await waitFor(() => expect(mockToast).toHaveBeenCalledWith(expect.stringMatching(/erro interno/i), 'error'));
  });
});
