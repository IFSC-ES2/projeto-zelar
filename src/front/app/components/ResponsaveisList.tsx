'use client'

import { useEffect, useState } from 'react';
import { Plus, Search, Edit2, Trash2 } from 'lucide-react';
import { useToast } from './Toast';
import Link from 'next/link';

const API = process.env.NEXT_PUBLIC_API_URL;

type Responsavel = {
  id: number;
  nome: string;
  email: string;
  cargo: string | null;
  departamento: string | null;
  telefone: string | null;
};

export default function ResponsaveisList() {
  const [responsaveis, setResponsaveis] = useState<Responsavel[]>([]);
  const [busca, setBusca] = useState('');
  const [loading, setLoading] = useState(true);
  const [erro, setErro] = useState<string | null>(null);
  const { toast } = useToast();

  useEffect(() => {
    fetch(`${API}/responsaveis`)
      .then(r => r.json())
      .then(setResponsaveis)
      .catch(() => setErro('Erro ao carregar responsáveis'))
      .finally(() => setLoading(false));
  }, []);

  async function handleDelete(id: number) {
    if (!confirm('Confirmar exclusão do responsável?\n\nAmbientes vinculados a ele perderão o responsável automaticamente.')) return;
    try {
      const res = await fetch(`${API}/responsaveis/${id}`, { method: 'DELETE' });
      if (res.status === 409) {
        const data = await res.json().catch(() => ({}));
        const listaPatrimonios = (data.patrimonios as { numero_patrimonio: string; descricao: string }[] | undefined)
          ?.map(p => `• ${p.numero_patrimonio} — ${p.descricao}`)
          .join('\n') ?? '';
        const listaAmbientes = (data.ambientes as { nome: string; bloco: string | null }[] | undefined)
          ?.map(a => `• ${a.nome}${a.bloco ? ` (${a.bloco})` : ''}`)
          .join('\n') ?? '';
        const lista = listaPatrimonios || listaAmbientes;
        toast(`${data.error}\n\n${lista}`, 'error');
        return;
      }
      if (!res.ok) {
        const data = await res.json().catch(() => ({}));
        toast(data.error ?? 'Erro ao excluir responsável', 'error');
        return;
      }
      setResponsaveis(prev => prev.filter(r => r.id !== id));
      toast('Responsável excluído com sucesso', 'success');
    } catch {
      toast('Erro ao excluir responsável', 'error');
    }
  }

  const filtrados = responsaveis.filter(r =>
    r.nome.toLowerCase().includes(busca.toLowerCase()) ||
    r.email.toLowerCase().includes(busca.toLowerCase()) ||
    (r.departamento ?? '').toLowerCase().includes(busca.toLowerCase())
  );

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold text-gray-900 mb-2">Responsáveis</h1>
          <p className="text-gray-600">Gerencie os responsáveis pelos ambientes</p>
        </div>
        <Link
          href="/responsaveis/novo"
          className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
        >
          <Plus size={20} />
          Novo Responsável
        </Link>
      </div>

      <div className="bg-white border border-gray-200 rounded-lg p-4">
        <div className="flex-1 relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
          <input
            type="text"
            placeholder="Buscar por nome, email, departamento..."
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
                <th className="px-6 py-3 text-left text-sm font-semibold text-gray-900">Email</th>
                <th className="px-6 py-3 text-left text-sm font-semibold text-gray-900">Telefone</th>
                <th className="px-6 py-3 text-left text-sm font-semibold text-gray-900">Departamento</th>
                <th className="px-6 py-3 text-left text-sm font-semibold text-gray-900">Cargo</th>
                <th className="px-6 py-3 text-right text-sm font-semibold text-gray-900">Ações</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {filtrados.map((responsavel) => (
                <tr key={responsavel.id} className="hover:bg-gray-50">
                  <td className="px-6 py-4 text-sm text-gray-900 font-medium">{responsavel.nome}</td>
                  <td className="px-6 py-4 text-sm text-gray-600">{responsavel.email}</td>
                  <td className="px-6 py-4 text-sm text-gray-600">{responsavel.telefone ?? '-'}</td>
                  <td className="px-6 py-4 text-sm text-gray-600">{responsavel.departamento ?? '-'}</td>
                  <td className="px-6 py-4 text-sm text-gray-600">{responsavel.cargo ?? '-'}</td>
                  <td className="px-6 py-4">
                    <div className="flex justify-end gap-2">
                      <Link
                        href={`/responsaveis/editar/${responsavel.id}`}
                        className="p-2 text-blue-600 hover:bg-blue-50 rounded-lg"
                      >
                        <Edit2 size={18} />
                      </Link>
                      <button
                        onClick={() => handleDelete(responsavel.id)}
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
                  <td colSpan={6} className="px-6 py-8 text-center text-gray-500">
                    Nenhum responsável encontrado.
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
