import React, { useRef, useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import type { Variants } from 'framer-motion';
import { portfolioData } from '../config/portfolio';
import { Barcode } from '../components/Barcode';
import { useLanguage } from '../context/LanguageContext';
import { ArrowUpRight } from 'lucide-react';

const HERO_ROLES = [
  {
    title: "AI enthusiast & Developer",
    video: "/assets/vid-mascot-AI Developer.mp4"
  },
  {
    title: "Business Entrepreneur",
    video: "/assets/vid-mascot-businessman.mp4"
  },
  {
    title: "Analyst & Researcher",
    video: "/assets/vid-mascot-Analyst&Researcher.mp4"
  },
  {
    title: "Legal BUMN Contractor",
    video: "/assets/vid-mascot-Contract&Claim.mp4"
  },
  {
    title: "Architect",
    video: "/assets/vid-mascot-Architect.mp4"
  },
  {
    title: "Content Creator",
    video: "/assets/vid-mascot-contentcreator.mp4"
  },
  {
    title: "Designer",
    video: "/assets/vid-mascot-designer.mp4"
  }
];

const YoyoVideo: React.FC<{ src: string; className?: string }> = ({ src, className }) => {
  const videoRef = useRef<HTMLVideoElement>(null);
  const directionRef = useRef<1 | -1>(1); // 1 = forward, -1 = backward
  const animationFrameId = useRef<number | null>(null);

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    let lastTime = performance.now();
    let isSeekingBack = false;

    const stepBackward = () => {
      const currentVideo = videoRef.current;
      if (!currentVideo || directionRef.current !== -1) return;

      const now = performance.now();
      const elapsed = (now - lastTime) / 1000;

      // Throttle: don't seek faster than ~30fps (33ms)
      if (elapsed < 0.033) {
        animationFrameId.current = requestAnimationFrame(stepBackward);
        return;
      }

      lastTime = now;
      // Step back by the elapsed time, capped at 100ms to avoid huge jumps
      const step = Math.min(0.1, elapsed);
      const targetTime = currentVideo.currentTime - step;

      if (targetTime <= 0.05) {
        currentVideo.currentTime = 0;
        directionRef.current = 1;
        isSeekingBack = false;
        currentVideo.play().catch(() => {});
      } else {
        isSeekingBack = true;
        currentVideo.currentTime = targetTime;
      }
    };

    const handleSeeked = () => {
      if (directionRef.current === -1 && isSeekingBack) {
        animationFrameId.current = requestAnimationFrame(stepBackward);
      }
    };

    const handleTimeUpdate = () => {
      const currentVideo = videoRef.current;
      if (!currentVideo) return;
      if (directionRef.current === 1 && currentVideo.duration && currentVideo.currentTime >= currentVideo.duration - 0.08) {
        currentVideo.pause();
        directionRef.current = -1;
        lastTime = performance.now();
        stepBackward();
      }
    };

    const handleEnded = () => {
      const currentVideo = videoRef.current;
      if (!currentVideo) return;
      if (directionRef.current === 1) {
        currentVideo.pause();
        directionRef.current = -1;
        lastTime = performance.now();
        stepBackward();
      }
    };

    video.addEventListener('timeupdate', handleTimeUpdate);
    video.addEventListener('ended', handleEnded);
    video.addEventListener('seeked', handleSeeked);

    video.muted = true;
    video.play().catch(() => {});

    return () => {
      video.removeEventListener('timeupdate', handleTimeUpdate);
      video.removeEventListener('ended', handleEnded);
      video.removeEventListener('seeked', handleSeeked);
      if (animationFrameId.current) {
        cancelAnimationFrame(animationFrameId.current);
      }
    };
  }, [src]);

  return (
    <video
      ref={videoRef}
      src={src}
      className={className}
      muted
      playsInline
      autoPlay
    />
  );
};

export const Hero: React.FC = () => {
  const { personal } = portfolioData;
  const { language } = useLanguage();

  const [activeIndex, setActiveIndex] = useState(0);
  const [displayedText, setDisplayedText] = useState("");
  const [isDeleting, setIsDeleting] = useState(false);

  // Typewriter effect synchronized with mascot changes (each cycle stays comfortably under 8s)
  useEffect(() => {
    let timer: any;
    const currentText = HERO_ROLES[activeIndex].title;

    if (!isDeleting) {
      if (displayedText.length < currentText.length) {
        timer = setTimeout(() => {
          setDisplayedText(currentText.substring(0, displayedText.length + 1));
        }, 50); // 50ms per character to type
      } else {
        // Hold for 4 seconds
        timer = setTimeout(() => {
          setIsDeleting(true);
        }, 4000);
      }
    } else {
      if (displayedText.length > 0) {
        timer = setTimeout(() => {
          setDisplayedText(displayedText.substring(0, displayedText.length - 1));
        }, 30); // 30ms per character to delete
      } else {
        // Switch to the next role
        setIsDeleting(false);
        setActiveIndex((prev) => (prev + 1) % HERO_ROLES.length);
      }
    }

    return () => clearTimeout(timer);
  }, [displayedText, isDeleting, activeIndex]);

  const containerVariants: Variants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.2
      }
    }
  };

  const itemVariants: Variants = {
    hidden: { y: 25, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: { duration: 0.8, ease: [0.16, 1, 0.3, 1] }
    }
  };

  const viewProjectsText = language === 'en' ? 'VIEW PROJECTS' : 'LIHAT PROYEK';
  const contactMeText = language === 'en' ? 'CONTACT ME' : 'HUBUNGI SAYA';

  const designBuildAnimateText = language === 'en' ? 'I DESIGN • BUILD • ANIMATE' : 'SAYA MENDESAIN • MEMBANGUN • ANIMASI';

  return (
    <section 
      id="hero" 
      className="relative min-h-screen pt-4 md:pt-18 pb-16 px-4 md:px-12 flex flex-col justify-between overflow-hidden border-b border-brand-border"
    >
      {/* Background noise filter */}
      <div className="absolute inset-0 bg-noise pointer-events-none z-0" />

      {/* Grid lines background */}
      <div className="absolute inset-0 bg-grid-lines pointer-events-none z-0" />

      {/* Soft circular white fade to hide grid lines behind the mascot */}
      <div className="absolute inset-0 hero-mascot-mask pointer-events-none z-0" />

      {/* Decorative vertical lines */}
      <div className="absolute top-0 left-4 md:left-12 w-[1px] h-full bg-brand-border/40 hidden md:block z-0" />
      <div className="absolute top-0 right-4 md:right-12 w-[1px] h-full bg-brand-border/40 hidden md:block z-0" />

      {/* Vertical Rotated Text Edges */}
      <div className="absolute left-1 md:left-4 top-1/2 -translate-y-1/2 -rotate-90 origin-left font-mono text-xs text-brand-text-secondary select-none tracking-[0.3em] uppercase whitespace-nowrap hidden sm:block">
        RUNNING MODE // <span className="text-brand-red font-bold">ONLINE</span>
      </div>
      <div className="absolute right-1 md:right-4 top-1/2 -translate-y-1/2 rotate-90 origin-right font-mono text-xs text-brand-text-secondary select-none tracking-[0.3em] uppercase whitespace-nowrap hidden sm:block">
        BUILDING DIGITAL FUTURES
      </div>

      {/* Main content container */}
      <div className="max-w-screen-2xl mx-auto w-full flex-grow grid grid-cols-1 lg:grid-cols-12 gap-8 items-start relative z-10 py-4 lg:py-8">
        
        {/* Left Column: Headlines & Actions & Status */}
        <motion.div 
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="lg:col-span-7 flex flex-col justify-center text-left"
        >
          {/* Welcome capsule header */}
          <motion.div 
            variants={itemVariants}
            className="w-max border border-brand-border bg-brand-bg px-3 py-1.5 mb-6 flex items-center gap-2 select-none font-mono text-xs text-brand-black tracking-wider"
          >
            <span className="text-brand-red font-bold text-xs">⬡</span>
            <span>{personal.welcomeMsg[language]}</span>
          </motion.div>

          {/* Main Streetwear Heading */}
          <motion.div variants={itemVariants} className="relative mb-6 select-none font-sans">
            <h1 className="text-6xl sm:text-8xl lg:text-9xl xl:text-[9rem] 2xl:text-[10rem] font-black uppercase tracking-tighter leading-[0.8] text-brand-black flex flex-col">
              <span className="font-mono font-black tracking-tight text-5xl sm:text-7xl lg:text-[7.5rem] xl:text-[8.5rem] 2xl:text-[9.5rem] leading-[0.85] mb-2">PORTFOLIO</span>
              
              {/* Fixed-height single-line Typewriter container to prevent layout shifting and wrapping */}
              <div className="text-2xl sm:text-4xl lg:text-5xl xl:text-6xl 2xl:text-7xl h-[1.3em] flex items-center my-2 select-none">
                <span className="font-black tracking-tighter text-brand-black flex items-center gap-1.5 uppercase whitespace-nowrap">
                  <span>{displayedText}</span>
                  <span className="w-1 h-6 sm:w-1.5 sm:h-10 lg:w-2 lg:h-12 xl:h-14 2xl:h-16 bg-brand-red animate-pulse inline-block" />
                </span>
              </div>

              {/* Mobile Mascot Video Container */}
              <div className="block lg:hidden my-6 w-full max-w-[280px] sm:max-w-[320px] aspect-[3/4] self-center relative overflow-visible">
                <AnimatePresence mode="wait">
                  <motion.div
                    key={activeIndex}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.4, ease: "easeInOut" }}
                    className="relative w-full h-full flex flex-col items-center justify-center"
                  >
                    <div className="mix-blend-multiply flex items-center justify-center w-full h-full">
                      <YoyoVideo 
                        src={HERO_ROLES[activeIndex].video} 
                        className="w-full h-full max-h-[260px] sm:max-h-[300px] object-contain scale-[1.12] origin-top" 
                      />
                    </div>
                    {/* Mascot floor shadow */}
                    <div className="absolute -bottom-6 w-44 h-2.5 bg-brand-black/20 rounded-full blur-[5px] animate-shadow" />
                  </motion.div>
                </AnimatePresence>
              </div>

              <span className="flex items-center flex-wrap gap-2 text-2xl sm:text-4xl lg:text-5xl xl:text-6xl 2xl:text-7xl font-bold tracking-normal leading-normal text-brand-text-secondary mt-2">
                NUGRAHA LABIB MUJADDID
                <span className="w-3.5 h-3.5 bg-brand-red inline-block" />
              </span>
            </h1>
          </motion.div>

          {/* Core capability crosshairs badge */}
          <motion.div variants={itemVariants} className="flex items-start gap-3.5 mb-8 text-left select-none">
            <div className="w-8 h-8 border border-brand-border rounded-full flex items-center justify-center shrink-0 mt-0.5">
              <div className="w-3 h-3 border border-brand-red rounded-full flex items-center justify-center">
                <div className="w-1 h-1 bg-brand-red rounded-full" />
              </div>
            </div>
            <div className="font-mono">
              <div className="text-sm font-bold text-brand-black uppercase tracking-wide">
                {personal.subTagline[language]}
              </div>
              <div className="text-xs text-brand-text-secondary uppercase tracking-widest mt-1">
                {designBuildAnimateText}
              </div>
            </div>
          </motion.div>

          {/* Action CTAs */}
          <motion.div variants={itemVariants} className="flex flex-wrap gap-4 font-mono text-sm select-none">
            {/* View Projects */}
            <a 
              href="#projects" 
              className="bg-brand-black text-brand-bg hover:bg-brand-red transition-colors duration-200 flex items-stretch"
            >
              <div className="bg-brand-red/10 border-r border-brand-bg/15 px-3 flex items-center justify-center">
                <ArrowUpRight size={14} className="stroke-[2.5]" />
              </div>
              <div className="px-5 py-3.5 font-bold uppercase tracking-wider">
                {viewProjectsText}
              </div>
            </a>
            
            {/* Contact Me */}
            <a 
              href="#contact" 
              className="border border-brand-black bg-brand-bg text-brand-black hover:bg-brand-black hover:text-brand-bg transition-colors duration-200 flex items-stretch"
            >
              <div className="px-5 py-3.5 font-bold uppercase tracking-wider border-r border-brand-black">
                {contactMeText}
              </div>
              <div className="px-3 flex items-center justify-center text-brand-red font-bold text-sm">
                ✕
              </div>
            </a>
          </motion.div>
        </motion.div>

        {/* Right Column: Chibi Mascot Video (Borderless & Large Size with Fade Transition) */}
        <div className="lg:col-span-5 hidden lg:flex justify-center items-start relative py-6 lg:self-start lg:-mt-16 xl:-mt-24 lg:-translate-x-2 xl:-translate-x-4 overflow-visible">
          <div className="relative animate-float w-full max-w-[500px] md:max-w-[560px] xl:max-w-[650px] aspect-[3/4] flex flex-col items-center justify-center select-none">
            <AnimatePresence mode="wait">
              <motion.div
                key={activeIndex}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.4, ease: "easeInOut" }}
                className="relative w-full h-full flex flex-col items-center justify-center"
              >
                <div className="mix-blend-multiply flex items-center justify-center w-full h-full">
                  <YoyoVideo 
                    src={HERO_ROLES[activeIndex].video} 
                    className="w-full h-full max-h-[600px] md:max-h-[700px] xl:max-h-[800px] object-contain scale-[1.12] origin-top" 
                  />
                </div>
                {/* Mascot floor shadow */}
                <div className="absolute -bottom-14 w-72 h-4 bg-brand-black/20 rounded-full blur-[8px] animate-shadow" />
              </motion.div>
            </AnimatePresence>
          </div>
        </div>
      </div>

      {/* Bottom Technical Indicators Line */}
      <div className="max-w-screen-2xl mx-auto w-full flex flex-col sm:flex-row justify-between items-center border-t border-brand-border pt-4 font-mono text-xs text-brand-text-secondary select-none relative z-10 gap-4">
        
        {/* Left barcode indicator */}
        <div className="flex items-center gap-3">
          <Barcode value="NUGI-2026-0707" height={15} className="w-24" />
          <span className="text-brand-black font-bold">ID: NUGI-2026-0707</span>
          <span className="text-brand-text-secondary">●</span>
        </div>

        {/* Right technology badges stamp */}
        <div className="flex items-center gap-3 border border-brand-border bg-brand-panel px-3 py-1.5">
          <span className="text-brand-text-secondary uppercase text-[10px] font-bold border-r border-brand-border pr-3 mr-1">
            BUILT WITH PASSION
          </span>
          <div className="flex items-center gap-2.5 font-bold text-brand-black uppercase">
            <span>HTML5</span>
            <span>CSS3</span>
            <span>JS</span>
            <span>REACT</span>
            <span>TAILWIND</span>
            <span>GSAP</span>
          </div>
        </div>
      </div>
    </section>
  );
};
