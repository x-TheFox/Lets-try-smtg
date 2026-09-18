import React, { useState } from 'react';
import { servicesData } from '../data/services';
import { DoubleBezel } from '../components/ui/DoubleBezel';
import { Badge } from '../components/ui/Badge';
import { ButtonInButton } from '../components/ui/ButtonInButton';
import { Cpu, CheckCircle2, Sliders } from 'lucide-react';
import { clsx } from 'clsx';

interface CfoPageProps {
  onOpenInquiry: () => void;
  onNavigate?: (path: string) => void;
  onOpenDiagnostic?: () => void;
}

export const CfoPage: React.FC<CfoPageProps> = ({ onOpenInquiry, onNavigate, onOpenDiagnostic }) => {
  const data = servicesData['cfo'];
  const [burnRate, setBurnRate] = useState<number>(35); // in Lakhs/mo
  const [cashBalance, setCashBalance] = useState<number>(500); // in Lakhs
  const rawMonths = cashBalance / burnRate;
  const isCapped = rawMonths >= 36;
  const displayMonths = isCapped ? '36+' : rawMonths.toFixed(1);

  const getRunwayAdvisory = () => {
    if (rawMonths < 12) {
      return {
        band: 'Action Required (High Burn)',
        color: 'text-amber-400',
        desc: 'Runway under 12 months. Agrya VCFO models bridge financing, burn compression & strategic cost containment.'
      };
    } else if (rawMonths <= 24) {
      return {
        band: 'Stable Runway (12–24 Months)',
        color: 'text-agrya-teal-400',
        desc: 'Healthy operating posture. Ideal window for milestone delivery and unit economics optimization before next round.'
      };
    } else {
      return {
        band: 'Extended Growth Treasury (24+ Months)',
        color: 'text-emerald-400',
        desc: 'Substantial capital buffer. Focus on capital allocation discipline, cash yield management, and selective market expansion.'
      };
    }
  };

  const advisory = getRunwayAdvisory();

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

        <p className="text-lg sm:text-xl text-agrya-slate-600 leading-relaxed font-normal mb-8">
          {data.heroDesc}
        </p>

        <div className="flex flex-wrap items-center gap-3">
          <ButtonInButton
            variant="primary"
            iconType="arrow-right"
            onClick={onOpenInquiry}
          >
            Hire a Virtual CFO
          </ButtonInButton>

          <a
            href="mailto:jk@agrya.in?subject=Virtual%20CFO%20Advisory%20Inquiry%20-%20Agrya"
            className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full border border-agrya-slate-200 bg-white hover:bg-agrya-slate-50 text-agrya-slate-800 text-xs sm:text-sm font-semibold spring-snappy shadow-sm"
          >
            <span>Talk to Jayakumar (jk@agrya.in)</span>
          </a>

          {onOpenDiagnostic && (
            <button
              onClick={onOpenDiagnostic}
              className="inline-flex items-center gap-2 bg-agrya-teal-50 hover:bg-agrya-teal-100 border border-agrya-teal-200 text-agrya-teal-800 px-5 py-2.5 rounded-full text-xs sm:text-sm font-semibold spring-snappy shadow-sm"
            >
              <span>Assess Financial Maturity (2 Min)</span>
            </button>
          )}

          <span className="text-xs font-mono text-agrya-slate-500">
            Dedicated Partner CA Assignment
          </span>
        </div>
      </section>

      {/* INTERACTIVE FINANCIAL MODELING SIMULATION CARD */}
      <section>
        <DoubleBezel className="w-full">
          <div className="p-6 sm:p-10">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-6 border-b border-agrya-slate-100 gap-4 mb-6">
              <div className="flex items-center gap-3">
                <Sliders className="w-5 h-5 text-agrya-teal-600" />
                <h2 className="font-mono text-xs font-semibold uppercase tracking-wider text-agrya-slate-500">
                  Dynamic FP&A & Runway Scenario Simulator
                </h2>
              </div>
              <span className="text-xs font-mono text-agrya-teal-800 bg-agrya-teal-50 px-3 py-1 rounded-md border border-agrya-teal-200">
                Interactive Sensitivity Model
              </span>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
              
              {/* SLIDERS (7 COLS) */}
              <div className="lg:col-span-7 space-y-6">
                <div>
                  <label htmlFor="cfo-cash-balance" id="cfo-cash-label" className="flex justify-between text-xs font-semibold text-agrya-slate-800 mb-2 cursor-pointer">
                    <span>Available Treasury / Cash Reserve</span>
                    <span className="font-mono font-bold text-agrya-slate-900">₹{cashBalance} Lakhs</span>
                  </label>
                  <input
                    id="cfo-cash-balance"
                    aria-labelledby="cfo-cash-label"
                    aria-label="Available Treasury / Cash Reserve"
                    type="range"
                    min="100"
                    max="2000"
                    step="50"
                    value={cashBalance}
                    onChange={(e) => setCashBalance(Number(e.target.value))}
                    className="w-full h-2 bg-agrya-slate-200 rounded-lg appearance-none cursor-pointer accent-agrya-teal-700"
                  />
                  <div className="flex justify-between text-[10px] font-mono text-agrya-slate-400 mt-1">
                    <span>₹1 Cr</span>
                    <span>₹10 Cr</span>
                    <span>₹20 Cr</span>
                  </div>
                </div>

                <div>
                  <label htmlFor="cfo-burn-rate" id="cfo-burn-label" className="flex justify-between text-xs font-semibold text-agrya-slate-800 mb-2 cursor-pointer">
                    <span>Net Monthly Cash Burn</span>
                    <span className="font-mono font-bold text-agrya-slate-900">₹{burnRate} Lakhs / mo</span>
                  </label>
                  <input
                    id="cfo-burn-rate"
                    aria-labelledby="cfo-burn-label"
                    aria-label="Net Monthly Cash Burn"
                    type="range"
                    min="10"
                    max="150"
                    step="5"
                    value={burnRate}
                    onChange={(e) => setBurnRate(Number(e.target.value))}
                    className="w-full h-2 bg-agrya-slate-200 rounded-lg appearance-none cursor-pointer accent-agrya-teal-700"
                  />
                  <div className="flex justify-between text-[10px] font-mono text-agrya-slate-400 mt-1">
                    <span>₹10L / mo</span>
                    <span>₹75L / mo</span>
                    <span>₹1.5 Cr / mo</span>
                  </div>
                </div>
              </div>

              {/* SIMULATION TELEMETRY OUTPUT (5 COLS) */}
              <div className="lg:col-span-5 p-6 rounded-2xl bg-agrya-slate-900 text-white space-y-4 flex flex-col justify-between">
                <div>
                  <div className="text-xs font-mono text-agrya-teal-400 uppercase tracking-wider mb-1">
                    Modeled Cash Runway
                  </div>
                  <div className="text-4xl sm:text-5xl font-extrabold font-mono text-white tracking-tight tabular-nums">
                    {displayMonths} <span className="text-xl font-normal text-agrya-slate-400">Months</span>
                  </div>

                  {/* INTERACTIVE RUNWAY HORIZON GAUGE */}
                  <div className="space-y-1.5 pt-4">
                    <div className="flex justify-between text-[10px] font-mono text-agrya-slate-400">
                      <span>Horizon Scale</span>
                      <span>{isCapped ? '36+ Mo (Extended Growth)' : `${rawMonths.toFixed(1)} Mo Target`}</span>
                    </div>
                    <div className="h-2.5 w-full bg-agrya-slate-800 rounded-full overflow-hidden p-0.5 border border-agrya-slate-700/80">
                      <div
                        style={{ width: `${Math.min(100, Math.max(6, (Math.min(36, rawMonths) / 36) * 100))}%` }}
                        className={clsx(
                          "h-full rounded-full transition-[width,background-color,box-shadow] duration-250 ease-out",
                          rawMonths < 12 
                            ? "bg-amber-400 shadow-[0_0_12px_rgba(251,191,36,0.6)]" 
                            : rawMonths <= 24 
                              ? "bg-agrya-teal-400 shadow-[0_0_12px_rgba(45,212,191,0.4)]" 
                              : "bg-emerald-400 shadow-[0_0_12px_rgba(52,211,153,0.5)]"
                        )}
                      />
                    </div>
                    <div className="flex justify-between text-[9px] font-mono text-agrya-slate-500 px-0.5">
                      <span>0 Mo</span>
                      <span className="text-amber-400/80">12 Mo Safety</span>
                      <span className="text-agrya-teal-400/80">24 Mo Stable</span>
                      <span className="text-emerald-400/80">36+ Mo Treasury</span>
                    </div>
                  </div>
                </div>

                <div className="border-t border-agrya-slate-800 pt-3 space-y-1">
                  <div className={clsx("text-xs font-semibold flex items-center gap-1.5", advisory.color)}>
                    <span>{advisory.band}</span>
                  </div>
                  <p className="text-[11px] text-agrya-slate-300 leading-relaxed">
                    {advisory.desc}
                  </p>
                </div>

                {onNavigate && (
                  <div className="flex items-center justify-between border-t border-agrya-slate-800/80 pt-3 text-xs">
                    <span className="text-agrya-slate-400">Need hiring & revenue sensitivity?</span>
                    <button
                      onClick={() => onNavigate('/tools/runway-calculator')}
                      className="font-semibold text-agrya-teal-400 hover:text-agrya-teal-300 underline underline-offset-4 flex items-center gap-1"
                    >
                      <span>Full Runway Engine</span>
                      <span>→</span>
                    </button>
                  </div>
                )}
              </div>

            </div>
          </div>
        </DoubleBezel>
      </section>

      {/* FOUR PILLARS OF VCFO */}
      <section className="space-y-8">
        <div className="max-w-2xl">
          <div className="font-mono text-xs text-agrya-teal-700 font-semibold uppercase tracking-wider mb-2">
            Strategic Architecture
          </div>
          <h2 className="text-3xl font-extrabold text-agrya-slate-950 tracking-tight">
            Four pillars of Virtual CFO leadership.
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {data.deliverables.map((item, idx) => (
            <DoubleBezel key={item.title} className="h-full group">
              <div className="p-6 sm:p-8 flex flex-col justify-between h-full">
                <div>
                  <div className="flex items-center justify-between mb-4">
                    <span className="font-mono text-xs px-2.5 py-1 rounded bg-agrya-slate-100 text-agrya-slate-800 font-medium">
                      Pillar 0{idx + 1}
                    </span>
                    <Cpu className="w-4 h-4 text-agrya-teal-600" />
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

      {/* OUR RESPONSIBILITIES CHARTER (RESTORED FROM ORIGINAL SPEC) */}
      <section className="space-y-6">
        <div className="max-w-2xl">
          <div className="font-mono text-xs text-agrya-teal-700 font-semibold uppercase tracking-wider mb-2">
            Engagement Charter
          </div>
          <h2 className="text-3xl font-extrabold text-agrya-slate-950 tracking-tight">
            Our Responsibilities as Your Virtual CFO
          </h2>
          <p className="text-agrya-slate-600 text-sm mt-1">
            Enterprise excellence, accessibly priced. We deliver executive-tier infrastructure and fiduciary leadership at a fraction of full-time C-suite cost.
          </p>
        </div>

        <DoubleBezel className="w-full">
          <div className="p-6 sm:p-10">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {[
                { title: 'Resource Planning & Allocation', desc: 'Optimizing capital deployment, headcount velocity, and departmental budget ceilings.' },
                { title: 'Stakeholder Financial Reporting', desc: 'Board-ready monthly financial packs, shareholder decks, and lender reporting.' },
                { title: 'Cost Optimization & Negotiation', desc: 'Vendor spend scrutiny, contract renegotiations, and gross margin protection.' },
                { title: 'Internal Controls & Operations', desc: 'Segregation of duties, approval hierarchies, and robust financial policy governance.' },
                { title: 'Regulatory Compliance Management', desc: 'Proactive oversight across MCA, Income Tax, GST, RBI, and FEMA statutory requirements.' },
                { title: 'Financial Progress Reviews', desc: 'Rigorous monthly budget-vs-actual variance tracking and strategic trend analysis.' },
                { title: 'Investor & Banker Liaison', desc: 'Primary advisory contact for institutional diligence, banking lines, and fundraising audits.' }
              ].map((item, i) => (
                <div key={item.title} className="p-4 rounded-xl bg-agrya-slate-50/70 border border-agrya-slate-100 flex items-start gap-3">
                  <div className="w-6 h-6 rounded-md bg-agrya-teal-100 text-agrya-teal-800 text-xs font-mono font-bold flex items-center justify-center shrink-0 mt-0.5">
                    0{i + 1}
                  </div>
                  <div>
                    <h4 className="text-sm font-bold text-agrya-slate-900 mb-1">{item.title}</h4>
                    <p className="text-xs text-agrya-slate-600 leading-relaxed">{item.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </DoubleBezel>
      </section>

      {/* PROVEN RESULTS: THE TWO SUBSTANTIATED CASE STUDIES */}
      <section className="space-y-8">
        <div className="text-center max-w-2xl mx-auto">
          <div className="font-mono text-xs text-agrya-teal-700 font-semibold uppercase tracking-wider mb-2">
            Documented Impact
          </div>
          <h2 className="text-3xl font-extrabold text-agrya-slate-950 tracking-tight">
            Proven Results & Client Trajectories
          </h2>
          <p className="text-agrya-slate-600 text-sm mt-1">
            Real client transformations guided by Agrya Virtual CFO leadership.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          
          {/* CASE STUDY 1: RAPID SCALING */}
          <div className="rounded-3xl bg-agrya-slate-900 text-white p-8 sm:p-10 relative overflow-hidden border border-agrya-slate-800 flex flex-col justify-between">
            <div className="space-y-4 relative z-10">
              <span className="font-mono text-[11px] px-3 py-1 rounded-full bg-agrya-teal-900/80 text-agrya-teal-300 font-semibold uppercase tracking-wider border border-agrya-teal-500/30">
                Rapid Scaling • 5x Revenue
              </span>
              <h3 className="text-3xl font-extrabold tracking-tight text-white">
                ₹15 Cr to ₹75 Cr Revenue
              </h3>
              <p className="text-sm text-agrya-slate-300 leading-relaxed">
                Over 4 years of dedicated Virtual CFO engagement, we helped a client expand from 1 to 5 offices and scale headcount from 120 to 800+ employees.
              </p>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
                <div className="flex items-center text-xs text-agrya-slate-300 gap-2">
                  <div className="w-1.5 h-1.5 rounded-full bg-agrya-teal-400" />
                  <span>Vendor cost reduction</span>
                </div>
                <div className="flex items-center text-xs text-agrya-slate-300 gap-2">
                  <div className="w-1.5 h-1.5 rounded-full bg-agrya-teal-400" />
                  <span>Syndicated bank loans</span>
                </div>
                <div className="flex items-center text-xs text-agrya-slate-300 gap-2">
                  <div className="w-1.5 h-1.5 rounded-full bg-agrya-teal-400" />
                  <span>USD 6mn Equity funding</span>
                </div>
                <div className="flex items-center text-xs text-agrya-slate-300 gap-2">
                  <div className="w-1.5 h-1.5 rounded-full bg-agrya-teal-400" />
                  <span>M&A due diligence</span>
                </div>
              </div>
            </div>
            <div className="mt-8 pt-4 border-t border-agrya-slate-800 text-xs font-mono text-agrya-teal-400">
              Engagement: Virtual CFO Advisory • Retainer Partnership
            </div>
          </div>

          {/* CASE STUDY 2: PROCESS OPTIMIZATION */}
          <div className="rounded-3xl bg-white p-8 sm:p-10 border border-agrya-slate-200/80 shadow-sm flex flex-col justify-between">
            <div className="space-y-4">
              <span className="font-mono text-[11px] px-3 py-1 rounded-full bg-blue-50 text-blue-800 font-semibold uppercase tracking-wider border border-blue-200">
                Process Optimization & Compliance
              </span>
              <h3 className="text-3xl font-extrabold tracking-tight text-agrya-slate-900">
                Compliance Overhaul
              </h3>
              <p className="text-sm text-agrya-slate-600 leading-relaxed">
                We restructured broken compliance and historical reporting processes for an enterprise client, rectifying audit qualifications and positioning them for institutional debt.
              </p>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
                <div className="flex items-center text-xs text-agrya-slate-700 gap-2">
                  <div className="w-1.5 h-1.5 rounded-full bg-agrya-teal-600" />
                  <span>Resolved rev-rec issues</span>
                </div>
                <div className="flex items-center text-xs text-agrya-slate-700 gap-2">
                  <div className="w-1.5 h-1.5 rounded-full bg-agrya-teal-600" />
                  <span>Fixed tax non-compliance</span>
                </div>
                <div className="flex items-center text-xs text-agrya-slate-700 gap-2">
                  <div className="w-1.5 h-1.5 rounded-full bg-agrya-teal-600" />
                  <span>Raised ₹100Cr+ in debt</span>
                </div>
                <div className="flex items-center text-xs text-agrya-slate-700 gap-2">
                  <div className="w-1.5 h-1.5 rounded-full bg-agrya-teal-600" />
                  <span>Supported plant expansion</span>
                </div>
              </div>
            </div>
            <div className="mt-8 pt-4 border-t border-agrya-slate-100 text-xs font-mono text-agrya-slate-500">
              Result: Clean Big-Four Audit Sign-off • ₹100Cr+ Facilities
            </div>
          </div>

        </div>
      </section>

      {/* CREDENTIALS & GOVERNANCE */}
      <section>
        <DoubleBezel className="w-full">
          <div className="p-6 sm:p-10">
            <h3 className="text-lg font-bold text-agrya-slate-900 mb-4">Institutional Quality Assurance</h3>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 text-xs text-agrya-slate-600">
              <div className="flex items-start gap-3">
                <CheckCircle2 className="w-4 h-4 text-agrya-teal-600 shrink-0 mt-0.5" />
                <span>Led exclusively by Fellow (FCA) and Associate (ACA) Chartered Accountants.</span>
              </div>
              <div className="flex items-start gap-3">
                <CheckCircle2 className="w-4 h-4 text-agrya-teal-600 shrink-0 mt-0.5" />
                <span>Active involvement in board meetings, investor committees, and auditor reviews.</span>
              </div>
              <div className="flex items-start gap-3">
                <CheckCircle2 className="w-4 h-4 text-agrya-teal-600 shrink-0 mt-0.5" />
                <span>Strict non-disclosure agreements and institutional data room isolation.</span>
              </div>
            </div>
          </div>
        </DoubleBezel>
      </section>

      {/* BOTTOM CTA */}
      <section className="text-center max-w-xl mx-auto space-y-4 pt-6">
        <h2 className="text-2xl font-bold text-agrya-slate-900">Need strategic direction?</h2>
        <p className="text-xs sm:text-sm text-agrya-slate-600">
          Gain seasoned financial leadership without full-time headcount overhead. Talk to Jayakumar, our partner leading the Virtual CFO practice.
        </p>
        <div className="pt-2 flex flex-wrap items-center justify-center gap-3">
          <ButtonInButton variant="dark" iconType="arrow-right" onClick={onOpenInquiry}>
            Initiate VCFO Consultation
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
