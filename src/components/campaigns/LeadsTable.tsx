import { motion } from 'framer-motion';
import { useState } from 'react';
import {
  MagnifyingGlassIcon,
  ChevronLeftIcon,
  ChevronRightIcon,
} from '@heroicons/react/24/outline';

const mockLeads = [
  {
    id: '1',
    phone: '+1 (555) 123-4567',
    name: 'John Smith',
    email: 'john.smith@example.com',
    createdAt: '2025-02-01',
    calls: {
      pending: 2,
      completed: 1,
      failed: 0,
    },
    lastCall: '2025-02-09 14:30',
  },
  {
    id: '2',
    phone: '+1 (555) 234-5678',
    name: 'Sarah Johnson',
    email: 'sarah.j@example.com',
    createdAt: '2025-02-02',
    calls: {
      pending: 1,
      completed: 2,
      failed: 1,
    },
    lastCall: '2025-02-10 09:15',
  },
  {
    id: '3',
    phone: '+1 (555) 345-6789',
    name: 'Michael Brown',
    email: 'm.brown@example.com',
    createdAt: '2025-02-03',
    calls: {
      pending: 0,
      completed: 3,
      failed: 0,
    },
    lastCall: '2025-02-10 11:45',
  },
];

const LeadsTable = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [rowsPerPage] = useState(10);

  const filteredLeads = mockLeads.filter((lead) => {
    const searchLower = searchQuery.toLowerCase();
    return (
      lead.name.toLowerCase().includes(searchLower) ||
      lead.email.toLowerCase().includes(searchLower) ||
      lead.phone.includes(searchQuery)
    );
  });

  return (
    <div className="space-y-4">
      {/* Search Bar */}
      <div className="relative">
        <input
          type="text"
          placeholder="Search leads..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="w-full pl-10 pr-4 py-2 bg-dashboard-surface border border-gray-700 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-dashboard-accent"
        />
        <MagnifyingGlassIcon className="absolute left-3 top-2.5 w-5 h-5 text-gray-400" />
      </div>

      {/* Table */}
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead>
            <tr className="border-b border-gray-700">
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">
                Phone
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">
                Name
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">
                Email
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">
                Created At
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">
                Calls (P/C/F)
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">
                Last Call
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-700">
            {filteredLeads.map((lead) => (
              <motion.tr
                key={lead.id}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                whileHover={{ backgroundColor: 'rgba(255, 255, 255, 0.05)' }}
                className="group"
              >
                <td className="px-6 py-4 whitespace-nowrap text-sm text-white">
                  {lead.phone}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-white">
                  {lead.name}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-white">
                  {lead.email}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-white">
                  {lead.createdAt}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm">
                  <span className="text-yellow-500">{lead.calls.pending}</span>
                  {' / '}
                  <span className="text-green-500">{lead.calls.completed}</span>
                  {' / '}
                  <span className="text-red-500">{lead.calls.failed}</span>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-white">
                  {lead.lastCall}
                </td>
              </motion.tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Pagination */}
      <div className="flex items-center justify-between">
        <div className="text-sm text-gray-400">
          Showing {Math.min(rowsPerPage, filteredLeads.length)} of{' '}
          {filteredLeads.length} results
        </div>
        <div className="flex items-center space-x-2">
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="p-2 rounded-lg bg-dashboard-surface text-white hover:bg-gray-700"
            onClick={() => setCurrentPage(currentPage - 1)}
            disabled={currentPage === 1}
          >
            <ChevronLeftIcon className="w-5 h-5" />
          </motion.button>
          <span className="text-white">Page {currentPage}</span>
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="p-2 rounded-lg bg-dashboard-surface text-white hover:bg-gray-700"
            onClick={() => setCurrentPage(currentPage + 1)}
            disabled={currentPage * rowsPerPage >= filteredLeads.length}
          >
            <ChevronRightIcon className="w-5 h-5" />
          </motion.button>
        </div>
      </div>
    </div>
  );
};

export default LeadsTable;
