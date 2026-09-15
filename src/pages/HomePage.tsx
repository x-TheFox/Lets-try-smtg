import React from 'react';
import { HeroCommandCenter } from '../components/home/HeroCommandCenter';
import { ExpertiseBento } from '../components/home/ExpertiseBento';
import { EcosystemSection } from '../components/home/EcosystemSection';
import { CtaBanner } from '../components/home/CtaBanner';

interface HomePageProps {
  onNavigate: (path: string) => void;
  onOpenInquiry: () => void;
}

export const HomePage: React.FC<HomePageProps> = ({ onNavigate, onOpenInquiry }) => {
  return (
    <div className="space-y-4">
      <HeroCommandCenter onNavigate={onNavigate} onOpenInquiry={onOpenInquiry} />
      <ExpertiseBento onNavigate={onNavigate} />
      <EcosystemSection />
      <CtaBanner onOpenInquiry={onOpenInquiry} />
    </div>
  );
};
