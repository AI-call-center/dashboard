import { motion } from 'framer-motion';
import { useState } from 'react';
import TemplateModal from './TemplateModal';
import {
  PlayIcon,
  PauseIcon,
  PhoneIcon,
  ClockIcon,
  CheckCircleIcon,
  XCircleIcon,
  DocumentTextIcon,
  CloudArrowUpIcon,
  PlusIcon,
  QuestionMarkCircleIcon,
} from '@heroicons/react/24/outline';
import MetricCard from './MetricCard';
import LeadsTable from './LeadsTable';

interface CampaignDetailPageProps {
  campaignId: string;
}

const CampaignDetailPage = ({}: CampaignDetailPageProps) => {
  const [isEditing, setIsEditing] = useState(false);
  const [campaign, setCampaign] = useState({
    name: 'Summer Outreach Campaign',
    status: 'running',
    type: 'outbound',
    firstMessage: 'Hi, {customer_name}! This is {agent_name} from {company_name}.',
    timezone: 'UTC+4',
    weekdays: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'],
    timeRange: {
      from: '09:00',
      to: '17:00',
    },
    agent: 'John Doe',
    phoneNumber: '+1 (555) 123-4567',
    maxRetries: 3,
    retryInterval: {
      value: 30,
      unit: 'minutes',
    },
    markCompleteConsent: true,
    metrics: {
      pendingCalls: 450,
      triggeredCalls: 850,
      completedCalls: 720,
      failedCalls: 130,
    },
  });

  const [, setShowTooltip] = useState('');
  const [showTemplateModal, setShowTemplateModal] = useState(false);

  const statusColors = {
    running: 'text-green-500 bg-green-500/20',
    paused: 'text-yellow-500 bg-yellow-500/20',
    completed: 'text-blue-500 bg-blue-500/20',
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-dashboard-dark to-black p-8">
      {/* Header Section */}
      <div className="flex items-center justify-between mb-8">
        <div className="space-y-2">
          <h1 className="text-3xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-dashboard-accent to-blue-500">
            {campaign.name}
          </h1>
          <div className="flex items-center space-x-4">
            <span
              className={`px-3 py-1 rounded-full text-sm font-medium ${
                statusColors[campaign.status as keyof typeof statusColors]
              }`}
            >
              {campaign.status.charAt(0).toUpperCase() + campaign.status.slice(1)}
            </span>
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="text-dashboard-accent hover:text-dashboard-accent/80 transition-colors"
            >
              Browse Calls
            </motion.button>
          </div>
        </div>
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          className={`px-4 py-2 rounded-lg text-white font-medium inline-flex items-center space-x-2 ${
            campaign.status === 'running'
              ? 'bg-yellow-500 hover:bg-yellow-600'
              : 'bg-green-500 hover:bg-green-600'
          }`}
        >
          {campaign.status === 'running' ? (
            <>
              <PauseIcon className="w-5 h-5" />
              <span>Pause Campaign</span>
            </>
          ) : (
            <>
              <PlayIcon className="w-5 h-5" />
              <span>Start Campaign</span>
            </>
          )}
        </motion.button>
      </div>

      {/* Metrics Overview */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <MetricCard
          title="Pending Calls"
          value={campaign.metrics.pendingCalls}
          icon={ClockIcon}
          color="blue"
        />
        <MetricCard
          title="Triggered Calls"
          value={campaign.metrics.triggeredCalls}
          icon={PhoneIcon}
          color="purple"
        />
        <MetricCard
          title="Completed Calls"
          value={campaign.metrics.completedCalls}
          icon={CheckCircleIcon}
          color="green"
        />
        <MetricCard
          title="Failed Calls"
          value={campaign.metrics.failedCalls}
          icon={XCircleIcon}
          color="red"
        />
      </div>

      {/* Configuration Sections */}
      <div className="space-y-6 mb-8">
        {/* Campaign Details */}
        <motion.div
          initial={false}
          animate={{ height: 'auto' }}
          className="bg-dashboard-surface border border-gray-700 rounded-lg p-6"
        >
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <h2 className="text-xl font-medium text-white">Campaign Details</h2>
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => setIsEditing(!isEditing)}
                className="text-dashboard-accent hover:text-dashboard-accent/80"
              >
                {isEditing ? 'Save' : 'Edit'}
              </motion.button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <label className="block text-sm font-medium text-gray-400">
                  Campaign Name
                </label>
                <input
                  type="text"
                  value={campaign.name}
                  disabled={!isEditing}
                  className="w-full px-4 py-2 bg-dashboard-surface border border-gray-700 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-dashboard-accent disabled:opacity-50"
                />
              </div>

              <div className="space-y-2">
                <label className="block text-sm font-medium text-gray-400">
                  Campaign Type
                </label>
                <select
                  value={campaign.type}
                  disabled={!isEditing}
                  className="w-full px-4 py-2 bg-dashboard-surface border border-gray-700 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-dashboard-accent disabled:opacity-50"
                >
                  <option value="outbound">Outbound</option>
                  <option value="inbound">Inbound</option>
                </select>
              </div>
            </div>
          </div>
        </motion.div>

        {/* First Message */}
        <motion.div className="bg-dashboard-surface border border-gray-700 rounded-lg p-6">
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <h2 className="text-xl font-medium text-white">First Message</h2>
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => setShowTemplateModal(true)}
                className="px-4 py-2 bg-dashboard-accent/20 text-dashboard-accent rounded-lg inline-flex items-center space-x-2"
              >
                <DocumentTextIcon className="w-5 h-5" />
                <span>Browse Templates</span>
              </motion.button>

              <TemplateModal
                isOpen={showTemplateModal}
                onClose={() => setShowTemplateModal(false)}
                onSelect={(template) => {
                  setCampaign((prev) => ({
                    ...prev,
                    firstMessage: template,
                  }));
                }}
              />
            </div>

            <textarea
              value={campaign.firstMessage}
              disabled={!isEditing}
              rows={4}
              className="w-full px-4 py-2 bg-dashboard-surface border border-gray-700 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-dashboard-accent disabled:opacity-50"
            />
          </div>
        </motion.div>

        {/* Timezone and Scheduling */}
        <motion.div className="bg-dashboard-surface border border-gray-700 rounded-lg p-6">
          <div className="space-y-6">
            <h2 className="text-xl font-medium text-white">
              Timezone and Scheduling
            </h2>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              <div className="space-y-2">
                <label className="block text-sm font-medium text-gray-400">
                  Timezone
                </label>
                <select
                  value={campaign.timezone}
                  disabled={!isEditing}
                  className="w-full px-4 py-2 bg-dashboard-surface border border-gray-700 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-dashboard-accent disabled:opacity-50"
                >
                  <option value="UTC+4">UTC+4</option>
                  <option value="UTC+3">UTC+3</option>
                  <option value="UTC+5">UTC+5</option>
                </select>
              </div>

              <div className="space-y-2">
                <label className="block text-sm font-medium text-gray-400">
                  From Time
                </label>
                <input
                  type="time"
                  value={campaign.timeRange.from}
                  disabled={!isEditing}
                  className="w-full px-4 py-2 bg-dashboard-surface border border-gray-700 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-dashboard-accent disabled:opacity-50"
                />
              </div>

              <div className="space-y-2">
                <label className="block text-sm font-medium text-gray-400">
                  To Time
                </label>
                <input
                  type="time"
                  value={campaign.timeRange.to}
                  disabled={!isEditing}
                  className="w-full px-4 py-2 bg-dashboard-surface border border-gray-700 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-dashboard-accent disabled:opacity-50"
                />
              </div>
            </div>

            <div className="space-y-2">
              <label className="block text-sm font-medium text-gray-400">
                Active Days
              </label>
              <div className="flex flex-wrap gap-2">
                {['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'].map(
                  (day) => (
                    <motion.button
                      key={day}
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      disabled={!isEditing}
                      className={`px-3 py-1.5 rounded-lg text-sm font-medium ${
                        campaign.weekdays.includes(day)
                          ? 'bg-dashboard-accent text-white'
                          : 'bg-gray-800 text-gray-400'
                      } disabled:opacity-50`}
                    >
                      {day.slice(0, 3)}
                    </motion.button>
                  )
                )}
              </div>
            </div>
          </div>
        </motion.div>

        {/* Agent and Phone Number */}
        <motion.div className="bg-dashboard-surface border border-gray-700 rounded-lg p-6">
          <div className="space-y-6">
            <h2 className="text-xl font-medium text-white">
              Agent and Phone Number
            </h2>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <label className="block text-sm font-medium text-gray-400">
                  Agent
                </label>
                <select
                  value={campaign.agent}
                  disabled={!isEditing}
                  className="w-full px-4 py-2 bg-dashboard-surface border border-gray-700 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-dashboard-accent disabled:opacity-50"
                >
                  <option value="John Doe">John Doe</option>
                  <option value="Jane Smith">Jane Smith</option>
                </select>
              </div>

              <div className="space-y-2">
                <label className="block text-sm font-medium text-gray-400">
                  Phone Number
                </label>
                <select
                  value={campaign.phoneNumber}
                  disabled={!isEditing}
                  className="w-full px-4 py-2 bg-dashboard-surface border border-gray-700 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-dashboard-accent disabled:opacity-50"
                >
                  <option value="+1 (555) 123-4567">+1 (555) 123-4567</option>
                  <option value="+1 (555) 987-6543">+1 (555) 987-6543</option>
                </select>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Retry Settings */}
        <motion.div className="bg-dashboard-surface border border-gray-700 rounded-lg p-6">
          <div className="space-y-6">
            <h2 className="text-xl font-medium text-white">Retry Settings</h2>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <label className="block text-sm font-medium text-gray-400">
                  Max Retries
                </label>
                <input
                  type="number"
                  value={campaign.maxRetries}
                  disabled={!isEditing}
                  min={0}
                  max={10}
                  className="w-full px-4 py-2 bg-dashboard-surface border border-gray-700 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-dashboard-accent disabled:opacity-50"
                />
              </div>

              <div className="space-y-2">
                <label className="block text-sm font-medium text-gray-400">
                  Retry Interval
                </label>
                <div className="flex space-x-2">
                  <input
                    type="number"
                    value={campaign.retryInterval.value}
                    disabled={!isEditing}
                    min={1}
                    className="flex-1 px-4 py-2 bg-dashboard-surface border border-gray-700 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-dashboard-accent disabled:opacity-50"
                  />
                  <select
                    value={campaign.retryInterval.unit}
                    disabled={!isEditing}
                    className="w-32 px-4 py-2 bg-dashboard-surface border border-gray-700 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-dashboard-accent disabled:opacity-50"
                  >
                    <option value="minutes">Minutes</option>
                    <option value="hours">Hours</option>
                  </select>
                </div>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Consent Settings */}
        <motion.div className="bg-dashboard-surface border border-gray-700 rounded-lg p-6">
          <div className="space-y-4">
            <h2 className="text-xl font-medium text-white">Consent Settings</h2>

            <div className="flex items-start space-x-3">
              <div className="flex items-center h-5">
                <input
                  type="checkbox"
                  checked={campaign.markCompleteConsent}
                  disabled={!isEditing}
                  className="w-4 h-4 rounded border-gray-700 bg-dashboard-surface text-dashboard-accent focus:ring-dashboard-accent disabled:opacity-50"
                />
              </div>
              <div className="flex-1">
                <label className="block text-sm font-medium text-white">
                  Mark Complete on No Leads
                </label>
                <p className="text-sm text-gray-400">
                  Automatically mark the campaign as complete when there are no more
                  leads to call
                </p>
              </div>
              <motion.button
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                onMouseEnter={() => setShowTooltip('consent')}
                onMouseLeave={() => setShowTooltip('')}
                className="text-gray-400 hover:text-white"
              >
                <QuestionMarkCircleIcon className="w-5 h-5" />
              </motion.button>
            </div>
          </div>
        </motion.div>
      </div>

      {/* Leads Management */}
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <h2 className="text-xl font-medium text-white">Leads Management</h2>
          <div className="flex items-center space-x-3">
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="px-4 py-2 bg-dashboard-accent rounded-lg text-white font-medium inline-flex items-center space-x-2"
            >
              <PlusIcon className="w-5 h-5" />
              <span>New Lead</span>
            </motion.button>
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="px-4 py-2 bg-dashboard-surface border border-gray-700 rounded-lg text-white font-medium inline-flex items-center space-x-2"
            >
              <CloudArrowUpIcon className="w-5 h-5" />
              <span>Upload CSV</span>
            </motion.button>
          </div>
        </div>

        <LeadsTable />
      </div>
    </div>
  );
};

export default CampaignDetailPage;
