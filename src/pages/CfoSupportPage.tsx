import React from 'react';
import { servicesData } from '../data/services';
import { DoubleBezel } from '../components/ui/DoubleBezel';
import { Badge } from '../components/ui/Badge';
import { ButtonInButton } from '../components/ui/ButtonInButton';
import { Layers } from 'lucide-react';

interface CfoSupportPageProps {
  onOpenInquiry: () => void;
}

export const CfoSupportPage: React.FC<CfoSupportPageProps> = ({ onOpenInquiry }) => {
  const data = servicesData['cfo-support'];

  const podMatrix = [
    {
      stream: 'AP/AR Ingestion & Vendor Reconciliation',
      clientInterface: 'In-House Controller / Ops',
      podRole: 'Dedicated Execution Specialist',
      turnaround: '24 Hours Target',
      protocol: 'Two-way ERP & Bank API Sync'
    },
    {
      stream: 'Dynamic FP&A & Scenario Modeling',
      clientInterface: 'CFO / VP Finance',
      podRole: 'Senior Financial Modeler',
      turnaround: '48 Hours Target',
      protocol: 'Dynamic Cloud Models & Cohort BI'
    },
    {
      stream: 'Statutory Governance & Audit Defense',
      clientInterface: 'Head of Compliance / Legal',
      podRole: 'Partner Chartered Accountant (FCA on Staff)',
      turnaround: 'Prioritized SLA',
      protocol: 'Pre-Audit Workpapers & MCA/GST Filings'
    },
    {
      stream: 'Systems Architecture & ERP Automation',
      clientInterface: 'CTO / Tech & IT Lead',
      podRole: 'Financial Systems Architect',
      turnaround: 'Ongoing Sprints',
      protocol: 'Enterprise Encrypted API Ingestion & Strict Protocols'
    }
  ];

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
            Request Support Proposal
          </ButtonInButton>
          <a
            href="mailto:jk@agrya.in?subject=CFO%20Support%20Pods%20Inquiry%20-%20Agrya"
            className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full border border-agrya-slate-200 bg-white hover:bg-agrya-slate-50 text-agrya-slate-800 text-xs sm:text-sm font-semibold spring-snappy shadow-sm"
          >
            <span>Talk to Jayakumar (jk@agrya.in)</span>
          </a>
          <span className="text-xs font-mono text-agrya-slate-500">
            Elastic Team Capacity • Rapid Pod Onboarding
          </span>
        </div>
      </section>

      {/* SUPPORT PODS ARCHITECTURE (BENTO) */}
      <section className="space-y-8">
        <div className="max-w-2xl">
          <div className="font-mono text-xs text-agrya-teal-700 font-semibold uppercase tracking-wider mb-2">
            Execution Horsepower
          </div>
          <h2 className="text-3xl font-extrabold text-agrya-slate-950 tracking-tight">
            Specialized execution pods for in-house finance teams
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {data.deliverables.map((item, idx) => (
            <DoubleBezel key={item.title} className="h-full group">
              <div className="p-6 sm:p-8 flex flex-col justify-between h-full">
                <div>
                  <div className="flex items-center justify-between mb-4">
                    <span className="font-mono text-xs px-2.5 py-1 rounded bg-blue-50 text-blue-800 font-medium">
                      Execution Pod 0{idx + 1}
                    </span>
                    <Layers className="w-4 h-4 text-agrya-teal-600" />
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

      {/* EXECUTION POD INTEGRATION MATRIX (SIGNATURE DIFFERENTIATOR) */}
      <section className="space-y-6">
        <div>
          <div className="font-mono text-xs text-agrya-teal-700 font-semibold uppercase tracking-wider mb-2">
            Operational Handshake
          </div>
          <h2 className="text-2xl sm:text-3xl font-extrabold text-agrya-slate-950 tracking-tight">
            Execution Pod Integration Matrix
          </h2>
          <p className="text-agrya-slate-600 text-sm mt-1 max-w-2xl">
            Clear delineation of in-house team handoffs, dedicated Agrya pod roles, committed turnaround targets, and secure system sync protocols.
          </p>
        </div>

        <DoubleBezel className="w-full overflow-hidden">
          <div className="p-6 sm:p-8 overflow-x-auto">
            <table className="w-full text-left border-collapse min-w-[640px]">
              <thead>
                <tr className="border-b border-agrya-slate-200 text-[11px] font-mono text-agrya-slate-500 uppercase tracking-wider">
                  <th className="pb-3 pr-4 font-bold">Operational Stream</th>
                  <th className="pb-3 px-4 font-bold">In-House Interface</th>
                  <th className="pb-3 px-4 font-bold">Agrya Pod Specialist</th>
                  <th className="pb-3 px-4 font-bold">Target Turnaround Benchmark</th>
                  <th className="pb-3 pl-4 font-bold">Data Protocol</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-agrya-slate-100 text-xs">
                {podMatrix.map((row) => (
                  <tr key={row.stream} className="hover:bg-agrya-slate-50/60 transition-colors">
                    <td className="py-4 pr-4 font-semibold text-agrya-slate-900">
                      {row.stream}
                    </td>
                    <td className="py-4 px-4 text-agrya-slate-600 font-mono text-[11px]">
                      {row.clientInterface}
                    </td>
                    <td className="py-4 px-4 text-agrya-teal-800 font-medium">
                      <span className="inline-flex items-center gap-1.5 px-2 py-0.5 rounded-md bg-agrya-teal-50 border border-agrya-teal-200/50">
                        {row.podRole}
                      </span>
                    </td>
                    <td className="py-4 px-4 font-mono font-bold text-agrya-slate-900">
                      {row.turnaround}
                    </td>
                    <td className="py-4 pl-4 text-agrya-slate-500 font-mono text-[11px]">
                      {row.protocol}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </DoubleBezel>
      </section>

      {/* ENGAGEMENT MODELS */}
      <section>
        <DoubleBezel className="w-full">
          <div className="p-6 sm:p-10">
            <h3 className="text-lg font-bold text-agrya-slate-900 mb-2">Flexible Engagement Models</h3>
            <p className="text-xs sm:text-sm text-agrya-slate-600 mb-6">
              Tailored to plug directly into your current sprint cycles and corporate cadence.
            </p>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="p-5 rounded-2xl bg-agrya-slate-50 border border-agrya-slate-100 space-y-2">
                <div className="text-xs font-mono text-agrya-teal-700 font-bold uppercase">Sprint-Based</div>
                <div className="text-lg font-bold text-agrya-slate-900">Project Sprints</div>
                <p className="text-xs text-agrya-slate-600 leading-relaxed">
                  Time-boxed engagements for due diligence prep, Big 4 audit remediation, or ERP system migration.
                </p>
              </div>

              <div className="p-5 rounded-2xl bg-agrya-slate-50 border border-agrya-slate-100 space-y-2">
                <div className="text-xs font-mono text-agrya-teal-700 font-bold uppercase">Retainer Pod</div>
                <div className="text-lg font-bold text-agrya-slate-900">Ongoing Capacity</div>
                <p className="text-xs text-agrya-slate-600 leading-relaxed">
                  Dedicated auxiliary team members managing regular AP/AR runs, payroll cycles, and monthly statutory filings.
                </p>
              </div>

              <div className="p-5 rounded-2xl bg-agrya-slate-50 border border-agrya-slate-100 space-y-2">
                <div className="text-xs font-mono text-agrya-teal-700 font-bold uppercase">Advisory</div>
                <div className="text-lg font-bold text-agrya-slate-900">Special Projects</div>
                <p className="text-xs text-agrya-slate-600 leading-relaxed">
                  Strategic FP&A models for new business line launches, cross-border corporate structuring, and M&A evaluation.
                </p>
              </div>
            </div>
          </div>
        </DoubleBezel>
      </section>

      {/* BOTTOM CTA */}
      <section className="text-center max-w-xl mx-auto space-y-4 pt-6">
        <h2 className="text-2xl font-bold text-agrya-slate-900">Scale your in-house capacity</h2>
        <p className="text-xs sm:text-sm text-agrya-slate-600">
          Overcome back-office bottlenecks and ensure institutional compliance. Talk to Jayakumar, our partner leading the CFO Support engagements.
        </p>
        <div className="pt-2 flex flex-wrap items-center justify-center gap-3">
          <ButtonInButton variant="dark" iconType="arrow-right" onClick={onOpenInquiry}>
            Discuss CFO Support Requirements
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
