// import { useEffect, useRef } from 'react';
// import { gsap } from 'gsap';
// import { ScrollTrigger } from 'gsap/ScrollTrigger';
// import { motion } from 'framer-motion';
// import { WEDDING_DATA } from '@utils/constants';
// import styles from './EventTimeline.module.css';

// gsap.registerPlugin(ScrollTrigger);

// const iconMap: Record<string, string> = {
//   moon: '☽',
//   hands: '🤲',
//   star: '✦',
//   heart: '♡',
// };

// const EventTimeline = () => {
//   const sectionRef = useRef<HTMLElement>(null);
//   const lineRef = useRef<HTMLDivElement>(null);
//   const cardsRef = useRef<(HTMLDivElement | null)[]>([]);
//   const dotsRef = useRef<(HTMLDivElement | null)[]>([]);

//   useEffect(() => {
//     const ctx = gsap.context(() => {
//       // Animated connector line
//       gsap.fromTo(
//         lineRef.current,
//         { scaleY: 0, transformOrigin: 'top' },
//         {
//           scaleY: 1,
//           duration: 2,
//           ease: 'power2.inOut',
//           scrollTrigger: {
//             trigger: sectionRef.current,
//             start: 'top 60%',
//             once: true,
//           },
//         }
//       );

//       // Stagger card reveals
//       cardsRef.current.forEach((card, i) => {
//         if (!card) return;
//         const isLeft = i % 2 === 0;
//         gsap.fromTo(
//           card,
//           { opacity: 0, x: isLeft ? -80 : 80, y: 20 },
//           {
//             opacity: 1,
//             x: 0,
//             y: 0,
//             duration: 1.1,
//             ease: 'power3.out',
//             scrollTrigger: {
//               trigger: card,
//               start: 'top 80%',
//               once: true,
//             },
//           }
//         );
//       });

//       // Dot pulse animations
//       dotsRef.current.forEach((dot, i) => {
//         if (!dot) return;
//         gsap.fromTo(
//           dot,
//           { scale: 0, opacity: 0 },
//           {
//             scale: 1,
//             opacity: 1,
//             duration: 0.6,
//             ease: 'elastic.out(1, 0.5)',
//             delay: i * 0.3,
//             scrollTrigger: {
//               trigger: dot,
//               start: 'top 85%',
//               once: true,
//             },
//           }
//         );
//       });
//     }, sectionRef);

//     return () => ctx.revert();
//   }, []);

//   return (
//     <section ref={sectionRef} className={styles.section} id="events">
//       <div className={styles.container}>
//         {/* Header */}
//         <div className={styles.header}>
//           <motion.span
//             className={styles.sectionLabel}
//             initial={{ opacity: 0, y: 20 }}
//             whileInView={{ opacity: 1, y: 0 }}
//             viewport={{ once: true }}
//             transition={{ duration: 0.8 }}
//           >
//             The Celebrations
//           </motion.span>
//           <motion.h2
//             className={styles.title}
//             initial={{ opacity: 0, y: 30 }}
//             whileInView={{ opacity: 1, y: 0 }}
//             viewport={{ once: true }}
//             transition={{ duration: 0.9, delay: 0.1 }}
//           >
//             Order of Events
//           </motion.h2>
//           <motion.div
//             className={styles.titleDivider}
//             initial={{ scaleX: 0 }}
//             whileInView={{ scaleX: 1 }}
//             viewport={{ once: true }}
//             transition={{ duration: 1, delay: 0.3 }}
//           />
//         </div>

//         {/* Timeline */}
//         <div className={styles.timeline}>
//           {/* Center line */}
//           <div className={styles.lineTrack} aria-hidden="true">
//             <div ref={lineRef} className={styles.line} />
//           </div>

//           {/* Events */}
//           {WEDDING_DATA.events.map((event, i) => (
//             <div
//               key={event.id}
//               className={`${styles.timelineItem} ${
//                 i % 2 === 0 ? styles.left : styles.right
//               }`}
//             >
//               {/* Card */}
//               <div
//                 ref={(el) => { cardsRef.current[i] = el; }}
//                 className={styles.card}
//               >
//                 <div className={styles.cardGlow} aria-hidden="true" />

//                 <div className={styles.cardHeader}>
//                   <span className={styles.cardIcon} aria-hidden="true">
//                     {iconMap[event.icon] ?? '✦'}
//                   </span>
//                   <div className={styles.cardMeta}>
//                     <span className={styles.cardDate}>{event.date}</span>
//                     <span className={styles.cardTime}>{event.time}</span>
//                   </div>
//                 </div>

//                 <h3 className={styles.cardTitle}>{event.title}</h3>
//                 <p className={styles.cardArabic} dir="rtl" lang="ar">
//                   {event.arabic}
//                 </p>
//                 <p className={styles.cardDesc}>{event.description}</p>

//                 <div className={styles.cardConnector} aria-hidden="true" />
//               </div>

//               {/* Center dot */}
//               <div
//                 ref={(el) => { dotsRef.current[i] = el; }}
//                 className={styles.dot}
//                 aria-hidden="true"
//               >
//                 <div className={styles.dotInner} />
//                 <div className={styles.dotPulse} />
//               </div>

//               {/* Spacer for opposite side */}
//               <div className={styles.spacer} />
//             </div>
//           ))}
//         </div>
//       </div>
//     </section>
//   );
// };

// export default EventTimeline;
import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { motion } from 'framer-motion';
import { WEDDING_DATA } from '@utils/constants';
import styles from './EventTimeline.module.css';

gsap.registerPlugin(ScrollTrigger);

const iconMap: Record<string, string> = {
  moon: '☾',
  hands: '🤲',
  star: '⭐',
  heart: '❤️',
  lamp: '🪔',     // Chiraag / magic lamp
  carpet: '🕌',
  genie: '🧞',
};

const EventTimeline = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const lineRef = useRef<HTMLDivElement>(null);
  const cardsRef = useRef<(HTMLDivElement | null)[]>([]);
  const dotsRef = useRef<(HTMLDivElement | null)[]>([]);
  const lampRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Animated connector line — magical golden thread
      gsap.fromTo(
        lineRef.current,
        { scaleY: 0, transformOrigin: 'top' },
        {
          scaleY: 1,
          duration: 2.2,
          ease: 'power2.inOut',
          scrollTrigger: {
            trigger: sectionRef.current,
            start: 'top 60%',
            once: true,
          },
        }
      );

      // Stagger card reveals — flying carpet effect
      cardsRef.current.forEach((card, i) => {
        if (!card) return;
        const isLeft = i % 2 === 0;
        gsap.fromTo(
          card,
          { opacity: 0, x: isLeft ? -100 : 100, y: 40, rotationY: isLeft ? -15 : 15 },
          {
            opacity: 1,
            x: 0,
            y: 0,
            rotationY: 0,
            duration: 1.2,
            ease: 'back.out(0.7)',
            scrollTrigger: {
              trigger: card,
              start: 'top 85%',
              once: true,
            },
          }
        );
      });

      // Dot magical sparkle animations
      dotsRef.current.forEach((dot, i) => {
        if (!dot) return;
        gsap.fromTo(
          dot,
          { scale: 0, opacity: 0, rotate: 0 },
          {
            scale: 1,
            opacity: 1,
            rotate: 360,
            duration: 0.8,
            ease: 'elastic.out(1, 0.4)',
            delay: i * 0.2,
            scrollTrigger: {
              trigger: dot,
              start: 'top 85%',
              once: true,
            },
          }
        );
      });

      // Floating lamp subtle animation (Chiraag)
      if (lampRef.current) {
        gsap.to(lampRef.current, {
          y: -12,
          duration: 2.5,
          repeat: -1,
          yoyo: true,
          ease: 'sine.inOut',
        });
        gsap.to(lampRef.current, {
          rotate: 5,
          duration: 4,
          repeat: -1,
          yoyo: true,
          ease: 'sine.inOut',
        });
      }
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} className={styles.section} id="events">
      {/* Magical arabesque background elements */}
      <div className={styles.starsContainer}>
        {[...Array(25)].map((_, i) => (
          <div
            key={i}
            className={styles.floatingStar}
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              animationDelay: `${Math.random() * 5}s`,
              width: `${Math.random() * 3 + 1}px`,
              height: `${Math.random() * 3 + 1}px`,
            }}
          />
        ))}
      </div>
      <div className={styles.magicDust} />
      <div className={styles.arabesqueTop} />
      <div className={styles.arabesqueBottom} />
      
      <div className={styles.container}>
        {/* Header with arabesque arch */}
        <div className={styles.header}>
          <div className={styles.archDecor} />
          <motion.span
            className={styles.sectionLabel}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            ✦ Alf Layla wa Layla ✦
          </motion.span>
          <motion.h2
            className={styles.title}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.9, delay: 0.1 }}
          >
            حكاية الزفاف
            <span className={styles.titleEn}>Wedding Nights</span>
          </motion.h2>
          <motion.div
            className={styles.titleDivider}
            initial={{ scaleX: 0 }}
            whileInView={{ scaleX: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 1, delay: 0.3 }}
          >
            <span className={styles.dividerIcon}>⚜</span>
          </motion.div>
        </div>

        {/* Floating Magic Lamp (Chiraag) */}
        <div ref={lampRef} className={styles.magicLamp}>
          <div className={styles.lampBody}>
            <div className={styles.lampSpout}>🪔</div>
            <div className={styles.lampGlow} />
          </div>
          <div className={styles.smoke}>
            <span>✦</span><span>✧</span><span>✦</span>
          </div>
        </div>

        {/* Timeline */}
        <div className={styles.timeline}>
          {/* Center magical line track */}
          <div className={styles.lineTrack} aria-hidden="true">
            <div ref={lineRef} className={styles.line} />
            <div className={styles.lineGlow} />
          </div>

          {/* Events */}
          {WEDDING_DATA.events.map((event, i) => (
            <div
              key={event.id}
              className={`${styles.timelineItem} ${
                i % 2 === 0 ? styles.left : styles.right
              }`}
            >
              {/* Card */}
              <div
                ref={(el) => { cardsRef.current[i] = el; }}
                className={styles.card}
              >
                <div className={styles.cardArchOverlay} />
                <div className={styles.cardGlow} aria-hidden="true" />
                
                {/* Ornamental corner motifs */}
                <div className={styles.cornerTL} />
                <div className={styles.cornerTR} />
                <div className={styles.cornerBL} />
                <div className={styles.cornerBR} />

                <div className={styles.cardHeader}>
                  <span className={styles.cardIcon} aria-hidden="true">
                    {iconMap[event.icon] ?? '⚜'}
                  </span>
                  <div className={styles.cardMeta}>
                    <span className={styles.cardDate}>{event.date}</span>
                    <span className={styles.cardTime}>{event.time}</span>
                  </div>
                </div>

                <h3 className={styles.cardTitle}>{event.title}</h3>
                <p className={styles.cardArabic} dir="rtl" lang="ar">
                  {event.arabic}
                </p>
                <p className={styles.cardDesc}>{event.description}</p>

                <div className={styles.cardConnector} aria-hidden="true" />
                <div className={styles.cardLampIcon}>🪔</div>
              </div>

              {/* Center dot — magical gem */}
              <div
                ref={(el) => { dotsRef.current[i] = el; }}
                className={styles.dot}
                aria-hidden="true"
              >
                <div className={styles.dotInner} />
                <div className={styles.dotPulse} />
                <div className={styles.dotStar}>✦</div>
              </div>

              {/* Spacer for opposite side */}
              <div className={styles.spacer} />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default EventTimeline;