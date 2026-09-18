import React, { useState } from 'react';
import { ChevronDown, Menu, X, ArrowUpRight } from 'lucide-react';
import { clsx } from 'clsx';
import { prefetchRoute } from '../../utils/routePrefetch';

interface NavbarProps {
  currentPath: string;
  onNavigate: (path: string) => void;
  onOpenInquiry: () => void;
  onOpenDiagnostic?: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  currentPath,
  onNavigate,
  onOpenInquiry,
  onOpenDiagnostic,
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
        className="bg-white/95 backdrop-blur-xl border border-agrya-slate-200/90 rounded-full px-5 py-2.5 shadow-float-nav flex items-center justify-between transition-[box-shadow,border-color,background-color]"
      >
        {/* BRAND LOGO (OFFICIAL AGRYA LOGO) */}
        <button
          onClick={() => handleNavClick('/')}
          onMouseEnter={() => prefetchRoute('/')}
          onFocus={() => prefetchRoute('/')}
          className="flex items-center gap-3 group text-left focus:outline-none focus:ring-2 focus:ring-agrya-teal-500 rounded-xl p-1 transition-transform group-hover:scale-[1.02]"
          aria-label="Agrya Consulting Home"
        >
          <picture>
            <source srcSet="/assets/logo-agrya.webp" type="image/webp" />
            <img
              src="/assets/logo-agrya.png"
              alt="Agrya Consulting"
              width="131"
              height="32"
              fetchPriority="high"
              decoding="async"
              className="h-8 w-auto object-contain"
            />
          </picture>
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

            <div 
              className={clsx(
                "absolute top-full left-0 pt-2 w-64 z-50 origin-top-left transition-[opacity,transform] duration-180 ease-out",
                isServicesOpen 
                  ? "opacity-100 scale-100 translate-y-0 pointer-events-auto" 
                  : "opacity-0 scale-95 -translate-y-1 pointer-events-none"
              )}
            >
              <div className="bg-white border border-agrya-slate-200 rounded-2xl p-2 shadow-card-elevated space-y-1">
                <button
                  onClick={() => handleNavClick('/accounting-hub')}
                  onMouseEnter={() => prefetchRoute('/accounting-hub')}
                  onFocus={() => prefetchRoute('/accounting-hub')}
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
                  onMouseEnter={() => prefetchRoute('/cfo')}
                  onFocus={() => prefetchRoute('/cfo')}
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
                  onMouseEnter={() => prefetchRoute('/cfo-support')}
                  onFocus={() => prefetchRoute('/cfo-support')}
                  className={clsx(
                    "w-full text-left px-3 py-2.5 rounded-xl hover:bg-agrya-slate-50 spring-snappy transition-colors group",
                    currentPath === '/cfo-support' && "bg-agrya-teal-50"
                  )}
                >
                  <div className="font-bold text-xs text-agrya-slate-900 group-hover:text-agrya-teal-800">CFO Support Services</div>
                  <div className="text-[11px] text-agrya-slate-500 line-clamp-1">Force-multiplying in-house teams</div>
                </button>

                <div className="border-t border-agrya-slate-100 my-1 pt-1.5 space-y-1">
                  <div className="text-[10px] font-mono font-bold uppercase text-agrya-slate-400 px-3 py-1">
                    Interactive Tools
                  </div>
                  <button
                    onClick={() => handleNavClick('/tools/runway-calculator')}
                    onMouseEnter={() => prefetchRoute('/tools/runway-calculator')}
                    onFocus={() => prefetchRoute('/tools/runway-calculator')}
                    className={clsx(
                      "w-full text-left px-3 py-2 rounded-xl hover:bg-agrya-slate-50 spring-snappy transition-colors group flex items-center justify-between",
                      currentPath === '/tools/runway-calculator' && "bg-agrya-teal-50"
                    )}
                  >
                    <div>
                      <div className="font-bold text-xs text-agrya-slate-900 group-hover:text-agrya-teal-800">Runway Calculator</div>
                      <div className="text-[10px] text-agrya-slate-500">Scenario & sensitivity modeling</div>
                    </div>
                    <span className="text-[10px] font-mono px-1.5 py-0.5 rounded bg-agrya-teal-50 text-agrya-teal-700 font-semibold border border-agrya-teal-200">Tool</span>
                  </button>

                  <button
                    onClick={() => {
                      setIsServicesOpen(false);
                      onOpenDiagnostic?.();
                    }}
                    className="w-full text-left px-3 py-2 rounded-xl hover:bg-agrya-slate-50 spring-snappy transition-colors group flex items-center justify-between"
                  >
                    <div>
                      <div className="font-bold text-xs text-agrya-slate-900 group-hover:text-agrya-teal-800">Financial Maturity Index</div>
                      <div className="text-[10px] text-agrya-slate-500">5-question diagnostic & audit score</div>
                    </div>
                    <span className="text-[10px] font-mono px-1.5 py-0.5 rounded bg-emerald-50 text-emerald-700 font-semibold border border-emerald-200">Audit</span>
                  </button>
                </div>

                <div className="border-t border-agrya-slate-100 my-1 pt-1.5">
                  <div className="text-[10px] font-mono font-bold uppercase text-agrya-slate-400 px-3 py-1">
                    Ecosystem Platforms
                  </div>
                  <a
                    href="https://www.goeffortless.co"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-full text-left px-3 py-2 rounded-xl hover:bg-agrya-slate-50 spring-snappy transition-colors group flex items-center justify-between"
                  >
                    <div>
                      <div className="font-bold text-xs text-agrya-slate-900 group-hover:text-agrya-teal-800 flex items-center gap-1.5">
                        <span>Effortless</span>
                        <span className="text-agrya-slate-400 text-[10px]">↗</span>
                      </div>
                      <div className="text-[10px] text-agrya-slate-500">Automated Tally Sync & Billing</div>
                    </div>
                  </a>
                  <a
                    href="https://www.myactionboard.com"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-full text-left px-3 py-2 rounded-xl hover:bg-agrya-slate-50 spring-snappy transition-colors group flex items-center justify-between"
                  >
                    <div>
                      <div className="font-bold text-xs text-agrya-slate-900 group-hover:text-agrya-teal-800 flex items-center gap-1.5">
                        <span>Actionboard Reports</span>
                        <span className="text-agrya-slate-400 text-[10px]">↗</span>
                      </div>
                      <div className="text-[10px] text-agrya-slate-500">AI Finance OS for CFO Office</div>
                    </div>
                  </a>
                  <a
                    href="https://pulse.myactionboard.com"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-full text-left px-3 py-2 rounded-xl hover:bg-agrya-slate-50 spring-snappy transition-colors group flex items-center justify-between"
                  >
                    <div>
                      <div className="font-bold text-xs text-agrya-slate-900 group-hover:text-agrya-teal-800 flex items-center gap-1.5">
                        <span>Pulse</span>
                        <span className="text-agrya-slate-400 text-[10px]">↗</span>
                      </div>
                      <div className="text-[10px] text-agrya-slate-500">Project Profitability & Sentinel</div>
                    </div>
                  </a>
                </div>
              </div>
            </div>
          </div>

          <button
            onClick={() => handleNavClick('/story')}
            onMouseEnter={() => prefetchRoute('/story')}
            onFocus={() => prefetchRoute('/story')}
            className={clsx(
              "hover:text-agrya-slate-900 spring-snappy transition-colors",
              currentPath === '/story' && "text-agrya-teal-700 font-bold"
            )}
          >
            Our Story
          </button>

          <button
            onClick={() => handleNavClick('/team')}
            onMouseEnter={() => prefetchRoute('/team')}
            onFocus={() => prefetchRoute('/team')}
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

          {/* MOBILE MENU TOGGLE (WCAG / Apple HIG 44px min touch target) */}
          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="md:hidden min-w-[44px] min-h-[44px] inline-flex items-center justify-center rounded-full hover:bg-agrya-slate-100 text-agrya-slate-700 transition-colors focus:outline-none focus:ring-2 focus:ring-agrya-teal-500"
            aria-label="Toggle menu"
            aria-expanded={isMobileMenuOpen}
          >
            {isMobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </nav>

      {/* MOBILE COLLAPSED DRAWER */}
      <div 
        className={clsx(
          "md:hidden overflow-hidden transition-[max-height,opacity,transform] duration-250 ease-out origin-top",
          isMobileMenuOpen 
            ? "max-h-[500px] opacity-100 mt-2 pointer-events-auto scale-100" 
            : "max-h-0 opacity-0 mt-0 pointer-events-none scale-98"
        )}
      >
        <div className="bg-white/98 backdrop-blur-2xl border border-agrya-slate-200 rounded-3xl p-5 shadow-card-elevated space-y-4">
          <div className="space-y-1">
            <div className="text-[10px] font-mono font-semibold uppercase text-agrya-slate-400 px-3 py-1">Services</div>
            <button
              onClick={() => handleNavClick('/accounting-hub')}
              className={clsx(
                "w-full text-left px-3 py-2.5 min-h-[44px] flex items-center rounded-xl text-sm font-semibold",
                currentPath === '/accounting-hub' ? "bg-agrya-teal-50 text-agrya-teal-800" : "text-agrya-slate-700"
              )}
            >
              Accounting Hub
            </button>
            <button
              onClick={() => handleNavClick('/cfo')}
              className={clsx(
                "w-full text-left px-3 py-2.5 min-h-[44px] flex items-center rounded-xl text-sm font-semibold",
                currentPath === '/cfo' ? "bg-agrya-teal-50 text-agrya-teal-800" : "text-agrya-slate-700"
              )}
            >
              Virtual CFO
            </button>
            <button
              onClick={() => handleNavClick('/cfo-support')}
              className={clsx(
                "w-full text-left px-3 py-2.5 min-h-[44px] flex items-center rounded-xl text-sm font-semibold",
                currentPath === '/cfo-support' ? "bg-agrya-teal-50 text-agrya-teal-800" : "text-agrya-slate-700"
              )}
            >
              CFO Support Services
            </button>
          </div>

          <div className="border-t border-agrya-slate-100 pt-3 space-y-1">
            <div className="text-[10px] font-mono font-semibold uppercase text-agrya-slate-400 px-3 py-1">Tools</div>
            <button
              onClick={() => handleNavClick('/tools/runway-calculator')}
              className={clsx(
                "w-full text-left px-3 py-2 rounded-xl text-sm font-semibold flex items-center justify-between",
                currentPath === '/tools/runway-calculator' ? "bg-agrya-teal-50 text-agrya-teal-800" : "text-agrya-slate-700"
              )}
            >
              <span>Runway Calculator</span>
              <span className="text-[10px] font-mono px-1.5 py-0.5 rounded bg-agrya-teal-50 text-agrya-teal-700">Tool</span>
            </button>
            <button
              onClick={() => {
                setIsMobileMenuOpen(false);
                onOpenDiagnostic?.();
              }}
              className="w-full text-left px-3 py-2 rounded-xl text-sm font-semibold text-agrya-slate-700 hover:text-agrya-teal-800 flex items-center justify-between"
            >
              <span>Financial Maturity Index</span>
              <span className="text-[10px] font-mono px-1.5 py-0.5 rounded bg-emerald-50 text-emerald-700">Audit</span>
            </button>
          </div>

          <div className="border-t border-agrya-slate-100 pt-3 space-y-1">
            <div className="text-[10px] font-mono font-semibold uppercase text-agrya-slate-400 px-3 py-1">Ecosystem</div>
            <a
              href="https://www.goeffortless.co"
              target="_blank"
              rel="noopener noreferrer"
              className="w-full min-h-[44px] flex items-center px-3 py-2 rounded-xl text-sm font-semibold text-agrya-slate-700 hover:text-agrya-teal-800"
            >
              Effortless SaaS ↗
            </a>
            <a
              href="https://www.myactionboard.com"
              target="_blank"
              rel="noopener noreferrer"
              className="w-full min-h-[44px] flex items-center px-3 py-2 rounded-xl text-sm font-semibold text-agrya-slate-700 hover:text-agrya-teal-800"
            >
              Actionboard Reports ↗
            </a>
            <a
              href="https://pulse.myactionboard.com"
              target="_blank"
              rel="noopener noreferrer"
              className="w-full min-h-[44px] flex items-center px-3 py-2 rounded-xl text-sm font-semibold text-agrya-slate-700 hover:text-agrya-teal-800"
            >
              Pulse Profitability ↗
            </a>
          </div>

          <div className="border-t border-agrya-slate-100 pt-3 space-y-1">
            <div className="text-[10px] font-mono font-semibold uppercase text-agrya-slate-400 px-3 py-1">Company</div>
            <button
              onClick={() => handleNavClick('/story')}
              className={clsx(
                "w-full text-left px-3 py-2.5 min-h-[44px] flex items-center rounded-xl text-sm font-semibold",
                currentPath === '/story' ? "bg-agrya-teal-50 text-agrya-teal-800" : "text-agrya-slate-700"
              )}
            >
              Our Story
            </button>
            <button
              onClick={() => handleNavClick('/team')}
              className={clsx(
                "w-full text-left px-3 py-2.5 min-h-[44px] flex items-center rounded-xl text-sm font-semibold",
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
              className="w-full min-h-[48px] py-3 bg-agrya-slate-900 text-white font-semibold rounded-2xl text-center text-sm shadow-sm flex items-center justify-center"
            >
              Get in Touch ↗
            </button>
          </div>
        </div>
      </div>
    </header>
  );
};
