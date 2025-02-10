import { motion } from 'framer-motion';
import { XMarkIcon } from '@heroicons/react/24/outline';

interface FilterPanelProps {
  isOpen: boolean;
  onClose: () => void;
  onApplyFilters: (filters: FilterState) => void;
}

interface FilterState {
  status: string[];
  dateRange: string;
  performance: string;
  leads: string;
}

const FilterPanel = ({ isOpen, onClose, onApplyFilters }: FilterPanelProps) => {
  const statusOptions = ['Running', 'Paused', 'Completed'];
  const dateRangeOptions = ['Last 7 days', 'Last 30 days', 'Last 90 days', 'Custom'];
  const performanceOptions = ['All', '> 90%', '> 75%', '> 50%'];
  const leadsOptions = ['All', '> 1000', '> 500', '> 100'];

  return (
    <motion.div
      initial={{ opacity: 0, x: '100%' }}
      animate={{ opacity: isOpen ? 1 : 0, x: isOpen ? 0 : '100%' }}
      transition={{ type: 'spring', damping: 20 }}
      className={`fixed right-0 top-0 h-screen w-80 bg-dashboard-surface border-l border-gray-700 shadow-xl p-6 z-50 ${
        isOpen ? 'block' : 'hidden'
      }`}
    >
      <div className="flex justify-between items-center mb-6">
        <h3 className="text-lg font-medium text-white">Filters</h3>
        <motion.button
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
          onClick={onClose}
          className="p-1 rounded-lg hover:bg-gray-700"
        >
          <XMarkIcon className="w-5 h-5 text-gray-400" />
        </motion.button>
      </div>

      <div className="space-y-6">
        {/* Status Filter */}
        <div>
          <label className="block text-sm font-medium text-gray-400 mb-2">
            Status
          </label>
          <div className="space-y-2">
            {statusOptions.map((status) => (
              <motion.div
                key={status}
                whileHover={{ x: 4 }}
                className="flex items-center space-x-2"
              >
                <input
                  type="checkbox"
                  id={status}
                  className="rounded border-gray-700 bg-dashboard-surface text-dashboard-accent focus:ring-dashboard-accent"
                />
                <label htmlFor={status} className="text-white text-sm">
                  {status}
                </label>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Date Range Filter */}
        <div>
          <label className="block text-sm font-medium text-gray-400 mb-2">
            Date Range
          </label>
          <select className="w-full px-3 py-2 bg-dashboard-surface border border-gray-700 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-dashboard-accent">
            {dateRangeOptions.map((option) => (
              <option key={option} value={option}>
                {option}
              </option>
            ))}
          </select>
        </div>

        {/* Performance Filter */}
        <div>
          <label className="block text-sm font-medium text-gray-400 mb-2">
            Performance
          </label>
          <select className="w-full px-3 py-2 bg-dashboard-surface border border-gray-700 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-dashboard-accent">
            {performanceOptions.map((option) => (
              <option key={option} value={option}>
                {option}
              </option>
            ))}
          </select>
        </div>

        {/* Total Leads Filter */}
        <div>
          <label className="block text-sm font-medium text-gray-400 mb-2">
            Total Leads
          </label>
          <select className="w-full px-3 py-2 bg-dashboard-surface border border-gray-700 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-dashboard-accent">
            {leadsOptions.map((option) => (
              <option key={option} value={option}>
                {option}
              </option>
            ))}
          </select>
        </div>

        {/* Custom Date Range (shown when 'Custom' is selected) */}
        <div className="space-y-3">
          <div>
            <label className="block text-sm font-medium text-gray-400 mb-2">
              Start Date
            </label>
            <input
              type="date"
              className="w-full px-3 py-2 bg-dashboard-surface border border-gray-700 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-dashboard-accent"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-400 mb-2">
              End Date
            </label>
            <input
              type="date"
              className="w-full px-3 py-2 bg-dashboard-surface border border-gray-700 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-dashboard-accent"
            />
          </div>
        </div>

        {/* Apply Filters Button */}
        <motion.button
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          onClick={() => {
            // Implement filter application logic
            onApplyFilters({
              status: [],
              dateRange: '',
              performance: '',
              leads: '',
            });
            onClose();
          }}
          className="w-full px-4 py-2 bg-dashboard-accent rounded-lg text-white font-medium shadow-lg shadow-dashboard-accent/20 hover:shadow-dashboard-accent/30 transition-shadow"
        >
          Apply Filters
        </motion.button>

        {/* Clear Filters Button */}
        <motion.button
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          onClick={() => {
            // Implement clear filters logic
            onApplyFilters({
              status: [],
              dateRange: '',
              performance: '',
              leads: '',
            });
          }}
          className="w-full px-4 py-2 bg-transparent border border-gray-700 rounded-lg text-gray-400 font-medium hover:border-gray-600 transition-colors"
        >
          Clear Filters
        </motion.button>
      </div>
    </motion.div>
  );
};

export default FilterPanel;
