import { memo, useEffect, useRef } from 'react';

const Constellations = memo(function Constellations() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const mouseRef = useRef<{ x: number; y: number; active: boolean }>({ x: -9999, y: -9999, active: false });

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let particles: Particle[] = [];
    const particleCount = 72;
    const mouseRadius = 180;
    const pullStrength = 0.04;
    let animationFrameId = 0;

    const resize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };

    const handleMouseMove = (e: MouseEvent) => {
      mouseRef.current.x = e.clientX;
      mouseRef.current.y = e.clientY;
      mouseRef.current.active = true;
    };

    const handleMouseLeave = () => {
      mouseRef.current.active = false;
    };

    window.addEventListener('resize', resize);
    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('mouseleave', handleMouseLeave);
    resize();

    class Particle {
      x = Math.random() * canvas.width;
      y = Math.random() * canvas.height;
      vx = (Math.random() - 0.5) * 0.3;
      vy = (Math.random() - 0.5) * 0.3;

      draw(boost: number) {
        const radius = 1.5 + boost * 1.5;
        ctx.beginPath();
        ctx.arc(this.x, this.y, radius, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(233, 195, 73, ${0.6 + boost * 0.4})`;
        ctx.shadowBlur = 15 + boost * 10;
        ctx.shadowColor = 'rgba(233, 195, 73, 1)';
        ctx.fill();
        ctx.shadowBlur = 0;
      }

      update(): number {
        // Apply gentle magnetic pull toward cursor when nearby
        let proximityBoost = 0;
        const m = mouseRef.current;
        if (m.active) {
          const dx = m.x - this.x;
          const dy = m.y - this.y;
          const dist = Math.sqrt(dx * dx + dy * dy);
          if (dist < mouseRadius && dist > 0) {
            const factor = 1 - dist / mouseRadius;
            this.vx += (dx / dist) * pullStrength * factor;
            this.vy += (dy / dist) * pullStrength * factor;
            proximityBoost = factor;
          }
        }

        // Cap velocity so particles don't fly off
        const speed = Math.sqrt(this.vx * this.vx + this.vy * this.vy);
        const maxSpeed = 1.2;
        if (speed > maxSpeed) {
          this.vx = (this.vx / speed) * maxSpeed;
          this.vy = (this.vy / speed) * maxSpeed;
        }

        // Friction so they settle back to drift speed
        this.vx *= 0.98;
        this.vy *= 0.98;

        // Maintain a minimum drift if velocity gets too low
        if (Math.abs(this.vx) < 0.1) this.vx += (Math.random() - 0.5) * 0.03;
        if (Math.abs(this.vy) < 0.1) this.vy += (Math.random() - 0.5) * 0.03;

        this.x += this.vx;
        this.y += this.vy;
        if (this.x < 0 || this.x > canvas.width) this.vx = -this.vx;
        if (this.y < 0 || this.y > canvas.height) this.vy = -this.vy;

        return proximityBoost;
      }
    }

    particles = Array.from({ length: particleCount }, () => new Particle());

    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      const boosts: number[] = [];
      for (let i = 0; i < particles.length; i += 1) {
        boosts[i] = particles[i].update();
        particles[i].draw(boosts[i]);
        for (let j = i + 1; j < particles.length; j += 1) {
          const dx = particles[i].x - particles[j].x;
          const dy = particles[i].y - particles[j].y;
          const distance = Math.sqrt(dx * dx + dy * dy);
          if (distance < 120) {
            ctx.beginPath();
            const baseOpacity = 0.25 - distance / 480;
            const boost = Math.max(boosts[i], boosts[j] ?? 0);
            const opacity = Math.min(0.6, baseOpacity + boost * 0.4);
            ctx.strokeStyle = `rgba(34, 211, 238, ${opacity})`;
            ctx.lineWidth = 0.8 + boost * 0.6;
            ctx.moveTo(particles[i].x, particles[i].y);
            ctx.lineTo(particles[j].x, particles[j].y);
            ctx.stroke();
          }
        }
      }
      animationFrameId = requestAnimationFrame(animate);
    };

    animate();
    return () => {
      window.removeEventListener('resize', resize);
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mouseleave', handleMouseLeave);
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  return <canvas ref={canvasRef} className="absolute inset-0 h-full w-full pointer-events-none mix-blend-screen" />;
});

export default Constellations;
