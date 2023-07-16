import { configureStore } from '@reduxjs/toolkit'
import rootReducer from './redux/index'; // Import your root reducer
import requireLoginMiddleware from './redux/requireLoginMiddleware'

const store = configureStore({
    reducer: rootReducer,
    middleware: (getDefaultMiddleware) => [...getDefaultMiddleware(), requireLoginMiddleware]
}); // Create the Redux store

export default store;
