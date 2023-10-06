export const paymentEximbay = async (dataOrder: any) => {
  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  // @ts-ignores
  EXIMBAY.request_pay(dataOrder);
};
