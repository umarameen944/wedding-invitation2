import { useScrollProgress } from '@hooks/useScrollProgress';
import styles from './ScrollProgress.module.css';

const ScrollProgress = () => {
  const progress = useScrollProgress();

  return (
    <div className={styles.track} aria-hidden="true" role="presentation">
      <div
        className={styles.bar}
        style={{ transform: `scaleX(${progress})` }}
      />
    </div>
  );
};

export default ScrollProgress;
