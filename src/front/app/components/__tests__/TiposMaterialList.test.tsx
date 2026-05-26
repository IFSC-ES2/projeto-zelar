import { render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import TiposMaterialList from "../TiposMaterialList";

jest.mock("next/link", () => ({
  __esModule: true,
  default: ({
    href,
    children,
  }: {
    href: string;
    children: React.ReactNode;
  }) => <a href={href}>{children}</a>,
}));

const mockToast = jest.fn();
jest.mock("../Toast", () => ({
  useToast: () => ({ toast: mockToast }),
}));

const tipos = [
  { id: 1, nome: "Informática" },
  { id: 2, nome: "Mobiliário" },
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

describe("TiposMaterialList", () => {
  it("renderiza lista carregada da API", async () => {
    mockFetch(() => ({ status: 200, body: tipos }));
    render(<TiposMaterialList />);
    await waitFor(() => {
      expect(screen.getByText("Informática")).toBeInTheDocument();
      expect(screen.getByText("Mobiliário")).toBeInTheDocument();
    });
  });

  it("filtra por nome", async () => {
    mockFetch(() => ({ status: 200, body: tipos }));
    render(<TiposMaterialList />);
    await waitFor(() => screen.getByText("Informática"));

    await userEvent.type(screen.getByPlaceholderText(/buscar/i), "mob");

    expect(screen.queryByText("Informática")).not.toBeInTheDocument();
    expect(screen.getByText("Mobiliário")).toBeInTheDocument();
  });

  it("exibe erro ao falhar carregamento", async () => {
    global.fetch = jest.fn().mockRejectedValue(new Error("Network"));
    render(<TiposMaterialList />);
    await waitFor(() =>
      expect(screen.getByText(/erro ao carregar/i)).toBeInTheDocument(),
    );
  });

  it("delete com sucesso remove da lista e exibe toast", async () => {
    mockFetch((_url, opts) => {
      if (opts?.method === "DELETE") return { status: 204, body: null };
      return { status: 200, body: tipos };
    });
    window.confirm = jest.fn(() => true);
    render(<TiposMaterialList />);
    await waitFor(() => screen.getByText("Informática"));

    const deleteButtons = screen.getAllByRole("button");
    await userEvent.click(deleteButtons[0]);

    await waitFor(() => {
      expect(screen.queryByText("Informática")).not.toBeInTheDocument();
      expect(mockToast).toHaveBeenCalledWith(
        expect.stringMatching(/sucesso/i),
        "success",
      );
    });
  });

  it("delete cancelado não chama API de delete", async () => {
    mockFetch(() => ({ status: 200, body: tipos }));
    window.confirm = jest.fn(() => false);
    render(<TiposMaterialList />);
    await waitFor(() => screen.getByText("Informática"));

    const deleteButtons = screen.getAllByRole("button");
    await userEvent.click(deleteButtons[0]);

    expect(global.fetch).toHaveBeenCalledTimes(1);
  });

  it("409 com patrimônios vinculados exibe toast com lista", async () => {
    const patrimonios = [
      { id: 1, numero_patrimonio: "2024/001", descricao: "Computador Dell" },
      { id: 2, numero_patrimonio: "2024/002", descricao: "Monitor LG" },
    ];
    mockFetch((_url, opts) => {
      if (opts?.method === "DELETE")
        return {
          status: 409,
          body: {
            error:
              "Tipo de material possui patrimônios vinculados e não pode ser excluído.",
            patrimonios,
          },
        };
      return { status: 200, body: tipos };
    });
    window.confirm = jest.fn(() => true);
    render(<TiposMaterialList />);
    await waitFor(() => screen.getByText("Informática"));

    const deleteButtons = screen.getAllByRole("button");
    await userEvent.click(deleteButtons[0]);

    await waitFor(() => {
      expect(mockToast).toHaveBeenCalledWith(
        expect.stringContaining("2024/001"),
        "error",
      );
    });
    expect(screen.getByText("Informática")).toBeInTheDocument();
  });

  it("erro genérico no delete exibe toast de erro", async () => {
    mockFetch((_url, opts) => {
      if (opts?.method === "DELETE")
        return { status: 500, body: { error: "Erro interno do servidor" } };
      return { status: 200, body: tipos };
    });
    window.confirm = jest.fn(() => true);
    render(<TiposMaterialList />);
    await waitFor(() => screen.getByText("Informática"));

    const deleteButtons = screen.getAllByRole("button");
    await userEvent.click(deleteButtons[0]);

    await waitFor(() =>
      expect(mockToast).toHaveBeenCalledWith(
        expect.stringMatching(/erro interno/i),
        "error",
      ),
    );
  });

  it("exibe mensagem quando lista está vazia", async () => {
    mockFetch(() => ({ status: 200, body: [] }));
    render(<TiposMaterialList />);
    await waitFor(() =>
      expect(screen.getByText(/nenhum tipo de material/i)).toBeInTheDocument(),
    );
  });
});
