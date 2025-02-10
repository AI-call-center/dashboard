import { motion } from 'framer-motion';
import { AdjustmentsVerticalIcon } from '@heroicons/react/24/outline';
import { useState } from 'react';
import AdvancedFiltersModal from './AdvancedFiltersModal';

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
  const [showAdvancedFilters, setShowAdvancedFilters] = useState(false);

  const handleInputChange = (
    key: keyof typeof filters,
    value: string | string[]
  ) => {
    onFilterChange({
      ...filters,
      [key]: value,
    });
  };

  const handleAdvancedFilterChange = (advancedFilters: {
    phoneNumber: string;
    fromDate: string;
    toDate: string;
    minDuration: string;
    maxDuration: string;
  }) => {
    onFilterChange({
      ...filters,
      ...advancedFilters,
    });
  };

  const statusOptions = ['triggered', 'completed', 'failed'];
  const callTypeOptions = ['outbound', 'inbound'];
  const campaignOptions = ['Summer Outreach', 'Winter Campaign', 'Spring Sales'];
  const agentOptions = ['Sarah Wilson', 'John Doe', 'Emma Thompson'];

  return (
    <>
      <div className="p-6 space-y-6 bg-gray-800/50 rounded-lg border border-gray-700">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
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
            onClick={() => setShowAdvancedFilters(true)}
            className="flex items-center gap-2 px-4 py-2 text-sm font-medium text-gray-300 bg-gray-700 rounded-lg hover:bg-gray-600"
          >
            <AdjustmentsVerticalIcon className="w-5 h-5" />
            Advanced Filters
          </motion.button>
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="px-6 py-2 text-sm font-medium text-white bg-blue-600 rounded-lg hover:bg-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 focus:ring-offset-gray-900"
          >
            Apply Filters
          </motion.button>
        </div>
      </div>

      <AdvancedFiltersModal
        isOpen={showAdvancedFilters}
        onClose={() => setShowAdvancedFilters(false)}
        filters={{
          phoneNumber: filters.phoneNumber,
          fromDate: filters.fromDate,
          toDate: filters.toDate,
          minDuration: filters.minDuration,
          maxDuration: filters.maxDuration,
        }}
        onFilterChange={handleAdvancedFilterChange}
      />
    </>
  );
};

export default FilterPanel;
