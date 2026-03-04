import { useState, useMemo, useEffect, memo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowUpRight, Github } from "lucide-react";
import { projects, categories } from "../../data/projects";
import { useLanguage } from "../../contexts/LanguageContext";
import FadeIn, { EASE } from "../animations/FadeIn";

/*
 ╔══════════════════════════════════════════════════════════╗
 ║  PROJECTS  —  Framer Motion + FadeIn Premium Edition     ║
 ║                                                          ║
 ║  • Header     → framer whileInView stagger (qayta)       ║
 ║  • Filter     → FadeIn once={false} + framer tab spring  ║
 ║  • Cards      → AnimatePresence layout filter transition ║
 ║                 + FadeIn once={false} qayta scroll        ║
 ║  • Card hover → framer spring physics                    ║
 ║  • Buttons    → whileHover + whileTap                    ║
 ╚══════════════════════════════════════════════════════════╝
*/

/* ── Variants ── */
const vStaggerWrap = {
  hidden:  {},
  visible: { transition: { staggerChildren: 0.09, delayChildren: 0.04 } },
};
const vStaggerChild = {
  hidden:  { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: [0.16, 1, 0.3, 1] } },
};

/* Card enter/exit for AnimatePresence */
const vCard = {
  hidden:  { opacity: 0, y: 24, scale: 0.96 },
  visible: (i) => ({
    opacity: 1, y: 0, scale: 1,
    transition: { duration: 0.55, ease: [0.16, 1, 0.3, 1], delay: Math.min(i * 0.06, 0.3) },
  }),
  exit: {
    opacity: 0, y: -12, scale: 0.97,
    transition: { duration: 0.3, ease: [0.4, 0, 1, 1] },
  },
};

const VP    = { once: false, amount: 0.2  };
const VP_SM = { once: false, amount: 0.06 };

/* ══════════════════════════════════════════════
   MAIN
══════════════════════════════════════════════ */
export default function Projects() {
  const { language }        = useLanguage();
  const projectsList        = useMemo(() => projects[language]   || [], [language]);
  const categoriesList      = useMemo(() => categories[language] || [], [language]);
  const [active, setActive] = useState(categoriesList[0]);
  const t = (u, e) => language === "uz" ? u : e;

  useEffect(() => { setActive(categoriesList[0]); }, [language, categoriesList]);

  const filtered = useMemo(() => {
    const all = categoriesList[0];
    return active === all
      ? projectsList
      : projectsList.filter(p => p.category === active);
  }, [active, projectsList, categoriesList]);

  return (
    <section id="projects" className="relative w-full overflow-hidden bg-[#faf9f6]">

      {/* Ambient glow */}
      <div
        className="pointer-events-none absolute -top-32 right-0 h-[500px] w-[500px] rounded-full opacity-30"
        style={{ background: "radial-gradient(circle,rgba(200,169,110,0.14) 0%,transparent 70%)" }}
      />

      <div className="relative mx-auto max-w-7xl px-4 py-14 sm:px-6 sm:py-24 lg:px-10 lg:py-32">

        {/* ════ HEADER — framer stagger, qayta ishlaydi ════ */}
        <motion.div
          className="mb-10 sm:mb-14 text-center"
          variants={vStaggerWrap}
          initial="hidden"
          whileInView="visible"
          viewport={VP}
        >
          {/* Eyebrow */}
          <motion.div variants={vStaggerChild} className="mb-4 flex items-center justify-center gap-3">
            <motion.div
              className="h-px bg-gradient-to-r from-transparent to-[#c8a96e]"
              initial={{ width: 0 }}
              whileInView={{ width: 32 }}
              viewport={VP}
              transition={{ duration: 0.55, ease: [0.16, 1, 0.3, 1] }}
            />
            <span className="pj-mono text-[10px] sm:text-[11px] font-semibold uppercase tracking-[0.18em] text-[#c8a96e]">
              {t("Loyihalar", "Projects")}
            </span>
            <motion.div
              className="h-px bg-gradient-to-l from-transparent to-[#c8a96e]"
              initial={{ width: 0 }}
              whileInView={{ width: 32 }}
              viewport={VP}
              transition={{ duration: 0.55, ease: [0.16, 1, 0.3, 1], delay: 0.07 }}
            />
          </motion.div>

          {/* Title */}
          <motion.h2
            variants={vStaggerChild}
            className="pj-sans mb-3 sm:mb-4"
            style={{
              fontSize: "clamp(1.9rem,5.5vw,4.5rem)",
              fontWeight: 800, letterSpacing: "-0.04em", lineHeight: 1.05, color: "#0f0f0f",
            }}
          >
            {t("Mening ", "My ")}
            <span style={{
              background: "linear-gradient(135deg,#c8a96e,#e8c880,#a8824a)",
              WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent",
            }}>
              {t("Loyihalarim", "Projects")}
            </span>
          </motion.h2>

          {/* Subtitle */}
          <motion.p
            variants={vStaggerChild}
            className="pj-sans mx-auto max-w-xl text-sm sm:text-base leading-relaxed text-[#6b6b6b]"
          >
            {t(
              "Zamonaviy texnologiyalar bilan yaratilgan professional loyihalar",
              "Professional projects built with modern technologies"
            )}
          </motion.p>
        </motion.div>

        {/* ════ FILTER TABS — FadeIn + framer tab indicator ════ */}
        <FadeIn delay={60} duration={550} y={16} ease={EASE.smooth} once={false} threshold={0.1}>
          <div className="mb-10 sm:mb-12">
            <div
              className="flex items-end gap-0 border-b border-[#e0dbd0] overflow-x-auto pj-tabs"
              style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
            >
              <div className="flex w-full items-end justify-start sm:justify-center gap-0">
                {categoriesList.map(cat => (
                  <motion.button
                    key={cat}
                    onClick={() => setActive(cat)}
                    className="relative flex-shrink-0 cursor-pointer pb-3 px-3 sm:px-5 focus:outline-none"
                    whileHover={{ opacity: 1 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    <span
                      className="pj-mono whitespace-nowrap text-[10px] sm:text-[11px] font-semibold uppercase tracking-[0.15em] transition-colors duration-200"
                      style={{ color: active === cat ? "#0f0f0f" : "#9a9a9a" }}
                    >
                      {cat}
                    </span>
                    {/* Animated underline */}
                    <AnimatePresence>
                      {active === cat && (
                        <motion.span
                          layoutId="tabUnderline"
                          className="absolute bottom-0 left-3 right-3 sm:left-5 sm:right-5 h-[2px] rounded-t-full"
                          style={{ background: "linear-gradient(90deg,#c8a96e,#a8824a)" }}
                          initial={{ opacity: 0, scaleX: 0 }}
                          animate={{ opacity: 1, scaleX: 1 }}
                          exit={{ opacity: 0, scaleX: 0 }}
                          transition={{ duration: 0.35, ease: [0.34, 1.56, 0.64, 1] }}
                        />
                      )}
                    </AnimatePresence>
                  </motion.button>
                ))}
              </div>
            </div>
          </div>
        </FadeIn>

        {/* ════ GRID — AnimatePresence for filter switch ════ */}
        <AnimatePresence mode="wait">
          {filtered.length > 0 ? (
            <motion.div
              key={active}
              className="grid grid-cols-1 gap-4 sm:grid-cols-2 sm:gap-5 lg:grid-cols-3 lg:gap-6"
              initial="hidden"
              animate="visible"
              exit={{ opacity: 0, transition: { duration: 0.2 } }}
            >
              {filtered.map((project, i) => (
                <FadeIn
                  key={project.id}
                  delay={Math.min(i * 55, 280)}
                  duration={580}
                  y={26}
                  scale={0.97}
                  ease={EASE.smooth}
                  once={false}
                  threshold={0.04}
                >
                  <motion.div variants={vCard} custom={i}>
                    <ProjectCard project={project} index={i} />
                  </motion.div>
                </FadeIn>
              ))}
            </motion.div>
          ) : (
            <motion.div
              key="empty"
              className="py-20 text-center"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.4 }}
            >
              <p className="pj-sans text-base sm:text-lg text-[#9a9a9a]">
                {t("Loyihalar topilmadi", "No projects found")}
              </p>
            </motion.div>
          )}
        </AnimatePresence>

      </div>

      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=DM+Sans:wght@300;400;500;600;700;800&family=DM+Mono:wght@400;500&display=swap');
        .pj-sans { font-family: 'DM Sans', system-ui, sans-serif; }
        .pj-mono { font-family: 'DM Mono', monospace; }
        .pj-tabs::-webkit-scrollbar { display: none; }
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
  const idx = String(index + 1).padStart(2, "0");

  return (
    <motion.div
      className="group relative flex flex-col h-full overflow-hidden rounded-2xl bg-white"
      style={{
        border: "1px solid rgba(220,214,203,0.85)",
        boxShadow: "0 2px 14px rgba(0,0,0,0.04), inset 0 1px 0 rgba(255,255,255,1)",
      }}
      whileHover={{
        y: -6,
        boxShadow: "0 22px 64px rgba(200,169,110,0.16), 0 6px 20px rgba(0,0,0,0.07)",
        borderColor: "rgba(200,169,110,0.5)",
        transition: { duration: 0.35, ease: [0.34, 1.56, 0.64, 1] },
      }}
      whileTap={{ scale: 0.99 }}
    >
      {/* Gold top bar — reveals on hover */}
      <motion.div
        className="absolute top-0 left-0 right-0 z-10 h-[2px]"
        style={{ background: "linear-gradient(90deg,#c8a96e,#a8824a,transparent)" }}
        initial={{ opacity: 0, scaleX: 0.6, originX: 0 }}
        whileHover={{ opacity: 1, scaleX: 1 }}
        transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
      />

      {/* ── IMAGE ── */}
      <div className="relative h-40 sm:h-44 lg:h-48 flex-shrink-0 overflow-hidden">

        {/* Skeleton */}
        {!imgLoaded && (
          <div className="absolute inset-0 animate-pulse bg-[#ede8e0]" />
        )}

        {/* Photo — zoom on card hover */}
        <motion.img
          src={project.image}
          alt={project.title}
          className="block h-full w-full object-cover"
          style={{ opacity: imgLoaded ? 1 : 0, transition: "opacity .3s ease" }}
          whileHover={{ scale: 1.06, transition: { duration: 0.7, ease: [0.25, 1, 0.5, 1] } }}
          onLoad={() => setImgLoaded(true)}
          onError={e => {
            e.target.src = "https://images.unsplash.com/photo-1555066931-4365d14bab8c?w=800&q=80";
            setImgLoaded(true);
          }}
          loading="lazy"
        />

        {/* Gradient overlay */}
        <motion.div
          className="absolute inset-0"
          style={{ background: "linear-gradient(to top,rgba(0,0,0,0.58) 0%,rgba(0,0,0,0.12) 45%,transparent 100%)" }}
          initial={{ opacity: 0.45 }}
          whileHover={{ opacity: 1, transition: { duration: 0.3 } }}
        />

        {/* TOP-LEFT: index + category */}
        <div className="absolute top-2.5 left-2.5 sm:top-3 sm:left-3 z-10 flex items-center gap-1.5">
          <span className="pj-mono text-[9px] sm:text-[10px] font-bold text-white/50">{idx}</span>
          <span
            className="pj-mono rounded-full border border-white/20 bg-black/35 px-2 py-[2px] text-[8px] sm:text-[9px] font-semibold uppercase tracking-[0.12em] text-white/80"
            style={{ backdropFilter: "blur(8px)", WebkitBackdropFilter: "blur(8px)" }}
          >
            {project.category}
          </span>
        </div>

        {/* TOP-RIGHT: action buttons */}
        <div className="absolute top-2.5 right-2.5 sm:top-3 sm:right-3 z-10 flex items-center gap-1.5 sm:gap-2">

          {/* Live Demo */}
          <motion.a
            href={project.demoUrl}
            target="_blank"
            rel="noopener noreferrer"
            onClick={e => e.stopPropagation()}
            title="Live Demo"
            className="flex items-center justify-center rounded-full"
            style={{
              width: "clamp(28px,3.5vw,34px)",
              height: "clamp(28px,3.5vw,34px)",
              background: "linear-gradient(135deg,rgba(255,255,255,0.95),rgba(252,246,232,0.92))",
              border: "1px solid rgba(200,169,110,0.65)",
              boxShadow: "0 3px 14px rgba(200,169,110,0.35),inset 0 1px 0 rgba(255,255,255,0.95)",
              backdropFilter: "blur(12px)", WebkitBackdropFilter: "blur(12px)",
            }}
            whileHover={{ scale: 1.15, boxShadow: "0 6px 20px rgba(200,169,110,0.5)", transition: { duration: 0.25, ease: [0.34, 1.56, 0.64, 1] } }}
            whileTap={{ scale: 0.9 }}
          >
            <ArrowUpRight size={13} strokeWidth={2.5} style={{ color: "#8a6220" }} />
          </motion.a>

          {/* GitHub */}
          <motion.a
            href={project.githubUrl}
            target="_blank"
            rel="noopener noreferrer"
            onClick={e => e.stopPropagation()}
            title="GitHub"
            className="flex items-center justify-center rounded-full"
            style={{
              width: "clamp(28px,3.5vw,34px)",
              height: "clamp(28px,3.5vw,34px)",
              background: "linear-gradient(135deg,rgba(20,20,20,0.92),rgba(8,8,8,0.90))",
              border: "1px solid rgba(255,255,255,0.15)",
              boxShadow: "0 3px 14px rgba(0,0,0,0.5),inset 0 1px 0 rgba(255,255,255,0.08)",
              backdropFilter: "blur(12px)", WebkitBackdropFilter: "blur(12px)",
            }}
            whileHover={{ scale: 1.15, rotate: 12, boxShadow: "0 6px 20px rgba(0,0,0,0.6)", transition: { duration: 0.25, ease: [0.34, 1.56, 0.64, 1] } }}
            whileTap={{ scale: 0.9 }}
          >
            <Github size={13} strokeWidth={2} style={{ color: "#ffffff" }} />
          </motion.a>
        </div>
      </div>

      {/* ── CONTENT ── */}
      <div className="pj-sans relative z-10 flex flex-1 flex-col p-3.5 sm:p-4 lg:p-5">

        {/* Title */}
        <motion.h3
          className="mb-1.5 text-sm sm:text-[14px] lg:text-[15px] font-bold text-[#0f0f0f] leading-snug"
          style={{ letterSpacing: "-0.02em" }}
          whileHover={{ x: 2, transition: { duration: 0.2 } }}
        >
          {project.title}
        </motion.h3>

        {/* Description */}
        <p className="mb-3 sm:mb-4 flex-1 text-[11px] sm:text-[12px] lg:text-[13px] leading-relaxed text-[#6b6b6b] line-clamp-2">
          {project.description}
        </p>

        {/* Divider */}
        <div className="mb-2.5 sm:mb-3 h-px bg-[#ede8e0]" />

        {/* Tech tags — stagger on card mount */}
        <motion.div
          className="flex flex-wrap gap-1 sm:gap-1.5"
          variants={{ hidden: {}, visible: { transition: { staggerChildren: 0.04 } } }}
          initial="hidden"
          animate="visible"
        >
          {project.technologies.map((tech, i) => (
            <motion.span
              key={i}
              className="pj-mono rounded-md sm:rounded-lg border border-[#e0dbd0] bg-[#f6f2ec] px-1.5 sm:px-2 py-[2px] sm:py-[3px] text-[8px] sm:text-[9px] lg:text-[10px] font-medium text-[#5a5a5a] cursor-default select-none"
              variants={{
                hidden:  { opacity: 0, scale: 0.85 },
                visible: { opacity: 1, scale: 1, transition: { duration: 0.35, ease: [0.34, 1.56, 0.64, 1] } },
              }}
              whileHover={{
                scale: 1.08, y: -1,
                borderColor: "rgba(200,169,110,0.5)",
                color: "#0f0f0f",
                transition: { duration: 0.18 },
              }}
            >
              {tech}
            </motion.span>
          ))}
        </motion.div>
      </div>
    </motion.div>
  );
});
ProjectCard.displayName = "ProjectCard";