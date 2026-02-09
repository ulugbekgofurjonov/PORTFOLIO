import React, { useEffect, useRef, useState } from "react";

const RadialGradientBackground = () => {
  const canvasRef = useRef(null);
  const containerRef = useRef(null);
  const [isLowPerformance, setIsLowPerformance] = useState(false);

  useEffect(() => {
    const canvas = canvasRef.current;
    const container = containerRef.current;
    if (!canvas || !container) return;

    const ctx = canvas.getContext("2d", { alpha: false });
    let animationId;
    let particles = [];
    let lastFrameTime = Date.now();
    let fps = 60;

    // Performance detection
    const detectPerformance = () => {
      const avgFps = fps;
      return avgFps < 30 || navigator.hardwareConcurrency <= 2;
    };

    const resizeCanvas = () => {
      const containerWidth = container.clientWidth;
      const containerHeight = container.clientHeight;
      
      // Kuchsiz devicelarda DPR ni cheklash
      const dpr = isLowPerformance ? 1 : Math.min(window.devicePixelRatio || 1, 2);
      
      canvas.width = containerWidth * dpr;
      canvas.height = containerHeight * dpr;
      
      canvas.style.width = `${containerWidth}px`;
      canvas.style.height = `${containerHeight}px`;
      
      ctx.scale(dpr, dpr);
      
      initParticles();
    };

    class Particle {
      constructor() {
        const containerWidth = container.clientWidth;
        const containerHeight = container.clientHeight;
        
        this.x = Math.random() * containerWidth;
        this.y = Math.random() * containerHeight;
        this.size = Math.random() * 1.5 + 0.8;
        this.speedX = (Math.random() - 0.5) * 0.2;
        this.speedY = (Math.random() - 0.5) * 0.2;
        this.containerWidth = containerWidth;
        this.containerHeight = containerHeight;
      }

      update() {
        this.x += this.speedX;
        this.y += this.speedY;

        const containerWidth = container.clientWidth;
        const containerHeight = container.clientHeight;

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
      const area = container.clientWidth * container.clientHeight;
      
      // Kuchsiz devicelarda kamroq particle
      const density = isLowPerformance ? 20000 : 15000;
      const maxParticles = isLowPerformance ? 50 : 100;
      const particleCount = Math.min(maxParticles, Math.floor(area / density));
      
      for (let i = 0; i < particleCount; i++) {
        particles.push(new Particle());
      }
    };

    const connectParticles = () => {
      const maxDistance = isLowPerformance ? 80 : 100;
      
      // Kuchsiz devicelarda har bir particle uchun kamroq tekshirish
      const step = isLowPerformance ? 2 : 1;
      
      for (let i = 0; i < particles.length; i += step) {
        for (let j = i + step; j < particles.length; j += step) {
          const dx = particles[i].x - particles[j].x;
          const dy = particles[i].y - particles[j].y;
          const distance = Math.sqrt(dx * dx + dy * dy);

          if (distance < maxDistance) {
            ctx.strokeStyle = `rgba(0, 180, 255, ${(1 - distance / maxDistance) * 0.6})`;
            ctx.lineWidth = 0.5;
            ctx.beginPath();
            ctx.moveTo(particles[i].x, particles[i].y);
            ctx.lineTo(particles[j].x, particles[j].y);
            ctx.stroke();
          }
        }
      }
    };

    // Gradient cache
    let cachedGradient = null;
    let lastWidth = 0;
    let lastHeight = 0;

    const getGradient = (width, height) => {
      if (!cachedGradient || lastWidth !== width || lastHeight !== height) {
        cachedGradient = ctx.createRadialGradient(
          width / 2, height / 2, 0,
          width / 2, height / 2, Math.max(width, height) / 1.5
        );
        cachedGradient.addColorStop(0, '#0a1628');
        cachedGradient.addColorStop(1, '#091220');
        lastWidth = width;
        lastHeight = height;
      }
      return cachedGradient;
    };

    let frameCount = 0;
    const animate = () => {
      frameCount++;
      
      // FPS calculation (har 60 frameda)
      if (frameCount % 60 === 0) {
        const now = Date.now();
        const delta = now - lastFrameTime;
        fps = Math.round(60000 / delta);
        lastFrameTime = now;
        
        // Performance aniqlash va sozlash
        if (frameCount === 180 && !isLowPerformance && detectPerformance()) {
          setIsLowPerformance(true);
          resizeCanvas();
        }
      }

      const width = container.clientWidth;
      const height = container.clientHeight;
      
      ctx.clearRect(0, 0, width, height);
      
      // Cached gradient ishlatish
      ctx.fillStyle = getGradient(width, height);
      ctx.fillRect(0, 0, width, height);

      // Particlelarni yangilash va chizish
      particles.forEach((particle) => {
        particle.update();
        particle.draw();
      });

      // Kuchsiz devicelarda kamroq connection
      if (!isLowPerformance || frameCount % 2 === 0) {
        connectParticles();
      }

      animationId = requestAnimationFrame(animate);
    };

    resizeCanvas();
    animate();

    // Throttled resize handler
    let resizeTimeout;
    const resizeObserver = new ResizeObserver(() => {
      clearTimeout(resizeTimeout);
      resizeTimeout = setTimeout(() => {
        resizeCanvas();
      }, 100);
    });

    resizeObserver.observe(container);

    return () => {
      cancelAnimationFrame(animationId);
      clearTimeout(resizeTimeout);
      resizeObserver.disconnect();
    };
  }, [isLowPerformance]);

  return (
    <div 
      ref={containerRef}
      className="fixed top-0 left-0 w-full h-full pointer-events-none"
      style={{ 
        zIndex: -1,
        backgroundColor: '#0a1628'
      }}
    >
      <canvas 
        ref={canvasRef} 
        className="w-full h-full"
        style={{
          display: 'block'
        }}
      />
    </div>
  );
};

export default RadialGradientBackground;