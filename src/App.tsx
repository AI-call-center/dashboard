import { motion, AnimatePresence } from 'framer-motion';
import { useState } from 'react';
import Sidebar from './components/Sidebar';
import Dashboard from './components/Dashboard';
import AgentsPage from './components/AgentsPage';
import TemplatesPage from './components/TemplatesPage';
import CampaignsPage from './components/campaigns/CampaignsPage';
import CallsPage from './components/calls/CallsPage';
import AnimatedCursor from './components/AnimatedCursor';

function App() {
  const [selectedMenu, setSelectedMenu] = useState('Home');

  const renderContent = () => {
    switch (selectedMenu) {
      case 'Templates':
        return <TemplatesPage />;
      case 'Agents':
        return <AgentsPage />;
      case 'Campaigns':
        return <CampaignsPage />;
      case 'Calls':
        return <CallsPage />;
      default:
        return <Dashboard />;
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-dashboard-dark to-black text-white">
      <AnimatedCursor />
      <div className="flex">
        <Sidebar selectedMenu={selectedMenu} onMenuSelect={setSelectedMenu} />
        <main className="flex-1 overflow-y-auto">
          <AnimatePresence mode="wait">
            <motion.div
              key={selectedMenu}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.2 }}
            >
              {renderContent()}
            </motion.div>
          </AnimatePresence>
        </main>
      </div>
    </div>
  );
}

export default App;
