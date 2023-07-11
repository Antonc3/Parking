import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

import { Provider } from 'react-redux';
import { store } from './src/store';

import { NativeModules } from 'react-native';
import dotenv from 'dotenv';

import { LoginScreen } from './src/components/LoginScreen.js';
import { CreateAccount } from './src/components/CreateAccount.js';
import { PaymentScreen } from './src/components/PaymentScreen.js';
import { HomeScreen } from './src/components/HomeScreen.js';
import { withAuthentication } from './src/components/withAuthentication.js';

const Stack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();
const { Config } = NativeModules;

dotenv.config({path: Config.MAIN_BUNDLE_PATH});


export default function App() {

    return (
        <Provider store={store}>
        <NavigationContainer>
        <Stack.Navigator initialRouteName="Home">
            <Stack.Screen name="Home" component={withAuthentication(HomeScreen)} />
            <Stack.Screen name="Payment" component={withAuthentication(PaymentScreen)} />
            <Stack.Screen name="Login" component={LoginScreen} />
            <Stack.Screen name="CreateAccount" component={CreateAccount} />
        </Stack.Navigator>
        </NavigationContainer>
        </Provider>
    );
}

