import React, { useEffect, useRef, useState } from 'react';
import { motion, useInView, useReducedMotion } from 'framer-motion';
import { Section } from '../components/Section';
import { portfolioData } from '../config/portfolio';
import { TechCorner } from '../components/TechCorner';
import { useLanguage } from '../context/LanguageContext';

// Parse a stat string like "140K+" into a numeric target and trailing suffix ("K+")
const parseStat = (value: string): { target: number; suffix: string } => {
  const match = value.match(/^([\d.]+)(.*)$/);
  if (!match) return { target: 0, suffix: value };
  return { target: parseFloat(match[1]), suffix: match[2] };
};

// Animated count-up that runs once when scrolled into view. Honors reduced-motion.
const CountUpValue: React.FC<{ value: string }> = ({ value }) => {
  const { target, suffix } = parseStat(value);
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true, margin: '-40px' });
  const reduce = useReducedMotion();
  const [display, setDisplay] = useState(0);

  useEffect(() => {
    if (!inView) return;
    if (reduce) {
      setDisplay(target);
      return;
    }
    let raf = 0;
    const start = performance.now();
    const duration = 1100;
    const tick = (now: number) => {
      const progress = Math.min((now - start) / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3); // easeOutCubic
      setDisplay(target * eased);
      if (progress < 1) {
        raf = requestAnimationFrame(tick);
      } else {
        setDisplay(target);
      }
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [inView, reduce, target]);

  const rendered = Number.isInteger(target) ? Math.round(display) : display.toFixed(1);
  return (
    <span ref={ref} className="tabular-nums">
      {rendered}{suffix}
    </span>
  );
};

// Live Jakarta (WIB / GMT+7) clock — a small interactive "system" detail in the dossier.
const JakartaClock: React.FC<{ label: string }> = ({ label }) => {
  const [time, setTime] = useState('--:--:--');

  useEffect(() => {
    const formatter = new Intl.DateTimeFormat('en-GB', {
      timeZone: 'Asia/Jakarta',
      hour: '2-digit',
      minute: '2-digit',
      second: '2-digit',
      hour12: false
    });
    const update = () => setTime(formatter.format(new Date()));
    update();
    const id = setInterval(update, 1000);
    return () => clearInterval(id);
  }, []);

  return (
    <div className="flex justify-between items-center py-2">
      <span className="text-neutral-400 uppercase">{label}</span>
      <span className="font-bold text-brand-red uppercase flex items-center gap-1.5 tabular-nums">
        <span className="w-1.5 h-1.5 bg-brand-red rounded-full animate-pulse" />
        {time}<span className="text-neutral-500 ml-0.5">WIB</span>
      </span>
    </div>
  );
};

export const About: React.FC = () => {
  const { personal, stats } = portfolioData;
  const { language } = useLanguage();

  const whoAmIText = language === 'en' ? 'WHO AM I?' : 'SIAPA SAYA?';
  const aboutMeTitle = language === 'en' ? 'ABOUT ME' : 'TENTANG SAYA';

  const locationLabel = language === 'en' ? 'LOCATION' : 'LOKASI';
  const timeLabel = language === 'en' ? 'LOCAL TIME' : 'WAKTU LOKAL';
  const languageLabel = language === 'en' ? 'LANGUAGE' : 'BAHASA';
  const freelanceLabel = language === 'en' ? 'FREELANCE' : 'PEKERJA LEPAS';
  const signalLabel = language === 'en' ? 'KEY SIGNALS' : 'SINYAL UTAMA';

  const signalChips = language === 'en'
    ? ["Google for Startups '25", '140K+ Audience', 'BUMN · Enterprise', 'MM New Ventures']
    : ["Google for Startups '25", '140K+ Pengikut', 'BUMN · Enterprise', 'Magister Manajemen'];

  // Custom QR Code grid generator for decoration
  const renderQRCodeDecoration = () => {
    const qrMatrix = [
      [1, 1, 1, 0, 1, 1, 1],
      [1, 0, 1, 1, 0, 0, 1],
      [1, 1, 1, 0, 1, 1, 1],
      [0, 0, 0, 1, 0, 1, 0],
      [1, 0, 1, 0, 1, 0, 1],
      [0, 1, 0, 1, 0, 1, 1],
      [1, 1, 1, 0, 1, 0, 1]
    ];
    return (
      <div className="grid grid-cols-7 gap-0.5 w-8 h-8 shrink-0">
        {qrMatrix.map((row, rIdx) =>
          row.map((val, cIdx) => (
            <div
              key={`${rIdx}-${cIdx}`}
              className={`w-1 h-1 ${val === 1 ? 'bg-white' : 'bg-transparent'}`}
            />
          ))
        )}
      </div>
    );
  };

  return (
    <Section
      id="about"
      number="01"
      title={aboutMeTitle}
      subtitle="Identity Dossier // Profile Specification"
      theme="dark"
    >
      <div className="grid grid-cols-1 xl:grid-cols-12 gap-8 items-stretch">

        {/* Left Profile Card Column */}
        <div className="xl:col-span-4 flex justify-center items-start">
          <motion.div
            whileHover={{ y: -4 }}
            transition={{ type: 'spring', stiffness: 300, damping: 22 }}
            className="w-full max-w-[320px] border border-neutral-800 bg-[#0d0d12] flex flex-col relative select-none shadow-[0_4px_24px_rgba(0,0,0,0.5)] group/card"
          >

            {/* Box Header - ENTREPRENEUR, AI ENTHUSIAST & DEVELOPER */}
            <div className="bg-neutral-900 text-neutral-300 font-mono text-xs font-bold px-3 py-1.5 flex justify-between items-center w-full border-b border-neutral-800">
              <span>// ENTREPRENEUR, AI ENTHUSIAST &amp; DEVELOPER</span>
              <div className="flex gap-1">
                <span className="w-1.5 h-1.5 rounded-full bg-neutral-700 group-hover/card:bg-brand-red transition-colors" />
                <span className="w-1.5 h-1.5 rounded-full bg-neutral-700" />
              </div>
            </div>

            {/* Profile Avatar Crop Box */}
            <div className="relative border-b border-neutral-800 aspect-square overflow-hidden bg-neutral-950 flex items-center justify-center">
              <video
                src="/assets/vid-mascot-AI Developer.mp4"
                autoPlay
                loop
                muted
                playsInline
                aria-hidden="true"
                className="object-cover object-top h-full w-full scale-[1.3] translate-y-[10%] filter drop-shadow-[0_10px_10px_rgba(0,0,0,0.15)]"
              />

              {/* Scanline sweep on hover */}
              <div className="absolute inset-0 pointer-events-none overflow-hidden opacity-0 group-hover/card:opacity-100 transition-opacity">
                <div className="absolute left-0 w-full h-px bg-brand-red/60 shadow-[0_0_10px_rgba(229,57,53,0.7)] animate-scan" />
              </div>

              {/* Version flag */}
              <div className="absolute bottom-2.5 left-2.5 bg-brand-red text-brand-bg font-mono text-[10px] font-black px-1.5 py-0.5 tracking-wider">
                VER: 2.6
              </div>
            </div>

            {/* Card Footer details */}
            <div className="p-4 flex items-center justify-between font-mono text-neutral-200">
              <div className="flex flex-col gap-1 pr-2">
                <span className="text-xs font-black text-white uppercase tracking-tight leading-snug">
                  BUSINESS STRATEGY • PRODUCT DEVELOPMENT • AGENTIC AI ECOSYSTEM
                </span>
              </div>

              {/* Mini QR code logo */}
              {renderQRCodeDecoration()}
            </div>
          </motion.div>
        </div>

        {/* Right Dossier Specifications Column */}
        <div className="xl:col-span-8 flex flex-col justify-between gap-8 text-left">

          {/* Header & Bio */}
          <div>
            <div className="flex items-center gap-3 mb-4 select-none">
              <h3 className="text-3xl sm:text-5xl font-black uppercase tracking-tight text-white">
                {whoAmIText}
              </h3>
            </div>

            <p className="text-base text-neutral-300 leading-relaxed font-sans max-w-3xl">
              {personal.tagline[language]}
            </p>

            {/* Key Signals — interactive scannable chips */}
            <div className="mt-6">
              <span className="font-mono text-[10px] text-neutral-500 font-bold tracking-widest uppercase mb-2.5 flex items-center gap-1.5 select-none">
                <span className="w-1.5 h-1.5 bg-brand-red rounded-full animate-pulse" />
                // {signalLabel}
              </span>
              <div className="flex flex-wrap gap-2">
                {signalChips.map((chip, i) => (
                  <motion.span
                    key={chip}
                    initial={{ opacity: 0, y: 8 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: i * 0.06, duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
                    whileHover={{ y: -2 }}
                    className="font-mono text-[10px] uppercase tracking-wide px-2.5 py-1 border border-neutral-800 bg-[#0d0d12] text-neutral-300 hover:border-brand-red hover:text-white rounded-lg cursor-default transition-colors select-none"
                  >
                    {chip}
                  </motion.span>
                ))}
              </div>
            </div>
          </div>

          {/* Lower Panel: Specs grid + location details */}
          <div className="grid grid-cols-1 lg:grid-cols-12 border border-neutral-800 bg-[#0d0d12] overflow-hidden relative shadow-[0_4px_24px_rgba(0,0,0,0.3)]">
            <TechCorner position="top-left" size={6} />
            <TechCorner position="bottom-right" size={6} />

            {/* Metrics column (4 elements) */}
            <div className="lg:col-span-9 grid grid-cols-2 sm:grid-cols-4 border-b lg:border-b-0 lg:border-r border-neutral-800 divide-x divide-y divide-neutral-800 divide-solid">
              {stats.map((stat, idx) => (
                <motion.div
                  key={stat.label}
                  whileHover={{ y: -2 }}
                  transition={{ type: 'spring', stiffness: 350, damping: 25 }}
                  className="group/stat relative p-4 md:p-5 flex flex-col justify-between font-mono bg-[#0d0d12] hover:bg-[#101018] transition-colors overflow-hidden"
                  style={{ borderLeft: idx % 2 === 0 ? 'none' : undefined, borderTop: idx < 2 && idx >= 0 ? 'none' : undefined }}
                >
                  {/* Hover accent laser */}
                  <span className="absolute left-0 top-0 h-full w-[2px] bg-brand-red scale-y-0 group-hover/stat:scale-y-100 origin-top transition-transform duration-300 ease-out shadow-[0_0_8px_rgba(229,57,53,0.8)]" />

                  {/* Metric indicator */}
                  <span className="text-xs text-neutral-400 mb-3 flex items-center gap-1.5 select-none">
                    <span className="w-1.5 h-1.5 bg-white group-hover/stat:bg-brand-red transition-colors shrink-0" />
                    {stat.label}
                  </span>

                  <div className="flex flex-col select-none">
                    <span className="text-2xl md:text-3xl font-black text-white leading-none group-hover/stat:text-brand-red transition-colors">
                      <CountUpValue value={stat.value} />
                    </span>
                    <span className="text-[10px] text-neutral-400 tracking-wider mt-1 uppercase">
                      {stat.description[language]}
                    </span>
                  </div>
                </motion.div>
              ))}
            </div>

            {/* Sidebar Details (Location, live clock, language, freelance status) */}
            <div className="lg:col-span-3 p-4 md:p-5 font-mono text-xs divide-y divide-neutral-800/60 select-none flex flex-col justify-center">
              {/* Location */}
              <div className="flex justify-between items-center py-2">
                <span className="text-neutral-400 uppercase">{locationLabel}</span>
                <span className="font-bold text-white uppercase">{personal.location}</span>
              </div>
              {/* Live Local Time (Jakarta / WIB) */}
              <JakartaClock label={timeLabel} />
              {/* Language */}
              <div className="flex justify-between items-center py-2">
                <span className="text-neutral-400 uppercase">{languageLabel}</span>
                <span className="font-bold text-white uppercase">{personal.language}</span>
              </div>
              {/* Freelance */}
              <div className="flex justify-between items-center py-2">
                <span className="text-neutral-400 uppercase">{freelanceLabel}</span>
                <span className="font-bold text-brand-red uppercase">{personal.availability[language]}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Section>
  );
};
