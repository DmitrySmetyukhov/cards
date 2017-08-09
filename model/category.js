let mongoose = require('mongoose');
let Schema = mongoose.Schema;

let schema = new Schema({
    name: {
        type    : String,
        unique  : true,
        required: true
    }
});

exports.Category = mongoose.model('Category', schema);
