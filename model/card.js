let mongoose = require('mongoose');
let Schema = mongoose.Schema;

let schema = new Schema({
    word: {
        type    : String,
        unique  : true,
        required: true
    },

    translation: {
        type    : String,
        unique  : true,
        required: true
    },

    category: {
        type   : String,
        default: 'all'
    }
});



exports.Card = mongoose.model('Card', schema);
