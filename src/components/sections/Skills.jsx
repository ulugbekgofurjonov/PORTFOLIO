import React, { useState, useMemo, useCallback } from 'react';
import { Code2, Sparkles, Calendar } from 'lucide-react';
import { skills } from '../../data/skills';
import { useLanguage } from '../../contexts/LanguageContext';
import FadeIn from '../animations/FadeIn';

const Skills = () => {
  const { language } = useLanguage();
  const skillsList = useMemo(() => skills[language] || [], [language]);
  
  const [hoveredSkill, setHoveredSkill] = useState(null);

  // Calculate months from experience string
  const parseExperienceToMonths = useCallback((experienceStr) => {
    if (!experienceStr) return 3;
    
    const str = experienceStr.toLowerCase();
    if (str.includes('oy') || str.includes('month')) {
      const months = parseInt(str);
      return isNaN(months) ? 3 : months;
    } else if (str.includes('yil') || str.includes('year')) {
      const years = parseFloat(str);
      return isNaN(years) ? 12 : Math.round(years * 12);
    }
    return 3;
  }, []);

  // Memoized handlers
  const handleMouseEnter = useCallback((index) => {
    setHoveredSkill(index);
  }, []);

  const handleMouseLeave = useCallback(() => {
    setHoveredSkill(null);
  }, []);

  // Get skill color based on type
  const getSkillColor = useCallback((skillName) => {
    const colorMap = {
      'HTML': '#E34F26',
      'CSS': '#1572B6',
      'JavaScript': '#F7DF1E',
      'React': '#61DAFB',
      'Next.js': '#000000',
      'Tailwind CSS': '#06B6D4',
      'GitHub': '#181717',
      'Default': '#3B82F6'
    };
    return colorMap[skillName] || colorMap.Default;
  }, []);

  return (
    <section 
      id='skills' 
      className="relative py-16 sm:py-20 md:py-24 lg:py-28 xl:py-32 overflow-hidden"
      aria-labelledby="skills-heading"
    >
      {/* Radial Gradient Background Only */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none" aria-hidden="true">
        <div className="absolute inset-0 bg-gradient-radial from-blue-500/5 via-transparent to-transparent" />
      </div>

      <div className="container relative z-10 mx-auto w-full max-w-[1400px] px-4 sm:px-6 md:px-8 lg:px-10 xl:px-12">
        
        {/* Header Section */}
        <FadeIn delay={0} threshold={0.1}>
          <header className="text-center mb-12 sm:mb-14 md:mb-16 lg:mb-20">
            {/* Badge */}
            <div className="inline-flex items-center gap-2 sm:gap-2.5 md:gap-3 px-4 sm:px-4.5 md:px-5 py-2 sm:py-2.5 mb-5 sm:mb-6 bg-white/5 backdrop-blur-sm border border-white/10 rounded-full">
              <Code2 className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-blue-400" aria-hidden="true" />
              <span className="text-xs sm:text-sm text-white/90 font-medium tracking-wider uppercase">
                {language === 'uz' ? "Ko'nikmalar" : 'Skills'}
              </span>
              <Sparkles className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-blue-400" aria-hidden="true" />
            </div>

            {/* Heading */}
            <h1 
              id="skills-heading"
              className="text-[28px] leading-tight sm:text-4xl sm:leading-tight md:text-5xl md:leading-tight lg:text-6xl lg:leading-tight font-bold text-white mb-4 sm:mb-5 md:mb-6 tracking-tight px-2 sm:px-4"
            >
              <span className="text-white block sm:inline">
                {language === 'uz' ? 'Ishlatadigan ' : 'Technologies '}
              </span>
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-cyan-400 block sm:inline">
                {language === 'uz' ? 'Texnologiyalarim' : 'I Use'}
              </span>
            </h1>

            {/* Description */}
            <p className="text-sm sm:text-base md:text-lg lg:text-xl text-gray-400 max-w-2xl mx-auto leading-relaxed px-4 sm:px-6">
              {language === 'uz' 
                ? "Veb-ishlab chiqishda qo'llanadigan zamonaviy texnologiyalar va ular bilan ishlash tajribam"
                : 'Modern technologies used in web development and my experience working with them'}
            </p>
          </header>
        </FadeIn>

        {/* Skills Stats */}
        <FadeIn delay={100}>
          <div className="grid grid-cols-3 gap-3 sm:gap-4 md:gap-5 mb-10 sm:mb-12 md:mb-14 lg:mb-16 max-w-4xl mx-auto">
            <div className="text-center p-3 sm:p-4 md:p-5 lg:p-6 bg-white/3 backdrop-blur-sm border border-white/10 rounded-xl sm:rounded-2xl">
              <div className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-1 sm:mb-2">
                {skillsList.length}
              </div>
              <div className="text-[10px] sm:text-xs md:text-sm text-gray-400 font-medium">
                {language === 'uz' ? 'Texnologiya' : 'Technologies'}
              </div>
            </div>
            <div className="text-center p-3 sm:p-4 md:p-5 lg:p-6 bg-white/3 backdrop-blur-sm border border-white/10 rounded-xl sm:rounded-2xl">
              <div className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-1 sm:mb-2">
                {Math.max(...skillsList.map(s => parseExperienceToMonths(s.experience))) / 12 >= 1 
                  ? `${(Math.max(...skillsList.map(s => parseExperienceToMonths(s.experience))) / 12).toFixed(1)}`
                  : `${Math.max(...skillsList.map(s => parseExperienceToMonths(s.experience)))}`
                }
              </div>
              <div className="text-[10px] sm:text-xs md:text-sm text-gray-400 font-medium leading-tight">
                {language === 'uz' ? "Eng ko'p tajriba" : 'Max Experience'}
              </div>
            </div>
            <div className="text-center p-3 sm:p-4 md:p-5 lg:p-6 bg-white/3 backdrop-blur-sm border border-white/10 rounded-xl sm:rounded-2xl">
              <div className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-1 sm:mb-2">
                100%
              </div>
              <div className="text-[10px] sm:text-xs md:text-sm text-gray-400 font-medium">
                {language === 'uz' ? "O'rganish istagi" : 'Learning Desire'}
              </div>
            </div>
          </div>
        </FadeIn>

        {/* Skills Grid */}
        {skillsList.length > 0 ? (
          <div className="grid grid-cols-1 min-[500px]:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 sm:gap-5 md:gap-6">
            {skillsList.map((skill, index) => {
              const months = parseExperienceToMonths(skill.experience);
              const skillColor = getSkillColor(skill.name);
              
              return (
                <SkillCard
                  key={skill.id}
                  skill={skill}
                  index={index}
                  months={months}
                  skillColor={skillColor}
                  isHovered={hoveredSkill === index}
                  onMouseEnter={() => handleMouseEnter(index)}
                  onMouseLeave={handleMouseLeave}
                  language={language}
                />
              );
            })}
          </div>
        ) : (
          <div 
            className="text-center py-12 sm:py-16 bg-white/5 border border-white/10 rounded-2xl"
            role="status"
            aria-live="polite"
          >
            <p className="text-base sm:text-lg text-gray-400">
              {language === 'uz' ? "Ko'nikmalar yuklanmoqda..." : 'Loading skills...'}
            </p>
          </div>
        )}

      </div>
    </section>
  );
};

// Optimized SkillCard component
const SkillCard = React.memo(({ skill, index, months, skillColor, isHovered, onMouseEnter, onMouseLeave, language }) => {
  const Icon = skill.icon;
  
  // Calculate proficiency percentage based on usage experience
  const calculateProficiency = (months) => {
    if (months <= 3) return 20;
    if (months <= 6) return 40;
    if (months <= 12) return 60;
    if (months <= 18) return 75;
    if (months <= 24) return 85;
    if (months <= 36) return 90;
    return 95;
  };
  
  const proficiency = calculateProficiency(months);
  
  // Determine color based on proficiency
  const getProficiencyColor = (percentage) => {
    if (percentage <= 30) return '#3B82F6';
    if (percentage <= 50) return '#60A5FA';
    if (percentage <= 70) return '#22D3EE';
    if (percentage <= 85) return '#06B6D4';
    return '#67E8F9';
  };
  
  const proficiencyColor = getProficiencyColor(proficiency);

  return (
    <FadeIn delay={100 + (index % 4) * 50}>
      <article 
        onMouseEnter={onMouseEnter}
        onMouseLeave={onMouseLeave}
        className="group relative bg-gradient-to-br from-white/5 to-white/3 border border-white/10 rounded-xl sm:rounded-2xl p-4 sm:p-5 md:p-6 transition-colors duration-200 hover:bg-white/8 hover:border-white/15 h-full"
        role="article"
        aria-labelledby={`skill-${skill.id}-title`}
      >
        {/* Content */}
        <div className="relative flex flex-col h-full">
          {/* Icon and Name Row */}
          <div className="flex items-start gap-3 sm:gap-3.5 md:gap-4 mb-4 sm:mb-4 md:mb-5">
            {/* Icon Container */}
            <div className="relative flex-shrink-0">
              <div 
                className="relative w-11 h-11 sm:w-12 sm:h-12 md:w-14 md:h-14 flex items-center justify-center rounded-lg sm:rounded-xl bg-white/5 border border-white/10"
              >
                {Icon && (
                  <Icon 
                    className="w-5 h-5 sm:w-6 sm:h-6 md:w-7 md:h-7"
                    style={{ color: skillColor }}
                    aria-hidden="true"
                  />
                )}
              </div>
            </div>
            
            {/* Text Content */}
            <div className="flex-1 min-w-0 pt-0.5">
              <h3 
                id={`skill-${skill.id}-title`}
                className="text-base sm:text-lg md:text-xl font-bold text-white mb-1 sm:mb-1.5 leading-tight break-words"
              >
                {skill.name}
              </h3>
              
              {/* Experience Badge */}
              <div className="flex items-center gap-1.5 sm:gap-2">
                <Calendar className="w-3 h-3 sm:w-3.5 sm:h-3.5 text-gray-500 flex-shrink-0" aria-hidden="true" />
                <span className="text-xs sm:text-sm font-medium text-gray-400 truncate">
                  {skill.experience}
                </span>
              </div>
            </div>
          </div>

          {/* Description - Hidden on small screens */}
          {skill.description && (
            <p className="hidden sm:block text-xs sm:text-sm text-gray-400 mb-4 sm:mb-5 leading-relaxed line-clamp-2">
              {skill.description}
            </p>
          )}

          {/* Experience Progress Bar */}
          <div className="mt-auto pt-4 sm:pt-4 md:pt-5 border-t border-white/10">
            {/* Label and Percentage */}
            <div className="flex items-center justify-between mb-2 sm:mb-2.5 md:mb-3">
              <span className="text-[10px] sm:text-xs font-medium text-gray-500 uppercase tracking-wider">
                {language === 'uz' ? 'Tajriba' : 'Experience'}
              </span>
              <span 
                className="text-xs sm:text-sm font-bold tabular-nums"
                style={{ color: proficiencyColor }}
              >
                {proficiency}%
              </span>
            </div>
            
            {/* Progress Bar Container */}
            <div className="relative">
              {/* Base Track */}
              <div className="w-full h-2 sm:h-2.5 bg-white/5 rounded-full overflow-hidden">
                {/* Progress Fill */}
                <div 
                  className="h-full rounded-full transition-all duration-700 ease-out"
                  style={{ 
                    width: `${proficiency}%`,
                    backgroundColor: proficiencyColor
                  }}
                  role="progressbar"
                  aria-valuenow={proficiency}
                  aria-valuemin="0"
                  aria-valuemax="100"
                  aria-label={`${skill.name} ${language === 'uz' ? 'foydalanish darajasi' : 'proficiency level'}: ${proficiency}%`}
                />
              </div>
              
              {/* Markers - Only on larger screens */}
              <div className="hidden lg:flex justify-between mt-2 px-0.5">
                {[0, 20, 40, 60, 80, 100].map((marker) => (
                  <div 
                    key={marker}
                    className="relative flex flex-col items-center"
                    aria-hidden="true"
                  >
                    <div className="w-px h-1.5 bg-white/10"></div>
                    <span className="text-[9px] text-gray-600 mt-0.5 tabular-nums">{marker}%</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </article>
    </FadeIn>
  );
});

SkillCard.displayName = 'SkillCard';

export default Skills;