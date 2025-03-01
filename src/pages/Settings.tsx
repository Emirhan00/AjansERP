import React, { useState } from 'react';
import { 
  Save, Bell, Lock, CreditCard, Users, 
  Mail, Globe, Smartphone, Shield, User
} from 'lucide-react';

const Settings: React.FC = () => {
  const [activeTab, setActiveTab] = useState<string>('profile');
  
  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
        <h1 className="text-2xl font-bold text-gray-900">Settings</h1>
      </div>
      
      <div className="bg-white shadow rounded-lg">
        <div className="sm:flex">
          {/* Sidebar */}
          <div className="sm:w-64 sm:border-r sm:border-gray-200">
            <nav className="flex flex-col sm:h-full py-6 px-4 sm:py-8 sm:px-6">
              <button
                onClick={() => setActiveTab('profile')}
                className={`flex items-center px-3 py-2 text-sm font-medium rounded-md mb-2 ${
                  activeTab === 'profile' 
                    ? 'bg-blue-50 text-blue-700' 
                    : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900'
                }`}
              >
                <User className="mr-3 h-5 w-5 flex-shrink-0" />
                <span>Profile</span>
              </button>
              
              <button
                onClick={() => setActiveTab('notifications')}
                className={`flex items-center px-3 py-2 text-sm font-medium rounded-md mb-2 ${
                  activeTab === 'notifications' 
                    ? 'bg-blue-50 text-blue-700' 
                    : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900'
                }`}
              >
                <Bell className="mr-3 h-5 w-5 flex-shrink-0" />
                <span>Notifications</span>
              </button>
              
              <button
                onClick={() => setActiveTab('security')}
                className={`flex items-center px-3 py-2 text-sm font-medium rounded-md mb-2 ${
                  activeTab === 'security' 
                    ? 'bg-blue-50 text-blue-700' 
                    : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900'
                }`}
              >
                <Lock className="mr-3 h-5 w-5 flex-shrink-0" />
                <span>Security</span>
              </button>
              
              <button
                onClick={() => setActiveTab('billing')}
                className={`flex items-center px-3 py-2 text-sm font-medium rounded-md mb-2 ${
                  activeTab === 'billing' 
                    ? 'bg-blue-50 text-blue-700' 
                    : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900'
                }`}
              >
                <CreditCard className="mr-3 h-5 w-5 flex-shrink-0" />
                <span>Billing</span>
              </button>
              
              <button
                onClick={() => setActiveTab('team')}
                className={`flex items-center px-3 py-2 text-sm font-medium rounded-md mb-2 ${
                  activeTab === 'team' 
                    ? 'bg-blue-50 text-blue-700' 
                    : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900'
                }`}
              >
                <Users className="mr-3 h-5 w-5 flex-shrink-0" />
                <span>Team</span>
              </button>
              
              <button
                onClick={() => setActiveTab('integrations')}
                className={`flex items-center px-3 py-2 text-sm font-medium rounded-md mb-2 ${
                  activeTab === 'integrations' 
                    ? 'bg-blue-50 text-blue-700' 
                    : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900'
                }`}
              >
                <Globe className="mr-3 h-5 w-5 flex-shrink-0" />
                <span>Integrations</span>
              </button>
            </nav>
          </div>
          
          {/* Content */}
          <div className="p-6 sm:flex-1">
            {activeTab === 'profile' && (
              <div>
                <h2 className="text-lg font-medium text-gray-900">Profile Settings</h2>
                <p className="mt-1 text-sm text-gray-500">
                  Update your personal information and preferences.
                </p>
                
                <div className="mt-6 grid grid-cols-1 gap-y-6 gap-x-4 sm:grid-cols-6">
                  <div className="sm:col-span-3">
                    <label htmlFor="first-name" className="block text-sm font-medium text-gray-700">
                      First name
                    </label>
                    <div className="mt-1">
                      <input
                        type="text"
                        name="first-name"
                        id="first-name"
                        autoComplete="given-name"
                        className="shadow-sm focus:ring-blue-500 focus:border-blue-500 block w-full sm:text-sm border-gray-300 rounded-md"
                        defaultValue="Agency"
                      />
                    </div>
                  </div>

                  <div className="sm:col-span-3">
                    <label htmlFor="last-name" className="block text-sm font-medium text-gray-700">
                      Last name
                    </label>
                    <div className="mt-1">
                      <input
                        type="text"
                        name="last-name"
                        id="last-name"
                        autoComplete="family-name"
                        className="shadow-sm focus:ring-blue-500 focus:border-blue-500 block w-full sm:text-sm border-gray-300 rounded-md"
                        defaultValue="Manager"
                      />
                    </div>
                  </div>

                  <div className="sm:col-span-4">
                    <label htmlFor="email" className="block text-sm font-medium text-gray-700">
                      Email address
                    </label>
                    <div className="mt-1">
                      <input
                        id="email"
                        name="email"
                        type="email"
                        autoComplete="email"
                        className="shadow-sm focus:ring-blue-500 focus:border-blue-500 block w-full sm:text-sm border-gray-300 rounded-md"
                        defaultValue="manager@example.com"
                      />
                    </div>
                  </div>

                  <div className="sm:col-span-3">
                    <label htmlFor="phone" className="block text-sm font-medium text-gray-700">
                      Phone number
                    </label>
                    <div className="mt-1 flex rounded-md shadow-sm">
                      <span className="inline-flex items-center px-3 rounded-l-md border border-r-0 border-gray-300 bg-gray-50 text-gray-500 sm:text-sm">
                        +1
                      </span>
                      <input
                        type="text"
                        name="phone"
                        id="phone"
                        autoComplete="tel"
                        className="flex-1 focus:ring-blue-500 focus:border-blue-500 block w-full min-w-0 rounded-none rounded-r-md sm:text-sm border-gray-300"
                        defaultValue="555-987-6543"
                      />
                    </div>
                  </div>
                  
                  <div className="sm:col-span-6">
                    <label htmlFor="photo" className="block text-sm font-medium text-gray-700">
                      Profile photo
                    </label>
                    <div className="mt-2 flex items-center">
                      <span className="h-12 w-12 rounded-full overflow-hidden bg-gray-100">
                        <img 
                          src="https://images.unsplash.com/photo-1566492031773-4f4e44671857?ixlib=rb-1.2.1&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80" 
                          alt="Profile"
                          className="h-full w-full object-cover"
                        />
                      </span>
                      <button
                        type="button"
                        className="ml-5 bg-white py-2 px-3 border border-gray-300 rounded-md shadow-sm text-sm leading-4 font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                      >
                        Change
                      </button>
                    </div>
                  </div>
                </div>
                
                <div className="mt-6 flex justify-end">
                  <button
                    type="button"
                    className="inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                  >
                    <Save className="mr-2 h-4 w-4" />
                    Save Changes
                  </button>
                </div>
              </div>
            )}
            
            {activeTab === 'notifications' && (
              <div>
                <h2 className="text-lg font-medium text-gray-900">Notification Settings</h2>
                <p className="mt-1 text-sm text-gray-500">
                  Manage how you receive notifications and alerts.
                </p>
                
                <div className="mt-6 space-y-6">
                  <fieldset>
                    <legend className="text-base font-medium text-gray-900">Email Notifications</legend>
                    <div className="mt-4 space-y-4">
                      <div className="flex items-start">
                        <div className="flex items-center h-5">
                          <input
                            id="email-new-projects"
                            name="email-new-projects"
                            type="checkbox"
                            checked={true}
                            className="focus:ring-blue-500 h-4 w-4 text-blue-600 border-gray-300 rounded"
                          />
                        </div>
                        <div className="ml-3 text-sm">
                          <label htmlFor="email-new-projects" className="font-medium text-gray-700">New projects</label>
                          <p className="text-gray-500">Get notified when a new project is created or you're assigned to a project.</p>
                        </div>
                      </div>
                      
                      <div className="flex items-start">
                        <div className="flex items-center h-5">
                          <input
                            id="email-task-updates"
                            name="email-task-updates"
                            type="checkbox"
                            checked={true}
                            className="focus:ring-blue-500 h-4 w-4 text-blue-600 border-gray-300 rounded"
                          />
                        </div>
                        <div className="ml-3 text-sm">
                          <label htmlFor="email-task-updates" className="font-medium text-gray-700">Task updates</label>
                          <p className="text-gray-500">Get notified when tasks are updated, completed, or approaching deadlines.</p>
                        </div>
                      </div>
                      
                      <div className="flex items-start">
                        <div className="flex items-center h-5">
                          <input
                            id="email-client-feedback"
                            name="email-client-feedback"
                            type="checkbox"
                            checked={true}
                            className="focus:ring-blue-500 h-4 w-4 text-blue-600 border-gray-300 rounded"
                          />
                        </div>
                        <div className="ml-3 text-sm">
                          <label htmlFor="email-client-feedback" className="font-medium text-gray-700">Client feedback</label>
                          <p className="text-gray-500">Get notified when clients provide feedback or approve deliverables.</p>
                        </div>
                      </div>
                      
                      <div className="flex items-start">
                        <div className="flex items-center h-5">
                          <input
                            id="email-invoices"
                            name="email-invoices"
                            type="checkbox"
                            checked={false}
                            className="focus:ring-blue-500 h-4 w-4 text-blue-600 border-gray-300 rounded"
                          />
                        </div>
                        <div className="ml-3 text-sm">
                          <label htmlFor="email-invoices" className="font-medium text-gray-700">Invoices and payments</label>
                          <p className="text-gray-500">Get notified about invoice status and payment updates.</p>
                        </div>
                      </div>
                    </div>
                  </fieldset>
                  
                  <fieldset>
                    <legend className="text-base font-medium text-gray-900">Push Notifications</legend>
                    <div className="mt-4 space-y-4">
                      <div className="flex items-start">
                        <div className="flex items-center h-5">
                          <input
                            id="push-everything"
                            name="push-notifications"
                            type="radio"
                            checked={false}
                            className="focus:ring-blue-500 h-4 w-4 text-blue-600 border-gray-300"
                          />
                        </div>
                        <div className="ml-3 text-sm">
                          <label htmlFor="push-everything" className="font-medium text-gray-700">All notifications</label>
                          <p className="text-gray-500">Receive all notifications on your device.</p>
                        </div>
                      </div>
                      
                      <div className="flex items-start">
                        <div className="flex items-center h-5">
                          <input
                            id="push-important"
                            name="push-notifications"
                            type="radio"
                            checked={true}
                            className="focus:ring-blue-500 h-4 w-4 text-blue-600 border-gray-300"
                          />
                        </div>
                        <div className="ml-3 text-sm">
                          <label htmlFor="push-important" className="font-medium text-gray-700">Important only</label>
                          <p className="text-gray-500">Only receive notifications for important updates.</p>
                        </div>
                      </div>
                      
                      <div className="flex items-start">
                        <div className="flex items-center h-5">
                          <input
                            id="push-none"
                            name="push-notifications"
                            type="radio"
                            checked={false}
                            className="focus:ring-blue-500 h-4 w-4 text-blue-600 border-gray-300"
                          />
                        </div>
                        <div className="ml-3 text-sm">
                          <label htmlFor="push-none" className="font-medium text-gray-700">No push notifications</label>
                          <p className="text-gray-500">Never receive push notifications.</p>
                        </div>
                      </div>
                    </div>
                  </fieldset>
                </div>
                
                <div className="mt-6 flex justify-end">
                  <button
                    type="button"
                    className="inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                  >
                    <Save className="mr-2 h-4 w-4" />
                    Save Changes
                  </button>
                </div>
              </div>
            )}
            
            {activeTab === 'security' && (
              <div>
                <h2 className="text-lg font-medium text-gray-900">Security Settings</h2>
                <p className="mt-1 text-sm text-gray-500">
                  Manage your password and account security.
                </p>
                
                <div className="mt-6 space-y-6">
                  <div>
                    <h3 className="text-base font-medium text-gray-900">Change Password</h3>
                    <div className="mt-4 grid grid-cols-1 gap-y-6 gap-x-4 sm:grid-cols-6">
                      <div className="sm:col-span-4">
                        <label htmlFor="current-password" className="block text-sm font-medium text-gray-700">
                          Current password
                        </label>
                        <div className="mt-1">
                          <input
                            type="password"
                            name="current-password"
                            id="current-password"
                            autoComplete="current-password"
                            className="shadow-sm focus:ring-blue-500 focus:border-blue-500 block w-full sm:text-sm border-gray-300 rounded-md"
                          />
                        </div>
                      </div>
                      
                      <div className="sm:col-span-4">
                        <label htmlFor="new-password" className="block text-sm font-medium text-gray-700">
                          New password
                        </label>
                        <div className="mt-1">
                          <input
                            type="password"
                            name="new-password"
                            id="new-password"
                            autoComplete="new-password"
                            className="shadow-sm focus:ring-blue-500 focus:border-blue-500 block w-full sm:text-sm border-gray-300 rounded-md"
                          />
                        </div>
                      </div>
                      
                      <div className="sm:col-span-4">
                        <label htmlFor="confirm-password" className="block text-sm font-medium text-gray-700">
                          Confirm password
                        </label>
                        <div className="mt-1">
                          <input
                            type="password"
                            name="confirm-password"
                            id="confirm-password"
                            autoComplete="new-password"
                            className="shadow-sm focus:ring-blue-500 focus:border-blue-500 block w-full sm:text-sm border-gray-300 rounded-md"
                          />
                        </div>
                      </div>
                    </div>
                  </div>
                  
                  <div className="pt-6 border-t border-gray-200">
                    <h3 className="text-base font-medium text-gray-900">Two-Factor Authentication</h3>
                    <div className="mt-4">
                      <div className="flex items-start">
                        <div className="flex items-center h-5">
                          <input
                            id="two-factor"
                            name="two-factor"
                            type="checkbox"
                            checked={false}
                            className="focus:ring-blue-500 h-4 w-4 text-blue-600 border-gray-300 rounded"
                          />
                        </div>
                        <div className="ml-3 text-sm">
                          <label htmlFor="two-factor" className="font-medium text-gray-700">Enable two-factor authentication</label>
                          <p className="text-gray-500">Add an extra layer of security to your account by requiring a verification code in addition to your password.</p>
                        </div>
                      </div>
                    </div>
                  </div>
                  
                  <div className="pt-6 border-t border-gray-200">
                    <h3 className="text-base font-medium text-gray-900">Sessions</h3>
                    <p className="mt-1 text-sm text-gray-500">
                      Manage your active sessions and sign out from other devices.
                    </p>
                    <div className="mt-4">
                      <div className="bg-gray-50 p-4 rounded-md">
                        <div className="flex justify-between items-center">
                          <div>
                            <p className="text-sm font-medium text-gray-900">Current session</p>
                            <p className="text-xs text-gray-500">Started on May 20, 2025 • Chrome on Windows</p>
                          </div>
                          <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">
                            Active
                          </span>
                        </div>
                      </div>
                      <div className="mt-2">
                        <button
                          type="button"
                          className="text-sm font-medium text-red-600 hover:text-red-500"
                        >
                          Sign out from all other devices
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
                
                <div className="mt-6 flex justify-end">
                  <button
                    type="button"
                    className="inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                  >
                    <Save className="mr-2 h-4 w-4" />
                    Save Changes
                  </button>
                </div>
              </div>
            )}
            
            {activeTab === 'billing' && (
              <div>
                <h2 className="text-lg font-medium text-gray-900">Billing Settings</h2>
                <p className="mt-1 text-sm text-gray-500">
                  Manage your subscription and payment methods.
                </p>
                
                <div className="mt-6 space-y-6">
                  <div>
                    <h3 className="text-base font-medium text-gray-900">Current Plan</h3>
                    <div className="mt-4 bg-gray-50 p-4 rounded-md">
                      <div className="flex justify-between items-center">
                        <div>
                          <p className="text-sm font-medium text-gray-900">Agency Pro Plan</p>
                          <p className="text-xs text-gray-500">$99/month • Renews on June 1, 2025</p>
                        </div>
                        <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">
                          Active
                        </span>
                      </div>
                      <div className="mt-4">
                        <button
                          type="button"
                          className="text-sm font-medium text-blue-600 hover:text-blue-500"
                        >
                          Upgrade plan
                        </button>
                      </div>
                    </div>
                  </div>
                  
                  <div className="pt-6 border-t border-gray-200">
                    <h3 className="text-base font-medium text-gray-900">Payment Method</h3>
                    <div className="mt-4 bg-gray-50 p-4 rounded-md">
                      <div className="flex justify-between items-center">
                        <div className="flex items-center">
                          <div className="flex-shrink-0 h-8 w-12 bg-gray-200 rounded flex items-center justify-center">
                            <span className="text-xs font-medium text-gray-800">VISA</span>
                          </div>
                          <div className="ml-4">
                            <p className="text-sm font-medium text-gray-900">Visa ending in 4242</p>
                            <p className="text-xs text-gray-500">Expires 12/2025</p>
                          </div>
                        </div>
                        <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
                          Default
                        </span>
                      </div>
                      <div className="mt-4">
                        <button
                          type="button"
                          className="text-sm font-medium text-blue-600 hover:text-blue-500"
                        >
                          Update payment method
                        </button>
                      </div>
                    </div>
                  </div>
                  
                  <div className="pt-6 border-t border-gray-200">
                    <h3 className="text-base font-medium text-gray-900">Billing History</h3>
                    <div className="mt-4">
                      <div className="overflow-hidden shadow ring-1 ring-black ring-opacity-5 sm:rounded-lg">
                        <table className="min-w-full divide-y divide-gray-300">
                          <thead className="bg-gray-50">
                            <tr>
                              <th scope="col" className="py-3.5 pl-4 pr-3 text-left text-sm font-semibold text-gray-900 sm:pl-6">Date</th>
                              <th scope="col" className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">Description</th>
                              <th scope="col" className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">Amount</th>
                              <th scope="col" className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">Status</th>
                            </tr>
                          </thead>
                          <tbody className="divide-y divide-gray-200 bg-white">
                            <tr>
                              <td className="whitespace-nowrap py-4 pl-4 pr-3 text-sm font-medium text-gray-900 sm:pl-6">May 1, 2025</td>
                              <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">Agency Pro Plan - Monthly</td>
                              <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">$99.00</td>
                              <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
                                <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">
                                  Paid
                                </span>
                              </td>
                            </tr>
                            <tr>
                              <td className="whitespace-nowrap py-4 pl-4 pr-3 text-sm font-medium text-gray-900 sm:pl-6">Apr 1, 2025</td>
                              <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">Agency Pro Plan - Monthly</td>
                              <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">$99.00</td>
                              <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
                                <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">
                                  Paid
                                </span>
                              </td>
                            </tr>
                            <tr>
                              <td className="whitespace-nowrap py-4 pl-4 pr-3 text-sm font-medium text-gray-900 sm:pl-6">Mar 1, 2025</td>
                              <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">Agency Pro Plan - Monthly</td>
                              <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">$99.00</td>
                              <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
                                <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">
                                  Paid
                                </span>
                              </td>
                            </tr>
                          </tbody>
                        </table>
                      </div>
                    </div>
                  </div>
                </div>
                
                <div className="mt-6 flex justify-end">
                  <button
                    type="button"
                    className="inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                  >
                    <Save className="mr-2 h-4 w-4" />
                    Save Changes
                  </button>
                </div>
              </div>
            )}
            
            {activeTab === 'team' && (
              <div>
                <h2 className="text-lg font-medium text-gray-900">Team Settings</h2>
                <p className="mt-1 text-sm text-gray-500">
                  Manage team members and permissions.
                </p>
                
                <div className="mt-6 space-y-6">
                  <div>
                    <h3 className="text-base font-medium text-gray-900">Team Members</h3>
                    <div className="mt-4">
                      <div className="overflow-hidden shadow ring-1 ring-black ring-opacity-5 sm:rounded-lg">
                        <table className="min-w-full divide-y divide-gray-300">
                          <thead className="bg-gray-50">
                            <tr>
                              <th scope="col" className="py-3.5 pl-4 pr-3 text-left text-sm font-semibold text-gray-900 sm:pl-6">Name</th>
                              <th scope="col" className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">Email</th>
                              <th scope="col" className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">Role</th>
                              <th scope="col" className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">Status</th>
                              <th scope="col" className="relative py-3.5 pl-3 pr-4 sm:pr-6">
                                <span className="sr-only">Actions</span>
                              </th>
                            </tr>
                          </thead>
                          <tbody className="divide-y divide-gray-200 bg-white">
                            <tr>
                              <td className="whitespace-nowrap py-4 pl-4 pr-3 text-sm font-medium text-gray-900 sm:pl-6">
                                <div className="flex items-center">
                                  <div className="h-8 w-8 rounded-full">
                                    <img 
                                      src="https://images.unsplash.com/photo-1566492031773-4f4e44671857?ixlib=rb-1.2.1&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80" 
                                      alt=""
                                      className="h-8 w-8 rounded-full"
                                    />
                                  </div>
                                  <div className="ml-4">
                                    <div className="font-medium text-gray-900">Agency Manager</div>
                                  </div>
                                </div>
                              </td>
                              <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">manager@example.com</td>
                              <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">Admin</td>
                              <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
                                <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">
                                  Active
                                </span>
                              </td>
                              <td className="relative whitespace-nowrap py-4 pl-3 pr-4 text-right text-sm font-medium sm:pr-6">
                                <button className="text-blue-600 hover:text-blue-900">Edit</button>
                              </td>
                            </tr>
                            <tr>
                              <td className="whitespace-nowrap py-4 pl-4 pr-3 text-sm font-medium text-gray-900 sm:pl-6">
                                <div className="flex items-center">
                                  <div className="h-8 w-8 rounded-full">
                                    <img 
                                      src="https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-1.2.1&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80" 
                                      alt=""
                                      className="h-8 w-8 rounded-full"
                                    />
                                  </div>
                                  <div className="ml-4">
                                    <div className="font-medium text-gray-900">Sarah Smith</div>
                                  </div>
                                </div>
                              </td>
                              <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">sarah@example.com</td>
                              <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">Designer</td>
                              <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
                                <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">
                                  Active
                                </span>
                              </td>
                              <td className="relative whitespace-nowrap py-4 pl-3 pr-4 text-right text-sm font-medium sm:pr-6">
                                <button className="text-blue-600 hover:text-blue-900">Edit</button>
                              </td>
                            </tr>
                            <tr>
                              <td className="whitespace-nowrap py-4 pl-4 pr-3 text-sm font-medium text-gray-900 sm:pl-6">
                                <div className="flex items-center">
                                  <div className="h-8 w-8 rounded-full">
                                    <img 
                                      src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80" 
                                      alt=""
                                      className="h-8 w-8 rounded-full"
                                    />
                                  </div>
                                  <div className="ml-4">
                                    <div className="font-medium text-gray-900">John Doe</div>
                                  </div>
                                </div>
                              </td>
                              <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">john@example.com</td>
                              <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">Developer</td>
                              <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
                                <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">
                                  Active
                                </span>
                              </td>
                              <td className="relative whitespace-nowrap py-4 pl-3 pr-4 text-right text-sm font-medium sm:pr-6">
                                <button className="text-blue-600 hover:text-blue-900">Edit</button>
                              </td>
                            </tr>
                          </tbody>
                        </table>
                      </div>
                      <div className="mt-4">
                        <button
                          type="button"
                          className="inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                        >
                          <Plus className="mr-2 h-4 w-4" />
                          Add Team Member
                        </button>
                      </div>
                    </div>
                  </div>
                  
                  <div className="pt-6 border-t border-gray-200">
                    <h3 className="text-base font-medium text-gray-900">Team Permissions</h3>
                    <div className="mt-4 space-y-4">
                      <div className="flex items-start">
                        <div className="flex items-center h-5">
                          <input
                            id="perm-client-view"
                            name="perm-client-view"
                            type="checkbox"
                            checked={true}
                            className="focus:ring-blue-500 h-4 w-4 text-blue-600 border-gray-300 rounded"
                          />
                        </div>
                        <div className="ml-3 text-sm">
                          <label htmlFor="perm-client-view" className="font-medium text-gray-700">View client information</label>
                          <p className="text-gray-500">Allow team members to view client details and contact information.</p>
                        </div>
                      </div>
                      
                      <div className="flex items-start">
                        <div className="flex items-center h-5">
                          <input
                            id="perm-project-edit"
                            name="perm-project-edit"
                            type="checkbox"
                            checked={true}
                            className="focus:ring-blue-500 h-4 w-4 text-blue-600 border-gray-300 rounded"
                          />
                        </div>
                        <div className="ml-3 text-sm">
                          <label htmlFor="perm-project-edit" className="font-medium text-gray-700">Edit project details</label>
                          <p className="text-gray-500">Allow team members to edit project information and timelines.</p>
                        </div>
                      </div>
                      
                      <div className="flex items-start">
                        <div className="flex items-center h-5">
                          <input
                            id="perm-billing-view"
                            name="perm-billing-view"
                            type="checkbox"
                            checked={false}
                            className="focus:ring-blue-500 h-4 w-4 text-blue-600 border-gray-300 rounded"
                          />
                        </div>
                        <div className="ml-3 text-sm">
                          <label htmlFor="perm-billing-view" className="font-medium text-gray-700">View billing information</label>
                          <p className="text-gray-500">Allow team members to view invoices and payment details.</p>
                        </div>
                      </div>
                      
                      <div className="flex items-start">
                        <div className="flex items-center h-5">
                          <input
                            id="perm-team-manage"
                            name="perm-team-manage"
                            type="checkbox"
                            checked={false}
                            className="focus:ring-blue-500 h-4 w-4 text-blue-600 border-gray-300 rounded"
                          />
                        </div>
                        <div className="ml-3 text-sm">
                          <label htmlFor="perm-team-manage" className="font-medium text-gray-700">Manage team members</label>
                          <p className="text-gray-500">Allow team members to add, edit, or remove other team members.</p>
                        </div>
                      </div>
                    </div>
                  </div>
                  
                  <div className="flex justify-end">
                    <button
                      type="button"
                      className="inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                    >
                      <Save className="mr-2 h-4 w-4" />
                      Save Changes
                    </button>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Settings;