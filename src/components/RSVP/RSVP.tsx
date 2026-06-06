import { useState, useRef, useEffect, type FormEvent, type ChangeEvent } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { motion, AnimatePresence } from 'framer-motion';
import { FiUser, FiPhone, FiUsers, FiMessageSquare, FiSend, FiCheck } from 'react-icons/fi';
import styles from './RSVP.module.css';

gsap.registerPlugin(ScrollTrigger);

interface FormData {
  name: string;
  phone: string;
  guests: string;
  message: string;
}

interface FormErrors {
  name?: string;
  phone?: string;
  guests?: string;
}

type SubmitState = 'idle' | 'submitting' | 'success' | 'error';

const RSVP = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const formRef = useRef<HTMLFormElement>(null);

  const [formData, setFormData] = useState<FormData>({
    name: '',
    phone: '',
    guests: '1',
    message: '',
  });
  const [errors, setErrors] = useState<FormErrors>({});
  const [submitState, setSubmitState] = useState<SubmitState>('idle');

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(
        formRef.current,
        { opacity: 0, y: 80, scale: 0.96 },
        {
          opacity: 1,
          y: 0,
          scale: 1,
          duration: 1.3,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: sectionRef.current,
            start: 'top 65%',
            once: true,
          },
        }
      );
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  const validate = (): boolean => {
    const newErrors: FormErrors = {};

    if (!formData.name.trim()) {
      newErrors.name = 'Your name is required';
    } else if (formData.name.trim().length < 2) {
      newErrors.name = 'Name must be at least 2 characters';
    }

    if (!formData.phone.trim()) {
      newErrors.phone = 'Phone number is required';
    } else if (!/^[+]?[\d\s\-()]{8,15}$/.test(formData.phone.trim())) {
      newErrors.phone = 'Please enter a valid phone number';
    }

    const guestNum = parseInt(formData.guests, 10);
    if (!formData.guests || isNaN(guestNum) || guestNum < 1) {
      newErrors.guests = 'At least 1 guest is required';
    } else if (guestNum > 10) {
      newErrors.guests = 'Maximum 10 guests per RSVP';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleChange = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    if (errors[name as keyof FormErrors]) {
      setErrors((prev) => ({ ...prev, [name]: undefined }));
    }
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    if (!validate()) return;

    setSubmitState('submitting');

    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 1800));
    setSubmitState('success');
  };

  return (
    <section ref={sectionRef} className={styles.section} id="rsvp">
      <div className={styles.bgOrb} aria-hidden="true" />

      <div className={styles.container}>
        <motion.div
          className={styles.header}
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.9 }}
        >
          <span className={styles.sectionLabel}>RSVP</span>
          <h2 className={styles.title}>Join Our Celebration</h2>
          <p className={styles.subtitle}>
            Kindly respond by <strong>1st December 2026</strong>
          </p>
          <div className={styles.divider} />
        </motion.div>

        <AnimatePresence mode="wait">
          {submitState === 'success' ? (
            <motion.div
              key="success"
              className={styles.successCard}
              initial={{ opacity: 0, scale: 0.8, y: 40 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
            >
              <div className={styles.successIcon}>
                <FiCheck />
              </div>
              <h3 className={styles.successTitle}>We Can't Wait to See You!</h3>
              <p className={styles.successText}>
                Your RSVP has been received. We look forward to celebrating this
                joyous occasion with you.
              </p>
              <p className={styles.successArabic} dir="rtl" lang="ar">
                بارك الله فيك
              </p>
            </motion.div>
          ) : (
            <motion.form
              key="form"
              ref={formRef}
              className={styles.form}
              onSubmit={handleSubmit}
              noValidate
              aria-label="RSVP Form"
            >
              {/* Corner ornaments */}
              <div className={`${styles.corner} ${styles.cornerTL}`} aria-hidden="true" />
              <div className={`${styles.corner} ${styles.cornerTR}`} aria-hidden="true" />
              <div className={`${styles.corner} ${styles.cornerBL}`} aria-hidden="true" />
              <div className={`${styles.corner} ${styles.cornerBR}`} aria-hidden="true" />

              <div className={styles.fieldsGrid}>
                {/* Name */}
                <div className={`${styles.fieldGroup} ${errors.name ? styles.hasError : ''}`}>
                  <label htmlFor="name" className={styles.label}>
                    <FiUser className={styles.labelIcon} />
                    Full Name
                  </label>
                  <input
                    id="name"
                    name="name"
                    type="text"
                    autoComplete="name"
                    className={styles.input}
                    value={formData.name}
                    onChange={handleChange}
                    placeholder="Your full name"
                    aria-required="true"
                    aria-invalid={!!errors.name}
                    aria-describedby={errors.name ? 'name-error' : undefined}
                  />
                  {errors.name && (
                    <span id="name-error" className={styles.errorMsg} role="alert">
                      {errors.name}
                    </span>
                  )}
                </div>

                {/* Phone */}
                <div className={`${styles.fieldGroup} ${errors.phone ? styles.hasError : ''}`}>
                  <label htmlFor="phone" className={styles.label}>
                    <FiPhone className={styles.labelIcon} />
                    Phone Number
                  </label>
                  <input
                    id="phone"
                    name="phone"
                    type="tel"
                    autoComplete="tel"
                    className={styles.input}
                    value={formData.phone}
                    onChange={handleChange}
                    placeholder="+91 98765 43210"
                    aria-required="true"
                    aria-invalid={!!errors.phone}
                    aria-describedby={errors.phone ? 'phone-error' : undefined}
                  />
                  {errors.phone && (
                    <span id="phone-error" className={styles.errorMsg} role="alert">
                      {errors.phone}
                    </span>
                  )}
                </div>

                {/* Guests */}
                <div className={`${styles.fieldGroup} ${errors.guests ? styles.hasError : ''}`}>
                  <label htmlFor="guests" className={styles.label}>
                    <FiUsers className={styles.labelIcon} />
                    Number of Guests
                  </label>
                  <select
                    id="guests"
                    name="guests"
                    className={`${styles.input} ${styles.select}`}
                    value={formData.guests}
                    onChange={handleChange}
                    aria-required="true"
                    aria-invalid={!!errors.guests}
                    aria-describedby={errors.guests ? 'guests-error' : undefined}
                  >
                    {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map((n) => (
                      <option key={n} value={n.toString()}>
                        {n} {n === 1 ? 'Guest' : 'Guests'}
                      </option>
                    ))}
                  </select>
                  {errors.guests && (
                    <span id="guests-error" className={styles.errorMsg} role="alert">
                      {errors.guests}
                    </span>
                  )}
                </div>

                {/* Message */}
                <div className={`${styles.fieldGroup} ${styles.fullWidth}`}>
                  <label htmlFor="message" className={styles.label}>
                    <FiMessageSquare className={styles.labelIcon} />
                    Message <span className={styles.optional}>(optional)</span>
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    className={`${styles.input} ${styles.textarea}`}
                    value={formData.message}
                    onChange={handleChange}
                    placeholder="Share your wishes for the couple..."
                    rows={4}
                  />
                </div>
              </div>

              {/* Submit */}
              <motion.button
                type="submit"
                className={styles.submitBtn}
                disabled={submitState === 'submitting'}
                whileHover={submitState !== 'submitting' ? { scale: 1.03 } : {}}
                whileTap={submitState !== 'submitting' ? { scale: 0.97 } : {}}
                aria-label="Submit RSVP"
              >
                {submitState === 'submitting' ? (
                  <span className={styles.loadingDots} aria-label="Submitting">
                    <span />
                    <span />
                    <span />
                  </span>
                ) : (
                  <>
                    <FiSend />
                    <span>Confirm Attendance</span>
                  </>
                )}
                <div className={styles.btnShimmer} />
              </motion.button>
            </motion.form>
          )}
        </AnimatePresence>
      </div>
    </section>
  );
};

export default RSVP;
