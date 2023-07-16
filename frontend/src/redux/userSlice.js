import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from 'axios'
export const login = createAsyncThunk(
    'user/login',
    async ({username, password}, {getState,rejectWithValue}) =>{
        console.log("LOGIN:",username,password)
        const {isLoggedIn} = getState().user;
        if(isLoggedIn) {
            return rejectWithValue("Already logged in");
        }
        try {
            console.log(axios.defaults.baseURL);
            const response = await axios.post('/user/login', { username, password });
            const { token, user } = response.data;
            return {token, username:user};
        } catch (error) {
            console.log(error)
            return rejectWithValue(error.message)
        }
    }
)

export const createAccount = createAsyncThunk(
    'user/create',
    async ({username,password,email,phone}, {dispatch, rejectWithValue}) =>{
        try{
            console.log(username,password,email,phone)
            const response = await axios.post('/user/create', { username, password, phone, email });
            dispatch(login(username,password));
        } catch (error) {
            console.log(error)
            return rejectWithValue(error.message);
        }
    }
)

export const fetchQrData = createAsyncThunk(
    'user/fetchQrData',
    async (_, {getState,rejectWithValue}) => {
        const {token}= getState().user;
        try{
            const response = await axios.get('/user/qrIdentifier',
                {
                    token: `Bearer: ${token}`
                });
            return response.qrIdentifier;
        } catch(error) {
            return rejectWithValue(error.message)
        }
    }
)

const initialState = {
    username: '',
    token: '',
    qrCodeData: '',
    qrCodeReady: false,
    isLoggedIn: false,
    error: null,
    message: ''
};

const userSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {
        logout: (state) =>{
            state = initialState;
        },
        resetQr: (state) =>{
            qrCodeData = '';
            qrCodeReady = false;
        }
    },
    extraReducers: (builder) =>{
        builder
        .addCase(login.fulfilled,
            (state, action) =>{
                state.isLoggedIn = true;
                state.username = action.payload.username;
                state.token = action.payload.token;
            }
        )
        .addCase(fetchQrData.fulfilled,
            (state, action) =>{
                state.qrCodeData = action.payload;
                state.qrCodeReady = true;
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
    }
})
export const {logout, resetQr} = userSlice.actions;
export default userSlice.reducer;