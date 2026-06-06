import { motion } from 'framer-motion';
import { WEDDING_DATA } from '@utils/constants';
import styles from './Footer.module.css';

const Footer = () => {
  return (
    <footer className={styles.footer} role="contentinfo">
      <div className={styles.container}>
        <div className={styles.topDivider} aria-hidden="true">
          <span />
          <span className={styles.moon}>☽</span>
          <span />
        </div>

        <motion.div
          className={styles.content}
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.9 }}
        >
          <div className={styles.names}>
            <span>{WEDDING_DATA.bride.name}</span>
            <span className={styles.amp}>&amp;</span>
            <span>{WEDDING_DATA.groom.name}</span>
          </div>

          <p className={styles.date}>19 · December · 2026</p>

          <nav className={styles.nav} aria-label="Footer navigation">
            {[
              { label: 'Events', href: '#events' },
              { label: 'Countdown', href: '#countdown' },
              { label: 'Venue', href: '#venue' },
            ].map((link) => (
              <a key={link.label} href={link.href} className={styles.navLink}>
                {link.label}
              </a>
            ))}
          </nav>

          <p className={styles.bismillah} dir="rtl" lang="ar">
            وَمِنْ آيَاتِهِ أَنْ خَلَقَ لَكُم مِّنْ أَنفُسِكُمْ أَزْوَاجًا
          </p>

          <p className={styles.copyright}>
            Crafted with love for a timeless celebration
          </p>
        </motion.div>
      </div>
    </footer>
  );
};

export default Footer;
