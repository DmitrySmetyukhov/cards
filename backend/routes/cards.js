var express = require('express');
var router = express.Router();
let Card = require('../model/card').Card;

/* GET users listing. */
router.get('/', function (req, res, next) {
    // res.send('respond with a resource');
    Card.find({}).then(
        (cards) => res.json(cards)
    ).catch((err) => next(err));
});

router.get('/random', function (req, res, next) {
    Card.count().exec(function (err, count) {

        if(err) return next(err);
        // Get a random entry
        let random = Math.floor(Math.random() * count);

        // Again query all users but only fetch one offset by our random #
        Card.findOne().skip(random).exec(
            function (err, result) {
                res.send(result);
                console.log(result)
            })
    })
});

router.post('/', function (req, res, next) {
    console.log(req.body, 'body');
    new Card(req.body.newCard).save()
        .then((card) => res.send(card))
        .catch((err) => next(err));

});

module.exports = router;
