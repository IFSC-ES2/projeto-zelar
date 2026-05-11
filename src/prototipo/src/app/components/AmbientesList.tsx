import { Plus, Search, Edit2, Trash2 } from 'lucide-react';
import { Link } from 'react-router';

export default function AmbientesList() {
  const ambientes = [
    { id: 1, nome: 'Sala 201', tipo: 'Sala de Reunião', andar: '2º Andar', responsavel: 'João Silva', patrimonios: 12 },
    { id: 2, nome: 'Sala 305', tipo: 'Escritório', andar: '3º Andar', responsavel: 'Maria Santos', patrimonios: 8 },
    { id: 3, nome: 'Laboratório 3', tipo: 'Laboratório', andar: '1º Andar', responsavel: 'Pedro Costa', patrimonios: 25 },
    { id: 4, nome: 'Almoxarifado', tipo: 'Depósito', andar: 'Térreo', responsavel: 'Ana Lima', patrimonios: 45 },
  ];

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold text-gray-900 mb-2">Ambientes</h1>
          <p className="text-gray-600">Gerencie os ambientes da empresa</p>
        </div>
        <Link
          to="/ambientes/novo"
          className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
        >
          <Plus size={20} />
          Novo Ambiente
        </Link>
      </div>

      {/* Search Bar */}
      <div className="bg-white border border-gray-200 rounded-lg p-4">
        <div className="flex gap-4">
          <div className="flex-1 relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
            <input
              type="text"
              placeholder="Buscar por nome, tipo, responsável..."
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
              <th className="px-6 py-3 text-left text-sm font-semibold text-gray-900">Tipo</th>
              <th className="px-6 py-3 text-left text-sm font-semibold text-gray-900">Andar</th>
              <th className="px-6 py-3 text-left text-sm font-semibold text-gray-900">Responsável</th>
              <th className="px-6 py-3 text-left text-sm font-semibold text-gray-900">Patrimônios</th>
              <th className="px-6 py-3 text-right text-sm font-semibold text-gray-900">Ações</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200">
            {ambientes.map((ambiente) => (
              <tr key={ambiente.id} className="hover:bg-gray-50">
                <td className="px-6 py-4 text-sm text-gray-900 font-medium">{ambiente.nome}</td>
                <td className="px-6 py-4 text-sm text-gray-600">{ambiente.tipo}</td>
                <td className="px-6 py-4 text-sm text-gray-600">{ambiente.andar}</td>
                <td className="px-6 py-4 text-sm text-gray-600">{ambiente.responsavel}</td>
                <td className="px-6 py-4">
                  <span className="inline-flex px-2 py-1 text-xs rounded-full bg-blue-50 text-blue-600">
                    {ambiente.patrimonios} itens
                  </span>
                </td>
                <td className="px-6 py-4">
                  <div className="flex justify-end gap-2">
                    <Link
                      to={`/ambientes/editar/${ambiente.id}`}
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
