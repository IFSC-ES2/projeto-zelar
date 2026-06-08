'use client'

import { useEffect, useState } from 'react';
import { CheckCircle, Clock, PlayCircle, Plus, RotateCcw, Search, XCircle } from 'lucide-react';
import { API_URL } from '../lib/api';
import { useToast } from './Toast';

type SolicitacaoStatus = 'aberta' | 'em_andamento' | 'concluida' | 'cancelada';
type SolicitacaoTipo = 'manutencao' | 'substituicao';

type Solicitacao = {
  id: number;
  patrimonio_id: number;
  tipo: SolicitacaoTipo;
  status: SolicitacaoStatus;
  descricao: string | null;
  conferente_id: number | null;
  createdAt?: string;
  created_at?: string;
};

type Opcao = {
  id: number;
  nome?: string;
  numero_patrimonio?: string;
  descricao?: string;
};

const statusLabels: Record<SolicitacaoStatus, string> = {
  aberta: 'Aberta',
  em_andamento: 'Em andamento',
  concluida: 'Concluida',
  cancelada: 'Cancelada',
};

const tipoLabels: Record<SolicitacaoTipo, string> = {
  manutencao: 'Manutencao',
  substituicao: 'Substituicao',
};

const statusClasses: Record<SolicitacaoStatus, string> = {
  aberta: 'text-blue-700 bg-blue-50 border-blue-200',
  em_andamento: 'text-amber-700 bg-amber-50 border-amber-200',
  concluida: 'text-green-700 bg-green-50 border-green-200',
  cancelada: 'text-red-700 bg-red-50 border-red-200',
};

const tipoClasses: Record<SolicitacaoTipo, string> = {
  manutencao: 'text-indigo-700 bg-indigo-50 border-indigo-200',
  substituicao: 'text-purple-700 bg-purple-50 border-purple-200',
};

function mapaNomes(lista: Opcao[]): Record<number, string> {
  return Object.fromEntries(lista.map(o => [o.id, o.nome ?? '-']));
}

function mapaPatrimonios(lista: Opcao[]): Record<number, string> {
  return Object.fromEntries(
    lista.map(o => [o.id, `${o.numero_patrimonio ?? o.id} - ${o.descricao ?? ''}`.trim()]),
  );
}

function formatarData(value?: string) {
  if (!value) return '-';
  return new Intl.DateTimeFormat('pt-BR').format(new Date(value));
}

export default function SolicitacoesList() {
  const [solicitacoes, setSolicitacoes] = useState<Solicitacao[]>([]);
  const [patrimonioOptions, setPatrimonioOptions] = useState<Opcao[]>([]);
  const [conferenteOptions, setConferenteOptions] = useState<Opcao[]>([]);
  const [patrimonios, setPatrimonios] = useState<Record<number, string>>({});
  const [conferentes, setConferentes] = useState<Record<number, string>>({});
  const [statusFiltro, setStatusFiltro] = useState('');
  const [tipoFiltro, setTipoFiltro] = useState('');
  const [novoPatrimonioId, setNovoPatrimonioId] = useState('');
  const [novoTipo, setNovoTipo] = useState<SolicitacaoTipo>('manutencao');
  const [novaDescricao, setNovaDescricao] = useState('');
  const [novoConferenteId, setNovoConferenteId] = useState('');
  const [criando, setCriando] = useState(false);
  const [loading, setLoading] = useState(true);
  const [erro, setErro] = useState<string | null>(null);
  const { toast } = useToast();

  useEffect(() => {
    Promise.all([
      fetch(`${API_URL}/solicitacoes`).then(r => r.json()),
      fetch(`${API_URL}/patrimonios`).then(r => r.json()),
      fetch(`${API_URL}/conferentes`).then(r => r.json()),
    ])
      .then(([sols, pats, confs]) => {
        setSolicitacoes(sols);
        setPatrimonioOptions(pats);
        setConferenteOptions(confs);
        setPatrimonios(mapaPatrimonios(pats));
        setConferentes(mapaNomes(confs));
      })
      .catch(() => setErro('Erro ao carregar solicitacoes'))
      .finally(() => setLoading(false));
  }, []);

  async function alterarStatus(id: number, status: SolicitacaoStatus) {
    try {
      const res = await fetch(`${API_URL}/solicitacoes/${id}/status`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ status }),
      });

      if (!res.ok) {
        const data = await res.json().catch(() => ({}));
        toast(data.error ?? 'Erro ao atualizar solicitacao', 'error');
        return;
      }

      const atualizada = await res.json();
      setSolicitacoes(prev => prev.map(s => (s.id === id ? atualizada : s)));
      toast('Status da solicitacao atualizado', 'success');
    } catch {
      toast('Erro ao atualizar solicitacao', 'error');
    }
  }

  async function criarSolicitacao(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();

    if (!novoPatrimonioId) {
      toast('Selecione um patrimonio', 'error');
      return;
    }

    setCriando(true);
    try {
      const body = {
        patrimonio_id: Number(novoPatrimonioId),
        tipo: novoTipo,
        descricao: novaDescricao.trim() || null,
        conferente_id: novoConferenteId ? Number(novoConferenteId) : null,
      };

      const res = await fetch(`${API_URL}/solicitacoes`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(body),
      });

      if (!res.ok) {
        const data = await res.json().catch(() => ({}));
        toast(data.error ?? 'Erro ao criar solicitacao', 'error');
        return;
      }

      const criada = await res.json();
      setSolicitacoes(prev => [criada, ...prev]);
      setNovoPatrimonioId('');
      setNovoTipo('manutencao');
      setNovaDescricao('');
      setNovoConferenteId('');
      toast('Solicitacao criada com sucesso', 'success');
    } catch {
      toast('Erro ao criar solicitacao', 'error');
    } finally {
      setCriando(false);
    }
  }

  const filtradas = solicitacoes.filter(s => {
    return (!statusFiltro || s.status === statusFiltro) && (!tipoFiltro || s.tipo === tipoFiltro);
  });

  const abertas = solicitacoes.filter(s => s.status === 'aberta' || s.status === 'em_andamento').length;

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-gray-900 mb-2">Solicitações</h1>
        <p className="text-gray-600">Acompanhe manutenções e substituições abertas para patrimônios</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="bg-white border border-gray-200 rounded-lg p-4">
          <p className="text-sm text-gray-500">Em aberto</p>
          <p className="text-2xl font-bold text-blue-700">{abertas}</p>
        </div>
        <div className="bg-white border border-gray-200 rounded-lg p-4">
          <p className="text-sm text-gray-500">Concluidas</p>
          <p className="text-2xl font-bold text-green-700">{solicitacoes.filter(s => s.status === 'concluida').length}</p>
        </div>
        <div className="bg-white border border-gray-200 rounded-lg p-4">
          <p className="text-sm text-gray-500">Canceladas</p>
          <p className="text-2xl font-bold text-red-700">{solicitacoes.filter(s => s.status === 'cancelada').length}</p>
        </div>
      </div>

      {!loading && !erro && (
        <form onSubmit={criarSolicitacao} className="bg-white border border-gray-200 rounded-lg p-5 space-y-4 shadow-sm">
          <div className="flex items-center gap-2">
            <Plus size={20} className="text-blue-600" />
            <div>
              <h2 className="text-lg font-semibold text-gray-900">Nova solicitação</h2>
              <p className="text-sm text-gray-500">Abra uma manutenção ou substituição para acompanhamento do gestor.</p>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <label className="space-y-1 text-sm text-gray-700">
              Patrimônio <span className="text-red-600">*</span>
              <select
                aria-label="Patrimônio da solicitação"
                className="w-full px-4 py-2 border border-gray-300 rounded-lg"
                value={novoPatrimonioId}
                onChange={e => setNovoPatrimonioId(e.target.value)}
              >
                <option value="">Selecione um patrimônio</option>
                {patrimonioOptions.map(p => (
                  <option key={p.id} value={p.id}>{patrimonios[p.id]}</option>
                ))}
              </select>
            </label>

            <label className="space-y-1 text-sm text-gray-700">
              Tipo
              <select
                aria-label="Tipo da solicitação"
                className="w-full px-4 py-2 border border-gray-300 rounded-lg"
                value={novoTipo}
                onChange={e => setNovoTipo(e.target.value as SolicitacaoTipo)}
              >
                <option value="manutencao">Manutencao</option>
                <option value="substituicao">Substituicao</option>
              </select>
            </label>

            <label className="space-y-1 text-sm text-gray-700">
              Conferente
              <select
                aria-label="Conferente da solicitação"
                className="w-full px-4 py-2 border border-gray-300 rounded-lg"
                value={novoConferenteId}
                onChange={e => setNovoConferenteId(e.target.value)}
              >
                <option value="">Sem conferente</option>
                {conferenteOptions.map(c => (
                  <option key={c.id} value={c.id}>{c.nome}</option>
                ))}
              </select>
            </label>

            <label className="space-y-1 text-sm text-gray-700">
              Descrição
              <input
                type="text"
                aria-label="Descrição da solicitação"
                className="w-full px-4 py-2 border border-gray-300 rounded-lg"
                value={novaDescricao}
                onChange={e => setNovaDescricao(e.target.value)}
                placeholder="Ex.: Tela quebrada, troca de cadeira..."
              />
            </label>
          </div>

          <div className="flex justify-end">
            <button
              type="submit"
              disabled={criando}
              className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:bg-gray-300"
            >
              <Plus size={18} />
              {criando ? 'Criando...' : 'Abrir solicitação'}
            </button>
          </div>
        </form>
      )}

      <div className="bg-white border border-gray-200 rounded-lg p-4">
        <div className="grid grid-cols-1 md:grid-cols-[1fr_1fr_auto] gap-4">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
            <select
              aria-label="Filtrar por status"
              className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg"
              value={statusFiltro}
              onChange={e => setStatusFiltro(e.target.value)}
            >
              <option value="">Todos os status</option>
              <option value="aberta">Aberta</option>
              <option value="em_andamento">Em andamento</option>
              <option value="concluida">Concluida</option>
              <option value="cancelada">Cancelada</option>
            </select>
          </div>

          <select
            aria-label="Filtrar por tipo"
            className="w-full px-4 py-2 border border-gray-300 rounded-lg"
            value={tipoFiltro}
            onChange={e => setTipoFiltro(e.target.value)}
          >
            <option value="">Todos os tipos</option>
            <option value="manutencao">Manutencao</option>
            <option value="substituicao">Substituicao</option>
          </select>

          <button
            type="button"
            onClick={() => {
              setStatusFiltro('');
              setTipoFiltro('');
            }}
            className="px-4 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50"
          >
            Limpar filtros
          </button>
        </div>
      </div>

      {erro && <p className="text-red-600">{erro}</p>}
      {loading && <p className="text-gray-500">Carregando...</p>}

      {!loading && !erro && (
        <div className="bg-white border border-gray-200 rounded-lg overflow-hidden">
          <table className="w-full">
            <thead className="bg-gray-50 border-b border-gray-200">
              <tr>
                <th className="px-6 py-3 text-left text-sm font-semibold text-gray-900">Patrimônio</th>
                <th className="px-6 py-3 text-left text-sm font-semibold text-gray-900">Tipo</th>
                <th className="px-6 py-3 text-left text-sm font-semibold text-gray-900">Status</th>
                <th className="px-6 py-3 text-left text-sm font-semibold text-gray-900">Conferente</th>
                <th className="px-6 py-3 text-left text-sm font-semibold text-gray-900">Data</th>
                <th className="px-6 py-3 text-right text-sm font-semibold text-gray-900">Ações</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {filtradas.map((solicitacao) => (
                <tr key={solicitacao.id} className="hover:bg-gray-50">
                  <td className="px-6 py-4 text-sm text-gray-900">
                    <div className="font-medium">{patrimonios[solicitacao.patrimonio_id] ?? '-'}</div>
                    {solicitacao.descricao && <div className="text-xs text-gray-500 mt-1">{solicitacao.descricao}</div>}
                  </td>
                  <td className="px-6 py-4 text-sm text-gray-600">
                    <span className={`inline-flex px-2 py-1 text-xs rounded-full border ${tipoClasses[solicitacao.tipo]}`}>
                      {tipoLabels[solicitacao.tipo]}
                    </span>
                  </td>
                  <td className="px-6 py-4">
                    <span className={`inline-flex px-2 py-1 text-xs rounded-full border ${statusClasses[solicitacao.status]}`}>
                      {statusLabels[solicitacao.status]}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-sm text-gray-600">
                    {solicitacao.conferente_id ? conferentes[solicitacao.conferente_id] ?? '-' : '-'}
                  </td>
                  <td className="px-6 py-4 text-sm text-gray-600">
                    {formatarData(solicitacao.createdAt ?? solicitacao.created_at)}
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex flex-col items-end gap-2">
                      <select
                        aria-label={`Alterar status da solicitacao ${solicitacao.id}`}
                        className="w-40 px-3 py-2 border border-gray-300 rounded-lg text-sm"
                        value={solicitacao.status}
                        onChange={e => alterarStatus(solicitacao.id, e.target.value as SolicitacaoStatus)}
                      >
                        <option value="aberta">Aberta</option>
                        <option value="em_andamento">Em andamento</option>
                        <option value="concluida">Concluida</option>
                        <option value="cancelada">Cancelada</option>
                      </select>

                      <div className="flex flex-wrap justify-end gap-2">
                        {solicitacao.status === 'aberta' && (
                          <button
                            onClick={() => alterarStatus(solicitacao.id, 'em_andamento')}
                            className="inline-flex items-center gap-1 px-3 py-1.5 text-sm text-amber-700 bg-amber-50 border border-amber-200 hover:bg-amber-100 rounded-lg"
                            aria-label={`Iniciar solicitacao ${solicitacao.id}`}
                          >
                            <PlayCircle size={16} />
                            Iniciar
                          </button>
                        )}
                        {solicitacao.status === 'em_andamento' && (
                          <span className="inline-flex items-center gap-1 px-3 py-1.5 text-sm text-amber-700 bg-amber-50 border border-amber-200 rounded-lg">
                            <Clock size={16} />
                            Em andamento
                          </span>
                        )}
                        {(solicitacao.status === 'aberta' || solicitacao.status === 'em_andamento') && (
                          <>
                            <button
                              onClick={() => alterarStatus(solicitacao.id, 'concluida')}
                              className="inline-flex items-center gap-1 px-3 py-1.5 text-sm text-green-700 bg-green-50 border border-green-200 hover:bg-green-100 rounded-lg"
                              aria-label={`Concluir solicitacao ${solicitacao.id}`}
                            >
                              <CheckCircle size={16} />
                              Concluir
                            </button>
                            <button
                              onClick={() => alterarStatus(solicitacao.id, 'cancelada')}
                              className="inline-flex items-center gap-1 px-3 py-1.5 text-sm text-red-700 bg-red-50 border border-red-200 hover:bg-red-100 rounded-lg"
                              aria-label={`Cancelar solicitacao ${solicitacao.id}`}
                            >
                              <XCircle size={16} />
                              Cancelar
                            </button>
                          </>
                        )}
                        {(solicitacao.status === 'concluida' || solicitacao.status === 'cancelada') && (
                          <button
                            onClick={() => alterarStatus(solicitacao.id, 'aberta')}
                            className="inline-flex items-center gap-1 px-3 py-1.5 text-sm text-blue-700 bg-blue-50 border border-blue-200 hover:bg-blue-100 rounded-lg"
                            aria-label={`Reabrir solicitacao ${solicitacao.id}`}
                          >
                            <RotateCcw size={16} />
                            Reabrir
                          </button>
                        )}
                      </div>
                    </div>
                  </td>
                </tr>
              ))}
              {filtradas.length === 0 && (
                <tr>
                  <td colSpan={6} className="px-6 py-8 text-center text-gray-500">
                    Nenhuma solicitação encontrada.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}
