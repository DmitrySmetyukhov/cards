var express = require('express');
var router = express.Router();
let Card = require('../model/card').Card;
let Category = require('../model/category').Category;

/* GET users listing. */
router.get('/', function (req, res, next) {
    // res.send('respond with a resource');
    Card.find({}).then(
        (cards) => res.json(cards)
    ).catch((err) => next(err));
});

router.get('/random', function (req, res, next) {
    Card.count().exec(function (err, count) {

        if (err) return next(err);
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
    new Card(req.body.newCard).save()
        .then((card) => res.send(card))
        .catch((err) => next(err));

});

router.delete('/:id', function (req, res, next) {
    Card.remove({
        _id: req.params.id
    }).then(
        () => res.send({id: req.params.id})
    ).catch(
        (err) => next(err)
    );
});

router.post('/setCategory', function (req, res, next) {
    let currentCard;

    Card.findById(req.body.cardId)
        .then(
            (card) => currentCard = card
        )
        .then(() => Category.findById(req.body.categoryId))
        .then((category) => {
            currentCard.category = category.name;
            Card.updateOne({_id: currentCard._id}, currentCard, function (err, r) {
                if(err) return next(err);
                res.send(currentCard)
            })
        })

        .catch((err) => next(err))
});

module.exports = router;
