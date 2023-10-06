import { PayloadAction, createSlice } from '@reduxjs/toolkit';
import { TicketDetail } from 'interface/ticketInterface';

const initialValue:
  | TicketDetail
  | {
      [key: string]: string | number | boolean | number[] | string[];
    } = {};

const ticketReducer = createSlice({
  name: 'ticketReducer',
  initialState: initialValue,
  reducers: {
    setDetailTicket: (state, action: PayloadAction<TicketDetail>) => {
      return { ...state, ...action.payload };
    },
  },
});
export const { setDetailTicket } = ticketReducer.actions;
export default ticketReducer.reducer;
