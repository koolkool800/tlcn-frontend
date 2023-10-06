import { PayloadAction, createSlice } from '@reduxjs/toolkit';
import {
  RESELL,
  USER,
  getLocalStorage,
  getUserLocal,
  localHandler,
  saveLocalStorage,
} from '@utils/localStorage';
import { Auth } from 'interface';
import { UserType } from 'interface/user';

type AuthPayloadAction = PayloadAction<{
  accessToken: string;
  user: UserType;
  remember?: boolean;
}>;

/** * ** get user info in local storage */
const userLocal = getUserLocal();

const authInit: Auth = {
  name: userLocal?.name,
  email: userLocal?.email,
  accessToken: getLocalStorage(RESELL),
  state: '',
};

const handleLogin = (accessToken: string, user: UserType, remember = false) => {
  saveLocalStorage({
    data: accessToken,
    name: RESELL,
    type: remember ? 'storage' : 'session',
  });

  saveLocalStorage({
    data: JSON.stringify(user),
    name: USER,
    type: remember ? 'storage' : 'session',
  });
};

const authReducer = createSlice({
  name: 'authReducer',
  initialState: authInit,
  reducers: {
    resetState: () => {
      localHandler.deleteKey(RESELL);
      localHandler.deleteKey(USER);
      return { ...authInit, accessToken: '' };
    },
    infoUserBySNS: (state, action: PayloadAction<Auth>) => {
      return { ...state, ...action.payload };
    },
    login: (state, action: AuthPayloadAction) => {
      const { remember, accessToken, user } = action.payload;
      handleLogin(accessToken, user, remember);
      return { ...state, accessToken, name: user?.name, email: user?.email };
    },
    loginSNS: (state, action: AuthPayloadAction) => {
      const { accessToken, user } = action.payload;
      handleLogin(accessToken, user, true);
      return {
        ...state,
        ...action.payload,
        name: user?.name,
        email: user?.email,
      };
    },
  },
});
export const { resetState, infoUserBySNS, login, loginSNS } =
  authReducer.actions;
export default authReducer.reducer;
