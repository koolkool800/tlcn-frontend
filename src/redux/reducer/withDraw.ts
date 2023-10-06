import { PayloadAction, createSlice } from '@reduxjs/toolkit';

type State = {
  totalBalance: number;
};

const initial: State = {
  totalBalance: 0,
};

const withDrawReducer = createSlice({
  name: 'withDrawReducer',
  initialState: initial,
  reducers: {
    setTotalBalance: (state, action: PayloadAction<any>) => {
      state.totalBalance = action.payload;
    },
  },
});
export const { setTotalBalance } = withDrawReducer.actions;
export default withDrawReducer.reducer;
