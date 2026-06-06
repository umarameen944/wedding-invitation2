import { useEffect, useRef, useCallback } from 'react';
import { lerp } from '@utils/helpers';

interface MousePosition {
  x: number;
  y: number;
}

export const useMousePosition = () => {
  const position = useRef<MousePosition>({ x: 0, y: 0 });
  const smoothPosition = useRef<MousePosition>({ x: 0, y: 0 });
  const rafRef = useRef<number>(0);

  const cursorRef = useRef<HTMLDivElement | null>(null);
  const ringRef = useRef<HTMLDivElement | null>(null);

  const animate = useCallback(() => {
    smoothPosition.current.x = lerp(
      smoothPosition.current.x,
      position.current.x,
      0.12
    );
    smoothPosition.current.y = lerp(
      smoothPosition.current.y,
      position.current.y,
      0.12
    );

    if (cursorRef.current) {
      cursorRef.current.style.left = `${position.current.x}px`;
      cursorRef.current.style.top = `${position.current.y}px`;
    }

    if (ringRef.current) {
      ringRef.current.style.left = `${smoothPosition.current.x}px`;
      ringRef.current.style.top = `${smoothPosition.current.y}px`;
    }

    rafRef.current = requestAnimationFrame(animate);
  }, []);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      position.current.x = e.clientX;
      position.current.y = e.clientY;
    };

    const handleMouseEnterLink = () => {
      if (cursorRef.current) {
        cursorRef.current.style.width = '6px';
        cursorRef.current.style.height = '6px';
      }
      if (ringRef.current) {
        ringRef.current.style.width = '60px';
        ringRef.current.style.height = '60px';
        ringRef.current.style.borderColor = 'rgba(212, 175, 55, 0.8)';
      }
    };

    const handleMouseLeaveLink = () => {
      if (cursorRef.current) {
        cursorRef.current.style.width = '12px';
        cursorRef.current.style.height = '12px';
      }
      if (ringRef.current) {
        ringRef.current.style.width = '40px';
        ringRef.current.style.height = '40px';
        ringRef.current.style.borderColor = 'rgba(212, 175, 55, 0.5)';
      }
    };

    document.addEventListener('mousemove', handleMouseMove, { passive: true });

    const interactables = document.querySelectorAll(
      'a, button, [role="button"], input, textarea, select, label'
    );
    interactables.forEach((el) => {
      el.addEventListener('mouseenter', handleMouseEnterLink);
      el.addEventListener('mouseleave', handleMouseLeaveLink);
    });

    rafRef.current = requestAnimationFrame(animate);

    return () => {
      document.removeEventListener('mousemove', handleMouseMove);
      interactables.forEach((el) => {
        el.removeEventListener('mouseenter', handleMouseEnterLink);
        el.removeEventListener('mouseleave', handleMouseLeaveLink);
      });
      cancelAnimationFrame(rafRef.current);
    };
  }, [animate]);

  return { cursorRef, ringRef };
};
