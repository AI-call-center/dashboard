import { motion, AnimatePresence } from 'framer-motion';
import { useState, useEffect } from 'react';
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

import AnimatedCursor from './components/AnimatedCursor';
import OnboardingFlow from './components/onboarding/OnboardingFlow';

function App() {
  const [selectedMenu, setSelectedMenu] = useState('Home');
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [showOnboarding, setShowOnboarding] = useState(true);

  // Check if user has completed onboarding
  useEffect(() => {
    const hasCompletedOnboarding = localStorage.getItem('hasCompletedOnboarding');
    if (hasCompletedOnboarding) {
      setShowOnboarding(false);
    }
  }, []);

  const handleMenuSelect = (menu: string) => {
    setSelectedMenu(menu);
    setIsMobileMenuOpen(false);
  };

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
      case 'Leads':
        return <LeadsContainer />;
      case 'Buy Number':
        return <BuyPhonePage />;
      case 'Manage':
        return <ManagePhonePage />;
      case 'Billing':
        return <BillingPage />;
      case 'Actions':
        return <ActionsPage />;

      default:
        return <Dashboard />;
    }
  };

  const handleOnboardingComplete = () => {
    localStorage.setItem('hasCompletedOnboarding', 'true');
    setShowOnboarding(false);
  };

  if (showOnboarding) {
    return <OnboardingFlow onComplete={handleOnboardingComplete} />;
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-dashboard-dark to-black text-white overflow-x-hidden">
      <AnimatedCursor />
      <div className="flex relative">
        <Sidebar 
          selectedMenu={selectedMenu} 
          onMenuSelect={handleMenuSelect}
          isMobileMenuOpen={isMobileMenuOpen}
          onMobileMenuToggle={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
        />
        <main className="flex-1 overflow-y-auto pt-16 lg:pt-0">
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
