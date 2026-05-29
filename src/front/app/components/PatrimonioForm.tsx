'use client'

import { ArrowLeft, Save } from 'lucide-react';
import Link from 'next/link';
import { useParams, useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import { API_URL } from '../lib/api';

type Opcao = { id: number; nome: string };

export default function PatrimonioForm() {
  const { id } = useParams();
  const router = useRouter();
  const isEdit = !!id;

  const [numeroPatrimonio, setNumeroPatrimonio] = useState('');
  const [descricao, setDescricao] = useState('');
  const [valor, setValor] = useState('');
  const [observacoes, setObservacoes] = useState('');
  const [tipoMaterialId, setTipoMaterialId] = useState('');
  const [estadoItemId, setEstadoItemId] = useState('');
  const [ambienteId, setAmbienteId] = useState('');
  const [responsavelId, setResponsavelId] = useState('');
  const [fornecedorId, setFornecedorId] = useState('');

  const [tiposMaterial, setTiposMaterial] = useState<Opcao[]>([]);
  const [estadosItem, setEstadosItem] = useState<Opcao[]>([]);
  const [ambientes, setAmbientes] = useState<Opcao[]>([]);
  const [responsaveis, setResponsaveis] = useState<Opcao[]>([]);
  const [fornecedores, setFornecedores] = useState<Opcao[]>([]);

  const [loading, setLoading] = useState(false);
  const [erro, setErro] = useState<string | null>(null);

  useEffect(() => {
    fetch(`${API_URL}/tipo-material`).then(r => r.json()).then(setTiposMaterial).catch(() => {});
    fetch(`${API_URL}/estados-item`).then(r => r.json()).then(setEstadosItem).catch(() => {});
    fetch(`${API_URL}/ambientes`).then(r => r.json()).then(setAmbientes).catch(() => {});
    fetch(`${API_URL}/responsaveis`).then(r => r.json()).then(setResponsaveis).catch(() => {});
    fetch(`${API_URL}/fornecedores`).then(r => r.json()).then(setFornecedores).catch(() => {});
  }, []);

  useEffect(() => {
    if (!isEdit) return;
    fetch(`${API_URL}/patrimonios/${id}`)
      .then(r => r.json())
      .then(data => {
        setNumeroPatrimonio(data.numero_patrimonio ?? '');
        setDescricao(data.descricao ?? '');
        setValor(data.valor != null ? String(data.valor) : '');
        setObservacoes(data.observacoes ?? '');
        setTipoMaterialId(data.tipo_material_id ? String(data.tipo_material_id) : '');
        setEstadoItemId(data.estado_item_id ? String(data.estado_item_id) : '');
        setAmbienteId(data.ambiente_id ? String(data.ambiente_id) : '');
        setResponsavelId(data.responsavel_id ? String(data.responsavel_id) : '');
        setFornecedorId(data.fornecedor_id ? String(data.fornecedor_id) : '');
      })
      .catch(() => setErro('Erro ao carregar patrimonio'));
  }, [id, isEdit]);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setErro(null);

    if (!numeroPatrimonio.trim()) {
      setErro('Numero do patrimonio e obrigatorio');
      return;
    }
    if (!descricao.trim()) {
      setErro('Descricao e obrigatoria');
      return;
    }
    if (valor.trim() === '' || isNaN(Number(valor)) || Number(valor) < 0) {
      setErro('Valor e obrigatorio e deve ser um numero nao negativo');
      return;
    }
    if (!tipoMaterialId) {
      setErro('Tipo de material e obrigatorio');
      return;
    }
    if (!estadoItemId) {
      setErro('Estado do item e obrigatorio');
      return;
    }
    if (!ambienteId) {
      setErro('Ambiente e obrigatorio');
      return;
    }
    if (!responsavelId) {
      setErro('Responsavel e obrigatorio');
      return;
    }

    setLoading(true);
    const body = {
      numero_patrimonio: numeroPatrimonio.trim(),
      descricao: descricao.trim(),
      valor: Number(valor),
      observacoes: observacoes.trim() || null,
      tipo_material_id: Number(tipoMaterialId),
      estado_item_id: Number(estadoItemId),
      ambiente_id: Number(ambienteId),
      responsavel_id: Number(responsavelId),
      fornecedor_id: fornecedorId ? Number(fornecedorId) : null,
    };

    try {
      const url = isEdit ? `${API_URL}/patrimonios/${id}` : `${API_URL}/patrimonios`;
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
      router.push('/patrimonios');
    } catch (err: unknown) {
      setErro(err instanceof Error ? err.message : 'Erro ao salvar');
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-4">
        <Link href="/patrimonios" className="p-2 hover:bg-gray-100 rounded-lg">
          <ArrowLeft size={20} />
        </Link>
        <div>
          <h1 className="text-2xl font-bold text-gray-900">
            {isEdit ? 'Editar Patrimônio' : 'Novo Patrimônio'}
          </h1>
          <p className="text-gray-600">Preencha os dados do patrimônio</p>
        </div>
      </div>

      <div className="bg-white border border-gray-200 rounded-lg p-6">
        {erro && <p className="text-red-600 mb-4">{erro}</p>}
        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <h2 className="text-lg font-semibold text-gray-900 mb-4">Informações Básicas</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Número do Patrimônio *
                </label>
                <input
                  type="text"
                  placeholder="Ex: 1234"
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg"
                  value={numeroPatrimonio}
                  onChange={e => setNumeroPatrimonio(e.target.value)}
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Tipo de Material *
                </label>
                <select
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg"
                  value={tipoMaterialId}
                  onChange={e => setTipoMaterialId(e.target.value)}
                  required
                >
                  <option value="">Selecione...</option>
                  {tiposMaterial.map(t => (
                    <option key={t.id} value={t.id}>{t.nome}</option>
                  ))}
                </select>
              </div>
              <div className="md:col-span-2">
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Descrição *
                </label>
                <input
                  type="text"
                  placeholder="Ex: Notebook Dell Latitude 5420"
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg"
                  value={descricao}
                  onChange={e => setDescricao(e.target.value)}
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Valor (R$) *
                </label>
                <input
                  type="number"
                  step="0.01"
                  min="0"
                  placeholder="Ex: 3500.00"
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg"
                  value={valor}
                  onChange={e => setValor(e.target.value)}
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Estado do Item *
                </label>
                <select
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg"
                  value={estadoItemId}
                  onChange={e => setEstadoItemId(e.target.value)}
                  required
                >
                  <option value="">Selecione...</option>
                  {estadosItem.map(es => (
                    <option key={es.id} value={es.id}>{es.nome}</option>
                  ))}
                </select>
              </div>
            </div>
          </div>

          <div>
            <h2 className="text-lg font-semibold text-gray-900 mb-4">Fornecedor</h2>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Fornecedor
              </label>
              <select
                className="w-full px-4 py-2 border border-gray-300 rounded-lg"
                value={fornecedorId}
                onChange={e => setFornecedorId(e.target.value)}
              >
                <option value="">Selecione...</option>
                {fornecedores.map(f => (
                  <option key={f.id} value={f.id}>{f.nome}</option>
                ))}
              </select>
            </div>
          </div>

          <div>
            <h2 className="text-lg font-semibold text-gray-900 mb-4">Alocação</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Ambiente *
                </label>
                <select
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg"
                  value={ambienteId}
                  onChange={e => setAmbienteId(e.target.value)}
                  required
                >
                  <option value="">Selecione...</option>
                  {ambientes.map(a => (
                    <option key={a.id} value={a.id}>{a.nome}</option>
                  ))}
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Responsável *
                </label>
                <select
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg"
                  value={responsavelId}
                  onChange={e => setResponsavelId(e.target.value)}
                  required
                >
                  <option value="">Selecione...</option>
                  {responsaveis.map(r => (
                    <option key={r.id} value={r.id}>{r.nome}</option>
                  ))}
                </select>
              </div>
            </div>
          </div>

          <div>
            <h2 className="text-lg font-semibold text-gray-900 mb-4">Informações Adicionais</h2>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Observações
              </label>
              <textarea
                rows={4}
                placeholder="Informações adicionais sobre o patrimônio..."
                className="w-full px-4 py-2 border border-gray-300 rounded-lg"
                value={observacoes}
                onChange={e => setObservacoes(e.target.value)}
              ></textarea>
            </div>
          </div>

          <div className="flex gap-4 pt-4 border-t border-gray-200">
            <button
              type="submit"
              disabled={loading}
              className="flex items-center gap-2 px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:opacity-50"
            >
              <Save size={20} />
              {loading ? 'Salvando...' : isEdit ? 'Salvar Alterações' : 'Cadastrar Patrimônio'}
            </button>
            <Link
              href="/patrimonios"
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
