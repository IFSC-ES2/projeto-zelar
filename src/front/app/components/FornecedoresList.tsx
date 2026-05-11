import { Plus, Search, Edit2, Trash2 } from 'lucide-react';
import Link from 'next/link';

export default function FornecedoresList() {
  const fornecedores = [
    { id: 1, nome: 'Fornecedor A Ltda', cnpj: '12.345.678/0001-90', email: 'contato@fornecedora.com', telefone: '(11) 3000-1234', categoria: 'Informática' },
    { id: 2, nome: 'Fornecedor B S.A.', cnpj: '98.765.432/0001-10', email: 'vendas@fornecedorb.com', telefone: '(11) 3000-5678', categoria: 'Mobiliário' },
    { id: 3, nome: 'Fornecedor C', cnpj: '11.222.333/0001-44', email: 'comercial@fornecedorc.com', telefone: '(11) 3000-9012', categoria: 'Eletrônicos' },
  ];

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold text-gray-900 mb-2">Fornecedores</h1>
          <p className="text-gray-600">Gerencie os fornecedores de patrimônios</p>
        </div>
        <Link href="/fornecedores/novo" className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700">
          <Plus size={20} />
          Novo Fornecedor
        </Link>
      </div>

      <div className="bg-white border border-gray-200 rounded-lg p-4">
        <div className="flex gap-4">
          <div className="flex-1 relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
            <input type="text" placeholder="Buscar por nome, CNPJ, categoria..." className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg" />
          </div>
          <button className="px-4 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200">Filtrar</button>
        </div>
      </div>

      <div className="bg-white border border-gray-200 rounded-lg overflow-hidden">
        <table className="w-full">
          <thead className="bg-gray-50 border-b border-gray-200">
            <tr>
              <th className="px-6 py-3 text-left text-sm font-semibold text-gray-900">Nome</th>
              <th className="px-6 py-3 text-left text-sm font-semibold text-gray-900">CNPJ</th>
              <th className="px-6 py-3 text-left text-sm font-semibold text-gray-900">Email</th>
              <th className="px-6 py-3 text-left text-sm font-semibold text-gray-900">Telefone</th>
              <th className="px-6 py-3 text-left text-sm font-semibold text-gray-900">Categoria</th>
              <th className="px-6 py-3 text-right text-sm font-semibold text-gray-900">Ações</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200">
            {fornecedores.map((fornecedor) => (
              <tr key={fornecedor.id} className="hover:bg-gray-50">
                <td className="px-6 py-4 text-sm text-gray-900 font-medium">{fornecedor.nome}</td>
                <td className="px-6 py-4 text-sm text-gray-600">{fornecedor.cnpj}</td>
                <td className="px-6 py-4 text-sm text-gray-600">{fornecedor.email}</td>
                <td className="px-6 py-4 text-sm text-gray-600">{fornecedor.telefone}</td>
                <td className="px-6 py-4 text-sm text-gray-600">{fornecedor.categoria}</td>
                <td className="px-6 py-4">
                  <div className="flex justify-end gap-2">
                    <Link href={`/fornecedores/editar/${fornecedor.id}`} className="p-2 text-blue-600 hover:bg-blue-50 rounded-lg">
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
