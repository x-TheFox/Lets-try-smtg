import React, { useState } from 'react';
import { DoubleBezel } from '../components/ui/DoubleBezel';
import { Badge } from '../components/ui/Badge';
import { Sliders, Activity, Printer, ArrowRight, ShieldCheck, CheckCircle2 } from 'lucide-react';
import { clsx } from 'clsx';
import { trackEvent } from '../utils/analytics';

interface RunwayCalculatorPageProps {
  onOpenInquiry: (service?: string, partner?: string) => void;
}

type ScenarioType = 'conservative' | 'base' | 'aggressive';

export const RunwayCalculatorPage: React.FC<RunwayCalculatorPageProps> = ({ onOpenInquiry }) => {
  const [cashBalance, setCashBalance] = useState<number>(650); // In Lakhs (₹6.5 Cr)
  const [monthlyRevenue, setMonthlyRevenue] = useState<number>(25); // In Lakhs
  const [monthlyGrossBurn, setMonthlyGrossBurn] = useState<number>(60); // In Lakhs
  const [headcountGrowth, setHeadcountGrowth] = useState<number>(2); // Net new hires / mo
  const [scenario, setScenario] = useState<ScenarioType>('base');

  // Scenario Multipliers
  const scenarioMultiplier = scenario === 'conservative' ? 1.2 : scenario === 'aggressive' ? 0.85 : 1.0;
  const effectiveNetBurn = Math.max(5, (monthlyGrossBurn * scenarioMultiplier) - monthlyRevenue + (headcountGrowth * 1.5));
  const runwayMonths = Math.max(1, Number((cashBalance / effectiveNetBurn).toFixed(1)));

  // Projected Zero-Cash Date
  const projectedDate = new Date();
  projectedDate.setMonth(projectedDate.getMonth() + Math.floor(runwayMonths));
  const formattedDepletionDate = projectedDate.toLocaleDateString('en-IN', { month: 'short', year: 'numeric' });

  const handlePrint = () => {
    trackEvent('calculator_calculate', { action: 'print_export', runwayMonths, cashBalance, scenario });
    window.print();
  };

  return (
    <div className="max-w-6xl mx-auto px-6 pt-12 pb-24 space-y-16">
      
      {/* HEADER SECTION */}
      <section className="max-w-3xl print:hidden">
        <Badge pulse variant="teal" className="mb-4">
          Financial Engineering Tools • Public Utility
        </Badge>
        <h1 className="text-4xl sm:text-6xl font-extrabold text-agrya-slate-950 tracking-tight leading-[1.1] mb-4">
          Interactive Startup Runway & Sensitivity Calculator
        </h1>
        <p className="text-base sm:text-lg text-agrya-slate-600 leading-relaxed font-normal mb-6">
          Model cash depletion horizons, evaluate capital extension scenarios, and stress-test hiring expansion before committing treasury. Built with the rigor of Agrya’s Virtual CFO practice.
        </p>

        <div className="flex flex-wrap items-center gap-3">
          <button
            onClick={handlePrint}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-white border border-agrya-slate-200 hover:bg-agrya-slate-50 text-agrya-slate-800 text-xs font-semibold spring-snappy shadow-sm"
          >
            <Printer className="w-4 h-4 text-agrya-slate-600" />
            <span>Print Executive Briefing</span>
          </button>
          <span className="text-xs font-mono text-agrya-slate-400">
            Exportable scenario model for board & investor reviews
          </span>
        </div>
      </section>

      {/* PRINT HEADER ONLY VISIBLE DURING PRINT */}
      <div className="hidden print:block border-b border-agrya-slate-300 pb-4 mb-6">
        <div className="flex justify-between items-center">
          <div>
            <h1 className="text-2xl font-bold text-agrya-slate-900">Agrya Consulting • Executive Runway Assessment</h1>
            <p className="text-xs text-agrya-slate-500 font-mono">Prepared via Agrya Public Scenario Modeling Tool</p>
          </div>
          <div className="text-right text-xs font-mono text-agrya-slate-500">
            <div>Date: {new Date().toLocaleDateString('en-IN')}</div>
            <div>Strictly Confidential • Fiduciary Planning</div>
          </div>
        </div>
      </div>

      {/* MAIN CALCULATOR CONSOLE */}
      <section>
        <DoubleBezel className="w-full">
          <div className="p-6 sm:p-10 space-y-8">
            
            {/* TOOLBAR & SCENARIO TOGGLES */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-6 border-b border-agrya-slate-100 gap-4">
              <div className="flex items-center gap-3">
                <Sliders className="w-5 h-5 text-agrya-teal-600" />
                <h2 className="font-mono text-xs font-bold uppercase tracking-wider text-agrya-slate-700">
                  Scenario Parameter Controller
                </h2>
              </div>

              <div className="flex items-center p-1 rounded-xl bg-agrya-slate-100 border border-agrya-slate-200 text-xs font-semibold print:hidden">
                <button
                  onClick={() => { setScenario('conservative'); trackEvent('simulator_interact', { scenario: 'conservative' }); }}
                  className={clsx(
                    "px-3 py-1.5 rounded-lg spring-snappy transition-all",
                    scenario === 'conservative' ? "bg-white text-agrya-slate-900 shadow-sm" : "text-agrya-slate-500 hover:text-agrya-slate-900"
                  )}
                >
                  Conservative (-15%)
                </button>
                <button
                  onClick={() => { setScenario('base'); trackEvent('simulator_interact', { scenario: 'base' }); }}
                  className={clsx(
                    "px-3 py-1.5 rounded-lg spring-snappy transition-all",
                    scenario === 'base' ? "bg-white text-agrya-slate-900 shadow-sm" : "text-agrya-slate-500 hover:text-agrya-slate-900"
                  )}
                >
                  Base Plan
                </button>
                <button
                  onClick={() => { setScenario('aggressive'); trackEvent('simulator_interact', { scenario: 'aggressive' }); }}
                  className={clsx(
                    "px-3 py-1.5 rounded-lg spring-snappy transition-all",
                    scenario === 'aggressive' ? "bg-white text-agrya-slate-900 shadow-sm" : "text-agrya-slate-500 hover:text-agrya-slate-900"
                  )}
                >
                  Aggressive (+20%)
                </button>
              </div>
            </div>

            {/* TWO-COLUMN LAYOUT: INPUTS VS OUTPUT HUD */}
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
              
              {/* SLIDERS (7 COLS) */}
              <div className="lg:col-span-7 space-y-6">
                
                {/* AVAILABLE CASH */}
                <div>
                  <label htmlFor="calc-cash-balance" id="calc-cash-label" className="flex justify-between text-xs font-semibold text-agrya-slate-800 mb-2 cursor-pointer">
                    <span>Current Treasury / Cash in Bank</span>
                    <span className="font-mono font-bold text-agrya-slate-900 text-sm">₹{cashBalance} Lakhs ({((cashBalance)/100).toFixed(2)} Cr)</span>
                  </label>
                  <input
                    id="calc-cash-balance"
                    aria-labelledby="calc-cash-label"
                    aria-label="Current Treasury / Cash in Bank"
                    type="range"
                    min="50"
                    max="3000"
                    step="25"
                    value={cashBalance}
                    onChange={(e) => setCashBalance(Number(e.target.value))}
                    className="w-full h-2 bg-agrya-slate-200 rounded-lg appearance-none cursor-pointer accent-agrya-teal-700"
                  />
                  <div className="flex justify-between text-[10px] font-mono text-agrya-slate-400 mt-1">
                    <span>₹50 Lakhs</span>
                    <span>₹15 Cr</span>
                    <span>₹30 Cr</span>
                  </div>
                </div>

                {/* MONTHLY GROSS BURN */}
                <div>
                  <label htmlFor="calc-gross-burn" id="calc-burn-label" className="flex justify-between text-xs font-semibold text-agrya-slate-800 mb-2 cursor-pointer">
                    <span>Monthly Operating Expenditures (Gross Burn)</span>
                    <span className="font-mono font-bold text-agrya-slate-900 text-sm">₹{monthlyGrossBurn} Lakhs / mo</span>
                  </label>
                  <input
                    id="calc-gross-burn"
                    aria-labelledby="calc-burn-label"
                    aria-label="Monthly Operating Expenditures (Gross Burn)"
                    type="range"
                    min="10"
                    max="200"
                    step="5"
                    value={monthlyGrossBurn}
                    onChange={(e) => setMonthlyGrossBurn(Number(e.target.value))}
                    className="w-full h-2 bg-agrya-slate-200 rounded-lg appearance-none cursor-pointer accent-agrya-teal-700"
                  />
                  <div className="flex justify-between text-[10px] font-mono text-agrya-slate-400 mt-1">
                    <span>₹10L / mo</span>
                    <span>₹1 Cr / mo</span>
                    <span>₹2 Cr / mo</span>
                  </div>
                </div>

                {/* MONTHLY REVENUE */}
                <div>
                  <label htmlFor="calc-revenue" id="calc-revenue-label" className="flex justify-between text-xs font-semibold text-agrya-slate-800 mb-2 cursor-pointer">
                    <span>Current Monthly Inflows / Revenue</span>
                    <span className="font-mono font-bold text-agrya-slate-900 text-sm">₹{monthlyRevenue} Lakhs / mo</span>
                  </label>
                  <input
                    id="calc-revenue"
                    aria-labelledby="calc-revenue-label"
                    aria-label="Current Monthly Inflows / Revenue"
                    type="range"
                    min="0"
                    max="150"
                    step="5"
                    value={monthlyRevenue}
                    onChange={(e) => setMonthlyRevenue(Number(e.target.value))}
                    className="w-full h-2 bg-agrya-slate-200 rounded-lg appearance-none cursor-pointer accent-agrya-teal-700"
                  />
                  <div className="flex justify-between text-[10px] font-mono text-agrya-slate-400 mt-1">
                    <span>Pre-Revenue (₹0)</span>
                    <span>₹75L / mo</span>
                    <span>₹1.5 Cr / mo</span>
                  </div>
                </div>

                {/* HIRING HEADCOUNT EXPANSION */}
                <div>
                  <label htmlFor="calc-headcount" id="calc-headcount-label" className="flex justify-between text-xs font-semibold text-agrya-slate-800 mb-2 cursor-pointer">
                    <span>Planned Headcount Addition</span>
                    <span className="font-mono font-bold text-agrya-slate-900 text-sm">+{headcountGrowth} Net Hires / mo</span>
                  </label>
                  <input
                    id="calc-headcount"
                    aria-labelledby="calc-headcount-label"
                    aria-label="Planned Headcount Addition"
                    type="range"
                    min="0"
                    max="10"
                    step="1"
                    value={headcountGrowth}
                    onChange={(e) => setHeadcountGrowth(Number(e.target.value))}
                    className="w-full h-2 bg-agrya-slate-200 rounded-lg appearance-none cursor-pointer accent-agrya-teal-700"
                  />
                  <div className="flex justify-between text-[10px] font-mono text-agrya-slate-400 mt-1">
                    <span>Freeze (0)</span>
                    <span>5 Hires / mo</span>
                    <span>10 Hires / mo</span>
                  </div>
                </div>

              </div>

              {/* READOUT & TELEMETRY CARD (5 COLS) */}
              <div className="lg:col-span-5 p-6 sm:p-8 rounded-3xl bg-agrya-slate-900 text-white space-y-6">
                
                <div>
                  <div className="flex items-center justify-between text-[11px] font-mono text-agrya-teal-400 uppercase tracking-wider mb-1">
                    <span>Modeled Capital Runway</span>
                    <span className="px-2 py-0.5 rounded bg-agrya-teal-900/90 text-agrya-teal-300 font-bold border border-agrya-teal-500/30">
                      {scenario.toUpperCase()} SCENARIO
                    </span>
                  </div>

                  <div className="text-5xl font-extrabold font-mono text-white tracking-tight">
                    {runwayMonths} <span className="text-2xl font-normal text-agrya-slate-400">Months</span>
                  </div>

                  <div className="text-xs text-agrya-slate-300 mt-2 font-mono">
                    Projected Cash Floor: <span className="font-bold text-white">{formattedDepletionDate}</span>
                  </div>
                </div>

                {/* RUNWAY GAUGE BAR */}
                <div className="space-y-1.5 pt-2 border-t border-agrya-slate-800">
                  <div className="flex justify-between text-[10px] font-mono text-agrya-slate-400">
                    <span>Runway Horizon Gauge</span>
                    <span>{runwayMonths >= 30 ? 'Extended' : runwayMonths >= 18 ? 'Growth' : 'Attention Required'}</span>
                  </div>
                  <div className="h-3 w-full bg-agrya-slate-800 rounded-full overflow-hidden p-0.5 border border-agrya-slate-700">
                    <div
                      style={{ width: `${Math.min(100, Math.max(5, (runwayMonths / 30) * 100))}%` }}
                      className={clsx(
                        "h-full rounded-full transition-all duration-300 ease-out",
                        runwayMonths < 12 
                          ? "bg-amber-400 shadow-[0_0_12px_rgba(251,191,36,0.6)]" 
                          : runwayMonths < 20 
                            ? "bg-agrya-teal-400 shadow-[0_0_12px_rgba(45,212,191,0.5)]" 
                            : "bg-emerald-400 shadow-[0_0_12px_rgba(52,211,153,0.6)]"
                      )}
                    />
                  </div>
                  <div className="flex justify-between text-[9px] font-mono text-agrya-slate-500 px-0.5">
                    <span>0 Mo</span>
                    <span className="text-amber-400/90">12 Mo Minimum</span>
                    <span className="text-agrya-teal-400/90">18 Mo Optimum</span>
                    <span>30+ Mo</span>
                  </div>
                </div>

                {/* EXECUTIVE SUMMARY METRICS */}
                <div className="grid grid-cols-2 gap-4 pt-3 border-t border-agrya-slate-800 text-xs">
                  <div>
                    <span className="text-agrya-slate-400 block mb-0.5 font-mono text-[10px] uppercase">Effective Net Burn</span>
                    <span className="font-mono font-bold text-white text-base">₹{effectiveNetBurn.toFixed(1)}L / mo</span>
                  </div>
                  <div>
                    <span className="text-agrya-slate-400 block mb-0.5 font-mono text-[10px] uppercase">Hiring Drag Cost</span>
                    <span className="font-mono font-bold text-white text-base">+₹{(headcountGrowth * 1.5).toFixed(1)}L / mo</span>
                  </div>
                </div>

                {/* ADVISORY RECOMMENDATION */}
                <div className="p-4 rounded-2xl bg-white/5 border border-white/10 text-xs text-agrya-slate-300 leading-relaxed">
                  {runwayMonths < 12 ? (
                    <div className="text-amber-300 space-y-1">
                      <div className="font-bold font-mono uppercase text-[11px]">⚠️ Strategic Alert: Runway Under 12 Months</div>
                      <p>Initiate equity fundraising pipeline immediately or engage Agrya Virtual CFO to implement cost-reduction and venture debt facilities.</p>
                    </div>
                  ) : runwayMonths < 18 ? (
                    <div className="text-agrya-teal-300 space-y-1">
                      <div className="font-bold font-mono uppercase text-[11px]">⚡ Growth Pacing Range</div>
                      <p>Healthy operational window. Model unit economics and gross margin sensitivity before accelerating new business unit expansion.</p>
                    </div>
                  ) : (
                    <div className="text-emerald-300 space-y-1">
                      <div className="font-bold font-mono uppercase text-[11px]">✓ High Capital Stability</div>
                      <p>Treasury exceeds 18 months. Optimal posture to negotiate top-tier terms on non-dilutive capital and strategic talent acquisition.</p>
                    </div>
                  )}
                </div>

                {/* CONVERT CTA */}
                <div className="pt-2 print:hidden">
                  <button
                    onClick={() => onOpenInquiry('Virtual CFO', 'Jayakumar M')}
                    className="w-full py-3 px-4 bg-agrya-teal-600 hover:bg-agrya-teal-500 text-white rounded-xl text-xs font-semibold spring-snappy flex items-center justify-center gap-2"
                  >
                    <span>Discuss Runway Strategy with Jayakumar M</span>
                    <ArrowRight className="w-4 h-4" />
                  </button>
                </div>

              </div>

            </div>
          </div>
        </DoubleBezel>
      </section>

      {/* WHY FOUNDERS TRUST AGRYA RUNWAY ARCHITECTURE */}
      <section className="space-y-6 print:hidden">
        <div className="max-w-2xl">
          <div className="font-mono text-xs text-agrya-teal-700 font-semibold uppercase tracking-wider mb-1">
            Fiduciary Guidance
          </div>
          <h3 className="text-2xl font-bold text-agrya-slate-900">
            How Agrya Virtual CFOs Protect Your Balance Sheet
          </h3>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
          <div className="p-6 rounded-2xl bg-white border border-agrya-slate-200/80 shadow-sm space-y-3">
            <ShieldCheck className="w-5 h-5 text-agrya-teal-600" />
            <h4 className="text-base font-bold text-agrya-slate-900">Dynamic 3-Statement Models</h4>
            <p className="text-xs text-agrya-slate-600 leading-relaxed">
              We replace fragile spreadsheet formulas with dynamic cloud-based financial models that correlate hiring, marketing CAC, and deferred revenue.
            </p>
          </div>

          <div className="p-6 rounded-2xl bg-white border border-agrya-slate-200/80 shadow-sm space-y-3">
            <CheckCircle2 className="w-5 h-5 text-agrya-teal-600" />
            <h4 className="text-base font-bold text-agrya-slate-900">Syndicated Banking Lines</h4>
            <p className="text-xs text-agrya-slate-600 leading-relaxed">
              Unlock non-dilutive venture debt, working capital facilities, and invoice discounting to stretch equity runway by 4 to 8 months.
            </p>
          </div>

          <div className="p-6 rounded-2xl bg-white border border-agrya-slate-200/80 shadow-sm space-y-3">
            <Activity className="w-5 h-5 text-agrya-teal-600" />
            <h4 className="text-base font-bold text-agrya-slate-900">Board Deck Governance</h4>
            <p className="text-xs text-agrya-slate-600 leading-relaxed">
              Present clean, unassailable financial summaries that give Series A/B investors confidence in your stewardship and capital efficiency.
            </p>
          </div>
        </div>
      </section>

    </div>
  );
};
