import { ChevronDown, Star, Sparkles, Code2, Rocket, Zap, ArrowRight } from "lucide-react";
import { PERSONAL_INFO, STATS } from "../../utils/constants";
import { scrollToSection } from "../../hooks/useScrollSpy";
import FadeIn from "../animations/FadeIn";
import { useState, useEffect, useRef } from "react";
import RadialGradientBackground from "../backgrounds/RadialGradientBackground";

const Hero = () => {
  const [displayedText, setDisplayedText] = useState("");
  const [isTypingComplete, setIsTypingComplete] = useState(false);
  const [cursorVisible, setCursorVisible] = useState(true);

  const fullText = PERSONAL_INFO.name;
  const subtitle = "FRONTEND DEVELOPER PORTFOLIO";

  // Typing animation with cursor blink
  useEffect(() => {
    let currentIndex = 0;
    const typingInterval = setInterval(() => {
      if (currentIndex <= fullText.length) {
        setDisplayedText(fullText.slice(0, currentIndex));
        currentIndex++;
      } else {
        setIsTypingComplete(true);
        clearInterval(typingInterval);
      }
    }, 100);

    return () => clearInterval(typingInterval);
  }, []);

  // Cursor blink effect
  useEffect(() => {
    if (isTypingComplete) {
      const cursorInterval = setInterval(() => {
        setCursorVisible((prev) => !prev);
      }, 530);
      return () => clearInterval(cursorInterval);
    }
  }, [isTypingComplete]);

  return (
    <section
      className="relative min-h-screen flex items-center justify-center overflow-hidden py-16 sm:py-20"
      id="hero"
    >
      <RadialGradientBackground />

      {/* Content container */}
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full text-center">
        {/* Premium Badge with glassmorphism */}
        <FadeIn delay={0}>
          <div className="inline-flex items-center gap-2 sm:gap-3 px-4 sm:px-6 lg:px-7 py-2 sm:py-2.5 lg:py-3 mb-4 sm:mb-6 lg:mb-8 backdrop-blur-2xl bg-white/5 border border-white/10 rounded-full shadow-2xl hover:bg-blue-500/10 hover:border-blue-400/30 transition-all duration-500 group hover:scale-105 relative overflow-hidden">
            {/* Shimmer effect */}
            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000" />
            
            <div className="relative">
              <Star className="w-4 sm:w-5 h-4 sm:h-5 text-blue-400 fill-blue-400 group-hover:rotate-180 transition-transform duration-500" />
              <Sparkles className="w-2.5 sm:w-3 h-2.5 sm:h-3 text-blue-300 absolute -top-1 -right-1 animate-pulse" />
            </div>
            
            <span
              className="text-xs sm:text-sm lg:text-base text-white tracking-widest font-semibold uppercase bg-gradient-to-r from-white via-blue-100 to-white bg-clip-text group-hover:text-transparent transition-all duration-500 relative"
              style={{ fontFamily: "var(--font-display), sans-serif" }}
            >
              {PERSONAL_INFO.title}
            </span>
            
            <Code2 className="w-3.5 sm:w-4 lg:w-4.5 h-3.5 sm:h-4 lg:h-4.5 text-blue-400/70 group-hover:rotate-12 group-hover:scale-110 transition-transform duration-500" />
            
            {/* Glow effect */}
            <div className="absolute inset-0 bg-blue-500/20 blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-full" />
          </div>
        </FadeIn>

        {/* Main Heading with typing effect and cursor */}
        <FadeIn delay={100}>
          <div className="relative mb-3 sm:mb-4 lg:mb-5 px-2">
            <h1
              className="text-white leading-tight relative z-10"
              style={{
                fontSize: "clamp(2.25rem, 10vw, 5rem)",
                lineHeight: "1.15",
                fontWeight: "800",
                letterSpacing: "-0.02em",
                fontFamily: "var(--font-display), sans-serif",
                wordBreak: "break-word",
              }}
            >
              <span className="relative inline-block">
                <span className="bg-gradient-to-r from-blue-300 via-blue-400 to-blue-500 bg-clip-text text-transparent">
                  {displayedText}
                  {!isTypingComplete && (
                    <span
                      className={`inline-block w-0.5 sm:w-[3px] h-[1em] bg-blue-400 ml-1 sm:ml-2 align-middle ${
                        cursorVisible ? "opacity-100" : "opacity-0"
                      }`}
                      style={{ 
                        transition: "opacity 0.1s",
                        boxShadow: "0 0 20px rgba(59, 130, 246, 0.8)"
                      }}
                    />
                  )}
                </span>
                
                {/* Text glow effect */}
                <span
                  className="absolute inset-0 bg-gradient-to-r from-blue-300 via-blue-400 to-blue-500 bg-clip-text text-transparent blur-2xl opacity-50"
                  aria-hidden="true"
                >
                  {displayedText}
                </span>
              </span>
            </h1>
            
            {/* Animated underline */}
            <div className="relative mt-2 sm:mt-3 flex justify-center">
              <div
                className="w-16 sm:w-24 lg:w-28 h-0.5 sm:h-1 rounded-full relative overflow-hidden"
                style={{
                  background: "linear-gradient(90deg, transparent, rgba(59, 130, 246, 0.6), transparent)",
                }}
              >
                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/60 to-transparent animate-shimmer-slow" />
              </div>
            </div>
          </div>
        </FadeIn>

        {/* Subtitle with gradient */}
        <FadeIn delay={150}>
          <div className="relative mb-4 sm:mb-6 lg:mb-7 px-2">
            <p
              className={`font-bold mb-2 sm:mb-3 bg-gradient-to-r from-blue-100 via-white to-blue-100 bg-clip-text text-transparent transition-all duration-1000 ${
                isTypingComplete ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
              }`}
              style={{
                fontFamily: "var(--font-display), sans-serif",
                fontSize: "clamp(0.75rem, 2vw, 1.25rem)",
                letterSpacing: "0.1em",
              }}
            >
              {subtitle}
            </p>
            
            <div className="flex items-center justify-center gap-2">
              <div
                className="w-6 sm:w-10 lg:w-12 h-[2px] rounded-full"
                style={{
                  background: "linear-gradient(90deg, transparent, rgba(147, 197, 253, 0.8))",
                }}
              />
              <div className="relative">
                <Rocket className="w-3.5 sm:w-4 lg:w-5 h-3.5 sm:h-4 lg:h-5 text-blue-200 animate-bounce-slow" />
                <div className="absolute inset-0 bg-blue-400/50 blur-lg rounded-full animate-pulse" />
              </div>
              <div
                className="w-6 sm:w-10 lg:w-12 h-[2px] rounded-full"
                style={{
                  background: "linear-gradient(90deg, rgba(147, 197, 253, 0.8), transparent)",
                }}
              />
            </div>
          </div>
        </FadeIn>

        {/* Description with enhanced glassmorphism */}
        <FadeIn delay={200}>
          <div className="max-w-3xl mx-auto mb-6 sm:mb-8 lg:mb-10 px-2">
            <div
              className="backdrop-blur-2xl bg-gradient-to-br from-white/5 via-white/8 to-white/5 border border-white/15 rounded-xl sm:rounded-2xl lg:rounded-2xl p-4 sm:p-5 lg:p-6 shadow-2xl hover:bg-white/10 hover:border-blue-200/30 transition-all duration-500 group hover:scale-[1.02] relative overflow-hidden"
              style={{
                boxShadow: "0 20px 60px rgba(0, 0, 0, 0.3), inset 0 1px 0 rgba(255, 255, 255, 0.1)",
              }}
            >
              {/* Animated background gradient */}
              <div className="absolute inset-0 bg-gradient-to-br from-blue-500/5 via-transparent to-cyan-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
              
              {/* Shimmer effect */}
              <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/5 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1500" />
              
              <p
                className="text-sm sm:text-base lg:text-base text-white/90 leading-relaxed group-hover:text-white transition-colors duration-300 relative z-10"
                style={{ fontFamily: "var(--font-body), sans-serif" }}
              >
                Men frontend dasturchiman. Zamonaviy veb-texnologiyalar orqali
                foydalanuvchilar uchun qulay va tezkor interfeyslar yarataman!
              </p>
              
              {/* Corner glow accents */}
              <div className="absolute top-0 right-0 w-20 h-20 bg-blue-500/20 blur-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
              <div className="absolute bottom-0 left-0 w-20 h-20 bg-cyan-500/20 blur-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-700" />
            </div>
          </div>
        </FadeIn>

        {/* Premium CTA Button */}
        <FadeIn delay={300}>
          <button
            onClick={() => scrollToSection("contact")}
            className="group mb-8 sm:mb-10 lg:mb-12 inline-block relative"
          >
            {/* Outer glow effect */}
            <div
              className="absolute -inset-2 sm:-inset-3 rounded-[20px] blur-xl opacity-50 group-hover:opacity-100 transition-all duration-500"
              style={{
                background: "linear-gradient(90deg, rgba(147, 197, 253, 0.6), rgba(59, 130, 246, 0.8), rgba(147, 197, 253, 0.6))",
                animation: "pulse-glow 3s ease-in-out infinite",
              }}
            />

            {/* Button content */}
            <div
              className="relative z-10 bg-gradient-to-r from-blue-50 via-sky-50 to-blue-100 text-gray-900 rounded-xl sm:rounded-2xl px-6 sm:px-10 lg:px-12 py-2.5 sm:py-3 lg:py-3.5 text-sm sm:text-base lg:text-lg font-bold border-2 border-white/90 hover:scale-105 active:scale-95 transition-all duration-300 shadow-2xl flex items-center gap-2 sm:gap-2.5 lg:gap-3 overflow-hidden"
              style={{
                fontFamily: "var(--font-body), sans-serif",
                boxShadow: "0 10px 40px rgba(59, 130, 246, 0.4), inset 0 1px 0 rgba(255, 255, 255, 0.8)",
              }}
            >
              {/* Shimmer effect */}
              <span className="absolute inset-0 bg-gradient-to-r from-transparent via-white/40 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000" />
              
              <Zap className="w-4 sm:w-4.5 lg:w-5 h-4 sm:h-4.5 lg:h-5 text-blue-600 group-hover:scale-110 transition-transform duration-300 relative z-10" />
              
              <span className="bg-gradient-to-r from-blue-700 via-blue-600 to-sky-600 bg-clip-text text-transparent group-hover:from-blue-800 group-hover:to-sky-700 transition-all duration-300 relative z-10 font-black">
                Bog'lanish
              </span>
              
              <ArrowRight className="w-4 sm:w-4.5 lg:w-5 h-4 sm:h-4.5 lg:h-5 text-blue-600 group-hover:translate-x-1 transition-transform duration-300 relative z-10" />
            </div>

            {/* Animated ring */}
            <div className="absolute inset-0 rounded-xl sm:rounded-2xl ring-2 ring-blue-400/0 group-hover:ring-blue-400/50 transition-all duration-500" />
            
            {/* Inner glow on hover */}
            <div
              className="absolute inset-0 blur-2xl rounded-xl opacity-0 group-hover:opacity-60 transition-opacity duration-500"
              style={{
                background: "radial-gradient(circle at center, rgba(59, 130, 246, 0.6), transparent 70%)",
              }}
            />
          </button>
        </FadeIn>

        {/* Premium Stats with cards */}
        <FadeIn delay={400}>
          <div className="grid grid-cols-3 gap-2 sm:gap-3 lg:gap-4 xl:gap-5 max-w-4xl mx-auto px-2">
            {STATS.map((stat, index) => (
              <div
                key={index}
                className="group relative backdrop-blur-2xl bg-gradient-to-br from-white/5 via-white/8 to-white/5 border border-white/15 rounded-lg sm:rounded-xl lg:rounded-2xl p-3 sm:p-4 lg:p-5 xl:p-6 hover:bg-white/12 hover:border-blue-200/40 transition-all duration-500 hover:scale-105 hover:-translate-y-1 overflow-hidden"
                style={{
                  boxShadow: "0 10px 30px rgba(0, 0, 0, 0.2), inset 0 1px 0 rgba(255, 255, 255, 0.1)",
                  animationDelay: `${index * 100}ms`,
                }}
              >
                {/* Animated background gradient */}
                <div className="absolute inset-0 bg-gradient-to-br from-blue-500/10 via-transparent to-cyan-500/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                
                {/* Card glow on hover */}
                <div
                  className="absolute -inset-[1px] rounded-lg sm:rounded-xl lg:rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 blur-md"
                  style={{
                    background: "linear-gradient(135deg, rgba(59, 130, 246, 0.4), rgba(147, 197, 253, 0.4))",
                  }}
                />

                {/* Shimmer effect */}
                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/5 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1500 rounded-lg sm:rounded-xl lg:rounded-2xl" />

                <div className="text-center relative z-10">
                  <div
                    className="font-black mb-1 sm:mb-1.5 lg:mb-2 relative inline-block"
                    style={{
                      fontSize: "clamp(1.5rem, 4vw, 2.25rem)",
                      fontFamily: "var(--font-display), sans-serif",
                    }}
                  >
                    <span
                      className="bg-gradient-to-br from-white via-blue-100 to-blue-200 bg-clip-text text-transparent"
                      style={{
                        textShadow: "0 0 40px rgba(147, 197, 253, 0.5)",
                      }}
                    >
                      {stat.value}
                    </span>
                    
                    {/* Number glow */}
                    <span
                      className="absolute inset-0 bg-gradient-to-br from-white via-blue-100 to-blue-200 bg-clip-text text-transparent blur-xl opacity-50"
                      aria-hidden="true"
                    >
                      {stat.value}
                    </span>
                  </div>
                  
                  <p
                    className="text-white/80 font-semibold tracking-wider uppercase group-hover:text-blue-100 transition-colors duration-300"
                    style={{
                      fontSize: "clamp(8px, 1.8vw, 12px)",
                      fontFamily: "var(--font-body), sans-serif",
                      letterSpacing: "0.08em",
                    }}
                  >
                    {stat.label}
                  </p>
                </div>

                {/* Corner accents with animation */}
                <div className="absolute top-1.5 sm:top-2 right-1.5 sm:right-2 w-1 sm:w-1.5 lg:w-2 h-1 sm:h-1.5 lg:h-2 bg-blue-400 rounded-full opacity-0 group-hover:opacity-100 transition-all duration-500 group-hover:scale-150" />
                <div className="absolute bottom-1.5 sm:bottom-2 left-1.5 sm:left-2 w-1 sm:w-1.5 lg:w-2 h-1 sm:h-1.5 lg:h-2 bg-cyan-400 rounded-full opacity-0 group-hover:opacity-100 transition-all duration-700 delay-100 group-hover:scale-150" />
                
                {/* Orbiting particle */}
                <div className="absolute top-1/2 left-1/2 w-1 h-1 bg-blue-300 rounded-full opacity-0 group-hover:opacity-100 group-hover:animate-orbit-stat transition-opacity duration-500" />
              </div>
            ))}
          </div>
        </FadeIn>

        {/* Scroll indicator */}
        <FadeIn delay={500}>
          <div className="mt-8 sm:mt-10 lg:mt-12 flex flex-col items-center gap-2 sm:gap-3 opacity-70 hover:opacity-100 transition-opacity duration-300 cursor-pointer group" onClick={() => scrollToSection("about")}>
            <p className="text-xs sm:text-sm text-white/60 uppercase tracking-widest font-semibold group-hover:text-white/80 transition-colors duration-300">
              Pastga suring
            </p>
            <ChevronDown className="w-4 h-4 sm:w-5 sm:h-5 text-blue-300 animate-bounce-slow group-hover:text-blue-200 transition-colors duration-300" />
          </div>
        </FadeIn>
      </div>

      {/* Enhanced CSS Animations */}
      <style jsx>{`
        @keyframes shimmer-slow {
          0% {
            transform: translateX(-100%);
          }
          100% {
            transform: translateX(100%);
          }
        }

        @keyframes bounce-slow {
          0%, 100% {
            transform: translateY(0);
          }
          50% {
            transform: translateY(-8px);
          }
        }

        @keyframes pulse-glow {
          0%, 100% {
            opacity: 0.5;
            transform: scale(1);
          }
          50% {
            opacity: 1;
            transform: scale(1.05);
          }
        }

        @keyframes orbit-stat {
          0% {
            transform: translate(-50%, -50%) rotate(0deg) translateX(30px) rotate(0deg);
          }
          100% {
            transform: translate(-50%, -50%) rotate(360deg) translateX(30px) rotate(-360deg);
          }
        }

        .animate-shimmer-slow {
          animation: shimmer-slow 3s linear infinite;
        }

        .animate-bounce-slow {
          animation: bounce-slow 2s ease-in-out infinite;
        }

        .animate-orbit-stat {
          animation: orbit-stat 4s linear infinite;
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

        /* Custom scrollbar */
        ::-webkit-scrollbar {
          width: 8px;
        }

        ::-webkit-scrollbar-track {
          background: rgba(0, 0, 0, 0.2);
        }

        ::-webkit-scrollbar-thumb {
          background: rgba(59, 130, 246, 0.5);
          border-radius: 4px;
        }

        ::-webkit-scrollbar-thumb:hover {
          background: rgba(59, 130, 246, 0.7);
        }
      `}</style>
    </section>
  );
};

export default Hero;