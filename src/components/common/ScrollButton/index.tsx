import theme from '@style/themes/default';
import { ArrowUp3 } from 'iconsax-react';
import { useState } from 'react';
import * as S from './styled';

const ScrollButton = () => {
  const [visible, setVisible] = useState(false);

  const toggleVisible = () => {
    const scrolled = document.documentElement.scrollTop;

    if (scrolled > 300) {
      setVisible(true);
    } else if (scrolled <= 300) {
      setVisible(false);
    }
  };

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
      /* you can also use 'auto' behavior
         in place of 'smooth' */
    });
  };

  window.addEventListener('scroll', toggleVisible);

  return (
    <S.BtnBackToTop>
      <ArrowUp3
        size="40"
        color={theme.colors.primary500}
        style={{ display: visible ? 'inline' : 'none' }}
        onClick={scrollToTop}
      />
    </S.BtnBackToTop>
  );
};

export default ScrollButton;
