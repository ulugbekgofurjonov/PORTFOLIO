import { useState, useEffect, memo } from "react";
import { motion, useReducedMotion } from "framer-motion";
import {
  ArrowRight, Download, MousePointer2, Sparkles,
  Github, Send, Instagram,
} from "lucide-react";
import { PERSONAL_INFO, STATS, SOCIAL_LINKS } from "../../utils/constants";
import { scrollToSection } from "../../hooks/useScrollSpy";
import { useLanguage } from "../../contexts/LanguageContext";
import FadeIn from "../animations/FadeIn";

/*
 ╔══════════════════════════════════════════════════════════╗
 ║  HERO  —  FadeIn + Framer Motion Premium Edition         ║
 ║  Animations: staggered reveal, spring physics            ║
 ║  Palette : #faf9f6 · #0f0f0f · #c8a96e                  ║
 ╚══════════════════════════════════════════════════════════╝
*/

const SOCIALS = [
  { key: "github",    Icon: Github,    label: "GitHub",    href: SOCIAL_LINKS.github    },
  { key: "telegram",  Icon: Send,      label: "Telegram",  href: SOCIAL_LINKS.telegram  },
  { key: "instagram", Icon: Instagram, label: "Instagram", href: SOCIAL_LINKS.instagram },
];

/* ── Shared animation variants ── */
const fadeUp = (delay = 0) => ({
  hidden:  { opacity: 0, y: 22 },
  visible: {
    opacity: 1, y: 0,
    transition: { duration: 0.65, ease: [0.16, 1, 0.3, 1], delay },
  },
});

const fadeRight = (delay = 0) => ({
  hidden:  { opacity: 0, x: -16 },
  visible: {
    opacity: 1, x: 0,
    transition: { duration: 0.55, ease: [0.16, 1, 0.3, 1], delay },
  },
});

const scaleIn = (delay = 0) => ({
  hidden:  { opacity: 0, scale: 0.90 },
  visible: {
    opacity: 1, scale: 1,
    transition: { duration: 0.5, ease: [0.34, 1.56, 0.64, 1], delay },
  },
});

const staggerContainer = {
  hidden:  { opacity: 0 },
  visible: { 
    opacity: 1,
    transition: { staggerChildren: 0.07, delayChildren: 0.05 } 
  },
};

const staggerItem = {
  hidden:  { opacity: 0, y: 14 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: [0.16, 1, 0.3, 1] } },
};

/* Viewport config for FadeIn */
const VP = { once: false, amount: 0.2 };

/* ══════════════════════════════════════════════
   MAIN
══════════════════════════════════════════════ */
export default function Hero() {
  const reduced      = useReducedMotion();
  const { language } = useLanguage();
  const personalInfo = PERSONAL_INFO[language];
  const stats        = STATS[language];

  const [typed,  setTyped]  = useState("");
  const [done,   setDone]   = useState(false);
  const [blink,  setBlink]  = useState(true);

  const fullText = personalInfo.name ?? "Ulugbek Gofurjonov";

  useEffect(() => {
    setTyped(""); setDone(false);
    let i = 0;
    const id = setInterval(() => {
      if (i <= fullText.length) { 
        setTyped(fullText.slice(0, i)); 
        i++; 
      } else { 
        setDone(true); 
        clearInterval(id); 
      }
    }, 88);
    return () => clearInterval(id);
  }, [fullText]);

  useEffect(() => {
    const id = setInterval(() => setBlink(v => !v), 520);
    return () => clearInterval(id);
  }, []);

  const ctaLabel  = language === "uz" ? "Bog'lanish"      : "Contact Me";
  const cvLabel   = language === "uz" ? "Resumeni Yuklab Olish" : "Download Resume";
  const scrollLbl = language === "uz" ? "Ko'proq ko'rish" : "Explore more";

  return (
    <section id="hero" className="relative min-h-screen w-full overflow-hidden bg-[#faf9f6]">

      {/* Blobs */}
      <Blob className="absolute -right-40 top-16 h-[560px] w-[560px] opacity-[0.065]" color="#c8a96e" blur={90} />
      <Blob className="absolute -left-56 bottom-0  h-[420px] w-[420px] opacity-[0.04]"  color="#0f0f0f" blur={110} />

      <div className="relative z-10 mx-auto flex min-h-screen max-w-7xl flex-col
        px-5 pt-16 pb-10 sm:px-8 lg:px-10 lg:pt-20">

        {/* ── Status badge ── */}
        <FadeIn y={15} duration={600} delay={0} once={false} threshold={0.2} className="mb-10 self-start">
          <motion.span
            className="inline-flex items-center gap-2 rounded-full border border-[#e0dbd0] bg-white/80 px-4 py-1.5 shadow-sm"
            style={{ backdropFilter: "blur(8px)" }}
            whileHover={{ y: -2, scale: 1.02, transition: { type: "spring", stiffness: 300 } }}
          >
            <span className="relative flex h-2 w-2">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-60" />
              <span className="relative inline-flex h-2 w-2 rounded-full bg-emerald-500" />
            </span>
            <span className="h-mono text-[11px] font-medium uppercase tracking-widest text-[#6b6b6b]">
              {language === "uz" ? "Ishga tayyor" : "Available for work"}
            </span>
          </motion.span>
        </FadeIn>

        {/* ── Split layout ── */}
        <div className="flex flex-1 flex-col gap-12 lg:flex-row lg:items-center lg:gap-16 xl:gap-24">

          {/* ════ LEFT ════ */}
          <div className="flex-1">

            {/* Eyebrow */}
            <FadeIn x={-15} duration={550} delay={60} once={false} threshold={0.2}>
              <div className="mb-5 flex items-center gap-3">
                <motion.div
                  initial={{ scaleX: 0 }}
                  animate={{ scaleX: 1 }}
                  transition={{ duration: 0.6, delay: 0.1 }}
                  className="h-px w-8 origin-left bg-[#c8a96e]"
                />
                <motion.span
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.5, delay: 0.15 }}
                  className="h-mono text-[11px] font-semibold uppercase tracking-[0.18em] text-[#c8a96e]"
                >
                  Frontend Developer
                </motion.span>
              </div>
            </FadeIn>

            {/* Name — typing */}
            <FadeIn y={15} duration={600} delay={100} once={false} threshold={0.2}>
              <div className="relative">
                <h1
                  className="h-sans mb-6"
                  style={{
                    fontSize: "clamp(2.8rem,8vw,5.8rem)",
                    fontWeight: 800, 
                    letterSpacing: "-0.035em",
                    lineHeight: 1.05, 
                    color: "#0f0f0f",
                  }}
                >
                  {typed}
                  {/* cursor */}
                  <span
                    style={{
                      display: "inline-block", 
                      width: "3px", 
                      height: "0.82em",
                      background: done ? "transparent" : "#c8a96e",
                      borderRadius: "2px", 
                      marginLeft: "6px", 
                      verticalAlign: "middle",
                      opacity: blink ? 1 : 0,
                      transition: "opacity 0.1s, background 0.3s",
                      boxShadow: done ? "none" : "0 0 12px rgba(200,169,110,0.7)",
                    }}
                  />
                </h1>
                {/* underline */}
                {done && (
                  <motion.div
                    className="absolute bottom-0 left-0 h-[3px] rounded-full"
                    initial={{ width: 0 }}
                    animate={{ width: "min(200px, 40%)" }}
                    transition={{ duration: 0.9, ease: [0.34, 1.56, 0.64, 1] }}
                    style={{ background: "linear-gradient(90deg,#c8a96e,#a8824a,transparent)" }}
                  />
                )}
              </div>
            </FadeIn>

            {/* Tagline */}
            <FadeIn y={15} duration={600} delay={160} once={false} threshold={0.2}>
              <motion.p
                className="h-sans mb-8 max-w-lg text-base leading-relaxed text-[#6b6b6b] sm:text-lg"
                initial={{ opacity: 0, y: 22 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.65, ease: [0.16, 1, 0.3, 1], delay: 0.16 }}
              >
                {personalInfo.tagline ?? "Crafting fast, beautiful & accessible digital experiences."}
              </motion.p>
            </FadeIn>

            {/* CTA buttons */}
            <FadeIn y={15} duration={600} delay={220} once={false} threshold={0.2}>
              <motion.div
                className="flex flex-wrap gap-3"
                variants={staggerContainer}
                initial="hidden"
                animate="visible"
              >
                <motion.div variants={staggerItem}>
                  <PrimaryBtn onClick={() => scrollToSection("contact")}>
                    <MousePointer2 size={15} strokeWidth={2} />
                    {ctaLabel}
                    <ArrowRight size={14} strokeWidth={2.5}
                      className="opacity-60 transition-all duration-200 group-hover:translate-x-0.5 group-hover:opacity-100" />
                  </PrimaryBtn>
                </motion.div>
                <motion.div variants={staggerItem}>
                  <SecondaryBtn onClick={() => {
                    const a = Object.assign(document.createElement("a"), {
                      href: "/resume.pdf", 
                      download: "Ulugbek_Gofurjonov_Resume.pdf",
                    });
                    document.body.appendChild(a); 
                    a.click(); 
                    document.body.removeChild(a);
                  }}>
                    <Download size={14} strokeWidth={2} style={{ color: "#c8a96e" }}
                      className="transition-transform duration-200 group-hover:-translate-y-0.5" />
                    {cvLabel}
                  </SecondaryBtn>
                </motion.div>
              </motion.div>
            </FadeIn>
          </div>

          {/* ════ RIGHT ════ */}
          <FadeIn y={20} duration={650} delay={180} once={false} threshold={0.2} className="w-full lg:w-[340px] xl:w-[380px]">
            <motion.div
              className="flex w-full flex-col gap-4"
              variants={staggerContainer}
              initial="hidden"
              animate="visible"
            >

              {/* Profile card */}
              <motion.div variants={staggerItem}>
                <motion.div
                  className="h-glass group relative overflow-hidden rounded-2xl p-6"
                  whileHover={{ y: -3, transition: { duration: 0.3, ease: [0.34, 1.56, 0.64, 1] } }}
                >
                  <div className="absolute inset-x-0 top-0 h-[2px] rounded-t-2xl"
                    style={{ background: "linear-gradient(90deg,#c8a96e,#a8824a,transparent)" }} />
                  <div className="mb-4 flex items-start justify-between">
                    <div>
                      <p className="h-mono mb-1 text-[10px] font-semibold uppercase tracking-[0.16em] text-[#c8a96e]">
                        {language === "uz" ? "Profil" : "Profile"}
                      </p>
                      <p className="h-sans text-lg font-bold text-[#0f0f0f]" style={{ letterSpacing: "-0.02em" }}>
                        {personalInfo.name ?? "Ulugbek"}
                      </p>
                    </div>
                    <motion.span
                      className="flex h-10 w-10 items-center justify-center rounded-xl bg-[#0f0f0f]"
                      whileHover={{ rotate: -8, scale: 1.1, transition: { duration: 0.3, ease: [0.34, 1.56, 0.64, 1] } }}
                    >
                      <Sparkles size={16} strokeWidth={1.8} className="text-white" />
                    </motion.span>
                  </div>

                  {[
                    { k: language === "uz" ? "Mutaxassislik" : "Specialty", v: "Frontend Development" },
                    { k: language === "uz" ? "Joylashuv"    : "Location",  v: personalInfo.location ?? "Uzbekistan" },
                    { k: language === "uz" ? "Holat"        : "Status",    v: language === "uz" ? "Ochiq" : "Open to work", gold: true },
                  ].map(({ k, v, gold }, i) => (
                    <motion.div
                      key={k}
                      className="flex items-center justify-between border-t border-[#ede8e0] py-2.5"
                      initial={{ opacity: 0, x: -10 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: 0.3 + i * 0.1 }}
                    >
                      <span className="h-mono text-xs text-[#9a9a9a]">{k}</span>
                      <span className="h-sans text-right text-sm font-medium"
                        style={{ color: gold ? "#c8a96e" : "#3a3a3a" }}>{v}</span>
                    </motion.div>
                  ))}
                </motion.div>
              </motion.div>

              {/* Stats — stagger */}
              <motion.div
                className="grid grid-cols-3 gap-3"
                variants={staggerContainer}
              >
                {stats.map((s, i) => (
                  <motion.div key={i} variants={staggerItem}>
                    <motion.div
                      className="h-glass flex flex-col items-center justify-center rounded-xl p-3 text-center"
                      whileHover={{ y: -2, transition: { duration: 0.25, ease: [0.34, 1.56, 0.64, 1] } }}
                    >
                      <span className="h-sans block font-black leading-tight text-[#0f0f0f]"
                        style={{ fontSize: "clamp(1.2rem,3.5vw,1.6rem)", letterSpacing: "-0.03em" }}>
                        {s.value}
                      </span>
                      <span className="h-mono mt-0.5 block text-center text-[#9a9a9a]"
                        style={{ fontSize: "clamp(7px,1.4vw,9.5px)", fontWeight: 500, textTransform: "uppercase", letterSpacing: "0.1em" }}>
                        {s.label}
                      </span>
                    </motion.div>
                  </motion.div>
                ))}
              </motion.div>

              {/* Social — horizontal chips with stagger */}
              <motion.div variants={staggerItem}>
                <motion.div
                  className="h-glass rounded-2xl px-5 py-4"
                  whileHover={{ y: -2, transition: { duration: 0.3, ease: [0.34, 1.56, 0.64, 1] } }}
                >
                  <p className="h-mono mb-3 text-[10px] font-semibold uppercase tracking-[0.16em] text-[#9a9a9a]">
                    {language === "uz" ? "Ijtimoiy tarmoqlar" : "Social Networks"}
                  </p>
                  <motion.div
                    className="flex items-center gap-2"
                    variants={staggerContainer}
                  >
                    {SOCIALS.map(({ key, Icon, label, href }) => (
                      <motion.div key={key} variants={staggerItem} className="flex-1">
                        <motion.a
                          href={href}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="h-social-chip group flex items-center justify-center gap-2 rounded-xl py-2.5"
                          whileHover={{ y: -2, transition: { duration: 0.25, ease: [0.34, 1.56, 0.64, 1] } }}
                          whileTap={{ scale: 0.95 }}
                        >
                          <Icon size={15} strokeWidth={1.8}
                            className="text-[#5a5a5a] transition-colors duration-200 group-hover:text-[#0f0f0f] flex-shrink-0" />
                          <span className="h-mono text-[10px] font-semibold text-[#6b6b6b] transition-colors duration-200 group-hover:text-[#0f0f0f] truncate">
                            {label}
                          </span>
                        </motion.a>
                      </motion.div>
                    ))}
                  </motion.div>
                </motion.div>
              </motion.div>

            </motion.div>
          </FadeIn>
        </div>

        {/* ── Scroll indicator ── */}
        <FadeIn y={15} duration={600} delay={480} once={false} threshold={0.2} className="mt-12 self-center">
          <motion.button
            onClick={() => scrollToSection("about")}
            className="cursor-pointer group flex flex-col items-center gap-2 focus:outline-none"
            style={{ opacity: 0.4 }}
            whileHover={{ opacity: 0.85, transition: { duration: 0.2 } }}
          >
            <span className="h-mono text-[10px] font-semibold uppercase tracking-[0.2em] text-[#9a9a9a]">
              {scrollLbl}
            </span>
            <div className="relative h-8 w-5 overflow-hidden rounded-full border border-[#ddd8cf]">
              <motion.div
                className="absolute left-1/2 h-1.5 w-1.5 -translate-x-1/2 rounded-full bg-[#c8a96e]"
                animate={{ top: ["6px", "20px", "6px"], opacity: [1, 0, 1] }}
                transition={{ duration: 2, ease: "easeInOut", repeat: Infinity }}
              />
            </div>
          </motion.button>
        </FadeIn>

      </div>

      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=DM+Sans:ital,wght@0,300;0,400;0,500;0,600;0,700;0,800;1,400&family=DM+Mono:wght@400;500&display=swap');

        .h-sans { font-family: 'DM Sans', system-ui, sans-serif; }
        .h-mono { font-family: 'DM Mono', monospace; }

        .h-glass {
          background: rgba(255,255,255,0.7);
          border: 1px solid rgba(224,219,208,0.9);
          box-shadow: 0 2px 16px rgba(0,0,0,0.05), inset 0 1px 0 rgba(255,255,255,0.95);
          backdrop-filter: blur(20px);
          -webkit-backdrop-filter: blur(20px);
          transition: border-color .3s, box-shadow .35s;
        }
        .h-glass:hover {
          border-color: rgba(200,169,110,0.3);
          box-shadow: 0 10px 36px rgba(200,169,110,0.10), inset 0 1px 0 rgba(255,255,255,0.95);
        }

        .h-social-chip {
          background: rgba(246,242,236,0.6);
          border: 1px solid rgba(224,219,208,0.7);
          border-radius: 12px;
          transition: background .25s, border-color .25s;
        }
        .h-social-chip:hover {
          background: rgba(200,169,110,0.08);
          border-color: rgba(200,169,110,0.35);
        }
      `}</style>
    </section>
  );
}

/* ── Sub-components ── */

const Blob = memo(({ className, color, blur }) => (
  <div aria-hidden className={`pointer-events-none rounded-full ${className}`}
    style={{ background: color, filter: `blur(${blur}px)` }} />
));

const PrimaryBtn = memo(({ children, onClick }) => (
  <motion.button
    onClick={onClick}
    className="h-sans cursor-pointer group relative flex items-center gap-2 overflow-hidden rounded-xl bg-[#0f0f0f] px-6 py-3 text-sm font-semibold text-white shadow-[0_4px_18px_rgba(0,0,0,0.2)] sm:px-7 sm:py-3.5"
    whileHover={{ y: -2, boxShadow: "0 10px 32px rgba(0,0,0,0.25)", transition: { duration: 0.25, ease: [0.34, 1.56, 0.64, 1] } }}
    whileTap={{ y: 0, scale: 0.98 }}
  >
    <span className="absolute inset-0 -translate-x-full skew-x-[-12deg] bg-gradient-to-r from-transparent via-white/12 to-transparent transition-transform duration-500 group-hover:translate-x-full" />
    {children}
  </motion.button>
));

const SecondaryBtn = memo(({ children, onClick }) => (
  <motion.button
    onClick={onClick}
    className="h-sans cursor-pointer group relative flex items-center gap-2 overflow-hidden rounded-xl border border-[#e0dbd0] bg-white/70 px-6 py-3 text-sm font-semibold text-[#0f0f0f] shadow-[0_2px_10px_rgba(0,0,0,0.04),inset_0_1px_0_rgba(255,255,255,0.9)] sm:px-7 sm:py-3.5"
    style={{ backdropFilter: "blur(10px)" }}
    whileHover={{ y: -2, borderColor: "rgba(200,169,110,0.4)", boxShadow: "0 6px 24px rgba(200,169,110,0.14)", transition: { duration: 0.25, ease: [0.34, 1.56, 0.64, 1] } }}
    whileTap={{ y: 0, scale: 0.98 }}
  >
    <span className="absolute inset-0 -translate-x-full skew-x-[-12deg] bg-gradient-to-r from-transparent via-[#c8a96e]/8 to-transparent transition-transform duration-500 group-hover:translate-x-full" />
    {children}
  </motion.button>
));