const socketIo = require('socket.io');

let io;

const setupSocket = (server) => {
  io = socketIo(server);

  // Socket.io setup
  io.on('connection', (socket) => {
    console.log('A user connected.');
  });
};

const getIoInstance = () => {
  return io;
};

module.exports = { setupSocket, getIoInstance };