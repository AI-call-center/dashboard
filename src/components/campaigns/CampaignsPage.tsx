import { motion, AnimatePresence } from 'framer-motion';
import { useState } from 'react';
import FilterPanel from './FilterPanel';
import CampaignDetailPage from './CampaignDetailPage';
import {
  MagnifyingGlassIcon,
  FunnelIcon,
  PlusIcon,
  ChevronRightIcon,
  PlayIcon,
  PauseIcon,
  ChartBarIcon,
  PhoneIcon,
} from '@heroicons/react/24/outline';

interface Campaign {
  id: string;
  name: string;
  status: 'running' | 'paused' | 'completed';
  progress: number;
  performance: number;
  totalLeads: number;
  callsMade: number;
  updated: string;
  created: string;
}

const CampaignsPage = () => {
  const [selectedCampaignId, setSelectedCampaignId] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [showFilters, setShowFilters] = useState(false);
  const [activeFilters, setActiveFilters] = useState({
    status: [],
    dateRange: '',
    performance: '',
    leads: '',
  });
  const [currentPage, setCurrentPage] = useState(1);
  const [rowsPerPage, setRowsPerPage] = useState(10);

  // Mock data - replace with actual data fetching
  const campaigns: Campaign[] = [
    {
      id: '1',
      name: 'Summer Outreach',
      status: 'running',
      progress: 75,
      performance: 82,
      totalLeads: 1200,
      callsMade: 850,
      updated: '2025-02-10',
      created: '2025-01-15',
    },
    {
      id: '2',
      name: 'Winter Sales',
      status: 'paused',
      progress: 45,
      performance: 68,
      totalLeads: 800,
      callsMade: 320,
      updated: '2025-02-09',
      created: '2025-01-20',
    },
    {
      id: '3',
      name: 'Product Launch',
      status: 'completed',
      progress: 100,
      performance: 95,
      totalLeads: 2500,
      callsMade: 2100,
      updated: '2025-02-08',
      created: '2025-01-01',
    },
    {
      id: '4',
      name: 'Customer Feedback',
      status: 'running',
      progress: 30,
      performance: 78,
      totalLeads: 450,
      callsMade: 120,
      updated: '2025-02-10',
      created: '2025-02-01',
    },
    {
      id: '5',
      name: 'Market Research',
      status: 'running',
      progress: 60,
      performance: 88,
      totalLeads: 1500,
      callsMade: 900,
      updated: '2025-02-10',
      created: '2025-01-10',
    },
  ];

  // Filter campaigns based on search query and active filters
  const filteredCampaigns = campaigns.filter(campaign => {
    // Search filter
    if (searchQuery && !campaign.name.toLowerCase().includes(searchQuery.toLowerCase())) {
      return false;
    }

    // Status filter
    if (activeFilters.status.length > 0 && !activeFilters.status.includes(campaign.status)) {
      return false;
    }

    // Performance filter
    if (activeFilters.performance) {
      const minPerformance = parseInt(activeFilters.performance.replace(/[^0-9]/g, ''));
      if (campaign.performance <= minPerformance) {
        return false;
      }
    }

    // Leads filter
    if (activeFilters.leads) {
      const minLeads = parseInt(activeFilters.leads.replace(/[^0-9]/g, ''));
      if (campaign.totalLeads <= minLeads) {
        return false;
      }
    }

    return true;
  });

  const runningCampaigns = campaigns.filter(c => c.status === 'running').length;

  if (selectedCampaignId) {
    return <CampaignDetailPage campaignId={selectedCampaignId} />;
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-dashboard-dark to-black p-8">
      {/* Header Section */}
      <div className="mb-8">
        <div className="flex items-center text-gray-400 text-sm mb-2">
          <span className="hover:text-dashboard-accent cursor-pointer transition-colors">
            Campaigns
          </span>
          <ChevronRightIcon className="w-4 h-4 mx-2" />
          <span className="text-white">List</span>
        </div>
        <div className="flex justify-between items-center">
          <h1 className="text-3xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-dashboard-accent to-blue-500">
            Campaigns
          </h1>
          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            className="px-4 py-2 bg-dashboard-accent rounded-lg text-white font-medium inline-flex items-center space-x-2 shadow-lg shadow-dashboard-accent/20 hover:shadow-dashboard-accent/30 transition-shadow"
          >
            <PlusIcon className="w-5 h-5" />
            <span>New Campaign</span>
          </motion.button>
        </div>
      </div>

      {/* Stats Section */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
        <motion.div
          whileHover={{ scale: 1.02 }}
          className="p-6 bg-dashboard-surface rounded-lg border border-gray-700 hover:border-dashboard-accent/50 transition-colors"
        >
          <div className="flex items-center space-x-4">
            <div className="p-3 bg-dashboard-accent/10 rounded-lg">
              <ChartBarIcon className="w-6 h-6 text-dashboard-accent" />
            </div>
            <div>
              <h3 className="text-gray-400 text-sm">Running Campaigns</h3>
              <p className="text-2xl font-bold text-white">{runningCampaigns}</p>
            </div>
          </div>
        </motion.div>

        <motion.div
          whileHover={{ scale: 1.02 }}
          className="p-6 bg-dashboard-surface rounded-lg border border-gray-700 hover:border-dashboard-accent/50 transition-colors"
        >
          <div className="flex items-center space-x-4">
            <div className="p-3 bg-dashboard-accent/10 rounded-lg">
              <PhoneIcon className="w-6 h-6 text-dashboard-accent" />
            </div>
            <div>
              <h3 className="text-gray-400 text-sm">Total Campaigns</h3>
              <p className="text-2xl font-bold text-white">{campaigns.length}</p>
            </div>
          </div>
        </motion.div>
      </div>

      {/* Search and Filters */}
      <div className="mb-6 flex items-center space-x-4">
        <div className="flex-1 relative">
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search campaigns..."
            className="w-full px-4 py-2 bg-dashboard-surface border border-gray-700 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-dashboard-accent pl-10"
          />
          <MagnifyingGlassIcon className="w-5 h-5 text-gray-400 absolute left-3 top-1/2 transform -translate-y-1/2" />
        </div>
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={() => setShowFilters(!showFilters)}
          className={`p-2 rounded-lg ${
            showFilters
              ? 'bg-dashboard-accent text-white'
              : 'bg-dashboard-surface text-gray-400'
          }`}
        >
          <FunnelIcon className="w-5 h-5" />
        </motion.button>

        <AnimatePresence>
          {showFilters && (
            <FilterPanel
              isOpen={showFilters}
              onClose={() => setShowFilters(false)}
              onApplyFilters={(filters) => {
                setActiveFilters(filters);
                // Implement filtering logic here
              }}
            />
          )}
        </AnimatePresence>
      </div>

      {/* Campaigns Table */}
      <div className="bg-dashboard-surface border border-gray-700 rounded-lg overflow-hidden">
        <table className="w-full">
          <thead>
            <tr className="border-b border-gray-700">
              <th className="px-6 py-4 text-left text-sm font-medium text-gray-400">Name</th>
              <th className="px-6 py-4 text-left text-sm font-medium text-gray-400">Status</th>
              <th className="px-6 py-4 text-left text-sm font-medium text-gray-400">Progress</th>
              <th className="px-6 py-4 text-left text-sm font-medium text-gray-400">Performance</th>
              <th className="px-6 py-4 text-left text-sm font-medium text-gray-400">Total Leads</th>
              <th className="px-6 py-4 text-left text-sm font-medium text-gray-400">Calls Made</th>
              <th className="px-6 py-4 text-left text-sm font-medium text-gray-400">Updated</th>
              <th className="px-6 py-4 text-left text-sm font-medium text-gray-400">Created</th>
            </tr>
          </thead>
          <tbody>
            {filteredCampaigns.map((campaign) => (
              <motion.tr
                key={campaign.id}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="border-b border-gray-700 hover:bg-gray-800/50 cursor-pointer"
                onClick={() => setSelectedCampaignId(campaign.id)}
              >
                <td className="px-6 py-4">
                  <span className="text-white font-medium">{campaign.name}</span>
                </td>
                <td className="px-6 py-4">
                  <div className="flex items-center space-x-2">
                    <motion.button
                      whileHover={{ scale: 1.1 }}
                      whileTap={{ scale: 0.9 }}
                      className={`p-1.5 rounded-lg ${
                        campaign.status === 'running'
                          ? 'bg-green-500/20 text-green-500'
                          : 'bg-gray-500/20 text-gray-500'
                      }`}
                    >
                      {campaign.status === 'running' ? (
                        <PauseIcon className="w-4 h-4" />
                      ) : (
                        <PlayIcon className="w-4 h-4" />
                      )}
                    </motion.button>
                    <span
                      className={`text-sm ${
                        campaign.status === 'running'
                          ? 'text-green-500'
                          : 'text-gray-500'
                      }`}
                    >
                      {campaign.status.charAt(0).toUpperCase() + campaign.status.slice(1)}
                    </span>
                  </div>
                </td>
                <td className="px-6 py-4">
                  <div className="w-full bg-gray-700 rounded-full h-2 overflow-hidden">
                    <motion.div
                      initial={{ width: 0 }}
                      animate={{ width: `${campaign.progress}%` }}
                      transition={{ duration: 1, ease: 'easeOut' }}
                      className="h-full bg-dashboard-accent"
                    />
                  </div>
                  <span className="text-sm text-gray-400 mt-1">
                    {campaign.progress}%
                  </span>
                </td>
                <td className="px-6 py-4">
                  <span className="text-white">{campaign.performance}%</span>
                </td>
                <td className="px-6 py-4">
                  <span className="text-white">{campaign.totalLeads}</span>
                </td>
                <td className="px-6 py-4">
                  <span className="text-white">{campaign.callsMade}</span>
                </td>
                <td className="px-6 py-4">
                  <span className="text-gray-400">{campaign.updated}</span>
                </td>
                <td className="px-6 py-4">
                  <span className="text-gray-400">{campaign.created}</span>
                </td>
              </motion.tr>
            ))}
          </tbody>
        </table>

        {/* Pagination */}
        <div className="px-6 py-4 flex items-center justify-between border-t border-gray-700">
          <div className="flex items-center space-x-2">
            <span className="text-sm text-gray-400">Rows per page:</span>
            <select
              value={rowsPerPage}
              onChange={(e) => setRowsPerPage(Number(e.target.value))}
              className="bg-dashboard-surface text-white border border-gray-700 rounded-lg px-2 py-1"
            >
              <option value={10}>10</option>
              <option value={25}>25</option>
              <option value={50}>50</option>
            </select>
          </div>
          <div className="flex items-center space-x-2">
            <button
              onClick={() => setCurrentPage(Math.max(1, currentPage - 1))}
              className="p-2 rounded-lg bg-dashboard-surface text-gray-400 hover:text-white disabled:opacity-50"
              disabled={currentPage === 1}
            >
              Previous
            </button>
            <span className="text-white">Page {currentPage}</span>
            <button
              onClick={() => setCurrentPage(currentPage + 1)}
              className="p-2 rounded-lg bg-dashboard-surface text-gray-400 hover:text-white"
            >
              Next
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CampaignsPage;
