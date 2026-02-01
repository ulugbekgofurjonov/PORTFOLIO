import React, { useState } from 'react';
import { Code2, Sparkles } from 'lucide-react';
import { skills } from '../../data/skills';
import FadeIn from '../animations/FadeIn';
import RadialGradientBackground from '../backgrounds/RadialGradientBackground';

const Skills = () => {
  const [hoveredSkill, setHoveredSkill] = useState(null);

  return (
    <section id='skills' className="relative min-h-screen py-20 sm:py-24 lg:py-32 overflow-hidden bg-gradient-to-b from-black via-gray-900 to-black">
      <RadialGradientBackground variant="skills" />
      
      <div className="container relative z-10 mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <FadeIn delay={0}>
          <div className="text-center mb-16 sm:mb-20">
            <div className="inline-flex items-center gap-2 px-5 py-2.5 mb-6 backdrop-blur-xl bg-white/5 border border-white/10 rounded-full">
              <Code2 className="w-4 h-4 text-blue-400" />
              <span className="text-sm text-white/90 font-semibold tracking-wider uppercase">
                Ko'nikmalar
              </span>
              <Sparkles className="w-4 h-4 text-blue-400 animate-pulse" />
            </div>

            <h2 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-white mb-6">
              <span className="bg-gradient-to-r from-blue-400 via-cyan-400 to-sky-400 bg-clip-text text-transparent">
                Texnologiyalar
              </span>
            </h2>

            <p className="text-lg sm:text-xl text-gray-400 max-w-2xl mx-auto">
              Men ishlatiladigan zamonaviy veb-texnologiyalar va vositalar
            </p>
          </div>
        </FadeIn>

        {/* Skills Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8 max-w-6xl mx-auto">
          {skills && skills.length > 0 ? (
            skills.map((skill, index) => {
              const Icon = skill.icon;
              const isHovered = hoveredSkill === index;
              
              return (
                <FadeIn key={skill.id} delay={100 + index * 50}>
                  <div 
                    onMouseEnter={() => setHoveredSkill(index)}
                    onMouseLeave={() => setHoveredSkill(null)}
                    className="group relative h-full"
                    style={{
                      animation: `float ${3 + index * 0.2}s ease-in-out infinite`,
                      animationDelay: `${index * 0.1}s`,
                    }}
                  >
                    {/* Glow effect on hover */}
                    {skill.color && (
                      <div 
                        className="absolute -inset-[1px] rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 blur-md -z-10"
                        style={{
                          background: `linear-gradient(135deg, ${skill.color}40, ${skill.color}20)`
                        }}
                      />
                    )}
                    
                    {/* Card */}
                    <div className="relative backdrop-blur-xl bg-white/5 border border-white/10 rounded-2xl p-8 hover:bg-white/10 hover:border-blue-400/30 transition-all duration-500 hover:scale-105 hover:-translate-y-2 h-full flex flex-col">
                      
                      {/* Icon Container */}
                      <div className="mb-6">
                        <div className="relative">
                          {/* Icon glow */}
                          {skill.color && (
                            <div 
                              className="absolute inset-0 blur-xl opacity-0 group-hover:opacity-60 transition-opacity duration-500"
                              style={{ backgroundColor: skill.color }}
                            />
                          )}
                          
                          {/* Icon */}
                          <div className="relative w-16 h-16 flex items-center justify-center">
                            {Icon && (
                              <Icon 
                                className="w-full h-full group-hover:scale-110 transition-transform duration-500" 
                                style={{ color: skill.color || '#3B82F6' }}
                              />
                            )}
                          </div>
                        </div>
                      </div>

                      {/* Content */}
                      <div className="flex-1 flex flex-col">
                        {/* Skill Name */}
                        <h3 className="text-2xl font-bold text-white mb-4 group-hover:text-blue-400 transition-colors">
                          {skill.name}
                        </h3>
                        
                        {/* Experience */}
                        {skill.experience && (
                          <div className="flex items-center gap-2 mt-auto">
                            <div className="flex-1 h-2 bg-white/5 rounded-full overflow-hidden">
                              <div 
                                className="h-full bg-gradient-to-r from-blue-500 to-cyan-500 rounded-full transition-all duration-1000"
                                style={{ 
                                  width: isHovered ? '100%' : '70%'
                                }}
                              />
                            </div>
                            <span className="text-xs text-gray-500 font-semibold min-w-[3rem] text-right">
                              {skill.experience}
                            </span>
                          </div>
                        )}
                      </div>

                      {/* Corner accent */}
                      {skill.color && (
                        <div 
                          className="absolute top-3 right-3 w-2 h-2 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-500 animate-pulse"
                          style={{ backgroundColor: skill.color }}
                        />
                      )}
                    </div>
                  </div>
                </FadeIn>
              );
            })
          ) : (
            <div className="col-span-full text-center text-gray-400">
              <p>Ko'nikmalar yuklanmoqda...</p>
            </div>
          )}
        </div>

        {/* Bottom Info */}
        <FadeIn delay={500}>
          <div className="mt-16 text-center">
            <div className="inline-block backdrop-blur-xl bg-white/5 border border-white/10 rounded-xl px-6 py-4">
              <p className="text-gray-400">
                <span className="text-blue-400 font-semibold">Doimiy o'rganish</span>{" "}
                jarayonida - har kuni yangi texnologiyalarni o'rganmoqdaman!
              </p>
            </div>
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
      `}</style>
    </section>
  );
};

export default Skills;