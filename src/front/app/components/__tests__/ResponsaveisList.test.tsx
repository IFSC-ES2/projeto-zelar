import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import ResponsaveisList from '../ResponsaveisList';

jest.mock('next/link', () => ({ __esModule: true, default: ({ href, children }: { href: string; children: React.ReactNode }) => <a href={href}>{children}</a> }));

const mockToast = jest.fn();
jest.mock('../Toast', () => ({
  useToast: () => ({ toast: mockToast }),
}));

const responsaveis = [
  { id: 1, nome: 'João Silva', email: 'joao@empresa.com', cargo: 'Dev', departamento: 'TI', telefone: '11999' },
  { id: 2, nome: 'Maria Santos', email: 'maria@empresa.com', cargo: null, departamento: 'RH', telefone: null },
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

describe('ResponsaveisList', () => {
  it('renderiza lista carregada da API', async () => {
    mockFetch(() => ({ status: 200, body: responsaveis }));

    render(<ResponsaveisList />);

    await waitFor(() => {
      expect(screen.getByText('João Silva')).toBeInTheDocument();
      expect(screen.getByText('Maria Santos')).toBeInTheDocument();
    });
  });

  it('filtra por nome', async () => {
    mockFetch(() => ({ status: 200, body: responsaveis }));
    render(<ResponsaveisList />);
    await waitFor(() => screen.getByText('João Silva'));

    await userEvent.type(screen.getByPlaceholderText(/buscar/i), 'maria');

    expect(screen.queryByText('João Silva')).not.toBeInTheDocument();
    expect(screen.getByText('Maria Santos')).toBeInTheDocument();
  });

  it('filtra por email', async () => {
    mockFetch(() => ({ status: 200, body: responsaveis }));
    render(<ResponsaveisList />);
    await waitFor(() => screen.getByText('João Silva'));

    await userEvent.type(screen.getByPlaceholderText(/buscar/i), 'joao@');

    expect(screen.getByText('João Silva')).toBeInTheDocument();
    expect(screen.queryByText('Maria Santos')).not.toBeInTheDocument();
  });

  it('filtra por departamento', async () => {
    mockFetch(() => ({ status: 200, body: responsaveis }));
    render(<ResponsaveisList />);
    await waitFor(() => screen.getByText('João Silva'));

    await userEvent.type(screen.getByPlaceholderText(/buscar/i), 'rh');

    expect(screen.queryByText('João Silva')).not.toBeInTheDocument();
    expect(screen.getByText('Maria Santos')).toBeInTheDocument();
  });

  it('exibe erro ao falhar carregamento', async () => {
    global.fetch = jest.fn().mockRejectedValue(new Error('Network'));
    render(<ResponsaveisList />);
    await waitFor(() => expect(screen.getByText(/erro ao carregar/i)).toBeInTheDocument());
  });

  it('delete com sucesso remove da lista e exibe toast', async () => {
    mockFetch((_url, opts) => {
      if (opts?.method === 'DELETE') return { status: 204, body: null };
      return { status: 200, body: responsaveis };
    });
    window.confirm = jest.fn(() => true);
    render(<ResponsaveisList />);
    await waitFor(() => screen.getByText('João Silva'));

    const deleteButtons = screen.getAllByRole('button');
    await userEvent.click(deleteButtons[0]);

    await waitFor(() => {
      expect(screen.queryByText('João Silva')).not.toBeInTheDocument();
      expect(mockToast).toHaveBeenCalledWith(expect.stringMatching(/sucesso/i), 'success');
    });
  });

  it('delete cancelado não chama API', async () => {
    mockFetch(() => ({ status: 200, body: responsaveis }));
    window.confirm = jest.fn(() => false);
    render(<ResponsaveisList />);
    await waitFor(() => screen.getByText('João Silva'));

    const deleteButtons = screen.getAllByRole('button');
    await userEvent.click(deleteButtons[0]);

    expect(global.fetch).toHaveBeenCalledTimes(1); // só o GET inicial
  });

  it('409 com patrimônios vinculados exibe toast com lista', async () => {
    const patrimonios = [
      { id: 1, numero_patrimonio: '2024/001', descricao: 'Computador Dell' },
      { id: 2, numero_patrimonio: '2024/002', descricao: 'Monitor LG' },
    ];
    mockFetch((_url, opts) => {
      if (opts?.method === 'DELETE') return {
        status: 409,
        body: { error: 'Responsável possui patrimônios vinculados e não pode ser excluído. Reatribua os patrimônios antes de excluir.', patrimonios },
      };
      return { status: 200, body: responsaveis };
    });
    window.confirm = jest.fn(() => true);
    render(<ResponsaveisList />);
    await waitFor(() => screen.getByText('João Silva'));

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
    expect(screen.getByText('João Silva')).toBeInTheDocument();
  });

  it('409 com ambientes vinculados exibe toast com lista', async () => {
    const ambientes = [{ id: 1, nome: 'Lab 1', bloco: 'A', andar: '1' }];
    mockFetch((_url, opts) => {
      if (opts?.method === 'DELETE') return {
        status: 409,
        body: { error: 'Responsável possui ambientes vinculados e não pode ser excluído. Desvincule os ambientes antes de excluir.', ambientes },
      };
      return { status: 200, body: responsaveis };
    });
    window.confirm = jest.fn(() => true);
    render(<ResponsaveisList />);
    await waitFor(() => screen.getByText('João Silva'));

    const deleteButtons = screen.getAllByRole('button');
    await userEvent.click(deleteButtons[0]);

    await waitFor(() => {
      expect(mockToast).toHaveBeenCalledWith(
        expect.stringContaining('Lab 1'),
        'error',
      );
    });
  });

  it('erro genérico exibe toast de erro', async () => {
    mockFetch((_url, opts) => {
      if (opts?.method === 'DELETE') return { status: 500, body: { error: 'Erro interno do servidor' } };
      return { status: 200, body: responsaveis };
    });
    window.confirm = jest.fn(() => true);
    render(<ResponsaveisList />);
    await waitFor(() => screen.getByText('João Silva'));

    const deleteButtons = screen.getAllByRole('button');
    await userEvent.click(deleteButtons[0]);

    await waitFor(() => expect(mockToast).toHaveBeenCalledWith(expect.stringMatching(/erro interno/i), 'error'));
  });
});
