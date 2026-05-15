"use client";

import { ArrowLeft, Save } from "lucide-react";
import Link from "next/link";
import { useParams, useRouter } from "next/navigation";
import { useEffect, useState } from "react";

const API = process.env.NEXT_PUBLIC_API_URL;

export default function TipoMaterialForm() {
  const { id } = useParams();
  const isEdit = !!id;
  const router = useRouter();

  const [nome, setNome] = useState("");
  const [descricao, setDescricao] = useState("");
  const [loading, setLoading] = useState(false);
  const [erro, setErro] = useState<string | null>(null);

  useEffect(() => {
    if (!isEdit) return;

    fetch(`${API}/tipo-material/${id}`)
      .then((res) => res.json())
      .then((data) => {
        setNome(data.nome ?? "");
        setDescricao(data.descricao ?? "");
      })
      .catch((err) => setErro(err.message));
  }, [id, isEdit]);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setErro(null);

    if (!nome.trim()) {
      setErro("Nome é obrigatório");
      return;
    }

    setLoading(true);

    const body = {
      nome: nome.trim(),
      descricao: descricao.trim() || null,
    };

    try {
      const url = isEdit
        ? `${API}/tipo-material/${id}`
        : `${API}/tipo-material`;

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

      router.push("/tipos-material");
    } catch (err: unknown) {
      setErro(err instanceof Error ? err.message : "Erro ao salvar");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-4">
        <Link
          href="/tipos-material"
          className="p-2 hover:bg-gray-100 rounded-lg"
        >
          <ArrowLeft size={20} />
        </Link>
        <div>
          <h1 className="text-2xl font-bold text-gray-900">
            {isEdit ? "Editar Tipo de Material" : "Novo Tipo de Material"}
          </h1>
          <p className="text-gray-600">Preencha os dados do tipo de material</p>
        </div>
      </div>

      <div className="bg-white border border-gray-200 rounded-lg p-6">
        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <h2 className="text-lg font-semibold text-gray-900 mb-4">
              Informações do Tipo
            </h2>
            <div className="grid grid-cols-1 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Nome do Tipo *
                </label>
                <input
                  type="text"
                  value={nome}
                  onChange={(e) => setNome(e.target.value)}
                  placeholder="Ex: Informática"
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Descrição
                </label>
                <textarea
                  rows={3}
                  value={descricao}
                  onChange={(e) => setDescricao(e.target.value)}
                  placeholder="Descrição do tipo de material..."
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg"
                ></textarea>
              </div>
            </div>
          </div>

          <div className="flex gap-4 pt-4 border-t border-gray-200">
            <button
              type="submit"
              className="flex items-center gap-2 px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
            >
              <Save size={20} />
              {isEdit ? "Salvar Alterações" : "Cadastrar Tipo"}
            </button>
            <Link
              href="/tipos-material"
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
