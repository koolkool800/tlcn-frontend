import { FormRegisterSellerValue } from '@components/registerSeller/FormRegisterSellerModal';
import { ROUTE_API } from '@constants/routes';
import { axiosInstance } from '@lib/axios';
import { ResponseListModel, ResponseModel } from 'interface';
import { FilterType, ObjectLiteral } from 'interface/general';
import {
  AddressType,
  FaqCategoryType,
  FaqType,
  FormAddresstype,
  FormInquiryType,
  FormSendPin,
  FormUserType,
  InquiryType,
  NotificationDataType,
  OrderSaleType,
  PinReceivedType,
  SendTicketType,
  StatusStatisticsType,
  UserType,
  VoucherType,
} from 'interface/user';
import {
  UserInformationWithdraw,
  WithdrawDetail,
  WithdrawHistory,
} from 'interface/withdraw';

const userService = {
  getAddress: () => {
    return axiosInstance().get<never, ResponseListModel<AddressType>>(
      ROUTE_API.ADDRESS
    );
  },
  createAddress: (model: FormAddresstype) => {
    return axiosInstance().post(ROUTE_API.ADDRESS, model);
  },

  updateAddress: (id: number, model: FormAddresstype) => {
    return axiosInstance().put(`${ROUTE_API.ADDRESS}/${id}`, model);
  },

  getVoucher: (filter: FilterType) => {
    return axiosInstance().get<never, ResponseListModel<VoucherType>>(
      ROUTE_API.USER_VOUCHER,
      {
        params: { ...filter },
      }
    );
  },
  getVoucherAvailable: (totalPrice: number) => {
    return axiosInstance().get<never, ResponseListModel<any>>(
      `${ROUTE_API.USER_VOUCHER_AVAILABLE}?totalPrice=${totalPrice}`
    );
  },

  getVoucherOrder: (filter: FilterType) => {
    const applySeller = filter?.applySeller === 'seller';
    const requestParams = {
      ...filter,
      applySeller,
    };
    return axiosInstance().get<never, ResponseListModel<VoucherType>>(
      ROUTE_API.USER_VOUCHER_ORDER,
      {
        params: requestParams,
      }
    );
  },

  getProfile: () => {
    return axiosInstance().get<never, ResponseModel<UserType>>(
      ROUTE_API.PROFILE
    );
  },

  updateProfile: (model: FormUserType) => {
    return axiosInstance().put<never, ResponseModel<UserType>>(
      ROUTE_API.PROFILE,
      model
    );
  },
  getOrdersSales: () => {
    return axiosInstance().get<never, ResponseModel<UserType>>(
      ROUTE_API.ORDERS_SALES
    );
  },

  getPurchaseStatusStatistics: () => {
    return axiosInstance().get<never, ResponseModel<StatusStatisticsType[]>>(
      ROUTE_API.PURCHASE_STATUS_STATISTICS
    );
  },

  getOrderStatusStatistics: () => {
    return axiosInstance().get<never, ResponseModel<StatusStatisticsType[]>>(
      ROUTE_API.ORDER_STATUS_STATISTICS
    );
  },

  getTicketSales: (filter: FilterType = {}) => {
    return axiosInstance().get<never, ResponseListModel<OrderSaleType>>(
      ROUTE_API.TICKET_SALES,
      {
        params: filter,
      }
    );
  },

  ticketSaleCancelListing: (params: FilterType = {}) => {
    return axiosInstance().post(
      ROUTE_API.TICKET_SALES_CANCEL_LISTING,
      {},
      { params }
    );
  },

  sendPinCode: (values: FormSendPin) => {
    return axiosInstance().post(ROUTE_API.SEND_PIN_CODE, values);
  },

  getCollectVoucher: (code: string) => {
    return axiosInstance().put<never, ResponseModel<undefined>>(
      `${ROUTE_API.USER_VOUCHER}/${code}`
    );
  },
  getPinReceived: (params: FilterType = {}) => {
    return axiosInstance().get<never, ResponseListModel<PinReceivedType>>(
      ROUTE_API.PIN_RECEIVED,
      { params }
    );
  },

  getPinReceivedDetail: (id: number) => {
    return axiosInstance().get<never, ResponseModel<{ pinNumbers: string[] }>>(
      `${ROUTE_API.PIN_RECEIVED}/${id}`
    );
  },

  getPinSent: (params: FilterType = {}) => {
    return axiosInstance().get<never, ResponseListModel<PinReceivedType>>(
      ROUTE_API.PIN_SENT,
      { params }
    );
  },

  getInquiry: (params: FilterType = {}) => {
    return axiosInstance().get<never, ResponseListModel<InquiryType>>(
      `${ROUTE_API.INQUIRY}/get-list`,
      { params }
    );
  },

  getInquiryDetail: (id: string) => {
    return axiosInstance().get<never, ResponseModel<InquiryType>>(
      `${ROUTE_API.INQUIRY}/${id}`
    );
  },

  createInquiry: (form: FormInquiryType) => {
    return axiosInstance().post<never, ResponseModel<string>>(
      ROUTE_API.INQUIRY_CREATE,
      form
    );
  },
  sentTicket: (body: SendTicketType) => {
    return axiosInstance().post(ROUTE_API.SENT_TICKET, body);
  },

  getSaleTicketDetail: (id: number) => {
    return axiosInstance().post(`${ROUTE_API.TICKET_SALES}/${id}`);
  },

  getFaqCategory: () => {
    return axiosInstance().get<never, ResponseModel<FaqCategoryType[]>>(
      ROUTE_API.FAQ_CATEGORY
    );
  },

  getFaq: (filter: FilterType = {}) => {
    return axiosInstance().get<never, ResponseListModel<FaqType>>(
      ROUTE_API.FAQ,
      {
        params: filter,
      }
    );
  },
  /**
   * get list notifications
   * @param params limit, offset
   * @returns {NotificationDataType[]}
   */
  getNotificationList: (params: { limit?: number; offset?: number } = {}) => {
    return axiosInstance().get<never, ResponseListModel<NotificationDataType>>(
      ROUTE_API.GET_NOTIFICATIONS,
      {
        params,
      }
    );
  },

  getBankAccountSystem: () => {
    return axiosInstance().get<
      never,
      ResponseModel<{ bankCode: string; bankName: string; id: number }[]>
    >(ROUTE_API.BANK_ACCOUNT_SYSTEM);
  },

  addBankAccount: (body: {
    availableBankId: number;
    accountNumber: string;
    name: string;
  }) => {
    return axiosInstance().post<never, ResponseModel<undefined>>(
      ROUTE_API.BANK,
      body
    );
  },

  registerSeller: (form: FormData) => {
    return axiosInstance().post<never, ResponseModel<any>>(
      ROUTE_API.CREATE_SELLER,
      form,
      { headers: { 'Content-Type': 'multipart/form-data' } }
    );
  },

  getUserInformationWithDraw() {
    return axiosInstance().get<never, ResponseModel<UserInformationWithdraw>>(
      ROUTE_API.USER_INFORMATION_WITHDRAW
    );
  },

  requestWithdraw(body: { amount: number }) {
    return axiosInstance().post<never, ResponseModel<undefined>>(
      ROUTE_API.REQUEST_WITHDRAW,
      body
    );
  },

  getListWithdrawDetail(filter: ObjectLiteral) {
    return axiosInstance().get<never, ResponseListModel<WithdrawDetail>>(
      ROUTE_API.GET_LIST_WITHDRAW_DETAIL,
      {
        params: filter,
      }
    );
  },

  getListWithdrawHistory(filter: ObjectLiteral) {
    return axiosInstance().get<never, ResponseListModel<WithdrawHistory>>(
      ROUTE_API.GET_LIST_WITHDRAW_HISTORY,
      {
        params: filter,
      }
    );
  },
  getStateRegisterSeller: () => {
    return axiosInstance().get<never, ResponseModel<any>>(
      ROUTE_API.GET_STATE_REGISTER_BUSINESS
    );
  },

  getNotificationDetail: (id: string) => {
    return axiosInstance().get<never, ResponseModel<NotificationDataType>>(
      `${ROUTE_API.GET_NOTIFICATION_DETAIL}/${id}`
    );
  },
};

export default userService;
