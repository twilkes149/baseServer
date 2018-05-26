const express = require('express');
require('dotenv-safe').config();//load environment variables

var loginRoute = require('./routes/login');
var registerRoute = require('./routes/register');
var authenticate = require('./middleware/authenticate');
var dbConnection = require('./middleware/createDBConnection');

var server = express();

server.use(express.json());//parse json bodies
server.use(dbConnection);
server.post('/login', loginRoute);
server.post('/register', registerRoute);

server.use(authenticate);//authenticate client for any other route

//handle errors
server.use((error, req, res, next) => {
  next();
});

//handle invalid paths
server.use((req, res, next) => {
  res.status(404).send({message: 'does not exist'});
});

server.listen(process.env.SERVER_PORT, () => {
  console.log("Listening on port: ", process.env.SERVER_PORT);
});