import React from 'react';
import { motion } from 'framer-motion';

interface SectionProps {
  id: string;
  number: string;
  title: string;
  subtitle?: React.ReactNode;
  children: React.ReactNode;
  className?: string;
  theme?: 'light' | 'dark';
}

export const Section: React.FC<SectionProps> = ({
  id,
  number,
  title,
  subtitle,
  children,
  className = "",
  theme = 'light'
}) => {
  const isDark = theme === 'dark';

  return (
    <section 
      id={id} 
      className={`relative py-20 px-4 md:px-8 border-b ${
        isDark 
          ? 'border-neutral-900 bg-grid-lines-dark' 
          : 'border-brand-border bg-grid-lines'
      } overflow-hidden ${className}`}
      style={{
        backgroundColor: isDark ? '#050507' : undefined
      }}
    >
      {/* Background noise filter */}
      <div className="absolute inset-0 bg-noise pointer-events-none" />

      {/* Decorative Top Grid Line Accent */}
      <div className={`absolute top-0 left-0 w-full h-[1px] ${isDark ? 'bg-neutral-900' : 'bg-brand-border'}`} />
      
      {/* Left & Right Decorative Border Lines (Desktop only) */}
      <div className={`absolute top-0 left-4 md:left-8 w-[1px] h-full ${isDark ? 'bg-neutral-900/40' : 'bg-brand-border/40'} hidden md:block`} />
      <div className={`absolute top-0 right-4 md:right-8 w-[1px] h-full ${isDark ? 'bg-neutral-900/40' : 'bg-brand-border/40'} hidden md:block`} />

      <div className="max-w-screen-2xl mx-auto relative z-10">
        {/* Section Header */}
        <div className={`mb-12 flex flex-col md:flex-row md:items-end justify-between border-b ${isDark ? 'border-neutral-900' : 'border-brand-border'} pb-6`}>
          <div className="font-mono">
            <span className="text-brand-red text-xs font-bold tracking-widest block mb-2 select-none">
              [{number}] // SYSTEM_CORE
            </span>
            <h2 className={`text-3xl md:text-5xl font-black uppercase tracking-tight ${isDark ? 'text-white' : 'text-brand-black'} select-none`}>
              {title}
            </h2>
            {subtitle && (
              <div className={`text-xs md:text-sm ${isDark ? 'text-neutral-400' : 'text-brand-text-secondary'} mt-2 tracking-wide font-sans uppercase select-none`}>
                {subtitle}
              </div>
            )}
          </div>
          
          <div className={`hidden md:block font-mono text-xs ${isDark ? 'text-neutral-400' : 'text-brand-text-secondary'} text-right select-none leading-relaxed`}>
            <div>LOC: ID // INDONESIA</div>
            <div>STATE: ACTIVE_VERIFIED</div>
          </div>
        </div>

        {/* Section Content */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
        >
          {children}
        </motion.div>
      </div>
    </section>
  );
};
