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
        <Tab.Navigator>
            <Tab.Screen name="Home" component={HomeScreen} />
            <Tab.Screen name="Payment" component={withAuthentication(PaymentScreen)} />
            <Tab.Screen name="Login" component={LoginScreen} />
        </Tab.Navigator>
        </NavigationContainer>
        </Provider>
    );
}

