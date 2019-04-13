var express = require('express');
var router = express.Router();

/* GET users listing. */
router.get('/', function(req, res, next) {
  res.send('respond with a resource');
});

// Route path: /user/:userId(\d+)
// Request URL: http://localhost:3000/user/42
// req.params: {"userId": "42"}

module.exports = router;
