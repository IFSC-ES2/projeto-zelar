'use client'

import { ArrowLeft, Save } from 'lucide-react';
import Link from 'next/link';
import { useParams } from 'next/navigation';

export default function FornecedorForm() {
  const { id } = useParams();
  const isEdit = !!id;

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-4">
        <Link href="/fornecedores" className="p-2 hover:bg-gray-100 rounded-lg">
          <ArrowLeft size={20} />
        </Link>
        <div>
          <h1 className="text-2xl font-bold text-gray-900">{isEdit ? 'Editar Fornecedor' : 'Novo Fornecedor'}</h1>
          <p className="text-gray-600">Preencha os dados do fornecedor</p>
        </div>
      </div>

      <div className="bg-white border border-gray-200 rounded-lg p-6">
        <form className="space-y-6">
          <div>
            <h2 className="text-lg font-semibold text-gray-900 mb-4">Dados da Empresa</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Razão Social *</label>
                <input type="text" placeholder="Ex: Fornecedor A Ltda" className="w-full px-4 py-2 border border-gray-300 rounded-lg" />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">CNPJ *</label>
                <input type="text" placeholder="00.000.000/0000-00" className="w-full px-4 py-2 border border-gray-300 rounded-lg" />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Email *</label>
                <input type="email" placeholder="contato@fornecedor.com" className="w-full px-4 py-2 border border-gray-300 rounded-lg" />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Telefone *</label>
                <input type="tel" placeholder="(11) 3000-0000" className="w-full px-4 py-2 border border-gray-300 rounded-lg" />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Categoria</label>
                <select className="w-full px-4 py-2 border border-gray-300 rounded-lg">
                  <option value="">Selecione...</option>
                  <option value="informatica">Informática</option>
                  <option value="mobiliario">Mobiliário</option>
                  <option value="eletronicos">Eletrônicos</option>
                </select>
              </div>
            </div>
          </div>

          <div className="flex gap-4 pt-4 border-t border-gray-200">
            <button type="submit" className="flex items-center gap-2 px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700">
              <Save size={20} />
              {isEdit ? 'Salvar Alterações' : 'Cadastrar Fornecedor'}
            </button>
            <Link href="/fornecedores" className="px-6 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200">Cancelar</Link>
          </div>
        </form>
      </div>
    </div>
  );
}
