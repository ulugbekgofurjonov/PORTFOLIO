import React, { useMemo, useEffect, useRef } from "react";
import { useScrollReveal } from "../../hooks/useScrollReveal";

const ScrollReveal = ({
  children,
  animation = "fadeUp",
  delay = 0,
  duration = 700,
  threshold = 0.1,
}) => {
  const elementRef = useRef(null);
  
  // Performance detection
  const performanceSettings = useMemo(() => {
    const isMobile = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);
    const isLowEnd = navigator.hardwareConcurrency <= 4 || navigator.deviceMemory <= 4;
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    
    return {
      isMobile,
      isLowEnd: isMobile || isLowEnd,
      shouldAnimate: !prefersReducedMotion,
      // Low-end devicelarda tezroq va oddiyroq animatsiya
      adjustedDuration: prefersReducedMotion ? 0 : (isMobile || isLowEnd ? Math.min(duration * 0.6, 400) : duration),
      adjustedDelay: prefersReducedMotion ? 0 : (isMobile || isLowEnd ? delay * 0.5 : delay),
    };
  }, [duration, delay]);

  // Optimized threshold - mobilda katta threshold
  const optimizedThreshold = useMemo(() => {
    return performanceSettings.isLowEnd ? Math.max(threshold, 0.05) : threshold;
  }, [threshold, performanceSettings.isLowEnd]);

  const { ref, isVisible } = useScrollReveal({ 
    threshold: optimizedThreshold,
    rootMargin: performanceSettings.isLowEnd ? "100px 0px 100px 0px" : "50px 0px -50px 0px"
  });

  // Animation styles - inline, not classes (better performance)
  const animationStyles = useMemo(() => {
    if (!performanceSettings.shouldAnimate) {
      return {
        opacity: 1,
        transform: 'none',
      };
    }

    // Low-end devicelarda faqat opacity animation
    if (performanceSettings.isLowEnd) {
      return {
        opacity: isVisible ? 1 : 0,
        transition: `opacity ${performanceSettings.adjustedDuration}ms ease-out ${performanceSettings.adjustedDelay}ms`,
        willChange: isVisible ? 'auto' : 'opacity',
      };
    }

    // High-end devicelarda full animations
    const animations = {
      fadeUp: {
        initial: { opacity: 0, transform: 'translateY(20px)' },
        visible: { opacity: 1, transform: 'translateY(0)' },
        properties: 'opacity, transform',
      },
      fadeIn: {
        initial: { opacity: 0, transform: 'none' },
        visible: { opacity: 1, transform: 'none' },
        properties: 'opacity',
      },
      slideLeft: {
        initial: { opacity: 0, transform: 'translateX(-30px)' },
        visible: { opacity: 1, transform: 'translateX(0)' },
        properties: 'opacity, transform',
      },
      slideRight: {
        initial: { opacity: 0, transform: 'translateX(30px)' },
        visible: { opacity: 1, transform: 'translateX(0)' },
        properties: 'opacity, transform',
      },
      scaleIn: {
        initial: { opacity: 0, transform: 'scale(0.95)' },
        visible: { opacity: 1, transform: 'scale(1)' },
        properties: 'opacity, transform',
      },
    };

    const selectedAnimation = animations[animation] || animations.fadeUp;
    const state = isVisible ? selectedAnimation.visible : selectedAnimation.initial;

    return {
      opacity: state.opacity,
      transform: state.transform,
      transition: `${selectedAnimation.properties} ${performanceSettings.adjustedDuration}ms ease-out ${performanceSettings.adjustedDelay}ms`,
      willChange: isVisible ? 'auto' : selectedAnimation.properties,
    };
  }, [isVisible, animation, performanceSettings]);

  // Cleanup will-change after animation
  useEffect(() => {
    if (!isVisible || !performanceSettings.shouldAnimate) return;

    const totalTime = performanceSettings.adjustedDuration + performanceSettings.adjustedDelay + 50;
    
    const timer = setTimeout(() => {
      if (elementRef.current) {
        elementRef.current.style.willChange = 'auto';
      }
    }, totalTime);

    return () => clearTimeout(timer);
  }, [isVisible, performanceSettings]);

  // Combine refs
  useEffect(() => {
    if (ref.current) {
      elementRef.current = ref.current;
    }
  }, [ref]);

  return (
    <div
      ref={ref}
      style={animationStyles}
    >
      {children}
    </div>
  );
};

export default ScrollReveal;