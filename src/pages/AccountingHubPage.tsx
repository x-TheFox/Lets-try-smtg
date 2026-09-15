import React from 'react';
import { servicesData } from '../data/services';
import { DoubleBezel } from '../components/ui/DoubleBezel';
import { Badge } from '../components/ui/Badge';
import { ButtonInButton } from '../components/ui/ButtonInButton';
import { CheckCircle2, TrendingDown, Zap } from 'lucide-react';

interface AccountingHubPageProps {
  onOpenInquiry: () => void;
}

export const AccountingHubPage: React.FC<AccountingHubPageProps> = ({ onOpenInquiry }) => {
  const data = servicesData['accounting-hub'];

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
            Schedule Free Accounting Audit
          </ButtonInButton>
          <span className="text-xs font-mono text-agrya-slate-500">
            Cut operating overhead by up to 50%
          </span>
        </div>
      </section>

      {/* QUANTITATIVE COMPARISON CARD: THE 50% COST DELTA */}
      <section>
        <DoubleBezel className="w-full">
          <div className="p-6 sm:p-10">
            <div className="flex items-center gap-3 mb-6">
              <TrendingDown className="w-5 h-5 text-agrya-teal-600" />
              <h2 className="font-mono text-xs font-semibold uppercase tracking-wider text-agrya-slate-500">
                Operating Cost & Efficiency Benchmark
              </h2>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="p-5 rounded-2xl bg-agrya-slate-50 border border-agrya-slate-200/80 space-y-2">
                <div className="text-xs font-mono text-agrya-slate-500 uppercase">Legacy In-House Bookkeeping</div>
                <div className="text-2xl font-bold text-agrya-slate-900">High Overhead</div>
                <p className="text-xs text-agrya-slate-600 leading-relaxed">
                  Full-time accountant salaries, software licenses, attrition risk, training costs, and delayed month-end MIS filings.
                </p>
              </div>

              <div className="p-5 rounded-2xl bg-agrya-teal-50/70 border border-agrya-teal-200 space-y-2 relative overflow-hidden">
                <div className="text-xs font-mono text-agrya-teal-800 uppercase font-semibold">Agrya Accounting Hub</div>
                <div className="text-2xl font-bold text-agrya-teal-900">-50% Overhead</div>
                <p className="text-xs text-agrya-teal-900 leading-relaxed">
                  Partner CA oversight, automated continuous reconciliation, zero headcount friction, and audit-ready month-end close in 5 days.
                </p>
              </div>

              <div className="p-5 rounded-2xl bg-agrya-slate-50 border border-agrya-slate-200/80 space-y-2">
                <div className="text-xs font-mono text-agrya-slate-500 uppercase">Statutory Security</div>
                <div className="text-2xl font-bold text-agrya-slate-900">Zero Penalties</div>
                <p className="text-xs text-agrya-slate-600 leading-relaxed">
                  Automated GST, TDS, and advance tax scheduling guaranteed by senior Chartered Accountants.
                </p>
              </div>
            </div>
          </div>
        </DoubleBezel>
      </section>

      {/* DELIVERABLES MATRIX (BENTO) */}
      <section className="space-y-8">
        <div className="max-w-2xl">
          <div className="font-mono text-xs text-agrya-teal-700 font-semibold uppercase tracking-wider mb-2">
            Scope of Engagement
          </div>
          <h2 className="text-3xl font-extrabold text-agrya-slate-950 tracking-tight">
            Complete end-to-end accounting pipeline.
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {data.deliverables.map((item, idx) => (
            <DoubleBezel key={item.title} className="h-full group">
              <div className="p-6 sm:p-8 flex flex-col justify-between h-full">
                <div>
                  <div className="flex items-center justify-between mb-4">
                    <span className="font-mono text-xs px-2.5 py-1 rounded bg-agrya-slate-100 text-agrya-slate-800 font-medium">
                      Deliverable 0{idx + 1}
                    </span>
                    <CheckCircle2 className="w-4 h-4 text-agrya-teal-600" />
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

      {/* SOFTWARE STACK & INTEGRATIONS */}
      <section>
        <DoubleBezel className="w-full">
          <div className="p-6 sm:p-10">
            <div className="flex items-center justify-between pb-6 border-b border-agrya-slate-100 mb-6">
              <div>
                <h3 className="text-lg font-bold text-agrya-slate-900">Supported Financial Platforms</h3>
                <p className="text-xs text-agrya-slate-500">We integrate seamlessly with your preferred ledger and ERP stack.</p>
              </div>
              <Zap className="w-5 h-5 text-agrya-teal-600" />
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 text-center">
              {['Tally Prime', 'Zoho Books', 'QuickBooks', 'Effortless OS'].map((soft) => (
                <div key={soft} className="p-4 rounded-xl bg-agrya-slate-50 border border-agrya-slate-100 text-xs font-bold text-agrya-slate-800 font-mono">
                  {soft}
                </div>
              ))}
            </div>
          </div>
        </DoubleBezel>
      </section>

      {/* BOTTOM CTA */}
      <section className="text-center max-w-xl mx-auto space-y-4 pt-6">
        <h2 className="text-2xl font-bold text-agrya-slate-900">Get your books in order.</h2>
        <p className="text-xs sm:text-sm text-agrya-slate-600">
          Cut operational costs and unlock continuous financial clarity. Talk to our partners today.
        </p>
        <div className="pt-2">
          <ButtonInButton variant="dark" iconType="arrow-right" onClick={onOpenInquiry}>
            Speak with an Agrya Partner
          </ButtonInButton>
        </div>
      </section>

    </div>
  );
};
