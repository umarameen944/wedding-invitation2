import { useRef, useEffect, useState } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { motion } from 'framer-motion';
import { useCountdown } from '@hooks/useCountdown';
import { WEDDING_DATA } from '@utils/constants';
import { formatTime } from '@utils/helpers';
import styles from './Countdown.module.css';

gsap.registerPlugin(ScrollTrigger);

interface FlipCardProps {
  value: number;
  prevValue: number;
  label: string;
}

const FlipCard = ({ value, prevValue, label }: FlipCardProps) => {
  const [isFlipping, setIsFlipping] = useState(false);
  const topRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (value !== prevValue) {
      setIsFlipping(true);
      const timeout = setTimeout(() => setIsFlipping(false), 600);
      return () => clearTimeout(timeout);
    }
  }, [value, prevValue]);

  return (
    <div className={styles.flipUnit}>
      <div className={`${styles.flipCard} ${isFlipping ? styles.flipping : ''}`}>
        {/* Static top half showing current value */}
        <div className={styles.top}>
          <span>{formatTime(value)}</span>
        </div>

        {/* Static bottom half showing current value */}
        <div className={styles.bottom}>
          <span>{formatTime(value)}</span>
        </div>

        {/* Flip animation: front = prev, back = current */}
        {isFlipping && (
          <>
            <div className={`${styles.flipFace} ${styles.flipFaceFront}`}>
              <span>{formatTime(prevValue)}</span>
            </div>
            <div ref={topRef} className={`${styles.flipFace} ${styles.flipFaceBack}`}>
              <span>{formatTime(value)}</span>
            </div>
          </>
        )}
      </div>

      <span className={styles.flipLabel}>{label}</span>
    </div>
  );
};

const Countdown = () => {
  const { timeLeft, prevTimeLeft } = useCountdown(WEDDING_DATA.weddingDate);
  const sectionRef = useRef<HTMLElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(
        contentRef.current,
        { opacity: 0, y: 60 },
        {
          opacity: 1,
          y: 0,
          duration: 1.2,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: sectionRef.current,
            start: 'top 70%',
            once: true,
          },
        }
      );
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  const units = [
    { value: timeLeft.days, prev: prevTimeLeft.days, label: 'Days' },
    { value: timeLeft.hours, prev: prevTimeLeft.hours, label: 'Hours' },
    { value: timeLeft.minutes, prev: prevTimeLeft.minutes, label: 'Minutes' },
    { value: timeLeft.seconds, prev: prevTimeLeft.seconds, label: 'Seconds' },
  ];

  return (
    <section ref={sectionRef} className={styles.section} id="countdown">
      <div className={styles.bgGlow} aria-hidden="true" />

      <div className={styles.container}>
        <motion.div
          className={styles.header}
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.9 }}
        >
          <span className={styles.sectionLabel}>Counting Down</span>
          <h2 className={styles.title}>Until We Say</h2>
          <p className={styles.subtitle} lang="ar" dir="rtl">
            قَبِلْتُ
          </p>
          <div className={styles.divider} />
        </motion.div>

        <div ref={contentRef} className={styles.flipGrid}>
          {units.map((unit,) => (
            <FlipCard
              key={unit.label}
              value={unit.value}
              prevValue={unit.prev}
              label={unit.label}
            />
          ))}
        </div>

        <motion.p
          className={styles.weddingDateCaption}
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 1, delay: 0.5 }}
        >
          3 · July · 2026 &nbsp;·&nbsp; Bengaluru
        </motion.p>
      </div>
    </section>
  );
};

export default Countdown;
