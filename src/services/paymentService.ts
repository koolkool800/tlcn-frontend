import { ROUTE_API } from '@constants/routes';
import { axiosInstance } from '@lib/axios';
import { ResponseResult } from 'interface';

const paymentService = {
  getFgkey: async (): Promise<ResponseResult> => {
    return axiosInstance().get(ROUTE_API.GET_FGKEY);
  },
  getOrderPayment: async (orderId: string): Promise<ResponseResult> => {
    return axiosInstance().get(ROUTE_API.ORDER_PAYMENT, {
      params: {
        orderId,
      },
    });
  },
};

export default paymentService;
