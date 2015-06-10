var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var types = 'up down app'.split(' ');
var MessageSchema = new Schema({
    title: {
        type: String,
        required: true
    },
    text: {
        type: String,
        required: true
    },
    type: {
        type: String,
        required: true,
        enum: types
    },
    image: {
        type: String,
        required: true,
        default: 'default'
    }
});
module.exports = mongoose.model('Message', MessageSchema);