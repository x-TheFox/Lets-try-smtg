import React from 'react';
import { ecosystemTools } from '../../data/ecosystem';
import { DoubleBezel } from '../ui/DoubleBezel';
import { ExternalLink, Layers, BarChart3, Clock } from 'lucide-react';

export const EcosystemSection: React.FC = () => {
  const iconMap: Record<string, React.ReactNode> = {
    'Effortless': <Layers className="w-5 h-5 text-agrya-teal-600" />,
    'Actionboard': <BarChart3 className="w-5 h-5 text-blue-600" />,
    'Pulse': <Clock className="w-5 h-5 text-indigo-600" />,
  };

  return (
    <section id="ecosystem" className="max-w-6xl mx-auto px-6 py-20 border-t border-agrya-slate-200/80">
      
      {/* SECTION HEADER */}
      <div className="max-w-3xl mb-12">
        <div className="font-mono text-xs text-agrya-teal-700 font-semibold uppercase tracking-wider mb-2">
          Technology Infrastructure
        </div>
        <h2 className="text-3xl sm:text-4xl font-extrabold text-agrya-slate-950 tracking-tight mb-4">
          Powered by Intelligence.
        </h2>
        <p className="text-agrya-slate-600 text-sm sm:text-base leading-relaxed">
          We don’t just use software; we build ecosystems. Our proprietary and partner tools give you an unfair advantage in financial visibility.
        </p>
      </div>

      {/* ECOSYSTEM CARDS */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {ecosystemTools.map((tool) => (
          <DoubleBezel key={tool.name} className="h-full group">
            <div className="p-6 sm:p-7 flex flex-col justify-between h-full">
              <div>
                <div className="flex items-center justify-between mb-4">
                  <div className="w-10 h-10 rounded-xl bg-agrya-slate-50 border border-agrya-slate-200/80 flex items-center justify-center group-hover:scale-105 spring-snappy">
                    {iconMap[tool.name]}
                  </div>
                  <span className="font-mono text-[11px] text-agrya-slate-400 font-medium">
                    {tool.category}
                  </span>
                </div>

                <div className="mb-2">
                  <h3 className="text-xl font-bold text-agrya-slate-900 group-hover:text-agrya-teal-700 spring-standard transition-colors">
                    {tool.name}
                  </h3>
                  <div className="text-xs font-semibold text-agrya-teal-700 font-mono mt-0.5">
                    {tool.tagline}
                  </div>
                </div>

                <p className="text-agrya-slate-600 text-xs sm:text-sm leading-relaxed mb-6 pt-2">
                  {tool.description}
                </p>
              </div>

              <div className="pt-4 border-t border-agrya-slate-100 flex items-center justify-between">
                <a
                  href={tool.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-xs font-semibold text-agrya-slate-900 hover:text-agrya-teal-700 flex items-center gap-1.5 transition-colors group-hover:translate-x-0.5 spring-snappy"
                >
                  <span>Launch Platform</span>
                  <ExternalLink className="w-3.5 h-3.5 text-agrya-slate-400 group-hover:text-agrya-teal-700" />
                </a>
                <span className="text-[10px] font-mono text-agrya-slate-400">Integrated Engine</span>
              </div>
            </div>
          </DoubleBezel>
        ))}
      </div>

    </section>
  );
};
