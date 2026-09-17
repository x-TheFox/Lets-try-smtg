import React from 'react';
import { DoubleBezel } from '../components/ui/DoubleBezel';
import { Badge } from '../components/ui/Badge';
import { Lock, Mail } from 'lucide-react';
import { ButtonInButton } from '../components/ui/ButtonInButton';

interface PrivacyPageProps {
  onOpenInquiry: () => void;
}

export const PrivacyPage: React.FC<PrivacyPageProps> = ({ onOpenInquiry }) => {
  return (
    <div className="max-w-4xl mx-auto px-6 pt-12 pb-24 space-y-12">
      <section className="space-y-4">
        <Badge variant="teal">Confidentiality & Data Protection</Badge>
        <h1 className="text-3xl sm:text-5xl font-extrabold text-agrya-slate-950 tracking-tight">
          Privacy Policy
        </h1>
        <p className="text-sm font-mono text-agrya-slate-500">
          Last Updated: September 2026 • Agrya Consulting Private Limited
        </p>
      </section>

      <DoubleBezel className="p-8 sm:p-12 space-y-8 text-agrya-slate-700 leading-relaxed text-sm sm:text-base">
        <div className="space-y-3">
          <h2 className="text-xl font-bold text-agrya-slate-900 flex items-center gap-2">
            <Lock className="w-5 h-5 text-agrya-teal-700" />
            1. Fiduciary Commitment to Data Security
          </h2>
          <p>
            At Agrya Consulting Private Limited (&ldquo;Agrya&rdquo;), financial confidentiality is fundamental to our advisory relationship. This Privacy Policy governs the collection, processing, storage, and protection of corporate and personal information obtained through our digital platform and consulting engagements, in accordance with the Information Technology Act, 2000, and the Digital Personal Data Protection Act, 2023 (DPDP Act).
          </p>
        </div>

        <div className="space-y-3">
          <h2 className="text-xl font-bold text-agrya-slate-900">
            2. Scope of Information Gathered
          </h2>
          <p>
            We process data strictly required to execute management accounting, financial modeling, and CFO advisory:
          </p>
          <ul className="list-disc pl-5 space-y-1 text-xs sm:text-sm">
            <li><strong>Corporate Briefing Information:</strong> Company name, operational jurisdiction, current monthly burn/runway parameters, and key corporate challenges submitted via inquiry forms.</li>
            <li><strong>Key Stakeholder Contact Details:</strong> Full name, corporate email address, and direct telephone contact details of corporate officers.</li>
            <li><strong>Transactional & Ledger Metrics:</strong> Financial figures input into our interactive tools (e.g. Runway Simulator). <em>Note: Simulator calculations run client-side in your browser unless explicitly submitted via the partner briefing form.</em></li>
          </ul>
        </div>

        <div className="space-y-3">
          <h2 className="text-xl font-bold text-agrya-slate-900">
            3. Purpose & Legal Basis of Processing
          </h2>
          <p>
            Client and inquiry data is used exclusively to:
          </p>
          <ul className="list-disc pl-5 space-y-1 text-xs sm:text-sm">
            <li>Evaluate business fitness and prepare customized Virtual CFO diagnostic proposals.</li>
            <li>Coordinate statutory compliance deadlines and corporate tax filing readiness.</li>
            <li>Maintain durable records of communications and diagnostic submissions.</li>
          </ul>
          <p className="font-semibold text-agrya-slate-900">
            We never sell, rent, monetize, or broker corporate or client personal data to any third party.
          </p>
        </div>

        <div className="space-y-3">
          <h2 className="text-xl font-bold text-agrya-slate-900">
            4. Encryption & Transmission Protocols
          </h2>
          <p>
            All data transmitted across our platform is secured via industry-standard TLS 1.3 encryption. Briefings submitted through our digital intake funnel are transferred securely with client-side fallback logging to prevent data loss during network interruptions.
          </p>
        </div>

        <div className="space-y-3">
          <h2 className="text-xl font-bold text-agrya-slate-900">
            5. Retention & Erasure Requests
          </h2>
          <p>
            Prospective client briefings are retained solely for advisory follow-up and statutory audit trail compliance under Indian law. You may request the verification, correction, or erasure of your submitted corporate information at any time by contacting our data protection coordinator.
          </p>
        </div>

        <div className="space-y-3 border-t border-agrya-slate-200 pt-6">
          <h2 className="text-lg font-bold text-agrya-slate-900">6. Data Protection Inquiries</h2>
          <p className="text-xs sm:text-sm text-agrya-slate-600">
            For data privacy inquiries or redaction requests, please contact:
          </p>
          <div className="flex flex-wrap gap-4 pt-2">
            <a
              href="mailto:jk@agrya.in?subject=Data%20Privacy%20Inquiry%20-%20Agrya"
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
