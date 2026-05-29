import { render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import PatrimoniosList from "../PatrimoniosList";

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

const mockToast = jest.fn();
jest.mock("../Toast", () => ({
  useToast: () => ({ toast: mockToast }),
}));

const patrimonios = [
  {
    id: 1,
    numero_patrimonio: "1234",
    descricao: "Notebook Dell",
    valor: 3500,
    tipo_material_id: 1,
    estado_item_id: 1,
    ambiente_id: 1,
    responsavel_id: 1,
    fornecedor_id: null,
  },
  {
    id: 2,
    numero_patrimonio: "5678",
    descricao: "Cadeira Ergonomica",
    valor: 800,
    tipo_material_id: 2,
    estado_item_id: 2,
    ambiente_id: 2,
    responsavel_id: 2,
    fornecedor_id: null,
  },
];

const tipos = [{ id: 1, nome: "Informatica" }, { id: 2, nome: "Mobiliario" }];
const ambientes = [{ id: 1, nome: "Sala 201" }, { id: 2, nome: "Sala 305" }];
const responsaveis = [{ id: 1, nome: "Joao Silva" }, { id: 2, nome: "Maria Santos" }];
const estados = [{ id: 1, nome: "Ativo" }, { id: 2, nome: "Em Manutencao" }];

beforeEach(() => {
  jest.clearAllMocks();
  process.env.NEXT_PUBLIC_API_URL = "http://localhost:8000/api";
});

function routeBody(url: string) {
  if (url.includes("/patrimonios")) return patrimonios;
  if (url.includes("/tipo-material")) return tipos;
  if (url.includes("/ambientes")) return ambientes;
  if (url.includes("/responsaveis")) return responsaveis;
  if (url.includes("/estados-item")) return estados;
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

describe("PatrimoniosList", () => {
  it("renderiza lista carregada da API com nomes resolvidos das FKs", async () => {
    mockFetch((url) => ({ status: 200, body: routeBody(url) }));

    render(<PatrimoniosList />);

    await waitFor(() => {
      expect(screen.getByText("Notebook Dell")).toBeInTheDocument();
      expect(screen.getByText("Cadeira Ergonomica")).toBeInTheDocument();
    });
    expect(screen.getByText("Informatica")).toBeInTheDocument();
    expect(screen.getByText("Sala 201")).toBeInTheDocument();
    expect(screen.getByText("Joao Silva")).toBeInTheDocument();
    expect(screen.getByText("Ativo")).toBeInTheDocument();
  });

  it("filtra por descricao, ambiente e responsavel", async () => {
    mockFetch((url) => ({ status: 200, body: routeBody(url) }));
    render(<PatrimoniosList />);
    await waitFor(() => screen.getByText("Notebook Dell"));

    await userEvent.type(screen.getByPlaceholderText(/buscar/i), "Maria");

    expect(screen.queryByText("Notebook Dell")).not.toBeInTheDocument();
    expect(screen.getByText("Cadeira Ergonomica")).toBeInTheDocument();
  });

  it("renderiza links de cadastro, edicao e estado", async () => {
    mockFetch((url) => ({ status: 200, body: routeBody(url) }));
    render(<PatrimoniosList />);
    await waitFor(() => screen.getByText("Notebook Dell"));

    expect(screen.getByRole("link", { name: /novo patrimônio/i })).toHaveAttribute(
      "href",
      "/patrimonios/novo",
    );
    const hrefs = screen.getAllByRole("link").map((l) => l.getAttribute("href"));
    expect(hrefs).toContain("/patrimonios/editar/1");
    expect(hrefs).toContain("/patrimonios/estado/1");
  });

  it("exibe erro ao falhar carregamento", async () => {
    global.fetch = jest.fn().mockRejectedValue(new Error("Network"));

    render(<PatrimoniosList />);

    await waitFor(() =>
      expect(screen.getByText(/erro ao carregar patrimonios/i)).toBeInTheDocument(),
    );
  });

  it("delete com sucesso remove da lista e exibe toast", async () => {
    mockFetch((url, opts) => {
      if (opts?.method === "DELETE") return { status: 204, body: null };
      return { status: 200, body: routeBody(url) };
    });
    window.confirm = jest.fn(() => true);
    render(<PatrimoniosList />);
    await waitFor(() => screen.getByText("Notebook Dell"));

    await userEvent.click(screen.getAllByRole("button")[0]);

    await waitFor(() => {
      expect(screen.queryByText("Notebook Dell")).not.toBeInTheDocument();
      expect(mockToast).toHaveBeenCalledWith(
        expect.stringMatching(/sucesso/i),
        "success",
      );
    });
  });

  it("delete cancelado nao chama API de delete", async () => {
    mockFetch((url) => ({ status: 200, body: routeBody(url) }));
    window.confirm = jest.fn(() => false);
    render(<PatrimoniosList />);
    await waitFor(() => screen.getByText("Notebook Dell"));
    const chamadasIniciais = (global.fetch as jest.Mock).mock.calls.length;

    await userEvent.click(screen.getAllByRole("button")[0]);

    expect((global.fetch as jest.Mock).mock.calls.length).toBe(chamadasIniciais);
  });

  it("exibe mensagem quando lista esta vazia", async () => {
    mockFetch((url) => {
      if (url.includes("/patrimonios")) return { status: 200, body: [] };
      return { status: 200, body: routeBody(url) };
    });

    render(<PatrimoniosList />);

    await waitFor(() =>
      expect(screen.getByText(/nenhum patrimônio encontrado/i)).toBeInTheDocument(),
    );
  });
});
