import { motion } from 'framer-motion';
import {
  ChevronLeftIcon,
  ChevronRightIcon,
  EllipsisVerticalIcon,
  PhoneArrowUpRightIcon,
  PhoneArrowDownLeftIcon,
  InformationCircleIcon,
} from '@heroicons/react/24/outline';

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

interface CallsTableProps {
  calls: Call[];
  currentPage: number;
  rowsPerPage: number;
  onPageChange: (page: number) => void;
  onRowsPerPageChange: (rows: number) => void;
}

const CallsTable = ({
  calls,
  currentPage,
  rowsPerPage,
  onPageChange,
  onRowsPerPageChange,
}: CallsTableProps) => {
  const formatDuration = (seconds: number) => {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    return `${minutes}:${remainingSeconds.toString().padStart(2, '0')}`;
  };

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

  const getStatusColor = (status: Call['status']) => {
    switch (status) {
      case 'triggered':
        return 'bg-yellow-500/20 text-yellow-500 border-yellow-500/50';
      case 'completed':
        return 'bg-green-500/20 text-green-500 border-green-500/50';
      case 'failed':
        return 'bg-red-500/20 text-red-500 border-red-500/50';
      default:
        return 'bg-gray-500/20 text-gray-500 border-gray-500/50';
    }
  };

  const totalPages = Math.ceil(calls.length / rowsPerPage);
  const startIndex = (currentPage - 1) * rowsPerPage;
  const endIndex = startIndex + rowsPerPage;
  const displayedCalls = calls.slice(startIndex, endIndex);

  return (
    <div className="space-y-4">
      <div className="relative overflow-x-auto">
        <table className="w-full text-sm text-left text-gray-300">
          <thead className="text-xs text-gray-400 uppercase bg-gray-800/50">
            <tr>
              <th className="px-6 py-4">Phone Number</th>
              <th className="px-6 py-4">Status</th>
              <th className="px-6 py-4">Type</th>
              <th className="px-6 py-4">Duration</th>
              <th className="px-6 py-4">Agent</th>
              <th className="px-6 py-4">Campaign</th>
              <th className="px-6 py-4">Date</th>
              <th className="px-6 py-4">
                <div className="flex items-center gap-1">
                  Credits
                  <InformationCircleIcon className="w-4 h-4 text-gray-500" />
                </div>
              </th>
              <th className="px-6 py-4"></th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-800">
            {displayedCalls.map((call) => (
              <motion.tr
                key={call.id}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                whileHover={{ backgroundColor: 'rgba(55, 65, 81, 0.5)' }}
                className="bg-gray-800/30 hover:bg-gray-700/30 transition-colors"
              >
                <td className="px-6 py-4 font-medium">{call.phoneNumber}</td>
                <td className="px-6 py-4">
                  <span
                    className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium border ${getStatusColor(
                      call.status
                    )}`}
                  >
                    {call.status}
                  </span>
                </td>
                <td className="px-6 py-4">
                  <div className="flex items-center gap-1">
                    {call.type === 'outbound' ? (
                      <PhoneArrowUpRightIcon className="w-4 h-4 text-blue-500" />
                    ) : (
                      <PhoneArrowDownLeftIcon className="w-4 h-4 text-green-500" />
                    )}
                    <span className="capitalize">{call.type}</span>
                  </div>
                </td>
                <td className="px-6 py-4">{formatDuration(call.duration)}</td>
                <td className="px-6 py-4">{call.agent}</td>
                <td className="px-6 py-4">{call.campaign}</td>
                <td className="px-6 py-4">{formatDate(call.date)}</td>
                <td className="px-6 py-4">{call.creditsUsed}</td>
                <td className="px-6 py-4">
                  <button className="p-1 text-gray-400 hover:text-gray-300">
                    <EllipsisVerticalIcon className="w-5 h-5" />
                  </button>
                </td>
              </motion.tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Pagination */}
      <div className="flex items-center justify-between px-4">
        <div className="flex items-center gap-2">
          <span className="text-sm text-gray-400">Rows per page:</span>
          <select
            value={rowsPerPage}
            onChange={(e) => onRowsPerPageChange(Number(e.target.value))}
            className="px-2 py-1 text-sm text-gray-300 bg-gray-800 border border-gray-700 rounded-lg focus:outline-none focus:border-blue-500"
          >
            <option value={10}>10</option>
            <option value={20}>20</option>
            <option value={50}>50</option>
          </select>
        </div>

        <div className="flex items-center gap-4">
          <span className="text-sm text-gray-400">
            Page {currentPage} of {totalPages}
          </span>
          <div className="flex items-center gap-2">
            <motion.button
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              onClick={() => onPageChange(currentPage - 1)}
              disabled={currentPage === 1}
              className="p-1 text-gray-400 hover:text-gray-300 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              <ChevronLeftIcon className="w-5 h-5" />
            </motion.button>
            <motion.button
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              onClick={() => onPageChange(currentPage + 1)}
              disabled={currentPage === totalPages}
              className="p-1 text-gray-400 hover:text-gray-300 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              <ChevronRightIcon className="w-5 h-5" />
            </motion.button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CallsTable;
