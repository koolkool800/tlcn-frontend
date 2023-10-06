/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable jsx-a11y/no-static-element-interactions */
import { ArrowLeft2 } from 'iconsax-react';
import { useTheme } from 'styled-components';
import SearchBarWithDropdown from '../SearchBarWithDropdown';
import * as S from './style';

type Props = {
  open: boolean;
  onClose: () => void;
};

const DrawerSearch = ({ open = false, onClose }: Props) => {
  const theme = useTheme();
  return (
    <S.DrawerContainer className={`${open && 'open'}`}>
      <div className="overlay" onClick={() => onClose()} />
      <div className="content">
        <ArrowLeft2
          onClick={onClose}
          size="24"
          color={theme.colors.surfaceHight}
        />
        <SearchBarWithDropdown isFocusInput={open} onClose={onClose} />
      </div>
    </S.DrawerContainer>
  );
};

export default DrawerSearch;
