import React, { useState, useEffect, useRef } from 'react';
import { DoubleBezel } from '../components/ui/DoubleBezel';
import { Badge } from '../components/ui/Badge';
import { ButtonInButton } from '../components/ui/ButtonInButton';
import { 
  Lock, 
  ShieldCheck, 
  FileCheck, 
  Trash2, 
  Mail, 
  Printer, 
  EyeOff, 
  Cpu, 
  CheckCircle2, 
  UserCheck
} from 'lucide-react';
import { clsx } from 'clsx';

interface PrivacyPageProps {
  onOpenInquiry: () => void;
  onNavigate?: (path: string) => void;
}

const SECTIONS = [
  { id: 'privacy-1', number: '01', title: 'Fiduciary Commitment & Governance', icon: ShieldCheck },
  { id: 'privacy-2', number: '02', title: 'Categories of Information Gathered', icon: FileCheck },
  { id: 'privacy-3', number: '03', title: 'Lawful Grounds & Zero Monetization', icon: EyeOff },
  { id: 'privacy-4', number: '04', title: 'TLS 1.3 Encryption & Security', icon: Lock },
  { id: 'privacy-5', number: '05', title: 'Retention & Right to Erasure', icon: Trash2 },
  { id: 'privacy-6', number: '06', title: 'Data Protection Officer & Redressal', icon: Mail },
];

export const PrivacyPage: React.FC<PrivacyPageProps> = ({ onOpenInquiry, onNavigate }) => {
  const [activeSection, setActiveSection] = useState<string>('privacy-1');
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
            setActiveSection(SECTIONS[SECTIONS.length - 1].id);
            ticking = false;
            return;
          }

          // Offset below sticky header
          const offset = 180;
          let current = SECTIONS[0].id;

          for (const section of SECTIONS) {
            const el = document.getElementById(section.id);
            if (el) {
              const rect = el.getBoundingClientRect();
              if (rect.top <= offset) {
                current = section.id;
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
          <Badge variant="teal" pulse>Confidentiality & Security</Badge>
          <span className="text-xs font-mono text-agrya-slate-400">•</span>
          <span className="text-xs font-mono text-agrya-slate-500">Agrya Consulting Private Limited</span>
        </div>

        {/* SWITCHER TABS: TERMS VS PRIVACY */}
        <div className="inline-flex p-1 rounded-xl bg-agrya-slate-100 border border-agrya-slate-200 text-xs font-semibold">
          <button
            onClick={() => onNavigate?.('/terms')}
            className="px-4 py-1.5 rounded-lg text-agrya-slate-600 hover:text-agrya-slate-900 transition-[background-color,color] flex items-center gap-1"
          >
            <span>Terms of Service</span>
          </button>
          <button
            className="px-4 py-1.5 rounded-lg bg-white text-agrya-slate-900 shadow-sm transition-[background-color,color,box-shadow]"
            disabled
          >
            Privacy Policy
          </button>
        </div>
      </div>

      {/* HERO SECTION */}
      <section className="space-y-4 max-w-3xl">
        <h1 className="text-4xl sm:text-6xl font-extrabold text-agrya-slate-950 tracking-tight leading-[1.1]">
          Privacy & Information Security Policy
        </h1>
        <p className="text-base sm:text-xl text-agrya-slate-600 leading-relaxed font-normal">
          Institutional-grade fiduciary data protection standards, strict zero-monetization guarantees, and compliance with the Digital Personal Data Protection Act, 2023 (DPDP).
        </p>

        {/* METADATA STRIP */}
        <div className="pt-2 flex flex-wrap items-center gap-x-6 gap-y-2 text-xs font-mono text-agrya-slate-500">
          <div><strong className="text-agrya-slate-700">Effective:</strong> September 2026</div>
          <div><strong className="text-agrya-slate-700">Compliance:</strong> DPDP Act 2023 / IT Act 2000</div>
          <div><strong className="text-agrya-slate-700">Transmission:</strong> TLS 1.3 End-to-End</div>
          <button 
            onClick={handlePrint} 
            className="inline-flex items-center gap-1.5 text-agrya-teal-700 hover:text-agrya-teal-800 font-semibold underline underline-offset-4"
          >
            <Printer className="w-3.5 h-3.5" />
            <span>Print Executive PDF</span>
          </button>
        </div>
      </section>

      {/* 3-PILLAR PRIVACY PILLARS BENTO */}
      <section className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <DoubleBezel className="h-full">
          <div className="p-6 space-y-2">
            <div className="flex items-center justify-between">
              <span className="font-mono text-[10px] uppercase font-bold text-agrya-teal-700">01 / Zero Brokering</span>
              <EyeOff className="w-4 h-4 text-agrya-teal-600" />
            </div>
            <h3 className="text-sm font-bold text-agrya-slate-900">Never Sold or Monetized</h3>
            <p className="text-xs text-agrya-slate-600 leading-relaxed">
              We never sell, rent, license, or broker corporate financials or executive personal details to any third-party marketing network.
            </p>
          </div>
        </DoubleBezel>

        <DoubleBezel className="h-full">
          <div className="p-6 space-y-2">
            <div className="flex items-center justify-between">
              <span className="font-mono text-[10px] uppercase font-bold text-agrya-teal-700">02 / Local Processing</span>
              <Cpu className="w-4 h-4 text-agrya-teal-600" />
            </div>
            <h3 className="text-sm font-bold text-agrya-slate-900">Client-Side Simulations</h3>
            <p className="text-xs text-agrya-slate-600 leading-relaxed">
              Interactive financial calculators (Runway Simulator & Burn Models) execute purely in your browser memory until explicitly submitted.
            </p>
          </div>
        </DoubleBezel>

        <DoubleBezel className="h-full">
          <div className="p-6 space-y-2">
            <div className="flex items-center justify-between">
              <span className="font-mono text-[10px] uppercase font-bold text-agrya-teal-700">03 / Encryption</span>
              <Lock className="w-4 h-4 text-agrya-teal-600" />
            </div>
            <h3 className="text-sm font-bold text-agrya-slate-900">TLS 1.3 & Isolated Vaults</h3>
            <p className="text-xs text-agrya-slate-600 leading-relaxed">
              Briefs and consultation requests transmit across encrypted TLS 1.3 channels with multi-tenant data room isolation.
            </p>
          </div>
        </DoubleBezel>
      </section>

      {/* TWO-COLUMN CONTENT GRID */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start pt-4">
        
        {/* LEFT COLUMN: STICKY TABLE OF CONTENTS & PRIVACY DESK CARD */}
        <aside className="lg:col-span-4 space-y-6 lg:sticky lg:top-28">
          <div className="p-5 rounded-2xl bg-white border border-agrya-slate-200/90 shadow-sm space-y-3">
            <div className="font-mono text-xs font-bold uppercase tracking-wider text-agrya-slate-400">
              Policy Sections
            </div>
            <nav className="space-y-1">
              {SECTIONS.map((s) => {
                const Icon = s.icon;
                const isActive = activeSection === s.id;
                return (
                  <button
                    key={s.id}
                    onClick={() => scrollToSection(s.id)}
                    className={clsx(
                      "w-full text-left px-3 py-2.5 rounded-xl text-xs font-medium flex items-center justify-between transition-[background-color,color,border-color,box-shadow] group border",
                      isActive 
                        ? "bg-agrya-teal-50 text-agrya-teal-900 font-bold border-agrya-teal-200 shadow-sm" 
                        : "text-agrya-slate-600 hover:bg-agrya-slate-50 hover:text-agrya-slate-900 border-transparent"
                    )}
                  >
                    <div className="flex items-center gap-2.5 min-w-0">
                      <Icon className={clsx("w-3.5 h-3.5 shrink-0 transition-colors", isActive ? "text-agrya-teal-700" : "text-agrya-slate-400 group-hover:text-agrya-slate-600")} />
                      <span className="truncate">
                        <span className="font-mono text-[11px] opacity-75 mr-1.5">{s.number}.</span>
                        {s.title}
                      </span>
                    </div>
                    <div className={clsx(
                      "w-1.5 h-1.5 rounded-full transition-[background-color,transform,opacity] shrink-0 ml-2",
                      isActive ? "bg-agrya-teal-600 scale-100 opacity-100" : "bg-transparent scale-50 opacity-0"
                    )} />
                  </button>
                );
              })}
            </nav>
          </div>

          {/* PRIVACY OFFICER CARD */}
          <div className="p-5 rounded-2xl bg-agrya-slate-900 text-white border border-agrya-slate-800 space-y-3 shadow-md">
            <div className="flex items-center gap-2 text-xs font-mono text-agrya-teal-400 uppercase font-semibold">
              <UserCheck className="w-3.5 h-3.5" />
              <span>Data Protection Officer</span>
            </div>
            <h4 className="text-sm font-bold text-white">Direct Fiduciary Inquiries</h4>
            <p className="text-xs text-agrya-slate-300 leading-relaxed">
              Require an executed Data Processing Addendum (DPA) or wish to file a formal data subject redaction request?
            </p>
            <div className="pt-2">
              <a
                href="mailto:jk@agrya.in?subject=Data%20Privacy%20Inquiry%20-%20Agrya"
                className="inline-flex items-center gap-1.5 text-xs font-mono font-bold text-agrya-teal-300 hover:text-white underline underline-offset-4"
              >
                <Mail className="w-3.5 h-3.5" /> Contact jk@agrya.in
              </a>
            </div>
          </div>
        </aside>

        {/* RIGHT COLUMN: MAIN PRIVACY CLAUSE STREAM */}
        <main className="lg:col-span-8 space-y-8 text-agrya-slate-700 text-sm sm:text-base leading-relaxed">
          
          {/* SECTION 1 */}
          <section id="privacy-1" className="scroll-mt-32">
            <DoubleBezel className="w-full">
              <div className="p-6 sm:p-8 space-y-4">
                <div className="flex items-center justify-between pb-3 border-b border-agrya-slate-100">
                  <span className="font-mono text-xs font-bold uppercase text-agrya-teal-700">Section 01 // Fiduciary Security</span>
                  <ShieldCheck className="w-5 h-5 text-agrya-teal-700" />
                </div>
                <h2 className="text-xl font-bold text-agrya-slate-900">
                  1. Fiduciary Commitment & Statutory Governance
                </h2>
                <div className="p-3.5 rounded-xl bg-agrya-slate-50 border border-agrya-slate-200/80 text-xs font-mono text-agrya-slate-700">
                  <strong>Statutory Foundation:</strong> Governed by the Digital Personal Data Protection Act, 2023 (DPDP) and the Information Technology Act, 2000.
                </div>
                <p>
                  At <strong>Agrya Consulting Private Limited</strong> (&ldquo;Agrya&rdquo;), financial confidentiality is the bedrock of our chartered accounting practice. As advisors managing sensitive ledger infrastructure, capital tables, and corporate burn data, we maintain fiduciary-tier data security controls across all digital interactions and client engagements.
                </p>
              </div>
            </DoubleBezel>
          </section>

          {/* SECTION 2 */}
          <section id="privacy-2" className="scroll-mt-32">
            <DoubleBezel className="w-full">
              <div className="p-6 sm:p-8 space-y-4">
                <div className="flex items-center justify-between pb-3 border-b border-agrya-slate-100">
                  <span className="font-mono text-xs font-bold uppercase text-agrya-teal-700">Section 02 // Information Scope</span>
                  <FileCheck className="w-5 h-5 text-agrya-teal-700" />
                </div>
                <h2 className="text-xl font-bold text-agrya-slate-900">
                  2. Categories of Information Gathered
                </h2>
                <p>
                  We collect and process only the minimal data strictly required to deliver management accounting, Virtual CFO leadership, and statutory compliance coordination:
                </p>
                <div className="space-y-3 pt-2">
                  <div className="p-4 rounded-xl bg-agrya-slate-50 border border-agrya-slate-100 space-y-1">
                    <div className="font-bold text-xs text-agrya-slate-900 uppercase font-mono text-agrya-teal-800">A. Corporate Briefing Information</div>
                    <p className="text-xs text-agrya-slate-600 leading-relaxed">
                      Company trade name, legal incorporation structure, monthly expenditure range, target launch milestones, and operational bottlenecks submitted during consultation requests.
                    </p>
                  </div>
                  <div className="p-4 rounded-xl bg-agrya-slate-50 border border-agrya-slate-100 space-y-1">
                    <div className="font-bold text-xs text-agrya-slate-900 uppercase font-mono text-agrya-teal-800">B. Executive Stakeholder Details</div>
                    <p className="text-xs text-agrya-slate-600 leading-relaxed">
                      Officer name, corporate email address, and telephone contact provided for calendar invites and diagnostic delivery.
                    </p>
                  </div>
                  <div className="p-4 rounded-xl bg-agrya-slate-50 border border-agrya-slate-100 space-y-1">
                    <div className="font-bold text-xs text-agrya-slate-900 uppercase font-mono text-agrya-teal-800">C. Interactive Financial Simulator Variables</div>
                    <p className="text-xs text-agrya-slate-600 leading-relaxed">
                      Runway balance, monthly gross burn, and headcount parameters tested on our public calculators run purely client-side in your local browser runtime. They are not transmitted or logged on our servers unless you deliberately choose to submit them via the briefing form.
                    </p>
                  </div>
                </div>
              </div>
            </DoubleBezel>
          </section>

          {/* SECTION 3 */}
          <section id="privacy-3" className="scroll-mt-32">
            <DoubleBezel className="w-full">
              <div className="p-6 sm:p-8 space-y-4">
                <div className="flex items-center justify-between pb-3 border-b border-agrya-slate-100">
                  <span className="font-mono text-xs font-bold uppercase text-agrya-teal-700">Section 03 // Lawful Grounds</span>
                  <EyeOff className="w-5 h-5 text-agrya-teal-700" />
                </div>
                <h2 className="text-xl font-bold text-agrya-slate-900">
                  3. Lawful Grounds & Zero Monetization Pledge
                </h2>
                <div className="p-4 rounded-2xl bg-emerald-50 border border-emerald-200 text-emerald-950 font-medium text-xs sm:text-sm flex items-start gap-2.5">
                  <CheckCircle2 className="w-5 h-5 text-emerald-600 shrink-0 mt-0.5" />
                  <span>
                    <strong>Strict Fiduciary Standard:</strong> Agrya Consulting Private Limited does not sell, rent, monetize, or broker corporate client data, cap tables, or executive contact details to any third party under any circumstances.
                  </span>
                </div>
                <p>
                  We process submitted data exclusively for legitimate operational reasons:
                </p>
                <ul className="list-disc pl-5 space-y-1.5 text-xs sm:text-sm text-agrya-slate-600">
                  <li>Preparing customized Virtual CFO diagnostic proposals and service scoping.</li>
                  <li>Scheduling confirmed consultation calls with our Partner Chartered Accountants.</li>
                  <li>Ensuring audit trail preservation required under Indian corporate and tax laws.</li>
                </ul>
              </div>
            </DoubleBezel>
          </section>

          {/* SECTION 4 */}
          <section id="privacy-4" className="scroll-mt-32">
            <DoubleBezel className="w-full">
              <div className="p-6 sm:p-8 space-y-4">
                <div className="flex items-center justify-between pb-3 border-b border-agrya-slate-100">
                  <span className="font-mono text-xs font-bold uppercase text-agrya-teal-700">Section 04 // Infrastructure Security</span>
                  <Lock className="w-5 h-5 text-agrya-teal-700" />
                </div>
                <h2 className="text-xl font-bold text-agrya-slate-900">
                  4. TLS 1.3 Encryption & Technical Safeguards
                </h2>
                <p>
                  All digital information exchanged with Agrya is fortified with modern technical protocols:
                </p>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
                  <div className="p-4 rounded-xl bg-agrya-slate-50 border border-agrya-slate-200/80 space-y-1">
                    <div className="text-xs font-mono font-bold text-agrya-slate-900">Transport Security</div>
                    <p className="text-xs text-agrya-slate-600">
                      Strict Transport Security (HSTS) and mandatory TLS 1.3 encryption across all public and authenticated endpoints.
                    </p>
                  </div>
                  <div className="p-4 rounded-xl bg-agrya-slate-50 border border-agrya-slate-200/80 space-y-1">
                    <div className="text-xs font-mono font-bold text-agrya-slate-900">Durable Intake Buffering</div>
                    <p className="text-xs text-agrya-slate-600">
                      Client-side failover storage preventing brief loss during network interruptions or statutory portal latency.
                    </p>
                  </div>
                </div>
              </div>
            </DoubleBezel>
          </section>

          {/* SECTION 5 */}
          <section id="privacy-5" className="scroll-mt-32">
            <DoubleBezel className="w-full">
              <div className="p-6 sm:p-8 space-y-4">
                <div className="flex items-center justify-between pb-3 border-b border-agrya-slate-100">
                  <span className="font-mono text-xs font-bold uppercase text-agrya-teal-700">Section 05 // Data Retention</span>
                  <Trash2 className="w-5 h-5 text-agrya-teal-700" />
                </div>
                <h2 className="text-xl font-bold text-agrya-slate-900">
                  5. Retention Schedules & Right to Erasure
                </h2>
                <p>
                  Prospective inquiries are retained only for the duration necessary to conclude consultation discussions. Executed client accounting workpapers are retained in accordance with statutory requirements under the Companies Act, 2013, and Income Tax Act, 1961 (typically 8 statutory assessment years).
                </p>
                <p>
                  Under the DPDP Act, 2023, data principals hold the legal right to request the review, correction, or erasure of their personal information by serving written notice to our Data Protection Officer.
                </p>
              </div>
            </DoubleBezel>
          </section>

          {/* SECTION 6 */}
          <section id="privacy-6" className="scroll-mt-32">
            <DoubleBezel className="w-full">
              <div className="p-6 sm:p-8 space-y-4">
                <div className="flex items-center justify-between pb-3 border-b border-agrya-slate-100">
                  <span className="font-mono text-xs font-bold uppercase text-agrya-teal-700">Section 06 // DPO Contact</span>
                  <Mail className="w-5 h-5 text-agrya-teal-700" />
                </div>
                <h2 className="text-xl font-bold text-agrya-slate-900">
                  6. Data Protection Coordinator & Grievance Redressal
                </h2>
                <p className="text-xs sm:text-sm text-agrya-slate-600">
                  For privacy verifications, DPA executions, or statutory grievance escalations, please contact our designated officer directly:
                </p>
                <div className="p-4 rounded-xl bg-agrya-slate-50 border border-agrya-slate-200/80 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                  <div>
                    <div className="font-bold text-sm text-agrya-slate-900">Jayakumar M, FCA, ACS</div>
                    <div className="text-xs font-mono text-agrya-slate-500">Managing Partner & Data Protection Coordinator</div>
                    <div className="text-[11px] text-agrya-slate-400 mt-0.5">Agrya Consulting Private Limited, Chennai, Tamil Nadu - 600018</div>
                  </div>
                  <a
                    href="mailto:jk@agrya.in?subject=Data%20Protection%20Grievance%20-%20Agrya"
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
              Confidentiality First
            </span>
            <h2 className="text-2xl sm:text-4xl font-extrabold text-white tracking-tight">
              Scale with uncompromising financial privacy.
            </h2>
            <p className="text-xs sm:text-sm text-agrya-slate-300 leading-relaxed">
              Every Agrya engagement operates under strict non-disclosure agreements, multi-tenant isolation, and chartered accountant fiduciary ethics.
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
