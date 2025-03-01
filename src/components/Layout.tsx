import React, { useState } from 'react';
import { Outlet, Navigate, Link, useLocation } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import { useTheme } from '../contexts/ThemeContext';
import StoreSelector from './StoreSelector';
import AIAssistant from './AIAssistant';
import { 
  LayoutDashboard, Users, Briefcase, CheckSquare, 
  PenTool, BarChart3, Settings, LogOut, Bell, Search,
  Menu, X, Moon, Sun, FileText, DollarSign, Layers,
  UserCog
} from 'lucide-react';
import { useStore } from '../contexts/StoreContext';

interface LayoutProps {
  isClientView?: boolean;
}

const Layout: React.FC<LayoutProps> = ({ isClientView = false }) => {
  const { user, logout, isAuthenticated } = useAuth();
  const { theme, toggleTheme } = useTheme();
  const { currentStore } = useStore();
  const location = useLocation();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = React.useState(false);

  if (!isAuthenticated) {
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  const agencyNavItems = [
    { name: 'Gösterge Paneli', path: '/', icon: <LayoutDashboard className="w-5 h-5" /> },
    { name: 'Müşteriler', path: '/clients', icon: <Users className="w-5 h-5" /> },
    { name: 'Projeler', path: '/projects', icon: <Briefcase className="w-5 h-5" /> },
    { name: 'Görevler', path: '/tasks', icon: <CheckSquare className="w-5 h-5" /> },
    { name: 'Yaratıcı İş Akışı', path: '/creative', icon: <PenTool className="w-5 h-5" /> },
    { name: 'Dosya Yönetimi', path: '/files', icon: <FileText className="w-5 h-5" /> },
    { name: 'Finansal', path: '/financial', icon: <DollarSign className="w-5 h-5" /> },
    { name: 'Raporlar', path: '/reports', icon: <BarChart3 className="w-5 h-5" /> },
    { name: 'Ayarlar', path: '/settings', icon: <Settings className="w-5 h-5" /> },
  ];

  // Yöneticiler için ek menü öğeleri
  if (user?.role === 'manager' || user?.role === 'admin') {
    agencyNavItems.push(
      { name: 'Kullanıcı Yönetimi', path: '/user-management', icon: <UserCog className="w-5 h-5" /> }
    );
  }

  const clientNavItems = [
    { name: 'Gösterge Paneli', path: '/client', icon: <LayoutDashboard className="w-5 h-5" /> },
    { name: 'Projeler', path: '/client/projects', icon: <Briefcase className="w-5 h-5" /> },
    { name: 'Yaratıcı İçerikler', path: '/client/creative', icon: <Layers className="w-5 h-5" /> },
    { name: 'Geri Bildirim', path: '/client/feedback', icon: <PenTool className="w-5 h-5" /> },
    { name: 'Faturalar', path: '/client/invoices', icon: <DollarSign className="w-5 h-5" /> },
    { name: 'Raporlar', path: '/client/reports', icon: <BarChart3 className="w-5 h-5" /> },
  ];

  const navItems = isClientView ? clientNavItems : agencyNavItems;

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  // Only show StoreSelector for team members, managers, and admins
  const showStoreSelector = user && ['team_member', 'manager', 'admin'].includes(user.role);

  return (
    <div className="flex min-h-screen bg-gray-50 dark:bg-gray-900 transition-colors duration-200">
      {/* Sidebar */}
      <aside className={`fixed inset-y-0 left-0 z-50 w-64 bg-white dark:bg-gray-800 shadow-lg transform ${isMobileMenuOpen ? 'translate-x-0' : '-translate-x-full'} md:translate-x-0 transition-transform duration-300 ease-in-out`}>
        <div className="flex flex-col h-full">
          <div className="flex items-center justify-between px-6 py-4 border-b dark:border-gray-700">
            <div className="flex items-center space-x-2">
              <div className="bg-blue-600 text-white p-2 rounded-md">
                <PenTool className="w-5 h-5" />
              </div>
              <span className="text-xl font-bold text-gray-800 dark:text-white">
                {isClientView ? 'Müşteri Portalı' : 'Ajans ERP'}
              </span>
            </div>
            <button 
              className="md:hidden text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-300"
              onClick={toggleMobileMenu}
            >
              <X className="w-6 h-6" />
            </button>
          </div>
          
          <nav className="flex-1 px-4 py-4 overflow-y-auto">
            <ul className="space-y-1">
              {navItems.map((item) => (
                <li key={item.path}>
                  <Link
                    to={item.path}
                    className={`flex items-center px-4 py-3 text-gray-700 dark:text-gray-300 rounded-md hover:bg-blue-50 dark:hover:bg-gray-700 hover:text-blue-600 dark:hover:text-blue-400 transition-colors ${
                      location.pathname === item.path ? 'bg-blue-50 dark:bg-gray-700 text-blue-600 dark:text-blue-400 font-medium' : ''
                    }`}
                    onClick={() => setIsMobileMenuOpen(false)}
                  >
                    {item.icon}
                    <span className="ml-3">{item.name}</span>
                  </Link>
                </li>
              ))}
            </ul>
          </nav>
          
          <div className="p-4 border-t dark:border-gray-700">
            <button
              onClick={logout}
              className="flex items-center w-full px-4 py-2 text-gray-700 dark:text-gray-300 rounded-md hover:bg-red-50 dark:hover:bg-red-900/20 hover:text-red-600 dark:hover:text-red-400 transition-colors"
            >
              <LogOut className="w-5 h-5" />
              <span className="ml-3">Çıkış Yap</span>
            </button>
          </div>
        </div>
      </aside>

      {/* Main Content */}
      <div className="flex-1 md:ml-64 flex flex-col">
        {/* Header */}
        <header className="sticky top-0 z-10 bg-white dark:bg-gray-800 shadow-sm">
          <div className="flex items-center justify-between px-6 py-4">
            <div className="flex items-center md:hidden">
              <button 
                className="text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-300"
                onClick={toggleMobileMenu}
              >
                <Menu className="w-6 h-6" />
              </button>
            </div>
            
            <div className="flex items-center space-x-4">
              {/* Store Selector */}
              {showStoreSelector && (
                <div className="relative">
                  <StoreSelector />
                </div>
              )}
              
              <div className="relative flex-1 max-w-md">
                <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                  <Search className="w-5 h-5 text-gray-400" />
                </div>
                <input
                  type="text"
                  className="w-full py-2 pl-10 pr-4 text-gray-700 dark:text-gray-200 bg-gray-100 dark:bg-gray-700 border-0 rounded-md focus:bg-white dark:focus:bg-gray-600 focus:ring-2 focus:ring-blue-500 focus:outline-none"
                  placeholder="Ara..."
                />
              </div>
            </div>
            
            <div className="flex items-center space-x-4">
              <button 
                onClick={toggleTheme}
                className="p-1 text-gray-500 dark:text-gray-400 rounded-full hover:bg-gray-100 dark:hover:bg-gray-700 hover:text-gray-600 dark:hover:text-gray-300"
              >
                {theme === 'dark' ? <Sun className="w-6 h-6" /> : <Moon className="w-6 h-6" />}
              </button>
              
              <button className="relative p-1 text-gray-500 dark:text-gray-400 rounded-full hover:bg-gray-100 dark:hover:bg-gray-700 hover:text-gray-600 dark:hover:text-gray-300">
                <Bell className="w-6 h-6" />
                <span className="absolute top-0 right-0 w-2 h-2 bg-red-500 rounded-full"></span>
              </button>
              
              <div className="flex items-center">
                {user?.avatar ? (
                  <img
                    src={user.avatar}
                    alt={user.name}
                    className="w-8 h-8 rounded-full"
                  />
                ) : (
                  <div className="flex items-center justify-center w-8 h-8 bg-blue-100 dark:bg-blue-900 rounded-full">
                    <span className="text-sm font-medium text-blue-600 dark:text-blue-300">
                      {user?.name?.charAt(0) || 'K'}
                    </span>
                  </div>
                )}
                <span className="ml-2 text-sm font-medium text-gray-700 dark:text-gray-300 hidden md:block">
                  {user?.name}
                </span>
              </div>
            </div>
          </div>
        </header>

        {/* Page Content */}
        <main className="p-6 flex-grow bg-gray-50 dark:bg-gray-900">
          <Outlet />
        </main>
        
        {/* AI Assistant */}
        <AIAssistant />
      </div>
    </div>
  );
};

export default Layout;