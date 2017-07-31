var express = require('express');
var router = express.Router();
let Card = require('../model/card').Card;

/* GET users listing. */
router.get('/', function(req, res, next) {
  // res.send('respond with a resource');
    Card.find({}).then(
        (cards) => res.json(cards)
    ).catch((err) => next(err));
});

module.exports = router;
