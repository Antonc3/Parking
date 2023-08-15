import React, {useEffect} from 'react';
import { View, ActivityIndicator, Text} from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { loadTokenFromStorage } from '../redux/authSlice';
import DataStatus from '../status/DataStatus';

const SplashScreen = ({navigation}) => {
    const dispatch = useDispatch();
    const loadingToken = useSelector((state) => state.auth.loadingToken);
    useEffect(()=>{
        dispatch(loadTokenFromStorage());
    }, [])
    useEffect(() => {
        if(loadingToken === DataStatus.SUCCESS){
            navigation.replace('Home');
        }
        else if(loadingToken === DataStatus.ERROR){
            navigation.replace('Login')
        }
    }, [loadingToken]);
    return (
        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
            <ActivityIndicator size="large" />
            <Text>Loading...</Text>
        </View>
    );
}
export default SplashScreen;