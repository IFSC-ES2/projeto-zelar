import { ArrowLeft, Save } from 'lucide-react';
import { Link, useParams } from 'react-router';

export default function EstadoItemForm() {
  const { id } = useParams();
  const isEdit = !!id;

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-4">
        <Link to="/estados-item" className="p-2 hover:bg-gray-100 rounded-lg">
          <ArrowLeft size={20} />
        </Link>
        <div>
          <h1 className="text-2xl font-bold text-gray-900">{isEdit ? 'Editar Estado do Item' : 'Novo Estado do Item'}</h1>
          <p className="text-gray-600">Preencha os dados do estado</p>
        </div>
      </div>

      <div className="bg-white border border-gray-200 rounded-lg p-6">
        <form className="space-y-6">
          <div>
            <h2 className="text-lg font-semibold text-gray-900 mb-4">Informações do Estado</h2>
            <div className="grid grid-cols-1 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Nome do Estado *</label>
                <input type="text" placeholder="Ex: Ativo" className="w-full px-4 py-2 border border-gray-300 rounded-lg" />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Descrição</label>
                <textarea rows={3} placeholder="Descrição do estado..." className="w-full px-4 py-2 border border-gray-300 rounded-lg"></textarea>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Cor de Identificação</label>
                <select className="w-full px-4 py-2 border border-gray-300 rounded-lg">
                  <option value="">Selecione...</option>
                  <option value="green">Verde (Ativo)</option>
                  <option value="orange">Laranja (Em Manutenção)</option>
                  <option value="red">Vermelho (Avariado)</option>
                  <option value="gray">Cinza (Inativo)</option>
                  <option value="blue">Azul (Outro)</option>
                </select>
              </div>
            </div>
          </div>

          <div className="flex gap-4 pt-4 border-t border-gray-200">
            <button type="submit" className="flex items-center gap-2 px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700">
              <Save size={20} />
              {isEdit ? 'Salvar Alterações' : 'Cadastrar Estado'}
            </button>
            <Link to="/estados-item" className="px-6 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200">Cancelar</Link>
          </div>
        </form>
      </div>
    </div>
  );
}
