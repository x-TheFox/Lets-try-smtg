import React from 'react';

interface TopProgressBarProps {
  isLoading: boolean;
}

export const TopProgressBar: React.FC<TopProgressBarProps> = ({ isLoading }) => {
  if (!isLoading) return null;

  return (
    <div
      role="progressbar"
      aria-label="Loading page resources"
      className="fixed top-0 left-0 right-0 h-[2.5px] z-[100] overflow-hidden pointer-events-none bg-agrya-teal-100/40"
    >
      <div
        className="w-full h-full bg-gradient-to-r from-agrya-teal-700 via-agrya-teal-400 to-agrya-teal-600 shadow-[0_0_10px_rgba(20,184,166,0.7)] animate-top-progress origin-left"
      />
    </div>
  );
};
