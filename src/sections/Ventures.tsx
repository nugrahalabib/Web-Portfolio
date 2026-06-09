import React from 'react';
import { Section } from '../components/Section';
import { TechCorner } from '../components/TechCorner';
import { useLanguage } from '../context/LanguageContext';
import { ArrowUpRight, Bot, Cpu, Landmark, Sparkles } from 'lucide-react';

export const Ventures: React.FC = () => {
  const { language } = useLanguage();

  const title = language === 'en' ? 'ACTIVE VENTURES' : 'BISNIS AKTIF';
  const subtitle = language === 'en' 
    ? 'Operational Command // Live Venture Nodes' 
    : 'Kendali Operasional // Simpul Ventura Aktif';

  const venturesList = [
    {
      id: 'spead',
      title: 'SPEAD AI',
      subtitle: {
        en: 'Modular AI Ecosystem for the Expertise Economy',
        id: 'Ekosistem AI Modular untuk Ekonomi Keahlian'
      },
      description: {
        en: 'Architecting contextual RAG engines to transform human expertise into secure, scalable digital assets. Selected for Google for Startups Cloud Program 2025.',
        id: 'Merancang engine RAG kontekstual untuk mengubah keahlian manusia menjadi aset digital yang aman dan skalabel. Terpilih dalam Google for Startups Cloud Program 2025.'
      },
      tag: 'ENTERPRISE AI',
      icon: Cpu,
      status: 'ACTIVE [ONLINE]',
      metric: 'Google Startups 2025',
      url: 'https://speadai.com',
      color: 'border-brand-red/40 hover:border-brand-red hover:shadow-[0_0_15px_rgba(229,57,53,0.12)]'
    },
    {
      id: 'agentbuff',
      title: 'AGENT BUFF',
      subtitle: {
        en: 'Autonomous Digital Workforce Platform',
        id: 'Platform Tenaga Kerja Digital Otonom'
      },
      description: {
        en: 'Autonomous digital workforce and AI services suite featuring Shila (Personal Assistant), Money Manager, and custom support agents.',
        id: 'Tenaga kerja digital otonom & rangkaian layanan AI yang menghadirkan Shila (Asisten Pribadi), Money Manager, dan agen pendukung kustom.'
      },
      tag: 'AGENTIC MARKETPLACE',
      icon: Bot,
      status: 'ACTIVE [ONLINE]',
      metric: 'Digital Workforce',
      url: 'https://agentbuff.com',
      color: 'border-brand-black/40 hover:border-brand-black hover:shadow-[0_0_15px_rgba(5,5,5,0.06)]'
    },
    {
      id: 'jokihidup',
      title: 'JOKI HIDUP',
      subtitle: {
        en: 'Intellectual Delegation Platform',
        id: 'Platform Delegasi Intelektual'
      },
      description: {
        en: 'Premium intellectual assistance platform linking Cumlaude/Master academic professionals with executives and students for high-quality research.',
        id: 'Platform bantuan intelektual premium yang menghubungkan akademisi Cumlaude/Master dengan eksekutif & pelajar untuk riset berkualitas tinggi.'
      },
      tag: 'DELEGATION SERVICES',
      icon: Sparkles,
      status: 'ACTIVE [ONLINE]',
      metric: 'Master Network',
      url: '#',
      color: 'border-brand-black/40 hover:border-brand-black hover:shadow-[0_0_15px_rgba(5,5,5,0.06)]'
    },
    {
      id: 'labin',
      title: 'LAB.IN STUDIO',
      subtitle: {
        en: '3D Architectural Visualization Studio',
        id: 'Studio Visualisasi Arsitektur 3D'
      },
      description: {
        en: 'Providing end-to-end architectural design, photorealistic 3D visualizations, rendering, and branding assets for over 30 corporate and private clients.',
        id: 'Menyediakan desain arsitektur end-to-end, visualisasi 3D fotorealistik, render, dan aset branding untuk 30+ klien korporat & pribadi.'
      },
      tag: 'SPATIAL & 3D DESIGN',
      icon: Landmark,
      status: 'ACTIVE [ONLINE]',
      metric: '30+ Clients',
      url: '#',
      color: 'border-brand-black/40 hover:border-brand-black hover:shadow-[0_0_15px_rgba(5,5,5,0.06)]'
    }
  ];

  return (
    <Section id="ventures" number="06" title={title} subtitle={subtitle}>
      {/* Section Header tab */}
      <div className="flex justify-between items-center select-none font-mono text-xs border-b border-brand-border/60 pb-3 mb-10">
        <div className="bg-brand-black text-brand-bg text-xs font-bold px-3 py-1 flex items-center skew-x-[-10deg]">
          <span className="skew-x-[10deg]">// 06. {title.toUpperCase()}</span>
        </div>
      </div>

      {/* Grid of ventures */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {venturesList.map((venture) => {
          const Icon = venture.icon;
          return (
            <div
              key={venture.id}
              className={`group flex flex-col justify-between border bg-brand-bg p-6 md:p-8 rounded-3xl transition-all duration-500 relative min-h-[300px] ${venture.color}`}
            >
              {/* Tech corners */}
              <TechCorner position="top-left" size={6} />
              <TechCorner position="bottom-right" size={6} />

              {/* Upper Section */}
              <div>
                <div className="flex items-center justify-between mb-4">
                  {/* Status Indicator */}
                  <div className="flex items-center gap-2 select-none font-mono text-[9px] font-bold border border-brand-border/60 bg-brand-panel px-2.5 py-1 rounded-lg">
                    <span className="relative flex h-1.5 w-1.5">
                      <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-brand-red opacity-75"></span>
                      <span className="relative inline-flex rounded-full h-1.5 w-1.5 bg-brand-red"></span>
                    </span>
                    <span className="text-brand-black">{venture.status}</span>
                  </div>

                  {/* Icon */}
                  <div className="w-8 h-8 rounded-xl border border-brand-border/60 bg-brand-panel flex items-center justify-center text-brand-black group-hover:text-brand-red group-hover:border-brand-black/60 transition-colors duration-300">
                    <Icon size={16} className="stroke-[2.5]" />
                  </div>
                </div>

                {/* Tag & Title */}
                <span className="font-mono text-[9px] text-brand-text-secondary tracking-widest uppercase block mb-1 font-bold">
                  {venture.tag}
                </span>
                
                <h4 className="text-xl font-black text-brand-black uppercase tracking-tight mb-2 group-hover:text-brand-red transition-colors duration-300">
                  {venture.title}
                </h4>

                <h5 className="font-mono text-xs text-brand-black font-semibold uppercase mb-4 leading-snug">
                  {venture.subtitle[language]}
                </h5>

                <p className="text-xs text-brand-text-secondary leading-relaxed font-sans group-hover:text-brand-black transition-colors duration-300">
                  {venture.description[language]}
                </p>
              </div>

              {/* Lower Section (Link) */}
              <div className="mt-8 pt-4 border-t border-brand-border/40 flex items-center justify-between">
                {/* Metric */}
                <span className="font-mono text-[9px] text-brand-text-secondary border border-brand-border bg-brand-panel px-2 py-0.5 rounded font-black">
                  {venture.metric}
                </span>

                {/* Visit link */}
                <a
                  href={venture.url}
                  target={venture.url !== '#' ? '_blank' : undefined}
                  rel={venture.url !== '#' ? 'noopener noreferrer' : undefined}
                  className="font-mono text-[10px] font-bold text-brand-black hover:text-brand-red flex items-center gap-1.5 uppercase select-none group-hover:translate-x-1 transition-transform cursor-pointer"
                >
                  <span>{language === 'en' ? 'LAUNCH PORTAL' : 'KUNJUNGI PORTAL'}</span>
                  <span className="inline-block w-4 h-[1px] bg-brand-red" />
                  <ArrowUpRight size={10} className="stroke-[2.5] text-brand-red" />
                </a>
              </div>
            </div>
          );
        })}
      </div>
    </Section>
  );
};
