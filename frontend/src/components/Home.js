import React, { useEffect } from 'react';
import { View, Text } from 'react-native';
import { fetchQrData } from '../redux/userSlice.js';
import { useSelector, useDispatch } from 'react-redux';
import QRCode from 'qrcode.react';

const Home = () =>{
    const user = useSelector((state) => state.user);
    const dispatch = useDispatch();
    useEffect(() => {
        if(!user.qrDataReady){
            dispatch(fetchQrData());
        }
    }, [user.qrCodeData, fetchQrData]);
    //add loading image later
    if(user.error){
        return (<View>
            <Text>Error: {user.error}</Text>
        </View>
        );
    }
    if (!user.qrDataReady) {
        return (<View>
            <Text>Loading...</Text>
        </View>
        );
    }
    return (
        <View>
            <QRCode value={user.qrCodeData} />
        </View>
    );
};
export default (Home);
