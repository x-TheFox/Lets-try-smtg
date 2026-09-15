import React from 'react';
import { teamMembers } from '../data/team';
import { DoubleBezel } from '../components/ui/DoubleBezel';
import { Badge } from '../components/ui/Badge';
import { ButtonInButton } from '../components/ui/ButtonInButton';
import { Award, ArrowRight } from 'lucide-react';

interface TeamPageProps {
  onOpenInquiry: () => void;
}

export const TeamPage: React.FC<TeamPageProps> = ({ onOpenInquiry }) => {
  return (
    <div className="max-w-6xl mx-auto px-6 pt-12 pb-24 space-y-20">
      
      {/* HERO SECTION */}
      <section className="max-w-3xl">
        <Badge pulse variant="teal" className="mb-6">
          Chartered Pedigree &bull; Leadership
        </Badge>

        <h1 className="text-4xl sm:text-6xl font-extrabold text-agrya-slate-950 tracking-tight leading-[1.1] mb-6">
          Leadership & Expertise
        </h1>

        <p className="text-base sm:text-xl text-agrya-slate-600 leading-relaxed font-normal mb-8 max-w-2xl">
          Agrya is guided by seasoned Fellows and Associates of the Institute of Chartered Accountants of India (ICAI), uniting decades of audit rigor, strategic M&A advisory, and financial engineering.
        </p>

        <div className="flex flex-wrap items-center gap-4">
          <ButtonInButton
            variant="primary"
            iconType="arrow-right"
            onClick={onOpenInquiry}
          >
            Speak with an Agrya Partner
          </ButtonInButton>
          <span className="text-xs font-mono text-agrya-slate-500">
            FCA &bull; ACA &bull; DISA Certified Leaders
          </span>
        </div>
      </section>

      {/* TEAM MEMBER DOSSIERS GRID */}
      <section className="space-y-8">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4">
          <div>
            <div className="font-mono text-xs text-agrya-teal-700 font-semibold uppercase tracking-wider mb-1">
              The Partners & Leads
            </div>
            <h2 className="text-3xl font-extrabold text-agrya-slate-950 tracking-tight">
              Executive Partners & Specialists
            </h2>
          </div>
          <span className="font-mono text-xs text-agrya-slate-400">
            Chennai &bull; Bengaluru &bull; Hyderabad &bull; Mumbai
          </span>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {teamMembers.map((member) => (
            <DoubleBezel key={member.id} className="h-full group">
              <div className="p-6 flex flex-col justify-between h-full space-y-6">
                
                {/* PHOTO & BADGE */}
                <div>
                  <div className="relative w-full aspect-square rounded-2xl overflow-hidden bg-agrya-slate-100 border border-agrya-slate-200/80 mb-5">
                    <img
                      src={member.image}
                      alt={member.name}
                      className="w-full h-full object-cover grayscale group-hover:grayscale-0 group-hover:scale-105 spring-standard transition-all duration-500"
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
                    onClick={onOpenInquiry}
                    className="text-xs font-semibold text-agrya-slate-900 hover:text-agrya-teal-700 flex items-center gap-1.5 transition-colors group-hover:translate-x-0.5 spring-snappy"
                  >
                    <span>Request Partner Consultation</span>
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
                <h3 className="text-lg font-bold text-agrya-slate-900">ICAI Registered & Regulated</h3>
                <p className="text-xs sm:text-sm text-agrya-slate-600">
                  Our partners adhere strictly to the professional conduct and accounting standards codified by the Institute of Chartered Accountants of India.
                </p>
              </div>
            </div>
            <button
              onClick={onOpenInquiry}
              className="shrink-0 px-5 py-2.5 bg-agrya-slate-900 hover:bg-agrya-slate-800 text-white rounded-full text-xs font-semibold spring-snappy"
            >
              Consult with Partners
            </button>
          </div>
        </DoubleBezel>
      </section>

      {/* BOTTOM CTA */}
      <section className="text-center max-w-xl mx-auto space-y-4 pt-6">
        <h2 className="text-2xl font-bold text-agrya-slate-900">Work directly with senior leadership.</h2>
        <p className="text-xs sm:text-sm text-agrya-slate-600">
          No handoffs to inexperienced junior staff. Every client is assigned a dedicated Partner CA.
        </p>
        <div className="pt-2">
          <ButtonInButton variant="dark" iconType="arrow-right" onClick={onOpenInquiry}>
            Schedule Partner Discovery Call
          </ButtonInButton>
        </div>
      </section>

    </div>
  );
};
