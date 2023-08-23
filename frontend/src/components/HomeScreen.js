import React, { useEffect } from 'react';
import { Alert, View, Text, ScrollView} from 'react-native';
import { fetchQrData } from '../redux/userSlice.js';
import { fetchTicketHistory } from "../redux/paymentSlice.js"
import { useSelector, useDispatch } from 'react-redux';

import QRCode from 'react-native-qrcode-svg';
//seperate socket into a different file some day
import { io } from 'socket.io-client';
import styles from '../style/style.js';

import { Dimensions } from 'react-native';
import Constants from 'expo-constants';

import TicketList from './TicketList.js';

const HomeScreen = () =>{
    const user = useSelector((state) => state.user);
    const auth = useSelector((state) => state.auth);
    const { activeTicket} = useSelector ((state) => state.payment);
    const dispatch = useDispatch();
    var socket;
    useEffect(() => {
        dispatch(fetchTicketHistory());
    }, [])
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
                        { text: 'Confirm', onPress: ()=>handleConfirmPopup(data) },
                        { text: 'Reject', onPress: ()=>handleRejectPopup(data) },
                    ], { cancelable: false });

            });
            socket.on('ticketCreated', () => {
                dispatch(fetchTicketHistory());
            })
            socket.on('ticketEnded', () => {
                dispatch(fetchTicketHistory());
            })
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
        console.log("CONFIRMING TICKET!")
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
        <ScrollView>
            <View style={styles.container}>
                <View>
                <QRCode
                value={user.qrCodeData} 
                size={Dimensions.get('window').width-32}
                />
                </View>
            </View>
            <View style={styles.container}>
            {
            (activeTicket === null) ?
            <Text style={styles.header1}>
                There is no active ticket!
            </Text> :
            <>
                <Text>Lot Name: {activeTicket.lotName}</Text>
                <Text>Lot Location: {activeTicket.lotLocation}</Text>
                <Text>Date Entered: {new Date(activeTicket.timeEntered).toString}</Text>
            </>
            }
            </View>
            <TicketList />
        </ScrollView>
    );
};
export default (HomeScreen);
