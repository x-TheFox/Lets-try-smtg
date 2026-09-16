import React, { useState } from 'react';
import { DoubleBezel } from '../ui/DoubleBezel';
import { ButtonInButton } from '../ui/ButtonInButton';
import { Badge } from '../ui/Badge';
import { ArrowRight, Activity, TrendingUp, ShieldCheck, PieChart } from 'lucide-react';
import { clsx } from 'clsx';

interface HeroCommandCenterProps {
  onNavigate: (path: string) => void;
  onOpenInquiry: () => void;
}

type StageMode = 'seed' | 'growth' | 'enterprise';

export const HeroCommandCenter: React.FC<HeroCommandCenterProps> = ({
  onNavigate,
  onOpenInquiry
}) => {
  const [activeStage, setActiveStage] = useState<StageMode>('growth');

  const stageData = {
    seed: {
      label: 'Early / Seed Stage',
      runway: '18.4 Mo',
      runwayDelta: '+3.5 Mo modeled extension',
      burn: '1.1x',
      burnLabel: 'Controlled Seed Burn',
      statutory: '100%',
      statutoryLabel: 'Target Zero Penalty Tracking',
      savings: 'Up to -45%',
      savingsLabel: 'Clean Bookkeeping Pod',
      recommendation: 'Virtual CFO Advisory + Accounting Hub Setup',
      route: '/cfo'
    },
    growth: {
      label: 'Series A-B Growth Scale',
      runway: '24.2 Mo',
      runwayDelta: '+4.2 Mo modeled runway',
      burn: '0.82x',
      burnLabel: 'Target Capital Efficiency',
      statutory: '100%',
      statutoryLabel: 'Full ROC & Tax Governance',
      savings: 'Up to -50%',
      savingsLabel: 'Accounting Hub Automation',
      recommendation: 'Dynamic FP&A + Investor Data-Room + Full MIS',
      route: '/cfo'
    },
    enterprise: {
      label: 'Profitable Scale / Enterprise',
      runway: '36+ Mo',
      runwayDelta: 'Sustained Cash Inflows',
      burn: '0.45x',
      burnLabel: 'High Operating Leverage',
      statutory: '100%',
      statutoryLabel: 'Big-Four Audit Readiness',
      savings: 'Up to -55%',
      savingsLabel: 'In-House Pod Optimization',
      recommendation: 'CFO Support Pods & AP/AR Force Multiplication',
      route: '/cfo-support'
    }
  };

  const current = stageData[activeStage];

  return (
    <section className="relative max-w-6xl mx-auto px-6 pt-12 pb-20">
      
      {/* INTRO HERO COPY */}
      <div className="max-w-3xl">
        <Badge pulse variant="teal" className="mb-6">
          The Financial OS for Modern Business
        </Badge>
        
        <h1 className="text-4xl sm:text-6xl font-extrabold tracking-tight text-agrya-slate-950 leading-[1.08] mb-6">
          Financial clarity for <br />
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-agrya-teal-700 to-agrya-slate-900">
            modern business
          </span>
        </h1>
        
        <p className="text-base sm:text-xl text-agrya-slate-600 leading-relaxed font-normal mb-8 max-w-2xl">
          Agrya combines expert Virtual CFO services with intelligence-driven accounting to help you scale faster and smarter.
        </p>

        <div className="flex flex-wrap items-center gap-4">
          <ButtonInButton
            variant="primary"
            iconType="arrow-right"
            onClick={() => onNavigate('/cfo')}
          >
            Explore Services
          </ButtonInButton>

          <button
            onClick={() => onNavigate('/story')}
            className="inline-flex items-center gap-2 bg-white hover:bg-agrya-slate-50 border border-agrya-slate-200 text-agrya-slate-800 px-6 py-2.5 rounded-full text-xs sm:text-sm font-semibold spring-snappy shadow-sm"
          >
            Our Story
          </button>
        </div>
      </div>

      {/* SIGNATURE INTERACTION: TACTILE FINANCIAL TELEMETRY COMMAND CENTER */}
      <div className="mt-14">
        <DoubleBezel className="w-full">
          <div className="p-5 sm:p-8">
            
            {/* CONSOLE HEADER & STAGE SWITCHER */}
            <div className="flex flex-col lg:flex-row lg:items-center justify-between pb-6 border-b border-agrya-slate-100 gap-4">
              <div className="flex flex-wrap items-center gap-3">
                <div className="flex items-center gap-2">
                  <div className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-pulse" />
                  <span className="font-mono text-xs font-semibold uppercase tracking-wider text-agrya-slate-700">
                    Agrya Financial Telemetry Console
                  </span>
                </div>
                <span className="text-[10px] font-mono px-2.5 py-0.5 rounded-md bg-agrya-teal-50 text-agrya-teal-800 border border-agrya-teal-200/80 font-medium">
                  Illustrative Telemetry • Modeled Client Archetype
                </span>
              </div>

              {/* STAGE TOGGLES */}
              <div className="flex items-center p-1 rounded-xl bg-agrya-slate-100 border border-agrya-slate-200 text-xs font-semibold overflow-x-auto">
                <button
                  onClick={() => setActiveStage('seed')}
                  className={clsx(
                    "px-3 py-1.5 rounded-lg spring-snappy transition-all whitespace-nowrap",
                    activeStage === 'seed' 
                      ? "bg-white text-agrya-slate-900 shadow-sm" 
                      : "text-agrya-slate-500 hover:text-agrya-slate-900"
                  )}
                >
                  Seed Stage
                </button>
                <button
                  onClick={() => setActiveStage('growth')}
                  className={clsx(
                    "px-3 py-1.5 rounded-lg spring-snappy transition-all whitespace-nowrap",
                    activeStage === 'growth' 
                      ? "bg-white text-agrya-slate-900 shadow-sm" 
                      : "text-agrya-slate-500 hover:text-agrya-slate-900"
                  )}
                >
                  Series A/B Growth
                </button>
                <button
                  onClick={() => setActiveStage('enterprise')}
                  className={clsx(
                    "px-3 py-1.5 rounded-lg spring-snappy transition-all whitespace-nowrap",
                    activeStage === 'enterprise' 
                      ? "bg-white text-agrya-slate-900 shadow-sm" 
                      : "text-agrya-slate-500 hover:text-agrya-slate-900"
                  )}
                >
                  Enterprise Pods
                </button>
              </div>
            </div>

            {/* TELEMETRY CARDS (4 METRICS) */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 pt-6">
              
              {/* METRIC 1: RUNWAY */}
              <div className="p-5 rounded-2xl bg-agrya-slate-50/80 border border-agrya-slate-100 relative overflow-hidden group hover:border-agrya-teal-200 spring-standard hover-lift">
                <div className="flex items-center justify-between text-agrya-slate-400 mb-2">
                  <span className="text-xs font-mono uppercase">Modeled Cash Runway</span>
                  <Activity className="w-4 h-4 text-agrya-teal-600" />
                </div>
                <div key={`${activeStage}-runway`} className="animate-metric">
                  <div className="text-3xl font-extrabold font-mono text-agrya-slate-900 tracking-tight">
                    {current.runway}
                  </div>
                  <div className="text-xs text-emerald-600 font-medium mt-1">
                    ↑ {current.runwayDelta}
                  </div>
                </div>
              </div>

              {/* METRIC 2: BURN MULTIPLE */}
              <div className="p-5 rounded-2xl bg-agrya-slate-50/80 border border-agrya-slate-100 relative overflow-hidden group hover:border-agrya-teal-200 spring-standard hover-lift">
                <div className="flex items-center justify-between text-agrya-slate-400 mb-2">
                  <span className="text-xs font-mono uppercase">Burn Multiple (Modeled)</span>
                  <TrendingUp className="w-4 h-4 text-agrya-teal-600" />
                </div>
                <div key={`${activeStage}-burn`} className="animate-metric">
                  <div className="text-3xl font-extrabold font-mono text-agrya-slate-900 tracking-tight">
                    {current.burn}
                  </div>
                  <div className="text-xs text-agrya-slate-600 font-medium mt-1">
                    {current.burnLabel}
                  </div>
                </div>
              </div>

              {/* METRIC 3: STATUTORY INTEGRITY */}
              <div className="p-5 rounded-2xl bg-agrya-slate-50/80 border border-agrya-slate-100 relative overflow-hidden group hover:border-agrya-teal-200 spring-standard hover-lift">
                <div className="flex items-center justify-between text-agrya-slate-400 mb-2">
                  <span className="text-xs font-mono uppercase">Statutory Governance</span>
                  <ShieldCheck className="w-4 h-4 text-agrya-teal-600" />
                </div>
                <div key={`${activeStage}-statutory`} className="animate-metric">
                  <div className="text-3xl font-extrabold font-mono text-agrya-slate-900 tracking-tight">
                    {current.statutory}
                  </div>
                  <div className="text-xs text-agrya-slate-600 font-medium mt-1">
                    {current.statutoryLabel}
                  </div>
                </div>
              </div>

              {/* METRIC 4: OVERHEAD COMPRESSION */}
              <div className="p-5 rounded-2xl bg-agrya-slate-50/80 border border-agrya-slate-100 relative overflow-hidden group hover:border-agrya-teal-200 spring-standard hover-lift">
                <div className="flex items-center justify-between text-agrya-slate-400 mb-2">
                  <span className="text-xs font-mono uppercase">Cost Compression (Target)</span>
                  <PieChart className="w-4 h-4 text-agrya-teal-600" />
                </div>
                <div key={`${activeStage}-savings`} className="animate-metric">
                  <div className="text-3xl font-extrabold font-mono text-agrya-teal-700 tracking-tight">
                    {current.savings}
                  </div>
                  <div className="text-xs text-agrya-teal-800 font-medium mt-1">
                    {current.savingsLabel}
                  </div>
                </div>
              </div>

            </div>

            {/* INTERACTIVE RECOMMENDATION ACTION STRIP */}
            <div className="mt-6 p-4 rounded-2xl bg-agrya-teal-50/60 border border-agrya-teal-100 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div className="text-xs sm:text-sm text-agrya-slate-800">
                <span className="font-bold text-agrya-teal-900">Recommended Service Architecture:</span>{' '}
                {current.recommendation}
              </div>
              <div className="flex items-center gap-2">
                <button
                  onClick={() => onNavigate(current.route)}
                  className="px-4 py-2 bg-agrya-teal-700 hover:bg-agrya-teal-800 text-white rounded-xl text-xs font-semibold spring-snappy flex items-center gap-1.5"
                >
                  <span>Explore Architecture</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
                <button
                  onClick={onOpenInquiry}
                  className="px-4 py-2 bg-white hover:bg-agrya-slate-50 border border-agrya-slate-200 text-agrya-slate-800 rounded-xl text-xs font-semibold spring-snappy"
                >
                  Consult Partner
                </button>
              </div>
            </div>

            {/* FOOTNOTE DISCLAIMER */}
            <p className="mt-3 text-[11px] font-mono text-agrya-slate-400 text-center sm:text-left">
              * Illustrative operator telemetry based on typical Series A/B client financial models. Past performance is modeled; individual outcomes vary by operational velocity.
            </p>

          </div>
        </DoubleBezel>
      </div>

    </section>
  );
};
