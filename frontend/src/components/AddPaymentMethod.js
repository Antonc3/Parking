import React, { useState } from 'react';
import { View, Text, TouchableOpacity, Alert } from 'react-native'
import { CardField, useStripe } from '@stripe/stripe-react-native';
import { Button } from '@rneui/themed';
import styles from '../style/style';

const AddPaymentMethod = ({ onSuccess }) => {
    const { createPaymentMethod } = useStripe();
    const [loading, setLoading] = useState(false);

    const handleAddPaymentMethod = async () => {
        setLoading(true);

        try {
            const { paymentMethod, error } = await createPaymentMethod({
                paymentMethodType: 'Card'
            });

            if (error) {
                Alert.alert('Error', error.message);
            } else {
                onSuccess(paymentMethod);
            }
        } catch (error) {
            console.log('Error:', error);
            Alert.alert('Error', 'Failed to add payment method.');
        }

        setLoading(false);
    };
    return (
        <View style={styles.container}>
            <Text style={styles.header2}>Add Payment Method</Text>
            <CardField
                postalCodeEnabled={false}
                placeholder={{
                    number: '4242 4242 4242 4242',
                }}
                cardStyle={{
                    backgroundColor: '#FFFFFF',
                    textColor: '#000000',
                }}
                style={styles.cardField}
            />
            <Button onPress={handleAddPaymentMethod} disabled={loading}>
                Add
            </Button>
        </View>
    );
};

export default AddPaymentMethod;