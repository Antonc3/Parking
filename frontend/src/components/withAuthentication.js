import React from 'react';
import { useSelector } from 'react-redux';

const withAuthentication = (WrappedComponent) => {
  const AuthenticationCheck = ({navigation, ...props }) => {
    const { isLoggedIn } = useSelector((state) => state.user);
    if (!isLoggedIn) {
      // Redirect the user to the login page if not logged in
      navigation.replace('Login');
      return null;
    }

    return <WrappedComponent {...props} />;
  };

  return AuthenticationCheck;
};

export default withAuthentication;
