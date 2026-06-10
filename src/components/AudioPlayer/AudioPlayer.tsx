import { useState, useEffect, useRef } from 'react';
import { FaPause, FaPlay, FaMusic } from 'react-icons/fa';
import styles from './AudioPlayer.module.css';

interface AudioPlayerProps {
  src?: string;
}

const AudioPlayer = ({ src = "/wedding-invitation2/music.mp3" }: AudioPlayerProps) => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [showHint, setShowHint] = useState(false);
  const audioRef = useRef<HTMLAudioElement>(null);
  const hasTriedAutoplay = useRef(false);

  // Play audio function
  const playAudio = () => {
    if (!audioRef.current) {
      console.error('❌ Audio ref not available');
      return;
    }

    console.log('▶️ Attempting to play audio...');
    const playPromise = audioRef.current.play();

    if (playPromise !== undefined) {
      playPromise
        .then(() => {
          console.log('✅ Audio started playing');
          setIsPlaying(true);
          setShowHint(false);
        })
        .catch((error) => {
          console.warn('⚠️ Audio play blocked:', error.name, error.message);
          setShowHint(true);
        });
    }
  };

  // Handle audio events
  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;

    // Audio element listeners
    const handlePlay = () => {
      console.log('▶️ Playing');
      setIsPlaying(true);
    };

    const handlePause = () => {
      console.log('⏸️ Paused');
      setIsPlaying(false);
    };

    const handleError = () => {
      console.error('❌ Audio error:', (audio as any).error?.message);
      setShowHint(true);
    };

    audio.addEventListener('play', handlePlay);
    audio.addEventListener('pause', handlePause);
    audio.addEventListener('error', handleError);

    return () => {
      audio.removeEventListener('play', handlePlay);
      audio.removeEventListener('pause', handlePause);
      audio.removeEventListener('error', handleError);
    };
  }, []);

  // Initialize audio and attempt autoplay
  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;

    audio.loop = true;
    audio.volume = 0.5;
    audio.preload = 'auto';

    console.log('🎵 Audio component initialized, src:', src);

    // Try to play automatically after a short delay
    // Don't wait for canplay - just attempt autoplay directly
    const timeoutId = setTimeout(() => {
      if (!hasTriedAutoplay.current) {
        hasTriedAutoplay.current = true;
        console.log('🎬 Triggering autoplay...');
        playAudio();
      }
    }, 2000);

    return () => clearTimeout(timeoutId);
  }, []);

  // Handle user interaction when hint is shown
  useEffect(() => {
    if (!showHint) return;

    console.log('👆 Listening for user interaction...');

    const handleInteraction = () => {
      console.log('👆 User interacted - playing audio');
      playAudio();
    };

    // Use capture phase to catch interactions early
    document.addEventListener('click', handleInteraction, { once: true, capture: true });
    document.addEventListener('touchstart', handleInteraction, { once: true, capture: true });

    return () => {
      document.removeEventListener('click', handleInteraction, true);
      document.removeEventListener('touchstart', handleInteraction, true);
    };
  }, [showHint]);

  const togglePlayPause = () => {
    if (!audioRef.current) return;

    if (isPlaying) {
      audioRef.current.pause();
    } else {
      playAudio();
    }
  };

  return (
    <>
      <audio 
        ref={audioRef} 
        src={src} 
        loop 
        crossOrigin="anonymous"
        preload="auto"

      />

      <div className={styles.player} aria-live="polite">
        {/* Hint for user interaction */}
        {showHint && (
          <div className={styles.hint} role="status">
            <FaMusic className={styles.hintIcon} />
            <span>Tap to play music</span>
          </div>
        )}

        {/* Play/Pause button */}
        <button
          className={styles.toggle}
          onClick={togglePlayPause}
          aria-pressed={isPlaying}
          aria-label={isPlaying ? 'Pause audio' : 'Play audio'}
          title={isPlaying ? 'Pause' : 'Play'}
        >
          {isPlaying ? <FaPause /> : <FaPlay />}
        </button>
      </div>
    </>
  );
};

export default AudioPlayer;
