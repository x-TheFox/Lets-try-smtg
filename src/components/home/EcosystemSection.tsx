import React, { useState } from 'react';
import { ecosystemTools } from '../../data/ecosystem';
import { DoubleBezel } from '../ui/DoubleBezel';
import { ExternalLink, Layers, BarChart3, Clock, CheckCircle, ShieldCheck, Zap, Sparkles } from 'lucide-react';
import { clsx } from 'clsx';

export const EcosystemSection: React.FC = () => {
  const [activePreview, setActivePreview] = useState<'Effortless' | 'Actionboard' | 'Pulse'>('Effortless');

  const iconMap: Record<string, React.ReactNode> = {
    'Effortless': <Layers className="w-5 h-5 text-agrya-teal-600" />,
    'Actionboard': <BarChart3 className="w-5 h-5 text-blue-600" />,
    'Pulse': <Clock className="w-5 h-5 text-indigo-600" />,
  };

  const previewTelemetry = {
    Effortless: {
      title: 'Effortless — The All-In-One Growth Platform for Indian SMBs',
      tagline: 'Automating billing, expenses, and cashflow with Tally Prime sync (bi-directional on ledger classes A-D)',
      badge: 'Integrated Partner Platform',
      stat1: { label: '3-Way Match', value: 'PO+GRN+Bill' },
      stat2: { label: 'Tally Sync', value: 'Bi-Directional' },
      stat3: { label: 'AI Tax Guard', value: 'ITC / TDS Validated' },
      features: [
        'Automated bi-directional Tally sync — create in Effortless, reflected in Tally Prime across core ledgers',
        'AI-powered 3-way reconciliation automatically matching POs, GRNs, and vendor bills',
        'AI Tax Guard preventing expense leakages with structured governance & approvals',
        'The CFO’s Consolidated Payment Deck with real-time cashflow, payables, and WhatsApp snapshots'
      ],
      mockupLabel: 'Effortless Tally & Procurement Stream',
      mockupStatus: 'Tally Prime Connected • Bi-Directional Sync Active',
      subnote: 'Multi-Branch & Cost Centre Control • Clean Tally Masters Enforced',
      ctaUrl: 'https://www.goeffortless.co'
    },
    Actionboard: {
      title: 'Actionboard — AI Finance Software for the CFO’s Office',
      tagline: 'Runs the CFO’s office on PharOS: live ledger reporting, procurement, and order-to-cash',
      badge: 'Agrya Technology Partner',
      stat1: { label: 'PharOS Engine', value: 'Live Ledger AI' },
      stat2: { label: 'Consolidation', value: 'Multi-Entity' },
      stat3: { label: 'Order-to-Cash', value: 'Automated' },
      features: [
        'Live ledger financial reporting and multi-entity consolidation running directly on your live books',
        'End-to-end procure-to-pay workflow with integrated approval chains and spend governance',
        'Automated invoicing and order-to-cash pipelines to compress DSO and accelerate collections',
        'Architected and governed by Chartered Accountants for institutional audit defense'
      ],
      mockupLabel: 'Actionboard PharOS Executive Console',
      mockupStatus: 'Live Ledger Connected • Consolidated P&L Active',
      subnote: 'Built by Chartered Accountants • Headquartered in Chennai',
      ctaUrl: 'https://www.myactionboard.com'
    },
    Pulse: {
      title: 'Pulse — Bridge the Gap Between Costs and Time Spent',
      tagline: 'Built by Actionboard (Agrya tech subsidiary) for cost-efficient service organizations',
      badge: 'Agrya Tech Subsidiary',
      stat1: { label: 'Budget Guard', value: 'Projects in Red' },
      stat2: { label: 'Time Tracking', value: 'Daily Reminders' },
      stat3: { label: 'Profit Visibility', value: 'Project P&L' },
      features: [
        'Setup time budgets for client projects and flag "projects in the red" before margins erode',
        'Daily automated reminders to record time with simple, intuitive manager approval workflows',
        'Granular reporting: Project Profitability, Attendance, Idle Time, and Member Activity reports',
        'Daily updates and early warning alerts dispatched directly to practice leaders'
      ],
      mockupLabel: 'Pulse Service Profitability Radar',
      mockupStatus: 'Time Budgets Enforced • Red-Project Radar Active',
      subnote: 'Product Advisors: Jayakumar M & Priya Raghavan (Agrya) • Access: jk@agrya.in',
      ctaUrl: 'https://pulse.myactionboard.com'
    }
  };

  const currentPreview = previewTelemetry[activePreview];

  return (
    <section id="ecosystem" className="max-w-6xl mx-auto px-6 py-20 border-t border-agrya-slate-200/80">
      
      {/* SECTION HEADER */}
      <div className="max-w-3xl mb-12">
        <div className="font-mono text-xs text-agrya-teal-700 font-semibold uppercase tracking-wider mb-2">
          Technology Infrastructure
        </div>
        <h2 className="text-3xl sm:text-4xl font-extrabold text-agrya-slate-950 tracking-tight mb-4">
          Powered by Intelligence
        </h2>
        <p className="text-agrya-slate-600 text-sm sm:text-base leading-relaxed">
          We don’t just use software; we build ecosystems. Our proprietary tech subsidiaries and partner platforms give you an unfair advantage in financial visibility and operational control.
        </p>
      </div>

      {/* ECOSYSTEM CARDS */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10">
        {ecosystemTools.map((tool) => (
          <DoubleBezel key={tool.name} className="h-full group">
            <div className="p-6 sm:p-7 flex flex-col justify-between h-full">
              <div>
                <div className="flex items-center justify-between mb-4">
                  <div className="w-10 h-10 rounded-xl bg-agrya-slate-50 border border-agrya-slate-200/80 flex items-center justify-center group-hover:scale-105 spring-snappy">
                    {iconMap[tool.name]}
                  </div>
                  {tool.isSubsidiary ? (
                    <span className="inline-flex items-center gap-1 font-mono text-[10px] px-2 py-0.5 rounded-full bg-agrya-teal-50 text-agrya-teal-800 font-bold border border-agrya-teal-200">
                      <Sparkles className="w-2.5 h-2.5 text-agrya-teal-600" />
                      Agrya Tech Subsidiary
                    </span>
                  ) : (
                    <span className="font-mono text-[11px] text-agrya-slate-400 font-medium">
                      {tool.category}
                    </span>
                  )}
                </div>

                <div className="mb-2">
                  <h3 className="text-xl font-bold text-agrya-slate-900 group-hover:text-agrya-teal-700 spring-standard transition-colors">
                    {tool.name}
                  </h3>
                  <div className="text-xs font-semibold text-agrya-teal-700 font-mono mt-0.5">
                    {tool.tagline}
                  </div>
                </div>

                <p className="text-agrya-slate-600 text-xs sm:text-sm leading-relaxed mb-6 pt-2">
                  {tool.description}
                </p>
              </div>

              <div className="pt-4 border-t border-agrya-slate-100 flex items-center justify-between">
                <a
                  href={tool.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-xs font-semibold text-agrya-slate-900 hover:text-agrya-teal-700 flex items-center gap-1.5 transition-colors group-hover:translate-x-0.5 spring-snappy"
                >
                  <span>Launch Platform</span>
                  <ExternalLink className="w-3.5 h-3.5 text-agrya-slate-400 group-hover:text-agrya-teal-700" />
                </a>
                <span className="text-[10px] font-mono text-agrya-slate-400">
                  {tool.isSubsidiary ? 'Agrya Proprietary' : 'Integrated Partner'}
                </span>
              </div>
            </div>
          </DoubleBezel>
        ))}
      </div>

      {/* INTERACTIVE ECOSYSTEM SIMULATOR CONSOLE */}
      <DoubleBezel className="w-full">
        <div className="p-6 sm:p-8">
          
          <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-6 border-b border-agrya-slate-100 gap-4">
            <div>
              <div className="flex items-center gap-2 mb-1">
                <Zap className="w-4 h-4 text-agrya-teal-600" />
                <span className="font-mono text-xs font-bold uppercase tracking-wider text-agrya-slate-700">
                  Authentic Platform Architecture Simulator
                </span>
              </div>
              <p className="text-xs text-agrya-slate-500">
                Explore real capabilities, modules, and data protocols extracted directly from each platform.
              </p>
            </div>

            {/* TAB SELECTOR */}
            <div className="flex items-center p-1 rounded-xl bg-agrya-slate-100 border border-agrya-slate-200 text-xs font-semibold">
              {(['Effortless', 'Actionboard', 'Pulse'] as const).map((tab) => (
                <button
                  key={tab}
                  onClick={() => setActivePreview(tab)}
                  className={clsx(
                    "px-3.5 py-1.5 rounded-lg spring-snappy transition-all",
                    activePreview === tab
                      ? "bg-white text-agrya-slate-900 shadow-sm"
                      : "text-agrya-slate-500 hover:text-agrya-slate-900"
                  )}
                >
                  {tab}
                </button>
              ))}
            </div>
          </div>

          {/* TELEMETRY BODY */}
          <div key={activePreview} className="pt-6 grid grid-cols-1 lg:grid-cols-12 gap-6 animate-metric">
            
            {/* LEFT: METRICS & FEATURES (7 COLS) */}
            <div className="lg:col-span-7 space-y-6">
              <div>
                <span className="font-mono text-xs text-agrya-teal-700 font-semibold uppercase tracking-wider">
                  {currentPreview.badge}
                </span>
                <h4 className="text-lg font-bold text-agrya-slate-900 mt-1">
                  {currentPreview.title}
                </h4>
                <p className="text-xs text-agrya-slate-600 mt-1">
                  {currentPreview.tagline}
                </p>
              </div>

              {/* 3 STAT TILES */}
              <div className="grid grid-cols-3 gap-3">
                <div className="p-3.5 rounded-xl bg-agrya-slate-50 border border-agrya-slate-200/70">
                  <div className="text-[10px] font-mono text-agrya-slate-400 uppercase">{currentPreview.stat1.label}</div>
                  <div className="text-sm sm:text-base font-mono font-extrabold text-agrya-slate-900 mt-0.5">
                    {currentPreview.stat1.value}
                  </div>
                </div>
                <div className="p-3.5 rounded-xl bg-agrya-slate-50 border border-agrya-slate-200/70">
                  <div className="text-[10px] font-mono text-agrya-slate-400 uppercase">{currentPreview.stat2.label}</div>
                  <div className="text-sm sm:text-base font-mono font-extrabold text-agrya-teal-700 mt-0.5">
                    {currentPreview.stat2.value}
                  </div>
                </div>
                <div className="p-3.5 rounded-xl bg-agrya-slate-50 border border-agrya-slate-200/70">
                  <div className="text-[10px] font-mono text-agrya-slate-400 uppercase">{currentPreview.stat3.label}</div>
                  <div className="text-sm sm:text-base font-mono font-extrabold text-agrya-slate-900 mt-0.5">
                    {currentPreview.stat3.value}
                  </div>
                </div>
              </div>

              {/* AUTHENTIC FEATURES LIST */}
              <div className="space-y-2.5">
                {currentPreview.features.map((feat) => (
                  <div key={feat} className="flex items-start gap-2.5 text-xs text-agrya-slate-600">
                    <CheckCircle className="w-4 h-4 text-agrya-teal-600 shrink-0 mt-0.5" />
                    <span>{feat}</span>
                  </div>
                ))}
              </div>

              <div className="pt-2">
                <a
                  href={currentPreview.ctaUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1.5 text-xs font-semibold text-agrya-teal-700 hover:text-agrya-teal-800 transition-colors"
                >
                  <span>Visit {activePreview} Official Website</span>
                  <ExternalLink className="w-3.5 h-3.5" />
                </a>
              </div>
            </div>

            {/* RIGHT: MOCKUP HUD CARD (5 COLS) */}
            <div className="lg:col-span-5 rounded-2xl bg-agrya-slate-900 p-5 text-white flex flex-col justify-between border border-agrya-slate-800 relative overflow-hidden">
              <div className="relative z-10">
                <div className="flex items-center justify-between pb-4 border-b border-agrya-slate-800">
                  <div className="flex items-center gap-2">
                    <div className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                    <span className="font-mono text-[11px] text-agrya-slate-300">
                      {currentPreview.mockupLabel}
                    </span>
                  </div>
                  <ShieldCheck className="w-4 h-4 text-agrya-teal-400" />
                </div>

                <div className="pt-5 space-y-4">
                  <div className="p-3 rounded-xl bg-agrya-slate-800/80 border border-agrya-slate-700/60 font-mono text-xs">
                    <div className="text-[10px] text-agrya-slate-400 uppercase">Live Engine Telemetry</div>
                    <div className="text-emerald-400 font-semibold mt-0.5 text-xs">
                      {currentPreview.mockupStatus}
                    </div>
                  </div>

                  <div className="p-3 rounded-xl bg-agrya-slate-800/50 border border-agrya-slate-700/40 text-xs text-agrya-slate-300 space-y-1">
                    <div className="flex justify-between text-[11px] text-agrya-slate-400 font-mono">
                      <span>Architecture Note</span>
                      <span className="text-agrya-teal-400">ICAI Fellows on Staff</span>
                    </div>
                    <div className="text-[11px] text-agrya-slate-300 leading-relaxed font-mono">
                      {currentPreview.subnote}
                    </div>
                  </div>
                </div>
              </div>

              <div className="pt-6 relative z-10">
                <div className="text-[10px] font-mono text-agrya-slate-500 uppercase tracking-wider">
                  Verified Against Official Product Documentation
                </div>
              </div>

              {/* AMBIENT GLOW */}
              <div className="absolute -bottom-10 -right-10 w-36 h-36 bg-agrya-teal-500/10 rounded-full blur-2xl pointer-events-none" />
            </div>

          </div>

        </div>
      </DoubleBezel>

    </section>
  );
};
