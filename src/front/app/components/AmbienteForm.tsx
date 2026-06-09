"use client";

import { ArrowLeft, Save } from "lucide-react";
import Link from "next/link";
import { useParams, useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { API_URL } from "../lib/api";

type Responsavel = { id: number; nome: string };

export default function AmbienteForm() {
  const { id } = useParams();
  const router = useRouter();
  const isEdit = !!id;

  const [nome, setNome] = useState("");
  const [bloco, setBloco] = useState("");
  const [andar, setAndar] = useState("");
  const [responsavelId, setResponsavelId] = useState("");
  const [responsaveis, setResponsaveis] = useState<Responsavel[]>([]);
  const [loading, setLoading] = useState(false);
  const [erro, setErro] = useState<string | null>(null);

  useEffect(() => {
    fetch(`${API_URL}/responsaveis`)
      .then((r) => r.json())
      .then(setResponsaveis)
      .catch(() => {});
  }, []);

  useEffect(() => {
    if (!isEdit) return;
    fetch(`${API_URL}/ambientes/${id}`)
      .then((r) => r.json())
      .then((data) => {
        setNome(data.nome ?? "");
        setBloco(data.bloco ?? "");
        setAndar(data.andar ?? "");
        setResponsavelId(
          data.responsavel_id ? String(data.responsavel_id) : "",
        );
      })
      .catch(() => setErro("Erro ao carregar ambiente"));
  }, [id, isEdit]);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setErro(null);

    if (!nome.trim()) {
      setErro("Nome é obrigatório");
      return;
    }

    if (!responsavelId) {
      setErro("Responsável é obrigatório");
      return;
    }

    setLoading(true);
    const body = {
      nome: nome.trim(),
      bloco: bloco.trim() || null,
      andar: andar.trim() || null,
      responsavel_id: responsavelId ? Number(responsavelId) : null,
    };

    try {
      const url = isEdit ? `${API_URL}/ambientes/${id}` : `${API_URL}/ambientes`;
      const method = isEdit ? "PUT" : "POST";
      const res = await fetch(url, {
        method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(body),
      });
      if (!res.ok) {
        const data = await res.json().catch(() => ({}));
        throw new Error(data.error ?? "Erro ao salvar");
      }
      router.push("/ambientes");
    } catch (err: unknown) {
      setErro(err instanceof Error ? err.message : "Erro ao salvar");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-4">
        <Link href="/ambientes" className="p-2 hover:bg-gray-100 rounded-lg">
          <ArrowLeft size={20} />
        </Link>
        <div>
          <h1 className="text-2xl font-bold text-gray-900">
            {isEdit ? "Editar Ambiente" : "Novo Ambiente"}
          </h1>
          <p className="text-gray-600">Preencha os dados do ambiente</p>
        </div>
      </div>

      <div className="bg-white border border-gray-200 rounded-lg p-6">
        {erro && <p className="text-red-600 mb-4">{erro}</p>}
        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <h2 className="text-lg font-semibold text-gray-900 mb-4">
              Informações Básicas
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Nome do Ambiente *
                </label>
                <input
                  type="text"
                  placeholder="Ex: Sala 201"
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg"
                  value={nome}
                  onChange={(e) => setNome(e.target.value)}
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Bloco
                </label>
                <input
                  type="text"
                  placeholder="Ex: Bloco A"
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg"
                  value={bloco}
                  onChange={(e) => setBloco(e.target.value)}
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Andar/Localização
                </label>
                <input
                  type="text"
                  placeholder="Ex: 2º Andar"
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg"
                  value={andar}
                  onChange={(e) => setAndar(e.target.value)}
                />
              </div>
            </div>
          </div>

          <div>
            <h2 className="text-lg font-semibold text-gray-900 mb-4">
              Responsável
            </h2>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Responsável pelo Ambiente *
              </label>
              <select
                className="w-full px-4 py-2 border border-gray-300 rounded-lg"
                value={responsavelId}
                onChange={(e) => setResponsavelId(e.target.value)}
                required
              >
                <option value="">Selecione...</option>
                {responsaveis.map((r) => (
                  <option key={r.id} value={r.id}>
                    {r.nome}
                  </option>
                ))}
              </select>
            </div>
          </div>

          <div className="flex gap-4 pt-4 border-t border-gray-200">
            <button
              type="submit"
              disabled={loading}
              className="flex items-center gap-2 px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:opacity-50"
            >
              <Save size={20} />
              {loading
                ? "Salvando..."
                : isEdit
                  ? "Salvar Alterações"
                  : "Cadastrar Ambiente"}
            </button>
            <Link
              href="/ambientes"
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
