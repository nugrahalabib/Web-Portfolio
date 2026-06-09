import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Section } from '../components/Section';
import { portfolioData } from '../config/portfolio';
import { TechCorner } from '../components/TechCorner';
import { useLanguage } from '../context/LanguageContext';
import { ArrowUpRight, Trophy, BookOpen, FileCode, Landmark, ChevronLeft, ChevronRight } from 'lucide-react';

const ProjectCard: React.FC<{ 
  project: typeof portfolioData.projects[0]; 
  itemIndex: number; 
  language: 'en' | 'id';
}> = ({ project, itemIndex, language }) => {
  const getActionText = (type: string) => {
    if (type === 'tech') return language === 'en' ? 'VIEW APP' : 'BUKA APLIKASI';
    if (type === 'architecture') return language === 'en' ? 'VIEW SPECIFICATIONS' : 'LIHAT SPESIFIKASI';
    if (type === 'articles') return language === 'en' ? 'READ ARTICLE' : 'BACA ARTIKEL';
    return language === 'en' ? 'VIEW DETAILS' : 'LIHAT DETAIL';
  };

  const isEven = itemIndex % 2 === 0;

  return (
    <motion.div 
      layout
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, scale: 0.9, transition: { duration: 0.2 } }}
      transition={{ 
        duration: 0.4, 
        ease: [0.16, 1, 0.3, 1],
        delay: itemIndex * 0.04
      }}
      className={`w-[280px] shrink-0 snap-start flex flex-col justify-between p-5 group min-h-[380px] rounded-2xl relative text-left transition-all duration-300 ${
        isEven 
          ? 'border border-[#c8c8b8] bg-[#e6e6dd] hover:border-brand-black hover:bg-[#eaeae0]' 
          : 'border border-neutral-800 bg-[#0d0d12] hover:border-neutral-700 hover:bg-[#121217]'
      }`}
    >
      {/* TechCorner decoration brackets */}
      <TechCorner position="top-left" size={6} className={isEven ? "border-[#c8c8b8] group-hover:border-brand-black transition-colors duration-300" : "border-neutral-800 group-hover:border-neutral-700 transition-colors duration-300"} />
      <TechCorner position="bottom-right" size={6} className={isEven ? "border-[#c8c8b8] group-hover:border-brand-black transition-colors duration-300" : "border-neutral-800 group-hover:border-neutral-700 transition-colors duration-300"} />

      {/* Index block on top-left of the card */}
      <div className={`absolute -top-[1px] -left-[1px] border-r border-b font-mono font-bold text-xs px-2.5 py-1 select-none z-10 rounded-tl-2xl rounded-br-lg transition-colors duration-300 ${
        isEven 
          ? 'border-[#c8c8b8] bg-[#d6d6cd] text-brand-black group-hover:border-[#eaeae0]' 
          : 'border-neutral-800 bg-[#16161a] text-white group-hover:border-neutral-700'
      }`}>
        {project.serialNumber}
      </div>

      <div>
        {/* Conditional Graphic Mockup Frame based on Project Type */}
        {project.type === 'tech' && (
          <div className={`relative border aspect-[16/10] overflow-hidden mb-5 mt-2 flex flex-col items-center justify-center select-none rounded-xl transition-colors duration-300 ${
            isEven ? 'border-[#c8c8b8] bg-[#d6d6cd]' : 'border-neutral-850 bg-[#16161a]'
          }`}>
            <div className="absolute top-1 right-1 w-2 h-2 border-t border-r border-brand-red" />
            <div className="absolute bottom-1 left-1 w-2 h-2 border-b border-l border-brand-red" />
            <div className="absolute inset-0 bg-grid-lines opacity-10" />
            <FileCode size={28} className={`transition-all duration-300 mb-1 ${
              isEven ? 'text-neutral-700 opacity-65 group-hover:text-brand-red group-hover:opacity-100 group-hover:scale-110' : 'text-neutral-400 group-hover:text-brand-red group-hover:scale-110'
            }`} />
            <span className={`text-[10px] font-mono tracking-widest font-extrabold uppercase transition-colors duration-300 ${isEven ? 'text-brand-black' : 'text-white'}`}>{project.title}</span>
            <span className={`text-[8px] font-mono transition-colors duration-300 ${isEven ? 'text-neutral-600' : 'text-neutral-400'}`}>[{project.edition}]</span>
          </div>
        )}

        {project.type === 'architecture' && (
          <div className="relative border border-[#1E3A64]/50 bg-[#0F1E36] aspect-[16/10] overflow-hidden mb-5 mt-2 flex flex-col items-center justify-center select-none rounded-xl">
            <div className="absolute top-1 right-1 w-2 h-2 border-t border-r border-sky-400" />
            <div className="absolute bottom-1 left-1 w-2 h-2 border-b border-l border-sky-400" />
            <div className="absolute inset-0 bg-grid-lines opacity-25 pointer-events-none" />
            <Landmark size={26} className="text-sky-400 opacity-80 group-hover:text-sky-300 group-hover:scale-110 transition-all duration-300 mb-1" />
            <span className="text-[9px] font-mono tracking-widest text-sky-200 font-extrabold uppercase text-center px-2">{project.title}</span>
            <span className="text-[7.5px] font-mono text-sky-400/80">[{project.edition}]</span>
            <div className="absolute bottom-1 right-2 font-mono text-[6px] text-sky-400/50 tracking-wider">SCALE 1:125</div>
          </div>
        )}

        {project.type === 'articles' && (
          <div className={`relative border aspect-[16/10] overflow-hidden mb-5 mt-2 flex flex-col items-center justify-center select-none rounded-xl p-4 transition-colors duration-300 ${
            isEven ? 'border-[#c8c8b8] bg-[#d6d6cd]' : 'border-neutral-850 bg-[#16161a]'
          }`}>
            <div className="absolute top-1 right-1 w-2 h-2 border-t border-r border-brand-red" />
            <div className="absolute bottom-1 left-1 w-2 h-2 border-b border-l border-brand-red" />
            <div className="absolute inset-0 bg-grid-lines opacity-10" />
            <BookOpen size={26} className={`transition-all duration-300 mb-1 ${
              isEven ? 'text-neutral-700 opacity-65 group-hover:text-brand-black group-hover:scale-110' : 'text-neutral-400 group-hover:text-white group-hover:scale-110'
            }`} />
            <span className={`text-[9px] font-mono tracking-widest font-extrabold uppercase text-center px-1.5 leading-snug transition-colors duration-300 ${isEven ? 'text-brand-black' : 'text-white'}`}>{project.title}</span>
            <span className="text-[8px] font-mono text-brand-red font-black uppercase mt-0.5">
              [{project.readTime ? project.readTime[language] : '5 MIN READ'}]
            </span>
          </div>
        )}

        {project.type === 'milestones' && (
          <div className={`relative border aspect-[16/10] overflow-hidden mb-5 mt-2 flex flex-col items-center justify-center select-none rounded-xl shadow-[inset_0_0_12px_rgba(229,57,53,0.04)] transition-colors duration-300 ${
            isEven ? 'border-brand-red/25 bg-[#d6d6cd]' : 'border-brand-red/25 bg-[#16161a]'
          }`}>
            <div className="absolute top-1 right-1 w-2 h-2 border-t border-r border-brand-red" />
            <div className="absolute bottom-1 left-1 w-2 h-2 border-b border-l border-brand-red" />
            <div className="absolute inset-0 bg-grid-lines opacity-10" />
            <div className="w-9 h-9 rounded-full border border-brand-red/35 flex items-center justify-center bg-brand-red/5 mb-1 group-hover:bg-brand-red/10 transition-colors shadow-[0_0_8px_rgba(229,57,53,0.08)]">
              <Trophy size={18} className="text-brand-red animate-pulse" />
            </div>
            <span className={`text-[9px] font-mono tracking-widest font-extrabold uppercase text-center px-2 leading-snug transition-colors duration-300 ${isEven ? 'text-brand-black' : 'text-white'}`}>{project.title}</span>
            <span className="text-[7.5px] font-mono text-brand-red font-black tracking-widest uppercase animate-pulse mt-0.5">
              ▲ {project.milestoneBadge ? project.milestoneBadge[language] : 'UNLOCKED'} ▲
            </span>
          </div>
        )}

        {/* Title */}
        <h4 className={`text-sm font-black uppercase tracking-tight mb-2 select-none group-hover:text-brand-red transition-colors duration-200 ${
          isEven ? 'text-brand-black' : 'text-white'
        }`}>
          {project.title}
        </h4>

        {/* Description */}
        <p className={`text-xs leading-relaxed mb-6 font-sans transition-colors duration-300 ${
          isEven ? 'text-neutral-700 group-hover:text-brand-black' : 'text-neutral-400 group-hover:text-neutral-200'
        }`}>
          {project.description[language]}
        </p>
      </div>

      {/* Bottom details & link */}
      <div>
        {/* Tech tag lists */}
        <div className="flex flex-wrap gap-1.5 mb-5 font-mono text-[9px] select-none">
          {project.tags.map((tag) => (
            <span 
              key={tag}
              className={`px-1.5 py-0.5 uppercase text-[9px] font-bold rounded transition-colors duration-200 cursor-default ${
                isEven 
                  ? 'border border-[#c8c8b8] bg-[#d6d6cd] text-brand-black hover:bg-brand-black hover:text-white hover:border-brand-black' 
                  : 'border border-neutral-800 bg-[#16161a] text-neutral-350 hover:bg-white hover:text-brand-black hover:border-white'
              }`}
            >
              {tag}
            </span>
          ))}
        </div>

        {/* View Project Link */}
        <a 
          href={project.demoUrl}
          className={`font-mono text-[10px] font-bold hover:text-brand-red flex items-center gap-1.5 uppercase select-none group-hover:translate-x-1 transition-all duration-300 cursor-pointer ${
            isEven ? 'text-brand-black' : 'text-white'
          }`}
        >
          <span>{getActionText(project.type)}</span>
          <span className="inline-block w-4 h-[1px] bg-brand-red" />
          <ArrowUpRight size={10} className="stroke-[2.5] text-brand-red" />
        </a>
      </div>
    </motion.div>
  );
};

export const Projects: React.FC = () => {
  const { projects } = portfolioData;
  const { language } = useLanguage();

  const [activeProjectsSubCategory, setActiveProjectsSubCategory] = useState<string>('tech_venture');
  const [activeBlogSubCategory, setActiveBlogSubCategory] = useState<string>('news_milestone');

  const projectsScrollRef = useRef<HTMLDivElement>(null);
  const [projectsProgress, setProjectsProgress] = useState<number>(0);
  const [canProjectsScrollLeft, setCanProjectsScrollLeft] = useState<boolean>(false);
  const [canProjectsScrollRight, setCanProjectsScrollRight] = useState<boolean>(false);

  const blogScrollRef = useRef<HTMLDivElement>(null);
  const [blogProgress, setBlogProgress] = useState<number>(0);
  const [canBlogScrollLeft, setCanBlogScrollLeft] = useState<boolean>(false);
  const [canBlogScrollRight, setCanBlogScrollRight] = useState<boolean>(false);

  const sectionTitle = language === 'en' ? 'THE ARCHIVES' : 'ARSIP KARYA';
  const subtitle = language === 'en' ? 'Dossiers // Creative & Technical Archives' : 'Dokumen Berkas // Arsip Kreatif & Teknis';

  const subCategories = {
    project: [
      { id: 'tech_venture', label: { en: 'TECH & VENTURES', id: 'TEKNOLOGI & BISNIS' } },
      { id: 'architecture_design', label: { en: 'ARCHITECTURE & DESIGN', id: 'ARSITEKTUR & DESAIN' } },
      { id: 'content', label: { en: 'CONTENT', id: 'KONTEN & MEDIA' } }
    ],
    blog: [
      { id: 'news_milestone', label: { en: 'NEWS & MILESTONES', id: 'BERITA & PENCAPAIAN' } },
      { id: 'marketing_growth', label: { en: 'MARKETING & GROWTH', id: 'PEMASARAN & PERTUMBUHAN' } },
      { id: 'tech_research', label: { en: 'TECH & RESEARCH', id: 'TEKNOLOGI & RISET' } }
    ]
  } as const;

  const checkScrollBounds = (
    ref: React.RefObject<HTMLDivElement | null>,
    setLeft: (val: boolean) => void,
    setRight: (val: boolean) => void
  ) => {
    if (ref.current) {
      const target = ref.current;
      setLeft(target.scrollLeft > 5);
      setRight(target.scrollLeft + target.clientWidth < target.scrollWidth - 5);
    }
  };

  const handleScroll = (
    ref: React.RefObject<HTMLDivElement | null>,
    setProgress: (val: number) => void,
    setLeft: (val: boolean) => void,
    setRight: (val: boolean) => void
  ) => {
    if (ref.current) {
      const target = ref.current;
      const maxScroll = target.scrollWidth - target.clientWidth;
      if (maxScroll > 0) {
        setProgress(target.scrollLeft / maxScroll);
      } else {
        setProgress(0);
      }
      checkScrollBounds(ref, setLeft, setRight);
    }
  };

  const scrollCarousel = (ref: React.RefObject<HTMLDivElement | null>, direction: 'left' | 'right') => {
    if (ref.current) {
      const scrollAmount = 312; // Card width (280) + gap (32)
      ref.current.scrollBy({
        left: direction === 'left' ? -scrollAmount : scrollAmount,
        behavior: 'smooth'
      });
    }
  };

  // Projects scroll bounds hook
  useEffect(() => {
    if (projectsScrollRef.current) {
      projectsScrollRef.current.scrollTo({ left: 0, behavior: 'smooth' });
    }
    setProjectsProgress(0);
    const timer = setTimeout(() => checkScrollBounds(projectsScrollRef, setCanProjectsScrollLeft, setCanProjectsScrollRight), 200);
    return () => clearTimeout(timer);
  }, [activeProjectsSubCategory]);

  // Blog scroll bounds hook
  useEffect(() => {
    if (blogScrollRef.current) {
      blogScrollRef.current.scrollTo({ left: 0, behavior: 'smooth' });
    }
    setBlogProgress(0);
    const timer = setTimeout(() => checkScrollBounds(blogScrollRef, setCanBlogScrollLeft, setCanBlogScrollRight), 200);
    return () => clearTimeout(timer);
  }, [activeBlogSubCategory]);

  const filteredProjects = projects.filter(p => p.mainCategory === 'project' && p.subCategory === activeProjectsSubCategory);
  const filteredBlogs = projects.filter(p => p.mainCategory === 'blog' && p.subCategory === activeBlogSubCategory);

  // Recalculate bounds when filtered items change
  useEffect(() => {
    const timer = setTimeout(() => checkScrollBounds(projectsScrollRef, setCanProjectsScrollLeft, setCanProjectsScrollRight), 250);
    return () => clearTimeout(timer);
  }, [filteredProjects]);

  useEffect(() => {
    const timer = setTimeout(() => checkScrollBounds(blogScrollRef, setCanBlogScrollLeft, setCanBlogScrollRight), 250);
    return () => clearTimeout(timer);
  }, [filteredBlogs]);

  // Handle window resize for both
  useEffect(() => {
    const checkAll = () => {
      checkScrollBounds(projectsScrollRef, setCanProjectsScrollLeft, setCanProjectsScrollRight);
      checkScrollBounds(blogScrollRef, setCanBlogScrollLeft, setCanBlogScrollRight);
    };
    window.addEventListener('resize', checkAll);
    return () => window.removeEventListener('resize', checkAll);
  }, []);

  const containerVariants = {
    hidden: {},
    visible: {
      transition: {
        staggerChildren: 0.05
      }
    }
  };

  return (
    <Section 
      id="projects" 
      number="05" 
      title={sectionTitle} 
      subtitle={subtitle}
      theme="light"
    >
      
      {/* SECTION 1: PROJECTS */}
      <div className="mb-14 select-none">
        {/* Subsection Header */}
        <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4 mb-6 border-b border-brand-border pb-4">
          <div className="flex items-center gap-2.5">
            <span className="w-1.5 h-3 bg-brand-red animate-pulse" />
            <h3 className="font-mono text-xs sm:text-sm font-black tracking-widest text-brand-black uppercase">
              {language === 'en' ? 'PROJECTS // TECH, DESIGN & MEDIA' : 'PROYEK // TEKNO, DESAIN & MEDIA'}
            </h3>
          </div>

          {/* Subcategory selectors */}
          <div className="flex flex-wrap gap-1.5 p-1 bg-[#0d0d12] border border-neutral-800 rounded-2xl w-fit">
            {subCategories.project.map((subCat) => {
              const isActive = activeProjectsSubCategory === subCat.id;
              const count = projects.filter(p => p.mainCategory === 'project' && p.subCategory === subCat.id).length;
              
              return (
                <button
                  key={subCat.id}
                  onClick={() => setActiveProjectsSubCategory(subCat.id)}
                  className={`group relative px-3.5 py-2 rounded-xl transition-all duration-300 cursor-pointer flex items-center gap-2 overflow-hidden hover:scale-[1.02] active:scale-[0.98] ${
                    isActive 
                      ? 'text-brand-black font-extrabold shadow-sm' 
                      : 'text-neutral-400 hover:text-white bg-transparent border border-transparent'
                  }`}
                >
                  {isActive && (
                    <motion.div
                      layoutId="activeProjectSubTab"
                      className="absolute inset-0 bg-[#e6e6dd] z-0 rounded-xl"
                      transition={{ type: 'spring', stiffness: 350, damping: 28 }}
                    />
                  )}

                  <span className={`relative z-10 w-1.5 h-1.5 rounded-full transition-all duration-300 ${
                    isActive 
                      ? 'bg-brand-red shadow-[0_0_6px_rgba(239,68,68,0.8)] animate-pulse' 
                      : 'bg-neutral-600 group-hover:bg-brand-red/70'
                  }`} />

                  <span className="relative z-10 font-mono text-[9px] sm:text-[10px] tracking-widest">
                    {subCat.label[language]}
                  </span>

                  <span className={`relative z-10 font-mono text-[8px] font-extrabold px-1.5 py-0.5 rounded transition-all duration-300 ${
                    isActive 
                      ? 'text-brand-red bg-brand-black/10' 
                      : 'text-neutral-400 bg-neutral-900 group-hover:text-white group-hover:bg-neutral-800'
                  }`}>
                    {count.toString().padStart(2, '0')}
                  </span>
                </button>
              );
            })}
          </div>
        </div>

        {/* Carousel Viewport Wrapper */}
        <div className="relative group/carousel w-full px-0 md:px-16">
          {/* Floating Left Paddle */}
          <AnimatePresence>
            {canProjectsScrollLeft && (
              <motion.button
                initial={{ opacity: 0, x: -8 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -8 }}
                transition={{ duration: 0.25, ease: "easeOut" }}
                onClick={() => scrollCarousel(projectsScrollRef, 'left')}
                className="absolute left-0 md:left-2 top-[50%] -translate-y-[50%] z-20 w-12 h-12 rounded-xl border border-brand-border hover:border-brand-black bg-brand-bg/85 text-brand-black flex items-center justify-center transition-all duration-300 hover:scale-105 shadow-[0_4px_12px_rgba(0,0,0,0.06)] hover:shadow-[0_4px_20px_rgba(229,57,53,0.18)] cursor-pointer select-none active:scale-95 backdrop-blur-md hidden md:flex"
                aria-label="Scroll Left"
              >
                <ChevronLeft size={22} className="stroke-[2.5] text-brand-black hover:text-brand-red transition-colors" />
              </motion.button>
            )}
          </AnimatePresence>

          {/* Floating Right Paddle */}
          <AnimatePresence>
            {canProjectsScrollRight && (
              <motion.button
                initial={{ opacity: 0, x: 8 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: 8 }}
                transition={{ duration: 0.25, ease: "easeOut" }}
                onClick={() => scrollCarousel(projectsScrollRef, 'right')}
                className="absolute right-0 md:right-2 top-[50%] -translate-y-[50%] z-20 w-12 h-12 rounded-xl border border-brand-border hover:border-brand-black bg-brand-bg/85 text-brand-black flex items-center justify-center transition-all duration-300 hover:scale-105 shadow-[0_4px_12px_rgba(0,0,0,0.06)] hover:shadow-[0_4px_20px_rgba(229,57,53,0.18)] cursor-pointer select-none active:scale-95 backdrop-blur-md hidden md:flex"
                aria-label="Scroll Right"
              >
                <ChevronRight size={22} className="stroke-[2.5] text-brand-black hover:text-brand-red transition-colors" />
              </motion.button>
            )}
          </AnimatePresence>

          {/* Scrollable Container */}
          <div 
            ref={projectsScrollRef}
            onScroll={() => handleScroll(projectsScrollRef, setProjectsProgress, setCanProjectsScrollLeft, setCanProjectsScrollRight)}
            className="w-full overflow-x-auto pb-4 scroll-smooth snap-x snap-mandatory scrollbar-none relative"
            style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
          >
            <div className="relative pt-2 pb-2 w-max flex gap-8 px-4">
              <motion.div
                variants={containerVariants}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, margin: "-50px" }}
                className="flex gap-8 items-start relative z-10"
              >
                <AnimatePresence mode="popLayout">
                  {filteredProjects.map((project, itemIndex) => (
                    <ProjectCard 
                      key={project.id}
                      project={project}
                      itemIndex={itemIndex}
                      language={language}
                    />
                  ))}
                </AnimatePresence>
              </motion.div>
            </div>
          </div>
        </div>

        {/* Scroll Helper & Progress Gauge */}
        <div className="w-full max-w-xl mx-auto mt-6 px-4 select-none font-mono">
          <div className="bg-[#0d0d12] border border-neutral-800 p-3 rounded-2xl flex items-center justify-between gap-4 text-[10px] text-neutral-400 relative">
            <TechCorner position="top-left" size={4} className="border-neutral-800" />
            <TechCorner position="bottom-right" size={4} className="border-neutral-800" />
            
            <button
              onClick={() => scrollCarousel(projectsScrollRef, 'left')}
              disabled={!canProjectsScrollLeft}
              className={`w-8 h-8 border rounded-xl flex items-center justify-center transition-all duration-200 cursor-pointer select-none ${
                canProjectsScrollLeft
                  ? 'border-[#c8c8b8] hover:border-white bg-[#e6e6dd] hover:bg-[#eaeae0] text-brand-black hover:scale-105 active:scale-95 shadow-sm'
                  : 'opacity-10 cursor-not-allowed border-neutral-800 text-neutral-600'
              }`}
              aria-label="Scroll Left"
            >
              <ChevronLeft size={16} className="stroke-[2.5]" />
            </button>

            <div className="flex-1 flex flex-col sm:flex-row sm:items-center justify-between gap-2 text-center sm:text-left">
               <div className="flex items-center gap-2 justify-center sm:justify-start">
                 <span className="relative flex h-2 w-2 shrink-0">
                   <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-brand-red opacity-75"></span>
                   <span className="relative inline-flex rounded-full h-2 w-2 bg-brand-red"></span>
                 </span>
                 <span className="tracking-tight uppercase text-[9px] sm:text-[10px] leading-snug">
                   {language === 'en' 
                     ? 'DRAG CAROUSEL OR CLICK CHEVRONS TO EXPLORE PROJECTS' 
                     : 'SERET CAROUSEL ATAU KLIK TOMBOL UNTUK MENJELAJAHI PROYEK'}
                 </span>
               </div>
               
               <div className="flex items-center gap-2 justify-center sm:justify-end shrink-0">
                 <span className="font-bold text-neutral-350 uppercase text-[9px] sm:text-[10px]">
                   {language === 'en' ? 'PROGRESS:' : 'PROGRES:'}
                 </span>
                 <span className="text-brand-red font-black text-xs min-w-[36px] text-right">
                   {Math.round(projectsProgress * 100)}%
                 </span>
               </div>
            </div>

            <button
              onClick={() => scrollCarousel(projectsScrollRef, 'right')}
              disabled={!canProjectsScrollRight}
              className={`w-8 h-8 border rounded-xl flex items-center justify-center transition-all duration-200 cursor-pointer select-none ${
                canProjectsScrollRight
                  ? 'border-[#c8c8b8] hover:border-white bg-[#e6e6dd] hover:bg-[#eaeae0] text-brand-black hover:scale-105 active:scale-95 shadow-sm'
                  : 'opacity-10 cursor-not-allowed border-neutral-800 text-neutral-600'
              }`}
              aria-label="Scroll Right"
            >
              <ChevronRight size={16} className="stroke-[2.5]" />
            </button>
          </div>

          <div className="w-full h-[6px] bg-neutral-900 rounded-full mt-3 overflow-hidden relative flex items-center">
            <div className="absolute inset-0 flex justify-between px-1 pointer-events-none opacity-20">
              {Array.from({ length: 30 }).map((_, i) => (
                <div key={i} className="h-full w-[1px] bg-white" />
              ))}
            </div>
            <motion.div 
              className="h-full bg-brand-red shadow-[0_0_10px_rgba(239,68,68,0.7)] relative z-10" 
              style={{ width: `${projectsProgress * 100}%` }}
            />
          </div>
        </div>
      </div>


      {/* SECTION 2: BLOG & NEWS */}
      <div className="mt-14 border-t border-brand-border pt-14 select-none">
        {/* Subsection Header */}
        <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4 mb-6 border-b border-brand-border pb-4">
          <div className="flex items-center gap-2.5">
            <span className="w-1.5 h-3 bg-brand-red animate-pulse" />
            <h3 className="font-mono text-xs sm:text-sm font-black tracking-widest text-brand-black uppercase">
              {language === 'en' ? 'BLOG & NEWS // RESEARCH & MILESTONES' : 'BLOG & BERITA // RISET & PENCAPAIAN'}
            </h3>
          </div>

          {/* Subcategory selectors */}
          <div className="flex flex-wrap gap-1.5 p-1 bg-[#0d0d12] border border-neutral-800 rounded-2xl w-fit">
            {subCategories.blog.map((subCat) => {
              const isActive = activeBlogSubCategory === subCat.id;
              const count = projects.filter(p => p.mainCategory === 'blog' && p.subCategory === subCat.id).length;
              
              return (
                <button
                  key={subCat.id}
                  onClick={() => setActiveBlogSubCategory(subCat.id)}
                  className={`group relative px-3.5 py-2 rounded-xl transition-all duration-300 cursor-pointer flex items-center gap-2 overflow-hidden hover:scale-[1.02] active:scale-[0.98] ${
                    isActive 
                      ? 'text-brand-black font-extrabold shadow-sm' 
                      : 'text-neutral-400 hover:text-white bg-transparent border border-transparent'
                  }`}
                >
                  {isActive && (
                    <motion.div
                      layoutId="activeBlogSubTab"
                      className="absolute inset-0 bg-[#e6e6dd] z-0 rounded-xl"
                      transition={{ type: 'spring', stiffness: 350, damping: 28 }}
                    />
                  )}

                  <span className={`relative z-10 w-1.5 h-1.5 rounded-full transition-all duration-300 ${
                    isActive 
                      ? 'bg-brand-red shadow-[0_0_6px_rgba(239,68,68,0.8)] animate-pulse' 
                      : 'bg-neutral-600 group-hover:bg-brand-red/70'
                  }`} />

                  <span className="relative z-10 font-mono text-[9px] sm:text-[10px] tracking-widest">
                    {subCat.label[language]}
                  </span>

                  <span className={`relative z-10 font-mono text-[8px] font-extrabold px-1.5 py-0.5 rounded transition-all duration-300 ${
                    isActive 
                      ? 'text-brand-red bg-brand-black/10' 
                      : 'text-neutral-400 bg-neutral-900 group-hover:text-white group-hover:bg-neutral-800'
                  }`}>
                    {count.toString().padStart(2, '0')}
                  </span>
                </button>
              );
            })}
          </div>
        </div>

        {/* Carousel Viewport Wrapper */}
        <div className="relative group/carousel w-full px-0 md:px-16">
          {/* Floating Left Paddle */}
          <AnimatePresence>
            {canBlogScrollLeft && (
              <motion.button
                initial={{ opacity: 0, x: -8 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -8 }}
                transition={{ duration: 0.25, ease: "easeOut" }}
                onClick={() => scrollCarousel(blogScrollRef, 'left')}
                className="absolute left-0 md:left-2 top-[50%] -translate-y-[50%] z-20 w-12 h-12 rounded-xl border border-brand-border hover:border-brand-black bg-brand-bg/85 text-brand-black flex items-center justify-center transition-all duration-300 hover:scale-105 shadow-[0_4px_12px_rgba(0,0,0,0.06)] hover:shadow-[0_4px_20px_rgba(229,57,53,0.18)] cursor-pointer select-none active:scale-95 backdrop-blur-md hidden md:flex"
                aria-label="Scroll Left"
              >
                <ChevronLeft size={22} className="stroke-[2.5] text-brand-black hover:text-brand-red transition-colors" />
              </motion.button>
            )}
          </AnimatePresence>

          {/* Floating Right Paddle */}
          <AnimatePresence>
            {canBlogScrollRight && (
              <motion.button
                initial={{ opacity: 0, x: 8 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: 8 }}
                transition={{ duration: 0.25, ease: "easeOut" }}
                onClick={() => scrollCarousel(blogScrollRef, 'right')}
                className="absolute right-0 md:right-2 top-[50%] -translate-y-[50%] z-20 w-12 h-12 rounded-xl border border-brand-border hover:border-brand-black bg-brand-bg/85 text-brand-black flex items-center justify-center transition-all duration-300 hover:scale-105 shadow-[0_4px_12px_rgba(0,0,0,0.06)] hover:shadow-[0_4px_20px_rgba(229,57,53,0.18)] cursor-pointer select-none active:scale-95 backdrop-blur-md hidden md:flex"
                aria-label="Scroll Right"
              >
                <ChevronRight size={22} className="stroke-[2.5] text-brand-black hover:text-brand-red transition-colors" />
              </motion.button>
            )}
          </AnimatePresence>

          {/* Scrollable Container */}
          <div 
            ref={blogScrollRef}
            onScroll={() => handleScroll(blogScrollRef, setBlogProgress, setCanBlogScrollLeft, setCanBlogScrollRight)}
            className="w-full overflow-x-auto pb-4 scroll-smooth snap-x snap-mandatory scrollbar-none relative"
            style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
          >
            <div className="relative pt-2 pb-2 w-max flex gap-8 px-4">
              <motion.div
                variants={containerVariants}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, margin: "-50px" }}
                className="flex gap-8 items-start relative z-10"
              >
                <AnimatePresence mode="popLayout">
                  {filteredBlogs.map((project, itemIndex) => (
                    <ProjectCard 
                      key={project.id}
                      project={project}
                      itemIndex={itemIndex}
                      language={language}
                    />
                  ))}
                </AnimatePresence>
              </motion.div>
            </div>
          </div>
        </div>

        {/* Scroll Helper & Progress Gauge */}
        <div className="w-full max-w-xl mx-auto mt-6 px-4 select-none font-mono">
          <div className="bg-[#0d0d12] border border-neutral-800 p-3 rounded-2xl flex items-center justify-between gap-4 text-[10px] text-neutral-400 relative">
            <TechCorner position="top-left" size={4} className="border-neutral-800" />
            <TechCorner position="bottom-right" size={4} className="border-neutral-800" />
            
            <button
              onClick={() => scrollCarousel(blogScrollRef, 'left')}
              disabled={!canBlogScrollLeft}
              className={`w-8 h-8 border rounded-xl flex items-center justify-center transition-all duration-200 cursor-pointer select-none ${
                canBlogScrollLeft
                  ? 'border-[#c8c8b8] hover:border-white bg-[#e6e6dd] hover:bg-[#eaeae0] text-brand-black hover:scale-105 active:scale-95 shadow-sm'
                  : 'opacity-10 cursor-not-allowed border-neutral-800 text-neutral-600'
              }`}
              aria-label="Scroll Left"
            >
              <ChevronLeft size={16} className="stroke-[2.5]" />
            </button>

            <div className="flex-1 flex flex-col sm:flex-row sm:items-center justify-between gap-2 text-center sm:text-left">
              <div className="flex items-center gap-2 justify-center sm:justify-start">
                <span className="relative flex h-2 w-2 shrink-0">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-brand-red opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-2 w-2 bg-brand-red"></span>
                </span>
                <span className="tracking-tight uppercase text-[9px] sm:text-[10px] leading-snug">
                  {language === 'en' 
                    ? 'DRAG CAROUSEL OR CLICK CHEVRONS TO EXPLORE BLOGS' 
                    : 'SERET CAROUSEL ATAU KLIK TOMBOL UNTUK MENJELAJAHI BLOG'}
                </span>
              </div>
              
              <div className="flex items-center gap-2 justify-center sm:justify-end shrink-0">
                <span className="font-bold text-neutral-350 uppercase text-[9px] sm:text-[10px]">
                  {language === 'en' ? 'PROGRESS:' : 'PROGRES:'}
                </span>
                <span className="text-brand-red font-black text-xs min-w-[36px] text-right">
                  {Math.round(blogProgress * 100)}%
                </span>
              </div>
            </div>

            <button
              onClick={() => scrollCarousel(blogScrollRef, 'right')}
              disabled={!canBlogScrollRight}
              className={`w-8 h-8 border rounded-xl flex items-center justify-center transition-all duration-200 cursor-pointer select-none ${
                canBlogScrollRight
                  ? 'border-[#c8c8b8] hover:border-white bg-[#e6e6dd] hover:bg-[#eaeae0] text-brand-black hover:scale-105 active:scale-95 shadow-sm'
                  : 'opacity-10 cursor-not-allowed border-neutral-800 text-neutral-600'
              }`}
              aria-label="Scroll Right"
            >
              <ChevronRight size={16} className="stroke-[2.5]" />
            </button>
          </div>

          <div className="w-full h-[6px] bg-neutral-900 rounded-full mt-3 overflow-hidden relative flex items-center">
            <div className="absolute inset-0 flex justify-between px-1 pointer-events-none opacity-20">
              {Array.from({ length: 30 }).map((_, i) => (
                <div key={i} className="h-full w-[1px] bg-white" />
              ))}
            </div>
            <motion.div 
              className="h-full bg-brand-red shadow-[0_0_10px_rgba(239,68,68,0.7)] relative z-10" 
              style={{ width: `${blogProgress * 100}%` }}
            />
          </div>
        </div>
      </div>

    </Section>
  );
};
