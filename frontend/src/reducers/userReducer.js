const initialState = {
    username: '',
    token: '',
    qrCodeData: '',
    qrCodeReady: false,
    isLoggedIn: false,
    error: null,
    message: ''
};

const userReducer = (state = initialState, action) => {
    switch (action.type) {
        case 'LOGOUT': 
            return {
                ...state,
                username: '',
                token: '',
                qrCodeData: '',
                qrCodeReady: false,
                isLoggedIn: false,
                error: null,
                message: 'Succesfully logged out',
            };
        case 'LOGIN_REQUEST':
            return { ...state, error: null};
        case 'LOGIN_SUCCESS':
            return {
                ...state,
                isLoggedIn: true,
                token: action.payload.token,
                username: action.payload.username,
                error: null
            };
        case 'USER_ERROR':
            return { ...state, error: action.payload };
        case 'SET_USERNAME':
            return { ...state, username: action.payload };
        case 'SET_TOKEN':
            return { ...state, token: action.payload };
        case 'SET_ISLOGGEDIN':
            return { ...state, isLoggedIn: action.payload };
        case 'SET_QRCODEREADY':
            return { ...state, qrCodeReady: action.payload };
        case 'SET_QRCODEDATA':
            return { ...state, qrCodeData: action.payload };
        default:
            return state;
    }
};

export default userReducer;
