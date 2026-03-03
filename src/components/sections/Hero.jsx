import { useState, useEffect, useRef, memo } from "react";
import {
  ArrowRight, Download, MousePointer2,
  ChevronDown, Sparkles,
} from "lucide-react";
import { PERSONAL_INFO, STATS } from "../../utils/constants";
import { scrollToSection } from "../../hooks/useScrollSpy";
import { useLanguage } from "../../contexts/LanguageContext";

export default function Hero() {
  const { language } = useLanguage();
  const personalInfo = PERSONAL_INFO[language];
  const stats        = STATS[language];

  const [typed,    setTyped]    = useState("");
  const [done,     setDone]     = useState(false);
  const [blink,    setBlink]    = useState(true);
  const [visible,  setVisible]  = useState(false);

  const fullText = personalInfo.name ?? "Ulugbek Gofurjonov";

  useEffect(() => {
    const t = setTimeout(() => setVisible(true), 80);
    return () => clearTimeout(t);
  }, []);

  useEffect(() => {
    setTyped(""); setDone(false);
    let i = 0;
    const id = setInterval(() => {
      if (i <= fullText.length) { setTyped(fullText.slice(0, i)); i++; }
      else { setDone(true); clearInterval(id); }
    }, 90);
    return () => clearInterval(id);
  }, [fullText]);

  useEffect(() => {
    const id = setInterval(() => setBlink((v) => !v), 520);
    return () => clearInterval(id);
  }, []);

  const ctaLabel  = language === "uz" ? "Bog'lanish"      : "Contact Me";
  const cvLabel   = language === "uz" ? "CV Yuklab olish" : "Download CV";
  const scrollLbl = language === "uz" ? "Ko'proq ko'rish" : "Explore more";

  return (
    <section
      id="hero"
      className="relative min-h-screen w-full overflow-hidden"
      // ← background yo'q: Background component (#faf9f6, grid, glow) dan keladi
    >
      {/* ── Floating decorative blobs (hero ga xos dekor) ── */}
      <Blob
        className="absolute -right-32 top-20 h-[500px] w-[500px] opacity-[0.07]"
        color="#c8a96e"
        blur={80}
      />
      <Blob
        className="absolute -left-48 bottom-10 h-[400px] w-[400px] opacity-[0.05]"
        color="#0f0f0f"
        blur={100}
      />

      {/* ════════════════════════════════════════
          MAIN CONTENT
          ════════════════════════════════════════ */}
      <div
        className={`relative z-10 mx-auto flex min-h-screen max-w-7xl flex-col px-5 pt-24 pb-16 transition-all duration-700 sm:px-8 lg:px-10 lg:pt-28 ${
          visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
        }`}
      >
        {/* ── Status badge ── */}
        <div
          className="mb-10 self-start"
          style={{ animation: "fadeSlideUp 0.6s ease both" }}
        >
          <span
            className="inline-flex items-center gap-2 rounded-full border border-[#e0dbd0] bg-white/80 px-4 py-1.5 shadow-sm"
            style={{ backdropFilter: "blur(8px)" }}
          >
            <span className="relative flex h-2 w-2">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-60" />
              <span className="relative inline-flex h-2 w-2 rounded-full bg-emerald-500" />
            </span>
            <span
              className="text-[11px] font-medium tracking-widest text-[#6b6b6b] uppercase"
              style={{ fontFamily: "'DM Mono', monospace" }}
            >
              {language === "uz" ? "Ishga tayyor" : "Available for work"}
            </span>
          </span>
        </div>

        {/* ── SPLIT LAYOUT ── */}
        <div className="flex flex-1 flex-col gap-12 lg:flex-row lg:items-center lg:gap-16 xl:gap-24">

          {/* ════ LEFT COLUMN ════ */}
          <div className="flex-1">

            <div
              className="mb-5 flex items-center gap-3"
              style={{ animation: "fadeSlideUp 0.6s ease 0.08s both" }}
            >
              <div className="h-px w-8 bg-[#c8a96e]" />
              <span
                className="text-[11px] font-semibold uppercase tracking-[0.18em] text-[#c8a96e]"
                style={{ fontFamily: "'DM Mono', monospace" }}
              >
                Frontend Developer
              </span>
            </div>

            <h1
              className="relative mb-6 text-left"
              style={{
                fontFamily: "'DM Sans', system-ui, sans-serif",
                fontSize: "clamp(3rem, 8vw, 6rem)",
                fontWeight: 800,
                letterSpacing: "-0.035em",
                lineHeight: 1.05,
                color: "#0f0f0f",
                animation: "fadeSlideUp 0.65s ease 0.12s both",
              }}
            >
              {typed}
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
              <span
                className="absolute bottom-[-6px] left-0 h-[3px] rounded-full"
                style={{
                  width: done ? "min(200px, 40%)" : "0px",
                  background: "linear-gradient(90deg, #c8a96e, #a8824a, transparent)",
                  transition: "width 0.9s cubic-bezier(0.34,1.56,0.64,1)",
                }}
              />
            </h1>

            <p
              className="mb-8 max-w-lg text-base leading-relaxed text-[#6b6b6b] sm:text-lg"
              style={{
                fontFamily: "'DM Sans', system-ui, sans-serif",
                animation: "fadeSlideUp 0.65s ease 0.18s both",
              }}
            >
              {personalInfo.tagline ?? "Crafting fast, beautiful & accessible digital experiences with modern web technologies."}
            </p>

            <div
              className="flex flex-wrap gap-3"
              style={{ animation: "fadeSlideUp 0.65s ease 0.24s both" }}
            >
              <PrimaryBtn onClick={() => scrollToSection("contact")}>
                <MousePointer2 size={15} strokeWidth={2} />
                {ctaLabel}
                <ArrowRight size={14} strokeWidth={2.5} className="opacity-60 group-hover:opacity-100 group-hover:translate-x-0.5 transition-all duration-200" />
              </PrimaryBtn>

              <SecondaryBtn onClick={() => {
                const a = Object.assign(document.createElement("a"), {
                  href: "/resume.pdf",
                  download: "Ulugbek_Gofurjonov_Resume.pdf",
                });
                document.body.appendChild(a); a.click(); document.body.removeChild(a);
              }}>
                <Download size={14} strokeWidth={2} style={{ color: "#c8a96e" }} className="group-hover:-translate-y-0.5 transition-transform duration-200" />
                {cvLabel}
              </SecondaryBtn>
            </div>
          </div>

          {/* ════ RIGHT COLUMN ════ */}
          <div
            className="flex w-full flex-col gap-4 lg:w-[340px] xl:w-[380px]"
            style={{ animation: "fadeSlideUp 0.7s ease 0.28s both" }}
          >
            {/* Profile glass card */}
            <div className="glass-card group relative overflow-hidden rounded-2xl p-6">
              <div
                className="absolute inset-x-0 top-0 h-[2px] rounded-t-2xl"
                style={{ background: "linear-gradient(90deg, #c8a96e, #a8824a, transparent)" }}
              />
              <div className="mb-4 flex items-start justify-between">
                <div>
                  <p
                    className="mb-1 text-[10px] font-semibold uppercase tracking-[0.16em] text-[#c8a96e]"
                    style={{ fontFamily: "'DM Mono', monospace" }}
                  >
                    {language === "uz" ? "Profil" : "Profile"}
                  </p>
                  <p
                    className="text-lg font-bold text-[#0f0f0f]"
                    style={{ fontFamily: "'DM Sans', system-ui, sans-serif", letterSpacing: "-0.02em" }}
                  >
                    {personalInfo.name ?? "Ulugbek"}
                  </p>
                </div>
                <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-[#0f0f0f]">
                  <Sparkles size={16} strokeWidth={1.8} className="text-white" />
                </span>
              </div>

              {[
                { key: language === "uz" ? "Mutaxassislik" : "Specialty", val: "Frontend Development" },
                { key: language === "uz" ? "Joylashuv"    : "Location",  val: personalInfo.location ?? "Uzbekistan" },
                { key: language === "uz" ? "Holat"        : "Status",    val: language === "uz" ? "Ochiq" : "Open to work", gold: true },
              ].map(({ key, val, gold }) => (
                <div key={key} className="flex items-center justify-between border-t border-[#ede8e0] py-2.5">
                  <span className="text-xs text-[#9a9a9a]" style={{ fontFamily: "'DM Mono', monospace" }}>
                    {key}
                  </span>
                  <span
                    className="text-right text-sm font-medium"
                    style={{ fontFamily: "'DM Sans', system-ui, sans-serif", color: gold ? "#c8a96e" : "#3a3a3a" }}
                  >
                    {val}
                  </span>
                </div>
              ))}
            </div>

            {/* Stats */}
            <div className="grid grid-cols-3 gap-3">
              {stats.map((s, i) => <StatChip key={i} stat={s} delay={i * 60} />)}
            </div>

            {/* Tech stack */}
            <div className="glass-card rounded-2xl p-4">
              <p
                className="mb-3 text-[10px] font-semibold uppercase tracking-[0.16em] text-[#9a9a9a]"
                style={{ fontFamily: "'DM Mono', monospace" }}
              >
                {language === "uz" ? "Texnologiyalar" : "Tech Stack"}
              </p>
              <div className="flex flex-wrap gap-2">
                {["React", "Next.js", "TypeScript", "Tailwind", "Figma", "Git"].map((t) => (
                  <span
                    key={t}
                    className="rounded-lg border border-[#e0dbd0] bg-white/70 px-2.5 py-1 text-[11px] font-medium text-[#5a5a5a] transition-all duration-200 hover:border-[#c8a96e]/40 hover:text-[#0f0f0f]"
                    style={{ fontFamily: "'DM Mono', monospace" }}
                  >
                    {t}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* ── Scroll indicator ── */}
        <div
          className="mt-12 self-center"
          style={{ animation: "fadeSlideUp 0.65s ease 0.5s both" }}
        >
          <button
            onClick={() => scrollToSection("about")}
            className="cursor-pointer group flex flex-col items-center gap-2 opacity-40 transition-opacity duration-300 hover:opacity-80 focus:outline-none"
          >
            <span
              className="text-[10px] font-semibold uppercase tracking-[0.2em] text-[#9a9a9a]"
              style={{ fontFamily: "'DM Mono', monospace" }}
            >
              {scrollLbl}
            </span>
            <div className="relative h-8 w-5 overflow-hidden rounded-full border border-[#ddd8cf]">
              <div
                className="absolute left-1/2 -translate-x-1/2 top-1.5 h-1.5 w-1.5 rounded-full bg-[#c8a96e]"
                style={{ animation: "scrollPill 2s ease-in-out infinite" }}
              />
            </div>
          </button>
        </div>
      </div>

      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=DM+Sans:ital,wght@0,300;0,400;0,500;0,600;0,700;0,800;1,400&family=DM+Mono:wght@400;500&display=swap');

        .glass-card {
          background: rgba(255,255,255,0.65);
          border: 1px solid rgba(224,219,208,0.9);
          box-shadow: 0 2px 16px rgba(0,0,0,0.05), inset 0 1px 0 rgba(255,255,255,0.9);
          backdrop-filter: blur(20px);
          -webkit-backdrop-filter: blur(20px);
          transition: border-color .3s, box-shadow .3s, transform .3s;
        }
        .glass-card:hover {
          border-color: rgba(200,169,110,0.3);
          box-shadow: 0 8px 32px rgba(200,169,110,0.1), inset 0 1px 0 rgba(255,255,255,0.9);
          transform: translateY(-2px);
        }

        @keyframes fadeSlideUp {
          from { opacity: 0; transform: translateY(18px); }
          to   { opacity: 1; transform: translateY(0); }
        }

        @keyframes scrollPill {
          0%   { top: 6px;  opacity: 1; }
          80%  { top: 20px; opacity: 0; }
          81%  { top: 6px;  opacity: 0; }
          100% { top: 6px;  opacity: 1; }
        }

        @keyframes chipIn {
          from { opacity: 0; transform: scale(0.88); }
          to   { opacity: 1; transform: scale(1); }
        }

        @media (prefers-reduced-motion: reduce) {
          *, *::before, *::after {
            animation-duration: .01ms !important;
            transition-duration: .01ms !important;
          }
        }
      `}</style>
    </section>
  );
}

/* ── Sub-components ── */

const Blob = memo(({ className, color, blur }) => (
  <div
    aria-hidden
    className={`pointer-events-none rounded-full ${className}`}
    style={{ background: color, filter: `blur(${blur}px)` }}
  />
));

const PrimaryBtn = memo(({ children, onClick }) => (
  <button
    onClick={onClick}
    className="cursor-pointer group relative flex items-center gap-2 overflow-hidden rounded-xl bg-[#0f0f0f] px-6 py-3 text-sm font-semibold text-white shadow-[0_4px_18px_rgba(0,0,0,0.2)] transition-all duration-300 hover:-translate-y-0.5 hover:bg-[#1a1a1a] hover:shadow-[0_10px_32px_rgba(0,0,0,0.25)] active:translate-y-0 sm:px-7 sm:py-3.5"
    style={{ fontFamily: "'DM Sans', system-ui, sans-serif" }}
  >
    <span className="absolute inset-0 -translate-x-full skew-x-[-12deg] bg-gradient-to-r from-transparent via-white/12 to-transparent transition-transform duration-500 group-hover:translate-x-full" />
    {children}
  </button>
));

const SecondaryBtn = memo(({ children, onClick }) => (
  <button
    onClick={onClick}
    className="cursor-pointer group relative flex items-center gap-2 overflow-hidden rounded-xl border border-[#e0dbd0] bg-white/70 px-6 py-3 text-sm font-semibold text-[#0f0f0f] shadow-[0_2px_10px_rgba(0,0,0,0.04),inset_0_1px_0_rgba(255,255,255,0.9)] transition-all duration-300 hover:-translate-y-0.5 hover:border-[#c8a96e]/40 hover:shadow-[0_6px_24px_rgba(200,169,110,0.14)] active:translate-y-0 sm:px-7 sm:py-3.5"
    style={{ fontFamily: "'DM Sans', system-ui, sans-serif", backdropFilter: "blur(10px)" }}
  >
    <span className="absolute inset-0 -translate-x-full skew-x-[-12deg] bg-gradient-to-r from-transparent via-[#c8a96e]/8 to-transparent transition-transform duration-500 group-hover:translate-x-full" />
    {children}
  </button>
));

const StatChip = memo(({ stat, delay }) => (
  <div
    className="glass-card flex flex-col items-center justify-center rounded-xl p-3 text-center"
    style={{ animation: `chipIn 0.5s cubic-bezier(0.34,1.56,0.64,1) ${delay + 320}ms both` }}
  >
    <span
      className="block font-black leading-tight text-[#0f0f0f]"
      style={{ fontFamily: "'DM Sans', system-ui, sans-serif", fontSize: "clamp(1.2rem, 3.5vw, 1.6rem)", letterSpacing: "-0.03em" }}
    >
      {stat.value}
    </span>
    <span
      className="mt-0.5 block text-center text-[#9a9a9a]"
      style={{ fontFamily: "'DM Mono', monospace", fontSize: "clamp(7px, 1.4vw, 9.5px)", fontWeight: 500, textTransform: "uppercase", letterSpacing: "0.1em" }}
    >
      {stat.label}
    </span>
  </div>
));