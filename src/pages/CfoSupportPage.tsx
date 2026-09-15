import React from 'react';
import { servicesData } from '../data/services';
import { DoubleBezel } from '../components/ui/DoubleBezel';
import { Badge } from '../components/ui/Badge';
import { ButtonInButton } from '../components/ui/ButtonInButton';
import { Layers } from 'lucide-react';

interface CfoSupportPageProps {
  onOpenInquiry: () => void;
}

export const CfoSupportPage: React.FC<CfoSupportPageProps> = ({ onOpenInquiry }) => {
  const data = servicesData['cfo-support'];

  return (
    <div className="max-w-6xl mx-auto px-6 pt-12 pb-24 space-y-20">
      
      {/* HERO SECTION */}
      <section className="max-w-3xl">
        <Badge pulse variant="teal" className="mb-6">
          {data.badge}
        </Badge>

        <h1 className="text-4xl sm:text-6xl font-extrabold text-agrya-slate-950 tracking-tight leading-[1.1] mb-6">
          {data.tagline}
        </h1>

        <p className="text-base sm:text-xl text-agrya-slate-600 leading-relaxed font-normal mb-8 max-w-2xl">
          {data.heroDesc}
        </p>

        <div className="flex flex-wrap items-center gap-4">
          <ButtonInButton
            variant="primary"
            iconType="arrow-right"
            onClick={onOpenInquiry}
          >
            Request Support Proposal
          </ButtonInButton>
          <span className="text-xs font-mono text-agrya-slate-500">
            Elastic Team Capacity &bull; Zero Delay
          </span>
        </div>
      </section>

      {/* SUPPORT PODS ARCHITECTURE (BENTO) */}
      <section className="space-y-8">
        <div className="max-w-2xl">
          <div className="font-mono text-xs text-agrya-teal-700 font-semibold uppercase tracking-wider mb-2">
            Execution Horsepower
          </div>
          <h2 className="text-3xl font-extrabold text-agrya-slate-950 tracking-tight">
            Specialized execution pods for in-house finance teams.
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {data.deliverables.map((item, idx) => (
            <DoubleBezel key={item.title} className="h-full group">
              <div className="p-6 sm:p-8 flex flex-col justify-between h-full">
                <div>
                  <div className="flex items-center justify-between mb-4">
                    <span className="font-mono text-xs px-2.5 py-1 rounded bg-blue-50 text-blue-800 font-medium">
                      Execution Pod 0{idx + 1}
                    </span>
                    <Layers className="w-4 h-4 text-agrya-teal-600" />
                  </div>
                  <h3 className="text-xl font-bold text-agrya-slate-900 mb-2 group-hover:text-agrya-teal-700 transition-colors">
                    {item.title}
                  </h3>
                  <p className="text-agrya-slate-600 text-xs sm:text-sm leading-relaxed">
                    {item.description}
                  </p>
                </div>
              </div>
            </DoubleBezel>
          ))}
        </div>
      </section>

      {/* ENGAGEMENT MODELS */}
      <section>
        <DoubleBezel className="w-full">
          <div className="p-6 sm:p-10">
            <h3 className="text-lg font-bold text-agrya-slate-900 mb-2">Flexible Engagement Models</h3>
            <p className="text-xs sm:text-sm text-agrya-slate-600 mb-6">
              Tailored to plug directly into your current sprint cycles and corporate cadence.
            </p>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="p-5 rounded-2xl bg-agrya-slate-50 border border-agrya-slate-100 space-y-2">
                <div className="text-xs font-mono text-agrya-teal-700 font-bold uppercase">Sprint-Based</div>
                <div className="text-lg font-bold text-agrya-slate-900">Project Sprints</div>
                <p className="text-xs text-agrya-slate-600 leading-relaxed">
                  Time-boxed engagements for due diligence prep, Big 4 audit remediation, or ERP system migration.
                </p>
              </div>

              <div className="p-5 rounded-2xl bg-agrya-slate-50 border border-agrya-slate-100 space-y-2">
                <div className="text-xs font-mono text-agrya-teal-700 font-bold uppercase">Retainer Pod</div>
                <div className="text-lg font-bold text-agrya-slate-900">Ongoing Capacity</div>
                <p className="text-xs text-agrya-slate-600 leading-relaxed">
                  Dedicated auxiliary team members managing regular AP/AR runs, payroll cycles, and monthly statutory filings.
                </p>
              </div>

              <div className="p-5 rounded-2xl bg-agrya-slate-50 border border-agrya-slate-100 space-y-2">
                <div className="text-xs font-mono text-agrya-teal-700 font-bold uppercase">Advisory</div>
                <div className="text-lg font-bold text-agrya-slate-900">Special Projects</div>
                <p className="text-xs text-agrya-slate-600 leading-relaxed">
                  Strategic FP&A models for new business line launches, cross-border corporate structuring, and M&A evaluation.
                </p>
              </div>
            </div>
          </div>
        </DoubleBezel>
      </section>

      {/* BOTTOM CTA */}
      <section className="text-center max-w-xl mx-auto space-y-4 pt-6">
        <h2 className="text-2xl font-bold text-agrya-slate-900">Scale your in-house capacity.</h2>
        <p className="text-xs sm:text-sm text-agrya-slate-600">
          Overcome back-office bottlenecks and ensure institutional compliance. Talk to our partners.
        </p>
        <div className="pt-2">
          <ButtonInButton variant="dark" iconType="arrow-right" onClick={onOpenInquiry}>
            Discuss CFO Support Requirements
          </ButtonInButton>
        </div>
      </section>

    </div>
  );
};
