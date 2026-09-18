import React from 'react';
import { DoubleBezel } from '../ui/DoubleBezel';
import { ArrowRight, CheckCircle2, TrendingUp, ShieldCheck } from 'lucide-react';

interface CaseStudiesSectionProps {
  onNavigate: (path: string) => void;
  onOpenInquiry: () => void;
}

export const CaseStudiesSection: React.FC<CaseStudiesSectionProps> = ({
  onNavigate,
  onOpenInquiry
}) => {
  return (
    <section className="max-w-6xl mx-auto px-6 py-12 space-y-8">
      
      <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 border-b border-agrya-slate-200/80 pb-4">
        <div>
          <div className="font-mono text-xs text-agrya-teal-700 font-semibold uppercase tracking-wider mb-1">
            Substantiated Client Track Record
          </div>
          <h2 className="text-3xl font-extrabold text-agrya-slate-950 tracking-tight">
            Proven Results in High-Stakes Financial Navigation
          </h2>
        </div>
        <span className="font-mono text-xs text-agrya-slate-600 font-semibold">
          Historical Client Transformations • Audited Outcomes
        </span>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        
        {/* CASE STUDY 1: 15CR TO 75CR */}
        <DoubleBezel className="h-full group hover-lift">
          <div className="p-8 flex flex-col justify-between h-full space-y-6">
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <span className="text-[11px] font-mono font-bold uppercase tracking-wider px-3 py-1 rounded-full bg-agrya-teal-50 text-agrya-teal-800 border border-agrya-teal-200">
                  Rapid Scaling • 5x Growth
                </span>
                <TrendingUp className="w-5 h-5 text-agrya-teal-600" />
              </div>

              <h3 className="text-2xl sm:text-3xl font-bold text-agrya-slate-900 group-hover:text-agrya-teal-700 transition-colors">
                ₹15 Cr to ₹75 Cr Revenue
              </h3>

              <p className="text-sm text-agrya-slate-600 leading-relaxed">
                Over 4 years of dedicated Virtual CFO leadership, we partnered with founders to expand operations from 1 to 5 offices and scale headcount from 120 to 800+ employees.
              </p>

              <div className="grid grid-cols-2 gap-3 pt-2">
                {[
                  'Vendor cost reduction',
                  'Syndicated bank loans',
                  'USD 6mn Equity funding',
                  'M&A due diligence'
                ].map((item) => (
                  <div key={item} className="flex items-center text-xs text-agrya-slate-700 gap-2">
                    <CheckCircle2 className="w-3.5 h-3.5 text-agrya-teal-600 shrink-0" />
                    <span>{item}</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="pt-5 border-t border-agrya-slate-100 flex items-center justify-between">
              <button
                onClick={() => onNavigate('/cfo')}
                className="text-xs font-semibold text-agrya-slate-900 hover:text-agrya-teal-700 flex items-center gap-1.5 transition-colors"
              >
                <span>Read Virtual CFO Roadmap</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
              <span className="font-mono text-[11px] text-agrya-slate-600 font-semibold">4-Year Retainer</span>
            </div>
          </div>
        </DoubleBezel>

        {/* CASE STUDY 2: COMPLIANCE OVERHAUL */}
        <DoubleBezel className="h-full group hover-lift">
          <div className="p-8 flex flex-col justify-between h-full space-y-6">
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <span className="text-[11px] font-mono font-bold uppercase tracking-wider px-3 py-1 rounded-full bg-blue-50 text-blue-800 border border-blue-200">
                  Process Optimization & Restructuring
                </span>
                <ShieldCheck className="w-5 h-5 text-blue-600" />
              </div>

              <h3 className="text-2xl sm:text-3xl font-bold text-agrya-slate-900 group-hover:text-blue-700 transition-colors">
                Compliance Overhaul
              </h3>

              <p className="text-sm text-agrya-slate-600 leading-relaxed">
                We resolved broken compliance frameworks and historical revenue recognition challenges, turning around audit qualifications and enabling institutional debt syndication.
              </p>

              <div className="grid grid-cols-2 gap-3 pt-2">
                {[
                  'Resolved rev-rec issues',
                  'Fixed tax non-compliance',
                  'Raised ₹100Cr+ in debt',
                  'Supported facility expansion'
                ].map((item) => (
                  <div key={item} className="flex items-center text-xs text-agrya-slate-700 gap-2">
                    <CheckCircle2 className="w-3.5 h-3.5 text-blue-600 shrink-0" />
                    <span>{item}</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="pt-5 border-t border-agrya-slate-100 flex items-center justify-between">
              <button
                onClick={onOpenInquiry}
                className="text-xs font-semibold text-agrya-slate-900 hover:text-agrya-teal-700 flex items-center gap-1.5 transition-colors"
              >
                <span>Request Case Review</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
              <span className="font-mono text-[11px] text-agrya-slate-600 font-semibold">Debt & Audit Protocol</span>
            </div>
          </div>
        </DoubleBezel>

      </div>
    </section>
  );
};
