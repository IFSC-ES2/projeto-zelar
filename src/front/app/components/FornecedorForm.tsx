'use client'

import { ArrowLeft, Save } from 'lucide-react';
import Link from 'next/link';
import { useParams, useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import { API_URL } from '../lib/api';

export default function FornecedorForm() {
  const { id } = useParams();
  const router = useRouter();
  const isEdit = !!id;

  const [nome, setNome] = useState('');
  const [cnpj, setCnpj] = useState('');
  const [email, setEmail] = useState('');
  const [telefone, setTelefone] = useState('');
  const [loading, setLoading] = useState(false);
  const [erro, setErro] = useState<string | null>(null);

  useEffect(() => {
    if (!isEdit) return;
    fetch(`${API_URL}/fornecedores/${id}`)
      .then(r => r.json())
      .then(data => {
        setNome(data.nome ?? '');
        setCnpj(data.cnpj ?? '');
        setEmail(data.email ?? '');
        setTelefone(data.telefone ?? '');
      })
      .catch(() => setErro('Erro ao carregar fornecedor'));
  }, [id, isEdit]);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setErro(null);

    if (!nome.trim()) {
      setErro('Nome e obrigatorio');
      return;
    }
    if (!cnpj.trim()) {
      setErro('CNPJ e obrigatorio');
      return;
    }

    setLoading(true);
    const body = {
      nome: nome.trim(),
      cnpj: cnpj.trim(),
      email: email.trim() || null,
      telefone: telefone.trim() || null,
    };

    try {
      const url = isEdit ? `${API_URL}/fornecedores/${id}` : `${API_URL}/fornecedores`;
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
      router.push('/fornecedores');
    } catch (err: unknown) {
      setErro(err instanceof Error ? err.message : 'Erro ao salvar');
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-4">
        <Link href="/fornecedores" className="p-2 hover:bg-gray-100 rounded-lg">
          <ArrowLeft size={20} />
        </Link>
        <div>
          <h1 className="text-2xl font-bold text-gray-900">{isEdit ? 'Editar Fornecedor' : 'Novo Fornecedor'}</h1>
          <p className="text-gray-600">Preencha os dados do fornecedor</p>
        </div>
      </div>

      <div className="bg-white border border-gray-200 rounded-lg p-6">
        {erro && <p className="text-red-600 mb-4">{erro}</p>}
        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <h2 className="text-lg font-semibold text-gray-900 mb-4">Dados da Empresa</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Nome *</label>
                <input
                  type="text"
                  placeholder="Ex: Fornecedor A Ltda"
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg"
                  value={nome}
                  onChange={e => setNome(e.target.value)}
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">CNPJ *</label>
                <input
                  type="text"
                  placeholder="00.000.000/0000-00"
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg"
                  value={cnpj}
                  onChange={e => setCnpj(e.target.value)}
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Email</label>
                <input
                  type="email"
                  placeholder="contato@fornecedor.com"
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg"
                  value={email}
                  onChange={e => setEmail(e.target.value)}
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Telefone</label>
                <input
                  type="tel"
                  placeholder="(11) 3000-0000"
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg"
                  value={telefone}
                  onChange={e => setTelefone(e.target.value)}
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
              {loading ? 'Salvando...' : isEdit ? 'Salvar Alteracoes' : 'Cadastrar Fornecedor'}
            </button>
            <Link href="/fornecedores" className="px-6 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200">Cancelar</Link>
          </div>
        </form>
      </div>
    </div>
  );
}
