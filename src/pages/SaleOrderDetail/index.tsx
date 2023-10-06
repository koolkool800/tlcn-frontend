import CustomLink from '@components/common/CustomLink';
import DeliveryInformation from '@components/orderDetail/DeliveryInformation';
import DeliveryStatus from '@components/orderDetail/DeliveryStatus';
import { BtnEdit } from '@components/user/MainMyPage/MyInformation/style';
import { ROUTE_USER } from '@constants/routes';
import orderService from '@services/orderService';
import { H5, H6, Typography } from '@style/DefaultStyled';
import theme from '@style/themes/default';
import { currencyFormat } from '@utils/currency';
import { dateTimeFormatString } from '@utils/format';
import { formatSeatPosition } from '@utils/formatSeatPosition';
import { message } from 'antd';
import { AxiosError } from 'axios';
import dayjs from 'dayjs';
import { ArrowLeft2, Calendar } from 'iconsax-react';
import { OrderDetailType } from 'interface/order';
import { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useNavigate, useParams } from 'react-router-dom';
import * as S from './styles';

const SaleOrderDetail = () => {
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
        navigate(ROUTE_USER.USER_MY_TICKET_SALES);
      }
    } else {
      navigate(ROUTE_USER.USER_MY_TICKET_SALES);
    }
  };

  useEffect(() => {
    loadOrder();
  }, []);

  return (
    <S.OrderDetailContainer>
      <CustomLink to={ROUTE_USER.USER_MY_TICKET_SALES}>
        <BtnEdit>
          <ArrowLeft2 size="16" />
          {t('user.myTicketSales')}
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
            {t('user.order.orderDate')}
            {dayjs(orderDetail?.createdAt).format('DD.MM.YYYY')}
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
                <Calendar size="20" color={theme.colors.primary500} />
                <span>
                  {t('myPurchase.useDate')}
                  {dateTimeFormatString(orderDetail?.event?.performanceDate)}
                </span>
              </p>
            </div>
            <Typography className="seat-position">
              {t('myPurchase.seatPosition')}
              {formatSeatPosition({
                group: orderDetail?.ticket?.insideTicket?.group?.name,
                section: orderDetail?.ticket?.insideTicket?.section?.name,
                floor: orderDetail?.ticket?.insideTicket?.floor?.name,
                row: orderDetail?.ticket?.insideTicket?.row?.name,
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
                <span>KRW: {currencyFormat(orderDetail?.totalPrice || 0)}</span>
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
          deliveryInfo={orderDetail?.deliveryUnitSellerToResellInfor}
        />
      </div>
    </S.OrderDetailContainer>
  );
};

export default SaleOrderDetail;
