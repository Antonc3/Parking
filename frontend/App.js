import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

import { Provider } from 'react-redux';
import { store } from './src/store';

import { LoginScreen } from './src/LoginScreen.js';
import { PaymentScreen } from './src/PaymentScreen.js';
import { HomeScreen } from './src/HomeScreen.js';

const Stack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();
export default function App() {

    return (
        <Provider store={store}>
        <NavigationContainer>
        <Stack.Navigator>
            <Stack.Screen name="Login" component={LoginScreen}/>
        </Stack.Navigator>
        <Tab.Navigator>
            <Tab.Screen name="Home" component={HomeScreen} />
            <Tab.Screen name="Payment" component={PaymentScreen} />
            <Tab.Screen name="Login" component={LoginScreen} />
        </Tab.Navigator>
        </NavigationContainer>
        </Provider>
    );
}

