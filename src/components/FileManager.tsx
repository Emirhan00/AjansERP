import React, { useState } from 'react';
import { 
  File, Image, FileText, FilePlus, FolderPlus, 
  Download, Share2, Trash2, MoreVertical, Search,
  ChevronRight, ChevronDown, Folder
} from 'lucide-react';

interface FileItem {
  id: string;
  name: string;
  type: 'file' | 'image' | 'document' | 'folder';
  size?: string;
  modifiedDate: string;
  createdBy: string;
  shared?: boolean;
  tags?: string[];
  path: string[];
  children?: FileItem[];
}

interface FileManagerProps {
  projectId?: string;
  clientId?: string;
}

const FileManager: React.FC<FileManagerProps> = ({ projectId, clientId }) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedFile, setSelectedFile] = useState<FileItem | null>(null);
  const [expandedFolders, setExpandedFolders] = useState<Record<string, boolean>>({
    'root': true,
    'tasarımlar': true,
  });
  const [viewMode, setViewMode] = useState<'list' | 'grid'>('list');
  
  // Mock file data
  const files: FileItem[] = [
    {
      id: '1',
      name: 'Tasarımlar',
      type: 'folder',
      modifiedDate: '15 Mayıs 2023',
      createdBy: 'Ahmet Yılmaz',
      path: ['root'],
      children: [
        {
          id: '1-1',
          name: 'Logo Tasarımları',
          type: 'folder',
          modifiedDate: '18 Mayıs 2023',
          createdBy: 'Ahmet Yılmaz',
          path: ['root', 'Tasarımlar'],
          children: [
            {
              id: '1-1-1',
              name: 'logo_v1.png',
              type: 'image',
              size: '1.2 MB',
              modifiedDate: '20 Mayıs 2023',
              createdBy: 'Mehmet Kaya',
              tags: ['logo', 'taslak'],
              path: ['root', 'Tasarımlar', 'Logo Tasarımları'],
            },
            {
              id: '1-1-2',
              name: 'logo_v2.png',
              type: 'image',
              size: '1.4 MB',
              modifiedDate: '22 Mayıs 2023',
              createdBy: 'Mehmet Kaya',
              tags: ['logo', 'revizyon'],
              path: ['root', 'Tasarımlar', 'Logo Tasarımları'],
            },
          ],
        },
        {
          id: '1-2',
          name: 'Web Görselleri',
          type: 'folder',
          modifiedDate: '25 Mayıs 2023',
          createdBy: 'Ayşe Demir',
          path: ['root', 'Tasarımlar'],
          children: [
            {
              id: '1-2-1',
              name: 'banner.jpg',
              type: 'image',
              size: '2.3 MB',
              modifiedDate: '26 Mayıs 2023',
              createdBy: 'Ayşe Demir',
              tags: ['web', 'banner'],
              path: ['root', 'Tasarımlar', 'Web Görselleri'],
            },
          ],
        },
      ],
    },
    {
      id: '2',
      name: 'Dokümanlar',
      type: 'folder',
      modifiedDate: '10 Mayıs 2023',
      createdBy: 'Zeynep Şahin',
      path: ['root'],
      children: [
        {
          id: '2-1',
          name: 'Proje Brief.docx',
          type: 'document',
          size: '450 KB',
          modifiedDate: '12 Mayıs 2023',
          createdBy: 'Zeynep Şahin',
          shared: true,
          tags: ['brief', 'doküman'],
          path: ['root', 'Dokümanlar'],
        },
        {
          id: '2-2',
          name: 'Kampanya Stratejisi.pdf',
          type: 'document',
          size: '1.7 MB',
          modifiedDate: '14 Mayıs 2023',
          createdBy: 'Zeynep Şahin',
          tags: ['strateji', 'kampanya'],
          path: ['root', 'Dokümanlar'],
        },
      ],
    },
  ];

  const toggleFolder = (folderId: string) => {
    setExpandedFolders(prev => ({
      ...prev,
      [folderId]: !prev[folderId]
    }));
  };

  const getFileIcon = (type: string) => {
    switch (type) {
      case 'folder':
        return <Folder className="w-5 h-5 text-yellow-500" />;
      case 'image':
        return <Image className="w-5 h-5 text-blue-500" />;
      case 'document':
        return <FileText className="w-5 h-5 text-green-500" />;
      default:
        return <File className="w-5 h-5 text-gray-500" />;
    }
  };

  const renderFileTree = (items: FileItem[], level = 0) => {
    return items.map(item => {
      const isFolder = item.type === 'folder';
      const isExpanded = expandedFolders[item.id] || false;
      
      return (
        <React.Fragment key={item.id}>
          <tr 
            className={`border-b border-gray-200 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-800 ${selectedFile?.id === item.id ? 'bg-blue-50 dark:bg-blue-900/20' : ''}`}
            onClick={() => setSelectedFile(item)}
          >
            <td className="px-4 py-3 whitespace-nowrap">
              <div className="flex items-center" style={{ paddingLeft: `${level * 20}px` }}>
                {isFolder && (
                  <button 
                    onClick={(e) => {
                      e.stopPropagation();
                      toggleFolder(item.id);
                    }}
                    className="mr-1"
                  >
                    {isExpanded ? <ChevronDown className="w-4 h-4" /> : <ChevronRight className="w-4 h-4" />}
                  </button>
                )}
                <span className="mr-2">{getFileIcon(item.type)}</span>
                <span className="text-sm font-medium text-gray-900 dark:text-white">{item.name}</span>
                {item.shared && (
                  <span className="ml-2">
                    <Share2 className="w-4 h-4 text-blue-500" />
                  </span>
                )}
              </div>
            </td>
            <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-500 dark:text-gray-400">
              {item.size || '-'}
            </td>
            <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-500 dark:text-gray-400">
              {item.modifiedDate}
            </td>
            <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-500 dark:text-gray-400">
              {item.createdBy}
            </td>
            <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-500 dark:text-gray-400">
              <div className="flex space-x-2">
                {item.tags?.map(tag => (
                  <span 
                    key={tag} 
                    className="px-2 py-1 text-xs rounded-full bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </td>
            <td className="px-4 py-3 whitespace-nowrap text-right text-sm font-medium">
              <div className="flex items-center space-x-2">
                {!isFolder && (
                  <button className="text-blue-600 dark:text-blue-400 hover:text-blue-800 dark:hover:text-blue-300">
                    <Download className="w-4 h-4" />
                  </button>
                )}
                <button className="text-gray-600 dark:text-gray-400 hover:text-gray-800 dark:hover:text-gray-300">
                  <Share2 className="w-4 h-4" />
                </button>
                <button className="text-red-600 dark:text-red-400 hover:text-red-800 dark:hover:text-red-300">
                  <Trash2 className="w-4 h-4" />
                </button>
                <button className="text-gray-600 dark:text-gray-400 hover:text-gray-800 dark:hover:text-gray-300">
                  <MoreVertical className="w-4 h-4" />
                </button>
              </div>
            </td>
          </tr>
          {isFolder && isExpanded && item.children && item.children.length > 0 && (
            renderFileTree(item.children, level + 1)
          )}
        </React.Fragment>
      );
    });
  };

  return (
    <div className="bg-white dark:bg-gray-800 rounded-lg shadow overflow-hidden">
      <div className="p-4 border-b border-gray-200 dark:border-gray-700">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between space-y-3 sm:space-y-0">
          <h2 className="text-lg font-medium text-gray-900 dark:text-white">Dosya Yöneticisi</h2>
          
          <div className="flex items-center space-x-2">
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <Search className="h-4 w-4 text-gray-400" />
              </div>
              <input
                type="text"
                className="block w-full pl-10 pr-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md leading-5 bg-white dark:bg-gray-700 text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                placeholder="Dosya ara..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
            
            <button className="inline-flex items-center px-3 py-2 border border-transparent text-sm leading-4 font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500">
              <FilePlus className="w-4 h-4 mr-2" />
              Dosya Yükle
            </button>
            
            <button className="inline-flex items-center px-3 py-2 border border-transparent text-sm leading-4 font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500">
              <FolderPlus className="w-4 h-4 mr-2" />
              Klasör Oluştur
            </button>
          </div>
        </div>
      </div>
      
      <div className="overflow-x-auto">
        <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
          <thead className="bg-gray-50 dark:bg-gray-700">
            <tr>
              <th scope="col" className="px-4 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                İsim
              </th>
              <th scope="col" className="px-4 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                Boyut
              </th>
              <th scope="col" className="px-4 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                Değiştirilme Tarihi
              </th>
              <th scope="col" className="px-4 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                Oluşturan
              </th>
              <th scope="col" className="px-4 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                Etiketler
              </th>
              <th scope="col" className="px-4 py-3 text-right text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                İşlemler
              </th>
            </tr>
          </thead>
          <tbody className="bg-white dark:bg-gray-800 divide-y divide-gray-200 dark:divide-gray-700">
            {renderFileTree(files)}
          </tbody>
        </table>
      </div>
      
      {files.length === 0 && (
        <div className="py-8 text-center">
          <p className="text-gray-500 dark:text-gray-400">Henüz dosya yok.</p>
        </div>
      )}
    </div>
  );
};

export default FileManager; 