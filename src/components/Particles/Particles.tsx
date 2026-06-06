import { useEffect, useRef } from 'react';
import styles from './Particles.module.css';

interface Particle {
  x: number;
  y: number;
  vx: number;
  vy: number;
  size: number;
  opacity: number;
  life: number;
  maxLife: number;
  color: string;
}

interface ParticlesProps {
  count?: number;
  colors?: string[];
  className?: string;
}

const Particles = ({
  count = 60,
  colors = ['#D4AF37', '#F0D060', '#F5E6C8', '#A8860A'],
  className = '',
}: ParticlesProps) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const particlesRef = useRef<Particle[]>([]);
  const rafRef = useRef<number>(0);
  const mouseRef = useRef({ x: -1000, y: -1000 });

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const resize = () => {
      canvas.width = canvas.offsetWidth;
      canvas.height = canvas.offsetHeight;
    };
    resize();
    window.addEventListener('resize', resize, { passive: true });

    const createParticle = (): Particle => ({
      x: Math.random() * canvas.width,
      y: Math.random() * canvas.height,
      vx: (Math.random() - 0.5) * 0.4,
      vy: -Math.random() * 0.6 - 0.2,
      size: Math.random() * 2 + 0.5,
      opacity: Math.random() * 0.6 + 0.2,
      life: 0,
      maxLife: Math.random() * 300 + 200,
      color: colors[Math.floor(Math.random() * colors.length)],
    });

    particlesRef.current = Array.from({ length: count }, createParticle);

    const handleMouseMove = (e: MouseEvent) => {
      const rect = canvas.getBoundingClientRect();
      mouseRef.current = {
        x: e.clientX - rect.left,
        y: e.clientY - rect.top,
      };
    };

    canvas.addEventListener('mousemove', handleMouseMove, { passive: true });

    const drawStar = (
      ctx: CanvasRenderingContext2D,
      x: number,
      y: number,
      size: number,
      opacity: number,
      color: string
    ) => {
      ctx.save();
      ctx.globalAlpha = opacity;
      ctx.fillStyle = color;
      ctx.shadowColor = color;
      ctx.shadowBlur = size * 3;
      ctx.beginPath();
      ctx.arc(x, y, size, 0, Math.PI * 2);
      ctx.fill();
      ctx.restore();
    };

    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      particlesRef.current = particlesRef.current.map((p) => {
        const dx = mouseRef.current.x - p.x;
        const dy = mouseRef.current.y - p.y;
        const dist = Math.sqrt(dx * dx + dy * dy);

        if (dist < 100) {
          p.vx -= (dx / dist) * 0.05;
          p.vy -= (dy / dist) * 0.05;
        }

        const progress = p.life / p.maxLife;
        const fadeOpacity =
          progress < 0.1
            ? (progress / 0.1) * p.opacity
            : progress > 0.8
            ? ((1 - progress) / 0.2) * p.opacity
            : p.opacity;

        drawStar(ctx, p.x, p.y, p.size, fadeOpacity, p.color);

        const next = {
          ...p,
          x: p.x + p.vx,
          y: p.y + p.vy,
          vx: p.vx * 0.99,
          vy: p.vy * 0.99,
          life: p.life + 1,
        };

        if (next.life >= next.maxLife || next.y < -10) {
          return { ...createParticle(), y: canvas.height + 5 };
        }

        if (next.x < 0) next.x = canvas.width;
        if (next.x > canvas.width) next.x = 0;

        return next;
      });

      rafRef.current = requestAnimationFrame(animate);
    };

    rafRef.current = requestAnimationFrame(animate);

    return () => {
      cancelAnimationFrame(rafRef.current);
      window.removeEventListener('resize', resize);
      canvas.removeEventListener('mousemove', handleMouseMove);
    };
  }, [count, colors]);

  return (
    <canvas
      ref={canvasRef}
      className={`${styles.canvas} ${className}`}
      aria-hidden="true"
    />
  );
};

export default Particles;
