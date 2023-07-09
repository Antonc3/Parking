const initialState = {
    username: '',
    token: ''
    qrCodeData: '',
    isLoggedIn: false,
};

const userReducer = (state = initialState, action) => {
  switch (action.type) {
    case 'SET_USERNAME':
      return { ...state, username: action.payload };
    case 'SET_TOKEN':
      return { ...state, token: action.payload };
    case 'SET_ISLOGGEDIN':
      return { ...state, isLoggedIn: action.payload };
    case 'SET_QRCODEDATA':
      return { ...state, qrCodeData: action.payload };
    default:
      return state;
  }
};

export default userReducer;
