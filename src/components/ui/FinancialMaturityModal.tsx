import React, { useState } from 'react';
import { X, ArrowRight, RotateCcw, Sparkles } from 'lucide-react';
import { clsx } from 'clsx';
import { trackEvent } from '../../utils/analytics';

interface FinancialMaturityModalProps {
  isOpen: boolean;
  onClose: () => void;
  onComplete: (score: number, grade: string, recommendation: string) => void;
}

interface Question {
  id: number;
  category: string;
  question: string;
  options: {
    label: string;
    points: number;
    tag: string;
  }[];
}

const QUESTIONS: Question[] = [
  {
    id: 1,
    category: 'Books Velocity & Reporting',
    question: 'How many business days after month-end do your leadership and board receive finalized, closed P&L and Balance Sheet numbers?',
    options: [
      { label: 'Within 5 business days (Institutional speed)', points: 20, tag: 'Leader' },
      { label: '6 to 15 business days (Acceptable, minor lag)', points: 14, tag: 'Standard' },
      { label: '16 to 25 business days (Frequent operational fog)', points: 8, tag: 'Lagging' },
      { label: 'Over 25 days or only during annual audit', points: 2, tag: 'Critical Risk' },
    ]
  },
  {
    id: 2,
    category: 'Runway & Burn Telemetry',
    question: 'How do you monitor your cash runway, burn multiple, and department-level budget variances?',
    options: [
      { label: 'Real-time live telemetry dashboard linked to bank & ledger', points: 20, tag: 'Automated' },
      { label: 'Updated monthly in financial model spreadsheets', points: 14, tag: 'Manual Model' },
      { label: 'Ad-hoc calculation when bank balance drops', points: 6, tag: 'Reactive' },
      { label: 'No structured runway visibility currently', points: 0, tag: 'Blind' },
    ]
  },
  {
    id: 3,
    category: 'Statutory & Tax Compliance',
    question: 'What is your current posture regarding GST returns (GSTR-1/3B/9C), TDS filings, and ROC corporate compliances?',
    options: [
      { label: 'Zero-delay, automated calendar, zero penalties in 24 months', points: 20, tag: 'A+' },
      { label: 'Mostly compliant with occasional minor penalty notices', points: 12, tag: 'Vulnerable' },
      { label: 'Significant backlog, unresolved tax notices, or pending filings', points: 4, tag: 'Audit Red Flag' },
      { label: 'Unsure of current statutory standing', points: 0, tag: 'Severe Exposure' },
    ]
  },
  {
    id: 4,
    category: 'Vendor & AP/AR Reconciliations',
    question: 'How are vendor invoices, 3-way matching, and customer collections managed?',
    options: [
      { label: 'Automated 3-way match & bi-directional Tally/ERP sync', points: 20, tag: 'Streamlined' },
      { label: 'Semi-automated with structured weekly approval batches', points: 14, tag: 'Managed' },
      { label: 'Manual physical paper invoices and ad-hoc bank NEFT transfers', points: 6, tag: 'Friction' },
      { label: 'Chaotic receipts, lost bills, and frequent invoice disputes', points: 2, tag: 'High Leakage' },
    ]
  },
  {
    id: 5,
    category: 'Investor & Diligence Readiness',
    question: 'If a tier-1 investor or lender demanded full financial data-room access tomorrow morning, how long would it take?',
    options: [
      { label: 'Immediate: Audit-ready data room updated continuously', points: 20, tag: 'Institutional' },
      { label: '2 to 5 days to clean up schedules and reconcile accounts', points: 14, tag: 'Manageable' },
      { label: '2 to 3 weeks of frantic internal scrambling and accountant overtime', points: 6, tag: 'Friction' },
      { label: 'Would likely fail or stall the investment round', points: 0, tag: 'Deal Breaker' },
    ]
  }
];

export const FinancialMaturityModal: React.FC<FinancialMaturityModalProps> = ({
  isOpen,
  onClose,
  onComplete,
}) => {
  const [currentStep, setCurrentStep] = useState<number>(0);
  const [answers, setAnswers] = useState<Record<number, number>>({});
  const [isFinished, setIsFinished] = useState<boolean>(false);

  if (!isOpen) return null;

  const totalScore = Object.values(answers).reduce((a, b) => a + b, 0);

  const getGrade = (score: number) => {
    if (score >= 85) return { grade: 'Tier 1 • Institutional Grade', color: 'text-emerald-600', rec: 'Virtual CFO Strategic Governance' };
    if (score >= 65) return { grade: 'Tier 2 • Emerging Scale', color: 'text-agrya-teal-600', rec: 'Virtual CFO + Accounting Hub Integration' };
    if (score >= 45) return { grade: 'Tier 3 • Operational Friction', color: 'text-amber-600', rec: 'Accounting Hub Overhaul & Pod Support' };
    return { grade: 'Tier 4 • Critical Compliance Exposure', color: 'text-rose-600', rec: 'Emergency Accounting Remediation & Audit Defense' };
  };

  const handleSelectOption = (questionId: number, points: number) => {
    const updated = { ...answers, [questionId]: points };
    setAnswers(updated);

    if (currentStep < QUESTIONS.length - 1) {
      setCurrentStep(currentStep + 1);
    } else {
      setIsFinished(true);
      const score = Object.values(updated).reduce((a, b) => a + b, 0);
      const { grade, rec } = getGrade(score);
      trackEvent('diagnostic_complete', { score, grade, recommendation: rec });
    }
  };

  const handleReset = () => {
    setAnswers({});
    setCurrentStep(0);
    setIsFinished(false);
  };

  const q = QUESTIONS[currentStep];
  const outcome = getGrade(totalScore);

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-agrya-slate-950/60 backdrop-blur-sm animate-fade-in">
      <div 
        className="relative w-full max-w-2xl bg-white rounded-3xl border border-agrya-slate-200 shadow-card-elevated overflow-hidden animate-modal-in"
        role="dialog"
        aria-modal="true"
      >
        {/* MODAL HEADER */}
        <div className="flex items-center justify-between px-6 sm:px-8 py-5 border-b border-agrya-slate-100 bg-agrya-slate-50/50">
          <div className="flex items-center gap-2.5">
            <div className="w-2 h-2 rounded-full bg-agrya-teal-500 animate-pulse" />
            <span className="font-mono text-xs font-bold uppercase tracking-wider text-agrya-slate-700">
              Agrya Financial Health & Maturity Index
            </span>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 rounded-full hover:bg-agrya-slate-200/70 text-agrya-slate-400 hover:text-agrya-slate-700 spring-snappy"
            aria-label="Close modal"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* CONTENT */}
        <div className="p-6 sm:p-8">
          {!isFinished ? (
            <div key={currentStep} className="space-y-6 animate-metric">
              
              {/* PROGRESS INDICATOR */}
              <div className="flex items-center justify-between text-xs font-mono text-agrya-slate-400 border-b border-agrya-slate-100 pb-3">
                <span className="text-agrya-teal-700 font-semibold uppercase">{q.category}</span>
                <span>Question {currentStep + 1} of {QUESTIONS.length}</span>
              </div>

              {/* QUESTION TITLE */}
              <h3 className="text-xl sm:text-2xl font-extrabold text-agrya-slate-900 leading-snug">
                {q.question}
              </h3>

              {/* OPTIONS */}
              <div className="space-y-3 pt-2">
                {q.options.map((opt) => (
                  <button
                    key={opt.label}
                    onClick={() => handleSelectOption(q.id, opt.points)}
                    className="w-full text-left p-4 rounded-2xl border border-agrya-slate-200 hover:border-agrya-teal-500 hover:bg-agrya-teal-50/40 spring-snappy transition-[border-color,background-color] flex items-center justify-between group active:scale-[0.99]"
                  >
                    <span className="text-xs sm:text-sm font-medium text-agrya-slate-800 group-hover:text-agrya-teal-900">
                      {opt.label}
                    </span>
                    <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-agrya-slate-100 text-agrya-slate-600 group-hover:bg-agrya-teal-100 group-hover:text-agrya-teal-800 shrink-0 ml-2">
                      {opt.tag}
                    </span>
                  </button>
                ))}
              </div>

            </div>
          ) : (
            
            /* COMPLETED SUMMARY SCREEN */
            <div className="space-y-6 text-center py-4 animate-metric">
              
              <div className="w-16 h-16 rounded-full bg-agrya-teal-50 border border-agrya-teal-200 flex items-center justify-center text-agrya-teal-700 mx-auto mb-2">
                <Sparkles className="w-8 h-8" />
              </div>

              <div>
                <span className="font-mono text-xs uppercase tracking-wider text-agrya-slate-400 font-semibold">
                  Diagnostic Composite Score
                </span>
                <div className="text-5xl font-extrabold font-mono text-agrya-slate-900 tracking-tight mt-1">
                  {totalScore} <span className="text-2xl font-normal text-agrya-slate-400">/ 100</span>
                </div>
                <div className={clsx("text-base font-bold mt-2", outcome.color)}>
                  {outcome.grade}
                </div>
              </div>

              <div className="p-5 rounded-2xl bg-agrya-slate-50 border border-agrya-slate-200 text-left space-y-2">
                <div className="text-xs font-mono font-bold text-agrya-slate-500 uppercase">Recommended Architecture:</div>
                <div className="text-sm font-bold text-agrya-slate-900">{outcome.rec}</div>
                <p className="text-xs text-agrya-slate-600 leading-relaxed pt-1">
                  Based on your responses, an engagement addressing month-end acceleration and structured statutory governance will mitigate key capital bottlenecks before your next audit or financing round.
                </p>
              </div>

              <div className="pt-2 flex flex-col sm:flex-row items-center justify-center gap-3">
                <button
                  onClick={() => {
                    onComplete(totalScore, outcome.grade, outcome.rec);
                    onClose();
                  }}
                  className="w-full sm:w-auto px-6 py-3 bg-agrya-slate-900 hover:bg-agrya-slate-800 text-white rounded-full text-xs font-semibold spring-snappy flex items-center justify-center gap-2"
                >
                  <span>Book Partner Diagnostic Review</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
                <button
                  onClick={handleReset}
                  className="text-xs font-mono text-agrya-slate-500 hover:text-agrya-slate-900 flex items-center gap-1 py-2"
                >
                  <RotateCcw className="w-3.5 h-3.5" />
                  <span>Retake Test</span>
                </button>
              </div>

            </div>
          )}
        </div>
      </div>
    </div>
  );
};
