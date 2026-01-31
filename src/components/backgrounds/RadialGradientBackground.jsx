import React, { useEffect, useRef } from "react";

const RadialGradientBackground = () => {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;
    
    let animationFrameId;
    let particles = [];
    let waves = [];
    let dotClusters = [];
    let horizontalLines = [];
    let time = 0;

    // Canvas o'lchamini o'rnatish
    const resizeCanvas = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
      initAll();
    };

    // Flowing particle wave
    class ParticleWave {
      constructor(yPos, direction) {
        this.baseY = yPos;
        this.direction = direction; // 1 or -1
        this.particles = [];
        this.particleCount = 100;
        this.amplitude = 60;
        this.frequency = 0.003;
        this.speed = 0.01;
        this.phase = Math.random() * Math.PI * 2;
        
        for (let i = 0; i < this.particleCount; i++) {
          this.particles.push({
            x: (canvas.width / this.particleCount) * i,
            offset: i,
            size: Math.random() * 1.5 + 0.5,
            opacity: Math.random() * 0.4 + 0.2,
          });
        }
      }

      update() {
        this.phase += this.speed * this.direction;
      }

      draw() {
        ctx.save();
        
        // Draw connecting lines
        ctx.strokeStyle = 'rgba(0, 200, 255, 0.15)';
        ctx.lineWidth = 1;
        ctx.beginPath();
        
        this.particles.forEach((particle, i) => {
          const x = particle.x;
          const wave1 = Math.sin(x * this.frequency + this.phase) * this.amplitude;
          const wave2 = Math.cos(x * this.frequency * 0.5 + this.phase * 0.7) * (this.amplitude * 0.5);
          const y = this.baseY + wave1 + wave2;
          
          if (i === 0) {
            ctx.moveTo(x, y);
          } else {
            ctx.lineTo(x, y);
          }
          
          // Draw particle
          const gradient = ctx.createRadialGradient(x, y, 0, x, y, particle.size * 2);
          gradient.addColorStop(0, `rgba(100, 220, 255, ${particle.opacity})`);
          gradient.addColorStop(1, 'rgba(0, 200, 255, 0)');
          
          ctx.fillStyle = gradient;
          ctx.beginPath();
          ctx.arc(x, y, particle.size * 2, 0, Math.PI * 2);
          ctx.fill();
        });
        
        ctx.stroke();
        ctx.restore();
      }
    }

    // Dot cluster - guruhlangan nuqtalar
    class DotCluster {
      constructor() {
        this.x = Math.random() * canvas.width;
        this.y = Math.random() * canvas.height;
        this.dots = [];
        this.dotCount = Math.floor(Math.random() * 30) + 20;
        this.radius = Math.random() * 80 + 40;
        this.rotation = Math.random() * Math.PI * 2;
        this.rotationSpeed = (Math.random() - 0.5) * 0.002;
        
        for (let i = 0; i < this.dotCount; i++) {
          const angle = (Math.PI * 2 / this.dotCount) * i;
          const distance = Math.random() * this.radius;
          this.dots.push({
            angle: angle,
            distance: distance,
            size: Math.random() * 1.5 + 0.5,
            opacity: Math.random() * 0.3 + 0.1,
          });
        }
      }

      update() {
        this.rotation += this.rotationSpeed;
      }

      draw() {
        ctx.save();
        
        this.dots.forEach(dot => {
          const angle = dot.angle + this.rotation;
          const x = this.x + Math.cos(angle) * dot.distance;
          const y = this.y + Math.sin(angle) * dot.distance;
          
          const gradient = ctx.createRadialGradient(x, y, 0, x, y, dot.size * 2);
          gradient.addColorStop(0, `rgba(0, 180, 255, ${dot.opacity})`);
          gradient.addColorStop(1, 'rgba(0, 150, 255, 0)');
          
          ctx.fillStyle = gradient;
          ctx.beginPath();
          ctx.arc(x, y, dot.size * 2, 0, Math.PI * 2);
          ctx.fill();
        });
        
        ctx.restore();
      }
    }

    // Horizontal flowing lines
    class HorizontalLine {
      constructor() {
        this.y = Math.random() * canvas.height;
        this.length = Math.random() * 300 + 200;
        this.x = -this.length;
        this.speed = Math.random() * 2 + 0.5;
        this.opacity = Math.random() * 0.2 + 0.1;
        this.thickness = Math.random() * 1 + 0.5;
      }

      update() {
        this.x += this.speed;
        if (this.x > canvas.width) {
          this.x = -this.length;
          this.y = Math.random() * canvas.height;
        }
      }

      draw() {
        ctx.save();
        
        const gradient = ctx.createLinearGradient(this.x, this.y, this.x + this.length, this.y);
        gradient.addColorStop(0, 'rgba(0, 200, 255, 0)');
        gradient.addColorStop(0.5, `rgba(0, 200, 255, ${this.opacity})`);
        gradient.addColorStop(1, 'rgba(0, 200, 255, 0)');
        
        ctx.strokeStyle = gradient;
        ctx.lineWidth = this.thickness;
        ctx.beginPath();
        ctx.moveTo(this.x, this.y);
        ctx.lineTo(this.x + this.length, this.y);
        ctx.stroke();
        
        ctx.restore();
      }
    }

    // Floating particles
    class FloatingParticle {
      constructor() {
        this.x = Math.random() * canvas.width;
        this.y = Math.random() * canvas.height;
        this.size = Math.random() * 2 + 0.5;
        this.speedX = (Math.random() - 0.5) * 0.3;
        this.speedY = (Math.random() - 0.5) * 0.3;
        this.opacity = Math.random() * 0.3 + 0.1;
      }

      update() {
        this.x += this.speedX;
        this.y += this.speedY;

        if (this.x > canvas.width) this.x = 0;
        if (this.x < 0) this.x = canvas.width;
        if (this.y > canvas.height) this.y = 0;
        if (this.y < 0) this.y = canvas.height;
      }

      draw() {
        ctx.save();
        
        const gradient = ctx.createRadialGradient(this.x, this.y, 0, this.x, this.y, this.size * 2);
        gradient.addColorStop(0, `rgba(100, 220, 255, ${this.opacity})`);
        gradient.addColorStop(1, 'rgba(0, 200, 255, 0)');
        
        ctx.fillStyle = gradient;
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.size * 2, 0, Math.PI * 2);
        ctx.fill();
        
        ctx.restore();
      }
    }

    // Initialize everything
    const initAll = () => {
      // Particle waves
      waves = [];
      waves.push(new ParticleWave(canvas.height * 0.3, 1));
      waves.push(new ParticleWave(canvas.height * 0.6, -1));
      
      // Dot clusters
      dotClusters = [];
      for (let i = 0; i < 4; i++) {
        dotClusters.push(new DotCluster());
      }
      
      // Horizontal lines
      horizontalLines = [];
      for (let i = 0; i < 8; i++) {
        horizontalLines.push(new HorizontalLine());
      }
      
      // Floating particles
      particles = [];
      const particleCount = Math.floor((canvas.width * canvas.height) / 20000);
      for (let i = 0; i < Math.min(particleCount, 60); i++) {
        particles.push(new FloatingParticle());
      }
    };

    // Animation loop
    const animate = () => {
      time++;
      
      // Dark gradient background
      const bgGradient = ctx.createRadialGradient(
        canvas.width / 2, canvas.height / 2, 0,
        canvas.width / 2, canvas.height / 2, Math.max(canvas.width, canvas.height) / 1.5
      );
      bgGradient.addColorStop(0, "#001a1a");
      bgGradient.addColorStop(0.5, "#001414");
      bgGradient.addColorStop(1, "#000a0a");
      ctx.fillStyle = bgGradient;
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      // Draw horizontal lines first (background)
      horizontalLines.forEach(line => {
        line.update();
        line.draw();
      });

      // Draw dot clusters
      dotClusters.forEach(cluster => {
        cluster.update();
        cluster.draw();
      });

      // Draw particle waves
      waves.forEach(wave => {
        wave.update();
        wave.draw();
      });

      // Draw floating particles
      particles.forEach(particle => {
        particle.update();
        particle.draw();
      });

      animationFrameId = requestAnimationFrame(animate);
    };

    // Start
    resizeCanvas();
    window.addEventListener("resize", resizeCanvas);
    animate();

    // Cleanup
    return () => {
      window.removeEventListener("resize", resizeCanvas);
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  return (
    <div className="fixed inset-0 -z-10 overflow-hidden">
      {/* Main canvas */}
      <canvas
        ref={canvasRef}
        className="absolute inset-0 w-full h-full"
      />
      
      {/* Gradient overlays */}
      <div 
        className="absolute inset-0 pointer-events-none"
        style={{
          background: `
            radial-gradient(circle at 20% 30%, rgba(0, 180, 255, 0.08) 0%, transparent 40%),
            radial-gradient(circle at 80% 70%, rgba(0, 200, 255, 0.06) 0%, transparent 40%)
          `,
          animation: "pulse-overlay 15s ease-in-out infinite",
        }}
      />

      {/* Grid overlay - subtle */}
      <div 
        className="absolute inset-0 pointer-events-none opacity-[0.03]"
        style={{
          backgroundImage: `
            linear-gradient(rgba(0, 200, 255, 0.3) 1px, transparent 1px),
            linear-gradient(90deg, rgba(0, 200, 255, 0.3) 1px, transparent 1px)
          `,
          backgroundSize: '80px 80px',
        }}
      />

      {/* Subtle noise */}
      <div 
        className="absolute inset-0 pointer-events-none opacity-[0.02] mix-blend-overlay"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='2.5' numOctaves='2' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")`,
        }}
      />

      <style jsx>{`
        @keyframes pulse-overlay {
          0%, 100% {
            opacity: 1;
          }
          50% {
            opacity: 0.7;
          }
        }
      `}</style>
    </div>
  );
};

export default RadialGradientBackground;