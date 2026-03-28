import React, { useState, memo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Github, Instagram, Send, Mail, MapPin, Phone, Download, ArrowUpRight, Code2, ChevronRight, Linkedin } from "lucide-react";
import { PERSONAL_INFO, SOCIAL_LINKS, NAV_LINKS } from "../../utils/constants";
import { useLanguage } from "../../contexts/LanguageContext";
import FadeIn, { EASE } from "../animations/FadeIn";

/* Font constants */
const F_SANS = "'DM Sans', system-ui, -apple-system, sans-serif";
const F_MONO = "'DM Mono', 'Fira Mono', monospace";

/* Viewport config */
const VP = { once: false, amount: 0.2 };

/* ── Framer variants ── */
const vStaggerWrap = {
  hidden:  {},
  visible: { transition: { staggerChildren: 0.09, delayChildren: 0.04 } },
};
const vStaggerChild = {
  hidden:  { opacity: 0, y: 22 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: [0.16, 1, 0.3, 1] } },
};

/* ── GoldText helper ── */
const GoldText = ({ children }) => (
  <span style={{
    background: 'linear-gradient(135deg, #c8a96e, #e8c880, #a8824a)',
    WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent',
  }}>
    {children}
  </span>
);

const Footer = () => {
  const { language } = useLanguage();
  const personalInfo = PERSONAL_INFO[language];
  const navLinks     = NAV_LINKS[language];
  const t = (u, e)   => language === "uz" ? u : e;

  const socialLinks = [
    { Icon: Github,    href: SOCIAL_LINKS.github,    label: "GitHub",    sub: t("Kod", "Code") },
    { Icon: Send,      href: SOCIAL_LINKS.telegram,  label: "Telegram",  sub: t("Yozing", "Message") },
    { Icon: Instagram, href: SOCIAL_LINKS.instagram, label: "Instagram", sub: t("Kuzating", "Follow") },
    { Icon: Linkedin,  href: SOCIAL_LINKS.linkedin,  label: "LinkedIn",  sub: t("Ulaning", "Connect") },
  ];

  const techStack = ["React.js", "Next.js", "Tailwind CSS", "TypeScript"];

  const handleResumeDownload = () => {
    const a = Object.assign(document.createElement("a"), {
      href: "/UlugbekGofurjonov.pdf",
      download: "Ulug'bek G'ofurjonov Frontend Developer Resume.pdf",
    });
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
  };

  return (
    <footer
      className="relative w-full overflow-hidden"
      style={{ background: "#faf9f6", color: "#0f0f0f" }}
    >
      {/* ── Decorative top border ── */}
      <motion.div
        initial={{ scaleX: 0 }}
        animate={{ scaleX: 1 }}
        transition={{ duration: 1.2, ease: "easeInOut" }}
        className="absolute top-0 left-0 right-0 h-[1px] origin-left"
        style={{ background: "linear-gradient(90deg, transparent 0%, rgba(200,169,110,0.5) 30%, rgba(200,169,110,0.85) 50%, rgba(200,169,110,0.5) 70%, transparent 100%)" }}
      />

      {/* ── Ambient glow ── */}
      <motion.div
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 0.09, scale: 1 }}
        transition={{ duration: 1.5, delay: 0.3 }}
        className="pointer-events-none absolute -top-40 left-1/2 -translate-x-1/2 h-[400px] w-[700px] rounded-full"
        style={{ background: "radial-gradient(ellipse, rgba(200,169,110,0.09) 0%, transparent 70%)" }}
      />
      <motion.div
        initial={{ opacity: 0, x: 100 }}
        animate={{ opacity: 0.06, x: 0 }}
        transition={{ duration: 1.5, delay: 0.5 }}
        className="pointer-events-none absolute bottom-0 right-0 h-[300px] w-[400px]"
        style={{ background: "radial-gradient(ellipse, rgba(200,169,110,0.06) 0%, transparent 70%)" }}
      />

      {/* ── Dot grid ── */}
      <div
        className="pointer-events-none absolute inset-0 opacity-[0.022]"
        style={{
          backgroundImage: "radial-gradient(circle, #c8a96e 1px, transparent 1px)",
          backgroundSize: "28px 28px",
        }}
      />

      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-10">

        {/* ══════════════════════════════
            TOP BAND — CTA
        ══════════════════════════════ */}
        <FadeIn y={30} duration={700} once={false} threshold={0.06} className="mt-14 sm:mt-16">
          <motion.div
            whileHover={{ scale: 1.01 }}
            transition={{ type: "spring", stiffness: 200, damping: 15 }}
            className="relative overflow-hidden rounded-2xl px-6 py-8 sm:px-10 sm:py-10 lg:py-12"
            style={{
              background: "linear-gradient(135deg, rgba(200,169,110,0.1) 0%, rgba(168,130,74,0.05) 50%, rgba(200,169,110,0.08) 100%)",
              border: "1px solid rgba(200,169,110,0.22)",
            }}
          >
            {/* Inner glow */}
            <motion.div
              animate={{ 
                scale: [1, 1.05, 1],
                opacity: [0.1, 0.15, 0.1]
              }}
              transition={{ 
                duration: 8, 
                repeat: Infinity,
                repeatType: "reverse"
              }}
              className="pointer-events-none absolute -top-10 -right-10 h-[220px] w-[220px] rounded-full"
              style={{ background: "radial-gradient(circle, rgba(200,169,110,0.1) 0%, transparent 70%)" }}
            />

            <div className="relative flex flex-col items-center justify-between gap-6 text-center sm:gap-8 lg:flex-row lg:text-left">
              <div className="max-w-xl">
                <motion.p 
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={VP}
                  transition={{ delay: 0.2 }}
                  className="mb-2 text-[10px] font-semibold uppercase tracking-[0.2em]"
                  style={{ fontFamily: F_MONO, color: "#c8a96e" }}
                >
                  {t("Hamkorlik", "Collaboration")}
                </motion.p>
                <motion.h2
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={VP}
                  transition={{ delay: 0.3 }}
                  className="mb-2 text-2xl font-bold sm:text-3xl lg:text-4xl"
                  style={{ fontFamily: F_SANS, letterSpacing: "-0.035em", lineHeight: 1.1, color: "#0f0f0f" }}
                >
                  {t("Loyiha g'oyangiz bormi?", "Do you have a project idea?")}
                </motion.h2>
                <motion.p
                  initial={{ opacity: 0 }}
                  whileInView={{ opacity: 1 }}
                  viewport={VP}
                  transition={{ delay: 0.4 }}
                  className="text-sm leading-relaxed sm:text-base"
                  style={{ fontFamily: F_SANS, color: "#6b6b6b" }}
                >
                  {t(
                    "G'oyangizni haqiqatga aylantirish uchun men bilan bog'laning! Tez orada sizga javob beraman.",
                    "Contact me to turn your idea into reality! I will get back to you soon.",
                  )}
                </motion.p>
              </div>

              <div className="flex flex-col items-center gap-3 sm:flex-row lg:flex-shrink-0">
                {/* Primary CTA — gold gradient */}
                <motion.a
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.97 }}
                  initial={{ opacity: 0, x: 20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={VP}
                  transition={{ delay: 0.5 }}
                  href="#contact"
                  className="ct-shimmer group relative flex items-center gap-2 overflow-hidden rounded-xl px-6 py-3.5 text-sm font-bold text-white"
                  style={{
                    fontFamily: F_SANS,
                    background: "linear-gradient(135deg,#c8a96e,#d4b478,#a8824a)",
                    boxShadow: "0 4px 20px rgba(200,169,110,0.4), inset 0 1px 0 rgba(255,255,255,0.2)",
                  }}
                >
                  <span className="pointer-events-none absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-white/20 to-transparent transition-transform duration-700 group-hover:translate-x-full" />
                  <Mail size={15} strokeWidth={2.5} />
                  <span>{t("Bog'lanish", "Get in Touch")}</span>
                  <ArrowUpRight size={14} strokeWidth={2.5} className="transition-transform duration-200 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                </motion.a>

                {/* Secondary — Resume download */}
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.97 }}
                  initial={{ opacity: 0, x: 20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={VP}
                  transition={{ delay: 0.6 }}
                  onClick={handleResumeDownload}
                  className="group flex items-center gap-2 rounded-xl px-6 py-3.5 text-sm font-semibold transition-all duration-300 cursor-pointer"
                  style={{
                    fontFamily: F_SANS,
                    background: "rgba(15,15,15,0.06)",
                    border: "1px solid rgba(15,15,15,0.15)",
                    color: "rgba(15,15,15,0.7)",
                  }}
                >
                  <Download size={14} strokeWidth={2} />
                  <span>{t("Resume", "Resume")}</span>
                </motion.button>
              </div>
            </div>
          </motion.div>
        </FadeIn>

        {/* ══════════════════════════════
            MAIN 3-COL GRID
        ══════════════════════════════ */}
        <motion.div
          variants={vStaggerWrap}
          initial="hidden"
          whileInView="visible"
          viewport={VP}
          className="mt-14 sm:mt-18 grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3 lg:gap-10 xl:gap-14 pb-14 sm:pb-18 lg:pb-20"
        >

          {/* ── COL 1: Brand ── */}
          <motion.div variants={vStaggerChild} className="sm:col-span-2 lg:col-span-1">
            <div className="mb-4 flex items-center gap-3">
              <motion.div
                whileHover={{ rotate: 5, scale: 1.1 }}
                transition={{ type: "spring", stiffness: 300 }}
                className="flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-xl"
                style={{
                  background: "linear-gradient(135deg,rgba(200,169,110,0.15),rgba(168,130,74,0.08))",
                  border: "1px solid rgba(200,169,110,0.28)",
                }}
              >
                <Code2 size={17} strokeWidth={1.8} style={{ color: "#c8a96e" }} />
              </motion.div>
              <div>
                <h3
                  className="text-lg font-bold leading-tight"
                  style={{ fontFamily: F_SANS, letterSpacing: "-0.025em", color: "#0f0f0f" }}
                >
                  {personalInfo.name}
                </h3>
                <p className="text-[10px] font-medium tracking-[0.1em]" style={{ fontFamily: F_MONO, color: "#c8a96e" }}>
                  {personalInfo.title}
                </p>
              </div>
            </div>

            <p className="mb-7 text-sm leading-relaxed" style={{ fontFamily: F_SANS, color: "#6b6b6b" }}>
              {personalInfo.tagline}
            </p>

            <div className="flex flex-col gap-2.5">
              <ContactItem Icon={Mail}  href={`mailto:${personalInfo.email}`}  value={personalInfo.email} label={t("Email", "Email")} />
              <ContactItem Icon={Phone} href={`tel:${personalInfo.phone.replace(/\s/g, "")}`} value={personalInfo.phone} label={t("Telefon", "Phone")} />
              <ContactItem Icon={MapPin} value={personalInfo.location} label={t("Manzil", "Location")} />
            </div>
          </motion.div>

          {/* ── COL 2: Nav + Stack ── */}
          <motion.div variants={vStaggerChild}>
            <SectionLabel>{t("Sahifalar", "Pages")}</SectionLabel>
            <ul className="mt-5 flex flex-col gap-1">
              {navLinks.map((link, i) => (
                <motion.li
                  key={link.id}
                  initial={{ opacity: 0, x: -10 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={VP}
                  transition={{ delay: 0.3 + i * 0.05 }}
                >
                  <a
                    href={`#${link.id}`}
                    className="group flex items-center gap-2 rounded-lg px-3 py-2.5 text-sm font-medium transition-all duration-200 hover:bg-[rgba(200,169,110,0.08)]"
                    style={{ fontFamily: F_SANS, color: "#6b6b6b" }}
                  >
                    <ChevronRight
                      size={13}
                      strokeWidth={2.5}
                      className="flex-shrink-0 transition-transform duration-200 group-hover:translate-x-0.5"
                      style={{ color: "#c8a96e" }}
                    />
                    <span className="group-hover:text-[#0f0f0f] transition-colors">{link.label}</span>
                  </a>
                </motion.li>
              ))}
            </ul>

            <div className="mt-8">
              <SectionLabel>{t("Stack", "Stack")}</SectionLabel>
              <div className="mt-4 flex flex-wrap gap-2">
                {techStack.map((tech, i) => (
                  <motion.div
                    key={tech}
                    initial={{ opacity: 0, scale: 0.8 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    viewport={VP}
                    transition={{ delay: 0.5 + i * 0.1 }}
                  >
                    <TechBadge>{tech}</TechBadge>
                  </motion.div>
                ))}
              </div>
            </div>
          </motion.div>

          {/* ── COL 3: Social ── */}
          <motion.div variants={vStaggerChild}>
            <SectionLabel>{t("Ijtimoiy Tarmoqlar", "Social Media")}</SectionLabel>
            <p className="mt-3 mb-6 text-sm leading-relaxed" style={{ fontFamily: F_SANS, color: "#888" }}>
              {t(
                "Loyihalarim va yangilanishlarni kuzatib boring.",
                "Follow my projects and updates.",
              )}
            </p>
            <div className="flex flex-col gap-2.5">
              {socialLinks.map((item, i) => (
                <motion.div
                  key={item.label}
                  initial={{ opacity: 0, x: 20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={VP}
                  transition={{ delay: 0.5 + i * 0.1 }}
                >
                  <SocialCard {...item} />
                </motion.div>
              ))}
            </div>
          </motion.div>

        </motion.div>

        {/* ══ BOTTOM COPYRIGHT ONLY ══ */}
        <div className="border-t pt-8 pb-6" style={{ borderColor: "rgba(200,169,110,0.15)" }}>
          <FadeIn y={10} delay={300} once={false} threshold={0.06}>
            <motion.div
              whileHover={{ scale: 1.02 }}
              transition={{ type: "spring", stiffness: 200 }}
              className="flex items-center justify-center"
            >
              <p className="text-xs" style={{ fontFamily: F_SANS, color: "#aaa" }}>
                © {new Date().getFullYear()}{" "}
                <span className="font-medium" style={{ color: "#6b6b6b" }}>{personalInfo.name}</span>
              </p>
            </motion.div>
          </FadeIn>
        </div>

      </div>

      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=DM+Sans:wght@300;400;500;600;700;800&family=DM+Mono:wght@400;500&display=swap');

        .ct-shimmer::after {
          content: ''; position: absolute; inset: 0;
          background: linear-gradient(90deg, transparent 0%, rgba(255,255,255,.22) 50%, transparent 100%);
          transform: translateX(-100%); transition: none;
        }
        .ct-shimmer:hover::after { transform: translateX(100%); transition: transform .65s ease; }

        @media (prefers-reduced-motion: reduce) {
          *, *::before, *::after { animation-duration:.01ms!important; transition-duration:.01ms!important; }
        }
      `}</style>
    </footer>
  );
};

/* ── Contact item ── */
const ContactItem = memo(({ Icon, href, value, label }) => {
  const [hov, setHov] = useState(false);
  const inner = (
    <motion.div
      whileHover={{ x: 3 }}
      transition={{ type: "spring", stiffness: 300 }}
      className="flex items-center gap-3 rounded-xl px-3.5 py-2.5 cursor-pointer"
      style={{
        background: hov ? "rgba(200,169,110,0.08)" : "rgba(15,15,15,0.03)",
        border: `1px solid ${hov ? "rgba(200,169,110,0.3)" : "rgba(15,15,15,0.08)"}`,
      }}
      onMouseEnter={() => setHov(true)}
      onMouseLeave={() => setHov(false)}
    >
      <motion.div
        whileHover={{ rotate: 5 }}
        transition={{ type: "spring", stiffness: 300 }}
        className="flex-shrink-0 flex h-7 w-7 items-center justify-center rounded-lg"
        style={{
          background: hov ? "linear-gradient(135deg,#c8a96e,#a8824a)" : "rgba(200,169,110,0.1)",
          border: "1px solid rgba(200,169,110,0.22)",
        }}
      >
        <Icon size={12} strokeWidth={2} style={{ color: hov ? "#fff" : "#c8a96e" }} />
      </motion.div>
      <div className="min-w-0 flex-1">
        <p className="text-[9px] font-semibold uppercase mb-0.5" style={{ fontFamily: F_MONO, color: "#aaa" }}>{label}</p>
        <p className="text-xs truncate" style={{ fontFamily: F_SANS, color: hov ? "#0f0f0f" : "#6b6b6b" }}>
          {value}
        </p>
      </div>
      {href && (
        <motion.div
          animate={{ x: hov ? 1 : 0, y: hov ? -1 : 0 }}
          transition={{ type: "spring", stiffness: 400 }}
        >
          <ArrowUpRight size={12} strokeWidth={2} style={{ color: hov ? "#c8a96e" : "transparent" }} />
        </motion.div>
      )}
    </motion.div>
  );

  if (href) {
    return (
      <a href={href} onMouseEnter={() => setHov(true)} onMouseLeave={() => setHov(false)} className="block">
        {inner}
      </a>
    );
  }
  return inner;
});
ContactItem.displayName = "ContactItem";

/* ── Social card ── */
const SocialCard = memo(({ Icon, href, label, sub }) => {
  const [hov, setHov] = useState(false);
  return (
    <motion.a
      whileHover={{ x: 4 }}
      transition={{ type: "spring", stiffness: 300 }}
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      onMouseEnter={() => setHov(true)}
      onMouseLeave={() => setHov(false)}
      className="flex items-center gap-4 rounded-xl px-4 py-3"
      style={{
        background: hov ? "rgba(200,169,110,0.08)" : "rgba(15,15,15,0.03)",
        border: `1px solid ${hov ? "rgba(200,169,110,0.28)" : "rgba(15,15,15,0.08)"}`,
        boxShadow: hov ? "0 3px 14px rgba(200,169,110,0.1)" : "none",
      }}
    >
      <motion.div
        whileHover={{ rotate: 5, scale: 1.1 }}
        transition={{ type: "spring", stiffness: 300 }}
        className="flex-shrink-0 flex h-9 w-9 items-center justify-center rounded-xl"
        style={{
          background: hov ? "linear-gradient(135deg,#c8a96e,#a8824a)" : "rgba(200,169,110,0.1)",
          border: "1px solid rgba(200,169,110,0.2)",
          boxShadow: hov ? "0 4px 12px rgba(200,169,110,0.25)" : "none",
        }}
      >
        <Icon size={15} strokeWidth={1.8} style={{ color: hov ? "#fff" : "#c8a96e" }} />
      </motion.div>

      <div className="flex-1">
        <p className="text-sm font-semibold" style={{ fontFamily: F_SANS, color: hov ? "#0f0f0f" : "#6b6b6b" }}>
          {label}
        </p>
        <p className="text-[9px] mt-0.5" style={{ fontFamily: F_MONO, color: "#aaa" }}>{sub}</p>
      </div>

      <motion.div
        animate={{ x: hov ? 1 : 0, y: hov ? -1 : 0 }}
        transition={{ type: "spring", stiffness: 400 }}
      >
        <ArrowUpRight size={14} strokeWidth={2} style={{ color: hov ? "#c8a96e" : "transparent" }} />
      </motion.div>
    </motion.a>
  );
});
SocialCard.displayName = "SocialCard";

/* ── Section label ── */
const SectionLabel = ({ children }) => (
  <motion.div
    initial={{ opacity: 0 }}
    whileInView={{ opacity: 1 }}
    viewport={VP}
    transition={{ duration: 0.6 }}
    className="flex items-center gap-2.5"
  >
    <motion.div
      initial={{ scaleX: 0 }}
      whileInView={{ scaleX: 1 }}
      viewport={VP}
      transition={{ duration: 0.5, delay: 0.2 }}
      className="h-px max-w-[20px] flex-1 origin-left"
      style={{ background: "rgba(200,169,110,0.5)" }}
    />
    <span
      className="text-[10px] font-semibold uppercase tracking-[0.18em]"
      style={{ fontFamily: F_MONO, color: "#c8a96e" }}
    >
      {children}
    </span>
    <motion.div
      initial={{ scaleX: 0 }}
      whileInView={{ scaleX: 1 }}
      viewport={VP}
      transition={{ duration: 0.5, delay: 0.3 }}
      className="h-px flex-1 origin-right"
      style={{ background: "rgba(200,169,110,0.2)" }}
    />
  </motion.div>
);

/* ── Tech badge ── */
const TechBadge = ({ children }) => {
  const [hov, setHov] = useState(false);
  return (
    <motion.span
      whileHover={{ scale: 1.1, y: -2 }}
      transition={{ type: "spring", stiffness: 300 }}
      className="inline-block rounded-lg px-2.5 py-1 text-[10px] font-medium transition-all duration-200 cursor-default"
      style={{
        fontFamily: F_MONO,
        background: hov ? "rgba(200,169,110,0.14)" : "rgba(200,169,110,0.07)",
        border: `1px solid ${hov ? "rgba(200,169,110,0.4)" : "rgba(200,169,110,0.18)"}`,
        color: hov ? "#8a6220" : "#9a9a9a",
      }}
      onMouseEnter={() => setHov(true)}
      onMouseLeave={() => setHov(false)}
    >
      {children}
    </motion.span>
  );
};

export default Footer;