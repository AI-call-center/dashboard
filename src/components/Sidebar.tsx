import { motion } from 'framer-motion';
import {
  HomeIcon,
  CogIcon,
  DocumentIcon,
  UserGroupIcon,
  ChartBarIcon,
  PhoneIcon,
  BriefcaseIcon,
  UserCircleIcon,
} from '@heroicons/react/24/outline';

interface SidebarProps {
  selectedMenu: string;
  onMenuSelect: (menu: string) => void;
}

const menuItems = [
  { name: 'Home', icon: HomeIcon },
  { name: 'Automation', icon: CogIcon },
  { name: 'Templates', icon: DocumentIcon },
  { name: 'Agents', icon: UserGroupIcon },
  { name: 'Campaigns', icon: ChartBarIcon },
  { name: 'Actions', icon: BriefcaseIcon },
  { name: 'Calls', icon: PhoneIcon },
  { name: 'CRM', icon: UserCircleIcon },
];

const Sidebar = ({ selectedMenu, onMenuSelect }: SidebarProps) => {
  return (
    <motion.div
      initial={{ x: -280 }}
      animate={{ x: 0 }}
      className="w-70 bg-dashboard-surface border-r border-gray-800 p-6 flex flex-col"
    >
      <div className="flex-1">
        <motion.div
          className="text-2xl font-bold text-white mb-8"
          whileHover={{ scale: 1.05 }}
        >
          Dashboard
        </motion.div>

        <nav className="space-y-2">
          {menuItems.map((item) => (
            <motion.button
              key={item.name}
              whileHover={{ scale: 1.05, x: 5 }}
              whileTap={{ scale: 0.95 }}
              className={`w-full flex items-center px-4 py-3 rounded-lg text-left ${
                selectedMenu === item.name
                  ? 'bg-dashboard-accent text-white animate-glow'
                  : 'text-gray-400 hover:text-white'
              }`}
              onClick={() => onMenuSelect(item.name)}
            >
              <item.icon className="w-5 h-5 mr-3" />
              {item.name}
            </motion.button>
          ))}
        </nav>

        <div className="mt-8 space-y-2">
          <div className="text-sm font-semibold text-gray-400 mb-2">Phone numbers</div>
          <motion.button
            whileHover={{ scale: 1.05, x: 5 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => onMenuSelect('Buy Number')}
            className={`w-full flex items-center px-4 py-2 ${selectedMenu === 'Buy Number' ? 'bg-dashboard-accent text-white animate-glow rounded-lg' : 'text-gray-400 hover:text-white'}`}
          >
            <PhoneIcon className="w-5 h-5 mr-3" />
            Buy Number
          </motion.button>
          <motion.button
            whileHover={{ scale: 1.05, x: 5 }}
            className="w-full flex items-center px-4 py-2 text-gray-400 hover:text-white"
          >
            <CogIcon className="w-5 h-5 mr-3" />
            Manage
          </motion.button>
        </div>
      </div>

      <div className="mt-auto">
        <div className="mb-4">
          <div className="text-sm font-semibold text-gray-400 mb-2">Used (78%)</div>
          <div className="h-2 bg-gray-700 rounded-full overflow-hidden">
            <motion.div
              className="h-full bg-dashboard-accent"
              initial={{ width: 0 }}
              animate={{ width: '78%' }}
              transition={{ duration: 1 }}
            />
          </div>
        </div>

        <motion.div
          whileHover={{ scale: 1.05 }}
          className="flex items-center p-4 bg-dashboard-surface rounded-lg border border-gray-800"
        >
          <div className="w-10 h-10 rounded-full bg-dashboard-accent flex items-center justify-center text-white font-semibold">
            S
          </div>
          <div className="ml-3">
            <div className="text-sm font-medium text-white">User Profile</div>
            <div className="text-xs text-gray-400">View settings</div>
          </div>
        </motion.div>
      </div>
    </motion.div>
  );
};

export default Sidebar;
