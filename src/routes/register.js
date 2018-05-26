const express = require('express');
var router = express.Router();
var Database = require('../middleware/database');
var Password = require('../common/password');
var jwt = require('../common/authToken');

/*
* Response codes:
* 400 - client didn't supply all fields
* 409 - username already exists
* 500 - something unknown happened
*/

router.post('/register', async (req, res, next) => {
  let conn = res.locals.conn;

  //retrieve info
  let username = req.body.username ? Database.sanitize(req.body.username, conn) : null;
  let password = req.body.password ? Database.sanitize(req.body.password, conn) : null;
  let firstname = req.body.firstname ? Database.sanitize(req.body.firstname, conn) : null;
  let lastname = req.body.lastname ? Database.sanitize(req.body.lastname, conn) : null;
  let email = req.body.email ? Database.sanitize(req.body.email, conn) : null;

  //check if user supplied fields
  if (!username || !password || !firstname || !lastname || !email) {
    let error = new Error("Not all fields were supplied");
    error.status = 400;
    error.body = {success: false, message: "Not all required fields were supplied"};
    return next(error);
  }

  //check if user previously registered
  if (await Database.isRegistered(email, conn)) {
    let error = new Error("Username already exists");
    error.status = 409;
    error.body = {success: false, message: 'Username already exists'};
    return next(error);
  }  

  password = await Password.hash(password);//hash the password
  try {
    let query = `INSERT INTO users (username, password, firstname, lastname, email) VALUES ("${username}", "${password}", "${firstname}", "${lastname}", "${email}")`;
    await conn.query(query);    
    res.status(200).send({success: true, message: 'Successfuly registered', token: jwt.generateToken()});//generate auth token and return to client
  }
  catch (error) {
    error.status = 500;
    return next(error);
  }
});

module.exports = router;
