export interface LocalizedString {
  en: string;
  id: string;
}

export interface Project {
  id: string;
  title: string;
  category: LocalizedString;
  description: LocalizedString;
  tags: string[];
  demoUrl: string;
  githubUrl: string;
  serialNumber: string;
  edition: string;
  type: 'tech' | 'architecture' | 'articles' | 'milestones';
  mainCategory: 'project' | 'blog';
  subCategory: 'tech_venture' | 'architecture_design' | 'content' | 'tech_research' | 'marketing_growth' | 'news_milestone';
  readTime?: LocalizedString;
  milestoneBadge?: LocalizedString;
}

export interface TimelineEntry {
  id: string;
  year: string;
  role: LocalizedString;
  company: string;
  description: LocalizedString;
  details?: LocalizedString;
  category: 'experience' | 'ventures' | 'education' | 'certifications' | 'organization';
  status: 'ACTIVE' | 'COMPLETED' | 'UPGRADED';
  statusLabel: LocalizedString;
  statusCode: string;
  logo?: string;
}

export interface PortfolioData {
  personal: {
    name: string;
    role: LocalizedString;
    welcomeMsg: LocalizedString;
    tagline: LocalizedString;
    subTagline: LocalizedString;
    email: string;
    location: string;
    timezone: string;
    language: string;
    availability: LocalizedString;
    systemId: string;
    mascotPath: string;
    videoBgPath: string;
    heroVideoPath: string;
  };
  stats: {
    label: string;
    value: string;
    description: LocalizedString;
  }[];
  skills: {
    category: string;
    icon: string;
    focusMetric: string;
    description: LocalizedString;
    items: string[];
  }[];
  skillsAnalytics: {
    label: LocalizedString;
    value: LocalizedString;
    description: LocalizedString;
  }[];
  projects: Project[];
  timeline: TimelineEntry[];
}

export const portfolioData: PortfolioData = {
  personal: {
    name: "Nugi",
    role: {
      en: "AI Founder & Agentic Engineer",
      id: "Pendiri AI & Insinyur Agen Otonom"
    },
    welcomeMsg: {
      en: "WELCOME TO MY DIGITAL UNIVERSE",
      id: "SELAMAT DATANG DI JARINGAN DIGITALKU"
    },
    tagline: {
      en: "I am Nugraha Labib Mujaddid (Nugi) — an AI Founder, Agentic Engineer, and Multidisciplinary Entrepreneur. I bridge the gaps between advanced technology, business innovation strategy, and complex corporate/legal frameworks. As the founder of Spead AI (selected for the Google for Startups Cloud Program 2025) and AgentBuff, I design production-grade autonomous agent workflows for enterprise sectors (BUMN, corporate, government) while delivering accessible, self-evolving digital workforces for SMBs and solopreneurs. With a Master of Management in New Ventures Innovation and a background managing mega-infrastructure contract disputes at PT Waskita Karya (Persero) Tbk, I engineer tech solutions grounded in solid business viability and strict risk mitigation.",
      id: "Saya adalah Nugraha Labib Mujaddid (Nugi) — Pendiri AI, Insinyur Agen Otonom, dan Wirausahawan Multidisiplin. Saya menjembatani teknologi kecerdasan buatan, strategi inovasi bisnis, dan kerangka kerja hukum/korporasi yang kompleks. Sebagai pendiri Spead AI (terpilih dalam Google for Startups Cloud Program 2025) dan AgentBuff, saya merancang alur kerja agen AI otonom tingkat produksi untuk sektor enterprise (BUMN, korporat, pemerintahan) sekaligus menghadirkan tenaga kerja digital mandiri yang inklusif untuk UMKM dan solopreneur. Dengan gelar Magister Manajemen di bidang New Ventures Innovation serta pengalaman mengelola klaim kontrak infrastruktur raksasa di PT Waskita Karya (Persero) Tbk, saya merekayasa solusi teknologi yang berlandaskan kelayakan bisnis matang dan mitigasi risiko yang ketat."
    },
    subTagline: {
      en: "AGENTIC AI ECOSYSTEM • PRODUCT DEVELOPMENT • BUSINESS STRATEGY",
      id: "EKOSISTEM AGENTIC AI • PENGEMBANGAN PRODUK • STRATEGI BISNIS"
    },
    email: "nugrahalabib@gmail.com",
    location: "Jakarta, Indonesia",
    timezone: "GMT +7",
    language: "EN / ID",
    availability: {
      en: "ACTIVE",
      id: "AKTIF"
    },
    systemId: "PORTFOLIO-2026",
    mascotPath: "/assets/mascot.png",
    videoBgPath: "/assets/video-bg.mp4",
    heroVideoPath: "/assets/video-herosection.mp4"
  },
  stats: [
    {
      label: "STRATEGY",
      value: "4+",
      description: {
        en: "YEARS EXP",
        id: "TAHUN PENGALAMAN"
      }
    },
    {
      label: "AI & TECH",
      value: "3+",
      description: {
        en: "PROJECTS",
        id: "PROYEK AI"
      }
    },
    {
      label: "CREATORS",
      value: "140K+",
      description: {
        en: "AUDIENCE",
        id: "PENGIKUT"
      }
    },
    {
      label: "VIEWS",
      value: "40M+",
      description: {
        en: "ENGAGEMENT",
        id: "TAYANGAN VIDEO"
      }
    }
  ],
  skills: [
    {
      category: "BUSINESS DEVELOPMENT",
      icon: "briefcase",
      focusMetric: "95% FOCUS",
      description: {
        en: "Accelerating high-growth business ecosystems and strategic client acquisitions in corporate and BUMN sectors. Experienced in scaling retail/F&B franchises, optimizing cash flows for large real estate portfolios (100+ units), and deploying integrated operational automations to maximize efficiency and venture valuation.",
        id: "Mengakselerasi pertumbuhan ekosistem bisnis berskala tinggi dan akuisisi klien strategis sektor korporat & BUMN. Berpengalaman memimpin ekspansi jaringan waralaba kuliner, optimalisasi arus kas portofolio properti (100+ unit), serta otomatisasi alur kerja operasional terintegrasi untuk memaksimalkan efisiensi dan valuasi bisnis."
      },
      items: [
        "Business Ecosystem Dev",
        "Product Development",
        "Strategic Partnership",
        "Asset Management",
        "Cash Flow Optimization",
        "F&B Franchise Scaling",
        "BUMN Client Acquisition",
        "Market Penetration",
        "Operations Automation"
      ]
    },
    {
      category: "AI SYSTEMS & WORKFLOWS",
      icon: "bot",
      focusMetric: "98% FOCUS",
      description: {
        en: "Architecting production-grade autonomous agentic workflows and Contextual RAG engines featuring self-correction loops. Deploying complex multi-agent pipelines to automate corporate operations, eliminate manual document creation bottlenecks, and construct resilient digital workforces.",
        id: "Arsitek sistem kecerdasan buatan otonom tingkat produksi dan sistem Contextual RAG yang mampu mendeteksi kesalahan serta mengoreksi diri sendiri (self-correcting). Mengembangkan pipeline multi-agent chain otonom untuk mengotomatisasi operasional bisnis kompleks, mengurangi kesalahan manusia, dan memotong biaya operasional."
      },
      items: [
        "Agentic Workflows",
        "LLM Orchestration",
        "RAG Architectures",
        "Self-Evolving AI",
        "n8n / Flowise Dev",
        "Prompt Engineering",
        "LangChain / LangGraph",
        "Vector DB (Pinecone)",
        "Self-Correction Loops"
      ]
    },
    {
      category: "TECH & INFRA",
      icon: "cpu",
      focusMetric: "60% FOCUS",
      description: {
        en: "Developing high-performance, cloud-native fullstack applications. Engineering interactive React/TypeScript frontend architectures and containerized backend systems using Docker, deployed securely on Google Cloud Platform (GCP) with absolute reliability.",
        id: "Mengembangkan arsitektur aplikasi fullstack berkinerja tinggi berbasis cloud-native. Mengintegrasikan teknologi frontend React/TypeScript interaktif dengan backend yang kuat, kontainerisasi Docker, dan arsitektur serverless yang aman di Google Cloud Platform (GCP)."
      },
      items: [
        "PHP",
        "JavaScript",
        "CSS",
        "Python",
        "SQL",
        "Laravel",
        "React.js",
        "MySQL",
        "PostgreSQL",
        "Docker",
        "Git",
        "GitHub",
        "Alibaba Cloud",
        "Google Cloud",
        "Figma"
      ]
    },
    {
      category: "CREATIVE CREATOR",
      icon: "smartphone",
      focusMetric: "85% FOCUS",
      description: {
        en: "Building highly active digital communities and organic, high-converting content marketing funnels. Managing a loyal audience of 140K+ followers on TikTok (@nugrahalabib) with 40M+ cumulative views, partnering with global tech brands for strategic sponsorships.",
        id: "Membangun komunitas teknologi digital yang aktif dan funnel pemasaran konten organik berkonversi tinggi. Mengelola audiens setia 140K+ pengikut di TikTok (@nugrahalabib) dengan akumulasi 40 juta+ tayangan, serta bermitra dengan brand global untuk kolaborasi strategis."
      },
      items: [
        "Video Storytelling",
        "Audience Growth",
        "Brand Partnerships",
        "Social Media Growth",
        "Video Production",
        "Affiliate Marketing",
        "Copywriting",
        "Community Building",
        "Content Funnels"
      ]
    },
    {
      category: "UI/UX & DESIGN",
      icon: "pentool",
      focusMetric: "80% FOCUS",
      description: {
        en: "Designing premium user experiences (UX) utilizing a data-driven approach and tokens-based design systems. Blending futuristic visual aesthetics with intuitive wireframes and user journey maps to minimize user interaction friction.",
        id: "Merancang pengalaman pengguna (UX) premium dengan pendekatan berbasis data dan sistem desain (design system) berbasis token yang terstandarisasi. Memadukan estetika visual futuristik dengan wireframing intuitif untuk meminimalkan friksi interaksi pengguna."
      },
      items: [
        "Figma Prototyping",
        "Design Systems",
        "Wireframing",
        "Interaction Design",
        "Visual Design",
        "Typography & Layouts",
        "User Journey Mapping",
        "Design Tokens",
        "Responsive Layouts"
      ]
    },
    {
      category: "ARCHITECTURE",
      icon: "palette",
      focusMetric: "60% FOCUS",
      description: {
        en: "Directing architectural studio operations at LAB.in Studio and producing photorealistic 3D visualizations. Managing design teams to deliver high-end spatial plans for commercial facilities, resort hotels, library redesigns, and luxury interiors.",
        id: "Memimpin operasional studio desain arsitektur LAB.in Studio dan rekayasa visualisasi 3D fotorealistis. Mengelola tim desainer lepas untuk menghasilkan rancangan spasial bangunan komersial, hotel resort, perpustakaan, serta desain interior yang mewah."
      },
      items: [
        "Studio Leadership",
        "Design Team Management",
        "Freelance Delegation",
        "3D Visualization",
        "Space Designing",
        "Lumion Rendering",
        "SketchUp Modeling",
        "Design Thinking",
        "Interior Design",
        "Concept Rendering",
        "Facility Planning"
      ]
    }
  ],
  skillsAnalytics: [
    {
      label: { en: "BUSINESS DEVELOPMENT", id: "PENGEMBANGAN BISNIS" },
      value: { en: "4+ Years", id: "4+ Tahun" },
      description: {
        en: "Scaling franchises, property assets (100+ units) & BUMN client solutions.",
        id: "Skala waralaba, aset properti (100+ unit) & solusi klien BUMN."
      }
    },
    {
      label: { en: "AI SYSTEMS & WORKFLOWS", id: "SISTEM AI & WORKFLOW" },
      value: { en: "3+ Years", id: "3+ Tahun" },
      description: {
        en: "Leading autonomous agent orchestrations, self-evolving pipelines & RAG.",
        id: "Memimpin orkestrasi agen otonom, pipeline mandiri & RAG."
      }
    },
    {
      label: { en: "TECH & INFRASTRUCTURE", id: "TEKNOLOGI & INFRASTRUKTUR" },
      value: { en: "4+ Years", id: "4+ Tahun" },
      description: {
        en: "React-TS frontend expert, GCP/Docker cloud automation & team delegation.",
        id: "Ahli frontend React-TS, otomatisasi GCP/Docker & delegasi tim."
      }
    },
    {
      label: { en: "CREATIVE CREATOR", id: "KREATOR KREATIF" },
      value: { en: "5+ Years", id: "5+ Tahun" },
      description: {
        en: "Tech community manager with 140K+ followers & global sponsorships.",
        id: "Manajer komunitas teknologi dengan 140K+ pengikut & sponsor global."
      }
    },
    {
      label: { en: "UI/UX & DESIGN", id: "UI/UX & DESAIN" },
      value: { en: "9+ Years", id: "9+ Tahun" },
      description: {
        en: "Figma prototyping, design systems, layouts & user journeys.",
        id: "Prototipe Figma, sistem desain, tata letak & perjalanan pengguna."
      }
    },
    {
      label: { en: "ARCHITECTURE & STUDIO", id: "STUDIO ARSITEKTUR" },
      value: { en: "9+ Years", id: "9+ Tahun" },
      description: {
        en: "Managing 4 freelance staff, studio operations & core architectural practice.",
        id: "Mengelola 4 staf lepas, operasional studio & praktik arsitektur utama."
      }
    }
  ],
  projects: [
    // --- PROJECTS: TECH & VENTURES ---
    {
      id: "proj-tech-1",
      title: "SPEAD AI",
      category: {
        en: "AI SYSTEMS & INFRASTRUCTURE",
        id: "INFRASTRUKTUR & SISTEM AI"
      },
      description: {
        en: "Modular AI Ecosystem for the Expertise Economy. Selected for the Google for Startups Cloud Program 2025.",
        id: "Ekosistem AI Modular untuk Ekonomi Keahlian. Terpilih dalam Google for Startups Cloud Program 2025."
      },
      tags: ["AI Agents", "Startups", "Google Cloud", "RAG Engine"],
      demoUrl: "https://speadai.com",
      githubUrl: "#",
      serialNumber: "01",
      edition: "EDITION 2025",
      type: "tech",
      mainCategory: "project",
      subCategory: "tech_venture"
    },
    {
      id: "proj-tech-2",
      title: "AGENT BUFF ECOSYSTEM",
      category: {
        en: "AUTONOMOUS AGENTS MARKETPLACE",
        id: "MARKETPLACE AGEN AI OTONOM"
      },
      description: {
        en: "Autonomous digital workforce & AI services suite featuring Shila (PA), Money Manager, AI Curhat, & AI Tugas.",
        id: "Tenaga kerja digital otonom & rangkaian layanan AI yang menghadirkan Shila (PA), Money Manager, AI Curhat, & AI Tugas."
      },
      tags: ["AI System", "Agent Buff", "Automations", "AI Utilities"],
      demoUrl: "https://agentbuff.com",
      githubUrl: "#",
      serialNumber: "02",
      edition: "EDITION 1.0",
      type: "tech",
      mainCategory: "project",
      subCategory: "tech_venture"
    },
    {
      id: "proj-tech-3",
      title: "JOKI HIDUP",
      category: {
        en: "INTELLECTUAL DELEGATION PLATFORM",
        id: "PLATFORM DELEGASI INTELEKTUAL"
      },
      description: {
        en: "Premium intellectual assistance platform linking Cumlaude/Master academic professionals with executives and students.",
        id: "Platform bantuan intelektual premium yang menghubungkan profesional akademik Cumlaude/Master dengan eksekutif dan pelajar."
      },
      tags: ["Intellectual Ops", "Service Scaling", "Expert Network"],
      demoUrl: "#",
      githubUrl: "#",
      serialNumber: "03",
      edition: "EDITION 2025",
      type: "tech",
      mainCategory: "project",
      subCategory: "tech_venture"
    },
    {
      id: "proj-tech-4",
      title: "MUTIARA 27 ASSET MANAGEMENT",
      category: {
        en: "REAL ESTATE OPERATIONS",
        id: "OPERASIONAL REAL ESTATE"
      },
      description: {
        en: "Property asset management operations, strategically managing 100+ high-occupancy residential doors/units.",
        id: "Operasional manajemen aset properti, mengelola secara strategis 100+ pintu/unit hunian okupansi tinggi."
      },
      tags: ["Real Estate", "Property Management", "Cash Flow Optimization"],
      demoUrl: "#",
      githubUrl: "#",
      serialNumber: "04",
      edition: "EDITION 2021",
      type: "tech",
      mainCategory: "project",
      subCategory: "tech_venture"
    },
    {
      id: "proj-tech-5",
      title: "GULTIK & SOTO MASNUG",
      category: {
        en: "F&B CULINARY BUSINESS",
        id: "BISNIS KULINER F&B"
      },
      description: {
        en: "F&B Culinary brand elevating traditional Indonesian street food to modern Gen-Z marketing standards.",
        id: "Merek waralaba kuliner F&B, mengangkat makanan jalanan tradisional Indonesia ke standar pemasaran Gen-Z."
      },
      tags: ["F&B Brand", "Culinary Business", "Gen-Z Marketing"],
      demoUrl: "#",
      githubUrl: "#",
      serialNumber: "05",
      edition: "EDITION 2024",
      type: "tech",
      mainCategory: "project",
      subCategory: "tech_venture"
    },
 
    // --- PROJECTS: ARCHITECTURE & DESIGN ---
    {
      id: "proj-arch-1",
      title: "4-STAR BEACH RESORT JEPARA",
      category: {
        en: "SUSTAINABLE TOURISM DESIGN",
        id: "DESAIN PARIWISATA BERKELANJUTAN"
      },
      description: {
        en: "Bachelor graduation project: A green building tourism resort, integrating sustainable energy and coastal topography.",
        id: "Proyek tugas akhir sarjana: Resort pariwisata berkonsep green building, memadukan energi berkelanjutan dan topografi pantai."
      },
      tags: ["Green Building", "Tourism Design", "Coastal Planning", "Autodesk CAD"],
      demoUrl: "#",
      githubUrl: "#",
      serialNumber: "01",
      edition: "GRADUATION BUILD",
      type: "architecture",
      mainCategory: "project",
      subCategory: "architecture_design"
    },
    {
      id: "proj-arch-2",
      title: "LAB.IN STUDIO DESIGNS",
      category: {
        en: "3D ARCHITECTURAL VISUALIZATION",
        id: "VISUALISASI ARSITEKTUR 3D"
      },
      description: {
        en: "Curated blueprints and photorealistic visualizations designed for over 30 corporate and private client properties.",
        id: "Kumpulan cetak biru dan visualisasi realistis yang dirancang untuk lebih dari 30 properti klien korporat dan pribadi."
      },
      tags: ["3D Renderings", "Lumion 3D", "SketchUp", "Client Briefings"],
      demoUrl: "#",
      githubUrl: "#",
      serialNumber: "02",
      edition: "STUDIO ARCHIVE",
      type: "architecture",
      mainCategory: "project",
      subCategory: "architecture_design"
    },
    {
      id: "proj-arch-3",
      title: "UNDIP UNIVERSITY LIBRARY REDESIGN",
      category: {
        en: "SPATIAL REORGANIZATION",
        id: "REORGANISASI SPASIAL"
      },
      description: {
        en: "Conceptual redesign and interior spatial drafting to improve occupant traffic flow, light entry, and student collaboration hubs.",
        id: "Perancangan ulang konsep dan tata ruang interior untuk meningkatkan sirkulasi pengunjung, cahaya masuk, dan kolaborasi mahasiswa."
      },
      tags: ["Interior Design", "Sirkulasi Ruang", "University Architecture"],
      demoUrl: "#",
      githubUrl: "#",
      serialNumber: "03",
      edition: "EDITION 2020",
      type: "architecture",
      mainCategory: "project",
      subCategory: "architecture_design"
    },

    // --- PROJECTS: CONTENT & CREATIVE ---
    {
      id: "proj-content-1",
      title: "NUGI TECH CONTENT SYSTEM",
      category: {
        en: "CONTENT CREATION & BRANDING",
        id: "KREASI KONTEN & BRANDING"
      },
      description: {
        en: "Personal tech content system generating 40M+ views, building an active tech community of 140K+ followers.",
        id: "Sistem konten teknologi pribadi yang menghasilkan 40 juta+ tayangan, membangun komunitas teknologi aktif dengan 140 ribu+ pengikut."
      },
      tags: ["Content Creation", "Tech Community", "Brand Partnerships", "Viral Strategy"],
      demoUrl: "https://tiktok.com/@nugrahalabib",
      githubUrl: "#",
      serialNumber: "01",
      edition: "ACTIVE BRAND",
      type: "tech",
      mainCategory: "project",
      subCategory: "content"
    },

    // --- BLOG: TECH & RESEARCH ---
    {
      id: "proj-art-3",
      title: "THE EXPERTISE ECONOMY & CONTEXTUAL RAG",
      category: {
        en: "ENTERPRISE AI ARCHITECTURE",
        id: "ARSITEKTUR AI ENTERPRISE"
      },
      description: {
        en: "How contextual Retrieval-Augmented Generation (RAG) engines reduce corporate document creation times by 87% while securing data assets.",
        id: "Bagaimana engine RAG kontekstual memotong waktu pembuatan dokumen korporat sebesar 87% sekaligus mengamankan aset data."
      },
      tags: ["AI Systems", "RAG Pipeline", "Enterprise Tech"],
      demoUrl: "#",
      githubUrl: "#",
      serialNumber: "01",
      edition: "6 MIN READ",
      type: "articles",
      mainCategory: "blog",
      subCategory: "tech_research",
      readTime: { en: "6 MIN READ", id: "BACA 6 MENIT" }
    },

    // --- BLOG: NEWS & MILESTONES ---
    {
      id: "proj-mile-1",
      title: "GOOGLE FOR STARTUPS CLOUD GRADUATE",
      category: {
        en: "STARTUP SYSTEM VALIDATION",
        id: "VALIDASI SISTEM STARTUP"
      },
      description: {
        en: "Successfully passed Google Cloud's evaluation program, securing compute access and system architecture validation for Spead AI.",
        id: "Berhasil melewati program evaluasi Google Cloud, mengamankan akses komputasi dan validasi arsitektur sistem untuk Spead AI."
      },
      tags: ["Google Startup", "Cloud Validation", "Enterprise Readiness"],
      demoUrl: "#",
      githubUrl: "#",
      serialNumber: "01",
      edition: "LEVEL UNLOCKED",
      type: "milestones",
      mainCategory: "blog",
      subCategory: "news_milestone",
      milestoneBadge: { en: "LEVEL UNLOCKED", id: "LEVEL TERBUKA" }
    },
    {
      id: "proj-mile-2",
      title: "BIM ALLPLAN STRUCTURAL CERTIFICATE",
      category: {
        en: "CONSTRUCTION TECH CERTIFICATION",
        id: "SERTIFIKASI TEKNOLOGI KONSTRUKSI"
      },
      description: {
        en: "Acquired official BIM certification in Allplan software for digital modeling of reinforced concrete, aligning with BUMN standard digitization.",
        id: "Mendapatkan sertifikasi resmi BIM Allplan untuk pemodelan struktur beton bertulang, menyelaraskan dengan digitalisasi standar BUMN."
      },
      tags: ["BIM Technology", "Allplan software", "BUMN Standard"],
      demoUrl: "#",
      githubUrl: "#",
      serialNumber: "02",
      edition: "TECH UNLOCKED",
      type: "milestones",
      mainCategory: "blog",
      subCategory: "news_milestone",
      milestoneBadge: { en: "TECH UNLOCKED", id: "KEMAMPUAN TERBUKA" }
    },
    {
      id: "proj-mile-3",
      title: "CUMLAUDE GRADUATE - BACHELOR OF ARCHITECTURE",
      category: {
        en: "ACADEMIC HONORS",
        id: "PENGHARGAAN AKADEMIK"
      },
      description: {
        en: "Graduated with Cumlaude distinction (GPA 3.65 / 4.00) from Diponegoro University, specializing in Green Building and Tourism Resorts.",
        id: "Lulus dengan kehormatan Cumlaude (IPK 3.65 / 4.00) dari Universitas Diponegoro, spesialisasi Green Building dan Tourism Resorts."
      },
      tags: ["Undip cumlaude", "Architecture Bachelor", "GPA 3.65"],
      demoUrl: "#",
      githubUrl: "#",
      serialNumber: "03",
      edition: "HONORS UNLOCKED",
      type: "milestones",
      mainCategory: "blog",
      subCategory: "news_milestone",
      milestoneBadge: { en: "HONORS UNLOCKED", id: "PRESTASI TERBUKA" }
    },

    // --- BLOG: MARKETING & GROWTH ---
    {
      id: "proj-art-1",
      title: "DATING WITH TECHNOLOGY (VIRAL VIRALITY)",
      category: {
        en: "TECH & LIFESTYLE STORYTELLING",
        id: "EDUKASI & BRANDING TEKNOLOGI"
      },
      description: {
        en: "Analyzing the organic growth strategy behind the viral concept that scaled a tech channel to 140K+ followers and 40.9M+ views.",
        id: "Menganalisis strategi pertumbuhan organik di balik konsep viral yang mengembangkan saluran teknologi hingga 140K+ pengikut dan 40.9M+ views."
      },
      tags: ["Social Scaling", "Virality Playbook", "Content Strategy"],
      demoUrl: "#",
      githubUrl: "#",
      serialNumber: "01",
      edition: "5 MIN READ",
      type: "articles",
      mainCategory: "blog",
      subCategory: "marketing_growth",
      readTime: { en: "5 MIN READ", id: "BACA 5 MENIT" }
    },
    {
      id: "proj-art-2",
      title: "COPYWRITING & PERSUASIVE PSYCHOLOGY",
      category: {
        en: "SALES STORYTELLING FRAMEWORKS",
        id: "KERANGKA PENULISAN PERSUASIF"
      },
      description: {
        en: "Structuring conversion copy that simplifies complex technical specifications and aligns with mass audience psychological models.",
        id: "Menyusun tulisan konversi yang menyederhanakan spesifikasi teknis kompleks dan menyelaraskan dengan psikologi audiens massal."
      },
      tags: ["Persuasion Copy", "Sales Funnels", "Audience Psychology"],
      demoUrl: "#",
      githubUrl: "#",
      serialNumber: "02",
      edition: "4 MIN READ",
      type: "articles",
      mainCategory: "blog",
      subCategory: "marketing_growth",
      readTime: { en: "4 MIN READ", id: "BACA 4 MENIT" }
    }
  ],
  timeline: [
  {
    id: "time-12",
    year: "DEC 2025",
    role: {
      en: "Google for Startups Cloud Program",
      id: "Google for Startups Cloud Program"
    },
    company: "Google for Startups",
    logo: "/assets/logos/google.png",
    description: {
      en: "Graduated from the exclusive Google Cloud program, validating technical capabilities in scaling AI startup infrastructure.",
      id: "Lulus dari program eksklusif Google Cloud, memvalidasi kemampuan teknis dalam meningkatkan infrastruktur startup AI."
    },
    details: {
      en: "Successfully completed the Google for Startups Cloud Program. Validated technical architectures for deploying secure, globally-scalable, and resilient AI systems on Google Cloud Platform for Spead AI.",
      id: "Berhasil menyelesaikan Google for Startups Cloud Program. Memvalidasi arsitektur teknis untuk menerapkan sistem AI yang aman, berskala global, dan tangguh di Google Cloud Platform untuk Spead AI."
    },
    category: "certifications",
    status: "COMPLETED",
    statusLabel: {
      en: "COMPLETED",
      id: "SELESAI"
    },
    statusCode: "SYS_CERTIFICATIONS_12"
  },
  {
    id: "time-6",
    year: "NOV 2025 - PRESENT",
    role: {
      en: "Founder",
      id: "Founder"
    },
    company: "Agent Buff",
    logo: "/assets/logos/agentbuff.png",
    description: {
      en: "Launched a specialized autonomous AI agent marketplace and digital workforce platform, serving 24/7 automated work units.",
      id: "Meluncurkan pasar agen AI otonom khusus dan platform tenaga kerja digital, menyajikan unit kerja otomatis 24/7."
    },
    details: {
      en: "Designed and built a 'Digital Workforce' ecosystem to democratize advanced AI utility for solopreneurs, students, and SMBs. Key features:\n\u2022 Shila (Personal Assistant): An autonomous scheduler and administrator that automates productivity.\n\u2022 AI Money Manager: A real-time financial analyst that processes cash flows and yields investment advice.\n\u2022 Business & Branding Dev: An agent that formulates brand identities and tactical business structures.\n\u2022 Support Units: Specialized micro-agents including AI Curhat (empathetic companion) and AI Tugas (academic research helper).\n\u2022 Mission: Deliver user-friendly, high-value automations that act as a 24/7 self-evolving digital workforce.",
      id: "Merancang dan membangun ekosistem 'Tenaga Kerja Digital' untuk mendemokratisasi pemanfaatan AI tingkat lanjut bagi solopreneur, pelajar, dan UMKM. Fitur utama:\n\u2022 Shila (Personal Assistant): Pengatur jadwal otonom dan administrator yang mengotomatiskan produktivitas.\n\u2022 AI Money Manager: Analis keuangan real-time yang memproses arus kas dan memberikan saran investasi.\n\u2022 Business & Branding Dev: Agen strategi yang merumuskan identitas merek dan struktur bisnis taktis.\n\u2022 Unit Pendukung: Agen mikro khusus termasuk AI Curhat (pendengar empatik) dan AI Tugas (asisten riset akademik).\n\u2022 Misi: Menghadirkan otomatisasi ramah pengguna yang berfungsi sebagai tenaga kerja digital 24/7."
    },
    category: "ventures",
    status: "ACTIVE",
    statusLabel: {
      en: "ACTIVE",
      id: "AKTIF"
    },
    statusCode: "SYS_VENTURES_6"
  },
  {
    id: "time-1",
    year: "JUL 2025 - JAN 2026",
    role: {
      en: "Strategic Initiative Analyst",
      id: "Strategic Initiative Analyst"
    },
    company: "Caliana Indonesia (PT Data Nusantara Adhikarya)",
    logo: "/assets/logos/caliana.png",
    description: {
      en: "Operating directly under the CEO to translate high-level business visions into data-driven strategic roadmaps and validate new tech ventures.",
      id: "Bekerja langsung di bawah CEO untuk menerjemahkan visi bisnis tingkat tinggi menjadi peta jalan strategis berbasis data dan memvalidasi ventura teknologi baru."
    },
    details: {
      en: "Working directly under the CEO to translate corporate vision into data-backed strategic initiatives. Key achievements:\n\u2022 Led deep-dive market research and competitor analysis to validate new business opportunities.\n\u2022 Designed and pitched the 'DNA Academy' business unit proposal with 5-year financial projections directly to the Board of Commissioners.\n\u2022 Formulated the 'Digital City' strategic proposal for Kediri Municipal Government, aligning economic urgency with the smart city masterplan.\n\u2022 Validated a new product (Mini Command Center), defining market size, USP, and prioritizations based on municipal urgency and purchasing power.\n\u2022 Designed data-backed executive personal branding roadmaps to increase leadership visibility.",
      id: "Bekerja langsung di bawah CEO untuk menerjemahkan visi korporat menjadi inisiatif strategis berbasis data. Pencapaian kunci:\n\u2022 Memimpin riset pasar mendalam dan analisis kompetitor untuk memvalidasi peluang bisnis baru.\n\u2022 Merancang dan mempresentasikan proposal unit bisnis 'DNA Academy' dengan proyeksi finansial 5 tahun langsung ke Dewan Komisaris.\n\u2022 Merumuskan proposal strategis 'Digital City' untuk Pemerintah Kota Kediri, menyelaraskan urgensi ekonomi dengan masterplan smart city.\n\u2022 Memvalidasi produk baru (Mini Command Center), mendefinisikan ukuran pasar, USP, dan prioritas berdasarkan urgensi kota dan daya beli.\n\u2022 Mengembangkan rekomendasi strategi personal branding berbasis data untuk CEO guna meningkatkan visibilitas kepemimpinan."
    },
    category: "experience",
    status: "COMPLETED",
    statusLabel: {
      en: "COMPLETED",
      id: "SELESAI"
    },
    statusCode: "SYS_EXPERIENCE_1"
  },
  {
    id: "time-7",
    year: "APR 2025 - PRESENT",
    role: {
      en: "Founder",
      id: "Founder"
    },
    company: "Spead AI",
    logo: "/assets/logos/spead.png",
    description: {
      en: "Selected for Google for Startups Cloud Program 2025. Architecting contextual RAG engines to transform expertise into scalable digital assets.",
      id: "Terpilih dalam Google for Startups Cloud Program 2025. Merancang RAG kontekstual untuk mengubah keahlian menjadi aset digital yang skalabel."
    },
    details: {
      en: "Developing advanced AI infrastructure for 'The Expertise Economy', resolving the limitations of generic AI models by tailoring internal organizational context. Key achievements:\n\u2022 Selected for the Google for Startups Cloud Program, acquiring elite compute access and deep technical mentorship.\n\u2022 Engineered a Contextual RAG Engine to secure corporate data integrations and automate complex, high-value document generation.\n\u2022 Proven Efficiency: Reduced document creation times by 87% (from 5 hours to ~40 minutes) while reducing human error in corporate reporting.\n\u2022 Product Suite: Formulating 'Builder Generator' for documents and 'AI Planner' for automated operations targeting professional firms.",
      id: "Mengembangkan infrastruktur AI tingkat lanjut untuk 'The Expertise Economy', mengatasi keterbatasan model AI generik dengan menyesuaikan konteks internal organisasi. Pencapaian kunci:\n\u2022 Terpilih dalam Google for Startups Cloud Program, mendapatkan akses komputasi tingkat elit dan mentorship teknis mendalam.\n\u2022 Merekayasa Engine RAG Kontekstual untuk mengamankan integrasi data perusahaan dan mengotomatiskan pembuatan dokumen kompleks bernilai tinggi.\n\u2022 Efisiensi Terbukti: Mengurangi waktu pembuatan dokumen sebesar 87% (dari 5 jam menjadi ~40 menit) sekaligus meminimalkan kesalahan manusia dalam pelaporan.\n\u2022 Rangkaian Produk: Merumuskan 'Builder Generator' untuk dokumen dan 'AI Planner' untuk operasional otomatis bagi firma profesional."
    },
    category: "ventures",
    status: "ACTIVE",
    statusLabel: {
      en: "ACTIVE",
      id: "AKTIF"
    },
    statusCode: "SYS_VENTURES_7"
  },
  {
    id: "time-8",
    year: "JAN 2025 - PRESENT",
    role: {
      en: "Founder",
      id: "Founder"
    },
    company: "Joki Hidup",
    logo: "/assets/logos/jokihidup.png",
    description: {
      en: "Founded a premium intellectual delegation platform powered by master-level experts to deliver high-quality academic and corporate research.",
      id: "Mendirikan platform delegasi intelektual premium yang didukung oleh ahli tingkat magister untuk riset akademik dan korporasi berkualitas tinggi."
    },
    details: {
      en: "Created a premium 'Intellectual Delegation' platform targeting high-value academic and professional assistance. Key features:\n\u2022 Expert Network: Recruits academic workers and professionals holding Master's (S2) degrees or S1 Cumlaude distinctions to ensure analytical depth.\n\u2022 Broad Scope: Services administrative needs ranging from high school levels to corporate executive paperwork.\n\u2022 Quality Assurance: Focuses on original research, deep synthesis, and technical writing integrity instead of simple answers.\n\u2022 Confidentiality: Ensures strict client data privacy and time-saving delegation workflows.",
      id: "Membangun platform 'Delegasi Intelektual' premium yang menargetkan bantuan akademis dan profesional berkualitas tinggi. Fitur utama:\n\u2022 Expert Network: Mempekerjakan tim pengerjaan dari kalangan profesional dan akademisi bergelar Magister (S2) serta lulusan S1 Cumlaude untuk memastikan kedalaman analisis.\n\u2022 Cakupan Luas: Melayani kebutuhan administratif mulai dari tingkat sekolah menengah hingga berkas eksekutif korporat.\n\u2022 Quality Assurance: Menitikberatkan pada orisinalitas riset, sintesis mendalam, dan integritas penulisan teknis, bukan sekadar jawaban instan.\n\u2022 Integritas: Menjamin privasi data klien secara ketat dan menyediakan alur delegasi yang efisien waktu."
    },
    category: "ventures",
    status: "ACTIVE",
    statusLabel: {
      en: "ACTIVE",
      id: "AKTIF"
    },
    statusCode: "SYS_VENTURES_8"
  },
  {
    id: "time-10",
    year: "OCT 2024 - PRESENT",
    role: {
      en: "Magister Manajemen (MM) New Ventures Innovation",
      id: "Magister Manajemen (MM) New Ventures Innovation"
    },
    company: "Prasetiya Mulya University",
    logo: "/assets/logos/prasetiyamulya.png",
    description: {
      en: "Acquiring advanced training in business innovation strategy, market validation, and product-market fit with a 3.50 GPA.",
      id: "Menempuh pendidikan tingkat lanjut dalam strategi inovasi bisnis, validasi pasar, dan product-market fit dengan IPK 3,50."
    },
    details: {
      en: "Pursuing a Master of Management degree focused on New Ventures and Innovation. This academic pivot complements my technical architectural background with scalable business strategies. Focuses:\n\u2022 Academic Focus: Business Innovation Strategy, Product-Market Fit, Venture Scaling, and Feasibility Studies.\n\u2022 Current GPA: 3.50 / 4.00.\n\u2022 Capstone Project: Co-Founder & Head of Product Strategy for Spead AI, utilizing it as an active sandbox to apply business model theories to commercial software.",
      id: "Menempuh pendidikan tingkat lanjut Magister Manajemen yang berfokus pada New Ventures & Innovation. Transisi akademis ini melengkapi latar belakang teknis arsitektur saya dengan strategi bisnis yang skalabel. Fokus:\n\u2022 Fokus Akademis: Strategi Inovasi Bisnis, Product-Market Fit, Penskalaan Ventura, dan Studi Kelayakan.\n\u2022 IPK Saat Ini: 3.50 / 4.00.\n\u2022 Proyek Capstone: Co-Founder & Head of Product Strategy untuk Spead AI, menggunakannya sebagai sandbox aktif untuk menerapkan teori model bisnis pada perangkat lunak komersil."
    },
    category: "education",
    status: "ACTIVE",
    statusLabel: {
      en: "ACTIVE",
      id: "AKTIF"
    },
    statusCode: "SYS_EDUCATION_10"
  },
  {
    id: "time-9",
    year: "FEB 2024 - PRESENT",
    role: {
      en: "Owner",
      id: "Owner"
    },
    company: "Gultik & Soto Masnug",
    logo: "/assets/logos/masnug.png",
    description: {
      en: "Scaled a traditional F&B street-food brand for Gen Z, optimizing digital branding and achieving a perfect 5-star Google Maps rating.",
      id: "Mengembangkan brand kuliner tradisional F&B untuk Gen Z, mengoptimalkan branding digital dan meraih rating sempurna bintang 5 di Google Maps."
    },
    details: {
      en: "Transformed a traditional street-food concept (Gulai Tikungan & Soto) into a modern, comfortable culinary brand targeted at Gen Z. Key achievements:\n\u2022 Established a unique brand positioning: 'Street food flavors, star-quality experience'.\n\u2022 Achieved a perfect 5-Star Google Maps rating with over 300 positive reviews in the first 6 months.\n\u2022 Structured daily F&B operations, managed a team of 6 staff, and optimized procurement systems.\n\u2022 Developed digital marketing funnels on Instagram and TikTok, converting local college students into repeating customers.",
      id: "Mentransformasi konsep makanan jalanan tradisional (Gulai Tikungan & Soto) menjadi merek kuliner modern yang nyaman bagi Gen Z. Pencapaian kunci:\n\u2022 Menetapkan positioning merek yang unik: 'Cita rasa kaki lima, kualitas bintang lima'.\n\u2022 Meraih rating sempurna Bintang 5 di Google Maps dengan 300+ ulasan positif dalam 6 bulan pertama.\n\u2022 Menata operasional harian, mengelola tim beranggotakan 6 staf, dan mengoptimalkan sistem pengadaan bahan baku.\n\u2022 Mengembangkan funnel pemasaran digital di Instagram dan TikTok, mengonversi mahasiswa lokal menjadi pelanggan setia."
    },
    category: "ventures",
    status: "ACTIVE",
    statusLabel: {
      en: "ACTIVE",
      id: "AKTIF"
    },
    statusCode: "SYS_VENTURES_9"
  },
  {
    id: "time-13",
    year: "FEB 2023",
    role: {
      en: "Int. Construction Contracts & Legal Frameworks",
      id: "Int. Construction Contracts & Legal Frameworks"
    },
    company: "PT Waskita Toll Road",
    logo: "/assets/logos/waskita.png",
    description: {
      en: "Certified in international construction contracts (FIDIC) and legal dispute mitigation in mega public works.",
      id: "Tersertifikasi dalam kontrak konstruksi internasional (FIDIC) dan mitigasi sengketa hukum pada proyek infrastruktur besar."
    },
    details: {
      en: "Completed professional legal training on FIDIC contracts. Learned dispute resolution procedures, contractual compliance, and claim management structures critical for national toll road infrastructure developments.",
      id: "Menyelesaikan pelatihan hukum profesional mengenai kontrak FIDIC. Mempelajari prosedur penyelesaian sengketa, kepatuhan kontraktual, dan struktur manajemen klaim yang sangat penting bagi pembangunan infrastruktur jalan tol nasional."
    },
    category: "certifications",
    status: "COMPLETED",
    statusLabel: {
      en: "COMPLETED",
      id: "SELESAI"
    },
    statusCode: "SYS_CERTIFICATIONS_13"
  },
  {
    id: "time-2",
    year: "AUG 2022 - JUL 2024",
    role: {
      en: "Contract & Claim Management",
      id: "Manajemen Kontrak & Klaim"
    },
    company: "PT Waskita Karya (Persero) Tbk",
    logo: "/assets/logos/waskita.png",
    description: {
      en: "Managed contract compliance and legal claims for multi-billion IDR national infrastructure projects, optimizing BUMN workflows.",
      id: "Mengelola kepatuhan kontrak dan klaim hukum untuk proyek infrastruktur nasional bernilai miliaran rupiah, mengoptimalkan alur kerja BUMN."
    },
    details: {
      en: "Administered contract and claim management for high-stakes national strategic infrastructure, ensuring compliance with government regulations and ISO standards. Key achievements:\n\u2022 Analyzed contract risks and formulated mitigation recommendations to resolve disputes among internal teams, consultants, and clients.\n\u2022 Conducted project audits and evaluations to align field execution with contractual specifications and SOPs.\n\u2022 Introduced digital tracking and documentation workflows to accelerate dispute and claim resolutions.\n\u2022 Projects handled: TMII G20 Renovation (Museum, Pavilions, Landscape), UIII Campus Phase III, Gadjah Mada University Innovation Hub (GIK UGM), Juanda Airport Runway Repair, Sheikh Zayed Grand Mosque Solo, and the Medan-Binjai Railway.",
      id: "Mengelola administrasi kontrak dan klaim untuk infrastruktur strategis nasional berisiko tinggi, memastikan kepatuhan terhadap regulasi pemerintah dan standar ISO. Pencapaian kunci:\n\u2022 Menganalisis risiko kontrak dan merumuskan rekomendasi mitigasi untuk menyelesaikan perselisihan antara tim internal, konsultan, dan klien.\n\u2022 Melakukan audit dan evaluasi proyek untuk menyelaraskan pelaksanaan lapangan dengan spesifikasi kontrak dan SOP.\n\u2022 Memperkenalkan alur kerja pelacakan dan dokumentasi digital untuk mempercepat penyelesaian sengketa klaim.\n\u2022 Proyek yang ditangani: Renovasi TMII G20 (Museum, Anjungan, Lanskap), Kampus UIII Tahap III, Gelanggang Inovasi dan Kreativitas UGM (GIK UGM), Perbaikan Runway Bandara Juanda, Masjid Raya Sheikh Zayed Solo, dan Jalur Kereta Api Medan-Binjai."
    },
    category: "experience",
    status: "COMPLETED",
    statusLabel: {
      en: "COMPLETED",
      id: "SELESAI"
    },
    statusCode: "SYS_EXPERIENCE_2"
  },
  {
    id: "time-3",
    year: "MAY 2022 - JUN 2024",
    role: {
      en: "Exclusive Creator & Affiliate",
      id: "Exclusive Creator & Affiliate"
    },
    company: "Shopee",
    logo: "/assets/logos/shopee.png",
    description: {
      en: "Selected as a premium partner to drive high-volume sales conversions through data-backed content marketing, achieving top-tier affiliate metrics.",
      id: "Terpilih sebagai mitra premium untuk mendorong konversi penjualan volume tinggi melalui pemasaran konten berbasis data, mencapai metrik afiliasi teratas."
    },
    details: {
      en: "Exclusively invited as a top-tier premium creator within the Shopee Video ecosystem. Key achievements:\n\u2022 Produced creative and high-converting video promotions tailored to Tech & Lifestyle product categories.\n\u2022 Analyzed affiliate performance data (CTR, CR) to optimize product selection and soft-selling conversion rates.\n\u2022 Collaborated with internal Shopee marketing teams and merchants to maximize campaign exposure during mega-sale events (9.9, 11.11, 12.12).\n\u2022 Developed a highly profitable and consistent passive income stream by converting social traffic into active platform buyers.",
      id: "Diundang secara eksklusif sebagai kreator premium tier atas dalam ekosistem Shopee Video. Pencapaian kunci:\n\u2022 Memproduksi promosi video kreatif berkonversi tinggi yang disesuaikan dengan kategori produk Tech & Lifestyle.\n\u2022 Menganalisis data kinerja afiliasi (CTR, CR) untuk mengoptimalkan pemilihan produk dan tingkat konversi soft-selling.\n\u2022 Berkolaborasi dengan tim pemasaran internal Shopee dan mitra merchant untuk memaksimalkan paparan kampanye selama acara penjualan besar (9.9, 11.11, 12.12).\n\u2022 Membangun aliran pendapatan pasif yang sangat menguntungkan dengan mengubah lalu lintas sosial menjadi pembeli aktif platform."
    },
    category: "experience",
    status: "COMPLETED",
    statusLabel: {
      en: "COMPLETED",
      id: "SELESAI"
    },
    statusCode: "SYS_EXPERIENCE_3"
  },
  {
    id: "time-17",
    year: "MAR 2022",
    role: {
      en: "Trainer & Speaker: Financial Planning",
      id: "Trainer & Pembicara: Perencanaan Keuangan"
    },
    company: "Diponegoro University (Undip)",
    logo: "/assets/logos/undip.png",
    description: {
      en: "Invited as a trainer to educate students on financial literacy and investment strategies.",
      id: "Diundang sebagai pelatih untuk mengedukasi mahasiswa tentang literasi keuangan dan strategi investasi."
    },
    details: {
      en: "Instructed students on wealth management, budgeting, and investment strategies to promote long-term financial resilience.",
      id: "Mengajar mahasiswa tentang manajemen kekayaan, penganggaran, dan strategi investasi untuk mendorong ketahanan keuangan jangka panjang."
    },
    category: "organization",
    status: "COMPLETED",
    statusLabel: {
      en: "COMPLETED",
      id: "SELESAI"
    },
    statusCode: "SYS_ORGANIZATION_17"
  },
  {
    id: "time-22",
    year: "MAR 2022",
    role: {
      en: "Speaker & Trainer: Financial Planning",
      id: "Speaker & Trainer: Financial Planning"
    },
    company: "Diponegoro University (Undip)",
    logo: "/assets/logos/undip.png",
    description: {
      en: "Educated university students on financial planning, investments, and personal asset management.",
      id: "Mengedukasi mahasiswa mengenai perencanaan keuangan, investasi, dan manajemen aset pribadi."
    },
    details: {
      en: "Conducted workshops to improve financial literacy among university students. Covered basic budgeting, capital allocation, and risk management strategies.",
      id: "Mengadakan lokakarya untuk meningkatkan literasi keuangan di kalangan mahasiswa. Mencakup penganggaran dasar, alokasi modal, dan strategi manajemen risiko."
    },
    category: "certifications",
    status: "COMPLETED",
    statusLabel: {
      en: "COMPLETED",
      id: "SELESAI"
    },
    statusCode: "SYS_CERTIFICATIONS_22"
  },
  {
    id: "time-4",
    year: "NOV 2021 - PRESENT",
    role: {
      en: "Content Creator (@nugrahalabib)",
      id: "Content Creator (@nugrahalabib)"
    },
    company: "TikTok / Self-employed",
    logo: "/assets/logos/tiktok.png",
    description: {
      en: "Pioneered the viral 'Dating with Technology' content series, scaling a tech community to 140K+ followers and generating 40M+ views.",
      id: "Mempopulerkan seri konten viral 'Pacaran dengan Teknologi', mengembangkan komunitas teknologi hingga 140K+ pengikut dan menghasilkan 40M+ tayangan."
    },
    details: {
      en: "Established and managed a personal digital brand focused on Tech & Lifestyle storytelling, simplifying complex technical specifications for a mass audience. Key achievements:\n\u2022 Created the 'Dating with Technology' (#pacarcanggihku) signature concept, which generated over 40.9 million views.\n\u2022 Secured rapid account scaling, growing from 0 to 100,000+ followers in less than 1.5 months.\n\u2022 Maintained consistent audience engagement, averaging 2.5+ million organic views monthly.\n\u2022 Partnered with major brands (ASUS, Philips, Bibit, Bardi) to design and execute high-impact national digital marketing campaigns.",
      id: "Bangun dan mengelola merek digital pribadi yang berfokus pada visualisasi Tech & Lifestyle, menyederhanakan spesifikasi teknis yang rumit untuk audiens massal. Pencapaian kunci:\n\u2022 Menciptakan konsep khas 'Pacaran dengan Teknologi' (#pacarcanggihku) yang menghasilkan lebih dari 40,9 juta tayangan.\n\u2022 Mengembangkan skala akun dengan cepat, tumbuh dari 0 hingga 100.000+ pengikut dalam waktu kurang dari 1,5 bulan.\n\u2022 Mempertahankan keterlibatan audiens yang konsisten, rata-rata 2,5+ juta tayangan organik bulanan.\n\u2022 Bermitra dengan merek-merek besar (ASUS, Philips, Bibit, Bardi) untuk merancang dan mengeksekusi kampanye pemasaran digital nasional."
    },
    category: "experience",
    status: "ACTIVE",
    statusLabel: {
      en: "ACTIVE",
      id: "AKTIF"
    },
    statusCode: "SYS_EXPERIENCE_4"
  },
  {
    id: "time-20",
    year: "JAN 2021 - PRESENT",
    role: {
      en: "Asset Manager",
      id: "Asset Manager"
    },
    company: "Mutiara 27",
    description: {
      en: "Directing operations and leasing strategy for a real estate portfolio of 100+ residential rental units, maintaining high occupancy.",
      id: "Memimpin operasional dan strategi penyewaan untuk portofolio properti sewa hunian 100+ unit, menjaga tingkat okupansi tinggi."
    },
    details: {
      en: "Overseeing business operations for a residential rental portfolio containing over 100 units. Key achievements:\n\u2022 Maintained maximum Occupancy Rates via hyper-local marketing and tenant relationship management.\n\u2022 Managed daily tenant relations, resolving complaints rapidly and ensuring consistent utility services.\n\u2022 Supervised preventative maintenance to preserve structural value and prevent building depreciation.\n\u2022 Enforced strict budget audits on OPEX and CAPEX to guarantee stable long-term cash flow.",
      id: "Mengawasi operasional bisnis untuk portofolio sewa hunian yang mencakup lebih dari 100 unit. Pencapaian kunci:\n\u2022 Mempertahankan tingkat hunian maksimal melalui pemasaran lokal terarah dan manajemen hubungan penyewa.\n\u2022 Mengelola hubungan harian dengan penyewa, menyelesaikan keluhan dengan cepat, dan memastikan kelancaran utilitas.\n\u2022 Mengawasi pemeliharaan preventif untuk menjaga nilai struktural properti dan mencegah depresiasi bangunan.\n\u2022 Melakukan audit anggaran OPEX dan CAPEX yang ketat untuk menjamin stabilitas arus kas jangka panjang."
    },
    category: "ventures",
    status: "ACTIVE",
    statusLabel: {
      en: "ACTIVE",
      id: "AKTIF"
    },
    statusCode: "SYS_VENTURES_20"
  },
  {
    id: "time-21",
    year: "SEP 2020 - PRESENT",
    role: {
      en: "Owner & Visualizer",
      id: "Owner & Visualizer"
    },
    company: "LAB.in Studio",
    description: {
      en: "Founded an architectural visualization studio, managing a team of 4 designers to deliver 3D rendering and graphic assets for 30+ clients.",
      id: "Mendirikan studio visualisasi arsitektur, mengelola tim beranggotakan 4 desainer untuk memproduksi render 3D dan aset grafis bagi 30+ klien."
    },
    details: {
      en: "Founded and directed a creative studio providing end-to-end architectural design, photorealistic 3D visualization, rendering, and branding assets. Key achievements:\n\u2022 Organized and led a team of 4 design staff, building custom SOPs and timeline managers to maximize output.\n\u2022 Enforced rigorous Quality Control benchmarks before final assets were delivered to clients.\n\u2022 Successfully delivered complex architectural renderings and conceptual videos for over 30 corporate and private clients.",
      id: "Mendirikan dan memimpin studio kreatif yang menyediakan desain arsitektur end-to-end, visualisasi 3D fotorealistik, render, dan aset branding. Pencapaian kunci:\n\u2022 Mengorganisir dan memimpin tim beranggotakan 4 staf desainer, membangun SOP khusus dan pengelola garis waktu untuk memaksimalkan hasil.\n\u2022 Menerapkan standar Kontrol Kualitas yang ketat sebelum aset akhir diserahkan kepada klien.\n\u2022 Berhasil mengirimkan render arsitektur kompleks dan video konseptual untuk lebih dari 30 klien korporasi dan pribadi."
    },
    category: "ventures",
    status: "ACTIVE",
    statusLabel: {
      en: "ACTIVE",
      id: "AKTIF"
    },
    statusCode: "SYS_VENTURES_21"
  },
  {
    id: "time-23",
    year: "JUN 2020",
    role: {
      en: "BIM Building Modeling - Allplan",
      id: "BIM Building Modeling - Allplan"
    },
    company: "PT Wijaya Karya (Persero) Tbk",
    description: {
      en: "Certified in Building Information Modeling (BIM) using Allplan to construct highly detailed structural plans.",
      id: "Tersertifikasi dalam Building Information Modeling (BIM) menggunakan Allplan untuk membangun rencana struktural terperinci."
    },
    details: {
      en: "Obtained technical certification in Allplan BIM software. Validated capabilities in digital modeling of reinforced concrete structures, aligning with BUMN structural digitization workflows.",
      id: "Mendapatkan sertifikasi teknis dalam perangkat lunak Allplan BIM. Memvalidasi kemampuan dalam pemodelan digital struktur beton bertulang, menyelaraskan dengan alur kerja digitalisasi struktural BUMN."
    },
    category: "certifications",
    status: "COMPLETED",
    statusLabel: {
      en: "COMPLETED",
      id: "SELESAI"
    },
    statusCode: "SYS_CERTIFICATIONS_23"
  },
  {
    id: "time-24",
    year: "MAR 2020",
    role: {
      en: "Copywriting & Sales Psychology",
      id: "Copywriting & Sales Psychology"
    },
    company: "Skill Academy by Ruangguru",
    description: {
      en: "Certified in copywriting, persuasive writing, and sales psychology, establishing the core skills for my content career.",
      id: "Tersertifikasi dalam copywriting, penulisan persuasif, dan psikologi penjualan, membangun keterampilan inti untuk karir konten saya."
    },
    details: {
      en: "Learned writing structures that drive commercial conversions. Developed audience psychology models and storytelling structures that enabled scaling organic social media accounts.",
      id: "Mempelajari struktur penulisan yang mendorong konversi komersial. Mengembangkan model psikologi audiens dan struktur storytelling yang memungkinkan penskalaan akun media sosial organik."
    },
    category: "certifications",
    status: "COMPLETED",
    statusLabel: {
      en: "COMPLETED",
      id: "SELESAI"
    },
    statusCode: "SYS_CERTIFICATIONS_24"
  },
  {
    id: "time-5",
    year: "JAN 2020 - MAR 2020",
    role: {
      en: "Junior Architect Intern",
      id: "Junior Architect Intern"
    },
    company: "PT Airmas Asri",
    description: {
      en: "Designed spatial planning concepts and 3D models for large-scale developments, forming the basis of my structural thinking.",
      id: "Merancang konsep perencanaan tata ruang dan model 3D untuk pembangunan skala besar, membentuk dasar pemikiran terstruktur."
    },
    details: {
      en: "Contributed to high-profile architectural projects in a premier design firm, blending aesthetic design with technical structure. Key achievements:\n\u2022 Developed concept designs and detailed planning drawings for the 'School PIK 2' project.\n\u2022 Created 3D models and facade studies to visualize spatial concepts and architectural skins.\n\u2022 Produced photorealistic renders and post-production visualizations for successful client presentations.\n\u2022 Embedded structural design logic that serves as the foundation for the 'Structured Chaos' business strategy today.",
      id: "Berkontribusi pada proyek arsitektur profil tinggi di biro desain terkemuka, memadukan desain estetika dengan struktur teknis. Pencapaian kunci:\n\u2022 Mengembangkan desain konsep dan gambar perencanaan terperinci untuk proyek 'School PIK 2'.\n\u2022 Membuat model 3D dan studi fasad untuk memvisualisasikan konsep spasial dan kulit arsitektur.\n\u2022 Memproduksi render fotorealistis dan visualisasi pasca-produksi untuk presentasi klien yang sukses.\n\u2022 Menanamkan logika desain struktural yang menjadi fondasi strategi bisnis 'Structured Chaos' saat ini."
    },
    category: "experience",
    status: "COMPLETED",
    statusLabel: {
      en: "COMPLETED",
      id: "SELESAI"
    },
    statusCode: "SYS_EXPERIENCE_5"
  },
  {
    id: "time-25",
    year: "SEP 2019",
    role: {
      en: "4th Winner Ecohouse Design Competition",
      id: "Juara Harapan 1 Ecohouse Design Competition"
    },
    company: "Universitas Gadjah Mada (UGM)",
    description: {
      en: "Awarded 4th place in national architectural competition for sustainable residential designs.",
      id: "Meraih Juara Harapan 1 dalam kompetisi arsitektur nasional untuk desain hunian berkelanjutan."
    },
    details: {
      en: "Evaluated on sustainable building design, energy conservation, and green materials. Proposed low-carbon residential layouts tailored for tropical microclimates.",
      id: "Dievaluasi berdasarkan desain bangunan berkelanjutan, konservasi energi, dan material ramah lingkungan. Mengusulkan tata letak hunian rendah karbon yang disesuaikan dengan mikroklimat tropis."
    },
    category: "certifications",
    status: "COMPLETED",
    statusLabel: {
      en: "COMPLETED",
      id: "SELESAI"
    },
    statusCode: "SYS_CERTIFICATIONS_25"
  },
  {
    id: "time-26",
    year: "SEP 2019",
    role: {
      en: "Infrastructure & Earthquake Mitigation Seminar",
      id: "Seminar Infrastruktur & Mitigasi Gempa"
    },
    company: "Universitas Gadjah Mada (UGM)",
    description: {
      en: "Gained engineering insights on disaster-resilient structural design and municipal planning.",
      id: "Memperoleh wawasan teknik tentang desain struktur tahan bencana dan perencanaan kota."
    },
    details: {
      en: "Explored earthquake-resistant structural engineering and municipal evacuation mapping, learning methods to secure urban structures during natural disasters.",
      id: "Mempelajari rekayasa struktur tahan gempa dan pemetaan evakuasi kota, mempelajari metode untuk mengamankan struktur perkotaan selama bencana alam."
    },
    category: "certifications",
    status: "COMPLETED",
    statusLabel: {
      en: "COMPLETED",
      id: "SELESAI"
    },
    statusCode: "SYS_CERTIFICATIONS_26"
  },
  {
    id: "time-27",
    year: "JUL 2019",
    role: {
      en: "Parametric Architectural Design",
      id: "Parametric Architectural Design"
    },
    company: "Skala Architectural Course",
    description: {
      en: "Completed parametric design course, scripting algorithmic forms and computational structures.",
      id: "Menyelesaikan kursus desain parametrik, memprogram bentuk algoritmik dan struktur komputasional."
    },
    details: {
      en: "Mastered Grasshopper and Rhinoceros modeling, using data parameters and math constraints to construct complex organic facades and building shells.",
      id: "Menguasai pemodelan Grasshopper dan Rhinoceros, menggunakan parameter data dan batasan matematika untuk membangun fasad organik dan selubung bangunan yang kompleks."
    },
    category: "certifications",
    status: "COMPLETED",
    statusLabel: {
      en: "COMPLETED",
      id: "SELESAI"
    },
    statusCode: "SYS_CERTIFICATIONS_27"
  },
  {
    id: "time-35",
    year: "MAR 2019 - MAY 2019",
    role: {
      en: "Guest Speaker & Lead Documentarian (ODM)",
      id: "Pembicara Tamu & Koordinator Dokumentasi (ODM)"
    },
    company: "Department of Architecture, UNDIP",
    logo: "/assets/logos/undip.png",
    description: {
      en: "Directed documentation and media production for a major university design competition.",
      id: "Memimpin dokumentasi dan produksi media untuk kompetisi desain universitas besar."
    },
    details: {
      en: "Managed the media and documentation division for the Multipurpose Building Design competition. Supervised photographers and editors to create promotional content.",
      id: "Mengelola divisi media dan dokumentasi untuk kompetisi Desain Gedung Serbaguna. Mengawasi fotografer dan editor untuk membuat konten promosi."
    },
    category: "organization",
    status: "COMPLETED",
    statusLabel: {
      en: "COMPLETED",
      id: "SELESAI"
    },
    statusCode: "SYS_ORGANIZATION_35"
  },
  {
    id: "time-28",
    year: "MAR 2019",
    role: {
      en: "Architect Digivolution - 3D Visualization",
      id: "Architect Digivolution - 3D Visualisasi"
    },
    company: "KUNKUN Visual",
    description: {
      en: "Completed advanced visualization training with industry leaders, studying lighting and post-production.",
      id: "Menyelesaikan pelatihan visualisasi tingkat lanjut bersama pemimpin industri, mempelajari pencahayaan dan pasca-produksi."
    },
    details: {
      en: "Trained under elite CGI artists at KUNKUN Visual. Studied realistic lighting algorithms, textures, and composition concepts used to create premium architectural renders.",
      id: "Dilatih di bawah seniman CGI elit di KUNKUN Visual. Mempelajari algoritma pencahayaan realistis, tekstur, dan konsep komposisi yang digunakan untuk membuat render arsitektur premium."
    },
    category: "certifications",
    status: "COMPLETED",
    statusLabel: {
      en: "COMPLETED",
      id: "SELESAI"
    },
    statusCode: "SYS_CERTIFICATIONS_28"
  },
  {
    id: "time-29",
    year: "MAR 2019",
    role: {
      en: "Architectural Design Exploration Forum",
      id: "Architectural Design Exploration Forum"
    },
    company: "ARCHINESIA",
    description: {
      en: "Engaged with leading architects to discuss modern spatial concepts and real estate trends.",
      id: "Terlibat dengan arsitek terkemuka untuk mendiskusikan konsep spasial modern dan tren real estat."
    },
    details: {
      en: "Exchanged concepts regarding contemporary Southeast Asian architecture and high-occupancy residential planning at the ARCHINESIA #50 forum.",
      id: "Bertukar konsep mengenai arsitektur kontemporer Asia Tenggara dan perencanaan hunian berkepadatan tinggi di forum ARCHINESIA #50."
    },
    category: "certifications",
    status: "COMPLETED",
    statusLabel: {
      en: "COMPLETED",
      id: "SELESAI"
    },
    statusCode: "SYS_CERTIFICATIONS_29"
  },
  {
    id: "time-30",
    year: "FEB 2019",
    role: {
      en: "Architectural Rendering & Compositing",
      id: "Architectural Rendering & Compositing"
    },
    company: "Skala Architectural Course",
    description: {
      en: "Studied camera compositing and V-Ray lighting to produce photorealistic visuals.",
      id: "Mempelajari komposit kamera dan pencahayaan V-Ray untuk menghasilkan visual fotorealistik."
    },
    details: {
      en: "Studied photorealistic rendering configurations, covering material mappings, global illumination, and camera setups to produce high-end design visual assets.",
      id: "Mempelajari konfigurasi render fotorealistik, mencakup pemetaan material, pencahayaan global, dan pengaturan kamera untuk menghasilkan aset visual desain kelas atas."
    },
    category: "certifications",
    status: "COMPLETED",
    statusLabel: {
      en: "COMPLETED",
      id: "SELESAI"
    },
    statusCode: "SYS_CERTIFICATIONS_30"
  },
  {
    id: "time-31",
    year: "FEB 2019",
    role: {
      en: "BIM Archicad Modeling",
      id: "BIM Archicad Modeling"
    },
    company: "Skala Architectural Course",
    description: {
      en: "Learned CAD to BIM migration strategies, modeling structural properties in virtual environments.",
      id: "Mempelajari strategi migrasi CAD ke BIM, memodelkan properti struktural di lingkungan virtual."
    },
    details: {
      en: "Mastered BIM workflow integrations using Archicad, defining structural and material properties in architectural database models for quantity takeoff optimization.",
      id: "Menguasai integrasi alur kerja BIM menggunakan Archicad, mendefinisikan sifat struktural dan material dalam model database arsitektur untuk optimalisasi perhitungan volume."
    },
    category: "certifications",
    status: "COMPLETED",
    statusLabel: {
      en: "COMPLETED",
      id: "SELESAI"
    },
    statusCode: "SYS_CERTIFICATIONS_31"
  },
  {
    id: "time-32",
    year: "DEC 2018",
    role: {
      en: "Creative Leadership & Architectural Trends",
      id: "Kepemimpinan Kreatif & Tren Arsitektur"
    },
    company: "Architecture Student Association",
    description: {
      en: "Studied organizational management, team building, and design trends for student leadership.",
      id: "Mempelajari manajemen organisasi, pengembangan tim, dan tren desain untuk kepemimpinan mahasiswa."
    },
    details: {
      en: "Analyzed leadership styles and contemporary design trends, learning to lead creative teams and organize student events.",
      id: "Menganalisis gaya kepemimpinan dan tren desain kontemporer, belajar memimpin tim kreatif dan mengatur acara mahasiswa."
    },
    category: "certifications",
    status: "COMPLETED",
    statusLabel: {
      en: "COMPLETED",
      id: "SELESAI"
    },
    statusCode: "SYS_CERTIFICATIONS_32"
  },
  {
    id: "time-33",
    year: "NOV 2018",
    role: {
      en: "BIM Technology in Construction Seminar",
      id: "Seminar Teknologi BIM dalam Konstruksi"
    },
    company: "CEIC UNDIP",
    logo: "/assets/logos/undip.png",
    description: {
      en: "Studied BUMN standards for BIM digital workflows in civil infrastructure planning.",
      id: "Mempelajari standar BUMN untuk alur kerja digital BIM dalam perencanaan infrastruktur sipil."
    },
    details: {
      en: "Investigated cases of BIM implementation in municipal infrastructure, discussing database integrations and coordination benefits between engineering branches.",
      id: "Menyelidiki kasus implementasi BIM dalam infrastruktur perkotaan, mendiskusikan integrasi database dan manfaat koordinasi antar cabang teknik."
    },
    category: "certifications",
    status: "COMPLETED",
    statusLabel: {
      en: "COMPLETED",
      id: "SELESAI"
    },
    statusCode: "SYS_CERTIFICATIONS_33"
  },
  {
    id: "time-34",
    year: "OCT 2018",
    role: {
      en: "Place Making in Transient Space Seminar",
      id: "Seminar Place Making in Transient Space"
    },
    company: "Architecture Student Association",
    description: {
      en: "Analyzed urban planning frameworks of human-space interaction and temporary environments.",
      id: "Menganalisis kerangka perencanaan kota tentang interaksi manusia-ruang dan lingkungan sementara."
    },
    details: {
      en: "Studied urban placemaking concepts, analyzing how micro-spaces and temporary installations shape community identity and human spatial behavior.",
      id: "Mempelajari konsep placemaking perkotaan, menganalisis bagaimana ruang mikro dan instalasi sementara membentuk identitas komunitas dan perilaku spasial manusia."
    },
    category: "certifications",
    status: "COMPLETED",
    statusLabel: {
      en: "COMPLETED",
      id: "SELESAI"
    },
    statusCode: "SYS_CERTIFICATIONS_34"
  },
  {
    id: "time-37",
    year: "SEP 2018",
    role: {
      en: "Guest Speaker: Student Management LKMM",
      id: "Pembicara Tamu: Pelatihan Manajemen LKMM"
    },
    company: "Department of Architecture, UNDIP",
    logo: "/assets/logos/undip.png",
    description: {
      en: "Instructed student leaders on basic organizational structures and team collaboration.",
      id: "Melatih para pemimpin mahasiswa tentang struktur organisasi dasar dan kolaborasi tim."
    },
    details: {
      en: "Presented modules on basic project management, delegation pipelines, and creative leadership to undergraduate students.",
      id: "Mempresentasikan modul tentang manajemen proyek dasar, alur delegasi, dan kepemimpinan kreatif kepada mahasiswa sarjana."
    },
    category: "organization",
    status: "COMPLETED",
    statusLabel: {
      en: "COMPLETED",
      id: "SELESAI"
    },
    statusCode: "SYS_ORGANIZATION_37"
  },
  {
    id: "time-36",
    year: "AUG 2018 - AUG 2019",
    role: {
      en: "Head of Architectural Videography",
      id: "Kepala Divisi Videografi Arsitektur"
    },
    company: "Diponegoro University Club",
    logo: "/assets/logos/undip.png",
    description: {
      en: "Directed creative content, video production, and social media promotion for architectural events.",
      id: "Memimpin konten kreatif, produksi video, dan promosi media sosial untuk kegiatan arsitektur."
    },
    details: {
      en: "Supervised video editors and conceptualized short videos to capture student architectural projects, managing team budgets and marketing operations.",
      id: "Mengawasi editor video dan mengonsep video pendek untuk mendokumentasikan proyek arsitektur mahasiswa, mengelola anggaran tim dan operasional pemasaran."
    },
    category: "organization",
    status: "COMPLETED",
    statusLabel: {
      en: "COMPLETED",
      id: "SELESAI"
    },
    statusCode: "SYS_ORGANIZATION_36"
  },
  {
    id: "time-11",
    year: "AUG 2017 - DEC 2021",
    role: {
      en: "Bachelor of Architecture",
      id: "Bachelor of Architecture"
    },
    company: "Diponegoro University (UNDIP)",
    logo: "/assets/logos/undip.png",
    description: {
      en: "Graduated Cumlaude in Architecture with a 3.65 GPA, specializing in green buildings and design thinking.",
      id: "Lulus Cumlaude di bidang Arsitektur dengan IPK 3,65, berspesialisasi dalam bangunan ramah lingkungan dan design thinking."
    },
    details: {
      en: "Completed a Bachelor of Architecture degree with Cumlaude distinction. Built systemic design logic and complex spatial planning frameworks. Highlights:\n\u2022 Graduation honors: Cumlaude (GPA 3.65 / 4.00).\n\u2022 Specialization: Green Building (Sustainable Architecture) and Tourism Design.\n\u2022 Key Projects: Designed a 4-Star Resort Hotel in Jepara (2021), a 3-Star Resort Hotel in Guci (2020), and Redesigned the Undip University Library (2020).\n\u2022 Core Competencies: Project planning, architectural visualization, and Design Thinking methodology.",
      id: "Menyelesaikan gelar Sarjana Arsitektur dengan predikat Cumlaude. Membangun logika desain sistematis dan kerangka perencanaan tata ruang yang kompleks. Detail:\n\u2022 Kehormatan Kelulusan: Cumlaude (IPK 3.65 / 4.00).\n\u2022 Spesialisasi: Green Building (Arsitektur Berkelanjutan) dan Desain Pariwisata.\n\u2022 Proyek Utama: Merancang Hotel Resort Bintang 4 di Jepara (2021), Hotel Resort Bintang 3 di Guci (2020), dan Merancang Ulang Perpustakaan Universitas Undip (2020).\n\u2022 Kompetensi Utama: Perencanaan proyek, visualisasi arsitektur, dan metodologi Design Thinking."
    },
    category: "education",
    status: "COMPLETED",
    statusLabel: {
      en: "COMPLETED",
      id: "SELESAI"
    },
    statusCode: "SYS_EDUCATION_11"
  },
  ]
};
