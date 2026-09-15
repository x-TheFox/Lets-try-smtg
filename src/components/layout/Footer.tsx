import React from 'react';
import { officeLocations } from '../../data/locations';
import { MapPin, Mail } from 'lucide-react';

interface FooterProps {
  onNavigate: (path: string) => void;
}

export const Footer: React.FC<FooterProps> = ({ onNavigate }) => {
  return (
    <footer className="bg-agrya-slate-900 text-white pt-20 pb-12 border-t border-agrya-slate-800">
      <div className="max-w-6xl mx-auto px-6">
        
        {/* TOP BRAND & NAVIGATION MATRIX */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-10 pb-16 border-b border-agrya-slate-800/80">
          
          {/* BRAND COLUMN */}
          <div className="md:col-span-5 space-y-4">
            <button
              onClick={() => onNavigate('/')}
              className="bg-white px-3.5 py-2 rounded-xl inline-flex items-center shadow-sm hover:opacity-95 transition-opacity"
              aria-label="Agrya Consulting Home"
            >
              <img
                src="/assets/logo-agrya.png"
                alt="Agrya Consulting"
                className="h-7 w-auto object-contain"
              />
            </button>

            <div className="text-[11px] text-agrya-teal-400 font-mono tracking-widest uppercase font-semibold">
              The Financial OS for Modern Business
            </div>

            <p className="text-agrya-slate-400 text-xs sm:text-sm leading-relaxed max-w-sm pt-1">
              Empowering growth-focused businesses with modern financial infrastructure, strategic Virtual CFO leadership, and automated accounting workflows.
            </p>

            <div className="pt-2 flex items-center gap-3">
              <a 
                href="https://www.linkedin.com/company/agrya-consulting" 
                target="_blank" 
                rel="noopener noreferrer"
                className="w-8 h-8 rounded-full bg-agrya-slate-800 hover:bg-agrya-teal-600/30 text-agrya-slate-300 hover:text-agrya-teal-300 border border-agrya-slate-700/60 flex items-center justify-center transition-colors"
                aria-label="LinkedIn"
              >
                <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
                  <path d="M19 3a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h14m-.5 15.5v-5.3a3.26 3.26 0 0 0-3.26-3.26c-.85 0-1.84.52-2.28 1.3v-1.11h-2.79v8.37h2.79v-4.93c0-.77.62-1.4 1.39-1.4a1.4 1.4 0 0 1 1.4 1.4v4.93h2.75M6.46 10.9v8.37H9.2V10.9H6.46M7.83 6.64a1.64 1.64 0 1 0 0 3.28 1.64 1.64 0 0 0 0-3.28Z" />
                </svg>
              </a>
              <a 
                href="mailto:hello@agrya.in"
                className="w-8 h-8 rounded-full bg-agrya-slate-800 hover:bg-agrya-teal-600/30 text-agrya-slate-300 hover:text-agrya-teal-300 border border-agrya-slate-700/60 flex items-center justify-center transition-colors"
                aria-label="Email Agrya"
              >
                <Mail className="w-4 h-4" />
              </a>
            </div>
          </div>

          {/* COMPANY LINKS */}
          <div className="md:col-span-3 space-y-3">
            <h3 className="font-mono text-xs font-semibold uppercase tracking-wider text-agrya-teal-400">Company</h3>
            <ul className="space-y-2 text-xs text-agrya-slate-400">
              <li>
                <button onClick={() => onNavigate('/story')} className="hover:text-white transition-colors">
                  Our Story
                </button>
              </li>
              <li>
                <button onClick={() => onNavigate('/team')} className="hover:text-white transition-colors">
                  Leadership & Partners
                </button>
              </li>
              <li>
                <a href="mailto:hello@agrya.in" className="hover:text-white transition-colors">
                  Careers & Advisory
                </a>
              </li>
            </ul>
          </div>

          {/* SERVICES & ECOSYSTEM */}
          <div className="md:col-span-4 space-y-3">
            <h3 className="font-mono text-xs font-semibold uppercase tracking-wider text-agrya-teal-400">Services & Ecosystem</h3>
            <ul className="space-y-2 text-xs text-agrya-slate-400">
              <li>
                <button onClick={() => onNavigate('/accounting-hub')} className="hover:text-white transition-colors">
                  Accounting Hub
                </button>
              </li>
              <li>
                <button onClick={() => onNavigate('/cfo')} className="hover:text-white transition-colors">
                  Virtual CFO Advisory
                </button>
              </li>
              <li>
                <button onClick={() => onNavigate('/cfo-support')} className="hover:text-white transition-colors">
                  CFO Support Pods
                </button>
              </li>
              <li className="pt-2 border-t border-agrya-slate-800/60">
                <a href="https://www.goeffortless.co" target="_blank" rel="noopener noreferrer" className="hover:text-white transition-colors flex items-center gap-1">
                  Effortless • Growth & Tally Sync ↗
                </a>
              </li>
              <li>
                <a href="https://www.myactionboard.com" target="_blank" rel="noopener noreferrer" className="hover:text-white transition-colors flex items-center gap-1">
                  Actionboard • AI Finance on PharOS ↗
                </a>
              </li>
              <li>
                <a href="https://pulse.myactionboard.com" target="_blank" rel="noopener noreferrer" className="hover:text-white transition-colors flex items-center gap-1">
                  Pulse • Project Profitability (Agrya Tech) ↗
                </a>
              </li>
            </ul>
          </div>

        </div>

        {/* FOUR PHYSICAL HUB LOCATIONS (VERBATIM ADDRESSES) */}
        <div className="py-12 border-b border-agrya-slate-800/80">
          <div className="font-mono text-xs font-semibold uppercase tracking-wider text-agrya-slate-400 mb-6">
            Physical Hubs • Pan-India Presence
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {officeLocations.map((loc) => (
              <div key={loc.city} className="p-4 rounded-2xl bg-agrya-slate-950 border border-agrya-slate-800/60 space-y-2">
                <div className="flex items-center gap-2">
                  <MapPin className="w-3.5 h-3.5 text-agrya-teal-400 shrink-0" />
                  <span className="font-bold text-xs uppercase tracking-wide text-white">
                    {loc.city} {loc.isHeadquarter && <span className="text-[10px] text-agrya-teal-400 font-mono font-normal">(HQ)</span>}
                  </span>
                </div>
                <p className="text-[11px] text-agrya-slate-400 leading-relaxed font-normal">
                  {loc.address}, {loc.city}, {loc.state} - {loc.pincode}, IN
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* BOTTOM LEGAL & COPYRIGHT */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between text-[11px] text-agrya-slate-500 font-mono gap-4">
          <div>
            © {new Date().getFullYear()} Agrya Consulting Private Limited. All rights reserved.
          </div>
          <div className="flex items-center gap-4">
            <span>Chennai • Bengaluru • Hyderabad • Mumbai</span>
            <span>•</span>
            <span className="text-agrya-teal-400">SOC-2 & Statutory Rigor</span>
          </div>
        </div>

      </div>
    </footer>
  );
};
