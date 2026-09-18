import React, { useState, useEffect, useRef } from 'react';
import { DoubleBezel } from '../components/ui/DoubleBezel';
import { Badge } from '../components/ui/Badge';
import { ButtonInButton } from '../components/ui/ButtonInButton';
import { 
  ShieldCheck, 
  Scale, 
  FileText, 
  Database, 
  AlertTriangle, 
  Mail, 
  Printer, 
  Lock,
  Building2,
  CheckCircle2,
  ChevronRight
} from 'lucide-react';
import { clsx } from 'clsx';

interface TermsPageProps {
  onOpenInquiry: () => void;
  onNavigate?: (path: string) => void;
}

const CLAUSES = [
  { id: 'clause-1', number: '01', title: 'Acceptance & Fiduciary Engagement', icon: ShieldCheck },
  { id: 'clause-2', number: '02', title: 'Professional Scope & ICAI Disclaimers', icon: Scale },
  { id: 'clause-3', number: '03', title: 'Client Records & Ledger Integrity', icon: Database },
  { id: 'clause-4', number: '04', title: 'Proprietary Models & Advisory IP', icon: FileText },
  { id: 'clause-5', number: '05', title: 'Regulatory Limits & Liability', icon: AlertTriangle },
  { id: 'clause-6', number: '06', title: 'Governing Law & Dispute Resolution', icon: Building2 },
  { id: 'clause-7', number: '07', title: 'Statutory Legal Inquiries', icon: Mail },
];

export const TermsPage: React.FC<TermsPageProps> = ({ onOpenInquiry, onNavigate }) => {
  const [activeSection, setActiveSection] = useState<string>('clause-1');
  const isManualScrolling = useRef(false);
  const scrollTimeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    let ticking = false;

    const handleScroll = () => {
      if (isManualScrolling.current) return;

      if (!ticking) {
        window.requestAnimationFrame(() => {
          const scrollY = window.scrollY;
          const windowHeight = window.innerHeight;
          const documentHeight = document.documentElement.scrollHeight;

          // Bottom of page: activate last section
          if (scrollY + windowHeight >= documentHeight - 80) {
            setActiveSection(CLAUSES[CLAUSES.length - 1].id);
            ticking = false;
            return;
          }

          // Offset below sticky header
          const offset = 180;
          let current = CLAUSES[0].id;

          for (const clause of CLAUSES) {
            const el = document.getElementById(clause.id);
            if (el) {
              const rect = el.getBoundingClientRect();
              if (rect.top <= offset) {
                current = clause.id;
              } else {
                break;
              }
            }
          }

          setActiveSection(current);
          ticking = false;
        });
        ticking = true;
      }
    };

    const handleUserInterrupt = () => {
      if (isManualScrolling.current) {
        isManualScrolling.current = false;
        if (scrollTimeoutRef.current) clearTimeout(scrollTimeoutRef.current);
      }
    };

    handleScroll();

    window.addEventListener('scroll', handleScroll, { passive: true });
    window.addEventListener('wheel', handleUserInterrupt, { passive: true });
    window.addEventListener('touchstart', handleUserInterrupt, { passive: true });

    return () => {
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('wheel', handleUserInterrupt);
      window.removeEventListener('touchstart', handleUserInterrupt);
      if (scrollTimeoutRef.current) clearTimeout(scrollTimeoutRef.current);
    };
  }, []);

  const scrollToSection = (id: string) => {
    setActiveSection(id);
    isManualScrolling.current = true;
    if (scrollTimeoutRef.current) clearTimeout(scrollTimeoutRef.current);

    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth', block: 'start' });
      if (window.history.replaceState) {
        window.history.replaceState(null, '', `#${id}`);
      }
    }

    scrollTimeoutRef.current = setTimeout(() => {
      isManualScrolling.current = false;
    }, 800);
  };

  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="max-w-6xl mx-auto px-6 pt-12 pb-24 space-y-12">
      
      {/* TOP LEGAL SURFACE SELECTOR */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-agrya-slate-200/80">
        <div className="flex items-center gap-2">
          <Badge variant="teal" pulse>Statutory Governance</Badge>
          <span className="text-xs font-mono text-agrya-slate-400">•</span>
          <span className="text-xs font-mono text-agrya-slate-500">Agrya Consulting Private Limited</span>
        </div>

        {/* SWITCHER TABS: TERMS VS PRIVACY */}
        <div className="inline-flex p-1 rounded-xl bg-agrya-slate-100 border border-agrya-slate-200 text-xs font-semibold">
          <button
            className="px-4 py-1.5 rounded-lg bg-white text-agrya-slate-900 shadow-sm transition-all"
            disabled
          >
            Terms of Service
          </button>
          <button
            onClick={() => onNavigate?.('/privacy')}
            className="px-4 py-1.5 rounded-lg text-agrya-slate-600 hover:text-agrya-slate-900 transition-all flex items-center gap-1"
          >
            <span>Privacy Policy</span>
            <ChevronRight className="w-3.5 h-3.5 opacity-60" />
          </button>
        </div>
      </div>

      {/* HERO SECTION */}
      <section className="space-y-4 max-w-3xl">
        <h1 className="text-4xl sm:text-6xl font-extrabold text-agrya-slate-950 tracking-tight leading-[1.1]">
          Terms of Service & Fiduciary Charter
        </h1>
        <p className="text-base sm:text-xl text-agrya-slate-600 leading-relaxed font-normal">
          Fiduciary engagement standards, regulatory operating boundaries, and professional terms governed by Agrya Consulting Private Limited under the laws of India.
        </p>

        {/* METADATA STRIP */}
        <div className="pt-2 flex flex-wrap items-center gap-x-6 gap-y-2 text-xs font-mono text-agrya-slate-500">
          <div><strong className="text-agrya-slate-700">Effective:</strong> September 2026</div>
          <div><strong className="text-agrya-slate-700">Jurisdiction:</strong> Chennai, Tamil Nadu, IN</div>
          <div><strong className="text-agrya-slate-700">Statutory Framework:</strong> Companies Act 2013 / ICAI</div>
          <button 
            onClick={handlePrint} 
            className="inline-flex items-center gap-1.5 text-agrya-teal-700 hover:text-agrya-teal-800 font-semibold underline underline-offset-4"
          >
            <Printer className="w-3.5 h-3.5" />
            <span>Print Executive PDF</span>
          </button>
        </div>
      </section>

      {/* 3-PILLAR EXECUTIVE SUMMARY BENTO */}
      <section className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <DoubleBezel className="h-full">
          <div className="p-6 space-y-2">
            <div className="flex items-center justify-between">
              <span className="font-mono text-[10px] uppercase font-bold text-agrya-teal-700">01 / Scope Standard</span>
              <Scale className="w-4 h-4 text-agrya-teal-600" />
            </div>
            <h3 className="text-sm font-bold text-agrya-slate-900">Virtual CFO & Advisory</h3>
            <p className="text-xs text-agrya-slate-600 leading-relaxed">
              Led by practicing Fellows (FCA) and Associates (ACA) of ICAI, delivering strategic advisory, FP&A, and management accounting.
            </p>
          </div>
        </DoubleBezel>

        <DoubleBezel className="h-full">
          <div className="p-6 space-y-2">
            <div className="flex items-center justify-between">
              <span className="font-mono text-[10px] uppercase font-bold text-agrya-teal-700">02 / Ownership</span>
              <Database className="w-4 h-4 text-agrya-teal-600" />
            </div>
            <h3 className="text-sm font-bold text-agrya-slate-900">100% Client Records</h3>
            <p className="text-xs text-agrya-slate-600 leading-relaxed">
              All financial books, source invoices, and transactional ledgers remain exclusive client property across all ERP integrations.
            </p>
          </div>
        </DoubleBezel>

        <DoubleBezel className="h-full">
          <div className="p-6 space-y-2">
            <div className="flex items-center justify-between">
              <span className="font-mono text-[10px] uppercase font-bold text-agrya-teal-700">03 / Independence</span>
              <ShieldCheck className="w-4 h-4 text-agrya-teal-600" />
            </div>
            <h3 className="text-sm font-bold text-agrya-slate-900">Statutory Independence</h3>
            <p className="text-xs text-agrya-slate-600 leading-relaxed">
              Clear statutory firewall between management accounting operations and independent external audit attestations under the CA Act, 1949.
            </p>
          </div>
        </DoubleBezel>
      </section>

      {/* TWO-COLUMN CONTENT GRID */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start pt-4">
        
        {/* LEFT COLUMN: STICKY TABLE OF CONTENTS & COUNSEL CARD */}
        <aside className="lg:col-span-4 space-y-6 lg:sticky lg:top-28">
          <div className="p-5 rounded-2xl bg-white border border-agrya-slate-200/90 shadow-sm space-y-3">
            <div className="font-mono text-xs font-bold uppercase tracking-wider text-agrya-slate-400">
              Table of Contents
            </div>
            <nav className="space-y-1">
              {CLAUSES.map((c) => {
                const Icon = c.icon;
                const isActive = activeSection === c.id;
                return (
                  <button
                    key={c.id}
                    onClick={() => scrollToSection(c.id)}
                    className={clsx(
                      "w-full text-left px-3 py-2.5 rounded-xl text-xs font-medium flex items-center justify-between transition-all group border",
                      isActive 
                        ? "bg-agrya-teal-50 text-agrya-teal-900 font-bold border-agrya-teal-200 shadow-sm" 
                        : "text-agrya-slate-600 hover:bg-agrya-slate-50 hover:text-agrya-slate-900 border-transparent"
                    )}
                  >
                    <div className="flex items-center gap-2.5 min-w-0">
                      <Icon className={clsx("w-3.5 h-3.5 shrink-0 transition-colors", isActive ? "text-agrya-teal-700" : "text-agrya-slate-400 group-hover:text-agrya-slate-600")} />
                      <span className="truncate">
                        <span className="font-mono text-[11px] opacity-75 mr-1.5">{c.number}.</span>
                        {c.title}
                      </span>
                    </div>
                    <div className={clsx(
                      "w-1.5 h-1.5 rounded-full transition-all shrink-0 ml-2",
                      isActive ? "bg-agrya-teal-600 scale-100 opacity-100" : "bg-transparent scale-50 opacity-0"
                    )} />
                  </button>
                );
              })}
            </nav>
          </div>

          {/* COUNSEL & ENTERPRISE CONTRACTS CARD */}
          <div className="p-5 rounded-2xl bg-agrya-slate-900 text-white border border-agrya-slate-800 space-y-3 shadow-md">
            <div className="flex items-center gap-2 text-xs font-mono text-agrya-teal-400 uppercase font-semibold">
              <Lock className="w-3.5 h-3.5" />
              <span>Enterprise Legal Desk</span>
            </div>
            <h4 className="text-sm font-bold text-white">Custom MSA & SLA Agreements</h4>
            <p className="text-xs text-agrya-slate-300 leading-relaxed">
              Require an enterprise Master Services Agreement (MSA), custom pod SLA, or institutional data security addendum?
            </p>
            <div className="pt-2">
              <a
                href="mailto:jk@agrya.in?subject=Enterprise%20MSA%20Inquiry%20-%20Agrya"
                className="inline-flex items-center gap-1.5 text-xs font-mono font-bold text-agrya-teal-300 hover:text-white underline underline-offset-4"
              >
                <Mail className="w-3.5 h-3.5" /> Contact jk@agrya.in
              </a>
            </div>
          </div>
        </aside>

        {/* RIGHT COLUMN: MAIN CLAUSE STREAM */}
        <main className="lg:col-span-8 space-y-8 text-agrya-slate-700 text-sm sm:text-base leading-relaxed">
          
          {/* CLAUSE 1 */}
          <section id="clause-1" className="scroll-mt-32">
            <DoubleBezel className="w-full">
              <div className="p-6 sm:p-8 space-y-4">
                <div className="flex items-center justify-between pb-3 border-b border-agrya-slate-100">
                  <span className="font-mono text-xs font-bold uppercase text-agrya-teal-700">Clause 01 // Agreement Scope</span>
                  <ShieldCheck className="w-5 h-5 text-agrya-teal-700" />
                </div>
                <h2 className="text-xl font-bold text-agrya-slate-900">
                  1. Acceptance & Fiduciary Engagement Agreement
                </h2>
                <div className="p-3.5 rounded-xl bg-agrya-slate-50 border border-agrya-slate-200/80 text-xs font-mono text-agrya-slate-700">
                  <strong>Key Summary:</strong> Accessing Agrya platforms, tools, or contracting advisory pods constitutes formal acceptance of these governing terms and privacy protocols.
                </div>
                <p>
                  By accessing this website, utilizing any interactive financial modeling calculators, or entering into an advisory relationship with <strong>Agrya Consulting Private Limited</strong> (&ldquo;Agrya&rdquo;, &ldquo;we&rdquo;, &ldquo;us&rdquo;, or &ldquo;our&rdquo;), you acknowledge that you have read, understood, and agreed to be bound by these Terms of Service, together with our Privacy Policy and all applicable statutory frameworks established under Indian law.
                </p>
                <p>
                  If you are entering into this agreement on behalf of a corporate entity, company, or partnership, you represent and warrant that you possess full corporate and legal authority to bind that entity to these Terms.
                </p>
              </div>
            </DoubleBezel>
          </section>

          {/* CLAUSE 2 */}
          <section id="clause-2" className="scroll-mt-32">
            <DoubleBezel className="w-full">
              <div className="p-6 sm:p-8 space-y-4">
                <div className="flex items-center justify-between pb-3 border-b border-agrya-slate-100">
                  <span className="font-mono text-xs font-bold uppercase text-agrya-teal-700">Clause 02 // Regulatory Boundaries</span>
                  <Scale className="w-5 h-5 text-agrya-teal-700" />
                </div>
                <h2 className="text-xl font-bold text-agrya-slate-900">
                  2. Professional Scope & ICAI Fiduciary Disclaimers
                </h2>
                <p>
                  Agrya Consulting Private Limited provides specialized Virtual CFO advisory, management accounting, statutory compliance coordination, and financial systems architecture. 
                </p>
                
                {/* HIGH-SECURITY STATUTORY NOTICE CALLOUT */}
                <div className="p-5 rounded-2xl bg-amber-50/70 border border-amber-200/90 text-amber-950 space-y-2">
                  <div className="flex items-center gap-2 text-xs font-mono font-bold uppercase text-amber-900">
                    <AlertTriangle className="w-4 h-4 text-amber-700 shrink-0" />
                    <span>Statutory Regulatory Notice • Chartered Accountants Act, 1949</span>
                  </div>
                  <p className="text-xs sm:text-sm leading-relaxed font-sans">
                    Engagements requiring formal statutory audit attestations, tax audit reports, or regulatory certifications governed exclusively under the Chartered Accountants Act, 1949, are performed in direct coordination with independent Chartered Accountant firms led by practicing Fellows (FCA) or Associates (ACA) of the Institute of Chartered Accountants of India (ICAI).
                  </p>
                  <p className="text-[11px] font-mono text-amber-800/90 pt-1 border-t border-amber-200">
                    * Dynamic financial calculators, archetypes, and runway projections on this site are for strategic evaluation and modeling. They do not constitute formal tax opinions, audit certificates, or investment guarantees until executed within a formal Statement of Work (SOW).
                  </p>
                </div>
              </div>
            </DoubleBezel>
          </section>

          {/* CLAUSE 3 */}
          <section id="clause-3" className="scroll-mt-32">
            <DoubleBezel className="w-full">
              <div className="p-6 sm:p-8 space-y-4">
                <div className="flex items-center justify-between pb-3 border-b border-agrya-slate-100">
                  <span className="font-mono text-xs font-bold uppercase text-agrya-teal-700">Clause 03 // Ledger Verification</span>
                  <Database className="w-5 h-5 text-agrya-teal-700" />
                </div>
                <h2 className="text-xl font-bold text-agrya-slate-900">
                  3. Client Records & Ledger Integrity
                </h2>
                <p>
                  Institutional accounting and accelerated month-end closures depend strictly upon the timely submission and authenticity of primary transactional evidence provided by client entities:
                </p>
                <ul className="space-y-2 text-xs sm:text-sm">
                  <li className="flex items-start gap-2">
                    <CheckCircle2 className="w-4 h-4 text-agrya-teal-600 shrink-0 mt-0.5" />
                    <span><strong>Transactional Truth:</strong> Clients remain solely responsible for the authenticity and completeness of vouchers, bank authorizations, invoices, and expense approvals submitted across platforms (including Tally Prime, Zoho Books, QuickBooks, or Effortless OS).</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle2 className="w-4 h-4 text-agrya-teal-600 shrink-0 mt-0.5" />
                    <span><strong>Statutory Timelines:</strong> Agrya pod turnaround targets rely upon prompt verification of clarification queues and OTP/DSC authorizations for statutory portal filings (GSTN, TRACES, MCA-21).</span>
                  </li>
                </ul>
              </div>
            </DoubleBezel>
          </section>

          {/* CLAUSE 4 */}
          <section id="clause-4" className="scroll-mt-32">
            <DoubleBezel className="w-full">
              <div className="p-6 sm:p-8 space-y-4">
                <div className="flex items-center justify-between pb-3 border-b border-agrya-slate-100">
                  <span className="font-mono text-xs font-bold uppercase text-agrya-teal-700">Clause 04 // Intellectual Property</span>
                  <FileText className="w-5 h-5 text-agrya-teal-700" />
                </div>
                <h2 className="text-xl font-bold text-agrya-slate-900">
                  4. Proprietary Models & Advisory IP
                </h2>
                <p>
                  All custom financial templates, sensitivity formulas, cash burn forecasting algorithms, and operational SOP architectures created by Agrya remain the proprietary intellectual property of Agrya Consulting Private Limited. Active clients receive a non-exclusive, perpetual internal license to utilize completed financial workpapers for their operational management and investor reporting.
                </p>
              </div>
            </DoubleBezel>
          </section>

          {/* CLAUSE 5 */}
          <section id="clause-5" className="scroll-mt-32">
            <DoubleBezel className="w-full">
              <div className="p-6 sm:p-8 space-y-4">
                <div className="flex items-center justify-between pb-3 border-b border-agrya-slate-100">
                  <span className="font-mono text-xs font-bold uppercase text-agrya-teal-700">Clause 05 // Liability Limitations</span>
                  <AlertTriangle className="w-5 h-5 text-agrya-teal-700" />
                </div>
                <h2 className="text-xl font-bold text-agrya-slate-900">
                  5. Regulatory Limits & Limitation of Liability
                </h2>
                <p>
                  To the maximum extent permitted by applicable Indian jurisprudence, Agrya Consulting Private Limited and its partners shall not be held liable for indirect, incidental, punitive, or consequential damages resulting from:
                </p>
                <ul className="list-disc pl-5 space-y-1.5 text-xs sm:text-sm text-agrya-slate-600">
                  <li>Unscheduled statutory server downtime, portal latency, or system lockouts on government infrastructure (including GSTN, Income Tax e-Filing, and MCA-21).</li>
                  <li>Incomplete or fraudulent transactional source data supplied by client personnel.</li>
                  <li>Delays stemming from unapproved client bank reconciliations or pending director KYC.</li>
                </ul>
              </div>
            </DoubleBezel>
          </section>

          {/* CLAUSE 6 */}
          <section id="clause-6" className="scroll-mt-32">
            <DoubleBezel className="w-full">
              <div className="p-6 sm:p-8 space-y-4">
                <div className="flex items-center justify-between pb-3 border-b border-agrya-slate-100">
                  <span className="font-mono text-xs font-bold uppercase text-agrya-teal-700">Clause 06 // Legal Jurisdiction</span>
                  <Building2 className="w-5 h-5 text-agrya-teal-700" />
                </div>
                <h2 className="text-xl font-bold text-agrya-slate-900">
                  6. Governing Law & Dispute Resolution
                </h2>
                <p>
                  These Terms and any non-contractual obligations arising out of or in connection with them shall be governed by, construed, and enforced strictly in accordance with the substantive laws of the Republic of India. The competent courts in <strong>Chennai, Tamil Nadu</strong> shall hold exclusive territorial jurisdiction over any disputes arising from or relating to Agrya engagements.
                </p>
              </div>
            </DoubleBezel>
          </section>

          {/* CLAUSE 7 */}
          <section id="clause-7" className="scroll-mt-32">
            <DoubleBezel className="w-full">
              <div className="p-6 sm:p-8 space-y-4">
                <div className="flex items-center justify-between pb-3 border-b border-agrya-slate-100">
                  <span className="font-mono text-xs font-bold uppercase text-agrya-teal-700">Clause 07 // Direct Counsel</span>
                  <Mail className="w-5 h-5 text-agrya-teal-700" />
                </div>
                <h2 className="text-xl font-bold text-agrya-slate-900">
                  7. Statutory Legal Inquiries & Governance
                </h2>
                <p className="text-xs sm:text-sm text-agrya-slate-600">
                  For formal statutory correspondence, contract negotiation, or compliance clarifications, please contact our Managing Partner desk:
                </p>
                <div className="p-4 rounded-xl bg-agrya-slate-50 border border-agrya-slate-200/80 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                  <div>
                    <div className="font-bold text-sm text-agrya-slate-900">Jayakumar M, FCA, ACS</div>
                    <div className="text-xs font-mono text-agrya-slate-500">Co-founder and Managing Partner • Corporate Legal Desk</div>
                  </div>
                  <a
                    href="mailto:jk@agrya.in?subject=Statutory%20Legal%20Inquiry%20-%20Agrya"
                    className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-white border border-agrya-slate-200 text-agrya-teal-800 text-xs font-mono font-bold hover:bg-agrya-teal-50 transition-colors shadow-sm"
                  >
                    <Mail className="w-4 h-4 text-agrya-teal-700" /> jk@agrya.in
                  </a>
                </div>
              </div>
            </DoubleBezel>
          </section>

        </main>
      </div>

      {/* BOTTOM ACTION CARD */}
      <section className="mt-12">
        <div className="rounded-3xl bg-agrya-slate-900 text-white p-8 sm:p-12 border border-agrya-slate-800 text-center space-y-6 max-w-4xl mx-auto shadow-xl relative overflow-hidden">
          <div className="max-w-2xl mx-auto space-y-3 relative z-10">
            <span className="text-xs font-mono font-semibold uppercase tracking-wider text-agrya-teal-400">
              Enterprise Governance
            </span>
            <h2 className="text-2xl sm:text-4xl font-extrabold text-white tracking-tight">
              Ready to structure your corporate finances?
            </h2>
            <p className="text-xs sm:text-sm text-agrya-slate-300 leading-relaxed">
              Connect directly with an Agrya Partner CA to evaluate Virtual CFO leadership, accounting pods, and custom enterprise SLAs.
            </p>
          </div>

          <div className="pt-2 flex flex-wrap items-center justify-center gap-4 relative z-10">
            <ButtonInButton variant="primary" iconType="arrow-right" onClick={onOpenInquiry}>
              Initiate Strategic Partner Briefing
            </ButtonInButton>
            <a
              href="mailto:jk@agrya.in"
              className="inline-flex items-center gap-2 px-6 py-3 rounded-full border border-agrya-slate-700 bg-agrya-slate-800/80 hover:bg-agrya-slate-800 text-white text-xs font-semibold spring-snappy shadow-sm"
            >
              Direct: jk@agrya.in
            </a>
          </div>

          {/* SUBTLE GLOW */}
          <div className="absolute -bottom-12 -right-12 w-48 h-48 bg-agrya-teal-500/10 rounded-full blur-3xl pointer-events-none" />
        </div>
      </section>

    </div>
  );
};
