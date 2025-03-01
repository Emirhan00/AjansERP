import React, { useState } from 'react';
import { 
  Calendar, Clock, CheckCircle, AlertCircle, 
  ChevronDown, Filter, Plus, MessageSquare, 
  Paperclip, Eye, Edit, Trash2, MoreHorizontal,
  ArrowRight, ArrowLeft
} from 'lucide-react';

interface WorkflowStage {
  id: string;
  name: string;
  color: string;
}

interface WorkflowTask {
  id: string;
  title: string;
  description: string;
  stage: string;
  assignee: {
    id: string;
    name: string;
    avatar: string;
  };
  dueDate: string;
  priority: 'low' | 'medium' | 'high';
  attachments: number;
  comments: number;
  createdAt: string;
  projectId: string;
  projectName: string;
  clientId: string;
  clientName: string;
}

interface CreativeWorkflowManagerProps {
  projectId?: string;
  clientId?: string;
}

const CreativeWorkflowManager: React.FC<CreativeWorkflowManagerProps> = ({ projectId, clientId }) => {
  const [filter, setFilter] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState<string>('');
  
  // Mock workflow stages
  const workflowStages: WorkflowStage[] = [
    { id: 'brief', name: 'Brief', color: 'bg-purple-500' },
    { id: 'concept', name: 'Konsept', color: 'bg-blue-500' },
    { id: 'design', name: 'Tasarım', color: 'bg-indigo-500' },
    { id: 'review', name: 'İnceleme', color: 'bg-yellow-500' },
    { id: 'revision', name: 'Revizyon', color: 'bg-orange-500' },
    { id: 'approval', name: 'Onay', color: 'bg-green-500' },
    { id: 'delivery', name: 'Teslim', color: 'bg-teal-500' },
  ];
  
  // Mock workflow tasks
  const workflowTasks: WorkflowTask[] = [
    {
      id: 'task-1',
      title: 'Yaz Kampanyası Sosyal Medya Görselleri',
      description: 'Instagram, Facebook ve Twitter için 10 adet görsel tasarımı',
      stage: 'brief',
      assignee: {
        id: 'user-1',
        name: 'Ahmet Yılmaz',
        avatar: 'https://randomuser.me/api/portraits/men/1.jpg'
      },
      dueDate: '15.06.2023',
      priority: 'high',
      attachments: 3,
      comments: 5,
      createdAt: '01.06.2023',
      projectId: 'proj-1',
      projectName: 'Yaz Kampanyası',
      clientId: 'client-1',
      clientName: 'Acme Şirketi'
    },
    {
      id: 'task-2',
      title: 'Web Sitesi Yenileme Ana Sayfa Tasarımı',
      description: 'Responsive tasarım, modern görünüm ve kullanıcı dostu arayüz',
      stage: 'concept',
      assignee: {
        id: 'user-2',
        name: 'Ayşe Demir',
        avatar: 'https://randomuser.me/api/portraits/women/1.jpg'
      },
      dueDate: '20.06.2023',
      priority: 'medium',
      attachments: 2,
      comments: 3,
      createdAt: '05.06.2023',
      projectId: 'proj-2',
      projectName: 'Web Sitesi Yenileme',
      clientId: 'client-2',
      clientName: 'TechStart A.Ş.'
    },
    {
      id: 'task-3',
      title: 'Ürün Kataloğu Tasarımı',
      description: '2023 yılı ürün kataloğu, 24 sayfa, baskıya hazır',
      stage: 'design',
      assignee: {
        id: 'user-3',
        name: 'Mehmet Kaya',
        avatar: 'https://randomuser.me/api/portraits/men/2.jpg'
      },
      dueDate: '25.06.2023',
      priority: 'high',
      attachments: 5,
      comments: 8,
      createdAt: '08.06.2023',
      projectId: 'proj-3',
      projectName: 'Ürün Kataloğu',
      clientId: 'client-3',
      clientName: 'Global Perakende'
    },
    {
      id: 'task-4',
      title: 'E-posta Pazarlama Şablonları',
      description: '5 farklı e-posta şablonu, responsive tasarım',
      stage: 'review',
      assignee: {
        id: 'user-4',
        name: 'Zeynep Şahin',
        avatar: 'https://randomuser.me/api/portraits/women/2.jpg'
      },
      dueDate: '18.06.2023',
      priority: 'medium',
      attachments: 4,
      comments: 6,
      createdAt: '10.06.2023',
      projectId: 'proj-4',
      projectName: 'E-posta Pazarlama',
      clientId: 'client-4',
      clientName: 'SağlıkPlus'
    },
    {
      id: 'task-5',
      title: 'Logo Yenileme',
      description: 'Marka kimliğine uygun modern logo tasarımı',
      stage: 'revision',
      assignee: {
        id: 'user-1',
        name: 'Ahmet Yılmaz',
        avatar: 'https://randomuser.me/api/portraits/men/1.jpg'
      },
      dueDate: '22.06.2023',
      priority: 'high',
      attachments: 7,
      comments: 12,
      createdAt: '12.06.2023',
      projectId: 'proj-5',
      projectName: 'Marka Yenileme',
      clientId: 'client-5',
      clientName: 'Finans Grup'
    },
    {
      id: 'task-6',
      title: 'Sosyal Medya İçerik Planı',
      description: 'Temmuz ayı için 30 günlük içerik planı ve görseller',
      stage: 'approval',
      assignee: {
        id: 'user-2',
        name: 'Ayşe Demir',
        avatar: 'https://randomuser.me/api/portraits/women/1.jpg'
      },
      dueDate: '28.06.2023',
      priority: 'low',
      attachments: 2,
      comments: 4,
      createdAt: '15.06.2023',
      projectId: 'proj-6',
      projectName: 'Sosyal Medya Yönetimi',
      clientId: 'client-1',
      clientName: 'Acme Şirketi'
    },
    {
      id: 'task-7',
      title: 'Ürün Fotoğraf Çekimi',
      description: '15 ürün için e-ticaret sitesinde kullanılacak fotoğraflar',
      stage: 'delivery',
      assignee: {
        id: 'user-3',
        name: 'Mehmet Kaya',
        avatar: 'https://randomuser.me/api/portraits/men/2.jpg'
      },
      dueDate: '16.06.2023',
      priority: 'medium',
      attachments: 15,
      comments: 3,
      createdAt: '05.06.2023',
      projectId: 'proj-3',
      projectName: 'Ürün Kataloğu',
      clientId: 'client-3',
      clientName: 'Global Perakende'
    },
  ];
  
  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'high':
        return 'bg-red-100 text-red-800 dark:bg-red-900/20 dark:text-red-400';
      case 'medium':
        return 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900/20 dark:text-yellow-400';
      case 'low':
        return 'bg-green-100 text-green-800 dark:bg-green-900/20 dark:text-green-400';
      default:
        return 'bg-gray-100 text-gray-800 dark:bg-gray-700 dark:text-gray-300';
    }
  };
  
  const getPriorityText = (priority: string) => {
    switch (priority) {
      case 'high':
        return 'Yüksek';
      case 'medium':
        return 'Orta';
      case 'low':
        return 'Düşük';
      default:
        return priority;
    }
  };
  
  const filteredTasks = workflowTasks.filter(task => {
    if (clientId && task.clientId !== clientId) return false;
    if (projectId && task.projectId !== projectId) return false;
    if (filter !== 'all' && task.stage !== filter) return false;
    if (searchQuery) {
      const query = searchQuery.toLowerCase();
      return (
        task.title.toLowerCase().includes(query) ||
        task.description.toLowerCase().includes(query) ||
        task.projectName.toLowerCase().includes(query) ||
        task.clientName.toLowerCase().includes(query)
      );
    }
    return true;
  });
  
  const getTasksByStage = (stage: string) => {
    return filteredTasks.filter(task => task.stage === stage);
  };
  
  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow overflow-hidden">
        <div className="p-4 border-b border-gray-200 dark:border-gray-700">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between space-y-3 sm:space-y-0">
            <h2 className="text-lg font-medium text-gray-900 dark:text-white">Yaratıcı İş Akışı</h2>
            
            <div className="flex items-center space-x-2">
              <div className="relative">
                <input
                  type="text"
                  placeholder="Görev ara..."
                  className="w-full sm:w-64 rounded-md border border-gray-300 dark:border-gray-600 shadow-sm px-4 py-2 bg-white dark:bg-gray-700 text-sm text-gray-700 dark:text-gray-200 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
              </div>
              
              <div className="relative inline-block text-left">
                <button
                  type="button"
                  className="inline-flex justify-center w-full rounded-md border border-gray-300 dark:border-gray-600 shadow-sm px-4 py-2 bg-white dark:bg-gray-700 text-sm font-medium text-gray-700 dark:text-gray-200 hover:bg-gray-50 dark:hover:bg-gray-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                >
                  <Filter className="w-4 h-4 mr-2" />
                  <span>Filtrele</span>
                  <ChevronDown className="w-4 h-4 ml-2" />
                </button>
              </div>
              
              <button className="inline-flex items-center px-3 py-2 border border-transparent text-sm leading-4 font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500">
                <Plus className="w-4 h-4 mr-2" />
                Yeni Görev
              </button>
            </div>
          </div>
        </div>
        
        {/* Workflow Stages */}
        <div className="p-4 border-b border-gray-200 dark:border-gray-700">
          <div className="flex space-x-2 overflow-x-auto pb-2">
            <button
              className={`px-3 py-1 rounded-md text-sm font-medium ${
                filter === 'all'
                  ? 'bg-blue-100 text-blue-800 dark:bg-blue-900/20 dark:text-blue-400'
                  : 'bg-gray-100 text-gray-800 dark:bg-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-600'
              }`}
              onClick={() => setFilter('all')}
            >
              Tümü
            </button>
            
            {workflowStages.map((stage) => (
              <button
                key={stage.id}
                className={`px-3 py-1 rounded-md text-sm font-medium ${
                  filter === stage.id
                    ? 'bg-blue-100 text-blue-800 dark:bg-blue-900/20 dark:text-blue-400'
                    : 'bg-gray-100 text-gray-800 dark:bg-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-600'
                }`}
                onClick={() => setFilter(stage.id)}
              >
                {stage.name}
              </button>
            ))}
          </div>
        </div>
      </div>
      
      {/* Kanban Board */}
      <div className="overflow-x-auto pb-6">
        <div className="inline-flex space-x-4 min-w-full p-1">
          {workflowStages.map((stage) => (
            <div key={stage.id} className="w-80 flex-shrink-0">
              <div className="bg-white dark:bg-gray-800 rounded-lg shadow overflow-hidden">
                <div className={`p-3 ${stage.color} bg-opacity-20 dark:bg-opacity-10 border-b border-gray-200 dark:border-gray-700`}>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center">
                      <div className={`w-3 h-3 rounded-full ${stage.color}`}></div>
                      <h3 className="ml-2 text-sm font-medium text-gray-900 dark:text-white">{stage.name}</h3>
                    </div>
                    <span className="text-xs font-medium text-gray-500 dark:text-gray-400 bg-white dark:bg-gray-700 rounded-full px-2 py-1">
                      {getTasksByStage(stage.id).length}
                    </span>
                  </div>
                </div>
                
                <div className="p-2 max-h-[calc(100vh-250px)] overflow-y-auto">
                  <div className="space-y-2">
                    {getTasksByStage(stage.id).map((task) => (
                      <div key={task.id} className="bg-white dark:bg-gray-700 rounded-md shadow border border-gray-200 dark:border-gray-600 p-3 cursor-pointer hover:shadow-md transition-shadow">
                        <div className="flex justify-between items-start mb-2">
                          <h4 className="text-sm font-medium text-gray-900 dark:text-white">{task.title}</h4>
                          <div className="flex">
                            <button className="text-gray-400 hover:text-gray-500 dark:text-gray-300 dark:hover:text-gray-200">
                              <MoreHorizontal className="w-4 h-4" />
                            </button>
                          </div>
                        </div>
                        
                        <p className="text-xs text-gray-500 dark:text-gray-400 mb-3 line-clamp-2">{task.description}</p>
                        
                        <div className="flex items-center justify-between mb-3">
                          <div className="flex items-center">
                            <span className={`px-2 py-1 text-xs rounded-full ${getPriorityColor(task.priority)}`}>
                              {getPriorityText(task.priority)}
                            </span>
                          </div>
                          <div className="text-xs text-gray-500 dark:text-gray-400 flex items-center">
                            <Calendar className="w-3 h-3 mr-1" />
                            {task.dueDate}
                          </div>
                        </div>
                        
                        <div className="flex items-center justify-between">
                          <div className="flex items-center">
                            <img
                              src={task.assignee.avatar}
                              alt={task.assignee.name}
                              className="w-6 h-6 rounded-full"
                            />
                            <span className="ml-1 text-xs text-gray-500 dark:text-gray-400">{task.assignee.name}</span>
                          </div>
                          
                          <div className="flex items-center space-x-2">
                            <div className="flex items-center text-xs text-gray-500 dark:text-gray-400">
                              <Paperclip className="w-3 h-3 mr-1" />
                              {task.attachments}
                            </div>
                            <div className="flex items-center text-xs text-gray-500 dark:text-gray-400">
                              <MessageSquare className="w-3 h-3 mr-1" />
                              {task.comments}
                            </div>
                          </div>
                        </div>
                      </div>
                    ))}
                    
                    {getTasksByStage(stage.id).length === 0 && (
                      <div className="bg-gray-50 dark:bg-gray-700 rounded-md border border-dashed border-gray-300 dark:border-gray-600 p-4 text-center">
                        <p className="text-xs text-gray-500 dark:text-gray-400">Bu aşamada görev bulunmuyor</p>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
      
      {/* Task Detail Modal (would be implemented with state) */}
      {/* This would be shown when a task is clicked */}
    </div>
  );
};

export default CreativeWorkflowManager; 