import { motion, AnimatePresence } from 'framer-motion';
import { useState } from 'react';
import {
  PlusIcon,
  ArrowUpTrayIcon,
  UserGroupIcon,
  ChartBarIcon,
  BriefcaseIcon,
} from '@heroicons/react/24/outline';
import { format } from 'date-fns';
import UploadCSVModal from './UploadCSVModal';

interface Contact {
  id: string;
  name: string;
  email: string;
  phone: string;
  status: 'Active' | 'Inactive';
  lastContact: Date;
}

const CRMPage = () => {
  const [showUploadModal, setShowUploadModal] = useState(false);

  // Mock data - replace with API calls
  const contacts: Contact[] = [
    {
      id: '1',
      name: 'John Doe',
      email: 'john@example.com',
      phone: '+1 234 567 8900',
      status: 'Active',
      lastContact: new Date('2025-02-01'),
    },
    {
      id: '2',
      name: 'Jane Smith',
      email: 'jane@example.com',
      phone: '+1 234 567 8901',
      status: 'Inactive',
      lastContact: new Date('2025-01-15'),
    },
  ];

  const stats = [
    {
      name: 'Total Contacts',
      value: '2,847',
      icon: UserGroupIcon,
      change: '+12.5%',
      changeType: 'positive',
    },
    {
      name: 'Active Contacts',
      value: '1,423',
      icon: ChartBarIcon,
      change: '+8.2%',
      changeType: 'positive',
    },
    {
      name: 'Recent Activities',
      value: '847',
      icon: BriefcaseIcon,
      change: '+24.5%',
      changeType: 'positive',
    },
  ];

  return (
    <div className="min-h-screen p-6 space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="space-y-1">
          <h1 className="text-4xl font-bold bg-gradient-to-r from-blue-500 to-purple-500 bg-clip-text text-transparent">
            CRM
          </h1>
          <p className="text-gray-400 max-w-2xl">
            Manage your contacts and track customer relationships effectively.
          </p>
        </div>
        <div className="flex gap-3">
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => setShowUploadModal(true)}
            className="px-4 py-2 bg-gray-700 hover:bg-gray-600 text-white font-medium rounded-lg transition-colors flex items-center gap-2"
          >
            <ArrowUpTrayIcon className="w-5 h-5" />
            Upload CSV
          </motion.button>
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="px-4 py-2 bg-blue-500 hover:bg-blue-400 text-white font-medium rounded-lg transition-colors flex items-center gap-2"
          >
            <PlusIcon className="w-5 h-5" />
            Add Contact
          </motion.button>
        </div>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {stats.map((stat) => (
          <motion.div
            key={stat.name}
            whileHover={{ scale: 1.02 }}
            className="p-6 bg-gray-800/50 rounded-lg border border-gray-700"
          >
            <div className="flex items-center justify-between">
              <div className="p-2 bg-blue-500/10 rounded-lg">
                <stat.icon className="w-6 h-6 text-blue-400" />
              </div>
              <span
                className={`text-sm font-medium ${
                  stat.changeType === 'positive' ? 'text-green-400' : 'text-red-400'
                }`}
              >
                {stat.change}
              </span>
            </div>
            <div className="mt-4">
              <h3 className="text-3xl font-semibold text-white">{stat.value}</h3>
              <p className="text-sm text-gray-400 mt-1">{stat.name}</p>
            </div>
          </motion.div>
        ))}
      </div>

      {/* Contacts Table */}
      <div className="relative overflow-x-auto rounded-lg border border-gray-800">
        <table className="w-full text-sm text-left text-gray-300">
          <thead className="text-xs text-gray-400 uppercase bg-gray-800/50">
            <tr>
              <th className="px-6 py-4">Name</th>
              <th className="px-6 py-4">Email</th>
              <th className="px-6 py-4">Phone</th>
              <th className="px-6 py-4">Status</th>
              <th className="px-6 py-4">Last Contact</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-800">
            {contacts.map((contact) => (
              <motion.tr
                key={contact.id}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="bg-gray-800/30 hover:bg-gray-700/30 transition-colors"
              >
                <td className="px-6 py-4 font-medium">{contact.name}</td>
                <td className="px-6 py-4">{contact.email}</td>
                <td className="px-6 py-4">{contact.phone}</td>
                <td className="px-6 py-4">
                  <span
                    className={`px-2 py-1 rounded-full text-xs font-medium ${
                      contact.status === 'Active'
                        ? 'bg-green-500/20 text-green-400'
                        : 'bg-gray-500/20 text-gray-400'
                    }`}
                  >
                    {contact.status}
                  </span>
                </td>
                <td className="px-6 py-4">
                  {format(contact.lastContact, 'MMM dd, yyyy')}
                </td>
              </motion.tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Upload CSV Modal */}
      <AnimatePresence>
        {showUploadModal && (
          <UploadCSVModal onClose={() => setShowUploadModal(false)} />
        )}
      </AnimatePresence>
    </div>
  );
};

export default CRMPage;
