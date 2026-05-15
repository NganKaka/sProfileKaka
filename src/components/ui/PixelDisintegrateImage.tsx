import { useEffect, useRef, useState } from 'react';

interface PixelDisintegrateImageProps {
  src: string;
  alt: string;
  className?: string;
  /** Pixel block size in source-image pixels. Smaller = finer dust, costlier. */
  blockSize?: number;
  /** ms for full disintegrate / reform */
  duration?: number;
}

type Particle = {
  sx: number;
  sy: number;
  size: number;
  // home position (where the pixel "belongs")
  hx: number;
  hy: number;
  // current display position
  x: number;
  y: number;
  // drift velocity once disintegrated
  vx: number;
  vy: number;
  color: string;
};

/**
 * Image that breaks into drifting square particles on hover and reforms
 * when the cursor leaves. Particles are sampled from the loaded image
 * once on mount, then animated on a single canvas.
 */
export default function PixelDisintegrateImage({
  src,
  alt,
  className = '',
  blockSize = 8,
  duration = 700,
}: PixelDisintegrateImageProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const particlesRef = useRef<Particle[]>([]);
  const stateRef = useRef<'idle' | 'breaking' | 'broken' | 'reforming'>('idle');
  const phaseStartRef = useRef<number>(0);
  const [ready, setReady] = useState(false);

  // Sample image into particles
  useEffect(() => {
    const img = new Image();
    img.crossOrigin = 'anonymous';
    img.src = src;
    img.onload = () => {
      const c = canvasRef.current;
      const wrap = containerRef.current;
      if (!c || !wrap) return;

      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      const cssW = wrap.clientWidth;
      const cssH = wrap.clientHeight;
      c.width = cssW * dpr;
      c.height = cssH * dpr;
      c.style.width = `${cssW}px`;
      c.style.height = `${cssH}px`;
      const ctx = c.getContext('2d');
      if (!ctx) return;
      ctx.scale(dpr, dpr);

      // Draw + sample at lower resolution than the canvas to keep particle count sane
      const sampleScale = Math.max(1, blockSize);
      const sw = Math.floor(cssW / sampleScale);
      const sh = Math.floor(cssH / sampleScale);
      const off = document.createElement('canvas');
      off.width = sw;
      off.height = sh;
      const offCtx = off.getContext('2d');
      if (!offCtx) return;
      // cover-fit
      const scale = Math.max(cssW / img.width, cssH / img.height) / sampleScale;
      const drawW = img.width * scale;
      const drawH = img.height * scale;
      offCtx.drawImage(img, (sw - drawW) / 2, (sh - drawH) / 2, drawW, drawH);

      const data = offCtx.getImageData(0, 0, sw, sh).data;
      const particles: Particle[] = [];
      for (let py = 0; py < sh; py++) {
        for (let px = 0; px < sw; px++) {
          const i = (py * sw + px) * 4;
          const a = data[i + 3];
          if (a < 16) continue;
          const r = data[i];
          const g = data[i + 1];
          const b = data[i + 2];
          const x = px * sampleScale;
          const y = py * sampleScale;
          particles.push({
            sx: 0,
            sy: 0,
            size: sampleScale,
            hx: x,
            hy: y,
            x,
            y,
            vx: (Math.random() - 0.5) * 240, // up to ~240px in 0.7s
            vy: (Math.random() - 0.7) * 280, // bias upward like ash
            color: `rgb(${r}, ${g}, ${b})`,
          });
        }
      }
      particlesRef.current = particles;
      setReady(true);
      drawAll(0);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [src, blockSize]);

  function drawAll(_t: number) {
    const c = canvasRef.current;
    if (!c) return;
    const ctx = c.getContext('2d');
    if (!ctx) return;
    const w = c.clientWidth;
    const h = c.clientHeight;
    ctx.clearRect(0, 0, w, h);
    const ps = particlesRef.current;
    for (let i = 0; i < ps.length; i++) {
      const p = ps[i];
      ctx.fillStyle = p.color;
      ctx.fillRect(p.x, p.y, p.size, p.size);
    }
  }

  // Animation loop driven by hover state
  useEffect(() => {
    if (!ready) return;
    let raf = 0;
    let last = performance.now();

    function frame(now: number) {
      const dt = Math.min(50, now - last) / 1000;
      last = now;

      const ps = particlesRef.current;
      const phase = stateRef.current;
      const elapsed = now - phaseStartRef.current;
      const progress = Math.min(1, elapsed / duration);
      const eased = phase === 'breaking' || phase === 'reforming'
        ? 1 - Math.pow(1 - progress, 3)
        : 1;

      if (phase === 'breaking') {
        for (let i = 0; i < ps.length; i++) {
          const p = ps[i];
          const targetX = p.hx + p.vx;
          const targetY = p.hy + p.vy;
          p.x = p.hx + (targetX - p.hx) * eased;
          p.y = p.hy + (targetY - p.hy) * eased;
        }
        if (progress >= 1) stateRef.current = 'broken';
      } else if (phase === 'broken') {
        for (let i = 0; i < ps.length; i++) {
          const p = ps[i];
          p.x += p.vx * dt * 0.15;
          p.y += p.vy * dt * 0.15;
        }
      } else if (phase === 'reforming') {
        for (let i = 0; i < ps.length; i++) {
          const p = ps[i];
          // Lerp from current position back to home
          p.x += (p.hx - p.x) * eased * 0.5;
          p.y += (p.hy - p.y) * eased * 0.5;
        }
        if (progress >= 1) {
          for (let i = 0; i < ps.length; i++) {
            ps[i].x = ps[i].hx;
            ps[i].y = ps[i].hy;
          }
          stateRef.current = 'idle';
        }
      }

      drawAll(now);
      raf = requestAnimationFrame(frame);
    }

    raf = requestAnimationFrame(frame);
    return () => cancelAnimationFrame(raf);
  }, [ready, duration]);

  const handleEnter = () => {
    if (stateRef.current === 'idle' || stateRef.current === 'reforming') {
      // Reroll velocities so the disintegration looks fresh each time
      const ps = particlesRef.current;
      for (let i = 0; i < ps.length; i++) {
        ps[i].vx = (Math.random() - 0.5) * 240;
        ps[i].vy = (Math.random() - 0.7) * 280;
      }
      stateRef.current = 'breaking';
      phaseStartRef.current = performance.now();
    }
  };

  const handleLeave = () => {
    if (stateRef.current === 'breaking' || stateRef.current === 'broken') {
      stateRef.current = 'reforming';
      phaseStartRef.current = performance.now();
    }
  };

  return (
    <div
      ref={containerRef}
      onMouseEnter={handleEnter}
      onMouseLeave={handleLeave}
      className={`relative overflow-hidden ${className}`}
      role="img"
      aria-label={alt}
    >
      <canvas ref={canvasRef} className="block w-full h-full" />
    </div>
  );
}