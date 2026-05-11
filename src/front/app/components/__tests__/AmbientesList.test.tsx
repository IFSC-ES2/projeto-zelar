import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import AmbientesList from '../AmbientesList';

jest.mock('next/link', () => ({ __esModule: true, default: ({ href, children }: { href: string; children: React.ReactNode }) => <a href={href}>{children}</a> }));

const mockToast = jest.fn();
jest.mock('../Toast', () => ({
  useToast: () => ({ toast: mockToast }),
}));

const ambientes = [
  { id: 1, nome: 'Lab 1', bloco: 'A', andar: '1', responsavel_id: 1 },
  { id: 2, nome: 'Sala 202', bloco: 'B', andar: '2', responsavel_id: null },
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

describe('AmbientesList', () => {
  it('renderiza lista carregada da API', async () => {
    mockFetch(() => ({ status: 200, body: ambientes }));
    render(<AmbientesList />);
    await waitFor(() => {
      expect(screen.getByText('Lab 1')).toBeInTheDocument();
      expect(screen.getByText('Sala 202')).toBeInTheDocument();
    });
  });

  it('filtra por nome', async () => {
    mockFetch(() => ({ status: 200, body: ambientes }));
    render(<AmbientesList />);
    await waitFor(() => screen.getByText('Lab 1'));

    await userEvent.type(screen.getByPlaceholderText(/buscar/i), 'sala');

    expect(screen.queryByText('Lab 1')).not.toBeInTheDocument();
    expect(screen.getByText('Sala 202')).toBeInTheDocument();
  });

  it('filtra por bloco', async () => {
    const dados = [
      { id: 1, nome: 'Lab 1', bloco: 'AlphaZone', andar: '1', responsavel_id: null },
      { id: 2, nome: 'Sala 202', bloco: 'BetaZone', andar: '2', responsavel_id: null },
    ];
    mockFetch(() => ({ status: 200, body: dados }));
    render(<AmbientesList />);
    await waitFor(() => screen.getByText('Lab 1'));

    await userEvent.type(screen.getByPlaceholderText(/buscar/i), 'alphazone');

    expect(screen.getByText('Lab 1')).toBeInTheDocument();
    expect(screen.queryByText('Sala 202')).not.toBeInTheDocument();
  });

  it('exibe erro ao falhar carregamento', async () => {
    global.fetch = jest.fn().mockRejectedValue(new Error('Network'));
    render(<AmbientesList />);
    await waitFor(() => expect(screen.getByText(/erro ao carregar/i)).toBeInTheDocument());
  });

  it('delete com sucesso remove da lista e exibe toast', async () => {
    mockFetch((_url, opts) => {
      if (opts?.method === 'DELETE') return { status: 204, body: null };
      return { status: 200, body: ambientes };
    });
    window.confirm = jest.fn(() => true);
    render(<AmbientesList />);
    await waitFor(() => screen.getByText('Lab 1'));

    const deleteButtons = screen.getAllByRole('button');
    await userEvent.click(deleteButtons[0]);

    await waitFor(() => {
      expect(screen.queryByText('Lab 1')).not.toBeInTheDocument();
      expect(mockToast).toHaveBeenCalledWith(expect.stringMatching(/sucesso/i), 'success');
    });
  });

  it('delete cancelado não chama API', async () => {
    mockFetch(() => ({ status: 200, body: ambientes }));
    window.confirm = jest.fn(() => false);
    render(<AmbientesList />);
    await waitFor(() => screen.getByText('Lab 1'));

    const deleteButtons = screen.getAllByRole('button');
    await userEvent.click(deleteButtons[0]);

    expect(global.fetch).toHaveBeenCalledTimes(1);
  });

  it('409 com patrimônios vinculados exibe toast com lista', async () => {
    const patrimonios = [
      { id: 1, numero_patrimonio: '2024/001', descricao: 'Computador Dell' },
      { id: 2, numero_patrimonio: '2024/002', descricao: 'Monitor LG' },
    ];
    mockFetch((_url, opts) => {
      if (opts?.method === 'DELETE') return {
        status: 409,
        body: { error: 'Ambiente possui patrimônios vinculados e não pode ser excluído. Reatribua os patrimônios antes de excluir.', patrimonios },
      };
      return { status: 200, body: ambientes };
    });
    window.confirm = jest.fn(() => true);
    render(<AmbientesList />);
    await waitFor(() => screen.getByText('Lab 1'));

    const deleteButtons = screen.getAllByRole('button');
    await userEvent.click(deleteButtons[0]);

    await waitFor(() => {
      expect(mockToast).toHaveBeenCalledWith(
        expect.stringContaining('2024/001'),
        'error',
      );
      expect(mockToast).toHaveBeenCalledWith(
        expect.stringContaining('Computador Dell'),
        'error',
      );
    });
    expect(screen.getByText('Lab 1')).toBeInTheDocument();
  });

  it('erro genérico exibe toast de erro', async () => {
    mockFetch((_url, opts) => {
      if (opts?.method === 'DELETE') return { status: 500, body: { error: 'Erro interno do servidor' } };
      return { status: 200, body: ambientes };
    });
    window.confirm = jest.fn(() => true);
    render(<AmbientesList />);
    await waitFor(() => screen.getByText('Lab 1'));

    const deleteButtons = screen.getAllByRole('button');
    await userEvent.click(deleteButtons[0]);

    await waitFor(() => expect(mockToast).toHaveBeenCalledWith(expect.stringMatching(/erro interno/i), 'error'));
  });
});
