import { motion } from 'framer-motion';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { PhoneIcon, UserCircleIcon, CheckCircleIcon, ClockIcon, XCircleIcon, CalendarIcon } from '@heroicons/react/24/outline';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import '../styles/datepicker.css';
import { useState } from 'react';

const data = [
  { date: '02/02/2025', calls: 4 },
  { date: '03/02/2025', calls: 3 },
  { date: '04/02/2025', calls: 6 },
  { date: '05/02/2025', calls: 8 },
  { date: '06/02/2025', calls: 5 },
  { date: '07/02/2025', calls: 7 },
  { date: '08/02/2025', calls: 9 },
  { date: '09/02/2025', calls: 6 },
];

// Mock data functions to simulate API calls
const getCallMetrics = () => {
  return {
    today: {
      total: 25,
      inbound: {
        total: 15,
        answered: 13,
        missed: 2
      },
      outbound: {
        total: 10,
        connected: 8,
        failed: 2
      },
      totalDuration: 5400, // 90 minutes in seconds
      yesterdayComparison: {
        total: 22,
        answerRate: 82,
        missed: 3,
        avgDuration: 180 // 3 minutes in seconds
      }
    }
  };
};

const formatDuration = (seconds: number): string => {
  const minutes = Math.floor(seconds / 60);
  const remainingSeconds = seconds % 60;
  return `${minutes}m ${remainingSeconds}s`;
};

const calculateTrend = (current: number, previous: number): { type: 'up' | 'down' | 'neutral', percentage: number } => {
  if (current === previous) return { type: 'neutral', percentage: 0 };
  const percentage = ((current - previous) / previous) * 100;
  return {
    type: percentage > 0 ? 'up' : 'down',
    percentage: Math.abs(percentage)
  };
};

const metrics = getCallMetrics();

const statsData = [
  {
    label: 'Calls Handled Today',
    value: metrics.today.total,
    trend: calculateTrend(metrics.today.total, metrics.today.yesterdayComparison.total),
    icon: PhoneIcon
  },
  {
    label: 'Answer Rate',
    value: `${Math.round((metrics.today.inbound.answered / metrics.today.inbound.total) * 100)}%`,
    trend: calculateTrend(
      (metrics.today.inbound.answered / metrics.today.inbound.total) * 100,
      metrics.today.yesterdayComparison.answerRate
    ),
    icon: CheckCircleIcon
  },
  {
    label: 'Missed Calls Today',
    value: metrics.today.inbound.missed,
    trend: calculateTrend(metrics.today.inbound.missed, metrics.today.yesterdayComparison.missed),
    warning: metrics.today.inbound.missed > 3,
    icon: XCircleIcon
  },
  {
    label: 'Average Call Duration',
    value: formatDuration(Math.round(metrics.today.totalDuration / metrics.today.total)),
    trend: calculateTrend(
      Math.round(metrics.today.totalDuration / metrics.today.total),
      metrics.today.yesterdayComparison.avgDuration
    ),
    icon: ClockIcon
  }
];

const leadsData = [
  {
    id: 1,
    name: 'John Smith',
    phone: '+1 (555) 123-4567',
    status: 'active',
    lastContact: '2025-02-09',
    score: 85,
  },
  {
    id: 2,
    name: 'Sarah Johnson',
    phone: '+1 (555) 987-6543',
    status: 'new',
    lastContact: '2025-02-08',
    score: 92,
  },
];

const recentCalls = [
  {
    id: 1,
    status: 'completed',
    phone: '+1 (555) 123-4567',
    duration: '5:23',
    assistant: 'Sales Bot 1',
    date: '2025-02-09 14:30',
  },
  {
    id: 2,
    status: 'in-progress',
    phone: '+1 (555) 987-6543',
    duration: '2:45',
    assistant: 'Support Bot 2',
    date: '2025-02-09 15:15',
  },
  {
    id: 3,
    status: 'failed',
    phone: '+1 (555) 246-8135',
    duration: '0:45',
    assistant: 'Sales Bot 1',
    date: '2025-02-09 16:00',
  },
];

const Dashboard = () => {
  const [dateRange, setDateRange] = useState<[Date | null, Date | null]>([null, null]);
  const [startDate, endDate] = dateRange;

  const getFilteredData = () => {
    if (!startDate || !endDate) return data;
    return data.filter(item => {
      const itemDate = new Date(item.date);
      return itemDate >= startDate && itemDate <= endDate;
    });
  };

  return (
    <div className="p-4 md:p-8 space-y-6 md:space-y-8">
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6">
        {statsData.map((stat) => (
          <motion.div
            key={stat.label}
            whileHover={{ scale: 1.05 }}
            className="p-6 rounded-xl bg-dashboard-surface border border-gray-800 animate-glow relative overflow-hidden"
          >
            <div className="flex items-center gap-2 text-gray-400 text-sm">
              <stat.icon className="w-4 h-4" />
              {stat.label}
            </div>
            <div className="flex items-end gap-2 mt-2">
              <div className={`text-2xl md:text-3xl font-bold ${stat.warning ? 'text-red-500' : 'text-white'}`}>
                {stat.value}
              </div>
              {stat.trend && stat.trend.type !== 'neutral' && (
                <div
                  className={`flex items-center text-sm mb-1 ${stat.trend.type === 'up' ? 
                    (stat.label === 'Missed Calls Today' ? 'text-red-400' : 'text-green-400') :
                    (stat.label === 'Missed Calls Today' ? 'text-green-400' : 'text-red-400')}`}
                >
                  {stat.trend.type === 'up' ? '↑' : '↓'}
                  {stat.trend.percentage.toFixed(1)}%
                </div>
              )}
            </div>
            {stat.warning && (
              <div className="absolute top-2 right-2">
                <div className="w-2 h-2 rounded-full bg-red-500 animate-pulse" />
              </div>
            )}
          </motion.div>
        ))}
      </div>

      <motion.div
        whileHover={{ scale: 1.02 }}
        className="p-6 rounded-xl bg-dashboard-surface border border-gray-800"
      >
        <div className="flex justify-between items-center mb-6">
          <div className="text-xl font-semibold text-white">Recent Leads</div>
          <motion.button
            whileHover={{ scale: 1.05 }}
            className="w-full sm:w-auto px-4 py-2 bg-dashboard-accent rounded-lg text-white font-medium animate-glow"
          >
            View All Leads
          </motion.button>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6">
          {leadsData.map((lead) => (
            <motion.div
              key={lead.id}
              whileHover={{ scale: 1.02 }}
              className="p-4 rounded-lg bg-gray-800/50 border border-gray-700"
            >
              <div className="flex justify-between items-start">
                <div>
                  <h3 className="text-lg font-semibold text-white">{lead.name}</h3>
                  <p className="text-gray-400">{lead.phone}</p>
                </div>
                <div className={`px-3 py-1 rounded-full text-sm ${lead.status === 'active' ? 'bg-green-500/20 text-green-400' : 'bg-blue-500/20 text-blue-400'}`}>
                  {lead.status}
                </div>
              </div>
              <div className="mt-4 flex justify-between items-center">
                <div className="text-sm text-gray-400">Last Contact: {lead.lastContact}</div>
                <div className="text-sm font-medium text-dashboard-accent">Score: {lead.score}%</div>
              </div>
            </motion.div>
          ))}
        </div>
      </motion.div>

      <div className="space-y-6">
        <motion.div
          whileHover={{ scale: 1.02 }}
          className="p-6 rounded-xl bg-dashboard-surface border border-gray-800"
        >
          <div className="flex justify-between items-center mb-6">
            <div className="text-xl font-semibold text-white">Calls Overview</div>
            <div className="flex flex-col sm:flex-row space-y-2 sm:space-y-0 sm:space-x-4 w-full sm:w-auto">
              <div className="relative">
                <DatePicker
                  selectsRange={true}
                  startDate={startDate}
                  endDate={endDate}
                  onChange={(update) => setDateRange(update)}
                  customInput={
                    <motion.button
                      whileHover={{ scale: 1.05 }}
                      className="w-full sm:w-auto px-4 py-2 bg-dashboard-surface border border-gray-700 rounded-lg text-white font-medium flex items-center gap-2"
                    >
                      <CalendarIcon className="w-5 h-5" />
                      {startDate && endDate
                        ? `${startDate.toLocaleDateString()} - ${endDate.toLocaleDateString()}`
                        : 'Select Date Range'}
                    </motion.button>
                  }
                  className="react-datepicker-wrapper"
                  wrapperClassName="react-datepicker-wrapper"
                  calendarClassName="bg-dashboard-surface border border-gray-700 rounded-lg text-white"
                />
              </div>
              <motion.button
                whileHover={{ scale: 1.05 }}
                className="w-full sm:w-auto px-4 py-2 bg-dashboard-accent rounded-lg text-white font-medium"
              >
                Download Report
              </motion.button>
            </div>
          </div>
          <div className="h-48 md:h-64">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={getFilteredData()}>
                <CartesianGrid strokeDasharray="3 3" stroke="#374151" />
                <XAxis dataKey="date" stroke="#9CA3AF" />
                <YAxis stroke="#9CA3AF" />
                <Tooltip
                  contentStyle={{
                    backgroundColor: '#111827',
                    border: '1px solid #374151',
                    borderRadius: '0.5rem',
                  }}
                />
                <Line
                  type="monotone"
                  dataKey="calls"
                  stroke="#2563EB"
                  strokeWidth={2}
                  dot={{ fill: '#2563EB', strokeWidth: 2 }}
                  activeDot={{ r: 8, fill: '#3B82F6' }}
                />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </motion.div>

        <motion.div
          whileHover={{ scale: 1.02 }}
          className="p-6 rounded-xl bg-dashboard-surface border border-gray-800"
        >
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-6">
            <div className="text-xl font-semibold text-white">Latest Calls</div>
            <div className="flex flex-col sm:flex-row items-start sm:items-center space-y-2 sm:space-y-0 sm:space-x-4">
              <div className="flex flex-wrap items-center gap-2 text-sm">
                <span className="flex items-center"><CheckCircleIcon className="w-4 h-4 text-green-500 mr-1" /> Completed</span>
                <span className="flex items-center"><ClockIcon className="w-4 h-4 text-yellow-500 mr-1" /> In Progress</span>
                <span className="flex items-center"><XCircleIcon className="w-4 h-4 text-red-500 mr-1" /> Failed</span>
              </div>
              <motion.button
                whileHover={{ scale: 1.05 }}
                className="w-full sm:w-auto px-4 py-2 bg-dashboard-accent rounded-lg text-white font-medium"
              >
                View All Calls
              </motion.button>
            </div>
          </div>
          <div className="overflow-x-auto -mx-6 px-6">
            <table className="w-full">
              <thead>
                <tr className="text-left text-gray-400 border-b border-gray-800">
                  <th className="pb-3">Status</th>
                  <th className="pb-3">Client Phone</th>
                  <th className="pb-3">Duration</th>
                  <th className="pb-3">Assistant</th>
                  <th className="pb-3">Date</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-800">
                {recentCalls.map((call) => (
                  <tr key={call.id} className="text-gray-300 hover:bg-gray-800/50 transition-colors">
                    <td className="py-4">
                      <span className="flex items-center">
                        {call.status === 'completed' && <CheckCircleIcon className="w-5 h-5 text-green-500 mr-2" />}
                        {call.status === 'in-progress' && <ClockIcon className="w-5 h-5 text-yellow-500 mr-2" />}
                        {call.status === 'failed' && <XCircleIcon className="w-5 h-5 text-red-500 mr-2" />}
                        {call.status}
                      </span>
                    </td>
                    <td className="py-4">{call.phone}</td>
                    <td className="py-4">{call.duration}</td>
                    <td className="py-4">{call.assistant}</td>
                    <td className="py-4">{call.date}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </motion.div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6">
        <motion.button
          whileHover={{ scale: 1.05 }}
          className="p-6 rounded-xl bg-dashboard-surface border border-gray-800 flex items-center animate-glow"
        >
          <PhoneIcon className="w-8 h-8 text-dashboard-accent mr-4" />
          <div>
            <div className="text-lg font-semibold text-white">Rent a phone number</div>
            <div className="text-gray-400">Get started with a new phone number</div>
          </div>
        </motion.button>

        <motion.button
          whileHover={{ scale: 1.05 }}
          className="p-6 rounded-xl bg-dashboard-surface border border-gray-800 flex items-center animate-glow"
        >
          <UserCircleIcon className="w-8 h-8 text-dashboard-accent mr-4" />
          <div>
            <div className="text-lg font-semibold text-white">Create an agent</div>
            <div className="text-gray-400">Set up a new agent profile</div>
          </div>
        </motion.button>
      </div>
    </div>
  );
};

export default Dashboard;
