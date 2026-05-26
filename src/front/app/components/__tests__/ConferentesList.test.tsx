import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import ConferentesList from '../ConferentesList';

jest.mock('next/link', () => ({
  __esModule: true,
  default: ({ href, children }: { href: string; children: React.ReactNode }) => <a href={href}>{children}</a>,
}));

const mockToast = jest.fn();
jest.mock('../Toast', () => ({
  useToast: () => ({ toast: mockToast }),
}));

const conferentes = [
  { id: 1, nome: 'Carlos Oliveira', email: 'carlos@empresa.com', cargo: 'Auditor', telefone: '11998765432' },
  { id: 2, nome: 'Ana Costa', email: 'ana@empresa.com', cargo: null, telefone: null },
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

describe('ConferentesList', () => {
  it('renderiza lista carregada da API', async () => {
    mockFetch(() => ({ status: 200, body: conferentes }));

    render(<ConferentesList />);

    await waitFor(() => {
      expect(screen.getByText('Carlos Oliveira')).toBeInTheDocument();
      expect(screen.getByText('Ana Costa')).toBeInTheDocument();
    });
  });

  it('filtra por nome', async () => {
    mockFetch(() => ({ status: 200, body: conferentes }));
    render(<ConferentesList />);
    await waitFor(() => screen.getByText('Carlos Oliveira'));

    await userEvent.type(screen.getByPlaceholderText(/buscar/i), 'ana');

    expect(screen.queryByText('Carlos Oliveira')).not.toBeInTheDocument();
    expect(screen.getByText('Ana Costa')).toBeInTheDocument();
  });

  it('filtra por email', async () => {
    mockFetch(() => ({ status: 200, body: conferentes }));
    render(<ConferentesList />);
    await waitFor(() => screen.getByText('Carlos Oliveira'));

    await userEvent.type(screen.getByPlaceholderText(/buscar/i), 'carlos@');

    expect(screen.getByText('Carlos Oliveira')).toBeInTheDocument();
    expect(screen.queryByText('Ana Costa')).not.toBeInTheDocument();
  });

  it('filtra por cargo', async () => {
    mockFetch(() => ({ status: 200, body: conferentes }));
    render(<ConferentesList />);
    await waitFor(() => screen.getByText('Carlos Oliveira'));

    await userEvent.type(screen.getByPlaceholderText(/buscar/i), 'auditor');

    expect(screen.getByText('Carlos Oliveira')).toBeInTheDocument();
    expect(screen.queryByText('Ana Costa')).not.toBeInTheDocument();
  });

  it('exibe erro ao falhar carregamento', async () => {
    global.fetch = jest.fn().mockRejectedValue(new Error('Network'));
    render(<ConferentesList />);
    await waitFor(() => expect(screen.getByText(/erro ao carregar/i)).toBeInTheDocument());
  });

  it('delete com sucesso remove da lista e exibe toast', async () => {
    mockFetch((_url, opts) => {
      if (opts?.method === 'DELETE') return { status: 200, body: {} };
      return { status: 200, body: conferentes };
    });
    window.confirm = jest.fn(() => true);
    render(<ConferentesList />);
    await waitFor(() => screen.getByText('Carlos Oliveira'));

    const deleteButtons = screen.getAllByRole('button');
    await userEvent.click(deleteButtons[0]);

    await waitFor(() => {
      expect(screen.queryByText('Carlos Oliveira')).not.toBeInTheDocument();
      expect(mockToast).toHaveBeenCalledWith(expect.stringMatching(/sucesso/i), 'success');
    });
  });

  it('delete cancelado não chama API', async () => {
    mockFetch(() => ({ status: 200, body: conferentes }));
    window.confirm = jest.fn(() => false);
    render(<ConferentesList />);
    await waitFor(() => screen.getByText('Carlos Oliveira'));

    const deleteButtons = screen.getAllByRole('button');
    await userEvent.click(deleteButtons[0]);

    expect(global.fetch).toHaveBeenCalledTimes(1); // Only GET
  });

  it('erro ao excluir exibe toast de erro', async () => {
    mockFetch((_url, opts) => {
      if (opts?.method === 'DELETE') return { status: 500, body: { error: 'Erro ao excluir' } };
      return { status: 200, body: conferentes };
    });
    window.confirm = jest.fn(() => true);
    render(<ConferentesList />);
    await waitFor(() => screen.getByText('Carlos Oliveira'));

    const deleteButtons = screen.getAllByRole('button');
    await userEvent.click(deleteButtons[0]);

    await waitFor(() => expect(mockToast).toHaveBeenCalledWith(expect.stringMatching(/erro/i), 'error'));
  });
});
