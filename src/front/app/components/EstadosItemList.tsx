'use client'

import { useEffect, useState } from 'react';
import { Plus, Search, Edit2, Trash2 } from 'lucide-react';
import Link from 'next/link';
import { useToast } from './Toast';

const API = process.env.NEXT_PUBLIC_API_URL;

type EstadoItem = {
  id: number;
  nome: string;
  descricao: string | null;
};

export default function EstadosItemList() {
  const [estados, setEstados] = useState<EstadoItem[]>([]);
  const [busca, setBusca] = useState('');
  const [loading, setLoading] = useState(true);
  const [erro, setErro] = useState<string | null>(null);
  const { toast } = useToast();

  useEffect(() => {
    fetch(`${API}/estados-item`)
      .then(r => r.json())
      .then(setEstados)
      .catch(() => setErro('Erro ao carregar estados do item'))
      .finally(() => setLoading(false));
  }, []);

  async function handleDelete(id: number) {
    if (!confirm('Confirmar exclusao do estado do item?')) return;

    try {
      const res = await fetch(`${API}/estados-item/${id}`, { method: 'DELETE' });
      if (res.status === 409) {
        const data = await res.json().catch(() => ({}));
        const lista = (data.patrimonios as { numero_patrimonio: string; descricao: string }[] | undefined)
          ?.map(p => `- ${p.numero_patrimonio} - ${p.descricao}`)
          .join('\n') ?? '';
        toast(`${data.error}\n\n${lista}`, 'error');
        return;
      }
      if (!res.ok) {
        const data = await res.json().catch(() => ({}));
        toast(data.error ?? 'Erro ao excluir estado do item', 'error');
        return;
      }

      setEstados(prev => prev.filter(estado => estado.id !== id));
      toast('Estado do item excluido com sucesso', 'success');
    } catch {
      toast('Erro ao excluir estado do item', 'error');
    }
  }

  const filtrados = estados.filter(estado =>
    estado.nome.toLowerCase().includes(busca.toLowerCase()) ||
    (estado.descricao ?? '').toLowerCase().includes(busca.toLowerCase())
  );

  if (loading) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="text-gray-500">Carregando...</div>
      </div>
    );
  }

  if (erro) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="text-red-600">{erro}</div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold text-gray-900 mb-2">Estados do Item</h1>
          <p className="text-gray-600">Gerencie os possiveis estados dos patrimonios</p>
        </div>
        <Link href="/estados-item/novo" className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700">
          <Plus size={20} />
          Novo Estado
        </Link>
      </div>

      <div className="bg-white border border-gray-200 rounded-lg p-4">
        <div className="flex-1 relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
          <input
            type="text"
            placeholder="Buscar por nome ou descricao..."
            className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg"
            value={busca}
            onChange={e => setBusca(e.target.value)}
          />
        </div>
      </div>

      <div className="bg-white border border-gray-200 rounded-lg overflow-hidden">
        <table className="w-full">
          <thead className="bg-gray-50 border-b border-gray-200">
            <tr>
              <th className="px-6 py-3 text-left text-sm font-semibold text-gray-900">Nome</th>
              <th className="px-6 py-3 text-left text-sm font-semibold text-gray-900">Descricao</th>
              <th className="px-6 py-3 text-right text-sm font-semibold text-gray-900">Acoes</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200">
            {filtrados.length === 0 ? (
              <tr>
                <td colSpan={3} className="px-6 py-8 text-center text-gray-500">
                  Nenhum estado do item encontrado.
                </td>
              </tr>
            ) : (
              filtrados.map((estado) => (
                <tr key={estado.id} className="hover:bg-gray-50">
                  <td className="px-6 py-4 text-sm text-gray-900 font-medium">{estado.nome}</td>
                  <td className="px-6 py-4 text-sm text-gray-600">{estado.descricao ?? '-'}</td>
                  <td className="px-6 py-4">
                    <div className="flex justify-end gap-2">
                      <Link href={`/estados-item/editar/${estado.id}`} className="p-2 text-blue-600 hover:bg-blue-50 rounded-lg">
                        <Edit2 size={18} />
                      </Link>
                      <button
                        onClick={() => handleDelete(estado.id)}
                        className="p-2 text-red-600 hover:bg-red-50 rounded-lg"
                      >
                        <Trash2 size={18} />
                      </button>
                    </div>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
