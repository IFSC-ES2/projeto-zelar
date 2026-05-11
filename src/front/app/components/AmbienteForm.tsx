'use client'

import { ArrowLeft, Save } from 'lucide-react';
import Link from 'next/link';
import { useParams } from 'next/navigation';

export default function AmbienteForm() {
  const { id } = useParams();
  const isEdit = !!id;

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-4">
        <Link href="/ambientes" className="p-2 hover:bg-gray-100 rounded-lg">
          <ArrowLeft size={20} />
        </Link>
        <div>
          <h1 className="text-2xl font-bold text-gray-900">
            {isEdit ? 'Editar Ambiente' : 'Novo Ambiente'}
          </h1>
          <p className="text-gray-600">Preencha os dados do ambiente</p>
        </div>
      </div>

      <div className="bg-white border border-gray-200 rounded-lg p-6">
        <form className="space-y-6">
          <div>
            <h2 className="text-lg font-semibold text-gray-900 mb-4">Informações Básicas</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Nome do Ambiente *
                </label>
                <input
                  type="text"
                  placeholder="Ex: Sala 201"
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Tipo de Ambiente *
                </label>
                <select className="w-full px-4 py-2 border border-gray-300 rounded-lg">
                  <option value="">Selecione...</option>
                  <option value="sala_reuniao">Sala de Reunião</option>
                  <option value="escritorio">Escritório</option>
                  <option value="laboratorio">Laboratório</option>
                  <option value="deposito">Depósito</option>
                  <option value="almoxarifado">Almoxarifado</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Andar/Localização
                </label>
                <input
                  type="text"
                  placeholder="Ex: 2º Andar"
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Capacidade (m²)
                </label>
                <input
                  type="number"
                  placeholder="Ex: 50"
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg"
                />
              </div>
            </div>
          </div>

          <div>
            <h2 className="text-lg font-semibold text-gray-900 mb-4">Responsável</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="md:col-span-2">
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Responsável pelo Ambiente *
                </label>
                <select className="w-full px-4 py-2 border border-gray-300 rounded-lg">
                  <option value="">Selecione...</option>
                  <option value="joao">João Silva</option>
                  <option value="maria">Maria Santos</option>
                  <option value="pedro">Pedro Costa</option>
                  <option value="ana">Ana Lima</option>
                </select>
                <p className="text-sm text-gray-500 mt-1">
                  O responsável será vinculado a todos os patrimônios alocados neste ambiente
                </p>
              </div>
            </div>
          </div>

          <div>
            <h2 className="text-lg font-semibold text-gray-900 mb-4">Informações Adicionais</h2>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Observações
              </label>
              <textarea
                rows={4}
                placeholder="Informações adicionais sobre o ambiente..."
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
              {isEdit ? 'Salvar Alterações' : 'Cadastrar Ambiente'}
            </button>
            <Link
              href="/ambientes"
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
