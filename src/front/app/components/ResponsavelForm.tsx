'use client'

import { ArrowLeft, Save } from 'lucide-react';
import Link from 'next/link';
import { useParams, useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import { API_URL } from '../lib/api';

export default function ResponsavelForm() {
  const { id } = useParams();
  const router = useRouter();
  const isEdit = !!id;

  const [nome, setNome] = useState('');
  const [email, setEmail] = useState('');
  const [cargo, setCargo] = useState('');
  const [departamento, setDepartamento] = useState('');
  const [telefone, setTelefone] = useState('');
  const [loading, setLoading] = useState(false);
  const [erro, setErro] = useState<string | null>(null);

  useEffect(() => {
    if (!isEdit) return;
    fetch(`${API_URL}/responsaveis/${id}`)
      .then(r => r.json())
      .then(data => {
        setNome(data.nome ?? '');
        setEmail(data.email ?? '');
        setCargo(data.cargo ?? '');
        setDepartamento(data.departamento ?? '');
        setTelefone(data.telefone ?? '');
      })
      .catch(() => setErro('Erro ao carregar responsável'));
  }, [id, isEdit]);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setErro(null);

    if (!nome.trim()) {
      setErro('Nome é obrigatório');
      return;
    }
    if (!email.trim()) {
      setErro('Email é obrigatório');
      return;
    }

    setLoading(true);
    const body = {
      nome: nome.trim(),
      email: email.trim(),
      cargo: cargo.trim() || null,
      departamento: departamento.trim() || null,
      telefone: telefone.trim() || null,
    };

    try {
      const url = isEdit ? `${API_URL}/responsaveis/${id}` : `${API_URL}/responsaveis`;
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
      router.push('/responsaveis');
    } catch (err: unknown) {
      setErro(err instanceof Error ? err.message : 'Erro ao salvar');
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-4">
        <Link href="/responsaveis" className="p-2 hover:bg-gray-100 rounded-lg">
          <ArrowLeft size={20} />
        </Link>
        <div>
          <h1 className="text-2xl font-bold text-gray-900">
            {isEdit ? 'Editar Responsável' : 'Novo Responsável'}
          </h1>
          <p className="text-gray-600">Preencha os dados do responsável</p>
        </div>
      </div>

      <div className="bg-white border border-gray-200 rounded-lg p-6">
        {erro && <p className="text-red-600 mb-4">{erro}</p>}
        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <h2 className="text-lg font-semibold text-gray-900 mb-4">Informações Pessoais</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Nome Completo *
                </label>
                <input
                  type="text"
                  placeholder="Ex: João Silva"
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg"
                  value={nome}
                  onChange={e => setNome(e.target.value)}
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Email *
                </label>
                <input
                  type="email"
                  placeholder="joao.silva@empresa.com"
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg"
                  value={email}
                  onChange={e => setEmail(e.target.value)}
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Telefone
                </label>
                <input
                  type="tel"
                  placeholder="(11) 98765-4321"
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg"
                  value={telefone}
                  onChange={e => setTelefone(e.target.value)}
                />
              </div>
            </div>
          </div>

          <div>
            <h2 className="text-lg font-semibold text-gray-900 mb-4">Informações Profissionais</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Departamento
                </label>
                <input
                  type="text"
                  placeholder="Ex: TI"
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg"
                  value={departamento}
                  onChange={e => setDepartamento(e.target.value)}
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Cargo
                </label>
                <input
                  type="text"
                  placeholder="Ex: Gerente"
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
              {loading ? 'Salvando...' : isEdit ? 'Salvar Alterações' : 'Cadastrar Responsável'}
            </button>
            <Link
              href="/responsaveis"
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
