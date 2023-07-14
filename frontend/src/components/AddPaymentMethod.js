import React, { useState } from 'react';
import { Constants } from 'expo-constants';
import { View, Text, TouchableOpacity, Alert } from 'react-native'
import { CardField, useStripe } from '@stripe/stripe-react-native';

const AddPaymentMethod = ({ onSuccess }) => {
  const { createPaymentMethod } = useStripe();
  const [loading, setLoading] = useState(false);

  const handleAddPaymentMethod = async () => {
    setLoading(true);

    try {
      const { paymentMethod, error } = await createPaymentMethod({
        type: 'Card',
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
    <View>
      <Text>Add Payment Method</Text>
        <StripeProvider 
        publishableKey={Constants.expoConfig.extra.STRIPE_PUB_KEY}
        merchantIdentifier="merchant.com.parkingpay1234"
        >
        <CardField
          postalCodeEnabled={false}
          placeholder={{
            number: '4242 4242 4242 4242',
          }}
          cardStyle={{
            backgroundColor: '#FFFFFF',
            textColor: '#000000',
          }}
        />
      </StripeProvider>
      <TouchableOpacity onPress={handleAddPaymentMethod} disabled={loading}>
        <Text>Add</Text>
      </TouchableOpacity>
    </View>
  );
};

export default AddPaymentMethod;