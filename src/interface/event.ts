import { EVENT_TYPE, EventCategoryTypeSearch } from '@constants/codeConstants';
import { BaseFilterType } from './general';
import { BaseResponseListType } from './response';

export type GroupType = {
  createdAt: string;
  updatedAt: string;
  id: string;
  groupId: string;
  name: string;
  color: string;
  price: number;
  priceType: string;
  isObstructed: boolean;
  sections: SectionsType[];
};
export type SectionsType = {
  createdAt: string;
  updatedAt: string;
  id: string;
  name: string;
  price: number | null;
  floors: FloorsType[];
  group: {
    createdAt: string;
    updatedAt: string;
    id: string;
  };
};
export type FloorsType = {
  createdAt: string;
  updatedAt: string;
  id: string;
  name: string;
  rows: RowsType[];
};
export type RowsType = {
  createdAt: string;
  updatedAt: string;
  id: string;
  name: string;
  price: number;
  priceType: string;
  isObstructed: boolean;
  ticketAvailabel: number;
  floor: {
    createdAt: string;
    updatedAt: string;
    id: string;
  };
};

export type EventType = {
  id: number | string | undefined;
  createdAt: string | undefined;
  updatedAt: string | undefined;
  title: string | undefined;
  performer: string | undefined;
  performanceDate: string | undefined;
  place: string | undefined;
  coverImage: string | undefined;
  stageMap: string | undefined;
  eventType: string | undefined;
  pinOrder: number | undefined;
  view: number | undefined;
  ticketAvailable: number | undefined;
  averagePrice: number | undefined;
  backgroundImage: string | undefined;
  groups: GroupType[] | undefined;
  minPrice: number | undefined;
  maxPrice: number | undefined;
  availableDeliveryMethods: string[];
};

export type EventFilter = {
  field: string;
  data: string[];
};

export type ItemEventTypes = {
  eventType: string;
  navCateId?: string;
};

export type EventResponseTypeFilter = BaseResponseListType<EventFilter>;

export type EventResponseListType = BaseResponseListType<EventType>;

export type EventFilterType = BaseFilterType & {
  eventName: string;
  eventTypes: string;
};

type EventKeys = keyof typeof EVENT_TYPE;

export type EventFilterCustom = {
  eventTypes: (typeof EVENT_TYPE)[EventKeys];
  keyword?: string | undefined;
  performers?: string[];
  places?: string[];
  titles?: string | undefined;
  sortBy?: string | undefined;
  limit?: number | undefined;
  offset?: number | undefined;
  fields?: string | undefined;
  navCateId?: string | undefined;
};

export type EventModelFilterType = {
  field: string;
  data: string[];
};

export type FormFilterMap = {
  classes: string;
  zones: string;
  floors: string;
  rows: string;
  method: string[];
};
export type FormEventFilter = FormFilterMap & {
  isObstructed: boolean;
};

export type EventCategoryType = {
  iconUrl: string;
  id: 1;
  inTopBar: boolean;
  name: string;
  eventTypes?: string;
};

export type EventTypeInSearch = {
  id: string;
  eventName: string;
  place: string;
  performDate: string;
};

export type EventSearchResponseType = {
  [key in keyof typeof EventCategoryTypeSearch]: EventTypeInSearch[];
};

export type AmountSeller = {
  salePrice: number;
  discountValue: number;
  saleCommission: number;
  shippingFee: number;
  actualAmountSeller: number;
};
export type ParamsAmountSeller = { totalPrice: number; voucherId?: string };
