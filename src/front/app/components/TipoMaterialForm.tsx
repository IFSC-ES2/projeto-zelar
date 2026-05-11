'use client'

import { ArrowLeft, Save } from 'lucide-react';
import Link from 'next/link';
import { useParams } from 'next/navigation';

export default function TipoMaterialForm() {
  const { id } = useParams();
  const isEdit = !!id;

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-4">
        <Link href="/tipos-material" className="p-2 hover:bg-gray-100 rounded-lg">
          <ArrowLeft size={20} />
        </Link>
        <div>
          <h1 className="text-2xl font-bold text-gray-900">{isEdit ? 'Editar Tipo de Material' : 'Novo Tipo de Material'}</h1>
          <p className="text-gray-600">Preencha os dados do tipo de material</p>
        </div>
      </div>

      <div className="bg-white border border-gray-200 rounded-lg p-6">
        <form className="space-y-6">
          <div>
            <h2 className="text-lg font-semibold text-gray-900 mb-4">Informações do Tipo</h2>
            <div className="grid grid-cols-1 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Nome do Tipo *</label>
                <input type="text" placeholder="Ex: Informática" className="w-full px-4 py-2 border border-gray-300 rounded-lg" />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Descrição</label>
                <textarea rows={3} placeholder="Descrição do tipo de material..." className="w-full px-4 py-2 border border-gray-300 rounded-lg"></textarea>
              </div>
            </div>
          </div>

          <div className="flex gap-4 pt-4 border-t border-gray-200">
            <button type="submit" className="flex items-center gap-2 px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700">
              <Save size={20} />
              {isEdit ? 'Salvar Alterações' : 'Cadastrar Tipo'}
            </button>
            <Link href="/tipos-material" className="px-6 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200">Cancelar</Link>
          </div>
        </form>
      </div>
    </div>
  );
}
