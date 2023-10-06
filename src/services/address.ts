const api_province = 'https://vn-public-apis.fpo.vn/provinces/getAll?limit=-1';
const api_district = (code: string) =>
  `https://vn-public-apis.fpo.vn/districts/getByProvince?provinceCode=${code}&limit=-1`;
export const addressService = {
  getProvince: async () => {
    const response = await fetch(api_province);
    const data = await response.json();
    return data.data;
  },
  getDistrict: async (code: string) => {
    const response = await fetch(api_district(code));
    const data = await response.json();
    return data.data;
  },
};
