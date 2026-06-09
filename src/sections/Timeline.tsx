import React, { useRef, useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import type { Variants } from 'framer-motion';
import { Section } from '../components/Section';
import { portfolioData } from '../config/portfolio';
import { TechCorner } from '../components/TechCorner';
import { useLanguage } from '../context/LanguageContext';
import { ChevronLeft, ChevronRight } from 'lucide-react';

const getCompanyAbbreviation = (companyName: string) => {
  let cleanName = companyName
    .replace(/^PT\s+/i, '')
    .replace(/\s+\(Persero\).*$/i, '')
    .replace(/\s+Tbk.*$/i, '')
    .replace(/\s+\(.*?\)*/g, '')
    .replace(/[^a-zA-Z0-9\s-]/g, '')
    .trim();
  
  const parts = cleanName.split(/\s+/).filter(Boolean);
  if (parts.length >= 2) {
    return (parts[0][0] + parts[1][0]).toUpperCase();
  }
  return cleanName.slice(0, 2).toUpperCase();
};

const CompanyLogo: React.FC<{ logoUrl?: string; companyName: string; theme?: 'light' | 'dark' }> = ({ logoUrl, companyName, theme = 'light' }) => {
  const [imageError, setImageError] = useState(false);
  const abbreviation = getCompanyAbbreviation(companyName);

  if (logoUrl && !imageError) {
    return (
      <img 
        src={logoUrl} 
        alt={`${companyName} Logo`} 
        onError={() => setImageError(true)}
        className="w-10 h-10 object-contain rounded-lg border border-brand-border/60 bg-white p-1 shrink-0 select-none shadow-[0_2px_6px_rgba(0,0,0,0.03)]"
      />
    );
  }

  return theme === 'dark' ? (
    <div className="w-10 h-10 rounded-lg border border-neutral-800 bg-[#0d0d12] flex items-center justify-center shrink-0 font-mono text-xs font-black text-white tracking-tighter uppercase select-none relative shadow-[inset_0_0_8px_rgba(0,0,0,0.3)] bg-gradient-to-br from-[#0d0d12] to-neutral-900/40">
      <span className="relative z-10 text-[9px]">{abbreviation}</span>
      <div className="absolute top-0.5 right-0.5 w-1 h-1 bg-brand-red rounded-full opacity-60" />
    </div>
  ) : (
    <div className="w-10 h-10 rounded-lg border border-brand-border bg-brand-panel flex items-center justify-center shrink-0 font-mono text-xs font-black text-brand-black tracking-tighter uppercase select-none relative shadow-[inset_0_0_8px_rgba(0,0,0,0.03)] bg-gradient-to-br from-brand-panel to-brand-border/20">
      <span className="relative z-10 text-[9px]">{abbreviation}</span>
      <div className="absolute top-0.5 right-0.5 w-1 h-1 bg-brand-red rounded-full opacity-60" />
    </div>
  );
};

export const Timeline: React.FC = () => {
  const { timeline } = portfolioData;
  const { language } = useLanguage();
  const scrollRef = useRef<HTMLDivElement>(null);
  
  const [activeCategory, setActiveCategory] = useState<string>('ventures');
  const [expandedIds, setExpandedIds] = useState<string[]>([]);
  const [scrollProgress, setScrollProgress] = useState<number>(0);
  const [canScrollLeft, setCanScrollLeft] = useState<boolean>(false);
  const [canScrollRight, setCanScrollRight] = useState<boolean>(false);

  const experienceTitle = language === 'en' ? 'MY JOURNEY' : 'PERJALANAN SAYA';
  const completedText = language === 'en' ? 'COMPLETED' : 'SELESAI';
  const ongoingText = language === 'en' ? 'ONGOING' : 'BERJALAN';

  const categories = [
    { id: 'ventures', label: { en: 'VENTURES', id: 'BISNIS & VENTURA' } },
    { id: 'experience', label: { en: 'EXPERIENCE', id: 'PENGALAMAN KERJA' } },
    { id: 'education', label: { en: 'EDUCATION', id: 'PENDIDIKAN' } },
    { id: 'certifications', label: { en: 'CERTIFICATIONS', id: 'SERTIFIKASI' } },
    { id: 'organization', label: { en: 'ORGANIZATIONS', id: 'ORGANISASI' } }
  ];

  const filteredTimeline = timeline.filter(entry => 
    entry.category === activeCategory
  );

  const checkScrollBounds = () => {
    if (scrollRef.current) {
      const target = scrollRef.current;
      setCanScrollLeft(target.scrollLeft > 5);
      setCanScrollRight(target.scrollLeft + target.clientWidth < target.scrollWidth - 5);
    }
  };

  // Reset scroll and progress when active category changes
  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTo({ left: 0, behavior: 'smooth' });
    }
    setScrollProgress(0);
    const timer = setTimeout(checkScrollBounds, 200);
    return () => clearTimeout(timer);
  }, [activeCategory]);

  // Handle bounding updates when timeline contents or active category changes
  useEffect(() => {
    const timer = setTimeout(checkScrollBounds, 250);
    return () => clearTimeout(timer);
  }, [filteredTimeline]);

  useEffect(() => {
    window.addEventListener('resize', checkScrollBounds);
    return () => window.removeEventListener('resize', checkScrollBounds);
  }, []);

  const handleScroll = () => {
    if (scrollRef.current) {
      const target = scrollRef.current;
      const maxScroll = target.scrollWidth - target.clientWidth;
      if (maxScroll > 0) {
        setScrollProgress(target.scrollLeft / maxScroll);
      } else {
        setScrollProgress(0);
      }
      checkScrollBounds();
    }
  };

  const scrollTimeline = (direction: 'left' | 'right') => {
    if (scrollRef.current) {
      const scrollAmount = 312; // Card width (280) + gap (32)
      scrollRef.current.scrollBy({
        left: direction === 'left' ? -scrollAmount : scrollAmount,
        behavior: 'smooth'
      });
    }
  };

  const toggleExpand = (id: string) => {
    setExpandedIds(prev => 
      prev.includes(id) ? prev.filter(i => i !== id) : [...prev, id]
    );
  };

  const containerVariants: Variants = {
    hidden: {},
    visible: {
      transition: {
        staggerChildren: 0.05
      }
    }
  };

  return (
    <Section 
      id="timeline" 
      number="04" 
      title={experienceTitle} 
      subtitle="Life & Career Journey Timeline"
    >
      {/* Category Filter Tabs */}
      <div className="flex flex-wrap gap-1.5 p-1 bg-brand-panel/15 border border-brand-border/40 rounded-2xl select-none w-fit mb-10">
        {categories.map((cat) => {
          const isActive = activeCategory === cat.id;
          const count = timeline.filter(entry => entry.category === cat.id).length;
          
          return (
            <button
              key={cat.id}
              onClick={() => setActiveCategory(cat.id)}
              className={`group relative px-3.5 py-2 rounded-xl transition-all duration-300 cursor-pointer flex items-center gap-2 select-none overflow-hidden hover:scale-[1.02] active:scale-[0.98] border ${
                isActive 
                  ? 'text-brand-bg font-extrabold border-transparent shadow-[0_4px_12px_rgba(5,5,5,0.1)]' 
                  : 'text-brand-black/70 hover:text-brand-red bg-brand-panel/50 border-brand-border/40 hover:border-brand-black/40 hover:bg-brand-panel hover:shadow-sm'
              }`}
            >
              {/* Sliding Active Pill Background */}
              {isActive && (
                <motion.div
                  layoutId="activeCategoryTab"
                  className="absolute inset-0 bg-brand-black z-0 rounded-xl"
                  transition={{ type: 'spring', stiffness: 350, damping: 28 }}
                />
              )}

              {/* Status LED Dot */}
              <span className={`relative z-10 w-1.5 h-1.5 rounded-full transition-all duration-300 ${
                isActive 
                  ? 'bg-brand-red shadow-[0_0_6px_rgba(239,68,68,0.8)] animate-pulse' 
                  : 'bg-brand-red/30 group-hover:bg-brand-red/70'
              }`} />

              {/* Tab Title */}
              <span className="relative z-10 font-mono text-[9px] sm:text-[10px] tracking-widest">
                {cat.label[language]}
              </span>

              {/* Dynamic count badge */}
              <span className={`relative z-10 font-mono text-[8px] font-extrabold px-1.5 py-0.5 rounded transition-all duration-300 ${
                isActive 
                  ? 'text-brand-red bg-brand-bg/15' 
                  : 'text-brand-text-secondary bg-white border border-brand-border/50 group-hover:text-brand-red group-hover:border-brand-red/35'
              }`}>
                {count.toString().padStart(2, '0')}
              </span>
            </button>
          );
        })}
      </div>

      {/* Scrollable Container Wrapper with Floating Paddles */}
      <div className="relative group/carousel w-full px-0 md:px-16">
        {/* Floating Left Paddle */}
        <AnimatePresence>
          {canScrollLeft && (
            <motion.button
              initial={{ opacity: 0, x: -8 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -8 }}
              transition={{ duration: 0.25, ease: "easeOut" }}
              onClick={() => scrollTimeline('left')}
              className="absolute left-0 md:left-2 top-[50%] -translate-y-[50%] z-20 w-12 h-12 rounded-xl border border-brand-border hover:border-brand-black bg-brand-bg/85 text-brand-black flex items-center justify-center transition-all duration-300 hover:scale-105 shadow-[0_4px_12px_rgba(0,0,0,0.06)] hover:shadow-[0_4px_20px_rgba(229,57,53,0.18)] cursor-pointer select-none active:scale-95 backdrop-blur-md hidden md:flex"
              aria-label="Scroll Left"
            >
              <ChevronLeft size={22} className="stroke-[2.5] text-brand-black hover:text-brand-red transition-colors" />
            </motion.button>
          )}
        </AnimatePresence>

        {/* Floating Right Paddle */}
        <AnimatePresence>
          {canScrollRight && (
            <motion.button
              initial={{ opacity: 0, x: 8 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: 8 }}
              transition={{ duration: 0.25, ease: "easeOut" }}
              onClick={() => scrollTimeline('right')}
              className="absolute right-0 md:right-2 top-[50%] -translate-y-[50%] z-20 w-12 h-12 rounded-xl border border-brand-border hover:border-brand-black bg-brand-bg/85 text-brand-black flex items-center justify-center transition-all duration-300 hover:scale-105 shadow-[0_4px_12px_rgba(0,0,0,0.06)] hover:shadow-[0_4px_20px_rgba(229,57,53,0.18)] cursor-pointer select-none active:scale-95 backdrop-blur-md hidden md:flex"
              aria-label="Scroll Right"
            >
              <ChevronRight size={22} className="stroke-[2.5] text-brand-black hover:text-brand-red transition-colors" />
            </motion.button>
          )}
        </AnimatePresence>

        {/* Horizontal timeline container (scroller) */}
        <div 
          ref={scrollRef}
          onScroll={handleScroll}
          className="w-full overflow-x-auto pb-6 scroll-smooth snap-x snap-mandatory scrollbar-none relative"
          style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
        >
        <div className="relative pt-12 pb-4 w-max flex gap-8 px-4">
          
          {/* Main timeline line spanning the full width of the w-max container */}
          <div className="absolute left-0 right-0 top-3 h-[1.5px] bg-brand-border z-0" />

          {/* Timeline Nodes Container */}
          <motion.div
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-50px" }}
            className="flex gap-8 items-start relative z-10"
          >
            <AnimatePresence mode="popLayout">
              {filteredTimeline.map((entry) => {
                const isOngoing = entry.status === 'ACTIVE';
                const isExpanded = expandedIds.includes(entry.id);
                const itemIndex = filteredTimeline.indexOf(entry);
                return (
                  <motion.div 
                    layout
                    key={entry.id} 
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, scale: 0.9, transition: { duration: 0.2 } }}
                    transition={{ 
                      duration: 0.4, 
                      ease: [0.16, 1, 0.3, 1],
                      delay: itemIndex * 0.04
                    }}
                    className="w-[280px] shrink-0 snap-start flex flex-col items-start gap-4 group"
                  >
                    
                    {/* Timeline Dot Anchor */}
                    <div className="relative -mt-[14px] flex items-center pl-2 select-none">
                      <div className={`w-[11px] h-[11px] rounded-full border-2 border-brand-black bg-brand-bg flex items-center justify-center transition-all duration-300 group-hover:scale-125 ${
                        isOngoing ? 'border-brand-red' : ''
                      }`}>
                        {isOngoing ? (
                          <span className="w-1.5 h-1.5 bg-brand-red rounded-full animate-ping" />
                        ) : (
                          <span className="w-1 h-1 bg-brand-black rounded-full group-hover:bg-brand-red transition-colors" />
                        )}
                      </div>
                    </div>

                    {/* Year Tag */}
                    <div className="bg-brand-black text-brand-bg text-[9px] font-mono font-bold px-2.5 py-1 select-none tracking-widest border border-brand-black flex items-center gap-1.5 w-fit rounded-lg shadow-sm group-hover:translate-x-1 transition-transform duration-200 ml-2">
                      <span className={`w-1.5 h-1.5 rounded-full ${isOngoing ? 'bg-brand-red shadow-[0_0_6px_rgba(239,68,68,0.8)] animate-pulse' : 'bg-neutral-500'}`} />
                      {entry.year.toUpperCase()}
                    </div>

                    {/* Card Content details */}
                    {(() => {
                      const isEven = itemIndex % 2 === 0;
                      return (
                        <div className={`w-full border border-brand-border transition-all duration-300 p-5 rounded-2xl relative select-text flex flex-col justify-between min-h-[240px] text-left font-mono shadow-sm overflow-hidden ${
                          isEven 
                            ? 'bg-[#050507] hover:bg-[#09090c] hover:border-brand-black hover:shadow-[0_8px_24px_rgba(0,0,0,0.15)]' 
                            : 'bg-brand-bg hover:border-brand-black hover:shadow-[0_8px_24px_rgba(0,0,0,0.05)]'
                        }`}>
                          {/* Glowing left edge highlight laser on hover */}
                          <div className="absolute left-0 top-0 h-full w-[3px] bg-brand-red scale-y-0 group-hover:scale-y-100 origin-top transition-transform duration-300 ease-out shadow-[0_0_8px_rgba(229,57,53,0.8)]" />

                          <TechCorner position="top-left" size={5} className={isEven ? "border-neutral-800 group-hover:border-brand-red transition-colors duration-300" : "border-brand-border group-hover:border-brand-black transition-colors duration-300"} />
                          <TechCorner position="bottom-right" size={5} className={isEven ? "border-neutral-800 group-hover:border-brand-red transition-colors duration-300" : "border-brand-border group-hover:border-brand-black transition-colors duration-300"} />
                          
                          <div className="relative z-10">
                            {/* Role & Company Header with Logo */}
                            <div className="flex items-start justify-between gap-3 mb-3">
                              <div className="flex-1 min-w-0">
                                {/* Role Title */}
                                <h5 className={`text-sm font-black uppercase tracking-tight mb-1 group-hover:text-brand-red transition-colors duration-200 line-clamp-2 ${
                                  isEven ? 'text-white' : 'text-brand-black'
                                }`}>
                                  {entry.role[language]}
                                </h5>
                                
                                {/* Company Name */}
                                <span className={`text-[10px] uppercase block font-bold truncate ${
                                  isEven ? 'text-neutral-400' : 'text-brand-text-secondary'
                                }`}>
                                  {entry.company}
                                </span>
                              </div>
                              <CompanyLogo logoUrl={entry.logo} companyName={entry.company} theme={isEven ? 'dark' : 'light'} />
                            </div>

                            {/* Short Description */}
                            <p className={`text-xs leading-relaxed font-sans mb-4 transition-colors duration-200 ${
                              isEven 
                                ? 'text-neutral-400 group-hover:text-neutral-200' 
                                : 'text-brand-text-secondary group-hover:text-brand-black'
                            }`}>
                              {entry.description[language]}
                            </p>
                          </div>

                          {/* Expandable details segment */}
                          {entry.details && (entry.details.en || entry.details.id) && (
                            <div className="w-full mb-4 relative z-10">
                              <button
                                onClick={() => toggleExpand(entry.id)}
                                className={`w-full text-left font-mono text-[10px] tracking-wider text-brand-red flex items-center justify-between py-1.5 px-3 border border-brand-red/30 rounded-lg transition-all duration-300 cursor-pointer bg-brand-red/5 hover:bg-brand-red/10 ${
                                  isEven 
                                    ? 'hover:text-white hover:border-white' 
                                    : 'hover:text-brand-black hover:border-brand-black'
                                }`}
                              >
                                <span>
                                  {isExpanded 
                                    ? (language === 'en' ? 'CLOSE DETAILS' : 'TUTUP DETAIL') 
                                    : (language === 'en' ? 'VIEW DETAILS' : 'LIHAT DETAIL')}
                                </span>
                                <motion.span
                                  animate={{ rotate: isExpanded ? 180 : 0 }}
                                  transition={{ duration: 0.2 }}
                                  className="text-[10px]"
                                >
                                  ▼
                                </motion.span>
                              </button>

                              <motion.div 
                                initial={false}
                                animate={{ height: isExpanded ? 'auto' : 0, opacity: isExpanded ? 1 : 0 }}
                                transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
                                className="overflow-hidden"
                              >
                                <div className={`mt-4 pt-4 border-t text-[11px] font-sans leading-relaxed whitespace-pre-line select-text ${
                                  isEven 
                                    ? 'border-neutral-900 text-neutral-400' 
                                    : 'border-brand-border/60 text-brand-text-secondary'
                                }`}>
                                  {entry.details[language]}
                                </div>
                              </motion.div>
                            </div>
                          )}

                          {/* Status badge stamp */}
                          <div className="relative z-10">
                            <span className={`inline-flex items-center gap-1 text-[9px] font-bold px-2.5 py-1 border rounded-lg ${
                              isOngoing 
                                ? 'border-brand-red/30 bg-brand-red/5 text-brand-red font-black' 
                                : isEven
                                  ? 'border-neutral-800 bg-[#0d0d12] text-neutral-400'
                                  : 'border-brand-border bg-brand-panel text-brand-text-secondary'
                            }`}>
                              {isOngoing ? (
                                <>
                                  <span className="w-1.5 h-1 bg-brand-red rounded-full animate-pulse" />
                                  {ongoingText}
                                </>
                              ) : (
                                <>
                                  <span className={`w-1.5 h-1.5 rounded-full ${isEven ? 'bg-neutral-500' : 'bg-brand-text-secondary'}`} />
                                  {completedText}
                                </>
                              )}
                            </span>
                          </div>
                        </div>
                      );
                    })()}

                  </motion.div>
                );
              })}
            </AnimatePresence>
          </motion.div>
        </div>
      </div>
    </div>

      {/* Scroll Navigation Helper & Progress Indicator */}
      <div className="w-full max-w-xl mx-auto mt-8 px-4 select-none font-mono">
        <div className="bg-brand-panel/30 border border-brand-border/60 p-3 rounded-2xl flex items-center justify-between gap-4 text-[10px] text-brand-text-secondary relative shadow-sm">
          <TechCorner position="top-left" size={4} className="border-brand-border/60" />
          <TechCorner position="bottom-right" size={4} className="border-brand-border/60" />
          
          {/* Scroll Left Button */}
          <button
            onClick={() => scrollTimeline('left')}
            disabled={!canScrollLeft}
            className={`w-8 h-8 border rounded-xl flex items-center justify-center transition-all duration-300 cursor-pointer select-none ${
              canScrollLeft
                ? 'bg-brand-black text-brand-bg border border-brand-black hover:bg-brand-red hover:border-brand-red hover:scale-105 active:scale-95 shadow-md'
                : 'opacity-15 cursor-not-allowed border-brand-border/30 text-brand-text-secondary bg-brand-panel/20'
            }`}
            aria-label="Scroll Left"
          >
            <ChevronLeft size={16} className="stroke-[2.5]" />
          </button>

          {/* System Instructions & Progress Text */}
          <div className="flex-1 flex flex-col sm:flex-row sm:items-center justify-between gap-2 text-center sm:text-left">
            <div className="flex items-center gap-2 justify-center sm:justify-start">
              <span className="relative flex h-2 w-2 shrink-0">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-brand-red opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-brand-red"></span>
              </span>
              <span className="tracking-tight uppercase text-[9px] sm:text-[10px] leading-snug text-brand-black font-extrabold">
                {language === 'en' 
                  ? 'DRAG CAROUSEL OR CLICK CHEVRONS TO EXPLORE' 
                  : 'SERET CAROUSEL ATAU KLIK TOMBOL UNTUK MENJELAJAHI'}
              </span>
            </div>
            
            <div className="flex items-center gap-2 justify-center sm:justify-end shrink-0">
              <span className="font-bold text-brand-black uppercase text-[9px] sm:text-[10px]">
                {language === 'en' ? 'PROGRESS:' : 'PROGRES:'}
              </span>
              <span className="text-brand-red font-black text-xs min-w-[36px] text-right">
                {Math.round(scrollProgress * 100)}%
              </span>
            </div>
          </div>

          {/* Scroll Right Button */}
          <button
            onClick={() => scrollTimeline('right')}
            disabled={!canScrollRight}
            className={`w-8 h-8 border rounded-xl flex items-center justify-center transition-all duration-300 cursor-pointer select-none ${
              canScrollRight
                ? 'bg-brand-black text-brand-bg border border-brand-black hover:bg-brand-red hover:border-brand-red hover:scale-105 active:scale-95 shadow-md'
                : 'opacity-15 cursor-not-allowed border-brand-border/30 text-brand-text-secondary bg-brand-panel/20'
            }`}
            aria-label="Scroll Right"
          >
            <ChevronRight size={16} className="stroke-[2.5]" />
          </button>
        </div>

        {/* Outer track - Ruler Gauge style */}
        <div className="w-full h-[6px] bg-brand-border/30 rounded-full mt-3 overflow-hidden relative flex items-center">
          {/* Repeating vertical ruler ticks */}
          <div className="absolute inset-0 flex justify-between px-1 pointer-events-none opacity-20">
            {Array.from({ length: 30 }).map((_, i) => (
              <div key={i} className="h-full w-[1px] bg-brand-black" />
            ))}
          </div>
          {/* Glowing bar */}
          <motion.div 
            className="h-full bg-brand-red shadow-[0_0_10px_rgba(239,68,68,0.7)] relative z-10" 
            style={{ width: `${scrollProgress * 100}%` }}
          />
        </div>
      </div>
    </Section>
  );
};
