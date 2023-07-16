import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from '../api'
import DataStatus from "../status/DataStatus";

export const fetchPaymentMethods = createAsyncThunk(
    'payment/fetchPaymentMethods',
    async (_, { getState, rejectWithValue }) => {
        const token = getState().user.token;
        try {
            const response = await axios.get('/user/payment/getPaymentMethods',
                {
                    token: `Bearer: ${token}`,
                }
            );
            const paymentMethods = response.paymentMethods;
            const activePaymentId = response.activePaymentId;
            return {
                paymentMethods,
                activePaymentId,
            }
        } catch (error) {
            return rejectWithValue(error.message)
        }
    }
)

export const setActivePaymentMethod = createAsyncThunk(
    'payment/setActivepaymentMethod',
    async ({ activePaymentId }, { rejectWithValue, getState }) => {
        const token = getState().user.token;
        try {
            const response = await axios.put('/user/payment/changeActivePaymentMethod',
                {
                    token: `Bearer: ${token}`,
                    activePaymentId,
                }
            );
            return activePaymentId;
        } catch (error) {
            return rejectWithValue(error.message);
        }
    }
)
export const addPaymentMethod = createAsyncThunk(
    'payment/addPaymentMethod',
    async (paymentMethod, { getState, rejectWithValue }) => {
        const token = getState().user.token;
        try {
            const response = await axios.post('/user/payment/saveCard',
                {
                    token: `Bearer: ${token}`,
                    paymentMethod: paymentMethod.id,
                }
            );
            return paymentMethod;
        } catch (error) {
            return rejectWithValue(error.message)
        }
    }

)
const initialState = {
    paymentMethods: [],
    activePaymentId: '',
    paymentStatus: DataStatus.IDLE,
    error: '',
}
const paymentSlice = createSlice({
    name: 'payment',
    initialState,
    reducers: {
        logout: (state) => {
            state = initialState;
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(fetchPaymentMethods.fulfilled,
                (state, action) => {
                    state.paymentMethods = action.payload.paymentMethods;
                    state.activePaymentId = action.payload.activePaymentId;
                }
            )
            .addCase(addPaymentMethod.fulfilled,
                (state, action) => {
                    state.paymentMethod.push(action.payload);
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
export const { logout } = paymentSlice.actions;
export default paymentSlice.reducer;