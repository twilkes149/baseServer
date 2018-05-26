# Intro
This project is intended as a boiler plate server. It currently implements registration and login functions. Any configuration can be placed in server.config

# Getting started
After cloning the repo
run npm install

Create a file called in the root project directory called .env and define values for:
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
```

# Notes
## Config file
Allow login before confirming email - if set to true this would force the client to confirm their email before they can login