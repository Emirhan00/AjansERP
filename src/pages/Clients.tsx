import React, { useState, useEffect } from 'react';
import { useAuth } from '../contexts/AuthContext';
import { 
  Plus, Search, Filter, MoreVertical, 
  Mail, Phone, Calendar, Briefcase, 
  ArrowUpRight, User, Building, MapPin 
} from 'lucide-react';

// Client type definition
interface Client {
  id: string;
  name: string;
  company: string;
  storeId: string; // Store ID this client belongs to
  email: string;
  phone: string;
  address: string;
  joinDate: string;
  activeProjects: number;
  totalProjects: number;
  totalSpent: number;
  avatar?: string;
  status: 'active' | 'inactive';
}

// Sample clients data
const clientsData: Client[] = [
  {
    id: 'C001',
    name: 'John Smith',
    company: 'Acme Corporation',
    storeId: 'store1',
    email: 'john.smith@acme.com',
    phone: '+1 (555) 123-4567',
    address: '123 Business Ave, New York, NY 10001',
    joinDate: '2024-01-15',
    activeProjects: 2,
    totalProjects: 5,
    totalSpent: 25000,
    avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80',
    status: 'active'
  },
  {
    id: 'C002',
    name: 'Sarah Johnson',
    company: 'TechStart Inc.',
    storeId: 'store2',
    email: 'sarah@techstart.com',
    phone: '+1 (555) 987-6543',
    address: '456 Innovation Blvd, San Francisco, CA 94107',
    joinDate: '2024-02-20',
    activeProjects: 1,
    totalProjects: 2,
    totalSpent: 12500,
    avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-1.2.1&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80',
    status: 'active'
  },
  {
    id: 'C003',
    name: 'Michael Chen',
    company: 'Global Retail',
    storeId: 'store3',
    email: 'michael@globalretail.com',
    phone: '+1 (555) 456-7890',
    address: '789 Market St, Chicago, IL 60601',
    joinDate: '2023-11-10',
    activeProjects: 0,
    totalProjects: 3,
    totalSpent: 18000,
    avatar: 'https://images.unsplash.com/photo-1519244703995-f4e0f30006d5?ixlib=rb-1.2.1&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80',
    status: 'inactive'
  },
  {
    id: 'C004',
    name: 'Emily Davis',
    company: 'HealthPlus',
    storeId: 'store4',
    email: 'emily@healthplus.com',
    phone: '+1 (555) 789-0123',
    address: '321 Medical Dr, Boston, MA 02115',
    joinDate: '2024-03-05',
    activeProjects: 1,
    totalProjects: 1,
    totalSpent: 4500,
    avatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?ixlib=rb-1.2.1&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80',
    status: 'active'
  },
  {
    id: 'C005',
    name: 'David Wilson',
    company: 'Urban Outfitters',
    storeId: 'store5',
    email: 'david@urbanoutfitters.com',
    phone: '+1 (555) 234-5678',
    address: '567 Fashion Ave, Los Angeles, CA 90036',
    joinDate: '2024-01-30',
    activeProjects: 1,
    totalProjects: 2,
    totalSpent: 15000,
    avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?ixlib=rb-1.2.1&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80',
    status: 'active'
  },
  {
    id: 'C006',
    name: 'Lisa Wang',
    company: 'EcoFriendly Products',
    storeId: 'store6',
    email: 'lisa@ecofriendly.com',
    phone: '+1 (555) 345-6789',
    address: '890 Green St, Seattle, WA 98101',
    joinDate: '2023-12-15',
    activeProjects: 0,
    totalProjects: 1,
    totalSpent: 7500,
    avatar: 'https://images.unsplash.com/photo-1517841905240-472988babdf9?ixlib=rb-1.2.1&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80',
    status: 'inactive'
  },
  {
    id: 'C007',
    name: 'Ahmet Yıldız',
    company: 'A Firması',
    storeId: 'store7',
    email: 'afirmasi@example.com',
    phone: '+90 (555) 123-4567',
    address: 'Atatürk Cad. No:123, İstanbul, Türkiye',
    joinDate: '2024-02-03',
    activeProjects: 2,
    totalProjects: 2,
    totalSpent: 15000,
    avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-1.2.1&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80',
    status: 'active'
  },
  {
    id: 'C008',
    name: 'Mehmet Demir',
    company: 'B Firması',
    storeId: 'store8',
    email: 'bfirmasi@example.com',
    phone: '+90 (555) 987-6543',
    address: 'İnönü Cad. No:456, Ankara, Türkiye',
    joinDate: '2024-02-17',
    activeProjects: 3,
    totalProjects: 3,
    totalSpent: 25000,
    avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?ixlib=rb-1.2.1&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80',
    status: 'active'
  }
];

const Clients: React.FC = () => {
  const { user, getAccessibleStores } = useAuth();
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState<'all' | 'active' | 'inactive'>('all');
  const [selectedClient, setSelectedClient] = useState<Client | null>(null);
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
  
  // Filter clients based on search term, status, and store access
  const filteredClients = clientsData.filter(client => {
    const matchesSearch = client.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
                          client.company.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          client.email.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = statusFilter === 'all' || client.status === statusFilter;
    
    // Filter by store access
    let hasStoreAccess = false;
    if (user?.role === 'client') {
      // Clients can only see their own client profile
      hasStoreAccess = client.storeId === user.storeId && client.email === user.email;
    } else {
      // Team members, managers and admins can see all clients
      hasStoreAccess = true;
    }
    
    return matchesSearch && matchesStatus && hasStoreAccess;
  });
  
  // Format date
  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString();
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
        <h1 className="text-2xl font-bold text-gray-900 dark:text-white">Clients</h1>
        {/* Only show Add Client button for team members and managers */}
        {(user?.role === 'team_member' || user?.role === 'manager' || user?.role === 'admin') && (
          <div className="mt-3 sm:mt-0">
            <button className="inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500">
              <Plus className="w-4 h-4 mr-2" />
              Add Client
            </button>
          </div>
        )}
      </div>
      
      {/* Filters - Only show for team members and managers */}
      {(user?.role === 'team_member' || user?.role === 'manager' || user?.role === 'admin') && (
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
                  placeholder="Search clients"
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
                    className="block w-full pl-3 pr-10 py-2 text-base border-gray-300 dark:border-gray-600 focus:outline-none focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:text-white sm:text-sm rounded-md"
                    value={statusFilter}
                    onChange={(e) => setStatusFilter(e.target.value as 'all' | 'active' | 'inactive')}
                  >
                    <option value="all">All Status</option>
                    <option value="active">Active</option>
                    <option value="inactive">Inactive</option>
                  </select>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
      
      {/* Clients Grid */}
      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {filteredClients.map((client) => (
          <div 
            key={client.id}
            className="bg-white dark:bg-gray-800 overflow-hidden shadow rounded-lg cursor-pointer hover:shadow-md transition-shadow duration-200"
            onClick={() => setSelectedClient(client)}
          >
            <div className="px-4 py-5 sm:p-6">
              <div className="flex items-center">
                <div className="flex-shrink-0 h-12 w-12">
                  {client.avatar ? (
                    <img
                      className="h-12 w-12 rounded-full"
                      src={client.avatar}
                      alt={client.name}
                    />
                  ) : (
                    <div className="h-12 w-12 rounded-full bg-gray-200 dark:bg-gray-700 flex items-center justify-center">
                      <User className="h-6 w-6 text-gray-500 dark:text-gray-400" />
                    </div>
                  )}
                </div>
                <div className="ml-4 flex-1">
                  <h3 className="text-lg font-medium text-gray-900 dark:text-white">{client.name}</h3>
                  <div className="flex items-center text-sm text-gray-500 dark:text-gray-400">
                    <Building className="flex-shrink-0 mr-1.5 h-4 w-4 text-gray-400 dark:text-gray-500" />
                    <p>{client.company}</p>
                  </div>
                </div>
                <div className="ml-2">
                  <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                    client.status === 'active' ? 'bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400' : 'bg-gray-100 text-gray-800 dark:bg-gray-700 dark:text-gray-300'
                  }`}>
                    {client.status === 'active' ? 'Active' : 'Inactive'}
                  </span>
                </div>
              </div>
              
              <div className="mt-4 grid grid-cols-2 gap-4">
                <div className="col-span-2">
                  <div className="flex items-center text-sm text-gray-500 dark:text-gray-400">
                    <Mail className="flex-shrink-0 mr-1.5 h-4 w-4 text-gray-400 dark:text-gray-500" />
                    <p className="truncate">{client.email}</p>
                  </div>
                </div>
                <div className="col-span-2">
                  <div className="flex items-center text-sm text-gray-500 dark:text-gray-400">
                    <Phone className="flex-shrink-0 mr-1.5 h-4 w-4 text-gray-400 dark:text-gray-500" />
                    <p>{client.phone}</p>
                  </div>
                </div>
                <div>
                  <div className="flex items-center text-sm text-gray-500 dark:text-gray-400">
                    <Calendar className="flex-shrink-0 mr-1.5 h-4 w-4 text-gray-400 dark:text-gray-500" />
                    <p>Joined: {formatDate(client.joinDate)}</p>
                  </div>
                </div>
                <div>
                  <div className="flex items-center text-sm text-gray-500 dark:text-gray-400">
                    <Briefcase className="flex-shrink-0 mr-1.5 h-4 w-4 text-gray-400 dark:text-gray-500" />
                    <p>{client.activeProjects} active projects</p>
                  </div>
                </div>
              </div>
              
              <div className="mt-4 flex justify-end">
                <button className="inline-flex items-center px-2.5 py-1.5 border border-transparent text-xs font-medium rounded text-blue-700 dark:text-blue-400 bg-blue-100 dark:bg-blue-900/30 hover:bg-blue-200 dark:hover:bg-blue-900/50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500">
                  View details
                  <ArrowUpRight className="ml-1 h-3 w-3" />
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
      
      {/* Client Detail Modal */}
      {selectedClient && (
        <div className="fixed inset-0 overflow-y-auto z-50">
          <div className="flex items-center justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
            <div className="fixed inset-0 transition-opacity" aria-hidden="true">
              <div className="absolute inset-0 bg-gray-500 dark:bg-gray-900 opacity-75"></div>
            </div>
            
            <span className="hidden sm:inline-block sm:align-middle sm:h-screen" aria-hidden="true">&#8203;</span>
            
            <div className="inline-block align-bottom bg-white dark:bg-gray-800 rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full">
              <div className="bg-white dark:bg-gray-800 px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
                <div className="sm:flex sm:items-start">
                  <div className="mt-3 text-center sm:mt-0 sm:ml-4 sm:text-left w-full">
                    <div className="flex justify-between items-center">
                      <h3 className="text-lg leading-6 font-medium text-gray-900 dark:text-white">
                        Client Details
                      </h3>
                      <button
                        type="button"
                        className="bg-white dark:bg-gray-800 rounded-md text-gray-400 dark:text-gray-500 hover:text-gray-500 dark:hover:text-gray-400 focus:outline-none"
                        onClick={() => setSelectedClient(null)}
                      >
                        <span className="sr-only">Close</span>
                        <svg className="h-6 w-6" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                        </svg>
                      </button>
                    </div>
                    
                    <div className="mt-4">
                      <div className="flex items-center">
                        <div className="flex-shrink-0 h-16 w-16">
                          {selectedClient.avatar ? (
                            <img
                              className="h-16 w-16 rounded-full"
                              src={selectedClient.avatar}
                              alt={selectedClient.name}
                            />
                          ) : (
                            <div className="h-16 w-16 rounded-full bg-gray-200 dark:bg-gray-700 flex items-center justify-center">
                              <User className="h-8 w-8 text-gray-500 dark:text-gray-400" />
                            </div>
                          )}
                        </div>
                        <div className="ml-4">
                          <h4 className="text-lg font-bold text-gray-900 dark:text-white">{selectedClient.name}</h4>
                          <p className="text-sm text-gray-500 dark:text-gray-400">{selectedClient.company}</p>
                          <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium mt-1 ${
                            selectedClient.status === 'active' ? 'bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400' : 'bg-gray-100 text-gray-800 dark:bg-gray-700 dark:text-gray-300'
                          }`}>
                            {selectedClient.status === 'active' ? 'Active' : 'Inactive'}
                          </span>
                        </div>
                      </div>
                      
                      <div className="mt-6 border-t border-gray-200 dark:border-gray-700 pt-4">
                        <dl className="grid grid-cols-1 gap-x-4 gap-y-6 sm:grid-cols-2">
                          <div className="sm:col-span-1">
                            <dt className="text-sm font-medium text-gray-500 dark:text-gray-400">Email</dt>
                            <dd className="mt-1 text-sm text-gray-900 dark:text-white flex items-center">
                              <Mail className="flex-shrink-0 mr-1.5 h-4 w-4 text-gray-400 dark:text-gray-500" />
                              <a href={`mailto:${selectedClient.email}`} className="text-blue-600 dark:text-blue-400 hover:text-blue-500">
                                {selectedClient.email}
                              </a>
                            </dd>
                          </div>
                          <div className="sm:col-span-1">
                            <dt className="text-sm font-medium text-gray-500 dark:text-gray-400">Phone</dt>
                            <dd className="mt-1 text-sm text-gray-900 dark:text-white flex items-center">
                              <Phone className="flex-shrink-0 mr-1.5 h-4 w-4 text-gray-400 dark:text-gray-500" />
                              <a href={`tel:${selectedClient.phone}`} className="text-blue-600 dark:text-blue-400 hover:text-blue-500">
                                {selectedClient.phone}
                              </a>
                            </dd>
                          </div>
                          <div className="sm:col-span-2">
                            <dt className="text-sm font-medium text-gray-500 dark:text-gray-400">Address</dt>
                            <dd className="mt-1 text-sm text-gray-900 dark:text-white flex items-start">
                              <MapPin className="flex-shrink-0 mr-1.5 h-4 w-4 text-gray-400 dark:text-gray-500 mt-0.5" />
                              <span>{selectedClient.address}</span>
                            </dd>
                          </div>
                          <div className="sm:col-span-1">
                            <dt className="text-sm font-medium text-gray-500 dark:text-gray-400">Join Date</dt>
                            <dd className="mt-1 text-sm text-gray-900 dark:text-white flex items-center">
                              <Calendar className="flex-shrink-0 mr-1.5 h-4 w-4 text-gray-400 dark:text-gray-500" />
                              <span>{formatDate(selectedClient.joinDate)}</span>
                            </dd>
                          </div>
                          <div className="sm:col-span-1">
                            <dt className="text-sm font-medium text-gray-500 dark:text-gray-400">Projects</dt>
                            <dd className="mt-1 text-sm text-gray-900 dark:text-white flex items-center">
                              <Briefcase className="flex-shrink-0 mr-1.5 h-4 w-4 text-gray-400 dark:text-gray-500" />
                              <span>{selectedClient.activeProjects} active / {selectedClient.totalProjects} total</span>
                            </dd>
                          </div>
                          <div className="sm:col-span-2">
                            <dt className="text-sm font-medium text-gray-500 dark:text-gray-400">Total Spent</dt>
                            <dd className="mt-1 text-sm text-gray-900 dark:text-white font-bold">
                              ${selectedClient.totalSpent.toLocaleString()}
                            </dd>
                          </div>
                        </dl>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="bg-gray-50 dark:bg-gray-700 px-4 py-3 sm:px-6 sm:flex sm:flex-row-reverse">
                <button
                  type="button"
                  className="w-full inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-blue-600 text-base font-medium text-white hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 sm:ml-3 sm:w-auto sm:text-sm"
                  onClick={() => {
                    // In a real app, this would navigate to the client's projects
                    setSelectedClient(null);
                  }}
                >
                  <Briefcase className="mr-2 h-4 w-4" />
                  View Projects
                </button>
                <button
                  type="button"
                  className="mt-3 w-full inline-flex justify-center rounded-md border border-gray-300 dark:border-gray-600 shadow-sm px-4 py-2 bg-white dark:bg-gray-800 text-base font-medium text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 sm:mt-0 sm:ml-3 sm:w-auto sm:text-sm"
                  onClick={() => setSelectedClient(null)}
                >
                  Close
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Clients;