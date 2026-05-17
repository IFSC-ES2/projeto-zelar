'use client'

import { ArrowLeft, Save } from 'lucide-react';
import Link from 'next/link';
import { useParams, useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import { useToast } from './Toast';

const API = process.env.NEXT_PUBLIC_API_URL;

export default function ConferenteForm() {
  const { id } = useParams();
  const router = useRouter();
  const isEdit = !!id;
  const { toast } = useToast();

  const [nome, setNome] = useState('');
  const [email, setEmail] = useState('');
  const [cargo, setCargo] = useState('');
  const [telefone, setTelefone] = useState('');
  const [loading, setLoading] = useState(false);
  const [erro, setErro] = useState<string | null>(null);

  useEffect(() => {
    if (!isEdit) return;

    fetch(`${API}/conferentes/${id}`)
      .then(r => r.json())
      .then(data => {
        setNome(data.nome ?? '');
        setEmail(data.email ?? '');
        setCargo(data.cargo ?? '');
        setTelefone(data.telefone ?? '');
      })
      .catch(() => setErro('Erro ao carregar conferente'));
  }, [id, isEdit]);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setErro(null);

    if (!nome.trim()) {
      setErro('Nome e obrigatorio');
      return;
    }
    if (!email.trim()) {
      setErro('Email e obrigatorio');
      return;
    }

    setLoading(true);
    const body = {
      nome: nome.trim(),
      email: email.trim(),
      cargo: cargo.trim() || null,
      telefone: telefone.trim() || null,
    };

    try {
      const url = isEdit ? `${API}/conferentes/${id}` : `${API}/conferentes`;
      const method = isEdit ? 'PUT' : 'POST';
      const res = await fetch(url, {
        method,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(body),
      });

      if (!res.ok) {
        const data = await res.json().catch(() => ({}));
        throw new Error(data.error ?? 'Erro ao salvar');
      }

      toast(isEdit ? 'Conferente atualizado com sucesso' : 'Conferente cadastrado com sucesso', 'success');
      router.push('/conferentes');
    } catch (err: unknown) {
      setErro(err instanceof Error ? err.message : 'Erro ao salvar');
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-4">
        <Link href="/conferentes" className="p-2 hover:bg-gray-100 rounded-lg">
          <ArrowLeft size={20} />
        </Link>
        <div>
          <h1 className="text-2xl font-bold text-gray-900">{isEdit ? 'Editar Conferente' : 'Novo Conferente'}</h1>
          <p className="text-gray-600">Preencha os dados do conferente</p>
        </div>
      </div>

      <div className="bg-white border border-gray-200 rounded-lg p-6">
        {erro && <p className="text-red-600 mb-4">{erro}</p>}
        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <h2 className="text-lg font-semibold text-gray-900 mb-4">Informacoes do Conferente</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Nome Completo *</label>
                <input
                  type="text"
                  placeholder="Ex: Carlos Oliveira"
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg"
                  value={nome}
                  onChange={e => setNome(e.target.value)}
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Email *</label>
                <input
                  type="email"
                  placeholder="carlos.oliveira@empresa.com"
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg"
                  value={email}
                  onChange={e => setEmail(e.target.value)}
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Telefone</label>
                <input
                  type="tel"
                  placeholder="(11) 99876-5432"
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg"
                  value={telefone}
                  onChange={e => setTelefone(e.target.value)}
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Cargo</label>
                <input
                  type="text"
                  placeholder="Ex: Auditor"
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg"
                  value={cargo}
                  onChange={e => setCargo(e.target.value)}
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
              {loading ? 'Salvando...' : isEdit ? 'Salvar Alteracoes' : 'Cadastrar Conferente'}
            </button>
            <Link href="/conferentes" className="px-6 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200">Cancelar</Link>
          </div>
        </form>
      </div>
    </div>
  );
}
