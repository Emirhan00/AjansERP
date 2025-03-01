import React, { useState } from 'react';
import { 
  Search, Filter, ChevronDown, Calendar, 
  Clock, CheckCircle, X, Download, Eye, 
  ThumbsUp, ThumbsDown, MessageSquare
} from 'lucide-react';

interface CreativeItem {
  id: string;
  title: string;
  description: string;
  type: 'image' | 'video' | 'document' | 'social';
  thumbnail: string;
  status: 'draft' | 'review' | 'approved' | 'rejected';
  createdAt: string;
  updatedAt: string;
  projectName: string;
  campaignName: string;
  comments: number;
  likes: number;
  dislikes: number;
}

const ClientCreative: React.FC = () => {
  const [filter, setFilter] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [selectedItem, setSelectedItem] = useState<CreativeItem | null>(null);
  
  // Mock creative items
  const creativeItems: CreativeItem[] = [
    {
      id: 'creative-1',
      title: 'Yaz Kampanyası Ana Görsel',
      description: 'Instagram ve Facebook için ana kampanya görseli',
      type: 'image',
      thumbnail: 'https://images.unsplash.com/photo-1523275335684-37898b6baf30',
      status: 'approved',
      createdAt: '10.06.2023',
      updatedAt: '12.06.2023',
      projectName: 'Yaz Kampanyası',
      campaignName: 'Yaz İndirimleri',
      comments: 5,
      likes: 8,
      dislikes: 0
    },
    {
      id: 'creative-2',
      title: 'Ürün Tanıtım Videosu',
      description: 'Yeni ürün serisi için 30 saniyelik tanıtım videosu',
      type: 'video',
      thumbnail: 'https://images.unsplash.com/photo-1611162616305-c69b3fa7fbe0',
      status: 'review',
      createdAt: '15.06.2023',
      updatedAt: '15.06.2023',
      projectName: 'Ürün Lansmanı',
      campaignName: 'Yeni Seri Tanıtımı',
      comments: 3,
      likes: 2,
      dislikes: 1
    },
    {
      id: 'creative-3',
      title: 'E-posta Bülteni Tasarımı',
      description: 'Aylık e-posta bülteni için HTML tasarım',
      type: 'document',
      thumbnail: 'https://images.unsplash.com/photo-1586339949916-3e9457bef6d3',
      status: 'approved',
      createdAt: '08.06.2023',
      updatedAt: '09.06.2023',
      projectName: 'E-posta Pazarlama',
      campaignName: 'Haziran Bülteni',
      comments: 2,
      likes: 5,
      dislikes: 0
    },
    {
      id: 'creative-4',
      title: 'Twitter Gönderi Serisi',
      description: 'Haftalık Twitter gönderileri için görsel ve metin içeriği',
      type: 'social',
      thumbnail: 'https://images.unsplash.com/photo-1611605698335-8b1569810432',
      status: 'draft',
      createdAt: '18.06.2023',
      updatedAt: '18.06.2023',
      projectName: 'Sosyal Medya Yönetimi',
      campaignName: 'Haftalık İçerik',
      comments: 0,
      likes: 0,
      dislikes: 0
    },
    {
      id: 'creative-5',
      title: 'Web Sitesi Banner Tasarımı',
      description: 'Ana sayfa için kampanya banner tasarımı',
      type: 'image',
      thumbnail: 'https://images.unsplash.com/photo-1562577309-4932fdd64cd1',
      status: 'rejected',
      createdAt: '05.06.2023',
      updatedAt: '07.06.2023',
      projectName: 'Web Sitesi Yenileme',
      campaignName: 'Yaz Kampanyası',
      comments: 7,
      likes: 1,
      dislikes: 3
    },
    {
      id: 'creative-6',
      title: 'Ürün Kataloğu',
      description: '2023 yılı ürün kataloğu PDF tasarımı',
      type: 'document',
      thumbnail: 'https://images.unsplash.com/photo-1606857521015-7f9fcf423740',
      status: 'approved',
      createdAt: '01.06.2023',
      updatedAt: '05.06.2023',
      projectName: 'Ürün Kataloğu',
      campaignName: '2023 Kataloğu',
      comments: 4,
      likes: 6,
      dislikes: 0
    },
  ];
  
  const getStatusColor = (status: string) => {
    switch (status) {
      case 'approved':
        return 'bg-green-100 text-green-800 dark:bg-green-900/20 dark:text-green-400';
      case 'review':
        return 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900/20 dark:text-yellow-400';
      case 'draft':
        return 'bg-blue-100 text-blue-800 dark:bg-blue-900/20 dark:text-blue-400';
      case 'rejected':
        return 'bg-red-100 text-red-800 dark:bg-red-900/20 dark:text-red-400';
      default:
        return 'bg-gray-100 text-gray-800 dark:bg-gray-700 dark:text-gray-300';
    }
  };
  
  const getStatusText = (status: string) => {
    switch (status) {
      case 'approved':
        return 'Onaylandı';
      case 'review':
        return 'İncelemede';
      case 'draft':
        return 'Taslak';
      case 'rejected':
        return 'Reddedildi';
      default:
        return status;
    }
  };
  
  const getTypeIcon = (type: string) => {
    switch (type) {
      case 'image':
        return <div className="bg-purple-100 dark:bg-purple-900/20 p-2 rounded-md text-purple-600 dark:text-purple-400">IMG</div>;
      case 'video':
        return <div className="bg-red-100 dark:bg-red-900/20 p-2 rounded-md text-red-600 dark:text-red-400">VID</div>;
      case 'document':
        return <div className="bg-blue-100 dark:bg-blue-900/20 p-2 rounded-md text-blue-600 dark:text-blue-400">DOC</div>;
      case 'social':
        return <div className="bg-green-100 dark:bg-green-900/20 p-2 rounded-md text-green-600 dark:text-green-400">SOC</div>;
      default:
        return <div className="bg-gray-100 dark:bg-gray-700 p-2 rounded-md text-gray-600 dark:text-gray-400">?</div>;
    }
  };
  
  const filteredItems = creativeItems.filter(item => {
    if (filter !== 'all' && item.status !== filter) return false;
    if (searchQuery) {
      const query = searchQuery.toLowerCase();
      return (
        item.title.toLowerCase().includes(query) ||
        item.description.toLowerCase().includes(query) ||
        item.projectName.toLowerCase().includes(query) ||
        item.campaignName.toLowerCase().includes(query)
      );
    }
    return true;
  });
  
  const handleItemClick = (item: CreativeItem) => {
    setSelectedItem(item);
  };
  
  const closePreview = () => {
    setSelectedItem(null);
  };
  
  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow overflow-hidden">
        <div className="p-4 border-b border-gray-200 dark:border-gray-700">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between space-y-3 sm:space-y-0">
            <h2 className="text-lg font-medium text-gray-900 dark:text-white">Yaratıcı İçerikler</h2>
            
            <div className="flex items-center space-x-2">
              <div className="relative">
                <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                  <Search className="w-4 h-4 text-gray-400" />
                </div>
                <input
                  type="text"
                  placeholder="İçerik ara..."
                  className="w-full sm:w-64 rounded-md border border-gray-300 dark:border-gray-600 shadow-sm pl-10 pr-4 py-2 bg-white dark:bg-gray-700 text-sm text-gray-700 dark:text-gray-200 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
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
            </div>
          </div>
        </div>
        
        {/* Status Filters */}
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
            
            <button
              className={`px-3 py-1 rounded-md text-sm font-medium ${
                filter === 'approved'
                  ? 'bg-green-100 text-green-800 dark:bg-green-900/20 dark:text-green-400'
                  : 'bg-gray-100 text-gray-800 dark:bg-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-600'
              }`}
              onClick={() => setFilter('approved')}
            >
              <CheckCircle className="w-4 h-4 inline mr-1" />
              Onaylanan
            </button>
            
            <button
              className={`px-3 py-1 rounded-md text-sm font-medium ${
                filter === 'review'
                  ? 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900/20 dark:text-yellow-400'
                  : 'bg-gray-100 text-gray-800 dark:bg-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-600'
              }`}
              onClick={() => setFilter('review')}
            >
              <Clock className="w-4 h-4 inline mr-1" />
              İncelemede
            </button>
            
            <button
              className={`px-3 py-1 rounded-md text-sm font-medium ${
                filter === 'draft'
                  ? 'bg-blue-100 text-blue-800 dark:bg-blue-900/20 dark:text-blue-400'
                  : 'bg-gray-100 text-gray-800 dark:bg-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-600'
              }`}
              onClick={() => setFilter('draft')}
            >
              <Calendar className="w-4 h-4 inline mr-1" />
              Taslak
            </button>
            
            <button
              className={`px-3 py-1 rounded-md text-sm font-medium ${
                filter === 'rejected'
                  ? 'bg-red-100 text-red-800 dark:bg-red-900/20 dark:text-red-400'
                  : 'bg-gray-100 text-gray-800 dark:bg-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-600'
              }`}
              onClick={() => setFilter('rejected')}
            >
              <X className="w-4 h-4 inline mr-1" />
              Reddedilen
            </button>
          </div>
        </div>
      </div>
      
      {/* Creative Items Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredItems.map((item) => (
          <div 
            key={item.id} 
            className="bg-white dark:bg-gray-800 rounded-lg shadow overflow-hidden cursor-pointer hover:shadow-md transition-shadow"
            onClick={() => handleItemClick(item)}
          >
            <div className="relative h-48 bg-gray-200 dark:bg-gray-700">
              <img 
                src={`${item.thumbnail}?w=600&h=400&fit=crop`} 
                alt={item.title}
                className="w-full h-full object-cover"
              />
              <div className="absolute top-2 left-2">
                {getTypeIcon(item.type)}
              </div>
              <div className="absolute top-2 right-2">
                <span className={`px-2 py-1 text-xs rounded-full ${getStatusColor(item.status)}`}>
                  {getStatusText(item.status)}
                </span>
              </div>
            </div>
            
            <div className="p-4">
              <h3 className="text-lg font-medium text-gray-900 dark:text-white truncate">{item.title}</h3>
              <p className="mt-1 text-sm text-gray-500 dark:text-gray-400 line-clamp-2">{item.description}</p>
              
              <div className="mt-3 flex items-center justify-between">
                <div className="text-xs text-gray-500 dark:text-gray-400">
                  <span className="block">{item.projectName}</span>
                  <span className="block mt-1">{item.updatedAt}</span>
                </div>
                
                <div className="flex items-center space-x-2">
                  <div className="flex items-center text-xs text-gray-500 dark:text-gray-400">
                    <MessageSquare className="w-3 h-3 mr-1" />
                    {item.comments}
                  </div>
                  <div className="flex items-center text-xs text-gray-500 dark:text-gray-400">
                    <ThumbsUp className="w-3 h-3 mr-1" />
                    {item.likes}
                  </div>
                </div>
              </div>
            </div>
          </div>
        ))}
        
        {filteredItems.length === 0 && (
          <div className="col-span-full bg-white dark:bg-gray-800 rounded-lg shadow p-8 text-center">
            <p className="text-gray-500 dark:text-gray-400">Arama kriterlerinize uygun içerik bulunamadı.</p>
          </div>
        )}
      </div>
      
      {/* Preview Modal */}
      {selectedItem && (
        <div className="fixed inset-0 z-50 overflow-y-auto">
          <div className="flex items-center justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
            <div className="fixed inset-0 transition-opacity" aria-hidden="true">
              <div className="absolute inset-0 bg-gray-500 dark:bg-gray-900 opacity-75"></div>
            </div>
            
            <span className="hidden sm:inline-block sm:align-middle sm:h-screen" aria-hidden="true">&#8203;</span>
            
            <div className="inline-block align-bottom bg-white dark:bg-gray-800 rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-4xl sm:w-full">
              <div className="bg-white dark:bg-gray-800 px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
                <div className="sm:flex sm:items-start">
                  <div className="mt-3 text-center sm:mt-0 sm:ml-4 sm:text-left w-full">
                    <div className="flex justify-between items-start">
                      <h3 className="text-lg leading-6 font-medium text-gray-900 dark:text-white">
                        {selectedItem.title}
                      </h3>
                      <button
                        type="button"
                        className="bg-white dark:bg-gray-800 rounded-md text-gray-400 hover:text-gray-500 dark:hover:text-gray-300 focus:outline-none"
                        onClick={closePreview}
                      >
                        <span className="sr-only">Kapat</span>
                        <X className="h-6 w-6" />
                      </button>
                    </div>
                    
                    <div className="mt-4 flex flex-col md:flex-row gap-6">
                      <div className="md:w-2/3">
                        <div className="bg-gray-200 dark:bg-gray-700 rounded-lg overflow-hidden">
                          <img 
                            src={`${selectedItem.thumbnail}?w=800&h=600&fit=crop`} 
                            alt={selectedItem.title}
                            className="w-full h-auto"
                          />
                        </div>
                      </div>
                      
                      <div className="md:w-1/3 space-y-4">
                        <div>
                          <h4 className="text-sm font-medium text-gray-500 dark:text-gray-400">Açıklama</h4>
                          <p className="mt-1 text-sm text-gray-900 dark:text-white">{selectedItem.description}</p>
                        </div>
                        
                        <div>
                          <h4 className="text-sm font-medium text-gray-500 dark:text-gray-400">Proje</h4>
                          <p className="mt-1 text-sm text-gray-900 dark:text-white">{selectedItem.projectName}</p>
                        </div>
                        
                        <div>
                          <h4 className="text-sm font-medium text-gray-500 dark:text-gray-400">Kampanya</h4>
                          <p className="mt-1 text-sm text-gray-900 dark:text-white">{selectedItem.campaignName}</p>
                        </div>
                        
                        <div>
                          <h4 className="text-sm font-medium text-gray-500 dark:text-gray-400">Durum</h4>
                          <p className="mt-1">
                            <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getStatusColor(selectedItem.status)}`}>
                              {getStatusText(selectedItem.status)}
                            </span>
                          </p>
                        </div>
                        
                        <div>
                          <h4 className="text-sm font-medium text-gray-500 dark:text-gray-400">Oluşturulma Tarihi</h4>
                          <p className="mt-1 text-sm text-gray-900 dark:text-white">{selectedItem.createdAt}</p>
                        </div>
                        
                        <div>
                          <h4 className="text-sm font-medium text-gray-500 dark:text-gray-400">Son Güncelleme</h4>
                          <p className="mt-1 text-sm text-gray-900 dark:text-white">{selectedItem.updatedAt}</p>
                        </div>
                        
                        <div className="flex space-x-2 pt-4">
                          <button className="inline-flex items-center px-3 py-2 border border-transparent text-sm leading-4 font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500">
                            <Download className="w-4 h-4 mr-2" />
                            İndir
                          </button>
                          
                          <button className="inline-flex items-center px-3 py-2 border border-gray-300 dark:border-gray-600 shadow-sm text-sm leading-4 font-medium rounded-md text-gray-700 dark:text-gray-200 bg-white dark:bg-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500">
                            <MessageSquare className="w-4 h-4 mr-2" />
                            Yorum Yap
                          </button>
                        </div>
                        
                        <div className="flex space-x-2 pt-2">
                          <button className="inline-flex items-center px-3 py-2 border border-gray-300 dark:border-gray-600 shadow-sm text-sm leading-4 font-medium rounded-md text-green-700 dark:text-green-400 bg-white dark:bg-gray-700 hover:bg-green-50 dark:hover:bg-green-900/20 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500">
                            <ThumbsUp className="w-4 h-4 mr-2" />
                            Beğen
                          </button>
                          
                          <button className="inline-flex items-center px-3 py-2 border border-gray-300 dark:border-gray-600 shadow-sm text-sm leading-4 font-medium rounded-md text-red-700 dark:text-red-400 bg-white dark:bg-gray-700 hover:bg-red-50 dark:hover:bg-red-900/20 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500">
                            <ThumbsDown className="w-4 h-4 mr-2" />
                            Beğenme
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ClientCreative; 