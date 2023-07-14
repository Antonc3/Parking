import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { login } from '../actions/UserActions.js';
import { View, Text, TextInput, TouchableOpacity, StyleSheet } from 'react-native';


const LoginScreen = ({ navigation, user, login}) => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');

    useEffect(() =>{
        if(user.isLoggedIn){
            navigation.navigate('Home');
        }
    }, [user.isLoggedIn]);
    const handleLogin = () => {
        login(username,password);
    };

    const handleCreateAccount = () => {
        navigation.navigate('CreateAccount');
    };

    return (
        <View>
        <Text>Login</Text>

        <TextInput
        placeholder="Username"
        onChangeText={(text) => setUsername(text)}
        value={username}
        keyboardType="Username"
        autoCapitalize="none"
        />

        <TextInput
        placeholder="Password"
        onChangeText={(text) => setPassword(text)}
        value={password}
        secureTextEntry
        />

        {user.error &&
            (<div>
                <p>Error: {user.error}</p>
                </div>)
        }

        <TouchableOpacity onPress={handleLogin}>
        <Text >Login</Text>
        </TouchableOpacity>

        <TouchableOpacity onPress={handleCreateAccount}>
        <Text >Create Account</Text>
        </TouchableOpacity>
        </View>
    );
};
const mapStateToProps = (state) => {
    return {
        user: state.user,
    };
};
const mapDispstachToProps = {
    login,
}


export default connect(mapStateToProps,mapDispstachToProps)(LoginScreen);
