import axios from '../api.js';

export const login = (username, password) => {
    return async (dispatch) => {
        dispatch({ type: 'LOGIN_REQUEST' });

        try {
            const response = await axios.post('/user/login', { username, password });
            const { token, user } = response.data;
            dispatch({ type: 'LOGIN_SUCCESS', payload: { token, username } });
        } catch (error) {
            dispatch(userError(error.message));
        }
    };
};

export const createAccount = (username, password, email, phone) =>{
    return async (dispatch) =>{
        try{
            const response = await axios.post('/user/create', { username, password, phone, email });
            dispatch(login(username,password));
        } catch (error) {
            dispatch(userError(error.message));
        }
    }
};

export const fetchQrData = () =>{
    return async (dispatch, getState) =>{
        const token = getState().user.token;
        try{
            const response = await axios.get('/user/qrIdentifier',
                {
                    token: `Bearer: ${token}`
                });
            dispatch(setQrCodeReady(true));
            dispatch(setQrCodeData(response.qrIdentifier));
        } catch(error) {
            dispatch(setQrCodeReady(false));
            dispatch(userError(error.message));
        }
    };
};
export const userError = (error) =>{
    return {
        type: 'USER_ERROR',
        payload: error,
    }
}
export const setUsername = (username) => {
    return {
        type: 'SET_USERNAME',
        payload: username,
    };
};

export const setIsLoggedIn = (loggedIn) => {
    return {
        type: 'SET_ISLOGGEDIN',
        payload: loggedIn,
    };
};

export const setQrCodeReady = (qrCodeReady) => {
    return {
        type: 'SET_QRCODEREADY',
        payload: qrCodeReady,
    };
};
export const setQrCodeData = (qrCodeData) => {
    return {
        type: 'SET_QRCODEDATA',
        payload: qrCodeData,
    };
};

export const setToken = (token) => {
    return {
        type: 'SET_TOKEN',
        payload: token,
    };
};
