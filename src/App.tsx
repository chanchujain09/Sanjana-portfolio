/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect, useRef } from 'react';
import { motion, useScroll, useTransform, useInView, AnimatePresence } from 'motion/react';
import { Video, PlayCircle, Play, Film, Clock, Briefcase, Pencil, Pause, Palette, Mic, GraduationCap, Phone, Mail, MapPin, CheckCircle, Star, Quote, ChevronLeft, ChevronRight, ArrowLeft, ArrowRight, Heart, Globe, Scissors, Layers, Music, PenTool, Share2, TrendingUp, Instagram, Twitter, Music2, FileText, Sparkles, Download } from 'lucide-react';

const GridOverlay = () => (
  <div 
    className="absolute inset-0 z-0 pointer-events-none"
    style={{
      opacity: 0.08,
      backgroundImage: `linear-gradient(to right, #1a1a2e 1px, transparent 1px), linear-gradient(to bottom, #1a1a2e 1px, transparent 1px)`,
      backgroundSize: '60px 60px',
    }}
  />
);

const allProjects = [
  { title: "University Promo Reel", category: "Educational Content", badge: "50K+ Views", img: "https://images.unsplash.com/photo-1523580494863-6f3031224c94?q=80&w=400&auto=format&fit=crop" },
  { title: "Travel Content Series", category: "Lifestyle & Travel", badge: "200K+ Views", img: "https://images.unsplash.com/photo-1504280650965-613ed842289f?q=80&w=400&auto=format&fit=crop" },
  { title: "Brand Story Edit", category: "Commercial", badge: "10K+ Likes", img: "https://images.unsplash.com/photo-1600880292203-757bb62b4baf?q=80&w=400&auto=format&fit=crop" },
  { title: "Short Form Reel Pack", category: "Social Media", badge: "500K+ Views", img: "https://images.unsplash.com/photo-1616469829581-73993eb86b02?q=80&w=400&auto=format&fit=crop" },
  { title: "Event Coverage Edit", category: "Events & Campus", badge: "30K+ Views", img: "https://images.unsplash.com/photo-1540575467063-178a50c2df87?q=80&w=400&auto=format&fit=crop" },
  { title: "Raw Footage Showreel", category: "Behind the Scenes", badge: "Raw Footage", img: "https://images.unsplash.com/photo-1585644131553-611ffc1c1f7a?q=80&w=400&auto=format&fit=crop" },
  { title: "Cinematic Edit", category: "Brand Film", badge: "80K+ Views", img: "https://images.unsplash.com/photo-1574717024653-61fd2cf4d44d?q=80&w=400&auto=format&fit=crop" },
  { title: "Product Launch Reel", category: "Commercial", badge: "25K+ Views", img: "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?q=80&w=400&auto=format&fit=crop" },
  { title: "Campus Tour Video", category: "Educational", badge: "15K+ Views", img: "https://images.unsplash.com/photo-1611162617474-5b21e879e113?q=80&w=400&auto=format&fit=crop" },
  { title: "Documentary Cut", category: "Long Form", badge: "100K+ Views", img: "https://images.unsplash.com/photo-1516321318423-f06f85e504b3?q=80&w=400&auto=format&fit=crop" }
];

const portfolioCards = [
  {
    id: 1,
    creator: "Sanjana M.",
    image: "https://images.unsplash.com/photo-1574717024653-61fd2cf4d44d?q=80&w=600&auto=format&fit=crop",
    category: "Short-Form & Reels"
  },
  {
    id: 2,
    creator: "Marcus R.",
    image: "https://images.unsplash.com/photo-1598488035139-bdbb2231ce04?q=80&w=600&auto=format&fit=crop",
    category: "Short-Form & Reels",
    overlayText: "overlay",
    overlayStyle: "text-white text-[48px] font-bold"
  },
  {
    id: 3,
    creator: "Brandon K.",
    image: "https://images.unsplash.com/photo-1523580494863-6f3031224c94?q=80&w=600&auto=format&fit=crop",
    category: "Youtube",
    bottomOverlay: "anything STRANGE"
  },
  {
    id: 4,
    creator: "Ethan C.",
    image: "https://images.unsplash.com/photo-1616469829581-73993eb86b02?q=80&w=600&auto=format&fit=crop",
    category: "Youtube"
  },
  {
    id: 5,
    creator: "Joshua M.",
    image: "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?q=80&w=600&auto=format&fit=crop",
    category: "Short-Form & Reels",
    overlayText: "colors",
    overlayStyle: "text-[#ec4899] text-[56px] font-bold italic"
  },
  {
    id: 6,
    creator: "Nathan B.",
    image: "https://images.unsplash.com/photo-1540575467063-178a50c2df87?q=80&w=600&auto=format&fit=crop",
    category: "Youtube"
  }
];

const servicesData = [
  { num:"01", icon: Play, title:"Short Form Editing", desc:"Platform-ready reels and shorts with clean cuts and perfect pacing.", bullets:["Optimized for Instagram, YouTube & TikTok","Captions and transitions included","Delivered within 48–72 hours"] },
  { num:"02", icon: Pencil, title:"Visual Storytelling", desc:"Turning raw footage into emotionally engaging narratives.", bullets:["Hook, story arc and CTA structure","Pacing matched to your audience","Educational and brand storytelling"] },
  { num:"03", icon: Pause, title:"Motion Graphics", desc:"Text animations, intros, and on-brand visual effects.", bullets:["Custom intros and outros","On-brand text overlays","After Effects motion design"] },
  { num:"04", icon: Palette, title:"Color Grading", desc:"Every frame color-treated to feel cinematic and intentional.", bullets:["Custom color profile per project","LUT and skin tone correction","Consistent look across all edits"] },
  { num:"05", icon: Mic, title:"Audio Finetuning", desc:"Balanced, clean audio that makes every word land.", bullets:["Noise removal and cleanup","EQ and volume balancing","Music and SFX mixing"] },
  { num:"06", icon: GraduationCap, title:"Content for Institutions", desc:"Specialized in educational and university promotional content.", bullets:["Campus tours and event coverage","Admissions and brand films","Social media campaigns for colleges"] }
];

export default function App() {

  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const [cursorVariant, setCursorVariant] = useState('default');
  const [isVisible, setIsVisible] = useState(false);
  const [trailPos, setTrailPos] = useState({ x: 0, y: 0 });
  const [cursorLabel, setCursorLabel] = useState('');
  const [showResume, setShowResume] = useState(false);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setMousePos({ x: e.clientX, y: e.clientY });
      setIsVisible(true);
    };
    const handleMouseLeave = () => setIsVisible(false);
    const handleMouseEnter = () => setIsVisible(true);
    
    window.addEventListener('mousemove', handleMouseMove);
    document.addEventListener('mouseleave', handleMouseLeave);
    document.addEventListener('mouseenter', handleMouseEnter);
    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseleave', handleMouseLeave);
      document.removeEventListener('mouseenter', handleMouseEnter);
    };
  }, []);

  useEffect(() => {
    const interval = setInterval(() => {
      setTrailPos(prev => ({
        x: prev.x + (mousePos.x - prev.x) * 0.15,
        y: prev.y + (mousePos.y - prev.y) * 0.15
      }));
    }, 16);
    return () => clearInterval(interval);
  }, [mousePos]);

  const cursorVariants = {
    default: {
      x: mousePos.x - 8,
      y: mousePos.y - 8,
      width: 16,
      height: 16,
      backgroundColor: 'rgba(124, 58, 237, 0.8)',
      border: '0px solid transparent',
      mixBlendMode: 'normal' as any
    },
    hover: {
      x: mousePos.x - 20,
      y: mousePos.y - 20,
      width: 40,
      height: 40,
      backgroundColor: 'rgba(124, 58, 237, 0.15)',
      border: '1.5px solid rgba(124, 58, 237, 0.8)',
      mixBlendMode: 'normal' as any
    },
    text: {
      x: mousePos.x - 30,
      y: mousePos.y - 30,
      width: 60,
      height: 60,
      backgroundColor: 'rgba(124, 58, 237, 0.08)',
      border: '1px solid rgba(124, 58, 237, 0.5)',
      mixBlendMode: 'normal' as any
    },
    button: {
      x: mousePos.x - 28,
      y: mousePos.y - 28,
      width: 56,
      height: 56,
      backgroundColor: 'rgba(124, 58, 237, 0.25)',
      border: '1.5px solid rgba(167, 139, 250, 0.9)',
      mixBlendMode: 'normal' as any
    },
    play: {
      x: mousePos.x - 36,
      y: mousePos.y - 36,
      width: 72,
      height: 72,
      backgroundColor: 'rgba(124, 58, 237, 0.25)',
      border: '1.5px solid rgba(167, 139, 250, 0.9)',
      mixBlendMode: 'normal' as any
    }
  };

  const { scrollY, scrollYProgress } = useScroll();
  const phonesY = useTransform(scrollY, [0, 400], [0, -50]);
  
  const [isScrolled, setIsScrolled] = useState(false);
  const [activeLink, setActiveLink] = useState('Projects');
  const [showAllProjects, setShowAllProjects] = useState(false);
  const [activeFilter, setActiveFilter] = useState('All');
  const [activeService, setActiveService] = useState(0);

  

  const aboutRef = useRef<HTMLDivElement>(null);
  const aboutInView = useInView(aboutRef, { once: true, margin: "-100px" });

  const servicesRef = useRef<HTMLDivElement>(null);
  const servicesInView = useInView(servicesRef, { once: true, margin: "-100px" });

  useEffect(() => {
    if (showAllProjects) {
      window.scrollTo(0, 0);
    }
  }, [showAllProjects]);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };
    
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);


  useEffect(() => {
    const style = document.createElement('style');
    style.innerHTML = `
      * { cursor: none !important; }
      
      html, body {
        background-color: #080808 !important;
      }

      .portfolio-bg {
        position: fixed;
        inset: 0;
        z-index: 0;
        pointer-events: none;
        background-color: #080808;
        background-image:
          radial-gradient(ellipse 80% 40% at 50% 0%, rgba(88,28,180,0.38) 0%, transparent 65%),
          radial-gradient(ellipse 55% 35% at 50% 42%, rgba(100,30,200,0.28) 0%, transparent 60%),
          radial-gradient(ellipse 65% 38% at 50% 100%, rgba(80,20,170,0.32) 0%, transparent 65%);
      }

      .portfolio-grain {
        position: fixed;
        inset: 0;
        z-index: 1;
        pointer-events: none;
        opacity: 0.42;
        background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='300' height='300'%3E%3Cfilter id='n' x='0' y='0'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.75' numOctaves='4' stitchTiles='stitch'/%3E%3CfeColorMatrix type='saturate' values='0'/%3E%3C/filter%3E%3Crect width='300' height='300' filter='url(%23n)' opacity='1'/%3E%3C/svg%3E");
        background-repeat: repeat;
        background-size: 180px 180px;
        mix-blend-mode: overlay;
      }

      .portfolio-grid {
        position: fixed;
        inset: 0;
        z-index: 1;
        pointer-events: none;
        background-image: 
          linear-gradient(to right, rgba(255,255,255,0.032) 1px, transparent 1px),
          linear-gradient(to bottom, rgba(255,255,255,0.032) 1px, transparent 1px);
        background-size: 60px 60px;
      }
    `;
    document.head.appendChild(style);
    return () => document.head.removeChild(style);
  }, []);

  const navLinks = ['Projects', 'About', 'Services', 'Contact'];

  return (
    <motion.div 
      initial={{ opacity: 0 }} 
      animate={{ opacity: 1 }} 
      transition={{ duration: 0.6 }} 
      className="min-h-screen bg-transparent text-white font-sans selection:bg-purple-500/30 relative overflow-hidden flex flex-col"
    >
      
      
      <div className="portfolio-bg" />
      <div className="portfolio-grain" />
      <div className="portfolio-grid" />
      {/* Main cursor dot */}
      <motion.div
        variants={cursorVariants}
        animate={cursorVariant}
        transition={{ type: 'spring', stiffness: 500, damping: 28, mass: 0.5 }}
        style={{
          position: 'fixed',
          borderRadius: '50%',
          zIndex: 9999,
          pointerEvents: 'none',
          opacity: isVisible ? 1 : 0,
          transition: 'opacity 0.2s',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center'
        }}
      >
        {cursorLabel && (
          <span style={{
            color: 'white',
            fontSize: '10px',
            fontWeight: 600,
            whiteSpace: 'nowrap',
            pointerEvents: 'none'
          }}>{cursorLabel}</span>
        )}
      </motion.div>

      {/* Trailing ring */}
      <div style={{
        position: 'fixed',
        left: trailPos.x - 4,
        top: trailPos.y - 4,
        width: 8,
        height: 8,
        borderRadius: '50%',
        backgroundColor: 'rgba(167, 139, 250, 0.6)',
        zIndex: 9998,
        pointerEvents: 'none',
        opacity: isVisible ? 1 : 0,
        transition: 'opacity 0.2s'
      }} />

      <motion.div style={{ scaleX: scrollYProgress, transformOrigin: 'left', position: 'fixed', top: 0, left: 0, right: 0, height: '2px', backgroundColor: '#7c3aed', zIndex: 100 }} />

      <motion.nav
        initial={{ y: -80, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.5, ease: 'easeOut' }}
        className={`fixed top-4 left-1/2 -translate-x-1/2 z-50 transition-all duration-300 ${
          isScrolled ? 'shadow-2xl shadow-purple-900/20' : ''
        }`}
      >
        <div className={`w-full max-w-[600px] mx-auto px-6 py-3 border border-[rgba(255,255,255,0.08)] rounded-full flex items-center justify-between gap-12 transition-colors ${isScrolled ? 'bg-[rgba(8,8,8,0.85)] backdrop-blur-md' : 'bg-[#111118]'}`}>
          {/* Logo */}
          <div className="flex items-center gap-2 cursor-pointer">
            <Video className="w-5 h-5 text-purple-500" strokeWidth={2.5} />
            <span className="font-bold text-[17px] tracking-tight text-white whitespace-nowrap">Sanjana Meghwal</span>
          </div>

          {/* Hamburger */}
          <button className="w-9 h-9 rounded-full bg-[#1a1a24] border border-[#2a2a3e] flex flex-col items-center justify-center gap-1 hover:border-purple-500/50 hover:bg-purple-500/10 transition-colors" onMouseEnter={() => setCursorVariant('button')} onMouseLeave={() => setCursorVariant('default')}>
            <div className="w-3.5 h-[2px] bg-white rounded-full" />
            <div className="w-3.5 h-[2px] bg-white rounded-full" />
            <div className="w-3.5 h-[2px] bg-white rounded-full" />
          </button>
        </div>
      </motion.nav>


      {showResume ? (
        <main className="relative w-full border-t border-[rgba(255,255,255,0.05)] pt-32 pb-24 min-h-screen flex flex-col items-center overflow-hidden">
          <motion.div
            initial={{ opacity:0, y:30 }}
            animate={{ opacity:1, y:0 }}
            exit={{ opacity:0 }}
            className="w-full max-w-[900px] px-6 mx-auto relative z-10"
          >
            {/* Top Bar */}
            <div className="flex justify-between items-center mb-8 relative z-10">
              <button 
                onClick={() => { setShowResume(false); window.scrollTo(0,0); setCursorVariant('default'); }}
                className="flex items-center gap-2 text-gray-400 hover:text-white cursor-pointer px-4 py-2 rounded-full border border-[rgba(255,255,255,0.08)] bg-[#12121a] transition-colors hover:bg-white/5"
                onMouseEnter={() => setCursorVariant('button')}
                onMouseLeave={() => setCursorVariant('default')}
              >
                <ArrowLeft className="w-4 h-4" />
                <span className="text-sm font-medium">Back to Portfolio</span>
              </button>

              <a 
                href="https://i.postimg.cc/Fs2xgVbZ/photo-2026-05-31-17-56-09.jpg"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 px-4 py-2 rounded-full border border-purple-500/50 hover:bg-purple-500/10 text-purple-300 text-sm font-medium transition-colors"
                onMouseEnter={() => setCursorVariant('button')}
                onMouseLeave={() => setCursorVariant('default')}
              >
                <Download className="w-4 h-4" />
                Download Resume
              </a>
            </div>

            {/* Resume Card */}
            <div className="w-full bg-[rgba(13,11,20,0.95)] border border-[rgba(124,58,237,0.2)] rounded-[20px] p-6 sm:p-12 shadow-2xl relative z-10 mx-auto max-w-[860px]">
              <div className="flex flex-col md:flex-row gap-12">
                
                {/* Left Column (38%) */}
                <div className="w-full md:w-[38%] flex flex-col">
                  <h1 className="text-white text-3xl sm:text-[36px] font-[900] tracking-tight leading-[1.1] mb-6">
                    SANJANA<br />MEGHWAL
                  </h1>
                  <div className="inline-block bg-[#1e0a3c] border border-purple-500/30 text-purple-300 px-4 py-1.5 rounded-full text-sm font-semibold mb-8 w-fit self-start uppercase tracking-wider">
                    VIDEO EDITOR
                  </div>

                  <div className="flex flex-col gap-3">
                    <div className="flex items-center gap-3 text-gray-300 text-[13px]">
                      <Phone className="w-4 h-4 text-purple-400" />
                      +91 6367168026
                    </div>
                    <div className="flex items-center gap-3 text-gray-300 text-[13px]">
                      <Mail className="w-4 h-4 text-purple-400" />
                      sanjanameghwal06@gmail.com
                    </div>
                    <div className="flex items-start gap-3 text-gray-300 text-[13px]">
                      <MapPin className="w-4 h-4 text-purple-400 shrink-0 mt-0.5" />
                      Kasturi Residency, DPS Circle, Jodhpur
                    </div>
                  </div>

                  <div className="w-full h-px bg-[#1f1f2e] my-8" />

                  <h2 className="text-white font-bold text-[14px] uppercase tracking-[0.2em] mb-3">
                    ABOUT ME
                  </h2>
                  <p className="text-[#a1a1aa] text-[13px] leading-relaxed">
                    Creative and detail-oriented Video Editor and Content Creator with 1+ year of professional experience at MediaGarh and freelance editing experience. Skilled in transforming ideas into engaging visual stories through video editing, storytelling, motion graphics, and content creation.
                  </p>

                  <div className="w-full h-px bg-[#1f1f2e] my-6" />

                  <h2 className="text-white font-bold text-[14px] uppercase tracking-[0.2em] mb-4">
                    EDUCATION
                  </h2>
                  <div className="mb-4">
                    <div className="flex items-center gap-2 mb-1 flex-wrap">
                      <span className="font-bold text-white text-[13px] uppercase">Bachelor in Science</span>
                      <span className="bg-[#1e0a3c] text-purple-300 text-[10px] px-2 py-0.5 rounded-md">2023–Present</span>
                    </div>
                    <div className="text-gray-400 text-[12px]">Jai Narayan Vyas University</div>
                  </div>
                  <div>
                    <div className="flex items-center gap-2 flex-wrap">
                      <span className="font-bold text-white text-[13px] uppercase">+2 (St. Johns School)</span>
                      <span className="bg-white/10 text-gray-300 text-[10px] px-2 py-0.5 rounded-md">2022</span>
                    </div>
                  </div>

                  <div className="w-full h-px bg-[#1f1f2e] my-6" />

                  <h2 className="text-white font-bold text-[14px] uppercase tracking-[0.2em] mb-4">
                    SKILLS
                  </h2>
                  <div className="flex flex-wrap gap-2">
                    {['adobe premiere pro', 'after effects', 'vn/capcut', 'photoshop', 'social media optimisation', 'visual storytelling', 'content creator', 'anchoring', 'motion graphics'].map((skill, index) => (
                      <span 
                        key={index} 
                        className="px-3 py-1 bg-[#1a1a24] border border-[rgba(255,255,255,0.06)] rounded-lg text-gray-300 text-[12px] capitalize"
                      >
                        {skill}
                      </span>
                    ))}
                  </div>

                </div>

                {/* Right Column (62%) */}
                <div className="w-full md:w-[62%] flex flex-col">
                  {/* Photo */}
                  <img 
                    src="https://i.postimg.cc/Fs2xgVbZ/photo-2026-05-31-17-56-09.jpg"
                    alt="Sanjana Meghwal"
                    className="w-full h-[460px] object-cover object-center rounded-2xl border border-[#1f1f2e] mb-8 relative z-10"
                    onMouseEnter={() => setCursorVariant('hover')}
                    onMouseLeave={() => setCursorVariant('default')}
                  />

                  <h2 className="text-white font-bold text-[14px] uppercase tracking-[0.2em] mb-5">
                    EXPERIENCE
                  </h2>

                  <div className="mb-5 relative z-10">
                    <div className="flex items-center gap-2 mb-1">
                      <Sparkles className="w-4 h-4 text-purple-500" />
                      <span className="font-bold text-white text-[15px]">Freelance</span>
                    </div>
                    <div className="text-gray-400 text-[12px] mb-2 uppercase tracking-wide">2024–2025</div>
                    <p className="text-gray-400 text-[13px] leading-relaxed">
                      I create videos that inspire exploration and simplify learning. With experience in travel storytelling and EdTech content, I combine creativity, strategy, and visual storytelling to produce engaging videos that connect with audiences.
                    </p>
                  </div>

                  <div className="w-full h-px bg-[#1f1f2e] my-5" />

                  <div className="mb-0 relative z-10">
                    <div className="flex items-center gap-2 mb-1">
                      <Sparkles className="w-4 h-4 text-purple-500" />
                      <span className="font-bold text-white text-[15px]">Video Editor</span>
                    </div>
                    <div className="text-gray-400 text-[12px] mb-2 uppercase tracking-wide">2025 – Present · MEDIAGARH</div>
                    <p className="text-gray-400 text-[13px] leading-relaxed">
                      Video Editor with 1+ year of professional experience at MediaGarh, a digital marketing agency specializing in EdTech. Successfully edited 500+ videos including educational content, marketing campaigns, and social media reels. Skilled in visual storytelling, motion graphics, and content optimization.
                    </p>
                  </div>
                  
                  <div className="mt-8 pt-6 border-t border-[#1f1f2e] flex flex-wrap gap-6 items-center justify-between sm:justify-start">
                    <div className="flex flex-col">
                      <span className="text-white font-bold text-2xl">500+</span>
                      <span className="text-gray-400 text-[11px] uppercase tracking-wider">Videos Edited</span>
                    </div>
                    <div className="h-10 w-px bg-[#1f1f2e] hidden sm:block"></div>
                    <div className="flex flex-col">
                      <span className="text-white font-bold text-2xl">1+</span>
                      <span className="text-gray-400 text-[11px] uppercase tracking-wider">Years at MediaGarh</span>
                    </div>
                    <div className="h-10 w-px bg-[#1f1f2e] hidden sm:block"></div>
                    <div className="flex flex-col">
                      <span className="text-white font-bold text-2xl">2+</span>
                      <span className="text-gray-400 text-[11px] uppercase tracking-wider">Years Total Exp.</span>
                    </div>
                  </div>

                </div>
              </div>
            </div>
          </motion.div>
        </main>
      ) : showAllProjects ? (
        <main className="relative w-full bg-transparent border-t border-[rgba(255,255,255,0.05)] pt-32 pb-24 min-h-screen flex flex-col items-center overflow-hidden">
          <div className="relative z-10 max-w-7xl mx-auto px-6 w-full flex flex-col items-start gap-8">
            <button onMouseEnter={() => setCursorVariant('button')} onMouseLeave={() => setCursorVariant('default')}  
              onClick={() => setShowAllProjects(false)}
              className="flex items-center gap-2 text-gray-400 hover:text-white transition-colors group px-4 py-2 rounded-full border border-[rgba(255,255,255,0.08)] bg-[#12121a] hover:bg-white/5"
            >
              <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
              <span className="text-sm font-medium">Back</span>
            </button>

            <div className="flex flex-col items-start gap-4 mb-8">
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight text-white" onMouseEnter={() => setCursorVariant('text')} onMouseLeave={() => setCursorVariant('default')}>
                All Projects
              </h1>
              <p className="text-gray-400 text-lg">
                Every project I've worked on.
              </p>
            </div>

            <div className="w-full grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-8">
              {allProjects.map((project, idx) => (
                <div key={idx} className="aspect-[9/16] relative bg-[#111118] border border-[rgba(255,255,255,0.08)] rounded-[24px] overflow-hidden group cursor-pointer transition-all duration-500 hover:scale-[1.02] hover:border-purple-500/50 hover:shadow-[0_0_20px_rgba(147,51,234,0.15)]" onMouseEnter={() => { setCursorVariant('play'); setCursorLabel('▶ Play'); }} onMouseLeave={() => { setCursorVariant('default'); setCursorLabel(''); }}>
                  {/* Background Image */}
                  <img 
                    src={project.img} 
                    alt={project.title} 
                    className="absolute inset-0 w-full h-full object-cover opacity-45 group-hover:opacity-80 transition-opacity duration-700 grayscale group-hover:grayscale-0"
                  />
                  {/* Overlay Gradient */}
                  <div className="absolute inset-0 bg-gradient-to-t from-[#0a0a0f] via-transparent to-transparent opacity-90" />
                  
                  {/* Content */}
                  <div className="absolute inset-x-0 bottom-0 p-5 flex flex-col justify-end z-10">
                    <h3 className="text-white text-[14px] font-bold leading-tight group-hover:text-purple-300 transition-colors duration-300">
                      {project.title}
                    </h3>
                    <p className="text-gray-400 text-[12px] mt-1 font-medium">
                      {project.category}
                    </p>
                  </div>

                  {/* Badge */}
                  <div className="absolute top-4 left-4 z-10 px-3 py-1 rounded-full bg-[#12121a]/95 backdrop-blur-md border border-[#2a2a3e] flex items-center gap-1.5 shadow-xl shadow-black/40">
                    <span className="w-1.5 h-1.5 rounded-full bg-purple-500" />
                    <span className="text-white text-[10px] font-bold tracking-wider uppercase">{project.badge}</span>
                  </div>

                  {/* Center Play Button */}
                  <div className="absolute inset-0 flex flex-col items-center justify-center z-10 pointer-events-none">
                    <div className="w-12 h-12 rounded-full bg-purple-600 flex items-center justify-center scale-50 opacity-0 group-hover:scale-100 group-hover:opacity-100 transition-all duration-300 shadow-[0_0_20px_rgba(147,51,234,0.5)]">
                      <Play className="w-5 h-5 text-white ml-1 fill-white" />
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </main>
      ) : (
        <>
          <main className="relative w-full bg-transparent border-t border-[rgba(255,255,255,0.05)] overflow-hidden">
        
        {/* Hero Glow */}
        <div 
          className="absolute top-0 right-0 translate-x-[20%] -translate-y-[20%] w-[800px] h-[800px] pointer-events-none z-0" 
          style={{ background: 'radial-gradient(circle, rgba(109,40,217,0.28) 0%, transparent 65%)' }}
        />

        <div className="relative z-10 w-full min-h-screen pt-40 pb-20 flex flex-col items-center flex-1">
          {/* Top Badge */}
          <motion.div initial={{ opacity:0, y:20 }} animate={{ opacity:1, y:0 }} transition={{ delay:0.2, duration:0.5 }} className="px-4 py-1.5 rounded-full border border-[rgba(255,255,255,0.08)] bg-[#111118] text-white text-[13px] font-medium flex items-center gap-2 mb-6">
            <Video className="w-3.5 h-3.5" />
            Video Editor & Storyteller
          </motion.div>
          
          {/* Headline */}
          <motion.h1 initial={{ opacity:0, y:20 }} animate={{ opacity:1, y:0 }} transition={{ delay:0.35, duration:0.6 }} className="text-5xl md:text-[72px] font-bold tracking-tight leading-[1.05] text-white text-center" onMouseEnter={() => setCursorVariant('text')} onMouseLeave={() => setCursorVariant('default')}>
            <span className="block text-white">Content That Stops</span>
            <span className="block text-white">The Scroll.</span>
          </motion.h1>

          {/* Subtext */}
          <motion.p initial={{ opacity:0, y:20 }} animate={{ opacity:1, y:0 }} transition={{ delay:0.6, duration:0.5 }} className="text-[#a1a1aa] text-[16px] leading-relaxed max-w-[480px] text-center mt-6">
            Sanjana Meghwal crafts cinematic short-form content for creators, brands, and institutions that want real results.
          </motion.p>

          {/* CTA */}
          <motion.div initial={{ opacity:0, y:20 }} animate={{ opacity:1, y:0 }} transition={{ delay:0.7, duration:0.5 }} className="flex flex-row flex-wrap items-center justify-center gap-[40px] mt-8">
            <motion.button onMouseEnter={() => setCursorVariant('button')} onMouseLeave={() => setCursorVariant('default')}  
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.97 }}
              onClick={() => document.getElementById('Contact')?.scrollIntoView({ behavior: 'smooth' })}
              className="px-8 py-3.5 bg-white hover:bg-gray-200 text-black rounded-full font-semibold transition-colors duration-300"
            >
              Book a Free Call →
            </motion.button>
            
            <motion.a
              href="#"
              onClick={(e) => { e.preventDefault(); setShowResume(true); window.scrollTo(0,0); setCursorVariant('default'); }}
              initial={{ opacity:0, y:20 }}
              animate={{ opacity:1, y:0 }}
              transition={{ delay:0.85 }}
              onMouseEnter={() => setCursorVariant('button')}
              onMouseLeave={() => setCursorVariant('default')}
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '8px',
                padding: '10px 20px',
                borderRadius: '999px',
                border: '1px solid rgba(124,58,237,0.4)',
                backgroundColor: 'rgba(124,58,237,0.08)',
                color: '#a78bfa',
                fontSize: '14px',
                fontWeight: 500,
                textDecoration: 'none'
              }}
              whileHover={{ backgroundColor: 'rgba(124,58,237,0.15)', borderColor: 'rgba(124,58,237,0.7)' }}
              whileTap={{ scale: 0.97 }}
            >
              <FileText style={{ width:15, height:15 }} />
              View My Resume
            </motion.a>
          </motion.div>

          {/* Fanned Phones */}
          <motion.div style={{ y: phonesY }} className="relative w-full max-w-[1000px] mx-auto mt-16 sm:mt-24 flex justify-center items-end mb-8 pt-10 overflow-hidden">
            
            {/* Center Glow */}
            <div 
              className="absolute bottom-[20%] left-1/2 -translate-x-1/2 w-[600px] h-[400px] pointer-events-none z-0" 
              style={{ background: 'radial-gradient(ellipse, rgba(109,40,217,0.20) 0%, transparent 65%)' }}
            />

            {/* Left Phone */}
            <motion.div initial={{ opacity:0, x:-60 }} animate={{ opacity:1, x:0 }} transition={{ delay:0.9, duration:0.7 }} className="relative w-[280px] shrink-0 aspect-[9/16] rounded-[40px] border-[6px] border-[#111111] bg-[#111111] overflow-hidden transform -rotate-[14deg] translate-y-[60px] z-10 shadow-2xl hidden md:block" onMouseEnter={() => setCursorVariant('hover')} onMouseLeave={() => setCursorVariant('default')}>
              <div className="absolute top-3 left-1/2 -translate-x-1/2 w-[80px] h-[20px] bg-[#111111] rounded-full z-20"></div>
              <img src="https://images.unsplash.com/photo-1605406575497-015ab0d21b9b?q=80&w=600&auto=format&fit=crop" alt="Left project" className="w-full h-full object-cover opacity-75" />
            </motion.div>

            {/* Center Phone */}
            <motion.div initial={{ opacity:0, y:60 }} animate={{ opacity:1, y:0 }} transition={{ delay:1.0, duration:0.7 }} className="relative w-[340px] shrink-0 aspect-[9/16] rounded-[44px] border-[6px] border-[#111111] bg-[#111111] overflow-hidden z-20 md:-ml-[40px] shadow-2xl shadow-black/80" onMouseEnter={() => setCursorVariant('hover')} onMouseLeave={() => setCursorVariant('default')}>
              <div className="absolute top-3 left-1/2 -translate-x-1/2 w-[80px] h-[20px] bg-[#111111] rounded-full z-20"></div>
              <img src="https://images.unsplash.com/photo-1544005313-94ddf0286df2?q=80&w=600&auto=format&fit=crop" alt="Center project" className="w-full h-full object-cover opacity-100" />
            </motion.div>

            {/* Right Phone */}
            <motion.div initial={{ opacity:0, x:60 }} animate={{ opacity:1, x:0 }} transition={{ delay:0.9, duration:0.7 }} className="relative w-[280px] shrink-0 aspect-[9/16] rounded-[40px] border-[6px] border-[#111111] bg-[#111111] overflow-hidden transform rotate-[14deg] translate-y-[60px] z-10 md:-ml-[40px] shadow-2xl hidden md:block" onMouseEnter={() => setCursorVariant('hover')} onMouseLeave={() => setCursorVariant('default')}>
              <div className="absolute top-3 left-1/2 -translate-x-1/2 w-[80px] h-[20px] bg-[#111111] rounded-full z-20"></div>
              <img src="https://images.unsplash.com/photo-1523580494863-6f3031224c94?q=80&w=600&auto=format&fit=crop" alt="Right project" className="w-full h-full object-cover opacity-75" />
            </motion.div>

            {/* Floating Badges */}
            <div className="absolute top-10 left-[5%] xl:left-[10%] z-30 bg-white text-black px-4 py-2 rounded-full flex items-center gap-2 shadow-xl border border-gray-100 hidden md:flex">
              <Heart className="w-4 h-4 fill-red-500 text-red-500" />
              <span className="text-[14px] font-[600]">20K+ Likes</span>
            </div>

            <div className="absolute top-10 right-[5%] xl:right-[10%] z-30 bg-white text-black px-4 py-2 rounded-full flex items-center gap-2 shadow-xl border border-gray-100 hidden md:flex">
              <Globe className="w-4 h-4 text-blue-500" />
              <span className="text-[14px] font-[600]">2.2M Reach</span>
            </div>

            {/* Bottom Fade Effect */}
            <div style={{
              position: 'absolute',
              bottom: 0,
              left: 0,
              right: 0,
              height: '45%',
              background: 'linear-gradient(to bottom, transparent 0%, #0a0a0f 100%)',
              pointerEvents: 'none',
              zIndex: 30
            }} />
            <div style={{
              position: 'absolute',
              bottom: 0,
              left: 0,
              right: 0,
              height: '25%',
              backdropFilter: 'blur(8px)',
              WebkitBackdropFilter: 'blur(8px)',
              maskImage: 'linear-gradient(to bottom, transparent 0%, black 100%)',
              WebkitMaskImage: 'linear-gradient(to bottom, transparent 0%, black 100%)',
              pointerEvents: 'none',
              zIndex: 29
            }} />
          </motion.div>

          {/* Stats Ticker */}
          <div className="w-full max-w-4xl mx-auto flex flex-row flex-nowrap justify-center sm:justify-between items-center gap-4 sm:gap-0 mt-8 px-6 relative z-20 pb-20 overflow-x-auto [scrollbar-width:none]">
             {[
               "500+ Videos Edited",
               "2+ Years Experience",
               "50+ Happy Clients",
               "85% Client Retention"
             ].map((stat, i) => (
               <div key={i} className="flex items-center gap-2 px-5 py-2.5 rounded-full border border-[rgba(255,255,255,0.08)] text-gray-400 text-[13px] sm:text-[14px] whitespace-nowrap bg-transparent shrink-0">
                 <CheckCircle className="w-4 h-4 text-[#7c3aed] shrink-0" />
                 {stat}
               </div>
             ))}
          </div>

        </div>
      </main>

      {/* Experience Section */}
      <section id="Experience" className="relative w-full bg-transparent border-t border-[rgba(255,255,255,0.05)] py-16 flex flex-col items-center overflow-hidden">
        <div className="relative z-10 max-w-5xl mx-auto px-6 w-full flex flex-col items-start">
          {/* Header */}
          <div className="mb-8">
            <h2 className="text-[32px] leading-tight font-bold tracking-tight text-white mb-2" onMouseEnter={() => setCursorVariant('text')} onMouseLeave={() => setCursorVariant('default')}>
              Where I've Worked
            </h2>
            <p className="text-sm text-gray-400">
              My professional journey so far.
            </p>
          </div>

          {/* Timeline Wrapper */}
          <div className="relative flex flex-col gap-4 w-full ml-2 md:ml-4">
            {/* Vertical Line */}
            <div className="absolute left-[4px] top-6 bottom-6 w-[2px] bg-purple-500/30" />
            
            {/* Card 1 - Current */}
            <div className="relative pl-8 md:pl-10">
              {/* Timeline Dot */}
              <div className="absolute left-0 top-6 w-[10px] h-[10px] rounded-full bg-purple-500 ring-4 ring-[#0d0d14]" />
              
              <div className="w-full bg-[#111118] border border-[rgba(255,255,255,0.08)] rounded-xl py-5 px-6 flex flex-col md:flex-row gap-6 relative group hover:border-[#2a2a3e] transition-colors">
                
                <div className="w-full md:w-1/4 flex flex-col gap-1">
                  <div className="flex items-center gap-2">
                    <span className="w-2.5 h-2.5 rounded-full bg-green-500 shadow-[0_0_8px_rgba(34,197,94,0.6)] animate-pulse" />
                    <span className="text-gray-400 text-[13px] font-medium">June 2025 – Present</span>
                  </div>
                </div>

                <div className="w-full md:w-2/4 flex flex-col gap-3">
                  <div>
                    <h3 className="text-lg font-bold text-white mb-0.5">MediaGarh</h3>
                    <h4 className="text-purple-400 text-sm font-medium">Video Editor & Content Creator</h4>
                    <p className="text-gray-500 text-xs mt-1">Jodhpur, Rajasthan</p>
                  </div>
                  
                  <ul className="flex flex-col gap-2 mt-1">
                    {[
                      "Creating promotional and storytelling content for educational institutions",
                      "Video production, post-production, and content strategy",
                      "Collaborating with creative teams during shoots and campaigns",
                      "Producing engaging short-form and long-form digital content"
                    ].map((item, index) => (
                      <li key={index} className="flex items-start gap-3">
                        <Play className="w-3 h-3 text-purple-500 fill-purple-500 mt-[3px] shrink-0" />
                        <span className="text-[#a1a1aa] text-[13px] leading-snug">{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="hidden md:flex w-full md:w-1/4 justify-end">
                  <div className="w-10 h-10 rounded-lg bg-[#1a1a24] border border-[#2a2a3e] flex items-center justify-center self-start">
                    <Film className="w-5 h-5 text-purple-500/80" />
                  </div>
                </div>
              </div>
            </div>

            {/* Card 2 - Previous */}
            <div className="relative pl-8 md:pl-10">
              {/* Timeline Dot */}
              <div className="absolute left-0 top-6 w-[10px] h-[10px] rounded-full bg-gray-500 ring-4 ring-[#0d0d14]" />
              
              <div className="w-full bg-[#111118] border border-[rgba(255,255,255,0.08)] rounded-xl py-5 px-6 flex flex-col md:flex-row gap-6 relative group hover:border-[#2a2a3e] transition-colors">
                
                <div className="w-full md:w-1/4 flex flex-col gap-1">
                  <div className="flex items-center gap-2">
                    <span className="w-2.5 h-2.5 rounded-full bg-gray-500" />
                    <span className="text-gray-400 text-[13px] font-medium">2024 – 2025</span>
                  </div>
                </div>

                <div className="w-full md:w-2/4 flex flex-col gap-3">
                  <div>
                    <h3 className="text-lg font-bold text-white mb-0.5">Freelance</h3>
                    <h4 className="text-purple-400 text-sm font-medium">Video Editor</h4>
                  </div>
                  
                  <ul className="flex flex-col gap-2 mt-1">
                    {[
                      "Edited social media content, promotional videos, and short-form reels",
                      "Worked with clients to transform ideas into engaging visual stories",
                      "Built expertise in storytelling, pacing, transitions, and audience retention"
                    ].map((item, index) => (
                      <li key={index} className="flex items-start gap-3">
                        <Play className="w-3 h-3 text-purple-500 fill-purple-500 mt-[3px] shrink-0" />
                        <span className="text-[#a1a1aa] text-[13px] leading-snug">{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="hidden md:flex w-full md:w-1/4 justify-end">
                  <div className="w-10 h-10 rounded-lg bg-[#1a1a24] border border-[#2a2a3e] flex items-center justify-center self-start">
                    <Briefcase className="w-5 h-5 text-gray-500/80" />
                  </div>
                </div>
              </div>
            </div>

          </div>
        </div>
      </section>

       {/* About Me Section */}
      <section id="AboutMe" className="relative w-full bg-transparent border-t border-[rgba(255,255,255,0.05)] py-24 flex flex-col items-center overflow-hidden" ref={aboutRef}>
        <div className="relative z-10 w-full max-w-[1100px] mx-auto px-6 flex flex-col md:flex-row items-center gap-16">
          
          {/* Left Column */}
          <motion.div 
            initial={{ opacity: 0, x: -40 }} 
            animate={aboutInView ? { opacity: 1, x: 0 } : {}} 
            transition={{ duration: 0.7 }}
            className="w-full md:w-[42%] shrink-0 flex flex-col"
          >
            {/* Image Card */}
            <div className="w-full aspect-[4/5] rounded-[24px] border border-[rgba(255,255,255,0.08)] overflow-hidden relative shadow-[0_0_60px_rgba(124,58,237,0.15)] mb-6">
              <img 
                src="https://i.postimg.cc/WbFYjKY2/Chat-GPT-Image-May-31-2026-06-52-11-PM.png" 
                alt="Sanjana Meghwal" 
                className="w-full h-full object-cover object-center"
              />
              {/* Overlay Gradient at bottom */}
              <div className="absolute inset-0 bg-gradient-to-t from-[#0d0d14] from-0% via-transparent to-transparent opacity-100" style={{ background: 'linear-gradient(to top, #0d0d14 0%, transparent 40%)' }} />
            </div>

            {/* Creators Worked With */}
            <motion.div 
              initial={{ opacity: 0 }} 
              animate={aboutInView ? { opacity: 1 } : {}} 
              transition={{ delay: 0.4, duration: 0.5 }}
              className="flex flex-col"
            >
              <span className="text-gray-500 text-xs uppercase tracking-wider mb-3">
                Clients & Creators
              </span>
              <div className="flex items-center">
                {[
                  { initials: "MG", from: "from-purple-500", to: "to-blue-500" },
                  { initials: "ED", from: "from-pink-500", to: "to-red-500" },
                  { initials: "SJ", from: "from-green-500", to: "to-teal-500" },
                  { initials: "PV", from: "from-orange-500", to: "to-yellow-500" }
                ].map((avatar, idx) => (
                  <div 
                    key={idx} 
                    className={`w-8 h-8 rounded-full border-2 border-[#0d0d14] flex items-center justify-center text-white text-[10px] font-bold bg-gradient-to-br ${avatar.from} ${avatar.to} relative ${idx !== 0 ? '-ml-2' : ''}`}
                    style={{ zIndex: 10 - idx }}
                  >
                    {avatar.initials}
                  </div>
                ))}
                <span className="text-gray-500 text-sm ml-3">+50 more videos</span>
              </div>
            </motion.div>
          </motion.div>

          {/* Right Column */}
          <motion.div 
            initial={{ opacity: 0, x: 40 }} 
            animate={aboutInView ? { opacity: 1, x: 0 } : {}} 
            transition={{ duration: 0.7, delay: 0.15 }}
            className="w-full md:w-[58%] flex flex-col"
          >
            <span className="text-gray-500 text-sm font-medium uppercase tracking-widest mb-3">
              About Me
            </span>
            <h2 className="text-[#7c3aed] text-[28px] font-bold mb-4" onMouseEnter={() => setCursorVariant('text')} onMouseLeave={() => setCursorVariant('default')}>
              Sanjana Meghwal
            </h2>
            
            <div className="flex flex-col gap-4 text-[#a1a1aa] text-[15px] leading-relaxed">
              <p>
                Creative and detail-oriented Video Editor and Content Creator with 1+ year of professional experience at MediaGarh and freelance editing experience.
              </p>
              <p>
                Skilled in transforming ideas into engaging visual stories through video editing, storytelling, motion graphics, and content creation. Passionate about creating impactful digital content, exploring creative trends, and continuously improving through hands-on experience in both production and post-production.
              </p>
            </div>

            {/* Stats Row */}
            <div className="flex items-center gap-8 mt-6">
              {[
                { num: "500+", label: "Videos Edited" },
                { num: "1+", label: "Years at MediaGarh" },
                { num: "2+", label: "Years Experience" }
              ].map((stat, idx) => (
                <React.Fragment key={idx}>
                  <motion.div 
                    initial={{ opacity: 0, y: 20 }} 
                    animate={aboutInView ? { opacity: 1, y: 0 } : {}} 
                    transition={{ duration: 0.5, delay: 0.3 + (idx * 0.1) }}
                    className="flex flex-col"
                  >
                    <span className="text-white font-bold text-[28px] leading-none mb-1">{stat.num}</span>
                    <span className="text-gray-400 text-xs uppercase tracking-wider">{stat.label}</span>
                  </motion.div>
                  {idx < 2 && (
                    <motion.div 
                      initial={{ opacity: 0 }} 
                      animate={aboutInView ? { opacity: 1 } : {}} 
                      transition={{ duration: 0.5, delay: 0.3 }}
                      className="w-px h-10 bg-[#1f1f2e]"
                    />
                  )}
                </React.Fragment>
              ))}
            </div>

            {/* Social Icons row */}
            <div className="flex items-center gap-4 mt-6">
              {[
                { icon: Instagram, name: "Instagram" },
                { icon: Twitter, name: "Twitter" },
                { icon: Music2, name: "TikTok" }
              ].map((social, idx) => (
                <motion.button 
                  key={idx}
                  initial={{ opacity: 0, scale: 0.8 }} 
                  animate={aboutInView ? { opacity: 1, scale: 1 } : {}} 
                  transition={{ duration: 0.4, delay: 0.5 + (idx * 0.05) }}
                  className="w-10 h-10 rounded-full border border-[rgba(255,255,255,0.08)] bg-[#111118] flex items-center justify-center text-gray-400 transition-all duration-200 hover:border-purple-500 hover:text-purple-400 hover:bg-[#1e0a3c]"
                 onMouseEnter={() => setCursorVariant('button')} onMouseLeave={() => setCursorVariant('default')}>
                  <social.icon className="w-4 h-4" />
                </motion.button>
              ))}
            </div>

            {/* CTA Button */}
            <motion.div 
              initial={{ opacity: 0, y: 20 }} 
              animate={aboutInView ? { opacity: 1, y: 0 } : {}} 
              transition={{ duration: 0.5, delay: 0.7 }}
              className="mt-6"
            >
              <motion.button onMouseEnter={() => setCursorVariant('button')} onMouseLeave={() => setCursorVariant('default')} 
                whileHover={{ scale: 1.04 }}
                whileTap={{ scale: 0.97 }}
                onClick={() => document.getElementById('Contact')?.scrollIntoView({ behavior: 'smooth' })}
                className="bg-purple-600 hover:bg-purple-500 text-white rounded-full px-7 py-3 font-medium flex items-center gap-2 w-fit transition-colors"
              >
                Get In Touch <ArrowRight className="w-4 h-4" />
              </motion.button>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* Portfolio / Selected Work Section */}
      <section id="Portfolio" className="relative w-full bg-transparent border-t border-[rgba(255,255,255,0.05)] py-24 flex flex-col items-center overflow-hidden">
        <div className="relative z-10 w-full flex flex-col items-center">
        {/* Glow */}
        <div 
          className="absolute bottom-0 left-1/2 -translate-x-1/2 translate-y-[20%] w-[800px] h-[400px] pointer-events-none z-0" 
          style={{ background: 'radial-gradient(circle, rgba(109,40,217,0.28) 0%, transparent 65%)', opacity: 0.13 }} 
        />

        {/* New Header Area */}
        <div className="w-full max-w-7xl mx-auto px-6 flex flex-col items-center mb-16 relative z-10">
          <h2 className="text-[42px] font-bold text-white text-center" onMouseEnter={() => setCursorVariant('text')} onMouseLeave={() => setCursorVariant('default')}>
            Selected Editing Work
          </h2>
          <p className="text-[#a1a1aa] text-[15px] text-center max-w-[440px] mt-2">
            A showcase of visual styles and creative editing across long-form and short-form content.
          </p>

          {/* Filter Tabs */}
          <div className="flex flex-wrap justify-center items-center gap-3 mt-6">
            {['All', 'Short-Form & Reels'].map((filter) => (
              <button onMouseEnter={() => setCursorVariant('button')} onMouseLeave={() => setCursorVariant('default')} 
                key={filter}
                onClick={() => setActiveFilter(filter)}
                className={`px-5 py-2 rounded-full text-sm font-medium transition-all duration-200 border ${
                  activeFilter === filter
                    ? 'bg-purple-600 text-white border-purple-600'
                    : 'bg-transparent text-gray-400 border-[rgba(255,255,255,0.08)] hover:border-[#3a3a5c]'
                }`}
              >
                {filter}
              </button>
            ))}
          </div>
        </div>

        {/* Masonry Grid Area */}
        <div className="w-full max-w-5xl mx-auto px-6 relative z-10">
          <motion.div layout className="grid grid-cols-1 md:grid-cols-3 gap-5 items-stretch">
            <AnimatePresence mode="popLayout">
              {portfolioCards
                .filter(card => activeFilter === 'All' || card.category === activeFilter)
                .map((card) => (
                  <motion.div
                    layout
                    initial={{ opacity: 0, scale: 0.92 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.92 }}
                    transition={{ duration: 0.3 }}
                    key={card.id}
                    className="relative bg-[#111118] border border-[rgba(255,255,255,0.08)] rounded-[16px] overflow-hidden group cursor-pointer hover:border-purple-500/50 hover:shadow-[0_0_30px_rgba(124,58,237,0.15)] transition-all duration-300 transform hover:scale-[1.02] flex flex-col"
                  >
                    {/* Image Area */}
                    <div className="relative w-full h-[550px] overflow-hidden bg-transparent">
                      <img 
                        src={card.image} 
                        alt={card.creator}
                        className="w-full h-full object-cover opacity-85 grayscale group-hover:grayscale-0 transition-all duration-500"
                      />
                      
                      {/* Optional Overlay Text */}
                      {card.overlayText && (
                        <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                          <span className={card.overlayStyle}>{card.overlayText}</span>
                        </div>
                      )}

                      {card.bottomOverlay && (
                        <div className="absolute bottom-4 left-4 z-10">
                          <span className="text-white text-[18px] font-bold drop-shadow-md">{card.bottomOverlay}</span>
                        </div>
                      )}
                    </div>
                  </motion.div>
                ))}
            </AnimatePresence>
          </motion.div>
          
          <div className="w-full flex justify-center mt-12">
            <button onMouseEnter={() => setCursorVariant('button')} onMouseLeave={() => setCursorVariant('default')}  
              onClick={() => setShowAllProjects(true)}
              className="px-8 py-3.5 rounded-full border border-gray-600 hover:border-white hover:bg-white/5 text-white font-medium transition-all duration-300"
            >
              View All Projects
            </button>
          </div>
        </div>
        </div>
      </section>

      {/* Tools & Software Section */}
      <section id="Tools" className="relative w-full bg-transparent border-t border-[rgba(255,255,255,0.05)] py-24 flex flex-col items-center overflow-hidden">
        <div className="relative z-10 max-w-5xl mx-auto px-6 w-full flex flex-col items-center">
        {/* Glowing Background for this section */}
        <div 
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] pointer-events-none z-0" 
          style={{ background: 'radial-gradient(circle, rgba(109,40,217,0.28) 0%, transparent 65%)', opacity: 0.14 }} 
        />
        
        {/* Header */}
        <div className="relative z-10 px-4 py-1.5 rounded-full border border-[rgba(255,255,255,0.08)] bg-[#12121a] text-gray-300 text-sm font-medium mb-6">
          My Toolkit
        </div>
        <h2 className="relative z-10 text-4xl md:text-5xl font-bold tracking-tight text-white mb-4" onMouseEnter={() => setCursorVariant('text')} onMouseLeave={() => setCursorVariant('default')}>
          Tools I Work With
        </h2>
        <p className="relative z-10 text-gray-400 text-[16px] mb-8 text-center">
          Industry-standard software for professional video production.
        </p>

        <div className="w-full max-w-3xl flex items-center gap-4 mb-10 relative z-10">
          <div className="flex-1 h-px bg-[#1f1f2e]" />
          <div className="flex items-center gap-2 px-4 py-1.5 rounded-full border border-[rgba(255,255,255,0.08)] bg-[#111118]">
            <span className="w-1.5 h-1.5 rounded-full bg-purple-500" />
            <span className="text-gray-500 text-xs font-medium tracking-wider uppercase">Software</span>
            <span className="w-1.5 h-1.5 rounded-full bg-purple-500" />
          </div>
          <div className="flex-1 h-px bg-[#1f1f2e]" />
        </div>

        {/* Software Cards */}
        <div className="relative z-10 flex flex-wrap justify-center gap-4 md:gap-6">
          {/* Premiere Pro */}
          <div className="w-[110px] h-[110px] md:w-[120px] md:h-[120px] bg-[#111118] border border-[rgba(255,255,255,0.08)] hover:border-purple-500/60 hover:shadow-[0_0_20px_rgba(168,85,247,0.2)] rounded-2xl flex flex-col items-center justify-center gap-3 transition-all duration-300 hover:scale-105 cursor-default">
            <div className="w-12 h-12 bg-[#00005b] rounded-[10px] flex items-center justify-center border border-[#ff8aff]/30 shadow-inner">
              <span className="text-[#ff8aff] font-bold text-2xl tracking-tighter leading-none">Pr</span>
            </div>
            <span className="text-gray-300 text-sm font-medium">Premiere Pro</span>
          </div>

          {/* After Effects */}
          <div className="w-[110px] h-[110px] md:w-[120px] md:h-[120px] bg-[#111118] border border-[rgba(255,255,255,0.08)] hover:border-purple-500/60 hover:shadow-[0_0_20px_rgba(168,85,247,0.2)] rounded-2xl flex flex-col items-center justify-center gap-3 transition-all duration-300 hover:scale-105 cursor-default">
            <div className="w-12 h-12 bg-[#00005b] rounded-[10px] flex items-center justify-center border border-[#9999ff]/30 shadow-inner">
              <span className="text-[#9999ff] font-bold text-2xl tracking-tighter leading-none">Ae</span>
            </div>
            <span className="text-gray-300 text-sm font-medium">After Effects</span>
          </div>

          {/* Photoshop */}
          <div className="w-[110px] h-[110px] md:w-[120px] md:h-[120px] bg-[#111118] border border-[rgba(255,255,255,0.08)] hover:border-purple-500/60 hover:shadow-[0_0_20px_rgba(168,85,247,0.2)] rounded-2xl flex flex-col items-center justify-center gap-3 transition-all duration-300 hover:scale-105 cursor-default">
            <div className="w-12 h-12 bg-[#001e36] rounded-[10px] flex items-center justify-center border border-[#31a8ff]/30 shadow-inner">
              <span className="text-[#31a8ff] font-bold text-2xl tracking-tighter leading-none">Ps</span>
            </div>
            <span className="text-gray-300 text-sm font-medium">Photoshop</span>
          </div>

          {/* CapCut */}
          <div className="w-[110px] h-[110px] md:w-[120px] md:h-[120px] bg-[#111118] border border-[rgba(255,255,255,0.08)] hover:border-purple-500/60 hover:shadow-[0_0_20px_rgba(168,85,247,0.2)] rounded-2xl flex flex-col items-center justify-center gap-3 transition-all duration-300 hover:scale-105 cursor-default">
            <div className="w-12 h-12 rounded-[10px] flex items-center justify-center overflow-hidden">
              <img src="https://i.pinimg.com/236x/80/0f/31/800f31dcd38e0b6129d6490d5df7df2c.jpg" alt="CapCut" className="w-full h-full object-cover" />
            </div>
            <span className="text-gray-300 text-sm font-medium">CapCut</span>
          </div>

          {/* VN Editor */}
          <div className="w-[110px] h-[110px] md:w-[120px] md:h-[120px] bg-[#111118] border border-[rgba(255,255,255,0.08)] hover:border-purple-500/60 hover:shadow-[0_0_20px_rgba(168,85,247,0.2)] rounded-2xl flex flex-col items-center justify-center gap-3 transition-all duration-300 hover:scale-105 cursor-default">
            <div className="w-12 h-12 bg-[#1f1f1f] rounded-[10px] flex items-center justify-center border border-gray-600">
              <span className="text-white font-bold text-xl tracking-widest leading-none">VN</span>
            </div>
            <span className="text-gray-300 text-sm font-medium">VN Editor</span>
          </div>
        </div>

        <div className="w-full max-w-3xl flex items-center gap-4 my-10 relative z-10">
          <div className="flex-1 h-px bg-[#1f1f2e]" />
          <div className="flex items-center gap-2 px-4 py-1.5 rounded-full border border-[rgba(255,255,255,0.08)] bg-[#111118]">
            <span className="w-1.5 h-1.5 rounded-full bg-purple-500" />
            <span className="text-gray-500 text-xs font-medium tracking-wider uppercase">Creative Skills</span>
            <span className="w-1.5 h-1.5 rounded-full bg-purple-500" />
          </div>
          <div className="flex-1 h-px bg-[#1f1f2e]" />
        </div>

        {/* Skills Cards Grid */}
        <div className="relative z-10 grid grid-cols-2 md:grid-cols-4 gap-3 w-full max-w-[800px] mx-auto">
          {[
            { name: "Video Editing", icon: Scissors },
            { name: "Visual Storytelling", icon: Film },
            { name: "Color Grading", icon: Palette },
            { name: "Motion Graphics", icon: Layers },
            { name: "Sound Design", icon: Music },
            { name: "Content Creation", icon: PenTool },
            { name: "Social Media Content", icon: Share2 },
            { name: "Trend Research", icon: TrendingUp }
          ].map((skill, index) => (
            <div 
              key={index} 
              className="px-5 py-4 rounded-xl cursor-default transition-all duration-200 bg-[#111118] hover:bg-[#13131f] border border-[rgba(255,255,255,0.08)] hover:border-[#3a3a5c] flex items-center gap-3"
            >
              <div className="w-8 h-8 shrink-0 bg-[#1e0a3c] rounded-lg flex items-center justify-center">
                <skill.icon className="w-4 h-4 text-purple-400" />
              </div>
              <span className="text-white text-[14px] font-medium leading-tight">
                {skill.name}
              </span>
            </div>
          ))}
        </div>
        </div>
      </section>

      {/* Services Section */}
      <section id="Services" className="relative w-full bg-transparent border-t border-[rgba(255,255,255,0.05)] py-20 flex flex-col items-center overflow-hidden" ref={servicesRef}>
        <div className="relative z-10 max-w-7xl mx-auto px-6 w-full flex flex-col items-center">
        {/* Header */}
        <div className="px-4 py-1.5 rounded-full border border-[rgba(255,255,255,0.08)] bg-[#12121a] text-gray-300 text-sm font-medium mb-4">
          Services
        </div>
        <h2 className="text-[40px] font-bold tracking-tight text-white mb-4" onMouseEnter={() => setCursorVariant('text')} onMouseLeave={() => setCursorVariant('default')}>
          What I Offer
        </h2>
        <p className="text-gray-400 text-[16px] mb-10 text-center">
          End-to-end video production — from raw footage to ready-to-post content.
        </p>

        {/* Services Accordion Layout */}
        <div className="flex flex-col lg:flex-row gap-6 items-start max-w-5xl mx-auto w-full">
          {/* Left Column - List */}
          <motion.div 
            initial={{ opacity: 0, x: -30 }}
            animate={servicesInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.6 }}
            className="w-full lg:w-[40%] bg-[#111118] border border-[rgba(255,255,255,0.08)] rounded-2xl overflow-hidden divide-y divide-[rgba(255,255,255,0.08)]"
          >
            {servicesData.map((service, idx) => (
              <button onMouseEnter={() => setCursorVariant('button')} onMouseLeave={() => setCursorVariant('default')} 
                key={idx}
                onClick={() => setActiveService(idx)}
                className={`w-full flex items-center justify-between py-4 px-5 transition-all duration-200 text-left ${
                  activeService === idx 
                    ? 'bg-[#111118] border-l-[3px] border-l-purple-600' 
                    : 'bg-transparent hover:bg-[#111118]/50 border-l-[3px] border-l-transparent'
                }`}
              >
                <div className="flex items-center">
                  <span className={`text-xs font-mono mr-4 ${activeService === idx ? 'text-purple-600' : 'text-gray-600'}`}>
                    {service.num}
                  </span>
                  <span className={`text-[16px] font-medium transition-colors ${activeService === idx ? 'text-purple-400' : 'text-white'}`}>
                    {service.title}
                  </span>
                </div>
                <ChevronRight className={`w-4 h-4 transition-transform duration-300 ${activeService === idx ? 'rotate-90 text-purple-400' : 'text-gray-500'}`} />
              </button>
            ))}
          </motion.div>

          {/* Right Column - Panel */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={servicesInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.6 }}
            className="w-full lg:w-[60%] relative min-h-[320px]"
          >
            <AnimatePresence mode="wait">
              <motion.div
                key={activeService}
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                transition={{ duration: 0.25 }}
                className="bg-[#111118] border border-[rgba(255,255,255,0.08)] rounded-2xl p-9 relative overflow-hidden h-full flex flex-col w-full"
              >
                <div className="flex justify-between items-start">
                  <div className="w-[44px] h-[44px] rounded-xl bg-[#1e0a3c] border border-[#2a1060] flex items-center justify-center">
                    {React.createElement(servicesData[activeService].icon, { className: "w-5 h-5 text-purple-500 fill-purple-500" })}
                  </div>
                  <span className="text-[60px] font-bold text-[#2d1a5e] leading-none absolute top-6 right-8 pointer-events-none">
                    {servicesData[activeService].num}
                  </span>
                </div>
                
                <h3 className="text-[28px] font-bold text-white mt-4 relative z-10">
                  {servicesData[activeService].title}
                </h3>
                
                <div className="w-10 h-0.5 bg-purple-500 my-4"></div>
                
                <p className="text-gray-400 text-[15px] leading-relaxed relative z-10 mb-4">
                  {servicesData[activeService].desc}
                </p>

                <ul className="flex flex-col gap-3 relative z-10 mt-auto pt-4">
                  {servicesData[activeService].bullets.map((bullet, idx) => (
                    <li key={idx} className="flex items-start gap-3">
                      <Play className="w-[11px] h-[11px] text-purple-500 fill-purple-500 mt-1 shrink-0" />
                      <span className="text-white text-[14px]">{bullet}</span>
                    </li>
                  ))}
                </ul>
              </motion.div>
            </AnimatePresence>
          </motion.div>
        </div>

        </div>
      </section>


      


      {/* Editing Services Section */}
      <section className="relative w-full bg-transparent border-t border-[rgba(255,255,255,0.05)] pt-16 pb-0 overflow-hidden">
        <div className="relative z-10 w-full flex flex-col items-center">
          
          {/* Header */}
          <div className="w-full max-w-[1100px] mb-8 relative z-10 px-6 lg:px-0">
            <h2 className="text-4xl md:text-[52px] leading-tight font-[800] tracking-tight text-[#ffffff] text-left" onMouseEnter={() => setCursorVariant('text')} onMouseLeave={() => setCursorVariant('default')}>
              Editing services that move numbers —<br/>
              <span className="text-[#7c3aed] italic">not just pixels.</span>
            </h2>
          </div>

          {/* Card Container */}
          <div 
            className="w-full max-w-[1100px] mx-6 lg:mx-0 bg-[#0d0d0d] border border-[#222222] rounded-[20px] min-h-[480px] overflow-hidden flex flex-col md:flex-row relative"
            onMouseEnter={() => { setCursorVariant('play'); setCursorLabel('▶ Play'); }} 
            onMouseLeave={() => { setCursorVariant('default'); setCursorLabel(''); }}
          >
            {/* Corner dots */}
            <div className="absolute top-3 left-3 w-[10px] h-[10px] rounded-full bg-[#1a1a1a] border border-[#333] z-20"></div>
            <div className="absolute top-3 right-3 w-[10px] h-[10px] rounded-full bg-[#1a1a1a] border border-[#333] z-20"></div>
            <div className="absolute bottom-3 left-3 w-[10px] h-[10px] rounded-full bg-[#1a1a1a] border border-[#333] z-20"></div>
            <div className="absolute bottom-3 right-3 w-[10px] h-[10px] rounded-full bg-[#1a1a1a] border border-[#333] z-20"></div>

            {/* Left Column (48%) */}
            <div 
              className="w-full md:w-[48%] p-8 md:p-10 relative overflow-hidden flex flex-col min-h-[400px] md:min-h-auto"
              style={{ backgroundColor: '#0a0a0a', backgroundImage: 'radial-gradient(ellipse at bottom right, rgba(249,115,22,0.12) 0%, transparent 60%)' }}
            >
              {/* Typography */}
              <div className="relative z-10 mt-4 md:mt-8">
                <span className="block text-white text-[56px] md:text-[72px] font-[900] leading-none not-italic">REEL &</span>
                <span className="block text-[#f97316] text-[56px] md:text-[72px] font-[900] leading-none mb-1">SHORTS</span>
                <div className="inline-block relative">
                  <span className="block text-white text-[42px] md:text-[56px] font-[900] leading-none">EDITING</span>
                  <div className="w-full h-[4px] md:h-[6px] bg-white rounded-[3px] mt-1"></div>
                </div>
              </div>
              
              {/* Play Button */}
              <div className="w-[56px] h-[56px] md:w-[64px] md:h-[64px] bg-white rounded-full flex items-center justify-center mt-6 relative z-10 self-start">
                <Play className="w-[14px] h-[14px] md:w-[16px] md:h-[16px] text-black fill-black ml-1" />
              </div>

              {/* Decorative Timeline */}
              <div className="absolute bottom-8 left-8 md:bottom-10 md:left-10 w-[180px] md:w-[200px] h-[48px] md:h-[56px] bg-[#111111] rounded-lg border border-[#222] p-2 md:p-2.5 flex items-center gap-1 z-10 hidden sm:flex">
                <div className="h-[8px] md:h-[10px] w-[40px] md:w-[48px] bg-[#a855f7] rounded-[3px]"></div>
                <div className="h-[8px] md:h-[10px] w-[40px] md:w-[48px] bg-[#22c55e] rounded-[3px]"></div>
                <div className="h-[8px] md:h-[10px] w-[50px] md:w-[64px] bg-[#3b82f6] rounded-[3px]"></div>
                <div className="h-[8px] md:h-[10px] w-[24px] md:w-[32px] bg-[#f97316] rounded-[3px]"></div>
              </div>

              {/* Phone Mockup */}
              <div className="absolute right-[-20px] md:right-[-10px] bottom-[-20px] md:bottom-0 w-[160px] md:w-[180px] h-auto aspect-[9/16] rounded-[24px] md:rounded-[28px] border-[6px] md:border-[8px] border-[#1a1a1a] overflow-hidden z-10">
                <img src="https://images.unsplash.com/photo-1598488035139-bdbb2231ce04?q=80&w=400&auto=format&fit=crop" alt="Reels editing" className="w-full h-full object-cover opacity-100" />
              </div>
            </div>

            {/* Right Column (52%) */}
            <div className="w-full md:w-[52%] bg-transparent p-8 md:py-10 md:px-12 flex flex-col relative z-10">
              <div className="flex justify-between items-start w-full">
                <div className="w-[40px] h-[40px] md:w-[44px] md:h-[44px] rounded-[10px] bg-[#1a1a24] border border-[#2a2a3e] flex items-center justify-center">
                  <Film className="w-4 h-4 md:w-5 md:h-5 text-[#7c3aed]" />
                </div>
                <span className="text-[64px] md:text-[80px] font-[800] leading-none text-[#2a2a2a] select-none">
                  01
                </span>
              </div>

              <h3 className="text-3xl md:text-[38px] font-bold text-white mt-4 md:mt-6 leading-tight">
                Reel & Shorts Editing
              </h3>
              
              <p className="text-[#a1a1aa] text-[14px] md:text-[15px] leading-relaxed mt-3 max-w-[420px]">
                Turn raw clips into engaging vertical videos tailored for Reels, Shorts, and TikTok. Fast-paced cuts, snappy captions, and trending effects made to boost engagement and brand growth.
              </p>

              <ul className="flex flex-col gap-3 mt-6">
                {[
                  "Dynamic Editing + Flow Optimization",
                  "Captions & Subtitles Included",
                  "Trendy Transitions & Sound Sync",
                  "Optimized Videos (Reels, Shorts)"
                ].map((bullet, idx) => (
                  <li key={idx} className="flex items-center gap-3">
                    <CheckCircle className="w-4 h-4 text-[#7c3aed] shrink-0" />
                    <span className="text-white text-[13px] md:text-[14px]">{bullet}</span>
                  </li>
                ))}
              </ul>

              <button onMouseEnter={() => setCursorVariant('button')} onMouseLeave={() => setCursorVariant('default')}  
                onClick={() => document.getElementById('Contact')?.scrollIntoView({ behavior: 'smooth' })}
                className="mt-8 bg-white text-[#0a0a0f] hover:bg-gray-100 rounded-full px-6 py-3 text-[14px] md:text-[15px] font-medium transition-colors self-start flex items-center gap-2"
              >
                Contact us <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* CTA & Contact Section */}
      <section id="Contact" className="relative w-full bg-transparent border-t border-[rgba(255,255,255,0.05)] py-32 overflow-hidden flex justify-center">
        
        {/* Glow behind phone */}
        <div 
          className="absolute top-1/2 right-[10%] -translate-y-1/2 w-[550px] h-[550px] pointer-events-none z-0 blur-[130px]" 
          style={{ background: 'radial-gradient(circle, rgba(109,40,217,0.28) 0%, transparent 65%)', opacity: 0.3 }}
        />

        <div className="relative z-10 max-w-7xl mx-auto px-6 w-full flex flex-col lg:flex-row items-center justify-between gap-16 lg:gap-8">
          
          {/* Left Column */}
          <div className="w-full lg:w-[55%] flex flex-col items-start gap-8 z-10">
            <div className="px-4 py-1.5 rounded-full border border-[rgba(255,255,255,0.08)] bg-[#12121a] text-gray-300 text-sm font-medium">
              Let's Get Started
            </div>
            
            <h2 className="text-5xl lg:text-[65px] font-bold tracking-tighter leading-[1.05] text-white" onMouseEnter={() => setCursorVariant('text')} onMouseLeave={() => setCursorVariant('default')}>
              Ready to Make<br/>
              Your Content<br/>
              Unforgettable?
            </h2>
            
            <p className="text-gray-400 text-lg leading-relaxed max-w-md">
              Book a free 30-minute discovery call. Let's talk about your project and bring your vision to life.
            </p>
            
            <div className="flex flex-col sm:flex-row items-center gap-4 w-full sm:w-auto mt-2">
              <motion.button whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.97 }} className="w-full sm:w-auto px-8 py-4 bg-white hover:bg-gray-200 text-black rounded-full font-medium transition-colors duration-300" onMouseEnter={() => setCursorVariant('button')} onMouseLeave={() => setCursorVariant('default')}>
                Book a Free Call
              </motion.button>
              <motion.button whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.97 }} className="w-full sm:w-auto px-8 py-4 bg-transparent border border-gray-600 hover:border-white hover:bg-white/5 text-white rounded-full font-medium transition-all duration-300" onMouseEnter={() => setCursorVariant('button')} onMouseLeave={() => setCursorVariant('default')}>
                Send a Message
              </motion.button>
            </div>

            <div className="flex items-center gap-2 mt-2">
              <div className="w-2.5 h-2.5 rounded-full bg-amber-500 shadow-[0_0_8px_rgba(245,158,11,0.6)] animate-pulse"></div>
              <span className="text-gray-400 text-sm font-medium">Currently accepting new clients</span>
            </div>

            <div className="w-full h-px bg-[#1f1f2e] my-4 max-w-md"></div>

            <div className="flex flex-col gap-4">
              <div className="flex items-center gap-3 text-gray-400 text-sm">
                <Phone className="w-5 h-5 text-purple-500" />
                <span>+91 6367168026</span>
              </div>
              <div className="flex items-center gap-3 text-gray-400 text-sm">
                <Mail className="w-5 h-5 text-purple-500" />
                <span>sanjanameghwal06@gmail.com</span>
              </div>
              <div className="flex items-center gap-3 text-gray-400 text-sm">
                <MapPin className="w-5 h-5 text-purple-500" />
                <span>Jodhpur, Rajasthan</span>
              </div>
            </div>
          </div>

          {/* Right Column (Phone Mockup) */}
          <div className="w-full lg:w-[45%] flex justify-center lg:justify-end relative pb-10 lg:pb-0 z-10 hidden sm:flex">
            {/* Phone Mockup */}
            <div className="relative w-[300px] sm:w-[320px] aspect-[9/19] rounded-[48px] border-[14px] border-[rgba(255,255,255,0.08)] bg-[#050508] shadow-2xl shadow-purple-900/40 overflow-visible mt-10 lg:mt-0">
              
              {/* Inner Phone Screen */}
              <div className="w-full h-full rounded-[34px] overflow-hidden bg-[#12121a] relative">
                <img 
                  src="https://images.unsplash.com/photo-1544005313-94ddf0286df2?q=80&w=600&auto=format&fit=crop" 
                  alt="Sanjana Editorial"
                  className="w-full h-full object-cover opacity-90 transition-transform duration-700 hover:scale-105 grayscale hover:grayscale-0"
                />
                
                {/* Phone Top Notch area */}
                <div className="absolute top-0 inset-x-0 h-6 flex justify-center">
                  <div className="w-24 h-6 bg-[#1f1f2e] rounded-b-2xl"></div>
                </div>
              </div>

              {/* Floating Dark Badges Overlaid on Left */}
              <div className="absolute top-1/2 -left-12 sm:-left-24 -translate-y-1/2 flex flex-col gap-4 z-20">
                
                <div className="flex items-center gap-3 bg-[#12121a]/95 backdrop-blur-md px-4 py-3 rounded-2xl shadow-xl shadow-black/40 hover:-translate-y-1 transition-transform cursor-default border border-[#2a2a3e]">
                  <div className="w-10 h-10 rounded-full bg-purple-500/20 border border-purple-500/30 flex items-center justify-center">
                    <Film className="w-5 h-5 text-purple-400" />
                  </div>
                  <div className="flex flex-col">
                    <span className="text-white font-bold text-sm tracking-tight">500+</span>
                    <span className="text-gray-400 text-[11px] uppercase tracking-wider font-semibold">Videos Edited</span>
                  </div>
                </div>

                <div className="flex items-center gap-3 bg-[#12121a]/95 backdrop-blur-md px-4 py-3 rounded-2xl shadow-xl shadow-black/40 md:-translate-x-6 hover:-translate-y-1 transition-transform cursor-default border border-[#2a2a3e]">
                  <div className="w-10 h-10 rounded-full bg-purple-500/20 border border-purple-500/30 flex items-center justify-center">
                    <Clock className="w-5 h-5 text-purple-400" />
                  </div>
                  <div className="flex flex-col">
                    <span className="text-white font-bold text-sm tracking-tight">2+ Years</span>
                    <span className="text-gray-400 text-[11px] uppercase tracking-wider font-semibold">Experience</span>
                  </div>
                </div>

                <div className="flex items-center gap-3 bg-[#12121a]/95 backdrop-blur-md px-4 py-3 rounded-2xl shadow-xl shadow-black/40 hover:-translate-y-1 transition-transform cursor-default border border-[#2a2a3e]">
                  <div className="w-10 h-10 rounded-full bg-purple-500/20 border border-purple-500/30 flex items-center justify-center">
                    <Briefcase className="w-5 h-5 text-purple-400" />
                  </div>
                  <div className="flex flex-col">
                    <span className="text-white font-bold text-sm tracking-tight">Editor</span>
                    <span className="text-gray-400 text-[11px] uppercase tracking-wider font-semibold">@ MediaGarh</span>
                  </div>
                </div>

                <div className="flex items-center gap-3 bg-[#12121a]/95 backdrop-blur-md px-4 py-3 rounded-2xl shadow-xl shadow-black/40 md:-translate-x-4 hover:-translate-y-1 transition-transform cursor-default border border-[#2a2a3e]">
                  <div className="w-10 h-10 rounded-full bg-purple-500/20 border border-purple-500/30 flex items-center justify-center">
                    <CheckCircle className="w-5 h-5 text-purple-400" />
                  </div>
                  <div className="flex flex-col">
                    <span className="text-white font-bold text-sm tracking-tight">Freelance</span>
                    <span className="text-gray-400 text-[11px] uppercase tracking-wider font-semibold">Available</span>
                  </div>
                </div>

              </div>
            </div>
          </div>
        </div>
      </section>
      </>
      )}
    </motion.div>
  );
}
