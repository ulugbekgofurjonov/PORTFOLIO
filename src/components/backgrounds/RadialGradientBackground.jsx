import React, { useEffect, useRef, useState } from "react";

const RadialGradientBackground = () => {
  const canvasRef = useRef(null);
  const containerRef = useRef(null);
  const [isMobile, setIsMobile] = useState(false);
  const [isLowPerformance, setIsLowPerformance] = useState(false);

  useEffect(() => {
    // Device turini aniqlash
    const checkDevice = () => {
      const mobile = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);
      setIsMobile(mobile);
      
      // Performance check - CPU cores va memory
      const cores = navigator.hardwareConcurrency || 2;
      const memory = navigator.deviceMemory || 4;
      const lowPerf = mobile || cores <= 4 || memory <= 4;
      setIsLowPerformance(lowPerf);
    };

    checkDevice();
  }, []);

  useEffect(() => {
    const canvas = canvasRef.current;
    const container = containerRef.current;
    if (!canvas || !container) return;

    const ctx = canvas.getContext("2d", { 
      alpha: false, // Alpha channel kerak emas - tezroq
      desynchronized: true // Better performance
    });
    
    let animationId;
    let particles = [];
    let lastTime = 0;
    const targetFPS = isLowPerformance ? 30 : 60; // Mobilda past FPS
    const frameInterval = 1000 / targetFPS;

    const resizeCanvas = () => {
      const containerWidth = container.clientWidth;
      const containerHeight = container.clientHeight;
      
      // Mobilda past resolution
      const scale = isLowPerformance ? 0.75 : 1;
      const dpr = Math.min(window.devicePixelRatio || 1, 2); // Max 2x
      
      canvas.width = containerWidth * scale;
      canvas.height = containerHeight * scale;
      
      canvas.style.width = `${containerWidth}px`;
      canvas.style.height = `${containerHeight}px`;
      
      ctx.scale(scale, scale);
      
      initParticles();
    };

    class Particle {
      constructor() {
        const containerWidth = container.clientWidth;
        const containerHeight = container.clientHeight;
        
        this.x = Math.random() * containerWidth;
        this.y = Math.random() * containerHeight;
        this.size = Math.random() * 2 + 1;
        
        // Mobilda sekinroq harakat
        const speedMultiplier = isLowPerformance ? 0.5 : 1;
        this.speedX = (Math.random() - 0.5) * 0.3 * speedMultiplier;
        this.speedY = (Math.random() - 0.5) * 0.3 * speedMultiplier;
        
        this.containerWidth = containerWidth;
        this.containerHeight = containerHeight;
      }

      update() {
        const containerWidth = container.clientWidth;
        const containerHeight = container.clientHeight;
        
        if (this.containerWidth !== containerWidth || this.containerHeight !== containerHeight) {
          const relX = this.x / this.containerWidth;
          const relY = this.y / this.containerHeight;
          this.x = relX * containerWidth;
          this.y = relY * containerHeight;
          this.containerWidth = containerWidth;
          this.containerHeight = containerHeight;
        }
        
        this.x += this.speedX;
        this.y += this.speedY;

        if (this.x > containerWidth) this.x = 0;
        if (this.x < 0) this.x = containerWidth;
        if (this.y > containerHeight) this.y = 0;
        if (this.y < 0) this.y = containerHeight;
      }

      draw() {
        ctx.fillStyle = "#00ccff";
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
        ctx.fill();
      }
    }

    const initParticles = () => {
      particles = [];
      
      // Device ga qarab particle soni
      const area = container.clientWidth * container.clientHeight;
      let particleCount;
      
      if (isLowPerformance) {
        // Mobil: kam particle
        particleCount = Math.min(40, Math.floor(area / 25000));
      } else {
        // Desktop: ko'proq particle
        particleCount = Math.min(100, Math.floor(area / 15000));
      }
      
      for (let i = 0; i < particleCount; i++) {
        particles.push(new Particle());
      }
    };

    const connectParticles = () => {
      const maxDistance = isLowPerformance ? 80 : 100; // Mobilda kam connection
      
      for (let i = 0; i < particles.length; i++) {
        for (let j = i + 1; j < particles.length; j++) {
          const dx = particles[i].x - particles[j].x;
          const dy = particles[i].y - particles[j].y;
          const distance = Math.sqrt(dx * dx + dy * dy);

          if (distance < maxDistance) {
            ctx.strokeStyle = `rgba(0, 180, 255, ${1 - distance / maxDistance})`;
            ctx.lineWidth = 0.5;
            ctx.beginPath();
            ctx.moveTo(particles[i].x, particles[i].y);
            ctx.lineTo(particles[j].x, particles[j].y);
            ctx.stroke();
          }
        }
      }
    };

    // Gradient cache - har frame da yaratmaslik uchun
    let cachedGradient = null;
    let lastWidth = 0;
    let lastHeight = 0;

    const createGradient = (width, height) => {
      if (cachedGradient && width === lastWidth && height === lastHeight) {
        return cachedGradient;
      }
      
      const gradient = ctx.createRadialGradient(
        width / 2, height / 2, 0,
        width / 2, height / 2, Math.max(width, height) / 1.5
      );
      gradient.addColorStop(0, '#0a1628');
      gradient.addColorStop(1, '#091220');
      
      cachedGradient = gradient;
      lastWidth = width;
      lastHeight = height;
      
      return gradient;
    };

    const animate = (currentTime) => {
      // FPS throttling
      const deltaTime = currentTime - lastTime;
      
      if (deltaTime < frameInterval) {
        animationId = requestAnimationFrame(animate);
        return;
      }
      
      lastTime = currentTime - (deltaTime % frameInterval);
      
      const width = container.clientWidth;
      const height = container.clientHeight;
      
      // Clear canvas
      ctx.clearRect(0, 0, width, height);
      
      // Cached gradient
      const gradient = createGradient(width, height);
      ctx.fillStyle = gradient;
      ctx.fillRect(0, 0, width, height);

      // Batch operations
      ctx.save();
      
      // Update va draw birgalikda
      for (let i = 0; i < particles.length; i++) {
        particles[i].update();
        particles[i].draw();
      }
      
      // Mobilda connectionlarni skip qilish mumkin
      if (!isLowPerformance || particles.length < 50) {
        connectParticles();
      }
      
      ctx.restore();

      animationId = requestAnimationFrame(animate);
    };

    // Initial setup
    resizeCanvas();
    initParticles();
    
    // Animation boshlanishi
    requestAnimationFrame(animate);

    // Optimized resize handling
    let resizeTimeout;
    const resizeObserver = new ResizeObserver(() => {
      clearTimeout(resizeTimeout);
      resizeTimeout = setTimeout(() => {
        resizeCanvas();
      }, 150); // Debounce
    });

    resizeObserver.observe(container);

    const handleResize = () => {
      clearTimeout(resizeTimeout);
      resizeTimeout = setTimeout(() => {
        resizeCanvas();
      }, 150);
    };

    window.addEventListener('resize', handleResize, { passive: true });

    // Visibility API - tab inactive bo'lsa to'xtatish
    const handleVisibilityChange = () => {
      if (document.hidden) {
        cancelAnimationFrame(animationId);
      } else {
        lastTime = performance.now();
        animationId = requestAnimationFrame(animate);
      }
    };

    document.addEventListener('visibilitychange', handleVisibilityChange);

    return () => {
      cancelAnimationFrame(animationId);
      clearTimeout(resizeTimeout);
      if (resizeObserver) {
        resizeObserver.disconnect();
      }
      window.removeEventListener('resize', handleResize);
      document.removeEventListener('visibilitychange', handleVisibilityChange);
    };
  }, [isMobile, isLowPerformance]);

  return (
    <div 
      ref={containerRef}
      className="fixed top-0 left-0 w-full h-full pointer-events-none"
      style={{ 
        zIndex: -1,
        backgroundColor: '#0a1628',
        willChange: 'auto' // GPU acceleration faqat kerak bo'lsa
      }}
    >
      <canvas 
        ref={canvasRef} 
        className="w-full h-full"
        style={{
          display: 'block',
          imageRendering: isLowPerformance ? 'auto' : 'crisp-edges'
        }}
      />
    </div>
  );
};

export default RadialGradientBackground;