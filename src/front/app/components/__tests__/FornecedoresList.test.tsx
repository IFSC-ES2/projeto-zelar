import { render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import FornecedoresList from "../FornecedoresList";

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

const fornecedores = [
  {
    id: 1,
    nome: "Fornecedor A Ltda",
    cnpj: "11111111000111",
    email: "a@empresa.com",
    telefone: "48999990000",
  },
  {
    id: 2,
    nome: "Fornecedor B S.A.",
    cnpj: "22222222000122",
    email: "b@empresa.com",
    telefone: "4833334444",
  },
];

beforeEach(() => {
  jest.clearAllMocks();
  process.env.NEXT_PUBLIC_API_URL = "http://localhost:8000/api";
});

function mockFetch(
  handler: (
    url: string,
    opts?: RequestInit,
  ) => { status: number; body: unknown },
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

describe("FornecedoresList", () => {
  it("renderiza lista carregada da API", async () => {
    mockFetch(() => ({ status: 200, body: fornecedores }));

    render(<FornecedoresList />);

    await waitFor(() => {
      expect(screen.getByText("Fornecedor A Ltda")).toBeInTheDocument();
      expect(screen.getByText("Fornecedor B S.A.")).toBeInTheDocument();
    });
  });

  it("filtra por nome, cnpj, email e telefone", async () => {
    mockFetch(() => ({ status: 200, body: fornecedores }));
    render(<FornecedoresList />);
    await waitFor(() => screen.getByText("Fornecedor A Ltda"));

    await userEvent.type(screen.getByPlaceholderText(/buscar/i), "2222");

    expect(screen.queryByText("Fornecedor A Ltda")).not.toBeInTheDocument();
    expect(screen.getByText("Fornecedor B S.A.")).toBeInTheDocument();
  });

  it("renderiza links de cadastro e edicao", async () => {
    mockFetch(() => ({ status: 200, body: fornecedores }));
    render(<FornecedoresList />);
    await waitFor(() => screen.getByText("Fornecedor A Ltda"));

    expect(screen.getByRole("link", { name: /novo fornecedor/i })).toHaveAttribute(
      "href",
      "/fornecedores/novo",
    );
    expect(screen.getAllByRole("link").map((link) => link.getAttribute("href"))).toEqual([
      "/fornecedores/novo",
      "/fornecedores/editar/1",
      "/fornecedores/editar/2",
    ]);
  });

  it("exibe erro ao falhar carregamento", async () => {
    global.fetch = jest.fn().mockRejectedValue(new Error("Network"));

    render(<FornecedoresList />);

    await waitFor(() =>
      expect(screen.getByText(/erro ao carregar fornecedores/i)).toBeInTheDocument(),
    );
  });

  it("delete com sucesso remove da lista e exibe toast", async () => {
    mockFetch((_url, opts) => {
      if (opts?.method === "DELETE") return { status: 204, body: null };
      return { status: 200, body: fornecedores };
    });
    window.confirm = jest.fn(() => true);
    render(<FornecedoresList />);
    await waitFor(() => screen.getByText("Fornecedor A Ltda"));

    await userEvent.click(screen.getAllByRole("button")[0]);

    await waitFor(() => {
      expect(screen.queryByText("Fornecedor A Ltda")).not.toBeInTheDocument();
      expect(mockToast).toHaveBeenCalledWith(
        expect.stringMatching(/sucesso/i),
        "success",
      );
    });
  });

  it("delete cancelado nao chama API de delete", async () => {
    mockFetch(() => ({ status: 200, body: fornecedores }));
    window.confirm = jest.fn(() => false);
    render(<FornecedoresList />);
    await waitFor(() => screen.getByText("Fornecedor A Ltda"));

    await userEvent.click(screen.getAllByRole("button")[0]);

    expect(global.fetch).toHaveBeenCalledTimes(1);
  });

  it("409 com patrimonios vinculados exibe toast com lista", async () => {
    const patrimonios = [
      { id: 1, numero_patrimonio: "2024/001", descricao: "Computador Dell" },
      { id: 2, numero_patrimonio: "2024/002", descricao: "Monitor LG" },
    ];
    mockFetch((_url, opts) => {
      if (opts?.method === "DELETE") {
        return {
          status: 409,
          body: {
            error: "Fornecedor possui patrimonios vinculados e nao pode ser excluido.",
            patrimonios,
          },
        };
      }
      return { status: 200, body: fornecedores };
    });
    window.confirm = jest.fn(() => true);
    render(<FornecedoresList />);
    await waitFor(() => screen.getByText("Fornecedor A Ltda"));

    await userEvent.click(screen.getAllByRole("button")[0]);

    await waitFor(() => {
      expect(mockToast).toHaveBeenCalledWith(
        expect.stringContaining("2024/001"),
        "error",
      );
    });
    expect(screen.getByText("Fornecedor A Ltda")).toBeInTheDocument();
  });

  it("erro generico no delete exibe toast de erro", async () => {
    mockFetch((_url, opts) => {
      if (opts?.method === "DELETE") {
        return { status: 500, body: { error: "Erro interno do servidor" } };
      }
      return { status: 200, body: fornecedores };
    });
    window.confirm = jest.fn(() => true);
    render(<FornecedoresList />);
    await waitFor(() => screen.getByText("Fornecedor A Ltda"));

    await userEvent.click(screen.getAllByRole("button")[0]);

    await waitFor(() =>
      expect(mockToast).toHaveBeenCalledWith(
        expect.stringMatching(/erro interno/i),
        "error",
      ),
    );
  });

  it("exibe mensagem quando lista esta vazia", async () => {
    mockFetch(() => ({ status: 200, body: [] }));

    render(<FornecedoresList />);

    await waitFor(() =>
      expect(screen.getByText(/nenhum fornecedor encontrado/i)).toBeInTheDocument(),
    );
  });
});
