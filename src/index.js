const express = require('express');
require('dotenv-safe').config();//load environment variables

var loginRoute = require('./routes/login');
var registerRoute = require('./routes/register');
var confirmEmailRoute = require('./routes/confirmEmail');
var forgotPasswordRoute = require('./routes/forgotPassword');

var authenticate = require('./middleware/authenticate');
var dbConnection = require('./middleware/database');

var server = express();

server.use(express.json());//parse json bodies
server.use(dbConnection.routeConnection);
server.post('/login', loginRoute);
server.post('/register', registerRoute);
server.get('/confirmEmail', confirmEmailRoute);
server.post('/forgotPassword', forgotPasswordRoute);

server.use(authenticate);//authenticate client for any other route

//handle errors
server.use((error, req, res, next) => {  
  if (error.status && error.body)
    res.status(error.status).send(error.body);
  else {
    console.log(error);
    res.status(500).send({success: false, message: 'Internal server error'});
  }
});

//handle invalid paths
server.use((req, res, next) => {
  res.status(404).send({success: false, message: 'path does not exist'});
});

server.listen(process.env.SERVER_PORT, () => {
  console.log("Listening on port: ", process.env.SERVER_PORT);
});