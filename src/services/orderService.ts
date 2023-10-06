import { ROUTE_API } from '@constants/routes';
import { axiosInstance } from '@lib/axios';
import { AxiosResponseResult, ResponseListModel } from 'interface';
import { FilterType } from 'interface/general';
import { OrderDetailType, OrderPurchase } from 'interface/order';

const orderService = {
  getAllPurchase: (filter?: FilterType) => {
    return axiosInstance().get<never, ResponseListModel<OrderPurchase>>(
      ROUTE_API.ORDERS_PURCHASES,
      {
        params: { ...filter, joinAndSelectTicketEventCoverImage: true },
      }
    );
  },
  getOrderDetail: (id: string) => {
    return axiosInstance().get<never, AxiosResponseResult<OrderDetailType>>(
      `${ROUTE_API.ORDERS}/${id}`
    );
  },
  createReportOrder: ({
    detailReport,
    orderId,
    proofs,
  }: {
    orderId: string;
    detailReport: string;
    proofs: string[];
  }) => {
    return axiosInstance().post<never, AxiosResponseResult<any>>(
      ROUTE_API.CREATE_REPORT_ORDER,
      { detailReport, orderId, proofs }
    );
  },
  paymentToSeller: ({ orderId }: { orderId: string }) => {
    return axiosInstance().post<never, AxiosResponseResult<any>>(
      `${ROUTE_API.PURCHASE_PAYMENT_TO_SELLER}?orderId=${orderId}`
    );
  },
};

export default orderService;
