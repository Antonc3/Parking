export default requireLoginMiddleware = (store) => (next) => (action) => {
  const { getState } = store;
  const { isLoggedIn } = getState().user; // Assuming 'isLoggedIn' is a flag indicating the user's login status

  // List of actions that require the user to be logged in
  const actionsRequiringLogin = ['user/fetchQrCode'];

  if (actionsRequiringLogin.includes(action.type) && !isLoggedIn) {
    // User is not logged in, prevent the action from being dispatched
    // You can handle the situation here, such as showing an error message or redirecting the user to the login screen
    console.log('User not logged in. Action blocked.');
    return;
  }

  // User is logged in or action doesn't require login, allow the action to proceed
  return next(action);
};