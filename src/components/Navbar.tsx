import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X, Download } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';

export const Navbar: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const { language, setLanguage } = useLanguage();

  const navItems = [
    { name: { en: "HOME", id: "BERANDA" }, href: "#hero" },
    { name: { en: "ABOUT", id: "TENTANG" }, href: "#about" },
    { name: { en: "SKILLS", id: "KEAHLIAN" }, href: "#skills" },
    { name: { en: "PROJECTS", id: "PROYEK" }, href: "#projects" },
    { name: { en: "MY JOURNEY", id: "PERJALANAN" }, href: "#timeline" },
    { name: { en: "CONTACT", id: "KONTAK" }, href: "#contact" }
  ];

  const cvLabel = language === 'en' ? 'DOWNLOAD CV' : 'UNDUH CV';

  return (
    <motion.header 
      initial={{ y: -50, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
      className="fixed top-0 left-0 w-full z-50 bg-brand-bg/90 backdrop-blur-md border-b border-brand-border h-14"
    >
      <div className="max-w-screen-2xl mx-auto h-full px-4 md:px-8 flex items-center justify-between font-mono text-sm">
        
        {/* Logo Nugi */}
        <a href="#hero" className="flex items-end gap-0.5 select-none group">
          <span className="text-xl font-black text-brand-black tracking-tighter">Nugi</span>
          <span className="w-2.5 h-2.5 bg-brand-red mb-1 group-hover:scale-110 transition-transform" />
        </a>

        {/* Navigation links (Desktop) */}
        <nav className="hidden lg:flex items-center gap-6">
          {navItems.map((item) => (
            <a 
              key={item.name.en} 
              href={item.href}
              className="relative text-brand-text-secondary hover:text-brand-black transition-colors duration-200 py-1 px-1 group"
            >
              {item.name[language]}
              <span className="absolute bottom-0 left-0 w-0 h-[1.5px] bg-brand-red transition-all duration-300 group-hover:w-full" />
            </a>
          ))}
        </nav>

        {/* Right actions: Download CV & Language switch */}
        <div className="flex items-center gap-2">
          {/* Download CV */}
          <a 
            href="#"
            className="hidden sm:flex items-center gap-2 bg-brand-black text-brand-bg px-4 py-2 hover:bg-brand-red transition-colors duration-200 uppercase text-xs font-bold select-none"
          >
            <span>{cvLabel}</span>
            <Download size={12} className="stroke-[2.5]" />
          </a>

          {/* Language Switcher */}
          <div className="flex items-center border border-brand-border bg-brand-panel p-0.5 font-bold select-none text-xs">
            <button 
              onClick={() => setLanguage('en')}
              className={`px-2 py-1.5 transition-colors duration-200 ${language === 'en' ? 'bg-brand-black text-brand-bg' : 'text-brand-text-secondary hover:text-brand-black'}`}
            >
              EN
            </button>
            <button 
              onClick={() => setLanguage('id')}
              className={`px-2 py-1.5 transition-colors duration-200 ${language === 'id' ? 'bg-brand-black text-brand-bg' : 'text-brand-text-secondary hover:text-brand-black'}`}
            >
              ID
            </button>
          </div>

          {/* Mobile Menu Button */}
          <button 
            onClick={() => setIsOpen(!isOpen)}
            className="lg:hidden p-1.5 border border-brand-border bg-brand-panel text-brand-black hover:bg-brand-black hover:text-brand-bg transition-colors"
          >
            {isOpen ? <X size={16} /> : <Menu size={16} />}
          </button>
        </div>
      </div>

      {/* Mobile Navigation Menu */}
      <AnimatePresence>
        {isOpen && (
          <motion.div 
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3 }}
            className="absolute top-14 left-0 w-full bg-brand-bg border-b border-brand-border lg:hidden overflow-hidden font-mono"
          >
            <div className="px-4 py-6 flex flex-col gap-4">
              {navItems.map((item) => (
                <a 
                  key={item.name.en} 
                  href={item.href}
                  onClick={() => setIsOpen(false)}
                  className="text-brand-text-secondary hover:text-brand-black text-sm py-2 px-4 hover:bg-brand-panel border-l-2 border-transparent hover:border-brand-red transition-all duration-200"
                >
                  {item.name[language]}
                </a>
              ))}
              <div className="w-full h-[1px] bg-brand-border/60 my-2" />
              <div className="flex flex-col gap-2 px-4">
                <a 
                  href="#"
                  className="flex items-center justify-center gap-2 bg-brand-black text-brand-bg px-4 py-3 hover:bg-brand-red transition-colors duration-200 font-bold"
                >
                  <span>{cvLabel}</span>
                  <Download size={14} className="stroke-[2.5]" />
                </a>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.header>
  );
};
