import { ROUTE_USER } from '@constants/routes';
import { Spin } from 'antd';
import dayjs from 'dayjs';
import { NotificationDataType } from 'interface/user';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';
import * as S from './style';

type Props = {
  data: NotificationDataType[];
  loading?: boolean;
};

const NotificationMobile = (props: Props) => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const { data, loading = false } = props;
  return (
    <Spin spinning={loading}>
      <S.WrapperMobile>
        {data?.map((item) => (
          <S.WrapperMobileItem
            key={item.id}
            onClick={() => {
              navigate(ROUTE_USER.NOTIFICATION_DETAIL(String(item.id)));
            }}
          >
            <div className="item">
              <div className="title">
                {!item.isRead && <S.IsRead />} {t('user.receiveTime')}
              </div>
              <div>{dayjs(item?.createdAt).format('YYYY.MM.DD')}</div>
            </div>
            <div className="item">
              <div>{t('user.title')}</div>
              <div>{item?.title}</div>
            </div>
          </S.WrapperMobileItem>
        ))}
      </S.WrapperMobile>
    </Spin>
  );
};

export default NotificationMobile;
