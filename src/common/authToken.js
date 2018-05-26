var jwt = require('jsonwebtoken');

function generateToken() {
  const payload = {
    type: 'user',
  };

  return jwt.sign(payload, process.env.TOKEN_SECRET, {
    expiresIn: 60*60 //token valid for 1 hour
  });
}

module.exports = {
  generateToken,
}