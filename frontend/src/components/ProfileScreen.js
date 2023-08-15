import React from "react";
import { logout } from "../redux/authSlice";
import { Button } from "@rneui/themed";
import { useDispatch } from "react-redux";

const ProfileScreen = () => {
    const dispatch = useDispatch();
    const handleButtonPress = () => {
        dispatch(logout());
    }
    return (
        <Button
        onPress={handleButtonPress}
        >
        Logout     
        </Button>

    )
}
export default ProfileScreen;