import { PayloadAction, createSlice } from '@reduxjs/toolkit';
import { PreConfirmOderPayment } from '@services/buyTicketService';
import { AddressType } from 'interface/user';

type PaymentOrder = {
  payment: PreConfirmOderPayment;
  address: AddressType[];
};
const initialValue: PaymentOrder = {
  payment: {
    deliveryFee: 0,
    platformFee: 0,
    price: 0,
    totalDiscount: 0,
    totalPayment: 0,
  },
  address: [],
};

const paymentOrderReducer = createSlice({
  name: 'paymentOrderReducer',
  initialState: initialValue,
  reducers: {
    setOrderPayment: (state, action: PayloadAction<PreConfirmOderPayment>) => {
      return { ...state, payment: { ...state.payment, ...action.payload } };
    },
    setAddressList: (state, action: PayloadAction<AddressType[]>) => {
      return { ...state, address: [...state.address, ...action.payload] };
    },
  },
});
export const { setOrderPayment, setAddressList } = paymentOrderReducer.actions;
export default paymentOrderReducer.reducer;
