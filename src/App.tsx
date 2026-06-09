import { useEffect, useState } from 'react';
import { Navbar } from './components/Navbar';
import { Hero } from './sections/Hero';
import { About } from './sections/About';
import { PartnerTicker } from './components/PartnerTicker';
import { WhatIDo } from './sections/WhatIDo';
import { Skills } from './sections/Skills';
import { Timeline } from './sections/Timeline';
import { Projects } from './sections/Projects';
import { Contact } from './sections/Contact';
import { Footer } from './components/Footer';
import { LanguageProvider } from './context/LanguageContext';
import { AIChatWidget } from './components/AIChatWidget';

function App() {
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const [isPointer, setIsPointer] = useState(false);
  const [showCursor, setShowCursor] = useState(false);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setMousePos({ x: e.clientX, y: e.clientY });
    };

    const handlePointerOver = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      const isClickable = 
        target.tagName === 'BUTTON' || 
        target.tagName === 'A' || 
        target.closest('a') || 
        target.closest('button') || 
        target.classList.contains('cursor-pointer');
      setIsPointer(!!isClickable);
    };

    window.addEventListener('mousemove', handleMouseMove);
    document.addEventListener('mouseover', handlePointerOver);

    // Show cursor on first movement
    const handleFirstMove = () => {
      setShowCursor(true);
      window.removeEventListener('mousemove', handleFirstMove);
    };
    window.addEventListener('mousemove', handleFirstMove);

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseover', handlePointerOver);
      window.removeEventListener('mousemove', handleFirstMove);
    };
  }, []);

  return (
    <LanguageProvider>
      <div className="relative min-h-screen bg-brand-bg text-brand-text-primary">
        {/* Custom Retro Cursor */}
        {showCursor && (
          <div 
            className="fixed pointer-events-none z-50 transition-all duration-75 -translate-x-1/2 -translate-y-1/2 hidden md:block"
            style={{ 
              left: `${mousePos.x}px`, 
              top: `${mousePos.y}px` 
            }}
          >
            {isPointer ? (
              // Cyberpunk target cursor on hover
              <div className="relative w-8 h-8 flex items-center justify-center">
                <div className="absolute w-full h-full border border-brand-red rounded-full animate-ping opacity-60" />
                <div className="absolute w-5 h-5 border border-brand-red rounded-full" />
                <div className="w-1.5 h-1.5 bg-brand-red rounded-full" />
              </div>
            ) : (
              // Cyberpunk dot cursor default
              <div className="relative w-5 h-5 flex items-center justify-center">
                <div className="absolute w-full h-full border border-brand-black/30 rounded-full" />
                <div className="w-2 h-2 bg-brand-black" />
              </div>
            )}
          </div>
        )}

        {/* Background Static Noise */}
        <div className="fixed inset-0 bg-noise pointer-events-none z-40" />

        {/* Main Structural Frame */}
        <Navbar />

        <main className="pt-14">
          <Hero />
          <About />
          <PartnerTicker theme="dark" />
          <WhatIDo />
          <Skills />
          <Timeline />
          <Projects />
          <Contact />
        </main>

        <Footer />
        <AIChatWidget />
      </div>
    </LanguageProvider>
  );
}

export default App;
