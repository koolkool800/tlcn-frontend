import logo from '@assets/images/logo.png';
import { ROUTES } from '@constants/routes';
import useAuth from '@hooks/useAuth';
import { Grid } from 'antd';
import { SearchNormal1 } from 'iconsax-react';
import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';
import Button from '../Button';
import CustomLink from '../CustomLink';
import DrawerSearch from '../DrawerSearch';
import LanguageDropDown from '../LanguageDropdown';
import Notification from '../Notification';
import SearchBarWithDropdown from '../SearchBarWithDropdown';
import UserInfo from '../UserInfo';
import * as S from './style';

const HeaderTop = () => {
  const auth = useAuth();
  const [openDrawerSearch, setOpenDrawerSearch] = useState(false);
  const navigate = useNavigate();
  const { t } = useTranslation();
  const { xs } = Grid.useBreakpoint();

  return (
    <S.Navbar className="navbar">
      {xs && (
        <DrawerSearch
          open={openDrawerSearch}
          onClose={() => setOpenDrawerSearch(false)}
        />
      )}
      <div className="left">
        <CustomLink to={ROUTES.ALL}>
          <img src={logo} alt={logo} />
        </CustomLink>
        <span>
          {xs ? (
            <Button
              onClick={() => {
                setOpenDrawerSearch(true);
              }}
              className="btn-search-xs"
            >
              <SearchNormal1 size="20" color="#FFFFFF" />
            </Button>
          ) : (
            <SearchBarWithDropdown />
          )}
        </span>
      </div>
      <div className="right">
        {auth.accessToken ? (
          <S.Wrapper>
            {/* <Notification />
            {!xs && <LanguageDropDown />} */}
            <UserInfo />
          </S.Wrapper>
        ) : (
          <>
            <S.Wrapper>
              {/* {!xs && <LanguageDropDown />} */}
              <Button
                onClick={() => {
                  navigate(ROUTES.LOGIN);
                }}
              >
                {t('home.login')}
              </Button>
            </S.Wrapper>
          </>
        )}
      </div>
    </S.Navbar>
  );
};

export default HeaderTop;
