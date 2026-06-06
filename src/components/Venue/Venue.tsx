// import { useEffect, useRef } from 'react';
// import { gsap } from 'gsap';
// import { ScrollTrigger } from 'gsap/ScrollTrigger';
// import { motion } from 'framer-motion';
// import { FiMapPin, FiPhone, FiCalendar } from 'react-icons/fi';
// import { WEDDING_DATA } from '@utils/constants';
// import { generateCalendarLink } from '@utils/helpers';
// import styles from './Venue.module.css';

// gsap.registerPlugin(ScrollTrigger);

// const Venue = () => {
//   const sectionRef = useRef<HTMLElement>(null);
//   const mapRef = useRef<HTMLDivElement>(null);
//   const infoRef = useRef<HTMLDivElement>(null);

//   useEffect(() => {
//     const ctx = gsap.context(() => {
//       gsap.fromTo(
//         infoRef.current,
//         { opacity: 0, x: -60 },
//         {
//           opacity: 1,
//           x: 0,
//           duration: 1.2,
//           ease: 'power3.out',
//           scrollTrigger: {
//             trigger: sectionRef.current,
//             start: 'top 70%',
//             once: true,
//           },
//         }
//       );

//       gsap.fromTo(
//         mapRef.current,
//         { opacity: 0, x: 60, scale: 0.95 },
//         {
//           opacity: 1,
//           x: 0,
//           scale: 1,
//           duration: 1.2,
//           ease: 'power3.out',
//           scrollTrigger: {
//             trigger: sectionRef.current,
//             start: 'top 70%',
//             once: true,
//           },
//         }
//       );
//     }, sectionRef);

//     return () => ctx.revert();
//   }, []);

//   const calendarLink = generateCalendarLink(
//     `Wedding of ${WEDDING_DATA.bride.name} & ${WEDDING_DATA.groom.name}`,
//     WEDDING_DATA.weddingDate,
//     WEDDING_DATA.nikahVenue.address,
//     `You are cordially invited to the wedding of ${WEDDING_DATA.bride.fullName} and ${WEDDING_DATA.groom.fullName}.`
//   );

//   return (
//     <section ref={sectionRef} className={styles.section} id="venue">
//       <div className={styles.container}>
//         {/* Header */}
//         <motion.div
//           className={styles.header}
//           initial={{ opacity: 0, y: 30 }}
//           whileInView={{ opacity: 1, y: 0 }}
//           viewport={{ once: true }}
//           transition={{ duration: 0.9 }}
//         >
//           <span className={styles.sectionLabel}>The Venue</span>
//           <h2 className={styles.title}>Where We Gather</h2>
//           <div className={styles.divider} />
//         </motion.div>

//         <div className={styles.content}>
//           {/* Info panel */}
//           <div ref={infoRef} className={styles.info}>
//             <div className={styles.venueName}>{WEDDING_DATA.nikahVenue.name}</div>

//             <div className={styles.venueDetails}>
//               <div className={styles.detailRow}>
//                 <FiMapPin className={styles.icon} />
//                 <p className={styles.address}>{WEDDING_DATA.nikahVenue.address}</p>
//               </div>

//               <div className={styles.detailRow}>
//                 <FiCalendar className={styles.icon} />
//                 <p className={styles.dateInfo}>3 July 2026</p>
//               </div>

//               <div className={styles.detailRow}>
//                 <FiPhone className={styles.icon} />
//                 <p className={styles.phone}>{WEDDING_DATA.nikahVenue.phone}</p>
//               </div>
//             </div>

//             <div className={styles.dividerShort} aria-hidden="true" />

//             {/* Action Buttons */}
//             <div className={styles.actions}>
//               <motion.a
//                 href={WEDDING_DATA.nikahVenue.googleMapsLink}
//                 target="_blank"
//                 rel="noopener noreferrer"
//                 className={styles.btnPrimary}
//                 whileHover={{ scale: 1.04 }}
//                 whileTap={{ scale: 0.97 }}
//                 aria-label="Open venue in Google Maps"
//               >
//                 <FiMapPin />
//                 <span>Open in Maps</span>
//               </motion.a>

//               <motion.a
//                 href={`tel:${WEDDING_DATA.nikahVenue.phone}`}
//                 className={styles.btnSecondary}
//                 whileHover={{ scale: 1.04 }}
//                 whileTap={{ scale: 0.97 }}
//                 aria-label="Call venue"
//               >
//                 <FiPhone />
//                 <span>Call Venue</span>
//               </motion.a>

//               <motion.a
//                 href={calendarLink}
//                 target="_blank"
//                 rel="noopener noreferrer"
//                 className={styles.btnSecondary}
//                 whileHover={{ scale: 1.04 }}
//                 whileTap={{ scale: 0.97 }}
//                 aria-label="Add to Google Calendar"
//               >
//                 <FiCalendar />
//                 <span>Add to Calendar</span>
//               </motion.a>
//             </div>
//           </div>

//           {/* Map */}
//           <div ref={mapRef} className={styles.mapWrapper}>
//             <div className={styles.mapBorder}>
//               <iframe
//                 src={WEDDING_DATA.nikahVenue.mapUrl}
//                 className={styles.map}
//                 allowFullScreen
//                 loading="lazy"
//                 referrerPolicy="no-referrer-when-downgrade"
//                 title={`Map showing location of ${WEDDING_DATA.nikahVenue.name}`}
//               />
//               <div className={styles.mapOverlay} aria-hidden="true" />
//             </div>
//           </div>
//         </div>
//       </div>
//     </section>
//   );
// };

// export default Venue;
import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { FiMapPin, FiPhone, FiCalendar } from 'react-icons/fi';
import { WEDDING_DATA } from '@utils/constants';
import { generateCalendarLink } from '@utils/helpers';
import styles from './Venue.module.css';

gsap.registerPlugin(ScrollTrigger);

const Venue = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const cardsRef = useRef<(HTMLDivElement | null)[]>([]);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(
        cardsRef.current,
        { opacity: 0, y: 50 },
        {
          opacity: 1,
          y: 0,
          duration: 1,
          stagger: 0.2,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: sectionRef.current,
            start: 'top 75%',
            once: true,
          },
        }
      );
    }, sectionRef);
    return () => ctx.revert();
  }, []);

  const nikahCalendarLink = generateCalendarLink(
    `Nikah Ceremony – ${WEDDING_DATA.bride.name} & ${WEDDING_DATA.groom.name}`,
    new Date(`${WEDDING_DATA.nikahVenue.date} ${WEDDING_DATA.nikahVenue.time}`),
    WEDDING_DATA.nikahVenue.address,
    `You are cordially invited to the Nikah ceremony.`
  );

  const walimaCalendarLink = generateCalendarLink(
    `Walima Reception – ${WEDDING_DATA.bride.name} & ${WEDDING_DATA.groom.name}`,
    new Date(`${WEDDING_DATA.walimaVenue.date} ${WEDDING_DATA.walimaVenue.time}`),
    WEDDING_DATA.walimaVenue.address,
    `Blessed Walima feast celebration.`
  );

  return (
    <section ref={sectionRef} className={styles.section} id="venue">
      {/* Magical background elements */}
      <div className={styles.starsContainer}>
        {[...Array(25)].map((_, i) => (
          <div
            key={i}
            className={styles.floatingStar}
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              animationDelay: `${Math.random() * 5}s`,
            }}
          />
        ))}
      </div>
      <div className={styles.arabesqueTop} />
      <div className={styles.arabesqueBottom} />

      <div className={styles.container}>
        {/* Header with arch */}
        <div className={styles.header}>
          <div className={styles.archDecor} />
          <span className={styles.sectionLabel}>The Celebrations</span>
          <h2 className={styles.title}>Venues & Timings</h2>
          <div className={styles.titleDivider}>
            <span className={styles.dividerIcon}>⚜</span>
          </div>
        </div>

        {/* Two venue cards - each with its own map */}
        <div className={styles.cardsGrid}>
          {/* Nikah Card */}
          <div ref={(el) => { cardsRef.current[0] = el; }} className={styles.venueCard}>
            <div className={styles.cardGlow} />
            <div className={styles.cardHeader}>
              <span className={styles.eventBadge}>Nikah Ceremony</span>
              <span className={styles.eventDate}>{WEDDING_DATA.nikahVenue.date} · {WEDDING_DATA.nikahVenue.time}</span>
            </div>
            <h3 className={styles.venueName}>{WEDDING_DATA.nikahVenue.name}</h3>
            <div className={styles.detailRow}>
              <FiMapPin className={styles.icon} />
              <p>{WEDDING_DATA.nikahVenue.address}</p>
            </div>
            <div className={styles.detailRow}>
              <FiPhone className={styles.icon} />
              <p>{WEDDING_DATA.nikahVenue.phone}</p>
            </div>
            <div className={styles.actions}>
              <a href={WEDDING_DATA.nikahVenue.googleMapsLink} target="_blank" rel="noopener noreferrer" className={styles.btnPrimary}>
                <FiMapPin /> <span>Open in Maps</span>
              </a>
              <a href={`tel:${WEDDING_DATA.nikahVenue.phone}`} className={styles.btnSecondary}>
                <FiPhone /> <span>Call</span>
              </a>
              <a href={nikahCalendarLink} target="_blank" rel="noopener noreferrer" className={styles.btnSecondary}>
                <FiCalendar /> <span>Add to Calendar</span>
              </a>
            </div>
            {/* Nikah Map */}
            <div className={styles.cardMap}>
              <div className={styles.mapBorder}>
                <iframe
                  src={WEDDING_DATA.nikahVenue.mapUrl}
                  className={styles.map}
                  allowFullScreen
                  loading="lazy"
                  title="Nikah venue map"
                />
                <div className={styles.mapOverlay} aria-hidden="true" />
              </div>
            </div>
          </div>

          {/* Walima Card */}
          <div ref={(el) => { cardsRef.current[1] = el; }} className={styles.venueCard}>
            <div className={styles.cardGlow} />
            <div className={styles.cardHeader}>
              <span className={styles.eventBadge}>Walima Feast</span>
              <span className={styles.eventDate}>{WEDDING_DATA.walimaVenue.date} · {WEDDING_DATA.walimaVenue.time}</span>
            </div>
            <h3 className={styles.venueName}>{WEDDING_DATA.walimaVenue.name}</h3>
            <div className={styles.detailRow}>
              <FiMapPin className={styles.icon} />
              <p>{WEDDING_DATA.walimaVenue.address}</p>
            </div>
            <div className={styles.detailRow}>
              <FiPhone className={styles.icon} />
              <p>{WEDDING_DATA.walimaVenue.phone}</p>
            </div>
            <div className={styles.actions}>
              <a href={WEDDING_DATA.walimaVenue.googleMapsLink} target="_blank" rel="noopener noreferrer" className={styles.btnPrimary}>
                <FiMapPin /> <span>Open in Maps</span>
              </a>
              <a href={`tel:${WEDDING_DATA.walimaVenue.phone}`} className={styles.btnSecondary}>
                <FiPhone /> <span>Call</span>
              </a>
              <a href={walimaCalendarLink} target="_blank" rel="noopener noreferrer" className={styles.btnSecondary}>
                <FiCalendar /> <span>Add to Calendar</span>
              </a>
            </div>
            {/* Walima Map */}
            <div className={styles.cardMap}>
              <div className={styles.mapBorder}>
                <iframe
                  src={WEDDING_DATA.walimaVenue.mapUrl}
                  className={styles.map}
                  allowFullScreen
                  loading="lazy"
                  title="Walima venue map"
                />
                <div className={styles.mapOverlay} aria-hidden="true" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Venue;