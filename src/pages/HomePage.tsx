import React from 'react';
import { HeroCommandCenter } from '../components/home/HeroCommandCenter';
import { ExpertiseBento } from '../components/home/ExpertiseBento';
import { CaseStudiesSection } from '../components/home/CaseStudiesSection';
import { EcosystemSection } from '../components/home/EcosystemSection';
import { CtaBanner } from '../components/home/CtaBanner';

interface HomePageProps {
  onNavigate: (path: string) => void;
  onOpenInquiry: () => void;
  onOpenDiagnostic?: () => void;
}

export const HomePage: React.FC<HomePageProps> = ({ onNavigate, onOpenInquiry, onOpenDiagnostic }) => {
  return (
    <div className="space-y-4">
      <HeroCommandCenter onNavigate={onNavigate} onOpenInquiry={onOpenInquiry} />
      <ExpertiseBento onNavigate={onNavigate} />
      <CaseStudiesSection onNavigate={onNavigate} onOpenInquiry={onOpenInquiry} />
      <EcosystemSection />
      <CtaBanner onOpenInquiry={onOpenInquiry} onOpenDiagnostic={onOpenDiagnostic} />
    </div>
  );
};

