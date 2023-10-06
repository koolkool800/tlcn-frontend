import { DELIVERY_METHOD, OrderStatus } from '@constants/codeConstants';

export interface OrderPurchase {
  createdAt: string;
  updatedAt: string;
  id: string;
  status: keyof typeof OrderStatus;
  deliveryFee: string;
  totalPrice: string;
  totalDiscount: string;
  totalPayment: string;
  cashReceiptType: string;
  cashReceipt: any;
  deliveryMethod: keyof typeof DELIVERY_METHOD;
  deliveryInformation: any;
  ticket: Ticket;
}

export interface Ticket {
  createdAt: string;
  updatedAt: string;
  id: string;
  shippingFee: string;
  actualAmountSeller: string;
  actualAmountBuyer: string;
  type: string;
  ticketStatus: string;
  deliveryMethod: keyof typeof DELIVERY_METHOD;
  insideTicket: InsideTicket;
  seats: Seat[];
  seatQuantity: string;
}

export interface InsideTicket {
  createdAt: string;
  updatedAt: string;
  id: string;
  unitPrice: string;
  isObstructed: boolean;
  isAdjacentSeats: boolean;
  seatQuantity: string;
  event: Event;
  group: Group;
  section: Section;
  floor: Floor;
  row: Row;
}

export interface Event {
  createdAt: string;
  updatedAt: string;
  coverImage: string;
  performer?: string;
  title?: string;
  place?: string;
  performanceDate?: string;
}

export interface Seat {
  seatPosition: string;
  isTaken: boolean;
  id: string;
  createdAt: string;
  updatedAt: string;
  information: string;
}

export interface Group {
  createdAt: string;
  updatedAt: string;
  name: string;
}
export interface Section {
  createdAt: string;
  updatedAt: string;
  name: string;
}
export interface Floor {
  createdAt: string;
  updatedAt: string;
  name: string;
}
export interface Row {
  createdAt: string;
  updatedAt: string;
  name: string;
}

export type DeliveryUnit = {
  deliveryCode: string;
  unitName: string;
};
export interface OrderDetailType {
  createdAt: Date;
  updatedAt: Date;
  id: number;
  status: string;
  deliveryFee: number;
  totalPrice: number;
  totalDiscount: number;
  totalPayment: number;
  platformFee: number;
  cashReceiptType: string;
  cashReceipt: any;
  deliveryMethod: string;
  deliveryInformation: any;
  ticket: Ticket | any;
  event: Event;
  deliveryUnitResellToBuyer: DeliveryUnit | null;
  deliveryUnitSellerToResellInfor: DeliveryUnit | null;
}
