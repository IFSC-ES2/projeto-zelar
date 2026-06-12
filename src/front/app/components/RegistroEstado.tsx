'use client'

import { ArrowLeft, Save, AlertCircle } from 'lucide-react';
import Link from 'next/link';
import { useParams, useRouter } from 'next/navigation';
import { FormEvent, useEffect, useMemo, useState } from 'react';
import { API_URL } from '../lib/api';
import { useToast } from './Toast';

type Patrimonio = {
  id: number;
  numero_patrimonio: string;
  descricao: string;
  estado_item_id: number;
  observacoes?: string | null;
};

type EstadoItem = {
  id: number;
  nome: string;
};

type Conferente = {
  id: number;
  nome: string;
};

type HistoricoEstado = {
  estado_anterior_id: number | null;
  estado_novo_id: number | null;
  data: string;
};

async function fetchJson<T>(url: string): Promise<T> {
  const res = await fetch(url);
  if (!res.ok) throw new Error('Erro ao carregar dados');
  return res.json();
}

export default function RegistroEstado() {
  const { id } = useParams();
  const router = useRouter();
  const { toast } = useToast();
  const patrimonioId = Array.isArray(id) ? id[0] : id;
  const [patrimonio, setPatrimonio] = useState<Patrimonio | null>(null);
  const [estados, setEstados] = useState<EstadoItem[]>([]);
  const [conferentes, setConferentes] = useState<Conferente[]>([]);
  const [historico, setHistorico] = useState<HistoricoEstado[]>([]);
  const [estadoItemId, setEstadoItemId] = useState('');
  const [conferenteId, setConferenteId] = useState('');
  const [acao, setAcao] = useState('nenhuma');
  const [observacoes, setObservacoes] = useState('');
  const [erro, setErro] = useState('');
  const [salvando, setSalvando] = useState(false);

  const estadosPorId = useMemo(
    () => Object.fromEntries(estados.map((estado) => [estado.id, estado.nome])),
    [estados],
  );

  useEffect(() => {
    if (!patrimonioId) return;

    let ativo = true;
    Promise.all([
      fetchJson<Patrimonio>(`${API_URL}/patrimonios/${patrimonioId}`),
      fetchJson<EstadoItem[]>(`${API_URL}/estados-item`),
      fetchJson<Conferente[]>(`${API_URL}/conferentes`),
      fetchJson<HistoricoEstado[]>(`${API_URL}/patrimonios/${patrimonioId}/historico-estado`).catch(() => []),
    ])
      .then(([patrimonioData, estadosData, conferentesData, historicoData]) => {
        if (!ativo) return;
        setPatrimonio(patrimonioData);
        setEstados(estadosData);
        setConferentes(conferentesData);
        setHistorico(historicoData);
        setEstadoItemId(String(patrimonioData.estado_item_id ?? ''));
        setObservacoes(patrimonioData.observacoes ?? '');
      })
      .catch(() => {
        if (ativo) setErro('Erro ao carregar dados do patrimonio');
      });

    return () => {
      ativo = false;
    };
  }, [patrimonioId]);

  async function criarSolicitacao() {
    if (acao === 'nenhuma') return;

    const res = await fetch(`${API_URL}/solicitacoes`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        patrimonio_id: Number(patrimonioId),
        conferente_id: Number(conferenteId),
        tipo: acao,
        observacoes: observacoes.trim(),
      }),
    });

    if (!res.ok) {
      const data = await res.json().catch(() => ({}));
      throw new Error(data.error ?? 'Erro ao criar solicitacao');
    }
  }

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setErro('');

    if (!estadoItemId) {
      toast('Informe o estado do item', 'error');
      return;
    }
    if (!conferenteId || observacoes.trim() === '') {
      toast('Informe conferente e observacoes', 'error');
      return;
    }

    setSalvando(true);
    try {
      const res = await fetch(`${API_URL}/patrimonios/${patrimonioId}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          estado_item_id: Number(estadoItemId),
          observacoes: observacoes.trim(),
        }),
      });

      if (!res.ok) {
        const data = await res.json().catch(() => ({}));
        throw new Error(data.error ?? 'Erro ao registrar estado');
      }

      await criarSolicitacao();
      toast('Estado do patrimonio registrado com sucesso', 'success');
      router.push('/patrimonios');
    } catch (err) {
      toast(err instanceof Error ? err.message : 'Erro ao registrar estado', 'error');
    } finally {
      setSalvando(false);
    }
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-4">
        <Link href="/patrimonios" className="p-2 hover:bg-gray-100 rounded-lg">
          <ArrowLeft size={20} />
        </Link>
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Registrar Estado do Patrimônio</h1>
          <p className="text-gray-600">
            {patrimonio
              ? `Patrimônio #${patrimonio.numero_patrimonio} - ${patrimonio.descricao}`
              : `Patrimônio #${patrimonioId}`}
          </p>
        </div>
      </div>

      {erro && (
        <div className="bg-red-50 border border-red-200 rounded-lg p-4 text-sm text-red-700">
          {erro}
        </div>
      )}

      <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 flex gap-3">
        <AlertCircle className="text-blue-600 flex-shrink-0" size={20} />
        <div className="text-sm text-blue-900">
          <p className="font-medium mb-1">Importante</p>
          <p>Ao registrar um item como &ldquo;Avariado&rdquo; ou solicitar &ldquo;Manutenção&rdquo;, será gerada automaticamente uma solicitação para o gestor e responsável.</p>
        </div>
      </div>

      <div className="bg-white border border-gray-200 rounded-lg p-6">
        <form className="space-y-6" onSubmit={handleSubmit}>
          <div>
            <h2 className="text-lg font-semibold text-gray-900 mb-4">Estado do Item</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label htmlFor="estado-item" className="block text-sm font-medium text-gray-700 mb-2">
                  Estado Atual do Item *
                </label>
                <select
                  id="estado-item"
                  value={estadoItemId}
                  onChange={(event) => setEstadoItemId(event.target.value)}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg"
                >
                  <option value="">Selecione...</option>
                  {estados.map((estado) => (
                    <option key={estado.id} value={estado.id}>
                      {estado.nome}
                    </option>
                  ))}
                </select>
              </div>
              <div>
                <label htmlFor="conferente" className="block text-sm font-medium text-gray-700 mb-2">
                  Conferente *
                </label>
                <select
                  id="conferente"
                  value={conferenteId}
                  onChange={(event) => setConferenteId(event.target.value)}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg"
                >
                  <option value="">Selecione...</option>
                  {conferentes.map((conferente) => (
                    <option key={conferente.id} value={conferente.id}>
                      {conferente.nome}
                    </option>
                  ))}
                </select>
              </div>
            </div>
          </div>

          <div>
            <h2 className="text-lg font-semibold text-gray-900 mb-4">Ação Necessária</h2>
            <div className="space-y-3">
              <label className="flex items-center gap-3 p-4 border border-gray-300 rounded-lg cursor-pointer hover:bg-gray-50">
                <input
                  type="radio"
                  name="acao"
                  value="nenhuma"
                  checked={acao === 'nenhuma'}
                  onChange={(event) => setAcao(event.target.value)}
                  className="w-4 h-4"
                />
                <div>
                  <p className="font-medium text-gray-900">Nenhuma ação necessária</p>
                  <p className="text-sm text-gray-600">Item está em condições normais</p>
                </div>
              </label>
              <label className="flex items-center gap-3 p-4 border border-gray-300 rounded-lg cursor-pointer hover:bg-gray-50">
                <input
                  type="radio"
                  name="acao"
                  value="manutencao"
                  checked={acao === 'manutencao'}
                  onChange={(event) => setAcao(event.target.value)}
                  className="w-4 h-4"
                />
                <div>
                  <p className="font-medium text-gray-900">Solicitar Manutenção</p>
                  <p className="text-sm text-gray-600">Item necessita de reparo</p>
                </div>
              </label>
              <label className="flex items-center gap-3 p-4 border border-gray-300 rounded-lg cursor-pointer hover:bg-gray-50">
                <input
                  type="radio"
                  name="acao"
                  value="substituicao"
                  checked={acao === 'substituicao'}
                  onChange={(event) => setAcao(event.target.value)}
                  className="w-4 h-4"
                />
                <div>
                  <p className="font-medium text-gray-900">Solicitar Substituição</p>
                  <p className="text-sm text-gray-600">Item precisa ser substituído</p>
                </div>
              </label>
            </div>
          </div>

          <div>
            <h2 className="text-lg font-semibold text-gray-900 mb-4">Detalhes</h2>
            <div>
              <label htmlFor="observacoes" className="block text-sm font-medium text-gray-700 mb-2">
                Observações *
              </label>
              <textarea
                id="observacoes"
                rows={4}
                value={observacoes}
                onChange={(event) => setObservacoes(event.target.value)}
                placeholder="Descreva o estado do item, problemas identificados ou qualquer observação relevante..."
                className="w-full px-4 py-2 border border-gray-300 rounded-lg"
              ></textarea>
            </div>
          </div>

          {historico.length > 0 && (
            <div>
              <h2 className="text-lg font-semibold text-gray-900 mb-4">Histórico de Estado</h2>
              <div className="overflow-x-auto border border-gray-200 rounded-lg">
                <table className="w-full text-sm">
                  <thead className="bg-gray-50 text-gray-600">
                    <tr>
                      <th className="px-4 py-3 text-left font-medium">Data</th>
                      <th className="px-4 py-3 text-left font-medium">Estado anterior</th>
                      <th className="px-4 py-3 text-left font-medium">Estado novo</th>
                    </tr>
                  </thead>
                  <tbody>
                    {historico.map((item, index) => (
                      <tr key={`${item.data}-${index}`} className="border-t border-gray-200">
                        <td className="px-4 py-3 text-gray-700">
                          {new Date(item.data).toLocaleString('pt-BR')}
                        </td>
                        <td className="px-4 py-3 text-gray-700">
                          {item.estado_anterior_id ? estadosPorId[item.estado_anterior_id] ?? item.estado_anterior_id : '-'}
                        </td>
                        <td className="px-4 py-3 text-gray-700">
                          {item.estado_novo_id ? estadosPorId[item.estado_novo_id] ?? item.estado_novo_id : '-'}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}

          <div className="flex gap-4 pt-4 border-t border-gray-200">
            <button
              type="submit"
              disabled={salvando}
              className="flex items-center gap-2 px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:opacity-60"
            >
              <Save size={20} />
              {salvando ? 'Registrando...' : 'Registrar Estado'}
            </button>
            <Link
              href="/patrimonios"
              className="px-6 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200"
            >
              Cancelar
            </Link>
          </div>
        </form>
      </div>
    </div>
  );
}
