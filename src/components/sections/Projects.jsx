import { useState, useMemo, useEffect, memo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowUpRight, Github } from "lucide-react";
import { projects, categories } from "../../data/projects";
import { useLanguage } from "../../contexts/LanguageContext";
import FadeIn, { EASE } from "../animations/FadeIn";

/*
 ╔══════════════════════════════════════════════════════════╗
 ║  PROJECTS  —  Premium Edition v2                         ║
 ║                                                          ║
 ║  FIX: Cards now uniform height via flex + clamp          ║
 ║  • Image      → fixed 200px, object-cover                ║
 ║  • Title      → 2-line clamp, fixed min-height           ║
 ║  • Description→ strict 3-line clamp, flex-1              ║
 ║  • Tags       → fixed-height scroll zone                 ║
 ╚══════════════════════════════════════════════════════════╝
*/

/* ── Variants ── */
const vStaggerWrap = {
  hidden:  {},
  visible: { transition: { staggerChildren: 0.09, delayChildren: 0.04 } },
};
const vStaggerChild = {
  hidden:  { opacity: 0, y: 22 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.65, ease: [0.16, 1, 0.3, 1] } },
};

const vCard = {
  hidden:  { opacity: 0, y: 28, scale: 0.95 },
  visible: (i) => ({
    opacity: 1, y: 0, scale: 1,
    transition: { duration: 0.6, ease: [0.16, 1, 0.3, 1], delay: Math.min(i * 0.06, 0.32) },
  }),
  exit: {
    opacity: 0, y: -14, scale: 0.97,
    transition: { duration: 0.28, ease: [0.4, 0, 1, 1] },
  },
};

const VP    = { once: false, amount: 0.18 };
const VP_SM = { once: false, amount: 0.05 };

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

      {/* Ambient glows */}
      <div
        className="pointer-events-none absolute -top-40 right-0 h-[600px] w-[600px] rounded-full"
        style={{ background: "radial-gradient(circle,rgba(200,169,110,0.10) 0%,transparent 68%)" }}
      />
      <div
        className="pointer-events-none absolute bottom-0 left-0 h-[400px] w-[400px] rounded-full"
        style={{ background: "radial-gradient(circle,rgba(168,130,74,0.07) 0%,transparent 70%)" }}
      />

      {/* Subtle dot pattern */}
      <div
        className="pointer-events-none absolute inset-0 opacity-[0.018]"
        style={{
          backgroundImage: "radial-gradient(circle,#6b5a3e 1px,transparent 1px)",
          backgroundSize: "28px 28px",
        }}
      />

      <div className="relative mx-auto max-w-7xl px-4 py-16 sm:px-6 sm:py-24 lg:px-10 lg:py-32">

        {/* ════ HEADER ════ */}
        <motion.div
          className="mb-12 sm:mb-16 text-center"
          variants={vStaggerWrap}
          initial="hidden"
          whileInView="visible"
          viewport={VP}
        >
          {/* Eyebrow line */}
          <motion.div variants={vStaggerChild} className="mb-5 flex items-center justify-center gap-4">
            <motion.div
              className="h-px"
              style={{ background: "linear-gradient(to right,transparent,#c8a96e)" }}
              initial={{ width: 0 }}
              whileInView={{ width: 40 }}
              viewport={VP}
              transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
            />
            <span className="pj-mono text-[9px] sm:text-[10px] font-bold uppercase tracking-[0.22em] text-[#c8a96e]">
              {t("Loyihalar", "Portfolio")}
            </span>
            <motion.div
              className="h-px"
              style={{ background: "linear-gradient(to left,transparent,#c8a96e)" }}
              initial={{ width: 0 }}
              whileInView={{ width: 40 }}
              viewport={VP}
              transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1], delay: 0.08 }}
            />
          </motion.div>

          {/* Title */}
          <motion.h2
            variants={vStaggerChild}
            className="pj-sans mb-4"
            style={{
              fontSize: "clamp(2rem,5.5vw,4.2rem)",
              fontWeight: 800,
              letterSpacing: "-0.045em",
              lineHeight: 1.04,
              color: "#0e0e0e",
            }}
          >
            {t("Mening ", "My ")}
            <span style={{
              background: "linear-gradient(135deg,#b8914e 0%,#e8c880 45%,#a07838 100%)",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
            }}>
              {t("Loyihalarim", "Projects")}
            </span>
          </motion.h2>

          {/* Subtitle */}
          <motion.p
            variants={vStaggerChild}
            className="pj-sans mx-auto max-w-lg text-sm sm:text-[15px] leading-relaxed"
            style={{ color: "#7a7670" }}
          >
            {t(
              "Zamonaviy texnologiyalar bilan yaratilgan professional loyihalar",
              "Professional projects crafted with modern technologies"
            )}
          </motion.p>
        </motion.div>

        {/* ════ FILTER TABS ════ */}
        <FadeIn delay={60} duration={550} y={14} ease={EASE.smooth} once={false} threshold={0.08}>
          <div className="mb-10 sm:mb-12">
            <div
              className="flex items-end gap-0 border-b pj-tabs overflow-x-auto"
              style={{ borderColor: "rgba(200,169,110,0.2)", scrollbarWidth: "none", msOverflowStyle: "none" }}
            >
              <div className="flex w-full items-end justify-start sm:justify-center gap-0">
                {categoriesList.map(cat => (
                  <motion.button
                    key={cat}
                    onClick={() => setActive(cat)}
                    className="relative flex-shrink-0 cursor-pointer pb-3.5 px-4 sm:px-6 focus:outline-none"
                    whileTap={{ scale: 0.94 }}
                  >
                    <span
                      className="pj-mono whitespace-nowrap text-[9px] sm:text-[10px] font-bold uppercase tracking-[0.18em] transition-colors duration-200"
                      style={{ color: active === cat ? "#0e0e0e" : "#b0aa9e" }}
                    >
                      {cat}
                    </span>
                    <AnimatePresence>
                      {active === cat && (
                        <motion.span
                          layoutId="tabUnderline"
                          className="absolute bottom-0 left-4 right-4 sm:left-6 sm:right-6 rounded-t-full"
                          style={{
                            height: "2px",
                            background: "linear-gradient(90deg,#c8a96e,#a8824a)",
                          }}
                          initial={{ opacity: 0, scaleX: 0 }}
                          animate={{ opacity: 1, scaleX: 1 }}
                          exit={{ opacity: 0, scaleX: 0 }}
                          transition={{ duration: 0.38, ease: [0.34, 1.56, 0.64, 1] }}
                        />
                      )}
                    </AnimatePresence>
                  </motion.button>
                ))}
              </div>
            </div>
          </div>
        </FadeIn>

        {/* ════ GRID ════ */}
        <AnimatePresence mode="wait">
          {filtered.length > 0 ? (
            <motion.div
              key={active}
              className="grid grid-cols-1 gap-5 sm:grid-cols-2 sm:gap-6 lg:grid-cols-3 lg:gap-7"
              /* Make all cards in the row the same height */
              style={{ alignItems: "stretch" }}
              initial="hidden"
              animate="visible"
              exit={{ opacity: 0, transition: { duration: 0.18 } }}
            >
              {filtered.map((project, i) => (
                <FadeIn
                  key={project.id}
                  delay={Math.min(i * 50, 260)}
                  duration={560}
                  y={28}
                  scale={0.97}
                  ease={EASE.smooth}
                  once={false}
                  threshold={0.04}
                  /* Let FadeIn wrapper stretch to full height */
                  style={{ display: "flex", flexDirection: "column" }}
                >
                  <motion.div variants={vCard} custom={i} style={{ flex: 1, display: "flex", flexDirection: "column" }}>
                    <ProjectCard project={project} index={i} />
                  </motion.div>
                </FadeIn>
              ))}
            </motion.div>
          ) : (
            <motion.div
              key="empty"
              className="py-24 text-center"
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.4 }}
            >
              <p className="pj-sans text-base text-[#a0a0a0]">
                {t("Loyihalar topilmadi", "No projects found")}
              </p>
            </motion.div>
          )}
        </AnimatePresence>

      </div>

      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Outfit:wght@300;400;500;600;700;800;900&family=JetBrains+Mono:wght@400;500;600&display=swap');
        .pj-sans { font-family: 'Outfit', system-ui, sans-serif; }
        .pj-mono { font-family: 'JetBrains Mono', monospace; }
        .pj-tabs::-webkit-scrollbar { display: none; }
        @media (prefers-reduced-motion: reduce) {
          *, *::before, *::after { animation-duration:.01ms !important; transition-duration:.01ms !important; }
        }
      `}</style>
    </section>
  );
}

/* ══════════════════════════════════════════════
   PROJECT CARD  — UNIFORM HEIGHT
   Strategy:
   • flex flex-col + h-full → card stretches to row height
   • Image: fixed 200px
   • Content: flex-1 flex-col
     – Title:       2-line clamp, fixed min-height
     – Description: flex-1 + 3-line clamp  ← key fix
     – Divider
     – Tags:        fixed 52px overflow-hidden
══════════════════════════════════════════════ */
const ProjectCard = memo(({ project, index }) => {
  const [imgLoaded, setImgLoaded] = useState(false);
  const idx = String(index + 1).padStart(2, "0");

  return (
    <motion.div
      className="group relative flex flex-col h-full overflow-hidden rounded-2xl bg-white"
      style={{
        border: "1px solid rgba(210,200,185,0.75)",
        boxShadow: "0 1px 3px rgba(0,0,0,0.04), 0 8px 32px rgba(0,0,0,0.03), inset 0 1px 0 rgba(255,255,255,1)",
      }}
      whileHover={{
        y: -7,
        boxShadow: "0 28px 70px rgba(180,140,70,0.15), 0 8px 24px rgba(0,0,0,0.07)",
        borderColor: "rgba(200,169,110,0.55)",
        transition: { duration: 0.38, ease: [0.34, 1.56, 0.64, 1] },
      }}
      whileTap={{ scale: 0.99 }}
    >
      {/* Gold shimmer bar — top border on hover */}
      <motion.div
        className="absolute top-0 left-0 right-0 z-20"
        style={{
          height: "2px",
          background: "linear-gradient(90deg,transparent,#c8a96e 30%,#e8d090 60%,transparent)",
          transformOrigin: "left",
        }}
        initial={{ scaleX: 0, opacity: 0 }}
        whileHover={{ scaleX: 1, opacity: 1 }}
        transition={{ duration: 0.45, ease: [0.16, 1, 0.3, 1] }}
      />

      {/* ── IMAGE — fixed 200px height ── */}
      <div className="relative flex-shrink-0 overflow-hidden" style={{ height: 200 }}>

        {/* Skeleton pulse */}
        {!imgLoaded && (
          <div className="absolute inset-0 animate-pulse bg-[#ece7de]" />
        )}

        <motion.img
          src={project.image}
          alt={project.title}
          className="block h-full w-full object-cover"
          style={{ opacity: imgLoaded ? 1 : 0, transition: "opacity .35s ease" }}
          whileHover={{ scale: 1.07, transition: { duration: 0.75, ease: [0.25, 1, 0.5, 1] } }}
          onLoad={() => setImgLoaded(true)}
          onError={e => {
            e.target.src = "https://images.unsplash.com/photo-1555066931-4365d14bab8c?w=800&q=80";
            setImgLoaded(true);
          }}
          loading="lazy"
        />

        {/* Gradient overlay */}
        <div
          className="absolute inset-0"
          style={{
            background: "linear-gradient(to top,rgba(10,8,4,0.62) 0%,rgba(10,8,4,0.15) 40%,transparent 100%)",
          }}
        />

        {/* TOP-LEFT: index + category badge */}
        <div className="absolute top-3 left-3 z-10 flex items-center gap-2">
          <span
            className="pj-mono text-[9px] font-bold"
            style={{
              color: "rgba(255,255,255,0.35)",
              letterSpacing: "0.05em",
            }}
          >
            {idx}
          </span>
          <span
            className="pj-mono rounded-full px-2.5 py-[3px] text-[8px] font-semibold uppercase"
            style={{
              letterSpacing: "0.12em",
              background: "rgba(0,0,0,0.40)",
              border: "1px solid rgba(200,169,110,0.30)",
              color: "rgba(230,200,140,0.9)",
              backdropFilter: "blur(10px)",
              WebkitBackdropFilter: "blur(10px)",
            }}
          >
            {project.category}
          </span>
        </div>

        {/* TOP-RIGHT: action buttons */}
        <div className="absolute top-3 right-3 z-10 flex items-center gap-2">
          {/* Live Demo */}
          <motion.a
            href={project.demoUrl}
            target="_blank"
            rel="noopener noreferrer"
            onClick={e => e.stopPropagation()}
            title="Live Demo"
            className="flex items-center justify-center rounded-full"
            style={{
              width: 32, height: 32,
              background: "linear-gradient(145deg,rgba(255,252,245,0.96),rgba(248,238,215,0.94))",
              border: "1px solid rgba(200,169,110,0.7)",
              boxShadow: "0 4px 16px rgba(200,169,110,0.28), inset 0 1px 0 rgba(255,255,255,1)",
              backdropFilter: "blur(14px)",
              WebkitBackdropFilter: "blur(14px)",
            }}
            whileHover={{
              scale: 1.18,
              boxShadow: "0 6px 22px rgba(200,169,110,0.5)",
              transition: { duration: 0.22, ease: [0.34, 1.56, 0.64, 1] },
            }}
            whileTap={{ scale: 0.88 }}
          >
            <ArrowUpRight size={13} strokeWidth={2.5} style={{ color: "#7a5218" }} />
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
              width: 32, height: 32,
              background: "linear-gradient(145deg,rgba(18,16,12,0.94),rgba(6,5,3,0.92))",
              border: "1px solid rgba(255,255,255,0.12)",
              boxShadow: "0 4px 16px rgba(0,0,0,0.45), inset 0 1px 0 rgba(255,255,255,0.07)",
              backdropFilter: "blur(14px)",
              WebkitBackdropFilter: "blur(14px)",
            }}
            whileHover={{
              scale: 1.18,
              rotate: 10,
              boxShadow: "0 6px 22px rgba(0,0,0,0.55)",
              transition: { duration: 0.22, ease: [0.34, 1.56, 0.64, 1] },
            }}
            whileTap={{ scale: 0.88 }}
          >
            <Github size={13} strokeWidth={2} style={{ color: "#fff" }} />
          </motion.a>
        </div>
      </div>

      {/* ── CONTENT ── */}
      <div
        className="pj-sans relative z-10 flex flex-1 flex-col"
        style={{ padding: "18px 20px 20px" }}
      >

        {/* Title — 2-line clamp, fixed min-height so alignment stays consistent */}
        <h3
          className="pj-sans font-bold text-[#0e0e0e] leading-snug"
          style={{
            fontSize: 14,
            letterSpacing: "-0.025em",
            display: "-webkit-box",
            WebkitLineClamp: 2,
            WebkitBoxOrient: "vertical",
            overflow: "hidden",
            minHeight: "2.6em",           /* ← reserves space for 2 lines always */
            marginBottom: 8,
          }}
        >
          {project.title}
        </h3>

        {/*
          Description — KEY FIX:
          flex-1 makes it fill remaining space equally in all cards.
          3-line clamp truncates long text.
          Combined effect → all cards identical height.
        */}
        <p
          style={{
            fontSize: 12,
            lineHeight: 1.65,
            color: "#7a7670",
            display: "-webkit-box",
            WebkitLineClamp: 3,
            WebkitBoxOrient: "vertical",
            overflow: "hidden",
            flex: 1,                       /* ← fills remaining space */
            marginBottom: 14,
          }}
        >
          {project.description}
        </p>

        {/* Divider */}
        <div
          style={{
            height: 1,
            background: "linear-gradient(to right,rgba(200,169,110,0.2),rgba(200,169,110,0.06),transparent)",
            marginBottom: 12,
          }}
        />

        {/* Tech tags — fixed height zone, overflow hidden */}
        <motion.div
          className="flex flex-wrap gap-1.5"
          style={{ maxHeight: 52, overflow: "hidden" }}   /* ← fixes tag area height */
          variants={{ hidden: {}, visible: { transition: { staggerChildren: 0.045 } } }}
          initial="hidden"
          animate="visible"
        >
          {project.technologies.map((tech, i) => (
            <motion.span
              key={i}
              className="pj-mono cursor-default select-none"
              style={{
                fontSize: 9,
                fontWeight: 500,
                letterSpacing: "0.04em",
                padding: "3px 9px",
                borderRadius: 6,
                border: "1px solid rgba(200,169,110,0.22)",
                background: "rgba(200,169,110,0.06)",
                color: "#6a5f4e",
              }}
              variants={{
                hidden:  { opacity: 0, scale: 0.82 },
                visible: { opacity: 1, scale: 1, transition: { duration: 0.32, ease: [0.34, 1.56, 0.64, 1] } },
              }}
              whileHover={{
                scale: 1.07,
                y: -1,
                borderColor: "rgba(200,169,110,0.5)",
                color: "#3a2e1e",
                background: "rgba(200,169,110,0.13)",
                transition: { duration: 0.16 },
              }}
            >
              {tech}
            </motion.span>
          ))}
        </motion.div>

      </div>

      {/* Bottom gold micro-line */}
      <motion.div
        className="absolute bottom-0 left-0 right-0"
        style={{
          height: 1,
          background: "linear-gradient(90deg,transparent,rgba(200,169,110,0.2),transparent)",
        }}
        initial={{ opacity: 0 }}
        whileHover={{ opacity: 1 }}
        transition={{ duration: 0.3 }}
      />
    </motion.div>
  );
});
ProjectCard.displayName = "ProjectCard";