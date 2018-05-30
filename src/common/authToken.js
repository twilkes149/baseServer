var jwt = require('jsonwebtoken');

function generateToken() {
  const payload = {
    type: 'user',
  };

  return jwt.sign(payload, process.env.TOKEN_SECRET, {
    expiresIn: 60*60 //token valid for 1 hour
  });
}

async function saveToken(username, token, conn) {
  let query = `INSERT INTO authkey (value, username, timestamp) VALUES ("${username}", "${token}", NOW())`;

  await conn.query(query);  
}

async function updateToken(username, token, conn) {
  let query = ``;
}

module.exports = {
  generateToken,
  saveToken,
}