import React, { useEffect } from 'react';
import { View, Text } from 'react-native';
import { fetchQrData } from '../redux/userSlice.js';
import { useSelector, useDispatch } from 'react-redux';
import QRCode from 'react-native-qrcode-svg';
import { io } from 'socket.io-client';
import Constants from 'expo-constants';

const HomeScreen = () =>{
    const user = useSelector((state) => state.user);
    const auth = useSelector((state) => state.auth);
    const dispatch = useDispatch();
    var socket;
    useEffect(() => {
        if(auth.isLoggedIn){
            socket = io(Constants.expoConfig.extra.REACT_APP_BACKEND_URL,
                {
                    transports: ['websocket'],
                    auth: {
                        token: auth.token
                    }
                }
            )
            console.log("CONNECTING SOCKET");
            socket.on('connect', () => {
                console.log("SOCKET CONNECTED!@@!@!");
            })
            socket.on('createTicketConfirmation', (data) => {
                console.log("CONFIRM TICKET CREATION");
                Alert.alert('Confirm Ticket Popup',
                    "Confirming entrance to: " + data.lotName,
                    [
                        { text: 'Confirm', onPress: handleConfirmPopup(data) },
                        { text: 'Reject', onPress: handleRejectPopup(data) },
                    ], { cancelable: false });

            });
            return () => {
                socket.disconnect();
            }
        }
        return () => {
            socket.off('popup');
        };
    }, [auth.isLoggedIn])

    useEffect(() => {
        console.log("QR DATA READY: ",user.qrDataReady);
        if(!user.qrDataReady){
            dispatch(fetchQrData());
        }
    }, [user.qrCodeData]);

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
export default (HomeScreen);
