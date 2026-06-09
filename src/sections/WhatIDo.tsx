import React from 'react';
import { motion } from 'framer-motion';
import type { Variants } from 'framer-motion';
import { Section } from '../components/Section';
import { TechCorner } from '../components/TechCorner';
import { useLanguage } from '../context/LanguageContext';
import { 
  Terminal, 
  Bot, 
  Smartphone, 
  Utensils, 
  Building, 
  Palette, 
  ArrowUpRight 
} from 'lucide-react';

interface WhatIDoItem {
  icon: React.ReactNode;
  title: { en: string; id: string };
  subtitle: { en: string; id: string };
  desc: { en: string; id: string };
}

const WHAT_I_DO_ITEMS: WhatIDoItem[] = [
  {
    icon: <Terminal size={18} className="text-neutral-400 group-hover:text-brand-red transition-colors duration-300" />,
    title: { en: "Founder of Spead AI", id: "Pendiri Spead AI" },
    subtitle: { en: "Enterprise-Level Modular AI Solutions", id: "Solusi AI Modular Tingkat Enterprise & BUMN" },
    desc: { 
      en: "Building modular AI solutions tailored for enterprise-level operations, including government agencies, state-owned enterprises (BUMN), and corporate sectors. Selected for the Google for Startups Cloud Program 2025.", 
      id: "Membangun solusi kecerdasan buatan modular yang dirancang khusus untuk operasional tingkat perusahaan (enterprise), BUMN, dan instansi pemerintahan. Terpilih dalam Google for Startups Cloud Program 2025." 
    }
  },
  {
    icon: <Bot size={18} className="text-neutral-400 group-hover:text-brand-red transition-colors duration-300" />,
    title: { en: "Agent Buff Ecosystem", id: "Ekosistem Agent Buff" },
    subtitle: { en: "Autonomous AI Agent Marketplace & Ecosystem", id: "Platform Marketplace & Ekosistem Agen AI Otonom" },
    desc: { 
      en: "A marketplace facilitating the sale, distribution, and rental of self-evolving & self-correcting autonomous AI agents, apps, and skills designed to empower solopreneurs, students, and SMBs to automate workflows.", 
      id: "Platform marketplace yang memfasilitasi transaksi, distribusi, dan penyewaan agen AI otonom dengan kemampuan self-evolving & self-correction untuk membantu solopreneur, pelajar, dan UMKM mengotomatisasi operasional." 
    }
  },
  {
    icon: <Smartphone size={18} className="text-neutral-400 group-hover:text-brand-red transition-colors duration-300" />,
    title: { en: "Content Creator", id: "Kreator Konten" },
    subtitle: { en: "Tech & Lifestyle Storytelling (140K+ Followers)", id: "Edukasi Teknologi & Gaya Hidup (140K+ Pengikut)" },
    desc: { 
      en: "Bridging the gap between advanced technology and public adoption. Creating engaging digital content that has garnered over 40M+ views across platforms.", 
      id: "Menjembatani inovasi teknologi canggih dengan masyarakat luas melalui konten edukatif interaktif yang telah menjangkau lebih dari 40 juta tayangan." 
    }
  },
  {
    icon: <Utensils size={18} className="text-neutral-400 group-hover:text-brand-red transition-colors duration-300" />,
    title: { en: "F&B Business", id: "Bisnis Kuliner (F&B)" },
    subtitle: { en: "Culinary Entrepreneurship (Gultik & Soto Masnug)", id: "Wirausaha Kuliner (Gultik & Soto Masnug)" },
    desc: { 
      en: "Building modern F&B brands by elevating traditional Indonesian street food to premium packaging and marketing standards designed for Gen-Z.", 
      id: "Mendirikan dan mengembangkan merek kuliner modern dengan mengangkat makanan jalanan tradisional Indonesia ke standar pemasaran premium bagi Gen-Z." 
    }
  },
  {
    icon: <Building size={18} className="text-neutral-400 group-hover:text-brand-red transition-colors duration-300" />,
    title: { en: "Asset Management", id: "Manajemen Aset" },
    subtitle: { en: "Residential Property Operations (Mutiara 27)", id: "Pengelolaan Properti Hunian (Mutiara 27)" },
    desc: { 
      en: "Strategically managing over 100 high-occupancy residential units. Maximizing passive income, streamlining property cash flows, and optimizing facility management.", 
      id: "Mengelola lebih dari 100 unit hunian sewa secara strategis untuk mengoptimalkan okupansi harian, arus kas berkala, dan perawatan infrastruktur properti." 
    }
  },
  {
    icon: <Palette size={18} className="text-neutral-400 group-hover:text-brand-red transition-colors duration-300" />,
    title: { en: "Architecture Studio", id: "Studio Arsitektur" },
    subtitle: { en: "LAB.in Studio (3D Visualizations & Layout)", id: "LAB.in Studio (Visualisasi 3D & Tata Ruang)" },
    desc: { 
      en: "Managing 4 freelance design staff for 3D visualizations and spatial drafting. As a practicing architect, I direct studio operations while delivering high-end design renders.", 
      id: "Mengelola 4 staf desainer lepas untuk visualisasi 3D dan rancangan tata ruang. Sebagai arsitek praktisi, saya memimpin operasional studio sekaligus menghasilkan desain visualisasi premium." 
    }
  }
];

export const WhatIDo: React.FC = () => {
  const { language } = useLanguage();
  const sectionTitle = language === 'en' ? 'WHAT I DO' : 'APA YANG SAYA LAKUKAN';
  const productivityText = language === 'en'
    ? 'ACTIVE PRODUCTIVITY // DEVELOPING AI SYSTEMS, CREATING CONTENT & MANAGING BUSINESSES'
    : 'PRODUKTIVITAS AKTIF // MENGEMBANGKAN SISTEM AI, MEMBUAT KONTEN & MENGELOLA BISNIS';

  const containerVariants: Variants = {
    hidden: {},
    visible: {
      transition: {
        staggerChildren: 0.08
      }
    }
  };

  const cardVariants: Variants = {
    hidden: { opacity: 0, y: 30 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: { duration: 0.6, ease: [0.16, 1, 0.3, 1] }
    }
  };

  return (
    <Section 
      id="what-i-do" 
      number="02" 
      title={sectionTitle} 
      subtitle={
        <div className="bg-brand-black text-brand-bg text-[10px] sm:text-xs font-bold px-3 py-1.5 flex items-center skew-x-[-10deg] w-fit shadow-[0_0_8px_rgba(0,0,0,0.15)]">
          <span className="skew-x-[10deg] flex items-center gap-1.5">
            <span className="w-1.5 h-1.5 bg-brand-red rounded-full animate-pulse" />
            {productivityText}
          </span>
        </div>
      }
    >
      {/* Grid mapping - 3 columns on large screens for balanced display of 6 cards */}
      <motion.div 
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-50px" }}
        className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8"
      >
        {WHAT_I_DO_ITEMS.map((item, idx) => (
          <motion.div 
            key={idx}
            variants={cardVariants}
            whileHover={{ y: -6, scale: 1.015 }}
            transition={{ type: "spring", stiffness: 350, damping: 25 }}
            className="border border-brand-border bg-[#050507] hover:border-brand-black hover:bg-[#09090c] transition-all duration-300 p-6 relative font-mono flex flex-col justify-between group rounded-2xl shadow-[0_4px_20px_rgba(0,0,0,0.06)] hover:shadow-[0_10px_30px_rgba(0,0,0,0.15)] cursor-default overflow-hidden"
          >
            {/* Tech corners - they blend with the border in normal state, but light up to red on hover */}
            <TechCorner position="top-left" size={6} className="border-brand-border group-hover:border-brand-red transition-colors duration-300" />
            <TechCorner position="bottom-right" size={6} className="border-brand-border group-hover:border-brand-red transition-colors duration-300" />
            
            {/* Glowing left edge highlight laser on hover */}
            <div className="absolute left-0 top-0 h-full w-[3px] bg-brand-red scale-y-0 group-hover:scale-y-100 origin-top transition-transform duration-300 ease-out shadow-[0_0_8px_rgba(229,57,53,0.8)]" />

            {/* Subtle grid pattern inside card for added cybernetic texturing */}
            <div className="absolute inset-0 bg-grid-lines-dark opacity-[0.01] group-hover:opacity-[0.03] transition-opacity duration-300 pointer-events-none" />
            
            <div className="flex flex-col h-full justify-between relative z-10">
              <div>
                {/* Card Header: Icon & Arrow link */}
                <div className="flex justify-between items-center border-b border-neutral-900 pb-3.5 mb-5">
                  <div className="w-9 h-9 border border-neutral-850 bg-[#0d0d12] rounded-xl flex items-center justify-center group-hover:border-brand-red/45 transition-colors shadow-inner">
                    {item.icon}
                  </div>
                  <ArrowUpRight size={16} className="text-neutral-500 group-hover:text-brand-red group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-all duration-200" />
                </div>

                {/* Title */}
                <h5 className="text-base sm:text-lg font-black text-white uppercase tracking-tight mb-1.5 group-hover:text-brand-red transition-colors duration-200 leading-snug">
                  {item.title[language]}
                </h5>

                {/* Subtitle / Context */}
                <span className="text-[11px] text-brand-red uppercase font-bold block mb-4.5 leading-snug tracking-wider">
                  {item.subtitle[language]}
                </span>

                {/* Description */}
                <p className="font-sans text-sm text-neutral-400 leading-relaxed group-hover:text-neutral-200 transition-colors duration-300">
                  {item.desc[language]}
                </p>
              </div>
            </div>
          </motion.div>
        ))}
      </motion.div>
    </Section>
  );
};
