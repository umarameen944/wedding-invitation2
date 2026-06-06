import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import styles from './Loader.module.css';

interface LoaderProps {
  onComplete: () => void;
}

const Loader = ({ onComplete }: LoaderProps) => {
  const loaderRef = useRef<HTMLDivElement>(null);
  const moonRef = useRef<HTMLDivElement>(null);
  const bismillahRef = useRef<HTMLDivElement>(null);
  const textRef = useRef<HTMLDivElement>(null);
  const progressRef = useRef<HTMLDivElement>(null);
  const particlesRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    document.body.classList.add('loading');

    const tl = gsap.timeline({
      onComplete: () => {
        document.body.classList.remove('loading');
        onComplete();
      },
    });

    // Generate particles
    const particles = particlesRef.current;
    if (particles) {
      for (let i = 0; i < 30; i++) {
        const p = document.createElement('div');
        p.className = styles.particle;
        p.style.left = `${Math.random() * 100}%`;
        p.style.top = `${Math.random() * 100}%`;
        p.style.animationDelay = `${Math.random() * 3}s`;
        p.style.width = `${Math.random() * 3 + 1}px`;
        p.style.height = p.style.width;
        p.style.opacity = `${Math.random() * 0.6 + 0.2}`;
        particles.appendChild(p);
      }
    }

    // Moon entrance
    tl.set(moonRef.current, { scale: 0, opacity: 0 })
      .to(moonRef.current, {
        scale: 1,
        opacity: 1,
        duration: 1.2,
        ease: 'elastic.out(1, 0.5)',
      })

      // Bismillah fade in
      .fromTo(
        bismillahRef.current,
        { opacity: 0, y: 20 },
        { opacity: 1, y: 0, duration: 0.8, ease: 'power3.out' },
        '-=0.4'
      )

      // Text lines stagger in
      .fromTo(
        textRef.current?.querySelectorAll('.' + styles.textLine) ?? [],
        { opacity: 0, y: 30 },
        {
          opacity: 1,
          y: 0,
          duration: 0.8,
          stagger: 0.2,
          ease: 'power3.out',
        },
        '-=0.2'
      )

      // Progress bar fill
      .fromTo(
        progressRef.current,
        { scaleX: 0 },
        { scaleX: 1, duration: 2, ease: 'power2.inOut', transformOrigin: 'left' },
        '-=0.5'
      )

      // Hold for a moment
      .to({}, { duration: 0.5 })

      // Fade out entire loader
      .to(loaderRef.current, {
        opacity: 0,
        scale: 1.05,
        duration: 0.8,
        ease: 'power2.inOut',
        onComplete: () => {
          if (loaderRef.current) {
            loaderRef.current.style.display = 'none';
          }
        },
      });

    return () => {
      tl.kill();
    };
  }, [onComplete]);

  return (
    <div ref={loaderRef} className={styles.loader} role="status" aria-label="Loading">
      <div ref={particlesRef} className={styles.particles} aria-hidden="true" />

      <div className={styles.content}>
        <div ref={moonRef} className={styles.moon} aria-hidden="true">
          <div className={styles.moonGlow} />
          <div className={styles.moonCrescent}>☽</div>
          <div className={styles.moonRing} />
        </div>

        <div ref={bismillahRef} className={styles.bismillah}>
          <span>بِسْمِ اللَّهِ الرَّحْمَٰنِ الرَّحِيمِ</span>
        </div>

        <div ref={textRef} className={styles.text}>
          <div className={styles.textLine}>
            <span className={styles.invitationLabel}>Wedding Invitation</span>
          </div>
          <div className={styles.textLine}>
            <span className={styles.namesPreview}>Hani & Sakib</span>
          </div>
          <div className={styles.textLine}>
            <span className={styles.datePreview}>03 · 07 · MMXXVI</span>
          </div>
        </div>

        <div className={styles.progressTrack}>
          <div ref={progressRef} className={styles.progressBar} />
        </div>
      </div>
    </div>
  );
};

export default Loader;
