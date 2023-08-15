import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import PaymentScreen from "./PaymentScreen";
import HomeScreen from "./HomeScreen";
import ProfileScreen from "./ProfileScreen";
import React from "react";

const Tab = createBottomTabNavigator();

const MainTabNavigator = () => {
    return (
        <Tab.Navigator initialRouteName="Home">
            <Tab.Screen name="Home" component={HomeScreen} />
            <Tab.Screen name="Payment" component={PaymentScreen} />
            <Tab.Screen name="Profile" component={ProfileScreen}/>
        </Tab.Navigator>
    )
}
export default MainTabNavigator;