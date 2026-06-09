import React, { useState, useEffect, useRef } from 'react';
import { useLanguage } from '../context/LanguageContext';
import { motion, AnimatePresence } from 'framer-motion';

// Custom inline SVG icons for zero-dependency reliability
const BotIcon: React.FC = () => (
  <svg className="w-5 h-5 fill-none stroke-current" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
    <path d="M12 8V4H8"/>
    <rect x="2" y="8" width="20" height="12" rx="2"/>
    <path d="M9 14h.01"/>
    <path d="M15 14h.01"/>
  </svg>
);

const CloseIcon: React.FC = () => (
  <svg className="w-4 h-4 fill-none stroke-current" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
    <line x1="18" y1="6" x2="6" y2="18"/>
    <line x1="6" y1="6" x2="18" y2="18"/>
  </svg>
);

const SendIcon: React.FC = () => (
  <svg className="w-4 h-4 fill-none stroke-current" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
    <line x1="22" y1="2" x2="11" y2="13"/>
    <polygon points="22 2 15 22 11 13 2 9 22 2"/>
  </svg>
);

interface Message {
  id: string;
  sender: 'user' | 'ai';
  text: string;
}

export const AIChatWidget: React.FC = () => {
  const { language } = useLanguage();
  const [isOpen, setIsOpen] = useState(false);
  const [hasUnread, setHasUnread] = useState(true);
  const [inputValue, setInputValue] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const [showSuggestions, setShowSuggestions] = useState(true);
  
  const [showPromo, setShowPromo] = useState(false);
  const [promoIndex, setPromoIndex] = useState(0);
  
  const [eyeOffset, setEyeOffset] = useState({ x: 0, y: 0 });
  const [bodyOffset, setBodyOffset] = useState({ x: 0, y: 0 });
  const [isBlinking, setIsBlinking] = useState(false);
  
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const messagesContainerRef = useRef<HTMLDivElement>(null);
  const buttonRef = useRef<HTMLButtonElement>(null);

  // Initial welcome message based on language
  const getWelcomeMessage = (includeNavigation = true): string => {
    const baseText = language === 'en'
      ? "Welcome to Nugi's AI Communication Hub. I am an AI Agent configured to present Nugi's business portfolio, tech engineering, and strategic collaboration channels. Ask me how we architect autonomous AI workflows at Spead AI & AgentBuff, scale F&B/property assets, or discuss corporate & BUMN partnership frameworks!"
      : "Selamat datang di Hub Komunikasi AI Nugi. Saya adalah Agen AI yang dikonfigurasi langsung untuk mempresentasikan portfolio bisnis, rekayasa teknologi, dan peluang kolaborasi strategis bersama Nugi. Tanyakan kepada saya bagaimana kami merancang alur kerja AI otonom di Spead AI & AgentBuff, men-scale bisnis F&B/properti, atau mendiskusikan kemitraan korporasi & BUMN!";

    if (!includeNavigation) return baseText;

    return language === 'en'
      ? baseText + "\n\n" +
        "**Page Navigation Control Room**:\n" +
        "[Home](scroll:hero) [About](scroll:about) [What I Do](scroll:what-i-do) [Skills](scroll:skills) [Journey](scroll:timeline) [Archives](scroll:projects) [Contact](scroll:contact)"
      : baseText + "\n\n" +
        "**Ruang Kendali Navigasi Halaman**:\n" +
        "[Beranda](scroll:hero) [Tentang](scroll:about) [Pekerjaan](scroll:what-i-do) [Keahlian](scroll:skills) [Perjalanan](scroll:timeline) [Arsip](scroll:projects) [Kontak](scroll:contact)";
  };

  const [messages, setMessages] = useState<Message[]>([
    {
      id: 'welcome',
      sender: 'ai',
      text: getWelcomeMessage()
    }
  ]);

  // Synchronize welcome message text when language changes, if chat hasn't started yet
  useEffect(() => {
    if (messages.length === 1 && messages[0].id === 'welcome') {
      setMessages([
        {
          id: 'welcome',
          sender: 'ai',
          text: getWelcomeMessage()
        }
      ]);
    }
  }, [language]);

  // Handle auto-scroll to the bottom of the message container
  useEffect(() => {
    if (isOpen) {
      messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    }
  }, [messages, isTyping, isOpen]);

  // Handle mouse move tracking for eyes and body (instant, brutal tracking)
  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (!buttonRef.current) return;
      
      const rect = buttonRef.current.getBoundingClientRect();
      const centerX = rect.left + rect.width / 2;
      const centerY = rect.top + rect.height / 2;
      
      const dx = e.clientX - centerX;
      const dy = e.clientY - centerY;
      const distance = Math.sqrt(dx * dx + dy * dy);
      
      if (distance === 0) {
        setEyeOffset({ x: 0, y: 0 });
        setBodyOffset({ x: 0, y: 0 });
        return;
      }
      
      // Calculate pull factor - sensitive curve so it pulls instantly
      const maxDistance = 600; // Distance at which movement reaches max
      const pct = Math.min(distance / maxDistance, 1);
      const pull = Math.pow(pct, 0.7); // Highly sensitive power curve for brutal look
      const angle = Math.atan2(dy, dx);
      
      // Max displacement bounds (in pixels)
      const maxEyeOffset = 14;
      const maxBodyOffset = 10;
      
      const targetEyeX = Math.cos(angle) * pull * maxEyeOffset;
      const targetEyeY = Math.sin(angle) * pull * maxEyeOffset;
      
      const targetBodyX = Math.cos(angle) * pull * maxBodyOffset;
      const targetBodyY = Math.sin(angle) * pull * maxBodyOffset;
      
      setEyeOffset({ x: targetEyeX, y: targetEyeY });
      setBodyOffset({ x: targetBodyX, y: targetBodyY });
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
    };
  }, []);

  // Random blink animation loop
  useEffect(() => {
    let timeoutId: number;
    
    const triggerBlink = () => {
      setIsBlinking(true);
      
      setTimeout(() => {
        setIsBlinking(false);
      }, 150);
      
      const nextBlink = 3000 + Math.random() * 4000;
      timeoutId = setTimeout(triggerBlink, nextBlink);
    };
    
    timeoutId = setTimeout(triggerBlink, 3000);
    
    return () => {
      clearTimeout(timeoutId);
    };
  }, []);

  // Revolving suggestions for promo bubble
  const promoSuggestions = language === 'en' ? [
    "Hey there! Ask me how Nugi can scale your business using AI agents! 🚀",
    "Want to see what active startups Nugi is running? Just ask! 🤖",
    "Looking to collaborate on custom AI integrations or marketing? Let's talk! 🤝",
    "Why should you work with Nugi? Let's explore his track record! 💼",
    "Can Nugi automate your workflows? Find out here! ⚙️"
  ] : [
    "Halo! Tanya saya bagaimana Nugi bisa men-scale bisnis Anda dengan AI! 🚀",
    "Penasaran dengan startup aktif yang dikembangkan Nugi? Yuk cari tahu! 🤖",
    "Ingin berkolaborasi membangun sistem AI kustom atau partnership? Hubungi Nugi! 🤝",
    "Kenapa Nugi mitra terbaik untuk inovasi bisnis Anda? Tanyakan di sini! 💼",
    "Bagaimana Nugi mengotomatiskan operasional dengan Agen AI otonom? ⚙️"
  ];

  // Async sequence loop: show popup (7s), hide (3s), cycle to next suggestion, repeat
  useEffect(() => {
    if (isOpen) {
      setShowPromo(false);
      return;
    }

    let isMounted = true;
    let timeoutId: number;

    const runLoop = async () => {
      // Wait initial 5 seconds on load before first popup
      await new Promise((resolve) => {
        timeoutId = setTimeout(resolve, 5000) as unknown as number;
      });
      if (!isMounted || isOpen) return;

      while (isMounted && !isOpen) {
        setShowPromo(true);

        // Keep visible for 7 seconds (reading time)
        await new Promise((resolve) => {
          timeoutId = setTimeout(resolve, 7000) as unknown as number;
        });
        if (!isMounted || isOpen) return;

        setShowPromo(false);

        // Wait 3 seconds in hidden state before next suggestion
        await new Promise((resolve) => {
          timeoutId = setTimeout(resolve, 3000) as unknown as number;
        });
        if (!isMounted || isOpen) return;

        // Change suggestion index
        setPromoIndex((prev) => (prev + 1) % promoSuggestions.length);
      }
    };

    runLoop();

    return () => {
      isMounted = false;
      clearTimeout(timeoutId);
    };
  }, [isOpen, promoSuggestions.length]);

  const toggleChat = () => {
    setIsOpen(!isOpen);
    setShowPromo(false);
    if (hasUnread) {
      setHasUnread(false);
    }
  };

  // Suggestion Prompts List with icons and categories
  const suggestionPrompts = language === 'en' ? [
    { 
      text: "How can Nugi build custom AI workflows for my business? 🤖", 
      icon: "⚙️", 
      category: { en: "AI Automation", id: "Otomatisasi AI" },
      color: "emerald"
    },
    { 
      text: "Tell me more about Spead AI and AgentBuff. 🚀", 
      icon: "🚀", 
      category: { en: "Startups & Ventures", id: "Startup & Bisnis" },
      color: "blue"
    },
    { 
      text: "I want to collaborate! What opportunities are open? 🤝", 
      icon: "🤝", 
      category: { en: "Joint Collaboration", id: "Peluang Kerja Sama" },
      color: "violet"
    },
    { 
      text: "Why should my company partner with Nugi? 💼", 
      icon: "💼", 
      category: { en: "Consultancy & Hire", id: "Konsultasi & Rekrut" },
      color: "amber"
    },
    { 
      text: "Tell me about Nugi's tech content creator channels. 📢", 
      icon: "📢", 
      category: { en: "Branding & Community", id: "Branding & Komunitas" },
      color: "rose"
    },
    { 
      text: "What other businesses does Nugi manage? 🏢", 
      icon: "🏢", 
      category: { en: "F&B & Property Assets", id: "Aset F&B & Properti" },
      color: "cyan"
    },
    {
      text: "How did Nugi grow his TikTok to 140K+ followers? 📈",
      icon: "📈",
      category: { en: "Viral Growth", id: "Pertumbuhan Viral" },
      color: "teal"
    },
    {
      text: "What is Nugi's background and education? 🎓",
      icon: "🎓",
      category: { en: "Origin & Profile", id: "Profil & Latar Belakang" },
      color: "indigo"
    }
  ] : [
    { 
      text: "Bagaimana Nugi membangun sistem AI kustom untuk bisnis saya? 🤖", 
      icon: "⚙️", 
      category: { en: "AI Automation", id: "Otomatisasi AI" },
      color: "emerald"
    },
    { 
      text: "Bisa tolong jelaskan tentang startup Spead AI dan AgentBuff? 🚀", 
      icon: "🚀", 
      category: { en: "Startups & Ventures", id: "Startup & Bisnis" },
      color: "blue"
    },
    { 
      text: "Yuk kolaborasi! Peluang kerja sama apa saja yang dibuka? 🤝", 
      icon: "🤝", 
      category: { en: "Joint Collaboration", id: "Peluang Kerja Sama" },
      color: "violet"
    },
    { 
      text: "Kenapa perusahaan saya harus bermitra dengan Nugi? 💼", 
      icon: "💼", 
      category: { en: "Consultancy & Hire", id: "Konsultasi & Rekrut" },
      color: "amber"
    },
    { 
      text: "Bisa ceritakan tentang channel kreator konten teknologi Nugi? 📢", 
      icon: "📢", 
      category: { en: "Branding & Community", id: "Branding & Komunitas" },
      color: "rose"
    },
    { 
      text: "Bisnis apa lagi yang Nugi kelola selain startup AI? 🏢", 
      icon: "🏢", 
      category: { en: "F&B & Property Assets", id: "Aset F&B & Properti" },
      color: "cyan"
    },
    {
      text: "Bagaimana Nugi mengembangkan TikTok-nya hingga 140 ribu+ pengikut? 📈",
      icon: "📈",
      category: { en: "Viral Growth", id: "Pertumbuhan Viral" },
      color: "teal"
    },
    {
      text: "Bagaimana latar belakang pendidikan dan karir Nugi? 🎓",
      icon: "🎓",
      category: { en: "Origin & Profile", id: "Profil & Latar Belakang" },
      color: "indigo"
    }
  ];

  // Helper for card design color mappings
  const getColorClasses = (color: string) => {
    switch (color) {
      case 'emerald':
        return {
          border: 'hover:border-emerald-500/50 border-neutral-800/80',
          bg: 'hover:bg-emerald-950/20 bg-[#141417]/60',
          text: 'text-neutral-200 group-hover:text-emerald-400',
          pill: 'bg-emerald-500/10 text-emerald-400 border border-emerald-500/20',
          shadow: 'group-hover:shadow-[0_0_15px_rgba(16,185,129,0.15)]'
        };
      case 'blue':
        return {
          border: 'hover:border-blue-500/50 border-neutral-800/80',
          bg: 'hover:bg-blue-950/20 bg-[#141417]/60',
          text: 'text-neutral-200 group-hover:text-blue-400',
          pill: 'bg-blue-500/10 text-blue-400 border border-blue-500/20',
          shadow: 'group-hover:shadow-[0_0_15px_rgba(59,130,246,0.15)]'
        };
      case 'violet':
        return {
          border: 'hover:border-violet-500/50 border-neutral-800/80',
          bg: 'hover:bg-violet-950/20 bg-[#141417]/60',
          text: 'text-neutral-200 group-hover:text-violet-400',
          pill: 'bg-violet-500/10 text-violet-400 border border-violet-500/20',
          shadow: 'group-hover:shadow-[0_0_15px_rgba(139,92,246,0.15)]'
        };
      case 'amber':
        return {
          border: 'hover:border-amber-500/50 border-neutral-800/80',
          bg: 'hover:bg-amber-950/20 bg-[#141417]/60',
          text: 'text-neutral-200 group-hover:text-amber-400',
          pill: 'bg-amber-500/10 text-amber-400 border border-amber-500/20',
          shadow: 'group-hover:shadow-[0_0_15px_rgba(245,158,11,0.15)]'
        };
      case 'rose':
        return {
          border: 'hover:border-rose-500/50 border-neutral-800/80',
          bg: 'hover:bg-rose-950/20 bg-[#141417]/60',
          text: 'text-neutral-200 group-hover:text-rose-400',
          pill: 'bg-rose-500/10 text-rose-400 border border-rose-500/20',
          shadow: 'group-hover:shadow-[0_0_15px_rgba(244,63,94,0.15)]'
        };
      case 'cyan':
        return {
          border: 'hover:border-cyan-500/50 border-neutral-800/80',
          bg: 'hover:bg-cyan-950/20 bg-[#141417]/60',
          text: 'text-neutral-200 group-hover:text-cyan-400',
          pill: 'bg-cyan-500/10 text-cyan-400 border border-cyan-500/20',
          shadow: 'group-hover:shadow-[0_0_15px_rgba(6,182,212,0.15)]'
        };
      case 'teal':
        return {
          border: 'hover:border-teal-500/50 border-neutral-800/80',
          bg: 'hover:bg-teal-950/20 bg-[#141417]/60',
          text: 'text-neutral-200 group-hover:text-teal-400',
          pill: 'bg-teal-500/10 text-teal-400 border border-teal-500/20',
          shadow: 'group-hover:shadow-[0_0_15px_rgba(20,184,166,0.15)]'
        };
      case 'indigo':
      default:
        return {
          border: 'hover:border-indigo-500/50 border-neutral-800/80',
          bg: 'hover:bg-indigo-950/20 bg-[#141417]/60',
          text: 'text-neutral-200 group-hover:text-indigo-400',
          pill: 'bg-indigo-500/10 text-indigo-400 border border-indigo-500/20',
          shadow: 'group-hover:shadow-[0_0_15px_rgba(99,102,241,0.15)]'
        };
    }
  };

  // AI Mock Engine - Matches keywords to return high-quality answers with rich markdown elements (tables, code, buttons)
  const generateAIResponse = (userText: string): string => {
    const text = userText.toLowerCase();
    
    // 1. Startups & Business Ventures (Spead AI, AgentBuff, Joki Hidup, property, F&B, LAB.in Studio)
    if (
      text.includes('spead') || 
      text.includes('agentbuff') || 
      text.includes('startup') || 
      text.includes('bisnis') || 
      text.includes('venture') || 
      text.includes('proyek') || 
      text.includes('project') || 
      text.includes('karya') ||
      text.includes('joki hidup') ||
      text.includes('properti') ||
      text.includes('property') ||
      text.includes('gultik') ||
      text.includes('masnug') ||
      text.includes('mutiara 27') ||
      text.includes('sewa') ||
      text.includes('f&b') ||
      text.includes('aset') ||
      text.includes('asset')
    ) {
      return language === 'en'
        ? "Here is the comprehensive operational catalog of Nugi's active ventures and business assets:\n\n" +
          "| Venture / Asset | Role | Core Innovation & Operational Scale |\n" +
          "| :--- | :--- | :--- |\n" +
          "| **Spead AI** | Founder & Strategy | Modular AI systems for the Expertise Economy. Selected for the **Google for Startups Cloud Program 2025**. Engineered contextual RAG models to reduce document reporting time by 87% (5 hours to ~40 minutes). |\n" +
          "| **AgentBuff** | Founder & Architect | Autonomous digital workforce marketplace. Distributes self-evolving AI virtual assistants (Shila PA, Money Manager, AI Curhat, AI Tugas) to automate SMB & student workflows. |\n" +
          "| **Joki Hidup** | Co-Founder / Lead | Premium intellectual task delegation platform. Connects a verified network of S2/Cumlaude academic writers with executive clients. |\n" +
          "| **Mutiara 27** | Asset Director | Real estate operations managing 100+ co-living units. Optimized occupancy and automated payment reminder systems. |\n" +
          "| **Gultik Masnug** | Franchise Owner | F&B culinary retail. Modernized traditional F&B supply chains and deployed digital local marketing campaigns. |\n" +
          "| **LAB.in Studio** | Lead Architect | 3D architectural visualization studio. Directing 4 freelance designers for commercial facility layouts and renders. |\n\n" +
          "Explore details of these active operations across my digital universe:\n" +
          "[View Active Productivity](scroll:what-i-do) [Explore Creative Archives](scroll:projects)\n\n" +
          "💬 *Interested in piloting our AI tools, co-founding ventures, or discussing real estate assets?*\n" +
          "[Send Direct Email](mailto:nugrahalabib@gmail.com) [Secure Message Terminal](scroll:contact)"
        : "Berikut adalah katalog operasional lengkap dari unit bisnis aktif dan portofolio aset yang dikelola secara langsung oleh Nugi:\n\n" +
          "| Bisnis / Aset | Peran | Inovasi Utama & Skala Operasional |\n" +
          "| :--- | :--- | :--- |\n" +
          "| **Spead AI** | Founder & Strategis | Ekosistem AI Modular untuk ekonomi keahlian. Terpilih dalam **Google for Startups Cloud Program 2025**. Memangkas waktu pengerjaan berkas korporasi sebesar 87% (dari 5 jam menjadi ~40 menit). |\n" +
          "| **AgentBuff** | Founder & Arsitek | Marketplace tenaga kerja digital otonom. Menyediakan jajaran asisten virtual mandiri (Shila PA, Money Manager, AI Curhat, AI Tugas) untuk UMKM & mahasiswa. |\n" +
          "| **Joki Hidup** | Co-Founder / Lead | Platform delegasi bantuan intelektual premium. Menghubungkan jaringan penulis S2/Cumlaude dengan klien eksekutif. |\n" +
          "| **Mutiara 27** | Pengelola Aset | Operasional real estate hunian sewa komersil berkapasitas 100+ pintu. Optimalisasi arus kas & otomatisasi reminder tagihan. |\n" +
          "| **Gultik Masnug** | Pemilik Waralaba | Bisnis retail kuliner tradisional. Standardisasi rantai pasok F&B lokal dan pemasaran digital berbasis tren Gen-Z. |\n" +
          "| **LAB.in Studio** | Arsitek Utama | Studio jasa desain & visualisasi arsitektur 3D. Memimpin 4 desainer lepas untuk layout bangunan komersial & resort. |\n\n" +
          "Jelajahi visualisasi dan detail operasional bisnis ini pada portofolio:\n" +
          "[Lihat Bidang Produktivitas](scroll:what-i-do) [Eksplorasi Arsip Karya](scroll:projects)\n\n" +
          "💬 *Tertarik melakukan uji coba pilot AI, investasi ventura, atau menjajaki operasional F&B dan properti?*\n" +
          "[Kirim Email Langsung](mailto:nugrahalabib@gmail.com) [Formulir Kontak Aman](scroll:contact)";
    }
    
    // 2. Custom AI, Automations, Scaling, and GCP cloud systems
    if (
      text.includes('otomatis') || 
      text.includes('scale') || 
      text.includes('kustom') || 
      text.includes('workflow') || 
      text.includes('system') || 
      text.includes('sistem') || 
      text.includes('gcp') || 
      text.includes('google cloud') || 
      text.includes('automation') || 
      text.includes('custom') ||
      text.includes('kemampuan') ||
      text.includes('keahlian') ||
      text.includes('skill') ||
      text.includes('stack')
    ) {
      return language === 'en'
        ? "Nugi builds production-grade agentic AI ecosystems and automated workflows designed to solve enterprise process bottlenecks. Here is his technical competency matrix:\n\n" +
          "| Engineering Domain | Core Specialization | Technical Stack |\n" +
          "| :--- | :--- | :--- |\n" +
          "| **Agentic Loops** | Multi-agent state orchestration, self-correcting routers, and cyclical graph reasoning. | LangGraph, n8n, Flowise, Python |\n" +
          "| **Semantic RAG** | Vector embeddings, contextual document indexing, metadata chunking, and semantic lookup. | Pinecone, OpenAI API, LangChain, FAISS |\n" +
          "| **Cloud & Infra** | Serverless deployments, secure containerization, API development, and automated pipelines. | Google Cloud Platform (GCP), Docker, React/TS, Node.js |\n" +
          "| **Audience Ops** | Translating technical capabilities into viral educational pipelines & DevRel campaigns. | TikTok content marketing, Figma, audience metrics |\n\n" +
          "Here is a production-level Python implementation of a self-correcting RAG workflow inside LangGraph:\n\n" +
          "```python\n" +
          "# self-correcting RAG node with LangGraph state validation\n" +
          "from typing import Dict, TypedDict\n" +
          "from langgraph.graph import END, StateGraph\n\n" +
          "class GraphState(TypedDict):\n" +
          "    query: str\n" +
          "    context: str\n" +
          "    generation: str\n" +
          "    score: float\n\n" +
          "def validate_and_route(state: GraphState) -> Dict:\n" +
          "    # 1. Fetch contextual chunk embeddings from Vector Store\n" +
          "    docs = vector_db.similarity_search(state[\"query\"], k=3)\n" +
          "    context = \"\\n\".join([d.page_content for d in docs])\n" +
          "    \n" +
          "    # 2. Invoke LLM generation chain\n" +
          "    response = llm_chain.invoke({\"query\": state[\"query\"], \"context\": context})\n" +
          "    \n" +
          "    # 3. Compute relevance evaluation score\n" +
          "    score = evaluator_chain.invoke({\"generation\": response, \"context\": context})\n" +
          "    \n" +
          "    # 4. Trigger self-correction loop if below accuracy threshold\n" +
          "    if score.relevance_score < 0.85:\n" +
          "        return {\"context\": context, \"generation\": \"Triggering fallback query expansion...\", \"score\": score.relevance_score}\n" +
          "        \n" +
          "    return {\"context\": context, \"generation\": response, \"score\": score.relevance_score}\n" +
          "```\n\n" +
          "📈 *Need an audit of your business operations to deploy custom agents or automate contracts? Let's connect.*\n" +
          "[Book a Strategy Call](mailto:nugrahalabib@gmail.com) [View Skills Matrix](scroll:skills)"
        : "Nugi membangun ekosistem AI otonom (Agentic AI) dan otomatisasi alur kerja tingkat produksi untuk mengatasi inefisiensi operasional. Berikut adalah matriks kompetensi teknisnya:\n\n" +
          "| Domain Rekayasa | Spesialisasi Utama | Teknologi / Stack |\n" +
          "| :--- | :--- | :--- |\n" +
          "| **Alur Kerja Agen** | Orkestrasi multi-agent, logika perutean mandiri (self-correcting), & grafik keputusan dinamis. | LangGraph, n8n, Flowise, Python |\n" +
          "| **Semantic RAG** | Vektor embeddings, pengindeksan dokumen kontekstual, pemotongan metadata, & pencarian semantik. | Pinecone, OpenAI API, LangChain, FAISS |\n" +
          "| **Cloud & Infra** | Serverless hosting, kontainerisasi Docker, pengembangan API, & orkestrasi pipeline cloud. | Google Cloud Platform (GCP), Docker, React/TS, Node.js |\n" +
          "| **Audience Ops** | Menerjemahkan alur kerja teknologi rumit menjadi pipeline edukasi viral & kampanye DevRel. | Pemasaran konten TikTok, Figma, metrik retensi |\n\n" +
          "Berikut adalah contoh kode Python yang merepresentasikan alur kerja RAG mandiri yang mengoreksi diri dalam LangGraph:\n\n" +
          "```python\n" +
          "# self-correcting RAG node dengan validasi status LangGraph\n" +
          "from typing import Dict, TypedDict\n" +
          "from langgraph.graph import END, StateGraph\n\n" +
          "class GraphState(TypedDict):\n" +
          "    query: str\n" +
          "    context: str\n" +
          "    generation: str\n" +
          "    score: float\n\n" +
          "def validate_and_route(state: GraphState) -> Dict:\n" +
          "    # 1. Ambil dokumen relevan dari Vector Store\n" +
          "    docs = vector_db.similarity_search(state[\"query\"], k=3)\n" +
          "    context = \"\\n\".join([d.page_content for d in docs])\n" +
          "    \n" +
          "    # 2. Jalankan instruksi LLM untuk merangkum berkas\n" +
          "    response = llm_chain.invoke({\"query\": state[\"query\"], \"context\": context})\n" +
          "    \n" +
          "    # 3. Evaluasi kesesuaian konteks dengan jawaban\n" +
          "    score = evaluator_chain.invoke({\"generation\": response, \"context\": context})\n" +
          "    \n" +
          "    # 4. Pemicu koreksi otomatis jika skor relevansi kurang dari threshold\n" +
          "    if score.relevance_score < 0.85:\n" +
          "        return {\"context\": context, \"generation\": \"Menjalankan ekspansi kueri fallback...\", \"score\": score.relevance_score}\n" +
          "        \n" +
          "    return {\"context\": context, \"generation\": response, \"score\": score.relevance_score}\n" +
          "```\n\n" +
          "📈 *Butuh audit alur kerja operasional perusahaan Anda untuk memangkas inefisiensi administrasi? Mari berdiskusi.*\n" +
          "[Jadwalkan Konsultasi](mailto:nugrahalabib@gmail.com) [Lihat Matriks Keahlian](scroll:skills)";
    }
    
    // 3. Content Creation & Social Media & Branding & TikTok
    if (
      text.includes('tiktok') ||
      text.includes('kreator') ||
      text.includes('creator') ||
      text.includes('konten') ||
      text.includes('content') ||
      text.includes('viral') ||
      text.includes('branding') ||
      text.includes('followers') ||
      text.includes('pengikut') ||
      text.includes('komunitas') ||
      text.includes('community')
    ) {
      return language === 'en'
        ? "Nugi is a leading Tech Content Creator and Developer Relations (DevRel) strategist, managing a highly engaged technology community:\n\n" +
          "| Platform / Campaign | Audience Reach | Core Target Audience |\n" +
          "| :--- | :--- | :--- |\n" +
          "| **TikTok (@nugrahalabib)** | **140K+ Followers** / **40M+ Views** | Tech professionals, software developers, and F&B/property founders. |\n" +
          "| **Dating with Technology** | Viral Storytelling Playbook | Conceptual content translating complex technical topics (AI models, system architectures) into engaging stories. |\n" +
          "| **Brand Activations** | High-Conversion Campaigns | Tech activations with global/local brands including ASUS, Philips, Bibit, and Bardi. |\n\n" +
          "Nugi structures content creation as an engineering funnel: optimization of initial 3-second hook ratios, detail analysis of audience retention graphs, and conversion targets to drive SaaS signups or DevRel API adoption.\n\n" +
          "Explore visual case studies and branding dossiers in my portfolio:\n" +
          "[Explore Creative Archives](scroll:projects) [Secure Message Terminal](scroll:contact)\n\n" +
          "📢 *Want to promote your SaaS application, AI API, developer platform, or consumer hardware to 140K+ active tech enthusiasts?*\n" +
          "[Book Sponsorship](mailto:nugrahalabib@gmail.com)"
        : "Nugi adalah seorang Kreator Konten Teknologi terkemuka dan spesialis Developer Relations (DevRel) dengan jangkauan audiens teknologi yang loyal:\n\n" +
          "| Platform / Kemitraan | Jangkauan Audiens | Fokus Target Demografis |\n" +
          "| :--- | :--- | :--- |\n" +
          "| **TikTok (@nugrahalabib)** | **140K+ Pengikut** / **40M+ Views** | Developer, insinyur perangkat lunak, dan wirausahawan muda F&B/properti. |\n" +
          "| **Pacaran dengan Teknologi** | Seri Video Viral Terstruktur | Konten edukatif yang menyederhanakan alur teknologi rumit (sistem AI, arsitektur cloud) menjadi cerita menarik. |\n" +
          "| **DevRel & Sponsor** | Aktivasi Merek Strategis | Kampanye sponsorship terarah bersama ASUS, Philips, Bibit, dan Bardi. |\n\n" +
          "Nugi mengelola kreasi konten dengan pendekatan corong teknik (funnel engineering): otomatisasi rasio hook 3 detik awal, analisis retensi grafik penonton, serta penargetan konversi langsung ke registrasi SaaS atau implementasi API.\n\n" +
          "Pelajari portofolio visual dan studi kasus pertumbuhan konten di halaman portofolio:\n" +
          "[Lihat Arsip Karya](scroll:projects) [Hubungi Lewat Formulir](scroll:contact)\n\n" +
          "📢 *Tertarik memperkenalkan aplikasi SaaS, API kecerdasan buatan, platform developer, atau hardware Anda ke komunitas tech kami?*\n" +
          "[Pesan Kemitraan Sponsor](mailto:nugrahalabib@gmail.com)";
    }
    
    // 4. Collaborations, Opportunities, Partnerships, Hiring, and Contact
    if (
      text.includes('collab') || 
      text.includes('kerja sama') || 
      text.includes('mitra') || 
      text.includes('hubungi') || 
      text.includes('kontak') || 
      text.includes('hire') || 
      text.includes('rekrut') || 
      text.includes('email') || 
      text.includes('contact') || 
      text.includes('partnership') || 
      text.includes('opportunity') || 
      text.includes('peluang') ||
      text.includes('partner') ||
      text.includes('perusahaan') ||
      text.includes('company') ||
      text.includes('bermitra')
    ) {
      return language === 'en'
        ? "Nugi offers structured, business-ready collaboration frameworks to align with enterprise, startup, and digital branding objectives:\n\n" +
          "| Engagement Model | Scope of Work | Current Slot Availability |\n" +
          "| :--- | :--- | :--- |\n" +
          "| **Enterprise AI Integration** | Workflows audit, custom n8n/LangGraph autonomous agents, and RAG database setup. | **2 Slots Open for Q3/Q4** |\n" +
          "| **Venture Pilot Testing** | Running Spead AI pilot test sandboxes inside corporate or BUMN environments. | **1 Active Slot** |\n" +
          "| **Tech DevRel Campaign** | Sponsored product reviews, TikTok campaigns, and developer community outreach. | **Open Monthly (Selective)** |\n" +
          "| **Consultancy & Advisory** | New ventures validation, business model study, and product-market fit consulting. | **Selective Contract Basis** |\n\n" +
          "Let's partner together to build high-performance systems and profitable ventures:\n" +
          "[Secure Message Terminal](scroll:contact) [Send Direct Email](mailto:nugrahalabib@gmail.com)\n\n" +
          "📬 **Secure Communication Ports**:\n" +
          "• Email: **nugrahalabib@gmail.com**\n" +
          "• Target Location: Jakarta, Indonesia (Open to global remote and selective travel)\n" +
          "• Professional Network: [Connect on LinkedIn](url:https://www.linkedin.com/in/nugrahalabib/)"
        : "Nugi menawarkan model kolaborasi bisnis terstruktur yang siap dijalankan bersama institusi korporasi, BUMN, maupun startup:\n\n" +
          "| Model Kerja Sama | Cakupan Pekerjaan / Output | Ketersediaan Slot Saat Ini |\n" +
          "| :--- | :--- | :--- |\n" +
          "| **Integrasi AI Enterprise** | Audit operasional bisnis, integrasi agen otonom n8n/LangGraph, & setup database vektor RAG. | **2 Slot Terbuka Q3/Q4** |\n" +
          "| **Uji Coba Pilot Ventura** | Implementasi sandbox / pilot project Spead AI pada operasional korporat & BUMN. | **1 Slot Aktif** |\n" +
          "| **Tech DevRel Campaign** | Video review produk teknologi, kampanye TikTok, & aktivasi komunitas pengembang. | **Terbuka Setiap Bulan (Selektif)** |\n" +
          "| **Konsultasi & Advisory** | Validasi ide bisnis baru (new venture), studi kelayakan bisnis, & strategi product-market fit. | **Kontrak Selektif** |\n\n" +
          "Mari berkolaborasi membangun ekosistem bisnis dan rekayasa otomatisasi masa depan:\n" +
          "[Formulir Kontak Aman](scroll:contact) [Kirim Email Langsung](mailto:nugrahalabib@gmail.com)\n\n" +
          "📬 **Saluran Komunikasi Langsung**:\n" +
          "• Surel: **nugrahalabib@gmail.com**\n" +
          "• Lokasi Utama: Jakarta, Indonesia (Terbuka untuk proyek remote & hybrid global)\n" +
          "• Hubungan Profesional: [Hubungan di LinkedIn](url:https://www.linkedin.com/in/nugrahalabib/)";
    }
    
    // 5. Bio & Who is Nugi (Profile & Education & Waskita BUMN Contracts)
    if (
      text.includes('who') || 
      text.includes('siapa') || 
      text.includes('nugi') || 
      text.includes('tentang') || 
      text.includes('profile') || 
      text.includes('curriculum') || 
      text.includes('cv') ||
      text.includes('pendidikan') || 
      text.includes('edukasi') || 
      text.includes('background') || 
      text.includes('sekolah') || 
      text.includes('lulusan') || 
      text.includes('prasetiya') || 
      text.includes('kuliah') || 
      text.includes('gelar') || 
      text.includes('degree') || 
      text.includes('karir') || 
      text.includes('career') || 
      text.includes('asal') || 
      text.includes('biodata') ||
      text.includes('waskita') ||
      text.includes('bumn') ||
      text.includes('kontrak') ||
      text.includes('legal') ||
      text.includes('klaim') ||
      text.includes('claim')
    ) {
      return language === 'en'
        ? "Nugraha Labib Mujaddid (Nugi) is a Jakarta-based AI Founder, Agentic Engineer, and Multidisciplinary Entrepreneur. Here is his professional timeline and academic credentials:\n\n" +
          "| Organization / Institution | Role | Focus & Core Achievements |\n" +
          "| :--- | :--- | :--- |\n" +
          "| **Prasetiya Mulya University** | MM New Ventures Innovation | Specialized in Business Strategy, Venture Scaling, and Product-Market Fit. Graduated with a **3.50 GPA**. |\n" +
          "| **Spead AI & AgentBuff** | Startup Founder | Selected for the Google for Startups Cloud Program. Building enterprise AI agents and modular digital workforces. |\n" +
          "| **PT Waskita Karya (Persero) Tbk** | Claim & Contract Specialist | Managed BUMN legal contract compliance, risk mitigation, and mediation for mega-infrastructure disputes. |\n" +
          "| **Caliana Indonesia** | Strategic Initiative Analyst | Worked directly under the CEO to design DNA Academy and Kediri Municipal smart city proposals. |\n" +
          "| **LAB.in Studio** | Lead Architect | Spearheaded a 3D architectural design studio, managing a team of 4 freelance visualizers. |\n" +
          "| **Diponegoro University (Undip)** | Bachelor of Architecture | Graduated **Cumlaude (GPA: 3.65)**. Focus: Green Building design and complex space optimization. |\n\n" +
          "Nugi's core competitive advantage lies in his ability to act as a bridge: combining **advanced software engineering** (LangGraph, Python), **strategic business models** (MM Innovation), and **rigorous contract compliance** (BUMN construction management).\n\n" +
          "Check Nugi's comprehensive career timeline and credentials:\n" +
          "[View Journey Timeline](scroll:timeline) [Direct Contact Console](scroll:contact)\n\n" +
          "💼 *Looking for a strategic tech leader who understands corporate structures and product scaling? Let's connect.*\n" +
          "[Connect on LinkedIn](url:https://www.linkedin.com/in/nugrahalabib/) [Email Nugi](mailto:nugrahalabib@gmail.com)"
        : "Nugraha Labib Mujaddid (Nugi) adalah seorang AI Founder, Insinyur Agen Otonom, dan Wirausahawan Multidisiplin berbasis di Jakarta. Berikut adalah riwayat karir dan latar belakang akademisnya:\n\n" +
          "| Perusahaan / Institusi | Peran / Bidang | Fokus & Pencapaian Utama |\n" +
          "| :--- | :--- | :--- |\n" +
          "| **Universitas Prasetiya Mulya** | MM New Ventures Innovation | Studi kelayakan bisnis, strategi penskalaan ventura baru, & model PMF. Lulus dengan **IPK 3.50**. |\n" +
          "| **Spead AI & AgentBuff** | Founder & Developer | Terpilih dalam Google for Startups Cloud Program. Membangun AI RAG korporat & tenaga kerja digital. |\n" +
          "| **PT Waskita Karya (Persero) Tbk** | Spesialis Klaim & Kontrak | Manajemen kepatuhan kontrak hukum, mitigasi risiko sengketa mega-proyek infrastruktur BUMN. |\n" +
          "| **Caliana Indonesia** | Analis Inisiatif Strategis | Bekerja langsung di bawah CEO untuk penyusunan DNA Academy & proposal smart city Pemkot Kediri. |\n" +
          "| **LAB.in Studio** | Arsitek Utama | Mendirikan studio desain visualisasi arsitektur 3D dengan koordinasi 4 desainer lepas. |\n" +
          "| **Universitas Diponegoro (Undip)** | Sarjana Arsitektur | Lulus predikat kehormatan **Cumlaude (IPK 3.65)**. Spesialisasi desain Green Building & tata ruang. |\n\n" +
          "Kombinasi unik Nugi terletak pada kemampuannya untuk menjembatani **rekayasa perangkat lunak canggih** (LangGraph, Python), **desain & pemodelan bisnis** (MM Innovation), serta **kepatuhan hukum & risiko korporasi** (kontrak infrastruktur BUMN).\n\n" +
          "Simak perjalanan lengkap dan riwayat sertifikasi Nugi di lini masa:\n" +
          "[Lihat Perjalanan Karir](scroll:timeline) [Buka Konsol Kontak](scroll:contact)\n\n" +
          "💼 *Mencari pemimpin teknis strategis yang memahami manajemen risiko korporasi dan penskalaan produk? Hubungi Nugi.*\n" +
          "[Hubungkan di LinkedIn](url:https://www.linkedin.com/in/nugrahalabib/) [Email Nugi](mailto:nugrahalabib@gmail.com)";
    }
    
    // Default Fallback
    return language === 'en'
      ? "I am Nugi's AI Agent. How can I assist you? You can query Nugi's database about:\n" +
        "• **Spead AI & AgentBuff** (our active AI startups and cloud integrations)\n" +
        "• **Agentic AI & Custom Automations** (LangGraph pipelines, n8n workflows, Python code)\n" +
        "• **Tech Storytelling & TikTok Growth** (140K+ audience, ASUS/Philips campaigns)\n" +
        "• **PT Waskita Karya BUMN Contracts** (claims mitigation and legal structures)\n" +
        "• **Prasetiya Mulya MM Innovation & Undip Architecture** (academics & business theories)\n" +
        "• **Mutiara 27 & Soto Masnug** (operations of property assets and food franchises)\n\n" +
        "Or navigate directly to any page section:\n" +
        "[Home](scroll:hero) [About](scroll:about) [What I Do](scroll:what-i-do) [Skills](scroll:skills) [Journey](scroll:timeline) [Archives](scroll:projects) [Contact](scroll:contact)\n\n" +
        "Or establish a direct secure communication port:\n" +
        "[Secure Message Terminal](scroll:contact) [Send Direct Email](mailto:nugrahalabib@gmail.com)"
      : "Saya adalah Agen AI Nugi. Ada yang bisa saya bantu? Anda dapat menanyakan tentang:\n" +
        "• **Spead AI & AgentBuff** (startup AI aktif dan integrasi cloud)\n" +
        "• **Agentic AI & Otomatisasi Kustom** (pipeline LangGraph, workflow n8n, kode Python)\n" +
        "• **Tech Storytelling & TikTok Creator** (140 ribu+ pengikut, kampanye ASUS/Philips)\n" +
        "• **Kontrak BUMN PT Waskita Karya** (mitigasi klaim hukum & struktur kontrak)\n" +
        "• **MM Inovasi Prasetiya Mulya & Arsitektur Undip** (pendidikan & analisis kelayakan bisnis)\n" +
        "• **Mutiara 27 & Soto Masnug** (operasional aset properti dan waralaba kuliner)\n\n" +
        "Atau arahkan langsung ke bagian halaman tertentu:\n" +
        "[Beranda](scroll:hero) [Tentang](scroll:about) [Pekerjaan](scroll:what-i-do) [Keahlian](scroll:skills) [Perjalanan](scroll:timeline) [Arsip](scroll:projects) [Kontak](scroll:contact)\n\n" +
        "Atau hubungi Nugi secara aman:\n" +
        "[Buka Konsol Kontak](scroll:contact) [Kirim Email Langsung](mailto:nugrahalabib@gmail.com)";
  };

  const handleActionClick = (type: string, payload: string) => {
    if (type === 'scroll') {
      const element = document.getElementById(payload);
      if (element) {
        element.scrollIntoView({ behavior: 'smooth' });
        setIsOpen(false);
      }
    } else if (type === 'action') {
      if (payload === 'contact') {
        const element = document.getElementById('contact');
        if (element) {
          element.scrollIntoView({ behavior: 'smooth' });
          setIsOpen(false);
        }
      }
    }
  };

  const handleSendMessage = (text: string) => {
    if (!text.trim()) return;
    
    // Add user message
    const userMsgId = `user-${Date.now()}`;
    const userMessage: Message = {
      id: userMsgId,
      sender: 'user',
      text
    };
    
    setMessages(prev => [...prev, userMessage]);
    setInputValue('');
    setIsTyping(true);

    // Simulate AI response delay
    setTimeout(() => {
      const aiResponseText = generateAIResponse(text);
      const aiMessage: Message = {
        id: `ai-${Date.now()}`,
        sender: 'ai',
        text: aiResponseText
      };
      setMessages(prev => [...prev, aiMessage]);
      setIsTyping(false);
    }, 1000);
  };

  return (
    <>
      {/* Promotional Speech Bubble Popup (Chat-Notification Style) */}
      <AnimatePresence>
        {showPromo && !isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 15, scale: 0.9, transformOrigin: 'bottom right' }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 10, scale: 0.95 }}
            transition={{ type: 'spring', damping: 20, stiffness: 250 }}
            className="fixed bottom-[136px] right-6 w-[320px] bg-[#060608]/95 border border-neutral-800 backdrop-blur-md rounded-2xl p-3.5 pr-8 font-mono z-[998] text-left select-none"
            style={{
              boxShadow: '0 20px 40px rgba(0, 0, 0, 0.4), 0 0 0 1px rgba(255, 255, 255, 0.08)'
            }}
          >
            {/* Close Button */}
            <button
              onClick={(e) => {
                e.stopPropagation();
                setShowPromo(false);
              }}
              className="absolute top-2 right-2 w-5 h-5 hover:bg-neutral-800/60 rounded-md flex items-center justify-center transition-colors cursor-pointer text-neutral-500 hover:text-neutral-200"
              title={language === 'en' ? 'Close suggestion' : 'Tutup saran'}
            >
              <CloseIcon />
            </button>
            
            {/* Chat Notification Body */}
            <div className="flex items-start gap-3">
              {/* Mini Bot Avatar with online status */}
              <div className="relative w-9 h-9 rounded-xl bg-white text-brand-black flex items-center justify-center shrink-0 shadow-md">
                <BotIcon />
                <span className="absolute -bottom-0.5 -right-0.5 w-2.5 h-2.5 bg-emerald-500 border-2 border-[#060608] rounded-full animate-pulse" />
              </div>
              
              {/* Message Content Area */}
              <div className="flex-1 min-h-[38px] flex flex-col justify-center">
                <span className="text-[8.5px] font-bold text-neutral-500 tracking-wider uppercase mb-0.5 select-none">
                  {language === 'en' ? 'Nugi AI // Message' : 'AI Nugi // Pesan'}
                </span>
                <p className="text-xs leading-relaxed text-neutral-100 font-semibold">
                  {promoSuggestions[promoIndex]}
                </p>
              </div>
            </div>
            
            {/* Downward pointer arrow */}
            <div 
              className="absolute -bottom-1.5 right-12 w-3 h-3 border-r border-b border-neutral-800 rotate-45" 
              style={{ backgroundColor: '#060608' }}
            />
          </motion.div>
        )}
      </AnimatePresence>
      {/* Floating Action Button - Custom 3D Orb Robot Head */}
      <button
        ref={buttonRef}
        onClick={toggleChat}
        className="fixed bottom-4 right-4 w-28 h-28 flex items-center justify-center transition-transform duration-300 z-[999] hover:-translate-y-1 cursor-pointer select-none group"
        title={language === 'en' ? 'Chat with Nugi AI' : 'Chat dengan AI Nugi'}
      >
        {/* Intermediate scale container that shrinks and shifts to the bottom-right corner when open */}
        <div 
          className="w-full h-full flex items-center justify-center relative transition-transform duration-300 ease-in-out"
          style={{
            transform: isOpen ? 'scale(0.45) translate3d(52px, 52px, 0)' : 'scale(1) translate3d(0, 0, 0)'
          }}
        >
          {/* Ambient occlusion shadow below the sphere (scales and moves with the pull) */}
          <div 
            className="absolute w-20 h-4 bg-black/25 rounded-full blur-md bottom-2.5 scale-x-90 pointer-events-none transition-transform duration-300"
            style={{
              transform: `translate3d(${bodyOffset.x * 0.6}px, ${bodyOffset.y * 0.2}px, 0) scale(${1 - Math.min(Math.sqrt(bodyOffset.x * bodyOffset.x + bodyOffset.y * bodyOffset.y) * 0.015, 0.25)})`
            }}
          />
          
          {/* The 3D Glossy metallic orb (pulled in the direction of the cursor) */}
          <div 
            className="relative w-20 h-20 rounded-full flex items-center justify-center overflow-hidden border border-neutral-900/30 pointer-events-none"
            style={{
              background: 'radial-gradient(circle at 35% 35%, #4a4a4a 0%, #1a1a1a 45%, #050505 85%, #000000 100%)',
              boxShadow: 'inset -6px -6px 15px rgba(0,0,0,0.85), inset 4px 4px 12px rgba(255,255,255,0.08), 0 8px 20px rgba(0,0,0,0.4)',
              perspective: '150px',
              transform: `translate3d(${bodyOffset.x}px, ${bodyOffset.y}px, 0)`
            }}
          >
            {/* Subtle reflection overlay */}
            <div className="absolute inset-0 rounded-full bg-gradient-to-tr from-white/5 via-transparent to-white/5 pointer-events-none" />
            
            {/* Glass specular highlight (shifts opposite to simulate sphere curvature) */}
            <div 
              className="absolute top-2.5 left-4 w-6 h-3 rounded-full bg-white/20 blur-[1px] rotate-[-15deg] pointer-events-none"
              style={{
                transform: `translate3d(${-eyeOffset.x * 0.15}px, ${-eyeOffset.y * 0.15}px, 0)`
              }}
            />

            {/* Eyes tracking group container (instant brutal tracking with 3D rotate warp) */}
            <div 
              className="absolute inset-0 flex items-center justify-center gap-2.5"
              style={{
                transform: `translate3d(${eyeOffset.x}px, ${eyeOffset.y}px, 0) rotateY(${eyeOffset.x * 2.2}deg) rotateX(${-eyeOffset.y * 2.2}deg)`,
                transformStyle: 'preserve-3d',
              }}
            >
              {/* Left Eye */}
              <div 
                className="w-2.5 h-6.5 bg-white rounded-full transition-transform duration-150 origin-center"
                style={{
                  boxShadow: '0 0 10px #ffffff, 0 0 18px rgba(255,255,255,0.85)',
                  transform: isBlinking ? 'scaleY(0.05)' : 'scaleY(1)',
                }}
              />
              {/* Right Eye */}
              <div 
                className="w-2.5 h-6.5 bg-white rounded-full transition-transform duration-150 origin-center"
                style={{
                  boxShadow: '0 0 10px #ffffff, 0 0 18px rgba(255,255,255,0.85)',
                  transform: isBlinking ? 'scaleY(0.05)' : 'scaleY(1)',
                }}
              />
            </div>
          </div>

          {/* Hover overlay showing close X icon when open (nested inside scale wrapper, matches the orb shape perfectly) */}
          {isOpen && (
            <div 
              className="absolute inset-0 bg-brand-black/45 backdrop-blur-[2px] flex items-center justify-center text-brand-bg opacity-0 group-hover:opacity-100 transition-opacity duration-200 z-10 rounded-full cursor-pointer"
              style={{
                transform: `translate3d(${bodyOffset.x}px, ${bodyOffset.y}px, 0)`
              }}
            >
              <CloseIcon />
            </div>
          )}
        </div>

        {/* Unread pulsing indicator */}
        {hasUnread && !isOpen && (
          <span className="absolute top-4 right-4 w-3.5 h-3.5 bg-brand-red border-2 border-white rounded-full animate-pulse z-20" />
        )}
      </button>

      {/* Chat Window Panel - Premium Dark Theme */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, scale: 0.85, y: 30, transformOrigin: 'bottom right' }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.85, y: 30 }}
            transition={{ type: 'spring', damping: 25, stiffness: 220 }}
            className="fixed bottom-24 right-6 w-[360px] sm:w-[400px] h-[520px] max-h-[calc(100vh-120px)] bg-[#060608]/98 border border-neutral-800 rounded-2xl flex flex-col overflow-hidden z-[999] font-mono text-xs backdrop-blur-md text-white"
            style={{
              boxShadow: '0 20px 40px rgba(0, 0, 0, 0.4), 0 0 0 1px rgba(255, 255, 255, 0.08)'
            }}
          >
            {/* Header Block */}
            <div className="bg-[#0d0d12]/90 border-b border-neutral-800/80 px-4 py-3 flex items-center justify-between select-none">
              <div className="flex items-center gap-2.5">
                <div className="w-8 h-8 rounded-xl bg-white text-brand-black flex items-center justify-center shrink-0 shadow-md">
                  <BotIcon />
                </div>
                <div className="flex flex-col text-left">
                  <span className="font-black text-white tracking-tight">
                    {language === 'en' ? 'NUGI.AI // CO-PILOT' : 'ASISTEN AI // NUGI'}
                  </span>
                  <div className="flex items-center gap-1.5 mt-0.5 text-[8px] text-neutral-400 font-bold tracking-widest">
                    <span className="w-1.5 h-1.5 bg-emerald-500 rounded-full animate-pulse" />
                    <span>STATUS: ONLINE</span>
                  </div>
                </div>
              </div>
 
              {/* Close Button */}
              <button
                onClick={toggleChat}
                className="w-7 h-7 hover:bg-neutral-800/60 rounded-lg flex items-center justify-center transition-colors cursor-pointer text-neutral-400 hover:text-white"
                title={language === 'en' ? 'Minimize Chat' : 'Minimalkan Chat'}
              >
                <CloseIcon />
              </button>
            </div>
 
            {/* Messages Body */}
            <div 
              ref={messagesContainerRef}
              className="flex-1 overflow-y-auto p-4 space-y-4 flex flex-col scroll-smooth scrollbar-thin scrollbar-thumb-neutral-800 scrollbar-track-transparent"
            >
              {messages.map((msg) => (
                <div
                  key={msg.id}
                  className={`flex ${msg.sender === 'user' ? 'justify-end' : 'justify-start'}`}
                >
                  <div className="max-w-[85%] flex flex-col">
                    <div
                      className={`px-3.5 py-2.5 rounded-2xl text-left leading-relaxed ${
                        msg.sender === 'user'
                          ? 'bg-white text-brand-black rounded-tr-none whitespace-pre-line'
                          : 'bg-[#13131c] text-neutral-100 border border-[#262635]/65 rounded-tl-none shadow-[0_2px_8px_rgba(0,0,0,0.15)]'
                      }`}
                    >
                      {msg.sender === 'user' ? (
                        msg.text
                      ) : (
                        <RichAIResponse text={msg.text} onActionClick={handleActionClick} />
                      )}
                    </div>
                  </div>
                </div>
              ))}
 
              {/* Typing Loader Indicator */}
              {isTyping && (
                <div className="flex justify-start">
                  <div className="bg-[#13131c] border border-[#262635]/65 px-3.5 py-3 rounded-2xl rounded-tl-none flex flex-col items-start gap-1.5 shadow-[0_2px_8px_rgba(0,0,0,0.15)]">
                    <div className="flex gap-1">
                      <span className="w-1.5 h-1.5 bg-neutral-300 rounded-full animate-bounce [animation-delay:-0.3s]" />
                      <span className="w-1.5 h-1.5 bg-neutral-300 rounded-full animate-bounce [animation-delay:-0.15s]" />
                      <span className="w-1.5 h-1.5 bg-neutral-300 rounded-full animate-bounce" />
                    </div>
                    <span className="text-[7.5px] text-neutral-400 font-bold tracking-widest uppercase">
                      {language === 'en' ? 'PAYLOAD IS GENERATING...' : 'MENGANALISIS DATA...'}
                    </span>
                  </div>
                </div>
              )}
              
              <div ref={messagesEndRef} />
            </div>
 
            {/* Quick Suggestions Overlay (Opens fully upwards over messages) */}
            <AnimatePresence>
              {!isTyping && showSuggestions && (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.2 }}
                  className="absolute inset-x-0 top-0 bottom-[90px] bg-[#060608]/96 backdrop-blur-md z-30 flex flex-col p-5 overflow-y-auto border-b border-neutral-800/80 scrollbar-thin scrollbar-thumb-neutral-800/80 scrollbar-track-transparent"
                  style={{
                    scrollbarWidth: 'thin'
                  }}
                >
                  {/* Dashboard Cyber Header */}
                  <div className="flex items-center justify-between mb-5 select-none border-b border-neutral-800 pb-3">
                    <div className="flex flex-col text-left">
                      <span className="text-[10px] font-black text-white tracking-wider uppercase">
                        {language === 'en' ? 'CO-PILOT // EXPLORE KNOWLEDGE' : 'KOPILOT // EKSPLORASI PENGETAHUAN'}
                      </span>
                      <span className="text-[7.5px] font-bold text-neutral-500 tracking-widest mt-0.5 font-mono">
                        {language === 'en' ? 'SELECT A NODE TO QUERY NUGI\'S DATABASE' : 'PILIH SIMPUL UNTUK MENANYAKAN BASIS DATA NUGI'}
                      </span>
                    </div>
                    <button
                      onClick={() => setShowSuggestions(false)}
                      className="px-2.5 py-1.5 rounded-lg text-[9px] font-bold text-neutral-400 hover:text-white border border-neutral-800 hover:border-neutral-700 bg-neutral-900/40 hover:bg-[#1c1c22]/80 transition-all cursor-pointer uppercase flex items-center gap-1 font-mono"
                    >
                      <span>{language === 'en' ? '[ CLOSE ]' : '[ TUTUP ]'}</span>
                    </button>
                  </div>
 
                  {/* Welcome Greeting (Only visible when user hasn't started chatting yet) */}
                  {messages.length === 1 && (
                    <motion.div 
                      initial={{ opacity: 0, y: -10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.3 }}
                      className="mb-5 p-4 bg-[#13131c] border border-[#262635]/65 rounded-2xl flex gap-3.5 select-none shadow-[0_2px_8px_rgba(0,0,0,0.15)]"
                    >
                      <div className="w-8 h-8 rounded-xl bg-white text-brand-black flex items-center justify-center shrink-0 shadow-md">
                        <BotIcon />
                      </div>
                      <div className="flex-1 text-left">
                        <span className="text-[8.5px] font-bold text-neutral-500 tracking-wider uppercase mb-0.5 block">
                          {language === 'en' ? 'CO-PILOT // GREETING' : 'KOPILOT // SAPAAN'}
                        </span>
                        <div className="text-[11px] leading-relaxed text-neutral-200 font-medium">
                          <RichAIResponse text={getWelcomeMessage(false)} onActionClick={handleActionClick} />
                        </div>
                      </div>
                    </motion.div>
                  )}

                  {/* Staggered Grid Container */}
                  <motion.div 
                    variants={{
                      hidden: { opacity: 0 },
                      show: {
                        opacity: 1,
                        transition: {
                          staggerChildren: 0.04
                        }
                      }
                    }}
                    initial="hidden"
                    animate="show"
                    className="grid grid-cols-2 gap-2"
                  >
                    {suggestionPrompts.map((chip, idx) => {
                      const classes = getColorClasses(chip.color);
                      return (
                        <motion.button
                          key={idx}
                          variants={{
                            hidden: { opacity: 0, y: 15, scale: 0.95 },
                            show: { 
                              opacity: 1, 
                              y: 0, 
                              scale: 1,
                              transition: {
                                type: 'spring',
                                damping: 18,
                                stiffness: 220
                              }
                            }
                          }}
                          onClick={() => {
                            handleSendMessage(chip.text);
                            setShowSuggestions(false); // Auto-collapse on click!
                          }}
                          className={`p-3.5 rounded-xl border ${classes.border} ${classes.bg} ${classes.shadow} text-left transition-all duration-300 cursor-pointer group flex flex-col justify-between min-h-[98px] w-full`}
                        >
                          <div className="flex items-start justify-between gap-1.5 w-full">
                            <span className={`text-[11px] font-bold leading-snug pr-1 transition-colors duration-300 ${classes.text}`}>
                              {chip.text}
                            </span>
                            <span className="text-[13px] p-1.5 rounded-lg bg-neutral-900/80 border border-neutral-800/80 group-hover:border-neutral-700 group-hover:scale-110 transition-all shrink-0 flex items-center justify-center">
                              {chip.icon}
                            </span>
                          </div>
                          <div className="mt-2.5 flex items-center">
                            <span className={`text-[7.5px] font-bold tracking-wider px-2 py-0.5 rounded-md ${classes.pill} uppercase font-mono`}>
                              {chip.category[language]}
                            </span>
                          </div>
                        </motion.button>
                      );
                    })}
                  </motion.div>
                </motion.div>
              )}
            </AnimatePresence>

            {/* Suggestions Toggle Bar */}
            {!isTyping && (
              <button 
                onClick={() => setShowSuggestions(!showSuggestions)}
                className="w-full px-4 py-2.5 bg-[#0b0b0e] border-t border-neutral-800/80 flex items-center justify-between text-neutral-400 hover:text-white transition-colors cursor-pointer select-none font-mono text-[9px] font-bold tracking-wider z-40"
              >
                <div className="flex items-center gap-1.5">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
                  <span>{language === 'en' ? 'SUGGESTED QUESTIONS' : 'IDE TANYA AI NUGI'}</span>
                </div>
                <div className="flex items-center gap-1">
                  <span>{showSuggestions ? 'CLOSE PANEL' : 'OPEN PANEL'}</span>
                  <span className="text-[7px]">{showSuggestions ? '▲' : '▼'}</span>
                </div>
              </button>
            )}

            {/* Input Bar */}
            <div className="border-t border-neutral-800 bg-[#060608] px-3 py-3 flex gap-2 items-center">
              <input
                type="text"
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === 'Enter') {
                    handleSendMessage(inputValue);
                  }
                }}
                placeholder={language === 'en' ? "Ask Nugi AI..." : "Tanya AI Nugi..."}
                className="flex-1 bg-[#111116] border border-neutral-800 rounded-xl px-3 py-2 font-mono text-xs focus:outline-none focus:border-neutral-500 text-white placeholder-neutral-500 transition-colors"
                disabled={isTyping}
              />
              <button
                onClick={() => handleSendMessage(inputValue)}
                disabled={!inputValue.trim() || isTyping}
                className={`w-8 h-8 rounded-xl flex items-center justify-center transition-all cursor-pointer ${
                  inputValue.trim() && !isTyping
                    ? 'bg-white text-brand-black hover:bg-neutral-200'
                    : 'bg-[#111116] text-neutral-600 border border-neutral-800/50 cursor-not-allowed'
                }`}
                title={language === 'en' ? 'Send Query' : 'Kirim Pertanyaan'}
              >
                <SendIcon />
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

// Helper to dynamically style buttons based on action/destination intent
const getButtonStyles = (label: string, link: string): string => {
  const text = (label + ' ' + link).toLowerCase();
  const base = "inline-flex items-center gap-1 px-2.5 py-1 rounded-lg text-[10px] font-bold transition-all cursor-pointer select-none my-1 mr-1 font-mono";
  
  // Red theme for contact/form actions
  if (
    text.includes('contact') || 
    text.includes('formulir') || 
    text.includes('terminal') || 
    text.includes('console') || 
    text.includes('form') || 
    text.includes('hubungi') || 
    text.includes('kontak')
  ) {
    return `${base} bg-brand-red hover:bg-red-500 text-white border border-brand-red/30 shadow-[0_0_10px_rgba(229,57,53,0.15)] hover:shadow-[0_0_15px_rgba(229,57,53,0.3)]`;
  }
  
  // Green theme for external outreach, scheduling, email, or sponsorships
  if (
    text.includes('email') || 
    text.includes('call') || 
    text.includes('sponsorship') || 
    text.includes('sponsor') || 
    text.includes('linkedin') || 
    text.includes('konsultasi') || 
    text.includes('book') || 
    text.includes('surel') || 
    text.includes('jadwalkan') ||
    link.startsWith('mailto:') ||
    link.includes('linkedin.com')
  ) {
    return `${base} bg-emerald-600 hover:bg-emerald-500 text-white border border-emerald-600/30 shadow-[0_0_10px_rgba(16,185,129,0.15)] hover:shadow-[0_0_15px_rgba(16,185,129,0.3)]`;
  }
  
  // White theme for navigation & exploration actions (default)
  return `${base} bg-white hover:bg-neutral-100 text-brand-black border border-neutral-300 shadow-sm`;
};

const parseInlineText = (text: string, onActionClick: (type: string, payload: string) => void) => {
  const tokens: React.ReactNode[] = [];
  let lastIndex = 0;
  
  // Regular expression matching bold (**text**), italics (*text*), or links ([label](url))
  const regex = /(\*\*.*?\*\*|\*.*?\*|\[.*?\]\(.*?\))/g;
  let match;
  
  while ((match = regex.exec(text)) !== null) {
    const matchIndex = match.index;
    const matchText = match[0];
    
    // Add text preceding the match
    if (matchIndex > lastIndex) {
      tokens.push(text.substring(lastIndex, matchIndex));
    }
    
    if (matchText.startsWith('**') && matchText.endsWith('**')) {
      const boldContent = matchText.slice(2, -2);
      tokens.push(<strong key={matchIndex} className="font-extrabold text-white">{boldContent}</strong>);
    } else if (matchText.startsWith('*') && matchText.endsWith('*')) {
      const italicContent = matchText.slice(1, -1);
      tokens.push(<em key={matchIndex} className="italic text-neutral-200">{italicContent}</em>);
    } else {
      const linkMatch = matchText.match(/\[(.*?)\]\((.*?)\)/);
      if (linkMatch) {
        const label = linkMatch[1];
        const link = linkMatch[2];
        
        if (link.startsWith('action:')) {
          const actionVal = link.substring(7);
          tokens.push(
            <button
              key={matchIndex}
              onClick={() => onActionClick('action', actionVal)}
              className={getButtonStyles(label, link)}
            >
              <span>{label}</span>
              <span className="text-[7.5px] opacity-75">➔</span>
            </button>
          );
        } else if (link.startsWith('scroll:')) {
          const sectionId = link.substring(7);
          tokens.push(
            <button
              key={matchIndex}
              onClick={() => onActionClick('scroll', sectionId)}
              className={getButtonStyles(label, link)}
            >
              <span>{label}</span>
              <span className="text-[7.5px] opacity-75">↓</span>
            </button>
          );
        } else if (link.startsWith('mailto:')) {
          const email = link.substring(7);
          tokens.push(
            <a
              key={matchIndex}
              href={`mailto:${email}`}
              className={getButtonStyles(label, link)}
            >
              <span>{label}</span>
              <span className="text-[7.5px] opacity-75">✉</span>
            </a>
          );
        } else if (link.startsWith('url:')) {
          const actualUrl = link.substring(4);
          tokens.push(
            <a
              key={matchIndex}
              href={actualUrl}
              target="_blank"
              rel="noopener noreferrer"
              className={getButtonStyles(label, link)}
            >
              <span>{label}</span>
              <span className="text-[7.5px] opacity-75">↗</span>
            </a>
          );
        } else {
          tokens.push(
            <a
              key={matchIndex}
              href={link}
              target="_blank"
              rel="noopener noreferrer"
              className={getButtonStyles(label, link)}
            >
              <span>{label}</span>
              <span className="text-[7.5px] opacity-75">↗</span>
            </a>
          );
        }
      }
    }
    
    lastIndex = regex.lastIndex;
  }
  
  if (lastIndex < text.length) {
    tokens.push(text.substring(lastIndex));
  }
  
  return tokens.length > 0 ? tokens : text;
};

interface RichAIResponseProps {
  text: string;
  onActionClick: (actionType: string, payload: string) => void;
}

const RichAIResponse: React.FC<RichAIResponseProps> = ({ text, onActionClick }) => {
  const parts = text.split(/(```[\s\S]*?```)/g);

  return (
    <div className="space-y-3 font-mono text-[11px] leading-relaxed text-neutral-200">
      {parts.map((part, index) => {
        if (part.startsWith('```') && part.endsWith('```')) {
          const lines = part.slice(3, -3).trim().split('\n');
          const language = lines[0].match(/^[a-zA-Z0-9_-]+$/) ? lines[0] : '';
          const codeContent = language ? lines.slice(1).join('\n') : lines.join('\n');
          
          return (
            <div key={index} className="border border-neutral-800/80 bg-[#070708] rounded-xl overflow-hidden my-3 shadow-inner">
              <div className="bg-[#101012] px-3 py-1.5 flex items-center justify-between border-b border-neutral-800/80 text-[8.5px] text-neutral-400 select-none">
                <span>{language ? language.toUpperCase() : 'CODE BLOCK'}</span>
                <button
                  onClick={() => navigator.clipboard.writeText(codeContent)}
                  className="hover:text-white transition-colors cursor-pointer text-[8px] font-bold"
                >
                  [ COPY ]
                </button>
              </div>
              <pre className="p-3 overflow-x-auto text-[10.5px] leading-relaxed text-emerald-400 select-text font-mono">
                <code>{codeContent}</code>
              </pre>
            </div>
          );
        }

        const lines = part.split('\n');
        const renderedBlocks: React.ReactNode[] = [];
        let currentTableRows: string[][] = [];
        let isInsideTable = false;

        const flushTable = (key: string | number) => {
          if (currentTableRows.length > 0) {
            const headers = currentTableRows[0];
            const rows = currentTableRows.slice(2);
            renderedBlocks.push(
              <div key={`table-${key}`} className="my-3 overflow-x-auto border border-neutral-800/80 rounded-xl bg-[#0a0a0c]/60 max-w-full">
                <table className="min-w-full text-[10px] border-collapse text-left whitespace-nowrap">
                  <thead>
                    <tr className="border-b border-neutral-800 bg-[#101012]">
                      {headers.map((h, i) => (
                        <th key={i} className="px-3 py-2 font-bold text-neutral-300 uppercase tracking-wider">{h.trim()}</th>
                      ))}
                    </tr>
                  </thead>
                  <tbody>
                    {rows.map((row, rowIndex) => (
                      <tr key={rowIndex} className="border-b border-neutral-800/40 hover:bg-neutral-800/10 last:border-0 transition-colors">
                        {row.map((cell, cellIndex) => (
                          <td key={cellIndex} className="px-3 py-2 text-neutral-200 leading-normal">{parseInlineText(cell, onActionClick)}</td>
                        ))}
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            );
            currentTableRows = [];
            isInsideTable = false;
          }
        };

        for (let i = 0; i < lines.length; i++) {
          const line = lines[i];

          if (line.trim().startsWith('|') && line.trim().endsWith('|')) {
            isInsideTable = true;
            const cells = line.split('|').slice(1, -1);
            currentTableRows.push(cells);
            continue;
          } else if (isInsideTable) {
            flushTable(i);
          }

          if (line.trim().startsWith('•') || line.trim().startsWith('-') || line.trim().startsWith('*')) {
            const content = line.trim().slice(1).trim();
            renderedBlocks.push(
              <div key={i} className="flex items-start gap-1.5 text-left pl-1">
                <span className="text-brand-red select-none mt-1 shrink-0">•</span>
                <span className="leading-relaxed text-neutral-200">{parseInlineText(content, onActionClick)}</span>
              </div>
            );
            continue;
          }

          const matchNum = line.trim().match(/^(\d+)\.\s(.*)$/);
          if (matchNum) {
            const num = matchNum[1];
            const content = matchNum[2];
            renderedBlocks.push(
              <div key={i} className="flex items-start gap-1.5 text-left pl-1">
                <span className="text-neutral-500 font-bold select-none shrink-0">{num}.</span>
                <span className="leading-relaxed text-neutral-200">{parseInlineText(content, onActionClick)}</span>
              </div>
            );
            continue;
          }

          if (!line.trim()) {
            renderedBlocks.push(<div key={i} className="h-1.5" />);
            continue;
          }

          renderedBlocks.push(
            <p key={i} className="leading-relaxed text-left text-neutral-200">
              {parseInlineText(line, onActionClick)}
            </p>
          );
        }

        if (isInsideTable) {
          flushTable('end');
        }

        return <div key={index} className="space-y-2">{renderedBlocks}</div>;
      })}
    </div>
  );
};
