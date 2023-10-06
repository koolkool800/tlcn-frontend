export type DeliveryInformation = {
  addressId?: number | null;
  name?: string | null;
  phone?: string | null;
  code?: string | null;
  address?: string | null;
  detailAddress?: string | null;
};
export type InsideTicketType = {
  eventId?: number | string;
  floorId?: number;
  groupId?: number;
  isAdjacentSeats?: boolean;
  rowId?: number;
  seatQuantity?: number;
  seats?: string[];
  sectionId?: number;
  unitPrice?: number;
  voucherId?: number;
  deliveryInformation?: DeliveryInformation;
  deliveryMethod?: string[];
  pictureOfProof?: string;
};
