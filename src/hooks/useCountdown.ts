import { useState, useEffect, useRef } from 'react';
import { calculateTimeLeft, type TimeLeft } from '@utils/helpers';

export const useCountdown = (targetDate: Date) => {
  const [timeLeft, setTimeLeft] = useState<TimeLeft>(
    calculateTimeLeft(targetDate)
  );
  const [prevTimeLeft, setPrevTimeLeft] = useState<TimeLeft>(
    calculateTimeLeft(targetDate)
  );
  const intervalRef = useRef<ReturnType<typeof setInterval>>(undefined);

  useEffect(() => {
    intervalRef.current = setInterval(() => {
      setPrevTimeLeft(timeLeft);
      setTimeLeft(calculateTimeLeft(targetDate));
    }, 1000);

    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current);
    };
  }, [targetDate, timeLeft]);

  return { timeLeft, prevTimeLeft };
};
