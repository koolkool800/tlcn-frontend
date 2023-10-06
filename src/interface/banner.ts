import { BANNER_STATUS } from '@constants/codeConstants';

export type BannerType = {
  banner: string;
  thumbnail: string;
  category: string;
  createdAt: string;
  id: number;
  link: string;
  position: number;
  status: keyof typeof BANNER_STATUS;
  updatedAt: string;
};
