
import React, {
  useRef,
  useState,
  useEffect,
  useMemo,
  useCallback,
  memo,
} from "react";

const detectTier = () => {
  if (typeof window === "undefined") return "high";

  const reducedMotion = window.matchMedia?.(
    "(prefers-reduced-motion: reduce)"
  ).matches;
  if (reducedMotion) return "reduced";

  const cores = navigator.hardwareConcurrency ?? 8;
  const mem   = navigator.deviceMemory ?? 8;          // GB, Safari = undefined → 8
  const ua    = navigator.userAgent;
  const isMob = /Android|iPhone|iPad|iPod/i.test(ua);

  if (cores <= 2 || mem <= 1) return "low";
  if (isMob && (cores <= 4 || mem <= 2)) return "mid";
  return "high";
};

/** @type {'high'|'mid'|'low'|'reduced'} */
const PERF_TIER = detectTier();

/**
 * @typedef {{ opacity: number, transform?: string }} AnimState
 * @typedef {{ hidden: AnimState, visible: AnimState, props: string, ease: string }} Variant
 */

/** @type {Record<string, Variant>} */
const VARIANTS = {
  /** Classic gentle rise */
  fadeUp: {
    hidden:  { opacity: 0, transform: "translateY(28px)" },
    visible: { opacity: 1, transform: "translateY(0px)"  },
    props:   "opacity, transform",
    ease:    "cubic-bezier(0.16, 1, 0.3, 1)",          // expo out
  },
  /** Downward entrance */
  fadeDown: {
    hidden:  { opacity: 0, transform: "translateY(-24px)" },
    visible: { opacity: 1, transform: "translateY(0px)"   },
    props:   "opacity, transform",
    ease:    "cubic-bezier(0.16, 1, 0.3, 1)",
  },
  /** Pure opacity — safest for all tiers */
  fadeIn: {
    hidden:  { opacity: 0, transform: "none" },
    visible: { opacity: 1, transform: "none" },
    props:   "opacity",
    ease:    "cubic-bezier(0.4, 0, 0.2, 1)",           // material standard
  },
  /** Left → center */
  slideLeft: {
    hidden:  { opacity: 0, transform: "translateX(-36px)" },
    visible: { opacity: 1, transform: "translateX(0px)"   },
    props:   "opacity, transform",
    ease:    "cubic-bezier(0.25, 1, 0.5, 1)",           // quart out
  },
  /** Right → center */
  slideRight: {
    hidden:  { opacity: 0, transform: "translateX(36px)" },
    visible: { opacity: 1, transform: "translateX(0px)"  },
    props:   "opacity, transform",
    ease:    "cubic-bezier(0.25, 1, 0.5, 1)",
  },
  /** Scale pop — premium card reveal */
  scaleIn: {
    hidden:  { opacity: 0, transform: "scale(0.94) translateY(12px)" },
    visible: { opacity: 1, transform: "scale(1)    translateY(0px)"  },
    props:   "opacity, transform",
    ease:    "cubic-bezier(0.34, 1.56, 0.64, 1)",       // back out (spring-like)
  },
  /** Flip-up — editorial / list items */
  flipUp: {
    hidden:  { opacity: 0, transform: "perspective(600px) rotateX(12deg) translateY(16px)" },
    visible: { opacity: 1, transform: "perspective(600px) rotateX(0deg)  translateY(0px)"  },
    props:   "opacity, transform",
    ease:    "cubic-bezier(0.22, 1, 0.36, 1)",           // circ out
  },
  /** Blur-in — premium glass feel */
  blurIn: {
    hidden:  { opacity: 0, transform: "translateY(16px)", filter: "blur(8px)"  },
    visible: { opacity: 1, transform: "translateY(0px)",  filter: "blur(0px)"  },
    props:   "opacity, transform, filter",
    ease:    "cubic-bezier(0.16, 1, 0.3, 1)",
  },
};

/* ─────────────────────────────────────────────────────────────────
   TIER-SPECIFIC CONFIGURATION
───────────────────────────────────────────────────────────────── */
const TIER_CONFIG = {
  high: {
    durationMultiplier: 1,
    delayMultiplier:    1,
    rootMargin:         "0px 0px -60px 0px",   // trigger 60px before fully visible
    threshold:          0.08,
    allowedVariants:    Object.keys(VARIANTS),  // all variants
  },
  mid: {
    durationMultiplier: 0.75,
    delayMultiplier:    0.6,
    rootMargin:         "0px 0px -20px 0px",
    threshold:          0.05,
    allowedVariants:    ["fadeUp", "fadeIn", "slideLeft", "slideRight", "scaleIn"],
  },
  low: {
    durationMultiplier: 0.5,
    delayMultiplier:    0.3,
    rootMargin:         "100px 0px 100px 0px",  // eager trigger
    threshold:          0.01,
    allowedVariants:    ["fadeIn", "fadeUp"],    // only cheapest
  },
  reduced: {
    durationMultiplier: 0,
    delayMultiplier:    0,
    rootMargin:         "0px",
    threshold:          0,
    allowedVariants:    [],                       // skip all motion
  },
};

/* ─────────────────────────────────────────────────────────────────
   SHARED INTERSECTION OBSERVER FACTORY
   Reuses observers per unique rootMargin+threshold combination
   to avoid creating N observers for N components.
───────────────────────────────────────────────────────────────── */
const observerCache = new Map();

/**
 * Returns a shared IntersectionObserver for the given config key.
 * @param {string} key
 * @param {IntersectionObserverInit} options
 * @param {(entry: IntersectionObserverEntry) => void} onIntersect
 * @returns {{ observer: IntersectionObserver, unsubscribe: () => void }}
 */
const getSharedObserver = (key, options) => {
  if (!observerCache.has(key)) {
    /** @type {Map<Element, (e: IntersectionObserverEntry) => void>} */
    const callbacks = new Map();

    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        callbacks.get(entry.target)?.(entry);
      });
    }, options);

    observerCache.set(key, { observer, callbacks });
  }

  return observerCache.get(key);
};

/* ─────────────────────────────────────────────────────────────────
   useScrollReveal HOOK
───────────────────────────────────────────────────────────────── */
/**
 * @param {{
 *   threshold?: number,
 *   rootMargin?: string,
 *   once?: boolean,
 * }} options
 * @returns {{ ref: React.RefObject<HTMLElement>, isVisible: boolean }}
 */
const useScrollReveal = ({ threshold = 0.1, rootMargin = "0px", once = true } = {}) => {
  const [isVisible, setIsVisible] = useState(false);
  const ref       = useRef(null);
  const hasShown  = useRef(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    // If reduced motion — immediately mark visible
    if (PERF_TIER === "reduced") {
      setIsVisible(true);
      return;
    }

    const key = `${rootMargin}__${threshold}`;
    const { observer, callbacks } = getSharedObserver(key, { threshold, rootMargin });

    const handleIntersect = (entry) => {
      if (entry.isIntersecting) {
        setIsVisible(true);
        hasShown.current = true;
        if (once) observer.unobserve(el);
      } else if (!once && hasShown.current) {
        setIsVisible(false);
      }
    };

    callbacks.set(el, handleIntersect);
    observer.observe(el);

    return () => {
      observer.unobserve(el);
      callbacks.delete(el);
    };
  }, [threshold, rootMargin, once]);

  return { ref, isVisible };
};

/* ─────────────────────────────────────────────────────────────────
   BUILD INLINE STYLES
───────────────────────────────────────────────────────────────── */
/**
 * Computes the complete inline style object for the current state.
 * @param {boolean}  isVisible
 * @param {string}   animation
 * @param {number}   duration   base ms
 * @param {number}   delay      base ms
 * @returns {React.CSSProperties}
 */
const buildStyles = (isVisible, animation, duration, delay) => {
  const tier   = TIER_CONFIG[PERF_TIER];

  // Reduced motion — immediately visible, no transition
  if (PERF_TIER === "reduced") {
    return { opacity: 1 };
  }

  // Resolve variant — fall back to fadeUp if not allowed on this tier
  const allowed  = tier.allowedVariants.includes(animation);
  const key      = allowed ? animation : (tier.allowedVariants[0] ?? "fadeIn");
  const variant  = VARIANTS[key] ?? VARIANTS.fadeIn;

  const adjDuration = Math.round(duration * tier.durationMultiplier);
  const adjDelay    = Math.round(delay    * tier.delayMultiplier);

  const state = isVisible ? variant.visible : variant.hidden;

  return {
    ...state,
    transition: isVisible
      ? `${variant.props} ${adjDuration}ms ${variant.ease} ${adjDelay}ms`
      : "none",                                           // no reverse transition
    willChange: isVisible ? "auto" : variant.props,
  };
};

/* ─────────────────────────────────────────────────────────────────
   ScrollReveal COMPONENT
───────────────────────────────────────────────────────────────── */

/**
 * @typedef {Object} ScrollRevealProps
 * @property {React.ReactNode}  children
 * @property {'fadeUp'|'fadeDown'|'fadeIn'|'slideLeft'|'slideRight'|'scaleIn'|'flipUp'|'blurIn'} [animation='fadeUp']
 * @property {number}  [delay=0]       — milliseconds
 * @property {number}  [duration=680]  — milliseconds
 * @property {number}  [threshold]     — override default threshold
 * @property {boolean} [once=true]     — if false, re-animates on scroll back
 * @property {string}  [className]
 * @property {React.CSSProperties} [style]
 * @property {string}  [as='div']      — rendered HTML tag
 */

/** @type {React.FC<ScrollRevealProps>} */
const ScrollReveal = memo(({
  children,
  animation  = "fadeUp",
  delay      = 0,
  duration   = 680,
  threshold,
  once       = true,
  className,
  style,
  as: Tag    = "div",
}) => {
  const tier   = TIER_CONFIG[PERF_TIER];
  const thr    = threshold ?? tier.threshold;
  const margin = tier.rootMargin;

  const { ref, isVisible } = useScrollReveal({
    threshold: thr,
    rootMargin: margin,
    once,
  });

  const animationStyle = useMemo(
    () => buildStyles(isVisible, animation, duration, delay),
    [isVisible, animation, duration, delay]
  );

  // willChange cleanup after animation completes
  const cleanupRef = useRef(null);
  useEffect(() => {
    if (!isVisible) return;

    const totalMs =
      Math.round(duration * tier.durationMultiplier) +
      Math.round(delay    * tier.durationMultiplier) +
      80; // buffer

    cleanupRef.current = setTimeout(() => {
      if (ref.current) ref.current.style.willChange = "auto";
    }, totalMs);

    return () => clearTimeout(cleanupRef.current);
  }, [isVisible]);                                        // eslint-disable-line

  return (
    <Tag
      ref={ref}
      className={className}
      style={{ ...animationStyle, ...style }}
    >
      {children}
    </Tag>
  );
});

ScrollReveal.displayName = "ScrollReveal";

/* ─────────────────────────────────────────────────────────────────
   STAGGER WRAPPER
   Convenience component that auto-staggers direct children.
───────────────────────────────────────────────────────────────── */

/**
 * @typedef {Object} StaggerProps
 * @property {React.ReactNode} children
 * @property {number}  [stagger=80]     — ms between each child
 * @property {number}  [baseDelay=0]    — ms before first child
 * @property {ScrollRevealProps} [itemProps] — passed to each child's ScrollReveal
 * @property {string}  [className]
 */

/** @type {React.FC<StaggerProps>} */
export const StaggerReveal = memo(({
  children,
  stagger    = 80,
  baseDelay  = 0,
  itemProps  = {},
  className,
}) => {
  const items = React.Children.toArray(children);

  return (
    <div className={className}>
      {items.map((child, i) => (
        <ScrollReveal
          key={i}
          delay={baseDelay + i * stagger}
          {...itemProps}
        >
          {child}
        </ScrollReveal>
      ))}
    </div>
  );
});

StaggerReveal.displayName = "StaggerReveal";

/* ─────────────────────────────────────────────────────────────────
   EXPORTS
───────────────────────────────────────────────────────────────── */
export { PERF_TIER, VARIANTS, TIER_CONFIG, useScrollReveal };
export default ScrollReveal;

