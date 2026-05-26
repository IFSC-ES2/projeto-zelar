'use client'

import { useEffect, useState } from 'react';
import { Plus, Search, Edit2, Trash2 } from 'lucide-react';
import { useToast } from './Toast';
import Link from 'next/link';
import { API_URL } from '../lib/api';

type Ambiente = {
  id: number;
  nome: string;
  bloco: string | null;
  andar: string | null;
  responsavel_id: number | null;
};

export default function AmbientesList() {
  const [ambientes, setAmbientes] = useState<Ambiente[]>([]);
  const [busca, setBusca] = useState('');
  const [loading, setLoading] = useState(true);
  const [erro, setErro] = useState<string | null>(null);
  const { toast } = useToast();

  useEffect(() => {
    fetch(`${API_URL}/ambientes`)
      .then(r => r.json())
      .then(setAmbientes)
      .catch(() => setErro('Erro ao carregar ambientes'))
      .finally(() => setLoading(false));
  }, []);

  async function handleDelete(id: number) {
    if (!confirm('Confirmar exclusão do ambiente?')) return;
    try {
      const res = await fetch(`${API_URL}/ambientes/${id}`, { method: 'DELETE' });
      if (res.status === 409) {
        const data = await res.json().catch(() => ({}));
        const lista = (data.patrimonios as { numero_patrimonio: string; descricao: string }[] | undefined)
          ?.map(p => `• ${p.numero_patrimonio} — ${p.descricao}`)
          .join('\n') ?? '';
        toast(`${data.error}\n\n${lista}`, 'error');
        return;
      }
      if (!res.ok) {
        const data = await res.json().catch(() => ({}));
        toast(data.error ?? 'Erro ao excluir ambiente', 'error');
        return;
      }
      setAmbientes(prev => prev.filter(a => a.id !== id));
      toast('Ambiente excluído com sucesso', 'success');
    } catch {
      toast('Erro ao excluir ambiente', 'error');
    }
  }

  const filtrados = ambientes.filter(a =>
    a.nome.toLowerCase().includes(busca.toLowerCase()) ||
    (a.bloco ?? '').toLowerCase().includes(busca.toLowerCase()) ||
    (a.andar ?? '').toLowerCase().includes(busca.toLowerCase())
  );

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold text-gray-900 mb-2">Ambientes</h1>
          <p className="text-gray-600">Gerencie os ambientes da empresa</p>
        </div>
        <Link
          href="/ambientes/novo"
          className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
        >
          <Plus size={20} />
          Novo Ambiente
        </Link>
      </div>

      <div className="bg-white border border-gray-200 rounded-lg p-4">
        <div className="flex-1 relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
          <input
            type="text"
            placeholder="Buscar por nome, bloco, andar..."
            className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg"
            value={busca}
            onChange={e => setBusca(e.target.value)}
          />
        </div>
      </div>

      {erro && <p className="text-red-600">{erro}</p>}
      {loading && <p className="text-gray-500">Carregando...</p>}

      {!loading && !erro && (
        <div className="bg-white border border-gray-200 rounded-lg overflow-hidden">
          <table className="w-full">
            <thead className="bg-gray-50 border-b border-gray-200">
              <tr>
                <th className="px-6 py-3 text-left text-sm font-semibold text-gray-900">Nome</th>
                <th className="px-6 py-3 text-left text-sm font-semibold text-gray-900">Bloco</th>
                <th className="px-6 py-3 text-left text-sm font-semibold text-gray-900">Andar</th>
                <th className="px-6 py-3 text-right text-sm font-semibold text-gray-900">Ações</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {filtrados.map((ambiente) => (
                <tr key={ambiente.id} className="hover:bg-gray-50">
                  <td className="px-6 py-4 text-sm text-gray-900 font-medium">{ambiente.nome}</td>
                  <td className="px-6 py-4 text-sm text-gray-600">{ambiente.bloco ?? '-'}</td>
                  <td className="px-6 py-4 text-sm text-gray-600">{ambiente.andar ?? '-'}</td>
                  <td className="px-6 py-4">
                    <div className="flex justify-end gap-2">
                      <Link
                        href={`/ambientes/editar/${ambiente.id}`}
                        className="p-2 text-blue-600 hover:bg-blue-50 rounded-lg"
                      >
                        <Edit2 size={18} />
                      </Link>
                      <button
                        onClick={() => handleDelete(ambiente.id)}
                        className="p-2 text-red-600 hover:bg-red-50 rounded-lg"
                      >
                        <Trash2 size={18} />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
              {filtrados.length === 0 && (
                <tr>
                  <td colSpan={4} className="px-6 py-8 text-center text-gray-500">
                    Nenhum ambiente encontrado.
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
