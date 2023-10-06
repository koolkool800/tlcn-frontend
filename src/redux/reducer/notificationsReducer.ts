import { PayloadAction, createSlice } from '@reduxjs/toolkit';
import { NotificationDataType } from 'interface/user';

type InitState = {
  notificationList: NotificationDataType[] | any[];
  numberNotifications: number;
};
const initialValue: InitState = {
  notificationList: [],
  numberNotifications: 0,
};

const notificationsReducer = createSlice({
  name: 'notificationsReducer',
  initialState: initialValue,
  reducers: {
    setNotifications: (
      state,
      action: PayloadAction<NotificationDataType[]>
    ) => {
      return {
        ...state,
        notificationList: action.payload,
      };
    },
    setNotification: (state, action: PayloadAction<NotificationDataType>) => {
      return {
        ...state,
        notificationList: [action.payload, ...state.notificationList],
      };
    },

    setTotalNotification: (state, action: PayloadAction<number>) => {
      return {
        ...state,
        numberNotifications: action.payload,
      };
    },
  },
});
export const { setNotifications, setNotification, setTotalNotification } =
  notificationsReducer.actions;
export default notificationsReducer.reducer;
