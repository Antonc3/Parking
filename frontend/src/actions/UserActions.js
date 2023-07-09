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
