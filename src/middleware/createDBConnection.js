const sql = require('promise-mysql');

async function createConnection(req, res, next) {
  next();
}

module.exports = createConnection;