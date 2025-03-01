import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider } from './contexts/AuthContext';
import { ThemeProvider } from './contexts/ThemeContext';
import { StoreProvider } from './contexts/StoreContext';
import Layout from './components/Layout';
import Login from './pages/Login';
import Dashboard from './pages/Dashboard';
import Clients from './pages/Clients';
import Projects from './pages/Projects';
import Tasks from './pages/Tasks';
import CreativeWorkflow from './pages/CreativeWorkflow';
import Reports from './pages/Reports';
import Settings from './pages/Settings';
import UserManagement from './pages/UserManagement';
import ClientDashboard from './pages/client/Dashboard';
import ClientProjects from './pages/client/Projects';
import ClientFeedback from './pages/client/Feedback';
import ClientInvoices from './pages/client/Invoices';
import ClientReports from './pages/client/Reports';
import ClientCreative from './pages/client/Creative';
import FileManager from './components/FileManager';
import FinancialDashboard from './components/FinancialDashboard';

function App() {
  console.log('App component rendering...');
  
  try {
    return (
      <AuthProvider>
        <ThemeProvider>
          <StoreProvider>
            <Router>
              <Routes>
                <Route path="/login" element={<Login />} />
                
                {/* Agency Routes */}
                <Route path="/" element={<Layout />}>
                  <Route index element={<Dashboard />} />
                  <Route path="clients" element={<Clients />} />
                  <Route path="projects" element={<Projects />} />
                  <Route path="tasks" element={<Tasks />} />
                  <Route path="creative" element={<CreativeWorkflow />} />
                  <Route path="files" element={<FileManager />} />
                  <Route path="financial" element={<FinancialDashboard />} />
                  <Route path="reports" element={<Reports />} />
                  <Route path="settings" element={<Settings />} />
                  <Route path="user-management" element={<UserManagement />} />
                </Route>
                
                {/* Client Routes */}
                <Route path="/client" element={<Layout isClientView={true} />}>
                  <Route index element={<ClientDashboard />} />
                  <Route path="projects" element={<ClientProjects />} />
                  <Route path="creative" element={<ClientCreative />} />
                  <Route path="feedback" element={<ClientFeedback />} />
                  <Route path="invoices" element={<ClientInvoices />} />
                  <Route path="reports" element={<ClientReports />} />
                </Route>
                
                <Route path="*" element={<Navigate to="/" replace />} />
              </Routes>
            </Router>
          </StoreProvider>
        </ThemeProvider>
      </AuthProvider>
    );
  } catch (error) {
    console.error('Error rendering App component:', error);
    return (
      <div className="p-8 bg-red-100 text-red-800 rounded-lg">
        <h1 className="text-2xl font-bold mb-4">Uygulama Hatası</h1>
        <p>Uygulama yüklenirken bir hata oluştu. Lütfen sayfayı yenileyin veya daha sonra tekrar deneyin.</p>
        <pre className="mt-4 p-4 bg-red-50 rounded overflow-auto">
          {error instanceof Error ? error.message : String(error)}
        </pre>
      </div>
    );
  }
}

export default App;