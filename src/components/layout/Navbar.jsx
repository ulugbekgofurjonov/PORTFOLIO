import React, { useState, useEffect, useRef, useCallback, memo } from "react";
import { Code2, Download, Globe, ArrowRight, X } from "lucide-react";
import { NAV_LINKS } from "../../utils/constants";
import { useScrollSpy } from "../../hooks/useScrollSpy";
import { useLanguage } from "../../contexts/LanguageContext";

export default function Navbar() {
  const [scrolled,  setScrolled]  = useState(false);
  const [progress,  setProgress]  = useState(0);
  const [menuOpen,  setMenuOpen]  = useState(false);
  const [mounted,   setMounted]   = useState(false);
  const rafRef  = useRef(null);
  const prevTop = useRef(0);

  const { language, toggleLanguage } = useLanguage();
  const navLinks      = NAV_LINKS[language];
  const activeSection = useScrollSpy(navLinks.map((l) => l.id));

  useEffect(() => { requestAnimationFrame(() => setMounted(true)); }, []);

  const onScroll = useCallback(() => {
    if (rafRef.current) return;
    rafRef.current = requestAnimationFrame(() => {
      rafRef.current = null;
      const top = window.scrollY;
      if (top === prevTop.current) return;
      prevTop.current = top;
      const max = document.documentElement.scrollHeight - window.innerHeight;
      setScrolled(top > 24);
      setProgress(max > 0 ? top / max : 0);
    });
  }, []);

  useEffect(() => {
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => {
      window.removeEventListener("scroll", onScroll);
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
    };
  }, [onScroll]);

  useEffect(() => {
    document.body.style.overflow = menuOpen ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [menuOpen]);

  const close    = useCallback(() => setMenuOpen(false), []);
  const goto     = useCallback((id) => {
    const el = document.getElementById(id);
    if (el) window.scrollTo({ top: el.getBoundingClientRect().top + window.pageYOffset - 80, behavior: "smooth" });
    close();
  }, [close]);
  const download = useCallback(() => {
    const a = Object.assign(document.createElement("a"), {
      href: "/resume.pdf", download: "Ulugbek_Gofurjonov_Resume.pdf",
    });
    document.body.appendChild(a); a.click(); document.body.removeChild(a);
    close();
  }, [close]);

  const cvLabel = language === "uz" ? "Yuklab olish" : "Download CV";

  return (
    <>
      {/*
        ┌──────────────────────────────────────────────┐
        │  HEADER  z-[9999]  — DOIM TEPADA, O'ZGARMAYDI│
        │  Menu ochilsa ham bu element siljimaydi       │
        └──────────────────────────────────────────────┘
      */}
      <header
        className={`fixed inset-x-0 top-0 z-[9999] w-full transition-all duration-400 ${
          mounted ? "opacity-100" : "opacity-0"
        } ${
          scrolled
            ? "border-b border-[#ddd8cf] shadow-[0_4px_24px_rgba(0,0,0,0.07)]"
            : "border-b border-[#e0dbd0]"
        }`}
        style={{ background: "#faf9f6" }}
      >
        {/* shimmer */}
        <div
          className="absolute inset-x-0 top-0 h-px pointer-events-none"
          style={{ background: "linear-gradient(90deg,transparent,rgba(200,169,110,0.45) 50%,transparent)" }}
        />
        {/* progress bar */}
        <div
          className="absolute bottom-0 left-0 h-[1.5px] w-full origin-left will-change-transform"
          style={{ transform:`scaleX(${progress})`, background:"linear-gradient(90deg,#c8a96e,#a8824a)", transition:"transform .15s linear" }}
        />

        <div className="mx-auto flex h-[68px] max-w-7xl items-center justify-between gap-4 px-4 sm:px-6 lg:px-8">

          {/* LOGO */}
          <Logo onPress={() => { window.scrollTo({ top:0, behavior:"smooth" }); close(); }} />

          {/* DESKTOP NAV */}
          <nav aria-label="Primary navigation" className="hidden lg:flex items-center gap-0.5 rounded-full border border-[#ddd8cf] bg-[#ede8e0] p-1">
            {navLinks.map((l) => (
              <DeskLink key={l.id} label={l.label} active={activeSection === l.id} onClick={() => goto(l.id)} />
            ))}
          </nav>

          {/* DESKTOP ACTIONS */}
          <div className="hidden lg:flex items-center gap-2.5">
            <LangBtn lang={language} onToggle={toggleLanguage} />
            <CVBtn label={cvLabel} onClick={download} />
          </div>

          {/*
            HAMBURGER — lg:hidden
            Bu tugma headerda — menu ochilganda ham o'z joyida turadi
            chunki header z-[9999], menu esa z-[9998] (pastroq)
          */}
          <HamBtn open={menuOpen} onToggle={() => setMenuOpen(v => !v)} />
        </div>
      </header>

      {/*
        ┌──────────────────────────────────────────────┐
        │  MOBILE MENU  z-[9998]  — HEADERDAN PAST     │
        │  top: 68px  →  header ostidan boshlanadi     │
        │  Header va uning elementlari ko'rinadi        │
        └──────────────────────────────────────────────┘
      */}

      {/* Backdrop — header ostidan, faqat menu maydoni */}
      <div
        aria-hidden
        onClick={close}
        className="lg:hidden fixed inset-x-0 bottom-0 z-[9997]"
        style={{
          top: 68,                       /* headerdan past */
          background: "rgba(15,15,15,0.18)",
          backdropFilter: "blur(3px)",
          WebkitBackdropFilter: "blur(3px)",
          opacity: menuOpen ? 1 : 0,
          pointerEvents: menuOpen ? "auto" : "none",
          transition: "opacity .35s ease",
        }}
      />

      {/* Menu panel */}
      <div
        role="dialog"
        aria-modal="true"
        aria-hidden={!menuOpen}
        className="lg:hidden fixed inset-x-0 bottom-0 z-[9998] flex flex-col"
        style={{
          top: 68,                        /* headerdan past — tepaga chiqmaydi */
          background: "#faf9f6",
          transform: menuOpen ? "translateY(0)" : "translateY(-110%)",
          opacity: menuOpen ? 1 : 0,
          transition: "transform .48s cubic-bezier(.16,1,.3,1), opacity .25s ease",
          pointerEvents: menuOpen ? "auto" : "none",
          overflowY: "auto",
        }}
      >
        {/* gold top line */}
        <div
          aria-hidden
          className="absolute inset-x-0 top-0 h-[2px]"
          style={{ background: "linear-gradient(90deg,#c8a96e,#a8824a,#c8a96e)" }}
        />
        {/* warm glow */}
        <div
          aria-hidden
          className="absolute inset-x-0 top-0 h-60 pointer-events-none"
          style={{ background: "radial-gradient(ellipse 80% 100% at 50% 0%,rgba(200,169,110,0.06),transparent)" }}
        />
        {/* grid */}
        <div
          aria-hidden
          className="absolute inset-0 pointer-events-none"
          style={{ backgroundImage:"linear-gradient(rgba(200,169,110,0.04) 1px,transparent 1px),linear-gradient(90deg,rgba(200,169,110,0.04) 1px,transparent 1px)", backgroundSize:"60px 60px" }}
        />

        {/* Nav links */}
        <div className="relative flex flex-1 flex-col items-start justify-center px-8 sm:px-14 py-4">
          {navLinks.map((l, i) => (
            <FullscreenLink
              key={l.id}
              label={l.label}
              index={i + 1}
              active={activeSection === l.id}
              delay={i * 60 + 80}
              open={menuOpen}
              onClick={() => goto(l.id)}
            />
          ))}
        </div>

        {/* Footer */}
        <div
          className={`relative border-t border-[#e0dbd0] px-6 py-5 mob-footer ${menuOpen ? "mob-footer--in" : ""}`}
          style={{ transitionDelay: menuOpen ? `${navLinks.length * 60 + 120}ms` : "0ms" }}
        >
          <div className="flex items-center gap-3">
            <button
              onClick={toggleLanguage}
              className="cursor-pointer flex flex-1 items-center justify-center gap-2 rounded-xl border border-[#ddd8cf] py-3 text-sm font-medium text-[#6b6b6b] transition-colors duration-200"
              style={{ background:"#ede8e0" }}
              onMouseEnter={e => e.currentTarget.style.background="#e0dbd0"}
              onMouseLeave={e => e.currentTarget.style.background="#ede8e0"}
            >
              <Globe size={14} strokeWidth={1.8} />
              {language === "uz" ? "O'zbekcha" : "English"}
            </button>
            <button
              onClick={download}
              className="cursor-pointer group relative flex flex-[2] items-center justify-center gap-2.5 overflow-hidden rounded-xl bg-[#0f0f0f] py-3 text-sm font-semibold text-white shadow-[0_4px_16px_rgba(0,0,0,0.18)] transition-all duration-200 hover:bg-[#1a1a1a] hover:-translate-y-0.5 active:translate-y-0"
            >
              <span className="absolute inset-0 -translate-x-full skew-x-[-12deg] bg-gradient-to-r from-transparent via-white/15 to-transparent transition-transform duration-500 group-hover:translate-x-full" />
              <Download size={14} strokeWidth={1.8} className="relative z-10 transition-transform duration-300 group-hover:-translate-y-0.5" />
              <span className="relative z-10">{cvLabel}</span>
            </button>
          </div>
          <p className="mt-3 text-center text-[10px] uppercase tracking-widest" style={{ fontFamily:"'DM Mono',monospace", color:"rgba(200,169,110,0.5)" }}>
            UG Portfolio © {new Date().getFullYear()}
          </p>
        </div>
      </div>

      {/* Page spacer */}
      <div className="h-[68px]" />

      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=DM+Sans:ital,wght@0,300;0,400;0,500;0,600;0,700;1,400&family=DM+Mono:wght@400;500&display=swap');
        *, *::before, *::after { box-sizing: border-box; }
        header, nav, button { font-family: 'DM Sans', system-ui, sans-serif; }

        .mob-footer { opacity:0; transform:translateY(16px); transition:opacity .4s ease, transform .45s cubic-bezier(.34,1.56,.64,1); }
        .mob-footer--in { opacity:1; transform:translateY(0); }

        .mlink {
          opacity:0; transform:translateX(-20px);
          transition: opacity .42s cubic-bezier(.16,1,.3,1), transform .42s cubic-bezier(.16,1,.3,1), padding-left .28s cubic-bezier(.34,1.56,.64,1);
        }
        .mlink--in { opacity:1; transform:translateX(0); }
        .mlink:hover, .mlink--active { padding-left:10px; }
        .mlink-label { transition:color .2s, transform .26s cubic-bezier(.34,1.56,.64,1); }
        .mlink:hover .mlink-label { color:#0f0f0f; transform:translateX(4px); }
        .mlink--active .mlink-label { color:#0f0f0f; }
        .mlink-num { transition:color .2s; }
        .mlink:hover .mlink-num { color:#a8824a; }
        .mlink-arrow { opacity:0; transform:translateX(-10px); transition:opacity .22s, transform .32s cubic-bezier(.34,1.56,.64,1); }
        .mlink:hover .mlink-arrow, .mlink-arrow--active { opacity:1; transform:translateX(0); }

        @media (prefers-reduced-motion: reduce) {
          *, *::before, *::after { animation-duration:.01ms !important; transition-duration:.01ms !important; }
        }
      `}</style>
    </>
  );
}

/* ══════════════ SUB-COMPONENTS ══════════════ */

const Logo = memo(({ onPress }) => (
  <button
    onClick={onPress}
    aria-label="Back to top"
    className="cursor-pointer group flex flex-shrink-0 items-center gap-2.5 focus:outline-none"
  >
    <span
      className="relative flex h-[34px] w-[34px] items-center justify-center overflow-hidden rounded-[9px] bg-[#0f0f0f] text-white shadow-[0_2px_8px_rgba(0,0,0,0.18)]"
      style={{ transition:"transform .35s cubic-bezier(.34,1.56,.64,1), box-shadow .3s" }}
      onMouseEnter={e => { e.currentTarget.style.transform="rotate(-10deg) scale(1.08)"; e.currentTarget.style.boxShadow="0 6px 18px rgba(0,0,0,0.2)"; }}
      onMouseLeave={e => { e.currentTarget.style.transform="rotate(0) scale(1)"; e.currentTarget.style.boxShadow="0 2px 8px rgba(0,0,0,0.18)"; }}
    >
      <Code2 size={14} strokeWidth={2.5} />
    </span>
    <span className="text-[15px] font-semibold text-[#0f0f0f]" style={{ fontFamily:"'DM Sans',system-ui,sans-serif", letterSpacing:"-0.025em" }}>
      <em style={{ fontStyle:"normal", fontWeight:800 }}>U</em>lgubek
      <span style={{ color:"#c8a96e", fontSize:20, lineHeight:0, verticalAlign:"-1px" }}>.</span>
    </span>
  </button>
));

const DeskLink = memo(({ label, active, onClick }) => (
  <button
    onClick={onClick}
    className={`cursor-pointer relative flex items-center gap-1.5 rounded-full px-4 py-2 text-[13.5px] font-medium transition-all duration-200 focus:outline-none ${
      active
        ? "text-[#0f0f0f] font-semibold shadow-[0_1px_4px_rgba(0,0,0,0.08),0_0_0_1px_rgba(0,0,0,0.05)]"
        : "text-[#6b6b6b]"
    }`}
    style={{ fontFamily:"'DM Sans',system-ui,sans-serif", background: active ? "#faf9f6" : "transparent" }}
    onMouseEnter={e => { if (!active) e.currentTarget.style.background="rgba(250,249,246,0.85)"; }}
    onMouseLeave={e => { if (!active) e.currentTarget.style.background="transparent"; }}
  >
    {label}
    {active && <span className="h-[5px] w-[5px] rounded-full bg-[#c8a96e] shadow-[0_0_5px_rgba(200,169,110,0.6)]" />}
  </button>
));

const LangBtn = memo(({ lang, onToggle }) => (
  <button
    onClick={onToggle}
    className="cursor-pointer flex items-center gap-1.5 rounded-[10px] border border-[#ddd8cf] px-3 py-[7px] text-[11px] font-medium uppercase tracking-[0.07em] text-[#6b6b6b] transition-all duration-200 hover:text-[#0f0f0f] hover:-translate-y-px hover:shadow-sm"
    style={{ fontFamily:"'DM Mono',monospace", background:"#faf9f6" }}
    onMouseEnter={e => e.currentTarget.style.background="#ede8e0"}
    onMouseLeave={e => e.currentTarget.style.background="#faf9f6"}
  >
    <Globe size={12} strokeWidth={2} />
    {lang}
  </button>
));

const CVBtn = memo(({ label, onClick }) => (
  <button
    onClick={onClick}
    className="cursor-pointer group relative flex items-center gap-2 overflow-hidden rounded-[10px] bg-[#0f0f0f] px-[18px] py-[9px] text-[13px] font-semibold text-white shadow-[0_2px_12px_rgba(0,0,0,0.18)] transition-all duration-250 hover:-translate-y-0.5 hover:bg-[#1a1a1a] hover:shadow-[0_10px_28px_rgba(15,15,15,0.22)] active:translate-y-0"
    style={{ fontFamily:"'DM Sans',system-ui,sans-serif" }}
  >
    <span className="absolute inset-0 -translate-x-full skew-x-[-12deg] bg-gradient-to-r from-transparent via-white/15 to-transparent transition-transform duration-500 group-hover:translate-x-full" />
    <Download size={13} strokeWidth={2} className="relative z-10" />
    <span className="relative z-10">{label}</span>
    <ArrowRight size={12} strokeWidth={2.5} className="relative z-10 opacity-50 transition-all duration-200 group-hover:translate-x-0.5 group-hover:opacity-100" />
  </button>
));

const HamBtn = memo(({ open, onToggle }) => (
  <button
    onClick={onToggle}
    aria-label={open ? "Close menu" : "Open menu"}
    aria-expanded={open}
    className="cursor-pointer lg:hidden flex h-10 w-10 flex-shrink-0 flex-col items-center justify-center gap-[5px] rounded-[10px] border border-[#ddd8cf] transition-all duration-250 focus:outline-none hover:shadow-[0_2px_8px_rgba(0,0,0,0.07)]"
    style={{ background: open ? "#ede8e0" : "#faf9f6" }}
  >
    <span className={`block h-px w-[17px] rounded-full bg-[#0f0f0f] origin-center transition-all duration-300 ${open ? "translate-y-[6px] rotate-45" : ""}`} />
    <span className={`block h-px rounded-full bg-[#0f0f0f] transition-all duration-300 ${open ? "w-0 opacity-0" : "w-[17px] opacity-100"}`} />
    <span className={`block h-px w-[17px] rounded-full bg-[#0f0f0f] origin-center transition-all duration-300 ${open ? "-translate-y-[6px] -rotate-45" : ""}`} />
  </button>
));

const FullscreenLink = memo(({ label, index, active, delay, open, onClick }) => (
  <button
    onClick={onClick}
    className={`mlink cursor-pointer group flex w-full items-center gap-5 border-b border-[#e0dbd0] py-5 text-left last:border-0 focus:outline-none ${active ? "mlink--active" : ""} ${open ? "mlink--in" : ""}`}
    style={{ transitionDelay: open ? `${delay}ms` : "0ms" }}
  >
    <span className="mlink-num w-6 flex-shrink-0 text-[11px] font-medium tracking-[0.06em] text-[#c8a96e]" style={{ fontFamily:"'DM Mono',monospace" }}>
      0{index}
    </span>
    <span className={`mlink-label flex-1 text-[26px] font-semibold sm:text-[30px] ${active ? "text-[#0f0f0f]" : "text-[#9a9a9a]"}`}
      style={{ fontFamily:"'DM Sans',system-ui,sans-serif", letterSpacing:"-0.025em" }}>
      {label}
    </span>
    <ArrowRight size={16} strokeWidth={2} className={`mlink-arrow flex-shrink-0 text-[#c8a96e] ${active ? "mlink-arrow--active" : ""}`} />
  </button>
));