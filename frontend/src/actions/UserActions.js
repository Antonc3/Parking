export const setUsername = (username) => {
  return {
    type: 'SET_USERNAME',
    payload: username,
  };
};

export const setToken = (token) => {
  return {
    type: 'SET_TOKEN',
    payload: token,
  };
};
