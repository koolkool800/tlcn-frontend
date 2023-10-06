import { PayloadAction, createSlice } from '@reduxjs/toolkit';
import { EventCategoryType } from 'interface/event';
import { UserType } from 'interface/user';

type State = {
  eventCategory: EventCategoryType[] | undefined;
};

const initial: State = {
  eventCategory: undefined,
};

const navigation = createSlice({
  name: 'navigation',
  initialState: initial,
  reducers: {
    setEventCategory: (state, action: PayloadAction<EventCategoryType[]>) => {
      return { ...state, eventCategory: action.payload };
    },
    clearEventCategory: (state) => {
      return { ...state, eventCategory: undefined };
    },
  },
});
export const { setEventCategory, clearEventCategory } = navigation.actions;
export default navigation.reducer;
