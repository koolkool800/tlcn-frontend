import { EVENT_TYPE, TITLE_MENU } from '@constants/codeConstants';
import { ROUTES } from '@constants/routes';
import { useAppSelector } from '@hooks/useAppSelector';
import useParam from '@hooks/useParam';
import useScroll from '@hooks/usePosition';
import { RootState } from '@redux/store';
import { Grid } from 'antd';
import queryString from 'query-string';
import { useCallback } from 'react';
import { useTranslation } from 'react-i18next';
import { useLocation } from 'react-router-dom';
import CustomLink from '../../common/CustomLink';
import * as S from './style';

type ListMenuProps = {
  path: string;
  title: string;
  eventTypes?: string;
  navCateId?: string;
};

const MyNavigate = () => {
  const { xs } = Grid.useBreakpoint();

  const params = useParam();
  const scrollPosition: number = useScroll();
  const location = useLocation();
  const { t } = useTranslation();
  const { eventCategory } = useAppSelector(
    (state: RootState) => state.navigationReducer
  );
  const isActive = useCallback(
    (menuItem: ListMenuProps) => {
      // check active not event page
      if (
        (location.pathname === ROUTES.ALL && menuItem.path === ROUTES.ALL) ||
        (location.pathname === ROUTES.CLEARANCE &&
          menuItem.path === ROUTES.CLEARANCE)
      ) {
        return true;
      }

      // check active for event page
      return (
        String(menuItem.title).toLocaleLowerCase() ===
          String(params?.title).toLocaleLowerCase() &&
        menuItem.path === location.pathname
      );
    },
    [params, location]
  );

  const renderPath = (menuItem: ListMenuProps) => {
    if (menuItem?.eventTypes || menuItem?.navCateId) {
      return `${menuItem.path}?${queryString.stringify({
        eventTypes: menuItem.eventTypes,
        title: menuItem?.navCateId
          ? menuItem.title
          : t(`home.${menuItem.title}`),
        navCateId: menuItem?.navCateId,
      })}`;
    }

    return menuItem.path;
  };

  const indexTopNavigate = eventCategory
    ? eventCategory.findIndex((category) => category.inTopBar)
    : -1;
  const listMenu: ListMenuProps[] =
    indexTopNavigate !== -1 && eventCategory
      ? [
          {
            path: ROUTES.ALL,
            title: TITLE_MENU.All,
          },
          {
            path: ROUTES.EVENT_PAGES,
            title: eventCategory[indexTopNavigate].name,
            eventTypes: String(eventCategory[indexTopNavigate].id),
            navCateId: String(eventCategory[indexTopNavigate].id),
          },
          {
            path: ROUTES.EVENT_PAGES,
            title: TITLE_MENU.CONCERT,
            eventTypes: EVENT_TYPE.CONCERT,
          },
          {
            path: ROUTES.EVENT_PAGES,
            title: TITLE_MENU.ART_GALLERY,
            eventTypes: EVENT_TYPE.ART_GALLERY,
          },
          {
            path: ROUTES.EVENT_PAGES,
            title: TITLE_MENU.SPORT,
            eventTypes: EVENT_TYPE.SPORT,
          },
          {
            path: ROUTES.EVENT_PAGES,
            title: TITLE_MENU.MUSICAL,
            eventTypes: EVENT_TYPE.MUSICAL,
          },
          {
            path: ROUTES.CLEARANCE,
            title: TITLE_MENU.CLEARANCE,
          },
        ]
      : [
          {
            path: ROUTES.ALL,
            title: TITLE_MENU.All,
          },
          {
            path: ROUTES.EVENT_PAGES,
            title: TITLE_MENU.CONCERT,
            eventTypes: EVENT_TYPE.CONCERT,
          },
          {
            path: ROUTES.EVENT_PAGES,
            title: TITLE_MENU.ART_GALLERY,
            eventTypes: EVENT_TYPE.ART_GALLERY,
          },
          {
            path: ROUTES.EVENT_PAGES,
            title: TITLE_MENU.SPORT,
            eventTypes: EVENT_TYPE.SPORT,
          },
          {
            path: ROUTES.EVENT_PAGES,
            title: TITLE_MENU.OTHER,
            eventTypes: EVENT_TYPE.OTHER,
          },
          {
            path: ROUTES.CLEARANCE,
            title: TITLE_MENU.CLEARANCE,
          },
        ];

  return (
    <S.Tabs
      className={
        scrollPosition > 20 || location.pathname !== '/'
          ? `background-tranparent`
          : ''
      }
    >
      {listMenu.map((menu: ListMenuProps) => {
        return (
          <CustomLink
            key={menu.title}
            to={renderPath(menu)}
            style={{ paddingLeft: 20, paddingRight: 20 }}
          >
            <S.ActiveTab className={isActive(menu) ? 'active' : ''}>
              {menu.navCateId ? menu.title : t(`home.${menu.title}`)}
            </S.ActiveTab>
          </CustomLink>
        );
      })}
    </S.Tabs>
  );
};

export default MyNavigate;
