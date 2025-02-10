import { motion, AnimatePresence } from 'framer-motion';
import { useState } from 'react';
import {
  MagnifyingGlassIcon,
  XMarkIcon,
  PlusIcon,
  ArrowUpTrayIcon,
  ChevronLeftIcon,
  ChevronRightIcon,
  CheckIcon,
} from '@heroicons/react/24/outline';
import LeadsTable from './LeadsTable';

interface Lead {
  id: string;
  phone: string;
  name: string;
  email: string;
  createdAt: string;
  callsPending: number;
  callsCompleted: number;
  callsFailed: number;
  lastCall: string | null;
}

interface LeadsPageProps {
  onNavigate?: (page: 'new') => void;
}

const LeadsPage = ({ onNavigate }: LeadsPageProps) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedLeads, setSelectedLeads] = useState<string[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [rowsPerPage] = useState(10);

  // Mock data - replace with actual data fetching
  const leads: Lead[] = [
    {
      id: '1',
      phone: '+1 (555) 123-4567',
      name: 'John Smith',
      email: 'john.smith@example.com',
      createdAt: '2025-02-10T10:30:00',
      callsPending: 2,
      callsCompleted: 3,
      callsFailed: 1,
      lastCall: '2025-02-10T14:30:00',
    },
    {
      id: '2',
      phone: '+1 (555) 987-6543',
      name: 'Sarah Johnson',
      email: 'sarah.j@example.com',
      createdAt: '2025-02-10T11:15:00',
      callsPending: 1,
      callsCompleted: 4,
      callsFailed: 0,
      lastCall: '2025-02-10T15:45:00',
    },
  ];

  const handleSelectLead = (leadId: string) => {
    setSelectedLeads((prev) =>
      prev.includes(leadId)
        ? prev.filter((id) => id !== leadId)
        : [...prev, leadId]
    );
  };

  const handleSelectAllLeads = () => {
    setSelectedLeads((prev) =>
      prev.length === leads.length ? [] : leads.map((lead) => lead.id)
    );
  };

  const handleNewLead = () => {
    onNavigate?.('new');
  };

  const handleUploadCSV = () => {
    // Implement CSV upload
    console.log('Upload CSV');
  };

  const filteredLeads = leads.filter(
    (lead) =>
      lead.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      lead.phone.includes(searchQuery) ||
      lead.email.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const totalPages = Math.ceil(filteredLeads.length / rowsPerPage);
  const startIndex = (currentPage - 1) * rowsPerPage;
  const endIndex = startIndex + rowsPerPage;
  const displayedLeads = filteredLeads.slice(startIndex, endIndex);

  return (
    <div className="min-h-screen p-6 space-y-6">
      {/* Header Section */}
      <div className="space-y-1">
        <h1 className="text-3xl font-bold bg-gradient-to-r from-blue-500 to-purple-500 bg-clip-text text-transparent">
          CRM
        </h1>
        <p className="text-gray-400">
          Manage your leads and assign them to your campaigns. You can see all the
          calling activity happened with them, data collected from this section.
        </p>
      </div>

      {/* Action Buttons and Search */}
      <div className="flex flex-col sm:flex-row gap-4">
        <div className="flex gap-4">
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={handleNewLead}
            className="flex items-center gap-2 px-4 py-2 bg-blue-500 hover:bg-blue-400 text-white rounded-lg transition-colors"
          >
            <PlusIcon className="w-5 h-5" />
            New Lead
          </motion.button>
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={handleUploadCSV}
            className="flex items-center gap-2 px-4 py-2 bg-gray-700 hover:bg-gray-600 text-white rounded-lg transition-colors"
          >
            <ArrowUpTrayIcon className="w-5 h-5" />
            Upload CSV
          </motion.button>
        </div>
        <div className="relative flex-1">
          <input
            type="text"
            placeholder="Search lead by name, phone, or email..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full px-4 py-2 pl-10 bg-gray-800 border border-gray-700 rounded-lg focus:outline-none focus:border-blue-500 text-gray-300 placeholder-gray-500"
          />
          <MagnifyingGlassIcon className="absolute left-3 top-2.5 w-5 h-5 text-gray-500" />
          {searchQuery && (
            <button
              onClick={() => setSearchQuery('')}
              className="absolute right-3 top-2.5"
            >
              <XMarkIcon className="w-5 h-5 text-gray-500 hover:text-gray-400" />
            </button>
          )}
        </div>
      </div>

      {/* Leads Table */}
      <LeadsTable
        leads={displayedLeads}
        selectedLeads={selectedLeads}
        onSelectLead={handleSelectLead}
        onSelectAll={handleSelectAllLeads}
      />

      {/* Pagination */}
      <div className="flex items-center justify-between px-4">
        <div className="text-sm text-gray-400">
          Showing {startIndex + 1}-{Math.min(endIndex, filteredLeads.length)} of{' '}
          {filteredLeads.length} leads
        </div>
        <div className="flex items-center gap-2">
          <motion.button
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            onClick={() => setCurrentPage(currentPage - 1)}
            disabled={currentPage === 1}
            className="p-1 text-gray-400 hover:text-gray-300 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            <ChevronLeftIcon className="w-5 h-5" />
          </motion.button>
          <span className="text-sm text-gray-400">
            Page {currentPage} of {totalPages}
          </span>
          <motion.button
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            onClick={() => setCurrentPage(currentPage + 1)}
            disabled={currentPage === totalPages}
            className="p-1 text-gray-400 hover:text-gray-300 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            <ChevronRightIcon className="w-5 h-5" />
          </motion.button>
        </div>
      </div>
    </div>
  );
};

export default LeadsPage;
