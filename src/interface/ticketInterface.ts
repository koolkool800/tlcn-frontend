export type TicketDetail = {
  ticketId: number;
  performer: string;
  eventName: string;
  image: string;
  place: string;
  useDate: string;
  seatInfo: string;
  ticketType: string;
  unitPrice: number;
  quantity: number;
  intoMoney: number;
};

export type ProductDetails = {
  authorId: number;
  seatInfo: string;
  adjoiningSeats: boolean;
  price: number;
  groupId: string;
  totalPrice: number;
  deliveryMethod: string[];
  event: {
    id: string;
    name: string;
    performer: string;
    place: string;
    performanceDate: string;
    originalPrice: number;
    eventType: string;
    stageMap: any;
  };
};
