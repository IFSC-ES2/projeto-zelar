import { Plus, Search, Edit2, Trash2 } from 'lucide-react';
import { Link } from 'react-router';

export default function ResponsaveisList() {
  const responsaveis = [
    { id: 1, nome: 'João Silva', email: 'joao.silva@empresa.com', telefone: '(11) 98765-4321', departamento: 'TI', ambientes: 2 },
    { id: 2, nome: 'Maria Santos', email: 'maria.santos@empresa.com', telefone: '(11) 98765-4322', departamento: 'RH', ambientes: 1 },
    { id: 3, nome: 'Pedro Costa', email: 'pedro.costa@empresa.com', telefone: '(11) 98765-4323', departamento: 'Laboratório', ambientes: 3 },
    { id: 4, nome: 'Ana Lima', email: 'ana.lima@empresa.com', telefone: '(11) 98765-4324', departamento: 'Logística', ambientes: 1 },
  ];

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold text-gray-900 mb-2">Responsáveis</h1>
          <p className="text-gray-600">Gerencie os responsáveis pelos ambientes</p>
        </div>
        <Link
          to="/responsaveis/novo"
          className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
        >
          <Plus size={20} />
          Novo Responsável
        </Link>
      </div>

      {/* Search Bar */}
      <div className="bg-white border border-gray-200 rounded-lg p-4">
        <div className="flex gap-4">
          <div className="flex-1 relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
            <input
              type="text"
              placeholder="Buscar por nome, email, departamento..."
              className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg"
            />
          </div>
          <button className="px-4 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200">
            Filtrar
          </button>
        </div>
      </div>

      {/* Table */}
      <div className="bg-white border border-gray-200 rounded-lg overflow-hidden">
        <table className="w-full">
          <thead className="bg-gray-50 border-b border-gray-200">
            <tr>
              <th className="px-6 py-3 text-left text-sm font-semibold text-gray-900">Nome</th>
              <th className="px-6 py-3 text-left text-sm font-semibold text-gray-900">Email</th>
              <th className="px-6 py-3 text-left text-sm font-semibold text-gray-900">Telefone</th>
              <th className="px-6 py-3 text-left text-sm font-semibold text-gray-900">Departamento</th>
              <th className="px-6 py-3 text-left text-sm font-semibold text-gray-900">Ambientes</th>
              <th className="px-6 py-3 text-right text-sm font-semibold text-gray-900">Ações</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200">
            {responsaveis.map((responsavel) => (
              <tr key={responsavel.id} className="hover:bg-gray-50">
                <td className="px-6 py-4 text-sm text-gray-900 font-medium">{responsavel.nome}</td>
                <td className="px-6 py-4 text-sm text-gray-600">{responsavel.email}</td>
                <td className="px-6 py-4 text-sm text-gray-600">{responsavel.telefone}</td>
                <td className="px-6 py-4 text-sm text-gray-600">{responsavel.departamento}</td>
                <td className="px-6 py-4">
                  <span className="inline-flex px-2 py-1 text-xs rounded-full bg-purple-50 text-purple-600">
                    {responsavel.ambientes} ambientes
                  </span>
                </td>
                <td className="px-6 py-4">
                  <div className="flex justify-end gap-2">
                    <Link
                      to={`/responsaveis/editar/${responsavel.id}`}
                      className="p-2 text-blue-600 hover:bg-blue-50 rounded-lg"
                    >
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
