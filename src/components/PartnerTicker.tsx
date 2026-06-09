import React from 'react';
import { useLanguage } from '../context/LanguageContext';

interface PartnerTickerProps {
  theme?: 'light' | 'dark';
}

export const PartnerTicker: React.FC<PartnerTickerProps> = ({ theme = 'light' }) => {
  const { language } = useLanguage();
  const isDark = theme === 'dark';
  const partners = [
    { name: 'ASUS', logo: '/assets/logos/asus.png' },
    { name: 'PHILIPS', logo: '/assets/logos/philips.png' },
    { name: 'BIBIT', logo: '/assets/logos/bibit.png' },
    { name: 'BARDI', logo: '/assets/logos/bardi.png' },
    { name: 'SHOPEE', logo: '/assets/logos/shopee.png' },
    { name: 'TIKTOK', logo: '/assets/logos/tiktok.png' },
    { name: 'GOOGLE', logo: '/assets/logos/google.png' },
    { name: 'PT WASKITA KARYA', logo: '/assets/logos/waskita.png' },
    { name: 'PT WIJAYA KARYA', logo: '/assets/logos/wika.png' },
    { name: 'AIRMAS ASRI', logo: '/assets/logos/airmas.png' },
    { name: 'DIPONEGORO UNIVERSITY', logo: '/assets/logos/undip.png' },
    { name: 'PRASETIYA MULYA', logo: '/assets/logos/prasetiyamulya.png' },
  ];

  const labelText = language === 'en' 
    ? 'DI PERCAYA & BERMITRA DENGAN // TRUSTED & COLLABORATED WITH'
    : 'DI PERCAYA & BERMITRA DENGAN // TRUSTED & COLLABORATED WITH';

  return (
    <div className={`w-full border-t border-b ${isDark ? 'border-neutral-900 bg-[#050507]' : 'border-brand-border/60 bg-brand-panel/10'} py-5 select-none overflow-hidden relative`}>
      {/* Label and Live Status indicator */}
      <div className={`max-w-screen-2xl mx-auto px-4 md:px-16 mb-4 flex flex-col sm:flex-row sm:items-center justify-between gap-3`}>
        <div className="flex items-center gap-2.5">
          <span className={`w-1.5 h-3 bg-brand-red ${isDark ? 'shadow-[0_0_8px_rgba(229,57,53,0.8)]' : ''}`} />
          <span className={`font-mono text-xs md:text-sm font-bold tracking-widest uppercase ${isDark ? 'text-white' : 'text-brand-black'}`}>
            {labelText.split(' // ').map((part, idx) => (
              <React.Fragment key={idx}>
                {idx > 0 && <span className="text-brand-red font-black mx-2">//</span>}
                {part}
              </React.Fragment>
            ))}
          </span>
        </div>
        <span className="flex items-center gap-1.5 animate-pulse text-brand-red font-mono text-[10px] md:text-xs font-black tracking-widest shrink-0 self-start sm:self-auto">
          <span className="w-1.5 h-1.5 bg-brand-red rounded-full shadow-[0_0_6px_rgba(239,68,68,0.8)]" />
          LIVE TRANSMISSION
        </span>
      </div>

      {/* Marquee Scroller container */}
      <div className="flex w-full overflow-hidden relative py-1">
        <div className="flex gap-16 whitespace-nowrap animate-marquee">
          {/* Double list for seamless layout loops */}
          {[...partners, ...partners].map((partner, idx) => (
            <div 
              key={idx} 
              className="flex items-center justify-center h-8 px-2 shrink-0 transition-all duration-300"
            >
              {partner.logo && (
                <img 
                  src={partner.logo} 
                  alt={`${partner.name} Logo`} 
                  className={`h-6 max-w-[120px] object-contain transition-all duration-300 cursor-default ${
                    isDark 
                      ? 'brightness-0 invert opacity-45 hover:opacity-100' 
                      : 'grayscale opacity-45 hover:grayscale-0 hover:opacity-100'
                  }`}
                  onError={(e) => {
                    // Hide the broken image icon
                    e.currentTarget.style.display = 'none';
                    // Show the fallback text next to it
                    const fallbackEl = e.currentTarget.nextSibling as HTMLElement;
                    if (fallbackEl) {
                      fallbackEl.style.display = 'block';
                    }
                  }}
                />
              )}
              <span 
                className={`font-mono text-sm font-black tracking-widest transition-all duration-300 cursor-default ${
                  isDark 
                    ? 'text-white opacity-45 hover:opacity-100' 
                    : 'text-brand-black grayscale opacity-45 hover:grayscale-0 hover:opacity-100'
                }`}
                style={{ display: partner.logo ? 'none' : 'block' }}
              >
                {partner.name}
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
