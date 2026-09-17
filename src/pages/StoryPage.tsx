import React from 'react';
import { DoubleBezel } from '../components/ui/DoubleBezel';
import { Badge } from '../components/ui/Badge';
import { ButtonInButton } from '../components/ui/ButtonInButton';
import { Sparkles } from 'lucide-react';

interface StoryPageProps {
  onOpenInquiry: () => void;
}

export const StoryPage: React.FC<StoryPageProps> = ({ onOpenInquiry }) => {
  return (
    <div className="max-w-6xl mx-auto px-6 pt-12 pb-24 space-y-20">
      
      {/* HERO SECTION (VERBATIM LEGACY ORIGIN) */}
      <section className="max-w-3xl">
        <Badge pulse variant="teal" className="mb-6">
          Origin Story
        </Badge>

        <h1 className="text-4xl sm:text-6xl font-extrabold text-agrya-slate-950 tracking-tight leading-[1.1] mb-6">
          We noticed a <span className="text-transparent bg-clip-text bg-gradient-to-r from-agrya-teal-700 to-agrya-slate-900">gap.</span>
        </h1>

        <p className="text-lg sm:text-2xl text-agrya-slate-600 leading-relaxed font-normal mb-8 max-w-2xl">
          Between what ambitious entrepreneurs needed and what the traditional finance industry provided.
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

      {/* FOUNDER NARRATIVE & DELOITTE FOUNDING QUOTE (VERBATIM RESTORATION - FINDING P1-04) */}
      <section className="max-w-4xl mx-auto text-center py-4">
        <div className="p-8 sm:p-12 rounded-3xl bg-white border border-agrya-slate-200/90 shadow-sm relative">
          <div className="w-12 h-12 rounded-full bg-agrya-teal-50 border border-agrya-teal-200 text-agrya-teal-700 flex items-center justify-center mx-auto mb-6">
            <Sparkles className="w-6 h-6" />
          </div>

          <blockquote className="text-xl sm:text-2xl font-serif text-agrya-slate-900 leading-relaxed max-w-2xl mx-auto italic">
            &ldquo;Hey, we are <span className="font-bold font-sans not-italic text-agrya-slate-950">Priya</span> and <span className="font-bold font-sans not-italic text-agrya-slate-950">Jayakumar</span>. During our 15 years at Deloitte, we worked with massive global corporations. We saw how powerful a well-oiled finance machine could be.&rdquo;
          </blockquote>

          <div className="mt-8 flex items-center justify-center -space-x-3">
            <img 
              src="/assets/team-priya.png" 
              alt="Priya Raghavan - Co-founder" 
              className="w-16 h-16 rounded-full border-4 border-white shadow-md object-cover"
            />
            <img 
              src="/assets/team-jayakumar.png" 
              alt="Jayakumar M - Co-founder" 
              className="w-16 h-16 rounded-full border-4 border-white shadow-md object-cover"
            />
          </div>

          <div className="mt-3 text-xs font-mono text-agrya-slate-500">
            Priya Raghavan & Jayakumar M • Co-founders & Managing Partners
          </div>
        </div>
      </section>

      {/* THE REALIZATION & 4 CORE PROBLEMS (VERBATIM LEGACY CARDS) */}
      <section className="space-y-8">
        <div className="max-w-2xl text-center mx-auto">
          <div className="font-mono text-xs text-agrya-teal-700 font-semibold uppercase tracking-wider mb-2">
            The Realization
          </div>
          <h2 className="text-3xl font-extrabold text-agrya-slate-950 tracking-tight">
            The recurring patterns of startup finance.
          </h2>
          <p className="text-agrya-slate-600 text-sm mt-2 leading-relaxed">
            6 years ago, we started working with passionate startups. We quickly realized they were facing the same specific set of problems, over and over again.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          
          <DoubleBezel className="h-full group hover-lift">
            <div className="p-6 flex flex-col justify-between h-full space-y-4">
              <div>
                <div className="text-3xl mb-3">😵‍💫</div>
                <h3 className="text-lg font-bold text-agrya-slate-900 group-hover:text-agrya-teal-700 transition-colors">
                  The Distraction Trap
                </h3>
                <p className="text-xs text-agrya-slate-600 leading-relaxed mt-2">
                  Entrepreneurs getting pulled into non-core finance and admin tasks instead of building their product.
                </p>
              </div>
            </div>
          </DoubleBezel>

          <DoubleBezel className="h-full group hover-lift">
            <div className="p-6 flex flex-col justify-between h-full space-y-4">
              <div>
                <div className="text-3xl mb-3">⚠️</div>
                <h3 className="text-lg font-bold text-agrya-slate-900 group-hover:text-agrya-teal-700 transition-colors">
                  Compliance Blindspots
                </h3>
                <p className="text-xs text-agrya-slate-600 leading-relaxed mt-2">
                  Regulatory issues discovered only during due diligence—often threatening funding rounds.
                </p>
              </div>
            </div>
          </DoubleBezel>

          <DoubleBezel className="h-full group hover-lift">
            <div className="p-6 flex flex-col justify-between h-full space-y-4">
              <div>
                <div className="text-3xl mb-3">🌫️</div>
                <h3 className="text-lg font-bold text-agrya-slate-900 group-hover:text-agrya-teal-700 transition-colors">
                  Financial Fog
                </h3>
                <p className="text-xs text-agrya-slate-600 leading-relaxed mt-2">
                  Critical data like real-time cash flow availability simply wasn’t available when needed most.
                </p>
              </div>
            </div>
          </DoubleBezel>

          <DoubleBezel className="h-full group hover-lift">
            <div className="p-6 flex flex-col justify-between h-full space-y-4">
              <div>
                <div className="text-3xl mb-3">🛑</div>
                <h3 className="text-lg font-bold text-agrya-slate-900 group-hover:text-agrya-teal-700 transition-colors">
                  Scaling Ceilings
                </h3>
                <p className="text-xs text-agrya-slate-600 leading-relaxed mt-2">
                  Lack of robust processes preventing the business from growing as fast as the vision.
                </p>
              </div>
            </div>
          </DoubleBezel>

        </div>
      </section>

      {/* THE SOLUTION / MISSION (VERBATIM RESTORATION) */}
      <section className="bg-agrya-slate-900 rounded-[2.5rem] p-10 sm:p-16 text-white relative overflow-hidden text-center border border-agrya-slate-800">
        <div className="relative z-10 max-w-3xl mx-auto space-y-6">
          <span className="font-mono text-xs font-semibold uppercase tracking-wider text-agrya-teal-400">
            Our Purpose
          </span>
          <h2 className="text-3xl sm:text-5xl font-extrabold tracking-tight text-white">
            So we built Agrya.
          </h2>
          <p className="text-base sm:text-xl text-agrya-slate-300 font-light leading-relaxed">
            We designed our <span className="text-white font-medium border-b border-agrya-teal-400">Virtual CFO</span> service to be the partner we wished we had. A service that relieves founders of the financial burden, so they can focus on changing the world.
          </p>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 border-t border-agrya-slate-800 pt-10 text-center">
            <div>
              <div className="text-4xl font-extrabold font-mono text-agrya-teal-400">500+</div>
              <div className="text-xs font-mono uppercase tracking-wider text-agrya-slate-400 mt-1">Clients Served</div>
            </div>
            <div>
              <div className="text-4xl font-extrabold font-mono text-agrya-teal-400">15+</div>
              <div className="text-xs font-mono uppercase tracking-wider text-agrya-slate-400 mt-1">Years of Impact</div>
            </div>
            <div>
              <div className="text-4xl font-extrabold font-mono text-agrya-teal-400">100%</div>
              <div className="text-xs font-mono uppercase tracking-wider text-agrya-slate-400 mt-1">Founder Focus</div>
            </div>
          </div>
        </div>
      </section>

      {/* OUTRO FOUNDER SIGN-OFF (VERBATIM RESTORATION) */}
      <section className="max-w-2xl mx-auto text-center space-y-6">
        <blockquote className="text-2xl font-bold text-agrya-slate-900">
          &ldquo;We believe our success comes entirely from the success of our clients.&rdquo;
        </blockquote>
        <p className="text-sm text-agrya-slate-600 leading-relaxed">
          If you are an entrepreneur looking to leave your mark on this world, we would love to be the ones clearing the path for you.
        </p>
        <div className="pt-2">
          <p className="font-bold text-base text-agrya-slate-900">Priya & Jayakumar</p>
          <p className="text-xs font-mono text-agrya-slate-500 uppercase tracking-wider mt-0.5">Founders</p>
        </div>
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

