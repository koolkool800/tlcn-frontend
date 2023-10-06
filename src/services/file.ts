import { ROUTE_API } from '@constants/routes';
import { axiosInstance } from '@lib/axios';

const fileServices = {
  uploadProofImg: async (formData: FormData) => {
    return axiosInstance().postForm<never, any>(
      ROUTE_API.UPLOAD_PROOF_PIC,
      formData
    );
  },

  uploadMultiple: async (formData: FormData) => {
    return axiosInstance().postForm<never, { urls: string[] }>(
      ROUTE_API.UPLOAD_FILE_MULTIPLE,
      formData
    );
  },
};

export default fileServices;
