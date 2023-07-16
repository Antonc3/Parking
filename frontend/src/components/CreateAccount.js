import React, { useState, useEffect} from 'react';
import { Text,View, TextInput, Button } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { createAccount } from '../redux/userSlice.js';


const CreateAccountScreen = ({ navigation }) => {
    const [username, setUsername_] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [email, setEmail] = useState('');
    const [phoneNumber, setPhoneNumber] = useState('');
    const [validFields, setValidFields] = useState({
        username: true,
        password: true,
        confirmPassword: true,
        email: true,
        phoneNumber: true,
    });
    const user = useSelector((state) => state.user);
    const dispatch = useDispatch();
    useEffect(() =>{
        if(user.isLoggedIn){
            navigation.navigate('Home');
        }
    },[user.isLoggedIn]);

    const handleCreateAccount = () => {
        const fieldsValid = validateFields();
        if (!fieldsValid) {
            return;
        }
        console.log(username,password,email,phoneNumber)
        dispatch(createAccount({username,password,email,phone:phoneNumber}));
    };

    const validateFields = () => {
        let isValid = true;
        var updatedValidFields = {
            username: true,
            password: true,
            confirmPassword: true,
            email: true,
            phoneNumber: true,
        };

        if (password !== confirmPassword) {
            updatedValidFields.password = false;
            updatedValidFields.confirmPassword = false;
            isValid = false;
        }

        if (!validateEmail(email)) {
            updatedValidFields.email = false;
            isValid = false;
        }

        if (!validatePhoneNumber(phoneNumber)) {
            updatedValidFields.phoneNumber = false;
            isValid = false;
        }

        setValidFields(updatedValidFields);
        return isValid;
    };


    const validateEmail = (email) => {
        // Email validation logic (you can use regex or any other validation library)
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailRegex.test(email);
    };

    const validatePhoneNumber = (phoneNumber) => {
        // Phone number validation logic (you can use regex or any other validation library)
        const phoneRegex = /^[0-9]{10}$/;
        return phoneRegex.test(phoneNumber);
    };

    return (
        <View >
        <TextInput
        placeholder="Username"
        value={username}
        onChangeText={(text) => setUsername_(text)}
        />
        <TextInput
        placeholder="Password"
        secureTextEntry
        value={password}
        onChangeText={(text) => setPassword(text)}
        />
        <TextInput
        placeholder="Confirm Password"
        secureTextEntry
        value={confirmPassword}
        onChangeText={(text) => setConfirmPassword(text)}
        />
        {!validFields.password && <Text >Passwords do not match</Text>}
        <TextInput
        placeholder="Email"
        keyboardType="email-address"
        value={email}
        onChangeText={(text) => setEmail(text)}
        />
        {!validFields.email && <Text >Invalid email</Text>}
        <TextInput
        placeholder="Phone Number"
        keyboardType="phone-pad"
        value={phoneNumber}
        onChangeText={(text) => setPhoneNumber(text)}
        />
        {!validFields.phoneNumber && <Text >Invalid phone number</Text>}
        {user.error &&
            (<View>
                <Text>
                    Error: {user.error}
                </Text>
            </View>)
        }

        <Button title="Create Account" onPress={handleCreateAccount} />
        </View>
    );
};

export default CreateAccountScreen;

