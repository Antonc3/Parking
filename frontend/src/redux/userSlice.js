import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { logout } from "./authSlice";
import axios from 'axios'

export const fetchQrData = createAsyncThunk(
    'user/fetchQrData',
    async (_, {getState,rejectWithValue}) => {
        console.log(token);
        try{
            const response = await axios.get('/user/qrIdentifier');
            console.log(response.data);
            return response.data.qrIdentifier;
        } catch(error) {
            console.log(error);
            return rejectWithValue(error.message)
        }
    }
)


const initialState = {
    qrCodeData: '',
    qrCodeReady: false,
    message: '',
};

const userSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {
        resetQr: (state) =>{
            qrCodeData = '';
            qrCodeReady = false;
        },

    },
    extraReducers: (builder) =>{
        builder
        .addCase(fetchQrData.fulfilled,
            (state, action) =>{
                state.qrCodeData = action.payload;
                state.qrCodeReady = true;
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