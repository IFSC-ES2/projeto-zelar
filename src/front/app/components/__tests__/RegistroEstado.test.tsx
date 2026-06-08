import { render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import RegistroEstado from "../RegistroEstado";

jest.mock("next/link", () => ({
  __esModule: true,
  default: ({
    href,
    children,
    className,
  }: {
    href: string;
    children: React.ReactNode;
    className?: string;
  }) => (
    <a href={href} className={className}>
      {children}
    </a>
  ),
}));

const mockPush = jest.fn();
jest.mock("next/navigation", () => ({
  useParams: () => ({ id: "7" }),
  useRouter: () => ({ push: mockPush }),
}));

const mockToast = jest.fn();
jest.mock("../Toast", () => ({
  useToast: () => ({ toast: mockToast }),
}));

const patrimonio = {
  id: 7,
  numero_patrimonio: "PAT-007",
  descricao: "Notebook Dell Latitude",
  valor: 3500,
  tipo_material_id: 1,
  estado_item_id: 1,
  ambiente_id: 1,
  responsavel_id: 1,
  fornecedor_id: null,
};

const estados = [
  { id: 1, nome: "Ativo" },
  { id: 2, nome: "Avariado" },
  { id: 3, nome: "Em Manutencao" },
];

const conferentes = [
  { id: 4, nome: "Carlos Oliveira", email: "carlos@example.com" },
  { id: 5, nome: "Ana Paula", email: "ana@example.com" },
];

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

beforeEach(() => {
  jest.clearAllMocks();
  process.env.NEXT_PUBLIC_API_URL = "http://localhost:8000/api";
});

describe("RegistroEstado", () => {
  it("carrega dados reais e registra mudanca de estado", async () => {
    mockFetch((url, opts) => {
      if (opts?.method === "PUT") {
        expect(url).toBe("http://localhost:8000/api/patrimonios/7");
        expect(JSON.parse(opts.body as string)).toEqual({
          estado_item_id: 2,
          observacoes: "Tela quebrada",
        });
        return { status: 200, body: { ...patrimonio, estado_item_id: 2 } };
      }
      if (url.endsWith("/patrimonios/7")) return { status: 200, body: patrimonio };
      if (url.endsWith("/estados-item")) return { status: 200, body: estados };
      if (url.endsWith("/conferentes")) return { status: 200, body: conferentes };
      if (url.endsWith("/patrimonios/7/historico-estado")) return { status: 200, body: [] };
      return { status: 404, body: { error: "Nao encontrado" } };
    });

    render(<RegistroEstado />);

    expect(await screen.findByText(/patrimônio #PAT-007 - Notebook Dell Latitude/i)).toBeInTheDocument();
    await userEvent.selectOptions(screen.getByLabelText(/estado atual do item/i), "2");
    await userEvent.selectOptions(screen.getByLabelText(/conferente/i), "4");
    await userEvent.type(screen.getByLabelText(/observações/i), "Tela quebrada");
    await userEvent.click(screen.getByRole("button", { name: /registrar estado/i }));

    await waitFor(() => {
      expect(mockToast).toHaveBeenCalledWith("Estado do patrimonio registrado com sucesso", "success");
      expect(mockPush).toHaveBeenCalledWith("/patrimonios");
    });
  });

  it("valida campos obrigatorios antes de enviar", async () => {
    mockFetch((url) => {
      if (url.endsWith("/patrimonios/7")) return { status: 200, body: patrimonio };
      if (url.endsWith("/estados-item")) return { status: 200, body: estados };
      if (url.endsWith("/conferentes")) return { status: 200, body: conferentes };
      if (url.endsWith("/patrimonios/7/historico-estado")) return { status: 200, body: [] };
      return { status: 404, body: {} };
    });

    render(<RegistroEstado />);

    await screen.findByText(/patrimônio #PAT-007/i);
    await userEvent.click(screen.getByRole("button", { name: /registrar estado/i }));

    expect(mockToast).toHaveBeenCalledWith("Informe conferente e observacoes", "error");
    expect((global.fetch as jest.Mock).mock.calls.some(([, opts]) => opts?.method === "PUT")).toBe(false);
  });

  it("cria solicitacao quando acao de manutencao e selecionada", async () => {
    mockFetch((url, opts) => {
      if (opts?.method === "PUT") {
        return { status: 200, body: { ...patrimonio, estado_item_id: 3 } };
      }
      if (opts?.method === "POST" && url.endsWith("/solicitacoes")) {
        expect(JSON.parse(opts.body as string)).toEqual({
          patrimonio_id: 7,
          conferente_id: 5,
          tipo: "manutencao",
          observacoes: "Fonte com falha",
        });
        return { status: 201, body: { id: 11 } };
      }
      if (url.endsWith("/patrimonios/7")) return { status: 200, body: patrimonio };
      if (url.endsWith("/estados-item")) return { status: 200, body: estados };
      if (url.endsWith("/conferentes")) return { status: 200, body: conferentes };
      if (url.endsWith("/patrimonios/7/historico-estado")) return { status: 200, body: [] };
      return { status: 404, body: {} };
    });

    render(<RegistroEstado />);

    await screen.findByText(/patrimônio #PAT-007/i);
    await userEvent.selectOptions(screen.getByLabelText(/estado atual do item/i), "3");
    await userEvent.selectOptions(screen.getByLabelText(/conferente/i), "5");
    await userEvent.click(screen.getByRole("radio", { name: /solicitar manutenção/i }));
    await userEvent.type(screen.getByLabelText(/observações/i), "Fonte com falha");
    await userEvent.click(screen.getByRole("button", { name: /registrar estado/i }));

    await waitFor(() => {
      expect(mockPush).toHaveBeenCalledWith("/patrimonios");
    });
  });
});
