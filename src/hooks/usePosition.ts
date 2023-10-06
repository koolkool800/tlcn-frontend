import { useState, useEffect } from 'react';

const useScroll = (): number => {
  const [scrollPosition, setScrollPosition] = useState(0);

  useEffect(() => {
    const updateScroll = () => {
      setScrollPosition(window.pageYOffset);
    };
    window.addEventListener('scroll', updateScroll);
    return () => {
      window.removeEventListener('scroll', updateScroll);
    };
  }, [scrollPosition]);

  return scrollPosition;
};

export default useScroll;
