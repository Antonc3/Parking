import { combineReducers } from 'redux';
import userReducer from './userSlice';
import paymentReducer from './paymentSlice';

const rootReducer = combineReducers({
  user: userReducer,
  payment: paymentReducer,
});

export default rootReducer;
