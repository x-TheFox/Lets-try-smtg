import React from 'react';
import { DoubleBezel } from '../components/ui/DoubleBezel';
import { ArrowLeft, Compass } from 'lucide-react';

interface NotFoundPageProps {
  onNavigate: (path: string) => void;
}

export const NotFoundPage: React.FC<NotFoundPageProps> = ({ onNavigate }) => {
  return (
    <div className="max-w-4xl mx-auto px-6 py-32 text-center">
      <DoubleBezel className="w-full">
        <div className="p-8 sm:p-14 space-y-6">
          <div className="w-12 h-12 rounded-2xl bg-agrya-teal-50 border border-agrya-teal-200 text-agrya-teal-700 mx-auto flex items-center justify-center">
            <Compass className="w-6 h-6" />
          </div>

          <div className="font-mono text-xs font-bold text-agrya-teal-700 uppercase tracking-wider">
            Error 404 &bull; Page Not Found
          </div>

          <h1 className="text-3xl sm:text-4xl font-extrabold text-agrya-slate-950 tracking-tight">
            The requested financial ledger does not exist.
          </h1>

          <p className="text-xs sm:text-sm text-agrya-slate-600 max-w-md mx-auto leading-relaxed">
            The route you navigated to has been archived, relocated, or does not exist on this domain.
          </p>

          <div className="pt-4 flex flex-wrap items-center justify-center gap-4">
            <button
              onClick={() => onNavigate('/')}
              className="inline-flex items-center gap-2 px-6 py-2.5 bg-agrya-slate-900 text-white rounded-full text-xs font-semibold hover:bg-agrya-slate-800 spring-snappy shadow-sm"
            >
              <ArrowLeft className="w-4 h-4" />
              <span>Return to Financial OS</span>
            </button>

            <button
              onClick={() => onNavigate('/cfo')}
              className="inline-flex items-center gap-2 px-6 py-2.5 bg-white border border-agrya-slate-200 text-agrya-slate-800 rounded-full text-xs font-semibold hover:bg-agrya-slate-50 spring-snappy"
            >
              <span>Explore Virtual CFO</span>
            </button>
          </div>
        </div>
      </DoubleBezel>
    </div>
  );
};
