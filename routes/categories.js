var express = require('express');
var router = express.Router();
let Category = require('../model/category').Category;

/* GET home page. */
router.get('/', function (req, res, next) {
    Category.find({})
        .then(
            (list) => res.send(list)
        )
        .catch((err) => next(err))
});

router.post('/', function (req, res, next) {
    new Category({name: req.body.name}).save()
        .then(
            (category) => res.send(category)
        )
        .catch((err) => next(err))
});


module.exports = router;

