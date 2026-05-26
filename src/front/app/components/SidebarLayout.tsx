"use client";

import { useState } from "react";
import { usePathname } from "next/navigation";
import Link from "next/link";
import {
  Home,
  Package,
  MapPin,
  Users,
  UserCheck,
  Store,
  Tags,
  AlertCircle,
  Menu,
  X,
} from "lucide-react";

const menuItems = [
  { path: "/", icon: Home, label: "Dashboard" },
  { path: "/patrimonios", icon: Package, label: "Patrimônios" },
  { path: "/ambientes", icon: MapPin, label: "Ambientes" },
  { path: "/responsaveis", icon: Users, label: "Responsáveis" },
  { path: "/conferentes", icon: UserCheck, label: "Conferentes" },
  { path: "/fornecedores", icon: Store, label: "Fornecedores" },
  { path: "/tipos-material", icon: Tags, label: "Tipos de Material" },
  { path: "/estados-item", icon: AlertCircle, label: "Estados do Item" },
];

export default function SidebarLayout({ children }: { children: React.ReactNode }) {
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const pathname = usePathname();

  return (
    <div className="flex h-screen bg-gray-50">
      <div
        className={`${sidebarOpen ? "w-64" : "w-0"} transition-all duration-300 bg-white border-r border-gray-200 overflow-hidden`}
      >
        <div className="p-4 border-b border-gray-200">
          <h1 className="text-xl font-bold text-gray-800">
            Gestão Patrimonial
          </h1>
        </div>
        <nav className="p-4">
          {menuItems.map((item) => {
            const Icon = item.icon;
            const isActive = pathname === item.path;
            return (
              <Link
                key={item.path}
                href={item.path}
                className={`flex items-center gap-3 px-4 py-3 mb-2 rounded-lg transition-colors ${
                  isActive
                    ? "bg-blue-50 text-blue-600"
                    : "text-gray-700 hover:bg-gray-100"
                }`}
              >
                <Icon size={20} />
                <span>{item.label}</span>
              </Link>
            );
          })}
        </nav>
      </div>

      <div className="flex-1 flex flex-col overflow-hidden">
        <header className="bg-white border-b border-gray-200 px-6 py-4 flex items-center gap-4">
          <button
            onClick={() => setSidebarOpen(!sidebarOpen)}
            className="p-2 hover:bg-gray-100 rounded-lg"
          >
            {sidebarOpen ? <X size={20} /> : <Menu size={20} />}
          </button>
          <div className="flex-1">
            <h2 className="text-lg font-semibold text-gray-800">
              Sistema de Gestão Patrimonial - MVP
            </h2>
          </div>
        </header>

        <main className="flex-1 overflow-auto p-6">
          {children}
        </main>
      </div>
    </div>
  );
}
