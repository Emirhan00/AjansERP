import React, { useState } from 'react';
import { 
  Search, Filter, MoreVertical, Clock, 
  MessageSquare, CheckCircle, AlertCircle, 
  ArrowUpRight, FileText, Send, Paperclip 
} from 'lucide-react';

// Feedback item type definition
interface FeedbackItem {
  id: string;
  title: string;
  project: string;
  creativeType: string;
  status: 'pending' | 'reviewed' | 'approved';
  requestedAt: string;
  dueDate: string;
  thumbnailUrl: string;
  comments: number;
  lastUpdated: string;
}

// Sample feedback items data
const feedbackItemsData: FeedbackItem[] = [
  {
    id: 'FB001',
    title: 'Homepage Banner Design',
    project: 'Website Redesign',
    creativeType: 'Banner',
    status: 'pending',
    requestedAt: '2025-05-15',
    dueDate: '2025-05-20',
    thumbnailUrl: 'https://images.unsplash.com/photo-1561070791-2526d30994b5?ixlib=rb-1.2.1&auto=format&fit=crop&w=400&q=80',
    comments: 0,
    lastUpdated: '2 hours ago'
  },
  {
    id: 'FB002',
    title: 'Social Media Post Templates',
    project: 'Social Media Campaign',
    creativeType: 'Social Media',
    status: 'reviewed',
    requestedAt: '2025-05-14',
    dueDate: '2025-05-21',
    thumbnailUrl: 'https://images.unsplash.com/photo-1611162617213-7d7a39e9b1d7?ixlib=rb-1.2.1&auto=format&fit=crop&w=400&q=80',
    comments: 3,
    lastUpdated: '1 day ago'
  },
  {
    id: 'FB003',
    title: 'Product Page Mockup',
    project: 'Website Redesign',
    creativeType: 'UI Design',
    status: 'approved',
    requestedAt: '2025-05-10',
    dueDate: '2025-05-15',
    thumbnailUrl: 'https://images.unsplash.com/photo-1581291518633-83b4ebd1d83e?ixlib=rb-1.2.1&auto=format&fit=crop&w=400&q=80',
    comments: 5,
    lastUpdated: '5 days ago'
  }
];

// Sample comments for the selected feedback item
interface Comment {
  id: string;
  author: string;
  authorRole: string;
  authorAvatar: string;
  content: string;
  timestamp: string;
  isClient: boolean;
}

const commentsData: Comment[] = [
  {
    id: 'C001',
    author: 'Sarah Smith',
    authorRole: 'Designer',
    authorAvatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-1.2.1&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80',
    content: "I've uploaded the latest version of the social media templates. Please review and let me know if you have any feedback.",
    timestamp: '2 days ago',
    isClient: false
  },
  {
    id: 'C002',
    author: 'Client User',
    authorRole: 'Marketing Director',
    authorAvatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80',
    content: 'The designs look great! Could we try a slightly darker shade of blue for the background to make the text pop more?',
    timestamp: '1 day ago',
    isClient: true
  },
  {
    id: 'C003',
    author: 'Sarah Smith',
    authorRole: 'Designer',
    authorAvatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-1.2.1&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80',
    content: "Good suggestion! I'll update the background color and upload a new version shortly.",
    timestamp: '1 day ago',
    isClient: false
  }
];

const ClientFeedback: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState<'all' | 'pending' | 'reviewed' | 'approved'>('all');
  const [selectedFeedback, setSelectedFeedback] = useState<FeedbackItem | null>(null);
  const [newComment, setNewComment] = useState('');
  
  // Filter feedback items based on search term and status
  const filteredFeedback = feedbackItemsData.filter(item => {
    const matchesSearch = item.title.toLowerCase().includes(searchTerm.toLowerCase()) || 
                          item.project.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = statusFilter === 'all' || item.status === statusFilter;
    return matchesSearch && matchesStatus;
  });
  
  // Function to get status badge styling
  const getStatusBadge = (status: 'pending' | 'reviewed' | 'approved') => {
    switch (status) {
      case 'pending':
        return 'bg-yellow-100 text-yellow-800';
      case 'reviewed':
        return 'bg-blue-100 text-blue-800';
      case 'approved':
        return 'bg-green-100 text-green-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };
  
  // Function to get status icon
  const getStatusIcon = (status: 'pending' | 'reviewed' | 'approved') => {
    switch (status) {
      case 'pending':
        return <Clock className="w-4 h-4" />;
      case 'reviewed':
        return <CheckCircle className="w-4 h-4" />;
      case 'approved':
        return <CheckCircle className="w-4 h-4" />;
      default:
        return null;
    }
  };
  
  // Function to handle submitting a new comment
  const handleSubmitComment = (e: React.FormEvent) => {
    e.preventDefault();
    if (newComment.trim() === '') return;
    
    // In a real app, this would send the comment to an API
    // For now, we'll just clear the input
    setNewComment('');
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
        <h1 className="text-2xl font-bold text-gray-900">Feedback Requests</h1>
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
                placeholder="Search feedback requests"
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
                  onChange={(e) => setStatusFilter(e.target.value as 'all' | 'pending' | 'reviewed' | 'approved')}
                >
                  <option value="all">All Status</option>
                  <option value="pending">Pending</option>
                  <option value="reviewed">Reviewed</option>
                  <option value="approved">Approved</option>
                </select>
              </div>
            </div>
          </div>
        </div>
      </div>
      
      {/* Feedback Items Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredFeedback.map((item) => (
          <div 
            key={item.id}
            className="bg-white overflow-hidden shadow rounded-lg cursor-pointer hover:shadow-md transition-shadow duration-200"
            onClick={() => setSelectedFeedback(item)}
          >
            <div className="relative h-48 bg-gray-200">
              <img 
                src={item.thumbnailUrl} 
                alt={item.title}
                className="w-full h-full object-cover"
              />
              <div className="absolute top-2 right-2">
                <div className={`flex items-center ${getStatusBadge(item.status)} px-2 py-1 rounded-full text-xs font-medium`}>
                  {getStatusIcon(item.status)}
                  <span className="ml-1 capitalize">{item.status}</span>
                </div>
              </div>
            </div>
            <div className="px-4 py-4">
              <div className="flex justify-between items-start">
                <div>
                  <h3 className="text-lg font-medium text-gray-900 truncate">{item.title}</h3>
                  <p className="text-sm text-gray-500">{item.project}</p>
                </div>
                <button className="p-1 rounded-full text-gray-400 hover:text-gray-500">
                  <MoreVertical className="h-5 w-5" />
                </button>
              </div>
              
              <div className="mt-3 flex items-center text-sm text-gray-500">
                <Clock className="flex-shrink-0 mr-1.5 h-4 w-4 text-gray-400" />
                <p>Due: {new Date(item.dueDate).toLocaleDateString()}</p>
              </div>
              
              <div className="mt-4 flex justify-between items-center">
                <div className="flex items-center">
                  <MessageSquare className="h-4 w-4 text-gray-400 mr-1" />
                  <span className="text-sm text-gray-500">{item.comments} comments</span>
                </div>
                
                <div>
                  <span className="text-xs text-gray-500">{item.lastUpdated}</span>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
      
      {/* Feedback Detail Modal */}
      {selectedFeedback && (
        <div className="fixed inset-0 overflow-y-auto z-50">
          <div className="flex items-center justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
            <div className="fixed inset-0 transition-opacity" aria-hidden="true">
              <div className="absolute inset-0 bg-gray-500 opacity-75"></div>
            </div>
            
            <span className="hidden sm:inline-block sm:align-middle sm:h-screen" aria-hidden="true">&#8203;</span>
            
            <div className="inline-block align-bottom bg-white rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-4xl sm:w-full">
              <div className="bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
                <div className="sm:flex sm:items-start">
                  <div className="mt-3 text-center sm:mt-0 sm:ml-4 sm:text-left w-full">
                    <div className="flex justify-between items-center">
                      <h3 className="text-lg leading-6 font-medium text-gray-900">
                        Feedback Request
                      </h3>
                      <button
                        type="button"
                        className="bg-white rounded-md text-gray-400 hover:text-gray-500 focus:outline-none"
                        onClick={() => setSelectedFeedback(null)}
                      >
                        <span className="sr-only">Close</span>
                        <svg className="h-6 w-6" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                        </svg>
                      </button>
                    </div>
                    
                    <div className="mt-4 grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div>
                        <div className="relative h-64 bg-gray-200 rounded-md overflow-hidden">
                          <img 
                            src={selectedFeedback.thumbnailUrl} 
                            alt={selectedFeedback.title}
                            className="w-full h-full object-cover"
                          />
                        </div>
                        
                        <div className="mt-4">
                          <h4 className="text-lg font-bold text-gray-900">{selectedFeedback.title}</h4>
                          <p className="text-sm text-gray-500">{selectedFeedback.project} • {selectedFeedback.creativeType}</p>
                          
                          <div className="mt-2 flex items-center">
                            <div className={`flex items-center ${getStatusBadge(selectedFeedback.status)} px-2 py-1 rounded-full text-xs font-medium`}>
                              {getStatusIcon(selectedFeedback.status)}
                              <span className="ml-1 capitalize">{selectedFeedback.status}</span>
                            </div>
                          </div>
                          
                          <div className="mt-4 grid grid-cols-2 gap-4">
                            <div>
                              <p className="text-sm font-medium text-gray-500">Requested</p>
                              <p className="text-sm text-gray-900">{new Date(selectedFeedback.requestedAt).toLocaleDateString()}</p>
                            </div>
                            <div>
                              <p className="text-sm font-medium text-gray-500">Due Date</p>
                              <p className="text-sm text-gray-900">{new Date(selectedFeedback.dueDate).toLocaleDateString()}</p>
                            </div>
                          </div>
                          
                          <div className="mt-4 flex space-x-2">
                            <button className="inline-flex items-center px-3 py-2 border border-transparent text-sm leading-4 font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500">
                              <CheckCircle className="mr-2 h-4 w-4" />
                              Approve
                            </button>
                            <button className="inline-flex items-center px-3 py-2 border border-gray-300 text-sm leading-4 font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500">
                              <AlertCircle className="mr-2 h-4 w-4" />
                              Request Changes
                            </button>
                          </div>
                        </div>
                      </div>
                      
                      <div className="flex flex-col h-full">
                        <h4 className="text-lg font-medium text-gray-900 mb-4">Feedback & Comments</h4>
                        
                        <div className="flex-1 overflow-y-auto max-h-96 space-y-4">
                          {commentsData.map((comment) => (
                            <div 
                              key={comment.id} 
                              className={`flex ${comment.isClient ? 'justify-end' : ''}`}
                            >
                              <div className={`flex max-w-md ${comment.isClient ? 'flex-row-reverse' : ''}`}>
                                <div className="flex-shrink-0">
                                  <img 
                                    className="h-10 w-10 rounded-full"
                                    src={comment.authorAvatar}
                                    alt={comment.author}
                                  />
                                </div>
                                <div className={`ml-3 ${comment.isClient ? 'mr-3 ml-0 text-right' : ''}`}>
                                  <div className="text-sm">
                                    <span className="font-medium text-gray-900">{comment.author}</span>
                                    <span className="ml-2 text-xs text-gray-500">{comment.authorRole}</span>
                                  </div>
                                  <div className={`mt-1 text-sm text-gray-700 p-3 rounded-lg ${
                                    comment.isClient ? 'bg-blue-50' : 'bg-gray-100'
                                  }`}>
                                    <p>{comment.content}</p>
                                  </div>
                                  <p className="mt-1 text-xs text-gray-500">{comment.timestamp}</p>
                                </div>
                              </div>
                            </div>
                          ))}
                        </div>
                        
                        <div className="mt-4 pt-4 border-t border-gray-200">
                          <form onSubmit={handleSubmitComment}>
                            <div className="flex items-start space-x-4">
                              <div className="flex-shrink-0">
                                <img 
                                  className="h-10 w-10 rounded-full"
                                  src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80"
                                  alt="Your avatar"
                                />
                              </div>
                              <div className="min-w-0 flex-1">
                                <div className="border border-gray-300 rounded-lg shadow-sm overflow-hidden focus-within:border-blue-500 focus-within:ring-1 focus-within:ring-blue-500">
                                  <textarea
                                    rows={3}
                                    name="comment"
                                    id="comment"
                                    className="block w-full py-3 border-0 resize-none focus:ring-0 sm:text-sm"
                                    placeholder="Add your feedback..."
                                    value={newComment}
                                    onChange={(e) => setNewComment(e.target.value)}
                                  ></textarea>
                                  
                                  <div className="py-2 px-3 border-t border-gray-200 flex items-center justify-between">
                                    <div className="flex-shrink-0">
                                      <button
                                        type="button"
                                        className="inline-flex items-center p-1 border border-transparent rounded-full text-gray-500 hover:bg-gray-100 hover:text-gray-600"
                                      >
                                        <Paperclip className="h-5 w-5" />
                                      </button>
                                    </div>
                                    <div className="flex-shrink-0">
                                      <button
                                        type="submit"
                                        className="inline-flex items-center px-3 py-2 border border-transparent text-sm leading-4 font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                                      >
                                        <Send className="mr-2 h-4 w-4" />
                                        Send
                                      </button>
                                    </div>
                                  </div>
                                </div>
                              </div>
                            </div>
                          </form>
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

export default ClientFeedback;