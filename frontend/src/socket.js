import io from 'socket.io-client';
import Constants from 'expo-constants';

const socket = io(Constants.expoConfig.extra.REACT_APP_BACKEND_URL, {
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