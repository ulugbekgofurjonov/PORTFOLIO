import React from "react";
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
} from "lucide-react";
import { PERSONAL_INFO } from "../../utils/constants";
import FadeIn from "../animations/FadeIn";
import RadialGradientBackground from "../backgrounds/RadialGradientBackground";

const About = () => {
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

  return (
    <section
      id="about"
      className="relative min-h-screen py-20 sm:py-24 lg:py-32 overflow-hidden"
    >

      <div className="container relative z-10 mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <FadeIn delay={0}>
          <div className="text-center mb-20">
            <div className="inline-flex items-center gap-2 px-5 py-2.5 mb-6 backdrop-blur-xl bg-white/5 border border-white/10 rounded-full">
              <User className="w-4 h-4 text-blue-400" />
              <span className="text-sm text-white/90 font-semibold tracking-wider uppercase">
                Men Haqimda
              </span>
            </div>

            <h2 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-white mb-6">
              Salom, Men{" "}
              <span className="bg-gradient-to-r from-blue-400 via-cyan-400 to-sky-400 bg-clip-text text-transparent">
                {PERSONAL_INFO.name}
              </span>
            </h2>

            <p className="text-xl sm:text-2xl text-gray-300 max-w-3xl mx-auto font-medium">
              {PERSONAL_INFO.title}
            </p>
          </div>
        </FadeIn>

        {/* Main Content Grid */}
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 mb-20">
          {/* Left Column - Bio & Contact */}
          <div className="space-y-8">
            {/* Bio Card */}
            <FadeIn delay={100}>
              <div className="backdrop-blur-xl bg-white/5 border border-white/10 rounded-2xl p-8 hover:bg-white/10 hover:border-blue-400/30 transition-all duration-500">
                <div className="flex items-center gap-3 mb-6">
                  <div className="p-2 bg-blue-500/20 rounded-lg">
                    <Briefcase className="w-6 h-6 text-blue-400" />
                  </div>
                  <h3 className="text-2xl font-bold text-white">
                    Mening Hikoyam
                  </h3>
                </div>

                <div className="space-y-4 text-gray-300 leading-relaxed">
                  {PERSONAL_INFO.bio.map((paragraph, index) => (
                    <p key={index} className="text-base">
                      {paragraph}
                    </p>
                  ))}
                </div>
              </div>
            </FadeIn>

            {/* Contact Info Card */}
            <FadeIn delay={150}>
              <div className="backdrop-blur-xl bg-white/5 border border-white/10 rounded-2xl p-8 hover:bg-white/10 hover:border-blue-400/30 transition-all duration-500">
                <div className="flex items-center gap-3 mb-6">
                  <div className="p-2 bg-cyan-500/20 rounded-lg">
                    <Mail className="w-6 h-6 text-cyan-400" />
                  </div>
                  <h3 className="text-2xl font-bold text-white">Bog'lanish</h3>
                </div>

                <div className="space-y-4">
                  <div className="flex items-start gap-4">
                    <div className="p-2 bg-blue-500/10 rounded-lg mt-1">
                      <Mail className="w-5 h-5 text-blue-400" />
                    </div>
                    <div>
                      <p className="text-sm text-gray-400 mb-1">Email</p>
                      <a
                        href={`mailto:${PERSONAL_INFO.email}`}
                        className="text-white hover:text-blue-400 transition-colors font-medium"
                      >
                        {PERSONAL_INFO.email}
                      </a>
                    </div>
                  </div>
                  <div className="flex items-start gap-4">
                    <div className="p-2 bg-blue-500/10 rounded-lg mt-1">
                      <Phone className="w-5 h-5 text-blue-400" />
                    </div>
                    <div className="flex-1">
                      <p className="text-sm text-gray-400 mb-1">
                        Telefon raqam
                      </p>
                      <div className="flex items-center gap-2">
                        <a
                          href={`tel:${PERSONAL_INFO.phone}`}
                          className="text-white hover:text-blue-400 transition-colors font-medium"
                        >
                          {PERSONAL_INFO.phone}
                        </a>
                        <button
                          onClick={() => {
                            navigator.clipboard.writeText(PERSONAL_INFO.phone);
                            // Ixtiyoriy: bildirishnoma
                          }}
                          className="p-1.5 hover:bg-blue-500/10 rounded transition-colors group"
                          title="Nusxalash"
                        >
                          <svg
                            className="w-4 h-4 text-gray-400 group-hover:text-blue-400 transition-colors"
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth={2}
                              d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z"
                            />
                          </svg>
                        </button>
                      </div>
                    </div>
                  </div>

                  <div className="flex items-start gap-4">
                    <div className="p-2 bg-cyan-500/10 rounded-lg mt-1">
                      <MapPin className="w-5 h-5 text-cyan-400" />
                    </div>
                    <div>
                      <p className="text-sm text-gray-400 mb-1">Joylashuv</p>
                      <p className="text-white font-medium">
                        {PERSONAL_INFO.location}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </FadeIn>
          </div>

          {/* Right Column - Journey & Expertise */}
          <div className="space-y-8">
            {/* Journey Timeline */}
            <FadeIn delay={200}>
              <div>
                <div className="flex items-center gap-3 mb-6">
                  <div className="p-2 bg-purple-500/20 rounded-lg">
                    <GraduationCap className="w-6 h-6 text-purple-400" />
                  </div>
                  <h3 className="text-2xl font-bold text-white">
                    Mening Yo'lim
                  </h3>
                </div>

                <div className="space-y-6">
                  {journey.map((step, index) => (
                    <div
                      key={index}
                      className="relative backdrop-blur-xl bg-white/5 border border-white/10 rounded-xl p-6 hover:bg-white/10 hover:border-blue-400/30 transition-all duration-500"
                    >
                      <div className="flex gap-4">
                        <div className="flex-shrink-0">
                          <div className="w-12 h-12 rounded-full bg-gradient-to-br from-blue-500 to-cyan-500 flex items-center justify-center text-white font-bold">
                            {index + 1}
                          </div>
                        </div>
                        <div className="flex-1">
                          <div className="flex items-center gap-2 mb-2">
                            <span className="text-blue-400 font-semibold">
                              {step.year}
                            </span>
                          </div>
                          <h4 className="text-lg font-bold text-white mb-2">
                            {step.title}
                          </h4>
                          <p className="text-gray-400 text-sm leading-relaxed">
                            {step.description}
                          </p>
                        </div>
                      </div>

                      {/* Connection line */}
                      {index < journey.length - 1 && (
                        <div className="absolute left-[2.75rem] top-[5rem] w-[2px] h-6 bg-gradient-to-b from-blue-400/50 to-transparent" />
                      )}
                    </div>
                  ))}
                </div>
              </div>
            </FadeIn>
          </div>
        </div>

        {/* Values Section */}
        <FadeIn delay={250}>
          <div className="mb-20">
            <div className="text-center mb-12">
              <h3 className="text-3xl sm:text-4xl font-bold text-white mb-4">
                Qadriyatlarim
              </h3>
              <p className="text-gray-400 max-w-2xl mx-auto">
                Men ishlash jarayonimda quyidagi printsiplarga amal qilaman
              </p>
            </div>

            <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {values.map((value, index) => {
                const Icon = value.icon;
                return (
                  <div
                    key={index}
                    className="backdrop-blur-xl bg-white/5 border border-white/10 rounded-xl p-6 hover:bg-white/10 hover:border-blue-400/30 transition-all duration-500 hover:-translate-y-2 group"
                  >
                    <div
                      className={`w-12 h-12 rounded-lg bg-gradient-to-br ${value.color} flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300`}
                    >
                      <Icon className="w-6 h-6 text-white" />
                    </div>
                    <h4 className="text-lg font-bold text-white mb-2">
                      {value.title}
                    </h4>
                    <p className="text-sm text-gray-400 leading-relaxed">
                      {value.description}
                    </p>
                  </div>
                );
              })}
            </div>
          </div>
        </FadeIn>

        {/* What I Do Section */}
        <FadeIn delay={300}>
          <div>
            <div className="text-center mb-12">
              <h3 className="text-3xl sm:text-4xl font-bold text-white mb-4">
                Nima Qilaman
              </h3>
              <p className="text-gray-400 max-w-2xl mx-auto">
                Mening asosiy yo'nalishlarim va tajribalarim
              </p>
            </div>

            <div className="grid md:grid-cols-3 gap-8">
              {expertise.map((item, index) => (
                <div
                  key={index}
                  className="backdrop-blur-xl bg-white/5 border border-white/10 rounded-2xl p-8 hover:bg-white/10 hover:border-blue-400/30 transition-all duration-500 hover:scale-105 group"
                >
                  <h4 className="text-xl font-bold text-white mb-3 group-hover:text-blue-400 transition-colors">
                    {item.title}
                  </h4>
                  <p className="text-gray-400 mb-6 leading-relaxed">
                    {item.description}
                  </p>
                  <div className="flex flex-wrap gap-2">
                    {item.skills.map((skill, idx) => (
                      <span
                        key={idx}
                        className="px-3 py-1 text-xs font-semibold bg-blue-500/10 text-blue-400 border border-blue-500/20 rounded-full"
                      >
                        {skill}
                      </span>
                    ))}
                  </div>
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
