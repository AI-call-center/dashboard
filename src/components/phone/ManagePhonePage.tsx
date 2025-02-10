import { motion, AnimatePresence } from 'framer-motion';
import { useState, useMemo } from 'react';
import {
  MagnifyingGlassIcon,
  PhoneIcon,
  ChatBubbleBottomCenterIcon,
  XMarkIcon,
  ChevronLeftIcon,
  ChevronRightIcon,
  PlusIcon,
  EllipsisVerticalIcon,
  ChevronUpIcon,
  ChevronDownIcon,
  XCircleIcon,
  ArrowPathIcon,
} from '@heroicons/react/24/outline';
import { format } from 'date-fns';
import { toast } from 'react-hot-toast';

interface PhoneNumber {
  id: string;
  number: string;
  countryCode: string;
  status: 'Active' | 'Inactive';
  type: 'Local' | 'Toll-Free' | 'Mobile';
  voiceEnabled: boolean;
  smsEnabled: boolean;
  tags: string[];
  subscriptionType: 'Monthly' | 'Yearly';
  subscriptionEnd: Date;
  price: number;
  createdAt: Date;
}

interface SortConfig {
  key: keyof PhoneNumber;
  direction: 'asc' | 'desc';
}

const ManagePhonePage = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedStatus, setSelectedStatus] = useState<'All' | 'Active' | 'Inactive'>('All');
  const [selectedType, setSelectedType] = useState<'All' | 'Local' | 'Toll-Free' | 'Mobile'>('All');
  const [selectedCapability, setSelectedCapability] = useState<'All' | 'Voice' | 'SMS'>('All');
  const [currentPage, setCurrentPage] = useState(1);
  const [sortConfig, setSortConfig] = useState<SortConfig>({ key: 'createdAt', direction: 'desc' });
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [selectedNumber, setSelectedNumber] = useState<PhoneNumber | null>(null);
  const itemsPerPage = 10;

  // Mock data - replace with API calls
  const phoneNumbers: PhoneNumber[] = [
    {
      id: '1',
      number: '+13252414903',
      countryCode: 'US',
      status: 'Active',
      type: 'Local',
      voiceEnabled: true,
      smsEnabled: true,
      tags: ['new rachel', 'sajja'],
      subscriptionType: 'Monthly',
      subscriptionEnd: new Date('2025-02-28'),
      price: 1.15,
      createdAt: new Date('2025-01-28'),
    },
    {
      id: '2',
      number: '+18002897458',
      countryCode: 'US',
      status: 'Active',
      type: 'Toll-Free',
      voiceEnabled: true,
      smsEnabled: false,
      tags: ['support'],
      subscriptionType: 'Yearly',
      subscriptionEnd: new Date('2026-01-15'),
      price: 2.25,
      createdAt: new Date('2025-01-15'),
    },
    {
      id: '3',
      number: '+447700900123',
      countryCode: 'GB',
      status: 'Inactive',
      type: 'Mobile',
      voiceEnabled: true,
      smsEnabled: true,
      tags: ['uk-sales'],
      subscriptionType: 'Monthly',
      subscriptionEnd: new Date('2025-03-01'),
      price: 1.75,
      createdAt: new Date('2025-01-01'),
    },
  ];

  const filteredNumbers = useMemo(() => {
    return phoneNumbers.filter((number) => {
      const matchesSearch = number.number.includes(searchQuery) ||
        number.tags.some(tag => tag.toLowerCase().includes(searchQuery.toLowerCase()));
      const matchesStatus = selectedStatus === 'All' || number.status === selectedStatus;
      const matchesType = selectedType === 'All' || number.type === selectedType;
      const matchesCapability = selectedCapability === 'All' ||
        (selectedCapability === 'Voice' && number.voiceEnabled) ||
        (selectedCapability === 'SMS' && number.smsEnabled);

      return matchesSearch && matchesStatus && matchesType && matchesCapability;
    }).sort((a, b) => {
      const aValue = a[sortConfig.key];
      const bValue = b[sortConfig.key];
      
      if (typeof aValue === 'string' && typeof bValue === 'string') {
        return sortConfig.direction === 'asc' 
          ? aValue.localeCompare(bValue)
          : bValue.localeCompare(aValue);
      }
      
      if (aValue instanceof Date && bValue instanceof Date) {
        return sortConfig.direction === 'asc'
          ? aValue.getTime() - bValue.getTime()
          : bValue.getTime() - aValue.getTime();
      }
      
      if (typeof aValue === 'number' && typeof bValue === 'number') {
        return sortConfig.direction === 'asc'
          ? aValue - bValue
          : bValue - aValue;
      }
      
      return 0;
    });
  }, [phoneNumbers, searchQuery, selectedStatus, selectedType, selectedCapability, sortConfig]);

  const paginatedNumbers = useMemo(() => {
    const startIndex = (currentPage - 1) * itemsPerPage;
    return filteredNumbers.slice(startIndex, startIndex + itemsPerPage);
  }, [filteredNumbers, currentPage]);

  const totalPages = Math.ceil(filteredNumbers.length / itemsPerPage);

  const handleSort = (key: keyof PhoneNumber) => {
    setSortConfig((current) => ({
      key,
      direction: current.key === key && current.direction === 'asc' ? 'desc' : 'asc',
    }));
  };

  const handleDelete = () => {
    if (selectedNumber) {
      // Implement delete logic here
      console.log('Deleting number:', selectedNumber.number);
      toast.success('Phone number deleted successfully');
      setShowDeleteModal(false);
      setSelectedNumber(null);
    }
  };

  const handleBuyNewNumber = () => {
    // Navigate to Buy Number page
    window.location.href = '/buy-number';
  };

  const getCountryFlag = (countryCode: string) => {
    const flagEmoji = {
      'US': '🇺🇸',
      'GB': '🇬🇧',
      'CA': '🇨🇦',
      'AU': '🇦🇺',
    }[countryCode] || '🌐';
    return flagEmoji;
  };

  return (
    <div className="min-h-screen p-6 space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold bg-gradient-to-r from-blue-500 to-purple-500 bg-clip-text text-transparent">
            Phone Numbers
          </h1>
        </div>
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={handleBuyNewNumber}
          className="px-4 py-2 bg-blue-500 hover:bg-blue-400 text-white font-medium rounded-lg transition-colors flex items-center gap-2"
        >
          <PlusIcon className="w-5 h-5" />
          Buy New Number
        </motion.button>
      </div>

      {/* Filters */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {/* Search */}
        <div className="relative">
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search by phone number or tags"
            className="w-full px-4 py-2 pl-10 bg-gray-800 border border-gray-700 rounded-lg focus:outline-none focus:border-blue-500 text-gray-300 placeholder-gray-500"
          />
          <MagnifyingGlassIcon className="absolute left-3 top-2.5 w-5 h-5 text-gray-500" />
        </div>

        {/* Status Filter */}
        <select
          value={selectedStatus}
          onChange={(e) => setSelectedStatus(e.target.value as any)}
          className="px-4 py-2 bg-gray-800 border border-gray-700 rounded-lg focus:outline-none focus:border-blue-500 text-gray-300"
        >
          <option value="All">All Statuses</option>
          <option value="Active">Active</option>
          <option value="Inactive">Inactive</option>
        </select>

        {/* Type Filter */}
        <select
          value={selectedType}
          onChange={(e) => setSelectedType(e.target.value as any)}
          className="px-4 py-2 bg-gray-800 border border-gray-700 rounded-lg focus:outline-none focus:border-blue-500 text-gray-300"
        >
          <option value="All">All Types</option>
          <option value="Local">Local</option>
          <option value="Toll-Free">Toll-Free</option>
          <option value="Mobile">Mobile</option>
        </select>

        {/* Capability Filter */}
        <select
          value={selectedCapability}
          onChange={(e) => setSelectedCapability(e.target.value as any)}
          className="px-4 py-2 bg-gray-800 border border-gray-700 rounded-lg focus:outline-none focus:border-blue-500 text-gray-300"
        >
          <option value="All">All Capabilities</option>
          <option value="Voice">Voice</option>
          <option value="SMS">SMS</option>
        </select>
      </div>

      {/* Phone Numbers Table */}
      <div className="relative overflow-x-auto rounded-lg border border-gray-800">
        <table className="w-full text-sm text-left text-gray-300">
          <thead className="text-xs text-gray-400 uppercase bg-gray-800/50">
            <tr>
              {[
                { key: 'number', label: 'Phone Number' },
                { key: 'status', label: 'Status' },
                { key: 'type', label: 'Type' },
                { key: 'capabilities', label: 'Capabilities' },
                { key: 'tags', label: 'Tags' },
                { key: 'subscriptionType', label: 'Subscription' },
                { key: 'subscriptionEnd', label: 'Subscription Ends' },
                { key: 'price', label: 'Price' },
                { key: 'createdAt', label: 'Created At' },
                { key: 'actions', label: '' },
              ].map(({ key, label }) => (
                <th
                  key={key}
                  className="px-6 py-4 cursor-pointer hover:text-white"
                  onClick={() => key !== 'actions' && key !== 'capabilities' && handleSort(key as keyof PhoneNumber)}
                >
                  <div className="flex items-center gap-2">
                    {label}
                    {key !== 'actions' && key !== 'capabilities' && sortConfig.key === key && (
                      sortConfig.direction === 'asc' ? (
                        <ChevronUpIcon className="w-4 h-4" />
                      ) : (
                        <ChevronDownIcon className="w-4 h-4" />
                      )
                    )}
                  </div>
                </th>
              ))}
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-800">
            {paginatedNumbers.length > 0 ? (
              paginatedNumbers.map((number) => (
                <motion.tr
                  key={number.id}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  className="bg-gray-800/30 hover:bg-gray-700/30 transition-colors"
                >
                  <td className="px-6 py-4 font-medium">
                    <div className="flex items-center gap-2">
                      <span>{getCountryFlag(number.countryCode)}</span>
                      {number.number}
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <span
                      className={`px-2 py-1 rounded-full text-xs font-medium ${
                        number.status === 'Active'
                          ? 'bg-green-500/20 text-green-400'
                          : 'bg-gray-500/20 text-gray-400'
                      }`}
                    >
                      {number.status}
                    </span>
                  </td>
                  <td className="px-6 py-4">{number.type}</td>
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-3">
                      <div className="flex items-center gap-1">
                        <PhoneIcon
                          className={`w-5 h-5 ${
                            number.voiceEnabled
                              ? 'text-green-500'
                              : 'text-gray-500'
                          }`}
                        />
                      </div>
                      <div className="flex items-center gap-1">
                        {number.smsEnabled ? (
                          <ChatBubbleBottomCenterIcon className="w-5 h-5 text-green-500" />
                        ) : (
                          <XCircleIcon className="w-5 h-5 text-gray-500" />
                        )}
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex flex-wrap gap-2">
                      {number.tags.map((tag) => (
                        <span
                          key={tag}
                          className="px-2 py-1 bg-blue-500/20 text-blue-400 rounded-full text-xs"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>
                  </td>
                  <td className="px-6 py-4">{number.subscriptionType}</td>
                  <td className="px-6 py-4">
                    {format(number.subscriptionEnd, 'EEE MMM dd yyyy')}
                  </td>
                  <td className="px-6 py-4">{number.price.toFixed(2)} USD</td>
                  <td className="px-6 py-4">
                    {format(number.createdAt, 'EEE MMM dd yyyy')}
                  </td>
                  <td className="px-6 py-4">
                    <div className="relative group">
                      <motion.button
                        whileHover={{ scale: 1.1 }}
                        whileTap={{ scale: 0.9 }}
                        className="p-2 hover:bg-gray-700 rounded-lg"
                        onClick={() => {
                          setSelectedNumber(number);
                          setShowDeleteModal(true);
                        }}
                      >
                        <EllipsisVerticalIcon className="w-5 h-5" />
                      </motion.button>
                      <div className="absolute right-0 mt-2 w-48 bg-gray-800 rounded-lg shadow-lg opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all z-10">
                        <button
                          className="w-full px-4 py-2 text-left hover:bg-gray-700 rounded-t-lg"
                          onClick={() => {
                            toast.success('Viewing details...');
                          }}
                        >
                          View Details
                        </button>
                        <button
                          className="w-full px-4 py-2 text-left hover:bg-gray-700"
                          onClick={() => {
                            toast.success('Opening edit modal...');
                          }}
                        >
                          Edit
                        </button>
                        <button
                          className="w-full px-4 py-2 text-left hover:bg-gray-700 text-red-400 rounded-b-lg"
                          onClick={() => {
                            setSelectedNumber(number);
                            setShowDeleteModal(true);
                          }}
                        >
                          Delete
                        </button>
                      </div>
                    </div>
                  </td>
                </motion.tr>
              ))
            ) : (
              <tr>
                <td colSpan={10} className="px-6 py-8 text-center text-gray-400">
                  No phone numbers found. Click 'Buy New Number' to get started.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {/* Pagination */}
      <div className="flex items-center justify-between px-4">
        <div className="text-sm text-gray-400">
          Showing {((currentPage - 1) * itemsPerPage) + 1}-
          {Math.min(currentPage * itemsPerPage, filteredNumbers.length)} of{' '}
          {filteredNumbers.length} phone numbers
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

      {/* Delete Confirmation Modal */}
      <AnimatePresence>
        {showDeleteModal && selectedNumber && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50"
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              className="bg-gray-900 rounded-lg p-6 max-w-md w-full space-y-4"
            >
              <div className="flex items-center justify-between">
                <h2 className="text-xl font-semibold text-gray-100">
                  Delete Phone Number
                </h2>
                <button
                  onClick={() => setShowDeleteModal(false)}
                  className="text-gray-400 hover:text-gray-300"
                >
                  <XMarkIcon className="w-5 h-5" />
                </button>
              </div>
              <p className="text-gray-300">
                Are you sure you want to delete the phone number{' '}
                <span className="font-medium">{selectedNumber.number}</span>? This
                action cannot be undone.
              </p>
              <div className="flex gap-3 justify-end">
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => setShowDeleteModal(false)}
                  className="px-4 py-2 bg-gray-700 hover:bg-gray-600 text-white font-medium rounded-lg transition-colors"
                >
                  Cancel
                </motion.button>
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={handleDelete}
                  className="px-4 py-2 bg-red-500 hover:bg-red-400 text-white font-medium rounded-lg transition-colors"
                >
                  Delete
                </motion.button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default ManagePhonePage;
