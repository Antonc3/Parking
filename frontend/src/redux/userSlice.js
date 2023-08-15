import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { logout } from "./authSlice";
import axios from 'axios'

export const fetchQrData = createAsyncThunk(
    'user/fetchQrData',
    async (_, {rejectWithValue}) => {
        try{
            const response = await axios.get('/user/qrIdentifier');
            return response.data.qrIdentifier;
        } catch(error) {
            return rejectWithValue(error.message)
        }
    }
)

const initialState = {
    qrCodeData: '',
    qrDataReady: false,
    message: '',
};

const userSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {
        resetQr: (state) =>{
            state.qrCodeData = '';
            state.qrDataReady = false;
        },

    },
    extraReducers: (builder) =>{
        builder
        .addCase(fetchQrData.fulfilled,
            (state, action) =>{
                state.qrCodeData = action.payload;
                state.qrDataReady = true;
            }
        )
        .addCase(logout,
            (state) => {
                state = initialState;
            }
        )
        .addMatcher(
            (action) => action.type.endsWith('/rejected'),
            (state, action) =>{
                state.error = action.payload
            }
        )
        .addMatcher(
            (action) => action.type.endsWith('/pending'),
            (state) =>{
                state.error = null;
            }
        )
        .addMatcher(
            (action) => action.type.endsWith('/fulfilled'),
            (state) =>{
                state.error = null;
            }
        )
    }
})
export const {resetQr} = userSlice.actions;
export default userSlice.reducer;