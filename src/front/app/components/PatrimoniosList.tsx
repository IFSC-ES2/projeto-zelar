'use client'

import { useEffect, useState } from 'react';
import { Plus, Search, Edit2, Trash2, AlertCircle } from 'lucide-react';
import { useToast } from './Toast';
import Link from 'next/link';
import { API_URL } from '../lib/api';

type Patrimonio = {
  id: number;
  numero_patrimonio: string;
  descricao: string;
  valor: number;
  tipo_material_id: number;
  estado_item_id: number;
  ambiente_id: number;
  responsavel_id: number;
  fornecedor_id: number | null;
};

type Opcao = { id: number; nome: string };

function mapaNomes(lista: Opcao[]): Record<number, string> {
  return Object.fromEntries(lista.map(o => [o.id, o.nome]));
}

export default function PatrimoniosList() {
  const [patrimonios, setPatrimonios] = useState<Patrimonio[]>([]);
  const [tipos, setTipos] = useState<Record<number, string>>({});
  const [ambientes, setAmbientes] = useState<Record<number, string>>({});
  const [responsaveis, setResponsaveis] = useState<Record<number, string>>({});
  const [estados, setEstados] = useState<Record<number, string>>({});
  const [busca, setBusca] = useState('');
  const [loading, setLoading] = useState(true);
  const [erro, setErro] = useState<string | null>(null);
  const { toast } = useToast();

  useEffect(() => {
    Promise.all([
      fetch(`${API_URL}/patrimonios`).then(r => r.json()),
      fetch(`${API_URL}/tipo-material`).then(r => r.json()),
      fetch(`${API_URL}/ambientes`).then(r => r.json()),
      fetch(`${API_URL}/responsaveis`).then(r => r.json()),
      fetch(`${API_URL}/estados-item`).then(r => r.json()),
    ])
      .then(([pats, tps, ambs, resps, ests]) => {
        setPatrimonios(pats);
        setTipos(mapaNomes(tps));
        setAmbientes(mapaNomes(ambs));
        setResponsaveis(mapaNomes(resps));
        setEstados(mapaNomes(ests));
      })
      .catch(() => setErro('Erro ao carregar patrimonios'))
      .finally(() => setLoading(false));
  }, []);

  async function handleDelete(id: number) {
    if (!confirm('Confirmar exclusao do patrimonio?')) return;

    try {
      const res = await fetch(`${API_URL}/patrimonios/${id}`, { method: 'DELETE' });
      if (!res.ok) {
        const data = await res.json().catch(() => ({}));
        toast(data.error ?? 'Erro ao excluir patrimonio', 'error');
        return;
      }
      setPatrimonios(prev => prev.filter(p => p.id !== id));
      toast('Patrimonio excluido com sucesso', 'success');
    } catch {
      toast('Erro ao excluir patrimonio', 'error');
    }
  }

  const filtrados = patrimonios.filter(p => {
    const termo = busca.toLowerCase();
    return (
      p.numero_patrimonio.toLowerCase().includes(termo) ||
      p.descricao.toLowerCase().includes(termo) ||
      (ambientes[p.ambiente_id] ?? '').toLowerCase().includes(termo) ||
      (responsaveis[p.responsavel_id] ?? '').toLowerCase().includes(termo)
    );
  });

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold text-gray-900 mb-2">Patrimônios</h1>
          <p className="text-gray-600">Gerencie todos os patrimônios da empresa</p>
        </div>
        <Link
          href="/patrimonios/novo"
          className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
        >
          <Plus size={20} />
          Novo Patrimônio
        </Link>
      </div>

      <div className="bg-white border border-gray-200 rounded-lg p-4">
        <div className="flex-1 relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
          <input
            type="text"
            placeholder="Buscar por número, descrição, ambiente ou responsável..."
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
                <th className="px-6 py-3 text-left text-sm font-semibold text-gray-900">Número</th>
                <th className="px-6 py-3 text-left text-sm font-semibold text-gray-900">Descrição</th>
                <th className="px-6 py-3 text-left text-sm font-semibold text-gray-900">Tipo</th>
                <th className="px-6 py-3 text-left text-sm font-semibold text-gray-900">Ambiente</th>
                <th className="px-6 py-3 text-left text-sm font-semibold text-gray-900">Responsável</th>
                <th className="px-6 py-3 text-left text-sm font-semibold text-gray-900">Estado</th>
                <th className="px-6 py-3 text-right text-sm font-semibold text-gray-900">Ações</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {filtrados.map((patrimonio) => (
                <tr key={patrimonio.id} className="hover:bg-gray-50">
                  <td className="px-6 py-4 text-sm text-gray-900">#{patrimonio.numero_patrimonio}</td>
                  <td className="px-6 py-4 text-sm text-gray-900">{patrimonio.descricao}</td>
                  <td className="px-6 py-4 text-sm text-gray-600">{tipos[patrimonio.tipo_material_id] ?? '-'}</td>
                  <td className="px-6 py-4 text-sm text-gray-600">{ambientes[patrimonio.ambiente_id] ?? '-'}</td>
                  <td className="px-6 py-4 text-sm text-gray-600">{responsaveis[patrimonio.responsavel_id] ?? '-'}</td>
                  <td className="px-6 py-4">
                    <span className="inline-flex px-2 py-1 text-xs rounded-full text-gray-600 bg-gray-100">
                      {estados[patrimonio.estado_item_id] ?? '-'}
                    </span>
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex justify-end gap-2">
                      <Link
                        href={`/patrimonios/estado/${patrimonio.id}`}
                        className="p-2 text-orange-600 hover:bg-orange-50 rounded-lg"
                        title="Registrar Estado"
                      >
                        <AlertCircle size={18} />
                      </Link>
                      <Link
                        href={`/patrimonios/editar/${patrimonio.id}`}
                        className="p-2 text-blue-600 hover:bg-blue-50 rounded-lg"
                      >
                        <Edit2 size={18} />
                      </Link>
                      <button
                        onClick={() => handleDelete(patrimonio.id)}
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
                  <td colSpan={7} className="px-6 py-8 text-center text-gray-500">
                    Nenhum patrimônio encontrado.
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
