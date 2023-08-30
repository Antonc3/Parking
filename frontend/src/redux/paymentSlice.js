import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from '../api'
import { logout } from "./authSlice";
import DataStatus from "../status/DataStatus";

export const fetchPaymentMethods = createAsyncThunk(
    'payment/fetchPaymentMethods',
    async (_, { rejectWithValue }) => {
        try {
            const response = await axios.get('/user/payment/paymentMethods');
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

export const fetchTicketHistory = createAsyncThunk(
    'payment/fetchTicketHistory',
    async (_, {rejectWithValue}) => {
        try {
            console.log("TRYUING TO FETCH TICKET HSITOYR");
            const response = await axios.get('/user/payment/ticketHistory');
            console.log("fetching ticket history: ",response.data);
            return response.data;
        }
        catch(error){
            console.log(error);
            rejectWithValue(error);
        }
    }
)
const initialState = {
    paymentMethods: [],
    activePaymentId: '',
    ticketHistory: [],
    activeTicket: null,
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
            .addCase(fetchTicketHistory.fulfilled,
                (state, action) => {
                    state.ticketHistory = action.payload.tickets;
                    state.activeTicket = action.payload.activeTicket;
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