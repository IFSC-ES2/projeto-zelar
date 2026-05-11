import { Plus, Search, Edit2, Trash2 } from 'lucide-react';
import Link from 'next/link';

export default function TiposMaterialList() {
  const tipos = [
    { id: 1, nome: 'Informática', descricao: 'Equipamentos de informática e tecnologia', patrimonios: 85 },
    { id: 2, nome: 'Mobiliário', descricao: 'Móveis e equipamentos de escritório', patrimonios: 120 },
    { id: 3, nome: 'Eletrônicos', descricao: 'Equipamentos eletrônicos diversos', patrimonios: 43 },
  ];

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold text-gray-900 mb-2">Tipos de Material</h1>
          <p className="text-gray-600">Gerencie as categorias de patrimônios</p>
        </div>
        <Link href="/tipos-material/novo" className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700">
          <Plus size={20} />
          Novo Tipo
        </Link>
      </div>

      <div className="bg-white border border-gray-200 rounded-lg p-4">
        <div className="flex gap-4">
          <div className="flex-1 relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
            <input type="text" placeholder="Buscar por nome ou descrição..." className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg" />
          </div>
          <button className="px-4 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200">Filtrar</button>
        </div>
      </div>

      <div className="bg-white border border-gray-200 rounded-lg overflow-hidden">
        <table className="w-full">
          <thead className="bg-gray-50 border-b border-gray-200">
            <tr>
              <th className="px-6 py-3 text-left text-sm font-semibold text-gray-900">Nome</th>
              <th className="px-6 py-3 text-left text-sm font-semibold text-gray-900">Descrição</th>
              <th className="px-6 py-3 text-left text-sm font-semibold text-gray-900">Patrimônios</th>
              <th className="px-6 py-3 text-right text-sm font-semibold text-gray-900">Ações</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200">
            {tipos.map((tipo) => (
              <tr key={tipo.id} className="hover:bg-gray-50">
                <td className="px-6 py-4 text-sm text-gray-900 font-medium">{tipo.nome}</td>
                <td className="px-6 py-4 text-sm text-gray-600">{tipo.descricao}</td>
                <td className="px-6 py-4">
                  <span className="inline-flex px-2 py-1 text-xs rounded-full bg-green-50 text-green-600">
                    {tipo.patrimonios} itens
                  </span>
                </td>
                <td className="px-6 py-4">
                  <div className="flex justify-end gap-2">
                    <Link href={`/tipos-material/editar/${tipo.id}`} className="p-2 text-blue-600 hover:bg-blue-50 rounded-lg">
                      <Edit2 size={18} />
                    </Link>
                    <button className="p-2 text-red-600 hover:bg-red-50 rounded-lg">
                      <Trash2 size={18} />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
