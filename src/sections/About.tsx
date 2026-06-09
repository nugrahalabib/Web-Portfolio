import React from 'react';
import { Section } from '../components/Section';
import { portfolioData } from '../config/portfolio';
import { TechCorner } from '../components/TechCorner';
import { useLanguage } from '../context/LanguageContext';


export const About: React.FC = () => {
  const { personal, stats } = portfolioData;
  const { language } = useLanguage();

  const whoAmIText = language === 'en' ? 'WHO AM I?' : 'SIAPA SAYA?';
  const aboutMeTitle = language === 'en' ? 'ABOUT ME' : 'TENTANG SAYA';
  
  const locationLabel = language === 'en' ? 'LOCATION' : 'LOKASI';
  const timezoneLabel = language === 'en' ? 'TIMEZONE' : 'ZONA WAKTU';
  const languageLabel = language === 'en' ? 'LANGUAGE' : 'BAHASA';
  const freelanceLabel = language === 'en' ? 'FREELANCE' : 'PEKERJA LEPAS';

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
          <div className="w-full max-w-[320px] border border-neutral-800 bg-[#0d0d12] flex flex-col relative select-none shadow-[0_4px_24px_rgba(0,0,0,0.5)]">
            
            {/* Box Header - ENTREPRENEUR, AI ENTHUSIAST & DEVELOPER */}
            <div className="bg-neutral-900 text-neutral-300 font-mono text-xs font-bold px-3 py-1.5 flex justify-between items-center w-full border-b border-neutral-800">
              <span>// ENTREPRENEUR, AI ENTHUSIAST & DEVELOPER</span>
              <div className="flex gap-1">
                <span className="w-1.5 h-1.5 rounded-full bg-neutral-700" />
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
                className="object-cover object-top h-full w-full scale-[1.3] translate-y-[10%] filter drop-shadow-[0_10px_10px_rgba(0,0,0,0.15)]"
              />

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
          </div>
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
          </div>

          {/* Lower Panel: Specs grid + location details */}
          <div className="grid grid-cols-1 lg:grid-cols-12 border border-neutral-800 bg-[#0d0d12] overflow-hidden relative shadow-[0_4px_24px_rgba(0,0,0,0.3)]">
            <TechCorner position="top-left" size={6} />
            <TechCorner position="bottom-right" size={6} />

            {/* Metrics column (4 elements) */}
            <div className="lg:col-span-9 grid grid-cols-2 sm:grid-cols-4 border-b lg:border-b-0 lg:border-r border-neutral-800 divide-x divide-y divide-neutral-800 divide-solid">
              {stats.map((stat, idx) => (
                <div 
                  key={stat.label}
                  className={`p-4 md:p-5 flex flex-col justify-between font-mono bg-[#0d0d12] ${
                    idx < 2 ? 'border-t-0' : ''
                  } ${
                    idx % 2 === 0 ? 'border-l-0' : ''
                  }`}
                  style={{ borderLeft: idx % 2 === 0 ? 'none' : undefined, borderTop: idx < 2 && idx >= 0 ? 'none' : undefined }}
                >
                  {/* Metric indicator */}
                  <span className="text-xs text-neutral-400 mb-3 flex items-center gap-1.5 select-none">
                    <span className="w-1.5 h-1.5 bg-white shrink-0" />
                    {stat.label}
                  </span>

                  <div className="flex flex-col select-none">
                    <span className="text-2xl md:text-3xl font-black text-white leading-none">
                      {stat.value}
                    </span>
                    <span className="text-[10px] text-neutral-400 tracking-wider mt-1 uppercase">
                      {stat.description[language]}
                    </span>
                  </div>
                </div>
              ))}
            </div>

            {/* Sidebar Details (Location, freelance status, etc.) */}
            <div className="lg:col-span-3 p-4 md:p-5 font-mono text-xs divide-y divide-neutral-800/60 select-none flex flex-col justify-center">
              {/* Location */}
              <div className="flex justify-between items-center py-2">
                <span className="text-neutral-400 uppercase">{locationLabel}</span>
                <span className="font-bold text-white uppercase">{personal.location}</span>
              </div>
              {/* Timezone */}
              <div className="flex justify-between items-center py-2">
                <span className="text-neutral-400 uppercase">{timezoneLabel}</span>
                <span className="font-bold text-white uppercase">{personal.timezone}</span>
              </div>
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
