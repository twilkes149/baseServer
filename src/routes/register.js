const express = require('express');
var router = express.Router();

router.post('/register', (req, res) => {
  res.status(200).send({message: 'register'});
});

module.exports = router;
