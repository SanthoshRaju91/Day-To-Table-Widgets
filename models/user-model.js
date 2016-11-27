/**
 * User model - Mongoose Schema
 */

var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var UserSchema = new Schema({
    first_name: {
        type: String
    },
    last_name: {
        type: String
    },
    email: {
        type: String
    },
    role: {
        type: String
    },
    status: {
        type: String
    },
    contact: {
        type: Number
    }
});

module.exports = mongoose.model('User', UserSchema);
