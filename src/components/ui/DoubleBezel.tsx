import React from 'react';
import { clsx } from 'clsx';

interface DoubleBezelProps {
  children: React.ReactNode;
  className?: string;
  coreClassName?: string;
}

export const DoubleBezel: React.FC<DoubleBezelProps> = ({
  children,
  className,
  coreClassName
}) => {
  return (
    <div className={clsx('double-bezel', className)}>
      <div className={clsx('bezel-core', coreClassName)}>
        {children}
      </div>
    </div>
  );
};
