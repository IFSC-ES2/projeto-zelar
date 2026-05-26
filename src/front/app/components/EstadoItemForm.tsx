'use client'

import { useEffect, useState } from 'react';
import { ArrowLeft, Save } from 'lucide-react';
import Link from 'next/link';
import { useParams, useRouter } from 'next/navigation';
import { useToast } from './Toast';

const API = process.env.NEXT_PUBLIC_API_URL;

export default function EstadoItemForm() {
  const { id } = useParams();
  const router = useRouter();
  const isEdit = !!id;
  const { toast } = useToast();

  const [nome, setNome] = useState('');
  const [descricao, setDescricao] = useState('');
  const [loading, setLoading] = useState(false);
  const [erro, setErro] = useState<string | null>(null);

  useEffect(() => {
    if (!isEdit) return;

    fetch(`${API}/estados-item/${id}`)
      .then(r => r.json())
      .then(data => {
        setNome(data.nome ?? '');
        setDescricao(data.descricao ?? '');
      })
      .catch(() => setErro('Erro ao carregar estado do item'));
  }, [id, isEdit]);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setErro(null);

    if (!nome.trim()) {
      setErro('Nome e obrigatorio');
      return;
    }

    setLoading(true);
    const body = {
      nome: nome.trim(),
      descricao: descricao.trim() || null,
    };

    try {
      const url = isEdit ? `${API}/estados-item/${id}` : `${API}/estados-item`;
      const method = isEdit ? 'PUT' : 'POST';
      const res = await fetch(url, {
        method,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(body),
      });

      if (!res.ok) {
        if (res.status === 409) {
          setErro('Ja existe um estado do item com esses dados');
          return;
        }
        const data = await res.json().catch(() => ({}));
        throw new Error(data.error ?? 'Erro ao salvar');
      }

      toast(isEdit ? 'Estado do item atualizado com sucesso' : 'Estado do item cadastrado com sucesso', 'success');
      router.push('/estados-item');
    } catch (err: unknown) {
      setErro(err instanceof Error ? err.message : 'Erro ao salvar');
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-4">
        <Link href="/estados-item" className="p-2 hover:bg-gray-100 rounded-lg">
          <ArrowLeft size={20} />
        </Link>
        <div>
          <h1 className="text-2xl font-bold text-gray-900">{isEdit ? 'Editar Estado do Item' : 'Novo Estado do Item'}</h1>
          <p className="text-gray-600">Preencha os dados do estado</p>
        </div>
      </div>

      <div className="bg-white border border-gray-200 rounded-lg p-6">
        {erro && <p className="text-red-600 mb-4">{erro}</p>}
        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <h2 className="text-lg font-semibold text-gray-900 mb-4">Informacoes do Estado</h2>
            <div className="grid grid-cols-1 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Nome do Estado *</label>
                <input
                  type="text"
                  placeholder="Ex: Ativo"
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg"
                  value={nome}
                  onChange={e => setNome(e.target.value)}
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Descricao</label>
                <textarea
                  rows={3}
                  placeholder="Descricao do estado..."
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg"
                  value={descricao}
                  onChange={e => setDescricao(e.target.value)}
                />
              </div>
            </div>
          </div>

          <div className="flex gap-4 pt-4 border-t border-gray-200">
            <button
              type="submit"
              disabled={loading}
              className="flex items-center gap-2 px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:opacity-50"
            >
              <Save size={20} />
              {loading ? 'Salvando...' : isEdit ? 'Salvar Alteracoes' : 'Cadastrar Estado'}
            </button>
            <Link href="/estados-item" className="px-6 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200">Cancelar</Link>
          </div>
        </form>
      </div>
    </div>
  );
}
