import React, { useState } from 'react';
import { 
  Download, Calendar, Filter, Search, 
  BarChart3, PieChart as PieChartIcon, TrendingUp, 
  DollarSign, Users, Clock, ArrowRight, FileText 
} from 'lucide-react';
import { 
  BarChart, Bar, XAxis, YAxis, CartesianGrid, 
  Tooltip, ResponsiveContainer, PieChart, Pie, 
  Cell, LineChart, Line, Legend, AreaChart, Area
} from 'recharts';
import { format, subDays, subMonths } from 'date-fns';

// Report type definition
type ReportType = 'performance' | 'financial' | 'client' | 'team';

// Date range type definition
type DateRange = '7d' | '30d' | '90d' | 'ytd' | 'all';

const Reports: React.FC = () => {
  const [reportType, setReportType] = useState<ReportType>('performance');
  const [dateRange, setDateRange] = useState<DateRange>('30d');
  const [searchTerm, setSearchTerm] = useState('');
  
  // Mock data for performance metrics
  const performanceData = [
    { month: 'Jan', socialEngagement: 1200, websiteTraffic: 900, conversions: 45 },
    { month: 'Feb', socialEngagement: 1900, websiteTraffic: 1200, conversions: 56 },
    { month: 'Mar', socialEngagement: 2400, websiteTraffic: 1500, conversions: 75 },
    { month: 'Apr', socialEngagement: 1800, websiteTraffic: 1300, conversions: 68 },
    { month: 'May', socialEngagement: 2800, websiteTraffic: 1700, conversions: 90 },
    { month: 'Jun', socialEngagement: 3200, websiteTraffic: 2000, conversions: 105 },
  ];
  
  // Mock data for channel performance
  const channelData = [
    { name: 'Social Media', value: 35, color: '#6366F1' },
    { name: 'SEO', value: 25, color: '#10B981' },
    { name: 'Email', value: 20, color: '#F59E0B' },
    { name: 'PPC', value: 15, color: '#EF4444' },
    { name: 'Direct', value: 5, color: '#6B7280' },
  ];
  
  // Mock data for financial metrics
  const revenueData = [
    { month: 'Jan', revenue: 45000, expenses: 32000, profit: 13000 },
    { month: 'Feb', revenue: 52000, expenses: 35000, profit: 17000 },
    { month: 'Mar', revenue: 48000, expenses: 33000, profit: 15000 },
    { month: 'Apr', revenue: 61000, expenses: 39000, profit: 22000 },
    { month: 'May', revenue: 55000, expenses: 36000, profit: 19000 },
    { month: 'Jun', revenue: 67000, expenses: 41000, profit: 26000 },
  ];
  
  // Mock data for client metrics
  const clientRetentionData = [
    { month: 'Jan', retention: 92 },
    { month: 'Feb', retention: 94 },
    { month: 'Mar', retention: 91 },
    { month: 'Apr', retention: 95 },
    { month: 'May', retention: 97 },
    { month: 'Jun', retention: 96 },
  ];
  
  const clientSatisfactionData = [
    { name: 'Very Satisfied', value: 45, color: '#10B981' },
    { name: 'Satisfied', value: 35, color: '#6366F1' },
    { name: 'Neutral', value: 15, color: '#F59E0B' },
    { name: 'Dissatisfied', value: 5, color: '#EF4444' },
  ];
  
  // Mock data for team metrics
  const teamProductivityData = [
    { day: 'Mon', productivity: 85 },
    { day: 'Tue', productivity: 90 },
    { day: 'Wed', productivity: 92 },
    { day: 'Thu', productivity: 88 },
    { day: 'Fri', productivity: 83 },
  ];
  
  const teamUtilizationData = [
    { name: 'Billable', value: 75, color: '#10B981' },
    { name: 'Admin', value: 15, color: '#6366F1' },
    { name: 'Training', value: 5, color: '#F59E0B' },
    { name: 'Unbilled', value: 5, color: '#EF4444' },
  ];
  
  // Mock data for recent reports
  const recentReports = [
    { id: 1, name: 'June 2025 Performance Report', type: 'performance', date: '2025-06-30', client: 'Acme Corporation' },
    { id: 2, name: 'Q2 2025 Financial Summary', type: 'financial', date: '2025-06-15', client: 'All Clients' },
    { id: 3, name: 'Social Media Campaign Analysis', type: 'performance', date: '2025-06-10', client: 'TechStart Inc.' },
    { id: 4, name: 'Team Productivity Report', type: 'team', date: '2025-06-01', client: 'Internal' },
    { id: 5, name: 'Client Satisfaction Survey Results', type: 'client', date: '2025-05-20', client: 'All Clients' },
  ];
  
  // Filter recent reports based on search term
  const filteredReports = recentReports.filter(report => 
    report.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    report.client.toLowerCase().includes(searchTerm.toLowerCase())
  );
  
  // Function to get report type icon
  const getReportTypeIcon = (type: string) => {
    switch (type) {
      case 'performance':
        return <BarChart3 className="h-5 w-5 text-indigo-500" />;
      case 'financial':
        return <DollarSign className="h-5 w-5 text-green-500" />;
      case 'client':
        return <Users className="h-5 w-5 text-yellow-500" />;
      case 'team':
        return <Clock className="h-5 w-5 text-red-500" />;
      default:
        return <FileText className="h-5 w-5 text-gray-500" />;
    }
  };
  
  // Function to format date
  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString();
  };
  
  // Function to get date range label
  const getDateRangeLabel = () => {
    const today = new Date();
    
    switch (dateRange) {
      case '7d':
        return `${format(subDays(today, 7), 'MMM d, yyyy')} - ${format(today, 'MMM d, yyyy')}`;
      case '30d':
        return `${format(subDays(today, 30), 'MMM d, yyyy')} - ${format(today, 'MMM d, yyyy')}`;
      case '90d':
        return `${format(subDays(today, 90), 'MMM d, yyyy')} - ${format(today, 'MMM d, yyyy')}`;
      case 'ytd':
        return `${format(new Date(today.getFullYear(), 0, 1), 'MMM d, yyyy')} - ${format(today, 'MMM d, yyyy')}`;
      case 'all':
        return 'All Time';
      default:
        return '';
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
        <h1 className="text-2xl font-bold text-gray-900">Reports</h1>
        <div className="mt-3 sm:mt-0">
          <button className="inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500">
            <Download className="w-4 h-4 mr-2" />
            Export Report
          </button>
        </div>
      </div>
      
      {/* Report Type Selector */}
      <div className="bg-white shadow rounded-lg p-4">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between space-y-3 md:space-y-0">
          <div className="flex flex-wrap gap-2">
            <button
              className={`inline-flex items-center px-4 py-2 border rounded-md text-sm font-medium ${
                reportType === 'performance' 
                  ? 'bg-indigo-50 text-indigo-700 border-indigo-200' 
                  : 'bg-white text-gray-700 border-gray-300 hover:bg-gray-50'
              }`}
              onClick={() => setReportType('performance')}
            >
              <BarChart3 className="w-4 h-4 mr-2" />
              Performance
            </button>
            <button
              className={`inline-flex items-center px-4 py-2 border rounded-md text-sm font-medium ${
                reportType === 'financial' 
                  ? 'bg-green-50 text-green-700 border-green-200' 
                  : 'bg-white text-gray-700 border-gray-300 hover:bg-gray-50'
              }`}
              onClick={() => setReportType('financial')}
            >
              <DollarSign className="w-4 h-4 mr-2" />
              Financial
            </button>
            <button
              className={`inline-flex items-center px-4 py-2 border rounded-md text-sm font-medium ${
                reportType === 'client' 
                  ? 'bg-yellow-50 text-yellow-700 border-yellow-200' 
                  : 'bg-white text-gray-700 border-gray-300 hover:bg-gray-50'
              }`}
              onClick={() => setReportType('client')}
            >
              <Users className="w-4 h-4 mr-2" />
              Client
            </button>
            <button
              className={`inline-flex items-center px-4 py-2 border rounded-md text-sm font-medium ${
                reportType === 'team' 
                  ? 'bg-red-50 text-red-700 border-red-200' 
                  : 'bg-white text-gray-700 border-gray-300 hover:bg-gray-50'
              }`}
              onClick={() => setReportType('team')}
            >
              <Clock className="w-4 h-4 mr-2" />
              Team
            </button>
          </div>
          
          <div className="flex items-center space-x-2">
            <div className="flex items-center">
              <Calendar className="h-5 w-5 text-gray-400 mr-2" />
              <select
                className="block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm rounded-md"
                value={dateRange}
                onChange={(e) => setDateRange(e.target.value as DateRange)}
              >
                <option value="7d">Last 7 Days</option>
                <option value="30d">Last 30 Days</option>
                <option value="90d">Last 90 Days</option>
                <option value="ytd">Year to Date</option>
                <option value="all">All Time</option>
              </select>
            </div>
          </div>
        </div>
        
        <div className="mt-2 text-sm text-gray-500">
          <p>Showing data for: {getDateRangeLabel()}</p>
        </div>
      </div>
      
      {/* Performance Report */}
      {reportType === 'performance' && (
        <div className="space-y-6">
          <div className="grid grid-cols-1 gap-5 sm:grid-cols-3">
            <div className="bg-white overflow-hidden shadow rounded-lg">
              <div className="p-5">
                <div className="flex items-center">
                  <div className="flex-shrink-0 bg-indigo-500 rounded-md p-3">
                    <TrendingUp className="h-6 w-6 text-white" />
                  </div>
                  <div className="ml-5 w-0 flex-1">
                    <dl>
                      <dt className="text-sm font-medium text-gray-500 truncate">Social Engagement</dt>
                      <dd className="flex items-baseline">
                        <div className="text-2xl font-semibold text-gray-900">3,200</div>
                        <div className="ml-2 flex items-baseline text-sm font-semibold text-green-600">
                          <TrendingUp className="self-center flex-shrink-0 h-4 w-4 text-green-500" />
                          <span className="ml-1">14%</span>
                        </div>
                      </dd>
                    </dl>
                  </div>
                </div>
              </div>
            </div>

            <div className="bg-white overflow-hidden shadow rounded-lg">
              <div className="p-5">
                <div className="flex items-center">
                  <div className="flex-shrink-0 bg-green-500 rounded-md p-3">
                    <Users className="h-6 w-6 text-white" />
                  </div>
                  <div className="ml-5 w-0 flex-1">
                    <dl>
                      <dt className="text-sm font-medium text-gray-500 truncate">Website Traffic</dt>
                      <dd className="flex items-baseline">
                        <div className="text-2xl font-semibold text-gray-900">2,000</div>
                        <div className="ml-2 flex items-baseline text-sm font-semibold text-green-600">
                          <TrendingUp className="self-center flex-shrink-0 h-4 w-4 text-green-500" />
                          <span className="ml-1">18%</span>
                        </div>
                      </dd>
                    </dl>
                  </div>
                </div>
              </div>
            </div>

            <div className="bg-white overflow-hidden shadow rounded-lg">
              <div className="p-5">
                <div className="flex items-center">
                  <div className="flex-shrink-0 bg-yellow-500 rounded-md p-3">
                    <DollarSign className="h-6 w-6 text-white" />
                  </div>
                  <div className="ml-5 w-0 flex-1">
                    <dl>
                      <dt className="text-sm font-medium text-gray-500 truncate">Conversions</dt>
                      <dd className="flex items-baseline">
                        <div className="text-2xl font-semibold text-gray-900">105</div>
                        <div className="ml-2 flex items-baseline text-sm font-semibold text-green-600">
                          <TrendingUp className="self-center flex-shrink-0 h-4 w-4 text-green-500" />
                          <span className="ml-1">17%</span>
                        </div>
                      </dd>
                    </dl>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 gap-5 lg:grid-cols-2">
            <div className="bg-white overflow-hidden shadow rounded-lg">
              <div className="p-5">
                <h3 className="text-lg font-medium leading-6 text-gray-900">Performance Metrics</h3>
                <div className="mt-2 h-64">
                  <ResponsiveContainer width="100%" height="100%">
                    <LineChart
                      data={performanceData}
                      margin={{
                        top: 20,
                        right: 30,
                        left: 20,
                        bottom: 5,
                      }}
                    >
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="month" />
                      <YAxis />
                      <Tooltip />
                      <Legend />
                      <Line type="monotone" dataKey="socialEngagement" name="Social Engagement" stroke="#6366F1" activeDot={{ r: 8 }} />
                      <Line type="monotone" dataKey="websiteTraffic" name="Website Traffic" stroke="#10B981" />
                      <Line type="monotone" dataKey="conversions" name="Conversions" stroke="#F59E0B" />
                    </LineChart>
                  </ResponsiveContainer>
                </div>
              </div>
            </div>

            <div className="bg-white overflow-hidden shadow rounded-lg">
              <div className="p-5">
                <h3 className="text-lg font-medium leading-6 text-gray-900">Channel Performance</h3>
                <div className="mt-2 h-64">
                  <ResponsiveContainer width="100%" height="100%">
                    <PieChart>
                      <Pie
                        data={channelData}
                        cx="50%"
                        cy="50%"
                        labelLine={false}
                        outerRadius={80}
                        fill="#8884d8"
                        dataKey="value"
                        label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}
                      >
                        {channelData.map((entry, index) => (
                          <Cell key={`cell-${index}`} fill={entry.color} />
                        ))}
                      </Pie>
                      <Tooltip />
                    </PieChart>
                  </ResponsiveContainer>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
      
      {/* Financial Report */}
      {reportType === 'financial' && (
        <div className="space-y-6">
          <div className="grid grid-cols-1 gap-5 sm:grid-cols-3">
            <div className="bg-white overflow-hidden shadow rounded-lg">
              <div className="p-5">
                <div className="flex items-center">
                  <div className="flex-shrink-0 bg-green-500 rounded-md p-3">
                    <DollarSign className="h-6 w-6 text-white" />
                  </div>
                  <div className="ml-5 w-0 flex-1">
                    <dl>
                      <dt className="text-sm font-medium text-gray-500 truncate">Total Revenue</dt>
                      <dd className="flex items-baseline">
                        <div className="text-2xl font-semibold text-gray-900">$67,000</div>
                        <div className="ml-2 flex items-baseline text-sm font-semibold text-green-600">
                          <TrendingUp className="self-center flex-shrink-0 h-4 w-4 text-green-500" />
                          <span className="ml-1">22%</span>
                        </div>
                      </dd>
                    </dl>
                  </div>
                </div>
              </div>
            </div>

            <div className="bg-white overflow-hidden shadow rounded-lg">
              <div className="p-5">
                <div className="flex items-center">
                  <div className="flex-shrink-0 bg-red-500 rounded-md p-3">
                    <DollarSign className="h-6 w-6 text-white" />
                  </div>
                  <div className="ml-5 w-0 flex-1">
                    <dl>
                      <dt className="text-sm font-medium text-gray-500 truncate">Total Expenses</dt>
                      <dd className="flex items-baseline">
                        <div className="text-2xl font-semibold text-gray-900">$41,000</div>
                        <div className="ml-2 flex items-baseline text-sm font-semibold text-red-600">
                          <TrendingUp className="self-center flex-shrink-0 h-4 w-4 text-red-500" />
                          <span className="ml-1">14%</span>
                        </div>
                      </dd>
                    </dl>
                  </div>
                </div>
              </div>
            </div>

            <div className="bg-white overflow-hidden shadow rounded-lg">
              <div className="p-5">
                <div className="flex items-center">
                  <div className="flex-shrink-0 bg-blue-500 rounded-md p-3">
                    <DollarSign className="h-6 w-6 text-white" />
                  </div>
                  <div className="ml-5 w-0 flex-1">
                    <dl>
                      <dt className="text-sm font-medium text-gray-500 truncate">Net Profit</dt>
                      <dd className="flex items-baseline">
                        <div className="text-2xl font-semibold text-gray-900">$26,000</div>
                        <div className="ml-2 flex items-baseline text-sm font-semibold text-green-600">
                          <TrendingUp className="self-center flex-shrink-0 h-4 w-4 text-green-500" />
                          <span className="ml-1">37%</span>
                        </div>
                      </dd>
                    </dl>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 gap-5 lg:grid-cols-2">
            <div className="bg-white overflow-hidden shadow rounded-lg">
              <div className="p-5">
                <h3 className="text-lg font-medium leading-6 text-gray-900">Revenue vs Expenses</h3>
                <div className="mt-2 h-64">
                  <ResponsiveContainer width="100%" height="100%">
                    <BarChart
                      data={revenueData}
                      margin={{
                        top: 20,
                        right: 30,
                        left: 20,
                        bottom: 5,
                      }}
                    >
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="month" />
                      <YAxis />
                      <Tooltip formatter={(value) => [`$${value}`, '']} />
                      <Legend />
                      <Bar dataKey="revenue" name="Revenue" fill="#10B981" />
                      <Bar dataKey="expenses" name="Expenses" fill="#EF4444" />
                    </BarChart>
                  </ResponsiveContainer>
                </div>
              </div>
            </div>

            <div className="bg-white overflow-hidden shadow rounded-lg">
              <div className="p-5">
                <h3 className="text-lg font-medium leading-6 text-gray-900">Profit Trend</h3>
                <div className="mt-2 h-64">
                  <ResponsiveContainer width="100%" height="100%">
                    <AreaChart
                      data={revenueData}
                      margin={{
                        top: 20,
                        right: 30,
                        left: 20,
                        bottom: 5,
                      }}
                    >
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="month" />
                      <YAxis />
                      <Tooltip formatter={(value) => [`$${value}`, '']} />
                      <Area type="monotone" dataKey="profit" name="Profit" stroke="#6366F1" fill="#6366F1" fillOpacity={0.3} />
                    </AreaChart>
                  </ResponsiveContainer>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
      
      {/* Client Report */}
      {reportType === 'client' && (
        <div className="space-y-6">
          <div className="grid grid-cols-1 gap-5 sm:grid-cols-3">
            <div className="bg-white overflow-hidden shadow rounded-lg">
              <div className="p-5">
                <div className="flex items-center">
                  <div className="flex-shrink-0 bg-blue-500 rounded-md p-3">
                    <Users className="h-6 w-6 text-white" />
                  </div>
                  <div className="ml-5 w-0 flex-1">
                    <dl>
                      <dt className="text-sm font-medium text-gray-500 truncate">Active Clients</dt>
                      <dd className="flex items-baseline">
                        <div className="text-2xl font-semibold text-gray-900">24</div>
                        <div className="ml-2 flex items-baseline text-sm font-semibold text-green-600">
                          <TrendingUp className="self-center flex-shrink-0 h-4 w-4 text-green-500" />
                          <span className="ml-1">12%</span>
                        </div>
                      </dd>
                    </dl>
                  </div>
                </div>
              </div>
            </div>

            <div className="bg-white overflow-hidden shadow rounded-lg">
              <div className="p-5">
                <div className="flex items-center">
                  <div className="flex-shrink-0 bg-green-500 rounded-md p-3">
                    <TrendingUp className="h-6 w-6 text-white" />
                  </div>
                  <div className="ml-5 w-0 flex-1">
                    <dl>
                      <dt className="text-sm font-medium text-gray-500 truncate">Retention Rate</dt>
                      <dd className="flex items-baseline">
                        <div className="text-2xl font-semibold text-gray-900">96%</div>
                        <div className="ml-2 flex items-baseline text-sm font-semibold text-green-600">
                          <TrendingUp className="self-center flex-shrink-0 h-4 w-4 text-green-500" />
                          <span className="ml-1">3%</span>
                        </div>
                      </dd>
                    </dl>
                  </div>
                </div>
              </div>
            </div>

            <div className="bg-white overflow-hidden shadow rounded-lg">
              <div className="p-5">
                <div className="flex items-center">
                  <div className="flex-shrink-0 bg-yellow-500 rounded-md p-3">
                    <DollarSign className="h-6 w-6 text-white" />
                  </div>
                  <div className="ml-5 w-0 flex-1">
                    <dl>
                      <dt className="text-sm font-medium text-gray-500 truncate">Avg. Client Value</dt>
                      <dd className="flex items-baseline">
                        <div className="text-2xl font-semibold text-gray-900">$2,800</div>
                        <div className="ml-2 flex items-baseline text-sm font-semibold text-green-600">
                          <TrendingUp className="self-center flex-shrink-0 h-4 w-4 text-green-500" />
                          <span className="ml-1">8%</span>
                        </div>
                      </dd>
                    </dl>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 gap-5 lg:grid-cols-2">
            <div className="bg-white overflow-hidden shadow rounded-lg">
              <div className="p-5">
                <h3 className="text-lg font-medium leading-6 text-gray-900">Client Retention</h3>
                <div className="mt-2 h-64">
                  <ResponsiveContainer width="100%" height="100%">
                    <LineChart
                      data={clientRetentionData}
                      margin={{
                        top: 20,
                        right: 30,
                        left: 20,
                        bottom: 5,
                      }}
                    >
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="month" />
                      <YAxis domain={[85, 100]} />
                      <Tooltip formatter={(value) => [`${value}%`, 'Retention Rate']} />
                      <Line type="monotone" dataKey="retention" name="Retention Rate" stroke="#10B981" activeDot={{ r: 8 }} />
                    </LineChart>
                  </ResponsiveContainer>
                </div>
              </div>
            </div>

            <div className="bg-white overflow-hidden shadow rounded-lg">
              <div className="p-5">
                <h3 className="text-lg font-medium leading-6 text-gray-900">Client Satisfaction</h3>
                <div className="mt-2 h-64">
                  <ResponsiveContainer width="100%" height="100%">
                    <PieChart>
                      <Pie
                        data={clientSatisfactionData}
                        cx="50%"
                        cy="50%"
                        labelLine={false}
                        outerRadius={80}
                        fill="#8884d8"
                        dataKey="value"
                        label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}
                      >
                        {clientSatisfactionData.map((entry, index) => (
                          <Cell key={`cell-${index}`} fill={entry.color} />
                        ))}
                      </Pie>
                      <Tooltip />
                    </PieChart>
                  </ResponsiveContainer>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
      
      {/* Team Report */}
      {reportType === 'team' && (
        <div className="space-y-6">
          <div className="grid grid-cols-1 gap-5 sm:grid-cols-3">
            <div className="bg-white overflow-hidden shadow rounded-lg">
              <div className="p-5">
                <div className="flex items-center">
                  <div className="flex-shrink-0 bg-indigo-500 rounded-md p-3">
                    <Users className="h-6 w-6 text-white" />
                  </div>
                  <div className="ml-5 w-0 flex-1">
                    <dl>
                      <dt className="text-sm font-medium text-gray-500 truncate">Team Members</dt>
                      <dd className="text-2xl font-semibold text-gray-900">12</dd>
                    </dl>
                  </div>
                </div>
              </div>
            </div>

            <div className="bg-white overflow-hidden shadow rounded-lg">
              <div className="p-5">
                <div className="flex items-center">
                  <div className="flex-shrink-0 bg-green-500 rounded-md p-3">
                    <TrendingUp className="h-6 w-6 text-white" />
                  </div>
                  <div className="ml-5 w-0 flex-1">
                    <dl>
                      <dt className="text-sm font-medium text-gray-500 truncate">Avg. Productivity</dt>
                      <dd className="flex items-baseline">
                        <div className="text-2xl font-semibold text-gray-900">88%</div>
                        <div className="ml-2 flex items-baseline text-sm font-semibold text-green-600">
                          <TrendingUp className="self-center flex-shrink-0 h-4 w-4 text-green-500" />
                          <span className="ml-1">5%</span>
                        </div>
                      </dd>
                    </dl>
                  </div>
                </div>
              </div>
            </div>

            <div className="bg-white overflow-hidden shadow rounded-lg">
              <div className="p-5">
                <div className="flex items-center">
                  <div className="flex-shrink-0 bg-blue-500 rounded-md p-3">
                    <Clock className="h-6 w-6 text-white" />
                  </div>
                  <div className="ml-5 w-0 flex-1">
                    <dl>
                      <dt className="text-sm font-medium text-gray-500 truncate">Billable Hours</dt>
                      <dd className="flex items-baseline">
                        <div className="text-2xl font-semibold text-gray-900">75%</div>
                        <div className="ml-2 flex items-baseline text-sm font-semibold text-green-600">
                          <TrendingUp className="self-center flex-shrink-0 h-4 w-4 text-green-500" />
                          <span className="ml-1">3%</span>
                        </div>
                      </dd>
                    </dl>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 gap-5 lg:grid-cols-2">
            <div className="bg-white overflow-hidden shadow rounded-lg">
              <div className="p-5">
                <h3 className="text-lg font-medium leading-6 text-gray-900">Team Productivity</h3>
                <div className="mt-2 h-64">
                  <ResponsiveContainer width="100%" height="100%">
                    <BarChart
                      data={teamProductivityData}
                      margin={{
                        top: 20,
                        right: 30,
                        left: 20,
                        bottom: 5,
                      }}
                    >
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="day" />
                      <YAxis domain={[0, 100]} />
                      <Tooltip formatter={(value) => [`${value}%`, 'Productivity']} />
                      <Bar dataKey="productivity" name="Productivity" fill="#6366F1" />
                    </BarChart>
                  </ResponsiveContainer>
                </div>
              </div>
            </div>

            <div className="bg-white overflow-hidden shadow rounded-lg">
              <div className="p-5">
                <h3 className="text-lg font-medium leading-6 text-gray-900">Time Utilization</h3>
                <div className="mt-2 h-64">
                  <ResponsiveContainer width="100%" height="100%">
                    <PieChart>
                      <Pie
                        data={teamUtilizationData}
                        cx="50%"
                        cy="50%"
                        labelLine={false}
                        outerRadius={80}
                        fill="#8884d8"
                        dataKey="value"
                        label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}
                      >
                        {teamUtilizationData.map((entry, index) => (
                          <Cell key={`cell-${index}`} fill={entry.color} />
                        ))}
                      </Pie>
                      <Tooltip />
                    </PieChart>
                  </ResponsiveContainer>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
      
      {/* Recent Reports */}
      <div className="bg-white shadow rounded-lg overflow-hidden">
        <div className="px-4 py-5 sm:px-6 border-b border-gray-200">
          <h3 className="text-lg leading-6 font-medium text-gray-900">Recent Reports</h3>
          <div className="mt-3 max-w-xl">
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <Search className="h-5 w-5 text-gray-400" />
              </div>
              <input
                type="text"
                className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md leading-5 bg-white placeholder-gray-500 focus:outline-none focus:placeholder-gray-400 focus:ring-1 focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                placeholder="Search reports"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
          </div>
        </div>
        <ul className="divide-y divide-gray-200 max-h-96 overflow-y-auto">
          {filteredReports.length > 0 ? (
            filteredReports.map((report) => (
              <li key={report.id} className="px-4 py-4 sm:px-6 hover:bg-gray-50">
                <div className="flex items-center justify-between">
                  <div className="flex items-center">
                    <div className="flex-shrink-0">
                      {getReportTypeIcon(report.type)}
                    </div>
                    <div className="ml-3">
                      <p className="text-sm font-medium text-gray-900">{report.name}</p>
                      <p className="text-sm text-gray-500">
                        {report.client} • {formatDate(report.date)}
                      </p>
                    </div>
                  </div>
                  <div>
                    <button className="inline-flex items-center px-2.5 py-1.5 border border-transparent text-xs font-medium rounded text-blue-700 bg-blue-100 hover:bg-blue-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500">
                      View
                      <ArrowRight className="ml-1 h-3 w-3" />
                    </button>
                  </div>
                </div>
              </li>
            ))
          ) : (
            <li className="px-4 py-6 text-center text-gray-500">
              No reports found matching your search.
            </li>
          )}
        </ul>
      </div>
    </div>
  );
};

export default Reports;