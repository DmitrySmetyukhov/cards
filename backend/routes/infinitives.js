var express = require('express');
var router = express.Router();
let Infinitive = require('../model/infinitive').Infinitive;

/* GET users listing. */
router.get('/', function (req, res, next) {
    // res.send('respond with a resource');
    Infinitive.find({}).then(
        (infinitives) => res.json(infinitives)
    ).catch((err) => next(err));
});

router.get('/random', function (req, res, next) {
    Infinitive.count().exec(function (err, count) {

        if(err) return next(err);
        // Get a random entry
        let random = Math.floor(Math.random() * count);

        // Again query all users but only fetch one offset by our random #
        Infinitive.findOne().skip(random).exec(
            function (err, result) {
                res.send(result);
            })
    })
});

router.post('/', function (req, res, next) {
    console.log(req.body, 'body');
    new Infinitive(req.body.infinitive).save()
        .then((infinitive) => res.send(infinitive))
        .catch((err) => next(err));

});

module.exports = router;
