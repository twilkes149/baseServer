const express = require('express');
var router = express.Router();

router.post('/login', (req, res) => {
  res.status(200).send({message: 'login'});
});

module.exports = router;
