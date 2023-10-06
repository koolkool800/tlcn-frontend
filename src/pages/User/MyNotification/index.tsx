import { ROUTE_USER } from '@constants/routes';
import { useAppSelector } from '@hooks/useAppSelector';
import useDimensions from '@hooks/useDimensions';
import { RootState } from '@redux/store';
import { H5, NoContent } from '@style/DefaultStyled';
import dayjs from 'dayjs';
import { NotificationDataType } from 'interface/user';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';
import NotificationMobile from './NotificationMobile';
import * as S from './style';

const MyNotification = () => {
  const { isMobile } = useDimensions();
  const { t } = useTranslation();
  const navigate = useNavigate();
  const notificationStore = useAppSelector(
    (state: RootState) => state.notificationsReducer
  );

  const onGoToDetail = (item: NotificationDataType) => {
    navigate(ROUTE_USER.NOTIFICATION_DETAIL(String(item.id)));
  };

  return (
    <S.Container>
      <H5>{t('user.notification')}</H5>

      {notificationStore?.notificationList?.length > 0 ? (
        <div>
          {isMobile ? (
            <NotificationMobile data={notificationStore.notificationList} />
          ) : (
            <>
              <S.Header>
                <S.ItemMeta>
                  <div className="meta-date">{t('user.receiveTime')}</div>
                  <div className="meta-title">{t('user.title')}</div>
                </S.ItemMeta>
              </S.Header>
              <div
                id="scrollableDiv"
                style={{
                  height: 500,
                  overflow: 'auto',
                }}
              >
                {notificationStore.notificationList?.map((item) => (
                  <S.Item
                    key={item.id}
                    className={item.isRead ? 'isRead' : ''}
                    onClick={() => onGoToDetail(item)}
                  >
                    <S.ItemMeta>
                      <div className="meta-date">
                        <div>{dayjs(item.createdAt).format('DD.MM.YYYY')}</div>
                        {/* <div>{dayjs(item.createdAt).format('hh:mm:ss')}</div> */}
                      </div>
                      <div className="meta-title">{`${item?.title}`}</div>
                    </S.ItemMeta>
                    {!item.isRead && <S.IsRead />}
                  </S.Item>
                ))}
              </div>
            </>
          )}
        </div>
      ) : (
        <NoContent>{t('user.noNotification')}</NoContent>
      )}
    </S.Container>
  );
};

export default MyNotification;
