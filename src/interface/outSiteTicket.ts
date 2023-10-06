import { BaseFilterType, FilterType as PlanObjectType } from './general';
import { BaseResponseListType } from './response';

export interface OutSiteType {
  id: number;
  createdAt: string;
  updatedAt: string;
  eventName: string;
  performer: string;
  isObstructed: boolean;
  performanceDate: string;
  place: string;
  seatInformation: string;
  unitPrice: string;
  authorId: string;
  ticket: {
    deliveryMethod: string[];
  };
  totalPrice: number;
}

export type OutSiteTicketResponseListType = BaseResponseListType<OutSiteType>;

export type OutSiteTicketFilterType = BaseFilterType & {
  keyword: string;
  performers: string;
  // deliveryMethods: string;
  // concerts: string;
  places?: string;
  // isObstructedView: boolean;
  totalElement: number;
  page: number;
  [key: string]: string | number | string[] | any;
};

export const initOutSiteTicketValue: OutSiteTicketFilterType = {
  // concerts: '',
  keyword: '',
  performers: '',
  // deliveryMethods: 'ONSITE_TRANSACTION',
  // isObstructedView: false,
  limit: 10,
  offset: 0,
  sortBy: 'id:desc',
  totalElement: 0,
  page: 1,
};

export type FormOutSiteTicketForm = {
  eventName: string;
  performer: string;
  place: string;
  performanceDate: string;
  seatInformation: string;
  unitPrice: number;
  deliveryMethod: string[];
  deliveryInformation: PlanObjectType;
  isObstructed: boolean;
};
