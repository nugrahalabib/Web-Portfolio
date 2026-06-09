import React from 'react';
import { portfolioData } from '../config/portfolio';

export const Footer: React.FC = () => {
  const { personal } = portfolioData;

  return (
    <footer className="border-t border-brand-border bg-brand-bg py-6 px-4 md:px-12 relative overflow-hidden font-mono text-xs text-brand-text-secondary select-none">
      <div className="absolute inset-0 bg-noise pointer-events-none" />
      
      <div className="max-w-screen-2xl mx-auto flex flex-wrap justify-between items-center gap-4 relative z-10">
        {/* Left ID */}
        <span className="font-bold text-brand-black">{personal.systemId}</span>

        {/* Center label */}
        <span className="hidden sm:inline">NUGI.DEV SYSTEM</span>

        {/* Copyright */}
        <span>ALL RIGHTS RESERVED &copy; {new Date().getFullYear()}</span>

        {/* Right Status */}
        <div className="flex items-center gap-1.5 font-bold text-brand-black">
          <span>STATUS: ONLINE</span>
          <span className="w-1.5 h-1.5 bg-brand-red rounded-full animate-pulse" />
        </div>

        {/* Mode */}
        <span className="hidden md:inline font-bold text-brand-black">MODE: CREATIVE BUILD</span>
      </div>
    </footer>
  );
};
