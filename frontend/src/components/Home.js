import React, { useEffect } from 'react';
import { View, Text } from 'react-native';
import { fetchQrData } from '../redux/userSlice.js';
import { useSelector, useDispatch } from 'react-redux';
import QRCode from 'qrcode.react';
import socket from '../socket.js';

const Home = () =>{
    const user = useSelector((state) => state.user);
    const dispatch = useDispatch();
    useEffect(() => {
        if(user.isLoggedIn){
            socket.auth = {token: user.token} ;
            socket.connect();
        }
        else{
            socket.disconnect();
        }
        socket.on('createTicketConfirmation', (data) => {
            Alert.alert('Confirm Ticket Popup',
            "Confirming entrance to: " + data.lotName,
            [
                {text: 'Confirm', onPress: handleConfirmPopup(data)},
                {text: 'Reject', onPress: handleRejectPopup(data)},
            ], { cancelable: false});
            
        });
        return () => {
            socket.off('popup');
        };
    }, [user.isLoggedIn])

    useEffect(() => {
        if(!user.qrDataReady){
            dispatch(fetchQrData());
        }
    }, [user.qrCodeData, fetchQrData]);

    const handleConfirmPopup = (data) => {
        socket.emit('confirmTicket', data)
    }
    const handleRejectPopup = (data) => {
        console.log("Rejected checking in to: ", data.lotName);
    }
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
