import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import  AsyncStorage from '@react-native-async-storage/async-storage'
import axios from 'axios'

export const login = createAsyncThunk(
    'user/login',
    async ({username, password}, {dispatch, getState,rejectWithValue}) =>{
        console.log("LOGIN:",username,password)
        const {isLoggedIn} = getState().user;
        if(isLoggedIn) {
            return rejectWithValue("Already logged in");
        }
        try {
            console.log(axios.defaults.baseURL);
            const response = await axios.post('/user/login', { username, password });
            console.log("login: ", response.data);
            const { token } = response.data;
            await AsyncStorage.setItem('loginToken',token);
            await AsyncStorage.setItem('username',username);
            await dispatch(loadTokenFromStorage());
        } catch (error) {
            console.log(error)
            console.log(error.message);
            return rejectWithValue(error.message)
        }
    }
)
export const createAccount = createAsyncThunk(
    'auth/create',
    async ({username,password,email,phone}, {dispatch, rejectWithValue}) =>{
        try{
            console.log(username,password,email,phone)
            const response = await axios.post('/user/create', { username, password, phone, email });
            await dispatch(login({username,password}));
        } catch (error) {
            console.log(error)
            return rejectWithValue(error.message);
        }
    }
)
export const loadTokenFromStorage = createAsyncThunk(
    'auth/loadTokenFromStorage',
    async (_,{dispatch, rejectWithValue}) => {
        try{
            const token = await AsyncStorage.getItem("loginToken");
            console.log("TOKEN: ", token);
            const username = await AsyncStorage.getItem("username");
            console.log("username: ", username);
            if(token) {
                console.log(token);
                try{
                    const response = await axios.get('checkTokenValid');
                    console.log(response.data);
                }catch(error){
                    console.log(error, error.message, error.cause)
                    await dispatch(logout());
                    return rejectWithValue(error.message);
                }
                axios.defaults.headers.common = { 'Authorization': `Bearer: ${token}` };
                console.log("SUCCESSFULLY DID SHIT: ", username);
                return { username };
            }
            console.log("no valid token in async storage");
            return rejectWithValue("NO valid token");
        } catch(error) {
            console.error('Error loading token from storage: ', error);
            return rejectWithValue(error.message);
        }
    }
)
export const logout = createAsyncThunk(
    'auth/logout',
    async (_,{rejectWithValue}) => {
        try{
            await AsyncStorage.removeItem("loginToken");
            await AsyncStorage.removeItem("username");
            axios.defaults.headers.common = {'Authorization': ''};
            console.log("SUCCESSFULLY LOGGED OUT");
        } catch(error) {
            console.error('Error removing token from storage: ', error);
            return rejectWithValue(error.message);
        }
    }
)
const initialState = {
    username: '',
    isLoggedIn: false,
    error: null,
}

const authSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {
        clearErrors: (state) => {
            state.error = null;
        }
    },
    extraReducers: (builder) =>{
        builder
        .addCase(logout.fulfilled,
            (state) =>{
                state = initialState;
            }
        )
        .addCase(loadTokenFromStorage.fulfilled, 
            (state, action) => {
                state.isLoggedIn = true;
                state.username = action.payload.username;
            })
        .addMatcher(
            (action) => action.type.endsWith('/pending'),
            (state) =>{
                state.error = null;
            }
        )
        .addMatcher(
            (action) => action.type.endsWith('/rejected'),
            (state, action) =>{
                state.error = action.payload;
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
export const { clearErrors } = authSlice.actions;
export default authSlice.reducer;