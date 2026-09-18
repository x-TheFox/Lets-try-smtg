import React, { useEffect } from 'react';

interface PageTransitionProps {
  routeKey: string;
  children: React.ReactNode;
}

export const PageTransition: React.FC<PageTransitionProps> = ({ routeKey, children }) => {
  useEffect(() => {
    // Instant scroll restoration on route resolution
    window.scrollTo({ top: 0, left: 0, behavior: 'instant' });
  }, [routeKey]);

  return (
    <div
      key={routeKey}
      className="animate-page-entrance w-full flex-1"
      style={{ willChange: 'transform, opacity' }}
    >
      {children}
    </div>
  );
};
