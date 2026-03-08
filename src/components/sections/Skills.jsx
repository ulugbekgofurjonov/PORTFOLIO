import { useState, useMemo, useRef, useEffect, memo } from "react";
import { motion } from "framer-motion";
import { Calendar } from "lucide-react";
import { skills } from "../../data/skills";
import { useLanguage } from "../../contexts/LanguageContext";
import FadeIn, { EASE } from "../animations/FadeIn";

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

/* ── Variants ── */
const vStaggerWrap = {
  hidden:  {},
  visible: { transition: { staggerChildren: 0.09, delayChildren: 0.04 } },
};

const vStaggerChild = {
  hidden:  { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: [0.16, 1, 0.3, 1] } },
};

const vScaleStat = {
  hidden:  { opacity: 0, scale: 0.85, y: 14 },
  visible: (i) => ({
    opacity: 1, scale: 1, y: 0,
    transition: { duration: 0.55, ease: [0.34, 1.56, 0.64, 1], delay: i * 0.08 },
  }),
};

const VP    = { once: false, amount: 0.2  };
const VP_SM = { once: false, amount: 0.06 };

/* ══════════════════════════════════════════════
   MAIN
══════════════════════════════════════════════ */
export default function Skills() {
  const { language } = useLanguage();
  const list = useMemo(() => skills[language] || [], [language]);
  const uz = language === "uz";
  const t  = (u, e) => uz ? u : e;

  const stats = [
    { v: list.length,        l: t("Texnologiya",   "Technologies") },
    { v: t("5 Oy", "5 Mon"), l: t("Max Tajriba",   "Max Exp")      },
    { v: "100%",             l: t("Ishtiyoq",      "Passion")      },
  ];

  return (
    <section id="skills" className="relative w-full overflow-hidden">
      <div className="relative mx-auto max-w-7xl px-5 py-20 sm:px-8 sm:py-28 lg:px-10 lg:py-32">

        {/* ════ HEADER ════ */}
        <motion.div
          className="mb-10 sm:mb-12 text-center"
          variants={vStaggerWrap}
          initial="hidden"
          whileInView="visible"
          viewport={VP}
        >
          <motion.div variants={vStaggerChild} className="mb-5 flex items-center justify-center gap-3">
            <motion.div
              className="h-px bg-[#c8a96e]"
              initial={{ width: 0 }}
              whileInView={{ width: 32 }}
              viewport={VP}
              transition={{ duration: 0.55, ease: [0.16, 1, 0.3, 1] }}
            />
            <span className="sk-mono text-[11px] font-semibold uppercase tracking-[0.18em] text-[#c8a96e]">
              {t("Ko'nikmalar", "Skills")}
            </span>
            <motion.div
              className="h-px bg-[#c8a96e]"
              initial={{ width: 0 }}
              whileInView={{ width: 32 }}
              viewport={VP}
              transition={{ duration: 0.55, ease: [0.16, 1, 0.3, 1], delay: 0.07 }}
            />
          </motion.div>

          <motion.h2
            variants={vStaggerChild}
            className="sk-sans"
            style={{
              fontSize: "clamp(2.4rem,5.5vw,4.5rem)",
              fontWeight: 800, letterSpacing: "-0.04em", lineHeight: 1.0, color: "#0f0f0f",
            }}
          >
            {t("Foydalanadigan ", "Tech ")}
            <span style={{
              background: "linear-gradient(135deg,#c8a96e,#a8824a)",
              WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent",
            }}>
              {t("Texnologiyalarim", "Stack")}
            </span>
          </motion.h2>

          <motion.p
            variants={vStaggerChild}
            className="sk-sans mx-auto mt-4 max-w-xl text-base leading-relaxed text-[#6b6b6b] sm:text-lg"
          >
            {t(
              "Veb-ishlab chiqishda qo'llaydigan zamonaviy texnologiyalar",
              "Modern technologies I use in web development"
            )}
          </motion.p>
        </motion.div>

        {/* ════ STATS — har doim 3 kolonna ════ */}
        <FadeIn delay={0} duration={500} y={16} ease={EASE.smooth} once={false} threshold={0.1}>
          <motion.div
            className="mb-14 sm:mb-16 grid grid-cols-3 gap-3 sm:gap-4 max-w-sm mx-auto sm:max-w-md"
            variants={{ hidden: {}, visible: { transition: { staggerChildren: 0.1 } } }}
            initial="hidden"
            whileInView="visible"
            viewport={VP}
          >
            {stats.map(({ v, l }, i) => (
              <motion.div
                key={i}
                className="sk-stat-pill flex flex-col items-center rounded-2xl px-3 py-4 sm:px-6"
                variants={vScaleStat}
                custom={i}
                whileHover={{ y: -3, transition: { duration: 0.28, ease: [0.34, 1.56, 0.64, 1] } }}
              >
                <span
                  className="sk-sans font-black text-[#0f0f0f]"
                  style={{
                    fontSize: "clamp(1.2rem, 5vw, 1.75rem)",
                    letterSpacing: "-0.04em",
                    lineHeight: 1.1,
                  }}
                >
                  {v}
                </span>
                <span className="sk-mono mt-1 text-center text-[8px] font-semibold uppercase tracking-[0.12em] text-[#9a9a9a] sm:text-[10px]">
                  {l}
                </span>
              </motion.div>
            ))}
          </motion.div>
        </FadeIn>

        {/* ════ TOP DIVIDER ════ */}
        <motion.div
          className="h-px w-full bg-[#e0dbd0]"
          initial={{ scaleX: 0, originX: 0 }}
          whileInView={{ scaleX: 1 }}
          viewport={VP}
          transition={{ duration: 0.75, ease: [0.16, 1, 0.3, 1] }}
        />

        {/* ════ SKILL ROWS ════ */}
        <div>
          {list.length > 0 ? list.map((skill, i) => (
            <FadeIn
              key={skill.id ?? i}
              delay={i * 45}
              duration={580}
              y={18}
              ease={EASE.smooth}
              once={false}
              threshold={0.04}
            >
              <SkillRow skill={skill} index={i} />
            </FadeIn>
          )) : (
            <div className="py-16 text-center">
              <p className="sk-sans text-[#9a9a9a]">{t("Yuklanmoqda...", "Loading...")}</p>
            </div>
          )}
        </div>

        {/* ════ BOTTOM DIVIDER ════ */}
        <motion.div
          className="h-px w-full bg-[#e0dbd0]"
          initial={{ scaleX: 0, originX: 0 }}
          whileInView={{ scaleX: 1 }}
          viewport={VP}
          transition={{ duration: 0.75, ease: [0.16, 1, 0.3, 1] }}
        />

      </div>

      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=DM+Sans:wght@300;400;500;600;700;800&family=DM+Mono:wght@400;500&display=swap');

        .sk-sans { font-family: 'DM Sans', system-ui, sans-serif; }
        .sk-mono { font-family: 'DM Mono', monospace; }

        .sk-stat-pill {
          background: #ffffff;
          border: 1px solid rgba(220,214,203,0.9);
          box-shadow: 0 1px 10px rgba(0,0,0,0.04), inset 0 1px 0 rgba(255,255,255,1);
          transition: border-color .3s, box-shadow .3s;
        }
        .sk-stat-pill:hover {
          border-color: rgba(200,169,110,0.4);
          box-shadow: 0 8px 28px rgba(200,169,110,0.10);
        }

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

        .sk-accent-bar {
          position: absolute; left: 0; top: 0; bottom: 0;
          width: 3px; border-radius: 0 2px 2px 0;
          transform: scaleY(0); transform-origin: center;
          transition: transform .35s cubic-bezier(.34,1.56,.64,1);
        }
        .sk-row:hover .sk-accent-bar { transform: scaleY(1); }

        .sk-row-name { transition: transform .3s cubic-bezier(.16,1,.3,1); }
        .sk-row:hover .sk-row-name { transform: translateX(4px); }

        .sk-bar { width: 5px; border-radius: 3px; flex-shrink: 0; }

        @media (prefers-reduced-motion: reduce) {
          *, *::before, *::after { animation-duration:.01ms !important; transition-duration:.01ms !important; }
        }
      `}</style>
    </section>
  );
}

/* ══════════════════════════════════════════════
   SKILL ROW
══════════════════════════════════════════════ */
const TOTAL_BARS  = 6;
const BAR_HEIGHTS = [10, 14, 18, 24, 30, 36];

const SkillRow = memo(({ skill, index }) => {
  const Icon    = skill.icon;
  const pct     = toPct(skill.name);
  const level   = Math.round((pct / 100) * TOTAL_BARS);
  const color   = gc(skill.name);
  const idx     = String(index + 1).padStart(2, "0");

  const barsRef = useRef(null);
  const [barsOn, setBarsOn] = useState(false);

  useEffect(() => {
    const el = barsRef.current;
    if (!el) return;
    const io = new IntersectionObserver(
      ([e]) => {
        if (e.isIntersecting) {
          setTimeout(() => setBarsOn(true), 50 + index * 28);
        } else {
          setBarsOn(false);
        }
      },
      { threshold: 0.05 }
    );
    io.observe(el);
    return () => io.disconnect();
  }, [index]);

  return (
    <motion.div
      className="sk-row"
      whileHover="hovered"
      initial="idle"
    >
      {/* Brand accent bar */}
      <div className="sk-accent-bar" style={{ background: color }} />

      {/* Index */}
      <div className="w-10 flex-shrink-0 pl-3 sm:pl-4">
        <span className="sk-mono text-[11px] font-medium text-[#c8a96e] sm:text-xs">{idx}</span>
      </div>

      {/* Icon box */}
      <div className="w-10 flex-shrink-0 sm:w-12">
        <motion.div
          className="flex h-9 w-9 items-center justify-center rounded-xl sm:h-10 sm:w-10"
          style={{
            background: `${color}10`,
            border: `1px solid ${color}25`,
          }}
          variants={{
            idle:    { rotate: 0, scale: 1, background: `${color}10`, borderColor: `${color}25`, boxShadow: "none" },
            hovered: { rotate: -8, scale: 1.12, background: `${color}22`, borderColor: `${color}60`, boxShadow: `0 0 14px ${color}35`, transition: { duration: 0.35, ease: [0.34, 1.56, 0.64, 1] } },
          }}
        >
          {Icon
            ? <Icon size={20} style={{ color }} aria-hidden />
            : <span className="sk-sans text-sm font-bold" style={{ color }}>{skill.name[0]}</span>
          }
        </motion.div>
      </div>

      {/* Name + experience */}
      <div className="flex-1 min-w-0 px-4 sm:px-6">
        <motion.h3
          className="sk-sans text-[15px] font-bold text-[#0f0f0f] sm:text-[17px] lg:text-lg"
          style={{ letterSpacing: "-0.025em", lineHeight: 1.2 }}
          variants={{
            idle:    { x: 0 },
            hovered: { x: 5, transition: { duration: 0.28, ease: [0.16, 1, 0.3, 1] } },
          }}
        >
          {skill.name}
        </motion.h3>
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
                  height:          `${BAR_HEIGHTS[i]}px`,
                  background:      active ? color : "rgba(200,169,110,0.12)",
                  border:          `1px solid ${active ? color + "55" : "rgba(200,169,110,0.18)"}`,
                  transform:       active ? "scaleY(1)" : "scaleY(0.4)",
                  transformOrigin: "bottom",
                  opacity:         barsOn ? 1 : 0.2,
                  transition: [
                    `background .4s ease ${i * 55}ms`,
                    `transform .55s cubic-bezier(.34,1.56,.64,1) ${i * 60}ms`,
                    `border-color .4s ease ${i * 55}ms`,
                    `opacity .4s ease ${i * 55}ms`,
                  ].join(", "),
                }}
              />
            );
          })}
        </div>

        <motion.span
          className="sk-mono w-9 text-right text-xs font-bold sm:text-sm"
          style={{ color }}
          variants={{
            idle:    { opacity: 0.7, x: 0    },
            hovered: { opacity: 1,   x: -2, transition: { duration: 0.2 } },
          }}
        >
          {pct}%
        </motion.span>
      </div>
    </motion.div>
  );
});