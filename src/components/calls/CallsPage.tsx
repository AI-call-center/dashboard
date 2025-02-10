import { motion, AnimatePresence } from 'framer-motion';
import { useState } from 'react';
import {
  MagnifyingGlassIcon,
  XMarkIcon,
  ChevronDownIcon,
  ChevronUpIcon,
  QuestionMarkCircleIcon,
  AdjustmentsHorizontalIcon,
  ArrowDownTrayIcon,
  Cog6ToothIcon,
  PhoneArrowUpRightIcon,
  PhoneArrowDownLeftIcon,
} from '@heroicons/react/24/outline';
import CallsTable from './CallsTable';
import FilterPanel from './FilterPanel';

interface Call {
  id: string;
  phoneNumber: string;
  status: 'triggered' | 'completed' | 'failed';
  type: 'outbound' | 'inbound';
  duration: number;
  agent: string;
  campaign: string;
  date: string;
  creditsUsed: number;
}

const CallsPage = () => {
  const [showFilters, setShowFilters] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');
  const [activeFilters, setActiveFilters] = useState({
    statuses: [],
    callType: '',
    campaign: '',
    agent: '',
    phoneNumber: '',
    fromDate: '',
    toDate: '',
    minDuration: '',
    maxDuration: '',
  });
  const [currentPage, setCurrentPage] = useState(1);
  const [rowsPerPage, setRowsPerPage] = useState(10);

  // Mock data - replace with actual data fetching
  const calls: Call[] = [
    {
      id: '1',
      phoneNumber: '+1 (555) 123-4567',
      status: 'completed',
      type: 'outbound',
      duration: 180,
      agent: 'Sarah Wilson',
      campaign: 'Summer Outreach',
      date: '2025-02-10T10:30:00',
      creditsUsed: 2,
    },
    {
      id: '2',
      phoneNumber: '+1 (555) 987-6543',
      status: 'triggered',
      type: 'outbound',
      duration: 0,
      agent: 'John Doe',
      campaign: 'Winter Campaign',
      date: '2025-02-10T10:45:00',
      creditsUsed: 0,
    },
    {
      id: '3',
      phoneNumber: '+1 (555) 456-7890',
      status: 'failed',
      type: 'outbound',
      duration: 15,
      agent: 'Emma Thompson',
      campaign: 'Spring Sales',
      date: '2025-02-10T11:00:00',
      creditsUsed: 1,
    },
    {
      id: '4',
      phoneNumber: '+1 (555) 234-5678',
      status: 'completed',
      type: 'inbound',
      duration: 360,
      agent: 'Sarah Wilson',
      campaign: 'Summer Outreach',
      date: '2025-02-10T11:15:00',
      creditsUsed: 3,
    },
    {
      id: '5',
      phoneNumber: '+1 (555) 345-6789',
      status: 'completed',
      type: 'outbound',
      duration: 240,
      agent: 'John Doe',
      campaign: 'Winter Campaign',
      date: '2025-02-10T11:30:00',
      creditsUsed: 2,
    },
    {
      id: '6',
      phoneNumber: '+1 (555) 567-8901',
      status: 'triggered',
      type: 'outbound',
      duration: 0,
      agent: 'Emma Thompson',
      campaign: 'Spring Sales',
      date: '2025-02-10T11:45:00',
      creditsUsed: 0,
    },
    {
      id: '7',
      phoneNumber: '+1 (555) 678-9012',
      status: 'failed',
      type: 'outbound',
      duration: 30,
      agent: 'Sarah Wilson',
      campaign: 'Summer Outreach',
      date: '2025-02-10T12:00:00',
      creditsUsed: 1,
    },
    {
      id: '8',
      phoneNumber: '+1 (555) 789-0123',
      status: 'completed',
      type: 'inbound',
      duration: 420,
      agent: 'John Doe',
      campaign: 'Winter Campaign',
      date: '2025-02-10T12:15:00',
      creditsUsed: 4,
    },
    {
      id: '9',
      phoneNumber: '+1 (555) 890-1234',
      status: 'completed',
      type: 'outbound',
      duration: 300,
      agent: 'Emma Thompson',
      campaign: 'Spring Sales',
      date: '2025-02-10T12:30:00',
      creditsUsed: 3,
    },
    {
      id: '10',
      phoneNumber: '+1 (555) 901-2345',
      status: 'triggered',
      type: 'outbound',
      duration: 0,
      agent: 'Sarah Wilson',
      campaign: 'Summer Outreach',
      date: '2025-02-10T12:45:00',
      creditsUsed: 0,
    },
  ];

  const handleFilterChange = (filters: typeof activeFilters) => {
    setActiveFilters(filters);
    setCurrentPage(1);
  };

  const handleRemoveFilter = (key: keyof typeof activeFilters) => {
    setActiveFilters((prev) => ({
      ...prev,
      [key]: Array.isArray(prev[key]) ? [] : '',
    }));
  };

  const toggleFilters = () => {
    setShowFilters(!showFilters);
  };

  return (
    <div className="min-h-screen p-6 space-y-6">
      {/* Header Section */}
      <div className="flex items-center justify-between">
        <div className="space-y-1">
          <div className="flex items-center gap-2">
            <h1 className="text-3xl font-bold bg-gradient-to-r from-blue-500 to-purple-500 bg-clip-text text-transparent">
              Calls
            </h1>
            <motion.button
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.95 }}
              className="p-1 text-gray-400 hover:text-gray-300"
            >
              <QuestionMarkCircleIcon className="w-5 h-5" />
            </motion.button>
          </div>
          <p className="text-gray-400">
            Manage and analyze all your call records in one place
          </p>
        </div>
        <div className="flex items-center gap-4">
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="flex items-center gap-2 px-4 py-2 text-sm font-medium text-gray-300 bg-gray-800 rounded-lg hover:bg-gray-700"
          >
            <Cog6ToothIcon className="w-5 h-5" />
            Columns
          </motion.button>
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="flex items-center gap-2 px-4 py-2 text-sm font-medium text-gray-300 bg-gray-800 rounded-lg hover:bg-gray-700"
          >
            <ArrowDownTrayIcon className="w-5 h-5" />
            Export
          </motion.button>
        </div>
      </div>

      {/* Search and Filter Toggle */}
      <div className="flex items-center gap-4">
        <div className="relative flex-1">
          <input
            type="text"
            placeholder="Search by phone number, agent, or campaign..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full px-4 py-2 pl-10 text-gray-300 bg-gray-800 border border-gray-700 rounded-lg focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
          />
          <MagnifyingGlassIcon className="absolute w-5 h-5 text-gray-400 left-3 top-2.5" />
          {searchQuery && (
            <button
              onClick={() => setSearchQuery('')}
              className="absolute right-3 top-2.5"
            >
              <XMarkIcon className="w-5 h-5 text-gray-400 hover:text-gray-300" />
            </button>
          )}
        </div>
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={toggleFilters}
          className="flex items-center gap-2 px-4 py-2 text-sm font-medium text-gray-300 bg-gray-800 rounded-lg hover:bg-gray-700"
        >
          <AdjustmentsHorizontalIcon className="w-5 h-5" />
          Filters
          {showFilters ? (
            <ChevronUpIcon className="w-4 h-4" />
          ) : (
            <ChevronDownIcon className="w-4 h-4" />
          )}
        </motion.button>
      </div>

      {/* Filter Panel */}
      <AnimatePresence>
        {showFilters && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="overflow-hidden"
          >
            <FilterPanel
              filters={activeFilters}
              onFilterChange={handleFilterChange}
              onRemoveFilter={handleRemoveFilter}
            />
          </motion.div>
        )}
      </AnimatePresence>

      {/* Active Filters */}
      {Object.entries(activeFilters).some(
        ([_, value]) => value && (Array.isArray(value) ? value.length > 0 : true)
      ) && (
        <div className="flex flex-wrap items-center gap-2">
          {Object.entries(activeFilters).map(
            ([key, value]) =>
              value &&
              (Array.isArray(value) ? value.length > 0 : true) && (
                <motion.div
                  key={key}
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.8 }}
                  className="flex items-center gap-2 px-3 py-1 text-sm text-gray-300 bg-gray-800 rounded-full"
                >
                  <span className="capitalize">
                    {key}: {Array.isArray(value) ? value.join(', ') : value}
                  </span>
                  <button
                    onClick={() => handleRemoveFilter(key as keyof typeof activeFilters)}
                    className="p-0.5 hover:text-gray-400"
                  >
                    <XMarkIcon className="w-4 h-4" />
                  </button>
                </motion.div>
              )
          )}
        </div>
      )}

      {/* Calls Table */}
      <CallsTable
        calls={calls}
        currentPage={currentPage}
        rowsPerPage={rowsPerPage}
        onPageChange={setCurrentPage}
        onRowsPerPageChange={setRowsPerPage}
      />
    </div>
  );
};

export default CallsPage;
