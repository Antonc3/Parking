const express = require('express');
const mongoose = require('mongoose');
const routes = require('./routes');
const config = require('./config.js');

const serverPort = config.server.port;
const serverHost = config.server.host;

const app = express();
app.use(express.json());

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
app.use('/', routes);

// Start the server
app.listen(serverPort, () => {
    console.log('Server started on port 3000');
});
