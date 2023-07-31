import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch} from 'react-redux';
import { login } from '../redux/userSlice';
import { View, Text, TextInput, TouchableOpacity} from 'react-native';


const LoginScreen = ({ navigation}) => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const user = useSelector((state) => state.user);
    const dispatch = useDispatch();

    useEffect(() =>{
        if(user.isLoggedIn){
            navigation.navigate('Home');
        }
    }, [user.isLoggedIn]);
    const handleLogin = () => {
        dispatch(login({username,password}));
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
        keyboardType="default"
        autoCapitalize="none"
        />

        <TextInput
        placeholder="Password"
        onChangeText={(text) => setPassword(text)}
        value={password}
        secureTextEntry
        />

        {user.error &&
            (
            <View>
                <Text>Error: {user.error}</Text>
            </View>
            )
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

export default (LoginScreen);
