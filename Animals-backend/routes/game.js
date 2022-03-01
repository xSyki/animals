var express = require('express');
var router = express.Router();

router.get('/', function(req, res, next) {
  res.json('game');
});

module.exports = router;
