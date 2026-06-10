import { useState, useEffect } from 'react';
import { AnimatePresence } from 'framer-motion';
import Loader from '@components/Loader/Loader';
import ScrollProgress from '@components/ScrollProgress/ScrollProgress';
import AudioPlayer from '@components/AudioPlayer/AudioPlayer';
import Home from '@/pages/Home';
import { useMousePosition } from '@hooks/useMousePosition';
import { useLenis } from '@hooks/useLenis';
import { initScrollTrigger } from '@utils/animations';
import styles from './App.module.css';

initScrollTrigger();

const App = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [isReady, setIsReady] = useState(false);

  const { cursorRef, ringRef } = useMousePosition();
  useLenis(isReady);

  const handleLoadComplete = () => {
    setIsLoading(false);
    // Give a tick for mount animations
    requestAnimationFrame(() => setIsReady(true));
  };

  // Preload critical resources
  useEffect(() => {
    const fonts = [
      'Cinzel',
      'Playfair Display',
      'Poppins',
      'Amiri',
    ];

    if ('fonts' in document) {
      Promise.all(
        fonts.map((font) => document.fonts.load(`1em "${font}"`))
      ).catch(() => {
        // Fonts may not load in all environments — proceed anyway
      });
    }
  }, []);

  return (
    <>
      {/* Skip link for accessibility */}
      <a href="#main-content" className={styles.skipLink}>
        Skip to main content
      </a>

      {/* Custom cursor */}
      <div ref={cursorRef} className="cursor" aria-hidden="true" />
      <div ref={ringRef} className="cursor-ring" aria-hidden="true" />

      {/* Scroll progress */}
      {isReady && <ScrollProgress />}

      {/* Cinematic loader */}
      <AnimatePresence>
        {isLoading && <Loader onComplete={handleLoadComplete} />}
      </AnimatePresence>

      {/* Main page */}
      {!isLoading && <Home />}

      {/* Global audio player (sticky) - will autoplay after 1s, or shows hint for user interaction */}
      <AudioPlayer />
    </>
  );
};

export default App;
