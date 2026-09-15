import React, { useState } from 'react';
import { ChevronDown, Menu, X, ArrowUpRight } from 'lucide-react';
import { clsx } from 'clsx';

interface NavbarProps {
  currentPath: string;
  onNavigate: (path: string) => void;
  onOpenInquiry: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  currentPath,
  onNavigate,
  onOpenInquiry,
}) => {
  const [isServicesOpen, setIsServicesOpen] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const handleNavClick = (path: string) => {
    onNavigate(path);
    setIsMobileMenuOpen(false);
    setIsServicesOpen(false);
  };

  return (
    <header className="sticky top-4 z-50 max-w-5xl mx-auto px-4 w-full">
      <nav 
        aria-label="Main Navigation"
        className="bg-white/90 backdrop-blur-xl border border-agrya-slate-200/80 rounded-full px-5 py-2.5 shadow-float-nav flex items-center justify-between transition-all"
      >
        {/* BRAND LOGO */}
        <button
          onClick={() => handleNavClick('/')}
          className="flex items-center gap-3 group text-left focus:outline-none focus:ring-2 focus:ring-agrya-teal-500 rounded-lg p-1"
        >
          <div className="w-9 h-9 rounded-xl bg-agrya-teal-50 border border-agrya-teal-200/60 flex items-center justify-center text-agrya-teal-800 font-extrabold text-lg tracking-tight group-hover:scale-105 spring-snappy">
            A
          </div>
          <div>
            <span className="font-bold text-base tracking-tight text-agrya-slate-900 block leading-tight">Agrya</span>
            <span className="text-[10px] text-agrya-teal-700 font-mono block -mt-0.5 tracking-widest uppercase font-semibold">Consulting</span>
          </div>
        </button>

        {/* DESKTOP LINKS */}
        <div className="hidden md:flex items-center gap-6 text-xs font-semibold tracking-wide text-agrya-slate-600">
          {/* SERVICES DROPDOWN */}
          <div 
            className="relative"
            onMouseEnter={() => setIsServicesOpen(true)}
            onMouseLeave={() => setIsServicesOpen(false)}
          >
            <button
              onClick={() => setIsServicesOpen(!isServicesOpen)}
              className={clsx(
                "inline-flex items-center gap-1.5 py-2 hover:text-agrya-slate-900 spring-snappy transition-colors",
                ['/accounting-hub', '/cfo', '/cfo-support'].includes(currentPath) && "text-agrya-teal-700 font-bold"
              )}
              aria-expanded={isServicesOpen}
            >
              <span>Services</span>
              <ChevronDown className={clsx("w-3.5 h-3.5 spring-snappy transition-transform", isServicesOpen && "rotate-180")} />
            </button>

            {isServicesOpen && (
              <div className="absolute top-full left-0 pt-2 w-64 z-50">
                <div className="bg-white border border-agrya-slate-200 rounded-2xl p-2 shadow-card-elevated space-y-1">
                  <button
                    onClick={() => handleNavClick('/accounting-hub')}
                    className={clsx(
                      "w-full text-left px-3 py-2.5 rounded-xl hover:bg-agrya-slate-50 spring-snappy transition-colors group",
                      currentPath === '/accounting-hub' && "bg-agrya-teal-50"
                    )}
                  >
                    <div className="font-bold text-xs text-agrya-slate-900 group-hover:text-agrya-teal-800">Accounting Hub</div>
                    <div className="text-[11px] text-agrya-slate-500 line-clamp-1">Bookkeeping, compliance & MIS</div>
                  </button>

                  <button
                    onClick={() => handleNavClick('/cfo')}
                    className={clsx(
                      "w-full text-left px-3 py-2.5 rounded-xl hover:bg-agrya-slate-50 spring-snappy transition-colors group",
                      currentPath === '/cfo' && "bg-agrya-teal-50"
                    )}
                  >
                    <div className="font-bold text-xs text-agrya-slate-900 group-hover:text-agrya-teal-800">Virtual CFO</div>
                    <div className="text-[11px] text-agrya-slate-500 line-clamp-1">FP&A, fundraising & unit economics</div>
                  </button>

                  <button
                    onClick={() => handleNavClick('/cfo-support')}
                    className={clsx(
                      "w-full text-left px-3 py-2.5 rounded-xl hover:bg-agrya-slate-50 spring-snappy transition-colors group",
                      currentPath === '/cfo-support' && "bg-agrya-teal-50"
                    )}
                  >
                    <div className="font-bold text-xs text-agrya-slate-900 group-hover:text-agrya-teal-800">CFO Support</div>
                    <div className="text-[11px] text-agrya-slate-500 line-clamp-1">Force-multiplying in-house teams</div>
                  </button>
                </div>
              </div>
            )}
          </div>

          <button
            onClick={() => handleNavClick('/story')}
            className={clsx(
              "hover:text-agrya-slate-900 spring-snappy transition-colors",
              currentPath === '/story' && "text-agrya-teal-700 font-bold"
            )}
          >
            Our Story
          </button>

          <button
            onClick={() => handleNavClick('/team')}
            className={clsx(
              "hover:text-agrya-slate-900 spring-snappy transition-colors",
              currentPath === '/team' && "text-agrya-teal-700 font-bold"
            )}
          >
            Team
          </button>
        </div>

        {/* PRIMARY CTA & MOBILE TOGGLE */}
        <div className="flex items-center gap-2">
          <button
            onClick={onOpenInquiry}
            className="group hidden sm:inline-flex items-center gap-2.5 bg-agrya-slate-900 hover:bg-agrya-slate-800 text-white pl-4 pr-1.5 py-1.5 rounded-full text-xs font-semibold spring-snappy active:scale-95 shadow-sm"
          >
            <span>Get in Touch</span>
            <span className="w-6 h-6 rounded-full bg-white/15 flex items-center justify-center group-hover:translate-x-0.5 group-hover:-translate-y-0.5 spring-snappy">
              <ArrowUpRight className="w-3.5 h-3.5" />
            </span>
          </button>

          {/* MOBILE MENU TOGGLE */}
          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="md:hidden p-2 rounded-full hover:bg-agrya-slate-100 text-agrya-slate-700 transition-colors"
            aria-label="Toggle menu"
          >
            {isMobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </nav>

      {/* MOBILE COLLAPSED DRAWER */}
      {isMobileMenuOpen && (
        <div className="md:hidden mt-2 bg-white/95 backdrop-blur-2xl border border-agrya-slate-200 rounded-3xl p-5 shadow-card-elevated space-y-4">
          <div className="space-y-1">
            <div className="text-[10px] font-mono font-semibold uppercase text-agrya-slate-400 px-3 py-1">Services</div>
            <button
              onClick={() => handleNavClick('/accounting-hub')}
              className={clsx(
                "w-full text-left px-3 py-2 rounded-xl text-sm font-semibold",
                currentPath === '/accounting-hub' ? "bg-agrya-teal-50 text-agrya-teal-800" : "text-agrya-slate-700"
              )}
            >
              Accounting Hub
            </button>
            <button
              onClick={() => handleNavClick('/cfo')}
              className={clsx(
                "w-full text-left px-3 py-2 rounded-xl text-sm font-semibold",
                currentPath === '/cfo' ? "bg-agrya-teal-50 text-agrya-teal-800" : "text-agrya-slate-700"
              )}
            >
              Virtual CFO
            </button>
            <button
              onClick={() => handleNavClick('/cfo-support')}
              className={clsx(
                "w-full text-left px-3 py-2 rounded-xl text-sm font-semibold",
                currentPath === '/cfo-support' ? "bg-agrya-teal-50 text-agrya-teal-800" : "text-agrya-slate-700"
              )}
            >
              CFO Support
            </button>
          </div>

          <div className="border-t border-agrya-slate-100 pt-3 space-y-1">
            <div className="text-[10px] font-mono font-semibold uppercase text-agrya-slate-400 px-3 py-1">Company</div>
            <button
              onClick={() => handleNavClick('/story')}
              className={clsx(
                "w-full text-left px-3 py-2 rounded-xl text-sm font-semibold",
                currentPath === '/story' ? "bg-agrya-teal-50 text-agrya-teal-800" : "text-agrya-slate-700"
              )}
            >
              Our Story
            </button>
            <button
              onClick={() => handleNavClick('/team')}
              className={clsx(
                "w-full text-left px-3 py-2 rounded-xl text-sm font-semibold",
                currentPath === '/team' ? "bg-agrya-teal-50 text-agrya-teal-800" : "text-agrya-slate-700"
              )}
            >
              Team
            </button>
          </div>

          <div className="pt-2">
            <button
              onClick={() => {
                setIsMobileMenuOpen(false);
                onOpenInquiry();
              }}
              className="w-full py-3 bg-agrya-slate-900 text-white font-semibold rounded-2xl text-center text-sm shadow-sm"
            >
              Get in Touch &nearr;
            </button>
          </div>
        </div>
      )}
    </header>
  );
};
