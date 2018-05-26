const sql = require('promise-mysql');

async function routeConnection(req, res, next) {
  let conn = await createConnection(process.env.DB_HOST,
    process.env.DB_USERNAME, '', process.env.DB_DATABASE);

  if (conn == null) {
    let error = new Error({success: false, message: "DB Connection error"})
    error.status = 500;
    return next(error);
  }
  res.locals.conn = conn;
  next();
}

async function createConnection(host, username, password, db) {
  try {
    return conn = await sql.createConnection({
      host: host,
      user: username,
      password: password,
      database: db,
    });
  }
  catch (error) {
    return null;
  }
}

async function isRegistered(email, conn) {
  let query = `SELECT username FROM users WHERE email = "${email}"`;

  let result = await conn.query(query);
  if (result[0]) {
    return true;
  }
  return false;
}

function sanitize(input, conn) {
  return conn.escape(input);
}

module.exports = {
  routeConnection,
  createConnection,
  isRegistered,
  sanitize,
};