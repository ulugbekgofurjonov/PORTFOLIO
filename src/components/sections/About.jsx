import React, { useState } from "react";
import {
  User,
  MapPin,
  Mail,
  Briefcase,
  GraduationCap,
  Code,
  Lightbulb,
  Target,
  Award,
  Phone,
  Copy,
  Check,
} from "lucide-react";
import { PERSONAL_INFO } from "../../utils/constants";
import FadeIn from "../animations/FadeIn";
import RadialGradientBackground from "../backgrounds/RadialGradientBackground";

const About = () => {
  const [copiedPhone, setCopiedPhone] = useState(false);

  // Professional journey
  const journey = [
    {
      year: "2025",
      title: "Frontend Development ni Boshlash",
      description:
        "Web development dunyosiga qiziqish paydo bo'ldi va HTML, CSS, JavaScript o'rganishni boshladim",
    },
    {
      year: "2026",
      title: "React.js ga O'tish",
      description:
        "React.js frameworkini o'rganib, zamonaviy SPA (Single Page Application) yaratishni boshladim",
    },
    {
      year: "2026",
      title: "Next.js va Professional Rivojlanish",
      description:
        "Next.js orqali SSR va SEO-friendly ilovalar yaratishni o'rgandim. Hozir 10+ loyihaga ega",
    },
  ];

  // Core values
  const values = [
    {
      icon: Code,
      title: "Clean Code",
      description:
        "Har doim o'qilishi oson, tushunarli va maintainable kod yozishga harakat qilaman",
      color: "from-blue-500 to-cyan-500",
    },
    {
      icon: Lightbulb,
      title: "Doimiy O'rganish",
      description:
        "Texnologiyalar tez rivojlanadi, shuning uchun har kuni yangi narsalarni o'rganishga intilaman",
      color: "from-cyan-500 to-sky-500",
    },
    {
      icon: Target,
      title: "User Experience",
      description:
        "Foydalanuvchi tajribasi birinchi o'rinda. Har bir loyihada UX/UI ga katta e'tibor beraman",
      color: "from-sky-500 to-blue-500",
    },
    {
      icon: Award,
      title: "Sifat va Standartlar",
      description:
        "Best practices, responsive design va web standartlariga doim rioya qilaman",
      color: "from-purple-500 to-blue-500",
    },
  ];

  // What I do
  const expertise = [
    {
      title: "Frontend Development",
      description:
        "React.js va Next.js yordamida zamonaviy, tez va responsive veb-ilovalar yarataman",
      skills: ["React.js", "Next.js", "JavaScript ES6+"],
    },
    {
      title: "UI/UX Implementation",
      description:
        "Dizayndan kodga - pixel-perfect interfeys va ajoyib foydalanuvchi tajribasi",
      skills: ["Tailwind CSS", "Responsive Design", "Animations"],
    },
    {
      title: "Performance Optimization",
      description:
        "Veb-saytlarni tezlashtirish, SEO optimizatsiya va eng yaxshi amaliyotlarni qo'llash",
      skills: ["SEO", "Core Web Vitals", "Code Splitting"],
    },
  ];

  const handleCopyPhone = async () => {
    try {
      await navigator.clipboard.writeText(PERSONAL_INFO.phone);
      setCopiedPhone(true);
      setTimeout(() => setCopiedPhone(false), 2000);
    } catch (error) {
      console.error("Failed to copy:", error);
    }
  };

  return (
    <section
      id="about"
      className="relative min-h-screen py-16 sm:py-20 lg:py-24 overflow-hidden"
    >
      <RadialGradientBackground />
      
      <div className="container relative z-10 mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl">
        {/* Header */}
        <FadeIn delay={0}>
          <div className="text-center mb-12 sm:mb-16 lg:mb-20">
            <div className="inline-flex items-center gap-2 sm:gap-2.5 px-4 sm:px-5 py-2 sm:py-2.5 mb-5 sm:mb-6 backdrop-blur-2xl bg-white/5 border border-white/10 rounded-full shadow-xl hover:bg-white/10 hover:border-blue-400/30 transition-all duration-500 group">
              <User className="w-4 h-4 text-blue-400 group-hover:scale-110 transition-transform duration-300" />
              <span className="text-xs sm:text-sm text-white/90 font-semibold tracking-wider uppercase">
                Men Haqimda
              </span>
            </div>

            <h2 className="text-3xl sm:text-4xl lg:text-5xl xl:text-6xl font-bold text-white mb-4 sm:mb-6 px-4">
              Salom, Men{" "}
              <span className="bg-gradient-to-r from-blue-400 via-cyan-400 to-sky-400 bg-clip-text text-transparent">
                {PERSONAL_INFO.name}
              </span>
            </h2>

            <p className="text-base sm:text-lg lg:text-xl xl:text-2xl text-gray-300 max-w-3xl mx-auto font-medium px-4">
              {PERSONAL_INFO.title}
            </p>
          </div>
        </FadeIn>

        {/* Main Content Grid */}
        <div className="grid lg:grid-cols-2 gap-6 sm:gap-8 lg:gap-12 xl:gap-16 mb-12 sm:mb-16 lg:mb-20">
          {/* Left Column - Bio & Contact */}
          <div className="space-y-6 sm:space-y-8">
            {/* Bio Card */}
            <FadeIn delay={100}>
              <div className="backdrop-blur-2xl bg-gradient-to-br from-white/5 via-white/8 to-white/5 border border-white/10 rounded-xl sm:rounded-2xl p-6 sm:p-8 hover:bg-white/10 hover:border-blue-400/30 transition-all duration-500 group relative overflow-hidden">
                {/* Shimmer effect */}
                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/5 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1500" />
                
                <div className="flex items-center gap-3 mb-5 sm:mb-6 relative z-10">
                  <div className="p-2 sm:p-2.5 bg-blue-500/20 rounded-lg sm:rounded-xl group-hover:bg-blue-500/30 transition-colors duration-300">
                    <Briefcase className="w-5 h-5 sm:w-6 sm:h-6 text-blue-400" />
                  </div>
                  <h3 className="text-xl sm:text-2xl font-bold text-white">
                    Mening Hikoyam
                  </h3>
                </div>

                <div className="space-y-3 sm:space-y-4 text-gray-300 leading-relaxed relative z-10">
                  {PERSONAL_INFO.bio.map((paragraph, index) => (
                    <p key={index} className="text-sm sm:text-base">
                      {paragraph}
                    </p>
                  ))}
                </div>
                
                {/* Corner accent */}
                <div className="absolute top-0 right-0 w-24 h-24 bg-blue-500/10 blur-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
              </div>
            </FadeIn>

            {/* Contact Info Card */}
            <FadeIn delay={150}>
              <div className="backdrop-blur-2xl bg-gradient-to-br from-white/5 via-white/8 to-white/5 border border-white/10 rounded-xl sm:rounded-2xl p-6 sm:p-8 hover:bg-white/10 hover:border-blue-400/30 transition-all duration-500 group relative overflow-hidden">
                {/* Shimmer effect */}
                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/5 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1500" />
                
                <div className="flex items-center gap-3 mb-5 sm:mb-6 relative z-10">
                  <div className="p-2 sm:p-2.5 bg-cyan-500/20 rounded-lg sm:rounded-xl group-hover:bg-cyan-500/30 transition-colors duration-300">
                    <Mail className="w-5 h-5 sm:w-6 sm:h-6 text-cyan-400" />
                  </div>
                  <h3 className="text-xl sm:text-2xl font-bold text-white">Bog'lanish</h3>
                </div>

                <div className="space-y-4 sm:space-y-5 relative z-10">
                  {/* Email */}
                  <div className="flex items-start gap-3 sm:gap-4 group/item">
                    <div className="p-2 bg-blue-500/10 rounded-lg mt-0.5 sm:mt-1 group-hover/item:bg-blue-500/20 transition-colors duration-300">
                      <Mail className="w-4 h-4 sm:w-5 sm:h-5 text-blue-400" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-xs sm:text-sm text-gray-400 mb-1">Email</p>
                      <a
                        href={`mailto:${PERSONAL_INFO.email}`}
                        className="text-sm sm:text-base text-white hover:text-blue-400 transition-colors font-medium break-all"
                      >
                        {PERSONAL_INFO.email}
                      </a>
                    </div>
                  </div>

                  {/* Phone */}
                  <div className="flex items-start gap-3 sm:gap-4 group/item">
                    <div className="p-2 bg-blue-500/10 rounded-lg mt-0.5 sm:mt-1 group-hover/item:bg-blue-500/20 transition-colors duration-300">
                      <Phone className="w-4 h-4 sm:w-5 sm:h-5 text-blue-400" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-xs sm:text-sm text-gray-400 mb-1">
                        Telefon raqam
                      </p>
                      <div className="flex items-center gap-2">
                        <a
                          href={`tel:${PERSONAL_INFO.phone}`}
                          className="text-sm sm:text-base text-white hover:text-blue-400 transition-colors font-medium"
                        >
                          {PERSONAL_INFO.phone}
                        </a>
                        <button
                          onClick={handleCopyPhone}
                          className="p-1.5 hover:bg-blue-500/10 rounded-lg transition-all duration-300 group/copy relative"
                          title="Nusxalash"
                          aria-label="Copy phone number"
                        >
                          {copiedPhone ? (
                            <Check className="w-4 h-4 text-green-400" />
                          ) : (
                            <Copy className="w-4 h-4 text-gray-400 group-hover/copy:text-blue-400 transition-colors" />
                          )}
                        </button>
                      </div>
                    </div>
                  </div>

                  {/* Location */}
                  <div className="flex items-start gap-3 sm:gap-4 group/item">
                    <div className="p-2 bg-cyan-500/10 rounded-lg mt-0.5 sm:mt-1 group-hover/item:bg-cyan-500/20 transition-colors duration-300">
                      <MapPin className="w-4 h-4 sm:w-5 sm:h-5 text-cyan-400" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-xs sm:text-sm text-gray-400 mb-1">Joylashuv</p>
                      <p className="text-sm sm:text-base text-white font-medium">
                        {PERSONAL_INFO.location}
                      </p>
                    </div>
                  </div>
                </div>
                
                {/* Corner accent */}
                <div className="absolute bottom-0 left-0 w-24 h-24 bg-cyan-500/10 blur-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
              </div>
            </FadeIn>
          </div>

          {/* Right Column - Journey */}
          <div className="space-y-6 sm:space-y-8">
            {/* Journey Timeline */}
            <FadeIn delay={200}>
              <div>
                <div className="flex items-center gap-3 mb-5 sm:mb-6">
                  <div className="p-2 sm:p-2.5 bg-purple-500/20 rounded-lg sm:rounded-xl">
                    <GraduationCap className="w-5 h-5 sm:w-6 sm:h-6 text-purple-400" />
                  </div>
                  <h3 className="text-xl sm:text-2xl font-bold text-white">
                    Mening Yo'lim
                  </h3>
                </div>

                <div className="space-y-4 sm:space-y-6">
                  {journey.map((step, index) => (
                    <div
                      key={index}
                      className="relative backdrop-blur-2xl bg-gradient-to-br from-white/5 via-white/8 to-white/5 border border-white/10 rounded-xl p-5 sm:p-6 hover:bg-white/10 hover:border-blue-400/30 transition-all duration-500 group overflow-hidden"
                    >
                      {/* Shimmer effect */}
                      <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/5 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1500" />
                      
                      <div className="flex gap-3 sm:gap-4 relative z-10">
                        <div className="flex-shrink-0">
                          <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-full bg-gradient-to-br from-blue-500 to-cyan-500 flex items-center justify-center text-white font-bold text-sm sm:text-base shadow-lg group-hover:scale-110 transition-transform duration-300">
                            {index + 1}
                          </div>
                        </div>
                        <div className="flex-1 min-w-0">
                          <div className="flex items-center gap-2 mb-1.5 sm:mb-2">
                            <span className="text-sm sm:text-base text-blue-400 font-semibold">
                              {step.year}
                            </span>
                          </div>
                          <h4 className="text-base sm:text-lg font-bold text-white mb-1.5 sm:mb-2">
                            {step.title}
                          </h4>
                          <p className="text-xs sm:text-sm text-gray-400 leading-relaxed">
                            {step.description}
                          </p>
                        </div>
                      </div>

                      {/* Connection line */}
                      {index < journey.length - 1 && (
                        <div className="absolute left-[2.25rem] sm:left-[2.75rem] top-[4.5rem] sm:top-[5rem] w-[2px] h-4 sm:h-6 bg-gradient-to-b from-blue-400/50 to-transparent" />
                      )}
                      
                      {/* Corner glow */}
                      <div className="absolute top-0 right-0 w-20 h-20 bg-blue-500/10 blur-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                    </div>
                  ))}
                </div>
              </div>
            </FadeIn>
          </div>
        </div>

        {/* Values Section */}
        <FadeIn delay={250}>
          <div className="mb-12 sm:mb-16 lg:mb-20">
            <div className="text-center mb-8 sm:mb-12">
              <h3 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-white mb-3 sm:mb-4 px-4">
                Qadriyatlarim
              </h3>
              <p className="text-sm sm:text-base text-gray-400 max-w-2xl mx-auto px-4">
                Men ishlash jarayonimda quyidagi printsiplarga amal qilaman
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-5 lg:gap-6">
              {values.map((value, index) => {
                const Icon = value.icon;
                return (
                  <div
                    key={index}
                    className="backdrop-blur-2xl bg-gradient-to-br from-white/5 via-white/8 to-white/5 border border-white/10 rounded-xl sm:rounded-2xl p-5 sm:p-6 hover:bg-white/10 hover:border-blue-400/30 transition-all duration-500 hover:-translate-y-2 group relative overflow-hidden"
                  >
                    {/* Shimmer effect */}
                    <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/5 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1500" />
                    
                    <div
                      className={`w-11 h-11 sm:w-12 sm:h-12 rounded-lg sm:rounded-xl bg-gradient-to-br ${value.color} flex items-center justify-center mb-3 sm:mb-4 group-hover:scale-110 transition-transform duration-300 shadow-lg relative z-10`}
                    >
                      <Icon className="w-5 h-5 sm:w-6 sm:h-6 text-white" />
                    </div>
                    <h4 className="text-base sm:text-lg font-bold text-white mb-2 relative z-10">
                      {value.title}
                    </h4>
                    <p className="text-xs sm:text-sm text-gray-400 leading-relaxed relative z-10">
                      {value.description}
                    </p>
                    
                    {/* Glow effect */}
                    <div className="absolute -inset-px rounded-xl sm:rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 blur-sm bg-gradient-to-br from-blue-500/20 to-cyan-500/20" />
                  </div>
                );
              })}
            </div>
          </div>
        </FadeIn>

        {/* What I Do Section */}
        <FadeIn delay={300}>
          <div>
            <div className="text-center mb-8 sm:mb-12">
              <h3 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-white mb-3 sm:mb-4 px-4">
                Nima Qilaman
              </h3>
              <p className="text-sm sm:text-base text-gray-400 max-w-2xl mx-auto px-4">
                Mening asosiy yo'nalishlarim va tajribalarim
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 sm:gap-6 lg:gap-8">
              {expertise.map((item, index) => (
                <div
                  key={index}
                  className="backdrop-blur-2xl bg-gradient-to-br from-white/5 via-white/8 to-white/5 border border-white/10 rounded-xl sm:rounded-2xl p-6 sm:p-8 hover:bg-white/10 hover:border-blue-400/30 transition-all duration-500 hover:scale-105 group relative overflow-hidden"
                >
                  {/* Shimmer effect */}
                  <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/5 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1500" />
                  
                  <h4 className="text-lg sm:text-xl font-bold text-white mb-2 sm:mb-3 group-hover:text-blue-400 transition-colors relative z-10">
                    {item.title}
                  </h4>
                  <p className="text-sm sm:text-base text-gray-400 mb-5 sm:mb-6 leading-relaxed relative z-10">
                    {item.description}
                  </p>
                  <div className="flex flex-wrap gap-2 relative z-10">
                    {item.skills.map((skill, idx) => (
                      <span
                        key={idx}
                        className="px-2.5 sm:px-3 py-1 sm:py-1.5 text-xs font-semibold bg-blue-500/10 text-blue-400 border border-blue-500/20 rounded-full hover:bg-blue-500/20 hover:border-blue-500/30 transition-all duration-300"
                      >
                        {skill}
                      </span>
                    ))}
                  </div>
                  
                  {/* Corner glow */}
                  <div className="absolute bottom-0 right-0 w-24 h-24 bg-blue-500/10 blur-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                </div>
              ))}
            </div>
          </div>
        </FadeIn>
      </div>
    </section>
  );
};

export default About;