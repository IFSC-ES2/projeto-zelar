'use client'

import { ArrowLeft, Save, AlertCircle } from 'lucide-react';
import Link from 'next/link';
import { useParams } from 'next/navigation';

export default function RegistroEstado() {
  const { id } = useParams();

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-4">
        <Link href="/patrimonios" className="p-2 hover:bg-gray-100 rounded-lg">
          <ArrowLeft size={20} />
        </Link>
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Registrar Estado do Patrimônio</h1>
          <p className="text-gray-600">Patrimônio #{id} - Notebook Dell Latitude</p>
        </div>
      </div>

      <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 flex gap-3">
        <AlertCircle className="text-blue-600 flex-shrink-0" size={20} />
        <div className="text-sm text-blue-900">
          <p className="font-medium mb-1">Importante</p>
          <p>Ao registrar um item como &ldquo;Avariado&rdquo; ou solicitar &ldquo;Manutenção&rdquo;, será gerada automaticamente uma solicitação para o gestor e responsável.</p>
        </div>
      </div>

      <div className="bg-white border border-gray-200 rounded-lg p-6">
        <form className="space-y-6">
          <div>
            <h2 className="text-lg font-semibold text-gray-900 mb-4">Estado do Item</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Estado Atual do Item *
                </label>
                <select className="w-full px-4 py-2 border border-gray-300 rounded-lg">
                  <option value="">Selecione...</option>
                  <option value="ativo">Ativo</option>
                  <option value="manutencao">Em Manutenção</option>
                  <option value="avariado">Avariado</option>
                  <option value="inativo">Inativo</option>
                  <option value="descartado">Descartado</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Conferente *
                </label>
                <select className="w-full px-4 py-2 border border-gray-300 rounded-lg">
                  <option value="">Selecione...</option>
                  <option value="conferente1">Carlos Oliveira</option>
                  <option value="conferente2">Ana Paula</option>
                  <option value="conferente3">Roberto Santos</option>
                </select>
              </div>
            </div>
          </div>

          <div>
            <h2 className="text-lg font-semibold text-gray-900 mb-4">Ação Necessária</h2>
            <div className="space-y-3">
              <label className="flex items-center gap-3 p-4 border border-gray-300 rounded-lg cursor-pointer hover:bg-gray-50">
                <input type="radio" name="acao" value="nenhuma" className="w-4 h-4" />
                <div>
                  <p className="font-medium text-gray-900">Nenhuma ação necessária</p>
                  <p className="text-sm text-gray-600">Item está em condições normais</p>
                </div>
              </label>
              <label className="flex items-center gap-3 p-4 border border-gray-300 rounded-lg cursor-pointer hover:bg-gray-50">
                <input type="radio" name="acao" value="manutencao" className="w-4 h-4" />
                <div>
                  <p className="font-medium text-gray-900">Solicitar Manutenção</p>
                  <p className="text-sm text-gray-600">Item necessita de reparo</p>
                </div>
              </label>
              <label className="flex items-center gap-3 p-4 border border-gray-300 rounded-lg cursor-pointer hover:bg-gray-50">
                <input type="radio" name="acao" value="substituicao" className="w-4 h-4" />
                <div>
                  <p className="font-medium text-gray-900">Solicitar Substituição</p>
                  <p className="text-sm text-gray-600">Item precisa ser substituído</p>
                </div>
              </label>
            </div>
          </div>

          <div>
            <h2 className="text-lg font-semibold text-gray-900 mb-4">Detalhes</h2>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Observações *
              </label>
              <textarea
                rows={4}
                placeholder="Descreva o estado do item, problemas identificados ou qualquer observação relevante..."
                className="w-full px-4 py-2 border border-gray-300 rounded-lg"
              ></textarea>
            </div>
          </div>

          <div className="flex gap-4 pt-4 border-t border-gray-200">
            <button
              type="submit"
              className="flex items-center gap-2 px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
            >
              <Save size={20} />
              Registrar Estado
            </button>
            <Link
              href="/patrimonios"
              className="px-6 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200"
            >
              Cancelar
            </Link>
          </div>
        </form>
      </div>
    </div>
  );
}
