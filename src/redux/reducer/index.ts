import { combineReducers } from '@reduxjs/toolkit';
import authReducer from './authReducer';
import navigationReducer from './navigationReducer';
import notificationsReducer from './notificationsReducer';
import paymentOrderReducer from './paymentOrderReducer';
import ticketReducer from './ticketReducer';
import userReducer from './userReducer';
import withDraw from './withDraw';

const rootReducer = combineReducers({
  authReducer,
  ticketReducer,
  paymentOrderReducer,
  notificationsReducer,
  userReducer,
  navigationReducer,
  withDraw,
});

export default rootReducer;
