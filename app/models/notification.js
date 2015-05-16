var mongoose     = require('mongoose');
var Schema       = mongoose.Schema;

var Category = require('./category.js');

var NotificationSchema   = new Schema({
    title: {type: String, required: true },
    text: {type: String, required: true },
    category: {type: Schema.Types.ObjectId, ref: 'Category'}
});

module.exports = mongoose.model('Notification', NotificationSchema);