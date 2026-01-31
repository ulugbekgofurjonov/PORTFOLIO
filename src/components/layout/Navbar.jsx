import React, { useState, useEffect, useRef } from "react";
import { Code, Menu, X, Download, Sparkles, ChevronDown } from "lucide-react";
import { NAV_LINKS, PERSONAL_INFO } from "../../utils/constants";
import { useScrollSpy } from "../../hooks/useScrollSpy";

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [scrollProgress, setScrollProgress] = useState(0);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [isHoveringLogo, setIsHoveringLogo] = useState(false);
  const navRef = useRef(null);
  const activeSection = useScrollSpy(NAV_LINKS.map((link) => link.id));

  useEffect(() => {
    const handleScroll = () => {
      const scrollTop = window.scrollY;
      const docHeight = document.documentElement.scrollHeight - window.innerHeight;
      const progress = (scrollTop / docHeight) * 100;
      
      setIsScrolled(scrollTop > 20);
      setScrollProgress(progress);
    };

    const handleMouseMove = (e) => {
      if (navRef.current) {
        const rect = navRef.current.getBoundingClientRect();
        setMousePosition({
          x: e.clientX - rect.left,
          y: e.clientY - rect.top
        });
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    window.addEventListener("mousemove", handleMouseMove, { passive: true });
    
    handleScroll();
    
    return () => {
      window.removeEventListener("scroll", handleScroll);
      window.removeEventListener("mousemove", handleMouseMove);
    };
  }, []);

  useEffect(() => {
    if (isMenuOpen) {
      document.body.style.overflow = 'hidden';
      document.body.style.paddingRight = 'var(--scrollbar-width, 0px)';
    } else {
      document.body.style.overflow = '';
      document.body.style.paddingRight = '';
    }
    
    return () => {
      document.body.style.overflow = '';
      document.body.style.paddingRight = '';
    };
  }, [isMenuOpen]);

  const scrollToSection = (sectionId) => {
    const element = document.getElementById(sectionId);
    if (element) {
      const offset = 90;
      const elementPosition = element.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.pageYOffset - offset;

      window.scrollTo({
        top: offsetPosition,
        behavior: "smooth"
      });
      setIsMenuOpen(false);
    }
  };

  const handleDownloadResume = () => {
    const link = document.createElement('a');
    link.href = '/resume.pdf';
    link.download = 'Ulugbek_Gofurjonov_Resume.pdf';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    setIsMenuOpen(false);
  };

  return (
    <>
      {/* Fixed wrapper for always-sticky navbar */}
      <div className="fixed top-0 left-0 right-0 z-50 w-full">
        <nav
          ref={navRef}
          className={`w-full transition-all duration-700 ${
            isScrolled 
              ? "bg-black/90 backdrop-blur-4xl shadow-2xl shadow-black/70 border-b border-white/10 py-3" 
              : "bg-black/70 backdrop-blur-4xl border-b border-white/5 py-4"
          }`}
          style={{ 
            transform: "translate3d(0, 0, 0)",
            willChange: "background-color, backdrop-filter, transform",
            backdropFilter: "blur(40px) saturate(180%)",
            WebkitBackdropFilter: "blur(40px) saturate(180%)",
            backgroundColor: "rgba(0, 0, 0, 0.8)",
            transition: "all 0.3s cubic-bezier(0.4, 0, 0.2, 1)",
          }}
        >
          {/* Animated gradient border top */}
          <div className="absolute top-0 left-0 right-0 h-[1px] bg-gradient-to-r from-transparent via-blue-500/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
          
          {/* Mouse follow spotlight effect */}
          <div 
            className="absolute inset-0 opacity-0 hover:opacity-100 transition-opacity duration-500 pointer-events-none"
            style={{
              background: `radial-gradient(600px circle at ${mousePosition.x}px ${mousePosition.y}px, rgba(59, 130, 246, 0.08), transparent 40%)`,
              mixBlendMode: "screen"
            }}
          />

          {/* Scroll Progress Bar with gradient */}
          <div className="absolute bottom-0 left-0 right-0 h-[2px] bg-gradient-to-r from-transparent via-white/10 to-transparent">
            <div 
              className="h-full bg-gradient-to-r from-blue-600 via-cyan-500 to-blue-600 shadow-lg shadow-blue-500/50 transition-all duration-300 relative overflow-hidden"
              style={{ width: `${scrollProgress}%` }}
            >
              <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent animate-shimmer" />
            </div>
          </div>

          {/* Blur overlay for depth */}
          <div className="absolute inset-0 bg-gradient-to-b from-white/5 to-transparent opacity-20 pointer-events-none" />

          <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
            <div className="flex items-center justify-between h-16">
              {/* Logo - Premium */}
              <div 
                className="flex items-center gap-3 group cursor-pointer transition-all duration-500"
                onClick={() => {
                  window.scrollTo({ top: 0, behavior: "smooth" });
                  setIsMenuOpen(false);
                }}
                onMouseEnter={() => setIsHoveringLogo(true)}
                onMouseLeave={() => setIsHoveringLogo(false)}
              >
                <div className="relative">
                  {/* Animated glow rings */}
                  <div className={`absolute inset-0 bg-blue-500/30 blur-xl rounded-full transition-all duration-700 ${
                    isHoveringLogo ? 'scale-150 bg-blue-400/50' : 'scale-100'
                  }`} />
                  <div className={`absolute inset-0 bg-cyan-500/20 blur-2xl rounded-full transition-all duration-1000 ${
                    isHoveringLogo ? 'scale-[2] opacity-100' : 'scale-100 opacity-0'
                  }`} />
                  
                  {/* Icon with rotation */}
                  <div className="relative">
                    <Code className={`w-8 h-8 text-blue-400 transition-all duration-700 ${
                      isHoveringLogo ? 'text-blue-300 rotate-180 scale-110' : 'rotate-0 scale-100'
                    }`} />
                    
                    {/* Orbiting particles */}
                    {isHoveringLogo && (
                      <>
                        <span className="absolute top-0 left-0 w-1.5 h-1.5 bg-blue-400 rounded-full animate-orbit-1" />
                        <span className="absolute top-0 right-0 w-1 h-1 bg-cyan-400 rounded-full animate-orbit-2" />
                        <span className="absolute bottom-0 left-0 w-1 h-1 bg-blue-300 rounded-full animate-orbit-3" />
                      </>
                    )}
                  </div>
                </div>
                
                <div className="relative">
                  <h1
                    className={`text-lg md:text-xl font-bold bg-gradient-to-r from-white via-blue-100 to-white bg-clip-text text-transparent transition-all duration-500 ${
                      isHoveringLogo ? 'from-blue-200 via-white to-blue-200' : ''
                    }`}
                    style={{ fontFamily: "var(--font-heading)" }}
                  >
                    UG Portfolio
                  </h1>
                  
                  {/* Animated underline */}
                  <span className={`absolute -bottom-1 left-0 h-[2px] bg-gradient-to-r from-blue-500 to-cyan-500 transition-all duration-500 ${
                    isHoveringLogo ? 'w-full opacity-100' : 'w-0 opacity-0'
                  }`} />
                </div>
              </div>

              {/* Desktop Navigation - Premium */}
              <div 
                className="hidden lg:flex items-center gap-2"
                style={{ fontFamily: "var(--font-body)" }}
              >
                {NAV_LINKS.map((link, index) => (
                  <button
                    key={link.id}
                    onClick={() => scrollToSection(link.id)}
                    className={`relative px-4 py-2 text-sm font-semibold transition-all duration-500 rounded-xl group overflow-hidden ${
                      activeSection === link.id
                        ? "text-white"
                        : "text-white/60 hover:text-white"
                    }`}
                    style={{
                      animationDelay: `${index * 75}ms`
                    }}
                  >
                    {/* Background layers */}
                    <span className={`absolute inset-0 bg-gradient-to-br from-blue-600/20 to-cyan-600/20 rounded-xl transition-all duration-500 ${
                      activeSection === link.id ? 'opacity-100 scale-100' : 'opacity-0 scale-95 group-hover:opacity-100 group-hover:scale-100'
                    }`} />
                    
                    <span className={`absolute inset-0 bg-white/5 rounded-xl transition-all duration-300 ${
                      activeSection === link.id ? 'scale-100' : 'scale-0 group-hover:scale-100'
                    }`} />
                    
                    {/* Shimmer effect on hover */}
                    <span className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent translate-x-[-200%] group-hover:translate-x-[200%] transition-transform duration-1000 rounded-xl" />
                    
                    {/* Text */}
                    <span className="relative z-10 flex items-center gap-1.5">
                      {link.label}
                      {activeSection === link.id && (
                        <span className="w-1 h-1 bg-blue-400 rounded-full animate-pulse" />
                      )}
                    </span>
                    
                    {/* Bottom indicator */}
                    <span 
                      className={`absolute -bottom-1 left-1/2 -translate-x-1/2 h-[3px] rounded-full bg-gradient-to-r from-blue-500 via-cyan-500 to-blue-500 shadow-lg shadow-blue-500/50 transition-all duration-500 ${
                        activeSection === link.id 
                          ? "w-full opacity-100" 
                          : "w-0 opacity-0 group-hover:w-3/4 group-hover:opacity-100"
                      }`}
                    />
                    
                    {/* Glow effect */}
                    {activeSection === link.id && (
                      <span className="absolute inset-0 bg-blue-500/10 blur-2xl rounded-xl animate-pulse" />
                    )}
                  </button>
                ))}
              </div>

              {/* Desktop CTA - Ultra Premium */}
              <div className="hidden lg:flex items-center gap-4">
                <button
                  onClick={handleDownloadResume}
                  className="group relative px-6 py-3 bg-gradient-to-r from-blue-600 via-blue-500 to-cyan-600 text-white font-bold text-sm rounded-2xl overflow-hidden shadow-2xl shadow-blue-500/40 hover:shadow-blue-500/60 transition-all duration-500 hover:scale-105 hover:-translate-y-0.5"
                >
                  {/* Animated background */}
                  <span className="absolute inset-0 bg-gradient-to-r from-cyan-600 via-blue-500 to-blue-600 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                  
                  {/* Shimmer effect */}
                  <span className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent translate-x-[-200%] group-hover:translate-x-[200%] transition-transform duration-1000" />
                  
                  {/* Glow pulse */}
                  <span className="absolute inset-0 bg-white/20 blur-2xl scale-0 group-hover:scale-100 transition-transform duration-500" />
                  
                  {/* Content */}
                  <span className="relative flex items-center gap-2.5 z-10">
                    <Download className="w-4 h-4 group-hover:animate-bounce" />
                    <span className="tracking-wide">Resumeni yuklab olish</span>
                    <ChevronDown className="w-3.5 h-3.5 group-hover:translate-y-0.5 transition-transform duration-300" />
                  </span>
                  
                  {/* Border glow */}
                  <span className="absolute inset-0 rounded-2xl ring-2 ring-white/0 group-hover:ring-white/20 transition-all duration-500" />
                </button>
              </div>

              {/* Mobile Menu Button - Premium */}
              <button
                className={`lg:hidden relative p-2.5 text-white rounded-2xl transition-all duration-500 group overflow-hidden ${
                  isMenuOpen ? 'bg-blue-600' : 'bg-white/5 hover:bg-white/10'
                }`}
                onClick={() => setIsMenuOpen(!isMenuOpen)}
                aria-label="Toggle menu"
                aria-expanded={isMenuOpen}
              >
                {/* Background effects */}
                <span className="absolute inset-0 bg-gradient-to-br from-blue-600/20 to-cyan-600/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                <span className="absolute inset-0 bg-blue-500/0 group-hover:bg-blue-500/10 transition-colors duration-300" />
                
                {/* Icon */}
                <div className="relative">
                  {isMenuOpen ? (
                    <X size={20} className="transition-all duration-500 rotate-90" />
                  ) : (
                    <Menu size={20} className="transition-all duration-300 group-hover:scale-110" />
                  )}
                </div>
                
                {/* Glow on hover */}
                <span className="absolute inset-0 bg-blue-500/30 blur-lg scale-0 group-hover:scale-150 transition-transform duration-500 rounded-full" />
              </button>
            </div>
          </div>
        </nav>

        {/* Mobile Menu - Ultra Premium with enhanced blur */}
        {/* O'ZGARTIRISH: top qiymati 64px dan 80px ga o'zgardi */}
        <div
          className={`lg:hidden fixed left-0 right-0 transition-all duration-700 ease-out ${
            isMenuOpen 
              ? "max-h-screen opacity-100 translate-y-0 visible" 
              : "max-h-0 opacity-0 -translate-y-8 invisible"
          }`}
          style={{ 
            top: '80px', // ◄◄◄ ASOSIY O'ZGARTIRISH: 64px → 80px
            backdropFilter: "blur(100px)",
            WebkitBackdropFilter: "blur(100px)"
          }}
        >
          {/* Blur backdrop with glass effect */}
          <div className={`absolute inset-0 backdrop-blur-4xl bg-gradient-to-b from-black/95 via-black/98 to-black transition-all duration-700 ${
            isMenuOpen ? 'opacity-100' : 'opacity-0'
          }`} />
          
          {/* Animated gradient background */}
          <div className="absolute inset-0 bg-gradient-to-br from-blue-950/30 via-transparent to-cyan-950/20 opacity-50" />
          
          {/* Glass effect border */}
          <div className="absolute inset-0 border border-white/10 rounded-2xl m-2" />
          
          <div className="relative shadow-2xl">
            {/* Qo'shimcha tuzatish: padding kamaytirildi */}
            <div className="max-w-[1400px] mx-auto px-5 py-6 space-y-2">
              {NAV_LINKS.map((link, index) => (
                <button
                  key={link.id}
                  onClick={() => scrollToSection(link.id)}
                  className={`group relative block w-full text-left px-6 py-3 rounded-2xl font-semibold transition-all duration-500 overflow-hidden ${
                    activeSection === link.id
                      ? "bg-gradient-to-r from-blue-600 to-cyan-600 text-white shadow-2xl shadow-blue-500/40 scale-[1.02]"
                      : "text-white/70 hover:text-white hover:bg-white/5 hover:translate-x-2"
                  }`}
                  style={{
                    animationDelay: `${index * 60}ms`,
                    animation: isMenuOpen ? 'slideInMobile 0.5s cubic-bezier(0.16, 1, 0.3, 1) forwards' : 'none',
                    backdropFilter: "blur(10px)",
                  }}
                >
                  {/* Background effects */}
                  {activeSection !== link.id && (
                    <>
                      <span className="absolute inset-0 bg-gradient-to-r from-blue-600/10 to-cyan-600/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-2xl" />
                      <span className="absolute inset-0 bg-gradient-to-r from-transparent via-white/5 to-transparent translate-x-[-200%] group-hover:translate-x-[200%] transition-transform duration-1000" />
                    </>
                  )}
                  
                  {/* Glass effect overlay */}
                  <div className="absolute inset-0 bg-white/3 rounded-2xl" />
                  
                  {/* Content */}
                  <span className="relative flex items-center justify-between">
                    <span className="flex items-center gap-3">
                      {activeSection === link.id && (
                        <Sparkles className="w-4 h-4 animate-pulse" />
                      )}
                      <span className="text-sm">{link.label}</span>
                    </span>
                    
                    {activeSection === link.id && (
                      <span className="w-2 h-2 bg-white rounded-full animate-ping" />
                    )}
                  </span>
                  
                  {/* Border glow */}
                  {activeSection === link.id && (
                    <span className="absolute inset-0 rounded-2xl ring-2 ring-white/20" />
                  )}
                </button>
              ))}

              {/* Mobile Resume Button */}
              <div className="pt-6 border-t border-white/10 mt-6">
                <button
                  onClick={handleDownloadResume}
                  className="group relative w-full px-6 py-4 bg-gradient-to-r from-blue-600 via-blue-500 to-cyan-600 text-white text-sm font-bold rounded-2xl overflow-hidden shadow-2xl shadow-blue-500/50 transition-all duration-500 hover:shadow-blue-500/70 hover:scale-[1.02]"
                  style={{
                    animation: isMenuOpen ? 'slideInMobile 0.5s cubic-bezier(0.16, 1, 0.3, 1) 0.3s forwards' : 'none',
                    opacity: 0,
                    backdropFilter: "blur(20px)"
                  }}
                >
                  {/* Animated background */}
                  <span className="absolute inset-0 bg-gradient-to-r from-cyan-600 via-blue-500 to-blue-600 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                  
                  {/* Shimmer */}
                  <span className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent translate-x-[-200%] group-hover:translate-x-[200%] transition-transform duration-1000" />
                  
                  {/* Glass effect */}
                  <span className="absolute inset-0 bg-white/10 rounded-2xl" />
                  
                  {/* Content */}
                  <span className="relative flex items-center justify-center gap-3">
                    <Download className="w-4 h-4 group-hover:animate-bounce" />
                    <span className="tracking-wide">Resumeni yuklab olish</span>
                  </span>
                  
                  {/* Glow pulse */}
                  <span className="absolute inset-0 bg-white/10 blur-xl scale-0 group-hover:scale-100 transition-transform duration-500" />
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Spacer to prevent content from hiding under fixed navbar */}
      <div className="h-20" />

      <style>{`
        @keyframes slideInMobile {
          from {
            opacity: 0;
            transform: translateX(-20px) translateY(-5px);
          }
          to {
            opacity: 1;
            transform: translateX(0) translateY(0);
          }
        }

        @keyframes shimmer {
          0% {
            transform: translateX(-100%);
          }
          100% {
            transform: translateX(100%);
          }
        }

        @keyframes orbit-1 {
          0% {
            transform: rotate(0deg) translateX(20px) rotate(0deg);
          }
          100% {
            transform: rotate(360deg) translateX(20px) rotate(-360deg);
          }
        }

        @keyframes orbit-2 {
          0% {
            transform: rotate(120deg) translateX(18px) rotate(-120deg);
          }
          100% {
            transform: rotate(480deg) translateX(18px) rotate(-480deg);
          }
        }

        @keyframes orbit-3 {
          0% {
            transform: rotate(240deg) translateX(16px) rotate(-240deg);
          }
          100% {
            transform: rotate(600deg) translateX(16px) rotate(-600deg);
          }
        }

        .animate-shimmer {
          animation: shimmer 3s linear infinite;
        }

        .animate-orbit-1 {
          animation: orbit-1 3s linear infinite;
        }

        .animate-orbit-2 {
          animation: orbit-2 3.5s linear infinite;
        }

        .animate-orbit-3 {
          animation: orbit-3 4s linear infinite;
        }

        :root {
          --scrollbar-width: 0px;
        }

        @media (min-width: 1024px) {
          :root {
            --scrollbar-width: 8px;
          }
        }

        html {
          scroll-behavior: smooth;
        }

        /* Gradient text animation for logo */
        @keyframes gradient-shift {
          0% {
            background-position: 0% 50%;
          }
          50% {
            background-position: 100% 50%;
          }
          100% {
            background-position: 0% 50%;
          }
        }

        .gradient-text {
          background: linear-gradient(90deg, #fff, #93c5fd, #fff, #93c5fd);
          background-size: 300% 300%;
          animation: gradient-shift 8s ease infinite;
          -webkit-background-clip: text;
          background-clip: text;
          color: transparent;
        }

        /* Glass effect styles */
        .glass-effect {
          background: rgba(255, 255, 255, 0.05);
          backdrop-filter: blur(20px);
          -webkit-backdrop-filter: blur(20px);
          border: 1px solid rgba(255, 255, 255, 0.1);
        }

        @media (prefers-reduced-motion: reduce) {
          *,
          *::before,
          *::after {
            animation-duration: 0.01ms !important;
            animation-iteration-count: 1 !important;
            transition-duration: 0.01ms !important;
          }
        }
      `}</style>
    </>
  );
};

export default Navbar;