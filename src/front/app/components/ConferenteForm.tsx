'use client'

import { ArrowLeft, Save } from 'lucide-react';
import Link from 'next/link';
import { useParams } from 'next/navigation';

export default function ConferenteForm() {
  const { id } = useParams();
  const isEdit = !!id;

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-4">
        <Link href="/conferentes" className="p-2 hover:bg-gray-100 rounded-lg">
          <ArrowLeft size={20} />
        </Link>
        <div>
          <h1 className="text-2xl font-bold text-gray-900">{isEdit ? 'Editar Conferente' : 'Novo Conferente'}</h1>
          <p className="text-gray-600">Preencha os dados do conferente</p>
        </div>
      </div>

      <div className="bg-white border border-gray-200 rounded-lg p-6">
        <form className="space-y-6">
          <div>
            <h2 className="text-lg font-semibold text-gray-900 mb-4">Informações do Conferente</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Nome Completo *</label>
                <input type="text" placeholder="Ex: Carlos Oliveira" className="w-full px-4 py-2 border border-gray-300 rounded-lg" />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Email *</label>
                <input type="email" placeholder="carlos.oliveira@empresa.com" className="w-full px-4 py-2 border border-gray-300 rounded-lg" />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Telefone *</label>
                <input type="tel" placeholder="(11) 99876-5432" className="w-full px-4 py-2 border border-gray-300 rounded-lg" />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Setor *</label>
                <input type="text" placeholder="Ex: Auditoria" className="w-full px-4 py-2 border border-gray-300 rounded-lg" />
              </div>
            </div>
          </div>

          <div className="flex gap-4 pt-4 border-t border-gray-200">
            <button type="submit" className="flex items-center gap-2 px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700">
              <Save size={20} />
              {isEdit ? 'Salvar Alterações' : 'Cadastrar Conferente'}
            </button>
            <Link href="/conferentes" className="px-6 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200">Cancelar</Link>
          </div>
        </form>
      </div>
    </div>
  );
}
