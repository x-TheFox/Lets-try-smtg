import React from 'react';
import { DoubleBezel } from '../components/ui/DoubleBezel';
import { Badge } from '../components/ui/Badge';
import { ButtonInButton } from '../components/ui/ButtonInButton';
import { CheckCircle2, Zap } from 'lucide-react';

interface AccountingHubPageProps {
  onOpenInquiry: () => void;
  onNavigate?: (path: string) => void;
}

export const AccountingHubPage: React.FC<AccountingHubPageProps> = ({ onOpenInquiry, onNavigate }) => {

  // Interactive ROI Forecasting State (Sprint 3)
  const [headcount, setHeadcount] = React.useState<number>(3);
  const [monthlySpend, setMonthlySpend] = React.useState<number>(150000); // INR
  const [transactionVolume, setTransactionVolume] = React.useState<number>(1200);

  // ROI Calculations
  const modeledSavings = Math.round(monthlySpend * 0.48);
  const annualSavingsLakhs = ((modeledSavings * 12) / 100000).toFixed(1);
  const hoursSavedPerMonth = headcount * 45;

  const suiteCategories = [
    {
      title: 'Accounts Receivable',
      icon: '💰',
      items: ['Customer Setup & Master Data', 'Invoice Preparation & Dispatch', 'Payment Application & Receipts', 'AR Aging & Collections Oversight']
    },
    {
      title: 'Accounts Payable',
      icon: '💳',
      items: ['Purchase Order Tracking', 'Vendor Setup & Master Approval', 'Bill Processing & 3-Way Match', 'Expense Management & Reconciliation']
    },
    {
      title: 'Banking & Treasury',
      icon: '🏦',
      items: ['Multi-Bank Reconciliations', 'Daily Transaction Recording', 'Petty Cash Management & Imprest', 'Payment Batching & Remittance']
    },
    {
      title: 'Inventory Accounting',
      icon: '📦',
      items: ['SKU Setup & Valuation Tracking', 'Cost Maintenance & COGS Review', 'Third-Party ERP & POS Integration', 'Periodic Inventory Adjustments & Stock Audits']
    },
    {
      title: 'Payroll Management',
      icon: '👥',
      items: ['Full-Service Monthly Payroll Runs', 'PF, ESI & Professional Tax Filings', 'Secure Employee Self-Service Portals', 'Investment Proof Validation & Form 16']
    },
    {
      title: 'Statutory Compliance',
      icon: '⚖️',
      items: ['Monthly GST Returns (GSTR-1, 3B, 9C)', 'TDS Computation & Quarterly Returns', 'Quarterly Advance Tax Estimation', 'Annual Regulatory Filings & ROC Support']
    }
  ];

  return (
    <div className="max-w-6xl mx-auto px-6 pt-12 pb-24 space-y-20">
      
      {/* HERO SECTION (VERBATIM LEGACY RESTORATION) */}
      <section className="max-w-3xl">
        <Badge pulse variant="teal" className="mb-6">
          Efficiency at Scale
        </Badge>

        <h1 className="text-4xl sm:text-6xl font-extrabold text-agrya-slate-950 tracking-tight leading-[1.1] mb-6">
          Accounting Hub
        </h1>

        <p className="text-base sm:text-xl text-agrya-slate-600 leading-relaxed font-normal mb-4 max-w-2xl">
          Low cost, tailor-made outsourcing for the modern enterprise. We handle the books; you build the business.
        </p>

        <p className="text-sm text-agrya-slate-500 leading-relaxed mb-8 max-w-2xl">
          We provide end-to-end bookkeeping services on multiple platforms including Tally, QuickBooks, and our proprietary cloud-based solution. Our robust processes ensure accuracy and full compliance.
        </p>

        <div className="flex flex-wrap items-center gap-4">
          <ButtonInButton
            variant="primary"
            iconType="arrow-right"
            onClick={onOpenInquiry}
          >
            Schedule Accounting Audit
          </ButtonInButton>
          <a
            href="mailto:jk@agrya.in?subject=Accounting%20Hub%20Inquiry%20-%20Agrya"
            className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full border border-agrya-slate-200 bg-white hover:bg-agrya-slate-50 text-agrya-slate-800 text-xs sm:text-sm font-semibold spring-snappy shadow-sm"
          >
            <span>Talk to Jayakumar (jk@agrya.in)</span>
          </a>
          <span className="text-xs font-mono text-agrya-slate-500">
            Cut operating overhead by up to 50% (Modeled)
          </span>
        </div>
      </section>

      {/* SPRINT 3: INTERACTIVE ROI & COST SAVINGS CALCULATOR */}
      <section>
        <DoubleBezel className="w-full">
          <div className="p-6 sm:p-10 space-y-8">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-6 border-b border-agrya-slate-100 gap-4">
              <div>
                <span className="font-mono text-xs text-agrya-teal-700 font-semibold uppercase tracking-wider">
                  Interactive Forecasting
                </span>
                <h2 className="text-2xl sm:text-3xl font-extrabold text-agrya-slate-950 tracking-tight mt-1">
                  Accounting Hub ROI & Savings Estimator
                </h2>
                <p className="text-xs sm:text-sm text-agrya-slate-500 mt-1">
                  Model your cost compression and time savings with Agrya's technology-driven bookkeeping pods.
                </p>
              </div>
              <span className="text-xs font-mono text-agrya-teal-800 bg-agrya-teal-50 px-3 py-1.5 rounded-lg border border-agrya-teal-200 shrink-0">
                Up to 50% Cost Delta
              </span>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
              
              {/* SLIDERS (7 COLS) */}
              <div className="lg:col-span-7 space-y-6">
                <div>
                  <div className="flex justify-between text-xs font-semibold text-agrya-slate-800 mb-2">
                    <span>Current In-House Accounting Staff</span>
                    <span className="font-mono font-bold text-agrya-slate-900">{headcount} Full-Time Staff</span>
                  </div>
                  <input
                    type="range"
                    min="1"
                    max="10"
                    step="1"
                    value={headcount}
                    onChange={(e) => setHeadcount(Number(e.target.value))}
                    className="w-full h-2 bg-agrya-slate-200 rounded-lg appearance-none cursor-pointer accent-agrya-teal-700"
                  />
                  <div className="flex justify-between text-[10px] font-mono text-agrya-slate-400 mt-1">
                    <span>1 Member</span>
                    <span>5 Members</span>
                    <span>10+ Members</span>
                  </div>
                </div>

                <div>
                  <div className="flex justify-between text-xs font-semibold text-agrya-slate-800 mb-2">
                    <span>Monthly In-House Finance Overhead</span>
                    <span className="font-mono font-bold text-agrya-slate-900">₹{(monthlySpend).toLocaleString('en-IN')} / mo</span>
                  </div>
                  <input
                    type="range"
                    min="40000"
                    max="600000"
                    step="20000"
                    value={monthlySpend}
                    onChange={(e) => setMonthlySpend(Number(e.target.value))}
                    className="w-full h-2 bg-agrya-slate-200 rounded-lg appearance-none cursor-pointer accent-agrya-teal-700"
                  />
                  <div className="flex justify-between text-[10px] font-mono text-agrya-slate-400 mt-1">
                    <span>₹40k / mo</span>
                    <span>₹3 Lakhs / mo</span>
                    <span>₹6 Lakhs / mo</span>
                  </div>
                </div>

                <div>
                  <div className="flex justify-between text-xs font-semibold text-agrya-slate-800 mb-2">
                    <span>Monthly Transaction & Invoice Volume</span>
                    <span className="font-mono font-bold text-agrya-slate-900">{transactionVolume.toLocaleString('en-IN')} Transactions</span>
                  </div>
                  <input
                    type="range"
                    min="200"
                    max="5000"
                    step="100"
                    value={transactionVolume}
                    onChange={(e) => setTransactionVolume(Number(e.target.value))}
                    className="w-full h-2 bg-agrya-slate-200 rounded-lg appearance-none cursor-pointer accent-agrya-teal-700"
                  />
                  <div className="flex justify-between text-[10px] font-mono text-agrya-slate-400 mt-1">
                    <span>200</span>
                    <span>2,500</span>
                    <span>5,000+</span>
                  </div>
                </div>
              </div>

              {/* READOUT CARD (5 COLS) */}
              <div className="lg:col-span-5 p-6 rounded-2xl bg-agrya-slate-900 text-white space-y-5">
                <div>
                  <span className="text-[11px] font-mono text-agrya-teal-400 uppercase tracking-wider">
                    Projected Annual Cost Reduction
                  </span>
                  <div className="text-4xl font-extrabold font-mono text-white tracking-tight mt-1">
                    ₹{annualSavingsLakhs} <span className="text-xl font-normal text-agrya-slate-400">Lakhs / yr</span>
                  </div>
                  <div className="text-xs text-emerald-400 font-medium mt-1">
                    ≈ ₹{(modeledSavings).toLocaleString('en-IN')} monthly operating cash savings (modeled)
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4 border-t border-agrya-slate-800 pt-4 text-xs">
                  <div>
                    <span className="text-agrya-slate-400 block mb-0.5">Hours Reclaimed</span>
                    <span className="font-mono font-bold text-white text-base">~{hoursSavedPerMonth} hrs / mo</span>
                  </div>
                  <div>
                    <span className="text-agrya-slate-400 block mb-0.5">Month-End Close</span>
                    <span className="font-mono font-bold text-white text-base">5 Business Days</span>
                  </div>
                </div>

                <p className="text-[11px] font-mono text-agrya-slate-400 border-t border-agrya-slate-800 pt-3">
                  * Assumes typical ~48% cost optimization achieved through automated Tally sync, centralized AP/AR pods, and partner oversight.
                </p>

                {onNavigate && (
                  <div className="flex items-center justify-between border-t border-agrya-slate-800/80 pt-3 text-xs">
                    <span className="text-agrya-slate-400">Need burn & runway modeling?</span>
                    <button
                      onClick={() => onNavigate('/tools/runway-calculator')}
                      className="font-semibold text-agrya-teal-400 hover:text-agrya-teal-300 underline underline-offset-4 flex items-center gap-1"
                    >
                      <span>Runway Calculator</span>
                      <span>→</span>
                    </button>
                  </div>
                )}
              </div>

            </div>
          </div>
        </DoubleBezel>
      </section>

      {/* SPRINT 2: RESTORED 6-CARD / 24-SUBSERVICE COMPREHENSIVE SUITE */}
      <section className="space-y-8">
        <div className="max-w-2xl">
          <div className="font-mono text-xs text-agrya-teal-700 font-semibold uppercase tracking-wider mb-2">
            Comprehensive Financial Suite
          </div>
          <h2 className="text-3xl font-extrabold text-agrya-slate-950 tracking-tight">
            Complete 24-subservice accounting capabilities.
          </h2>
          <p className="text-agrya-slate-600 text-sm mt-1">
            Every layer of your corporate financial backplane managed with precision.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {suiteCategories.map((cat) => (
            <DoubleBezel key={cat.title} className="h-full group hover-lift">
              <div className="p-6 sm:p-8 flex flex-col justify-between h-full space-y-6">
                <div>
                  <div className="text-3xl mb-4 p-3 rounded-2xl bg-agrya-slate-100 w-fit group-hover:scale-110 transition-transform">
                    {cat.icon}
                  </div>
                  <h3 className="text-xl font-bold text-agrya-slate-900 mb-4 group-hover:text-agrya-teal-700 transition-colors">
                    {cat.title}
                  </h3>
                  <ul className="space-y-2.5 text-xs text-agrya-slate-600">
                    {cat.items.map((sub) => (
                      <li key={sub} className="flex items-start gap-2">
                        <CheckCircle2 className="w-4 h-4 text-agrya-teal-600 shrink-0 mt-0.5" />
                        <span>{sub}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </DoubleBezel>
          ))}
        </div>
      </section>

      {/* REAL-TIME FINANCIAL INTELLIGENCE & ACTIONBOARD LINK (RESTORED LEGACY SECTION) */}
      <section className="bg-agrya-slate-900 rounded-3xl p-8 sm:p-14 text-white relative overflow-hidden border border-agrya-slate-800">
        <div className="relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
          <div className="lg:col-span-6 space-y-4">
            <span className="font-mono text-xs text-agrya-teal-400 uppercase tracking-wider font-semibold">
              Live Financial Telemetry
            </span>
            <h3 className="text-3xl font-extrabold tracking-tight text-white">
              Real-time Financial Intelligence
            </h3>
            <p className="text-sm text-agrya-slate-300 leading-relaxed">
              Don't wait for the end of the month. Get insights when you need them with our advanced reporting framework running on Actionboard.
            </p>
            <div className="pt-2">
              <a
                href="https://www.myactionboard.com"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 text-agrya-teal-300 hover:text-agrya-teal-200 font-semibold text-xs font-mono uppercase tracking-wider border-b border-agrya-teal-500/50 pb-0.5 transition-colors"
              >
                <span>Explore Actionboard Reports</span>
                <span>↗</span>
              </a>
            </div>
          </div>

          <div className="lg:col-span-6 grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
            {[
              'Revenue Movement Tracking',
              'Budget vs Actual Performance',
              'Cost Centre P&L Analysis',
              'Full Balance Sheet Management',
              'Cash Flow Forecasting',
              'Key Financial Ratio Analysis'
            ].map((item) => (
              <div key={item} className="p-3.5 rounded-xl bg-white/5 border border-white/10 flex items-center gap-2.5">
                <div className="w-2 h-2 rounded-full bg-agrya-teal-400 shrink-0" />
                <span className="text-agrya-slate-200 font-medium">{item}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* SOFTWARE PLATFORMS */}
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

      {/* BOTTOM CTA (WITH DIRECT JK@AGRYA.IN LINK) */}
      <section className="text-center max-w-xl mx-auto space-y-4 pt-4">
        <h2 className="text-2xl font-bold text-agrya-slate-900">Ready to optimize your operations?</h2>
        <p className="text-xs sm:text-sm text-agrya-slate-600">
          Talk to Jayakumar, our partner leading the Accounting Hub projects.
        </p>
        <div className="pt-2 flex flex-wrap items-center justify-center gap-3">
          <ButtonInButton variant="dark" iconType="arrow-right" onClick={onOpenInquiry}>
            Initiate Accounting Audit
          </ButtonInButton>
          <a
            href="mailto:jk@agrya.in"
            className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full border border-agrya-slate-200 bg-white hover:bg-agrya-slate-50 text-agrya-slate-800 text-xs font-semibold spring-snappy shadow-sm"
          >
            Direct: jk@agrya.in
          </a>
        </div>
      </section>

    </div>
  );
};
