import { ROUTE_API } from '@constants/routes';
import { axiosInstance } from '@lib/axios';
import { ResponseListModel } from 'interface';
import { BannerType } from 'interface/banner';

const bannerService = {
  getBanner: async () => {
    return axiosInstance().get<never, ResponseListModel<BannerType>>(
      ROUTE_API.GET_BANNER
    );
  },
  getSubBanners: async () => {
    return axiosInstance().get<never, ResponseListModel<BannerType>>(
      ROUTE_API.GET_BANNER,
      {
        params: { category: 'SUB' },
      }
    );
  },
};

export default bannerService;
