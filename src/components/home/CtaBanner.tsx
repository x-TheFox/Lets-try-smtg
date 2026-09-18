import React from 'react';
import { ButtonInButton } from '../ui/ButtonInButton';
import { DoubleBezel } from '../ui/DoubleBezel';
import { Mail } from 'lucide-react';

interface CtaBannerProps {
  onOpenInquiry: () => void;
  onOpenDiagnostic?: () => void;
}

export const CtaBanner: React.FC<CtaBannerProps> = ({ onOpenInquiry, onOpenDiagnostic }) => {
  return (
    <section className="max-w-6xl mx-auto px-6 py-20">
      <DoubleBezel className="w-full">
        <div className="p-8 sm:p-14 text-center max-w-3xl mx-auto space-y-6">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-agrya-teal-50 border border-agrya-teal-200/60 text-agrya-teal-800 text-[11px] font-mono font-medium uppercase tracking-wider">
            Take Command of Your Finances
          </div>

          <h2 className="text-3xl sm:text-5xl font-extrabold text-agrya-slate-950 tracking-tight leading-tight">
            Ready to transform your <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-agrya-teal-700 to-agrya-slate-900">
              finance function?
            </span>
          </h2>

          <p className="text-base sm:text-lg text-agrya-slate-600 leading-relaxed font-normal">
            Book a consultation with our senior partners to explore how Agrya can support your growth.
          </p>

          <div className="pt-4 flex flex-wrap items-center justify-center gap-3">
            <ButtonInButton
              variant="dark"
              iconType="arrow-right"
              onClick={onOpenInquiry}
            >
              Schedule a Discovery Call
            </ButtonInButton>

            {onOpenDiagnostic && (
              <button
                onClick={onOpenDiagnostic}
                className="inline-flex items-center gap-2 bg-agrya-teal-50 hover:bg-agrya-teal-100 border border-agrya-teal-200 text-agrya-teal-800 px-5 py-2.5 rounded-full text-xs sm:text-sm font-semibold spring-snappy shadow-sm"
              >
                <span>Assess Financial Maturity (2 Min)</span>
              </button>
            )}

            <a
              href="mailto:hello@agrya.in"
              className="inline-flex items-center gap-2 bg-white hover:bg-agrya-slate-50 border border-agrya-slate-200 text-agrya-slate-800 px-5 py-2.5 rounded-full text-xs sm:text-sm font-semibold spring-snappy shadow-sm"
            >
              <Mail className="w-4 h-4 text-agrya-slate-500" />
              <span>Direct Email: hello@agrya.in</span>
            </a>
          </div>

          <div className="pt-4 text-xs font-mono text-agrya-slate-600 font-medium">
            Consultation with Partner Chartered Accountants • Confidential & NDA-Bound
          </div>
        </div>
      </DoubleBezel>
    </section>
  );
};
