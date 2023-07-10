import { createStore } from 'redux';
import thunk from 'redux-thunk';
import rootReducer from './reducers'; // Import your root reducer

const store = createStore(rootReducer, applyMiddleware(thunk)); // Create the Redux store

export default store;
