let mongoose = require('mongoose');
let Schema = mongoose.Schema;

let schema = new Schema({
    infinitive: {
        type    : String,
        unique  : true,
        required: true
    },

    pastSimple: {
        type    : String,
        required: true
    },

    pastParticiple: {
        type    : String,
        required: true
    },

    translation: {
        type: String,
        required: true
    }
});

exports.Infinitive = mongoose.model('Infinitive', schema);

