import { fireEvent, render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import EstadoItemForm from '../EstadoItemForm';

jest.mock('next/link', () => ({
  __esModule: true,
  default: ({ href, children }: { href: string; children: React.ReactNode }) => <a href={href}>{children}</a>,
}));

const mockPush = jest.fn();
let mockParams: Record<string, string | undefined> = {};
jest.mock('next/navigation', () => ({
  useParams: () => mockParams,
  useRouter: () => ({ push: mockPush }),
}));

const mockToast = jest.fn();
jest.mock('../Toast', () => ({
  useToast: () => ({ toast: mockToast }),
}));

beforeEach(() => {
  jest.clearAllMocks();
  mockParams = {};
  process.env.NEXT_PUBLIC_API_URL = 'http://localhost:8000/api';
  global.fetch = jest.fn() as typeof fetch;
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

describe('EstadoItemForm', () => {
  it('cadastra novo estado do item e redireciona para a lista', async () => {
    mockFetch((_url, opts) => {
      expect(opts?.method).toBe('POST');
      expect(JSON.parse(opts?.body as string)).toEqual({
        nome: 'Disponivel',
        descricao: 'Pronto para uso',
      });
      return { status: 201, body: { id: 1 } };
    });

    render(<EstadoItemForm />);

    await userEvent.type(screen.getByPlaceholderText('Ex: Ativo'), ' Disponivel ');
    await userEvent.type(screen.getByPlaceholderText(/descricao do estado/i), ' Pronto para uso ');
    await userEvent.click(screen.getByRole('button', { name: /cadastrar estado/i }));

    await waitFor(() => {
      expect(mockToast).toHaveBeenCalledWith('Estado do item cadastrado com sucesso', 'success');
      expect(mockPush).toHaveBeenCalledWith('/estados-item');
    });
  });

  it('carrega dados existentes e atualiza estado do item', async () => {
    mockParams = { id: '7' };
    mockFetch((_url, opts) => {
      if (!opts?.method) {
        return { status: 200, body: { id: 7, nome: 'Ativo', descricao: 'Em uso' } };
      }
      expect(opts.method).toBe('PUT');
      expect(JSON.parse(opts.body as string)).toEqual({
        nome: 'Ativo revisado',
        descricao: 'Em uso',
      });
      return { status: 200, body: { id: 7 } };
    });

    render(<EstadoItemForm />);

    const nome = await screen.findByDisplayValue('Ativo');
    await userEvent.clear(nome);
    await userEvent.type(nome, 'Ativo revisado');
    await userEvent.click(screen.getByRole('button', { name: /salvar alteracoes/i }));

    await waitFor(() => {
      expect(mockToast).toHaveBeenCalledWith('Estado do item atualizado com sucesso', 'success');
      expect(mockPush).toHaveBeenCalledWith('/estados-item');
    });
  });

  it('exibe validacao quando nome esta vazio', async () => {
    render(<EstadoItemForm />);

    fireEvent.submit(screen.getByRole('button', { name: /cadastrar estado/i }).closest('form')!);

    expect(await screen.findByText('Nome e obrigatorio')).toBeInTheDocument();
    expect(global.fetch).not.toHaveBeenCalled();
  });

  it('exibe erro de conflito ao receber 409', async () => {
    mockFetch(() => ({ status: 409, body: { error: 'Duplicado' } }));
    render(<EstadoItemForm />);

    await userEvent.type(screen.getByPlaceholderText('Ex: Ativo'), 'Ativo');
    await userEvent.click(screen.getByRole('button', { name: /cadastrar estado/i }));

    expect(await screen.findByText(/ja existe um estado do item/i)).toBeInTheDocument();
    expect(mockPush).not.toHaveBeenCalled();
  });

  it('exibe erro quando falha ao carregar para edicao', async () => {
    mockParams = { id: '9' };
    global.fetch = jest.fn().mockRejectedValue(new Error('Network'));

    render(<EstadoItemForm />);

    expect(await screen.findByText(/erro ao carregar estado do item/i)).toBeInTheDocument();
  });
});
