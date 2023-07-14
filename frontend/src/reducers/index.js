import { combineReducers } from 'redux';
import userReducer from './userReducer';
import paymentReducer from './paymentReducer';

const rootReducer = combineReducers({
  user: userReducer,
  payment: paymentReducer,
});

export default rootReducer;
