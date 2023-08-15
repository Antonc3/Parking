import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from '../api'
import { logout } from "./authSlice";
import DataStatus from "../status/DataStatus";

export const fetchPaymentMethods = createAsyncThunk(
    'payment/fetchPaymentMethods',
    async (_, { rejectWithValue }) => {
        try {
            const response = await axios.get('/user/payment/getPaymentMethods');
            const {paymentMethods, activePaymentId} = response.data;
            return {
                paymentMethods,
                activePaymentId,
            }
        } catch (error) {
            console.log("FETCH PAYMENT METHODS ERROR: ", error)
            return rejectWithValue(error.message)
        }
    }
)

export const setActivePaymentMethod = createAsyncThunk(
    'payment/setActivepaymentMethod' ,
    async ({ activePaymentId }, { rejectWithValue}) => {
        try {
            const response = await axios.put('/user/payment/changeActivePaymentMethod',
                {
                    activePaymentId,
                }
            );
            return activePaymentId;
        } catch (error) {
            console.log("set active payment method: ", error);
            return rejectWithValue(error.message);
        }
    }
)
export const addPaymentMethod = createAsyncThunk(
    'payment/addPaymentMethod',
    async (paymentMethod, { rejectWithValue, dispatch }) => {
        try {
            const response = await axios.post('/user/payment/saveCard',
                {
                    paymentMethodId: paymentMethod.id,
                }
            );
            dispatch(fetchPaymentMethods());
        } catch (error) {
            return rejectWithValue(error.message)
        }
    }

)
const initialState = {
    paymentMethods: [],
    activePaymentId: '',
    paymentStatus: DataStatus.IDLE,
    error: null,
}
const paymentSlice = createSlice({
    name: 'payment',
    initialState,
    reducers: {
    },
    extraReducers: (builder) => {
        builder
            .addCase(logout,
                (state) => {
                    state.paymentMethods = [];
                    state.activePaymentId = '';
                    state.paymentStatus = DataStatus.IDLE;
                    state.error = null;
                }
            )
            .addCase(fetchPaymentMethods.fulfilled,
                (state, action) => {
                    state.paymentMethods = action.payload.paymentMethods;
                    state.activePaymentId = action.payload.activePaymentId;
                }
            )
            .addCase(setActivePaymentMethod.fulfilled,
                (state, action) => {
                    state.activePaymentId = action.payload;
                }
            )
            .addMatcher(
                (action) => action.type.endsWith('/rejected'),
                (state, action) => {
                    state.error = action.payload
                    state.paymentStatus = DataStatus.ERROR;
                }
            )
            .addMatcher(
                (action) => action.type.endsWith('/pending'),
                (state) => {
                    state.error = null;
                    state.paymentStatus = DataStatus.LOADING;
                }
            )
            .addMatcher(
                (action) => action.type.endsWith('/fulfilled'),
                (state) => {
                    state.error = null;
                    state.paymentStatus = DataStatus.SUCCESS;
                }
            )
    },
});
export default paymentSlice.reducer;