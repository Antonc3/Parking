import React from 'react';
import { connect } from 'react-redux';

const withAuthentication = (WrappedComponent) => {
  const AuthenticationCheck = ({ navigation, isLoggedIn, ...props }) => {
    if (!isLoggedIn) {
      // Redirect the user to the login page if not logged in
      navigation.replace('Login');
      return null;
    }

    return <WrappedComponent {...props} />;
  };

  const mapStateToProps = (state) => {
    return {
      isLoggedIn: state.user.isLoggedIn,
    };
  };

  return connect(mapStateToProps)(AuthenticationCheck);
};

export default withAuthentication;
