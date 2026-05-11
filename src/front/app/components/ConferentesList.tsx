import { Plus, Search, Edit2, Trash2 } from 'lucide-react';
import Link from 'next/link';

export default function ConferentesList() {
  const conferentes = [
    { id: 1, nome: 'Carlos Oliveira', email: 'carlos.oliveira@empresa.com', telefone: '(11) 99876-5432', setor: 'Auditoria' },
    { id: 2, nome: 'Ana Paula', email: 'ana.paula@empresa.com', telefone: '(11) 99876-5433', setor: 'Controle de Qualidade' },
    { id: 3, nome: 'Roberto Santos', email: 'roberto.santos@empresa.com', telefone: '(11) 99876-5434', setor: 'Patrimônio' },
  ];

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold text-gray-900 mb-2">Conferentes</h1>
          <p className="text-gray-600">Gerencie os conferentes responsáveis pela verificação</p>
        </div>
        <Link href="/conferentes/novo" className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700">
          <Plus size={20} />
          Novo Conferente
        </Link>
      </div>

      <div className="bg-white border border-gray-200 rounded-lg p-4">
        <div className="flex gap-4">
          <div className="flex-1 relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
            <input type="text" placeholder="Buscar por nome, email, setor..." className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg" />
          </div>
          <button className="px-4 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200">Filtrar</button>
        </div>
      </div>

      <div className="bg-white border border-gray-200 rounded-lg overflow-hidden">
        <table className="w-full">
          <thead className="bg-gray-50 border-b border-gray-200">
            <tr>
              <th className="px-6 py-3 text-left text-sm font-semibold text-gray-900">Nome</th>
              <th className="px-6 py-3 text-left text-sm font-semibold text-gray-900">Email</th>
              <th className="px-6 py-3 text-left text-sm font-semibold text-gray-900">Telefone</th>
              <th className="px-6 py-3 text-left text-sm font-semibold text-gray-900">Setor</th>
              <th className="px-6 py-3 text-right text-sm font-semibold text-gray-900">Ações</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200">
            {conferentes.map((conferente) => (
              <tr key={conferente.id} className="hover:bg-gray-50">
                <td className="px-6 py-4 text-sm text-gray-900 font-medium">{conferente.nome}</td>
                <td className="px-6 py-4 text-sm text-gray-600">{conferente.email}</td>
                <td className="px-6 py-4 text-sm text-gray-600">{conferente.telefone}</td>
                <td className="px-6 py-4 text-sm text-gray-600">{conferente.setor}</td>
                <td className="px-6 py-4">
                  <div className="flex justify-end gap-2">
                    <Link href={`/conferentes/editar/${conferente.id}`} className="p-2 text-blue-600 hover:bg-blue-50 rounded-lg">
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
