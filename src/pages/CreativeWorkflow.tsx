import React, { useState } from 'react';
import { 
  Plus, Search, Filter, MoreVertical, 
  Clock, CheckCircle, AlertCircle, XCircle, 
  ArrowUpRight, FileText, MessageSquare, 
  ThumbsUp, ThumbsDown, Eye, Download
} from 'lucide-react';

// Creative item status types
type CreativeStatus = 'draft' | 'internal_review' | 'client_review' | 'approved' | 'rejected';

// Creative item type definition
interface CreativeItem {
  id: string;
  title: string;
  type: string;
  project: string;
  client: string;
  status: CreativeStatus;
  createdBy: string;
  createdAt: string;
  dueDate: string;
  version: number;
  thumbnailUrl: string;
  feedbackCount: number;
}

// Sample creative items data
const creativeItemsData: CreativeItem[] = [
  {
    id: 'CRE001',
    title: 'Homepage Banner Design',
    type: 'Banner',
    project: 'Website Redesign',
    client: 'Acme Corporation',
    status: 'client_review',
    createdBy: 'Sarah Smith',
    createdAt: '2025-05-15',
    dueDate: '2025-05-20',
    version: 2,
    thumbnailUrl: 'https://images.unsplash.com/photo-1561070791-2526d30994b5?ixlib=rb-1.2.1&auto=format&fit=crop&w=400&q=80',
    feedbackCount: 3
  },
  {
    id: 'CRE002',
    title: 'Summer Campaign Logo',
    type: 'Logo',
    project: 'Social Media Campaign',
    client: 'TechStart Inc.',
    status: 'internal_review',
    createdBy: 'David Wilson',
    createdAt: '2025-05-16',
    dueDate: '2025-05-22',
    version: 1,
    thumbnailUrl: 'https://images.unsplash.com/photo-1560157368-946d9c8f7cb6?ixlib=rb-1.2.1&auto=format&fit=crop&w=400&q=80',
    feedbackCount: 0
  },
  {
    id: 'CRE003',
    title: 'Product Page Mockup',
    type: 'UI Design',
    project: 'Website Redesign',
    client: 'Acme Corporation',
    status: 'approved',
    createdBy: 'Sarah Smith',
    createdAt: '2025-05-10',
    dueDate: '2025-05-15',
    version: 3,
    thumbnailUrl: 'https://images.unsplash.com/photo-1581291518633-83b4ebd1d83e?ixlib=rb-1.2.1&auto=format&fit=crop&w=400&q=80',
    feedbackCount: 5
  },
  {
    id: 'CRE004',
    title: 'Email Newsletter Template',
    type: 'Email',
    project: 'Email Marketing Automation',
    client: 'HealthPlus',
    status: 'draft',
    createdBy: 'Maria Garcia',
    createdAt: '2025-05-17',
    dueDate: '2025-05-25',
    version: 1,
    thumbnailUrl: 'https://images.unsplash.com/photo-1563986768609-322da13575f3?ixlib=rb-1.2.1&auto=format&fit=crop&w=400&q=80',
    feedbackCount: 0
  },
  {
    id: 'CRE005',
    title: 'Brand Guidelines Document',
    type: 'Document',
    project: 'Brand Identity Refresh',
    client: 'Urban Outfitters',
    status: 'rejected',
    createdBy: 'Jennifer Lee',
    createdAt: '2025-05-12',
    dueDate: '2025-05-18',
    version: 2,
    thumbnailUrl: 'https://images.unsplash.com/photo-1572044162444-ad60f128bdea?ixlib=rb-1.2.1&auto=format&fit=crop&w=400&q=80',
    feedbackCount: 4
  },
  {
    id: 'CRE006',
    title: 'Social Media Post Templates',
    type: 'Social Media',
    project: 'Social Media Campaign',
    client: 'TechStart Inc.',
    status: 'client_review',
    createdBy: 'Emily Brown',
    createdAt: '2025-05-14',
    dueDate: '2025-05-21',
    version: 1,
    thumbnailUrl: 'https://images.unsplash.com/photo-1611162617213-7d7a39e9b1d7?ixlib=rb-1.2.1&auto=format&fit=crop&w=400&q=80',
    feedbackCount: 2
  },
];

const CreativeWorkflow: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState<CreativeStatus | 'all'>('all');
  const [typeFilter, setTypeFilter] = useState<string>('all');
  
  // Get unique creative types for filter
  const creativeTypes = ['all', ...new Set(creativeItemsData.map(item => item.type))];
  
  // Filter creative items based on search term, status, and type
  const filteredItems = creativeItemsData.filter(item => {
    const matchesSearch = item.title.toLowerCase().includes(searchTerm.toLowerCase()) || 
                          item.project.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          item.client.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = statusFilter === 'all' || item.status === statusFilter;
    const matchesType = typeFilter === 'all' || item.type === typeFilter;
    return matchesSearch && matchesStatus && matchesType;
  });
  
  // Function to get status badge styling
  const getStatusBadge = (status: CreativeStatus) => {
    switch (status) {
      case 'draft':
        return 'bg-gray-100 text-gray-800';
      case 'internal_review':
        return 'bg-yellow-100 text-yellow-800';
      case 'client_review':
        return 'bg-blue-100 text-blue-800';
      case 'approved':
        return 'bg-green-100 text-green-800';
      case 'rejected':
        return 'bg-red-100 text-red-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };
  
  // Function to get status icon
  const getStatusIcon = (status: CreativeStatus) => {
    switch (status) {
      case 'draft':
        return <FileText className="w-4 h-4" />;
      case 'internal_review':
        return <Eye className="w-4 h-4" />;
      case 'client_review':
        return <MessageSquare className="w-4 h-4" />;
      case 'approved':
        return <ThumbsUp className="w-4 h-4" />;
      case 'rejected':
        return <ThumbsDown className="w-4 h-4" />;
      default:
        return null;
    }
  };
  
  // Function to format status for display
  const formatStatus = (status: CreativeStatus): string => {
    return status.split('_').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' ');
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
        <h1 className="text-2xl font-bold text-gray-900">Creative Workflow</h1>
        <div className="mt-3 sm:mt-0">
          <button className="inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500">
            <Plus className="w-4 h-4 mr-2" />
            New Creative
          </button>
        </div>
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
                placeholder="Search creative items"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
          </div>
          
          <div className="flex flex-col sm:flex-row items-center space-y-2 sm:space-y-0 sm:space-x-2">
            <div className="relative inline-block text-left w-full sm:w-auto">
              <div className="flex items-center">
                <Filter className="h-5 w-5 text-gray-400 mr-2" />
                <select
                  className="block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm rounded-md"
                  value={statusFilter}
                  onChange={(e) => setStatusFilter(e.target.value as CreativeStatus | 'all')}
                >
                  <option value="all">All Status</option>
                  <option value="draft">Draft</option>
                  <option value="internal_review">Internal Review</option>
                  <option value="client_review">Client Review</option>
                  <option value="approved">Approved</option>
                  <option value="rejected">Rejected</option>
                </select>
              </div>
            </div>
            
            <div className="relative inline-block text-left w-full sm:w-auto">
              <div className="flex items-center">
                <Filter className="h-5 w-5 text-gray-400 mr-2" />
                <select
                  className="block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm rounded-md"
                  value={typeFilter}
                  onChange={(e) => setTypeFilter(e.target.value)}
                >
                  {creativeTypes.map((type) => (
                    <option key={type} value={type}>
                      {type === 'all' ? 'All Types' : type}
                    </option>
                  ))}
                </select>
              </div>
            </div>
          </div>
        </div>
      </div>
      
      {/* Creative Items Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredItems.map((item) => (
          <div key={item.id} className="bg-white overflow-hidden shadow rounded-lg">
            <div className="relative h-48 bg-gray-200">
              <img 
                src={item.thumbnailUrl} 
                alt={item.title}
                className="w-full h-full object-cover"
              />
              <div className="absolute top-2 right-2">
                <div className={`flex items-center ${getStatusBadge(item.status)} px-2 py-1 rounded-full text-xs font-medium`}>
                  {getStatusIcon(item.status)}
                  <span className="ml-1">{formatStatus(item.status)}</span>
                </div>
              </div>
            </div>
            <div className="px-4 py-4">
              <div className="flex justify-between items-start">
                <div>
                  <h3 className="text-lg font-medium text-gray-900 truncate">{item.title}</h3>
                  <p className="text-sm text-gray-500">{item.type} • v{item.version}</p>
                </div>
                <button className="p-1 rounded-full text-gray-400 hover:text-gray-500">
                  <MoreVertical className="h-5 w-5" />
                </button>
              </div>
              
              <div className="mt-2">
                <p className="text-sm text-gray-600">
                  <span className="font-medium">Project:</span> {item.project}
                </p>
                <p className="text-sm text-gray-600">
                  <span className="font-medium">Client:</span> {item.client}
                </p>
              </div>
              
              <div className="mt-3 flex items-center text-sm text-gray-500">
                <Clock className="flex-shrink-0 mr-1.5 h-4 w-4 text-gray-400" />
                <p>Due: {new Date(item.dueDate).toLocaleDateString()}</p>
              </div>
              
              <div className="mt-4 flex justify-between items-center">
                <div className="flex items-center">
                  <MessageSquare className="h-4 w-4 text-gray-400 mr-1" />
                  <span className="text-sm text-gray-500">{item.feedbackCount} comments</span>
                </div>
                
                <div className="flex space-x-2">
                  <button className="inline-flex items-center p-1 border border-transparent rounded-full text-gray-400 hover:bg-gray-100 hover:text-gray-500">
                    <Eye className="h-5 w-5" />
                  </button>
                  <button className="inline-flex items-center p-1 border border-transparent rounded-full text-gray-400 hover:bg-gray-100 hover:text-gray-500">
                    <Download className="h-5 w-5" />
                  </button>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default CreativeWorkflow;