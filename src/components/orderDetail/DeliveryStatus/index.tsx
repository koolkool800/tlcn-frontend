import { DELIVERY_METHOD, OrderStatus } from '@constants/codeConstants';
import { H6 } from '@style/DefaultStyled';
import { useTranslation } from 'react-i18next';
import DeliveryProgressBar from '../DeliveryProgressBar';
import * as S from './style';

type DeliveryStatusPropsType = {
  deliveryMethod: string;
  deliveryStatus: string;
};
const DeliveryStatus = ({
  deliveryMethod,
  deliveryStatus,
}: DeliveryStatusPropsType) => {
  const { t } = useTranslation();
  const SELLER_DELIVERY_STATUS = [
    {
      title: OrderStatus.SENT_DELIVERY_UNIT,
    },
    {
      title: OrderStatus.DELIVERY_UNIT_RECEIVED,
    },
    {
      title: OrderStatus.DELIVERY_UNIT_COMPLETED_CHECKING,
    },
    {
      title: OrderStatus.DELIVERY_COMPLETED,
    },
  ];

  const PIN_DELIVERY_STATUS = [
    {
      title: OrderStatus.PAYMENT_COMPLETED,
    },
    {
      title: OrderStatus.SENT_PIN,
    },
    {
      title: OrderStatus.PIN_RECEIVED,
    },
  ];
  return (
    <S.DeliveryStatusContainer>
      <H6>{t('user.order.delivery.deliveryStatus')}</H6>
      {deliveryMethod === DELIVERY_METHOD.SELLER_SHIPMENT && (
        <DeliveryProgressBar
          steps={SELLER_DELIVERY_STATUS}
          currentStepTitle={deliveryStatus}
        />
      )}

      {deliveryMethod === DELIVERY_METHOD.PIN_TRANSACTION && (
        <DeliveryProgressBar
          steps={PIN_DELIVERY_STATUS}
          currentStepTitle={deliveryStatus}
        />
      )}
    </S.DeliveryStatusContainer>
  );
};

export default DeliveryStatus;
