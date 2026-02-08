import React, { useEffect, useRef, useState } from "react";

const RadialGradientBackground = () => {
  const canvasRef = useRef(null);
  const containerRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const container = containerRef.current;
    if (!canvas || !container) return;

    const ctx = canvas.getContext("2d");
    let animationId;
    let particles = [];

    // To'g'ri resize funksiyasi
    const resizeCanvas = () => {
      const containerWidth = container.clientWidth;
      const containerHeight = container.clientHeight;
      
      // High DPI displaylar uchun
      const dpr = window.devicePixelRatio || 1;
      
      // Canvas actual size
      canvas.width = containerWidth * dpr;
      canvas.height = containerHeight * dpr;
      
      // CSS size (ko'rinadigan o'lcham)
      canvas.style.width = `${containerWidth}px`;
      canvas.style.height = `${containerHeight}px`;
      
      // Scale context for high DPI
      ctx.scale(dpr, dpr);
      
      // Particlelarni qayta yaratish
      initParticles();
    };

    class Particle {
      constructor() {
        const containerWidth = container.clientWidth;
        const containerHeight = container.clientHeight;
        
        this.x = Math.random() * containerWidth;
        this.y = Math.random() * containerHeight;
        this.size = Math.random() * 2 + 1;
        this.speedX = (Math.random() - 0.5) * 0.3;
        this.speedY = (Math.random() - 0.5) * 0.3;
        this.containerWidth = containerWidth;
        this.containerHeight = containerHeight;
      }

      update() {
        const containerWidth = container.clientWidth;
        const containerHeight = container.clientHeight;
        
        // Container o'lchami o'zgarsa, particle'ni qayta joylashtirish
        if (this.containerWidth !== containerWidth || this.containerHeight !== containerHeight) {
          // Relative position ni saqlab qolish
          const relX = this.x / this.containerWidth;
          const relY = this.y / this.containerHeight;
          this.x = relX * containerWidth;
          this.y = relY * containerHeight;
          this.containerWidth = containerWidth;
          this.containerHeight = containerHeight;
        }
        
        this.x += this.speedX;
        this.y += this.speedY;

        // Chekkalarni tekshirish
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
      const particleCount = Math.min(100, Math.floor((container.clientWidth * container.clientHeight) / 15000));
      
      for (let i = 0; i < particleCount; i++) {
        particles.push(new Particle());
      }
    };

    const connectParticles = () => {
      for (let i = 0; i < particles.length; i++) {
        for (let j = i + 1; j < particles.length; j++) {
          const dx = particles[i].x - particles[j].x;
          const dy = particles[i].y - particles[j].y;
          const distance = Math.sqrt(dx * dx + dy * dy);

          if (distance < 100) {
            ctx.strokeStyle = `rgba(0, 180, 255, ${1 - distance / 100})`;
            ctx.lineWidth = 0.5;
            ctx.beginPath();
            ctx.moveTo(particles[i].x, particles[i].y);
            ctx.lineTo(particles[j].x, particles[j].y);
            ctx.stroke();
          }
        }
      }
    };

    const animate = () => {
      const width = container.clientWidth;
      const height = container.clientHeight;
      
      // Clear canvas
      ctx.clearRect(0, 0, width, height);
      
      // Background
      const gradient = ctx.createRadialGradient(
        width / 2, height / 2, 0,
        width / 2, height / 2, Math.max(width, height) / 1.5
      );
      gradient.addColorStop(0, '#0a1628');
      gradient.addColorStop(1, '#091220');
      
      ctx.fillStyle = gradient;
      ctx.fillRect(0, 0, width, height);

      // Update and draw particles
      particles.forEach((particle) => {
        particle.update();
        particle.draw();
      });

      connectParticles();

      animationId = requestAnimationFrame(animate);
    };

    // Initial setup
    resizeCanvas();
    initParticles();
    animate();

    // Resize observer - eng yaxshi usul
    const resizeObserver = new ResizeObserver(() => {
      resizeCanvas();
    });

    resizeObserver.observe(container);

    // Window resize uchun ham
    const handleResize = () => {
      resizeCanvas();
    };

    window.addEventListener('resize', handleResize);

    return () => {
      cancelAnimationFrame(animationId);
      if (resizeObserver) {
        resizeObserver.disconnect();
      }
      window.removeEventListener('resize', handleResize);
    };
  }, []);

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