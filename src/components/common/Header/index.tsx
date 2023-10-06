import MyNavigate from '@components/home/MyNavigate';
import { useLocation } from 'react-router-dom';
import HeaderTop from '../HeaderTop';
import * as S from './style';

const Header = ({ visible }: { visible: boolean }) => {
  const location = useLocation();
  const cls = visible ? 'visible' : 'hidden';

  return (
    <S.Header
      className={`${location.pathname === '/' ? 'home' : 'visible'} ${cls}`}
    >
      <HeaderTop />
      <MyNavigate />
    </S.Header>
  );
};

export default Header;
