import React from 'react';

export const PageSkeleton: React.FC = () => {
  return (
    <div
      aria-busy="true"
      aria-live="polite"
      className="max-w-6xl mx-auto px-6 pt-12 pb-24 space-y-12 animate-fade-in"
    >
      {/* HEADER GHOST */}
      <div className="max-w-3xl space-y-6">
        {/* BADGE GHOST */}
        <div className="h-6 w-48 rounded-full bg-agrya-slate-200/70 animate-pulse" />
        
        {/* TITLE GHOST */}
        <div className="space-y-3">
          <div className="h-12 sm:h-14 w-4/5 rounded-2xl bg-agrya-slate-200/60 animate-pulse" />
          <div className="h-12 sm:h-14 w-2/3 rounded-2xl bg-agrya-slate-200/50 animate-pulse" />
        </div>

        {/* PARAGRAPH GHOST */}
        <div className="space-y-2 pt-2">
          <div className="h-4 w-full rounded-md bg-agrya-slate-100 animate-pulse" />
          <div className="h-4 w-5/6 rounded-md bg-agrya-slate-100 animate-pulse" />
        </div>

        {/* BUTTON GHOSTS */}
        <div className="flex gap-4 pt-4">
          <div className="h-11 w-36 rounded-full bg-agrya-slate-200/80 animate-pulse" />
          <div className="h-11 w-44 rounded-full bg-agrya-slate-100 animate-pulse" />
        </div>
      </div>

      {/* CONSOLE / CARD GHOST */}
      <div className="w-full h-80 rounded-3xl bg-agrya-slate-100/80 border border-agrya-slate-200/60 p-8 space-y-6 animate-pulse">
        <div className="h-5 w-48 rounded bg-agrya-slate-200" />
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 pt-4">
          <div className="h-32 rounded-2xl bg-white/70 border border-agrya-slate-200/50" />
          <div className="h-32 rounded-2xl bg-white/70 border border-agrya-slate-200/50" />
          <div className="h-32 rounded-2xl bg-white/70 border border-agrya-slate-200/50" />
        </div>
      </div>
    </div>
  );
};
