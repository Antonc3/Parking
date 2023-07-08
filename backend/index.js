const express = require('express');
const mongoose = require('mongoose');
const routes = require('./routes');
const config = require('./config.js');

const databaseHost = config.database.host;
const databasePort = config.database.port;
const databaseName = config.database.name;
const serverPort = config.server.port;
const serverHost = config.server.host;

const app = express();
app.use(express.json());

// Connect to MongoDB
const databaseUrl = `mongodb://${databaseHost}:${databasePort}/${databaseName}`;
mongoose.connect(databaseUrl, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

// Routes
app.use('/', routes);

// Start the server
app.listen(serverPort, () => {
  console.log('Server started on port 3000');
});
