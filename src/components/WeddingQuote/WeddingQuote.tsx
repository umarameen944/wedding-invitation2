import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { motion } from 'framer-motion';
import { WEDDING_DATA } from '@utils/constants';
import styles from './WeddingQuote.module.css';

gsap.registerPlugin(ScrollTrigger);

const WeddingQuote = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const cardRef = useRef<HTMLDivElement>(null);
  const arabicRef = useRef<HTMLParagraphElement>(null);
  const translationRef = useRef<HTMLParagraphElement>(null);
  const referenceRef = useRef<HTMLSpanElement>(null);
  const borderRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Scroll-triggered animation
      gsap.timeline({
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top 70%',
          once: true,
        },
      })
        .fromTo(
          cardRef.current,
          { opacity: 0, y: 80, scale: 0.95 },
          { opacity: 1, y: 0, scale: 1, duration: 1.4, ease: 'power3.out' }
        )
        .fromTo(
          arabicRef.current,
          { opacity: 0, y: 30 },
          { opacity: 1, y: 0, duration: 1, ease: 'power3.out' },
          '-=0.6'
        )
        .fromTo(
          [translationRef.current, referenceRef.current],
          { opacity: 0, y: 20 },
          { opacity: 1, y: 0, duration: 0.8, stagger: 0.2, ease: 'power3.out' },
          '-=0.5'
        );

      // Border glow pulse
      gsap.to(borderRef.current, {
        boxShadow: '0 0 60px rgba(212, 175, 55, 0.3), 0 0 120px rgba(212, 175, 55, 0.1)',
        duration: 2,
        yoyo: true,
        repeat: -1,
        ease: 'power1.inOut',
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top 60%',
        },
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} className={styles.section} id="quote">
      <div className={styles.container}>
        {/* Decorative top */}
        <div className={styles.decorTop} aria-hidden="true">
          <span className={styles.decorLine} />
          <span className={styles.decorMoon}>☽</span>
          <span className={styles.decorLine} />
        </div>

        {/* Glass card */}
        <div ref={cardRef} className={styles.card}>
          <div ref={borderRef} className={styles.cardInner}>
            {/* Corner ornaments */}
            <div className={`${styles.corner} ${styles.cornerTL}`} aria-hidden="true" />
            <div className={`${styles.corner} ${styles.cornerTR}`} aria-hidden="true" />
            <div className={`${styles.corner} ${styles.cornerBL}`} aria-hidden="true" />
            <div className={`${styles.corner} ${styles.cornerBR}`} aria-hidden="true" />

            <blockquote className={styles.quoteContent}>
              <motion.p
                ref={arabicRef}
                className={styles.arabic}
                dir="rtl"
                lang="ar"
              >
                {WEDDING_DATA.quote.arabic}
              </motion.p>

              <div className={styles.quranDivider} aria-hidden="true">
                <span />
                <span className={styles.starDiamond}>✦</span>
                <span />
              </div>

              <p ref={translationRef} className={styles.translation}>
                &ldquo;{WEDDING_DATA.quote.translation}&rdquo;
              </p>

              <cite ref={referenceRef} className={styles.reference}>
                {WEDDING_DATA.quote.reference}
              </cite>
            </blockquote>
          </div>
        </div>

        {/* Decorative bottom */}
        <div className={styles.decorBottom} aria-hidden="true">
          <span className={styles.decorLine} />
          <span className={styles.decorDiamond} />
          <span className={styles.decorLine} />
        </div>
      </div>
    </section>
  );
};

export default WeddingQuote;
