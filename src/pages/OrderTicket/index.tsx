import Breadcrumb from '@components/common/Breadcrumb';
import Modal from '@components/common/ModalConfirm';
import OrderTicketComponent from '@components/orderTicket/OrderTicketComponent';
import TotalPayment from '@components/orderTicket/TotalPayment';
import { CASH_RECEIPT_TYPE, IdQuery } from '@constants/codeConstants';
import { ROUTES, ROUTE_USER } from '@constants/routes';
import { useAppDispatch } from '@hooks/useAppDispatch';
import useDimensions from '@hooks/useDimensions';
import { setOrderPayment } from '@redux/reducer/paymentOrderReducer';
import { setDetailTicket } from '@redux/reducer/ticketReducer';
import buyTicketService, {
  CreateOrders,
  FilterOrders,
  PreConfirmOderPayment,
} from '@services/buyTicketService';
import userService from '@services/userService';
import { Container, H5 } from '@style/DefaultStyled';
import { getInfoEvent } from '@utils/helper';
import { Form, message } from 'antd';
import { useForm } from 'antd/es/form/Form';
import { ResponseListModel, ResponseModel } from 'interface';
import { FilterType } from 'interface/general';
import { TicketDetail } from 'interface/ticketInterface';
import { VoucherType } from 'interface/user';
import { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useNavigate, useParams, useLocation } from 'react-router-dom';

import * as S from './styles';

export type TicketState = {
  idTicket: string;
  deliveryMethod: 'PIN_TRANSACTION' | 'SELLER_SHIPMENT';
};

type FormValue = Omit<CreateOrders, 'ticketId' | 'deliveryMethod'> & {
  addressId: number | undefined;
  address: string | undefined;
  detailAddress: string | undefined;
  zoneCode: string | undefined;
  contact: string | undefined;
  name: string | undefined;
  phone: string | undefined;
};

function OrderTicket() {
  const { isMobile } = useDimensions();
  const { state } = useLocation();
  const navigate = useNavigate();
  const { t } = useTranslation();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [form] = useForm<FormValue>();
  const voucherIdValue = Form.useWatch('voucherId', form);
  const params: FilterType = useParams();
  const idTicket = params?.id as string;
  const methodDelivery = params?.method as string;
  const [ticketType, setTicketType] = useState('');
  // state list for coupon
  const [voucherOptions, setVoucherOptions] = useState<any>({});

  const [loading, setLoading] = useState<boolean>(false);

  const dispatch = useAppDispatch();

  const defaultValues: FormValue = {
    deliveryInfo: undefined,
    voucherId: undefined,
    cashReceiptType: CASH_RECEIPT_TYPE.PERSONAL,
    cashReceipt: undefined,

    addressId: undefined,
    address: undefined,
    detailAddress: undefined,
    zoneCode: undefined,
    contact: undefined,
    phone: undefined,
    name: undefined,
  };

  // fetch data ticket detail and voucher list
  useEffect(() => {
    if (idTicket) {
      const fetchEventData = async () => {
        try {
          // fetch detail ticket
          const responseTicketDetail: ResponseModel<TicketDetail> =
            await buyTicketService.getTicketDetail(idTicket);
          const totalPriceValue =
            responseTicketDetail.data.unitPrice *
            responseTicketDetail.data.quantity;
          const requestVoucher = {
            totalPrice: totalPriceValue,
            applySeller: 'buyer',
          };

          setTicketType(responseTicketDetail.data.ticketType);
          // fetch voucher list
          const responseVoucher: ResponseListModel<VoucherType> =
            await userService.getVoucherOrder(requestVoucher);
          // convert data option
          dispatch(setDetailTicket(responseTicketDetail.data));
          setVoucherOptions(responseVoucher);
        } catch (e) {
          // const error = e as ResponseModel<string>;
          // message.error(t(`HTTP_STATUS.${error.errorCode}`));
        }
      };
      fetchEventData();
    }
  }, [idTicket]);

  /**
   * used to get order payment
   * @param values - value form
   * @returns {Promise<void>}
   */
  const getOderPayment = async (requestParams: FilterOrders): Promise<void> => {
    try {
      const response: ResponseModel<PreConfirmOderPayment> =
        await buyTicketService.getOrderPreConfirm(requestParams);
      const dataPayment = response.data;

      dispatch(setOrderPayment(dataPayment));
    } catch (e) {
      const error = e as ResponseModel<string>;
      message.error(t(`HTTP_STATUS.${error.errorCode}`));
      navigate(-1);
    }
  };

  // used to get order payment
  useEffect(() => {
    if (idTicket || voucherIdValue) {
      const requestParams: FilterOrders = {
        ticketId: idTicket || undefined,
        deliveryMethod: methodDelivery,
        voucherId: voucherIdValue ? String(voucherIdValue) : undefined,
      };
      getOderPayment(requestParams);
    }
  }, [idTicket, voucherIdValue]);

  return (
    <Container>
      <S.OrderTicketContainer>
        {!isMobile && (
          <div className="breadcrumb-section">
            {ticketType !== 'OUTSIDE' && (
              <Breadcrumb
                items={[
                  {
                    title: t(
                      `home.${
                        getInfoEvent(state?.productDetail?.event.eventType)
                          .title
                      }`
                    ),
                    href: `${ROUTES.EVENT_PAGES}?title=${
                      getInfoEvent(state?.productDetail?.event.eventType).title
                    }&eventTypes=${state?.productDetail?.event.eventType}`,
                  },
                  {
                    title: `${state?.productDetail?.event.name}`,
                    href: `${ROUTES.EVENT_DETAIL.replace(
                      IdQuery,
                      JSON.stringify(state?.productDetail?.event?.id)
                    )}`,
                  },
                  {
                    title: t('buyTicket.selectTicket'),
                    href: `${ROUTES.BUY_TICKET}/${state?.productDetail?.event?.id}`,
                  },
                  {
                    title: 'Select Transaction Method',
                    href: `${ROUTES.TICKET_SELECT_TRANSACTION}/${idTicket}?method=${methodDelivery}`,
                  },
                  {
                    title: t('buyTicket.orderTicket'),
                  },
                ]}
              />
            )}
          </div>
        )}

        <section className="order-ticket-section">
          <H5>{t('buyTicket.orderTicket')}</H5>
          <Form.Provider>
            <Form
              name="OrderTicket"
              form={form}
              initialValues={defaultValues}
              // onFinish={handleSubmitForm}
            >
              <OrderTicketComponent
                deliveryMethod={methodDelivery}
                voucherOptions={voucherOptions}
              />
              {/* total payment amount */}
              <TotalPayment
                loading={loading}
                idTicket={idTicket}
                methodDelivery={methodDelivery}
                setPaymentSuccess={setIsModalOpen}
              />
            </Form>
          </Form.Provider>
        </section>
      </S.OrderTicketContainer>

      <Modal
        isOpen={isModalOpen}
        onCancel={() => {
          setIsModalOpen(false);
          navigate(ROUTE_USER.USER_MY_PURCHASES, { replace: true });
        }}
      >
        <div className="content-modal">
          <H5>{t('buyTicket.transactionIsSuccessful')}</H5>
          <p>{t('buyTicket.within12Hours')}</p>
        </div>
      </Modal>
    </Container>
  );
}

export default OrderTicket;
