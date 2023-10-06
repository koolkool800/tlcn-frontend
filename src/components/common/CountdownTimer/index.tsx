import { Typography } from '@style/DefaultStyled';
import React, { useState, useEffect } from 'react';

type CountDownProps = {
  timer: number;
  onDone?: () => void;
};
function CountdownTimer({ timer, onDone }: CountDownProps) {
  const [remainingTime, setRemainingTime] = useState(timer);

  useEffect(() => {
    const countdownInterval = setInterval(() => {
      if (remainingTime <= 0) {
        clearInterval(countdownInterval);
      } else {
        setRemainingTime((prevRemainingTime) => prevRemainingTime - 1);
      }
    }, 1000);

    return () => {
      clearInterval(countdownInterval);
    };
  }, [remainingTime]);

  useEffect(() => {
    if (remainingTime <= 0) {
      if (onDone) {
        onDone();
      }
    }
  }, [remainingTime]);

  const formatTime = (timeInSeconds: number) => {
    const minutes = Math.floor(timeInSeconds / 60);
    const seconds = timeInSeconds % 60;
    return `${minutes}:${seconds < 10 ? '0' : ''}${seconds}`;
  };

  return <Typography>{formatTime(remainingTime)}</Typography>;
}

export default CountdownTimer;
