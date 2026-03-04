import { useEffect, useState, useRef, useCallback } from "react";

/* ═══════════════════════════════════════════════════════════════
   useScrollSpy  —  Premium Edition v3
   ───────────────────────────────────────────────────────────────
   ASOSIY TUZATISH:
   Agar hech qaysi nav section ko'rinmasa (masalan hero da tursa)
   → "" qaytaradi — hech qaysi nav link yonmaydi
   ═══════════════════════════════════════════════════════════════ */
export const useScrollSpy = (sectionIds = [], offset = 80) => {
  // Boshlang'ich holat "" — hech narsa aktiv emas
  const [activeSection, setActiveSection] = useState("");

  const sectionIdsRef = useRef(sectionIds);
  const offsetRef     = useRef(offset);
  const rafRef        = useRef(null);

  useEffect(() => {
    sectionIdsRef.current = sectionIds;
    offsetRef.current     = offset;
  });

  const getActive = useCallback(() => {
    const ids     = sectionIdsRef.current;
    const off     = offsetRef.current;
    const scrollY = window.scrollY;
    const winH    = window.innerHeight;
    const docH    = document.documentElement.scrollHeight;

    if (ids.length === 0) return "";

    // Sahifaning eng pastida — hech narsa yonmasin (footer zone)
    if (scrollY + winH >= docH - 2) {
      return "";
    }

    // Birinchi nav sectionning tepasidan ham yuqorida →
    // hech qaysi link aktiv bo'lmasin (hero zone)
    const firstEl = document.getElementById(ids[0]);
    if (!firstEl || scrollY + off < firstEl.offsetTop) {
      return ""; // ← asosiy tuzatish shu
    }

    // Odatiy: pastdan yuqoriga qarab izlaymiz
    for (let i = ids.length - 1; i >= 0; i--) {
      const el = document.getElementById(ids[i]);
      if (!el) continue;
      if (scrollY + off >= el.offsetTop) {
        return ids[i];
      }
    }

    return "";
  }, []);

  useEffect(() => {
    if (typeof window === "undefined" || sectionIds.length === 0) return;

    const onScroll = () => {
      if (rafRef.current) return;
      rafRef.current = requestAnimationFrame(() => {
        rafRef.current = null;
        const next = getActive();
        setActiveSection((prev) => (prev === next ? prev : next));
      });
    };

    // Boshlang'ich holat
    setActiveSection(getActive());

    window.addEventListener("scroll", onScroll, { passive: true });
    return () => {
      window.removeEventListener("scroll", onScroll);
      if (rafRef.current) {
        cancelAnimationFrame(rafRef.current);
        rafRef.current = null;
      }
    };
  }, [sectionIds, offset, getActive]);

  return activeSection;
};

/* ═══════════════════════════════════════════════════════════════
   scrollToSection
   ═══════════════════════════════════════════════════════════════ */
export const scrollToSection = (sectionId, offset = 80, onDone) => {
  if (typeof window === "undefined") return;

  const el = document.getElementById(sectionId);
  if (!el) return;

  const targetY = el.getBoundingClientRect().top + window.scrollY - offset;

  if ("scrollBehavior" in document.documentElement.style) {
    window.scrollTo({ top: targetY, behavior: "smooth" });
    if (typeof onDone === "function") {
      const t = setTimeout(onDone, 600);
      return () => clearTimeout(t);
    }
    return;
  }

  // JS easeInOutCubic fallback
  const startY   = window.scrollY;
  const distance = targetY - startY;
  const duration = Math.min(Math.abs(distance) * 0.5, 700);
  let   startTime = null;

  const ease = (t) =>
    t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2;

  const step = (ts) => {
    if (!startTime) startTime = ts;
    const progress = Math.min((ts - startTime) / duration, 1);
    window.scrollTo(0, startY + distance * ease(progress));
    if (progress < 1) requestAnimationFrame(step);
    else if (typeof onDone === "function") onDone();
  };

  requestAnimationFrame(step);
};

/* ═══════════════════════════════════════════════════════════════
   useScrollProgress  —  0 → 1
   ═══════════════════════════════════════════════════════════════ */
export const useScrollProgress = () => {
  const [progress, setProgress] = useState(0);
  const rafRef = useRef(null);

  useEffect(() => {
    if (typeof window === "undefined") return;

    const update = () => {
      const max = document.documentElement.scrollHeight - window.innerHeight;
      setProgress(max > 0 ? window.scrollY / max : 0);
    };

    const onScroll = () => {
      if (rafRef.current) return;
      rafRef.current = requestAnimationFrame(() => {
        rafRef.current = null;
        update();
      });
    };

    update();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => {
      window.removeEventListener("scroll", onScroll);
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
    };
  }, []);

  return progress;
};