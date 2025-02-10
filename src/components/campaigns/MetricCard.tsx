import { motion } from 'framer-motion';
import { ComponentType } from 'react';

interface MetricCardProps {
  title: string;
  value: number;
  icon: ComponentType<{ className?: string }>;
  color: 'blue' | 'purple' | 'green' | 'red';
}

const colorVariants = {
  blue: {
    bg: 'bg-blue-500/20',
    text: 'text-blue-500',
    glow: 'shadow-blue-500/20',
  },
  purple: {
    bg: 'bg-purple-500/20',
    text: 'text-purple-500',
    glow: 'shadow-purple-500/20',
  },
  green: {
    bg: 'bg-green-500/20',
    text: 'text-green-500',
    glow: 'shadow-green-500/20',
  },
  red: {
    bg: 'bg-red-500/20',
    text: 'text-red-500',
    glow: 'shadow-red-500/20',
  },
};

const MetricCard = ({ title, value, icon: Icon, color }: MetricCardProps) => {
  const colors = colorVariants[color];

  return (
    <motion.div
      whileHover={{ scale: 1.02, y: -4 }}
      className={`p-6 rounded-lg bg-dashboard-surface border border-gray-700 ${colors.glow} hover:shadow-lg transition-shadow`}
    >
      <div className="flex items-start justify-between">
        <div>
          <p className="text-sm font-medium text-gray-400">{title}</p>
          <p className={`text-2xl font-bold mt-2 ${colors.text}`}>
            {value.toLocaleString()}
          </p>
        </div>
        <div className={`p-3 rounded-lg ${colors.bg}`}>
          <Icon className={`w-6 h-6 ${colors.text}`} />
        </div>
      </div>
    </motion.div>
  );
};

export default MetricCard;
