import { Plus, Search, Edit2, Trash2, AlertCircle } from 'lucide-react';
import Link from 'next/link';

export default function PatrimoniosList() {
  const patrimonios = [
    { id: 1, numero: '1234', descricao: 'Notebook Dell Latitude', tipo: 'Informática', ambiente: 'Sala 201', responsavel: 'João Silva', estado: 'Ativo', estadoColor: 'text-green-600 bg-green-50' },
    { id: 2, numero: '5678', descricao: 'Cadeira Ergonômica', tipo: 'Mobiliário', ambiente: 'Sala 305', responsavel: 'Maria Santos', estado: 'Em Manutenção', estadoColor: 'text-orange-600 bg-orange-50' },
    { id: 3, numero: '9012', descricao: 'Projetor Epson', tipo: 'Eletrônicos', ambiente: 'Lab. 3', responsavel: 'Pedro Costa', estado: 'Ativo', estadoColor: 'text-green-600 bg-green-50' },
    { id: 4, numero: '3456', descricao: 'Mesa de Escritório', tipo: 'Mobiliário', ambiente: 'Sala 201', responsavel: 'João Silva', estado: 'Avariado', estadoColor: 'text-red-600 bg-red-50' },
  ];

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold text-gray-900 mb-2">Patrimônios</h1>
          <p className="text-gray-600">Gerencie todos os patrimônios da empresa</p>
        </div>
        <Link
          href="/patrimonios/novo"
          className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
        >
          <Plus size={20} />
          Novo Patrimônio
        </Link>
      </div>

      <div className="bg-white border border-gray-200 rounded-lg p-4">
        <div className="flex gap-4">
          <div className="flex-1 relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
            <input
              type="text"
              placeholder="Buscar por número, descrição, ambiente..."
              className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg"
            />
          </div>
          <button className="px-4 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200">
            Filtrar
          </button>
        </div>
      </div>

      <div className="bg-white border border-gray-200 rounded-lg overflow-hidden">
        <table className="w-full">
          <thead className="bg-gray-50 border-b border-gray-200">
            <tr>
              <th className="px-6 py-3 text-left text-sm font-semibold text-gray-900">Número</th>
              <th className="px-6 py-3 text-left text-sm font-semibold text-gray-900">Descrição</th>
              <th className="px-6 py-3 text-left text-sm font-semibold text-gray-900">Tipo</th>
              <th className="px-6 py-3 text-left text-sm font-semibold text-gray-900">Ambiente</th>
              <th className="px-6 py-3 text-left text-sm font-semibold text-gray-900">Responsável</th>
              <th className="px-6 py-3 text-left text-sm font-semibold text-gray-900">Estado</th>
              <th className="px-6 py-3 text-right text-sm font-semibold text-gray-900">Ações</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200">
            {patrimonios.map((patrimonio) => (
              <tr key={patrimonio.id} className="hover:bg-gray-50">
                <td className="px-6 py-4 text-sm text-gray-900">#{patrimonio.numero}</td>
                <td className="px-6 py-4 text-sm text-gray-900">{patrimonio.descricao}</td>
                <td className="px-6 py-4 text-sm text-gray-600">{patrimonio.tipo}</td>
                <td className="px-6 py-4 text-sm text-gray-600">{patrimonio.ambiente}</td>
                <td className="px-6 py-4 text-sm text-gray-600">{patrimonio.responsavel}</td>
                <td className="px-6 py-4">
                  <span className={`inline-flex px-2 py-1 text-xs rounded-full ${patrimonio.estadoColor}`}>
                    {patrimonio.estado}
                  </span>
                </td>
                <td className="px-6 py-4">
                  <div className="flex justify-end gap-2">
                    <Link
                      href={`/patrimonios/estado/${patrimonio.id}`}
                      className="p-2 text-orange-600 hover:bg-orange-50 rounded-lg"
                      title="Registrar Estado"
                    >
                      <AlertCircle size={18} />
                    </Link>
                    <Link
                      href={`/patrimonios/editar/${patrimonio.id}`}
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
