import { motion, AnimatePresence } from 'framer-motion';
import { CalendarIcon, XMarkIcon } from '@heroicons/react/24/outline';

interface AdvancedFilters {
  phoneNumber: string;
  fromDate: string;
  toDate: string;
  minDuration: string;
  maxDuration: string;
}

interface AdvancedFiltersModalProps {
  isOpen: boolean;
  onClose: () => void;
  filters: AdvancedFilters;
  onFilterChange: (filters: AdvancedFilters) => void;
}

const AdvancedFiltersModal = ({
  isOpen,
  onClose,
  filters,
  onFilterChange,
}: AdvancedFiltersModalProps) => {
  const handleInputChange = (key: keyof AdvancedFilters, value: string) => {
    onFilterChange({
      ...filters,
      [key]: value,
    });
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 flex items-center justify-center z-50">
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="absolute inset-0 bg-[#0a0c16]/80 backdrop-blur-sm"
            onClick={onClose}
          />

          {/* Modal */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 20 }}
            transition={{ type: "spring", duration: 0.5, bounce: 0.3 }}
            className="relative w-[90%] max-w-3xl p-8 bg-[#1a1f36]/95 backdrop-blur-xl border border-indigo-500/20 rounded-2xl shadow-2xl overflow-hidden"
          >
            {/* Glow effects */}
            <div className="absolute inset-0 bg-gradient-to-br from-indigo-500/20 to-blue-500/10 pointer-events-none" />
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_-20%,rgba(120,119,198,0.1),rgba(0,0,0,0))] pointer-events-none" />

            {/* Header */}
            <div className="flex items-center justify-between mb-6 relative z-10">
              <h2 className="text-2xl font-semibold text-white/90">
                Advanced Filters
              </h2>
              <motion.button
                onClick={onClose}
                whileHover={{ scale: 1.1, rotate: 90 }}
                whileTap={{ scale: 0.9 }}
                transition={{ type: "spring", stiffness: 300, damping: 15 }}
                className="p-2 text-gray-400 hover:text-gray-300 transition-colors rounded-lg hover:bg-gray-700/50"
              >
                <XMarkIcon className="w-6 h-6" />
              </motion.button>
            </div>

            {/* Content */}
            <div className="relative space-y-8 z-10">
              <div className="space-y-2">
                <label className="text-sm font-medium text-gray-200">
                  Phone Number
                </label>
                <input
                  type="text"
                  value={filters.phoneNumber}
                  onChange={(e) =>
                    handleInputChange('phoneNumber', e.target.value)
                  }
                  placeholder="Enter phone number"
                  className="w-full px-4 py-3 text-gray-200 bg-[#151930]/70 border border-indigo-500/30 rounded-lg focus:outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 placeholder-gray-400"
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <label className="text-sm font-medium text-gray-200">
                    From Date
                  </label>
                  <div className="relative">
                    <input
                      type="date"
                      value={filters.fromDate}
                      onChange={(e) =>
                        handleInputChange('fromDate', e.target.value)
                      }
                      className="w-full px-4 py-3 text-gray-200 bg-[#151930]/70 border border-indigo-500/30 rounded-lg focus:outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 placeholder-gray-400"
                    />
                    <CalendarIcon className="absolute w-5 h-5 text-gray-400 right-3 top-2.5" />
                  </div>
                </div>

                <div className="space-y-2">
                  <label className="text-sm font-medium text-gray-200">
                    To Date
                  </label>
                  <div className="relative">
                    <input
                      type="date"
                      value={filters.toDate}
                      onChange={(e) => handleInputChange('toDate', e.target.value)}
                      className="w-full px-4 py-3 text-gray-200 bg-[#151930]/70 border border-indigo-500/30 rounded-lg focus:outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 placeholder-gray-400"
                    />
                    <CalendarIcon className="absolute w-5 h-5 text-gray-400 right-3 top-2.5" />
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <label className="text-sm font-medium text-gray-200">
                    Min Duration (s)
                  </label>
                  <input
                    type="number"
                    value={filters.minDuration}
                    onChange={(e) =>
                      handleInputChange('minDuration', e.target.value)
                    }
                    placeholder="0"
                    min="0"
                    className="w-full px-4 py-3 text-gray-200 bg-[#151930]/70 border border-indigo-500/30 rounded-lg focus:outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 placeholder-gray-400"
                  />
                </div>

                <div className="space-y-2">
                  <label className="text-sm font-medium text-gray-200">
                    Max Duration (s)
                  </label>
                  <input
                    type="number"
                    value={filters.maxDuration}
                    onChange={(e) =>
                      handleInputChange('maxDuration', e.target.value)
                    }
                    placeholder="3600"
                    min="0"
                    className="w-full px-4 py-3 text-gray-200 bg-[#151930]/70 border border-indigo-500/30 rounded-lg focus:outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 placeholder-gray-400"
                  />
                </div>
              </div>
            </div>

            {/* Footer */}
            <div className="flex items-center justify-end gap-4 mt-8 pt-6 border-t border-indigo-500/20 relative z-10">
              <motion.button
                onClick={onClose}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className="px-4 py-2 text-sm font-medium text-gray-400 hover:text-gray-300 hover:bg-gray-700/50 rounded-lg transition-colors"
              >
                Cancel
              </motion.button>
              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                onClick={onClose}
                className="px-6 py-3 text-sm font-medium text-white bg-gradient-to-r from-indigo-600 to-blue-600 rounded-lg hover:from-indigo-500 hover:to-blue-500 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 focus:ring-offset-[#1a1f36] shadow-lg shadow-indigo-500/20"
              >
                Apply Filters
              </motion.button>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
};

export default AdvancedFiltersModal;
