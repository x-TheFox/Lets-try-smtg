import React from 'react';
import { DoubleBezel } from '../components/ui/DoubleBezel';
import { Badge } from '../components/ui/Badge';
import { ShieldCheck, Mail } from 'lucide-react';
import { ButtonInButton } from '../components/ui/ButtonInButton';

interface TermsPageProps {
  onOpenInquiry: () => void;
}

export const TermsPage: React.FC<TermsPageProps> = ({ onOpenInquiry }) => {
  return (
    <div className="max-w-4xl mx-auto px-6 pt-12 pb-24 space-y-12">
      <section className="space-y-4">
        <Badge variant="slate">Legal & Statutory Governance</Badge>
        <h1 className="text-3xl sm:text-5xl font-extrabold text-agrya-slate-950 tracking-tight">
          Terms of Service
        </h1>
        <p className="text-sm font-mono text-agrya-slate-500">
          Last Updated: September 2026 • Agrya Consulting Private Limited
        </p>
      </section>

      <DoubleBezel className="p-8 sm:p-12 space-y-8 text-agrya-slate-700 leading-relaxed text-sm sm:text-base">
        <div className="space-y-3">
          <h2 className="text-xl font-bold text-agrya-slate-900 flex items-center gap-2">
            <ShieldCheck className="w-5 h-5 text-agrya-teal-700" />
            1. Acceptance of Terms
          </h2>
          <p>
            By accessing this website, utilizing any financial modeling tools, or engaging Agrya Consulting Private Limited (&ldquo;Agrya&rdquo;, &ldquo;we&rdquo;, &ldquo;us&rdquo;, or &ldquo;our&rdquo;), you acknowledge that you have read, understood, and agree to be bound by these Terms of Service, along with our Privacy Policy and all applicable statutory regulations under the laws of India.
          </p>
        </div>

        <div className="space-y-3">
          <h2 className="text-xl font-bold text-agrya-slate-900">
            2. Professional Scope & Fiduciary Disclaimers
          </h2>
          <p>
            Agrya Consulting Private Limited provides specialized Virtual CFO advisory, management accounting, statutory compliance coordination, and financial systems design. Engagements requiring statutory audit certification, formal tax audit attestations, or matters governed exclusively under the Chartered Accountants Act, 1949, are performed in direct coordination with independent Chartered Accountant firms led by practicing Fellows (FCA) or Associates (ACA) of the Institute of Chartered Accountants of India (ICAI).
          </p>
          <p className="bg-agrya-slate-50 border border-agrya-slate-200 rounded-xl p-4 text-xs sm:text-sm font-mono text-agrya-slate-700">
            * Statutory Notice: Website materials, dynamic financial calculators, and archetype projections are provided for strategic planning and illustrative evaluation. They do not constitute formal tax opinions, audit reports, investment advisory mandates, or statutory certifications until formalized within an executed Engagement Agreement.
          </p>
        </div>

        <div className="space-y-3">
          <h2 className="text-xl font-bold text-agrya-slate-900">
            3. Client Responsibilities & Data Accuracy
          </h2>
          <p>
            Timely, accurate, and complete financial reporting relies upon the integrity of the books, ledgers, vouchers, and source records provided by client entities. Clients remain solely responsible for the authenticity and completeness of transactional records submitted across accounting integrations (including Tally Prime, Zoho Books, QuickBooks, or proprietary ERP systems).
          </p>
        </div>

        <div className="space-y-3">
          <h2 className="text-xl font-bold text-agrya-slate-900">
            4. Intellectual Property & Advisory Artifacts
          </h2>
          <p>
            All custom financial models, templates, dashboard architectures, and operational playbooks authored by Agrya remain the proprietary intellectual property of Agrya Consulting Private Limited, licensed solely to active clients for their internal management operations.
          </p>
        </div>

        <div className="space-y-3">
          <h2 className="text-xl font-bold text-agrya-slate-900">
            5. Limitation of Liability & Governing Law
          </h2>
          <p>
            To the maximum extent permitted by applicable Indian law, Agrya shall not be liable for indirect, incidental, or consequential damages resulting from regulatory timeline shifts or statutory portal downtime outside Agrya&apos;s direct operational control. These Terms are governed by and construed in accordance with the laws of India, and any disputes shall be subject to the exclusive jurisdiction of the competent courts in Chennai, Tamil Nadu.
          </p>
        </div>

        <div className="space-y-3 border-t border-agrya-slate-200 pt-6">
          <h2 className="text-lg font-bold text-agrya-slate-900">6. Legal & Compliance Inquiries</h2>
          <p className="text-xs sm:text-sm text-agrya-slate-600">
            For governance or contractual inquiries, please contact our Managing Partner directly:
          </p>
          <div className="flex flex-wrap gap-4 pt-2">
            <a
              href="mailto:jk@agrya.in?subject=Legal%20Inquiry%20-%20Agrya%20Terms"
              className="inline-flex items-center gap-2 text-xs font-mono font-bold text-agrya-teal-700 hover:text-agrya-teal-900 underline"
            >
              <Mail className="w-4 h-4" /> jk@agrya.in
            </a>
          </div>
        </div>
      </DoubleBezel>

      <section className="text-center pt-6 space-y-4">
        <ButtonInButton variant="dark" iconType="arrow-right" onClick={onOpenInquiry}>
          Initiate Strategic Partner Briefing
        </ButtonInButton>
      </section>
    </div>
  );
};
