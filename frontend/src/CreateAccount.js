import React, { useState } from 'react';
import { View, TextInput, Button, StyleSheet } from 'react-native';

const CreateAccountScreen = ({ navigation }) => {
    const [username, setUsername] = useState('');
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

    const handleCreateAccount = () => {
        const fieldsValid = validateFields();
        if (!fieldsValid) {
            return;
        }

        // Implement your create account logic here
        // For simplicity, we'll just navigate to the login screen
        navigation.navigate('Login');
    };

    const validateFields = () => {
        let isValid = true;
        const updatedValidFields = { ...validFields };

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

    const confirmPasswordStyle = validFields.password ? styles.input : styles.inputError;
    const confirmPassErrorStyle = validFields.confirmPassword ? null : styles.errorText;
    const emailStyle = validFields.email ? styles.input : styles.inputError;
    const emailErrorStyle = validFields.email ? null : styles.errorText;
    const phoneStyle = validFields.phoneNumber ? styles.input : styles.inputError;
    const phoneErrorStyle = validFields.phoneNumber ? null : styles.errorText;

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
        <View style={styles.container}>
        <TextInput
        style={styles.input}
        placeholder="Username"
        value={username}
        onChangeText={(text) => setUsername(text)}
        />
        <TextInput
        style={styles.input}
        placeholder="Password"
        secureTextEntry
        value={password}
        onChangeText={(text) => setPassword(text)}
        />
        <TextInput
        style={confirmPasswordStyle}
        placeholder="Confirm Password"
        secureTextEntry
        value={confirmPassword}
        onChangeText={(text) => setConfirmPassword(text)}
        />
        {!validFields.password && <Text style={styles.errorText}>Passwords do not match</Text>}
        <TextInput
        style={emailStyle}
        placeholder="Email"
        keyboardType="email-address"
        value={email}
        onChangeText={(text) => setEmail(text)}
        />
        {!validFields.email && <Text style={styles.errorText}>Invalid email</Text>}
        <TextInput
        style={phoneStyle}
        placeholder="Phone Number"
        keyboardType="phone-pad"
        value={phoneNumber}
        onChangeText={(text) => setPhoneNumber(text)}
        />
        {!validFields.phoneNumber && <Text style={styles.errorText}>Invalid phone number</Text>}
        <Button title="Create Account" onPress={handleCreateAccount} />
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    input: {
        width: '80%',
        height: 40,
        borderWidth: 1,
        borderColor: 'gray',
        marginBottom: 10,
        paddingHorizontal: 10,
    },
    inputError: {
        width: '80%',
        height: 40,
        borderWidth: 1,
        borderColor: 'red',
        marginBottom: 10,
        paddingHorizontal: 10,
    },
    errorText: {
        color: 'red',
        marginBottom: 10,
    },
});

export default CreateAccountScreen;

