import React from 'react';
import { DoubleBezel } from '../components/ui/DoubleBezel';
import { Badge } from '../components/ui/Badge';
import { ButtonInButton } from '../components/ui/ButtonInButton';
import { Sparkles, Target } from 'lucide-react';

interface StoryPageProps {
  onOpenInquiry: () => void;
}

export const StoryPage: React.FC<StoryPageProps> = ({ onOpenInquiry }) => {
  return (
    <div className="max-w-6xl mx-auto px-6 pt-12 pb-24 space-y-20">
      
      {/* HERO SECTION */}
      <section className="max-w-3xl">
        <Badge pulse variant="teal" className="mb-6">
          The Agrya Origin & Mission
        </Badge>

        <h1 className="text-4xl sm:text-6xl font-extrabold text-agrya-slate-950 tracking-tight leading-[1.1] mb-6">
          Built by finance leaders for founders who build.
        </h1>

        <p className="text-base sm:text-xl text-agrya-slate-600 leading-relaxed font-normal mb-8 max-w-2xl">
          Agrya was created by veteran Chartered Accountants who recognized that high-growth businesses were stuck between two flawed worlds: traditional accounting firms that don’t understand tech, and disconnected software that lacks strategic human wisdom.
        </p>

        <div className="flex flex-wrap items-center gap-4">
          <ButtonInButton
            variant="primary"
            iconType="arrow-right"
            onClick={onOpenInquiry}
          >
            Partner With Us
          </ButtonInButton>
          <span className="text-xs font-mono text-agrya-slate-500">
            Founded by Chartered Accountants • Built for Scale
          </span>
        </div>
      </section>

      {/* THE GENESIS & PHILOSOPHY (EDITORIAL SPLIT BENTO) */}
      <section className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <DoubleBezel className="h-full">
          <div className="p-6 sm:p-10 space-y-4 h-full flex flex-col justify-between">
            <div>
              <div className="w-10 h-10 rounded-xl bg-agrya-teal-50 border border-agrya-teal-200 flex items-center justify-center text-agrya-teal-700 mb-6">
                <Target className="w-5 h-5" />
              </div>
              <h2 className="text-2xl font-bold text-agrya-slate-900 mb-3">
                The Problem We Set Out to Solve
              </h2>
              <p className="text-agrya-slate-600 text-xs sm:text-sm leading-relaxed mb-4">
                Founders spend up to 40% of their mental bandwidth managing back-office friction—chasing delayed monthly statements, worrying over complex GST & TDS filings, and struggling to answer basic questions like: <em>“What is our true cash runway under our current hiring plan?”</em>
              </p>
              <p className="text-agrya-slate-600 text-xs sm:text-sm leading-relaxed">
                Traditional CA firms look backwards through a rear-view mirror once a year for compliance. Modern businesses need forward-looking financial navigation in real time.
              </p>
            </div>
            <div className="pt-4 border-t border-agrya-slate-100 text-xs font-mono text-agrya-teal-800">
              The Reality: 82% of startup failures stem from cash flow mismanagement.
            </div>
          </div>
        </DoubleBezel>

        <DoubleBezel className="h-full">
          <div className="p-6 sm:p-10 space-y-4 h-full flex flex-col justify-between">
            <div>
              <div className="w-10 h-10 rounded-xl bg-agrya-slate-100 border border-agrya-slate-200 flex items-center justify-center text-agrya-slate-800 mb-6">
                <Sparkles className="w-5 h-5" />
              </div>
              <h2 className="text-2xl font-bold text-agrya-slate-900 mb-3">
                The Financial Operating System
              </h2>
              <p className="text-agrya-slate-600 text-xs sm:text-sm leading-relaxed mb-4">
                We re-engineered the finance function into an integrated operating system. By marrying institutional Chartered Accountancy rigor with proprietary technology platforms like Effortless, Actionboard, and Pulse, we turn messy transaction streams into real-time strategic telemetry.
              </p>
              <p className="text-agrya-slate-600 text-xs sm:text-sm leading-relaxed">
                Our founders and partners don’t just deliver reports; we sit with you in board meetings, model scenario sensitivities, and safeguard your capital.
              </p>
            </div>
            <div className="pt-4 border-t border-agrya-slate-100 text-xs font-mono text-agrya-slate-500">
              The Mission: Total Financial Clarity for Every Growing Enterprise.
            </div>
          </div>
        </DoubleBezel>
      </section>

      {/* CORE VALUES & PILLARS */}
      <section>
        <DoubleBezel className="w-full">
          <div className="p-6 sm:p-10 space-y-8">
            <div>
              <div className="font-mono text-xs text-agrya-teal-700 font-semibold uppercase tracking-wider mb-1">
                Our Principles
              </div>
              <h3 className="text-2xl font-bold text-agrya-slate-900">How Agrya Operates</h3>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
              <div className="space-y-2">
                <div className="font-mono text-xs font-bold text-agrya-teal-700">01 / MATERIAL HONESTY</div>
                <h4 className="text-base font-bold text-agrya-slate-900">Zero Vanity Metrics</h4>
                <p className="text-xs text-agrya-slate-600 leading-relaxed">
                  We look at the hard truths of your unit economics, burn multiple, and net cash runway. Clarity creates resilience.
                </p>
              </div>

              <div className="space-y-2">
                <div className="font-mono text-xs font-bold text-agrya-teal-700">02 / INSTITUTIONAL RIGOR</div>
                <h4 className="text-base font-bold text-agrya-slate-900">Chartered Pedigree</h4>
                <p className="text-xs text-agrya-slate-600 leading-relaxed">
                  Every engagement is led by Fellow (FCA) or Associate (ACA) Chartered Accountants. Continuous audit readiness is our baseline.
                </p>
              </div>

              <div className="space-y-2">
                <div className="font-mono text-xs font-bold text-agrya-teal-700">03 / ECOSYSTEM SYNERGY</div>
                <h4 className="text-base font-bold text-agrya-slate-900">Software + Wisdom</h4>
                <p className="text-xs text-agrya-slate-600 leading-relaxed">
                  We harness automated reconciliation and digital invoice flows to compress operational overhead by up to 50%.
                </p>
              </div>
            </div>
          </div>
        </DoubleBezel>
      </section>

      {/* BOTTOM CTA */}
      <section className="text-center max-w-xl mx-auto space-y-4 pt-6">
        <h2 className="text-2xl font-bold text-agrya-slate-900">Build with financial confidence.</h2>
        <p className="text-xs sm:text-sm text-agrya-slate-600">
          Join the modern enterprises navigating their growth with Agrya Consulting.
        </p>
        <div className="pt-2">
          <ButtonInButton variant="dark" iconType="arrow-right" onClick={onOpenInquiry}>
            Connect with an Agrya Partner
          </ButtonInButton>
        </div>
      </section>

    </div>
  );
};
