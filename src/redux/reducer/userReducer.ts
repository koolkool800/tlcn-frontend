import { PayloadAction, createSlice } from '@reduxjs/toolkit';
import { UserType } from 'interface/user';

type State = {
  profile: UserType | null;
};

const initial: State = {
  profile: null,
};

const userReducer = createSlice({
  name: 'userReducer',
  initialState: initial,
  reducers: {
    setProfile: (state, action: PayloadAction<UserType>) => {
      state.profile = action.payload;
    },
  },
});
export const { setProfile } = userReducer.actions;
export default userReducer.reducer;
