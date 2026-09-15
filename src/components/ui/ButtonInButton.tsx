import React from 'react';
import { clsx } from 'clsx';
import { ArrowUpRight, ArrowRight } from 'lucide-react';

interface ButtonInButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'dark' | 'outline';
  iconType?: 'arrow-up-right' | 'arrow-right';
  children: React.ReactNode;
  asAnchor?: boolean;
  href?: string;
}

export const ButtonInButton: React.FC<ButtonInButtonProps> = ({
  variant = 'primary',
  iconType = 'arrow-up-right',
  children,
  className,
  asAnchor,
  href,
  ...props
}) => {
  const baseStyles = 'group inline-flex items-center gap-3 pl-5 pr-2 py-2 rounded-full text-xs sm:text-sm font-semibold spring-snappy active:scale-[0.98] transition-all focus:outline-none focus:ring-2 focus:ring-agrya-teal-500 focus:ring-offset-2';
  
  const variantStyles = {
    primary: 'bg-agrya-teal-700 hover:bg-agrya-teal-800 text-white shadow-sm',
    dark: 'bg-agrya-slate-900 hover:bg-agrya-slate-800 text-white shadow-sm',
    secondary: 'bg-white hover:bg-agrya-slate-50 text-agrya-slate-800 border border-agrya-slate-200 shadow-sm',
    outline: 'bg-transparent hover:bg-agrya-teal-50 text-agrya-teal-800 border border-agrya-teal-300',
  };

  const iconWrapperStyles = {
    primary: 'bg-white/20 text-white',
    dark: 'bg-white/15 text-white',
    secondary: 'bg-agrya-slate-100 text-agrya-slate-800 group-hover:bg-agrya-slate-200',
    outline: 'bg-agrya-teal-100 text-agrya-teal-800',
  };

  const content = (
    <>
      <span className="tracking-tight">{children}</span>
      <span
        className={clsx(
          'w-7 h-7 rounded-full flex items-center justify-center spring-snappy',
          'group-hover:translate-x-0.5 group-hover:-translate-y-0.5 group-hover:scale-105',
          iconWrapperStyles[variant]
        )}
      >
        {iconType === 'arrow-up-right' ? (
          <ArrowUpRight className="w-3.5 h-3.5" />
        ) : (
          <ArrowRight className="w-3.5 h-3.5" />
        )}
      </span>
    </>
  );

  if (asAnchor && href) {
    return (
      <a href={href} className={clsx(baseStyles, variantStyles[variant], className)}>
        {content}
      </a>
    );
  }

  return (
    <button className={clsx(baseStyles, variantStyles[variant], className)} {...props}>
      {content}
    </button>
  );
};
