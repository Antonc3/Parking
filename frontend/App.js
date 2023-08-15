import { Provider } from 'react-redux';
import store from './src/store';
import React from 'react' ;
import  Constants from 'expo-constants';
import { StripeProvider } from '@stripe/stripe-react-native';
import MainNavigation from './src/components/MainNavigation';


export default App = () => {
    return (
        <Provider store={store}>
        <StripeProvider 
        publishableKey={Constants.expoConfig.extra.STRIPE_PUB_KEY}
        merchantIdentifier="merchant.com.parkingpay1234"
        >
            <MainNavigation />
            </StripeProvider>
        </Provider>
    );
}

