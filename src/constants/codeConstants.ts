// TODO: listTransaction
export const LIST_TRANSACTION_MAP: { value: string; label: string }[] = [
  { label: 'PIN Transaction 1', value: '1' },
  { label: 'PIN Transaction 2', value: '2' },
  { label: 'PIN Transaction 3', value: '3' },
  { label: 'PIN Transaction 4', value: '4' },
];
export const TRANSACTION_CODE: { [value: string]: string } = {
  '1': 'PIN Transaction 1',
  '2': 'PIN Transaction 2',
  '3': 'PIN Transaction 3',
  '4': 'PIN Transaction 4',
};
// TODO: listDelivery
export const LIST_DELIVERY_MAP: { value: string; label: string }[] = [
  { label: 'Payment completed 1', value: '1' },
  { label: 'Payment completed 2', value: '2' },
  { label: 'Payment completed 3', value: '3' },
  { label: 'Payment completed 4', value: '4' },
];
export const DELIVERY_CODE: { [value: string]: string } = {
  '1': 'Payment completed 1',
  '2': 'Payment completed 2',
  '3': 'Payment completed 3',
  '4': 'Payment completed 4',
};

export const LOCAL_STORE = {
  LANG: 'language',
  LANG_DEFAULT: 'en',
};

export const REGEX = {
  PASSWORD: /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,20}$/,
  EMAIL:
    /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|.(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
  PHONE_NUMBER: /^(?!0)\d{1,9}$/,
};

export const CONFIG = {
  API_URL:
    import.meta.env.VITE_MODE === 'development'
      ? import.meta.env.VITE_API_URL_DEV
      : import.meta.env.VITE_API_URL,
  // API_DEV: import.meta.env.VITE_API_URL_DEV,
};

export const BrowserStore = {
  token: 'token',
};

export const DELIVERY_METHOD: {
  SELLER_SHIPMENT: 'SELLER_SHIPMENT';
  PIN_TRANSACTION: 'PIN_TRANSACTION';
} = {
  SELLER_SHIPMENT: 'SELLER_SHIPMENT',
  PIN_TRANSACTION: 'PIN_TRANSACTION',
};

export const DELIVERY_METHOD_VALUE: any = {
  SELLER_SHIPMENT: 'Seller Shipments',
  PIN_TRANSACTION: 'Pin Transaction',
};

export const SNS_STATE = {
  SIGN_IN_NAVER: '1000',
  SIGN_UP_NAVER: '1001',
  SIGN_IN_KAKAO: '1002',
  SIGN_UP_KAKAO: '1003',
  SIGN_IN_APPLE: '1004',
  SIGN_UP_APPLE: '1005',
};

export enum TicketSaleStatus {
  ALL = '',
  PENDING = 'PENDING',
  IS_LISTING = 'IS_LISTING',
  PAYMENT_COMPLETED = 'PAYMENT_COMPLETED',
  ON_SHIPPING = 'ON_SHIPPING',
  TRANSACTION_COMPLETED = 'TRANSACTION_COMPLETED',
  CANCEL = 'CANCEL',
  EXPIRED = 'EXPIRED',
}

export enum OrderStatus {
  IS_SELLING = 'IS_SELLING',
  CANCEL = 'CANCEL',

  // PIN TRANSACTION
  // when creating order, create status with payment pending
  PAYMENT_PENDING = 'PAYMENT_PENDING',
  // after calling webhook return success, update to payment completed
  PAYMENT_COMPLETED = 'PAYMENT_COMPLETED',
  SENT_PIN = 'SENT_PIN',
  PIN_RECEIVED = 'PIN_RECEIVED',
  TRANSACTION_COMPLETED = 'TRANSACTION_COMPLETED',

  // SELLER SHIPMENT
  SENT_DELIVERY_UNIT = 'SENT_DELIVERY_UNIT',
  DELIVERY_UNIT_RECEIVED = 'DELIVERY_UNIT_RECEIVED',
  DELIVERY_UNIT_COMPLETED_CHECKING = 'DELIVERY_UNIT_COMPLETED_CHECKING',
  DELIVERY_COMPLETED = 'DELIVERY_COMPLETED',

  CANCEL_COMPLETED = 'CANCEL_COMPLETED',
}
export const EventIDQuery = ':eventId';

export const IdQuery = ':id';

export const DELIVERY_METHOD_OPTIONS = [
  { label: 'pinTransaction', value: 'PIN_TRANSACTION' },
  { label: 'sellerShipment', value: 'SELLER_SHIPMENT' },
];
export const SEAT_TRANSACTION_TYPE = {
  PIN_TRANSACTION: 'pinTransaction',
  SELLER_SHIPMENT: 'sellerShipment',
};

export const PAYMENT_METHOD = {
  CREDIT_CARD: 'CREDIT_CARD',
  VIRTUAL_ACCOUNT: 'VIRTUAL_ACCOUNT',
  KAKAO_PAY: 'KAKAO_PAY',
  NAVER_PAY: 'NAVER_PAY',
  PAYPAL: 'PAYPAL',
};
export const CASH_RECEIPT_TYPE = {
  PERSONAL: 'PERSONAL',
  BUSINESS: 'BUSINESS',
  NULL: 'NULL',
};

export const EVENT_TYPE = {
  CONCERT: 'CONCERT',
  SPORT: 'SPORT',
  FREEMARKET: 'FREEMARKET',
  ART_GALLERY: 'ARTGALLERY',
  MUSICAL: 'MUSICAL',
  OTHER: 'OTHER',
};

export const TITLE_MENU = {
  All: 'all',
  ZER0: '000',
  CONCERT: 'concert',
  SPORT: 'sport',
  ART_GALLERY: 'art',
  OTHER: 'other',
  MUSICAL: 'musical',
  CLEARANCE: 'clearance',
};

export enum EventCategoryTypeSearch {
  art = 'Art',
  concert = 'Concert',
  sport = 'Sport',
  outsideTicket = 'Outside Ticket',
}

export const VoucherCategory = {
  DISCOUNT_DELIVERY_FREE: 'discount delivery free',
  DISCOUNT_COMMISSION: 'discount mission',
  DISCOUNT_TOTAL_ORDER_VALUE: 'discount total order value',
  DISCOUNT_UNIT_PRICE: 'discount unit price',
  DISCOUNT_FIXED_VALUE: 'discount foxed value',
};

export const KeyAvailableTransaction: any = {
  PIN_TRANSACTION: 'pin-transaction',
  SELLER_SHIPMENT: 'seller-shipment',
};

export const BANNER_STATUS = {
  ACTIVE: 'ACTIVE',
  INACTIVE: 'INACTIVE',
};
