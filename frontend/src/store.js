import { configureStore, applyMiddleware} from 'redux';
import thunk from 'redux-thunk';
import rootReducer from './reducers/index'; // Import your root reducer

const store = configureStore(rootReducer, applyMiddleware(thunk)); // Create the Redux store

export default store;
