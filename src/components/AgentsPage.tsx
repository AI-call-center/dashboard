import { motion } from 'framer-motion';
import { useState } from 'react';
import CreateAgentForm from './CreateAgentForm';
import {
  UserCircleIcon,
  BoltIcon,
  ClockIcon,
  ChartBarIcon,
  PhoneIcon,
  PlusIcon,
} from '@heroicons/react/24/outline';

const agents = [
  {
    id: 1,
    name: 'Sales Assistant',
    status: 'Active',
    calls: 245,
    avgDuration: '3:45',
    successRate: '92%',
    lastActive: '2 mins ago',
  },
  {
    id: 2,
    name: 'Support Agent',
    status: 'Active',
    calls: 189,
    avgDuration: '4:12',
    successRate: '88%',
    lastActive: '5 mins ago',
  },
  {
    id: 3,
    name: 'Appointment Scheduler',
    status: 'Inactive',
    calls: 156,
    avgDuration: '2:30',
    successRate: '95%',
    lastActive: '1 hour ago',
  },
];

const AgentsPage = () => {
  const [showCreateForm, setShowCreateForm] = useState(false);

  if (showCreateForm) {
    return <CreateAgentForm onClose={() => setShowCreateForm(false)} />;
  }
  return (
    <div className="p-4 sm:p-6 lg:p-8 space-y-4 sm:space-y-6 lg:space-y-8">
      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-2xl sm:text-3xl font-bold text-white">AI Agents</h1>
          <p className="text-gray-400 mt-1">Manage and monitor your AI agents</p>
        </div>
        <motion.button
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          onClick={() => setShowCreateForm(true)}
          className="w-full sm:w-auto px-4 py-2 bg-dashboard-accent rounded-lg text-white font-medium flex items-center justify-center sm:justify-start space-x-2"
        >
          <PlusIcon className="w-5 h-5" />
          <span>Create New Agent</span>
        </motion.button>
      </div>

      {/* Stats Overview */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
        {[
          { label: 'Total Agents', value: '3', icon: UserCircleIcon },
          { label: 'Active Now', value: '2', icon: BoltIcon },
          { label: 'Total Calls', value: '590', icon: PhoneIcon },
          { label: 'Avg. Success Rate', value: '91%', icon: ChartBarIcon },
        ].map((stat) => (
          <motion.div
            key={stat.label}
            whileHover={{ scale: 1.02 }}
            className="p-4 sm:p-6 rounded-xl bg-dashboard-surface border border-gray-800"
          >
            <div className="flex items-center justify-between">
              <div className="text-gray-400">{stat.label}</div>
              <stat.icon className="w-5 h-5 text-dashboard-accent" />
            </div>
            <div className="text-2xl font-bold text-white mt-2">{stat.value}</div>
          </motion.div>
        ))}
      </div>

      {/* Agents List */}
      <div className="bg-dashboard-surface border border-gray-800 rounded-xl overflow-hidden">
        <div className="p-4 sm:p-6 border-b border-gray-800">
          <h2 className="text-xl font-semibold text-white">Active Agents</h2>
        </div>
        <div className="divide-y divide-gray-800">
          {agents.map((agent) => (
            <motion.div
              key={agent.id}
              initial={false}
              whileHover={{ backgroundColor: 'rgba(255, 255, 255, 0.02)' }}
              className="p-4 sm:p-6 flex flex-col sm:flex-row sm:items-center justify-between space-y-4 sm:space-y-0 gap-4"
            >
              <div className="flex items-center space-x-4">
                <div className="w-10 h-10 rounded-full bg-dashboard-accent/10 flex items-center justify-center">
                  <UserCircleIcon className="w-6 h-6 text-dashboard-accent" />
                </div>
                <div>
                  <h3 className="text-white font-medium">{agent.name}</h3>
                  <div className="flex items-center space-x-2 mt-1">
                    <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                      agent.status === 'Active' ? 'bg-green-400/10 text-green-400' : 'bg-gray-400/10 text-gray-400'
                    }`}>
                      {agent.status}
                    </span>
                    <span className="text-sm text-gray-400 flex items-center">
                      <ClockIcon className="w-4 h-4 mr-1" />
                      {agent.lastActive}
                    </span>
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-8">
                <div>
                  <div className="text-sm text-gray-400">Total Calls</div>
                  <div className="text-white font-medium">{agent.calls}</div>
                </div>
                <div>
                  <div className="text-sm text-gray-400">Avg Duration</div>
                  <div className="text-white font-medium">{agent.avgDuration}</div>
                </div>
                <div>
                  <div className="text-sm text-gray-400">Success Rate</div>
                  <div className="text-white font-medium">{agent.successRate}</div>
                </div>
                <div className="flex items-center space-x-2">
                  <motion.button
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    className="px-3 py-1.5 bg-dashboard-accent/10 text-dashboard-accent rounded-lg text-sm"
                  >
                    View Details
                  </motion.button>
                  <motion.button
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    className="px-3 py-1.5 bg-gray-800 text-gray-300 rounded-lg text-sm"
                  >
                    Settings
                  </motion.button>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default AgentsPage;
