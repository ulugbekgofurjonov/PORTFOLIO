import React, { useState, memo } from "react";
import { Github, Instagram, Send, Mail, MapPin, Phone, Download, ArrowUpRight, Code2, ChevronRight } from "lucide-react";
import { PERSONAL_INFO, SOCIAL_LINKS, NAV_LINKS } from "../../utils/constants";
import { useLanguage } from "../../contexts/LanguageContext";

const Footer = () => {
  const { language } = useLanguage();
  const personalInfo = PERSONAL_INFO[language];
  const navLinks     = NAV_LINKS[language];
  const t = (u, e)   => language === "uz" ? u : e;

  const socialLinks = [
    { Icon: Github,    href: SOCIAL_LINKS.github,    label: "GitHub",    color: "#c8a96e" },
    { Icon: Send,      href: SOCIAL_LINKS.telegram,  label: "Telegram",  color: "#39a3d4" },
    { Icon: Instagram, href: SOCIAL_LINKS.instagram, label: "Instagram", color: "#e4405f" },
  ];

  const techStack = ["React.js", "Next.js", "Tailwind CSS", "TypeScript"];

  return (
    <footer
      className="relative w-full overflow-hidden"
      style={{ background: "#faf9f6", color: "#0f0f0f" }}
    >
      {/* ── Decorative top border ── */}
      <div
        className="absolute top-0 left-0 right-0 h-[1px]"
        style={{ background: "linear-gradient(90deg, transparent 0%, rgba(200,169,110,0.5) 30%, rgba(200,169,110,0.85) 50%, rgba(200,169,110,0.5) 70%, transparent 100%)" }}
      />

      {/* ── Ambient glow ── */}
      <div
        className="pointer-events-none absolute -top-40 left-1/2 -translate-x-1/2 h-[400px] w-[700px] rounded-full"
        style={{ background: "radial-gradient(ellipse, rgba(200,169,110,0.09) 0%, transparent 70%)" }}
      />
      <div
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
        <div
          className="relative overflow-hidden rounded-2xl px-6 py-8 sm:px-10 sm:py-10 lg:py-12"
          style={{
            background: "linear-gradient(135deg, rgba(200,169,110,0.1) 0%, rgba(168,130,74,0.05) 50%, rgba(200,169,110,0.08) 100%)",
            border: "1px solid rgba(200,169,110,0.22)",
            marginTop: "60px",
          }}
        >
          {/* Inner glow */}
          <div
            className="pointer-events-none absolute -top-10 -right-10 h-[220px] w-[220px] rounded-full"
            style={{ background: "radial-gradient(circle, rgba(200,169,110,0.1) 0%, transparent 70%)" }}
          />

          <div className="relative flex flex-col items-center justify-between gap-6 text-center sm:gap-8 lg:flex-row lg:text-left">
            <div className="max-w-xl">
              <p className="ft-mono mb-2 text-[10px] font-semibold uppercase tracking-[0.2em] text-[#c8a96e]">
                {t("Hamkorlik", "Collaboration")}
              </p>
              <h2
                className="ft-sans mb-2 text-2xl font-bold sm:text-3xl lg:text-4xl text-[#0f0f0f]"
                style={{ letterSpacing: "-0.035em", lineHeight: 1.1 }}
              >
                {t("Loyiha g'oyangiz bormi?", "Do you have a project idea?")}
              </h2>
              <p className="ft-sans text-sm leading-relaxed sm:text-base text-[#6b6b6b]">
                {t(
                  "G'oyangizni haqiqatga aylantirish uchun men bilan bog'laning! Tez orada sizga javob beraman.",
                  "Contact me to turn your idea into reality! I will get back to you soon.",
                )}
              </p>
            </div>

            <div className="flex flex-col items-center gap-3 sm:flex-row lg:flex-shrink-0">
              {/* Primary CTA — gold gradient */}
              <a
                href="#contact"
                className="ft-sans group relative flex items-center gap-2 overflow-hidden rounded-xl px-6 py-3.5 text-sm font-bold text-white transition-all duration-300 hover:scale-[1.03] active:scale-[0.97]"
                style={{
                  background: "linear-gradient(135deg,#c8a96e,#d4b478,#a8824a)",
                  boxShadow: "0 4px 20px rgba(200,169,110,0.4), inset 0 1px 0 rgba(255,255,255,0.2)",
                }}
              >
                <span className="pointer-events-none absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-white/20 to-transparent transition-transform duration-700 group-hover:translate-x-full" />
                <Mail size={15} strokeWidth={2.5} />
                <span>{t("Bog'lanish", "Get in Touch")}</span>
                <ArrowUpRight size={14} strokeWidth={2.5} className="transition-transform duration-200 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
              </a>

              {/* Secondary — ghost dark */}
              <a
                href={personalInfo.resume}
                download
                className="ft-sans group flex items-center gap-2 rounded-xl px-6 py-3.5 text-sm font-semibold transition-all duration-300 hover:scale-[1.03] active:scale-[0.97]"
                style={{
                  background: "rgba(15,15,15,0.06)",
                  border: "1px solid rgba(15,15,15,0.15)",
                  color: "rgba(15,15,15,0.7)",
                }}
              >
                <Download size={14} strokeWidth={2} />
                <span>{t("Resume", "Resume")}</span>
              </a>
            </div>
          </div>
        </div>

        {/* ══════════════════════════════
            MAIN 3-COL GRID
        ══════════════════════════════ */}
        <div className="mt-14 sm:mt-18 grid grid-cols-1 gap-10 sm:grid-cols-2 lg:grid-cols-3 lg:gap-14 xl:gap-20 pb-14 sm:pb-18 lg:pb-20">

          {/* ── COL 1: Brand ── */}
          <div className="sm:col-span-2 lg:col-span-1">
            <div className="mb-4 flex items-center gap-3">
              <div
                className="flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-xl"
                style={{
                  background: "linear-gradient(135deg,rgba(200,169,110,0.15),rgba(168,130,74,0.08))",
                  border: "1px solid rgba(200,169,110,0.28)",
                }}
              >
                <Code2 size={17} strokeWidth={1.8} style={{ color: "#c8a96e" }} />
              </div>
              <div>
                <h3
                  className="ft-sans text-lg font-bold leading-tight text-[#0f0f0f]"
                  style={{ letterSpacing: "-0.025em" }}
                >
                  {personalInfo.name}
                </h3>
                <p className="ft-mono text-[10px] font-medium tracking-[0.1em]" style={{ color: "#c8a96e" }}>
                  {personalInfo.title}
                </p>
              </div>
            </div>

            <p className="ft-sans mb-7 text-sm leading-relaxed text-[#6b6b6b]">
              {personalInfo.tagline}
            </p>

            <div className="flex flex-col gap-2.5">
              <ContactItem Icon={Mail}  href={`mailto:${personalInfo.email}`}  value={personalInfo.email} />
              <ContactItem Icon={Phone} href={`tel:${personalInfo.phone.replace(/\s/g, "")}`} value={personalInfo.phone} />
              <ContactItem Icon={MapPin} value={personalInfo.location} />
            </div>
          </div>

          {/* ── COL 2: Nav + Stack ── */}
          <div>
            <SectionLabel>{t("Sahifalar", "Pages")}</SectionLabel>
            <ul className="mt-5 flex flex-col gap-1">
              {navLinks.map(link => (
                <li key={link.id}>
                  <a
                    href={`#${link.id}`}
                    className="ft-sans group flex items-center gap-2 rounded-lg px-3 py-2.5 text-sm font-medium text-[#6b6b6b] transition-all duration-200 hover:bg-[rgba(200,169,110,0.08)] hover:text-[#0f0f0f]"
                  >
                    <ChevronRight
                      size={13}
                      strokeWidth={2.5}
                      className="flex-shrink-0 transition-transform duration-200 group-hover:translate-x-0.5"
                      style={{ color: "#c8a96e" }}
                    />
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>

            <div className="mt-8">
              <SectionLabel>{t("Stack", "Stack")}</SectionLabel>
              <div className="mt-4 flex flex-wrap gap-2">
                {techStack.map(tech => (
                  <TechBadge key={tech}>{tech}</TechBadge>
                ))}
              </div>
            </div>
          </div>

          {/* ── COL 3: Social ── */}
          <div>
            <SectionLabel>{t("Ijtimoiy Tarmoqlar", "Social Media")}</SectionLabel>
            <p className="ft-sans mt-3 mb-6 text-sm leading-relaxed text-[#888]">
              {t(
                "Loyihalarim va yangilanishlarni kuzatib boring.",
                "Follow my projects and updates.",
              )}
            </p>
            <div className="flex flex-col gap-2.5">
              {socialLinks.map(({ Icon, href, label, color }) => (
                <SocialCard key={label} Icon={Icon} href={href} label={label} color={color} />
              ))}
            </div>
          </div>

        </div>

        {/* ══ BOTTOM THIN LINE + copyright only ══ */}
        <div
          className="flex items-center justify-center border-t py-6"
          style={{ borderColor: "rgba(200,169,110,0.15)" }}
        >
          <p className="ft-sans text-xs text-[#aaa]">
            © {new Date().getFullYear()}{" "}
            <span className="text-[#6b6b6b] font-medium">{personalInfo.name}</span>
          </p>
        </div>

      </div>

      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=DM+Sans:wght@300;400;500;600;700;800&family=DM+Mono:wght@400;500&display=swap');
        .ft-sans { font-family: 'DM Sans', system-ui, sans-serif; }
        .ft-mono { font-family: 'DM Mono', monospace; }
        @media (prefers-reduced-motion: reduce) {
          *, *::before, *::after { animation-duration:.01ms!important; transition-duration:.01ms!important; }
        }
      `}</style>
    </footer>
  );
};

/* ── Contact item ── */
const ContactItem = memo(({ Icon, href, value }) => {
  const [hov, setHov] = useState(false);
  const inner = (
    <div
      className="flex items-center gap-3 rounded-xl px-3.5 py-2.5 transition-all duration-200"
      style={{
        background: hov ? "rgba(200,169,110,0.08)" : "rgba(15,15,15,0.03)",
        border: `1px solid ${hov ? "rgba(200,169,110,0.3)" : "rgba(15,15,15,0.08)"}`,
        transform: hov ? "translateX(3px)" : "none",
      }}
      onMouseEnter={() => setHov(true)}
      onMouseLeave={() => setHov(false)}
    >
      <div
        className="flex-shrink-0 flex h-7 w-7 items-center justify-center rounded-lg transition-all duration-200"
        style={{
          background: hov ? "linear-gradient(135deg,#c8a96e,#a8824a)" : "rgba(200,169,110,0.1)",
          border: "1px solid rgba(200,169,110,0.22)",
        }}
      >
        <Icon size={12} strokeWidth={2} style={{ color: hov ? "#fff" : "#c8a96e" }} />
      </div>
      <span
        className="ft-sans min-w-0 truncate text-xs sm:text-[13px] transition-colors duration-200"
        style={{ color: hov ? "#0f0f0f" : "#6b6b6b" }}
      >
        {value}
      </span>
      {href && (
        <ArrowUpRight
          size={12} strokeWidth={2}
          className="ml-auto flex-shrink-0 transition-all duration-200"
          style={{
            color: hov ? "#c8a96e" : "transparent",
            transform: hov ? "translate(1px,-1px)" : "none",
          }}
        />
      )}
    </div>
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
const SocialCard = memo(({ Icon, href, label, color }) => {
  const [hov, setHov] = useState(false);
  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      onMouseEnter={() => setHov(true)}
      onMouseLeave={() => setHov(false)}
      className="group flex items-center gap-4 rounded-xl px-4 py-3 transition-all duration-200"
      style={{
        background: hov ? "rgba(200,169,110,0.08)" : "rgba(15,15,15,0.03)",
        border: `1px solid ${hov ? "rgba(200,169,110,0.28)" : "rgba(15,15,15,0.08)"}`,
        transform: hov ? "translateX(4px)" : "none",
        boxShadow: hov ? "0 3px 14px rgba(200,169,110,0.1)" : "none",
      }}
    >
      <div
        className="flex-shrink-0 flex h-9 w-9 items-center justify-center rounded-xl transition-all duration-200"
        style={{
          background: hov ? "linear-gradient(135deg,#c8a96e,#a8824a)" : "rgba(200,169,110,0.1)",
          border: "1px solid rgba(200,169,110,0.2)",
          boxShadow: hov ? "0 4px 12px rgba(200,169,110,0.25)" : "none",
        }}
      >
        <Icon size={15} strokeWidth={1.8} style={{ color: hov ? "#fff" : "#c8a96e" }} className="transition-transform duration-200 group-hover:scale-110" />
      </div>

      <span
        className="ft-sans text-sm font-semibold flex-1 transition-colors duration-200"
        style={{ color: hov ? "#0f0f0f" : "#6b6b6b" }}
      >
        {label}
      </span>

      <ArrowUpRight
        size={14} strokeWidth={2}
        className="flex-shrink-0 transition-all duration-200"
        style={{
          color: hov ? "#c8a96e" : "transparent",
          transform: hov ? "translate(1px,-1px)" : "none",
        }}
      />
    </a>
  );
});
SocialCard.displayName = "SocialCard";

/* ── Section label ── */
const SectionLabel = ({ children }) => (
  <div className="flex items-center gap-2.5">
    <div className="h-px max-w-[20px] flex-1" style={{ background: "rgba(200,169,110,0.5)" }} />
    <span
      className="ft-mono text-[10px] font-semibold uppercase tracking-[0.18em]"
      style={{ color: "#c8a96e" }}
    >
      {children}
    </span>
    <div className="h-px flex-1" style={{ background: "rgba(200,169,110,0.2)" }} />
  </div>
);

/* ── Tech badge ── */
const TechBadge = ({ children }) => {
  const [hov, setHov] = useState(false);
  return (
    <span
      className="ft-mono cursor-default rounded-lg px-2.5 py-1 text-[10px] font-medium transition-all duration-200"
      style={{
        background: hov ? "rgba(200,169,110,0.14)" : "rgba(200,169,110,0.07)",
        border: `1px solid ${hov ? "rgba(200,169,110,0.4)" : "rgba(200,169,110,0.18)"}`,
        color: hov ? "#8a6220" : "#9a9a9a",
      }}
      onMouseEnter={() => setHov(true)}
      onMouseLeave={() => setHov(false)}
    >
      {children}
    </span>
  );
};

export default Footer;