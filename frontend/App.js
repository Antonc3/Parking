import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

import { Provider } from 'react-redux';
import store from './src/store';
import { loadTokenFromStorage } from './src/redux/userSlice';

import React, { useEffect } from 'react' ;

import LoginScreen from './src/components/LoginScreen.js';
import CreateAccount from './src/components/CreateAccount.js';
import PaymentScreen from './src/components/PaymentScreen.js';
import Home from './src/components/Home.js';
import withAuthentication from './src/components/withAuthentication.js';

const Stack = createStackNavigator();

export default App = () => {
    useEffect(() => {
        store.dispatch(loadTokenFromStorage);
    }, []);
    return (
        <Provider store={store}>
            <NavigationContainer>
                <Stack.Navigator initialRouteName="Home">
                    <Stack.Screen name="Home" component={withAuthentication(Home)} />
                    <Stack.Screen name="Payment" component={withAuthentication(PaymentScreen)} />
                    <Stack.Screen name="Login" component={LoginScreen} />
                    <Stack.Screen name="CreateAccount" component={CreateAccount} />
                </Stack.Navigator>
            </NavigationContainer>
        </Provider>
    );
}

