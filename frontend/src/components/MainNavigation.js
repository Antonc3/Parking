import { useEffect } from "react";
import AuthStackNavigator from "./AuthStackNavigator";
import MainTabNavigator from "./MainTabNavigator";
import { NavigationContainer } from "@react-navigation/native";
import { useSelector } from "react-redux";

const MainNavigation = () => {
    const isLoggedIn = useSelector((state) => state.auth.isLoggedIn);
    useEffect(()=>{
    }, [isLoggedIn])
    return (
        <NavigationContainer>
            {isLoggedIn ? <MainTabNavigator /> : <AuthStackNavigator />}
        </NavigationContainer>
    )
}
export default MainNavigation;