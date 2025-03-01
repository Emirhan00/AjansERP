import React, { useState } from 'react';
import { 
  Plus, Search, Filter, MoreVertical, 
  Calendar, Clock, CheckCircle, AlertCircle, 
  ArrowUpRight, User, Briefcase, Tag, 
  CheckSquare, Square, ChevronDown, ChevronUp
} from 'lucide-react';

// Task priority types
type TaskPriority = 'high' | 'medium' | 'low';

// Task status types
type TaskStatus = 'todo' | 'in_progress' | 'review' | 'completed';

// Task type definition
interface Task {
  id: string;
  title: string;
  description: string;
  project: string;
  client: string;
  assignee: {
    name: string;
    avatar?: string;
  };
  priority: TaskPriority;
  status: TaskStatus;
  dueDate: string;
  createdAt: string;
  tags: string[];
}

// Sample tasks data
const tasksData: Task[] = [
  {
    id: 'T001',
    title: 'Create homepage banner design',
    description: 'Design a new banner for the homepage that highlights the summer promotion.',
    project: 'Website Redesign',
    client: 'Acme Corporation',
    assignee: {
      name: 'Sarah Smith',
      avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-1.2.1&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80'
    },
    priority: 'high',
    status: 'in_progress',
    dueDate: '2025-05-20',
    createdAt: '2025-05-15',
    tags: ['design', 'banner']
  },
  {
    id: 'T002',
    title: 'Write social media copy for campaign',
    description: 'Create engaging copy for Facebook, Instagram, and Twitter posts for the summer campaign.',
    project: 'Social Media Campaign',
    client: 'TechStart Inc.',
    assignee: {
      name: 'Emily Brown',
      avatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?ixlib=rb-1.2.1&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80'
    },
    priority: 'medium',
    status: 'todo',
    dueDate: '2025-05-22',
    createdAt: '2025-05-16',
    tags: ['copywriting', 'social-media']
  },
  {
    id: 'T003',
    title: 'Implement SEO recommendations',
    description: 'Apply the SEO recommendations from the audit to improve search rankings.',
    project: 'SEO Optimization',
    client: 'Global Retail',
    assignee: {
      name: 'Alex Johnson',
      avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?ixlib=rb-1.2.1&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80'
    },
    priority: 'high',
    status: 'review',
    dueDate: '2025-05-18',
    createdAt: '2025-05-10',
    tags: ['seo', 'technical']
  },
  {
    id: 'T004',
    title: 'Set up email automation sequence',
    description: 'Configure the email automation sequence for new customer onboarding.',
    project: 'Email Marketing Automation',
    client: 'HealthPlus',
    assignee: {
      name: 'Maria Garcia',
      avatar: 'https://images.unsplash.com/photo-1517841905240-472988babdf9?ixlib=rb-1.2.1&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80'
    },
    priority: 'medium',
    status: 'in_progress',
    dueDate: '2025-05-25',
    createdAt: '2025-05-17',
    tags: ['email', 'automation']
  },
  {
    id: 'T005',
    title: 'Design new logo concepts',
    description: 'Create three logo concepts for the brand refresh project.',
    project: 'Brand Identity Refresh',
    client: 'Urban Outfitters',
    assignee: {
      name: 'Jennifer Lee',
      avatar: 'https://images.unsplash.com/photo-1487412720507-e7ab37603c6f?ixlib=rb-1.2.1&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80'
    },
    priority: 'high',
    status: 'completed',
    dueDate: '2025-05-15',
    createdAt: '2025-05-08',
    tags: ['design', 'logo', 'branding']
  },
  {
    id: 'T006',
    title: 'Optimize Google Ads campaign',
    description: 'Review and optimize the current Google Ads campaign to improve ROI.',
    project: 'Google Ads Campaign',
    client: 'EcoFriendly Products',
    assignee: {
      name: 'Tom Wilson',
      avatar: 'https://images.unsplash.com/photo-1519244703995-f4e0f30006d5?ixlib=rb-1.2.1&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80'
    },
    priority: 'low',
    status: 'todo',
    dueDate: '2025-05-30',
    createdAt: '2025-05-18',
    tags: ['ppc', 'google-ads']
  },
  {
    id: 'T007',
    title: 'Create monthly performance report',
    description: 'Compile and analyze the monthly performance metrics for client presentation.',
    project: 'Website Redesign',
    client: 'Acme Corporation',
    assignee: {
      name: 'David Wilson',
      avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80'
    },
    priority: 'medium',
    status: 'in_progress',
    dueDate: '2025-05-31',
    createdAt: '2025-05-20',
    tags: ['reporting', 'analytics']
  },
  {
    id: 'T008',
    title: 'Banner Tasarımı',
    description: 'A Firması için e-ticaret platformlarında kullanılacak banner tasarımlarını oluştur.',
    project: 'Banner Tasarımı',
    client: 'A Firması',
    assignee: {
      name: 'Emirhan Pirgon',
      avatar: 'https://images.unsplash.com/photo-1568602471122-7832951cc4c5?ixlib=rb-1.2.1&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80'
    },
    priority: 'high',
    status: 'completed',
    dueDate: '2024-02-20',
    createdAt: '2024-02-10',
    tags: ['tasarım', 'banner', 'e-ticaret']
  },
  {
    id: 'T009',
    title: 'Ürün Açıklamaları Optimizasyonu',
    description: 'Trendyol mağazasındaki ürün açıklamalarını SEO için optimize et.',
    project: 'Trendyol Panel Yönetimi',
    client: 'A Firması',
    assignee: {
      name: 'Mustafa Yılmaz',
      avatar: 'https://images.unsplash.com/photo-1531427186611-ecfd6d936c79?ixlib=rb-1.2.1&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80'
    },
    priority: 'medium',
    status: 'in_progress',
    dueDate: '2024-02-25',
    createdAt: '2024-02-15',
    tags: ['e-ticaret', 'içerik', 'seo']
  },
  {
    id: 'T010',
    title: 'Ürün Görselleri Düzenleme',
    description: 'Trendyol mağazasındaki ürün görsellerini düzenle ve optimize et.',
    project: 'Trendyol Panel Yönetimi',
    client: 'A Firması',
    assignee: {
      name: 'Emirhan Pirgon',
      avatar: 'https://images.unsplash.com/photo-1568602471122-7832951cc4c5?ixlib=rb-1.2.1&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80'
    },
    priority: 'medium',
    status: 'todo',
    dueDate: '2024-03-01',
    createdAt: '2024-02-20',
    tags: ['e-ticaret', 'görsel', 'tasarım']
  },
  {
    id: 'T011',
    title: 'Kampanya Oluşturma',
    description: 'Trendyol mağazasında yeni sezon ürünleri için kampanya oluştur.',
    project: 'Trendyol Panel Yönetimi',
    client: 'A Firması',
    assignee: {
      name: 'Mustafa Yılmaz',
      avatar: 'https://images.unsplash.com/photo-1531427186611-ecfd6d936c79?ixlib=rb-1.2.1&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80'
    },
    priority: 'high',
    status: 'todo',
    dueDate: '2024-03-10',
    createdAt: '2024-02-25',
    tags: ['e-ticaret', 'kampanya', 'pazarlama']
  },
  {
    id: 'T012',
    title: 'Meta Reklam Ayarları',
    description: 'Facebook ve Instagram reklamlarını oluştur ve hedef kitle ayarlarını yap.',
    project: 'Meta Reklam Yönetimi',
    client: 'B Firması',
    assignee: {
      name: 'Mehmet Kaya',
      avatar: 'https://images.unsplash.com/photo-1552374196-c4e7ffc6e126?ixlib=rb-1.2.1&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80'
    },
    priority: 'high',
    status: 'completed',
    dueDate: '2024-02-25',
    createdAt: '2024-02-20',
    tags: ['sosyal medya', 'reklam', 'meta']
  },
  {
    id: 'T013',
    title: 'Hedef Kitle Analizi',
    description: 'Meta reklamları için hedef kitle analizi yap ve raporla.',
    project: 'Meta Reklam Yönetimi',
    client: 'B Firması',
    assignee: {
      name: 'Mehmet Kaya',
      avatar: 'https://images.unsplash.com/photo-1552374196-c4e7ffc6e126?ixlib=rb-1.2.1&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80'
    },
    priority: 'medium',
    status: 'in_progress',
    dueDate: '2024-03-05',
    createdAt: '2024-02-25',
    tags: ['analiz', 'reklam', 'meta']
  },
  {
    id: 'T014',
    title: 'İçerik Planı Oluşturma',
    description: 'Sosyal medya kanalları için aylık içerik planı oluştur.',
    project: 'Sosyal Medya Yönetimi',
    client: 'B Firması',
    assignee: {
      name: 'Mehmet Kaya',
      avatar: 'https://images.unsplash.com/photo-1552374196-c4e7ffc6e126?ixlib=rb-1.2.1&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80'
    },
    priority: 'medium',
    status: 'in_progress',
    dueDate: '2024-03-10',
    createdAt: '2024-02-28',
    tags: ['sosyal medya', 'içerik', 'planlama']
  },
  {
    id: 'T015',
    title: 'Görsel Tasarımlar',
    description: 'Sosyal medya paylaşımları için görsel tasarımlar oluştur.',
    project: 'Sosyal Medya Yönetimi',
    client: 'B Firması',
    assignee: {
      name: 'Emirhan Pirgon',
      avatar: 'https://images.unsplash.com/photo-1568602471122-7832951cc4c5?ixlib=rb-1.2.1&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80'
    },
    priority: 'medium',
    status: 'todo',
    dueDate: '2024-03-15',
    createdAt: '2024-03-01',
    tags: ['sosyal medya', 'tasarım', 'görsel']
  }
];

const Tasks: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState<TaskStatus | 'all'>('all');
  const [priorityFilter, setPriorityFilter] = useState<TaskPriority | 'all'>('all');
  const [selectedTask, setSelectedTask] = useState<Task | null>(null);
  const [completedTasks, setCompletedTasks] = useState<string[]>([]);
  const [groupBy, setGroupBy] = useState<'status' | 'priority' | 'project'>('status');
  const [expandedGroups, setExpandedGroups] = useState<string[]>([
    'todo', 'in_progress', 'review', 'completed',
    'high', 'medium', 'low',
    ...new Set(tasksData.map(task => task.project))
  ]);
  
  // Filter tasks based on search term, status, and priority
  const filteredTasks = tasksData.filter(task => {
    const matchesSearch = task.title.toLowerCase().includes(searchTerm.toLowerCase()) || 
                          task.project.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          task.client.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = statusFilter === 'all' || task.status === statusFilter;
    const matchesPriority = priorityFilter === 'all' || task.priority === priorityFilter;
    return matchesSearch && matchesStatus && matchesPriority;
  });
  
  // Group tasks based on selected grouping
  const groupedTasks: Record<string, Task[]> = {};
  
  filteredTasks.forEach(task => {
    const groupKey = groupBy === 'status' ? task.status : 
                    groupBy === 'priority' ? task.priority : task.project;
    
    if (!groupedTasks[groupKey]) {
      groupedTasks[groupKey] = [];
    }
    
    groupedTasks[groupKey].push(task);
  });
  
  // Function to get priority badge styling
  const getPriorityBadge = (priority: TaskPriority) => {
    switch (priority) {
      case 'high':
        return 'bg-red-100 text-red-800';
      case 'medium':
        return 'bg-yellow-100 text-yellow-800';
      case 'low':
        return 'bg-green-100 text-green-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };
  
  // Function to get status badge styling
  const getStatusBadge = (status: TaskStatus) => {
    switch (status) {
      case 'todo':
        return 'bg-gray-100 text-gray-800';
      case 'in_progress':
        return 'bg-blue-100 text-blue-800';
      case 'review':
        return 'bg-purple-100 text-purple-800';
      case 'completed':
        return 'bg-green-100 text-green-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };
  
  // Function to format status for display
  const formatStatus = (status: TaskStatus): string => {
    return status.split('_').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' ');
  };
  
  // Function to format date
  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString();
  };
  
  // Function to toggle task completion
  const toggleTaskCompletion = (taskId: string) => {
    if (completedTasks.includes(taskId)) {
      setCompletedTasks(completedTasks.filter(id => id !== taskId));
    } else {
      setCompletedTasks([...completedTasks, taskId]);
    }
  };
  
  // Function to toggle group expansion
  const toggleGroupExpansion = (groupKey: string) => {
    if (expandedGroups.includes(groupKey)) {
      setExpandedGroups(expandedGroups.filter(key => key !== groupKey));
    } else {
      setExpandedGroups([...expandedGroups, groupKey]);
    }
  };
  
  // Function to get group title
  const getGroupTitle = (groupKey: string): string => {
    if (groupBy === 'status') {
      return formatStatus(groupKey as TaskStatus);
    } else if (groupBy === 'priority') {
      return groupKey.charAt(0).toUpperCase() + groupKey.slice(1) + ' Priority';
    } else {
      return groupKey; // Project name
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
        <h1 className="text-2xl font-bold text-gray-900">Tasks</h1>
        <div className="mt-3 sm:mt-0">
          <button className="inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500">
            <Plus className="w-4 h-4 mr-2" />
            New Task
          </button>
        </div>
      </div>
      
      {/* Filters */}
      <div className="bg-white shadow rounded-lg p-4">
        <div className="flex flex-col space-y-3">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between md:space-x-4">
            <div className="flex-1 max-w-md">
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Search className="h-5 w-5 text-gray-400" />
                </div>
                <input
                  type="text"
                  className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md leading-5 bg-white placeholder-gray-500 focus:outline-none focus:placeholder-gray-400 focus:ring-1 focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                  placeholder="Search tasks"
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
                    onChange={(e) => setStatusFilter(e.target.value as TaskStatus | 'all')}
                  >
                    <option value="all">All Status</option>
                    <option value="todo">To Do</option>
                    <option value="in_progress">In Progress</option>
                    <option value="review">Review</option>
                    <option value="completed">Completed</option>
                  </select>
                </div>
              </div>
              
              <div className="relative inline-block text-left w-full sm:w-auto">
                <div className="flex items-center">
                  <Filter className="h-5 w-5 text-gray-400 mr-2" />
                  <select
                    className="block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm rounded-md"
                    value={priorityFilter}
                    onChange={(e) => setPriorityFilter(e.target.value as TaskPriority | 'all')}
                  >
                    <option value="all">All Priorities</option>
                    <option value="high">High</option>
                    <option value="medium">Medium</option>
                    <option value="low">Low</option>
                  </select>
                </div>
              </div>
            </div>
          </div>
          
          <div className="flex items-center justify-end">
            <div className="flex items-center space-x-2">
              <span className="text-sm text-gray-500">Group by:</span>
              <div className="relative inline-block text-left">
                <select
                  className="block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm rounded-md"
                  value={groupBy}
                  onChange={(e) => setGroupBy(e.target.value as 'status' | 'priority' | 'project')}
                >
                  <option value="status">Status</option>
                  <option value="priority">Priority</option>
                  <option value="project">Project</option>
                </select>
              </div>
            </div>
          </div>
        </div>
      </div>
      
      {/* Tasks List */}
      <div className="space-y-6">
        {Object.keys(groupedTasks).length > 0 ? (
          Object.entries(groupedTasks).map(([groupKey, tasks]) => (
            <div key={groupKey} className="bg-white shadow overflow-hidden sm:rounded-md">
              <div 
                className="px-4 py-3 bg-gray-50 border-b border-gray-200 flex justify-between items-center cursor-pointer"
                onClick={() => toggleGroupExpansion(groupKey)}
              >
                <div className="flex items-center">
                  {groupBy === 'status' && (
                    <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getStatusBadge(groupKey as TaskStatus)} mr-2`}>
                      {formatStatus(groupKey as TaskStatus)}
                    </span>
                  )}
                  {groupBy === 'priority' && (
                    <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getPriorityBadge(groupKey as TaskPriority)} mr-2`}>
                      {groupKey.charAt(0).toUpperCase() + groupKey.slice(1)}
                    </span>
                  )}
                  <h3 className="text-sm font-medium text-gray-900">
                    {getGroupTitle(groupKey)} ({tasks.length})
                  </h3>
                </div>
                <div>
                  {expandedGroups.includes(groupKey) ? (
                    <ChevronUp className="h-5 w-5 text-gray-400" />
                  ) : (
                    <ChevronDown className="h-5 w-5 text-gray-400" />
                  )}
                </div>
              </div>
              
              {expandedGroups.includes(groupKey) && (
                <ul className="divide-y divide-gray-200">
                  {tasks.map((task) => (
                    <li key={task.id}>
                      <div className="px-4 py-4 sm:px-6 hover:bg-gray-50">
                        <div className="flex items-start">
                          <div className="flex-shrink-0 pt-1">
                            <button
                              onClick={() => toggleTaskCompletion(task.id)}
                              className="text-gray-400 hover:text-gray-500 focus:outline-none"
                            >
                              {completedTasks.includes(task.id) ? (
                                <CheckSquare className="h-5 w-5 text-green-500" />
                              ) : (
                                <Square className="h-5 w-5" />
                              )}
                            </button>
                          </div>
                          <div className="ml-3 flex-1">
                            <div className="flex items-center justify-between">
                              <p 
                                className={`text-sm font-medium text-blue-600 cursor-pointer ${
                                  completedTasks.includes(task.id) ? 'line-through text-gray-500' : ''
                                }`}
                                onClick={() => setSelectedTask(task)}
                              >
                                {task.title}
                              </p>
                              <div className="ml-2 flex-shrink-0 flex">
                                <button className="p-1 rounded-full text-gray-400 hover:text-gray-500">
                                  <MoreVertical className="h-5 w-5" />
                                </button>
                              </div>
                            </div>
                            <div className="mt-1 flex flex-wrap items-center">
                              {groupBy !== 'project' && (
                                <div className="mr-3 flex items-center text-sm text-gray-500">
                                  <Briefcase className="flex-shrink-0 mr-1.5 h-4 w-4 text-gray-400" />
                                  <p>{task.project}</p>
                                </div>
                              )}
                              <div className="mr-3 flex items-center text-sm text-gray-500">
                                <User className="flex-shrink-0 mr-1.5 h-4 w-4 text-gray-400" />
                                <p>{task.assignee.name}</p>
                              </div>
                              <div className="mr-3 flex items-center text-sm text-gray-500">
                                <Calendar className="flex-shrink-0 mr-1.5 h-4 w-4 text-gray-400" />
                                <p>{formatDate(task.dueDate)}</p>
                              </div>
                              {groupBy !== 'priority' && (
                                <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getPriorityBadge(task.priority)}`}>
                                  {task.priority.charAt(0).toUpperCase() + task.priority.slice(1)}
                                </span>
                              )}
                              {groupBy !== 'status' && (
                                <span className={`ml-2 inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getStatusBadge(task.status)}`}>
                                  {formatStatus(task.status)}
                                </span>
                              )}
                            </div>
                            <div className="mt-2 flex flex-wrap gap-1">
                              {task.tags.map((tag) => (
                                <span 
                                  key={tag} 
                                  className="inline-flex items-center px-2 py-0.5 rounded text-xs font-medium bg-gray-100 text-gray-800"
                                >
                                  <Tag className="mr-1 h-3 w-3" />
                                  {tag}
                                </span>
                              ))}
                            </div>
                          </div>
                        </div>
                      </div>
                    </li>
                  ))}
                </ul>
              )}
            </div>
          ))
        ) : (
          <div className="bg-white shadow overflow-hidden sm:rounded-md p-6 text-center">
            <p className="text-gray-500">No tasks match your filters.</p>
          </div>
        )}
      </div>
      
      {/* Task Detail Modal */}
      {selectedTask && (
        <div className="fixed inset-0 overflow-y-auto z-50">
          <div className="flex items-center justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
            <div className="fixed inset-0 transition-opacity" aria-hidden="true">
              <div className="absolute inset-0 bg-gray-500 opacity-75"></div>
            </div>
            
            <span className="hidden sm:inline-block sm:align-middle sm:h-screen" aria-hidden="true">&#8203;</span>
            
            <div className="inline-block align-bottom bg-white rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full">
              <div className="bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
                <div className="sm:flex sm:items-start">
                  <div className="mt-3 text-center sm:mt-0 sm:ml-4 sm:text-left w-full">
                    <div className="flex justify-between items-center">
                      <h3 className="text-lg leading-6 font-medium text-gray-900">
                        Task Details
                      </h3>
                      <button
                        type="button"
                        className="bg-white rounded-md text-gray-400 hover:text-gray-500 focus:outline-none"
                        onClick={() => setSelectedTask(null)}
                      >
                        <span className="sr-only">Close</span>
                        <svg className="h-6 w-6" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                        </svg>
                      </button>
                    </div>
                    
                    <div className="mt-4">
                      <div className="flex items-center justify-between">
                        <h4 className="text-lg font-bold text-gray-900">{selectedTask.title}</h4>
                        <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getStatusBadge(selectedTask.status)}`}>
                          {formatStatus(selectedTask.status)}
                        </span>
                      </div>
                      
                      <div className="mt-4 border-t border-gray-200 pt-4">
                        <dl className="grid grid-cols-1 gap-x-4 gap-y-6 sm:grid-cols-2">
                          <div className="sm:col-span-2">
                            <dt className="text-sm font-medium text-gray-500">Description</dt>
                            <dd className="mt-1 text-sm text-gray-900">
                              {selectedTask.description}
                            </dd>
                          </div>
                          <div className="sm:col-span-1">
                            <dt className="text-sm font-medium text-gray-500">Project</dt>
                            <dd className="mt-1 text-sm text-gray-900 flex items-center">
                              <Briefcase className="flex-shrink-0 mr-1.5 h-4 w-4 text-gray-400" />
                              <span>{selectedTask.project}</span>
                            </dd>
                          </div>
                          <div className="sm:col-span-1">
                            <dt className="text-sm font-medium text-gray-500">Client</dt>
                            <dd className="mt-1 text-sm text-gray-900">
                              {selectedTask.client}
                            </dd>
                          </div>
                          <div className="sm:col-span-1">
                            <dt className="text-sm font-medium text-gray-500">Assignee</dt>
                            <dd className="mt-1 text-sm text-gray-900 flex items-center">
                              {selectedTask.assignee.avatar ? (
                                <img
                                  src={selectedTask.assignee.avatar}
                                  alt={selectedTask.assignee.name}
                                  className="h-6 w-6 rounded-full mr-2"
                                />
                              ) : (
                                <User className="h-5 w-5 text-gray-400 mr-2" />
                              )}
                              <span>{selectedTask.assignee.name}</span>
                            </dd>
                          </div>
                          <div className="sm:col-span-1">
                            <dt className="text-sm font-medium text-gray-500">Priority</dt>
                            <dd className="mt-1">
                              <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getPriorityBadge(selectedTask.priority)}`}>
                                {selectedTask.priority.charAt(0).toUpperCase() + selectedTask.priority.slice(1)}
                              </span>
                            </dd>
                          </div>
                          <div className="sm:col-span-1">
                            <dt className="text-sm font-medium text-gray-500">Due Date</dt>
                            <dd className="mt-1 text-sm text-gray-900 flex items-center">
                              <Calendar className="flex-shrink-0 mr-1.5 h-4 w-4 text-gray-400" />
                              <span>{formatDate(selectedTask.dueDate)}</span>
                            </dd>
                          </div>
                          <div className="sm:col-span-1">
                            <dt className="text-sm font-medium text-gray-500">Created</dt>
                            <dd className="mt-1 text-sm text-gray-900">
                              {formatDate(selectedTask.createdAt)}
                            </dd>
                          </div>
                          <div className="sm:col-span-2">
                            <dt className="text-sm font-medium text-gray-500">Tags</dt>
                            <dd className="mt-1 flex flex-wrap gap-1">
                              {selectedTask.tags.map((tag) => (
                                <span 
                                  key={tag} 
                                  className="inline-flex items-center px-2 py-0.5 rounded text-xs font-medium bg-gray-100 text-gray-800"
                                >
                                  <Tag className="mr-1 h-3 w-3" />
                                  {tag}
                                </span>
                              ))}
                            </dd>
                          </div>
                        </dl>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="bg-gray-50 px-4 py-3 sm:px-6 sm:flex sm:flex-row-reverse">
                <button
                  type="button"
                  className="w-full inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-blue-600 text-base font-medium text-white hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 sm:ml-3 sm:w-auto sm:text-sm"
                  onClick={() => {
                    // In a real app, this would update the task status
                    setSelectedTask(null);
                  }}
                >
                  {selectedTask.status === 'completed' ? 'Reopen Task' : 'Mark as Completed'}
                </button>
                <button
                  type="button"
                  className="mt-3 w-full inline-flex justify-center rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white text-base font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 sm:mt-0 sm:ml-3 sm:w-auto sm:text-sm"
                  onClick={() => setSelectedTask(null)}
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

export default Tasks;