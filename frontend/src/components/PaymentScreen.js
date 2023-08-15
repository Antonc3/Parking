import React, { useEffect} from 'react';
import { View, Text} from 'react-native';
import { useSelector, useDispatch } from 'react-redux';
import { fetchPaymentMethods, setActivePaymentMethod, addPaymentMethod } from '../redux/paymentSlice';
import { CheckBox } from '@rneui/themed';
import AddPaymentMethod from './AddPaymentMethod';
import DataStatus from '../status/DataStatus';
import styles from '../style/style';

const PaymentScreen = () => {
    const dispatch = useDispatch();
    const { paymentMethods, paymentStatus, activePaymentId, error } = useSelector((state) => state.payment)

    useEffect(() => {
        console.log("dispatching fetch paymentMethodds");
        dispatch(fetchPaymentMethods()); // Fetch payment methods from API on component mount
    }, [dispatch]);

    const handlePaymentMethodChange = (paymentMethodId) => {
        dispatch(setActivePaymentMethod({activePaymentId: paymentMethodId}));
    };

    const handlePaymentMethodAdded = (paymentMethod) => {
        dispatch(addPaymentMethod(paymentMethod));
    };

    if(paymentStatus === DataStatus.SUCCESS){
        console.log("Payment methods: ",paymentMethods);
        return (
            <View>
                <Text style={styles.header1}>Select Payment Method</Text>
                {paymentMethods.length===0 ? <View style={styles.container}>
                    <Text>No Available Payment Methods, Please Add One
                    </Text>
                </View> : 
                paymentMethods.map((paymentMethod) => (
                    <View key={paymentMethod.id} style={styles.container}>
                        <CheckBox
                        title={"Last 4: " + paymentMethod.card.last4 + " - Brand: " + paymentMethod.card.brand}
                        value={paymentMethod.id}
                        checked={activePaymentId===paymentMethod.id}
                        onPress={() => handlePaymentMethodChange(paymentMethod.id)}
                        />
                    </View>
                ))}

                <AddPaymentMethod onSuccess={handlePaymentMethodAdded} />
            </View>
        );
    }
    if(paymentStatus===DataStatus.ERROR){
        return <Text>ERROR: {error}</Text>
    }
    return (
        <Text>Loading...</Text>
    )
};

export default PaymentScreen;
