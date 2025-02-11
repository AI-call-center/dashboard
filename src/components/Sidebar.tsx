import { motion, AnimatePresence } from 'framer-motion';
import {
  HomeIcon,
  CogIcon,
  DocumentIcon,
  UserGroupIcon,
  ChartBarIcon,
  PhoneIcon,
  BriefcaseIcon,
  UserCircleIcon,
  Bars3Icon,
  XMarkIcon,
} from '@heroicons/react/24/outline';

interface SidebarProps {
  selectedMenu: string;
  onMenuSelect: (menu: string) => void;
  isMobileMenuOpen?: boolean;
  onMobileMenuToggle?: () => void;
}

const menuItems = [
  { name: 'Home', icon: HomeIcon },
  { name: 'Automation', icon: CogIcon },
  { name: 'Templates', icon: DocumentIcon },
  { name: 'Agents', icon: UserGroupIcon },
  { name: 'Campaigns', icon: ChartBarIcon },
  { name: 'Actions', icon: BriefcaseIcon },
  { name: 'Calls', icon: PhoneIcon },
  { name: 'Leads', icon: UserCircleIcon },
];

const Sidebar = ({ selectedMenu, onMenuSelect, isMobileMenuOpen, onMobileMenuToggle }: SidebarProps) => {
  return (
    <>
      {/* Mobile Menu Button */}
      <div className="lg:hidden fixed top-4 left-4 z-50">
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={onMobileMenuToggle}
          className="p-2 rounded-lg bg-dashboard-surface border border-gray-800"
        >
          {isMobileMenuOpen ? (
            <XMarkIcon className="w-6 h-6 text-white" />
          ) : (
            <Bars3Icon className="w-6 h-6 text-white" />
          )}
        </motion.button>
      </div>

      {/* Sidebar */}
      <AnimatePresence>
        {(isMobileMenuOpen || window.innerWidth >= 1024) && (
          <motion.div
            initial={{ x: -280, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            exit={{ x: -280, opacity: 0 }}
            transition={{ type: 'spring', stiffness: 300, damping: 30 }}
            className={`fixed lg:relative top-0 left-0 h-full z-40 w-[280px] bg-dashboard-surface border-r border-gray-800 p-6 flex flex-col ${isMobileMenuOpen ? 'shadow-2xl' : ''}`}
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

        <div className="mt-8 mb-16 space-y-2">
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
            whileTap={{ scale: 0.95 }}
            onClick={() => onMenuSelect('Manage')}
            className={`w-full flex items-center px-4 py-2 ${selectedMenu === 'Manage' ? 'bg-dashboard-accent text-white animate-glow rounded-lg' : 'text-gray-400 hover:text-white'}`}
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

        <div className="relative group">
          <motion.div
            whileHover={{ scale: 1.05 }}
            className="flex items-center p-4 bg-dashboard-surface rounded-lg border border-gray-800 cursor-pointer"
          >
            <div className="w-10 h-10 rounded-full bg-dashboard-accent flex items-center justify-center text-white font-semibold">
              S
            </div>
            <div className="ml-3">
              <div className="text-sm font-medium text-white">User Profile</div>
              <div className="text-xs text-gray-400">View settings</div>
            </div>
          </motion.div>

          <div className="absolute bottom-full left-0 mb-2 w-full bg-gray-800 rounded-lg shadow-lg opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all">
            <motion.button
              whileHover={{ x: 5 }}
              onClick={() => onMenuSelect('Billing')}
              className="w-full px-4 py-2 text-left text-gray-300 hover:text-white hover:bg-gray-700 rounded-t-lg"
            >
              Billing
            </motion.button>
            <motion.button
              whileHover={{ x: 5 }}
              onClick={() => console.log('Logout clicked')}
              className="w-full px-4 py-2 text-left text-gray-300 hover:text-white hover:bg-gray-700 rounded-b-lg"
            >
              Logout
            </motion.button>
          </div>
        </div>
      </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Mobile Menu Overlay */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onMobileMenuToggle}
            className="fixed inset-0 bg-black/50 backdrop-blur-sm z-30 lg:hidden"
          />
        )}
      </AnimatePresence>
    </>
  );
};

export default Sidebar;
