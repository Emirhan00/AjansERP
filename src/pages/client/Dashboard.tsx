import React from 'react';
import { useAuth } from '../../contexts/AuthContext';
import { 
  BarChart3, Clock, FileText, CheckCircle, 
  AlertCircle, DollarSign, TrendingUp, Calendar 
} from 'lucide-react';
import { 
  BarChart, Bar, XAxis, YAxis, CartesianGrid, 
  Tooltip, ResponsiveContainer, LineChart, Line 
} from 'recharts';

const ClientDashboard: React.FC = () => {
  const { user } = useAuth();
  
  // Mock data for charts
  const budgetData = [
    { category: 'Social Media', allocated: 5000, spent: 3200 },
    { category: 'SEO', allocated: 3000, spent: 2100 },
    { category: 'Content', allocated: 4000, spent: 2800 },
    { category: 'PPC', allocated: 6000, spent: 4500 },
  ];
  
  const performanceData = [
    { month: 'Jan', engagement: 1200, conversions: 45 },
    { month: 'Feb', engagement: 1900, conversions: 56 },
    { month: 'Mar', engagement: 2400, conversions: 75 },
    { month: 'Apr', engagement: 1800, conversions: 68 },
    { month: 'May', engagement: 2800, conversions: 90 },
    { month: 'Jun', engagement: 3200, conversions: 105 },
  ];
  
  // Mock data for recent updates
  const recentUpdates = [
    { id: 1, update: 'New social media posts published', project: 'Summer Campaign', time: '2 hours ago' },
    { id: 2, update: 'SEO report generated', project: 'Website Optimization', time: '1 day ago' },
    { id: 3, update: 'Campaign performance review', project: 'Spring Promotion', time: '3 days ago' },
  ];
  
  // Mock data for upcoming deliverables
  const upcomingDeliverables = [
    { id: 1, deliverable: 'Social Media Content Calendar', project: 'Monthly Planning', deadline: 'Tomorrow, 5:00 PM' },
    { id: 2, deliverable: 'Google Ads Campaign Launch', project: 'Summer Promotion', deadline: 'Jun 15, 9:00 AM' },
    { id: 3, deliverable: 'Monthly Performance Report', project: 'Ongoing Services', deadline: 'Jun 30, 2:00 PM' },
  ];

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold text-gray-900">Client Dashboard</h1>
        <div className="flex items-center space-x-2">
          <span className="text-sm text-gray-500">Last updated: Today, 10:30 AM</span>
          <button className="p-1 rounded-full hover:bg-gray-100">
            <Calendar className="w-5 h-5 text-gray-500" />
          </button>
        </div>
      </div>

      {/* Stats Overview */}
      <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
        <div className="bg-white overflow-hidden shadow rounded-lg">
          <div className="p-5">
            <div className="flex items-center">
              <div className="flex-shrink-0 bg-blue-500 rounded-md p-3">
                <FileText className="h-6 w-6 text-white" />
              </div>
              <div className="ml-5 w-0 flex-1">
                <dl>
                  <dt className="text-sm font-medium text-gray-500 truncate">Active Projects</dt>
                  <dd className="text-2xl font-semibold text-gray-900">3</dd>
                </dl>
              </div>
            </div>
          </div>
        </div>

        <div className="bg-white overflow-hidden shadow rounded-lg">
          <div className="p-5">
            <div className="flex items-center">
              <div className="flex-shrink-0 bg-green-500 rounded-md p-3">
                <DollarSign className="h-6 w-6 text-white" />
              </div>
              <div className="ml-5 w-0 flex-1">
                <dl>
                  <dt className="text-sm font-medium text-gray-500 truncate">Budget Utilization</dt>
                  <dd className="flex items-baseline">
                    <div className="text-2xl font-semibold text-gray-900">72%</div>
                    <div className="ml-2 flex items-baseline text-sm font-semibold text-green-600">
                      <TrendingUp className="self-center flex-shrink-0 h-4 w-4 text-green-500" />
                      <span className="ml-1">On track</span>
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
              <div className="flex-shrink-0 bg-indigo-500 rounded-md p-3">
                <BarChart3 className="h-6 w-6 text-white" />
              </div>
              <div className="ml-5 w-0 flex-1">
                <dl>
                  <dt className="text-sm font-medium text-gray-500 truncate">Engagement Growth</dt>
                  <dd className="flex items-baseline">
                    <div className="text-2xl font-semibold text-gray-900">+24%</div>
                    <div className="ml-2 flex items-baseline text-sm font-semibold text-green-600">
                      <TrendingUp className="self-center flex-shrink-0 h-4 w-4 text-green-500" />
                      <span className="ml-1">vs last month</span>
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
                <Clock className="h-6 w-6 text-white" />
              </div>
              <div className="ml-5 w-0 flex-1">
                <dl>
                  <dt className="text-sm font-medium text-gray-500 truncate">Pending Approvals</dt>
                  <dd className="flex items-baseline">
                    <div className="text-2xl font-semibold text-gray-900">2</div>
                    <div className="ml-2 flex items-baseline text-sm font-semibold text-yellow-600">
                      <AlertCircle className="self-center flex-shrink-0 h-4 w-4 text-yellow-500" />
                      <span className="ml-1">Action needed</span>
                    </div>
                  </dd>
                </dl>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Charts */}
      <div className="grid grid-cols-1 gap-5 lg:grid-cols-2">
        <div className="bg-white overflow-hidden shadow rounded-lg">
          <div className="p-5">
            <h3 className="text-lg font-medium leading-6 text-gray-900">Budget Allocation & Spending</h3>
            <div className="mt-2 h-64">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart
                  data={budgetData}
                  margin={{
                    top: 20,
                    right: 30,
                    left: 20,
                    bottom: 5,
                  }}
                >
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="category" />
                  <YAxis />
                  <Tooltip formatter={(value) => [`$${value}`, '']} />
                  <Bar dataKey="allocated" name="Allocated" fill="#6366F1" />
                  <Bar dataKey="spent" name="Spent" fill="#10B981" />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>
        </div>

        <div className="bg-white overflow-hidden shadow rounded-lg">
          <div className="p-5">
            <h3 className="text-lg font-medium leading-6 text-gray-900">Campaign Performance</h3>
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
                  <YAxis yAxisId="left" />
                  <YAxis yAxisId="right" orientation="right" />
                  <Tooltip />
                  <Line yAxisId="left" type="monotone" dataKey="engagement" name="Engagement" stroke="#6366F1" activeDot={{ r: 8 }} />
                  <Line yAxisId="right" type="monotone" dataKey="conversions" name="Conversions" stroke="#10B981" />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </div>
        </div>
      </div>

      {/* Recent Updates and Upcoming Deliverables */}
      <div className="grid grid-cols-1 gap-5 lg:grid-cols-2">
        <div className="bg-white overflow-hidden shadow rounded-lg">
          <div className="px-5 py-4 border-b border-gray-200">
            <h3 className="text-lg font-medium leading-6 text-gray-900">Recent Updates</h3>
          </div>
          <div className="px-5 py-3">
            <ul className="divide-y divide-gray-200">
              {recentUpdates.map((update) => (
                <li key={update.id} className="py-3">
                  <div className="flex items-start space-x-3">
                    <div className="flex-shrink-0 pt-1">
                      <CheckCircle className="h-5 w-5 text-green-500" />
                    </div>
                    <div className="min-w-0 flex-1">
                      <p className="text-sm font-medium text-gray-900">{update.update}</p>
                      <p className="text-sm text-gray-500">{update.project}</p>
                      <p className="text-xs text-gray-400 mt-1">{update.time}</p>
                    </div>
                  </div>
                </li>
              ))}
            </ul>
          </div>
          <div className="px-5 py-3 bg-gray-50 text-center">
            <button className="text-sm font-medium text-blue-600 hover:text-blue-500">
              View all updates
            </button>
          </div>
        </div>

        <div className="bg-white overflow-hidden shadow rounded-lg">
          <div className="px-5 py-4 border-b border-gray-200">
            <h3 className="text-lg font-medium leading-6 text-gray-900">Upcoming Deliverables</h3>
          </div>
          <div className="px-5 py-3">
            <ul className="divide-y divide-gray-200">
              {upcomingDeliverables.map((deliverable) => (
                <li key={deliverable.id} className="py-3">
                  <div className="flex items-start space-x-3">
                    <div className="flex-shrink-0 pt-1">
                      <Clock className="h-5 w-5 text-yellow-500" />
                    </div>
                    <div className="min-w-0 flex-1">
                      <p className="text-sm font-medium text-gray-900">{deliverable.deliverable}</p>
                      <p className="text-sm text-gray-500">{deliverable.project}</p>
                      <p className="text-xs text-red-500 font-medium mt-1">{deliverable.deadline}</p>
                    </div>
                  </div>
                </li>
              ))}
            </ul>
          </div>
          <div className="px-5 py-3 bg-gray-50 text-center">
            <button className="text-sm font-medium text-blue-600 hover:text-blue-500">
              View all deliverables
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ClientDashboard;