import { useEffect, useRef, useState, useMemo, memo, useCallback } from "react";

/*
 ╔══════════════════════════════════════════════════════════╗
 ║  FadeIn  —  Premium Scroll Animation Utility             ║
 ║                                                          ║
 ║  Props:                                                  ║
 ║    delay     — ms, default 0                             ║
 ║    duration  — ms, default 550                           ║
 ║    y         — translateY start px, default 20           ║
 ║    x         — translateX start px, default 0            ║
 ║    scale     — transform scale start, default 1          ║
 ║    threshold — IO threshold, default 0.08                ║
 ║    once      — animate only once, default **FALSE**      ║
 ║    className — wrapper className                         ║
 ║    as        — wrapper tag, default "div"                ║
 ╚══════════════════════════════════════════════════════════╝
*/

/* ── Preference detection (modul darajasida, bir marta) ── */
const prefersReduced =
  typeof window !== "undefined"
    ? window.matchMedia("(prefers-reduced-motion: reduce)").matches
    : false;

const isLowEnd =
  typeof navigator !== "undefined"
    ? (navigator.hardwareConcurrency ?? 8) <= 4 ||
      (navigator.deviceMemory ?? 8) <= 2
    : false;

/* ── Easing presets ── */
export const EASE = {
  smooth:  "cubic-bezier(.16,1,.3,1)",
  spring:  "cubic-bezier(.34,1.56,.64,1)",
  out:     "cubic-bezier(.4,0,.2,1)",
  linear:  "linear",
};

/* ══════════════════════════════════════════════════════════
   FadeIn
══════════════════════════════════════════════════════════ */
const FadeIn = memo(({
  children,
  delay     = 0,
  duration  = 550,
  y         = 20,
  x         = 0,
  scale     = 1,
  ease      = EASE.smooth,
  threshold = 0.08,
  once      = false,  // ✅ default false qilib o'zgartirdim
  className = "",
  style     = {},
  as: Tag   = "div",
}) => {
  const ref        = useRef(null);
  const [isVisible, setIsVisible] = useState(false);
  const [hasAnimated, setHasAnimated] = useState(false);

  /* Reduce motion → instant show */
  const shouldAnimate = !prefersReduced;

  /* Adjusted timings for low-end devices */
  const adjDuration = useMemo(
    () => (isLowEnd ? Math.round(duration * 0.65) : duration),
    [duration]
  );
  const adjDelay = useMemo(
    () => (isLowEnd ? Math.round(delay * 0.5) : delay),
    [delay]
  );

  /* IntersectionObserver callback */
  const handleIntersection = useCallback(([entry]) => {
    if (!entry.isIntersecting) return;
    
    setIsVisible(true);
    setHasAnimated(true);
    
    if (once) {
      // once true bo'lsa, observerni to'xtat
      if (ref.current && ref.current._observer) {
        ref.current._observer.disconnect();
        ref.current._observer = null;
      }
    }
  }, [once]);

  useEffect(() => {
    if (!shouldAnimate) { 
      setIsVisible(true); 
      return; 
    }

    const el = ref.current;
    if (!el) return;

    const io = new IntersectionObserver(handleIntersection, {
      threshold: isLowEnd ? Math.max(threshold, 0.04) : threshold,
      rootMargin: isLowEnd ? "60px 0px 60px 0px" : "0px 0px -40px 0px",
    });

    io.observe(el);
    el._observer = io;  // observerni ref ga saqlaymiz

    return () => {
      if (el._observer) {
        el._observer.disconnect();
        el._observer = null;
      }
    };
  }, [shouldAnimate, threshold, once, handleIntersection]);

  /* Reset animation when element leaves viewport (if once=false) */
  useEffect(() => {
    if (once || !shouldAnimate || !ref.current) return;

    const el = ref.current;
    
    const checkVisibility = () => {
      if (!el) return;
      
      const rect = el.getBoundingClientRect();
      const windowHeight = window.innerHeight;
      
      // Element viewportdan chiqib ketganmi?
      const isOutside = rect.bottom < 0 || rect.top > windowHeight;
      
      if (isOutside && isVisible) {
        setIsVisible(false);
      }
    };

    window.addEventListener('scroll', checkVisibility);
    window.addEventListener('resize', checkVisibility);

    return () => {
      window.removeEventListener('scroll', checkVisibility);
      window.removeEventListener('resize', checkVisibility);
    };
  }, [once, shouldAnimate, isVisible]);

  /* Cleanup will-change after animation */
  useEffect(() => {
    if (!isVisible || !shouldAnimate) return;
    const total = adjDuration + adjDelay + 60;
    const t = setTimeout(() => {
      if (ref.current) ref.current.style.willChange = "auto";
    }, total);
    return () => clearTimeout(t);
  }, [isVisible, adjDuration, adjDelay, shouldAnimate]);

  /* ── Styles ── */
  const fromTransform = buildTransform({ x, y, scale });

  const motionStyle = useMemo(() => {
    if (!shouldAnimate) return {};

    if (isVisible) return {
      opacity: 1,
      transform: "translateX(0) translateY(0) scale(1)",
      transition: [
        `opacity ${adjDuration}ms ${ease} ${adjDelay}ms`,
        `transform ${adjDuration}ms ${ease} ${adjDelay}ms`,
      ].join(", "),
      willChange: "opacity, transform",
    };

    return {
      opacity: 0,
      transform: fromTransform,
      willChange: "opacity, transform",
    };
  }, [isVisible, shouldAnimate, adjDuration, adjDelay, ease, fromTransform]);

  return (
    <Tag
      ref={ref}
      className={className}
      style={{ ...motionStyle, ...style }}
    >
      {children}
    </Tag>
  );
});

FadeIn.displayName = "FadeIn";
export default FadeIn;

/* ── helpers ── */
function buildTransform({ x, y, scale }) {
  const parts = [];
  if (x !== 0)     parts.push(`translateX(${x}px)`);
  if (y !== 0)     parts.push(`translateY(${y}px)`);
  if (scale !== 1) parts.push(`scale(${scale})`);
  return parts.length ? parts.join(" ") : "none";
}

/* ══════════════════════════════════════════════════════════
   Stagger — bir guruh FadeIn ni ketma-ket chiqarish
   
   Ishlatish:
     <Stagger baseDelay={100} step={80}>
       <div>Item 1</div>
       <div>Item 2</div>
       <div>Item 3</div>
     </Stagger>
══════════════════════════════════════════════════════════ */
export const Stagger = memo(({
  children,
  baseDelay = 0,
  step      = 70,
  duration  = 550,
  y         = 20,
  x         = 0,
  scale     = 1,
  ease      = EASE.smooth,
  threshold = 0.08,
  once      = false,
  className = "",
}) => {
  const items = Array.isArray(children) ? children : [children];

  return (
    <div className={className}>
      {items.map((child, i) => (
        <FadeIn
          key={i}
          delay={baseDelay + i * step}
          duration={duration}
          y={y}
          x={x}
          scale={scale}
          ease={ease}
          threshold={threshold}
          once={once}
        >
          {child}
        </FadeIn>
      ))}
    </div>
  );
});

Stagger.displayName = "Stagger";