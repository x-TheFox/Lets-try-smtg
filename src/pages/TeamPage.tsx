import React from 'react';
import { teamMembers } from '../data/team';
import { DoubleBezel } from '../components/ui/DoubleBezel';
import { Badge } from '../components/ui/Badge';
import { ButtonInButton } from '../components/ui/ButtonInButton';
import { Award, ArrowRight } from 'lucide-react';

interface TeamPageProps {
  onOpenInquiry: (partnerName?: string) => void;
}

export const TeamPage: React.FC<TeamPageProps> = ({ onOpenInquiry }) => {
  const founders = teamMembers.filter((m) => m.role.toLowerCase().includes('co-founder'));
  const partnersAndLeads = teamMembers.filter((m) => !m.role.toLowerCase().includes('co-founder'));

  return (
    <div className="max-w-6xl mx-auto px-6 pt-12 pb-24 space-y-20">
      
      {/* HERO SECTION */}
      <section className="max-w-3xl">
        <Badge pulse variant="teal" className="mb-6">
          Our People
        </Badge>

        <h1 className="text-4xl sm:text-6xl font-extrabold text-agrya-slate-950 tracking-tight leading-[1.1] mb-6">
          Built by <span className="text-agrya-teal-700">Experts.</span><br />
          Driven by Passion.
        </h1>

        <p className="text-base sm:text-xl text-agrya-slate-600 leading-relaxed font-normal mb-8 max-w-2xl">
          We are a team of seasoned Chartered Accountants and financial strategists. We bring big-four experience to ambitious growth companies.
        </p>

        <div className="flex flex-wrap items-center gap-4">
          <ButtonInButton
            variant="primary"
            iconType="arrow-right"
            onClick={() => onOpenInquiry()}
          >
            Speak with an Agrya Partner
          </ButtonInButton>
          <span className="text-xs font-mono text-agrya-slate-500">
            FCA • ACS • ACCA London • Big-Four Pedigree
          </span>
        </div>
      </section>

      {/* CO-FOUNDERS & EXECUTIVE PARTNERS (TIER 1 - 2 COLUMNS) */}
      <section className="space-y-8">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 border-b border-agrya-slate-200/80 pb-4">
          <div>
            <div className="font-mono text-xs text-agrya-teal-700 font-semibold uppercase tracking-wider mb-1">
              Executive Leadership
            </div>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-agrya-slate-950 tracking-tight">
              Founding Partners
            </h2>
          </div>
          <span className="font-mono text-xs text-agrya-slate-400">
            ICAI Registered Fellows • Decades of Combined Practice
          </span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {founders.map((member) => (
            <DoubleBezel key={member.id} className="h-full group hover-lift">
              <div className="p-6 sm:p-8 flex flex-col justify-between h-full space-y-6">
                
                {/* PHOTO & BADGE */}
                <div>
                  <div className="relative w-full aspect-[4/3] rounded-2xl overflow-hidden bg-agrya-slate-100 border border-agrya-slate-200/80 mb-6">
                    <img
                      src={member.image}
                      alt={member.name}
                      className="w-full h-full object-cover grayscale group-hover:grayscale-0 group-hover:scale-105 transition-[filter,transform] duration-500 ease-out"
                      loading="lazy"
                    />
                    {member.credentials && (
                      <div className="absolute bottom-3 left-3 bg-agrya-slate-900/90 backdrop-blur-md text-white px-3 py-1 rounded-lg text-xs font-mono font-bold tracking-wider border border-white/15">
                        {member.credentials}
                      </div>
                    )}
                    <div className="absolute top-3 right-3 bg-agrya-teal-600/90 backdrop-blur-md text-white px-2.5 py-1 rounded-lg text-[10px] font-mono font-semibold tracking-wider">
                      Co-Founder
                    </div>
                  </div>

                  <h3 className="text-2xl font-bold text-agrya-slate-900 group-hover:text-agrya-teal-700 spring-snappy transition-colors">
                    {member.name}
                  </h3>
                  
                  <div className="text-sm font-semibold text-agrya-teal-700 font-mono mt-1 mb-4">
                    {member.role}
                  </div>

                  <p className="text-sm text-agrya-slate-600 leading-relaxed">
                    {member.bio}
                  </p>
                </div>

                {/* DIRECT ENGAGEMENT ACTION */}
                <div className="pt-5 border-t border-agrya-slate-100 flex flex-wrap items-center justify-between gap-2">
                  <button
                    onClick={() => onOpenInquiry(member.name)}
                    className="text-xs font-semibold text-agrya-slate-900 hover:text-agrya-teal-700 flex items-center gap-1.5 transition-colors group-hover:translate-x-0.5 spring-snappy"
                  >
                    <span>Request Partner Consultation</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>
                  <span className="font-mono text-[11px] text-agrya-slate-400">Direct Partner Desk</span>
                </div>

              </div>
            </DoubleBezel>
          ))}
        </div>
      </section>

      {/* PRACTICE PARTNERS & SPECIALISTS (TIER 2 - 3 COLUMNS) */}
      <section className="space-y-8">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 border-b border-agrya-slate-200/80 pb-4">
          <div>
            <div className="font-mono text-xs text-agrya-teal-700 font-semibold uppercase tracking-wider mb-1">
              Practice Leads
            </div>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-agrya-slate-950 tracking-tight">
              Partners & Practice Specialists
            </h2>
          </div>
          <span className="font-mono text-xs text-agrya-slate-400">
            Chennai • Bengaluru • Hyderabad • Mumbai
          </span>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {partnersAndLeads.map((member) => (
            <DoubleBezel key={member.id} className="h-full group hover-lift">
              <div className="p-6 flex flex-col justify-between h-full space-y-6">
                
                {/* PHOTO & BADGE */}
                <div>
                  <div className="relative w-full aspect-square rounded-2xl overflow-hidden bg-agrya-slate-100 border border-agrya-slate-200/80 mb-5">
                    <img
                      src={member.image}
                      alt={member.name}
                      className="w-full h-full object-cover grayscale group-hover:grayscale-0 group-hover:scale-105 transition-[filter,transform] duration-500 ease-out"
                      loading="lazy"
                    />
                    {member.credentials && (
                      <div className="absolute bottom-3 left-3 bg-agrya-slate-900/90 backdrop-blur-md text-white px-2.5 py-1 rounded-lg text-[10px] font-mono font-bold tracking-wider border border-white/15">
                        {member.credentials}
                      </div>
                    )}
                  </div>

                  <h3 className="text-xl font-bold text-agrya-slate-900 group-hover:text-agrya-teal-700 spring-snappy transition-colors">
                    {member.name}
                  </h3>
                  
                  <div className="text-xs font-semibold text-agrya-teal-700 font-mono mt-0.5 mb-3">
                    {member.role}
                  </div>

                  <p className="text-xs text-agrya-slate-600 leading-relaxed">
                    {member.bio}
                  </p>
                </div>

                {/* DIRECT ENGAGEMENT ACTION */}
                <div className="pt-4 border-t border-agrya-slate-100 flex items-center justify-between">
                  <button
                    onClick={() => onOpenInquiry(member.name)}
                    className="text-xs font-semibold text-agrya-slate-900 hover:text-agrya-teal-700 flex items-center gap-1.5 transition-colors group-hover:translate-x-0.5 spring-snappy"
                  >
                    <span>Request Consultation</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>
                </div>

              </div>
            </DoubleBezel>
          ))}
        </div>
      </section>

      {/* CREDENTIAL STANDARDS SECTION */}
      <section>
        <DoubleBezel className="w-full">
          <div className="p-6 sm:p-10 flex flex-col sm:flex-row items-center justify-between gap-6">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 rounded-2xl bg-agrya-teal-50 border border-agrya-teal-200 flex items-center justify-center text-agrya-teal-700 shrink-0">
                <Award className="w-6 h-6" />
              </div>
              <div>
                <h3 className="text-lg font-bold text-agrya-slate-900">Led by ICAI Registered Fellows & Associates</h3>
                <p className="text-xs sm:text-sm text-agrya-slate-600">
                  Our practice leaders adhere strictly to the professional conduct, ethical standards, and accounting rigor codified by the Institute of Chartered Accountants of India.
                </p>
              </div>
            </div>
            <button
              onClick={() => onOpenInquiry()}
              className="shrink-0 px-5 py-2.5 bg-agrya-slate-900 hover:bg-agrya-slate-800 text-white rounded-full text-xs font-semibold spring-snappy"
            >
              Consult with Partners
            </button>
          </div>
        </DoubleBezel>
      </section>

      {/* JOIN THE TEAM (RESTORED LEGACY SECTION) */}
      <section className="bg-agrya-slate-900 rounded-3xl p-8 sm:p-12 text-center text-white relative overflow-hidden border border-agrya-slate-800">
        <div className="relative z-10 max-w-xl mx-auto space-y-4">
          <span className="font-mono text-xs text-agrya-teal-400 uppercase tracking-wider font-semibold">
            Careers at Agrya
          </span>
          <h2 className="text-2xl sm:text-3xl font-extrabold tracking-tight text-white">
            Join the team
          </h2>
          <p className="text-sm text-agrya-slate-400 leading-relaxed">
            We are always looking for talented and passionate Chartered Accountants, financial analysts, and automation specialists to join our journey.
          </p>
          <div className="pt-2">
            <a
              href="mailto:hr@agrya.in"
              className="inline-flex items-center justify-center px-6 py-3 text-xs font-semibold rounded-full text-agrya-slate-900 bg-white hover:bg-agrya-slate-100 transition-all hover:scale-105 shadow-md shadow-white/10"
            >
              View Openings • Contact HR (hr@agrya.in)
            </a>
          </div>
        </div>
      </section>

      {/* BOTTOM CTA */}
      <section className="text-center max-w-xl mx-auto space-y-4 pt-4">
        <h2 className="text-2xl font-bold text-agrya-slate-900">Work directly with senior leadership</h2>
        <p className="text-xs sm:text-sm text-agrya-slate-600">
          No handoffs to inexperienced junior staff. Every client is assigned a dedicated Partner CA.
        </p>
        <div className="pt-2 flex flex-wrap items-center justify-center gap-3">
          <ButtonInButton variant="dark" iconType="arrow-right" onClick={() => onOpenInquiry()}>
            Schedule Partner Discovery Call
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
