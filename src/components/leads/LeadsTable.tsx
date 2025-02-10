import { motion } from 'framer-motion';
import { CheckIcon } from '@heroicons/react/24/outline';

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

interface LeadsTableProps {
  leads: Lead[];
  selectedLeads: string[];
  onSelectLead: (leadId: string) => void;
  onSelectAll: () => void;
}

const LeadsTable = ({
  leads,
  selectedLeads,
  onSelectLead,
  onSelectAll,
}: LeadsTableProps) => {
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return new Intl.DateTimeFormat('en-US', {
      month: 'short',
      day: 'numeric',
      hour: 'numeric',
      minute: 'numeric',
      hour12: true,
    }).format(date);
  };

  return (
    <div className="relative overflow-x-auto">
      <table className="w-full text-sm text-left text-gray-300">
        <thead className="text-xs text-gray-400 uppercase bg-gray-800/50">
          <tr>
            <th className="p-4">
              <div className="flex items-center">
                <motion.button
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                  onClick={onSelectAll}
                  className={`w-5 h-5 rounded border ${
                    selectedLeads.length === leads.length
                      ? 'bg-blue-500 border-blue-500'
                      : 'border-gray-600 hover:border-blue-500'
                  } flex items-center justify-center transition-colors`}
                >
                  {selectedLeads.length === leads.length && (
                    <CheckIcon className="w-4 h-4 text-white" />
                  )}
                </motion.button>
              </div>
            </th>
            <th className="px-6 py-4">Phone</th>
            <th className="px-6 py-4">Name</th>
            <th className="px-6 py-4">Email</th>
            <th className="px-6 py-4">Created At</th>
            <th className="px-6 py-4">
              <div className="flex items-center gap-1">
                # Calls (P/C/F)
                <div className="group relative">
                  <div className="absolute bottom-full left-1/2 transform -translate-x-1/2 mb-2 px-3 py-1 text-xs bg-gray-900 text-gray-300 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap">
                    P: Pending, C: Completed, F: Failed
                  </div>
                </div>
              </div>
            </th>
            <th className="px-6 py-4">Last Call</th>
          </tr>
        </thead>
        <tbody className="divide-y divide-gray-800">
          {leads.map((lead) => (
            <motion.tr
              key={lead.id}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              whileHover={{ backgroundColor: 'rgba(55, 65, 81, 0.5)' }}
              className={`${
                selectedLeads.includes(lead.id)
                  ? 'bg-blue-500/10'
                  : 'bg-gray-800/30'
              } hover:bg-gray-700/30 transition-colors`}
            >
              <td className="p-4">
                <div className="flex items-center">
                  <motion.button
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                    onClick={() => onSelectLead(lead.id)}
                    className={`w-5 h-5 rounded border ${
                      selectedLeads.includes(lead.id)
                        ? 'bg-blue-500 border-blue-500'
                        : 'border-gray-600 hover:border-blue-500'
                    } flex items-center justify-center transition-colors`}
                  >
                    {selectedLeads.includes(lead.id) && (
                      <CheckIcon className="w-4 h-4 text-white" />
                    )}
                  </motion.button>
                </div>
              </td>
              <td className="px-6 py-4 font-medium">{lead.phone}</td>
              <td className="px-6 py-4">{lead.name}</td>
              <td className="px-6 py-4">{lead.email}</td>
              <td className="px-6 py-4">{formatDate(lead.createdAt)}</td>
              <td className="px-6 py-4">
                <div className="flex items-center gap-1">
                  <span className="text-yellow-500">{lead.callsPending}</span>/
                  <span className="text-green-500">{lead.callsCompleted}</span>/
                  <span className="text-red-500">{lead.callsFailed}</span>
                </div>
              </td>
              <td className="px-6 py-4">
                {lead.lastCall ? formatDate(lead.lastCall) : '-'}
              </td>
            </motion.tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default LeadsTable;
