import React from 'react';
import { DoubleBezel } from '../ui/DoubleBezel';
import { servicesData } from '../../data/services';
import { ArrowRight, CheckCircle2, LineChart, TrendingUp, Compass } from 'lucide-react';

interface ExpertiseBentoProps {
  onNavigate: (path: string) => void;
}

export const ExpertiseBento: React.FC<ExpertiseBentoProps> = ({ onNavigate }) => {
  const hub = servicesData['accounting-hub'];
  const cfo = servicesData['cfo'];
  const support = servicesData['cfo-support'];

  const cfoIcons = [LineChart, TrendingUp, Compass];

  return (
    <section id="services" className="max-w-6xl mx-auto px-6 py-20 border-t border-agrya-slate-200/80">
      
      {/* SECTION HEADER */}
      <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-6">
        <div>
          <div className="font-mono text-xs text-agrya-teal-700 font-semibold uppercase tracking-wider mb-2">
            Expertise
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-agrya-slate-950 tracking-tight">
            Comprehensive financial solutions
          </h2>
        </div>
        <p className="text-agrya-slate-600 text-sm sm:text-base max-w-md leading-relaxed">
          From day-to-day bookkeeping to high-level strategic planning, we cover the entire financial spectrum of your business.
        </p>
      </div>

      {/* ASYMMETRIC BENTO GRID */}
      <div className="grid grid-cols-1 md:grid-cols-12 gap-6">
        
        {/* CARD 1: ACCOUNTING HUB (7 COLS) */}
        <div className="md:col-span-7">
          <DoubleBezel className="h-full group">
            <div className="p-6 sm:p-8 flex flex-col justify-between h-full">
              <div>
                <div className="flex items-center justify-between mb-4">
                  <span className="font-mono text-xs px-2.5 py-1 rounded-md bg-agrya-teal-50 text-agrya-teal-800 font-semibold border border-agrya-teal-200/60">
                    Daily Operations • 01
                  </span>
                  <span className="font-mono text-xs text-agrya-slate-400">Save up to 50%</span>
                </div>

                <h3 className="text-2xl font-bold text-agrya-slate-900 mb-3 group-hover:text-agrya-teal-700 spring-standard transition-colors">
                  {hub.name}
                </h3>

                <p className="text-agrya-slate-600 text-sm leading-relaxed mb-6">
                  {hub.shortDesc}
                </p>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs text-agrya-slate-700 mb-8">
                  {hub.deliverables.map((d) => (
                    <div key={d.title} className="flex items-start gap-2">
                      <CheckCircle2 className="w-4 h-4 text-agrya-teal-600 shrink-0 mt-0.5" />
                      <span className="font-medium">{d.title}</span>
                    </div>
                  ))}
                </div>
              </div>

              <div className="pt-4 border-t border-agrya-slate-100 flex items-center justify-between">
                <button
                  onClick={() => onNavigate('/accounting-hub')}
                  className="text-xs font-semibold text-agrya-teal-700 hover:text-agrya-teal-900 flex items-center gap-1 group-hover:translate-x-0.5 spring-snappy"
                >
                  <span>Explore Accounting Hub</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
                <span className="text-xs font-mono text-agrya-slate-400">Audit-Ready Books</span>
              </div>
            </div>
          </DoubleBezel>
        </div>

        {/* CARD 2: VIRTUAL CFO (5 COLS) */}
        <div className="md:col-span-5">
          <DoubleBezel className="h-full group">
            <div className="p-6 sm:p-8 flex flex-col justify-between h-full">
              <div>
                <div className="flex items-center justify-between mb-4">
                  <span className="font-mono text-xs px-2.5 py-1 rounded-md bg-agrya-slate-100 text-agrya-slate-800 font-semibold border border-agrya-slate-200">
                    Strategic C-Suite • 02
                  </span>
                  <span className="font-mono text-xs text-agrya-teal-700 font-semibold">10x Multiplier</span>
                </div>

                <h3 className="text-2xl font-bold text-agrya-slate-900 mb-3 group-hover:text-agrya-teal-700 spring-standard transition-colors">
                  {cfo.name}
                </h3>

                <p className="text-agrya-slate-600 text-sm leading-relaxed mb-6">
                  {cfo.shortDesc}
                </p>

                <div className="space-y-3 text-xs text-agrya-slate-700 mb-8">
                  {cfo.deliverables.slice(0, 3).map((d, i) => {
                    const IconComp = cfoIcons[i % cfoIcons.length];
                    return (
                      <div key={d.title} className="flex items-start gap-2">
                        <IconComp className="w-4 h-4 text-agrya-teal-700 shrink-0 mt-0.5" />
                        <div>
                          <span className="font-bold text-agrya-slate-900">{d.title}:</span>{' '}
                          <span className="text-agrya-slate-600">{d.description.slice(0, 60)}...</span>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>

              <div className="pt-4 border-t border-agrya-slate-100 flex items-center justify-between">
                <button
                  onClick={() => onNavigate('/cfo')}
                  className="text-xs font-semibold text-agrya-slate-900 hover:text-agrya-teal-700 flex items-center gap-1 group-hover:translate-x-0.5 spring-snappy"
                >
                  <span>Explore Virtual CFO</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
                <span className="text-xs font-mono text-agrya-slate-400">On-Demand Advisory</span>
              </div>
            </div>
          </DoubleBezel>
        </div>

        {/* CARD 3: CFO SUPPORT (FULL 12 COLS) */}
        <div className="md:col-span-12">
          <DoubleBezel className="w-full group">
            <div className="p-6 sm:p-8 flex flex-col md:flex-row md:items-center justify-between gap-6">
              <div className="max-w-2xl">
                <div className="flex items-center gap-3 mb-2">
                  <span className="font-mono text-xs px-2.5 py-1 rounded-md bg-blue-50 text-blue-800 font-semibold border border-blue-200/60">
                    Execution Pods • 03
                  </span>
                  <span className="text-xs font-mono text-agrya-slate-400">In-House Force Multiplication</span>
                </div>

                <h3 className="text-2xl font-bold text-agrya-slate-900 mb-2 group-hover:text-agrya-teal-700 spring-standard transition-colors">
                  {support.name}
                </h3>

                <p className="text-agrya-slate-600 text-sm leading-relaxed">
                  {support.shortDesc}
                </p>
              </div>

              <div className="flex items-center gap-3 shrink-0">
                <button
                  onClick={() => onNavigate('/cfo-support')}
                  className="px-6 py-3 bg-agrya-slate-900 hover:bg-agrya-slate-800 text-white rounded-full text-xs sm:text-sm font-semibold spring-snappy shadow-sm flex items-center gap-2"
                >
                  <span>Scale Your In-House Team</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            </div>
          </DoubleBezel>
        </div>

      </div>

    </section>
  );
};
