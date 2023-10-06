import { ROUTE_API } from '@constants/routes';
import { axiosInstance } from '@lib/axios';
import { ResponseListModel, ResponseModel } from 'interface';
import {
  AmountSeller,
  EventCategoryType,
  EventFilterCustom,
  EventModelFilterType,
  EventSearchResponseType,
  EventType,
  ItemEventTypes,
} from 'interface/event';
import { ObjectLiteral } from 'interface/general';
import {
  FormOutSiteTicketForm,
  OutSiteTicketFilterType,
  OutSiteType,
} from 'interface/outSiteTicket';
import { VoucherType } from 'interface/user';
import queryString from 'query-string';

const eventService = {
  get: (filter: EventFilterCustom) => {
    const queryObject = {
      ...filter,
      performers: filter?.performers?.join(','),
      places: filter?.places?.join(','),
    };

    return axiosInstance().get<never, ResponseListModel<EventType>>(
      `${ROUTE_API.EVENT}`,
      {
        params: queryObject,
      }
    );
  },
  getDetail: (id: string | number, filter: ObjectLiteral = {}) => {
    return axiosInstance().get<never, ResponseModel<EventType>>(
      `${ROUTE_API.EVENT}/${id}?${queryString.stringify(filter)}`
    );
  },
  getFilter: (eventType: ItemEventTypes) => {
    return axiosInstance().get<never, ResponseModel<EventModelFilterType[]>>(
      `${ROUTE_API.EVENT}/filters`,
      {
        params: {
          eventType: eventType.eventType,
          navCateId: eventType?.navCateId,
        },
      }
    );
  },
  getClearanceFilter: () => {
    return axiosInstance().get<never, ResponseModel<EventModelFilterType[]>>(
      ROUTE_API.OUT_SITE_TICKET_FILTER
    );
  },
  getTopEvent: () => {
    return axiosInstance().get<never, ResponseListModel<EventType>>(
      `${ROUTE_API.EVENT_TOP}`
    );
  },
  getOutSiteTicket: (filter: OutSiteTicketFilterType) => {
    return axiosInstance().get<never, ResponseListModel<OutSiteType>>(
      `${ROUTE_API.OUT_SITE_TICKET}?${queryString.stringify(filter, {
        arrayFormatSeparator: ',',
        arrayFormat: 'comma',
      })}`
    );
  },
  getVoucher: () => {
    return axiosInstance().get<never, ResponseListModel<VoucherType>>(
      `${ROUTE_API.USER_VOUCHER}?offset=0&limit=3000`
    );
  },
  createOutSiteTicket: (model: FormOutSiteTicketForm) => {
    return axiosInstance().post<never, ResponseModel<string>>(
      ROUTE_API.OUT_SITE_TICKET,
      model
    );
  },

  getNavigationCategory: () => {
    return axiosInstance().get<never, ResponseModel<EventCategoryType[]>>(
      ROUTE_API.NAVIGATION_CATEGORY
    );
  },

  searchEventBy: (model?: Omit<EventFilterCustom, 'eventTypes'>) => {
    return axiosInstance().get<never, ResponseModel<EventSearchResponseType>>(
      ROUTE_API.EVENT_SEARCH,
      {
        params: {
          keyword: model?.keyword,
        },
      }
    );
  },

  getPreAmountSeller: (model: { totalPrice: number; voucherId?: string }) => {
    return axiosInstance().post<never, ResponseModel<AmountSeller>>(
      ROUTE_API.PRE_CONFIRM_OUTSIDE_TICKET,
      model
    );
  },
};

export default eventService;
