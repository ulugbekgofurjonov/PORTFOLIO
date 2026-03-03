import React, { useState, useMemo, useRef, useEffect, memo } from "react";
import { Calendar } from "lucide-react";
import { skills } from "../../data/skills";
import { useLanguage } from "../../contexts/LanguageContext";

/* ── Brand colors ── */
const BRAND = {
  "HTML":         "#E34F26",
  "CSS":          "#1572B6",
  "JavaScript":   "#F0B92A",
  "React":        "#61DAFB",
  "Next.js":      "#111111",
  "Tailwind CSS": "#06B6D4",
  "GitHub":       "#5a5a5a",
  "TypeScript":   "#3178C6",
  "Figma":        "#F24E1E",
  "Git":          "#F05032",
};
const gc = (name) => BRAND[name] || "#c8a96e";

/* ── experience → months ── */
const toMonths = (exp = "") => {
  const s = exp.toLowerCase();
  if (s.includes("oy") || s.includes("month")) { const n = parseInt(s); return isNaN(n) ? 3 : n; }
  if (s.includes("yil") || s.includes("year")) { const n = parseFloat(s); return isNaN(n) ? 12 : Math.round(n * 12); }
  return 3;
};

/* ── Manual proficiency ── */
const PROFICIENCY = {
  "HTML":         100,
  "CSS":          100,
  "JavaScript":   91,
  "React":        90,
  "Next.js":      90,
  "Tailwind CSS": 94,
  "GitHub":       96,
};
const toPct = (name) => PROFICIENCY[name] || 80;

/* ── Reveal ── */
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

const Reveal = memo(({ children, delay = 0, className = "" }) => {
  const [ref, on] = useReveal();
  return (
    <div ref={ref} className={className} style={{
      opacity: 1,
      transform: on ? "translateY(0)" : "translateY(18px)",
      transition: `transform .6s cubic-bezier(.16,1,.3,1) ${delay}ms`,
    }}>
      {children}
    </div>
  );
});

/* ══════════════════════════════════════════════════════
   MAIN
══════════════════════════════════════════════════════ */
export default function Skills() {
  const { language } = useLanguage();
  const list = useMemo(() => skills[language] || [], [language]);
  const uz = language === "uz";
  const t = (u, e) => uz ? u : e;

  return (
    <section id="skills" className="relative w-full overflow-hidden">
      <div className="relative mx-auto max-w-7xl px-5 py-20 sm:px-8 sm:py-28 lg:px-10 lg:py-32">

        {/* ════ HEADER — markazda ════ */}
        <Reveal className="mb-10 sm:mb-12 text-center">

          {/* Eyebrow */}
          <div className="mb-5 flex items-center justify-center gap-3">
            <div className="h-px w-8 bg-[#c8a96e]" />
            <span className="sk-mono text-[11px] font-semibold uppercase tracking-[0.18em] text-[#c8a96e]">
              {t("Ko'nikmalar", "Skills")}
            </span>
            <div className="h-px w-8 bg-[#c8a96e]" />
          </div>

          {/* Main title */}
          <h2 className="sk-sans" style={{
            fontSize: "clamp(2.4rem, 5.5vw, 4.5rem)",
            fontWeight: 800,
            letterSpacing: "-0.04em",
            lineHeight: 1.0,
            color: "#0f0f0f",
          }}>
            {t("Foydalanadigan ", "Tech ")}<span style={{
              background: "linear-gradient(135deg,#c8a96e,#a8824a)",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
            }}>
              {t("Texnologiyalarim", "Stack")}
            </span>
          </h2>

          {/* Subtitle */}
          <p className="sk-sans mx-auto mt-4 max-w-xl text-base leading-relaxed text-[#6b6b6b] sm:text-lg">
            {t(
              "Veb-ishlab chiqishda qo'llaydigan zamonaviy texnologiyalar",
              "Modern technologies I use in web development"
            )}
          </p>
        </Reveal>

        {/* ════ STATS — header tagida markazda ════ */}
        <Reveal delay={80} className="mb-14 sm:mb-16">
          <div className="flex items-center justify-center gap-3 sm:gap-5 flex-wrap">
            {[
              { v: list.length,        l: t("Texnologiya",   "Technologies") },
              { v: t("5 Oy", "5 Mon"), l: t("Max Tajriba",   "Max Exp")      },
              { v: "100%",             l: t("Ishtiyoq",      "Passion")      },
            ].map(({ v, l }, i) => (
              <div key={i} className="sk-stat-pill flex flex-col items-center rounded-2xl px-6 py-4 min-w-[90px]">
                <span className="sk-sans text-2xl font-black text-[#0f0f0f] sm:text-3xl"
                  style={{ letterSpacing: "-0.04em", lineHeight: 1.1 }}>
                  {v}
                </span>
                <span className="sk-mono mt-1 text-[9px] font-semibold uppercase tracking-[0.14em] text-[#9a9a9a] sm:text-[10px]">
                  {l}
                </span>
              </div>
            ))}
          </div>
        </Reveal>

        {/* ════ DIVIDER ════ */}
        <div className="h-px w-full bg-[#e0dbd0]" />

        {/* ════ TICKER LIST ════ */}
        {list.length > 0 ? (
          <div>
            {list.map((skill, i) => (
              <Reveal key={skill.id ?? i} delay={i * 40}>
                <SkillRow skill={skill} index={i} language={language} />
              </Reveal>
            ))}
          </div>
        ) : (
          <div className="py-16 text-center">
            <p className="sk-sans text-[#9a9a9a]">{t("Yuklanmoqda...", "Loading...")}</p>
          </div>
        )}

        {/* ════ BOTTOM DIVIDER ════ */}
        <div className="h-px w-full bg-[#e0dbd0]" />

      </div>

      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=DM+Sans:wght@300;400;500;600;700;800&family=DM+Mono:wght@400;500&display=swap');

        .sk-sans { font-family: 'DM Sans', system-ui, sans-serif; }
        .sk-mono { font-family: 'DM Mono', monospace; }

        /* ── Stat pill ── */
        .sk-stat-pill {
          background: #ffffff;
          border: 1px solid rgba(220,214,203,0.9);
          box-shadow: 0 1px 10px rgba(0,0,0,0.04), inset 0 1px 0 rgba(255,255,255,1);
          transition: border-color .3s, box-shadow .3s, transform .35s cubic-bezier(.34,1.56,.64,1);
        }
        .sk-stat-pill:hover {
          border-color: rgba(200,169,110,0.4);
          box-shadow: 0 8px 28px rgba(200,169,110,0.10);
          transform: translateY(-2px);
        }

        /* ── Row ── */
        .sk-row {
          position: relative;
          display: flex;
          align-items: center;
          padding: 18px 0;
          border-bottom: 1px solid rgba(224,219,208,0.7);
          overflow: hidden;
          cursor: default;
          transition: background .25s ease;
        }
        .sk-row:hover { background: rgba(200,169,110,0.025); }

        /* ── Left accent bar ── */
        .sk-accent-bar {
          position: absolute;
          left: 0; top: 0; bottom: 0;
          width: 3px;
          border-radius: 0 2px 2px 0;
          transform: scaleY(0);
          transform-origin: center;
          transition: transform .35s cubic-bezier(.34,1.56,.64,1);
        }
        .sk-row:hover .sk-accent-bar { transform: scaleY(1); }

        /* ── Icon box ── */
        .sk-row-icon {
          transition: transform .4s cubic-bezier(.34,1.56,.64,1);
        }
        .sk-row:hover .sk-row-icon {
          transform: rotate(-8deg) scale(1.12);
        }

        /* ── Name slide ── */
        .sk-row-name {
          transition: transform .3s cubic-bezier(.16,1,.3,1);
        }
        .sk-row:hover .sk-row-name { transform: translateX(4px); }

        /* ── Signal bars ── */
        .sk-bar {
          width: 5px;
          border-radius: 3px;
          flex-shrink: 0;
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

/* ══════════════════════════════════════════════════════
   SKILL ROW
══════════════════════════════════════════════════════ */
const TOTAL_BARS  = 6;
const BAR_HEIGHTS = [10, 14, 18, 24, 30, 36];

const SkillRow = memo(({ skill, index, language }) => {
  const Icon    = skill.icon;
  const pct     = toPct(skill.name);
  const level   = Math.round((pct / 100) * TOTAL_BARS);
  const color   = gc(skill.name);
  const idx     = String(index + 1).padStart(2, "0");
  const [hovered, setHovered] = useState(false);

  /* bars animate in on scroll */
  const barsRef = useRef(null);
  const [barsOn, setBarsOn] = useState(false);
  useEffect(() => {
    const el = barsRef.current;
    if (!el) return;
    const io = new IntersectionObserver(
      ([e]) => {
        if (e.isIntersecting) {
          setTimeout(() => setBarsOn(true), 60 + index * 30);
          io.disconnect();
        }
      },
      { threshold: 0.05 }
    );
    io.observe(el);
    return () => io.disconnect();
  }, [index]);

  return (
    <div className="sk-row" onMouseEnter={() => setHovered(true)} onMouseLeave={() => setHovered(false)}>
      {/* Brand color left accent bar */}
      <div className="sk-accent-bar" style={{ background: color }} />


      {/* Index */}
      <div className="w-10 flex-shrink-0 pl-3 sm:pl-4">
        <span className="sk-mono text-[11px] font-medium text-[#c8a96e] sm:text-xs">{idx}</span>
      </div>

      {/* Icon */}
      <div className="w-10 flex-shrink-0 sm:w-12">
        <div
          className="sk-row-icon flex h-9 w-9 items-center justify-center rounded-xl sm:h-10 sm:w-10"
          style={{
            background: hovered ? `${color}22` : `${color}10`,
            border: `1px solid ${hovered ? color + "60" : color + "25"}`,
            boxShadow: hovered ? `0 0 12px ${color}30` : "none",
            transition: "background .3s ease, border-color .3s ease, box-shadow .3s ease",
          }}
        >
          {Icon
            ? <Icon size={20} style={{ color }} aria-hidden />
            : <span className="sk-sans text-sm font-bold" style={{ color }}>{skill.name[0]}</span>
          }
        </div>
      </div>

      {/* Name + experience */}
      <div className="flex-1 min-w-0 px-4 sm:px-6">
        <h3
          className="sk-row-name sk-sans text-[15px] font-bold text-[#0f0f0f] sm:text-[17px] lg:text-lg"
          style={{ letterSpacing: "-0.025em", lineHeight: 1.2 }}
        >
          {skill.name}
        </h3>
        <div className="mt-1 flex items-center gap-1.5">
          <Calendar size={10} strokeWidth={2} style={{ color }} />
          <span className="sk-mono text-[10px] text-[#9a9a9a]">{skill.experience}</span>
        </div>
      </div>

      {/* Signal bars + % */}
      <div ref={barsRef} className="flex-shrink-0 flex items-end gap-3 pr-2 sm:pr-4">
        <div className="flex items-end gap-[4px]">
          {Array.from({ length: TOTAL_BARS }, (_, i) => {
            const active = barsOn && i < level;
            return (
              <div
                key={i}
                className="sk-bar"
                style={{
                  height: `${BAR_HEIGHTS[i]}px`,
                  background: active ? color : "rgba(200,169,110,0.12)",
                  border: `1px solid ${active ? color + "55" : "rgba(200,169,110,0.18)"}`,
                  transform: active ? "scaleY(1)" : "scaleY(0.45)",
                  transformOrigin: "bottom",
                  opacity: barsOn ? 1 : 0.25,
                  transition: [
                    `background .35s ease ${i * 55}ms`,
                    `transform .5s cubic-bezier(.34,1.56,.64,1) ${i * 60}ms`,
                    `border-color .35s ease ${i * 55}ms`,
                    `opacity .35s ease ${i * 55}ms`,
                  ].join(", "),
                }}
              />
            );
          })}
        </div>

        <span
          className="sk-mono w-9 text-right text-xs font-bold sm:text-sm"
          style={{ color }}
        >
          {pct}%
        </span>
      </div>
    </div>
  );
});