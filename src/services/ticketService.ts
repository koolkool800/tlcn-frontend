import { ROUTES, ROUTE_API } from '@constants/routes';
import { axiosInstance } from '@lib/axios';
import { ResponseModel } from 'interface';
import { InsideTicketType } from 'interface/insideTicket';
import { ProductDetails } from 'interface/ticketInterface';

const ticketService = {
  preConfirmInsideTicket: (data: InsideTicketType) => {
    return axiosInstance().post<never, ResponseModel<any>>(
      `${ROUTE_API.PRE_CONFIRM_INSIDE_TICKET}`,
      data
    );
  },
  createInsideTicket: (data: InsideTicketType) => {
    return axiosInstance().post<never, ResponseModel<any>>(
      `${ROUTE_API.CREATE_INSIDE_TICKET}`,
      data
    );
  },
  getProductDetails: (ticketId: string | number) => {
    return axiosInstance().get<never, ResponseModel<ProductDetails>>(
      `${ROUTE_API.PRODUCT_DETAIL}/${ticketId}/product-detail`
    );
  },
};

export default ticketService;
