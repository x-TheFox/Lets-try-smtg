import { useState, useEffect } from 'react';
import { Navbar } from './components/layout/Navbar';
import { Footer } from './components/layout/Footer';
import { InquiryModal } from './components/layout/InquiryModal';

import { HomePage } from './pages/HomePage';
import { AccountingHubPage } from './pages/AccountingHubPage';
import { CfoPage } from './pages/CfoPage';
import { CfoSupportPage } from './pages/CfoSupportPage';
import { StoryPage } from './pages/StoryPage';
import { TeamPage } from './pages/TeamPage';
import { NotFoundPage } from './pages/NotFoundPage';

export function App() {
  const [currentPath, setCurrentPath] = useState<string>(() => {
    return window.location.pathname || '/';
  });
  const [isInquiryOpen, setIsInquiryOpen] = useState<boolean>(false);
  const [inquiryService, setInquiryService] = useState<string>('Virtual CFO');
  const [inquiryPartner, setInquiryPartner] = useState<string | undefined>(undefined);

  // Handle browser back/forward buttons
  useEffect(() => {
    const handlePopState = () => {
      setCurrentPath(window.location.pathname || '/');
    };
    window.addEventListener('popstate', handlePopState);
    return () => window.removeEventListener('popstate', handlePopState);
  }, []);

  // Update Page Title and Meta Tags on route changes for SEO Parity
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'instant' });

    const titles: Record<string, string> = {
      '/': 'Agrya | The Financial OS for Modern Business',
      '/accounting-hub': 'Accounting Hub | Agrya Consulting',
      '/cfo': 'Virtual CFO Services | Agrya Consulting',
      '/cfo-support': 'CFO Support & Execution Pods | Agrya Consulting',
      '/story': 'Our Story | Agrya Consulting',
      '/team': 'Leadership & Team | Agrya Consulting',
    };

    const descriptions: Record<string, string> = {
      '/': 'Agrya empowers growth-focused companies with expert Virtual CFO, Accounting, and financial intelligence services.',
      '/accounting-hub': 'Agrya’s Accounting Hub delivers real-time financial tracking, automated reconciliation, and audit-ready books.',
      '/cfo': 'Get the vision, discipline, and strategic clarity of an experienced Chief Financial Officer at a fraction of the cost.',
      '/cfo-support': 'Power your in-house finance team with expert execution. High-velocity financial modeling, compliance audits, and specialized project support.',
      '/story': 'Built by finance leaders for founders who build. The origin story and philosophy of Agrya Consulting.',
      '/team': 'Meet the experienced Fellows and Associates of ICAI leading Agrya’s Virtual CFO and accounting advisory practice.',
    };

    const targetTitle = titles[currentPath] || 'Agrya | The Financial OS for Modern Business';
    const targetDesc = descriptions[currentPath] || descriptions['/'];

    document.title = targetTitle;
    const metaDesc = document.querySelector('meta[name="description"]');
    if (metaDesc) {
      metaDesc.setAttribute('content', targetDesc);
    }
  }, [currentPath]);

  const navigate = (path: string) => {
    if (path !== currentPath) {
      window.history.pushState({}, '', path);
      setCurrentPath(path);
    }
  };

  const openInquiryForService = (serviceName: string) => {
    setInquiryService(serviceName);
    setInquiryPartner(undefined);
    setIsInquiryOpen(true);
  };

  const openInquiryForPartner = (partnerName?: string) => {
    setInquiryService('Executive Partner Consultation');
    setInquiryPartner(partnerName);
    setIsInquiryOpen(true);
  };

  // Route Resolver
  const renderRoute = () => {
    switch (currentPath) {
      case '/':
        return <HomePage onNavigate={navigate} onOpenInquiry={() => { setInquiryPartner(undefined); setIsInquiryOpen(true); }} />;
      case '/accounting-hub':
        return <AccountingHubPage onOpenInquiry={() => openInquiryForService('Accounting Hub')} />;
      case '/cfo':
        return <CfoPage onOpenInquiry={() => openInquiryForService('Virtual CFO')} />;
      case '/cfo-support':
        return <CfoSupportPage onOpenInquiry={() => openInquiryForService('CFO Support')} />;
      case '/story':
        return <StoryPage onOpenInquiry={() => { setInquiryPartner(undefined); setIsInquiryOpen(true); }} />;
      case '/team':
        return <TeamPage onOpenInquiry={openInquiryForPartner} />;
      default:
        return <NotFoundPage onNavigate={navigate} />;
    }
  };

  return (
    <div className="flex flex-col min-h-screen bg-[#FAFAFA] text-agrya-slate-900 selection:bg-agrya-teal-100 selection:text-agrya-teal-900 font-sans">
      
      {/* PERSISTENT FLOATING NAVIGATION */}
      <Navbar
        currentPath={currentPath}
        onNavigate={navigate}
        onOpenInquiry={() => { setInquiryPartner(undefined); setIsInquiryOpen(true); }}
      />

      {/* DYNAMIC ROUTE CONTAINER */}
      <main className="flex-1 w-full" id="main-content">
        {renderRoute()}
      </main>

      {/* FOOTER */}
      <Footer onNavigate={navigate} />

      {/* ACCESSIBLE INQUIRY DRAWER / MODAL */}
      <InquiryModal
        isOpen={isInquiryOpen}
        onClose={() => setIsInquiryOpen(false)}
        defaultService={inquiryService}
        partnerName={inquiryPartner}
      />

    </div>
  );
}

export default App;
