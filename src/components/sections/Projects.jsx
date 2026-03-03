import React, { useState, useMemo, useRef, useEffect, memo } from "react";
import { ArrowUpRight, Github } from "lucide-react";
import { projects, categories } from "../../data/projects";
import { useLanguage } from "../../contexts/LanguageContext";

/* ─────────────────────────────────────
   Scroll Reveal hook
───────────────────────────────────── */
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
    <div
      ref={ref}
      className={className}
      style={{
        opacity: 1,
        transform: on ? "translateY(0)" : "translateY(22px)",
        transition: `transform .65s cubic-bezier(.16,1,.3,1) ${delay}ms`,
      }}
    >
      {children}
    </div>
  );
});
Reveal.displayName = "Reveal";

/* ══════════════════════════════════════════════
   MAIN
══════════════════════════════════════════════ */
export default function Projects() {
  const { language }        = useLanguage();
  const projectsList        = useMemo(() => projects[language] || [], [language]);
  const categoriesList      = useMemo(() => categories[language] || [], [language]);
  const [active, setActive] = useState(categoriesList[0]);
  const t = (u, e) => language === "uz" ? u : e;

  useEffect(() => { setActive(categoriesList[0]); }, [language]);

  const filtered = useMemo(() => {
    const all = categoriesList[0];
    return active === all
      ? projectsList
      : projectsList.filter(p => p.category === active);
  }, [active, projectsList, categoriesList]);

  return (
    <section id="projects" className="relative w-full overflow-hidden bg-[#faf9f6]">
      {/* ── Ambient glow ── */}
      <div
        className="pointer-events-none absolute -top-32 right-0 h-[500px] w-[500px] rounded-full opacity-30"
        style={{ background: "radial-gradient(circle, rgba(200,169,110,0.14) 0%, transparent 70%)" }}
      />

      <div className="relative mx-auto max-w-7xl px-4 py-14 sm:px-6 sm:py-24 lg:px-10 lg:py-32">

        {/* ════ HEADER ════ */}
        <Reveal className="mb-10 sm:mb-14 text-center">
          {/* Label */}
          <div className="mb-4 flex items-center justify-center gap-3">
            <div className="h-px w-8 bg-gradient-to-r from-transparent to-[#c8a96e]" />
            <span
              className="text-[10px] sm:text-[11px] font-semibold uppercase tracking-[0.18em] text-[#c8a96e]"
              style={{ fontFamily: "'DM Mono', monospace" }}
            >
              {t("Loyihalar", "Projects")}
            </span>
            <div className="h-px w-8 bg-gradient-to-l from-transparent to-[#c8a96e]" />
          </div>

          {/* Title */}
          <h2
            className="mb-3 sm:mb-4"
            style={{
              fontFamily: "'DM Sans', system-ui, sans-serif",
              fontSize: "clamp(1.9rem, 5.5vw, 4.5rem)",
              fontWeight: 800,
              letterSpacing: "-0.04em",
              lineHeight: 1.05,
              color: "#0f0f0f",
            }}
          >
            {t("Mening ", "My ")}
            <span
              style={{
                background: "linear-gradient(135deg,#c8a96e,#e8c880,#a8824a)",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
              }}
            >
              {t("Loyihalarim", "Projects")}
            </span>
          </h2>

          {/* Subtitle */}
          <p
            className="mx-auto max-w-xl text-sm sm:text-base leading-relaxed text-[#6b6b6b]"
            style={{ fontFamily: "'DM Sans', system-ui, sans-serif" }}
          >
            {t(
              "Zamonaviy texnologiyalar bilan yaratilgan professional loyihalar",
              "Professional projects built with modern technologies"
            )}
          </p>
        </Reveal>

        {/* ════ FILTER TABS ════
              - mobile: scroll horizontally, left-aligned
              - sm+: centered, no scroll needed
        */}
        <Reveal delay={60} className="mb-10 sm:mb-12">
          <div
            className="flex items-end gap-0 border-b border-[#e0dbd0] overflow-x-auto"
            style={{ scrollbarWidth: "none", msOverflowStyle: "none", justifyContent: "flex-start" }}
          >
            <style>{`.pj-tabs::-webkit-scrollbar { display:none; }`}</style>
            <div className="pj-tabs flex w-full items-end justify-start sm:justify-center gap-0">
              {categoriesList.map(cat => (
                <button
                  key={cat}
                  onClick={() => setActive(cat)}
                  className="relative flex-shrink-0 cursor-pointer pb-3 px-3 sm:px-5"
                >
                  <span
                    className="whitespace-nowrap text-[10px] sm:text-[11px] font-semibold uppercase tracking-[0.15em] transition-colors duration-200"
                    style={{
                      fontFamily: "'DM Mono', monospace",
                      color: active === cat ? "#0f0f0f" : "#9a9a9a",
                    }}
                  >
                    {cat}
                  </span>
                  {active === cat && (
                    <span
                      className="absolute bottom-0 left-3 right-3 sm:left-5 sm:right-5 h-[2px] rounded-t-full"
                      style={{ background: "linear-gradient(90deg,#c8a96e,#a8824a)" }}
                    />
                  )}
                </button>
              ))}
            </div>
          </div>
        </Reveal>

        {/* ════ GRID ════
              mobile  : 1 col
              sm      : 2 col
              lg      : 3 col
        */}
        {filtered.length > 0 ? (
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 sm:gap-5 lg:grid-cols-3 lg:gap-6">
            {filtered.map((project, i) => (
              <Reveal key={project.id} delay={Math.min(i * 55, 300)}>
                <ProjectCard project={project} index={i} />
              </Reveal>
            ))}
          </div>
        ) : (
          <Reveal>
            <div className="py-20 text-center">
              <p
                className="text-base sm:text-lg text-[#9a9a9a]"
                style={{ fontFamily: "'DM Sans', system-ui, sans-serif" }}
              >
                {t("Loyihalar topilmadi", "No projects found")}
              </p>
            </div>
          </Reveal>
        )}
      </div>

      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=DM+Sans:wght@300;400;500;600;700;800&family=DM+Mono:wght@400;500&display=swap');
        @media (prefers-reduced-motion: reduce) {
          *, *::before, *::after { animation-duration:.01ms !important; transition-duration:.01ms !important; }
        }
      `}</style>
    </section>
  );
}

/* ══════════════════════════════════════════════
   PROJECT CARD
══════════════════════════════════════════════ */
const ProjectCard = memo(({ project, index }) => {
  const [imgLoaded, setImgLoaded] = useState(false);
  const [hovered, setHovered]     = useState(false);
  const idx = String(index + 1).padStart(2, "0");

  return (
    <div
      className="group relative flex flex-col h-full overflow-hidden rounded-2xl bg-white"
      style={{
        border: `1px solid ${hovered ? "rgba(200,169,110,0.5)" : "rgba(220,214,203,0.85)"}`,
        boxShadow: hovered
          ? "0 20px 60px rgba(200,169,110,0.15), 0 6px 20px rgba(0,0,0,0.07)"
          : "0 2px 14px rgba(0,0,0,0.04), inset 0 1px 0 rgba(255,255,255,1)",
        transform: hovered ? "translateY(-5px)" : "translateY(0)",
        transition: "box-shadow .4s ease, transform .4s cubic-bezier(.34,1.56,.64,1), border-color .3s ease",
      }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      {/* Gold top bar */}
      <div
        className="absolute top-0 left-0 right-0 z-10 h-[2px] transition-opacity duration-300"
        style={{
          background: "linear-gradient(90deg,#c8a96e,#a8824a,transparent)",
          opacity: hovered ? 1 : 0,
        }}
      />

      {/* ── IMAGE ──
            height: 160px mobile / 176px sm / 200px lg
      */}
      <div className="relative h-40 sm:h-44 lg:h-48 flex-shrink-0 overflow-hidden">

        {/* Skeleton */}
        {!imgLoaded && (
          <div className="absolute inset-0 animate-pulse bg-[#ede8e0]" />
        )}

        {/* Photo */}
        <img
          src={project.image}
          alt={project.title}
          className="block h-full w-full object-cover"
          style={{
            opacity: imgLoaded ? 1 : 0,
            transform: hovered ? "scale(1.05)" : "scale(1)",
            transition: "transform .7s cubic-bezier(.25,1,.5,1), opacity .3s ease",
          }}
          onLoad={() => setImgLoaded(true)}
          onError={e => {
            e.target.src = "https://images.unsplash.com/photo-1555066931-4365d14bab8c?w=800&q=80";
            setImgLoaded(true);
          }}
          loading="lazy"
        />

        {/* Dark gradient overlay */}
        <div
          className="absolute inset-0 transition-opacity duration-300"
          style={{
            background: "linear-gradient(to top, rgba(0,0,0,0.58) 0%, rgba(0,0,0,0.12) 45%, transparent 100%)",
            opacity: hovered ? 1 : 0.45,
          }}
        />

        {/* ── TOP-LEFT: index + category ── */}
        <div className="absolute top-2.5 left-2.5 sm:top-3 sm:left-3 z-10 flex items-center gap-1.5">
          <span
            className="text-[9px] sm:text-[10px] font-bold text-white/50"
            style={{ fontFamily: "'DM Mono', monospace" }}
          >
            {idx}
          </span>
          <span
            className="rounded-full border border-white/20 bg-black/35 px-2 py-[2px] text-[8px] sm:text-[9px] font-semibold uppercase tracking-[0.12em] text-white/80"
            style={{
              backdropFilter: "blur(8px)",
              WebkitBackdropFilter: "blur(8px)",
              fontFamily: "'DM Mono', monospace",
            }}
          >
            {project.category}
          </span>
        </div>

        {/* ── TOP-RIGHT: action buttons (always visible) ── */}
        <div className="absolute top-2.5 right-2.5 sm:top-3 sm:right-3 z-10 flex items-center gap-1.5 sm:gap-2">

          {/* Live Demo */}
          <a
            href={project.demoUrl}
            target="_blank"
            rel="noopener noreferrer"
            onClick={e => e.stopPropagation()}
            title="Live Demo"
            className="group/demo flex items-center justify-center rounded-full transition-all duration-200 hover:scale-110 active:scale-95"
            style={{
              width: "clamp(28px, 3.5vw, 34px)",
              height: "clamp(28px, 3.5vw, 34px)",
              background: "linear-gradient(135deg, rgba(255,255,255,0.95), rgba(252,246,232,0.92))",
              border: "1px solid rgba(200,169,110,0.65)",
              boxShadow: "0 3px 14px rgba(200,169,110,0.35), inset 0 1px 0 rgba(255,255,255,0.95)",
              backdropFilter: "blur(12px)",
              WebkitBackdropFilter: "blur(12px)",
            }}
          >
            <ArrowUpRight
              size={13}
              strokeWidth={2.5}
              style={{ color: "#8a6220" }}
              className="transition-transform duration-200 group-hover/demo:translate-x-px group-hover/demo:-translate-y-px"
            />
          </a>

          {/* GitHub */}
          <a
            href={project.githubUrl}
            target="_blank"
            rel="noopener noreferrer"
            onClick={e => e.stopPropagation()}
            title="GitHub"
            className="group/gh flex items-center justify-center rounded-full transition-all duration-200 hover:scale-110 active:scale-95"
            style={{
              width: "clamp(28px, 3.5vw, 34px)",
              height: "clamp(28px, 3.5vw, 34px)",
              background: "linear-gradient(135deg, rgba(20,20,20,0.92), rgba(8,8,8,0.90))",
              border: "1px solid rgba(255,255,255,0.15)",
              boxShadow: "0 3px 14px rgba(0,0,0,0.5), inset 0 1px 0 rgba(255,255,255,0.08)",
              backdropFilter: "blur(12px)",
              WebkitBackdropFilter: "blur(12px)",
            }}
          >
            <Github
              size={13}
              strokeWidth={2}
              style={{ color: "#ffffff" }}
              className="transition-transform duration-200 group-hover/gh:rotate-12"
            />
          </a>
        </div>
      </div>

      {/* ── CONTENT ── */}
      <div
        className="relative z-10 flex flex-1 flex-col p-3.5 sm:p-4 lg:p-5"
        style={{ fontFamily: "'DM Sans', system-ui, sans-serif" }}
      >
        {/* Title */}
        <h3
          className="mb-1.5 text-sm sm:text-[14px] lg:text-[15px] font-bold text-[#0f0f0f] leading-snug"
          style={{ letterSpacing: "-0.02em" }}
        >
          {project.title}
        </h3>

        {/* Description */}
        <p className="mb-3 sm:mb-4 flex-1 text-[11px] sm:text-[12px] lg:text-[13px] leading-relaxed text-[#6b6b6b] line-clamp-2">
          {project.description}
        </p>

        {/* Divider */}
        <div className="mb-2.5 sm:mb-3 h-px bg-[#ede8e0]" />

        {/* Tech tags */}
        <div className="flex flex-wrap gap-1 sm:gap-1.5">
          {project.technologies.map((tech, i) => (
            <span
              key={i}
              className="rounded-md sm:rounded-lg border border-[#e0dbd0] bg-[#f6f2ec] px-1.5 sm:px-2 py-[2px] sm:py-[3px] text-[8px] sm:text-[9px] lg:text-[10px] font-medium text-[#5a5a5a] transition-all duration-200 hover:border-[rgba(200,169,110,0.5)] hover:text-[#0f0f0f] cursor-default select-none"
              style={{ fontFamily: "'DM Mono', monospace" }}
            >
              {tech}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
});
ProjectCard.displayName = "ProjectCard";