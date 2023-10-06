import { H6 } from '@style/DefaultStyled';
import { currencyFormat } from '@utils/currency';
import { DeliveryUnit } from 'interface/order';
import { useTranslation } from 'react-i18next';
import LineSVG from '../LineSVG';
import * as S from './styles';

type DeliveryInfoProp = {
  deliveryInfo?: DeliveryUnit | null;
  orderBill: {
    orderTotal: number;
    productPrice: number;
    platformFee: number;
    deliveryFee: number;
    totalDiscount: number;
    deliveryMethod: string;
  };
};
const DeliveryInformation = ({ orderBill, deliveryInfo }: DeliveryInfoProp) => {
  const { t } = useTranslation();
  const {
    deliveryFee,
    deliveryMethod,
    orderTotal,
    platformFee,
    productPrice,
    totalDiscount,
  } = orderBill;
  return (
    <S.DeliveryInfoContainer>
      {deliveryInfo && (
        <div>
          <H6>{t('user.order.delivery.deliveryInfo')}</H6>
          <H6 className="text">
            {deliveryInfo.unitName} | {deliveryInfo.deliveryCode}
          </H6>
        </div>
      )}
      <div className="row">
        <H6>{t('user.order.delivery.orderTotal')}</H6>
        <H6 className=" total">KRW {currencyFormat(orderTotal || 0)}</H6>
      </div>
      <LineSVG />
      <div className="row">
        <H6>{t('user.order.delivery.productPrice')}</H6>
        <H6 className=" ">KRW {currencyFormat(productPrice || 0)}</H6>
      </div>
      <LineSVG />
      <div className="row">
        <H6>{t('user.order.delivery.platformFee')}</H6>
        <H6 className=" ">KRW {currencyFormat(platformFee || 0)}</H6>
      </div>
      <LineSVG />
      <div className="row">
        <H6>{t('user.order.delivery.deliveryFee')}</H6>
        <H6 className=" ">KRW {currencyFormat(deliveryFee || 0)}</H6>
      </div>
      <LineSVG />
      <div className="row">
        <H6>{t('user.order.delivery.totalDiscount')}</H6>
        <H6 className=" ">KRW {currencyFormat(totalDiscount || 0)}</H6>
      </div>
      <LineSVG />
      <div className="row">
        <H6>{t('user.order.delivery.deliveryMethod')}</H6>
        <H6 className=" method">
          {t(`user.order.delivery.${deliveryMethod}`)}
        </H6>
      </div>
    </S.DeliveryInfoContainer>
  );
};

export default DeliveryInformation;
