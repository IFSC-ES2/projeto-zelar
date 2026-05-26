'use client'

import { useEffect, useState } from 'react';
import { Plus, Search, Edit2, Trash2 } from 'lucide-react';
import Link from 'next/link';
import { useToast } from './Toast';

const API = process.env.NEXT_PUBLIC_API_URL;

type Conferente = {
  id: number;
  nome: string;
  email: string;
  cargo: string | null;
  telefone: string | null;
};

export default function ConferentesList() {
  const [conferentes, setConferentes] = useState<Conferente[]>([]);
  const [busca, setBusca] = useState('');
  const [loading, setLoading] = useState(true);
  const [erro, setErro] = useState<string | null>(null);
  const { toast } = useToast();

  useEffect(() => {
    fetch(`${API}/conferentes`)
      .then(r => r.json())
      .then(setConferentes)
      .catch(() => setErro('Erro ao carregar conferentes'))
      .finally(() => setLoading(false));
  }, []);

  async function handleDelete(id: number) {
    if (!confirm('Confirmar exclusao do conferente?')) return;

    try {
      const res = await fetch(`${API}/conferentes/${id}`, { method: 'DELETE' });
      if (!res.ok) {
        const data = await res.json().catch(() => ({}));
        toast(data.error ?? 'Erro ao excluir conferente', 'error');
        return;
      }

      setConferentes(prev => prev.filter(conferente => conferente.id !== id));
      toast('Conferente excluido com sucesso', 'success');
    } catch {
      toast('Erro ao excluir conferente', 'error');
    }
  }

  const filtrados = conferentes.filter(conferente =>
    conferente.nome.toLowerCase().includes(busca.toLowerCase()) ||
    conferente.email.toLowerCase().includes(busca.toLowerCase()) ||
    (conferente.cargo ?? '').toLowerCase().includes(busca.toLowerCase()) ||
    (conferente.telefone ?? '').toLowerCase().includes(busca.toLowerCase())
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
          <h1 className="text-2xl font-bold text-gray-900 mb-2">Conferentes</h1>
          <p className="text-gray-600">Gerencie os conferentes responsaveis pela verificacao</p>
        </div>
        <Link href="/conferentes/novo" className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700">
          <Plus size={20} />
          Novo Conferente
        </Link>
      </div>

      <div className="bg-white border border-gray-200 rounded-lg p-4">
        <div className="flex-1 relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
          <input
            type="text"
            placeholder="Buscar por nome, email, cargo..."
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
              <th className="px-6 py-3 text-left text-sm font-semibold text-gray-900">Email</th>
              <th className="px-6 py-3 text-left text-sm font-semibold text-gray-900">Telefone</th>
              <th className="px-6 py-3 text-left text-sm font-semibold text-gray-900">Cargo</th>
              <th className="px-6 py-3 text-right text-sm font-semibold text-gray-900">Acoes</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200">
            {filtrados.length === 0 ? (
              <tr>
                <td colSpan={5} className="px-6 py-8 text-center text-gray-500">
                  Nenhum conferente encontrado.
                </td>
              </tr>
            ) : (
              filtrados.map((conferente) => (
                <tr key={conferente.id} className="hover:bg-gray-50">
                  <td className="px-6 py-4 text-sm text-gray-900 font-medium">{conferente.nome}</td>
                  <td className="px-6 py-4 text-sm text-gray-600">{conferente.email}</td>
                  <td className="px-6 py-4 text-sm text-gray-600">{conferente.telefone ?? '-'}</td>
                  <td className="px-6 py-4 text-sm text-gray-600">{conferente.cargo ?? '-'}</td>
                  <td className="px-6 py-4">
                    <div className="flex justify-end gap-2">
                      <Link href={`/conferentes/editar/${conferente.id}`} className="p-2 text-blue-600 hover:bg-blue-50 rounded-lg">
                        <Edit2 size={18} />
                      </Link>
                      <button
                        onClick={() => handleDelete(conferente.id)}
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
