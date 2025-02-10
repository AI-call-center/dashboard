import { motion } from 'framer-motion';
import { CalendarIcon } from '@heroicons/react/24/outline';

interface FilterPanelProps {
  filters: {
    statuses: string[];
    callType: string;
    campaign: string;
    agent: string;
    phoneNumber: string;
    fromDate: string;
    toDate: string;
    minDuration: string;
    maxDuration: string;
  };
  onFilterChange: (filters: FilterPanelProps['filters']) => void;
  onRemoveFilter: (key: keyof FilterPanelProps['filters']) => void;
}

const FilterPanel = ({
  filters,
  onFilterChange,
  onRemoveFilter,
}: FilterPanelProps) => {
  const handleInputChange = (
    key: keyof typeof filters,
    value: string | string[]
  ) => {
    onFilterChange({
      ...filters,
      [key]: value,
    });
  };

  const statusOptions = ['triggered', 'completed', 'failed'];
  const callTypeOptions = ['outbound', 'inbound'];
  const campaignOptions = ['Summer Outreach', 'Winter Campaign', 'Spring Sales'];
  const agentOptions = ['Sarah Wilson', 'John Doe', 'Emma Thompson'];

  return (
    <div className="p-6 space-y-6 bg-gray-800/50 rounded-lg border border-gray-700">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Primary Filters */}
        <div className="space-y-4">
          <div className="space-y-2">
            <label className="text-sm font-medium text-gray-300">Status</label>
            <select
              multiple
              value={filters.statuses}
              onChange={(e) =>
                handleInputChange(
                  'statuses',
                  Array.from(e.target.selectedOptions, (option) => option.value)
                )
              }
              className="w-full px-3 py-2 text-gray-300 bg-gray-700 border border-gray-600 rounded-lg focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
            >
              {statusOptions.map((status) => (
                <option key={status} value={status} className="capitalize">
                  {status}
                </option>
              ))}
            </select>
          </div>

          <div className="space-y-2">
            <label className="text-sm font-medium text-gray-300">Call Type</label>
            <select
              value={filters.callType}
              onChange={(e) => handleInputChange('callType', e.target.value)}
              className="w-full px-3 py-2 text-gray-300 bg-gray-700 border border-gray-600 rounded-lg focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
            >
              <option value="">All</option>
              {callTypeOptions.map((type) => (
                <option key={type} value={type} className="capitalize">
                  {type}
                </option>
              ))}
            </select>
          </div>

          <div className="space-y-2">
            <label className="text-sm font-medium text-gray-300">Campaign</label>
            <select
              value={filters.campaign}
              onChange={(e) => handleInputChange('campaign', e.target.value)}
              className="w-full px-3 py-2 text-gray-300 bg-gray-700 border border-gray-600 rounded-lg focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
            >
              <option value="">All</option>
              {campaignOptions.map((campaign) => (
                <option key={campaign} value={campaign}>
                  {campaign}
                </option>
              ))}
            </select>
          </div>

          <div className="space-y-2">
            <label className="text-sm font-medium text-gray-300">Agent</label>
            <select
              value={filters.agent}
              onChange={(e) => handleInputChange('agent', e.target.value)}
              className="w-full px-3 py-2 text-gray-300 bg-gray-700 border border-gray-600 rounded-lg focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
            >
              <option value="">All</option>
              {agentOptions.map((agent) => (
                <option key={agent} value={agent}>
                  {agent}
                </option>
              ))}
            </select>
          </div>
        </div>

        {/* Advanced Filters */}
        <div className="space-y-4">
          <div className="space-y-2">
            <label className="text-sm font-medium text-gray-300">
              Phone Number
            </label>
            <input
              type="text"
              value={filters.phoneNumber}
              onChange={(e) => handleInputChange('phoneNumber', e.target.value)}
              placeholder="Enter phone number"
              className="w-full px-3 py-2 text-gray-300 bg-gray-700 border border-gray-600 rounded-lg focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <label className="text-sm font-medium text-gray-300">
                From Date
              </label>
              <div className="relative">
                <input
                  type="date"
                  value={filters.fromDate}
                  onChange={(e) => handleInputChange('fromDate', e.target.value)}
                  className="w-full px-3 py-2 text-gray-300 bg-gray-700 border border-gray-600 rounded-lg focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
                />
                <CalendarIcon className="absolute w-5 h-5 text-gray-400 right-3 top-2.5" />
              </div>
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium text-gray-300">To Date</label>
              <div className="relative">
                <input
                  type="date"
                  value={filters.toDate}
                  onChange={(e) => handleInputChange('toDate', e.target.value)}
                  className="w-full px-3 py-2 text-gray-300 bg-gray-700 border border-gray-600 rounded-lg focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
                />
                <CalendarIcon className="absolute w-5 h-5 text-gray-400 right-3 top-2.5" />
              </div>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <label className="text-sm font-medium text-gray-300">
                Min Duration (s)
              </label>
              <input
                type="number"
                value={filters.minDuration}
                onChange={(e) => handleInputChange('minDuration', e.target.value)}
                placeholder="0"
                min="0"
                className="w-full px-3 py-2 text-gray-300 bg-gray-700 border border-gray-600 rounded-lg focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
              />
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium text-gray-300">
                Max Duration (s)
              </label>
              <input
                type="number"
                value={filters.maxDuration}
                onChange={(e) => handleInputChange('maxDuration', e.target.value)}
                placeholder="3600"
                min="0"
                className="w-full px-3 py-2 text-gray-300 bg-gray-700 border border-gray-600 rounded-lg focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
              />
            </div>
          </div>
        </div>
      </div>

      {/* Action Buttons */}
      <div className="flex items-center justify-end gap-4 pt-4 border-t border-gray-700">
        <button
          onClick={() =>
            onFilterChange({
              statuses: [],
              callType: '',
              campaign: '',
              agent: '',
              phoneNumber: '',
              fromDate: '',
              toDate: '',
              minDuration: '',
              maxDuration: '',
            })
          }
          className="px-4 py-2 text-sm font-medium text-gray-400 hover:text-gray-300"
        >
          Reset Filters
        </button>
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          className="px-6 py-2 text-sm font-medium text-white bg-blue-600 rounded-lg hover:bg-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 focus:ring-offset-gray-900"
        >
          Apply Filters
        </motion.button>
      </div>
    </div>
  );
};

export default FilterPanel;
