"use client";

import { useEffect, useState } from "react";
import { Plus, Search, Edit2, Trash2 } from "lucide-react";
import { useToast } from "./Toast";
import Link from "next/link";
import { API_URL } from "../lib/api";

type TipoMaterial = {
  id: number;
  nome: string;
};

export default function TiposMaterialList() {
  const [tipos, setTipos] = useState<TipoMaterial[]>([]);
  const [busca, setBusca] = useState("");
  const [loading, setLoading] = useState(true);
  const [erro, setErro] = useState<string | null>(null);
  const { toast } = useToast();

  useEffect(() => {
    fetch(`${API_URL}/tipo-material`)
      .then((r) => r.json())
      .then(setTipos)
      .catch(() => setErro("Erro ao carregar tipos de material"))
      .finally(() => setLoading(false));
  }, []);

  async function handleDelete(id: number) {
    if (!confirm("Confirmar exclusão do tipo de material?")) return;
    try {
      const res = await fetch(`${API_URL}/tipo-material/${id}`, {
        method: "DELETE",
      });
      if (res.status === 409) {
        const data = await res.json().catch(() => ({}));
        const lista =
          (
            data.patrimonios as
              | { numero_patrimonio: string; descricao: string }[]
              | undefined
          )
            ?.map((p) => `• ${p.numero_patrimonio} — ${p.descricao}`)
            .join("\n") ?? "";
        toast(`${data.error}\n\n${lista}`, "error");
        return;
      }
      if (!res.ok) {
        const data = await res.json().catch(() => ({}));
        toast(data.error ?? "Erro ao excluir tipo de material", "error");
        return;
      }
      setTipos((prev) => prev.filter((t) => t.id !== id));
      toast("Tipo de material excluído com sucesso", "success");
    } catch {
      toast("Erro ao excluir tipo de material", "error");
    }
  }

  const filtrados = tipos.filter((t) =>
    t.nome.toLowerCase().includes(busca.toLowerCase()),
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
          <h1 className="text-2xl font-bold text-gray-900 mb-2">
            Tipos de Material
          </h1>
          <p className="text-gray-600">Gerencie os tipos de material</p>
        </div>
        <Link
          href="/tipos-material/novo"
          className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
        >
          <Plus size={20} />
          Novo Tipo
        </Link>
      </div>

      <div className="bg-white border border-gray-200 rounded-lg p-4">
        <div className="flex-1 relative">
          <Search
            className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400"
            size={20}
          />
          <input
            type="text"
            placeholder="Buscar por nome..."
            className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg"
            value={busca}
            onChange={(e) => setBusca(e.target.value)}
          />
        </div>
      </div>

      <div className="bg-white border border-gray-200 rounded-lg overflow-hidden">
        <table className="w-full">
          <thead className="bg-gray-50 border-b border-gray-200">
            <tr>
              <th className="px-6 py-3 text-left text-sm font-semibold text-gray-900">
                Nome
              </th>
              <th className="px-6 py-3 text-right text-sm font-semibold text-gray-900">
                Ações
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200">
            {filtrados.length === 0 ? (
              <tr>
                <td colSpan={2} className="px-6 py-8 text-center text-gray-500">
                  Nenhum tipo de material encontrado
                </td>
              </tr>
            ) : (
              filtrados.map((tipo) => (
                <tr key={tipo.id} className="hover:bg-gray-50">
                  <td className="px-6 py-4 text-sm text-gray-900 font-medium">
                    {tipo.nome}
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex justify-end gap-2">
                      <Link
                        href={`/tipos-material/editar/${tipo.id}`}
                        className="p-2 text-blue-600 hover:bg-blue-50 rounded-lg"
                      >
                        <Edit2 size={16} />
                      </Link>
                      <button
                        onClick={() => handleDelete(tipo.id)}
                        className="p-2 text-red-600 hover:bg-red-50 rounded-lg"
                      >
                        <Trash2 size={16} />
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
