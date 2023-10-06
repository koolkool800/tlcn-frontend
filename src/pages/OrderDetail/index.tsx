/* eslint-disable import/no-extraneous-dependencies */
import CustomLink from '@components/common/CustomLink';
import DeliveryInformation from '@components/orderDetail/DeliveryInformation';
import DeliveryStatus from '@components/orderDetail/DeliveryStatus';
import { BtnEdit } from '@components/user/MainMyPage/MyInformation/style';
import { OrderStatus } from '@constants/codeConstants';
import { ROUTE_USER } from '@constants/routes';
import orderService from '@services/orderService';
import { H5, H6, Typography } from '@style/DefaultStyled';
import theme from '@style/themes/default';
import { dateTimeFormatString } from '@utils/format';
import { formatNumberWithCommas } from '@utils/formatNumberWithCommas';
import { formatSeatPosition } from '@utils/formatSeatPosition';
import { Grid, message } from 'antd';
import { AxiosError } from 'axios';
import dayjs from 'dayjs';
import { ArrowLeft2, Calendar } from 'iconsax-react';
import { OrderDetailType } from 'interface/order';
import { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useNavigate, useParams } from 'react-router-dom';
import * as S from './styles';

const OrderDetail = () => {
  const { xs } = Grid.useBreakpoint();
  const { t } = useTranslation();
  const navigate = useNavigate();
  const { id } = useParams<{ id: string }>();
  const [orderDetail, setOrderDetail] = useState<OrderDetailType>();
  const loadOrder = async () => {
    if (id) {
      try {
        const response = await orderService.getOrderDetail(id);
        setOrderDetail(response.data);
      } catch (error) {
        message.info((error as AxiosError)?.message);
        navigate(ROUTE_USER.USER_MY_PURCHASES);
      }
    } else {
      navigate(ROUTE_USER.USER_MY_PURCHASES);
    }
  };

  useEffect(() => {
    loadOrder();
  }, []);

  return (
    <S.OrderDetailContainer>
      <CustomLink to={ROUTE_USER.USER_MY_PURCHASES}>
        <BtnEdit>
          <ArrowLeft2 size="16" />
          {t('user.myPurchase')}
        </BtnEdit>
      </CustomLink>
      <H5>{t('user.orderDetail')}</H5>
      <div className="information-wrap">
        <div className="order">
          <H6 className="order-number">
            {t('user.order.orderNumber')}
            {id}
          </H6>
          <H6 className="order-date">
            {orderDetail?.status === OrderStatus.TRANSACTION_COMPLETED ||
            orderDetail?.status === OrderStatus.PAYMENT_COMPLETED
              ? t('user.order.orderDate')
              : t('user.order.registrationDate')}
            {dayjs(orderDetail?.createdAt).format('YYYY.MM.DD')}
          </H6>
        </div>
        <div className="order-info-details">
          <div className="img-wrap">
            <img
              src={orderDetail?.event?.coverImage}
              alt={orderDetail?.event?.title}
            />
          </div>
          <div className="details">
            <Typography className="author">
              {orderDetail?.event?.performer}
            </Typography>
            <H5 className="title">{orderDetail?.event?.title}</H5>
            <Typography className="stadium">
              {orderDetail?.event?.place}
            </Typography>
            <div className="showTime">
              <p>
                {!xs && <Calendar size="20" color={theme.colors.primary500} />}
                <span>
                  {t('myPurchase.useDate')}
                  {dateTimeFormatString(orderDetail?.event?.performanceDate)}
                </span>
              </p>
            </div>
            <Typography className="seat-position">
              {t('myPurchase.seatPosition')}
              {formatSeatPosition({
                group: orderDetail?.ticket.group?.name,
                section: orderDetail?.ticket.section?.name,
                floor: orderDetail?.ticket.floor?.name,
                row: orderDetail?.ticket.row?.name,
                seats: orderDetail?.ticket?.seats.map(
                  (seat: any) => seat.information
                ),
              })}
            </Typography>

            <div className="quantity">
              <Typography>
                {t('myPurchase.quantity')}
                <span>{orderDetail?.ticket?.seatQuantity}</span>
              </Typography>
              <Typography>
                <span>
                  KRW: {formatNumberWithCommas(orderDetail?.totalPrice)}
                </span>
              </Typography>
            </div>
          </div>
        </div>
      </div>
      <div className="delivery-wrap">
        <DeliveryStatus
          deliveryMethod={orderDetail?.deliveryMethod || ''}
          deliveryStatus={orderDetail?.status || ''}
        />
      </div>
      <div className="delivery-information">
        <DeliveryInformation
          orderBill={{
            orderTotal: orderDetail?.totalPayment || 0,
            deliveryFee: orderDetail?.deliveryFee || 0,
            platformFee: orderDetail?.platformFee || 0,
            deliveryMethod: orderDetail?.deliveryMethod || '',
            totalDiscount: orderDetail?.totalDiscount || 0,
            productPrice: orderDetail?.totalPrice || 0,
          }}
          deliveryInfo={orderDetail?.deliveryUnitResellToBuyer}
        />
      </div>
    </S.OrderDetailContainer>
  );
};

export default OrderDetail;
