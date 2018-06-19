# Intro
This project is intended as a boiler plate server. It currently implements registration and login functions. Any configuration can be placed in server.config

See [Routes API](https://github.com/twilkes149/baseServer/tree/master/src/routes) For documentation on the routes.

# Getting started
After cloning the repo
run npm install

Create a file called .env in the root project directory called .env and define values for:
- Server port
- database host
- database username
- database password
- database database
- authToken generator secret

An exmple definition is as follows:
```
SERVER_PORT = '8080'

DB_USERNAME = 'username'
DB_PASSWORD = 'password'
DB_HOST = 'localhost'
DB_DATABASE = 'databaseName'

TOKEN_SECRET = 'mysecret'
MAIL_TOKEN = 'send grid mail token'
MAIL_FROM_ADDRESS = 'no-reply@your-domain.com' 
```
# Tables
## Users
Fields:
- password
- firstName
- lastName
- email
- emailConfirmed (true if client has confirmed email)

## Confirm Token
- value (used to verify if user is the same one that we sent an email to)
- email

## Forgot password
- value (used to verify user, sent in an email)
- email
- created at (used to verify that token has been recently created)

# Notes
## Config file
Allow login before confirming email - if set to true this would force the client to confirm their email before they can login

# Development functionality
When user registers
- generate token
- save token, username in db
- send him email with link that includes token

Confirming email
- user clicks on link (includes get request)
- grab username from db where token = supplied token
- set confirmedEmail to true in user table where username = username from above
- remove token from db (confirm token table)

Forgot password
- create random 6-8 digit token
- save token with username in db
- send email to user's email with token

Reset password
- grab 6-8 digit token from request
- grab username from db using token
- reset password of username from request
