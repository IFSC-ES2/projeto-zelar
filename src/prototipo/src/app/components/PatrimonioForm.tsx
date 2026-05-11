import { ArrowLeft, Save } from 'lucide-react';
import { Link, useParams } from 'react-router';

export default function PatrimonioForm() {
  const { id } = useParams();
  const isEdit = !!id;

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center gap-4">
        <Link to="/patrimonios" className="p-2 hover:bg-gray-100 rounded-lg">
          <ArrowLeft size={20} />
        </Link>
        <div>
          <h1 className="text-2xl font-bold text-gray-900">
            {isEdit ? 'Editar Patrimônio' : 'Novo Patrimônio'}
          </h1>
          <p className="text-gray-600">Preencha os dados do patrimônio</p>
        </div>
      </div>

      {/* Form */}
      <div className="bg-white border border-gray-200 rounded-lg p-6">
        <form className="space-y-6">
          {/* Informações Básicas */}
          <div>
            <h2 className="text-lg font-semibold text-gray-900 mb-4">Informações Básicas</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Número do Patrimônio *
                </label>
                <input
                  type="text"
                  placeholder="Ex: 1234"
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Tipo de Material *
                </label>
                <select className="w-full px-4 py-2 border border-gray-300 rounded-lg">
                  <option value="">Selecione...</option>
                  <option value="informatica">Informática</option>
                  <option value="mobiliario">Mobiliário</option>
                  <option value="eletronicos">Eletrônicos</option>
                </select>
              </div>
              <div className="md:col-span-2">
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Descrição *
                </label>
                <input
                  type="text"
                  placeholder="Ex: Notebook Dell Latitude 5420"
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg"
                />
              </div>
            </div>
          </div>

          {/* Fornecedor */}
          <div>
            <h2 className="text-lg font-semibold text-gray-900 mb-4">Fornecedor</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Fornecedor *
                </label>
                <select className="w-full px-4 py-2 border border-gray-300 rounded-lg">
                  <option value="">Selecione...</option>
                  <option value="fornecedor1">Fornecedor A</option>
                  <option value="fornecedor2">Fornecedor B</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Data de Aquisição
                </label>
                <input
                  type="date"
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg"
                />
              </div>
            </div>
          </div>

          {/* Alocação */}
          <div>
            <h2 className="text-lg font-semibold text-gray-900 mb-4">Alocação</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Ambiente *
                </label>
                <select className="w-full px-4 py-2 border border-gray-300 rounded-lg">
                  <option value="">Selecione...</option>
                  <option value="sala201">Sala 201</option>
                  <option value="sala305">Sala 305</option>
                  <option value="lab3">Laboratório 3</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Responsável *
                </label>
                <select className="w-full px-4 py-2 border border-gray-300 rounded-lg">
                  <option value="">Selecione...</option>
                  <option value="joao">João Silva</option>
                  <option value="maria">Maria Santos</option>
                  <option value="pedro">Pedro Costa</option>
                </select>
                <p className="text-sm text-gray-500 mt-1">
                  O responsável é vinculado ao ambiente selecionado
                </p>
              </div>
            </div>
          </div>

          {/* Observações */}
          <div>
            <h2 className="text-lg font-semibold text-gray-900 mb-4">Informações Adicionais</h2>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Observações
              </label>
              <textarea
                rows={4}
                placeholder="Informações adicionais sobre o patrimônio..."
                className="w-full px-4 py-2 border border-gray-300 rounded-lg"
              ></textarea>
            </div>
          </div>

          {/* Actions */}
          <div className="flex gap-4 pt-4 border-t border-gray-200">
            <button
              type="submit"
              className="flex items-center gap-2 px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
            >
              <Save size={20} />
              {isEdit ? 'Salvar Alterações' : 'Cadastrar Patrimônio'}
            </button>
            <Link
              to="/patrimonios"
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
