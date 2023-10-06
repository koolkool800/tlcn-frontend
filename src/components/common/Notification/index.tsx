import { CONFIG } from '@constants/codeConstants';
import { ROUTE_USER } from '@constants/routes';
import { useAppDispatch } from '@hooks/useAppDispatch';
import { useAppSelector } from '@hooks/useAppSelector';
import useAuth from '@hooks/useAuth';
import {
  setNotification,
  setNotifications,
  setTotalNotification,
} from '@redux/reducer/notificationsReducer';
import { RootState } from '@redux/store';
import userService from '@services/userService';
import { H6 } from '@style/DefaultStyled';
import theme from '@style/themes/default';
import { Badge, Dropdown } from 'antd';
import { NotificationBing, Ticket } from 'iconsax-react';
import { NotificationDataType } from 'interface/user';
import { memo, useCallback, useEffect, useMemo } from 'react';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';
import { io } from 'socket.io-client';
import CustomLink from '../CustomLink';
import * as S from './style';

const Notification = () => {
  const { t } = useTranslation();
  const auth = useAuth();
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const notificationStore = useAppSelector(
    (state: RootState) => state.notificationsReducer
  );
  const { notificationList } = notificationStore;

  const notifications = useMemo(() => {
    const clonedArray = [...notificationList];

    const transformData = clonedArray.sort((a, b) => {
      if (a.isRead === b.isRead) {
        return 0;
      }
      if (a.isRead) {
        return 1;
      }
      return -1;
    });

    const newData =
      transformData.length > 5 ? transformData.slice(0, 5) : transformData;

    return newData;
  }, [notificationStore]);

  const fetchNotifications = async () => {
    const response = await userService.getNotificationList();
    const dataNotification = response.data.data;
    let badgeNotifications = 0;
    dataNotification.forEach((item) => {
      if (!item.isRead) {
        badgeNotifications += 1;
      }
    });
    dispatch(setNotifications(dataNotification));
    dispatch(setTotalNotification(badgeNotifications));
  };

  useEffect(() => {
    fetchNotifications();
  }, []);

  useEffect(() => {
    const token = auth && auth.accessToken;
    const socket = io(`${CONFIG.API_URL}/notifications`, {
      extraHeaders: {
        Authorization: `Bearer ${token}`,
      },
    });

    socket.on('notification', (data) => {
      if (data) {
        // const newData = data.notification;
        // const numberNotification = data?.statistics?.numOfUnreadNotis;
        // dispatch(setNotification(newData));
        // dispatch(setTotalNotification(numberNotification));

        fetchNotifications();
      }
    });

    return () => {
      socket.disconnect();
    };
  }, [auth.accessToken]);

  const onGoToDetail = (item: NotificationDataType) =>
    navigate(ROUTE_USER.NOTIFICATION_DETAIL(String(item?.id)));

  const renderNotifications = useCallback(() => {
    return (
      <S.Layout>
        <H6>{t('user.notification')}</H6>

        {notifications.length > 0 ? (
          notifications.map((item) => (
            <S.Item key={item?.id} className={item?.isRead ? 'isRead' : ''}>
              <S.IconTicket>
                <Ticket size="24" />
              </S.IconTicket>
              <S.Line />
              <S.ItemMeta onClick={() => onGoToDetail(item)}>
                <div>{`${item?.title}`}</div>
              </S.ItemMeta>
              {!item?.isRead && <S.IsRead />}
            </S.Item>
          ))
        ) : (
          <S.Item>{t('user.noAnnouncementYet')}</S.Item>
        )}

        {notificationStore.notificationList.length > 5 && (
          <CustomLink to={ROUTE_USER.USER_NOTIFICATION}>
            <S.Item>{t('user.seeAll')}</S.Item>
          </CustomLink>
        )}
      </S.Layout>
    );
  }, [notificationStore]);

  return (
    <Dropdown
      placement="bottom"
      dropdownRender={(node) => renderNotifications()}
    >
      <Badge
        count={notificationStore.numberNotifications}
        style={{ backgroundColor: theme.colors.emphasisLightHigh }}
      >
        <S.Wrapper>
          <NotificationBing size="20" />
        </S.Wrapper>
      </Badge>
    </Dropdown>
  );
};

export default memo(Notification);
