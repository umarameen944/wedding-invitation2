import { useEffect, useRef, useState } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { motion, AnimatePresence } from 'framer-motion';
import FloatingLanterns from '@components/FloatingLanterns/FloatingLanterns';
import { WEDDING_DATA } from '@utils/constants';
import styles from './Celebration.module.css';

gsap.registerPlugin(ScrollTrigger);

interface FireworkParticle {
  id: number;
  x: number;
  y: number;
  color: string;
  angle: number;
  speed: number;
  size: number;
}

const FIREWORK_COLORS = [
  '#D4AF37', '#F0D060', '#F5E6C8', '#FFD700',
  '#FFA500', '#FF6B35', '#FFFFFF', '#A8860A',
];

const generateFirework = (id: number): FireworkParticle[] => {
  const x = 20 + Math.random() * 60;
  const y = 10 + Math.random() * 50;
  const count = 20 + Math.floor(Math.random() * 15);

  return Array.from({ length: count }, (_, i) => ({
    id: id * 1000 + i,
    x,
    y,
    color: FIREWORK_COLORS[Math.floor(Math.random() * FIREWORK_COLORS.length)],
    angle: (360 / count) * i + Math.random() * 10,
    speed: 3 + Math.random() * 5,
    size: 2 + Math.random() * 3,
  }));
};

const Celebration = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const [isActive, setIsActive] = useState(false);
  const [fireworks, setFireworks] = useState<FireworkParticle[][]>([]);
  const fireworkInterval = useRef<ReturnType<typeof setInterval>>(undefined);
  const fireworkCount = useRef(0);

  useEffect(() => {
    ScrollTrigger.create({
      trigger: sectionRef.current,
      start: 'top 80%',
      once: true,
      onEnter: () => {
        setIsActive(true);

        // Launch fireworks in sequence
        let count = 0;
        fireworkInterval.current = setInterval(() => {
          if (count >= 8) {
            if (fireworkInterval.current) clearInterval(fireworkInterval.current);
            return;
          }
          fireworkCount.current += 1;
          setFireworks((prev) => [
            ...prev.slice(-6),
            generateFirework(fireworkCount.current),
          ]);
          count++;
        }, 600);
      },
    });

    return () => {
      if (fireworkInterval.current) clearInterval(fireworkInterval.current);
      ScrollTrigger.getAll().forEach((st) => {
        if (st.trigger === sectionRef.current) st.kill();
      });
    };
  }, []);

  return (
    <section ref={sectionRef} className={styles.section} id="celebration">
      {/* Palace background with lights on */}
      <div className={styles.palaceBg} aria-hidden="true">
        <svg
          viewBox="0 0 1440 400"
          xmlns="[w3.org](http://www.w3.org/2000/svg)"
          preserveAspectRatio="xMidYMax meet"
          className={styles.palaceSvg}
        >
          <defs>
            <linearGradient id="palaceCelebGrad" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#3D2817" stopOpacity="0.95" />
              <stop offset="100%" stopColor="#1A1410" stopOpacity="1" />
            </linearGradient>
            <filter id="windowGlowCeleb">
              <feGaussianBlur stdDeviation="4" result="coloredBlur" />
              <feMerge>
                <feMergeNode in="coloredBlur" />
                <feMergeNode in="SourceGraphic" />
              </feMerge>
            </filter>
          </defs>

          {/* Ground */}
          <rect x="0" y="380" width="1440" height="20" fill="#0D0D0D" />

          {/* Palace silhouette */}
          <rect x="200" y="260" width="1040" height="120" fill="url(#palaceCelebGrad)" />

          {/* Center dome */}
          <rect x="580" y="200" width="280" height="180" fill="url(#palaceCelebGrad)" />
          <ellipse cx="720" cy="155" rx="90" ry="110" fill="#2A1F10" />
          <ellipse cx="720" cy="75" rx="28" ry="42" fill="#2A1F10" />
          <line x1="720" y1="33" x2="720" y2="10" stroke="#FFD700" strokeWidth="3" opacity="1" />
          <circle cx="720" cy="8" r="7" fill="#FFD700" opacity="1" />

          {/* Left tower */}
          <rect x="260" y="180" width="100" height="200" fill="url(#palaceCelebGrad)" />
          <ellipse cx="310" cy="140" rx="25" ry="35" fill="#2A1F10" />
          <line x1="310" y1="105" x2="310" y2="85" stroke="#FFD700" strokeWidth="2" opacity="1" />
          <circle cx="310" cy="83" r="4" fill="#FFD700" />

          {/* Right tower */}
          <rect x="1080" y="180" width="100" height="200" fill="url(#palaceCelebGrad)" />
          <ellipse cx="1130" cy="140" rx="25" ry="35" fill="#2A1F10" />
          <line x1="1130" y1="105" x2="1130" y2="85" stroke="#FFD700" strokeWidth="2" opacity="1" />
          <circle cx="1130" cy="83" r="4" fill="#FFD700" />

          {/* Lit windows — all golden */}
          {[310, 370, 430, 490, 550].map((x, i) => (
            <path
              key={`lw-${i}`}
              d={`M${x} 350 L${x} 310 Q${x+18} 295 ${x+36} 310 L${x+36} 350Z`}
              fill="rgba(255,200,60,0.9)"
              filter="url(#windowGlowCeleb)"
            />
          ))}
          {[854, 914, 974, 1034, 1094].map((x, i) => (
            <path
              key={`rw-${i}`}
              d={`M${x} 350 L${x} 310 Q${x+18} 295 ${x+36} 310 L${x+36} 350Z`}
              fill="rgba(255,200,60,0.9)"
              filter="url(#windowGlowCeleb)"
            />
          ))}
          {[620, 660, 700, 740, 780].map((x, i) => (
            <path
              key={`cw-${i}`}
              d={`M${x} 350 L${x} 310 Q${x+14} 298 ${x+28} 310 L${x+28} 350Z`}
              fill="rgba(255,200,60,0.9)"
              filter="url(#windowGlowCeleb)"
            />
          ))}

          {/* Tower glow windows */}
          <circle cx="310" cy="230" r="14" fill="rgba(255,180,60,0.8)" filter="url(#windowGlowCeleb)" />
          <circle cx="1130" cy="230" r="14" fill="rgba(255,180,60,0.8)" filter="url(#windowGlowCeleb)" />
          <circle cx="720" cy="240" r="18" fill="rgba(255,180,60,0.6)" filter="url(#windowGlowCeleb)" />

          {/* Ground glow */}
          <ellipse cx="720" cy="378" rx="500" ry="20" fill="rgba(212,175,55,0.15)" filter="url(#windowGlowCeleb)" />

          {/* Gold trim */}
          <line x1="200" y1="260" x2="1240" y2="260" stroke="#FFD700" strokeWidth="1" opacity="0.6" />
        </svg>
      </div>

      {/* Lanterns rising */}
      {isActive && <FloatingLanterns count={18} />}

      {/* Fireworks canvas layer */}
      <div className={styles.fireworksContainer} aria-hidden="true">
        <AnimatePresence>
          {fireworks.flat().map((p) => (
            <motion.div
              key={p.id}
              className={styles.fireworkParticle}
              initial={{
                left: `${p.x}%`,
                top: `${p.y}%`,
                scale: 1,
                opacity: 1,
              }}
              animate={{
                left: `calc(${p.x}% + ${Math.cos((p.angle * Math.PI) / 180) * p.speed * 12}vw)`,
                top: `calc(${p.y}% + ${Math.sin((p.angle * Math.PI) / 180) * p.speed * 8}vh + 4vh)`,
                scale: 0,
                opacity: 0,
              }}
              exit={{ opacity: 0 }}
              transition={{ duration: 1.5, ease: 'easeOut' }}
              style={{
                width: `${p.size}px`,
                height: `${p.size}px`,
                background: p.color,
                boxShadow: `0 0 ${p.size * 3}px ${p.color}`,
              }}
            />
          ))}
        </AnimatePresence>
      </div>

      {/* Content */}
      <div className={styles.content}>

        <motion.div
          className={styles.mainMessage}
          initial={{ opacity: 0, y: 50, scale: 0.9 }}
          whileInView={{ opacity: 1, y: 0, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 1.3, delay: 0.5, ease: [0.16, 1, 0.3, 1] }}
        >
          <div className={styles.ornamentTop} aria-hidden="true">
            <span />
            <span className={styles.star}>✦</span>
            <span />
          </div>

          <h2 className={styles.celebrationText}>
            We Look Forward To
            <br />
            <span className={styles.celebrationTextGold}>Celebrating With You</span>
          </h2>

          <div className={styles.coupleNames}>
            <span className={styles.brideNameFinal}>{WEDDING_DATA.bride.name}</span>
            <span className={styles.heartIcon}>♡</span>
            <span className={styles.groomNameFinal}>{WEDDING_DATA.groom.name}</span>
          </div>

          <div className={styles.ornamentBottom} aria-hidden="true">
            <span />
            <span className={styles.star}>✦</span>
            <span />
          </div>
        </motion.div>

        <motion.div
          className={styles.duaBlock}
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 1.2, delay: 1 }}
        >
          <p className={styles.duaArabic} dir="rtl" lang="ar">
            بَارَكَ اللَّهُ لَكُمَا وَبَارَكَ عَلَيْكُمَا وَجَمَعَ بَيْنَكُمَا فِي خَيْرٍ
          </p>
          <p className={styles.duaTranslation}>
            May Allah bless you both, and may He bring you together in goodness.
          </p>
        </motion.div>

        <motion.p
          className={styles.familyNote}
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 1, delay: 1.3 }}
          style={{color:'#d3cfc7' }}
          >
        
          With love from both families
          <br />
          {/* <span className={styles.familyNames}>
            {WEDDING_DATA.bride.family}
            <span className={styles.familySep}>·</span>
            {WEDDING_DATA.groom.family}
          </span> */}
        </motion.p>
      </div>
    </section>
  );
};

export default Celebration;
