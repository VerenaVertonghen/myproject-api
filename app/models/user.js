// grab the things we need
var mongoose = require('mongoose');
var bcrypt = require('bcrypt-nodejs');
// mongoose
var Schema = mongoose.Schema;
// enums
var roles = 'admin user'.split(' ');
var notificationsenum = 'rarely normal often'.split(' ');
var languages = 'english nederlands français'.split(' ');
var themes = 'light dark colour'.split(' ');
// load state model
var State = require('./state.js');
var Notification = require('./notification.js');

// create a schema
var UserSchema = new Schema({
    firstname: {
        type: String,
        required: true
    },
    lastname: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        index: {
            unique: true
        }
    },
    role: {
        type: String,
        enum: roles,
        default: 'user',
        required: true
    },
    birthyear: {
        type: Number,
        required: false
    },
    states: [{
        type: Schema.Types.ObjectId,
        ref: 'State',
        required: false
    }],
    notifications: [{
        type: Schema.Types.ObjectId,
        ref: 'Notification',
        required: false
    }],
    notificationsetting: {
        type: String,
        enum: notificationsenum,
        default: 'normal',
        required: false
    },
    languagesetting: {
        type: String,
        enum: languages,
        default: 'english',
        required: false
    },
    themesetting: {
        type: String,
        enum: themes,
        default: 'light',
        required: false
    },
    created_at: {
        type: Date
    },
    updated_at: {
        type: Date
    }
});
// on every save, add the date
UserSchema.pre('save', function(next) {
    // get the current date
    var currentDate = new Date();
    // change the updated_at field to current date
    this.updated_at = currentDate;
    // if created_at doesn't exist, add to that field
    if (!this.created_at) this.created_at = currentDate;
    if (this.isModified('password')) {
        this.password = this.generateHash(this.password);
    }
    next();
});
// methods ======================
// generating a hash
UserSchema.methods.generateHash = function(password) {
    return bcrypt.hashSync(password, bcrypt.genSaltSync(8), null);
};
// checking if password is valid
UserSchema.methods.validPassword = function(password) {
    return bcrypt.compareSync(password, this.password);
};
module.exports = mongoose.model('User', UserSchema);