import { useState } from 'react';
import LeadsPage from './LeadsPage';
import NewLeadPage from './NewLeadPage';

type Page = 'list' | 'new';

const LeadsContainer = () => {
  const [currentPage, setCurrentPage] = useState<Page>('list');

  const handleNavigate = (page: Page) => {
    setCurrentPage(page);
  };

  if (currentPage === 'new') {
    return <NewLeadPage onBack={() => handleNavigate('list')} />;
  }

  return <LeadsPage onNavigate={handleNavigate} />;
};

export default LeadsContainer;
