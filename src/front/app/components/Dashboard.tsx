'use client'

import { useEffect, useState } from 'react';
import { Package, MapPin, Users, AlertTriangle } from 'lucide-react';
import { API_URL } from '../lib/api';

type Patrimonio = {
  id: number;
  numero_patrimonio: string;
  descricao: string;
  estado_item_id: number;
};

type Opcao = { id: number; nome: string };

type AuditLog = {
  id: number;
  tabela: string;
  registro_id: number;
  acao: string;
  dados_novos: Record<string, unknown> | null;
  created_at: string;
};

type AuditLogResponse = {
  data: AuditLog[];
};

function normalizar(texto: string) {
  return texto.normalize('NFD').replace(/[\u0300-\u036f]/g, '').toLowerCase();
}

function formatarData(valor: string) {
  return new Intl.DateTimeFormat('pt-BR', {
    day: '2-digit',
    month: '2-digit',
    year: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
  }).format(new Date(valor));
}

function labelTabela(tabela: string) {
  const labels: Record<string, string> = {
    ambiente: 'Ambiente',
    conferente: 'Conferente',
    estado_item: 'Estado do item',
    fornecedor: 'Fornecedor',
    patrimonio: 'Patrimônio',
    responsavel: 'Responsável',
    tipo_material: 'Tipo de material',
  };

  return labels[tabela] ?? tabela;
}

function labelAcao(acao: string) {
  const labels: Record<string, string> = {
    CREATE: 'cadastrado',
    UPDATE: 'atualizado',
    DELETE: 'removido',
    RESTORE: 'restaurado',
  };

  return labels[acao.toUpperCase()] ?? acao.toLowerCase();
}

function descricaoRegistro(log: AuditLog) {
  const dados = log.dados_novos ?? {};
  const nome = dados.nome ?? dados.descricao ?? dados.numero_patrimonio;

  if (typeof nome === 'string' && nome.trim()) {
    return `"${nome}"`;
  }

  return `#${log.registro_id}`;
}

function descricaoAtividade(log: AuditLog) {
  return `${labelTabela(log.tabela)} ${descricaoRegistro(log)} ${labelAcao(log.acao)}`;
}

async function buscarJson<T>(url: string): Promise<T> {
  const resposta = await fetch(url);

  if (!resposta.ok) {
    throw new Error('Erro ao carregar dados do dashboard');
  }

  return resposta.json();
}

export default function Dashboard() {
  const [patrimonios, setPatrimonios] = useState<Patrimonio[]>([]);
  const [ambientes, setAmbientes] = useState<Opcao[]>([]);
  const [responsaveis, setResponsaveis] = useState<Opcao[]>([]);
  const [estados, setEstados] = useState<Opcao[]>([]);
  const [logs, setLogs] = useState<AuditLog[]>([]);
  const [loading, setLoading] = useState(true);
  const [erro, setErro] = useState<string | null>(null);

  useEffect(() => {
    Promise.all([
      buscarJson<Patrimonio[]>(`${API_URL}/patrimonios`),
      buscarJson<Opcao[]>(`${API_URL}/ambientes`),
      buscarJson<Opcao[]>(`${API_URL}/responsaveis`),
      buscarJson<Opcao[]>(`${API_URL}/estados-item`),
      buscarJson<AuditLogResponse>(`${API_URL}/audit-log?limit=5`),
    ])
      .then(([pats, ambs, resps, ests, auditLogs]) => {
        setPatrimonios(pats);
        setAmbientes(ambs);
        setResponsaveis(resps);
        setEstados(ests);
        setLogs(auditLogs.data ?? []);
      })
      .catch(() => setErro('Erro ao carregar dados do dashboard'))
      .finally(() => setLoading(false));
  }, []);

  const estadosManutencao = new Set(
    estados
      .filter((estado) => normalizar(estado.nome).includes('manutencao'))
      .map((estado) => estado.id),
  );

  const stats = [
    { label: 'Total de Patrimônios', value: patrimonios.length, icon: Package, color: 'bg-blue-50 text-blue-600' },
    { label: 'Ambientes Cadastrados', value: ambientes.length, icon: MapPin, color: 'bg-green-50 text-green-600' },
    { label: 'Responsáveis Ativos', value: responsaveis.length, icon: Users, color: 'bg-purple-50 text-purple-600' },
    {
      label: 'Itens em Manutenção',
      value: patrimonios.filter((patrimonio) => estadosManutencao.has(patrimonio.estado_item_id)).length,
      icon: AlertTriangle,
      color: 'bg-orange-50 text-orange-600',
    },
  ];

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-gray-900 mb-2">Dashboard</h1>
        <p className="text-gray-600">Visão geral do sistema de gestão patrimonial</p>
      </div>

      {erro && <p className="text-red-600">{erro}</p>}
      {loading && <p className="text-gray-500">Carregando...</p>}

      {!loading && !erro && (
        <>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            {stats.map((stat) => {
              const Icon = stat.icon;
              return (
                <div key={stat.label} className="bg-white border border-gray-200 rounded-lg p-6">
                  <div className="flex items-center justify-between mb-4">
                    <div className={`p-3 rounded-lg ${stat.color}`}>
                      <Icon size={24} />
                    </div>
                  </div>
                  <p className="text-3xl font-bold text-gray-900 mb-1">{stat.value}</p>
                  <p className="text-sm text-gray-600">{stat.label}</p>
                </div>
              );
            })}
          </div>

          <div className="bg-white border border-gray-200 rounded-lg">
            <div className="p-6 border-b border-gray-200">
              <h2 className="text-lg font-semibold text-gray-900">Atividades Recentes</h2>
            </div>
            <div className="divide-y divide-gray-200">
              {logs.map((activity) => (
                <div key={activity.id} className="p-4 hover:bg-gray-50">
                  <div className="flex justify-between items-start gap-4">
                    <p className="text-gray-900">{descricaoAtividade(activity)}</p>
                    <span className="text-sm text-gray-500 whitespace-nowrap">{formatarData(activity.created_at)}</span>
                  </div>
                </div>
              ))}
              {logs.length === 0 && (
                <div className="p-4 text-gray-500">
                  Nenhuma atividade recente encontrada.
                </div>
              )}
            </div>
          </div>
        </>
      )}
    </div>
  );
}
