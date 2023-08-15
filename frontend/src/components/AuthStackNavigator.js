import LoginScreen from './LoginScreen.js';
import CreateAccount from './CreateAccountScreen.js';
import SplashScreen from './SplashScreen.js';
import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';

const Stack = createStackNavigator();

const AuthStackNavigator= () => {
    return (
        <Stack.Navigator initialRouteName='Splash'>
            <Stack.Screen name="Splash" component={SplashScreen} />
            <Stack.Screen name="Login" component={LoginScreen} />
            <Stack.Screen name="CreateAccount" component={CreateAccount} />
        </Stack.Navigator>
    )
}
export default AuthStackNavigator;