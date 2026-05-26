"use client";

import { ArrowLeft, Save } from "lucide-react";
import Link from "next/link";
import { useParams, useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { useToast } from "./Toast";
import { API_URL } from "../lib/api";

export default function TipoMaterialForm() {
  const { id } = useParams();
  const router = useRouter();
  const isEdit = !!id;
  const { toast } = useToast();

  const [nome, setNome] = useState("");
  const [loading, setLoading] = useState(false);
  const [erro, setErro] = useState<string | null>(null);

  useEffect(() => {
    if (!isEdit) return;
    fetch(`${API_URL}/tipo-material/${id}`)
      .then((r) => r.json())
      .then((data) => {
        setNome(data.nome ?? "");
      })
      .catch(() => setErro("Erro ao carregar tipo de material"));
  }, [id, isEdit]);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setErro(null);

    if (!nome.trim()) {
      setErro("Nome é obrigatório");
      return;
    }

    setLoading(true);
    const body = { nome: nome.trim() };

    try {
      const url = isEdit
        ? `${API_URL}/tipo-material/${id}`
        : `${API_URL}/tipo-material`;
      const method = isEdit ? "PUT" : "POST";
      const res = await fetch(url, {
        method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(body),
      });
      if (!res.ok) {
        if (res.status === 409) {
          setErro("Já existe um tipo de material com esse nome");
          return;
        }
        const data = await res.json().catch(() => ({}));
        throw new Error(data.error ?? "Erro ao salvar");
      }
      toast(
        isEdit
          ? "Tipo de material atualizado com sucesso"
          : "Tipo de material cadastrado com sucesso",
        "success",
      );
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
        {erro && <p className="text-red-600 mb-4">{erro}</p>}
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
                  : "Cadastrar Tipo"}
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
