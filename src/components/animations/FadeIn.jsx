import React, { useEffect, useRef, useState, useMemo } from "react";

const FadeIn = ({ children, delay = 0, duration = 500, threshold = 0.1 }) => {
  const [isVisible, setIsVisible] = useState(false);
  const elementRef = useRef(null);
  const observerRef = useRef(null);
  const hasAnimated = useRef(false);

  // Device performance detection
  const performanceSettings = useMemo(() => {
    const isMobile = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);
    const isLowEnd = navigator.hardwareConcurrency <= 4 || navigator.deviceMemory <= 4;
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    
    return {
      isMobile,
      isLowEnd: isMobile || isLowEnd,
      shouldAnimate: !prefersReducedMotion,
      reducedDuration: prefersReducedMotion ? 0 : (isMobile || isLowEnd ? duration * 0.7 : duration)
    };
  }, [duration]);

  useEffect(() => {
    // Agar motion disabled bo'lsa, darhol ko'rsatish
    if (!performanceSettings.shouldAnimate) {
      setIsVisible(true);
      return;
    }

    const currentElement = elementRef.current;
    if (!currentElement) return;

    // Intersection Observer options - mobil uchun optimizatsiya
    const observerOptions = {
      threshold: performanceSettings.isLowEnd ? Math.max(threshold, 0.05) : threshold,
      rootMargin: performanceSettings.isLowEnd ? "50px 0px 50px 0px" : "0px 0px -50px 0px",
    };

    // Observer callback - minimal re-renders
    const handleIntersection = (entries) => {
      const entry = entries[0];
      
      if (entry.isIntersecting && !hasAnimated.current) {
        // requestAnimationFrame bilan smooth transition
        if (performanceSettings.isLowEnd) {
          // Low-end devicelarda darhol
          setIsVisible(true);
          hasAnimated.current = true;
        } else {
          // High-end devicelarda RAF bilan
          requestAnimationFrame(() => {
            setIsVisible(true);
            hasAnimated.current = true;
          });
        }
        
        // Bir marta animate qilgandan keyin observer ni disconnect qilish
        if (observerRef.current && currentElement) {
          observerRef.current.unobserve(currentElement);
        }
      }
    };

    // Observer yaratish
    observerRef.current = new IntersectionObserver(
      handleIntersection,
      observerOptions
    );

    observerRef.current.observe(currentElement);

    // Cleanup
    return () => {
      if (observerRef.current && currentElement) {
        observerRef.current.unobserve(currentElement);
        observerRef.current.disconnect();
      }
    };
  }, [threshold, performanceSettings]);

  // Inline styles - CSS class o'rniga
  const animationStyles = useMemo(() => {
    if (!performanceSettings.shouldAnimate) {
      return { opacity: 1 };
    }

    const adjustedDelay = performanceSettings.isLowEnd ? delay * 0.5 : delay;
    const adjustedDuration = performanceSettings.reducedDuration;

    if (isVisible) {
      return {
        opacity: 1,
        transform: 'translateY(0)',
        transition: `opacity ${adjustedDuration}ms ease-out ${adjustedDelay}ms, transform ${adjustedDuration}ms ease-out ${adjustedDelay}ms`,
        willChange: 'opacity, transform', // GPU acceleration
      };
    }

    return {
      opacity: 0,
      transform: 'translateY(20px)',
      willChange: 'opacity, transform',
    };
  }, [isVisible, delay, performanceSettings]);

  // Cleanup after animation completes
  useEffect(() => {
    if (!isVisible || !performanceSettings.shouldAnimate) return;

    const totalAnimationTime = performanceSettings.reducedDuration + (performanceSettings.isLowEnd ? delay * 0.5 : delay);
    
    const timer = setTimeout(() => {
      // Animation tugagach will-change ni olib tashlash
      if (elementRef.current) {
        elementRef.current.style.willChange = 'auto';
      }
    }, totalAnimationTime);

    return () => clearTimeout(timer);
  }, [isVisible, delay, performanceSettings]);

  return (
    <div
      ref={elementRef}
      style={animationStyles}
    >
      {children}
    </div>
  );
};

export default FadeIn;