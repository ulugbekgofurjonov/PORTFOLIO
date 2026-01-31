import React, { useState } from 'react';
import { Download, Code2, Sparkles, Award, Target, Zap, TrendingUp } from 'lucide-react';
import { SiReact, SiNextdotjs, SiJavascript, SiHtml5, SiCss3, SiTailwindcss } from 'react-icons/si';
import { PERSONAL_INFO, ABOUT_STATS } from '../../utils/constants';
import FadeIn from '../animations/FadeIn';
import RadialGradientBackground from '../backgrounds/RadialGradientBackground';

const About = () => {
  const [isDownloading, setIsDownloading] = useState(false);
  const [hoveredSkill, setHoveredSkill] = useState(null);

  // Resume yuklab olish funksiyasi
  const handleDownloadResume = () => {
    setIsDownloading(true);
    
    const link = document.createElement('a');
    link.href = '/resume.pdf';
    link.download = 'Ulugbek_Gofurjonov_Resume.pdf';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    
    setTimeout(() => setIsDownloading(false), 1500);
  };
  
  // Skills
  const skills = [
    { name: 'HTML', icon: SiHtml5, color: '#E34F26', category: 'Frontend' },
    { name: 'CSS', icon: SiCss3, color: '#1572B6', category: 'Frontend' },
    { name: 'JavaScript', icon: SiJavascript, color: '#F7DF1E', category: 'Programming' },
    { name: 'React.js', icon: SiReact, color: '#61DAFB', category: 'Framework' },
    { name: 'Next.js', icon: SiNextdotjs, color: '#FFFFFF', category: 'Framework' },
    { name: 'Tailwind CSS', icon: SiTailwindcss, color: '#06B6D4', category: 'Styling' },
  ];

  // Stat icons
  const statIcons = {
    0: Award,
    1: Target,
    2: TrendingUp,
  };

  return (
    <section id='about' className="relative min-h-screen py-20 sm:py-24 lg:py-32 overflow-hidden">
      <RadialGradientBackground variant="about" />
      
      <div className="container relative z-10 mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header Section */}
        <FadeIn delay={0}>
          <div className="text-center mb-16 sm:mb-20">
            {/* Premium Badge */}
            <div className="inline-flex items-center gap-2 px-5 py-2.5 mb-6 backdrop-blur-xl bg-white/5 border border-white/10 rounded-full shadow-2xl">
              <Sparkles className="w-4 h-4 text-primary animate-pulse" />
              <span className="text-sm text-white/90 font-semibold tracking-wider uppercase">
                Men Haqimda
              </span>
              <Code2 className="w-4 h-4 text-primary/70" />
            </div>

            {/* Main Title */}
            <h2 
              className="text-4xl sm:text-5xl lg:text-6xl font-bold text-white mb-6 leading-tight"
              style={{ fontFamily: "var(--font-display), sans-serif" }}
            >
              <span className="bg-gradient-to-r from-white via-primary to-purple-400 bg-clip-text text-transparent">
                <span className="block sm:inline">Frontend</span>
                <span className="hidden sm:inline"> </span>
                <span className="block sm:inline">Dasturchi</span>
              </span>
            </h2>

            {/* Bio */}
            <div className="max-w-3xl mx-auto">
              <div className="backdrop-blur-md bg-white/5 border border-white/10 rounded-2xl p-6 sm:p-8 shadow-2xl">
                <p 
                  className="text-base sm:text-lg text-white/90 leading-relaxed font-semibold mb-4"
                  style={{ fontFamily: "var(--font-body), sans-serif" }}
                >
                  Frontend Developer | React.js & Next.js | 10+ Proyekt
                </p>
                <p 
                  className="text-base sm:text-lg text-white/70 leading-relaxed"
                  style={{ fontFamily: "var(--font-body), sans-serif" }}
                >
                  {PERSONAL_INFO.bio}
                </p>
              </div>
            </div>
          </div>
        </FadeIn>

        {/* Skills Section */}
        <FadeIn delay={100}>
          <div id='skills' className="mb-16 sm:mb-24">
            {/* Section Header */}
            <div className="text-center mb-12">
              <h3 
                className="text-3xl sm:text-4xl font-bold text-white mb-4"
                style={{ fontFamily: "var(--font-display), sans-serif" }}
              >
                Texnologiyalar
              </h3>
              <div className="w-24 h-1 bg-gradient-to-r from-transparent via-primary to-transparent mx-auto rounded-full" />
            </div>

            {/* Skills Grid */}
            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4 sm:gap-6">
              {skills.map((skill, index) => {
                const Icon = skill.icon;
                
                return (
                  <div 
                    key={index}
                    onMouseEnter={() => setHoveredSkill(index)}
                    onMouseLeave={() => setHoveredSkill(null)}
                    className="group relative"
                    style={{
                      animation: `float ${3 + index * 0.2}s ease-in-out infinite`,
                      animationDelay: `${index * 0.1}s`,
                    }}
                  >
                    {/* Glow effect on hover */}
                    <div className="absolute -inset-[1px] bg-gradient-to-r from-primary/0 via-primary/50 to-primary/0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 blur-md -z-10" />
                    
                    {/* Card */}
                    <div className="relative backdrop-blur-xl bg-white/5 border border-white/10 rounded-2xl p-6 sm:p-8 hover:bg-white/10 hover:border-primary/30 transition-all duration-500 hover:scale-105 hover:-translate-y-2 h-full">
                      {/* Icon Container */}
                      <div className="flex flex-col items-center gap-4">
                        <div className="relative">
                          {/* Icon glow */}
                          <div 
                            className="absolute inset-0 blur-xl opacity-0 group-hover:opacity-50 transition-opacity duration-500"
                            style={{ backgroundColor: skill.color }}
                          />
                          
                          {/* Icon */}
                          <Icon 
                            className="w-12 h-12 sm:w-14 sm:h-14 relative z-10 group-hover:scale-110 transition-transform duration-500" 
                            style={{ color: skill.color }}
                          />
                        </div>

                        {/* Skill Name */}
                        <span 
                          className="text-white/90 text-sm sm:text-base font-semibold text-center"
                          style={{ fontFamily: "var(--font-display), sans-serif" }}
                        >
                          {skill.name}
                        </span>

                        {/* Category Badge */}
                        <div className="opacity-0 group-hover:opacity-100 transition-opacity duration-500">
                          <span className="text-xs text-white/60 px-3 py-1 bg-white/5 rounded-full border border-white/10">
                            {skill.category}
                          </span>
                        </div>
                      </div>

                      {/* Corner accent */}
                      <div className="absolute top-2 right-2 w-2 h-2 bg-primary rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-500 animate-pulse" />
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </FadeIn>

        {/* Stats Section */}
        <FadeIn delay={200}>
          <div className="mb-16 sm:mb-24">
            {/* Section Header */}
            <div className="text-center mb-12">
              <h3 
                className="text-3xl sm:text-4xl font-bold text-white mb-4"
                style={{ fontFamily: "var(--font-display), sans-serif" }}
              >
                Natijalarim
              </h3>
              <div className="w-24 h-1 bg-gradient-to-r from-transparent via-primary to-transparent mx-auto rounded-full" />
            </div>

            {/* Stats Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 max-w-5xl mx-auto">
              {ABOUT_STATS.map((stat, index) => {
                const StatIcon = statIcons[index] || Award;
                
                return (
                  <div 
                    key={index}
                    className="group relative"
                    style={{
                      animation: `float ${3 + index * 0.3}s ease-in-out infinite`,
                      animationDelay: `${index * 0.15}s`,
                    }}
                  >
                    {/* Glow effect */}
                    <div className="absolute -inset-[1px] bg-gradient-to-r from-primary/0 via-primary/50 to-primary/0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 blur-sm -z-10" />
                    
                    {/* Card */}
                    <div className="relative backdrop-blur-xl bg-white/5 border border-white/10 rounded-2xl p-8 sm:p-10 text-center hover:bg-white/10 hover:border-primary/30 transition-all duration-500 hover:scale-105 hover:-translate-y-2">
                      {/* Icon */}
                      <div className="inline-flex items-center justify-center w-16 h-16 mb-6 rounded-full bg-gradient-to-r from-primary/20 to-purple-500/20 border border-primary/30 group-hover:border-primary group-hover:scale-110 transition-all duration-500">
                        <StatIcon className="w-8 h-8 text-primary group-hover:rotate-12 transition-transform duration-500" />
                      </div>

                      {/* Value */}
                      <div 
                        className="text-4xl sm:text-5xl font-black bg-gradient-to-r from-primary to-purple-400 bg-clip-text text-transparent mb-3"
                        style={{ 
                          fontFamily: "var(--font-display), sans-serif",
                          textShadow: '0 0 30px rgba(147, 51, 234, 0.5)',
                        }}
                      >
                        {stat.value}
                      </div>

                      {/* Label */}
                      <div 
                        className="text-white/80 text-base sm:text-lg font-semibold"
                        style={{ fontFamily: "var(--font-body), sans-serif" }}
                      >
                        {stat.label}
                      </div>

                      {/* Bottom accent line */}
                      <div className="mt-6 h-1 w-0 group-hover:w-full bg-gradient-to-r from-primary to-purple-400 rounded-full transition-all duration-500 mx-auto" />
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </FadeIn>

        {/* CTA Button */}
        <FadeIn delay={300}>
          <div className="text-center">
            <button 
              onClick={handleDownloadResume}
              disabled={isDownloading}
              className="group relative inline-block"
            >
              {/* Outer glow */}
              <div className="absolute -inset-2 bg-gradient-to-r from-primary via-purple-500 to-primary rounded-[24px] blur-xl opacity-60 group-hover:opacity-100 transition-opacity duration-500 animate-pulse-glow" />
              
              {/* Button */}
              <div 
                className="relative z-10 bg-gradient-to-r from-primary to-purple-600 hover:from-primary/90 hover:to-purple-700 text-white rounded-[20px] px-10 sm:px-12 py-4 sm:py-5 text-base sm:text-lg font-bold border-2 border-white/20 hover:border-white/40 hover:scale-105 active:scale-95 transition-all duration-300 shadow-2xl flex items-center gap-3 disabled:opacity-50 disabled:cursor-not-allowed"
                style={{ fontFamily: "var(--font-body), sans-serif" }}
              >
                {isDownloading ? (
                  <>
                    <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                    <span>Yuklanmoqda...</span>
                  </>
                ) : (
                  <>
                    <Download className="w-5 h-5 group-hover:animate-bounce" />
                    <span>Resume Yuklab Olish</span>
                    <Zap className="w-5 h-5 group-hover:rotate-12 transition-transform duration-500" />
                  </>
                )}
              </div>
            </button>

            {/* Helper text */}
            <p className="mt-6 text-white/60 text-sm" style={{ fontFamily: "var(--font-body), sans-serif" }}>
              PDF formatida yuklab oling
            </p>
          </div>
        </FadeIn>
      </div>

      {/* CSS Animations */}
      <style jsx>{`
        @keyframes float {
          0%, 100% {
            transform: translateY(0px);
          }
          50% {
            transform: translateY(-10px);
          }
        }

        @keyframes pulse-glow {
          0%, 100% {
            opacity: 0.6;
          }
          50% {
            opacity: 1;
          }
        }

        .animate-pulse-glow {
          animation: pulse-glow 2s ease-in-out infinite;
        }
      `}</style>
    </section>
  );
};

export default About;