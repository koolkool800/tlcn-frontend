import { useAppDispatch } from '@hooks/useAppDispatch';
import useAuth from '@hooks/useAuth';
import { resetState } from '@redux/reducer/authReducer';
import { avatarGenerator } from '@utils/avatarGenerator';
import { Dropdown, MenuProps } from 'antd';
import { ArrowRight2 } from 'iconsax-react';
import { memo } from 'react';
import { useTranslation } from 'react-i18next';
import { ROUTES, ROUTE_USER } from '../../../constants/routes';
import { TAB_MY_PAGE } from '../../user/MainMyPage/MyPage';
import * as S from './style';

const menuItems = [
  { title: 'user.myPage', key: 'my-page', route: ROUTE_USER.USER_MY_PAGE },
  {
    title: 'user.changePassword',
    key: 'change-password',
    route: ROUTE_USER.USER_MY_PAGE,
    state: TAB_MY_PAGE.PASSWORD,
  },
  { title: 'FAQ', key: 'faq', route: ROUTE_USER.USER_FAQ, state: '' },
  {
    title: 'user.inquiry',
    key: '1:1-inquiry',
    route: ROUTE_USER.USER_INQUIRY,
    state: '',
  },
  { title: 'user.logout', key: 'log-out', route: ROUTES.LOGIN, state: '' },
];

const UserInfo = () => {
  const { t } = useTranslation();
  const dispatch = useAppDispatch();
  const auth = useAuth();
  const items: MenuProps['items'] = menuItems.map((item) => ({
    label: (
      <S.NavLinkMenu
        to={item.route}
        state={{
          tabMyPage: item.state,
        }}
        onClick={() => item.key === 'log-out' && dispatch(resetState())}
      >
        {t(item.title)}
        <ArrowRight2 size="12" />
      </S.NavLinkMenu>
    ),
    key: item.key,
  }));

  return (
    <Dropdown
      placement="bottomRight"
      menu={{ items }}
      dropdownRender={(node) => (
        <S.DropdownContainer>{node}</S.DropdownContainer>
      )}
    >
      <div>
        <S.Avatar color={avatarGenerator(String(auth?.name || ''))}>
          <div>{auth?.name?.charAt(0)}</div>
        </S.Avatar>
      </div>
    </Dropdown>
  );
};

export default memo(UserInfo);
