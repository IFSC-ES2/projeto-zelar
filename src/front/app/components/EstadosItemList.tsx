import { Plus, Search, Edit2, Trash2 } from 'lucide-react';
import Link from 'next/link';

export default function EstadosItemList() {
  const estados = [
    { id: 1, nome: 'Ativo', descricao: 'Item em pleno funcionamento', cor: 'bg-green-100 text-green-800', patrimonios: 185 },
    { id: 2, nome: 'Em Manutenção', descricao: 'Item em processo de manutenção', cor: 'bg-orange-100 text-orange-800', patrimonios: 12 },
    { id: 3, nome: 'Avariado', descricao: 'Item com problemas, necessita reparo', cor: 'bg-red-100 text-red-800', patrimonios: 8 },
    { id: 4, nome: 'Inativo', descricao: 'Item fora de uso temporariamente', cor: 'bg-gray-100 text-gray-800', patrimonios: 35 },
    { id: 5, nome: 'Descartado', descricao: 'Item descartado ou inutilizado', cor: 'bg-gray-200 text-gray-600', patrimonios: 8 },
  ];

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold text-gray-900 mb-2">Estados do Item</h1>
          <p className="text-gray-600">Gerencie os possíveis estados dos patrimônios</p>
        </div>
        <Link href="/estados-item/novo" className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700">
          <Plus size={20} />
          Novo Estado
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
            {estados.map((estado) => (
              <tr key={estado.id} className="hover:bg-gray-50">
                <td className="px-6 py-4 text-sm">
                  <span className={`inline-flex px-3 py-1 rounded-full font-medium ${estado.cor}`}>
                    {estado.nome}
                  </span>
                </td>
                <td className="px-6 py-4 text-sm text-gray-600">{estado.descricao}</td>
                <td className="px-6 py-4">
                  <span className="inline-flex px-2 py-1 text-xs rounded-full bg-blue-50 text-blue-600">
                    {estado.patrimonios} itens
                  </span>
                </td>
                <td className="px-6 py-4">
                  <div className="flex justify-end gap-2">
                    <Link href={`/estados-item/editar/${estado.id}`} className="p-2 text-blue-600 hover:bg-blue-50 rounded-lg">
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
