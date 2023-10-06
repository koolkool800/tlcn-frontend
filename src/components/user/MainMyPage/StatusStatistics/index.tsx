import { ROUTE_USER } from '@constants/routes';
import userService from '@services/userService';
import { H5, Typography } from '@style/DefaultStyled';
import { StatusStatisticsType } from 'interface/user';
import { useEffect, useMemo, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';
import * as S from './style';

type Props = {
  type: 'order' | 'purchase';
};

const StatusStatistics = ({ type }: Props) => {
  const { t } = useTranslation();
  const [status, setStatus] = useState<StatusStatisticsType[]>([]);
  const navigate = useNavigate();
  const fetchPurchaseStatus = async () => {
    try {
      switch (type) {
        case 'order': {
          const order = await userService.getOrderStatusStatistics();
          setStatus(order?.data || []);
          break;
        }
        case 'purchase': {
          const purchase = await userService.getPurchaseStatusStatistics();
          setStatus(purchase?.data || []);
          break;
        }
        default:
          break;
      }
    } catch (err) {
      /* empty */
    }
  };

  useEffect(() => {
    fetchPurchaseStatus();
  }, []);

  const title = useMemo(() => {
    switch (type) {
      case 'order':
        return t('user.saleOrder');
      case 'purchase': {
        return t('user.purchaseOrder');
      }
      default:
        break;
    }
    return null;
  }, [type, t]);

  return (
    <S.Wrapper style={{ marginBottom: 14 }}>
      <S.FlexBetween>
        <Typography>{title}</Typography>
        <S.TextDetail
          onClick={() => {
            switch (type) {
              case 'order': {
                navigate(ROUTE_USER.USER_MY_TICKET_SALES);
                break;
              }
              case 'purchase': {
                navigate(ROUTE_USER.USER_MY_PURCHASES);
                break;
              }
              default:
                break;
            }
          }}
        >
          {t('user.viewDetail')}
        </S.TextDetail>
      </S.FlexBetween>
      <S.Flex>
        {status.map((item: StatusStatisticsType) => (
          <S.ItemTicket key={item.status}>
            <span>{t(`HTTP_STATUS.${item.status}`)}</span>
            <H5>{item.count}</H5>
          </S.ItemTicket>
        ))}
      </S.Flex>
    </S.Wrapper>
  );
};

export default StatusStatistics;
