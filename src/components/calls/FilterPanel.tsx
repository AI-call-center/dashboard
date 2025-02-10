import { motion } from 'framer-motion';
import {
  AdjustmentsVerticalIcon,
  ChevronDownIcon,
  CheckIcon,
} from '@heroicons/react/24/outline';
import { useState, useRef, useEffect } from 'react';
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
}

const FilterPanel = ({
  filters,
  onFilterChange,

}: FilterPanelProps) => {
  const [showAdvancedFilters, setShowAdvancedFilters] = useState(false);
  const [isStatusOpen, setIsStatusOpen] = useState(false);
  const statusDropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        statusDropdownRef.current &&
        !statusDropdownRef.current.contains(event.target as Node)
      ) {
        setIsStatusOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

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
          <div className="space-y-2 relative">
            <label className="text-sm font-medium text-gray-300">Status</label>
            <div className="relative">
              <button
                type="button"
                onClick={() => setIsStatusOpen(!isStatusOpen)}
                className="w-full px-3 py-2 text-left text-gray-300 bg-gray-700 border border-gray-600 rounded-lg focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 flex items-center justify-between"
              >
                <span className="block truncate">
                  {filters.statuses.length > 0
                    ? `${filters.statuses.length} selected`
                    : 'Select statuses'}
                </span>
                <ChevronDownIcon
                  className={`w-5 h-5 transition-transform ${isStatusOpen ? 'transform rotate-180' : ''}`}
                />
              </button>

              {isStatusOpen && (
                <motion.div
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  className="absolute z-10 w-full mt-1 bg-gray-700 border border-gray-600 rounded-lg shadow-lg"
                  ref={statusDropdownRef}
                >
                  <div className="p-2 space-y-1 max-h-48 overflow-auto">
                    {statusOptions.map((status) => (
                      <label
                        key={status}
                        className="flex items-center px-2 py-1.5 rounded hover:bg-gray-600 cursor-pointer group"
                      >
                        <input
                          type="checkbox"
                          checked={filters.statuses.includes(status)}
                          onChange={(e) => {
                            const newStatuses = e.target.checked
                              ? [...filters.statuses, status]
                              : filters.statuses.filter((s) => s !== status);
                            handleInputChange('statuses', newStatuses);
                          }}
                          className="hidden"
                        />
                        <div
                          className={`w-4 h-4 border rounded mr-2 flex items-center justify-center transition-colors ${filters.statuses.includes(status) ? 'bg-blue-500 border-blue-500' : 'border-gray-500 group-hover:border-gray-400'}`}
                        >
                          {filters.statuses.includes(status) && (
                            <CheckIcon className="w-3 h-3 text-white" />
                          )}
                        </div>
                        <span className="capitalize text-gray-300">{status}</span>
                      </label>
                    ))}
                  </div>
                </motion.div>
              )}
            </div>
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
