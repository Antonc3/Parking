const express = require('express');
const mongoose = require('mongoose');
const lotRoutes = require('./routes/lotRoutes');
const userRoutes = require('./routes/userRoutes');
const stripeRoutes = require('./routes/stripeRoutes');
const config = require('./config.js');
const cors = require('cors');
const { createServer  } = require('http');
const { setupSocket } = require("./socket");


const serverPort = config.server.port;

const app = express();
const httpServer = createServer(app);
setupSocket(httpServer);

app.use(express.json());
app.use(cors());

// Connect to MongoDB
const databaseUri = `mongodb+srv://${config.database.user}:${config.database.password}@${config.database.uri}/${config.database.name}?retryWrites=true&w=majority`;
mongoose.connect(databaseUri, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
}) 
    .then(() => {
        console.log('Connected to MongoDB');
        // Start your application or perform database operations here
    })
    .catch((error) => {
        console.error('MongoDB connection error:', error);
    });

// Routes
app.use('/lot', lotRoutes);
app.use('/user', userRoutes);
app.use('/stripe', stripeRoutes);

// Start the server
httpServer.listen(serverPort, () => {
    console.log('Server started on port 3000');
});
