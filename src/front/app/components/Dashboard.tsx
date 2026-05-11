import { Package, MapPin, Users, AlertTriangle } from 'lucide-react';

export default function Dashboard() {
  const stats = [
    { label: 'Total de Patrimônios', value: '248', icon: Package, color: 'bg-blue-50 text-blue-600' },
    { label: 'Ambientes Cadastrados', value: '42', icon: MapPin, color: 'bg-green-50 text-green-600' },
    { label: 'Responsáveis Ativos', value: '28', icon: Users, color: 'bg-purple-50 text-purple-600' },
    { label: 'Itens em Manutenção', value: '12', icon: AlertTriangle, color: 'bg-orange-50 text-orange-600' },
  ];

  const recentActivities = [
    { id: 1, action: 'Patrimônio #1234 cadastrado', date: '29/04/2026 10:30' },
    { id: 2, action: 'Ambiente "Sala 201" atualizado', date: '29/04/2026 09:15' },
    { id: 3, action: 'Manutenção solicitada para #5678', date: '28/04/2026 16:45' },
    { id: 4, action: 'Responsável "João Silva" cadastrado', date: '28/04/2026 14:20' },
    { id: 5, action: 'Patrimônio #9012 alocado para "Lab. 3"', date: '27/04/2026 11:00' },
  ];

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-gray-900 mb-2">Dashboard</h1>
        <p className="text-gray-600">Visão geral do sistema de gestão patrimonial</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {stats.map((stat) => {
          const Icon = stat.icon;
          return (
            <div key={stat.label} className="bg-white border border-gray-200 rounded-lg p-6">
              <div className="flex items-center justify-between mb-4">
                <div className={`p-3 rounded-lg ${stat.color}`}>
                  <Icon size={24} />
                </div>
              </div>
              <p className="text-3xl font-bold text-gray-900 mb-1">{stat.value}</p>
              <p className="text-sm text-gray-600">{stat.label}</p>
            </div>
          );
        })}
      </div>

      <div className="bg-white border border-gray-200 rounded-lg">
        <div className="p-6 border-b border-gray-200">
          <h2 className="text-lg font-semibold text-gray-900">Atividades Recentes</h2>
        </div>
        <div className="divide-y divide-gray-200">
          {recentActivities.map((activity) => (
            <div key={activity.id} className="p-4 hover:bg-gray-50">
              <div className="flex justify-between items-start">
                <p className="text-gray-900">{activity.action}</p>
                <span className="text-sm text-gray-500">{activity.date}</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
