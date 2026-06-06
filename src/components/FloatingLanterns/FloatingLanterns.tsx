import { useEffect, useRef } from 'react';
import styles from './FloatingLanterns.module.css';

interface Lantern {
  x: number;
  y: number;
  vy: number;
  vx: number;
  size: number;
  opacity: number;
  glowIntensity: number;
  glowPhase: number;
  swayPhase: number;
  swayAmp: number;
}

interface FloatingLanternsProps {
  count?: number;
  active?: boolean;
}

const FloatingLanterns = ({ count = 12, active = true }: FloatingLanternsProps) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const lanternsRef = useRef<Lantern[]>([]);
  const rafRef = useRef<number>(0);
  const activeRef = useRef(active);

  useEffect(() => {
    activeRef.current = active;
  }, [active]);

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

    const createLantern = (atBottom = false): Lantern => ({
      x: Math.random() * canvas.width,
      y: atBottom
        ? canvas.height + Math.random() * 100
        : Math.random() * canvas.height,
      vy: -(Math.random() * 0.5 + 0.3),
      vx: (Math.random() - 0.5) * 0.2,
      size: Math.random() * 18 + 12,
      opacity: Math.random() * 0.5 + 0.3,
      glowIntensity: Math.random() * 0.5 + 0.5,
      glowPhase: Math.random() * Math.PI * 2,
      swayPhase: Math.random() * Math.PI * 2,
      swayAmp: Math.random() * 0.8 + 0.3,
    });

    lanternsRef.current = Array.from({ length: count }, () => createLantern(false));

    const drawLantern = (
      ctx: CanvasRenderingContext2D,
      lantern: Lantern,
      time: number
    ) => {
      const { x, y, size, opacity, glowIntensity, glowPhase, swayPhase, swayAmp } = lantern;

      const glow = glowIntensity * (0.7 + 0.3 * Math.sin(glowPhase + time * 0.002));
      const sway = swayAmp * Math.sin(swayPhase + time * 0.001);
      const px = x + sway * 5;

      ctx.save();
      ctx.globalAlpha = opacity;

      // Outer glow
      const outerGrad = ctx.createRadialGradient(px, y, 0, px, y, size * 3);
      outerGrad.addColorStop(0, `rgba(212, 175, 55, ${glow * 0.4})`);
      outerGrad.addColorStop(0.5, `rgba(200, 130, 20, ${glow * 0.15})`);
      outerGrad.addColorStop(1, 'rgba(212, 175, 55, 0)');
      ctx.fillStyle = outerGrad;
      ctx.beginPath();
      ctx.arc(px, y, size * 3, 0, Math.PI * 2);
      ctx.fill();

      // Lantern body
      const bodyGrad = ctx.createRadialGradient(
        px - size * 0.2,
        y - size * 0.2,
        0,
        px,
        y,
        size
      );
      bodyGrad.addColorStop(0, `rgba(255, 220, 100, ${glow * 0.95})`);
      bodyGrad.addColorStop(0.4, `rgba(212, 160, 40, ${glow * 0.85})`);
      bodyGrad.addColorStop(0.8, `rgba(160, 100, 20, ${glow * 0.7})`);
      bodyGrad.addColorStop(1, `rgba(80, 40, 5, ${glow * 0.5})`);

      ctx.fillStyle = bodyGrad;
      ctx.beginPath();
      ctx.ellipse(px, y, size * 0.55, size * 0.75, 0, 0, Math.PI * 2);
      ctx.fill();

      // Top cap
      ctx.fillStyle = `rgba(140, 90, 10, ${glow * 0.8})`;
      ctx.beginPath();
      ctx.ellipse(px, y - size * 0.65, size * 0.4, size * 0.15, 0, 0, Math.PI * 2);
      ctx.fill();

      // Bottom cap
      ctx.fillStyle = `rgba(140, 90, 10, ${glow * 0.8})`;
      ctx.beginPath();
      ctx.ellipse(px, y + size * 0.65, size * 0.4, size * 0.15, 0, 0, Math.PI * 2);
      ctx.fill();

      // Hanging string
      ctx.strokeStyle = `rgba(180, 130, 40, ${opacity * 0.5})`;
      ctx.lineWidth = 0.8;
      ctx.beginPath();
      ctx.moveTo(px, y - size * 0.8);
      ctx.lineTo(px, y - size * 1.4);
      ctx.stroke();

      // Inner light shimmer
      const innerGrad = ctx.createRadialGradient(px, y, 0, px, y, size * 0.4);
      innerGrad.addColorStop(0, `rgba(255, 255, 200, ${glow * 0.9})`);
      innerGrad.addColorStop(1, 'rgba(255, 200, 50, 0)');
      ctx.fillStyle = innerGrad;
      ctx.beginPath();
      ctx.ellipse(px, y, size * 0.3, size * 0.45, 0, 0, Math.PI * 2);
      ctx.fill();

      ctx.restore();
    };

    let time = 0;

    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      time++;

      lanternsRef.current = lanternsRef.current.map((lantern) => {
        drawLantern(ctx, lantern, time);

        const next = {
          ...lantern,
          x: lantern.x + lantern.vx,
          y: lantern.y + lantern.vy,
        };

        if (next.y < -lantern.size * 2) {
          return createLantern(true);
        }

        if (next.x < -lantern.size) next.x = canvas.width + lantern.size;
        if (next.x > canvas.width + lantern.size) next.x = -lantern.size;

        return next;
      });

      rafRef.current = requestAnimationFrame(animate);
    };

    rafRef.current = requestAnimationFrame(animate);

    return () => {
      cancelAnimationFrame(rafRef.current);
      window.removeEventListener('resize', resize);
    };
  }, [count]);

  return (
    <canvas
      ref={canvasRef}
      className={styles.canvas}
      aria-hidden="true"
    />
  );
};

export default FloatingLanterns;
