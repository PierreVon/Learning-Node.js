var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
  next();
})

    // Execute any code.
    // Make changes to the request and the response objects.
    // End the request-response cycle.
    // Call the next middleware in the stack.

// combination of middleware
var cb0 = function (req, res, next) {
    console.log('CB0')
    next()
}

var cb1 = function (req, res, next) {
    console.log('CB1')
    next()
}

router.get('/', [cb0, cb1], function (req, res, next) {
    console.log('I can be printed')
}, function (req, res) {
    console.log("I can't be printed")
})

// router.route('/book')
//     .get(function (req, res) {
//         res.send('Get a random book')
//     })
//     .post(function (req, res) {
//         res.send('Add a book')
//     })
//     .put(function (req, res) {
//         res.send('Update the book')
//     })

module.exports = router;
