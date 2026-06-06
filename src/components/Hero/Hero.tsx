import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { motion } from 'framer-motion';
import PalaceBackground from '@components/PalaceBackground/PalaceBackground';
import FloatingLanterns from '@components/FloatingLanterns/FloatingLanterns';
import Particles from '@components/Particles/Particles';
import { WEDDING_DATA } from '@utils/constants';
import styles from './Hero.module.css';

const Hero = () => {
  const contentRef = useRef<HTMLDivElement>(null);
  const taglineRef = useRef<HTMLParagraphElement>(null);
  const brideRef = useRef<HTMLSpanElement>(null);
  const groomRef = useRef<HTMLSpanElement>(null);
  const ampRef = useRef<HTMLSpanElement>(null);
  const dateRef = useRef<HTMLDivElement>(null);
  const scrollHintRef = useRef<HTMLDivElement>(null);
  const mouseGlowRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (!mouseGlowRef.current) return;
      mouseGlowRef.current.style.left = `${e.clientX}px`;
      mouseGlowRef.current.style.top = `${e.clientY}px`;
    };

    window.addEventListener('mousemove', handleMouseMove, { passive: true });

    const tl = gsap.timeline({ delay: 0.3 });

    tl.fromTo(
      taglineRef.current,
      { opacity: 0, y: 30, letterSpacing: '0.8em' },
      { opacity: 1, y: 0, letterSpacing: '0.5em', duration: 1.2, ease: 'power3.out' }
    )
      .fromTo(
        brideRef.current,
        { opacity: 0, x: -80, skewX: -5 },
        { opacity: 1, x: 0, skewX: 0, duration: 1.2, ease: 'power3.out' },
        '-=0.6'
      )
      .fromTo(
        ampRef.current,
        { opacity: 0, scale: 0.5 },
        { opacity: 1, scale: 1, duration: 0.8, ease: 'elastic.out(1, 0.5)' },
        '-=0.8'
      )
      .fromTo(
        groomRef.current,
        { opacity: 0, x: 80, skewX: 5 },
        { opacity: 1, x: 0, skewX: 0, duration: 1.2, ease: 'power3.out' },
        '-=1.0'
      )
      .fromTo(
        dateRef.current,
        { opacity: 0, y: 40 },
        { opacity: 1, y: 0, duration: 1, ease: 'power3.out' },
        '-=0.5'
      )
      .fromTo(
        scrollHintRef.current,
        { opacity: 0 },
        { opacity: 1, duration: 1 },
        '-=0.2'
      );

    // Subtle parallax on scroll
    const handleScroll = () => {
      const scrollY = window.scrollY;
      if (contentRef.current) {
        contentRef.current.style.transform = `translateY(${scrollY * 0.3}px)`;
        contentRef.current.style.opacity = `${1 - scrollY / 600}`;
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('scroll', handleScroll);
      tl.kill();
    };
  }, []);

  return (
    <section className={styles.hero} id="hero" aria-label="Hero Section">
      {/* Mouse glow */}
      <div ref={mouseGlowRef} className={styles.mouseGlow} aria-hidden="true" />

      {/* Background layers */}
      <PalaceBackground />
      <FloatingLanterns count={10} />
      <Particles count={50} />

      {/* Center content */}
      <div ref={contentRef} className={styles.content}>
        <motion.div
          className={styles.bismillahSmall}
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5, duration: 1 }}
        >
          بِسْمِ اللَّهِ الرَّحْمَٰنِ الرَّحِيمِ
        </motion.div>

        <p ref={taglineRef} className={styles.tagline}>
          Wedding Invitation
        </p>

        <div className={styles.dividerTop}>
          <span className={styles.dividerLine} />
          <span className={styles.dividerDiamond} />
          <span className={styles.dividerLine} />
        </div>

        <h1 className={styles.names}>
          <span ref={brideRef} className={styles.bride}>
            {WEDDING_DATA.bride.name}
          </span>
          <span ref={ampRef} className={styles.amp}>&amp;</span>
          <span ref={groomRef} className={styles.groom}>
            {WEDDING_DATA.groom.name}
          </span>
        </h1>

        <div className={styles.dividerBottom}>
          <span className={styles.dividerLine} />
          <span className={styles.dividerDiamond} />
          <span className={styles.dividerLine} />
        </div>

        <div ref={dateRef} className={styles.dateBlock}>
          <span className={styles.dateText}>3 July 2026</span>
          <span className={styles.venueHint}>{WEDDING_DATA.nikahVenue.name}</span>
        </div>
      </div>

      {/* Scroll hint */}
      <div ref={scrollHintRef} className={styles.scrollHint} aria-label="Scroll down">
        <div className={styles.scrollLine} />
        <span className={styles.scrollText}>Scroll</span>
      </div>
    </section>
  );
};

export default Hero;
