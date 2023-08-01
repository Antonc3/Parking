import { combineReducers } from 'redux';
import userReducer from './userSlice';
import paymentReducer from './paymentSlice';
import authReducer from './authSlice';

const rootReducer = combineReducers({
  user: userReducer,
  payment: paymentReducer,
  auth: authReducer,
});

export default rootReducer;
