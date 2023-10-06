import { ROUTE_API } from '@constants/routes';
import { axiosInstance } from '@lib/axios';
import { ResponseListModel, ResponseModel } from 'interface';
import { EventType } from 'interface/event';
import { TicketDetail } from 'interface/ticketInterface';

export type FilterSeat = {
  eventId: string;
  deliveryMethods: string;
  groupIds: string;
  sectionIds: string;
  floorIds: string;
  rowIds: string;
  isObstructed: boolean;
};
export type CreateOrders = {
  ticketId: string | undefined;
  deliveryMethod: string | undefined;
  deliveryInfo: DeliveryInformation | undefined;
  voucherId: string | undefined;
  paymentMethod?: string | undefined;
  cashReceiptType: string | undefined;
  cashReceipt: string | undefined;
};
export type FilterOrders = Pick<
  CreateOrders,
  'ticketId' | 'deliveryMethod' | 'voucherId'
>;

export type PreConfirmOderPayment = {
  deliveryFee: number;
  platformFee: number;
  price: number;
  totalDiscount: number;
  totalPayment: number;
};
export type DeliveryInformation = {
  addressId?: number | undefined;
  name?: string | undefined;
  phone?: string | undefined;
  code?: string | undefined;
  address?: string | undefined;
  detailAddress?: string | undefined;
};

const buyTicketService = {
  getTicket: (params: FilterSeat) => {
    return axiosInstance().get<never, ResponseListModel<EventType>>(
      ROUTE_API.BUY_TICKET,
      {
        params,
      }
    );
  },
  getTicketDetail: (ticketId: string) => {
    return axiosInstance().get<never, ResponseModel<TicketDetail>>(
      `/tickets/${ticketId}/buy-ticket`
    );
  },
  getOrderPreConfirm: (params: FilterOrders) => {
    return axiosInstance().post<never, ResponseModel<PreConfirmOderPayment>>(
      ROUTE_API.ORDERS_PRE_CONFIRM,
      params
    );
  },
  createOrderPayment: (params: CreateOrders) => {
    return axiosInstance().post<
      never,
      ResponseModel<{ orderId: string; amount: number }>
    >(ROUTE_API.CREATE_ORDER_PAYMENT, params);
  },
};

export default buyTicketService;
