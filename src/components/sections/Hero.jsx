import { ChevronDown, Star, Sparkles, Code2, Rocket } from "lucide-react";
import { PERSONAL_INFO, STATS } from "../../utils/constants";
import { scrollToSection } from "../../hooks/useScrollSpy";
import FadeIn from "../animations/FadeIn";
import RadialGradientBackground from "../backgrounds/RadialGradientBackground";
import { useState, useEffect, useRef } from "react";

const Hero = () => {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [displayedText, setDisplayedText] = useState("");
  const [isTypingComplete, setIsTypingComplete] = useState(false);
  const [cursorVisible, setCursorVisible] = useState(true);
  const heroRef = useRef(null);

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
    }, 120);

    return () => clearInterval(typingInterval);
  }, []);

  // Cursor blink effect
  useEffect(() => {
    if (isTypingComplete) {
      const cursorInterval = setInterval(() => {
        setCursorVisible((prev) => !prev);
      }, 500);
      return () => clearInterval(cursorInterval);
    }
  }, [isTypingComplete]);

  // Mouse parallax effect
  useEffect(() => {
    const handleMouseMove = (e) => {
      if (heroRef.current) {
        const rect = heroRef.current.getBoundingClientRect();
        const x = (e.clientX - rect.left - rect.width / 2) / rect.width;
        const y = (e.clientY - rect.top - rect.height / 2) / rect.height;
        setMousePosition({ x, y });
      }
    };

    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, []);

  // Floating particles component with blue theme
  const FloatingParticles = () => {
    const particles = Array.from({ length: 20 }, (_, i) => ({
      id: i,
      size: Math.random() * 4 + 1,
      left: Math.random() * 100,
      animationDuration: Math.random() * 10 + 15,
      delay: Math.random() * 5,
      color:
        i % 3 === 0
          ? "rgba(59, 130, 246, 0.5)"
          : i % 3 === 1
            ? "rgba(96, 165, 250, 0.4)"
            : "rgba(147, 197, 253, 0.3)",
    }));

    return (
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {particles.map((particle) => (
          <div
            key={particle.id}
            className="absolute rounded-full hidden sm:block"
            style={{
              width: `${particle.size}px`,
              height: `${particle.size}px`,
              left: `${particle.left}%`,
              bottom: "-10%",
              background: particle.color,
              animation: `float-up ${particle.animationDuration}s ease-in infinite`,
              animationDelay: `${particle.delay}s`,
              filter: "blur(1px)",
            }}
          />
        ))}
      </div>
    );
  };

  // Animated grid background with blue theme
  const AnimatedGrid = () => (
    <div className="absolute inset-0 opacity-10 sm:opacity-15">
      <div
        className="absolute inset-0"
        style={{
          backgroundImage: `linear-gradient(rgba(59, 130, 246, 0.1) 1px, transparent 1px),
                           linear-gradient(90deg, rgba(59, 130, 246, 0.1) 1px, transparent 1px)`,
          backgroundSize: "40px 40px",
          animation: "grid-move 25s linear infinite",
        }}
      />
    </div>
  );

  return (
    <section
      ref={heroRef}
      className="relative min-h-[calc(100vh-64px)] sm:min-h-screen flex items-center justify-center overflow-hidden bg-gradient-to-b from-gray-900 via-black to-gray-900 pt-20 pb-16 sm:py-20"
      style={{
        paddingTop: "calc(64px + 2rem)", // Navbar balandligi + padding
      }}
    >
      <RadialGradientBackground variant="hero" />
      <AnimatedGrid />
      <FloatingParticles />

      {/* Animated gradient orbs with blue theme - Mobile'da kichikroq */}
      <div
        className="absolute top-1/4 left-1/4 w-48 h-48 sm:w-64 sm:h-64 md:w-96 md:h-96 rounded-full blur-3xl sm:blur-[128px] animate-pulse-slow"
        style={{
          background:
            "radial-gradient(circle, rgba(59, 130, 246, 0.3) 0%, transparent 70%)",
          transform: `translate(${mousePosition.x * 30}px, ${mousePosition.y * 30}px)`,
        }}
      />
      <div
        className="absolute bottom-1/4 right-1/4 w-48 h-48 sm:w-64 sm:h-64 md:w-96 md:h-96 rounded-full blur-3xl sm:blur-[128px] animate-pulse-slower"
        style={{
          background:
            "radial-gradient(circle, rgba(96, 165, 250, 0.2) 0%, transparent 70%)",
          transform: `translate(${-mousePosition.x * 20}px, ${-mousePosition.y * 20}px)`,
        }}
      />

      {/* Content container - Qat'iy padding va width */}
      <div className="relative z-10 w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        {/* Premium Badge with glassmorphism - Mobile friendly */}
        <FadeIn delay={0}>
          <div className="inline-flex items-center gap-1.5 sm:gap-3 px-3 sm:px-6 py-1.5 sm:py-3.5 mb-6 sm:mb-12 backdrop-blur-xl bg-white/5 border border-white/10 rounded-full shadow-xl hover:bg-blue-500/10 hover:border-blue-400/30 transition-all duration-500 group hover:scale-105">
            <div className="relative">
              <Star className="w-3.5 sm:w-5 h-3.5 sm:h-5 text-blue-400 fill-blue-400 animate-pulse" />
              <Sparkles className="w-2 sm:w-3 h-2 sm:h-3 text-blue-400 absolute -top-0.5 -right-0.5 sm:-top-1 sm:-right-1 animate-ping" />
            </div>
            <span
              className="text-xs sm:text-sm text-white tracking-widest font-semibold uppercase bg-gradient-to-r from-white to-blue-400 bg-clip-text group-hover:text-transparent transition-all duration-500"
              style={{ fontFamily: "var(--font-display), sans-serif" }}
            >
              {PERSONAL_INFO.title}
            </span>
            <Code2 className="w-3 sm:w-4 h-3 sm:h-4 text-blue-400/70 group-hover:rotate-12 transition-transform duration-500" />
          </div>
        </FadeIn>

        {/* Main Heading with typing effect and cursor - Mobile friendly */}
        <FadeIn delay={100}>
          <div className="relative mb-4 sm:mb-6 md:mb-8 px-2">
            <h1
              className="text-white leading-tight break-words relative z-10"
              style={{
                fontSize: "clamp(1.75rem, 8vw, 4rem)",
                lineHeight: "1.2",
                fontWeight: "800",
                letterSpacing: "-0.02em",
                fontFamily: "var(--font-display), sans-serif",
                transform: `perspective(1000px) rotateX(${mousePosition.y * 1}deg) rotateY(${mousePosition.x * 1}deg)`,
                transition: "transform 0.2s ease-out",
                textShadow:
                  "0 0 20px rgba(59, 130, 246, 0.5), 0 0 40px rgba(59, 130, 246, 0.2)",
              }}
            >
              <span className="bg-gradient-to-r from-white via-blue-400 to-sky-300 bg-clip-text text-transparent animate-gradient inline-block">
                {displayedText}
                {!isTypingComplete && (
                  <span
                    className={`inline-block w-[1px] h-[0.9em] sm:h-[1.2em] bg-blue-400 ml-0.5 align-middle ${cursorVisible ? "opacity-100" : "opacity-0"}`}
                    style={{ transition: "opacity 0.1s" }}
                  />
                )}
              </span>
            </h1>
            {/* Glowing underline */}
            <div
              className="absolute -bottom-1 sm:-bottom-2 left-1/2 -translate-x-1/2 w-16 sm:w-24 md:w-32 h-0.5 sm:h-1 rounded-full blur-sm animate-pulse-glow"
              style={{
                background:
                  "linear-gradient(90deg, transparent, rgba(59, 130, 246, 0.8), transparent)",
              }}
            />
          </div>
        </FadeIn>

        {/* Subtitle with gradient animation - Mobile friendly */}
        <FadeIn delay={150}>
          <div className="relative mb-3 sm:mb-4 md:mb-6 px-2">
            <p
              className={`font-bold mb-1 sm:mb-2 bg-gradient-to-r from-blue-500 via-sky-400 to-blue-500 bg-clip-text text-transparent transition-opacity duration-1000 ${isTypingComplete ? "opacity-100" : "opacity-0"}`}
              style={{
                fontFamily: "var(--font-display), sans-serif",
                fontSize: "clamp(0.75rem, 3vw, 1.25rem)",
                backgroundSize: "200% auto",
                animation: "gradient-shift 3s ease infinite",
              }}
            >
              {subtitle}
            </p>
            <div className="flex items-center justify-center gap-1.5 sm:gap-2 text-blue-400/70">
              <div
                className="w-4 sm:w-6 md:w-8 h-[1px] sm:h-[2px] rounded-full animate-pulse"
                style={{
                  background:
                    "linear-gradient(90deg, transparent, rgba(59, 130, 246, 0.8))",
                }}
              />
              <Rocket className="w-3 sm:w-3.5 md:w-4 h-3 sm:h-3.5 md:h-4 animate-bounce-slow text-blue-400" />
              <div
                className="w-4 sm:w-6 md:w-8 h-[1px] sm:h-[2px] rounded-full animate-pulse"
                style={{
                  background:
                    "linear-gradient(90deg, rgba(59, 130, 246, 0.8), transparent)",
                }}
              />
            </div>
          </div>
        </FadeIn>

        {/* Description with enhanced glassmorphism - Mobile friendly */}
        <FadeIn delay={200}>
          <div className="max-w-xl sm:max-w-2xl mx-auto mb-6 sm:mb-8 md:mb-12 px-2 sm:px-4">
            <div
              className="backdrop-blur-xl bg-gradient-to-br from-white/5 to-white/10 border border-white/15 rounded-xl sm:rounded-2xl p-4 sm:p-5 md:p-7 shadow-xl hover:bg-white/15 hover:border-blue-400/30 transition-all duration-500 group hover:scale-[1.02]"
              style={{
                boxShadow:
                  "0 10px 25px rgba(0, 0, 0, 0.3), inset 0 1px 0 rgba(255, 255, 255, 0.1)",
              }}
            >
              <p
                className="text-sm sm:text-base md:text-lg text-white/95 leading-relaxed sm:leading-relaxed group-hover:text-white transition-colors duration-300"
                style={{ fontFamily: "var(--font-body), sans-serif" }}
              >
                Men frontend dasturchiman. Zamonaviy veb-texnologiyalar orqali
                foydalanuvchilar uchun qulay va tezkor interfeyslar yarataman!
              </p>
            </div>
          </div>
        </FadeIn>

        {/* Premium CTA Button - Mobile friendly */}
        <FadeIn delay={300}>
          <button
            onClick={() => scrollToSection("contact")}
            className="group mb-8 sm:mb-12 md:mb-20 inline-block relative"
          >
            {/* Outer glow effect */}
            <div
              className="absolute -inset-1 sm:-inset-2 rounded-[16px] sm:rounded-[24px] blur-lg sm:blur-xl opacity-60 group-hover:opacity-100 transition-opacity duration-500 animate-pulse-glow"
              style={{
                background:
                  "linear-gradient(90deg, rgba(59, 130, 246, 0.8), rgba(96, 165, 250, 0.8), rgba(59, 130, 246, 0.8))",
              }}
            />

            {/* Button content */}
            <div
              className="relative z-10 bg-gradient-to-r from-blue-50 to-sky-100 text-gray-900 rounded-[16px] sm:rounded-[20px] px-5 sm:px-8 md:px-12 py-2.5 sm:py-3.5 md:py-5 text-sm sm:text-base md:text-lg font-bold border-2 border-white/80 hover:scale-105 active:scale-95 transition-all duration-300 shadow-xl sm:shadow-2xl flex items-center gap-1.5 sm:gap-2 md:gap-3 group"
              style={{
                fontFamily: "var(--font-body), sans-serif",
                boxShadow: "0 8px 20px rgba(59, 130, 246, 0.4)",
              }}
            >
              <span className="bg-gradient-to-r from-blue-600 to-sky-500 bg-clip-text text-transparent group-hover:from-blue-700 group-hover:to-sky-600 transition-all duration-300">
                Bog'lanish
              </span>
              <Sparkles className="w-3.5 sm:w-4 md:w-5 h-3.5 sm:h-4 md:h-5 text-blue-500 group-hover:rotate-180 transition-transform duration-500" />
            </div>

            {/* Inner glow on hover */}
            <div
              className="absolute inset-0 blur-xl rounded-[16px] sm:rounded-[20px] opacity-0 group-hover:opacity-50 transition-opacity duration-500 -z-10"
              style={{
                background:
                  "radial-gradient(circle at center, rgba(59, 130, 246, 0.5), transparent 70%)",
              }}
            />
          </button>
        </FadeIn>

        {/* Premium Stats with cards - Mobile friendly */}
        <FadeIn delay={400}>
          <div className="grid grid-cols-3 gap-2 sm:gap-3 md:gap-4 lg:gap-6 max-w-sm sm:max-w-md md:max-w-lg lg:max-w-4xl mx-auto px-2">
            {STATS.map((stat, index) => (
              <div
                key={index}
                className="group relative backdrop-blur-xl bg-gradient-to-br from-white/5 to-white/10 border border-white/15 rounded-lg sm:rounded-xl md:rounded-2xl p-2 sm:p-3 md:p-4 lg:p-6 hover:bg-white/15 hover:border-blue-400/40 transition-all duration-500 hover:scale-105 hover:-translate-y-1 sm:hover:-translate-y-2"
                style={{
                  animation: `float ${3 + index * 0.5}s ease-in-out infinite`,
                  animationDelay: `${index * 0.2}s`,
                  boxShadow: "0 5px 15px rgba(0, 0, 0, 0.2)",
                }}
              >
                {/* Card glow on hover */}
                <div
                  className="absolute -inset-[1px] rounded-lg sm:rounded-xl md:rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 blur-sm -z-10"
                  style={{
                    background:
                      "linear-gradient(90deg, rgba(59, 130, 246, 0.2), rgba(96, 165, 250, 0.4), rgba(59, 130, 246, 0.2))",
                  }}
                />

                <div className="text-center relative z-10">
                  <div
                    className="font-black mb-0.5 sm:mb-1 md:mb-2"
                    style={{
                      fontSize: "clamp(1.25rem, 4vw, 2.5rem)",
                      fontFamily: "var(--font-body), sans-serif",
                      textShadow: "0 0 15px rgba(59, 130, 246, 0.5)",
                      background:
                        "linear-gradient(135deg, #3b82f6, #60a5fa, #93c5fd)",
                      WebkitBackgroundClip: "text",
                      backgroundClip: "text",
                      color: "transparent",
                    }}
                  >
                    {stat.value}
                  </div>
                  <p
                    className="text-white/90 font-semibold tracking-wide uppercase group-hover:text-blue-200 transition-colors duration-300"
                    style={{
                      fontSize: "clamp(9px, 1.8vw, 12px)",
                      fontFamily: "var(--font-display), sans-serif",
                    }}
                  >
                    {stat.label}
                  </p>
                </div>

                {/* Corner accents */}
                <div className="absolute top-1 right-1 sm:top-2 sm:right-2 w-1 sm:w-1.5 h-1 sm:h-1.5 bg-blue-400 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-500 animate-pulse" />
                <div className="absolute bottom-1 left-1 sm:bottom-2 sm:left-2 w-1 sm:w-1.5 h-1 sm:h-1.5 bg-sky-400 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-500 animate-pulse delay-150" />
              </div>
            ))}
          </div>
        </FadeIn>

        {/* Scroll indicator - Mobile friendly */}
        <FadeIn delay={500}>
          <div className="absolute bottom-4 sm:bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce cursor-pointer">
            <ChevronDown 
              className="text-gray-400 w-6 h-6 sm:w-8 sm:h-8 hover:text-blue-400 transition-colors duration-300"
              onClick={() => scrollToSection("about")}
            />
          </div>
        </FadeIn>
      </div>

      {/* CSS Animations - Mobile optimizatsiya */}
      <style jsx>{`
        @keyframes float-up {
          0% {
            transform: translateY(100vh) translateX(0);
            opacity: 0;
          }
          10% {
            opacity: 1;
          }
          90% {
            opacity: 1;
          }
          100% {
            transform: translateY(-100vh) translateX(50px);
            opacity: 0;
          }
        }

        @keyframes grid-move {
          0% {
            transform: translateY(0);
          }
          100% {
            transform: translateY(40px);
          }
        }

        @keyframes gradient-shift {
          0%,
          100% {
            background-position: 0% 50%;
          }
          50% {
            background-position: 100% 50%;
          }
        }

        @keyframes pulse-slow {
          0%,
          100% {
            opacity: 0.3;
          }
          50% {
            opacity: 0.6;
          }
        }

        @keyframes pulse-slower {
          0%,
          100% {
            opacity: 0.2;
          }
          50% {
            opacity: 0.5;
          }
        }

        @keyframes pulse-glow {
          0%,
          100% {
            opacity: 0.5;
          }
          50% {
            opacity: 1;
          }
        }

        @keyframes float {
          0%,
          100% {
            transform: translateY(0px);
          }
          50% {
            transform: translateY(-8px);
          }
        }

        @keyframes bounce-slow {
          0%,
          100% {
            transform: translateY(0);
          }
          50% {
            transform: translateY(-4px);
          }
        }

        @keyframes gradient {
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

        @media (max-width: 640px) {
          @keyframes float {
            0%,
            100% {
              transform: translateY(0px);
            }
            50% {
              transform: translateY(-6px);
            }
          }
          
          @keyframes bounce-slow {
            0%,
            100% {
              transform: translateY(0);
            }
            50% {
              transform: translateY(-3px);
            }
          }
        }

        .animate-pulse-slow {
          animation: pulse-slow 4s ease-in-out infinite;
        }

        .animate-pulse-slower {
          animation: pulse-slower 6s ease-in-out infinite;
        }

        .animate-pulse-glow {
          animation: pulse-glow 2s ease-in-out infinite;
        }

        .animate-bounce-slow {
          animation: bounce-slow 2s ease-in-out infinite;
        }

        .animate-gradient {
          background-size: 200% 200%;
          animation: gradient 3s ease infinite;
        }

        .delay-150 {
          animation-delay: 150ms;
        }
      `}</style>
    </section>
  );
};

export default Hero;