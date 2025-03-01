import React, { useState, useEffect } from 'react';
import { useAuth } from '../contexts/AuthContext';
import { 
  Plus, Search, Filter, MoreVertical, 
  Calendar, Users, Clock, CheckCircle, 
  AlertCircle, XCircle, ArrowUpRight 
} from 'lucide-react';

// Project status types
type ProjectStatus = 'active' | 'completed' | 'on-hold' | 'cancelled';

// Project type definition
interface Project {
  id: string;
  name: string;
  client: string;
  storeId: string; // Store ID this project belongs to
  status: ProjectStatus;
  startDate: string;
  endDate: string;
  budget: number;
  team: string[];
  progress: number;
  description: string;
}

// Sample project data
const projectsData: Project[] = [
  {
    id: 'PRJ001',
    name: 'Website Redesign',
    client: 'Acme Corporation',
    storeId: 'store1',
    status: 'active',
    startDate: '2025-05-01',
    endDate: '2025-07-15',
    budget: 15000,
    team: ['John Doe', 'Sarah Smith', 'Mike Johnson'],
    progress: 65,
    description: 'Complete redesign of corporate website with focus on user experience and conversion optimization.'
  },
  {
    id: 'PRJ002',
    name: 'Social Media Campaign',
    client: 'TechStart Inc.',
    storeId: 'store2',
    status: 'active',
    startDate: '2025-04-15',
    endDate: '2025-06-30',
    budget: 8500,
    team: ['Emily Brown', 'David Wilson'],
    progress: 40,
    description: 'Summer promotional campaign across Instagram, Facebook, and Twitter to increase brand awareness.'
  },
  {
    id: 'PRJ003',
    name: 'SEO Optimization',
    client: 'Global Retail',
    storeId: 'store3',
    status: 'completed',
    startDate: '2025-02-10',
    endDate: '2025-04-10',
    budget: 6000,
    team: ['Alex Johnson', 'Lisa Wang'],
    progress: 100,
    description: 'Technical SEO audit and implementation of recommendations to improve search rankings.'
  },
  {
    id: 'PRJ004',
    name: 'Email Marketing Automation',
    client: 'HealthPlus',
    storeId: 'store4',
    status: 'on-hold',
    startDate: '2025-03-01',
    endDate: '2025-05-15',
    budget: 4500,
    team: ['Robert Chen', 'Maria Garcia'],
    progress: 30,
    description: 'Setup of automated email sequences for customer onboarding and retention.'
  },
  {
    id: 'PRJ005',
    name: 'Brand Identity Refresh',
    client: 'Urban Outfitters',
    storeId: 'store5',
    status: 'active',
    startDate: '2025-05-10',
    endDate: '2025-07-30',
    budget: 12000,
    team: ['Jennifer Lee', 'Chris Martin', 'Sam Taylor'],
    progress: 25,
    description: 'Refreshing the brand identity including logo, color palette, and brand guidelines.'
  },
  {
    id: 'PRJ006',
    name: 'Google Ads Campaign',
    client: 'EcoFriendly Products',
    storeId: 'store6',
    status: 'cancelled',
    startDate: '2025-04-01',
    endDate: '2025-06-15',
    budget: 7500,
    team: ['Tom Wilson', 'Anna Schmidt'],
    progress: 15,
    description: 'PPC campaign targeting eco-conscious consumers with focus on ROI optimization.'
  },
  {
    id: 'PRJ007',
    name: 'Product Launch Campaign',
    client: 'Acme Corporation',
    storeId: 'store1',
    status: 'active',
    startDate: '2025-06-01',
    endDate: '2025-08-15',
    budget: 18000,
    team: ['John Doe', 'Emily Brown'],
    progress: 20,
    description: 'Marketing campaign for new product launch including social media, email, and PR.'
  },
  {
    id: 'PRJ008',
    name: 'Trendyol Panel Yönetimi',
    client: 'A Firması',
    storeId: 'store7',
    status: 'active',
    startDate: '2024-02-03',
    endDate: '2024-03-15',
    budget: 15000,
    team: ['Mustafa Yılmaz', 'Emirhan Pirgon'],
    progress: 45,
    description: 'Trendyol mağaza panelinin yönetimi, ürün optimizasyonu ve kampanya oluşturma.'
  },
  {
    id: 'PRJ009',
    name: 'Banner Tasarımı',
    client: 'A Firması',
    storeId: 'store7',
    status: 'active',
    startDate: '2024-02-10',
    endDate: '2024-02-20',
    budget: 5000,
    team: ['Emirhan Pirgon'],
    progress: 100,
    description: 'E-ticaret platformları için banner tasarımları oluşturma.'
  },
  {
    id: 'PRJ010',
    name: 'Trendyol Panel Yönetimi',
    client: 'B Firması',
    storeId: 'store8',
    status: 'active',
    startDate: '2024-02-17',
    endDate: '2024-03-30',
    budget: 15000,
    team: ['Mustafa Yılmaz', 'Emirhan Pirgon'],
    progress: 30,
    description: 'Trendyol mağaza panelinin yönetimi, ürün optimizasyonu ve kampanya oluşturma.'
  },
  {
    id: 'PRJ011',
    name: 'Meta Reklam Yönetimi',
    client: 'B Firması',
    storeId: 'store8',
    status: 'active',
    startDate: '2024-02-20',
    endDate: '2024-03-25',
    budget: 10000,
    team: ['Mehmet Kaya'],
    progress: 60,
    description: 'Facebook ve Instagram reklamlarının oluşturulması, yönetimi ve optimizasyonu.'
  },
  {
    id: 'PRJ012',
    name: 'Sosyal Medya Yönetimi',
    client: 'B Firması',
    storeId: 'store8',
    status: 'active',
    startDate: '2024-02-25',
    endDate: '2024-04-10',
    budget: 8000,
    team: ['Mehmet Kaya', 'Emirhan Pirgon'],
    progress: 25,
    description: 'Sosyal medya hesaplarının yönetimi, içerik üretimi ve etkileşim artırma.'
  }
];

const Projects: React.FC = () => {
  const { user, getAccessibleStores } = useAuth();
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState<ProjectStatus | 'all'>('all');
  const [currentStoreId, setCurrentStoreId] = useState<string | null>(null);
  const accessibleStores = getAccessibleStores();
  
  // Set initial store based on user role
  useEffect(() => {
    if (accessibleStores.length > 0) {
      // For clients, use their store
      if (user?.role === 'client' && user.storeId) {
        setCurrentStoreId(user.storeId);
      } else {
        // For team members and managers, use the first store in the list
        setCurrentStoreId(accessibleStores[0].id);
      }
    }
  }, [accessibleStores, user]);
  
  // Filter projects based on search term, status, and store access
  const filteredProjects = projectsData.filter(project => {
    const matchesSearch = project.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
                          project.client.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = statusFilter === 'all' || project.status === statusFilter;
    
    // Filter by store access
    let hasStoreAccess = false;
    if (user?.role === 'client') {
      // Clients can only see projects for their store
      hasStoreAccess = project.storeId === user.storeId;
    } else {
      // Team members and managers can see all projects or filter by selected store
      hasStoreAccess = currentStoreId ? project.storeId === currentStoreId : true;
    }
    
    return matchesSearch && matchesStatus && hasStoreAccess;
  });
  
  // Function to get status badge styling
  const getStatusBadge = (status: ProjectStatus) => {
    switch (status) {
      case 'active':
        return 'bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400';
      case 'completed':
        return 'bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-400';
      case 'on-hold':
        return 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900/30 dark:text-yellow-400';
      case 'cancelled':
        return 'bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-400';
      default:
        return 'bg-gray-100 text-gray-800 dark:bg-gray-700 dark:text-gray-300';
    }
  };
  
  // Function to get status icon
  const getStatusIcon = (status: ProjectStatus) => {
    switch (status) {
      case 'active':
        return <CheckCircle className="w-4 h-4" />;
      case 'completed':
        return <CheckCircle className="w-4 h-4" />;
      case 'on-hold':
        return <AlertCircle className="w-4 h-4" />;
      case 'cancelled':
        return <XCircle className="w-4 h-4" />;
      default:
        return null;
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
        <h1 className="text-2xl font-bold text-gray-900 dark:text-white">Projects</h1>
        <div className="mt-3 sm:mt-0">
          <button className="inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500">
            <Plus className="w-4 h-4 mr-2" />
            New Project
          </button>
        </div>
      </div>
      
      {/* Filters */}
      <div className="bg-white dark:bg-gray-800 shadow rounded-lg p-4">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between space-y-3 md:space-y-0 md:space-x-4">
          <div className="flex-1 max-w-md">
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <Search className="h-5 w-5 text-gray-400" />
              </div>
              <input
                type="text"
                className="block w-full pl-10 pr-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md leading-5 bg-white dark:bg-gray-700 placeholder-gray-500 dark:placeholder-gray-400 focus:outline-none focus:placeholder-gray-400 focus:ring-1 focus:ring-blue-500 focus:border-blue-500 dark:text-white sm:text-sm"
                placeholder="Search projects or clients"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
          </div>
          
          <div className="flex items-center space-x-2">
            <div className="relative inline-block text-left">
              <div className="flex items-center">
                <Filter className="h-5 w-5 text-gray-400 mr-2" />
                <select
                  className="block w-full pl-3 pr-10 py-2 text-base border-gray-300 dark:border-gray-600 focus:outline-none focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:text-white sm:text- sm rounded-md"
                  value={statusFilter}
                  onChange={(e) => setStatusFilter(e.target.value as ProjectStatus | 'all')}
                >
                  <option value="all">All Status</option>
                  <option value="active">Active</option>
                  <option value="completed">Completed</option>
                  <option value="on-hold">On Hold</option>
                  <option value="cancelled">Cancelled</option>
                </select>
              </div>
            </div>
          </div>
        </div>
      </div>
      
      {/* Projects List */}
      <div className="bg-white dark:bg-gray-800 shadow overflow-hidden sm:rounded-md">
        <ul className="divide-y divide-gray-200 dark:divide-gray-700">
          {filteredProjects.length > 0 ? (
            filteredProjects.map((project) => (
              <li key={project.id}>
                <div className="px-4 py-4 sm:px-6">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center">
                      <p className="text-sm font-medium text-blue-600 dark:text-blue-400 truncate">{project.name}</p>
                      <div className={`ml-2 flex-shrink-0 flex ${getStatusBadge(project.status)} px-2 py-0.5 rounded-full text-xs font-medium items-center`}>
                        {getStatusIcon(project.status)}
                        <span className="ml-1 capitalize">{project.status}</span>
                      </div>
                    </div>
                    <div className="ml-2 flex-shrink-0 flex">
                      <button className="p-1 rounded-full text-gray-400 dark:text-gray-500 hover:text-gray-500 dark:hover:text-gray-400">
                        <MoreVertical className="h-5 w-5" />
                      </button>
                    </div>
                  </div>
                  <div className="mt-2 sm:flex sm:justify-between">
                    <div className="sm:flex">
                      <p className="flex items-center text-sm text-gray-500 dark:text-gray-400">
                        <Users className="flex-shrink-0 mr-1.5 h-4 w-4 text-gray-400 dark:text-gray-500" />
                        {project.client}
                      </p>
                      <p className="mt-2 flex items-center text-sm text-gray-500 dark:text-gray-400 sm:mt-0 sm:ml-6">
                        <Calendar className="flex-shrink-0 mr-1.5 h-4 w-4 text-gray-400 dark:text-gray-500" />
                        {new Date(project.endDate).toLocaleDateString()}
                      </p>
                    </div>
                    <div className="mt-2 flex items-center text-sm text-gray-500 dark:text-gray-400 sm:mt-0">
                      <Clock className="flex-shrink-0 mr-1.5 h-4 w-4 text-gray-400 dark:text-gray-500" />
                      <p>
                        ${project.budget.toLocaleString()}
                      </p>
                    </div>
                  </div>
                  <div className="mt-2">
                    <div className="flex items-center">
                      <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2.5">
                        <div 
                          className="bg-blue-600 h-2.5 rounded-full" 
                          style={{ width: `${project.progress}%` }}
                        ></div>
                      </div>
                      <span className="ml-2 text-sm text-gray-500 dark:text-gray-400">{project.progress}%</span>
                    </div>
                  </div>
                  <div className="mt-2 flex justify-end">
                    <button className="inline-flex items-center px-2.5 py-1.5 border border-transparent text-xs font-medium rounded text-blue-700 dark:text-blue-400 bg-blue-100 dark:bg-blue-900/30 hover:bg-blue-200 dark:hover:bg-blue-900/50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500">
                      View details
                      <ArrowUpRight className="ml-1 h-3 w-3" />
                    </button>
                  </div>
                </div>
              </li>
            ))
          ) : (
            <li className="px-4 py-6 text-center text-gray-500 dark:text-gray-400">
              No projects found matching your criteria.
            </li>
          )}
        </ul>
      </div>
    </div>
  );
};

export default Projects;