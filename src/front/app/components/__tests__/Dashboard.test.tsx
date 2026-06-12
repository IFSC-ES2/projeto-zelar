import { render, screen, waitFor, within } from "@testing-library/react";
import Dashboard from "../Dashboard";

const patrimonios = [
  {
    id: 1,
    numero_patrimonio: "1234",
    descricao: "Notebook Dell",
    estado_item_id: 1,
  },
  {
    id: 2,
    numero_patrimonio: "5678",
    descricao: "Cadeira Ergonomica",
    estado_item_id: 2,
  },
  {
    id: 3,
    numero_patrimonio: "9012",
    descricao: "Monitor LG",
    estado_item_id: 2,
  },
];

const ambientes = [{ id: 1, nome: "Sala 201" }, { id: 2, nome: "Laboratorio 3" }];
const responsaveis = [{ id: 1, nome: "Joao Silva" }, { id: 2, nome: "Maria Santos" }];
const estados = [{ id: 1, nome: "Ativo" }, { id: 2, nome: "Em Manutencao" }];
const auditLog = {
  total: 1,
  pages: 1,
  currentPage: 1,
  limit: 5,
  data: [
    {
      id: 10,
      tabela: "patrimonio",
      registro_id: 1,
      acao: "CREATE",
      dados_novos: { numero_patrimonio: "1234" },
      created_at: "2026-04-29T13:30:00.000Z",
    },
  ],
};

beforeEach(() => {
  jest.clearAllMocks();
  process.env.NEXT_PUBLIC_API_URL = "http://localhost:8000/api";
});

function routeBody(url: string) {
  if (url.includes("/patrimonios")) return patrimonios;
  if (url.includes("/ambientes")) return ambientes;
  if (url.includes("/responsaveis")) return responsaveis;
  if (url.includes("/estados-item")) return estados;
  if (url.includes("/audit-log")) return auditLog;
  return [];
}

function mockFetch(
  handler: (url: string) => { status: number; body: unknown },
) {
  global.fetch = jest.fn(async (url: RequestInfo | URL) => {
    const { status, body } = handler(url.toString());
    return {
      ok: status >= 200 && status < 300,
      status,
      json: async () => body,
    } as Response;
  }) as typeof fetch;
}

function expectStat(label: string, value: string) {
  const card = screen.getByText(label).closest("div");
  expect(card).not.toBeNull();
  expect(within(card as HTMLElement).getByText(value)).toBeInTheDocument();
}

describe("Dashboard", () => {
  it("renderiza os cards com dados reais retornados pela API", async () => {
    mockFetch((url) => ({ status: 200, body: routeBody(url) }));

    render(<Dashboard />);

    expect(screen.getByText(/carregando/i)).toBeInTheDocument();

    await waitFor(() => {
      expectStat("Total de Patrimônios", "3");
      expectStat("Ambientes Cadastrados", "2");
      expectStat("Responsáveis Ativos", "2");
      expectStat("Itens em Manutenção", "2");
    });
  });

  it("renderiza atividades recentes baseadas no audit log", async () => {
    mockFetch((url) => ({ status: 200, body: routeBody(url) }));

    render(<Dashboard />);

    await waitFor(() => {
      expect(screen.getByText('Patrimônio "1234" cadastrado')).toBeInTheDocument();
    });
    expect(screen.getByText(/29\/04\/2026/)).toBeInTheDocument();
    expect(global.fetch).toHaveBeenCalledWith(
      "http://localhost:8000/api/audit-log?limit=5",
    );
  });

  it("exibe erro ao falhar carregamento", async () => {
    global.fetch = jest.fn().mockRejectedValue(new Error("Network"));

    render(<Dashboard />);

    await waitFor(() =>
      expect(screen.getByText(/erro ao carregar dados do dashboard/i)).toBeInTheDocument(),
    );
  });

  it("exibe mensagem quando nao existem atividades recentes", async () => {
    mockFetch((url) => {
      if (url.includes("/audit-log")) {
        return { status: 200, body: { ...auditLog, data: [] } };
      }

      return { status: 200, body: routeBody(url) };
    });

    render(<Dashboard />);

    await waitFor(() =>
      expect(screen.getByText(/nenhuma atividade recente encontrada/i)).toBeInTheDocument(),
    );
  });
});
