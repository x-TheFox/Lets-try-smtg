import React from 'react';
import { clsx } from 'clsx';

interface BadgeProps {
  children: React.ReactNode;
  pulse?: boolean;
  variant?: 'teal' | 'slate' | 'emerald';
  className?: string;
}

export const Badge: React.FC<BadgeProps> = ({
  children,
  pulse = false,
  variant = 'teal',
  className
}) => {
  const styles = {
    teal: 'bg-agrya-teal-50 border-agrya-teal-200/60 text-agrya-teal-900',
    slate: 'bg-agrya-slate-100 border-agrya-slate-200 text-agrya-slate-800',
    emerald: 'bg-emerald-50 border-emerald-200/70 text-emerald-800',
  };

  const dotStyles = {
    teal: 'bg-agrya-teal-500',
    slate: 'bg-agrya-slate-500',
    emerald: 'bg-emerald-500',
  };

  return (
    <div
      className={clsx(
        'inline-flex items-center gap-2 px-3 py-1 rounded-full border text-[11px] font-mono font-medium tracking-wide uppercase',
        styles[variant],
        className
      )}
    >
      {pulse && (
        <span className={clsx('w-2 h-2 rounded-full animate-pulse', dotStyles[variant])} />
      )}
      <span>{children}</span>
    </div>
  );
};
