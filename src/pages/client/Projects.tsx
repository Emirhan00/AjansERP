import React, { useState } from 'react';
import { 
  Search, Filter, MoreVertical, Calendar, 
  Clock, CheckCircle, AlertCircle, XCircle, 
  ArrowUpRight, FileText, MessageSquare 
} from 'lucide-react';

// Project status types
type ProjectStatus = 'active' | 'completed' | 'on-hold' | 'cancelled';

// Project type definition
interface Project {
  id: string;
  name: string;
  status: ProjectStatus;
  startDate: string;
  endDate: string;
  budget: number;
  spent: number;
  progress: number;
  description: string;
  manager: string;
}

// Sample project data for client view
const clientProjectsData: Project[] = [
  {
    id: 'PRJ001',
    name: 'Website Redesign',
    status: 'active',
    startDate: '2025-05-01',
    endDate: '2025-07-15',
    budget: 15000,
    spent: 9750,
    progress: 65,
    description: 'Complete redesign of corporate website with focus on user experience and conversion optimization.',
    manager: 'John Doe'
  },
  {
    id: 'PRJ002',
    name: 'Social Media Campaign',
    status: 'active',
    startDate: '2025-04-15',
    endDate: '2025-06-30',
    budget: 8500,
    spent: 3400,
    progress: 40,
    description: 'Summer promotional campaign across Instagram, Facebook, and Twitter to increase brand awareness.',
    manager: 'Emily Brown'
  },
  {
    id: 'PRJ003',
    name: 'SEO Optimization',
    status: 'completed',
    startDate: '2025-02-10',
    endDate: '2025-04-10',
    budget: 6000,
    spent: 6000,
    progress: 100,
    description: 'Technical SEO audit and implementation of recommendations to improve search rankings.',
    manager: 'Alex Johnson'
  }
];

const ClientProjects: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState<ProjectStatus | 'all'>('all');
  
  // Filter projects based on search term and status
  const filteredProjects = clientProjectsData.filter(project => {
    const matchesSearch = project.name.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = statusFilter === 'all' || project.status === statusFilter;
    return matchesSearch && matchesStatus;
  });
  
  // Function to get status badge styling
  const getStatusBadge = (status: ProjectStatus) => {
    switch (status) {
      case 'active':
        return 'bg-green-100 text-green-800';
      case 'completed':
        return 'bg-blue-100 text-blue-800';
      case 'on-hold':
        return 'bg-yellow-100 text-yellow-800';
      case 'cancelled':
        return 'bg-red-100 text-red-800';
      default:
        return 'bg-gray-100 text-gray-800';
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
        <h1 className="text-2xl font-bold text-gray-900">My Projects</h1>
      </div>
      
      {/* Filters */}
      <div className="bg-white shadow rounded-lg p-4">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between space-y-3 md:space-y-0 md:space-x-4">
          <div className="flex-1 max-w-md">
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <Search className="h-5 w-5 text-gray-400" />
              </div>
              <input
                type="text"
                className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md leading-5 bg-white placeholder-gray-500 focus:outline-none focus:placeholder-gray-400 focus:ring-1 focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                placeholder="Search projects"
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
                  className="block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm rounded-md"
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
      <div className="bg-white shadow overflow-hidden sm:rounded-md">
        <ul className="divide-y divide-gray-200">
          {filteredProjects.map((project) => (
            <li key={project.id}>
              <div className="px-4 py-4 sm:px-6">
                <div className="flex items-center justify-between">
                  <div className="flex items-center">
                    <p className="text-sm font-medium text-blue-600 truncate">{project.name}</p>
                    <div className={`ml-2 flex-shrink-0 flex ${getStatusBadge(project.status)} px-2 py-0.5 rounded-full text-xs font-medium items-center`}>
                      {getStatusIcon(project.status)}
                      <span className="ml-1 capitalize">{project.status}</span>
                    </div>
                  </div>
                  <div className="ml-2 flex-shrink-0 flex">
                    <button className="p-1 rounded-full text-gray-400 hover:text-gray-500">
                      <MoreVertical className="h-5 w-5" />
                    </button>
                  </div>
                </div>
                <div className="mt-2 sm:flex sm:justify-between">
                  <div className="sm:flex">
                    <p className="flex items-center text-sm text-gray-500">
                      <Calendar className="flex-shrink-0 mr-1.5 h-4 w-4 text-gray-400" />
                      {new Date(project.startDate).toLocaleDateString()} - {new Date(project.endDate).toLocaleDateString()}
                    </p>
                  </div>
                  <div className="mt-2 flex items-center text-sm text-gray-500 sm:mt-0">
                    <Clock className="flex-shrink-0 mr-1.5 h-4 w-4 text-gray-400" />
                    <p>
                      Budget: ${project.budget.toLocaleString()} | Spent: ${project.spent.toLocaleString()} ({Math.round((project.spent / project.budget) * 100)}%)
                    </p>
                  </div>
                </div>
                <div className="mt-2">
                  <div className="flex items-center">
                    <div className="w-full bg-gray-200 rounded-full h-2.5">
                      <div 
                        className="bg-blue-600 h-2.5 rounded-full" 
                        style={{ width: `${project.progress}%` }}
                      ></div>
                    </div>
                    <span className="ml-2 text-sm text-gray-500">{project.progress}%</span>
                  </div>
                </div>
                <div className="mt-3 flex justify-between items-center">
                  <div className="text-sm text-gray-500">
                    <span className="font-medium">Project Manager:</span> {project.manager}
                  </div>
                  <div className="flex space-x-2">
                    <button className="inline-flex items-center px-2.5 py-1.5 border border-transparent text-xs font-medium rounded text-green-700 bg-green-100 hover:bg-green-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500">
                      <FileText className="mr-1 h-3 w-3" />
                      View Files
                    </button>
                    <button className="inline-flex items-center px-2.5 py-1.5 border border-transparent text-xs font-medium rounded text-purple-700 bg-purple-100 hover:bg-purple-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-purple-500">
                      <MessageSquare className="mr-1 h-3 w-3" />
                      Feedback
                    </button>
                    <button className="inline-flex items-center px-2.5 py-1.5 border border-transparent text-xs font-medium rounded text-blue-700 bg-blue-100 hover:bg-blue-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500">
                      Details
                      <ArrowUpRight className="ml-1 h-3 w-3" />
                    </button>
                  </div>
                </div>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default ClientProjects;