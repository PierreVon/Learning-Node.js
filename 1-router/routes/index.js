var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
  next();
});

router.get('/', (req, res, next) => {
  console.log('I can be printed')
});

router.get('/', (req, res, next) => {
    console.log("I can't be printed")
});

module.exports = router;
