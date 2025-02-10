import { motion, AnimatePresence } from 'framer-motion';
import { useState } from 'react';
import Sidebar from './components/Sidebar';
import Dashboard from './components/Dashboard';
import AgentsPage from './components/AgentsPage';
import TemplatesPage from './components/TemplatesPage';
import CampaignsPage from './components/campaigns/CampaignsPage';
import CallsPage from './components/calls/CallsPage';
import LeadsContainer from './components/leads/LeadsContainer';
import BuyPhonePage from './components/phone/BuyPhonePage';
import ManagePhonePage from './components/phone/ManagePhonePage';
import BillingPage from './components/billing/BillingPage';
import ActionsPage from './components/actions/ActionsPage';
import CRMPage from './components/crm/CRMPage';
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
      case 'CRM':
        return <LeadsContainer />;
      case 'Buy Number':
        return <BuyPhonePage />;
      case 'Manage':
        return <ManagePhonePage />;
      case 'Billing':
        return <BillingPage />;
      case 'Actions':
        return <ActionsPage />;
      case 'CRM':
        return <CRMPage />;
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
