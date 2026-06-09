import React, { useState } from 'react';
import { motion } from 'framer-motion';
import type { Variants } from 'framer-motion';
import { Section } from '../components/Section';
import { portfolioData } from '../config/portfolio';
import { TechCorner } from '../components/TechCorner';
import { useLanguage } from '../context/LanguageContext';
import { Bot, Smartphone, Palette, Briefcase, Cpu, PenTool, ChevronDown } from 'lucide-react';

export const Skills: React.FC = () => {
  const { skills, skillsAnalytics } = portfolioData;
  const { language } = useLanguage();
  const [expandedCards, setExpandedCards] = useState<Record<number, boolean>>({});
  const [isMatrixExpanded, setIsMatrixExpanded] = useState(false);

  const toggleCard = (idx: number) => {
    setExpandedCards(prev => ({
      ...prev,
      [idx]: !prev[idx]
    }));
  };

  const skillsTitle = language === 'en' ? 'SKILLS' : 'KEAHLIAN';

  const containerVariants: Variants = {
    hidden: {},
    visible: {
      transition: {
        staggerChildren: 0.05
      }
    }
  };

  const itemVariants: Variants = {
    hidden: { opacity: 0, y: 25 },
    visible: {
      y: 0,
      opacity: 1,
      transition: { duration: 0.6, ease: [0.16, 1, 0.3, 1] }
    }
  };

  const analyticsItemVariants: Variants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { duration: 0.5, ease: [0.16, 1, 0.3, 1] }
    }
  };

  const getCategoryIcon = (iconName: string) => {
    const iconClass = "text-brand-black transition-colors duration-300";
    switch (iconName.toLowerCase()) {
      case 'bot':
        return <Bot size={18} className={iconClass} />;
      case 'smartphone':
        return <Smartphone size={18} className={iconClass} />;
      case 'palette':
        return <Palette size={18} className={iconClass} />;
      case 'briefcase':
        return <Briefcase size={18} className={iconClass} />;
      case 'cpu':
        return <Cpu size={18} className={iconClass} />;
      case 'pentool':
        return <PenTool size={18} className={iconClass} />;
      default:
        return <Bot size={18} className={iconClass} />;
    }
  };

  return (
    <Section 
      id="skills" 
      number="03" 
      title={skillsTitle} 
      subtitle="Capabilities Matrix // Component Libraries"
      theme="dark"
    >
      {/* Container border wrapper */}
      <div className="relative border border-neutral-800 bg-[#0d0d12] p-6 md:p-8 mt-4 rounded-2xl shadow-[0_4px_24px_rgba(0,0,0,0.4)]">
        
        {/* Custom Tab Title // 03. SKILLS */}
        <div className="absolute -top-[13px] left-6 bg-[#16161a] text-white border border-neutral-800 font-mono text-xs font-bold px-3 py-1.5 flex items-center select-none skew-x-[-10deg]">
          <span className="skew-x-[10deg]">// 03. {skillsTitle.toUpperCase()}</span>
        </div>

        {/* corner markers */}
        <TechCorner position="top-left" size={6} className="border-neutral-700" />
        <TechCorner position="top-right" size={6} className="border-neutral-700" />
        <TechCorner position="bottom-left" size={6} className="border-neutral-700" />
        <TechCorner position="bottom-right" size={6} className="border-neutral-700" />

        {/* 1. Upper Layer: Superpower Analytics Banner */}
        <div className="mb-8">
          <div className="text-[10px] text-brand-red font-mono font-bold tracking-widest uppercase mb-4 flex items-center gap-2 select-none">
            <span className="w-1.5 h-1.5 bg-brand-red rounded-full animate-pulse shadow-[0_0_6px_rgba(229,57,53,0.8)]" />
            // CORE COMPETENCIES & EXPERIENCE METRICS // LOG_V3.0
          </div>
          
          <motion.div 
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-50px" }}
            className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-3 items-stretch text-left font-mono"
          >
            {skillsAnalytics.map((stat, idx) => (
              <motion.div
                key={idx}
                variants={analyticsItemVariants}
                whileHover={{ y: -3, scale: 1.01 }}
                className="h-full min-h-[160px] border border-[#c8c8b8] bg-[#e6e6dd] hover:border-brand-black hover:bg-[#eaeae0] transition-colors duration-300 p-4 relative rounded-xl flex flex-col justify-between group cursor-default"
              >
                <TechCorner position="top-left" size={5} className="border-[#c8c8b8] group-hover:border-brand-black transition-colors" />
                <TechCorner position="bottom-right" size={5} className="border-[#c8c8b8] group-hover:border-brand-black transition-colors" />

                <div className="flex flex-col h-full justify-between gap-3">
                  <div className="flex justify-between items-center select-none border-b border-[#c8c8b8]/60 pb-1.5 mb-0.5">
                    <span className="text-[10px] text-brand-red font-bold tracking-wide">
                      {stat.label[language]}
                    </span>
                    <span className="text-[10px] text-neutral-500 font-medium">MOD_0{idx + 1}</span>
                  </div>

                  <div className="flex-grow flex flex-col justify-between">
                    <span className="text-2xl sm:text-3xl font-black text-brand-black tracking-tight leading-none block mb-1.5">
                      {stat.value[language]}
                    </span>
                    <p className="font-sans text-xs text-neutral-700 group-hover:text-brand-black transition-colors duration-200 min-h-[48px] lg:min-h-[64px]">
                      {stat.description[language]}
                    </p>
                  </div>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>

        {/* Section Divider Line */}
        <div className="border-t border-neutral-800 my-8" />

        {/* 2. Lower Layer: Capabilities Grid */}
        <div>
          {/* Full-width Interactive Cyberpunk Banner Button */}
          <button
            onClick={() => setIsMatrixExpanded(!isMatrixExpanded)}
            className="w-full text-left relative my-8 border border-[#c8c8b8] bg-[#e6e6dd] hover:border-brand-black hover:bg-[#eaeae0] transition-all duration-300 rounded-2xl overflow-hidden group/matrix-banner cursor-pointer select-none"
          >
            {/* Warning line top border */}
            <div className="absolute top-0 left-0 right-0 h-[2px] bg-brand-red animate-pulse" />
            
            <div className="flex flex-col md:flex-row md:items-center justify-between p-5 md:p-6 gap-4">
              <div className="flex items-center gap-4">
                {/* Large indicator icon */}
                <div className={`w-12 h-12 border rounded-xl flex items-center justify-center transition-all duration-500 shrink-0 ${
                  isMatrixExpanded 
                    ? 'bg-brand-red border-brand-red text-brand-bg rotate-180 shadow-[0_0_15px_rgba(229,57,53,0.4)]' 
                    : 'bg-[#d6d6cd] border-[#c8c8b8] text-brand-black group-hover/matrix-banner:bg-brand-red group-hover/matrix-banner:border-brand-red group-hover/matrix-banner:text-brand-bg group-hover/matrix-banner:rotate-90'
                }`}>
                  <Cpu size={22} className="animate-pulse" />
                </div>
                
                <div>
                  <div className="text-[10px] text-brand-red font-mono font-bold tracking-widest uppercase mb-1">
                    {language === 'en' ? 'SYSTEM UTILITY // MODULE_V3.0' : 'SISTEM UTILITAS // MODUL_V3.0'}
                  </div>
                  <h4 className="font-mono text-sm sm:text-base md:text-lg font-black text-brand-black tracking-tight uppercase group-hover/matrix-banner:text-brand-red transition-colors duration-200">
                    {language === 'en' ? 'DETAILED CAPABILITIES MATRIX' : 'MATRIKS KEAHLIAN MENDALAM'}
                  </h4>
                </div>
              </div>

              {/* Striking Sci-Fi Interactive Button Indicator */}
              <div className={`flex items-center gap-3 font-mono text-[11px] md:text-xs font-black tracking-wider uppercase border px-5 py-3 rounded-xl transition-all duration-500 shadow-sm shrink-0 justify-center ${
                isMatrixExpanded
                  ? 'bg-brand-black text-brand-bg border-brand-black shadow-[0_0_15px_rgba(5,5,5,0.2)]'
                  : 'bg-brand-red text-brand-bg border-brand-red group-hover/matrix-banner:bg-brand-black group-hover/matrix-banner:border-brand-black group-hover/matrix-banner:text-brand-bg shadow-[0_0_15px_rgba(229,57,53,0.35)] animate-pulse'
              }`}>
                <span>
                  {isMatrixExpanded 
                    ? (language === 'en' ? 'HIDE DETAILED SKILLS' : 'SEMBUNYIKAN DETAIL')
                    : (language === 'en' ? 'VIEW DETAILED SKILLS' : 'LIHAT DETAIL KEAHLIAN')
                  }
                  <span className="animate-pulse">_</span>
                </span>
                <motion.div
                  animate={{ rotate: isMatrixExpanded ? 180 : 0 }}
                  transition={{ duration: 0.3 }}
                >
                  <ChevronDown size={14} />
                </motion.div>
              </div>
            </div>
          </button>

          <motion.div
            initial={false}
            animate={{
              height: isMatrixExpanded ? 'auto' : 0,
              opacity: isMatrixExpanded ? 1 : 0
            }}
            transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
            className="overflow-hidden"
          >
            <motion.div 
              variants={containerVariants}
              initial="hidden"
              animate={isMatrixExpanded ? "visible" : "hidden"}
              className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 items-stretch text-left pt-2 pb-4"
            >
              {skills.map((skillGroup, idx) => {
                const isExpanded = !!expandedCards[idx];
                return (
                  <motion.div 
                    key={idx}
                    variants={itemVariants}
                    whileHover={{ y: -6, scale: 1.015 }}
                    transition={{ type: "spring", stiffness: 350, damping: 25 }}
                    className="h-full border border-[#c8c8b8] bg-[#e6e6dd] hover:border-brand-black hover:bg-[#eaeae0] transition-colors duration-300 p-5 relative font-mono flex flex-col justify-between group rounded-2xl cursor-default"
                  >
                    <TechCorner position="top-left" size={6} className="border-[#c8c8b8] group-hover:border-brand-black transition-colors" />
                    <TechCorner position="bottom-right" size={6} className="border-[#c8c8b8] group-hover:border-brand-black transition-colors" />

                    <div className="flex flex-col h-full justify-between">
                      <div>
                        {/* Category Header */}
                        <div className="flex justify-between items-center border-b border-[#c8c8b8]/60 pb-3 mb-3.5">
                          <div className="flex items-center gap-2.5">
                            <div className="w-9 h-9 border border-[#c8c8b8] bg-[#d6d6cd] rounded-xl flex items-center justify-center group-hover:border-brand-black transition-colors">
                              {getCategoryIcon(skillGroup.icon)}
                            </div>
                            <span className="text-sm sm:text-base font-black text-brand-black uppercase tracking-tight">
                              {skillGroup.category}
                            </span>
                          </div>
                          <span className="text-[10px] text-brand-red border border-brand-red/35 bg-brand-red/5 px-2 py-0.5 font-bold font-mono">
                            {skillGroup.focusMetric}
                          </span>
                        </div>

                        {/* Subtitle / Focus description */}
                        <p className="font-sans text-sm text-neutral-700 leading-relaxed mb-4.5 min-h-[72px] sm:min-h-[80px] lg:min-h-[96px] group-hover:text-brand-black transition-colors">
                          {skillGroup.description[language]}
                        </p>

                        {/* Cyberpunk Accordion Toggle Button */}
                        <button
                          onClick={() => toggleCard(idx)}
                          className={`w-full flex items-center justify-between px-3.5 py-2 border rounded-xl font-mono text-[10px] font-bold tracking-wider uppercase transition-all duration-300 group/btn cursor-pointer select-none mb-1.5 ${
                            isExpanded 
                              ? 'bg-brand-black text-brand-bg border-brand-black shadow-[0_0_12px_rgba(5,5,5,0.15)]' 
                              : 'bg-[#d6d6cd]/60 border-[#c8c8b8] text-neutral-700 hover:border-brand-black hover:bg-brand-black hover:text-white'
                          }`}
                        >
                          <span className="flex items-center gap-2">
                            <span className={`w-1.5 h-1.5 rounded-full transition-all duration-300 ${
                              isExpanded 
                                ? 'bg-brand-red shadow-[0_0_8px_rgba(229,57,53,0.8)] animate-pulse' 
                                : 'bg-neutral-500 opacity-60'
                            }`} />
                            <span>
                              {isExpanded 
                                ? (language === 'en' ? 'HIDE TECH STACK' : 'TUTUP DETAIL')
                                : (language === 'en' ? 'VIEW TECH STACK' : 'LIHAT DETAIL SKILL')
                              }
                              <span className="animate-pulse">_</span>
                            </span>
                          </span>
                          
                          <div className="flex items-center gap-1.5">
                            <span className="text-[9px] opacity-45 group-hover/btn:opacity-100 transition-opacity duration-200">
                              {isExpanded ? 'ACTIVE' : 'SYS_0' + (idx + 1)}
                            </span>
                            <motion.div
                              animate={{ rotate: isExpanded ? 180 : 0 }}
                              transition={{ duration: 0.3, ease: "easeInOut" }}
                            >
                              <ChevronDown size={12} />
                            </motion.div>
                          </div>
                        </button>

                        {/* Collapsible tags container */}
                        <motion.div 
                          initial={false}
                          animate={{ 
                            height: isExpanded ? 'auto' : 0, 
                            opacity: isExpanded ? 1 : 0 
                          }}
                          transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
                          className="overflow-hidden"
                        >
                          <div className="flex flex-wrap gap-1.5 pt-3">
                            {skillGroup.items.map((item, tagIdx) => (
                              <motion.span 
                                key={item}
                                initial={{ opacity: 0, scale: 0.9, y: 5 }}
                                animate={isExpanded ? { opacity: 1, scale: 1, y: 0 } : { opacity: 0, scale: 0.9, y: 5 }}
                                transition={{ duration: 0.25, delay: isExpanded ? tagIdx * 0.03 : 0 }}
                                whileHover={{ y: -2, scale: 1.03 }}
                                className="px-2.5 py-1 bg-[#d6d6cd]/50 hover:bg-brand-black border border-[#c8c8b8]/60 hover:border-brand-black rounded-lg text-xs text-neutral-700 hover:text-white font-sans tracking-wide transition-colors duration-200 cursor-default"
                              >
                                {item}
                              </motion.span>
                            ))}
                          </div>
                        </motion.div>
                      </div>
                    </div>
                  </motion.div>
                );
              })}
            </motion.div>
          </motion.div>
        </div>

      </div>
    </Section>
  );
};
