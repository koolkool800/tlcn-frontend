import { BaseModelType } from './general';
import { BaseResponseListType, BaseResponseType } from './response';

type AddressType = BaseModelType & {
  name: string;
  phone: string;
  address: string;
  detailAddress: string;
  isDefault: boolean;
  zoneCode: string;
};

type AddressListResponseType = BaseResponseListType<AddressType>;
type AddressResponseType = BaseResponseType<AddressType>;

type FormAddresstype = Omit<AddressType, 'id' | 'createdAt' | 'updatedAt'>;

type VoucherItemType = Pick<BaseModelType, 'id' | 'createdAt'> & {
  description: string;
  discount: string;
  expiredDate: string;
  maxDiscount: number;
  name: string;
  type: 'MONEY' | 'PERCENT';
  voucherCategory: string;
  quantity: number;
  code: string;
};

export type VoucherType = BaseModelType & {
  isUsed: boolean;
  id: number;
  voucher: VoucherItemType;
};

type VoucherListResponseType = BaseResponseListType<VoucherType>;

type UserType = BaseModelType & {
  name: string;
  email: string;
  accountType: string;
  role: string;
  avatar: string;
  phone: string;
  totalBalance: number;
  level: number;
  dob: string;
  bankDefault: {
    bankName: string;
    accountNumber: string;
  };
};

type FormUserType = Pick<UserType, 'name' | 'email' | 'phone'>;

type StatusStatisticsType = {
  status: string;
  count: number;
};

type TicketType = {
  createdAt: string;
  updatedAt: string;
  id: number;
  unitPrice: number;
  isObstructed: boolean;
  isAdjacentSeats: boolean;
  seatPosition: string[];
  seatQuantity: number;
  event: Event;
};

type EventType = {
  name: string;
  place: string;
  performanceDate: string;
  ticket: TicketType;
  coverImage?: string | null;
  performer: string;
};

type OrderSaleType = {
  orderNumber: number;
  registerDate: string;
  status: string;
  event: EventType;
  deliveryMethods: string[];
  totalPrice: number;
  ticketNumber: number | string;
};

type FormSendPin = {
  ticketId: number;
  pinNumbers: string[];
};

type PinReceivedType = {
  orderNumber: number;
  orderDate: string;
  ticketId: number;
  productInformation: {
    title: string;
    place: string;
    performer: string;
  };
  sentDate: string;
};

type InquiryType = {
  id: number;
  createdAt: string;
  title: string;
  status: string;
  question: string;
  answer: string;
};

type FormInquiryType = Pick<InquiryType, 'title' | 'question'>;

type SendTicketType = {
  ticketId: number;
  unitName: string;
  deliveryCode: string;
};

type FaqCategoryType = {
  categoryId: number;
  categoryName: string;
};

type FaqType = {
  faqId: number;
  faqQuestion: string;
  faqAnswer: string;
};

type NotificationDataType = {
  id: number;
  createdAt: string;
  isRead: boolean;
  data: {
    eventName: string;
    performer: string;
    place: string;
    useDate: Date;
    seatInformation: string;
    quantity: number;
    deliveryMethod: string[] | string;
    platformFee: number;
    deliveryFee: number;
    totalPayment: number;
    commissionFee: number;
    discount: number;
    actualReceivedAmount: number;
  };
  dataType: string;
  title: string;
  contentTop: string[];
  contentBot: string[];
};

export type {
  AddressType,
  AddressListResponseType,
  AddressResponseType,
  FormAddresstype,
  VoucherItemType,
  VoucherListResponseType,
  UserType,
  FormUserType,
  StatusStatisticsType,
  OrderSaleType,
  FormSendPin,
  PinReceivedType,
  InquiryType,
  FormInquiryType,
  NotificationDataType,
  SendTicketType,
  FaqCategoryType,
  FaqType,
};
