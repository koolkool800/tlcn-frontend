import logo from '@assets/images/logo.png';
import { ROUTES } from '@constants/routes';
import { useLocation, useNavigate } from 'react-router-dom';
import Button from '../Button';
import CustomLink from '../CustomLink';
import * as S from './style';
import LanguageDropDown from '../LanguageDropdown';

const HeaderAuth = () => {
  const location = useLocation();
  const navigate = useNavigate();

  return (
    <S.Navbar>
      <div className="left">
        <CustomLink to={ROUTES.ALL}>
          <img src={logo} alt={logo} />
        </CustomLink>
      </div>
      <div className="right">
        <LanguageDropDown />
        {location.pathname !== ROUTES.LOGIN && (
          <Button
            onClick={() => {
              navigate(ROUTES.LOGIN);
            }}
            className="btn-login"
          >
            Login
          </Button>
        )}
      </div>
    </S.Navbar>
  );
};

export default HeaderAuth;
