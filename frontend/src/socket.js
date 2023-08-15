import io from 'socket.io-client';
import Constants from 'expo-constants';

const socket = io("ws:/10.0.2.2:3000", {
    transports: ['websocket'],
    autoConnect: false,
});


socket.on('connect', () => {
    console.log('Socket connected');
})
socket.on('dissconnect', (reason) => {
    console.log('Socket dissconnected: ', reason);
})

export default socket;