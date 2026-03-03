import React, { useState, useRef, useEffect, memo } from "react";
import {
  Mail, MapPin, Phone, Copy, Check,
  Briefcase, GraduationCap, Code2,
  Lightbulb, Target, Award,
} from "lucide-react";
import { PERSONAL_INFO } from "../../utils/constants";
import { useLanguage } from "../../contexts/LanguageContext";

/* ─── Intersection reveal hook ─── */
const useReveal = () => {
  const ref = useRef(null);
  const [on, setOn] = useState(false);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const io = new IntersectionObserver(
      ([e]) => { if (e.isIntersecting) { setOn(true); io.disconnect(); } },
      { threshold: 0.01 }
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);
  return [ref, on];
};

const Reveal = memo(({ children, delay = 0, style = {}, className = "" }) => {
  const [ref, on] = useReveal();
  return (
    <div
      ref={ref}
      className={className}
      style={{
        opacity:   1,
        transform: on ? "translateY(0)" : "translateY(24px)",
        transition: `transform .6s cubic-bezier(.16,1,.3,1) ${delay}ms`,
        ...style,
      }}
    >
      {children}
    </div>
  );
});

export default function About() {
  const { language }        = useLanguage();
  const personalInfo        = PERSONAL_INFO[language];
  const [copied, setCopied] = useState(false);
  const uz = language === "uz";
  const t  = (u, e) => (uz ? u : e);

  const journey = [
    {
      year:  "2025",
      title: t("Frontend Development ni Boshlash", "Starting Frontend Development"),
      desc:  t(
        "Web development dunyosiga qiziqish paydo bo'ldi va HTML, CSS, JavaScript o'rganishni boshladim",
        "Got interested in web development and started learning HTML, CSS and JavaScript"
      ),
    },
    {
      year:  "2026",
      title: t("React.js ga O'tish", "Transition to React.js"),
      desc:  t(
        "React.js frameworkini o'rganib, zamonaviy SPA ilovalar yaratishni boshladim",
        "Learned React.js and started creating modern Single Page Applications"
      ),
    },
    {
      year:  "2026",
      title: t("Next.js va Professional Rivojlanish", "Next.js & Professional Growth"),
      desc:  t(
        "Next.js orqali SSR va SEO-friendly ilovalar yaratishni o'rgandim. Hozir 10+ loyihaga ega",
        "Learned SSR and SEO-friendly apps with Next.js. Currently have 10+ projects"
      ),
    },
  ];

  const values = [
    { Icon: Code2,     title: "Clean Code",                       desc: t("O'qilishi oson, tushunarli va maintainable kod yozaman", "I write readable, understandable and maintainable code") },
    { Icon: Lightbulb, title: t("Doimiy O'rganish", "Continuous Learning"), desc: t("Har kuni yangi narsalarni o'rganishga intilaman", "I strive to learn new things every single day") },
    { Icon: Target,    title: "User Experience",                  desc: t("Foydalanuvchi tajribasi har doim birinchi o'rinda", "User experience always comes first in my work") },
    { Icon: Award,     title: t("Sifat va Standartlar", "Quality & Standards"), desc: t("Best practices va responsive design standartlariga amal qilaman", "I follow best practices and responsive design standards") },
  ];

  const expertise = [
    {
      title: "Frontend Development",
      desc:  t("React.js va Next.js yordamida tez va responsive ilovalar yarataman", "Building fast, responsive applications with React.js and Next.js"),
      tags:  ["React.js", "Next.js", "JavaScript ES6+"],
    },
    {
      title: "UI/UX Implementation",
      desc:  t("Dizayndan kodga — pixel-perfect interfeys va ajoyib UX", "From design to code — pixel-perfect interface and excellent UX"),
      tags:  ["Tailwind CSS", "Responsive Design", "Animations"],
    },
    {
      title: t("Performance va SEO", "Performance & SEO"),
      desc:  t("Sayt tezligi, SEO optimizatsiya va Core Web Vitals", "Site speed, SEO optimization and Core Web Vitals"),
      tags:  ["SEO", "Core Web Vitals", "Code Splitting"],
    },
  ];

  const copy = async () => {
    try {
      await navigator.clipboard.writeText(personalInfo.phone);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {}
  };

  return (
    <section id="about" className="relative w-full overflow-hidden">
      {/* background yo'q — App.jsx body dan keladi */}

      <div className="relative mx-auto max-w-7xl px-5 py-20 sm:px-8 sm:py-28 lg:px-10 lg:py-32">

        {/* ══════════════ HEADER ══════════════ */}
        <Reveal className="mb-16 sm:mb-20 lg:mb-24 text-center">
          <div className="mb-5 flex items-center justify-center gap-3">
            <div className="h-px w-8 bg-[#c8a96e]" />
            <span className="ab-mono text-[11px] font-semibold uppercase tracking-[0.18em] text-[#c8a96e]">
              {t("Men Haqimda", "About Me")}
            </span>
            <div className="h-px w-8 bg-[#c8a96e]" />
          </div>

          <h2 className="ab-sans mb-4" style={{
            fontSize: "clamp(2.2rem,5vw,4rem)",
            fontWeight: 800, letterSpacing: "-0.035em", lineHeight: 1.08, color: "#0f0f0f",
          }}>
            {t("Salom, Men ", "Hello, I'm ")}
            <span style={{
              background: "linear-gradient(135deg,#c8a96e 0%,#a8824a 100%)",
              WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent",
            }}>
              {personalInfo.name}
            </span>
          </h2>

          <p className="ab-sans mx-auto max-w-xl text-base leading-relaxed text-[#6b6b6b] sm:text-lg">
            {personalInfo.title}
          </p>
        </Reveal>

        {/* ══════════════ MAIN GRID ══════════════ */}
        <div className="grid gap-6 lg:grid-cols-2 lg:gap-10 mb-16 sm:mb-20">

          {/* LEFT: Bio + Contact */}
          <div className="flex flex-col gap-5">

            <Reveal delay={60}>
              <div className="ab-card relative overflow-hidden rounded-2xl p-6 sm:p-8">
                <div aria-hidden className="ab-shine" />
                <GoldTopBar />
                <CardHead icon={<Briefcase size={16} strokeWidth={1.8} className="text-white" />}>
                  {t("Mening Hikoyam", "My Story")}
                </CardHead>
                <div className="space-y-3 text-sm leading-[1.8] text-[#5a5a5a] sm:text-[15px]"
                  style={{ fontFamily:"'DM Sans',system-ui,sans-serif" }}>
                  {personalInfo.bio.map((p, i) => <p key={i}>{p}</p>)}
                </div>
              </div>
            </Reveal>

            <Reveal delay={130}>
              <div className="ab-card relative overflow-hidden rounded-2xl p-6 sm:p-8">
                <div aria-hidden className="ab-shine" />
                <CardHead icon={<Mail size={16} strokeWidth={1.8} className="text-white" />}>
                  {t("Bog'lanish", "Contact")}
                </CardHead>
                <div className="space-y-5">
                  <ContactRow icon={<Mail size={14} strokeWidth={1.8} className="text-[#c8a96e]" />} label="Email">
                    <a href={`mailto:${personalInfo.email}`}
                      className="ab-sans break-all text-sm font-medium text-[#0f0f0f] transition-colors hover:text-[#c8a96e] sm:text-base">
                      {personalInfo.email}
                    </a>
                  </ContactRow>
                  <ContactRow icon={<Phone size={14} strokeWidth={1.8} className="text-[#c8a96e]" />} label={t("Telefon", "Phone")}>
                    <div className="flex items-center gap-2.5">
                      <a href={`tel:${personalInfo.phone}`}
                        className="ab-sans text-sm font-medium text-[#0f0f0f] transition-colors hover:text-[#c8a96e] sm:text-base">
                        {personalInfo.phone}
                      </a>
                      <button onClick={copy} aria-label="Copy phone"
                        className="cursor-pointer flex h-7 w-7 items-center justify-center rounded-lg border border-[#e0dbd0] bg-[#f6f2ec] transition-all duration-200 hover:border-[#c8a96e]/50 hover:bg-[#ede8e0]">
                        {copied ? <Check size={12} className="text-emerald-500" /> : <Copy size={12} className="text-[#9a9a9a]" />}
                      </button>
                    </div>
                  </ContactRow>
                  <ContactRow icon={<MapPin size={14} strokeWidth={1.8} className="text-[#c8a96e]" />} label={t("Joylashuv", "Location")}>
                    <span className="ab-sans text-sm font-medium text-[#0f0f0f] sm:text-base">
                      {personalInfo.location}
                    </span>
                  </ContactRow>
                </div>
              </div>
            </Reveal>
          </div>

          {/* RIGHT: Journey */}
          <Reveal delay={80}>
            <div className="ab-card relative overflow-hidden rounded-2xl p-6 sm:p-8 h-full">
              <div aria-hidden className="ab-shine" />
              <CardHead icon={<GraduationCap size={16} strokeWidth={1.8} className="text-white" />}>
                {t("Mening Yo'lim", "My Journey")}
              </CardHead>
              <div className="relative">
                <div aria-hidden className="absolute left-[19px] top-5 bottom-2 w-px"
                  style={{ background: "linear-gradient(to bottom,#c8a96e 0%,rgba(200,169,110,0.15) 100%)" }} />
                <div className="space-y-0">
                  {journey.map((step, i) => (
                    <div key={i} className="journey-step relative flex gap-5 pb-8 last:pb-0">
                      <div className="relative z-10 flex-shrink-0 mt-0.5">
                        <div className="flex h-10 w-10 items-center justify-center rounded-full border-2 border-[#c8a96e]"
                          style={{ background: "#faf9f6", boxShadow: "0 0 0 4px rgba(200,169,110,0.10)" }}>
                          <span className="ab-mono text-[11px] font-bold text-[#c8a96e]">
                            {String(i + 1).padStart(2, "0")}
                          </span>
                        </div>
                      </div>
                      <div className="flex-1 pt-1.5">
                        <span className="ab-mono mb-1 block text-[11px] font-semibold tracking-[0.12em] uppercase text-[#c8a96e]">
                          {step.year}
                        </span>
                        <h4 className="ab-sans mb-1.5 text-[15px] font-bold text-[#0f0f0f] sm:text-base"
                          style={{ letterSpacing: "-0.015em" }}>
                          {step.title}
                        </h4>
                        <p className="ab-sans text-[13px] leading-relaxed text-[#6b6b6b] sm:text-sm">
                          {step.desc}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </Reveal>
        </div>

        {/* ══════════════ VALUES ══════════════ */}
        <Reveal>
          <AbSectionLabel>{t("Qadriyatlarim", "My Values")}</AbSectionLabel>
        </Reveal>

        <div className="mt-8 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4 mb-16 sm:mb-20">
          {values.map(({ Icon, title, desc }, i) => (
            <Reveal key={i} delay={i * 70}>
              <div className="ab-card value-card relative overflow-hidden rounded-2xl p-5 sm:p-6 h-full">
                <div aria-hidden className="ab-shine" />
                <div aria-hidden className="value-glow absolute -bottom-4 -right-4 h-20 w-20 rounded-full opacity-0"
                  style={{ background: "rgba(200,169,110,0.18)", filter: "blur(24px)" }} />
                <span className="mb-4 flex h-10 w-10 items-center justify-center rounded-xl bg-[#0f0f0f]">
                  <Icon size={16} strokeWidth={1.8} className="text-white" />
                </span>
                <h4 className="ab-sans mb-2 text-sm font-bold text-[#0f0f0f] sm:text-[15px]"
                  style={{ letterSpacing: "-0.015em" }}>{title}</h4>
                <p className="ab-sans text-[12px] leading-relaxed text-[#6b6b6b] sm:text-[13px]">{desc}</p>
              </div>
            </Reveal>
          ))}
        </div>

        {/* ══════════════ EXPERTISE ══════════════ */}
        <Reveal>
          <AbSectionLabel>{t("Nima Qilaman", "What I Do")}</AbSectionLabel>
        </Reveal>

        <div className="mt-8 grid grid-cols-1 gap-4 md:grid-cols-3">
          {expertise.map((item, i) => (
            <Reveal key={i} delay={i * 80}>
              <div className="ab-card expertise-card relative overflow-hidden rounded-2xl p-6 sm:p-8 h-full">
                <div aria-hidden className="ab-shine" />
                <div aria-hidden className="expertise-line absolute inset-x-0 top-0 h-[2px] rounded-t-2xl" />
                <h4 className="ab-sans mb-3 text-base font-bold text-[#0f0f0f] sm:text-lg"
                  style={{ letterSpacing: "-0.02em" }}>{item.title}</h4>
                <p className="ab-sans mb-5 text-sm leading-relaxed text-[#6b6b6b]">{item.desc}</p>
                <div className="flex flex-wrap gap-2">
                  {item.tags.map(tag => (
                    <span key={tag}
                      className="ab-mono rounded-lg border border-[#e0dbd0] bg-white/60 px-2.5 py-1 text-[11px] font-medium text-[#5a5a5a] transition-all duration-200 hover:border-[#c8a96e]/40 hover:text-[#0f0f0f]">
                      {tag}
                    </span>
                  ))}
                </div>

              </div>
            </Reveal>
          ))}
        </div>

      </div>

      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=DM+Sans:wght@300;400;500;600;700;800&family=DM+Mono:wght@400;500&display=swap');

        .ab-sans { font-family: 'DM Sans', system-ui, sans-serif; }
        .ab-mono { font-family: 'DM Mono', monospace; }

        /* ── Card: doim oq, to'liq tiniq ── */
        .ab-card {
          background: #ffffff;
          border: 1px solid rgba(224,219,208,0.9);
          box-shadow: 0 2px 16px rgba(0,0,0,0.04), inset 0 1px 0 rgba(255,255,255,0.95);
          backdrop-filter: blur(20px);
          -webkit-backdrop-filter: blur(20px);
          transition: border-color .3s, box-shadow .35s, transform .35s cubic-bezier(.34,1.56,.64,1);
        }
        /* hover da faqat border va shadow o'zgaradi, opacity emas */
        .ab-card:hover {
          border-color: rgba(200,169,110,0.4);
          box-shadow: 0 12px 40px rgba(200,169,110,0.12), inset 0 1px 0 rgba(255,255,255,0.95);
          transform: translateY(-3px);
        }

        /* ── Shine sweep ── */
        .ab-shine {
          position: absolute; inset: 0; pointer-events: none; z-index: 0;
          background: linear-gradient(105deg,transparent 35%,rgba(255,255,255,0.55) 50%,transparent 65%);
          background-size: 250% 100%;
          background-position: -100% 0;
          transition: background-position .7s ease;
        }
        .ab-card:hover .ab-shine { background-position: 200% 0; }

        /* ── Value card glow ── */
        .value-card:hover .value-glow { opacity: 1 !important; }

        /* ── Expertise top line ── */
        .expertise-line {
          background: linear-gradient(90deg,#c8a96e,#a8824a,transparent);
          opacity: 0; transition: opacity .35s;
        }
        .expertise-card:hover .expertise-line { opacity: 1; }

        /* ── Journey step hover ── */
        .journey-step { transition: transform .28s cubic-bezier(.34,1.56,.64,1); }
        .journey-step:hover { transform: translateX(5px); }

        @media (prefers-reduced-motion: reduce) {
          *, *::before, *::after { animation-duration:.01ms !important; transition-duration:.01ms !important; }
        }
      `}</style>
    </section>
  );
}

/* ─── Helpers ─── */
const GoldTopBar = () => (
  <div aria-hidden className="absolute inset-x-0 top-0 h-[2px] rounded-t-2xl"
    style={{ background: "linear-gradient(90deg,#c8a96e,#a8824a,transparent)" }} />
);

const CardHead = memo(({ icon, children }) => (
  <div className="relative z-10 mb-5 flex items-center gap-3">
    <span className="flex h-9 w-9 flex-shrink-0 items-center justify-center rounded-xl bg-[#0f0f0f]">
      {icon}
    </span>
    <h3 className="ab-sans text-[17px] font-bold text-[#0f0f0f] sm:text-lg"
      style={{ letterSpacing: "-0.02em" }}>
      {children}
    </h3>
  </div>
));

const ContactRow = memo(({ icon, label, children }) => (
  <div className="flex items-start gap-3">
    <span className="mt-0.5 flex h-8 w-8 flex-shrink-0 items-center justify-center rounded-lg border border-[#e0dbd0] bg-[#f6f2ec]">
      {icon}
    </span>
    <div>
      <p className="ab-mono mb-0.5 text-[10px] font-semibold uppercase tracking-[0.1em] text-[#9a9a9a]">
        {label}
      </p>
      {children}
    </div>
  </div>
));

const AbSectionLabel = memo(({ children }) => (
  <div className="flex items-center gap-4">
    <span className="ab-mono inline-flex items-center gap-2 rounded-full border px-4 py-1.5 text-[11px] font-semibold uppercase tracking-[0.15em] text-[#c8a96e]"
      style={{ borderColor: "rgba(200,169,110,0.28)", background: "rgba(200,169,110,0.07)" }}>
      {children}
    </span>
    <div className="h-px flex-1"
      style={{ background: "linear-gradient(90deg,rgba(200,169,110,0.35),transparent)" }} />
  </div>
));