const sql = require('promise-mysql');

async function routeConnection(req, res, next) {
  next();
}

async function creatConnection(host, username, password, db) {
  try {
    return conn = await sql.createConnection({
      host: host,
      user: username,
      password: password,
      database: db,
    });
  }
  catch (error) {
    throw error;
  }
}

module.exports = {
  routeConnection,
  creatConnection,
};