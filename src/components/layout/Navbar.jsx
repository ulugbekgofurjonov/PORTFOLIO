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
      {/* Fixed Navbar Container */}
      <div className="fixed top-0 left-0 right-0 z-50 w-full">
        <nav
          ref={navRef}
          className={`w-full transition-all duration-500 ${
            isScrolled 
              ? "bg-black/95 backdrop-blur-2xl shadow-2xl shadow-black/50 border-b border-white/10 py-3" 
              : "bg-black/80 backdrop-blur-xl border-b border-white/5 py-4"
          }`}
          style={{ 
            transform: "translate3d(0, 0, 0)",
            willChange: "transform",
            backdropFilter: "blur(24px) saturate(180%)",
            WebkitBackdropFilter: "blur(24px) saturate(180%)",
          }}
        >
          {/* Top Gradient Border */}
          <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-blue-500/40 to-transparent" />
          
          {/* Mouse Follow Effect */}
          <div 
            className="absolute inset-0 opacity-0 hover:opacity-100 transition-opacity duration-700 pointer-events-none"
            style={{
              background: `radial-gradient(800px circle at ${mousePosition.x}px ${mousePosition.y}px, rgba(59, 130, 246, 0.06), transparent 50%)`,
            }}
          />

          {/* Scroll Progress Bar */}
          <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-white/5">
            <div 
              className="h-full bg-gradient-to-r from-blue-600 via-cyan-500 to-blue-600 shadow-lg shadow-blue-500/50 transition-all duration-300 ease-out relative overflow-hidden"
              style={{ width: `${scrollProgress}%` }}
            >
              <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/40 to-transparent animate-shimmer" />
            </div>
          </div>

          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex items-center justify-between h-16 sm:h-18">
              {/* Logo Section */}
              <div 
                className="flex items-center gap-2.5 sm:gap-3 group cursor-pointer transition-all duration-500"
                onClick={() => {
                  window.scrollTo({ top: 0, behavior: "smooth" });
                  setIsMenuOpen(false);
                }}
                onMouseEnter={() => setIsHoveringLogo(true)}
                onMouseLeave={() => setIsHoveringLogo(false)}
              >
                <div className="relative">
                  {/* Glow Effects */}
                  <div className={`absolute -inset-2 bg-blue-500/20 blur-xl rounded-full transition-all duration-700 ${
                    isHoveringLogo ? 'scale-150 bg-blue-400/40' : 'scale-100'
                  }`} />
                  <div className={`absolute -inset-3 bg-cyan-500/10 blur-2xl rounded-full transition-all duration-1000 ${
                    isHoveringLogo ? 'scale-[2.5] opacity-100' : 'scale-100 opacity-0'
                  }`} />
                  
                  {/* Icon Container */}
                  <div className="relative bg-gradient-to-br from-blue-500/10 to-cyan-500/10 p-2 rounded-xl border border-white/10">
                    <Code className={`w-6 h-6 sm:w-7 sm:h-7 text-blue-400 transition-all duration-700 ${
                      isHoveringLogo ? 'text-blue-300 rotate-180 scale-110' : 'rotate-0 scale-100'
                    }`} />
                    
                    {/* Orbiting Particles */}
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
                    className={`text-base sm:text-lg md:text-xl font-bold bg-gradient-to-r from-white via-blue-100 to-white bg-clip-text text-transparent transition-all duration-500 ${
                      isHoveringLogo ? 'from-blue-200 via-white to-blue-200' : ''
                    }`}
                    style={{ fontFamily: "var(--font-heading)" }}
                  >
                    UG Portfolio
                  </h1>
                  
                  {/* Animated Underline */}
                  <span className={`absolute -bottom-1 left-0 h-0.5 bg-gradient-to-r from-blue-500 to-cyan-500 transition-all duration-500 ${
                    isHoveringLogo ? 'w-full opacity-100' : 'w-0 opacity-0'
                  }`} />
                </div>
              </div>

              {/* Desktop Navigation */}
              <div 
                className="hidden lg:flex items-center gap-1.5 xl:gap-2"
                style={{ fontFamily: "var(--font-body)" }}
              >
                {NAV_LINKS.map((link, index) => (
                  <button
                    key={link.id}
                    onClick={() => scrollToSection(link.id)}
                    className={`relative px-3 xl:px-4 py-2 text-sm font-semibold transition-all duration-500 rounded-xl group overflow-hidden ${
                      activeSection === link.id
                        ? "text-white"
                        : "text-white/60 hover:text-white"
                    }`}
                    style={{
                      animationDelay: `${index * 50}ms`
                    }}
                  >
                    {/* Background Layers */}
                    <span className={`absolute inset-0 bg-gradient-to-br from-blue-600/15 to-cyan-600/15 rounded-xl transition-all duration-500 ${
                      activeSection === link.id ? 'opacity-100 scale-100' : 'opacity-0 scale-95 group-hover:opacity-100 group-hover:scale-100'
                    }`} />
                    
                    <span className={`absolute inset-0 bg-white/5 rounded-xl transition-all duration-300 ${
                      activeSection === link.id ? 'scale-100' : 'scale-0 group-hover:scale-100'
                    }`} />
                    
                    {/* Shimmer Effect */}
                    <span className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000 rounded-xl" />
                    
                    {/* Text with Indicator */}
                    <span className="relative z-10 flex items-center gap-1.5">
                      {link.label}
                      {activeSection === link.id && (
                        <span className="w-1 h-1 bg-blue-400 rounded-full animate-pulse" />
                      )}
                    </span>
                    
                    {/* Bottom Indicator */}
                    <span 
                      className={`absolute -bottom-0.5 left-1/2 -translate-x-1/2 h-0.5 rounded-full bg-gradient-to-r from-blue-500 via-cyan-500 to-blue-500 shadow-lg shadow-blue-500/50 transition-all duration-500 ${
                        activeSection === link.id 
                          ? "w-full opacity-100" 
                          : "w-0 opacity-0 group-hover:w-3/4 group-hover:opacity-100"
                      }`}
                    />
                    
                    {/* Active Glow */}
                    {activeSection === link.id && (
                      <span className="absolute inset-0 bg-blue-500/10 blur-xl rounded-xl animate-pulse" />
                    )}
                  </button>
                ))}
              </div>

              {/* Desktop CTA Button */}
              <div className="hidden lg:flex items-center">
                <button
                  onClick={handleDownloadResume}
                  className="group relative px-4 xl:px-6 py-2.5 xl:py-3 bg-gradient-to-r from-blue-600 via-blue-500 to-cyan-600 text-white font-bold text-xs xl:text-sm rounded-xl xl:rounded-2xl overflow-hidden shadow-xl shadow-blue-500/30 hover:shadow-2xl hover:shadow-blue-500/50 transition-all duration-500 hover:scale-105"
                >
                  {/* Animated Background */}
                  <span className="absolute inset-0 bg-gradient-to-r from-cyan-600 via-blue-500 to-blue-600 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                  
                  {/* Shimmer */}
                  <span className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000" />
                  
                  {/* Glow Pulse */}
                  <span className="absolute inset-0 bg-white/20 blur-xl scale-0 group-hover:scale-100 transition-transform duration-500" />
                  
                  {/* Content */}
                  <span className="relative flex items-center gap-2 z-10">
                    <Download className="w-3.5 h-3.5 xl:w-4 xl:h-4 group-hover:animate-bounce" />
                    <span className="tracking-wide">Resumeni yuklab olish</span>
                    <ChevronDown className="w-3 h-3 xl:w-3.5 xl:h-3.5 group-hover:translate-y-0.5 transition-transform duration-300" />
                  </span>
                  
                  {/* Border Glow */}
                  <span className="absolute inset-0 rounded-xl xl:rounded-2xl ring-1 ring-white/0 group-hover:ring-white/20 transition-all duration-500" />
                </button>
              </div>

              {/* Mobile Menu Button */}
              <button
                className={`lg:hidden relative p-2 sm:p-2.5 text-white rounded-xl transition-all duration-500 group overflow-hidden ${
                  isMenuOpen ? 'bg-blue-600 shadow-lg shadow-blue-500/50' : 'bg-white/5 hover:bg-white/10'
                }`}
                onClick={() => setIsMenuOpen(!isMenuOpen)}
                aria-label="Toggle menu"
                aria-expanded={isMenuOpen}
              >
                {/* Background Effects */}
                <span className="absolute inset-0 bg-gradient-to-br from-blue-600/20 to-cyan-600/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-xl" />
                
                {/* Icon */}
                <div className="relative">
                  {isMenuOpen ? (
                    <X size={20} className="transition-all duration-500 rotate-90" />
                  ) : (
                    <Menu size={20} className="transition-all duration-300 group-hover:scale-110" />
                  )}
                </div>
                
                {/* Hover Glow */}
                <span className="absolute inset-0 bg-blue-500/30 blur-lg scale-0 group-hover:scale-150 transition-transform duration-500 rounded-full" />
              </button>
            </div>
          </div>
        </nav>

        {/* Mobile Menu */}
        <div
          className={`lg:hidden fixed left-0 right-0 transition-all duration-700 ease-out ${
            isMenuOpen 
              ? "max-h-[calc(100vh-5rem)] opacity-100 translate-y-0 visible" 
              : "max-h-0 opacity-0 -translate-y-8 invisible"
          }`}
          style={{ 
            top: '5rem',
            backdropFilter: "blur(40px)",
            WebkitBackdropFilter: "blur(40px)"
          }}
        >
          {/* Backdrop */}
          <div className={`absolute inset-0 bg-gradient-to-b from-black/98 via-black/99 to-black transition-all duration-700 ${
            isMenuOpen ? 'opacity-100' : 'opacity-0'
          }`} />
          
          {/* Gradient Overlay */}
          <div className="absolute inset-0 bg-gradient-to-br from-blue-950/20 via-transparent to-cyan-950/10 opacity-50" />
          
          {/* Content Container */}
          <div className="relative shadow-2xl overflow-y-auto max-h-[calc(100vh-5rem)]">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 py-4 sm:py-6 space-y-1.5 sm:space-y-2">
              {/* Navigation Links */}
              {NAV_LINKS.map((link, index) => (
                <button
                  key={link.id}
                  onClick={() => scrollToSection(link.id)}
                  className={`group relative block w-full text-left px-4 sm:px-6 py-3 sm:py-3.5 rounded-xl sm:rounded-2xl font-semibold text-sm sm:text-base transition-all duration-500 overflow-hidden ${
                    activeSection === link.id
                      ? "bg-gradient-to-r from-blue-600 to-cyan-600 text-white shadow-xl shadow-blue-500/30 scale-[1.02]"
                      : "text-white/70 hover:text-white hover:bg-white/5 hover:translate-x-1"
                  }`}
                  style={{
                    animationDelay: `${index * 50}ms`,
                    animation: isMenuOpen ? 'slideInMobile 0.5s cubic-bezier(0.16, 1, 0.3, 1) forwards' : 'none',
                  }}
                >
                  {/* Background Effects */}
                  {activeSection !== link.id && (
                    <>
                      <span className="absolute inset-0 bg-gradient-to-r from-blue-600/10 to-cyan-600/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-xl sm:rounded-2xl" />
                      <span className="absolute inset-0 bg-gradient-to-r from-transparent via-white/5 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000" />
                    </>
                  )}
                  
                  {/* Content */}
                  <span className="relative flex items-center justify-between">
                    <span className="flex items-center gap-2.5 sm:gap-3">
                      {activeSection === link.id && (
                        <Sparkles className="w-3.5 h-3.5 sm:w-4 sm:h-4 animate-pulse" />
                      )}
                      <span>{link.label}</span>
                    </span>
                    
                    {activeSection === link.id && (
                      <span className="w-1.5 h-1.5 sm:w-2 sm:h-2 bg-white rounded-full animate-ping" />
                    )}
                  </span>
                  
                  {/* Active Border */}
                  {activeSection === link.id && (
                    <span className="absolute inset-0 rounded-xl sm:rounded-2xl ring-1 ring-white/20" />
                  )}
                </button>
              ))}

              {/* Mobile Resume Button */}
              <div className="pt-4 sm:pt-6 border-t border-white/10 mt-4 sm:mt-6">
                <button
                  onClick={handleDownloadResume}
                  className="group relative w-full px-4 sm:px-6 py-3.5 sm:py-4 bg-gradient-to-r from-blue-600 via-blue-500 to-cyan-600 text-white text-sm sm:text-base font-bold rounded-xl sm:rounded-2xl overflow-hidden shadow-xl shadow-blue-500/40 transition-all duration-500 hover:shadow-2xl hover:shadow-blue-500/60 hover:scale-[1.02]"
                  style={{
                    animation: isMenuOpen ? 'slideInMobile 0.5s cubic-bezier(0.16, 1, 0.3, 1) 0.3s forwards' : 'none',
                    opacity: 0,
                  }}
                >
                  {/* Animated Background */}
                  <span className="absolute inset-0 bg-gradient-to-r from-cyan-600 via-blue-500 to-blue-600 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                  
                  {/* Shimmer */}
                  <span className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000" />
                  
                  {/* Content */}
                  <span className="relative flex items-center justify-center gap-2.5 sm:gap-3">
                    <Download className="w-4 h-4 sm:w-4.5 sm:h-4.5 group-hover:animate-bounce" />
                    <span className="tracking-wide">Resumeni yuklab olish</span>
                  </span>
                  
                  {/* Glow Pulse */}
                  <span className="absolute inset-0 bg-white/10 blur-xl scale-0 group-hover:scale-100 transition-transform duration-500" />
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Spacer */}
      <div className="h-20 sm:h-24" />

      <style>{`
        @keyframes slideInMobile {
          from {
            opacity: 0;
            transform: translateX(-12px) translateY(-4px);
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
            transform: rotate(0deg) translateX(18px) rotate(0deg);
          }
          100% {
            transform: rotate(360deg) translateX(18px) rotate(-360deg);
          }
        }

        @keyframes orbit-2 {
          0% {
            transform: rotate(120deg) translateX(16px) rotate(-120deg);
          }
          100% {
            transform: rotate(480deg) translateX(16px) rotate(-480deg);
          }
        }

        @keyframes orbit-3 {
          0% {
            transform: rotate(240deg) translateX(14px) rotate(-240deg);
          }
          100% {
            transform: rotate(600deg) translateX(14px) rotate(-600deg);
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

        /* Custom Scrollbar for Mobile Menu */
        .overflow-y-auto::-webkit-scrollbar {
          width: 4px;
        }

        .overflow-y-auto::-webkit-scrollbar-track {
          background: rgba(255, 255, 255, 0.05);
          border-radius: 10px;
        }

        .overflow-y-auto::-webkit-scrollbar-thumb {
          background: rgba(59, 130, 246, 0.5);
          border-radius: 10px;
        }

        .overflow-y-auto::-webkit-scrollbar-thumb:hover {
          background: rgba(59, 130, 246, 0.7);
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

        /* Smooth transitions for all states */
        * {
          -webkit-tap-highlight-color: transparent;
        }
      `}</style>
    </>
  );
};

export default Navbar;