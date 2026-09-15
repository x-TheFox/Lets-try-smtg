import React, { useState } from 'react';
import { servicesData } from '../data/services';
import { DoubleBezel } from '../components/ui/DoubleBezel';
import { Badge } from '../components/ui/Badge';
import { ButtonInButton } from '../components/ui/ButtonInButton';
import { Cpu, CheckCircle2, Sliders } from 'lucide-react';

interface CfoPageProps {
  onOpenInquiry: () => void;
}

export const CfoPage: React.FC<CfoPageProps> = ({ onOpenInquiry }) => {
  const data = servicesData['cfo'];
  const [burnRate, setBurnRate] = useState<number>(35); // in Lakhs/mo
  const [cashBalance, setCashBalance] = useState<number>(500); // in Lakhs
  const runwayMonths = (cashBalance / burnRate).toFixed(1);

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
            Hire a Virtual CFO
          </ButtonInButton>
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
                  <div className="flex justify-between text-xs font-semibold text-agrya-slate-800 mb-2">
                    <span>Available Treasury / Cash Reserve</span>
                    <span className="font-mono font-bold text-agrya-slate-900">₹{cashBalance} Lakhs</span>
                  </div>
                  <input
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
                  <div className="flex justify-between text-xs font-semibold text-agrya-slate-800 mb-2">
                    <span>Net Monthly Cash Burn</span>
                    <span className="font-mono font-bold text-agrya-slate-900">₹{burnRate} Lakhs / mo</span>
                  </div>
                  <input
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
              <div className="lg:col-span-5 p-6 rounded-2xl bg-agrya-slate-900 text-white space-y-4">
                <div className="text-xs font-mono text-agrya-teal-400 uppercase tracking-wider">
                  Modeled Cash Runway
                </div>
                <div className="text-4xl sm:text-5xl font-extrabold font-mono text-white tracking-tight">
                  {runwayMonths} <span className="text-xl font-normal text-agrya-slate-400">Months</span>
                </div>
                <p className="text-xs text-agrya-slate-300 leading-relaxed border-t border-agrya-slate-800 pt-3">
                  {Number(runwayMonths) < 12 ? (
                    <span className="text-amber-400 font-semibold">
                      Action Required: Runway under 12 months. Agrya VCFO models bridge financing & cost containment.
                    </span>
                  ) : (
                    <span className="text-emerald-400 font-semibold">
                      Healthy Capital Runway: Optimal posture for strategic hires or next equity fundraise pacing.
                    </span>
                  )}
                </p>
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
        <h2 className="text-2xl font-bold text-agrya-slate-900">Accelerate your growth trajectory.</h2>
        <p className="text-xs sm:text-sm text-agrya-slate-600">
          Gain seasoned financial leadership without full-time headcount overhead. Discuss your Virtual CFO roadmap with us.
        </p>
        <div className="pt-2">
          <ButtonInButton variant="dark" iconType="arrow-right" onClick={onOpenInquiry}>
            Initiate VCFO Consultation
          </ButtonInButton>
        </div>
      </section>

    </div>
  );
};
