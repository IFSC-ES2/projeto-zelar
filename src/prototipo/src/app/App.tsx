import { BrowserRouter, Routes, Route, Link, useLocation } from 'react-router';
import { Home, Package, MapPin, Users, UserCheck, Store, Tags, AlertCircle, Menu, X } from 'lucide-react';
import { useState } from 'react';
import Dashboard from './components/Dashboard';
import PatrimoniosList from './components/PatrimoniosList';
import PatrimonioForm from './components/PatrimonioForm';
import AmbientesList from './components/AmbientesList';
import AmbienteForm from './components/AmbienteForm';
import ResponsaveisList from './components/ResponsaveisList';
import ResponsavelForm from './components/ResponsavelForm';
import ConferentesList from './components/ConferentesList';
import ConferenteForm from './components/ConferenteForm';
import FornecedoresList from './components/FornecedoresList';
import FornecedorForm from './components/FornecedorForm';
import TiposMaterialList from './components/TiposMaterialList';
import TipoMaterialForm from './components/TipoMaterialForm';
import EstadosItemList from './components/EstadosItemList';
import EstadoItemForm from './components/EstadoItemForm';
import RegistroEstado from './components/RegistroEstado';

function Layout({ children }: { children: React.ReactNode }) {
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const location = useLocation();

  const menuItems = [
    { path: '/', icon: Home, label: 'Dashboard' },
    { path: '/patrimonios', icon: Package, label: 'Patrimônios' },
    { path: '/ambientes', icon: MapPin, label: 'Ambientes' },
    { path: '/responsaveis', icon: Users, label: 'Responsáveis' },
    { path: '/conferentes', icon: UserCheck, label: 'Conferentes' },
    { path: '/fornecedores', icon: Store, label: 'Fornecedores' },
    { path: '/tipos-material', icon: Tags, label: 'Tipos de Material' },
    { path: '/estados-item', icon: AlertCircle, label: 'Estados do Item' },
  ];

  return (
    <div className="flex h-screen bg-gray-50">
      {/* Sidebar */}
      <div className={`${sidebarOpen ? 'w-64' : 'w-0'} transition-all duration-300 bg-white border-r border-gray-200 overflow-hidden`}>
        <div className="p-4 border-b border-gray-200">
          <h1 className="text-xl font-bold text-gray-800">Gestão Patrimonial</h1>
        </div>
        <nav className="p-4">
          {menuItems.map((item) => {
            const Icon = item.icon;
            const isActive = location.pathname === item.path;
            return (
              <Link
                key={item.path}
                to={item.path}
                className={`flex items-center gap-3 px-4 py-3 mb-2 rounded-lg transition-colors ${
                  isActive
                    ? 'bg-blue-50 text-blue-600'
                    : 'text-gray-700 hover:bg-gray-100'
                }`}
              >
                <Icon size={20} />
                <span>{item.label}</span>
              </Link>
            );
          })}
        </nav>
      </div>

      {/* Main Content */}
      <div className="flex-1 flex flex-col overflow-hidden">
        {/* Header */}
        <header className="bg-white border-b border-gray-200 px-6 py-4 flex items-center gap-4">
          <button
            onClick={() => setSidebarOpen(!sidebarOpen)}
            className="p-2 hover:bg-gray-100 rounded-lg"
          >
            {sidebarOpen ? <X size={20} /> : <Menu size={20} />}
          </button>
          <div className="flex-1">
            <h2 className="text-lg font-semibold text-gray-800">Sistema de Gestão Patrimonial - MVP</h2>
          </div>
        </header>

        {/* Page Content */}
        <main className="flex-1 overflow-auto p-6">
          {children}
        </main>
      </div>
    </div>
  );
}

export default function App() {
  return (
    <BrowserRouter>
      <Layout>
        <Routes>
          <Route path="/" element={<Dashboard />} />
          <Route path="/patrimonios" element={<PatrimoniosList />} />
          <Route path="/patrimonios/novo" element={<PatrimonioForm />} />
          <Route path="/patrimonios/editar/:id" element={<PatrimonioForm />} />
          <Route path="/patrimonios/estado/:id" element={<RegistroEstado />} />
          <Route path="/ambientes" element={<AmbientesList />} />
          <Route path="/ambientes/novo" element={<AmbienteForm />} />
          <Route path="/ambientes/editar/:id" element={<AmbienteForm />} />
          <Route path="/responsaveis" element={<ResponsaveisList />} />
          <Route path="/responsaveis/novo" element={<ResponsavelForm />} />
          <Route path="/responsaveis/editar/:id" element={<ResponsavelForm />} />
          <Route path="/conferentes" element={<ConferentesList />} />
          <Route path="/conferentes/novo" element={<ConferenteForm />} />
          <Route path="/conferentes/editar/:id" element={<ConferenteForm />} />
          <Route path="/fornecedores" element={<FornecedoresList />} />
          <Route path="/fornecedores/novo" element={<FornecedorForm />} />
          <Route path="/fornecedores/editar/:id" element={<FornecedorForm />} />
          <Route path="/tipos-material" element={<TiposMaterialList />} />
          <Route path="/tipos-material/novo" element={<TipoMaterialForm />} />
          <Route path="/tipos-material/editar/:id" element={<TipoMaterialForm />} />
          <Route path="/estados-item" element={<EstadosItemList />} />
          <Route path="/estados-item/novo" element={<EstadoItemForm />} />
          <Route path="/estados-item/editar/:id" element={<EstadoItemForm />} />
        </Routes>
      </Layout>
    </BrowserRouter>
  );
}
